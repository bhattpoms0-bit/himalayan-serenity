// Run AFTER npm run build:prototype. These test real generated documents and
// local HTTP responses, not Vercel edge behavior or browser layout.
import test, { before, after } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { once } from 'node:events'
import { parse } from '@babel/parser'
import { prototypePaths, readRouting } from '../scripts/prototype-routes.mjs'
import { createPrototypeServer } from '../scripts/serve-prototype.mjs'
import { preparePrerender, finishPrerender } from '../src/prerender/handoff.js'

const site = 'https://www.himalayanserenitytravel.com'
const expected = [
  ['/', 'src/pages/Home.jsx', 'Wellness Journeys Rooted in the Himalayas'],
  ['/international-retreats', 'src/pages/InternationalRetreats.jsx', 'Find Your Stillness in the Himalayas'],
  ['/retreats/panchachuli-wellness', 'src/pages/retreats/KumaonWellness.jsx', 'Panchachuli Wellness Retreat'],
  ['/experiences', 'src/pages/Experiences.jsx', 'Sacred Himalayan Journeys & Expeditions'],
]
const decode = value => value.replace(/&(?:amp|lt|gt|quot|#x27|#39);/g, entity => ({
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'", '&#39;': "'",
})[entity])
const tags = html => [...html.matchAll(/<(meta|link)\b([^>]+)>/g)].map(m => ({
  tag: m[1], ...Object.fromEntries([...m[2].matchAll(/([\w:-]+)="([^"]*)"/g)].map(a => [a[1], decode(a[2])])),
}))
function authoredSEO(path) {
  const source = readFileSync(path, 'utf8')
  let result
  function visit(node) {
    if (!node || typeof node !== 'object') return
    if (node.type === 'CallExpression' && node.callee.name === 'useSEO') {
      result = Object.fromEntries(node.arguments[0].properties
        .filter(p => p.value.type === 'StringLiteral').map(p => [p.key.name, p.value.value]))
    }
    for (const value of Object.values(node)) {
      for (const child of Array.isArray(value) ? value : [value]) visit(child)
    }
  }
  visit(parse(source, { sourceType: 'module', plugins: ['jsx'] }))
  return result
}
const documents = new Map(expected.map(([path]) => [path,
  readFileSync('dist-prototype' + (path === '/' ? '/' : path + '/') + 'index.html', 'utf8')]))
let server, base
before(async () => {
  server = createPrototypeServer()
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  base = `http://127.0.0.1:${server.address().port}`
})
after(async () => { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)) })

