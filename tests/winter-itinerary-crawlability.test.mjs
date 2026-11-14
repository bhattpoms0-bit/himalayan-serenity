// Component render/handler tests; native keyboard and visual behavior require browser QA.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { createRequire } from 'node:module'
import { transformSync } from 'esbuild'
import { renderToStaticMarkup } from 'react-dom/server'

const require = createRequire(import.meta.url)
const source = readFileSync(new URL('../src/pages/WinterHimalayanWellnessRetreat.jsx', import.meta.url), 'utf8').replace(/\r\n/g, '\n')
const code = transformSync(source.replace('  const inclusions = [', '  capture(itinerary);\n  const inclusions = ['), { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code
const digest = value => createHash('sha256').update(value).digest('hex')
const text = html => html.replace(/<[^>]*>/g, ' ').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
function nodes(value) {
  if (!value || typeof value !== 'object') return []
  if (Array.isArray(value)) return value.flatMap(nodes)
  return [value, ...nodes(value.props?.children)]
}
function mount() {
  const state = [], module = { exports: {} }
  let cursor = 0, tree, data
  new Function('require', 'module', 'exports', 'capture', code)(id => {
    if (id === 'react') return { useState(initial) {
      const index = cursor++
      if (!(index in state)) state[index] = initial
      return [state[index], next => { state[index] = next }]
    } }
    if (id === '../hooks/useSEO') return { useSEO() {} }
    if (id === '../components/ExpeditionForm') return { __esModule: true, default: () => null }
    return require(id)
  }, module, module.exports, value => { data = value })
  function render() { cursor = 0; tree = module.exports.default() }
  render()
  const find = suffix => nodes(tree).filter(node => new RegExp('^winter-day-\\d-' + suffix + '$').test(node.props?.id))
  return { data, panels: () => find('panel'), buttons: () => find('button'), html: () => renderToStaticMarkup(tree),
    click(index) { find('button')[index].props.onClick(); render() } }
}

test('Winter itinerary data and every source section outside the itinerary are preserved', () => {
  const start = source.lastIndexOf('      {/*', source.indexOf('ITINERARY'))
  const end = source.lastIndexOf('      {/*', source.indexOf('VILLAGE & CULTURE'))
  assert.equal(digest(source.slice(0, start) + source.slice(end)), 'f079702ff96ab4e1df87732c1e7ac510293e32952a0dba7ff08154538d8e7c7c')
  assert.equal(digest(source.slice(source.indexOf('  const itinerary = ['), source.indexOf('  const inclusions = ['))), 'b65a2bcdaaa407052e1bba306f9f41400e7766508435fa89f21ff3b191e9f480')
  assert.deepEqual(mount().data.map(day => day.day), [1,2,3,4,5,6,7,8,9])
})

function check(app, selected) {
  const panels = app.panels(), buttons = app.buttons()
  assert.equal(panels.length, 9); assert.equal(buttons.length, 9)
  buttons.forEach((button, i) => {
    const panel = panels[i], active = i === selected, day = app.data[i]
    assert.equal(button.type, 'button'); assert.equal(button.props.type, 'button')
    assert.equal(button.props.id, `winter-day-${day.day}-button`)
    assert.equal(panel.props.id, `winter-day-${day.day}-panel`)
    assert.equal(button.props['aria-controls'], panel.props.id)
    assert.equal(button.props['aria-expanded'], active)
    assert.equal(panel.props.role, 'region')
    assert.equal(panel.props['aria-labelledby'], button.props.id)
    assert.equal(panel.props.hidden, !active); assert.equal(panel.props['aria-hidden'], !active)
    assert.equal(panel.props.inert, active ? undefined : '')
    assert.equal(panel.props.style.display, active ? undefined : 'none')
    assert.equal(button.props.tabIndex, undefined)
    assert.equal(button.props.onKeyDown, undefined)
    assert.equal(button.props.role, undefined)
    assert.equal(nodes(panel).filter(n => ['a','button','input','select','textarea'].includes(n.type) || n.props?.tabIndex !== undefined || n.props?.contentEditable).length, 0)
    const expected = ['Experiences', ...day.experiences.map(exp => `✓ ${exp}`)]
    if (day.theme) expected.push(`"${day.theme}"`)
    if (day.evening) expected.push('Evening', day.evening)
    assert.equal(text(renderToStaticMarkup(panel)), expected.join(' '))
    const images = nodes(panel).filter(n => n.type === 'img')
    assert.equal(images.length, day.dayImage ? 1 : 0)
    if (day.dayImage) {
      assert.equal(images[0].props.src, '/images/winter-himalayan-wellness-retreat/' + day.dayImage)
      assert.equal(images[0].props.alt, day.dayImageAlt)
    }
  })
  const html = app.html(), ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1])
  assert.equal(ids.length, new Set(ids).size)
  assert.equal((html.match(/ hidden=""/g) || []).length, selected === null ? 9 : 8)
  assert.equal((html.match(/ inert=""/g) || []).length, selected === null ? 9 : 8)
  for (const day of app.data) assert.equal(text(html).split(day.evening).length - 1, 1)
}

test('initial HTML has nine complete, unique, collapsed and inert day bodies', () => { check(mount(), null) })
test('every day opens, closes on a second click and switches without removing panels', () => {
  for (let i = 0; i < 9; i++) {
    const app = mount(), keys = app.panels().map(p => p.key)
    app.click(i); check(app, i)
    app.click(i); check(app, null)
    app.click(i); check(app, i)
    app.click((i + 1) % 9); check(app, (i + 1) % 9)
    assert.deepEqual(app.panels().map(p => p.key), keys)
  }
})
test('native button contents are valid phrasing content and visible focus is explicitly styled', () => {
  for (const button of mount().buttons()) assert.ok(nodes(button).every(n => typeof n.type !== 'string' || ['button','span'].includes(n.type)))
  assert.match(source, /\.winter-itinerary-trigger:focus-visible\s*\{\s*outline: 2px solid #8ab4d4;\s*outline-offset: -4px;/)
})

test('both generated build targets contain all nine complete original day narratives initially', () => {
  const app = mount()
  for (const output of ['dist', 'dist-preview']) {
    const file = new URL(`../${output}/packages/winter-himalayan-wellness-retreat/index.html`, import.meta.url)
    assert.ok(existsSync(file), `Build ${output} before running this artifact check`)
    const html = readFileSync(file, 'utf8'), decoded = text(html)
    for (const day of app.data) {
      assert.equal(decoded.split(day.evening).length - 1, 1)
      for (const exp of day.experiences) assert.ok(decoded.includes(exp))
      if (day.theme) assert.ok(decoded.includes(day.theme))
      assert.match(html, new RegExp(`id="winter-day-${day.day}-panel"[^>]*hidden=""[^>]*inert=""[^>]*display:none`))
    }
  }
})
