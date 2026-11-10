// Responsive CSS/markup contracts and width budgets, not rendered-browser geometry.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import config from '../tailwind.config.js'

const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8')
const index = read('src/index.css'), privacy = read('src/components/cookie-consent.css')
const css = postcss.parse((await postcss([tailwindcss(config)]).process(index, { from: new URL('../src/index.css', import.meta.url).pathname })).css)
const rules = (root, selector) => {
  const found = []
  root.walkRules(rule => { if (rule.selector === selector) found.push(rule) })
  return found
}
const declarations = rule => Object.fromEntries(rule.nodes.filter(n => n.type === 'decl').map(n => [n.prop, n.value]))
const last = (root, selector) => declarations(rules(root, selector).at(-1))

test('native enquiry controls have bounded border-box width; copy wraps without overflow masking', () => {
  assert.deepEqual(last(css, '.enquiry-form'), { width: '100%', 'max-width': '100%', 'min-width': '0' })
  const bounds = last(css, '.enquiry-form > *, .enquiry-form :where(input, select, textarea)')
  assert.equal(bounds['min-width'], '0'); assert.equal(bounds['max-width'], '100%'); assert.equal(bounds['box-sizing'], 'border-box')
  assert.deepEqual(last(css, '.enquiry-form :where(input, select, textarea)'), { display: 'block', width: '100%' })
  assert.deepEqual(last(css, '.enquiry-form :where(label, p)'), { 'white-space': 'normal', 'overflow-wrap': 'anywhere' })
  assert.equal(last(css, '.enquiry-form :where(input, select, textarea):focus-visible')['outline-offset'], '2px')
  for (const rule of rules(css, '.enquiry-form')) assert.equal(declarations(rule).overflow, undefined)
  for (const selector of ['html', 'body']) for (const rule of rules(css, selector)) assert.equal(declarations(rule)['overflow-x'], undefined)
})

test('Panchachuli, hub and Contact opt into shared bounds; Contact explicitly uses a shrinkable mobile grid', () => {
  for (const file of ['src/pages/retreats/KumaonWellness.jsx', 'src/pages/InternationalRetreats.jsx', 'src/pages/Contact.jsx']) {
    assert.match(read(file), /<form[^>]*className="enquiry-form space-y-[45]"/)
  }
  assert.match(read('src/pages/Contact.jsx'), /grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl/)
  assert.equal(last(css, '.grid-cols-1')['grid-template-columns'], 'repeat(1, minmax(0, 1fr))')
})

test('long selected retreat/date remain readable outside single-line native controls', () => {
  for (const file of ['src/pages/retreats/KumaonWellness.jsx', 'src/pages/InternationalRetreats.jsx']) {
    const source = read(file)
    for (const [name, type] of [['retreat', 'select'], ['dates', 'input']]) {
      assert.match(source, new RegExp(`<${type} id="enquiry-${name}" aria-describedby="enquiry-${name}-value"`))
      assert.match(source, new RegExp(`<p id="enquiry-${name}-value"[^>]*>\\{form\\.${name}\\}</p>`))
    }
    assert.match(source, /id="enquiry-message-hint"/)
  }
})

test('reviewed retreat sticky bar reserves the icon slot and lets the complete enquiry label wrap', () => {
  const source = read('src/components/MobileCTA.jsx')
  assert.match(source, /grid-cols-\[44px_minmax\(0,1fr\)\]/)
  assert.match(source, /whitespace-normal break-words text-center leading-5/)
  assert.match(source, /Enquire About This Retreat/)
  assert.doesNotMatch(source, /truncate|text-ellipsis|whitespace-nowrap/)
})

test('departure cards stack dates, availability and full-width action below 640px; restore the tablet row', () => {
  const source = read('src/pages/retreats/KumaonWellness.jsx')
  const departure = source.slice(source.indexOf('{DEPARTURES.map'), source.indexOf('{/* Footer note */}'))
  assert.match(departure, /flex flex-col items-stretch gap-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:flex-nowrap/)
  assert.match(departure, /w-full min-w-0 sm:w-auto sm:flex-1/)
  assert.match(departure, /leading-tight break-words/)
  assert.match(departure, /flex w-full min-w-0 max-w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-5/)
  assert.match(departure, /w-full min-h-11 sm:w-auto sm:min-h-0/)
  assert.ok(departure.indexOf('{dep.month}') < departure.indexOf('{dep.dates}'))
  assert.ok(departure.indexOf('{dep.dates}') < departure.indexOf('Enquire About Availability'))
  assert.ok(departure.indexOf('Enquire About Availability') < departure.indexOf('<button'))
  assert.match(departure, /onClick=\{\(\) => selectDeparture\(dep.dates\)\}/)
  assert.match(departure, /focus-visible:outline-offset-4/)
  assert.doesNotMatch(departure, /overflow-hidden|truncate/)
  assert.equal(last(css, '.flex-col')['flex-direction'], 'column')
  assert.equal(last(css, '.w-full').width, '100%')
  for (const [selector, property, value] of [['.sm\\:flex-row', 'flex-direction', 'row'], ['.sm\\:w-auto', 'width', 'auto'], ['.sm\\:min-h-0', 'min-height', '0px']]) {
    const rule = rules(css, selector).find(r => r.parent.type === 'atrule')
    assert.ok(rule, selector); assert.equal(rule.parent.params, '(min-width: 640px)')
    assert.equal(declarations(rule)[property], value)
  }
  for (const width of [320, 360, 390, 430]) assert.ok(width < 640, `${width}px uses full-width column flow`)
})

test('mobile privacy policy and equal-width actions occupy separate rows; existing dock offsets remain', () => {
  const root = postcss.parse(privacy)
  const bar = rules(root, '.privacy-bar').at(-1)
  assert.equal(bar.parent.params, '(max-width: 480px)')
  assert.equal(declarations(bar).display, 'grid')
  assert.equal(declarations(bar)['grid-template-columns'], 'minmax(0, 1fr)')
  const actions = last(root, '.privacy-actions')
  assert.equal(actions.display, 'grid'); assert.equal(actions['grid-template-columns'], 'repeat(3, minmax(0, 1fr))')
  assert.equal(last(root, '.privacy-actions button')['white-space'], 'normal')
  assert.match(privacy, /bottom: var\(--privacy-dock-height\) !important/)
  assert.match(privacy, /max-height: 45dvh/)
})

for (const width of [320, 360, 390, 430]) {
  test(`${width}px: declared control, sticky-slot and consent width budgets fit without shrinking fonts`, () => {
    // These equations validate the authored dimensions, not browser text shaping.
    const form = width - 48, inputContent = form - 32 - 2
    const stickyLabel = width - 32 - 44 - 12
    const privacyAction = (width - 24 - 12) / 3
    assert.ok(inputContent >= 238)
    assert.ok(stickyLabel - 32 >= 200)
    assert.ok(privacyAction - 16 - 2 >= 76)
    assert.ok(form <= width && stickyLabel + 44 + 12 + 32 === width)
  })
}

test('desktop grid and reviewed-retreat mobile-only boundary remain intact', () => {
  assert.match(read('src/pages/Contact.jsx'), /lg:grid-cols-2/)
  assert.match(read('src/components/MobileCTA.jsx'), /lg:hidden/)
  const responsive = rules(css, '.lg\\:grid-cols-2').find(rule => rule.parent.type === 'atrule')
  assert.ok(responsive); assert.equal(responsive.parent.params, '(min-width: 1024px)')
})
