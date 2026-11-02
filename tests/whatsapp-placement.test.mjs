import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { transformSync } from 'esbuild'
import { chooseFloatingPosition } from '../src/utils/floatingPlacement.js'

const require = createRequire(import.meta.url)
const source = readFileSync(new URL('../src/components/WhatsAppButton.jsx', import.meta.url), 'utf8')
const code = transformSync(source, { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code

// Exercise component effects against modeled dock DOM changes. These are not browser layout tests.
function mount({ pathname, width, inline = false }) {
  let cursor = 0, dirty = true, tree, docks = [], frameId = 0
  const slots = [], effects = [], observers = [], frames = new Map(), listeners = new Map(), queries = []
  const button = { offsetWidth: 48, offsetHeight: 48 }
  const root = {}, body = {}
  function state(initial) {
    const index = cursor++
    if (!(index in slots)) slots[index] = typeof initial === 'function' ? initial() : initial
    return [slots[index], next => {
      const value = typeof next === 'function' ? next(slots[index]) : next
      if (!Object.is(value, slots[index])) { slots[index] = value; dirty = true }
    }]
  }
  function effect(callback, deps) {
    const index = cursor++
    const previous = slots[index]
    if (!previous || deps.some((value, i) => !Object.is(value, previous.deps[i]))) {
      previous?.cleanup?.()
      const record = { deps }
      slots[index] = record
      effects.push(() => { record.cleanup = callback() })
    }
  }
  class Observer {
    constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this) }
    observe(target) { this.targets.add(target) }
    unobserve(target) { this.targets.delete(target) }
    disconnect() { this.targets.clear() }
  }
  const window = {
    innerHeight: 844,
    matchMedia(query) {
      const limit = Number(query.match(/\d+/)[0])
      const result = { get matches() { return width <= limit }, addEventListener(_, cb) { this.callback = cb }, removeEventListener() { this.callback = null } }
      queries.push(result)
      return result
    },
    getComputedStyle: element => ({ bottom: String(element.bottom || 0) }),
    addEventListener(name, callback) {
      if (!listeners.has(name)) listeners.set(name, new Set())
      listeners.get(name).add(callback)
    },
    removeEventListener(name, callback) { listeners.get(name)?.delete(callback) },
  }
  const document = {
    body, documentElement: { ...root, get clientWidth() { return width } },
    querySelector(selector) { return selector === '[data-not-found]' && pathname === '/seo-test-unknown-page' ? {} : null },
    querySelectorAll() { return docks },
  }
  const module = { exports: {} }
  new Function('require', 'module', 'exports', 'window', 'document', 'MutationObserver', 'ResizeObserver', 'requestAnimationFrame', 'cancelAnimationFrame', code)(id => {
    if (id === 'react') return { useState: state, useEffect: effect, useLayoutEffect: effect, useRef: () => {
      const index = cursor++
      return slots[index] ??= { current: button }
    } }
    if (id === 'react-router-dom') return { useLocation: () => ({ pathname }) }
    if (id === 'framer-motion') return { motion: { a: 'a' } }
    if (id === 'lucide-react') return { MessageCircle: () => null }
    if (id === '../data/retreats') return {
      PANCHACHULI_WELLNESS: { href: '/retreats/panchachuli-wellness' },
      WOMENS_SACRED_HIMALAYA: { href: '/retreats/womens-retreat' },
    }
    if (id === '../utils/floatingPlacement') return { chooseFloatingPosition }
    return require(id)
  }, module, module.exports, window, document, Observer, Observer,
  callback => { frames.set(++frameId, callback); return frameId }, id => frames.delete(id))

  function flush() {
    for (let pass = 0; pass < 30; pass++) {
      if (dirty) {
        dirty = false; cursor = 0
        tree = module.exports.default({ inline })
        for (const run of effects.splice(0)) run()
      }
      const pending = [...frames.values()]
      frames.clear()
      for (const run of pending) run()
      if (!dirty && !frames.size) return inline ? tree.props : tree.props.children[1].props
    }
    throw Error('Component did not settle')
  }
  return {
    render: flush,
    docks(next) {
      docks = next.map(({ height, bottom = 0 }) => ({
        offsetWidth: width, offsetHeight: height, bottom,
        hasAttribute: () => false,
        getBoundingClientRect: () => ({ left: 0, right: width, width, height, top: 844 - bottom - height, bottom: 844 - bottom }),
      }))
      for (const observer of observers) if (observer.targets.size) observer.callback()
      return flush()
    },
    resize(nextWidth) {
      width = nextWidth; dirty = true
      for (const query of queries) query.callback?.()
      for (const callback of listeners.get('resize') || []) callback()
      return flush()
    },
  }
}

