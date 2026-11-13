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
  "What can I expect from a Himalayan yoga and Ayurveda wellness retreat?",
  "Do I need previous yoga experience to join your Himalayan wellness retreats?",
  "What makes Himalayan Serenity Travel's Kumaon wellness retreats different?",
  "Do you offer women-only Himalayan wellness retreats?",
  "Can international travellers join your Himalayan yoga and wellness retreats in India?",
  "What is included in your Himalayan wellness retreats, and how is accommodation arranged?",
  "How can I choose a retreat, check available dates and make a booking?",
  "When is the best time to visit Adi Kailash and Om Parvat in Uttarakhand?",
  "What permits, physical preparation and local support are needed for Adi Kailash and other sacred Himalayan journeys?"
]
const answers = [
  "Our Himalayan wellness retreats offer an opportunity to slow down, reconnect with nature and experience the living traditions of Kumaon in Uttarakhand, India. Depending on your chosen programme, the journey may include guided yoga, pranayama (breathing practices), meditation, mindful walks, cultural encounters and time for personal reflection. Selected retreats also include Ayurveda consultations or therapies, subject to the confirmed programme and practitioner arrangements. Rather than remaining at a single resort, some of our retreats travel through Himalayan destinations such as Pithoragarh, Munsiyari and Kasar Devi, combining wellness activities with mountain landscapes and local culture. Each journey has its own pace, activities and inclusions. We recommend reviewing the itinerary and confirming the wellness services available for your preferred departure before booking.",
  "Previous yoga experience is not necessarily required to enquire about our retreats. However, participation requirements depend on the specific programme, the planned sessions and the physical demands of the journey. Our retreats combine wellness experiences with Himalayan travel, which can include winding mountain roads, walking, early starts and changes in altitude. Before booking, please tell our team about your yoga experience, preferred activity level and any participation requirements you would like to discuss. We can explain the proposed programme and help you determine whether it aligns with your expectations. Yoga sessions and possible adjustments should be confirmed for your particular retreat. We do not assume that every activity is suitable for every traveller.",
  "Himalayan Serenity Travel focuses on thoughtfully curated, small-group wellness and cultural journeys in the Kumaon Himalaya, a region known for its mountain landscapes, villages and distinctive traditions. Our approach brings together three elements: Mindful experiences: Opportunities for yoga, meditation, reflection and time in nature, according to the selected itinerary. Authentic Kumaoni culture: Experiences that introduce travellers to regional traditions, local food, crafts and community life. Personalised planning: Direct conversations about the journey, accommodation, travel connections and practical arrangements before booking. With a local presence in Pithoragarh, we aim to offer travellers a more personal introduction to Kumaon, beyond a conventional resort-based holiday. Our journeys are designed around meaningful experiences rather than promises of guaranteed healing or transformation.",
  "Yes. Our Women's Sacred Himalaya Retreat is designed as a women-only journey combining mindful travel, Himalayan culture and meaningful local experiences. The published 9-day / 8-night route connects Bhimtal, Pithoragarh, Munsiyari and Abbott Mount. Its programme includes cultural activities such as traditional crafts, local cooking experiences, mindfulness, journalling and time for reflection. Women travelling independently or with friends are welcome to enquire. Departure dates, the assigned tour leader, local facilitators, accommodation arrangements and individual activity inclusions are confirmed before booking. Solo travellers can also ask about room-sharing options, single-room availability and any applicable supplement.",
  "Yes. Himalayan Serenity Travel welcomes enquiries from international travellers interested in yoga, mindfulness, Ayurveda-related experiences and cultural journeys through the Kumaon Himalaya of Uttarakhand, India. Our team can discuss your preferred retreat, itinerary, meeting point, accommodation options and available ground-transport arrangements. Travellers arriving from overseas should allow time for international and domestic travel connections, particularly when continuing into mountain regions where journey times and weather conditions can affect plans. Passport, visa and entry requirements depend on nationality and individual circumstances. Please verify these with the relevant Indian authorities before arranging travel. We recommend contacting our team before booking flights so that your proposed arrival and departure plans can be reviewed alongside the retreat itinerary.",
  "Inclusions vary according to the retreat you choose. A published programme may include selected accommodation, meals, scheduled yoga or meditation sessions, cultural experiences, ground transportation and specified wellness activities. Ayurveda consultations or treatments are included only where confirmed in the particular programme. We follow a personally curated accommodation approach. Rather than promising a particular hotel at the initial enquiry stage, we discuss the proposed stays and room arrangements with travellers before payment. Your written proposal should confirm the applicable accommodation, meals, transfers, programme activities, inclusions, exclusions and any additional charges. If you are travelling solo or have specific room preferences, please discuss sharing arrangements, single-room availability and supplements before confirming your booking.",
  "Start by exploring our Himalayan retreat programmes and choosing the experience that best matches your interests, travel dates and preferred activity level. Our wellness journeys differ in focus: some emphasise yoga, meditation and Ayurveda-related activities, while others centre on women's cultural experiences, digital detox or Himalayan heritage. Once you have selected a journey, use the retreat's enquiry form to share your preferred dates, number of travellers and any questions about the itinerary. Our team can then discuss availability, accommodation, travel arrangements, confirmed services and the applicable price. Before making a payment, review the written proposal and booking terms carefully, including the payment schedule, cancellation conditions and any costs not included in the quoted package. Submitting an enquiry does not itself confirm a booking or guarantee availability.",
  "Adi Kailash and Om Parvat journeys take place in a remote, high-altitude Himalayan region where seasonal access depends on weather, road conditions, local regulations and operational arrangements. May–June and September–October are commonly considered travel periods for these journeys, but suitable dates and accessibility must be checked for the particular season and route. Conditions can change quickly in the mountains. Snow, rain, cloud cover, landslides or local restrictions may affect road access, the itinerary and mountain visibility. Views of sacred peaks, clear skies and completion of every planned excursion cannot be guaranteed. Before booking, please confirm current travel dates, access conditions, permit requirements and contingency arrangements for your chosen journey.",
  "Preparation depends on the route, altitude, season and personal circumstances. Journeys to restricted areas around Adi Kailash and Om Parvat generally require an Inner Line Permit or other applicable permissions, subject to current government rules and traveller eligibility. Our team can discuss the permit-assistance arrangements available for the chosen itinerary, but approval remains subject to the relevant authorities. High-altitude travel may involve long road journeys, walking, changing weather and limited access to services. Travellers should review the physical demands of the programme, discuss relevant health concerns with a qualified medical professional and plan appropriate clothing and equipment. Transport, guides, communication facilities, medical support and emergency arrangements vary by itinerary. Please confirm exactly what is included before booking. Himalayan travel involves inherent risks, and no particular weather outcome, rescue response or uninterrupted route access can be guaranteed."
]
const groups = [
  "Himalayan Wellness, Yoga & Ayurveda",
  "International Travel & Retreat Planning",
  "Sacred Himalayan Journeys & Pilgrimages"
]
const introduction = "Planning a Himalayan wellness retreat or sacred journey? Explore answers to common questions about yoga, Ayurveda, cultural experiences, international travel and preparing for the Kumaon Himalaya."
const ctas = [
  {
    "label": "Explore our Himalayan wellness retreats",
    "to": "/international-retreats"
  },
  {
    "label": "Discover our retreat experiences",
    "to": "/international-retreats"
  },
  {
    "label": "Explore the Women's Sacred Himalaya Retreat",
    "to": "/retreats/womens-retreat"
  },
  {
    "label": "Explore retreats for international travellers",
    "to": "/international-retreats"
  },
  {
    "label": "Compare our Himalayan retreat programmes",
    "to": "/international-retreats"
  },
  {
    "label": "Find your Himalayan retreat",
    "to": "/international-retreats"
  },
  {
    "label": "Contact our team",
    "to": "/contact"
  },
  {
    "label": "Discover our Sacred Himalayan Journeys",
    "to": "/experiences"
  },
  {
    "label": "Explore Adi Kailash and other Himalayan journeys",
    "to": "/experiences"
  }
]

