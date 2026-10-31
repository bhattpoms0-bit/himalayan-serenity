import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import assert from 'node:assert/strict'
import test from 'node:test'

// A browser-boundary simulation: no SDKs execute and no network requests are made.
// Actual provider requests/cookies still require browser verification.
const source = readFileSync(new URL('../src/utils/consent.js', import.meta.url), 'utf8').replaceAll('export ', '')
function browser({ saved, blocked = false, cookies = '', search = '' } = {}) {
  const store = new Map(saved ? [['hs-privacy-v1', JSON.stringify(saved)]] : [])
  const scripts = [], writes = [], events = []
  const location = { hostname: 'www.example.com', pathname: '/contact', origin: 'https://www.example.com', search,
    href: `https://www.example.com/contact${search}#consultation`, reloads: 0, replacement: '',
    reload() { this.reloads++ }, replace(url) { this.replacement = url } }
  const document = { getElementById: id => scripts.find(s => s.id === id), createElement: () => ({}),
    head: { appendChild: s => scripts.push(s) }, get cookie() { return cookies }, set cookie(value) { writes.push(value) } }
  const localStorage = { getItem: key => store.get(key) || null,
    setItem(key, value) { if (blocked) throw Error('Storage unavailable'); store.set(key, value) },
    removeItem(key) { if (blocked) throw Error('Read-only storage'); store.delete(key) } }
  const window = { dispatchEvent: e => events.push(e.type) }
  const history = { state: null, replaceState(_state, _title, url) { location.href = url; location.search = new URL(url).search } }
  const context = vm.createContext({ window, document, localStorage, location, history, URL, URLSearchParams, Event, Date })
  vm.runInContext(source + '\nglobalThis.api = { readConsent, saveConsent, applyConsent, clearTrackingCookies, trackEnquiry, openPrivacySettings }', context)
  return { ...context.api, window, scripts, writes, events, location, store }
}
const saved = (analytics, recording, savedAt = Date.now()) => ({ version: 1, analytics, recording, savedAt })
const args = values => Array.from(values || [], a => Array.from(a))

