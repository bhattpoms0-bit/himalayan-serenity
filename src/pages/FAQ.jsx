import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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
    a: 'We provide sleeping bags rated to -20°C, trekking poles, first aid kits, oxygen cylinders for high-altitude sections, PAC chambers, and satellite communication devices. You will need personal clothing, boots, and layering — our detailed packing list is sent upon booking.',
  },
  {
    q: 'Is the journey suitable for senior travelers?',
    a: 'Absolutely. We offer specially designed Senior-Friendly itineraries with slower ascent profiles, extra rest days, comfort-grade accommodation, and dedicated medical personnel. Many of our most profound experiences come from travelers in their 60s and 70s.',
  },
  {
    q: 'What safety measures are in place?',
    a: 'Every expedition includes 24/7 satellite monitoring, oxygen-equipped vehicles, trained medical staff, helicopter evacuation insurance, and guides certified in wilderness first aid. Safety is our non-negotiable foundation.',
  },
  {
    q: 'Do you offer women-only departures?',
    a: <>Yes. Our dedicated <Link to="/retreats/womens-retreat" style={{ color: '#C9A84C', textDecoration: 'none' }}>Women's Sacred Himalaya Retreat</Link> departs throughout the season, led entirely by female mountain experts and spiritual guides. These journeys foster a uniquely empowering and safe environment.</>,
  },
]

const suggestTags = ['Package Cost', 'Best Time', 'Safety', 'Senior Citizens', 'Visa Help', 'Weather']

export default function FAQPage() {
  useSEO({
    title: 'Adi Kailash Yatra FAQ 2026 | Opening Date | Distance | Om Parvat Questions',
    description: 'Answers to Adi Kailash Yatra questions — Adi Kailash opening date 2026, Dharchula to Adi Kailash distance, Inner Line Permit, best time to visit, Om Parvat darshan details.',
  })
  const [openIndex, setOpenIndex]       = useState(null)
  const [chatOpen, setChatOpen]         = useState(false)
  const [query, setQuery]               = useState('')
  const [inputFocused, setInputFocused] = useState(false)
  const [messages, setMessages]         = useState([
    { from: 'bot', text: 'Namaste. I am your Serenity Concierge. I can help you with logistics, weather updates, or choosing the right expedition.' },
  ])

  const handleSend = () => {
    if (!query.trim()) return
    setMessages(prev => [...prev, { from: 'user', text: query }])
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: 'Thank you for your inquiry. Our team will follow up within 24 hours. For urgent queries, please use WhatsApp.' }])
    }, 800)
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

      {/* ── Floating Chat Panel ───────────────────────────────────────────── */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:left-auto sm:right-6 sm:w-[380px] z-50"
            style={{ maxWidth: 'calc(100vw - 48px)', margin: '0 auto' }}
          >
            <div
              className="rounded-t-2xl sm:rounded-2xl overflow-hidden"
              style={{
                backgroundColor: '#141414',
                border:          '1px solid rgba(255,255,255,0.08)',
                boxShadow:       '0 24px 60px rgba(0,0,0,0.6)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ background: 'linear-gradient(to bottom, #1a1a1a, #141414)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width:           36,
                      height:          36,
                      borderRadius:    '50%',
                      backgroundColor: 'rgba(224,123,42,0.15)',
                      border:          '1px solid rgba(224,123,42,0.3)',
                    }}
                  >
                    <span className="text-brand-orange" style={{ fontSize: 13 }}>✦</span>
                  </div>
                  <div>
                    <p
                      className="text-white"
                      style={{ fontFamily: '"Cinzel", serif', fontSize: 11, letterSpacing: '0.12em' }}
                    >
                      Serenity Concierge
                    </p>
                    <p className="flex items-center gap-1 text-green-400 font-sans" style={{ fontSize: 11 }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block flex-shrink-0" />
                      AI Concierge · Online
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setChatOpen(false)}
                  className="text-white/60 hover:text-white p-1 transition-colors"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Messages */}
              <div className="max-h-48 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] p-4 font-sans ${
                        msg.from === 'user' ? 'rounded-2xl rounded-tr-sm' : 'rounded-2xl rounded-tl-sm'
                      }`}
                      style={
                        msg.from === 'user'
                          ? {
                              backgroundColor: 'rgba(224,123,42,0.12)',
                              border:          '1px solid rgba(224,123,42,0.15)',
                              fontSize:        13,
                              color:           '#e5e5e5',
                              lineHeight:      1.7,
                            }
                          : {
                              backgroundColor: '#1e1e1e',
                              fontSize:        13,
                              color:           '#bbbbbb',
                              lineHeight:      1.7,
                            }
                      }
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick tags */}
              <div className="flex flex-wrap gap-2 px-4 pb-3">
                {suggestTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="font-sans rounded-full px-3 py-1 transition-all duration-200"
                    style={{
                      fontSize:        11,
                      color:           '#777777',
                      border:          '1px solid rgba(255,255,255,0.08)',
                      backgroundColor: 'transparent',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(224,123,42,0.3)'
                      e.currentTarget.style.backgroundColor = 'rgba(224,123,42,0.05)'
                      e.currentTarget.style.color = '#e07b2a'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                      e.currentTarget.style.backgroundColor = 'transparent'
                      e.currentTarget.style.color = '#777777'
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Input row */}
              <div className="px-4 pb-4 flex gap-2">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder="Type your inquiry..."
                  className="flex-1 font-sans text-white rounded-xl px-4 py-2.5 outline-none transition-all duration-200 placeholder-[#444444]"
                  style={{
                    fontSize:        13,
                    backgroundColor: '#0d0d0d',
                    border:          inputFocused
                      ? '1px solid rgba(224,123,42,0.4)'
                      : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: inputFocused
                      ? '0 0 0 3px rgba(224,123,42,0.08)'
                      : 'none',
                  }}
                />
                <motion.button
                  onClick={handleSend}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ filter: 'brightness(1.1)' }}
                  className="flex-shrink-0 flex items-center justify-center rounded-xl p-2.5"
                  style={{ backgroundColor: '#e07b2a' }}
                >
                  <Send size={14} className="text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Chat Button ──────────────────────────────────────────── */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 1, type: 'spring' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setChatOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-5 py-3 text-white"
            style={{
              backgroundColor: '#e07b2a',
              boxShadow:       '0 8px 30px rgba(224,123,42,0.4)',
              fontFamily:      '"Cinzel", serif',
              fontSize:        11,
              letterSpacing:   '0.12em',
            }}
          >
            ✦ Ask Concierge
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
