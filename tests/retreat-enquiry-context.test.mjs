// Execute actual page handlers with controlled hooks and local-only provider mocks.
// Native keyboard activation, browser focus rendering and layout require visual QA.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { transformSync } from 'esbuild'
import * as retreats from '../src/data/retreats.js'

const require = createRequire(import.meta.url)
const variants = [
  { name: 'hub', file: 'src/pages/InternationalRetreats.jsx', dates: [undefined] },
  { name: 'Panchachuli', file: 'src/pages/retreats/KumaonWellness.jsx', dates: ['20 November – 28 November 2026', '4 December – 12 December 2026'] },
].map(v => ({ ...v, code: transformSync(readFileSync(new URL('../' + v.file, import.meta.url), 'utf8'), { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code }))
const nodes = (type, tree) => !tree || typeof tree !== 'object' ? [] : Array.isArray(tree)
  ? tree.flatMap(child => nodes(type, child))
  : [...(tree.type === type ? [tree] : []), ...nodes(type, tree.props?.children)]
const label = tree => Array.isArray(tree) ? tree.map(label).join('') : typeof tree === 'object' ? label(tree?.props?.children) : tree || ''
const seed = { name: 'QA_SYNTHETIC_NAME', country: 'QA_SYNTHETIC_COUNTRY', email: 'qa@example.invalid', groupSize: '2', message: 'QA_SYNTHETIC_MESSAGE', dates: 'QA_CUSTOM_DATES' }

function mount(variant, { pauseFetch, pauseJSON, provider = 'success' } = {}) {
  const slots = [], requests = [], effects = [], states = []
  let cursor = 0, tree, responseMode = provider
  const react = {
    Fragment: require('react').Fragment,
    useState(initial) {
      const i = cursor++
      if (!(i in slots)) slots[i] = typeof initial === 'function' ? initial() : initial
      return [slots[i], next => {
        slots[i] = typeof next === 'function' ? next(slots[i]) : next
        if (['loading', 'success', 'error'].includes(slots[i])) states.push(slots[i])
      }]
    },
    useRef(initial) { const i = cursor++; return slots[i] ||= { current: initial } },
  }
  const fetch = async (url, options) => {
    requests.push({ url, ...options })
    if (pauseFetch) await pauseFetch
    if (responseMode === 'network-error') throw Error('Synthetic network failure')
    return { ok: responseMode !== 'http-error', json: async () => {
      if (pauseJSON) await pauseJSON
      if (responseMode === 'invalid-json') throw Error('Synthetic invalid JSON')
      return { success: responseMode !== 'refusal' }
    } }
  }
  const module = { exports: {} }
  new Function('require', 'module', 'exports', 'fetch', 'window', variant.code)(id => {
    if (id === 'react') return react
    if (id.includes('/data/retreats')) return retreats
    if (id.includes('/hooks/useSEO')) return { useSEO() {} }
    if (id.includes('/components/')) return { __esModule: true, default: () => null,
      RetreatPrice: () => null, RetreatAccommodation: () => null, RetreatOverview: () => null }
    if (id.endsWith('.css')) return {}
    if (/consent|analytics|whatsapp/i.test(id)) throw Error('New tracking or handoff dependency')
    return require(id)
  }, module, module.exports, fetch, new Proxy({}, { get() { throw Error('Unexpected window side effect') } }))
  function render() {
    cursor = 0; tree = module.exports.default()
    for (const [type, id, method] of [['section', 'enquiry', 'scrollIntoView'], ['h2', 'enquiry-heading', 'focus']]) {
      const node = nodes(type, tree).find(n => n.props.id === id)
      assert.ok(node?.ref, `${id} has focus/scroll ref`)
      node.ref.current = { [method]: options => effects.push({ method, options, id }) }
    }
    return tree
  }
  render()
  const app = {
    render, requests, effects, states,
    controls: () => nodes('button', tree).filter(n => ['Enquire', 'Enquire About This Retreat'].includes(label(n))),
    form: () => nodes('form', tree)[0],
    fields: () => Object.fromEntries(['input', 'select', 'textarea'].flatMap(t => nodes(t, tree)).filter(n => n.props.name).map(n => [n.props.name, n.props.value])),
    change(name, value) {
      const field = ['input', 'select', 'textarea'].flatMap(t => nodes(t, tree)).find(n => n.props.name === name)
      assert.ok(field); field.props.onChange({ target: { name, value } }); render()
    },
    select(index = 0) { app.controls()[index].props.onClick(); render() },
    submit: () => app.form().props.onSubmit({ preventDefault() {} }),
    provider: value => { responseMode = value },
    tree: () => tree,
  }
  for (const [name, value] of Object.entries(seed)) app.change(name, value)
  return app
}

for (const variant of variants) {
  for (const [index, dates] of variant.dates.entries()) {
    test(`${variant.name} context ${index}: exact existing option/date, retained inputs, no submit, editable dates`, () => {
      const app = mount(variant)
      app.change('retreat', "Women's Sacred Himalaya Retreat")
      const before = app.fields()
      app.select(index)
      assert.deepEqual(app.fields(), { ...before, retreat: retreats.PANCHACHULI_WELLNESS.listingName, dates: dates ?? before.dates })
      const options = nodes('option', app.tree()).map(label)
      assert.ok(options.includes(app.fields().retreat), 'selection exactly matches existing option text')
      assert.equal(app.requests.length, 0)
      assert.deepEqual(app.states, [])
      const displayed = id => label(nodes('p', app.tree()).find(n => n.props.id === id))
      assert.equal(displayed('enquiry-retreat-value'), app.fields().retreat)
      assert.equal(displayed('enquiry-dates-value'), app.fields().dates)
      app.change('dates', 'QA_EDITED_DATES'); assert.equal(app.fields().dates, 'QA_EDITED_DATES')
      assert.equal(displayed('enquiry-dates-value'), 'QA_EDITED_DATES', 'wrapped date display follows visitor edits')
      app.change('retreat', "Women's Sacred Himalaya Retreat"); assert.equal(app.fields().retreat, "Women's Sacred Himalaya Retreat")
    })
  }

  test(`${variant.name}: native button semantics, focus target, instant scroll and fixed-nav offset`, () => {
    const app = mount(variant)
    assert.equal(app.controls().length, variant.dates.length)
    for (const control of app.controls()) {
      assert.equal(control.props.type, 'button'); assert.equal(control.props.disabled, false)
      assert.equal(control.props.onKeyDown, undefined); assert.equal(control.props.tabIndex, undefined)
      assert.match(control.props.className, /focus-visible:outline/)
      assert.equal(nodes('button', app.form()).some(n => n === control), false)
      assert.equal(control.props.href, undefined); assert.equal(control.props.to, undefined)
    }
    app.select()
    assert.deepEqual(app.effects, [
      { method: 'scrollIntoView', options: { behavior: 'instant', block: 'start' }, id: 'enquiry' },
      { method: 'focus', options: { preventScroll: true }, id: 'enquiry-heading' },
    ])
    const section = nodes('section', app.tree()).find(n => n.props.id === 'enquiry')
    assert.match(section.props.className, /scroll-mt-24/)
    assert.equal(section.props['aria-labelledby'], 'enquiry-heading')
    assert.equal(nodes('h2', section).find(n => n.props.id === 'enquiry-heading').props.tabIndex, -1)
    if (variant.name !== 'hub') for (const [i, dates] of variant.dates.entries()) assert.ok(app.controls()[i].props['aria-label'].includes(dates))
  })

  test(`${variant.name}: fetch AND JSON pending block current and stale context handlers; no duplicate submit`, async () => {
    let releaseFetch, releaseJSON
    const app = mount(variant, { pauseFetch: new Promise(r => { releaseFetch = r }), pauseJSON: new Promise(r => { releaseJSON = r }) })
    const staleHandler = app.controls()[0].props.onClick
    const before = app.fields(), pending = app.submit()
    staleHandler(); app.render(); await app.submit()
    assert.deepEqual(app.fields(), before); assert.equal(app.effects.length, 0)
    assert.ok(app.controls().every(n => n.props.disabled))
    releaseFetch(); await new Promise(resolve => setImmediate(resolve))
    app.select(); await app.submit()
    assert.deepEqual(app.fields(), before); assert.equal(app.effects.length, 0); assert.equal(app.requests.length, 1)
    releaseJSON(); await pending; app.render()
    assert.deepEqual(app.states, ['loading', 'success']); assert.equal(app.form(), undefined)
    app.select(); assert.equal(app.form(), undefined); assert.equal(app.requests.length, 1)
    assert.equal(nodes('div', app.tree()).filter(n => n.props.role === 'status').length, 1)
    assert.equal(app.effects.length, 2, 'successful enquiry remains visible and can be focused')
  })

  for (const provider of ['refusal', 'http-error', 'invalid-json', 'network-error']) {
    test(`${variant.name}: ${provider}, preserved inputs/error and deliberate successful retry`, async () => {
      const app = mount(variant, { provider }); app.select()
      const before = app.fields()
      await app.submit(); app.render()
      assert.deepEqual(app.fields(), before); assert.deepEqual(app.states, ['loading', 'error'])
      assert.equal(nodes('p', app.tree()).filter(n => n.props.role === 'alert').length, 1)
      assert.ok(app.controls().every(n => !n.props.disabled))
      app.select()
      assert.equal(nodes('p', app.tree()).filter(n => n.props.role === 'alert').length, 1, 'context action does not clear provider error')
      app.provider('success'); await app.submit(); app.render()
      assert.deepEqual(app.states, ['loading', 'error', 'loading', 'success'])
      assert.equal(app.requests.length, 2); assert.equal(app.form(), undefined)
      const payload = JSON.parse(app.requests[1].body)
      for (const key of ['name', 'email', 'country', 'retreat', 'dates', 'message']) assert.equal(payload[key], before[key])
      assert.equal(payload.group_size, before.groupSize)
      assert.equal(app.requests[1].url, 'https://api.web3forms.com/submit')
    })
  }

  test(`${variant.name}: WhatsApp destinations remain direct existing links and context actions have no extra side effects`, () => {
    const app = mount(variant)
    const destinations = () => nodes('a', app.tree()).map(n => n.props.href).filter(href => href?.includes('wa.me'))
    const before = destinations()
    assert.ok(before.length > 0); assert.ok(before.every(href => href === 'https://wa.me/919084642557'))
    app.select(); app.select()
    assert.deepEqual(destinations(), before); assert.equal(app.requests.length, 0); assert.deepEqual(app.states, [])
  })
}
