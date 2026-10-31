import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { parse } from '@babel/parser'

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8')
const helper = read('src/utils/whatsapp.js').replace('export function', 'function')
function find(node, predicate) {
  if (!node || typeof node !== 'object') return null
  if (predicate(node)) return node
  for (const value of Object.values(node)) for (const child of Array.isArray(value) ? value : [value]) {
    const result = find(child, predicate); if (result) return result
  }
  return null
}
for (const mode of ['opened', 'blocked', 'throws', 'restricted-proxy']) {
  test(`WhatsApp ${mode}: provider success stays success, exact template and usable fallback`, async () => {
    const opened = [], states = [], whatsapp = []
    const popup = mode === 'restricted-proxy' ? Object.defineProperty({}, 'opener', { set() { throw Error('restricted') } }) : {}
    const window = { open(url, target) {
      opened.push({ url, target })
      if (mode === 'throws') throw Error('popup blocked')
      return mode === 'blocked' ? null : popup
    } }
    const openWhatsApp = new Function('window', helper + '\nreturn openWhatsApp')(window)
    const source = read('src/components/ExpeditionForm.jsx')
    const ast = parse(source, { sourceType: 'module', plugins: ['jsx'] })
    const handler = find(ast, n => n.type === 'VariableDeclarator' && n.id?.name === 'handleSubmit').init
    const form = { name: 'Test & Traveller', whatsapp: '+91 000', pkg: 'Test Journey', month: 'May' }
    const fn = new Function('form', 'setStatus', 'fetch', 'trackEnquiry', 'WEB3FORMS_KEY', 'submissionInFlight', 'openWhatsApp', 'setWhatsApp',
      `return (${source.slice(handler.start, handler.end)})`)(form, s => states.push(s),
      async () => ({ ok: true, json: async () => ({ success: true }) }), () => {}, 'test', { current: false }, openWhatsApp, s => whatsapp.push(s))
    await fn({ preventDefault() {} })
    assert.equal(states.at(-1), 'success')
    assert.equal(whatsapp[0].opened, mode === 'opened' || mode === 'restricted-proxy')
    assert.equal(whatsapp[0].url, opened[0].url)
    const url = new URL(whatsapp[0].url)
    assert.equal(url.origin + url.pathname, 'https://wa.me/919084642557')
    assert.equal(url.searchParams.get('text'), `Hello! I am ${form.name}. My WhatsApp is ${form.whatsapp}. I am interested in the ${form.pkg} package. I am planning to travel in ${form.month}. Please send me the itinerary.`)
    assert.match(source, /href=\{whatsApp\?\.url\} target="_blank" rel="noopener noreferrer"/)
    assert.doesNotMatch(source, /WhatsApp is opening|message (?:was |has been )?sent/i)
    if (mode === 'opened') assert.equal(popup.opener, null)
  })

  test(`Adi WhatsApp ${mode}: exact destination/message and fallback`, () => {
    const source = read('src/pages/AdiKailashExpedition.jsx')
    const ast = parse(source, { sourceType: 'module', plugins: ['jsx'] })
    const handler = find(ast, n => n.type === 'ArrowFunctionExpression' && source.slice(n.start, n.end).includes('setWaFallback(openWhatsApp'))
    assert.ok(handler)
    let fallback
    const openWhatsApp = new Function('window', helper + '\nreturn openWhatsApp')({ open() {
      if (mode === 'throws') throw Error('blocked')
      return mode === 'blocked' ? null : {}
    } })
    new Function('waName', 'waPhone', 'openWhatsApp', 'setWaFallback', `return (${source.slice(handler.start, handler.end)})`)('Test', '000', openWhatsApp, value => { fallback = value })()
    if (mode === 'blocked' || mode === 'throws') {
      const url = new URL(fallback)
      assert.equal(url.origin + url.pathname, 'https://wa.me/919084642557')
      assert.equal(url.searchParams.get('text'), "Hi, I'm Test the Adi Kailash & Om Parvat Expedition. My WhatsApp: 000")
    } else assert.equal(fallback, '')
    assert.match(source, /href=\{waFallback\} target="_blank" rel="noopener noreferrer"/)
  })
}