for (const [path, source, heading] of expected) {
  test(`${path}: initial HTML uses approved metadata once, meaningful content and real links`, () => {
    const html = documents.get(path), metadata = authoredSEO(source), head = tags(html)
    assert.equal(decode(html.match(/<title>(.*?)<\/title>/)[1]), metadata.title)
    assert.equal((html.match(/<title>/g) || []).length, 1)
    assert.deepEqual(head.filter(t => t.rel === 'canonical').map(t => t.href), [site + (path === '/' ? '/' : path)])
    const expectedMeta = { description: metadata.description, 'og:title': metadata.title,
      'og:description': metadata.description, 'og:url': metadata.canonical,
      'og:image': site + '/images/packages/adi-kailash-base.jpg', 'og:type': 'website',
      'twitter:title': metadata.title, 'twitter:description': metadata.description,
      'twitter:url': metadata.canonical, 'twitter:image': site + '/images/packages/adi-kailash-base.jpg' }
    for (const [key, value] of Object.entries(expectedMeta)) {
      const matching = head.filter(t => (t.name || t.property) === key)
      assert.equal(matching.length, 1, key + ' must be unique')
      assert.equal(matching[0].content, value, key)
    }
    assert.equal(decode(html.match(/<h1\b[^>]*>(.*?)<\/h1>/)[1]), heading)
    assert.ok((html.match(/<p\b/g) || []).length > 5)
    assert.ok(html.includes('href="/contact"'))
    assert.ok(html.includes('href="/international-retreats"'))
    assert.ok(html.includes('href="/experiences"'))
    assert.ok(html.includes('<div id="root"></div>'), 'React still mounts into an empty root')
    assert.ok(html.includes('id="prerender-content"'))
    assert.doesNotMatch(html, /<script[^>]+src="https?:/i, 'no tracking SDK runs in the snapshot')
    for (const form of html.matchAll(/<form\b([^>]*)>/g)) assert.match(form[1], /inert=""/)
    const schemas = [...html.matchAll(/<script type="application\/ld\+json" data-useseo-schema>(.*?)<\/script>/g)]
      .map(m => JSON.parse(m[1]))
    assert.equal(schemas.length, path === '/retreats/panchachuli-wellness' ? 1 : 0)
    if (schemas.length) { assert.equal(schemas[0]['@type'], 'Product'); assert.equal(schemas[0].offers.url, site + path) }
  })
  test(`${path}: route CSS and every emitted local navigation destination are served`, async () => {
    const html = documents.get(path)
    const destinations = new Set([...html.matchAll(/href="(\/[^"#]*)"/g)].map(m => decode(m[1])))
    for (const destination of destinations) {
      const response = await fetch(base + destination, { redirect: 'manual' })
      assert.equal(response.status, 200, destination)
      if (destination.endsWith('.css')) assert.match(response.headers.get('content-type'), /text\/css/)
    }
  })
}

test('all 31 sitemap pages are prerendered using the expanded approved architecture', async () => {
  const xml = readFileSync('public/sitemap.xml', 'utf8')
  const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname)
  assert.equal(paths.length, 31)
  assert.equal(new Set(paths).size, 31)
  let snapshots = 0
  for (const path of paths) {
    const response = await fetch(base + path)
    assert.equal(response.status, 200, path)
    const html = await response.text()
    if (html.includes('id="prerender-content"')) snapshots++
    assert.equal(html.includes('id="prerender-content"'), prototypePaths.includes(path), path)
  }
  assert.equal(snapshots, 31)
  assert.ok(existsSync('dist-prototype/blog/index.html'))
})

for (const path of ['/seo-test-unknown-page', '/blog/seo-test-unknown-article', '/images/seo-test-missing.webp']) {
  test(`${path}: actual local GET and HEAD return 404 with branded recovery`, async () => {
    const response = await fetch(base + path, { redirect: 'manual' })
    assert.equal(response.status, 404)
    assert.equal(response.headers.get('location'), null)
    const html = await response.text()
    assert.match(html, /data-not-found/)
    assert.ok(decode(html).includes('Let’s find your next journey.'))
    assert.equal(tags(html).filter(t => t.rel === 'canonical').length, 0)
    assert.equal((await fetch(base + path, { method: 'HEAD' })).status, 404)
  })
}

test('all five configured permanent redirects preserve encoded and repeated query parameters without chains', async () => {
  const redirects = readRouting().redirects
  assert.equal(redirects.length, 5)
  for (const rule of redirects) {
    assert.equal(rule.permanent, true)
    for (const query of ['', '?expedition=Adi%20Kailash&tag=a&tag=b&utm_source=prototype']) {
      const response = await fetch(base + rule.source + query, { redirect: 'manual' })
      assert.equal(response.status, 308)
      assert.equal(response.headers.get('location'), rule.destination + query)
      const next = await fetch(base + response.headers.get('location'), { redirect: 'manual' })
      assert.equal(next.status, 200)
      assert.equal(next.headers.get('location'), null)
    }
  }
})

test('handoff retains the snapshot until the resolved route commits; repeated cleanup is harmless', () => {
  const attributes = new Map(), elements = new Map()
  for (const id of ['prerender-content', 'prerender-handoff-style']) {
    elements.set(id, { remove() { elements.delete(id) } })
  }
  const document = { getElementById: id => elements.get(id), documentElement: {
    setAttribute: (name, value) => attributes.set(name, value), removeAttribute: name => attributes.delete(name),
  } }
  assert.equal(preparePrerender(document), true)
  assert.ok(elements.has('prerender-content'), 'loading must not remove the snapshot')
  assert.ok(attributes.has('data-prerender-pending'))
  assert.equal(finishPrerender(document), true)
  assert.equal(elements.size, 0)
  assert.equal(attributes.size, 0)
  assert.equal(finishPrerender(document), false)
  assert.equal(preparePrerender(document), false)
})
