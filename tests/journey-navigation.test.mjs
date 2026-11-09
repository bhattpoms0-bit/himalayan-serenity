// Semantic rendering and route checks. Native pointer/touch/focus geometry still needs browser QA.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import { transformSync } from 'esbuild'
import { parse } from '@babel/parser'
import { readRouting } from '../scripts/prototype-routes.mjs'

const require = createRequire(import.meta.url)
const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const destinations = [
  ['Adi Kailash Expedition', '/packages/adi-kailash-expedition', 'src/pages/AdiKailashExpedition.jsx'],
  ['Panchachuli Trekking Expedition', '/packages/panchachuli-expedition', 'src/pages/PanchachuliExpedition.jsx'],
  ['Eastern Kumaon Cinematic Expedition', '/packages/cinematic-expedition', 'src/pages/CinematicExpedition.jsx'],
  ['Eastern Kumaon Wilderness Expedition', '/packages/wilderness-expedition', 'src/pages/WildernessExpedition.jsx'],
  ['Women-Only Expedition (Darma Valley)', '/packages/darma-valley-womens-retreat', 'src/pages/DarmaValleyWomensRetreat.jsx'],
  ['Himalayan Photography Expedition', '/packages/photography-expedition', 'src/pages/PhotographyExpedition.jsx'],
]
function render(file) {
  const code = transformSync(read(file), { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code
  const module = { exports: {} }
  new Function('require', 'module', 'exports', code)(id => {
    if (id === 'framer-motion') return { useInView: () => true, motion: { div: ({ initial, animate, transition, whileHover, ...props }) => React.createElement('div', props) } }
    if (id.includes('/components/')) return { __esModule: true, default: () => null }
    if (id.includes('/hooks/useSEO')) return { useSEO() {} }
    if (id.endsWith('.css')) return {}
    return require(id)
  }, module, module.exports)
  return renderToStaticMarkup(React.createElement(StaticRouter, { location: '/' }, React.createElement(module.exports.default)))
}
const anchors = html => [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].map(m => ({
  attributes: m[1], content: m[2], href: /\bhref="([^"]+)"/.exec(m[1])?.[1],
}))

test('homepage featured journeys render native detail and separate booking links', () => {
  const html = render('src/components/Packages.jsx'), links = anchors(html)
  for (const [title, href] of destinations.slice(0, 2)) {
    const detail = links.filter(a => a.href === href)
    assert.equal(detail.length, 1)
    assert.ok(detail[0].content.includes(title))
    assert.ok(detail[0].attributes.includes(`aria-label="Explore ${title}"`))
    assert.match(detail[0].attributes, /after:absolute after:inset-0/)
    assert.match(detail[0].attributes, /focus-visible:after:outline-brand-gold/)
    const booking = links.filter(a => a.href === '/contact?expedition=' + encodeURIComponent(title))
    assert.equal(booking.length, 1)
    assert.match(booking[0].attributes, /relative z-10/)
    assert.match(booking[0].content, /Book This Expedition/)
  }
  assert.equal(links.filter(a => a.href === '/experiences').length, 1)
  let anchorDepth = 0
  for (const [tag] of html.matchAll(/<\/?a\b[^>]*>/g)) {
    anchorDepth += tag.startsWith('</') ? -1 : 1
    assert.ok(anchorDepth >= 0 && anchorDepth <= 1, 'no nested anchors')
  }
  assert.equal(anchorDepth, 0)
  const source = read('src/components/Packages.jsx')
  assert.doesNotMatch(source, /useNavigate|navigate\(|onClick=|onKeyDown=/)
  assert.match(html, /class="relative group cursor-pointer rounded-2xl overflow-hidden"/)
})

test('all six experience cards have one full-content semantic link each', () => {
  const html = render('src/pages/Experiences.jsx')
  const articles = [...html.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)].map(m => m[1])
  assert.equal(articles.length, destinations.length)
  for (const [index, [title, href]] of destinations.entries()) {
    const links = anchors(articles[index])
    assert.equal(links.length, 1)
    assert.equal(links[0].href, href)
    assert.ok(links[0].attributes.includes(`aria-label="Explore ${title}"`))
    assert.match(links[0].content, /<img\b/)
    assert.ok(links[0].content.includes(title))
    assert.match(links[0].content, /Explore journey/)
    assert.doesNotMatch(links[0].content, /<a\b|<button\b/)
    assert.match(links[0].attributes, /focus-visible:outline-brand-gold/)
    assert.doesNotMatch(links[0].attributes, /tabindex="-1"|role="button"/)
  }
  assert.doesNotMatch(read('src/pages/Experiences.jsx'), /preventDefault|stopPropagation|onKeyDown=/)
})

for (const [title, href, file] of destinations) test(`${title}: existing direct route and page`, () => {
  const routing = readRouting()
  assert.equal(routing.isValidPage(href), true)
  assert.equal(routing.entries[href], file)
  assert.equal(routing.redirects.some(rule => rule.source === href), false)
  assert.ok(read(file).includes('export default'))
})

function walk(node, visit) {
  if (!node || typeof node !== 'object') return
  visit(node)
  for (const value of Object.values(node)) for (const child of Array.isArray(value) ? value : [value]) walk(child, visit)
}
test('Panchachuli team CTA keeps baseline destination and behavior with local readable states', () => {
  const source = read('src/pages/retreats/KumaonWellness.jsx')
  const ast = parse(source, { sourceType: 'module', plugins: ['jsx'] })
  let cta
  walk(ast, node => {
    if (node.type === 'JSXElement' && node.children.some(child => child.type === 'JSXText' && child.value.includes('Speak With Our Team'))) cta = node.openingElement
  })
  assert.ok(cta)
  const attributes = Object.fromEntries(cta.attributes.filter(a => a.name).map(a => [a.name.name, a.value]))
  assert.equal(attributes.href.value, 'https://wa.me/919084642557')
  assert.equal(attributes.target.value, '_blank')
  assert.equal(attributes.rel.value, 'noopener noreferrer')
  assert.equal(attributes.onClick, undefined)
  assert.equal(attributes.onAuxClick, undefined)
  const classes = attributes.className.value
  for (const token of ['rounded-full', 'px-6', 'py-3', 'text-sm', 'font-medium', 'text-brand-cream', 'bg-brand-dark',
    'hover:text-brand-gold-light', 'hover:bg-brand-dark-2', 'active:text-brand-cream', 'active:bg-brand-dark-3', 'focus-visible:outline-brand-gold']) {
    assert.ok(classes.split(' ').includes(token), token)
  }
})

function luminance(hex) {
  const channels = hex.match(/[0-9a-f]{2}/gi).map(v => parseInt(v, 16) / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}
test('CTA text and focus colors have measurable contrast on opaque local backgrounds', () => {
  const source = read('tailwind.config.js')
  const color = name => new RegExp(`(?:'${name}'|${name}):\\s*'(#[0-9a-f]{6})'`, 'i').exec(source)?.[1]
  for (const [text, background, minimum] of [
    ['cream', 'dark', 4.5], ['gold-light', 'dark-2', 4.5], ['cream', 'dark-3', 4.5], ['gold', 'dark', 3],
  ]) {
    const values = [luminance(color(text)), luminance(color(background))].sort((a, b) => b - a)
    const ratio = (values[0] + 0.05) / (values[1] + 0.05)
    assert.ok(ratio >= minimum, `${text}/${background}: ${ratio.toFixed(2)}:1`)
  }
})
