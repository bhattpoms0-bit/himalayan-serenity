import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { buildPlan, resolveBuildTarget } from '../scripts/build-prerender.mjs'
import { makePrototypeHTML, robotsForTarget, setDocumentRobots } from '../scripts/prototype-html.mjs'

test('Vercel auto-selection requires explicit documented system signals, never NODE_ENV/URL/branch inference', () => {
  for (const env of [{}, { NODE_ENV: 'production' }, { VERCEL_ENV: 'production' }, { VERCEL: '1' },
    { VERCEL: '0', VERCEL_ENV: 'production' }, { VERCEL_URL: 'production.example', VERCEL_GIT_COMMIT_REF: 'main' },
    { VERCEL: '1', VERCEL_ENV: 'development' }, { VERCEL: '1', VERCEL_ENV: 'staging' }]) {
    assert.throws(() => resolveBuildTarget(env, 'vercel'))
  }
  for (const target of ['production', 'preview']) {
    assert.equal(resolveBuildTarget({ VERCEL: '1', VERCEL_ENV: target }, 'vercel'), target)
    assert.equal(resolveBuildTarget({ VERCEL: '1', VERCEL_ENV: target, VERCEL_TARGET_ENV: target }, 'vercel'), target)
  }
})

test('conflicting system/custom targets and explicit cross-target builds fail closed', () => {
  for (const [platform, requested] of [['preview', 'production'], ['production', 'preview']]) {
    assert.throws(() => resolveBuildTarget({ VERCEL: '1', VERCEL_ENV: platform }, requested))
    assert.throws(() => resolveBuildTarget({ VERCEL: '1', VERCEL_ENV: platform, VERCEL_TARGET_ENV: requested }, 'vercel'))
  }
  assert.throws(() => resolveBuildTarget({ VERCEL: '1', VERCEL_ENV: 'preview', VERCEL_TARGET_ENV: 'staging' }, 'vercel'))
  assert.throws(() => resolveBuildTarget({ VERCEL: '1', VERCEL_ENV: 'production', VERCEL_GIT_COMMIT_REF: 'feature/phase6-1b-prerender-prototype' }, 'vercel'))
  assert.equal(resolveBuildTarget({ VERCEL: '1', VERCEL_ENV: 'production', VERCEL_GIT_COMMIT_REF: 'main' }, 'vercel'), 'production')
})

test('local modes are explicit and outputs are separate; Vercel uses one configured fresh-build directory', () => {
  assert.throws(() => resolveBuildTarget({}, undefined))
  assert.throws(() => resolveBuildTarget({}, 'staging'))
  assert.deepEqual(buildPlan({}, 'production'), { target: 'production', output: 'dist' })
  assert.deepEqual(buildPlan({}, 'preview'), { target: 'preview', output: 'dist-preview' })
  for (const target of ['preview', 'production']) {
    assert.deepEqual(buildPlan({ VERCEL: '1', VERCEL_ENV: target }, 'vercel'), { target, output: 'dist-vercel' })
  }
  const scripts = JSON.parse(readFileSync(new URL('../package.json', import.meta.url))).scripts
  assert.equal(scripts.build, scripts['build:production'])
  assert.notEqual(scripts.build, 'vite build', 'normal production command must build all 31 pages')
})

test('production preserves intentional exclusions and approved page directives', () => {
  assert.equal(robotsForTarget('production'), 'index, follow')
  for (const value of ['noindex, follow', 'noindex, nofollow', 'index, follow, max-image-preview:large']) {
    assert.equal(robotsForTarget('production', value), value)
  }
  const html = setDocumentRobots('<head><meta name="robots" content="noindex, nofollow" /></head>', 'production')
  assert.ok(html.includes('content="noindex, nofollow"'))
})

test('preview adds one restrictive directive set without conflicting index/follow or dropping other restrictions', () => {
  assert.equal(robotsForTarget('preview', 'index, follow'), 'noindex, nofollow')
  assert.equal(robotsForTarget('preview', 'noindex, noarchive'), 'noindex, nofollow, noarchive')
  const html = setDocumentRobots('<head><meta name="robots" content="index, follow" /><meta name="robots" content="noindex, noarchive" /></head>', 'preview')
  assert.equal((html.match(/name="robots"/g) || []).length, 1)
  assert.ok(html.includes('content="noindex, nofollow, noarchive"'))
  assert.equal(setDocumentRobots(html, 'preview'), html)
})

test('renderer preserves explicit page noindex in production and keeps 404 recovery noindex in both targets', () => {
  const shell = '<head></head><div id="root"></div>'
  const rendered = { markup: '<h1>Approved content</h1>', metadata: { title: 'Title', description: 'Description', canonical: 'https://www.himalayanserenitytravel.com/about', robots: 'noindex, follow' } }
  assert.ok(makePrototypeHTML(shell, rendered, [], false, 'production').includes('name="robots" content="noindex, follow"'))
  for (const target of ['production', 'preview']) {
    const html = makePrototypeHTML(shell, { markup: '<main data-not-found>404</main>' }, [], true, target)
    assert.ok(html.includes('name="robots" content="noindex, nofollow"'))
    assert.ok(!html.includes('rel="canonical"'))
  }
})
