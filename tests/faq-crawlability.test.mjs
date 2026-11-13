// Actual FAQ render/handlers with only page-level dependencies isolated.
// Native keyboard input, focus and responsive geometry require browser QA.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { transformSync } from 'esbuild'
import { renderToStaticMarkup } from 'react-dom/server'
import * as faqHelp from '../src/data/faqHelp.js'

const require = createRequire(import.meta.url)
const source = readFileSync(new URL('../src/pages/FAQ.jsx', import.meta.url), 'utf8')
const code = transformSync(source, { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code
const questions = [
  'When is the most auspicious time to visit?',
  'How should I prepare for the spiritual ascent?',
  'What essential gear is provided?',
  'Is the journey suitable for senior travelers?',
  'What safety measures are in place?',
  'Do you offer women-only departures?',
]
const answers = [
  'The best time for Himalayan expeditions is May–June and September–October. These months offer stable weather, clear skies, and the most vibrant spiritual festivals. Our guides can also advise based on your specific pilgrimage goals.',
  'We recommend 2–3 months of moderate physical training, including daily walking and breathing exercises. Spiritually, practicing mindfulness and meditation helps open you to the transformative nature of the journey. Our pre-departure kit includes a full preparation guide.',
  'Equipment and support depend on the itinerary. Ask us to confirm what is included, what you should bring and any altitude-related support arrangements before booking. Do not assume oxygen, medical personnel or satellite communications are included in every journey.',
  'Suitability depends on the itinerary, altitude, health and fitness. Discuss the pace and participation requirements with us before booking, and seek medical advice where appropriate. Medical personnel are not guaranteed on every journey.',
  'We take a safety-conscious approach to planning. Ask us to confirm route-specific support and emergency arrangements before booking. Remote terrain, weather and communications can affect access to assistance; no particular rescue service, response time or evacuation outcome is guaranteed.',
  "Yes. Our dedicated Women's Sacred Himalaya Retreat departs throughout the season, led entirely by female mountain experts and spiritual guides. These journeys foster a uniquely empowering and safe environment.",
]

function mount() {
  const state = []
  let cursor = 0, tree
  const react = {
    useState(initial) {
      const index = cursor++
      if (!(index in state)) state[index] = initial
      return [state[index], next => { state[index] = typeof next === 'function' ? next(state[index]) : next }]
    },
    useRef: current => ({ current }), useEffect() {},
  }
  const module = { exports: {} }
  new Function('require', 'module', 'exports', code)(id => {
    if (id === 'react') return react
    if (id === '../hooks/useSEO') return { useSEO() {} }
    if (id === '../data/faqHelp') return faqHelp
    if (id === '../components/Navbar' || id === '../components/Footer') return { default: () => null, __esModule: true }
    if (id === 'react-router-dom') return { Link: ({ to, ...props }) => require('react').createElement('a', { ...props, href: to }) }
    return require(id)
  }, module, module.exports)
  function render() { cursor = 0; tree = module.exports.default() }
  function nodes(value) {
    if (!value || typeof value !== 'object') return []
    if (Array.isArray(value)) return value.flatMap(nodes)
    return [value, ...nodes(value.props?.children)]
  }
  const panels = () => nodes(tree).filter(node => /^faq-answer-\d$/.test(node.props?.id))
  const triggers = () => nodes(tree).filter(node => /^faq-question-\d$/.test(node.props?.id))
  render()
  return { panels, triggers, html: () => renderToStaticMarkup(tree), click(index) { triggers()[index].props.onClick(); render() } }
}

const text = html => html.replace(/<[^>]*>/g, '').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&')

test('initial FAQ HTML contains all six complete, unchanged answers once, in real disclosure panels', () => {
  const app = mount(), html = app.html()
  assert.equal(app.panels().length, 6)
  questions.forEach(question => assert.ok(text(html).includes(question)))
  answers.forEach(answer => assert.equal(text(html).split(answer).length - 1, 1, answer))
  assert.ok(html.includes('href="/packages/adi-kailash-expedition"'))
  assert.ok(html.includes('href="/retreats/womens-retreat"'))
  assert.equal((html.match(/inert=""/g) || []).length, 6)
  const styles = [...html.matchAll(/id="faq-answer-\d"[^>]*style="([^"]*)"/g)].map(match => match[1])
  assert.equal(styles.length, 6)
  styles.forEach(style => {
    assert.match(style, /(?:^|;)height:0(?:px)?(?:;|$)/)
    assert.match(style, /(?:^|;)opacity:0(?:;|$)/)
    assert.match(style, /(?:^|;)overflow:hidden(?:;|$)/)
  })
})

test('each native button controls a persistent labelled panel with correct collapsed/open semantics', () => {
  const app = mount()
  function check(open = -1) {
    app.triggers().forEach((trigger, i) => {
      const panel = app.panels()[i]
      assert.equal(trigger.type, 'button')
      assert.equal(trigger.props.type, 'button')
      assert.equal(trigger.props['aria-controls'], panel.props.id)
      assert.equal(panel.props.role, 'region')
      assert.equal(panel.props['aria-labelledby'], trigger.props.id)
      assert.equal(trigger.props['aria-expanded'], i === open)
      assert.equal(panel.props['aria-hidden'], i !== open)
      assert.equal(panel.props.inert, i === open ? undefined : '')
      assert.deepEqual(panel.props.animate, { height: i === open ? 'auto' : 0, opacity: i === open ? 1 : 0 })
    })
    answers.forEach(answer => assert.ok(text(app.html()).includes(answer)))
  }
  check()
  for (let i = 0; i < 6; i++) { app.click(i); check(i); app.click(i); check() }
  app.click(0); app.click(5); check(5)
})
