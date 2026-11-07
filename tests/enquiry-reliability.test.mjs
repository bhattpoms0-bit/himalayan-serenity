// Actual component handlers and rerenders with controlled hooks, provider and SDK mocks.
// No browser, live provider, tracking SDK or WhatsApp navigation executes here.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import vm from 'node:vm'
import { transformSync } from 'esbuild'

const require = createRequire(import.meta.url)
const read = file => readFileSync(new URL('../' + file, import.meta.url), 'utf8')
const consentSource = read('src/utils/consent.js').replaceAll('export ', '')
const variants = [
  { name: 'Contact', file: 'src/pages/Contact.jsx', category: 'Contact', whatsapp: false },
  { name: 'ExpeditionForm', file: 'src/components/ExpeditionForm.jsx', category: 'Expedition Inquiry', whatsapp: true },
].map(v => ({ ...v, code: transformSync(read(v.file), { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code }))
const nodes = (type, tree) => !tree || typeof tree !== 'object' ? [] : Array.isArray(tree)
  ? tree.flatMap(child => nodes(type, child))
  : [...(tree.type === type ? [tree] : []), ...nodes(type, tree.props?.children)]
const label = tree => Array.isArray(tree) ? tree.map(label).join('') : typeof tree === 'object'
  ? label(tree?.props?.children) : tree || ''

function consent(analytics, recording) {
  const stored = new Map(), scripts = []
  const window = { dispatchEvent() {} }
  const location = { search: '', hostname: 'example.invalid', pathname: '/contact', origin: 'https://example.invalid', reload() {} }
  const context = vm.createContext({ window, location, URLSearchParams, URL, Date,
    localStorage: { getItem: key => stored.get(key) || null, setItem: (key, value) => stored.set(key, value) },
    document: { cookie: '', getElementById: id => scripts.find(s => s.id === id), createElement: () => ({}), head: { appendChild: s => scripts.push(s) } },
  })
  vm.runInContext(consentSource + '\nglobalThis.api = { trackEnquiry, saveConsent }', context)
  if (analytics !== undefined) context.api.saveConsent({ analytics, recording })
  const events = () => (window.dataLayer || []).map(args => Array.from(args)).filter(args => args[0] === 'event')
  return { ...context.api, window, events }
}

function mount(variant, { track = () => {}, provider = 'success', open = true, pauseJSON, pauseFetch } = {}) {
  const slots = [], states = [], requests = [], tracked = [], opened = []
  let cursor = 0, tree
  const react = {
    useState(initial) {
      const index = cursor++
      if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial
      return [slots[index], next => {
        slots[index] = typeof next === 'function' ? next(slots[index]) : next
        if (['loading', 'success', 'error'].includes(slots[index])) states.push(slots[index])
      }]
    },
    useRef(initial) { const index = cursor++; return slots[index] ||= { current: initial } },
    useId() { cursor++; return 'synthetic-id' },
  }
  const module = { exports: {} }
  const fetch = async (url, options) => {
    requests.push({ url, options })
    if (pauseFetch) await pauseFetch
    if (provider === 'network-error') throw Error('Synthetic network failure')
    return { ok: provider !== 'http-error', json: async () => {
      if (pauseJSON) await pauseJSON
      if (provider === 'invalid-json') throw Error('Synthetic invalid JSON')
      return { success: provider !== 'provider-refusal' }
    } }
  }
  new Function('require', 'module', 'exports', 'window', 'fetch', variant.code)(id => {
    if (id === 'react') return react
    if (id.includes('/utils/consent')) return { trackEnquiry: category => { tracked.push(category); return track(category) } }
    if (id.includes('/utils/whatsapp')) return { openWhatsApp: url => { opened.push(url); return open } }
    if (id.includes('/hooks/useSEO')) return { useSEO() {} }
    if (id.includes('/components/')) return { __esModule: true, default: () => null }
    return require(id)
  }, module, module.exports, { location: { search: '' } }, fetch)
  function render() { cursor = 0; tree = module.exports.default({ defaultPackage: 'Himalayan Photography Expedition' }); return tree }
  render()
  const app = {
    render, requests, tracked, opened, states,
    form: () => nodes('form', tree)[0],
    links: () => nodes('a', tree),
    text: () => label(tree),
    change(name, value) {
      const field = ['input', 'select', 'textarea'].flatMap(type => nodes(type, tree)).find(n => n.props.name === name)
      assert.ok(field, name); field.props.onChange({ target: { name, value } }); render()
    },
    origin() { const button = nodes('button', tree).find(n => label(n).includes('From India')); button.props.onClick(); render() },
    submit: () => { const handler = app.form().props.onSubmit; return handler({ preventDefault() {} }) },
  }
  return app
}
function fill(app, variant) {
  if (!variant.whatsapp) app.origin()
  for (const [name, value] of Object.entries(variant.whatsapp
    ? { name: 'Synthetic traveller', whatsapp: '0000000000', pkg: 'Himalayan Photography Expedition', month: 'May' }
    : { name: 'Synthetic traveller', email: 'synthetic@example.invalid', phone: '0000000000', expedition: 'Custom / Other' })) app.change(name, value)
}
function accepted(app, variant) {
  assert.deepEqual(app.states, ['loading', 'success'])
  assert.equal(app.requests.length, 1)
  assert.equal(app.opened.length, variant.whatsapp ? 1 : 0)
  app.render(); app.render()
  assert.equal(app.form(), undefined, 'success rerenders remove the submit form')
  assert.equal(app.requests.length, 1); assert.equal(app.tracked.length, 1)
  assert.equal(app.opened.length, variant.whatsapp ? 1 : 0, 'rerenders do not repeat automatic handoff')
}

for (const variant of variants) {
  for (const mode of ['success', 'throws', 'rejects', 'pending']) {
    test(`${variant.name}: provider accepted, analytics ${mode}, success and rerenders preserved`, async () => {
      const track = () => {
        if (mode === 'throws') throw Error('Synthetic analytics exception')
        if (mode === 'rejects') return Promise.reject(Error('Synthetic analytics rejection'))
        if (mode === 'pending') return new Promise(() => {})
      }
      const app = mount(variant, { track }); fill(app, variant)
      await app.submit(); await new Promise(resolve => setImmediate(resolve))
      accepted(app, variant)
      assert.deepEqual(app.tracked, [variant.category])
    })
  }

  for (const provider of ['provider-refusal', 'http-error', 'network-error', 'invalid-json']) {
    test(`${variant.name}: ${provider} remains error, no accepted event or WhatsApp`, async () => {
      const app = mount(variant, { provider, track: () => { throw Error('Must not be called') } }); fill(app, variant)
      await app.submit(); app.render()
      assert.deepEqual(app.states, ['loading', 'error']); assert.equal(app.requests.length, 1)
      assert.equal(app.tracked.length, 0); assert.equal(app.opened.length, 0); assert.ok(app.form())
    })
  }

  test(`${variant.name}: invalid data exits existing handler guard with no side effects`, async () => {
    const app = mount(variant)
    await app.submit()
    assert.equal(app.requests.length, 0); assert.equal(app.tracked.length, 0); assert.equal(app.opened.length, 0)
    assert.deepEqual(app.states, [])
    // Contact guards missing origin; browser-native field validation is a separate browser QA check.
  })

  test(`${variant.name}: repeated clicks and rerender during fetch/JSON submit once despite analytics rejection`, async () => {
    let releaseFetch, releaseJSON
    const pauseFetch = new Promise(resolve => { releaseFetch = resolve })
    const pauseJSON = new Promise(resolve => { releaseJSON = resolve })
    const app = mount(variant, { pauseFetch, pauseJSON, track: () => Promise.reject(Error('Synthetic analytics rejection')) })
    fill(app, variant)
    const first = app.submit(); app.render(); await app.submit(); await app.submit()
    assert.equal(app.requests.length, 1)
    releaseFetch(); await new Promise(resolve => setImmediate(resolve)); app.render(); await app.submit()
    assert.equal(app.requests.length, 1); assert.equal(app.tracked.length, 0)
    releaseJSON(); await first; await new Promise(resolve => setImmediate(resolve))
    accepted(app, variant)
  })

  for (const scenario of ['missing', 'denied', 'clarity-only', 'withdrawn', 'sdk-unavailable', 'sdk-blocked', 'gtag-throws']) {
    test(`${variant.name}: actual consent helper, ${scenario}, provider success unaffected`, async () => {
      const allowed = ['withdrawn', 'sdk-unavailable', 'sdk-blocked', 'gtag-throws'].includes(scenario)
      const controller = consent(scenario === 'missing' ? undefined : allowed, scenario === 'clarity-only')
      if (scenario === 'withdrawn') controller.saveConsent({ analytics: false, recording: false })
      if (scenario === 'sdk-unavailable') delete controller.window.gtag
      if (scenario === 'gtag-throws') controller.window.gtag = () => { throw Error('Synthetic gtag exception') }
      // sdk-blocked leaves the real consent controller's queue installed; no SDK executes.
      const app = mount(variant, { track: controller.trackEnquiry }); fill(app, variant)
      await app.submit(); accepted(app, variant)
      const events = controller.events()
      assert.equal(events.length, scenario === 'sdk-blocked' ? 1 : 0)
      if (events.length) {
        assert.equal(events[0][1], 'form_submit')
        assert.deepEqual(JSON.parse(JSON.stringify(events[0][2])), { event_category: variant.category, value: 1 })
      }
      if (scenario === 'missing') {
        controller.saveConsent({ analytics: true, recording: false })
        assert.equal(controller.events().length, 0, 'no retroactive event replay')
      }
    })
  }

  test(`${variant.name}: Analytics withdrawal while provider request is pending suppresses accepted event`, async () => {
    const controller = consent(true, false)
    let releaseFetch
    const app = mount(variant, { track: controller.trackEnquiry, pauseFetch: new Promise(resolve => { releaseFetch = resolve }) })
    fill(app, variant); const request = app.submit()
    controller.saveConsent({ analytics: false, recording: false }); releaseFetch(); await request
    accepted(app, variant); assert.equal(controller.events().length, 0)
  })
}

for (const open of [true, false]) {
  test(`ExpeditionForm: analytics rejection preserves WhatsApp handoff and opened=${open} fallback`, async () => {
    const variant = variants[1], app = mount(variant, { open, track: () => Promise.reject(Error('Synthetic analytics rejection')) })
    fill(app, variant); await app.submit(); await new Promise(resolve => setImmediate(resolve)); accepted(app, variant)
    const fallback = app.links().find(n => label(n) === 'Open WhatsApp')
    assert.ok(fallback); assert.equal(fallback.props.href, app.opened[0])
    assert.ok(app.text().includes(open ? 'Review your details in WhatsApp' : 'WhatsApp could not be opened automatically'))
  })
}
