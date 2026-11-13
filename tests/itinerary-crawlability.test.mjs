// Exercise the actual Cinematic render and handlers, with page effects isolated.
// Native keyboard, focus, animation timing and layout still require browser QA.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { createRequire } from 'node:module'
import { transformSync } from 'esbuild'
import { renderToStaticMarkup } from 'react-dom/server'

const require = createRequire(import.meta.url)
const source = readFileSync(new URL('../src/pages/CinematicExpedition.jsx', import.meta.url), 'utf8').replace(/\r\n/g, '\n')
const code = transformSync(source + '\nexport { itinerary };', { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code
const digest = value => createHash('sha256').update(value).digest('hex')
const approvedDescription = 'Explore Eastern Kumaon on a cinematic road journey from Delhi, with Abbott Mount, the Kali River valley, mountain towns and local cultural encounters.'
const previousDescription = 'Eastern Kumaon cinematic tour from Delhi and Pithoragarh — Abbott Mount, Munsiyari, Darma Valley, Dharchula. Best Kumaon travel package for photographers and filmmakers 2026.'
const text = html => html.replace(/<[^>]*>/g, ' ').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
const titles = [
  'Overnight Departure from Delhi', 'Arrival in Lohaghat', 'Lohaghat Exploration',
  'Lohaghat → Pithoragarh', 'Pithoragarh Adventure Day', 'Pithoragarh → Dharchula',
  'River Adventure & Hidden Valleys', 'Dharchula → Didihat', 'Didihat → Almora → Delhi',
]

function nodes(value) {
  if (!value || typeof value !== 'object') return []
  if (Array.isArray(value)) return value.flatMap(nodes)
  return [value, ...nodes(value.props?.children)]
}

function mount() {
  const state = []
  let cursor = 0, tree, metadata
  const module = { exports: {} }
  new Function('require', 'module', 'exports', code)(id => {
    if (id === 'react') return {
      useState(initial) {
        const index = cursor++
        if (!(index in state)) state[index] = initial
        return [state[index], next => { state[index] = typeof next === 'function' ? next(state[index]) : next }]
      },
    }
    if (id === '../hooks/useSEO') return { useSEO(value) { metadata = value } }
    if (id === '../components/ExpeditionForm') return { __esModule: true, default: () => null }
    return require(id)
  }, module, module.exports)
  function render() { cursor = 0; tree = module.exports.default() }
  const panels = () => nodes(tree).filter(node => /^cinematic-day-\d-panel$/.test(node.props?.id))
  const triggers = () => nodes(tree).filter(node => /^cinematic-day-\d-button$/.test(node.props?.id))
  render()
  return {
    panels, triggers, data: module.exports.itinerary, nodes: () => nodes(tree), metadata: () => metadata,
    html: () => renderToStaticMarkup(tree),
    click(index) { triggers()[index].props.onClick(); render() },
  }
}

test('Cinematic itinerary data and all source outside its rendering and approved description remain unchanged', () => {
  const dataSource = source.match(/const itinerary = \[[\s\S]*?\n\];/)[0]
  assert.equal(digest(dataSource), '74f6b76aa54d4a65d35d6c7be9c5a322b3a3ebb42beb143224baedd016cee99f')
  const start = source.indexOf('        {/* ITINERARY */}')
  const end = source.indexOf('        {/* INCLUSIONS / EXCLUSIONS */}')
  // Retain the original baseline fingerprint, allowing only the separately
  // approved description correction. All other metadata, data, images,
  // forms, controls and styles outside this section remain protected.
  const protectedSource = (source.slice(0, start) + source.slice(end)).replace(approvedDescription, previousDescription)
  assert.equal(digest(protectedSource), 'ab3fd753a09876f4c2f18c553436af8187de0c450d4608865dd969e3afe932bb')
  const app = mount()
  assert.deepEqual(app.data.map(item => item.day), Array.from({ length: 9 }, (_, i) => `Day ${i}`))
  assert.deepEqual(app.data.map(item => item.title), titles)
})

test('Cinematic description matches its published journey while the title and canonical are preserved', () => {
  const metadata = mount().metadata()
  assert.equal(metadata.description, approvedDescription)
  assert.ok(metadata.description.length >= 140 && metadata.description.length <= 160)
  assert.doesNotMatch(metadata.description, /Munsiyari|Darma Valley/)
  assert.equal(metadata.title, 'Kumaon Tour 2026 | Eastern Kumaon Cinematic Journey from Delhi & Pithoragarh')
  assert.equal(metadata.canonical, 'https://www.himalayanserenitytravel.com/packages/cinematic-expedition')
})

test('all nine complete original day bodies render once in their actual persistent panels', () => {
  const app = mount(), html = app.html()
  assert.equal(app.panels().length, 9)
  app.data.forEach((item, i) => {
    const panel = app.panels()[i], panelText = text(renderToStaticMarkup(panel))
    const expected = [item.day, item.title, item.subtitle, item.description, ...item.experiences]
    if (item.stay) expected.push(`🏨 Overnight: ${item.stay}`)
    assert.equal(panelText, expected.join(' '))
    assert.equal(text(html).split(item.description).length - 1, 1)
    assert.equal(text(html).split(item.title).length - 1, 1)
    assert.equal(nodes(panel).filter(node => node.type === 'img').length, 0)
  })
  assert.ok(!text(html).includes('Easy to Moderate'), 'dormant difficulty must stay unpublished')
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1])
  assert.equal(ids.length, new Set(ids).size)
  assert.equal(app.nodes().filter(node => node.props?.id === 'itinerary').length, 1)
})

