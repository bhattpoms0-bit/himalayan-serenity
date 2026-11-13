import { Fragment, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { FAQ_HELP_TOPICS, getFaqHelpReply } from '../data/faqHelp'

const EASE = [0.25, 0.46, 0.45, 0.94]

const faqs = [
  {
    "group": "Himalayan Wellness, Yoga & Ayurveda",
    "q": "What can I expect from a Himalayan yoga and Ayurveda wellness retreat?",
    "paragraphs": [
      "Our Himalayan wellness retreats offer an opportunity to slow down, reconnect with nature and experience the living traditions of Kumaon in Uttarakhand, India.",
      "Depending on your chosen programme, the journey may include guided yoga, pranayama (breathing practices), meditation, mindful walks, cultural encounters and time for personal reflection. Selected retreats also include Ayurveda consultations or therapies, subject to the confirmed programme and practitioner arrangements.",
      "Rather than remaining at a single resort, some of our retreats travel through Himalayan destinations such as Pithoragarh, Munsiyari and Kasar Devi, combining wellness activities with mountain landscapes and local culture.",
      "Each journey has its own pace, activities and inclusions. We recommend reviewing the itinerary and confirming the wellness services available for your preferred departure before booking."
    ],
    "links": [
      {
        "label": "Explore our Himalayan wellness retreats",
        "to": "/international-retreats"
      }
    ]
  },
  {
    "q": "Do I need previous yoga experience to join your Himalayan wellness retreats?",
    "paragraphs": [
      "Previous yoga experience is not necessarily required to enquire about our retreats. However, participation requirements depend on the specific programme, the planned sessions and the physical demands of the journey.",
      "Our retreats combine wellness experiences with Himalayan travel, which can include winding mountain roads, walking, early starts and changes in altitude.",
      "Before booking, please tell our team about your yoga experience, preferred activity level and any participation requirements you would like to discuss. We can explain the proposed programme and help you determine whether it aligns with your expectations.",
      "Yoga sessions and possible adjustments should be confirmed for your particular retreat. We do not assume that every activity is suitable for every traveller."
    ]
  },
  {
    "q": "What makes Himalayan Serenity Travel's Kumaon wellness retreats different?",
    "paragraphs": [
      "Himalayan Serenity Travel focuses on thoughtfully curated, small-group wellness and cultural journeys in the Kumaon Himalaya, a region known for its mountain landscapes, villages and distinctive traditions.",
      "Our approach brings together three elements:",
      "Mindful experiences: Opportunities for yoga, meditation, reflection and time in nature, according to the selected itinerary.",
      "Authentic Kumaoni culture: Experiences that introduce travellers to regional traditions, local food, crafts and community life.",
      "Personalised planning: Direct conversations about the journey, accommodation, travel connections and practical arrangements before booking.",
      "With a local presence in Pithoragarh, we aim to offer travellers a more personal introduction to Kumaon, beyond a conventional resort-based holiday.",
      "Our journeys are designed around meaningful experiences rather than promises of guaranteed healing or transformation."
    ],
    "links": [
      {
        "label": "Discover our retreat experiences",
        "to": "/international-retreats"
      }
    ]
  },
  {
    "q": "Do you offer women-only Himalayan wellness retreats?",
    "paragraphs": [
      "Yes. Our Women's Sacred Himalaya Retreat is designed as a women-only journey combining mindful travel, Himalayan culture and meaningful local experiences.",
      "The published 9-day / 8-night route connects Bhimtal, Pithoragarh, Munsiyari and Abbott Mount. Its programme includes cultural activities such as traditional crafts, local cooking experiences, mindfulness, journalling and time for reflection.",
      "Women travelling independently or with friends are welcome to enquire.",
      "Departure dates, the assigned tour leader, local facilitators, accommodation arrangements and individual activity inclusions are confirmed before booking. Solo travellers can also ask about room-sharing options, single-room availability and any applicable supplement."
    ],
    "links": [
      {
        "label": "Explore the Women's Sacred Himalaya Retreat",
        "to": "/retreats/womens-retreat"
      }
    ]
  },
  {
    "group": "International Travel & Retreat Planning",
    "q": "Can international travellers join your Himalayan yoga and wellness retreats in India?",
    "paragraphs": [
      "Yes. Himalayan Serenity Travel welcomes enquiries from international travellers interested in yoga, mindfulness, Ayurveda-related experiences and cultural journeys through the Kumaon Himalaya of Uttarakhand, India.",
      "Our team can discuss your preferred retreat, itinerary, meeting point, accommodation options and available ground-transport arrangements.",
      "Travellers arriving from overseas should allow time for international and domestic travel connections, particularly when continuing into mountain regions where journey times and weather conditions can affect plans.",
      "Passport, visa and entry requirements depend on nationality and individual circumstances. Please verify these with the relevant Indian authorities before arranging travel.",
      "We recommend contacting our team before booking flights so that your proposed arrival and departure plans can be reviewed alongside the retreat itinerary."
    ],
    "links": [
      {
        "label": "Explore retreats for international travellers",
        "to": "/international-retreats"
      }
    ]
  },
  {
    "q": "What is included in your Himalayan wellness retreats, and how is accommodation arranged?",
    "paragraphs": [
      "Inclusions vary according to the retreat you choose.",
      "A published programme may include selected accommodation, meals, scheduled yoga or meditation sessions, cultural experiences, ground transportation and specified wellness activities. Ayurveda consultations or treatments are included only where confirmed in the particular programme.",
      "We follow a personally curated accommodation approach. Rather than promising a particular hotel at the initial enquiry stage, we discuss the proposed stays and room arrangements with travellers before payment.",
      "Your written proposal should confirm the applicable accommodation, meals, transfers, programme activities, inclusions, exclusions and any additional charges.",
      "If you are travelling solo or have specific room preferences, please discuss sharing arrangements, single-room availability and supplements before confirming your booking."
    ],
    "links": [
      {
        "label": "Compare our Himalayan retreat programmes",
        "to": "/international-retreats"
      }
    ]
  },
  {
    "q": "How can I choose a retreat, check available dates and make a booking?",
    "paragraphs": [
      "Start by exploring our Himalayan retreat programmes and choosing the experience that best matches your interests, travel dates and preferred activity level.",
      "Our wellness journeys differ in focus: some emphasise yoga, meditation and Ayurveda-related activities, while others centre on women's cultural experiences, digital detox or Himalayan heritage.",
      "Once you have selected a journey, use the retreat's enquiry form to share your preferred dates, number of travellers and any questions about the itinerary.",
      "Our team can then discuss availability, accommodation, travel arrangements, confirmed services and the applicable price.",
      "Before making a payment, review the written proposal and booking terms carefully, including the payment schedule, cancellation conditions and any costs not included in the quoted package.",
      "Submitting an enquiry does not itself confirm a booking or guarantee availability."
    ],
    "links": [
      {
        "label": "Find your Himalayan retreat",
        "to": "/international-retreats"
      },
      {
        "label": "Contact our team",
        "to": "/contact"
      }
    ]
  },
  {
    "group": "Sacred Himalayan Journeys & Pilgrimages",
    "q": "When is the best time to visit Adi Kailash and Om Parvat in Uttarakhand?",
    "paragraphs": [
      "Adi Kailash and Om Parvat journeys take place in a remote, high-altitude Himalayan region where seasonal access depends on weather, road conditions, local regulations and operational arrangements.",
      "May–June and September–October are commonly considered travel periods for these journeys, but suitable dates and accessibility must be checked for the particular season and route.",
      "Conditions can change quickly in the mountains. Snow, rain, cloud cover, landslides or local restrictions may affect road access, the itinerary and mountain visibility.",
      "Views of sacred peaks, clear skies and completion of every planned excursion cannot be guaranteed.",
      "Before booking, please confirm current travel dates, access conditions, permit requirements and contingency arrangements for your chosen journey."
    ],
    "links": [
      {
        "label": "Discover our Sacred Himalayan Journeys",
        "to": "/experiences"
      }
    ]
  },
  {
    "q": "What permits, physical preparation and local support are needed for Adi Kailash and other sacred Himalayan journeys?",
    "paragraphs": [
      "Preparation depends on the route, altitude, season and personal circumstances.",
      "Journeys to restricted areas around Adi Kailash and Om Parvat generally require an Inner Line Permit or other applicable permissions, subject to current government rules and traveller eligibility. Our team can discuss the permit-assistance arrangements available for the chosen itinerary, but approval remains subject to the relevant authorities.",
      "High-altitude travel may involve long road journeys, walking, changing weather and limited access to services. Travellers should review the physical demands of the programme, discuss relevant health concerns with a qualified medical professional and plan appropriate clothing and equipment.",
      "Transport, guides, communication facilities, medical support and emergency arrangements vary by itinerary. Please confirm exactly what is included before booking.",
      "Himalayan travel involves inherent risks, and no particular weather outcome, rescue response or uninterrupted route access can be guaranteed."
    ],
    "links": [
      {
        "label": "Explore Adi Kailash and other Himalayan journeys",
        "to": "/experiences"
      }
    ]
  }
]

const suggestTags = FAQ_HELP_TOPICS

export default function FAQPage() {
  useSEO({
    title: 'Adi Kailash Yatra FAQ 2026 | Opening Date | Distance | Om Parvat Questions',
    description: 'Answers to Adi Kailash Yatra questions — Adi Kailash opening date 2026, Dharchula to Adi Kailash distance, Inner Line Permit, best time to visit, Om Parvat darshan details.',
    canonical: 'https://www.himalayanserenitytravel.com/faq',
  })
  const [openIndex, setOpenIndex]       = useState(null)
  const [chatOpen, setChatOpen]         = useState(false)
  const [query, setQuery]               = useState('')
  const inputRef = useRef(null)
  const triggerRef = useRef(null)
  const wasOpen = useRef(false)
  const [messages, setMessages]         = useState([
    { from: 'bot', text: 'Namaste. Choose a topic or ask a general journey question. This informational helper does not send your question to our team or provide live updates.' },
  ])

  useEffect(() => {
    if (chatOpen) inputRef.current?.focus()
    else if (wasOpen.current) triggerRef.current?.focus()
    wasOpen.current = chatOpen
  }, [chatOpen])

  const handleSend = (question = query) => {
    if (!question.trim()) return
    setMessages(previous => [...previous,
      { from: 'user', text: question.trim() },
      { from: 'bot', text: getFaqHelpReply(question) },
    ])
    setQuery('')
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar activePage="faq" />

      {/* Visually hidden SEO h1 */}
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        Frequently Asked Questions — Adi Kailash &amp; Himalayan Expedition Guide
      </h1>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex items-end pb-20 pt-32 overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center scale-[1.05]"
          style={{ backgroundImage: `url('/images/om-parvat-view-himalayan-horses-pithoragarh.webp')` }}
        >
          <img
            src="/images/om-parvat-view-himalayan-horses-pithoragarh.webp"
            alt="Om Parvat View Himalayan Horses Pithoragarh"
            className="sr-only"
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, transparent 25%, rgba(0,0,0,0.52) 100%)' }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.08) 40%, rgba(13,13,13,1) 100%)' }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full">
          <motion.h2
            className="font-serif text-white max-w-2xl leading-tight tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            Common Inquiries &amp;<br />Sacred Guidance
          </motion.h2>
        </div>
      </section>

      {/* ── FAQ Accordion ─────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#090909' }} className="py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">
          <p className="font-sans text-brand-cream-muted text-base leading-relaxed mb-12">
            Planning a Himalayan wellness retreat or sacred journey? Explore answers to common questions about yoga, Ayurveda, cultural experiences, international travel and preparing for the Kumaon Himalaya.
          </p>
          {faqs.map((faq, i) => (
            <Fragment key={i}>
              {faq.group && (
                <h2 className="font-serif text-brand-cream text-2xl leading-relaxed mb-4" style={{ marginTop: i === 0 ? 0 : 48 }}>
                  {faq.group}
                </h2>
              )}
              <div
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  borderLeft:   openIndex === i ? '2px solid #e07b2a' : '2px solid transparent',
                  paddingLeft:  '20px',
                  transition:   'border-color 0.3s ease',
                }}
              >
                <button
                  id={`faq-question-${i}`}
                  type="button"
                  className="w-full flex justify-between items-center py-6 text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span
                    className="font-serif pr-4 transition-colors duration-200"
                    style={{ fontSize: 19, color: openIndex === i ? '#ffffff' : '#cccccc' }}
                  >
                    {faq.q}
                  </span>

                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      color:      openIndex === i ? '#e07b2a' : '#555555',
                      display:    'inline-block',
                      fontSize:   14,
                      flexShrink: 0,
                    }}
                  >
                    ✦
                  </motion.span>
                </button>

                <motion.div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  aria-hidden={openIndex !== i}
                  inert={openIndex === i ? undefined : ''}
                  initial={false}
                  animate={{ height: openIndex === i ? 'auto' : 0, opacity: openIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    className="font-sans pb-6"
                    style={{ fontSize: 14, color: '#777777', lineHeight: 1.9 }}
                  >
                    {faq.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="mb-4 last:mb-0">{paragraph}</p>
                    ))}
                    {faq.links && (
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                        {faq.links.map(link => (
                          <Link key={link.to} to={link.to} className="inline-flex items-center min-h-11 py-2 text-brand-gold underline underline-offset-4">
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </Fragment>
          ))}
        </div>
      </section>

      {/* ── ILP Guide Link ───────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#090909', padding: '0 0 3rem' }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10">
          <div style={{ borderLeft: '2px solid rgba(201,168,76,0.3)', paddingLeft: '1.2rem' }}>
            <p className="font-sans" style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
              Need help with Inner Line Permit for Adi Kailash or Om Parvat?{' '}
              <Link to="/blog/adi-kailash-ilp-guide-2026" style={{ color: '#C9A84C', textDecoration: 'none' }}>
                Read our complete ILP guide →
              </Link>
              {' · '}Ready to book?{' '}
              <Link to="/contact" style={{ color: '#C9A84C', textDecoration: 'none' }}>
                Contact our team →
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-dark-2 px-6 py-12 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-brand-cream text-2xl mb-4">Need personal assistance?</h2>
          <p className="text-brand-cream-muted leading-relaxed mb-5">Our team can help you plan your journey. Contact us through WhatsApp or send an enquiry.</p>
          <div className="flex flex-wrap gap-4">
            <a href="https://wa.me/919084642557" target="_blank" rel="noopener noreferrer" className="btn-secondary min-h-11">WhatsApp our team</a>
            <Link to="/contact#consultation" className="btn-primary !text-brand-dark min-h-11">Send an enquiry</Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {chatOpen && (
          <motion.section
            id="faq-helper" data-clarity-mask="true" aria-labelledby="faq-helper-title" aria-describedby="faq-helper-description"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
            onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); setChatOpen(false) } }}
            className="fixed bottom-40 left-4 right-4 sm:bottom-24 sm:left-auto sm:right-6 sm:w-[380px] z-50 max-h-[calc(100dvh-200px)] overflow-y-auto rounded-2xl border border-white/15 bg-[#141414] shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-white/10">
              <div>
                <h2 id="faq-helper-title" className="font-serif text-brand-cream text-xl">Journey information</h2>
                <p id="faq-helper-description" className="font-sans text-brand-cream-muted text-xs leading-relaxed mt-2">General guidance, not a live-agent chat. Questions entered here are not sent to our team.</p>
              </div>
              <button type="button" onClick={() => setChatOpen(false)} aria-label="Close journey information" className="min-w-11 min-h-11 flex items-center justify-center text-brand-cream hover:text-brand-gold"><X size={18} /></button>
            </div>
            <div role="log" aria-label="Journey information conversation" aria-live="polite" aria-relevant="additions" className="max-h-48 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((message, index) => (
                <p key={index} className={`rounded-xl p-3 text-sm leading-relaxed break-words ${message.from === 'user' ? 'bg-brand-orange/15 text-brand-cream ml-5' : 'bg-white/5 text-brand-cream-muted mr-3'}`}>
                  <span className="sr-only">{message.from === 'user' ? 'You: ' : 'Information: '}</span>{message.text}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 px-4 pb-4" aria-label="General information topics">
              {suggestTags.map(topic => <button type="button" key={topic} onClick={() => handleSend(topic)} className="min-h-11 rounded-full border border-white/20 text-brand-cream-muted px-3 text-xs hover:text-brand-cream hover:border-brand-gold">{topic}</button>)}
            </div>
            <form data-clarity-mask="true" onSubmit={event => { event.preventDefault(); handleSend() }} className="px-4 pb-4">
              <label htmlFor="faq-question" className="block text-brand-cream-muted text-xs mb-2">Ask a general journey question</label>
              <div className="flex items-center gap-2">
                <input ref={inputRef} id="faq-question" value={query} onChange={event => setQuery(event.target.value)} className="min-w-0 flex-1 min-h-11 rounded-xl border border-white/25 bg-brand-dark text-brand-cream px-3 text-base" />
                <button type="submit" aria-label="Show journey information" className="min-h-11 min-w-11 rounded-xl bg-brand-orange text-brand-dark flex items-center justify-center"><Send size={17} /></button>
              </div>
            </form>
            <div className="px-4 pb-5 text-sm text-brand-cream-muted leading-relaxed border-t border-white/10 pt-4">
              <p className="mb-2">Need personal assistance? Contact our team directly:</p>
              <div className="flex flex-wrap gap-x-5 gap-y-1">
                <a href="https://wa.me/919084642557" target="_blank" rel="noopener noreferrer" className="min-h-11 inline-flex items-center text-brand-gold underline underline-offset-4">WhatsApp</a>
                <Link to="/contact#consultation" className="min-h-11 inline-flex items-center text-brand-gold underline underline-offset-4">Send an enquiry</Link>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      <button ref={triggerRef} hidden={chatOpen} type="button" aria-expanded={chatOpen} aria-controls="faq-helper" onClick={() => setChatOpen(true)} className="fixed bottom-24 right-4 sm:bottom-6 sm:right-20 z-50 min-h-11 rounded-full px-4 py-3 bg-brand-orange text-brand-dark text-sm shadow-xl">Journey information</button>

      <Footer />
    </div>
  )
}
