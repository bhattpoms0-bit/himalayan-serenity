// Configuration/build contracts only; these never assert real Vercel HTTP behavior.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { assertPreviewTarget, preventPreviewIndexing } from '../scripts/build-vercel-preview.mjs'

test('preview build refuses missing, development and production targets before building', () => {
  for (const target of [undefined, 'development', 'production']) {
    assert.throws(() => assertPreviewTarget({ VERCEL_ENV: target }), /Preview target/)
  }
  assert.doesNotThrow(() => assertPreviewTarget({ VERCEL_ENV: 'preview' }))
  assert.doesNotThrow(() => assertPreviewTarget({ VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_REF: 'feature/phase6-1b-prerender-prototype' }))
  for (const branch of ['main', 'master', 'unreviewed-branch']) {
    assert.throws(() => assertPreviewTarget({ VERCEL_ENV: 'preview', VERCEL_GIT_COMMIT_REF: branch }), /reviewed feature branch/)
  }
})

test('preview HTML noindex is unique, idempotent and preserves approved metadata/content', () => {
  const source = '<head><title>Approved title</title><meta name="robots" content="index, follow" /><link rel="canonical" href="https://www.himalayanserenitytravel.com/about" /></head><body><h1>Approved heading</h1></body>'
  const html = preventPreviewIndexing(source)
  assert.equal((html.match(/name="robots"/g) || []).length, 1)
  assert.match(html, /content="noindex, nofollow"/)
  for (const fragment of ['<title>Approved title</title>', 'href="https://www.himalayanserenitytravel.com/about"', '<h1>Approved heading</h1>']) assert.ok(html.includes(fragment))
  assert.equal(preventPreviewIndexing(html), html)
  assert.throws(() => preventPreviewIndexing('<body>missing head</body>'))
})

test('Vercel static configuration selects guarded full build, no SPA catch-all and noindex header', () => {
  const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))
  assert.equal(config.framework, null)
  assert.equal(config.buildCommand, 'npm run build:vercel-preview')
  assert.equal(config.outputDirectory, 'dist-prototype')
  assert.equal(config.rewrites, undefined)
  assert.deepEqual(config.headers[0], { source: '/(.*)', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] })
  assert.equal(config.redirects.length, 5)
})
