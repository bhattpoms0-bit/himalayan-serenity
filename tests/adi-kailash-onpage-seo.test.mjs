// Exercise actual page elements and handlers; native keyboard/layout need browser QA.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { createRequire } from 'node:module'
import { transformSync } from 'esbuild'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server.js'
import { parse } from '@babel/parser'

const require = createRequire(import.meta.url)
const source = readFileSync(new URL('../src/pages/AdiKailashExpedition.jsx', import.meta.url), 'utf8').replace(/\r\n/g, '\n')
// Test-only access follows existing repository tests; no production exports added.
const code = transformSync(source + '\nexport { itinerary, inclusions, exclusions, packing };', { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code
// Exact owner-authorised follow-up substitutions; every other byte remains fingerprint-protected.
const packageCorrections = [
  {
    "before": "Daily breakfast & dinner",
    "after": "Meal plan varies by joining point; see package options",
    "count": 1
  },
  {
    "before": "Experienced expedition coordinator",
    "after": "Experienced expedition coordinator and local guide",
    "count": 1
  },
  {
    "before": "Lunches & beverages",
    "after": "Lunch, dinner & beverages; all meals on the Pithoragarh option",
    "count": 1
  },
  {
    "before": "Best season – clear skies, Adi Kailash approach open",
    "after": "Check current weather, road access and permit requirements",
    "count": 1
  },
  {
    "before": "Post-monsoon clarity, excellent photography",
    "after": "Visibility and access remain dependent on current conditions",
    "count": 1
  },
  {
    "before": "High passes close – expedition not possible",
    "after": "Confirm current restrictions; no fixed closure date is promised",
    "count": 1
  },
  {
    "before": "Best Season: May to October",
    "after": "Seasonal planning: confirm conditions before travel",
    "count": 1
  },
  {
    "before": "⚠️ Important – Route closes November onwards due to snowfall and permit restrictions. Plan your expedition between May and October only.",
    "after": "⚠️ Weather, road conditions and official restrictions can affect access at any time. Confirm current arrangements and permit requirements before booking; approval and mountain views are not guaranteed.",
    "count": 1
  },
  {
    "before": "Minimum 6 people · Transport, accommodation, permit assistance &amp; guide included · Meals not included",
    "after": "Minimum 6 people · Transport, accommodation, permit assistance &amp; local guide included · Meal plan and duration depend on your joining point",
    "count": 1
  },
  {
    "before": "items: [\"Transport\", \"Accommodation\", \"Permit assistance\"],",
    "after": "items: [\"3 days\", \"Transport\", \"Accommodation\", \"Permit assistance\", \"Local guide\", \"Meals excluded\"],",
    "count": 1
  },
  {
    "before": "items: [\"Transport\", \"Accommodation\", \"Permit assistance\", \"Guide\"],",
    "after": "items: [\"5 days / 4 nights\", \"Transport\", \"Accommodation\", \"Permit assistance\", \"Local guide\", \"Breakfast only (CP); lunch and dinner excluded\"],",
    "count": 2
  },
  {
    "before": ">Inner Line Permit included</Link>",
    "after": ">Inner Line Permit assistance</Link>",
    "count": 1
  },
  {
    "before": "          <div className=\"ak-itinerary-wrap\">",
    "after": "          <p data-itinerary-scope-note style={{ color: muted, lineHeight: 1.8, marginBottom: 24 }}>The detailed Day 0–Day 6 route below is retained for reference. It is not a confirmed day-wise itinerary for the 3-day Pithoragarh or 5-day / 4-night Kathgodam and Delhi options. Ask for the stops, overnight stays and joining and return arrangements for your chosen option before booking.</p>\n\n          <div className=\"ak-itinerary-wrap\">",
    "count": 1
  },
  {
    "before": "6 Days / 5 Nights",
    "after": "3 or 5 days",
    "count": 2
  },
  {
    "before": "Himalayan Serenity Travel Adi Kailash Om Parvat 6-day expedition route map",
    "after": "Himalayan Serenity Travel Adi Kailash Om Parvat route map for reference",
    "count": 1
  }
]
const restorePublishedPackage = value => packageCorrections.reduceRight((text, change) => text.replaceAll(change.after, change.before), value)
const digest = value => createHash('sha256').update(value).digest('hex')
const title = 'Adi Kailash & Om Parvat Yatra | Himalayan Serenity Travel'
const description = 'Explore the Adi Kailash and Om Parvat itinerary in Kumaon, Uttarakhand. Ask our Pithoragarh team about joining points, permit assistance and a quotation.'
const canonical = 'https://www.himalayanserenitytravel.com/packages/adi-kailash-expedition'
const sectionHeadings = ['Expedition Route', 'Best Travel Season', 'Day by Day Itinerary', 'Package Details', 'Group Package Prices', 'Altitude Profile', 'Travel Access Information', 'Expedition Safety']
const dayTitles = ['Overnight Departure from Delhi', 'Arrival in Pithoragarh', 'Pithoragarh to Dharchula', 'Adi Kailash Darshan Expedition', 'Om Parvat & Lipulekh Viewpoint', 'Kumaon Spiritual Temple Circuit', 'Return to Delhi']
const detailNames = ['inclusions', 'exclusions', 'packing']
const decode = html => html.replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"')
const text = html => decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()
const nodes = value => !value || typeof value !== 'object' ? [] : Array.isArray(value) ? value.flatMap(nodes) : [value, ...nodes(value.props?.children)]
const normalizeHeadings = value => value.replace(/<h2 (style=\{\{[^\n]+\}\})>([^<]+)<\/h2>/g, (all, style, label) => sectionHeadings.includes(label) ? `<div ${style}>${label}</div>` : all)
// C1 permits only this exact additional block in the protected season section.
// Remove it before comparing the original B1 fingerprint; do not rebaseline.
const seasonLinkSource = `          <p style={{ margin: 0, fontSize: "clamp(0.8rem,1.5vw,0.85rem)", lineHeight: 1.7 }}>
            <Link to="/blog/best-time-visit-adi-kailash-season-guide" style={{ color: gold, textDecoration: "underline" }} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold">Adi Kailash seasonal travel guide</Link>
          </p>
`

function mount() {
  const state = [], module = { exports: {} }
  let cursor = 0, tree, metadata
  new Function('require', 'module', 'exports', code)(id => {
    if (id === 'react') return {
      useEffect() {},
      useState(initial) {
        const index = cursor++
        if (!(index in state)) state[index] = initial
        return [state[index], next => { state[index] = typeof next === 'function' ? next(state[index]) : next }]
      },
    }
    if (id === '../hooks/useSEO') return { useSEO(value) { metadata = value } }
    if (id === '../utils/whatsapp') return { openWhatsApp() { throw Error('Tests must not activate WhatsApp') } }
    return require(id)
  }, module, module.exports)
  const render = () => { cursor = 0; tree = module.exports.default() }
  render()
  const all = () => nodes(tree)
  const panel = id => all().find(node => node.props?.id === id)
  const html = element => renderToStaticMarkup(React.createElement(StaticRouter, { location: '/packages/adi-kailash-expedition' }, element || tree))
  return { all, panel, html, data: module.exports, metadata: () => metadata,
    click(id) { const button = panel(id); assert.equal(button.type, 'button'); button.props.onClick(); render() },
  }
}

test('approved metadata, H1, hero H2 and eight section H2 labels retain their typography', () => {
  const app = mount(), metadata = app.metadata()
  assert.equal(metadata.title, title)
  assert.equal(metadata.description, description)
  assert.equal(metadata.canonical, canonical)
  const headings = app.all().filter(node => /^h[123]$/.test(node.type))
  assert.deepEqual(headings.filter(n => n.type === 'h1').map(n => text(app.html(n))), ['Adi Kailash & Om Parvat Yatra'])
  assert.ok(headings.some(n => n.type === 'h2' && text(app.html(n)) === 'Small-group pilgrimage in Kumaon, Uttarakhand'))
  sectionHeadings.forEach((label, i) => {
    const matches = headings.filter(n => n.type === 'h2' && text(app.html(n)) === label)
    assert.equal(matches.length, 1, label)
    assert.deepEqual(matches[0].props.style, { fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: [28, 32, 32, 32, 10, 32, 32, 32][i] })
  })
})

test('only exact approved package corrections differ; remaining baseline data, images, styles and enquiry code stay fingerprint-protected', () => {
  // Fingerprints taken from verified main 20d738cb, before B1 implementation.
  assert.equal(digest(restorePublishedPackage(source.slice(0, source.indexOf('const ADI_KAILASH_SCHEMAS')))), '67f329420cde78ea704f84a4af4d7173fe167da94f10c56b32efc1b44fa423db')
  assert.equal(digest(source.slice(source.indexOf('  // Preload'), source.indexOf('\n  return (\n'))), '471122e7da5b14a689e10656acd79afa65fbe6fdd38b3eaff00cb5c5c2714ac1')
  assert.equal(source.split(seasonLinkSource).length - 1, 1, 'only the exact approved season link block is allowed')
  assert.equal(digest(normalizeHeadings(restorePublishedPackage(source.slice(source.indexOf('        {/* EXPEDITION ROUTE */}'), source.indexOf('        {/* ITINERARY */}')).replace(seasonLinkSource, '')))), 'f06b78844fd4fd9178a6e37b0f49744a9b7feff0a3ef60ba17638d7b8f6c4dce')
  assert.equal(digest(normalizeHeadings(restorePublishedPackage(source.slice(source.indexOf('        {/* GROUP PRICING */}'))))), 'b4126e590a9238566e3c3a0811945ec7e54a1ad1fcc97410dfd24101a67931b8')
})

test('only the invisible package FAQ schema is removed; TouristTrip is byte-for-byte preserved', () => {
  const app = mount(), ast = parse(source, { sourceType: 'module', plugins: ['jsx'] })
  const declaration = ast.program.body.find(n => n.type === 'VariableDeclaration' && n.declarations[0].id.name === 'ADI_KAILASH_SCHEMAS')
  const trip = declaration.declarations[0].init.elements
  assert.equal(trip.length, 1)
  assert.equal(digest(source.slice(trip[0].start, trip[0].end)), 'ba9dee3699ac2dfbc64f7b2211899b71d137f92ad1f94657bb6991539a2f9008')
  assert.deepEqual(app.metadata().schema.map(s => s['@type']), ['TouristTrip'])
  assert.doesNotMatch(source, /FAQPage/)
})

function checkDayBodies(app) {
  assert.deepEqual(app.data.itinerary.map(item => item.day), Array.from({ length: 7 }, (_, i) => `Day ${i}`))
  assert.deepEqual(app.data.itinerary.map(item => item.title), dayTitles)
  assert.equal(app.all().filter(n => /^ak-day-\d-panel$/.test(n.props?.id)).length, 7)
  app.data.itinerary.forEach((item, i) => {
    const panel = app.panel(`ak-day-${i}-panel`), plain = text(app.html(panel))
    const expected = [item.day, item.title, item.subtitle]
    if (item.altitude) expected.push(`⛰️ ${item.altitude}`)
    expected.push(item.description)
    if (item.keyDestinations) expected.push('Key Destinations', ...item.keyDestinations)
    expected.push(...item.experiences)
    if (item.note) expected.push(`⚠️ ${item.note}`)
    if (item.stay) expected.push(`🏨 Overnight: ${item.stay}`)
    assert.equal(plain, expected.join(' '), item.day)
    const images = nodes(panel).filter(n => n.type === 'img')
    assert.equal(images.length, item.image ? 1 : 0)
    if (item.image) {
      assert.equal(images[0].props.src, item.image)
      assert.equal(images[0].props.alt, item.imageAlt)
      assert.equal(images[0].props.loading, 'lazy')
    }
    assert.equal(nodes(panel).find(n => n.type === 'h3').props.children, item.title)
  })
}

function checkDetails(app) {
  assert.equal(app.all().filter(n => /^ak-details-\w+-panel$/.test(n.props?.id)).length, 3)
  for (const name of detailNames) {
    const items = app.data[name], panel = app.panel(`ak-details-${name}-panel`)
    assert.equal(items.length, 8)
    const originalItems = items.map(item => `${name === 'exclusions' ? '✗' : '✓'} ${item}`).join(' ')
    const grid = nodes(panel).find(n => n.props?.className === 'ak-inclusions-grid')
    assert.equal(text(app.html(grid)), originalItems, 'all original items, order and glyphs remain exact')
    assert.equal(text(app.html(panel)), originalItems + (name === 'packing' ? ' Himalayan expedition packing guide' : ''))
    const links = nodes(panel).filter(n => n.props?.to)
    assert.equal(links.length, name === 'packing' ? 1 : 0)
    if (name === 'packing') {
      assert.equal(links[0].props.to, '/blog/what-to-pack-himalayan-spiritual-journey')
      assert.equal(links[0].props.children, 'Himalayan expedition packing guide')
    }
    const spans = nodes(panel).filter(n => n.type === 'span')
    spans.forEach((span, i) => assert.equal(span.props.style.color, name === 'exclusions' ? '#7a7068' : i % 2 === 0 ? '#c9a96e' : '#b5a898'))
    assert.equal(nodes(panel).find(n => n.props?.className === 'ak-inclusions-grid').props.children.length, 8)
  }
}

test('C1 package reading links are unique, contextual and keyboard focusable', () => {
  const app = mount()
  for (const [to, label] of [
    ['/blog/best-time-visit-adi-kailash-season-guide', 'Adi Kailash seasonal travel guide'],
    ['/blog/what-to-pack-himalayan-spiritual-journey', 'Himalayan expedition packing guide'],
  ]) {
    const links = app.all().filter(n => n.props?.to === to)
    assert.equal(links.length, 1)
    assert.equal(links[0].props.children, label)
    assert.match(links[0].props.className, /focus-visible:outline/)
    assert.equal(links[0].props.tabIndex, undefined)
    assert.equal(links[0].props.onClick, undefined)
  }
})

function checkSelection(app, day, detail) {
  const groups = [Array.from({ length: 7 }, (_, i) => [`ak-day-${i}`, i === day]), detailNames.map(name => [`ak-details-${name}`, name === detail])]
  for (const group of groups) {
    assert.equal(group.filter(([id]) => !app.panel(id + '-panel').props.hidden).length, 1)
    for (const [id, active] of group) {
      const button = app.panel(id + '-button'), panel = app.panel(id + '-panel')
      assert.equal(button.type, 'button')
      assert.equal(button.props.type, 'button')
      assert.equal(button.props['aria-controls'], panel.props.id)
      assert.equal(button.props['aria-expanded'], active)
      assert.equal(button.props.role, undefined)
      assert.equal(button.props.tabIndex, undefined)
      assert.equal(button.props.onKeyDown, undefined)
      assert.equal(panel.props.role, 'region')
      assert.equal(panel.props['aria-labelledby'], button.props.id)
      assert.equal(panel.props.hidden, !active)
      assert.equal(panel.props['aria-hidden'], !active)
      assert.equal(panel.props.inert, active ? undefined : '')
      assert.equal(panel.props.style.display, active ? undefined : 'none')
      assert.equal(panel.props.initial, false)
      assert.equal(panel.props.animate.opacity, active ? 1 : 0)
      assert.deepEqual(panel.props.transition, { duration: id.startsWith('ak-day') ? 0.4 : 0.3 })
    }
  }
  const ids = [...app.html().matchAll(/\bid="([^"]+)"/g)].map(m => m[1])
  assert.equal(ids.length, new Set(ids).size)
  checkDayBodies(app)
  checkDetails(app)
}

test('all seven complete day bodies and all 24 detail items persist with the correct defaults', () => {
  checkSelection(mount(), 0, 'inclusions')
})

test('all days switch and reselect with stable panel keys, native controls and independent detail state', () => {
  const app = mount(), keys = () => app.all().filter(n => /^ak-day-\d-panel$/.test(n.props?.id)).map(n => n.key)
  const originalKeys = keys()
  for (const i of [6, 1, 4, 2, 5, 3, 0]) {
    app.click(`ak-day-${i}-button`)
    checkSelection(app, i, 'inclusions')
    app.click(`ak-day-${i}-button`)
    checkSelection(app, i, 'inclusions')
    assert.deepEqual(keys(), originalKeys)
  }
})

test('all detail panels switch and reselect while preserving the selected day and all content', () => {
  const app = mount()
  app.click('ak-day-4-button')
  const keys = detailNames.map(n => app.panel(`ak-details-${n}-panel`).key)
  for (const name of ['packing', 'exclusions', 'inclusions']) {
    app.click(`ak-details-${name}-button`)
    checkSelection(app, 4, name)
    app.click(`ak-details-${name}-button`)
    checkSelection(app, 4, name)
    assert.deepEqual(detailNames.map(n => app.panel(`ak-details-${n}-panel`).key), keys)
  }
})

function emittedPanel(html, id) {
  const opening = new RegExp(`<div\\b[^>]*id="${id}"[^>]*>`).exec(html)
  assert.ok(opening, id)
  let depth = 0
  for (const token of html.slice(opening.index).matchAll(/<\/?div\b[^>]*>/g)) {
    depth += token[0].startsWith('</') ? -1 : 1
    if (depth === 0) return { attributes: opening[0], markup: html.slice(opening.index, opening.index + token.index + token[0].length) }
  }
  assert.fail(`Unclosed panel ${id}`)
}

// Run after all builds; verify emitted documents, not merely source strings.
for (const output of ['dist', 'dist-preview', 'dist-prototype']) {
  test(`${output}: complete initial itinerary/details, metadata, schema, unique IDs and hidden states`, () => {
    const html = readFileSync(new URL(`../${output}/packages/adi-kailash-expedition/index.html`, import.meta.url), 'utf8')
    const app = mount()
    assert.equal(decode(html.match(/<title>(.*?)<\/title>/)[1]), title)
    assert.equal(text(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)[1]), 'Adi Kailash & Om Parvat Yatra')
    assert.ok(html.includes(`content="${description}"`))
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`))
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1])
    assert.equal(ids.length, new Set(ids).size)
    for (const [prefix, names] of [['ak-day', [0, 1, 2, 3, 4, 5, 6]], ['ak-details', detailNames]]) {
      for (const [i, name] of names.entries()) {
        const id = `${prefix}-${name}-panel`
        const emitted = emittedPanel(html, id)
        if (i > 0) {
          assert.match(emitted.attributes, /hidden=""/)
          assert.match(emitted.attributes, /aria-hidden="true"/)
          assert.match(emitted.attributes, /inert=""/)
          assert.match(emitted.attributes, /display:none/)
        } else {
          assert.doesNotMatch(emitted.attributes, /(?:^|\s)hidden=""|inert=""|display:none/)
          assert.match(emitted.attributes, /aria-hidden="false"/)
        }
        assert.equal(text(emitted.markup), text(app.html(app.panel(id))), `${id}: entire original body`)
        if (prefix === 'ak-day') {
          const item = app.data.itinerary[name], images = [...emitted.markup.matchAll(/<img\b[^>]*>/g)].map(m => m[0])
          assert.equal(images.length, item.image ? 1 : 0)
          if (item.image) {
            assert.ok(images[0].includes(`src="${item.image}"`))
            assert.ok(decode(images[0]).includes(`alt="${item.imageAlt}"`))
          }
        }
      }
    }
    const schemas = [...html.matchAll(/<script type="application\/ld\+json" data-useseo-schema>(.*?)<\/script>/g)].map(m => JSON.parse(m[1]))
    assert.deepEqual(schemas, app.metadata().schema)
    assert.deepEqual(schemas.map(s => s['@type']), ['TouristTrip'])
  })
}