test('fresh and rejected visits do not inject tracking or queue enquiry events', () => {
  for (const value of [undefined, saved(false, false)]) {
    const b = browser({ saved: value }); b.applyConsent(b.readConsent()); b.trackEnquiry('Contact')
    assert.equal(b.scripts.length, 0); assert.equal(b.window.gtag, undefined); assert.equal(b.window.clarity, undefined)
  }
})
test('accept persists versioned permissions and loads the original two IDs once', () => {
  const b = browser(); const result = b.saveConsent({ analytics: true, recording: true }); b.applyConsent(b.readConsent())
  assert.equal(result.persisted, true); assert.equal(b.scripts.length, 2)
  assert.match(b.scripts[0].src, /G-KSWWR8H3WM/); assert.match(b.scripts[1].src, /wo7l0sf1rk/)
  assert.equal(b.readConsent().analytics, true); assert.equal(b.readConsent().recording, true)
})
test('Analytics defaults deny all four types, then grants only analytics before config', () => {
  const b = browser(); b.saveConsent({ analytics: true, recording: false }); const q = args(b.window.dataLayer)
  assert.equal(q[0][1], 'default'); assert.ok(Object.values(q[0][2]).every(v => v === 'denied'))
  assert.equal(q[1][2].analytics_storage, 'granted'); assert.equal(q[3][0], 'config')
  assert.equal(q[3][2].allow_google_signals, false); assert.equal(q[3][2].allow_ad_personalization_signals, false)
})
test('Clarity uses consentv2 with advertising denied before its script is appended', () => {
  const b = browser(); b.saveConsent({ analytics: false, recording: true }); const q = args(b.window.clarity.q)
  assert.equal(q[0][0], 'consentv2'); assert.equal(q[0][1].analytics_Storage, 'granted'); assert.equal(q[0][1].ad_Storage, 'denied')
  assert.equal(b.scripts.length, 1); assert.equal(b.window.gtag, undefined)
})
test('analytics-only and recording-only returning choices remain separate', () => {
  for (const [a, r] of [[true, false], [false, true]]) {
    const b = browser({ saved: saved(a, r) }); b.applyConsent(b.readConsent())
    assert.equal(b.scripts.length, 1); assert.equal(typeof b.window.gtag === 'function', a); assert.equal(typeof b.window.clarity === 'function', r)
  }
})
test('expiry, future timestamps, old versions and malformed values fail closed', () => {
  for (const value of [saved(true, true, Date.now() - 181 * 86400000), saved(true, true, Date.now() + 86400000),
    { ...saved(true, true), version: 2 }, { ...saved(true, true), analytics: 'true' }, {}]) {
    const b = browser({ saved: value }); assert.equal(b.readConsent(), null); b.applyConsent(b.readConsent()); assert.equal(b.scripts.length, 0)
  }
  const b = browser(); b.store.set('hs-privacy-v1', '{bad JSON'); assert.equal(b.readConsent(), null)
})
test('withdrawal saves rejection before reload, denies SDK permission and disables GA', () => {
  const b = browser(); b.saveConsent({ analytics: true, recording: true }); b.saveConsent({ analytics: false, recording: false })
  assert.equal(b.readConsent().analytics, false); assert.equal(b.readConsent().recording, false)
  assert.equal(b.location.reloads, 1); assert.equal(b.window['ga-disable-G-KSWWR8H3WM'], true)
  assert.equal(args(b.window.clarity.q).at(-1)[1].analytics_Storage, 'denied')
  const count = b.window.dataLayer.length; b.trackEnquiry('Contact'); assert.equal(b.window.dataLayer.length, count)
})
test('partial withdrawal reloads with only the retained service selected', () => {
  const b = browser(); b.saveConsent({ analytics: true, recording: true }); b.saveConsent({ analytics: false, recording: true })
  assert.equal(b.location.reloads, 1); assert.equal(b.readConsent().recording, true); assert.equal(b.readConsent().analytics, false)
  const returned = browser({ saved: b.readConsent() }); returned.applyConsent(returned.readConsent())
  assert.equal(returned.scripts.length, 1); assert.match(returned.scripts[0].src, /clarity/)
})
test('known cookie removal covers parent domains and paths without deleting unrelated cookies', () => {
  const b = browser({ cookies: '_ga=one; _ga_TEST=two; _gid=three; _clck=four; _clsk=five; essential=six' }); b.clearTrackingCookies()
  for (const name of ['_ga', '_ga_TEST', '_gid', '_clck', '_clsk']) assert.ok(b.writes.some(w => w.startsWith(name + '=; Max-Age=0;')))
  assert.ok(b.writes.some(w => w.includes('domain=.example.com'))); assert.ok(b.writes.some(w => w.includes('path=/contact')))
  assert.ok(b.writes.every(w => !w.startsWith('essential=')))
})
test('selective cookie cleanup preserves enabled-service cookies', () => {
  const b = browser({ cookies: '_ga=one; _clck=two' }); b.clearTrackingCookies({ analytics: false, recording: true })
  assert.ok(b.writes.some(w => w.startsWith('_clck='))); assert.ok(b.writes.every(w => !w.startsWith('_ga=')))
})
test('blocked storage does not crash rejection or prevent an explicit current-visit choice', () => {
  const b = browser({ blocked: true }); assert.equal(b.saveConsent({ analytics: false, recording: false }).persisted, false)
  assert.equal(b.scripts.length, 0); assert.equal(b.saveConsent({ analytics: true, recording: false }).persisted, false)
  assert.equal(b.scripts.length, 1)
})
test('failed withdrawal persistence cannot reactivate an older grant on the reload', () => {
  const b = browser({ blocked: true, saved: saved(true, true) }); b.applyConsent(b.readConsent())
  b.saveConsent({ analytics: false, recording: false }); assert.match(b.location.replacement, /privacy=off/)
  const returned = browser({ saved: saved(true, true), search: '?privacy=off' }); assert.equal(returned.readConsent(), null)
  returned.applyConsent(returned.readConsent()); assert.equal(returned.scripts.length, 0)
})
test('a successfully saved choice clears the fail-closed URL veto', () => {
  const b = browser({ search: '?privacy=off&expedition=example' }); b.saveConsent({ analytics: true, recording: false })
  assert.equal(new URL(b.location.href).searchParams.has('privacy'), false)
  assert.equal(new URL(b.location.href).searchParams.get('expedition'), 'example'); assert.equal(b.readConsent().analytics, true)
})
test('form event permission excludes enquiry contents and is checked at event time', () => {
  const b = browser(); b.saveConsent({ analytics: true, recording: false }); b.trackEnquiry('Contact')
  const event = args(b.window.dataLayer).at(-1); assert.deepEqual(event.slice(0, 2), ['event', 'form_submit'])
  assert.deepEqual(Object.keys(event[2]).sort(), ['event_category', 'value'])
  b.store.set('hs-privacy-v1', JSON.stringify(saved(false, false))); const before = b.window.dataLayer.length
  b.trackEnquiry('Contact'); assert.equal(b.window.dataLayer.length, before)
})
test('explicit GA page location excludes query strings and fragments', () => {
  const b = browser({ search: '?expedition=example' }); b.saveConsent({ analytics: true, recording: false })
  const config = args(b.window.dataLayer).find(a => a[0] === 'config')[2]
  assert.equal(config.page_location, 'https://www.example.com/contact'); assert.equal(config.page_referrer, '')
})
test('footer event opens preferences without navigation or external transmission', () => {
  const b = browser(); b.openPrivacySettings(); assert.deepEqual(b.events, ['hs-open-privacy']); assert.equal(b.scripts.length, 0)
})

test('saved Accept and Reject survive a fresh runtime; an ignored notice never creates permission', () => {
  for (const accepted of [true, false]) {
    const first = browser()
    first.saveConsent({ analytics: accepted, recording: accepted })
    const stored = JSON.parse(first.store.get('hs-privacy-v1'))
    const returned = browser({ saved: stored })
    assert.equal(returned.readConsent().analytics, accepted)
    assert.equal(returned.readConsent().recording, accepted)
    returned.applyConsent(returned.readConsent())
    assert.equal(returned.scripts.length, accepted ? 2 : 0)
    // Additional page initialisation must not duplicate an accepted SDK.
    returned.applyConsent(returned.readConsent())
    assert.equal(returned.scripts.length, accepted ? 2 : 0)
  }
  const ignored = browser()
  for (let page = 0; page < 3; page++) ignored.applyConsent(ignored.readConsent())
  assert.equal(ignored.readConsent(), null)
  assert.equal(ignored.scripts.length, 0)
  assert.equal(ignored.store.size, 0)
})
