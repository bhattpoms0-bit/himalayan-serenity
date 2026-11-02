import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { parse } from '@babel/parser'
import { transformSync } from 'esbuild'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { matchRoutes } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server.js'
import { blogPosts } from '../src/data/blogPosts.js'

const require = createRequire(import.meta.url)
const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const config = JSON.parse(read('vercel.json'))
const app = read('src/App.jsx')
const ast = parse(app, { sourceType: 'module', plugins: ['jsx'] })
const routeNodes = []
function visit(node) {
  if (!node || typeof node !== 'object') return
  if (node.type === 'JSXElement' && node.openingElement.name.name === 'Route') routeNodes.push(node)
  for (const value of Object.values(node)) {
    for (const child of Array.isArray(value) ? value : [value]) visit(child)
  }
}
visit(ast)
const routePath = node => node.openingElement.attributes.find(a => a.name?.name === 'path').value.value
const routes = routeNodes.map(node => ({ path: routePath(node) }))
const expected = [
  ['/expeditions', '/experiences'],
  ['/packages', '/experiences'],
  ['/retreats/kumaon-wellness', '/retreats/panchachuli-wellness'],
  ['/retreats/panchakarma', '/retreats/borderlands-himalaya'],
  ['/index.html', '/'],
]

// Configuration contract checks, not real HTTP/Vercel edge tests.
test('only the five approved permanent redirects; destinations resolve without chains', () => {
  assert.equal(config.redirects.length, expected.length)
  const sources = new Set(config.redirects.map(r => r.source))
  assert.equal(sources.size, expected.length)
  for (const [source, destination] of expected) {
    const rule = config.redirects.find(r => r.source === source)
    assert.deepEqual(rule, { source, destination, permanent: true }) // Vercel permanent:true => 308
    assert.ok(!sources.has(destination), 'destination must not redirect again')
    assert.ok(routes.some(r => r.path === destination), 'destination must be a valid React route')
    assert.ok(!source.includes('*') && !source.includes('?'), 'exact path, independent of query')
    assert.ok(!destination.includes('?'), 'do not replace incoming query parameters')
    const node = routeNodes.find(r => routePath(r) === source)
    assert.match(app.slice(node.start, node.end), new RegExp(`LegacyRedirect to="${destination}"`))
  }
  assert.deepEqual(config.rewrites, [{ source: '/(.*)', destination: '/index.html' }])
})

const legacyNode = ast.program.body.find(n => n.type === 'FunctionDeclaration' && n.id.name === 'LegacyRedirect')
const legacyCode = transformSync(app.slice(legacyNode.start, legacyNode.end), { loader: 'jsx', jsxFactory: 'React.createElement' }).code
for (const [source, destination] of expected) {
  test(`client redirect preserves query encoding, repeated keys and hash: ${source}`, () => {
    for (const search of ['', '?utm_source=legacy&expedition=Adi%20Kailash&tag=a&tag=b&privacy=off']) {
      const hash = '#consultation'
      const Navigate = () => null
      const redirect = new Function('React', 'useLocation', 'Navigate', legacyCode + '\nreturn LegacyRedirect')(
        React, () => ({ search, hash }), Navigate,
      )
      const result = redirect({ to: destination })
      assert.equal(result.type, Navigate)
      assert.equal(result.props.to, destination + search + hash)
      assert.equal(result.props.replace, true)
    }
  })
}

test('valid concrete routes and article URLs take precedence over the Not Found fallback', () => {
  for (const route of routes.filter(r => r.path !== '*' && !r.path.includes(':'))) {
    assert.equal(matchRoutes(routes, route.path)[0].route.path, route.path)
  }
  for (const post of blogPosts) {
    assert.notEqual(matchRoutes(routes, '/blog/' + post.slug)[0].route.path, '*')
  }
  for (const path of ['/missing-page', '/packages/unknown', '/retreats/unknown', '/unknown/nested']) {
    assert.equal(matchRoutes(routes, path)[0].route.path, '*')
  }
  const fallback = routeNodes.find(n => routePath(n) === '*')
  assert.match(app.slice(fallback.start, fallback.end), /<NotFound/)
  assert.equal(matchRoutes(routes, '/contact?expedition=Adi%20Kailash')[0].route.path, '/contact')
})

test('sitemap has 31 unique production URLs, every article, and no legacy entries', () => {
  const xml = read('public/sitemap.xml')
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
  assert.equal(urls.length, 31)
  assert.equal(new Set(urls).size, urls.length)
  for (const url of urls) {
    const parsed = new URL(url)
    assert.equal(parsed.origin, 'https://www.himalayanserenitytravel.com')
    assert.equal(parsed.search, '')
    assert.equal(parsed.hash, '')
    const path = parsed.pathname
    assert.ok(!expected.some(([source]) => source === path))
    assert.ok(routes.some(r => r.path === path) || blogPosts.some(p => path === '/blog/' + p.slug))
  }
  for (const post of blogPosts) {
    assert.ok(urls.includes('https://www.himalayanserenitytravel.com/blog/' + post.slug))
    // Generic article routes must contain actual content, not an empty placeholder.
    if (!routes.some(r => r.path === '/blog/' + post.slug)) assert.ok(post.content.trim().length > 100)
  }
  for (const slug of ['adi-kailash-complete-guide-2024', 'om-parvat-natural-om-symbol',
    'altitude-sickness-prevention-himalayan-trek', 'what-to-pack-himalayan-spiritual-journey',
    'best-time-visit-adi-kailash-season-guide']) {
    const entry = xml.match(new RegExp(`<url>\\s*<loc>https://www\\.himalayanserenitytravel\\.com/blog/${slug}</loc>[\\s\\S]*?</url>`))[0]
    assert.doesNotMatch(entry, /<lastmod>/, 'no invented modification dates')
  }
})

function loadComponent(path, mocks = {}) {
  const code = transformSync(read(path), { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', code)(id => {
    const mock = mocks[id]
    return mock && 'default' in mock ? { __esModule: true, ...mock } : mock ?? require(id)
  }, module, module.exports)
  return module.exports.default
}
const NotFound = loadComponent('src/pages/NotFound.jsx', {
  '../components/Navbar': { default: () => null },
  '../components/Footer': { default: () => null },
})
test('Not Found renders branded recovery links without submitting or redirecting', () => {
  const html = renderToStaticMarkup(React.createElement(StaticRouter, { location: '/missing' }, React.createElement(NotFound)))
  assert.match(html, /404/)
  assert.match(html, /<main/)
  assert.match(html, /<h1/)
  assert.match(html, /bg-brand-dark/)
  for (const destination of ['/', '/blog', '/contact', '/experiences', '/international-retreats']) {
    assert.ok(html.includes(`href="${destination}"`))
  }
  assert.doesNotMatch(html, /<form|http-equiv="refresh"/)
})

test('unknown blog slug renders the same Not Found page', () => {
  const BlogPost = loadComponent('src/pages/BlogPost.jsx', {
    '../hooks/useSEO': { useSEO() {} },
    'react-router-dom': { useParams: () => ({ slug: 'missing-article' }) },
    '../components/Navbar': { default: () => null },
    '../components/Footer': { default: () => null },
    './NotFound': { default: NotFound },
    '../data/blogPosts': { blogPosts },
  })
  assert.equal(BlogPost().type, NotFound)
})