const expectedURL = 'https://wa.me/919084642557?text=' + encodeURIComponent(
  'Hello! I found your website and I am interested in your Himalayan travel packages. Please share more details.'
)
function accessibleLink(props) {
  assert.equal(props.href, expectedURL)
  assert.equal(props.target, '_blank')
  assert.equal(props.rel, 'noopener noreferrer')
  assert.equal(props['aria-label'], 'Chat on WhatsApp')
  assert.notEqual(props['aria-hidden'], true)
  assert.notEqual(props.tabIndex, -1)
  assert.notEqual(props.style?.pointerEvents, 'none')
}
function docked(props, offset) {
  accessibleLink(props)
  assert.match(props.className, /wa-mobile-docked/)
  assert.equal(props.style.position, 'fixed')
  assert.equal(props.style.top, 'auto')
  assert.equal(props.style.bottom, `calc(${offset}px + max(16px, env(safe-area-inset-bottom, 0px)))`)
}

for (const pathname of ['/experiences', '/seo-test-unknown-page']) {
  for (const width of [390, 768]) {
    test(`${pathname}, ${width}px: remains fixed through banner open, Reject, Accept and reopened settings`, () => {
      const app = mount({ pathname, width })
      docked(app.render(), 0)
      docked(app.docks([{ height: 146 }]), 146)
      // Model removal of the banner by either consent choice; no analytics executes in this test.
      docked(app.docks([]), 0) // Reject
      docked(app.docks([{ height: 146 }]), 146)
      docked(app.docks([]), 0) // Accept
      docked(app.docks([{ height: 430 }]), 430) // Privacy Settings reopened
      docked(app.docks([{ height: 430 }, { height: 68, bottom: 430 }]), 498)
      docked(app.docks([{ height: 68 }]), 68) // sticky actions after banner closes
      const desktop = app.resize(1440)
      assert.doesNotMatch(desktop.className, /wa-mobile-docked/)
      accessibleLink(desktop)
      docked(app.resize(width), 68)
    })
  }
}

for (const width of [390, 768, 1440]) {
  test(`${width}px: homepage and reviewed retreat retain their existing WhatsApp variants`, () => {
    const homeApp = mount({ pathname: '/', width })
    const home = homeApp.render()
    assert.match(home.className, /wa-home/)
    assert.doesNotMatch(home.className, /wa-mobile-docked/)
    accessibleLink(home)
    for (const docks of [[{ height: 146 }], [], [{ height: 430 }], []]) {
      accessibleLink(homeApp.docks(docks))
    }
    const retreat = mount({ pathname: '/retreats/panchachuli-wellness', width }).render()
    assert.match(retreat.className, /wa-retreat/)
    assert.doesNotMatch(retreat.className, /wa-mobile-docked/)
    const inlineApp = mount({ pathname: '/retreats/panchachuli-wellness', width, inline: true })
    accessibleLink(inlineApp.render())
    for (const docks of [[{ height: 146 }], [], [{ height: 430 }], []]) {
      accessibleLink(inlineApp.docks(docks))
    }
  })
}

for (const pathname of ['/experiences', '/seo-test-unknown-page']) {
  test(`${pathname}, 1440px: desktop link remains accessible through banner transitions`, () => {
    const app = mount({ pathname, width: 1440 })
    for (const props of [app.render(), app.docks([{ height: 64 }]), app.docks([]), app.docks([{ height: 300 }])]) {
      accessibleLink(props)
      assert.doesNotMatch(props.className, /wa-mobile-docked/)
    }
  })
}
