import { blogPosts } from '../src/data/blogPosts.js'
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { transformSync } from 'esbuild'
import { parse } from '@babel/parser'

const require = createRequire(import.meta.url)
const baseline = 'b7b393aa678835938484a19a642c660e9808c42c'
const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8').replace(/\r\n/g, '\n')
const old = path => execFileSync('git', ['-c', `safe.directory=${process.cwd().replaceAll('\\', '/')}`, 'show', `${baseline}:${path}`], { encoding: 'utf8' }).replace(/\r\n/g, '\n')
const packagePath = 'src/pages/AdiKailashExpedition.jsx'
const ilpPath = 'src/pages/blog/AdiKailashILPGuide.jsx'
const comparisonPath = 'src/pages/blog/AdiKailashVsKailashMansarovar.jsx'
const ast = path => parse(read(path), { sourceType: 'module', plugins: ['jsx'] })
function walk(node, visit) {
  if (!node || typeof node !== 'object') return
  visit(node)
  for (const child of Object.values(node)) {
    if (Array.isArray(child)) child.forEach(n => walk(n, visit))
    else if (child && typeof child === 'object') walk(child, visit)
  }
}
function declaration(source, name) {
  let result
  walk(parse(source, { sourceType: 'module', plugins: ['jsx'] }), node => {
    if (node.type === 'VariableDeclarator' && node.id.name === name) result = source.slice(node.init.start, node.init.end)
  })
  assert.ok(result, name)
  return result
}
function renderPage(path) {
  let metadata
  const module = { exports: {} }
  const mockRequire = name => {
    if (name === 'react') return { ...React, useEffect() {} }
    if (name.endsWith('/hooks/useSEO')) return { useSEO(value) { metadata = value } }
    if (name.endsWith('/components/Navbar') || name.endsWith('/components/Footer')) return { __esModule: true, default: () => null }
    if (name === 'react-router-dom') return { Link: ({ to, children, ...props }) => React.createElement('a', { ...props, href: to }, children) }
    return require(name)
  }
  const code = transformSync(read(path), { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code
  new Function('require', 'module', 'exports', code)(mockRequire, module, module.exports)
  return { html: renderToStaticMarkup(React.createElement(module.exports.default)), metadata: () => metadata }
}
const plain = value => value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim()

test('owner-advised joining-point prices, durations, meal plans and local guides are exact', () => {
  const cards = []
  walk(ast(packagePath), node => {
    if (node.type !== 'ObjectExpression') return
    const props = Object.fromEntries(node.properties.filter(p => p.type === 'ObjectProperty').map(p => [p.key.name, p.value]))
    if (props.label?.value?.startsWith('From ')) cards.push({ label: props.label.value, price: props.price.value, items: props.items.elements.map(n => n.value) })
  })
  assert.deepEqual(cards, [
    { label: 'From Pithoragarh', price: '₹15,000', items: ['3 days', 'Transport', 'Accommodation', 'Permit assistance', 'Local guide', 'Meals excluded'] },
    { label: 'From Kathgodam', price: '₹24,999', items: ['5 days / 4 nights', 'Transport', 'Accommodation', 'Permit assistance', 'Local guide', 'Breakfast only (CP); lunch and dinner excluded'] },
    { label: 'From Delhi', price: '₹29,999', items: ['5 days / 4 nights', 'Transport', 'Accommodation', 'Permit assistance', 'Local guide', 'Breakfast only (CP); lunch and dinner excluded'] },
  ])
  assert.doesNotMatch(read(packagePath), /Daily breakfast & dinner|Meals not included|Inner Line Permit included|6 Days \/ 5 Nights|6-day expedition route map/)
})

test('all original day narratives and travel data persist; no shorter itinerary is invented', () => {
  for (const name of ['itinerary', 'altitudeChart', 'routeStops', 'packing']) assert.equal(declaration(read(packagePath), name), declaration(old(packagePath), name), name)
  assert.match(read(packagePath), /not a confirmed day-wise itinerary for the 3-day Pithoragarh or 5-day \/ 4-night Kathgodam and Delhi options/)
  assert.match(read(packagePath), /stops, overnight stays and joining and return arrangements/)
})

test('package access wording does not guarantee seasons, closure dates, permits or views', () => {
  const source = read(packagePath)
  assert.doesNotMatch(source, /Best Season: May to October|Route closes November onwards|Plan your expedition between May and October only|clear skies, Adi Kailash approach open|expedition not possible/)
  assert.match(source, /approval and mountain views are not guaranteed/)
  assert.match(source, /Confirm current restrictions; no fixed closure date is promised/)
})

test('ILP visible FAQs and structured answers use the same data, preserving dates and publisher logo', () => {
  const page = renderPage(ilpPath), schema = page.metadata().schema
  assert.equal(schema.datePublished, '2026-05-25')
  assert.equal(schema.dateModified, '2026-05-25')
  assert.equal(schema.publisher.logo.url, 'https://www.himalayanserenitytravel.com/logo.png')
  assert.equal(schema.mainEntity.length, 5)
  for (const faq of schema.mainEntity) {
    assert.ok(plain(page.html).includes(faq.name))
    assert.ok(plain(page.html).includes(faq.acceptedAnswer.text))
  }
  assert.equal(page.metadata().canonical, 'https://www.himalayanserenitytravel.com/blog/adi-kailash-ilp-guide-2026')
  assert.equal((page.html.match(/<h1\b/g) || []).length, 1)
})

test('ILP guide removes invented procedures, timing, fees, jurisdiction and operator guarantees', () => {
  const source = read(ilpPath)
  assert.doesNotMatch(source, /pass\.pithoragarh\.online|3–7 working days|10–14 days|minimum 4|SDM connections|speeds up|non-negotiable|without exception|two authorized SDM offices|We handle your ILP — completely|You just show up/)
  assert.match(source, /directory alone does not establish that both issue the same permit/)
  assert.match(source, /No fee, payment gateway or annual revision is certified/)
  assert.match(source, /Foreign nationals and OCI cardholders should obtain current, route-specific eligibility/)
  assert.match(source, /https:\/\/pithoragarh.nic.in\/contact-directory\//)
})

test('comparison states 2026 closure and distinguishes future government KMY from company packages', () => {
  const page = renderPage(comparisonPath), source = read(comparisonPath)
  assert.equal(page.metadata().canonical, 'https://www.himalayanserenitytravel.com/blog/adi-kailash-vs-kailash-mansarovar')
  assert.equal((page.html.match(/<h1\b/g) || []).length, 1)
  assert.match(plain(page.html), /2026 Yatra has been completed and its online portal is closed/)
  assert.match(source, /government-organised Kailash Manasarovar Yatra is separate from Himalayan Serenity Travel/)
  assert.doesNotMatch(source, /Verified Facts Only|Complete Verified Guide|Both are open|2026 is open|✓ Open|BMI ≤|BMI of 25|18–70|All payments made earlier will be forfeited|Medical Examination in Delhi/)
  assert.match(source, /no current registration is offered by this page/)
  assert.match(source, /relevant official programme/)
  assert.equal((source.match(/className="grid grid-cols-1 sm:grid-cols-2"/g) || []).length, 2, 'comparison card pairs stack at mobile widths without changing shared styles')
})

test('wellness hierarchy, approved prices, routes, dates, provisional notices and programme data remain unchanged', () => {
  for (const path of ['src/pages/Home.jsx', 'src/pages/InternationalRetreats.jsx', 'src/pages/retreats/KumaonWellness.jsx', 'src/pages/retreats/WomensRetreat.jsx', 'src/data/retreats.js', 'src/components/RetreatDetails.jsx', 'src/components/Hero.jsx']) assert.equal(read(path), old(path), path)
  assert.match(read('src/data/retreats.js'), /Provisional starting price, subject to final supplier costing/)
})

test('published C2 article copy, hero, contextual-link renderer and all shared components stay intact', () => {
  for (const path of ['src/pages/BlogPost.jsx', 'src/components/GlobalNav.jsx', 'src/hooks/useSEO.js', 'src/App.jsx', 'public/favicon.svg']) assert.equal(read(path), old(path), path)
})

test('only the two corrected article listing records differ; metadata matches their dedicated pages and dates persist', async () => {
  const { blogPosts: published } = await import('data:text/javascript;base64,' + Buffer.from(old('src/data/blogPosts.js')).toString('base64'))
  const corrected = ['adi-kailash-ilp-guide-2026', 'adi-kailash-vs-kailash-mansarovar']
  assert.deepEqual(blogPosts.filter(p => !corrected.includes(p.slug)), published.filter(p => !corrected.includes(p.slug)))
  for (const [slug, path, date] of [[corrected[0], ilpPath, 'May 25, 2026'], [corrected[1], comparisonPath, 'May 20, 2026']]) {
    const post = blogPosts.find(p => p.slug === slug), metadata = renderPage(path).metadata()
    assert.equal(post.metaTitle, metadata.title)
    assert.equal(post.metaDescription, metadata.description)
    assert.equal(post.date, date)
    assert.doesNotMatch(post.excerpt, /verified|Everything about/)
  }
})
