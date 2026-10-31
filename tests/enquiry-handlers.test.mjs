import { readFileSync } from 'node:fs'
import { parse } from '@babel/parser'
import test from 'node:test'
import assert from 'node:assert/strict'

const files = ['src/components/ExpeditionForm.jsx', 'src/pages/Contact.jsx', 'src/pages/InternationalRetreats.jsx',
  'src/pages/DarmaValleyWomensRetreat.jsx', 'src/pages/retreats/DarmaDetox.jsx', 'src/pages/retreats/KumaonWellness.jsx',
  'src/pages/retreats/Panchakarma.jsx', 'src/pages/retreats/WomensRetreat.jsx']
function findHandler(node) {
  if (!node || typeof node !== 'object') return null
  if (node.type === 'VariableDeclarator' && node.id?.name === 'handleSubmit') return node.init
  for (const value of Object.values(node)) {
    for (const child of Array.isArray(value) ? value : [value]) {
      const result = findHandler(child); if (result) return result
    }
  }
  return null
}
for (const file of files) {
  const source = readFileSync(new URL('../' + file, import.meta.url), 'utf8')
  const ast = parse(source, { sourceType: 'module', plugins: ['jsx'] }); const handler = findHandler(ast)
  assert.ok(handler, file)
  for (const origin of ['india', 'outside']) for (const scenario of ['success', 'http-error', 'provider-refusal', 'network-error', 'invalid-json']) {
    test(`${file}: ${origin}, ${scenario} (in-memory provider)`, async () => {
      const states = [], calls = [], opened = [], tracked = []
      const form = { name: 'Local Test', email: 'test@example.invalid', phone: '0000000000', whatsapp: '0000000000',
        pkg: 'Test package', month: 'May', expedition: 'Test journey', travellers: '2', travelPlan: 'Just exploring for now',
        message: 'Synthetic test only', country: 'Test country', retreat: 'Test retreat', dates: 'Test dates', groupSize: '2', heardFrom: 'Test' }
      const fetch = async (url, options) => {
        calls.push({ url, options })
        if (scenario === 'network-error') throw Error('Synthetic network error')
        return { ok: scenario !== 'http-error', json: async () => {
          if (scenario === 'invalid-json') throw Error('Synthetic invalid JSON')
          return { success: scenario !== 'provider-refusal' }
        } }
      }
      const fn = new Function('form', 'origin', 'setStatus', 'fetch', 'trackEnquiry', 'window', 'WEB3FORMS_ACCESS_KEY', 'WEB3FORMS_KEY', 'submissionInFlight', 'openWhatsApp', 'setWhatsApp',
        `return (${source.slice(handler.start, handler.end)})`)(form, origin, s => states.push(s), fetch,
        s => tracked.push(s), { open: (...a) => opened.push(a) }, 'synthetic-key', 'synthetic-key', { current: false }, (...a) => opened.push(a), () => {})
      let prevented = false; await fn({ preventDefault() { prevented = true } })
      assert.equal(prevented, true); assert.equal(calls.length, 1)
      assert.equal(calls[0].url, 'https://api.web3forms.com/submit'); assert.equal(calls[0].options.method, 'POST')
      const payload = JSON.parse(calls[0].options.body); assert.equal(payload.name, form.name); assert.equal(payload.access_key, 'synthetic-key')
      assert.equal(states.at(-1), scenario === 'success' ? 'success' : 'error')
      if (scenario !== 'success') { assert.equal(opened.length, 0); assert.equal(tracked.length, 0) }
      if (scenario === 'success' && file.includes('ExpeditionForm')) assert.match(opened[0][0], /^https:\/\/wa.me\/919084642557\?text=/)
    })
  }
}

for (const file of files) {
  const source = readFileSync(new URL('../' + file, import.meta.url), 'utf8')
  const handler = findHandler(parse(source, { sourceType: 'module', plugins: ['jsx'] }))
  for (const outcome of ['success', 'http-error', 'provider-refusal', 'network-error', 'invalid-json']) {
    test(`${file}: overlap across rerender, JSON wait, and retry after ${outcome}`, async () => {
      let releaseFetch, releaseJSON
      let calls = 0
      const states = [], guard = { current: false }
      const fetchGate = new Promise(resolve => { releaseFetch = resolve })
      const jsonGate = new Promise(resolve => { releaseJSON = resolve })
      const form = { name: 'Test', whatsapp: '000', pkg: 'Test package', month: 'May' }
      const fetch = async () => {
        calls++
        if (calls > 1) return { ok: true, json: async () => ({ success: true }) }
        await fetchGate
        if (outcome === 'network-error') throw Error('offline')
        return { ok: outcome !== 'http-error', json: async () => {
          await jsonGate
          if (outcome === 'invalid-json') throw Error('invalid JSON')
          return { success: outcome !== 'provider-refusal' }
        } }
      }
      const makeHandler = () => new Function('form', 'origin', 'setStatus', 'fetch', 'trackEnquiry',
        'WEB3FORMS_ACCESS_KEY', 'WEB3FORMS_KEY', 'submissionInFlight', 'openWhatsApp', 'setWhatsApp',
        `return (${source.slice(handler.start, handler.end)})`)(form, 'india', s => states.push(s), fetch,
        () => {}, 'test-key', 'test-key', guard, () => false, () => {})
      const event = { preventDefault() {} }
      const first = makeHandler()(event)
      await makeHandler()(event) // a fresh closure must share the same ref
      assert.equal(calls, 1)
      releaseFetch()
      await Promise.resolve(); await Promise.resolve()
      if (outcome !== 'network-error') {
        await makeHandler()(event)
        assert.equal(calls, 1, 'guard must cover response JSON parsing')
      }
      releaseJSON()
      await first
      assert.equal(guard.current, false)
      assert.equal(states.at(-1), outcome === 'success' ? 'success' : 'error')
      if (outcome !== 'success') {
        await makeHandler()(event)
        assert.equal(calls, 2, 'retry must send a new request')
        assert.equal(states.at(-1), 'success')
      }
    })
  }
}
