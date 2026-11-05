// Validate the real build artifact and local HTTP harness, never production.
import test, { before, after } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { once } from 'node:events'
import { createHash } from 'node:crypto'
import { gzipSync } from 'node:zlib'
import { readInventory, readRouting, site } from '../scripts/prototype-routes.mjs'
import { createPrototypeServer } from '../scripts/serve-prototype.mjs'
import { makePrototypeHTML } from '../scripts/prototype-html.mjs'
import { blogPosts } from '../src/data/blogPosts.js'
import { articleDate } from '../src/utils/articleDate.js'

const inventory = readInventory()
const captured = JSON.parse(readFileSync('dist-prototype/prerender-manifest.json', 'utf8'))
const results = [], redirects = [], errors = []
let server, base
const decode = value => value.replace(/&(?:amp|lt|gt|quot|apos|#x27|#39);/g, entity => ({
  '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'", '&#x27;': "'", '&#39;': "'",
})[entity])
const text = value => decode(value.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim()
function tags(html, name) {
  return [...html.matchAll(new RegExp('<' + name + '\\b([^>]*)>', 'g'))].map(match =>
    Object.fromEntries([...match[1].matchAll(/([\w:-]+)="([^"]*)"/g)].map(a => [a[1], decode(a[2])])))
}
const hash = bytes => createHash('sha256').update(bytes).digest('hex')
const documents = new Map(inventory.map(({ path }) => [path,
  readFileSync('dist-prototype' + (path === '/' ? '/' : path + '/') + 'index.html', 'utf8')]))

before(async () => {
  server = createPrototypeServer()
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  base = `http://127.0.0.1:${server.address().port}`
})
after(async () => {
  server.closeAllConnections()
  await new Promise(resolve => server.close(resolve))
  writeFileSync((process.env.SEO_REPORT_DIRECTORY || '.phase6_1b_stage2') + '/route-validation.json', JSON.stringify({
    scope: 'Local dist-prototype only; Vercel and browser checks UNVERIFIED',
    routes: results, redirects, errors,
  }, null, 2) + '\n')
})

for (const page of inventory) {
  test(`${page.path}: complete initial HTML, metadata, schema and HTTP 200`, async () => {
    const html = documents.get(page.path)
    const row = { route: page.path, source: page.entry, result: 'FAIL' }
    results.push(row)
    const response = await fetch(base + page.path, { redirect: 'manual' })
    row.status = response.status
    assert.equal(response.status, 200)
    assert.equal(await response.text(), html)
    const head = html.slice(0, html.indexOf('</head>'))
    const metadata = captured.find(item => item.path === page.path).metadata
    row.title = text(head.match(/<title>([\s\S]*?)<\/title>/)[1])
    assert.equal(row.title, metadata.title)
    assert.equal((head.match(/<title>/g) || []).length, 1)
    const canonical = tags(head, 'link').filter(tag => tag.rel === 'canonical')
    assert.deepEqual(canonical.map(tag => tag.href), [page.canonical])
    row.canonical = canonical[0].href
    const meta = tags(head, 'meta')
    const expected = {
      description: metadata.description, 'og:title': metadata.socialTitle || metadata.title,
      'og:description': metadata.description, 'og:url': page.canonical,
      'og:type': metadata.type || 'website', 'twitter:card': 'summary_large_image',
      'twitter:title': metadata.title, 'twitter:description': metadata.description,
      'twitter:url': page.canonical,
      'og:image': new URL(metadata.image || '/images/packages/adi-kailash-base.jpg', site).href,
      'twitter:image': new URL(metadata.image || '/images/packages/adi-kailash-base.jpg', site).href,
    }
    for (const [key, value] of Object.entries(expected)) {
      assert.deepEqual(meta.filter(tag => (tag.name || tag.property) === key).map(tag => tag.content), [value], key)
    }
    assert.ok(metadata.description.length > 30)
    row.metadata = 'PASS'
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(match => text(match[1]))
    assert.equal(headings.length, 1)
    assert.ok(headings[0].length > 5)
    row.h1 = headings[0]
    row.h1Presence = 'PASS'
    const content = html.slice(html.indexOf('<div id="prerender-content">'))
    assert.ok(text(content).length > 1000)
    assert.ok((content.match(/<p\b/g) || []).length >= 3)
    row.initialContent = 'PASS'
    const links = tags(content, 'a').filter(tag => tag.href?.startsWith('/'))
    assert.ok(links.length > 0, 'approved internal navigation is present')
    row.internalLinkCount = links.length
    row.internalLinks = 'PASS'
    const ids = [...content.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])
    assert.equal(new Set(ids).size, ids.length, 'no duplicate IDs in static snapshot')
    assert.ok(html.includes('<div id="root"></div>'))
    for (const form of tags(content, 'form')) assert.ok('inert' in form, 'snapshot forms are inert')
    assert.doesNotMatch(html, /<script[^>]+src="https?:/i)
    assert.doesNotMatch(html, /hs_privacy_choice|hs_consent|AIza[\w-]{30}|-----BEGIN .*PRIVATE KEY-----/)
    const schemas = [...html.matchAll(/<script type="application\/ld\+json" data-useseo-schema>(.*?)<\/script>/g)].map(match => JSON.parse(match[1]))
    const authored = metadata.schema ? (Array.isArray(metadata.schema) ? metadata.schema : [metadata.schema]) : []
    assert.deepEqual(schemas, authored, 'all approved schema preserved exactly')
    const dates = []
    function validateSchema(value) {
      if (!value || typeof value !== 'object') return
      assert.ok(!('$$typeof' in value), 'no serialized React elements in schema')
      if (value['@context']) assert.equal(value['@context'], 'https://schema.org')
      for (const key of ['datePublished', 'dateModified']) {
        if (value[key]) {
          assert.match(value[key], /^\d{4}-\d{2}-\d{2}(?:T.*)?$/)
          assert.equal(new Date(value[key]).toISOString().slice(0, 10), value[key].slice(0, 10))
          dates.push({ key, value: value[key] })
        }
      }
      if (value.datePublished && value.dateModified) assert.ok(value.dateModified >= value.datePublished)
      if (value['@type'] === 'Answer') assert.equal(typeof value.text, 'string')
      Object.values(value).forEach(validateSchema)
    }
    for (const schema of schemas) {
      assert.ok(schema['@context'] && schema['@type'])
      validateSchema(schema)
    }
    row.structuredData = 'PASS'
    row.schemaTypes = schemas.map(schema => schema['@type'])
    row.schemaNote = schemas.length ? 'Valid JSON and checked fields; Google rich-result eligibility UNVERIFIED' : 'No authored schema; none invented'
    row.dates = dates
    if (page.route === '/blog/:slug') {
      const post = blogPosts.find(post => page.path === '/blog/' + post.slug)
      assert.equal(row.h1, post.title)
      assert.equal(schemas[0].datePublished, articleDate(post.date))
      assert.ok(!('dateModified' in schemas[0]), 'no invented modification date')
      for (const line of post.content.split('\n').filter(line => line.trim())) {
        assert.ok(text(content).includes(line.replace(/^## /, '').replace(/^\*\*|\*\*$/g, '')), 'original article wording present')
      }
    }
    row.bytes = Buffer.byteLength(html)
    row.gzipBytes = gzipSync(html).length
    row.sha256 = hash(html)
    row.result = 'PASS'
  })
}

test('all emitted internal links, styles, scripts and local images resolve', async () => {
  const destinations = new Set()
  for (const html of documents.values()) {
    for (const match of html.matchAll(/(?:href|src)="(\/[^"#]*)"/g)) destinations.add(decode(match[1]))
  }
  for (const path of destinations) {
    const response = await fetch(base + path, { redirect: 'manual' })
    assert.equal(response.status, 200, path)
    if (/\.(css|js)(?:\?|$)/.test(path)) assert.doesNotMatch(response.headers.get('content-type'), /text\/html/)
  }
})

test('unknown documents/assets return genuine local 404 and no canonical', async () => {
  for (const path of ['/seo-test-unknown-page', '/blog/seo-test-unknown-article', '/images/seo-test-missing.webp']) {
    const response = await fetch(base + path, { redirect: 'manual' })
    const html = await response.text()
    errors.push({ route: path, status: response.status, result: response.status === 404 ? 'PASS' : 'FAIL' })
    assert.equal(response.status, 404)
    assert.match(html, /data-not-found/)
    assert.equal(tags(html, 'link').filter(tag => tag.rel === 'canonical').length, 0)
    assert.equal((await fetch(base + path, { method: 'HEAD' })).status, 404)
    assert.equal(response.headers.get('location'), null)
  }
})

test('exact approved redirect inventory: query retention, one hop and generated-file exclusion', async () => {
  const expected = [
    ['/expeditions', '/experiences'], ['/packages', '/experiences'],
    ['/retreats/kumaon-wellness', '/retreats/panchachuli-wellness'],
    ['/retreats/panchakarma', '/retreats/borderlands-himalaya'], ['/index.html', '/'],
  ]
  assert.deepEqual(readRouting().redirects.map(rule => [rule.source, rule.destination]), expected)
  for (const [source, destination] of expected) {
    assert.ok(inventory.some(page => page.path === destination))
    if (source !== '/index.html') assert.ok(!existsSync('dist-prototype' + source + '/index.html'))
    const query = '?expedition=Adi%20Kailash&tag=a&tag=b&utm_source=stage2'
    for (const method of ['GET', 'HEAD']) {
      const response = await fetch(base + source + query, { redirect: 'manual', method })
      assert.equal(response.status, 308)
      assert.equal(response.headers.get('location'), destination + query)
      assert.equal((await fetch(base + destination + query, { redirect: 'manual', method })).status, 200)
    }
    redirects.push({ source, destination, status: 308, queryPreservation: 'PASS', chainOrLoop: false, result: 'PASS' })
  }
})

test('JSON-LD serialization cannot close its script; snapshot forms remain inert', () => {
  const html = makePrototypeHTML('<head></head><div id="root"></div>', {
    markup: '<form><button>Send</button></form>', metadata: {
      title: 'A < B', description: 'Description & more', canonical: site + '/',
      schema: { '@context': 'https://schema.org', '@type': 'Article', headline: '</script><script>alert(1)</script>' },
    },
  })
  assert.ok(html.includes('\\u003c/script>'))
  assert.ok(html.includes('<form inert="">'))
  assert.ok(!html.includes('<script>alert'))
})

test('article dates are deterministic calendar dates, with invalid values rejected', () => {
  for (const post of blogPosts) assert.match(articleDate(post.date), /^\d{4}-\d{2}-\d{2}$/)
  for (const value of ['February 30, 2025', 'Smarch 1, 2026', 'today', 'January 0, 2026']) {
    assert.throws(() => articleDate(value))
  }
})