function checkSelection(app, selected) {
  assert.equal(app.panels().length, 9)
  assert.equal(app.triggers().length, 9)
  app.triggers().forEach((button, i) => {
    const panel = app.panels()[i], active = i === selected
    assert.equal(button.type, 'button')
    assert.equal(button.props.type, 'button')
    assert.equal(button.props.id, `cinematic-day-${i}-button`)
    assert.equal(panel.props.id, `cinematic-day-${i}-panel`)
    assert.equal(button.props['aria-controls'], panel.props.id)
    assert.equal(button.props['aria-expanded'], active)
    assert.equal(panel.props.role, 'region')
    assert.equal(panel.props['aria-labelledby'], button.props.id)
    assert.equal(panel.props.hidden, !active)
    assert.equal(panel.props['aria-hidden'], !active)
    assert.equal(panel.props.inert, active ? undefined : '')
    assert.equal(panel.props.style.display, active ? undefined : 'none')
    assert.deepEqual(panel.props.animate, { opacity: active ? 1 : 0, x: active ? 0 : 16 })
    assert.deepEqual(panel.props.transition, { duration: 0.4 })
    assert.equal(panel.key, app.data[i].day)
    assert.equal(button.props.tabIndex, undefined, 'retain native sequential keyboard navigation')
    assert.equal(button.props.onKeyDown, undefined, 'retain native Enter and Space activation')
    assert.equal(button.props.role, undefined, 'do not introduce incomplete tabs semantics')
  })
  const html = app.html()
  assert.equal((html.match(/hidden=""/g) || []).length, 8)
  assert.equal((html.match(/inert=""/g) || []).length, 8)
  app.data.forEach(item => assert.equal(text(html).split(item.description).length - 1, 1))
}

test('Day 0 starts selected with eight hidden, inert panels and labelled button relationships', () => {
  checkSelection(mount(), 0)
})

test('every day switches and reselects without closing, removing content or changing panel identity', () => {
  const app = mount(), keys = app.panels().map(panel => panel.key)
  for (const i of [8, 1, 5, 2, 7, 3, 6, 4, 0]) {
    app.click(i); checkSelection(app, i)
    app.click(i); checkSelection(app, i)
    assert.deepEqual(app.panels().map(panel => panel.key), keys)
  }
})
