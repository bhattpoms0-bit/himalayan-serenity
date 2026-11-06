// Configuration/build contracts only; these never assert real Vercel HTTP behavior.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolveBuildTarget } from '../scripts/build-prerender.mjs'
import { setDocumentRobots } from '../scripts/prototype-html.mjs'

test('explicit preview command refuses incomplete, development and production platform targets', () => {
  for (const target of [undefined, 'development', 'production']) {
    assert.throws(() => resolveBuildTarget({ VERCEL: '1', VERCEL_ENV: target }, 'preview'))
  }
  assert.equal(resolveBuildTarget({}, 'preview'), 'preview')
  assert.equal(resolveBuildTarget({ VERCEL: '1', VERCEL_ENV: 'preview', VERCEL_TARGET_ENV: 'preview' }, 'preview'), 'preview')
})

test('preview HTML noindex is unique, idempotent and preserves approved metadata/content', () => {
  const source = '<head><title>Approved title</title><meta name="robots" content="index, follow" /><link rel="canonical" href="https://www.himalayanserenitytravel.com/about" /></head><body><h1>Approved heading</h1></body>'
  const html = setDocumentRobots(source, 'preview')
  assert.equal((html.match(/name="robots"/g) || []).length, 1)
  assert.match(html, /content="noindex, nofollow"/)
  for (const fragment of ['<title>Approved title</title>', 'href="https://www.himalayanserenitytravel.com/about"', '<h1>Approved heading</h1>']) assert.ok(html.includes(fragment))
  assert.equal(setDocumentRobots(html, 'preview'), html)
  assert.throws(() => setDocumentRobots('<body>missing head</body>', 'preview'))
})

test('Vercel static configuration selects verified-target full build without unconditional robots header', () => {
  const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))
  assert.equal(config.framework, null)
  assert.equal(config.buildCommand, 'npm run build:vercel')
  assert.equal(config.outputDirectory, 'dist-vercel')
  assert.equal(config.rewrites, undefined)
  assert.ok(config.headers.every(rule => rule.headers.every(header => header.key.toLowerCase() !== 'x-robots-tag')))
  assert.equal(config.headers.length, 4, 'preserve the four approved asset cache rules')
  assert.equal(config.redirects.length, 5)
})
