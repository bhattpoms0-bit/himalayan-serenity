// Exercise the actual component's actions without loading tracking SDKs.
// Responsive geometry remains a browser QA check, not a mocked layout claim.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { transformSync } from 'esbuild'

const require = createRequire(import.meta.url)
const source = readFileSync(new URL('../src/components/CookieConsent.jsx', import.meta.url), 'utf8')
const code = transformSync(source, { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code
function mount(saved = null) {
  const state = [], effects = [], handlers = new Map(), saves = [], applied = []
  let cursor = 0, first = true, tree
  const controller = {
    readConsent: () => saved,
    saveConsent(next) { saved = { ...next, version: 1, savedAt: Date.now() }; saves.push(saved); return { choice: saved, persisted: true } },
    applyConsent: value => applied.push(value), clearTrackingCookies() {}, CONSENT_KEY: 'hs-privacy-v1', CONSENT_LIFETIME: 180 * 86400000,
  }
  const react = {
    useState(initial) {
      const index = cursor++
      if (!(index in state)) state[index] = typeof initial === 'function' ? initial() : initial
      return [state[index], value => { state[index] = typeof value === 'function' ? value(state[index]) : value }]
    },
    useRef(initial) { const index = cursor++; return state[index] ||= { current: initial } },
    useEffect(fn) { if (first) effects.push(fn) }, useLayoutEffect() {},
  }
  const module = { exports: {} }
  const document = { activeElement: { isConnected: true, focus() {} } }
  const window = { addEventListener: (name, fn) => handlers.set(name, fn), removeEventListener() {} }
  new Function('require', 'module', 'exports', 'document', 'window', 'requestAnimationFrame', code)(id => {
    if (id === 'react') return react
    if (id === '../utils/consent') return controller
    if (id === 'react-router-dom') return { Link: 'a' }
    if (id.endsWith('.css')) return {}
    return require(id)
  }, module, module.exports, document, window, fn => fn())
  function render() { cursor = 0; tree = module.exports.default(); first = false; return tree }
  render()
  effects[0]() // Register the actual footer reopening handler; no provider network.
  function nodes(type, value) {
    if (!value || typeof value !== 'object') return []
    if (Array.isArray(value)) return value.flatMap(child => nodes(type, child))
    return [...(value.type === type ? [value] : []), ...nodes(type, value.props?.children)]
  }
  const label = value => Array.isArray(value) ? value.map(label).join('') : typeof value === 'object' ? label(value?.props?.children) : value || ''
  return {
    buttons: () => nodes('button', tree).map(button => label(button)),
    inputs: () => nodes('input', tree),
    visible: () => nodes('section', tree).length > 0,
    click(name) { const button = nodes('button', tree).find(button => label(button) === name); assert.ok(button, name); button.props.onClick(); render() },
    toggle(index, checked) { nodes('input', tree)[index].props.onChange({ target: { checked } }); render() },
    reopen() { handlers.get('hs-open-privacy')(); render() },
    escape() { nodes('section', tree)[0].props.onKeyDown({ key: 'Escape' }); render() },
    saves, applied, saved: () => saved,
  }
}

test('fresh settings keep both services off; cancelling a changed draft writes nothing', () => {
  const app = mount()
  assert.deepEqual(app.buttons(), ['Accept', 'Reject', 'Settings'])
  app.click('Settings')
  assert.deepEqual(app.buttons(), ['Save Preferences', 'Reject All', 'Close Settings'])
  assert.deepEqual(app.inputs().map(input => input.props.checked), [false, false])
  app.toggle(0, true)
  app.click('Close Settings')
  assert.equal(app.saves.length, 0)
  assert.equal(app.saved(), null)
  assert.equal(app.visible(), true)
  app.click('Settings')
  assert.deepEqual(app.inputs().map(input => input.props.checked), [false, false])
  assert.deepEqual(app.applied, [null])
})

for (const [analytics, recording] of [[true, false], [false, true], [false, false]]) {
  test(`saving analytics=${analytics}, Clarity=${recording} hides bar and restores independent preferences`, () => {
    const app = mount()
    app.click('Settings')
    app.toggle(0, analytics); app.toggle(1, recording)
    app.click('Save Preferences')
    assert.equal(app.visible(), false)
    assert.equal(app.saved().analytics, analytics); assert.equal(app.saved().recording, recording)
    app.reopen()
    assert.deepEqual(app.inputs().map(input => input.props.checked), [analytics, recording])
    app.toggle(0, !analytics); app.toggle(1, !recording)
    app.escape()
    assert.equal(app.visible(), false)
    assert.equal(app.saves.length, 1, 'Escape must not persist the abandoned draft')
    app.reopen()
    assert.deepEqual(app.inputs().map(input => input.props.checked), [analytics, recording])
  })
}

test('Accept/Reject and expanded Reject All save exactly their intended choices', () => {
  for (const action of ['Accept', 'Reject', 'Reject All']) {
    const app = mount()
    if (action === 'Reject All') { app.click('Settings'); app.toggle(0, true); app.toggle(1, true) }
    app.click(action)
    assert.equal(app.saved().analytics, action === 'Accept')
    assert.equal(app.saved().recording, action === 'Accept')
    assert.equal(app.visible(), false)
  }
})
