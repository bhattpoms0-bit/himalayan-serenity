import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { blogPosts } from '../src/data/blogPosts.js'

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
// Execute the production hook/effects against an isolated minimal head DOM.
// This verifies metadata lifecycle logic, not browser rendering or crawler behavior.
function runtime() {
  const nodes = [], cleanups = []
  const document = {
    title: '',
    head: { appendChild(el) { nodes.push(el); return el } },
    createElement(tag) {
      return { tag, attrs: {}, setAttribute(k, v) { this.attrs[k] = v },
        remove() { const i = nodes.indexOf(this); if (i >= 0) nodes.splice(i, 1) } }
    },
    querySelectorAll(selector) {
      const [, tag, attr, value] = selector.match(/^(\w+)\[([^=\]]+)(?:="([^"]*)")?\]$/)
      return nodes.filter(el => el.tag === tag && (value === undefined
        ? attr in el.attrs : (el.attrs[attr] ?? el[attr]) === value))
    },
    querySelector(selector) { return this.querySelectorAll(selector)[0] || null },
  }
  const window = { location: { pathname: '/' }, scrollTo() {} }
  const effect = fn => { const cleanup = fn(); if (cleanup) cleanups.push(cleanup) }
  const source = read('src/hooks/useSEO.js').replace(/^import .*\n/, '').replace('export function', 'function')
  const useSEO = new Function('useEffect', 'document', 'window', source + '\nreturn useSEO')(effect, document, window)
  for (const match of read('index.html').matchAll(/<(meta|link)\s+([^>]+)>/g)) {
    const el = document.createElement(match[1])
    for (const attr of match[2].matchAll(/([\w:-]+)="([^"]*)"/g)) { el.setAttribute(attr[1], attr[2]); if (attr[1] === 'content') el.content = attr[2] }
    document.head.appendChild(el)
  }
  return { document, window, useSEO, effect, nodes,
    cleanup() { cleanups.splice(0).reverse().forEach(fn => fn()) },
    meta(key, attr = 'name') { const el = document.querySelector(`meta[${attr}="${key}"]`); return el?.content ?? el?.attrs.content },
    mountBlog(slug) {
      window.location.pathname = '/blog/' + slug
      const source = read('src/pages/BlogPost.jsx')
      const body = source.slice(source.indexOf('  const { slug }'), source.indexOf('  if (!post)'))
      new Function('useParams', 'blogPosts', 'useSEO', body)(() => ({ slug }), blogPosts, useSEO)
    },
    mountILP() {
      const source = read('src/pages/blog/AdiKailashILPGuide.jsx')
      const body = source.slice(source.indexOf('  useEffect'), source.indexOf('  const sectionStyle'))
      new Function('useSEO', 'useEffect', 'document', 'window', body)(useSEO, effect, document, window)
    },
  }
}

for (const post of blogPosts) {
  test(`blog metadata: ${post.slug}, cleanup and next route`, () => {
    const r = runtime()
    // Repair duplicate canonical/social entries left by older page logic.
    const duplicate = r.document.createElement('link'); duplicate.setAttribute('rel', 'canonical'); r.document.head.appendChild(duplicate)
    r.mountBlog(post.slug)
    const url = 'https://www.himalayanserenitytravel.com/blog/' + post.slug
    assert.equal(r.document.querySelectorAll('link[rel="canonical"]').length, 1)
    assert.equal(r.document.querySelector('link[rel="canonical"]').attrs.href, url)
    assert.equal(r.document.title, post.metaTitle || post.title)
    assert.equal(r.meta('description'), post.metaDescription || post.excerpt)
    assert.equal(r.meta('og:url', 'property'), url)
    assert.equal(r.meta('twitter:url'), url)
    assert.equal(r.meta('twitter:title'), post.metaTitle || post.title)
    assert.equal(r.meta('twitter:description'), post.metaDescription || post.excerpt)
    assert.equal(r.meta('og:image', 'property'), new URL(post.image, url).href)
    assert.equal(r.meta('twitter:image'), new URL(post.image, url).href)
    assert.equal(r.meta('og:type', 'property'), 'article')
    const schemas = r.document.querySelectorAll('script[data-useseo-schema]')
    assert.equal(schemas.length, 1)
    assert.equal(JSON.parse(schemas[0].textContent).mainEntityOfPage['@id'], url)
    assert.doesNotMatch(schemas[0].textContent, /vercel\.app/)
    r.cleanup()
    assert.equal(r.document.querySelectorAll('script[data-useseo-schema]').length, 0)
    assert.equal(r.meta('og:type', 'property'), 'website')
    r.useSEO({ title: 'Contact', description: 'Plan a journey', canonical: 'https://www.himalayanserenitytravel.com/contact' })
    assert.equal(r.meta('twitter:title'), 'Contact')
    assert.equal(r.meta('og:url', 'property'), 'https://www.himalayanserenitytravel.com/contact')
    assert.notEqual(r.meta('twitter:image'), post.image)
  })
}

test('ILP direct load, StrictMode remount, article navigation and metadata cleanup', () => {
  const r = runtime()
  const keywords = r.meta('keywords')
  const geoRegion = r.meta('geo.region')
  for (let i = 0; i < 2; i++) {
    r.mountILP()
    const url = 'https://www.himalayanserenitytravel.com/blog/adi-kailash-ilp-guide-2026'
    assert.equal(r.document.querySelectorAll('link[rel="canonical"]').length, 1)
    assert.equal(r.document.querySelector('link[rel="canonical"]').attrs.href, url)
    assert.equal(r.meta('og:url', 'property'), url)
    assert.equal(r.meta('twitter:url'), url)
    assert.match(r.meta('twitter:title'), /Complete 2026 Guide/)
    assert.match(r.meta('twitter:description'), /SDM Dharchula/)
    assert.equal(r.document.querySelectorAll('script[data-useseo-schema]').length, 1)
    assert.equal(r.document.querySelectorAll('meta[name="geo.region"]').length, 1)
    r.cleanup()
    assert.equal(r.meta('keywords'), keywords)
    assert.equal(r.meta('geo.region'), geoRegion)
    assert.equal(r.document.querySelectorAll('script[data-useseo-schema]').length, 0)
  }
  for (const post of blogPosts.slice(0, 2)) {
    r.mountBlog(post.slug)
    assert.equal(r.document.querySelectorAll('script[data-useseo-schema]').length, 1)
    assert.equal(r.meta('og:url', 'property'), `https://www.himalayanserenitytravel.com/blog/${post.slug}`)
    r.cleanup()
  }
})
