import { useEffect, useRef, useState } from 'react'
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
    q: 'When is the most auspicious time to visit?',
    a: <>The best time for <Link to="/packages/adi-kailash-expedition" style={{ color: '#C9A84C', textDecoration: 'none' }}>Himalayan expeditions</Link> is May–June and September–October. These months offer stable weather, clear skies, and the most vibrant spiritual festivals. Our guides can also advise based on your specific pilgrimage goals.</>,
  },
  {
    q: 'How should I prepare for the spiritual ascent?',
    a: 'We recommend 2–3 months of moderate physical training, including daily walking and breathing exercises. Spiritually, practicing mindfulness and meditation helps open you to the transformative nature of the journey. Our pre-departure kit includes a full preparation guide.',
  },
  {
    q: 'What essential gear is provided?',
    a: 'Equipment and support depend on the itinerary. Ask us to confirm what is included, what you should bring and any altitude-related support arrangements before booking. Do not assume oxygen, medical personnel or satellite communications are included in every journey.',
  },
  {
    q: 'Is the journey suitable for senior travelers?',
    a: 'Suitability depends on the itinerary, altitude, health and fitness. Discuss the pace and participation requirements with us before booking, and seek medical advice where appropriate. Medical personnel are not guaranteed on every journey.',
  },
  {
    q: 'What safety measures are in place?',
    a: 'We take a safety-conscious approach to planning. Ask us to confirm route-specific support and emergency arrangements before booking. Remote terrain, weather and communications can affect access to assistance; no particular rescue service, response time or evacuation outcome is guaranteed.',
  },
  {
    q: 'Do you offer women-only departures?',
    a: <>Yes. Our dedicated <Link to="/retreats/womens-retreat" style={{ color: '#C9A84C', textDecoration: 'none' }}>Women's Sacred Himalaya Retreat</Link> departs throughout the season, led entirely by female mountain experts and spiritual guides. These journeys foster a uniquely empowering and safe environment.</>,
  },
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
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                borderLeft:   openIndex === i ? '2px solid #e07b2a' : '2px solid transparent',
                paddingLeft:  '20px',
                transition:   'border-color 0.3s ease',
              }}
            >
              <button
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

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p
                      className="font-sans pb-6"
                      style={{ fontSize: 14, color: '#777777', lineHeight: 1.9 }}
                    >
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