function mount() {
  const state = []
  let cursor = 0, tree
  const react = {
    Fragment: require('react').Fragment,
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

const text = html => html.replace(/<[^>]*>/g, ' ').replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()

test('initial FAQ HTML contains all nine complete, owner-approved answers once, in real disclosure panels', () => {
  const app = mount(), html = app.html()
  assert.equal(app.panels().length, 9)
  questions.forEach(question => assert.ok(text(html).includes(question)))
  answers.forEach(answer => assert.equal(text(html).split(answer).length - 1, 1, answer))
  assert.ok(text(html).includes(introduction))
  groups.forEach(group => assert.ok(text(html).includes(group)))
  ctas.forEach(cta => {
    assert.ok(html.includes(`href="${cta.to}"`))
    assert.ok(text(html).includes(cta.label))
  })
  for (const removed of ['pre-departure kit includes', 'led entirely by female mountain experts', 'uniquely empowering and safe environment']) {
    assert.ok(!text(html).includes(removed))
  }
  assert.equal((html.match(/inert=""/g) || []).length, 9)
  const styles = [...html.matchAll(/id="faq-answer-\d"[^>]*style="([^"]*)"/g)].map(match => match[1])
  assert.equal(styles.length, 9)
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
  for (let i = 0; i < 9; i++) { app.click(i); check(i); app.click(i); check() }
  app.click(0); app.click(8); check(8)
})

test('wellness-first groups retain the approved 4/3/2 order and CTAs belong to the correct answers', () => {
  const app = mount(), html = app.html()
  const order = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>|<button\b[^>]*\bid="faq-question-(\d)"[^>]*>/g)]
    .map(match => match[2] === undefined ? text(match[1]) : Number(match[2]))
    .filter(value => typeof value === 'number' || groups.includes(value))
  assert.deepEqual(order, [groups[0], 0, 1, 2, 3, groups[1], 4, 5, 6, groups[2], 7, 8])
  const counts = [1, 0, 1, 1, 1, 1, 2, 1, 1]
  let cursor = 0
  app.panels().forEach((panel, index) => {
    const links = [...renderToStaticMarkup(panel).matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
      .map(match => ({ to: match[1], label: text(match[2]) }))
    assert.deepEqual(links, ctas.slice(cursor, cursor + counts[index]))
    cursor += counts[index]
  })
  assert.equal(cursor, ctas.length)
})
