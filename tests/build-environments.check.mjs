// Real generated artifacts + local HTTP. This does not emulate Vercel's edge.
import test, { before, after } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { once } from 'node:events'
import { readInventory, site } from '../scripts/prototype-routes.mjs'
import { createPrototypeServer } from '../scripts/serve-prototype.mjs'

const inventory = readInventory(), results = []
const targets = [{ name: 'production', output: 'dist', robots: 'index, follow' }, { name: 'preview', output: 'dist-preview', robots: 'noindex, nofollow' }]
const document = (output, route) => readFileSync(output + (route === '/' ? '/' : route + '/') + 'index.html', 'utf8')
const decode = value => value.replace(/&(?:amp|lt|gt|quot|#39|#x27);/g, entity => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&#x27;': "'" })[entity])
const tags = (html, name) => [...html.matchAll(new RegExp('<' + name + '\\b([^>]*)>', 'g'))].map(match => Object.fromEntries([...match[1].matchAll(/([\w:-]+)="([^"]*)"/g)].map(attr => [attr[1], decode(attr[2])])))
before(async () => {
  for (const target of targets) {
    target.server = createPrototypeServer({ directory: fileURLToPath(new URL('../' + target.output + '/', import.meta.url)) })
    target.server.listen(0, '127.0.0.1'); await once(target.server, 'listening')
    target.base = 'http://127.0.0.1:' + target.server.address().port
    target.metadata = JSON.parse(readFileSync(target.output + '/prerender-manifest.json', 'utf8'))
  }
})
after(async () => {
  for (const target of targets) { target.server.closeAllConnections(); await new Promise(resolve => target.server.close(resolve)) }
  writeFileSync((process.env.SEO_REPORT_DIRECTORY || '.phase6_1b_stage3_2') + '/build-environment-validation.json', JSON.stringify({ scope: 'Local files and local HTTP only; real Vercel behavior UNVERIFIED', routes: results }, null, 2) + '\n')
})
for (const target of targets) {
  for (const page of inventory) {
    test(`${target.name} ${page.path}: initial HTML, intended robots and matching approved metadata`, async () => {
      const row = { target: target.name, route: page.path, result: 'FAIL' }; results.push(row)
      const html = document(target.output, page.path), head = html.slice(0, html.indexOf('</head>'))
      const metadata = target.metadata.find(item => item.path === page.path).metadata
      const response = await fetch(target.base + page.path, { redirect: 'manual' })
      assert.equal(response.status, 200); assert.equal(await response.text(), html)
      row.status = response.status
      assert.deepEqual(tags(head, 'meta').filter(tag => tag.name === 'robots').map(tag => tag.content), [target.robots])
      row.robots = target.robots
      const canonicals = tags(head, 'link').filter(tag => tag.rel === 'canonical').map(tag => tag.href)
      assert.deepEqual(canonicals, [page.canonical]); assert.equal(metadata.canonical, site + page.path)
      row.canonical = canonicals[0]
      assert.equal((head.match(/<title>/g) || []).length, 1)
      assert.equal(decode(head.match(/<title>([\s\S]*?)<\/title>/)[1]), metadata.title)
      row.title = metadata.title
      const expectedMeta = { description: metadata.description, 'og:title': metadata.socialTitle || metadata.title,
        'og:description': metadata.description, 'og:url': page.canonical, 'og:type': metadata.type || 'website',
        'twitter:title': metadata.title, 'twitter:description': metadata.description, 'twitter:url': page.canonical }
      for (const [key, value] of Object.entries(expectedMeta)) assert.deepEqual(tags(head, 'meta').filter(tag => (tag.name || tag.property) === key).map(tag => tag.content), [value], key)
      assert.equal((html.match(/<h1\b/g) || []).length, 1)
      assert.ok(html.includes('id="prerender-content"')); assert.ok(html.includes('<div id="root"></div>'))
      assert.ok((html.match(/<p\b/g) || []).length > 2)
      for (const form of tags(html, 'form')) assert.ok('inert' in form)
      const schemas = [...html.matchAll(/<script type="application\/ld\+json" data-useseo-schema>(.*?)<\/script>/g)].map(match => JSON.parse(match[1]))
      assert.deepEqual(schemas, metadata.schema ? (Array.isArray(metadata.schema) ? metadata.schema : [metadata.schema]) : [])
      assert.doesNotMatch(html, /<script[^>]+src="https?:|-----BEGIN [A-Z ]*PRIVATE KEY-----|hs_privacy_choice|hs_consent/)
      row.result = 'PASS'
    })
  }
  test(`${target.name}: 31 unique documents; all emitted local navigation/assets exist`, async () => {
    assert.equal(target.metadata.length, 31); assert.equal(new Set(target.metadata.map(item => item.path)).size, 31)
    const paths = new Set()
    for (const page of inventory) for (const match of document(target.output, page.path).matchAll(/(?:href|src)="(\/[^"#]*)"/g)) paths.add(decode(match[1]))
    for (const path of paths) assert.equal((await fetch(target.base + path, { redirect: 'manual' })).status, 200, path)
  })
  test(`${target.name}: missing documents/assets are branded GET/HEAD 404; recovery remains noindex`, async () => {
    for (const path of ['/seo-test-unknown-page', '/blog/seo-test-unknown-article', '/images/seo-test-missing.webp']) {
      const response = await fetch(target.base + path, { redirect: 'manual' }), html = await response.text()
      assert.equal(response.status, 404); assert.equal((await fetch(target.base + path, { method: 'HEAD' })).status, 404)
      assert.ok(html.includes('data-not-found')); assert.equal(response.headers.get('location'), null)
      assert.deepEqual(tags(html, 'meta').filter(tag => tag.name === 'robots').map(tag => tag.content), ['noindex, nofollow'])
      assert.equal(tags(html, 'link').filter(tag => tag.rel === 'canonical').length, 0)
    }
  })
  test(`${target.name}: five 308 redirects preserve encoded/repeated queries without chains`, async () => {
    const redirects = JSON.parse(readFileSync('vercel.json', 'utf8')).redirects
    assert.equal(redirects.length, 5)
    for (const rule of redirects) for (const query of ['', '?expedition=Adi%20Kailash&tag=a&tag=b&utm_source=stage3-2']) {
      const response = await fetch(target.base + rule.source + query, { redirect: 'manual' })
      assert.equal(response.status, 308); assert.equal(response.headers.get('location'), rule.destination + query)
      const next = await fetch(target.base + response.headers.get('location'), { redirect: 'manual' })
      assert.equal(next.status, 200); assert.equal(next.headers.get('location'), null)
    }
  })
}
test('Preview and Production preserve the same approved metadata, content and assets', () => {
  const [production, preview] = targets
  assert.deepEqual(production.metadata, preview.metadata)
  for (const page of inventory) {
    const prod = document('dist', page.path), prev = document('dist-preview', page.path)
    assert.equal(prod.slice(prod.indexOf('<body>')), prev.slice(prev.indexOf('<body>')))
    assert.deepEqual(tags(prod, 'script').map(tag => tag.src).filter(Boolean), tags(prev, 'script').map(tag => tag.src).filter(Boolean))
  }
})
test('verified Vercel Production rebuild after Preview has 31 indexable documents and no inherited marker', () => {
  for (const page of inventory) {
    const html = document('dist-vercel', page.path)
    assert.deepEqual(tags(html, 'meta').filter(tag => tag.name === 'robots').map(tag => tag.content), ['index, follow'])
    assert.deepEqual(tags(html, 'link').filter(tag => tag.rel === 'canonical').map(tag => tag.href), [page.canonical])
  }
})
