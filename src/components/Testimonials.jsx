import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    quote:  'I went seeking mountains and found myself. They curated a transformation.',
    name:   'Priya Sharma',
    info:   'Adi Kailash, 2024',
    avatar: 'https://i.pravatar.cc/100?img=10',
    flag:   '🇮🇳',
  },
  {
    quote:  'The guides understood this was not tourism. Every step was sacred.',
    name:   'Michael Chen',
    info:   'Om Parvat, 2024',
    avatar: 'https://i.pravatar.cc/100?img=11',
    flag:   '🇸🇬',
  },
  {
    quote:  'As a senior traveler I was nervous, but their care was extraordinary.',
    name:   'Margaret Wilson',
    info:   'Senior Journey, 2023',
    avatar: 'https://i.pravatar.cc/100?img=12',
    flag:   '🇬🇧',
  },
  {
    quote:  'The women-only expedition was empowering beyond words. We left as sisters.',
    name:   'Aisha Rahman',
    info:   "Women's Expedition, 2024",
    avatar: 'https://i.pravatar.cc/100?img=13',
    flag:   '🇦🇪',
  },
  {
    quote:  'Luxury and spirituality in perfect balance. The silence was divine.',
    name:   'James Hartford',
    info:   'Luxury Retreat, 2024',
    avatar: 'https://i.pravatar.cc/100?img=14',
    flag:   '🇺🇸',
  },
  {
    quote:  'My camera captured mountains but my soul captured something greater.',
    name:   'Kenji Tanaka',
    info:   'Photography Expedition, 2023',
    avatar: 'https://i.pravatar.cc/100?img=15',
    flag:   '🇯🇵',
  },
]

// Group into slides of 3
const slides = [
  testimonials.slice(0, 3),
  testimonials.slice(3, 6),
]
const SLIDE_COUNT = slides.length

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % SLIDE_COUNT)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section style={{ backgroundColor: '#0d0d0d' }}>

      {/* ── Social Proof Bar ──────────────────────────────────────────────── */}
      <div
        className="py-5 border-y border-white/[0.06]"
        style={{ backgroundColor: '#111111' }}
      >
        <div className="flex items-center justify-center gap-8 flex-wrap px-6">
          <div className="flex items-center">
            {testimonials.slice(0, 5).map((t, i) => (
              <img
                key={i}
                src={t.avatar}
                alt={t.name}
                className={`w-8 h-8 rounded-full object-cover border-2 border-[#111111]${i > 0 ? ' -ml-2' : ''}`}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>

          <span style={{ color: '#333333' }}>•</span>

          <p className="font-sans" style={{ fontSize: 13, color: '#777777' }}>
            Trusted by{' '}
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>3,000+</span>{' '}
            spiritual seekers
          </p>

          <span style={{ color: '#333333' }}>•</span>

          <p className="font-sans" style={{ fontSize: 13, color: '#777777' }}>
            <span className="text-brand-orange">★★★★★</span>{' '}4.9/5
          </p>
        </div>
      </div>

      {/* ── Main Content ──────────────────────────────────────────────────── */}
      <div className="py-24">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16 px-5 sm:px-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p
            className="mb-4 uppercase"
            style={{
              fontFamily:    '"Cinzel", serif',
              fontSize:      11,
              letterSpacing: '0.2em',
              color:         '#e07b2a',
            }}
          >
            Traveler Stories
          </p>

          <h2
            className="font-serif text-brand-cream mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Voices from the Sacred Trail
          </h2>

          <p
            className="font-sans mx-auto"
            style={{ fontSize: 15, color: '#777777', maxWidth: '32rem', lineHeight: 1.75 }}
          >
            Each traveler who walks these ancient paths carries a story
            only mountains can write.
          </p>
        </motion.div>

        {/* ── Carousel ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Track wrapper — arrows positioned here */}
          <div className="relative px-0 sm:px-12">

            {/* Overflow-hidden slider */}
            <div className="overflow-hidden w-full">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {slides.map((slide, si) => (
                  <div key={si} className="min-w-full px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {slide.map((t, i) => (
                        <div
                          key={i}
                          className="rounded-2xl p-7 cursor-pointer"
                          style={{
                            backgroundColor: '#1a1a1a',
                            border:          '1px solid rgba(255,255,255,0.08)',
                            transition:      'border-color 300ms ease',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)')}
                          onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                        >
                          {/* Stars */}
                          <div className="text-brand-orange text-sm mb-4">★★★★★</div>

                          {/* Decorative quote mark */}
                          <span
                            style={{
                              fontFamily:   '"Playfair Display", Georgia, serif',
                              fontSize:     '4rem',
                              color:        'rgba(224,123,42,0.15)',
                              lineHeight:   1,
                              display:      'block',
                              marginBottom: '-16px',
                            }}
                          >
                            "
                          </span>

                          {/* Quote */}
                          <p
                            className="font-serif italic mb-6"
                            style={{ fontSize: 16, color: '#bbbbbb', lineHeight: 1.8 }}
                          >
                            {t.quote}
                          </p>

                          {/* Divider */}
                          <hr className="border-white/[0.06] mb-5" />

                          {/* Author row */}
                          <div className="flex items-center gap-3">
                            <img
                              src={t.avatar}
                              alt={t.name}
                              className="w-10 h-10 rounded-full object-cover border border-white/10 flex-shrink-0"
                          loading="lazy"
                          decoding="async"
                            />
                            <div>
                              <p className="font-sans font-medium" style={{ fontSize: 13, color: '#e5e5e5' }}>
                                {t.name}
                              </p>
                              <p className="font-sans" style={{ fontSize: 11, color: '#555555' }}>
                                {t.info}
                              </p>
                            </div>
                            <span className="ml-auto text-2xl">{t.flag}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Left arrow */}
            <button
              onClick={() => setCurrent(prev => (prev - 1 + SLIDE_COUNT) % SLIDE_COUNT)}
              className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              <ChevronLeft size={18} style={{ color: '#888888' }} />
            </button>

            {/* Right arrow */}
            <button
              onClick={() => setCurrent(prev => (prev + 1) % SLIDE_COUNT)}
              className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
            >
              <ChevronRight size={18} style={{ color: '#888888' }} />
            </button>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-2 mt-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  current === i
                    ? 'w-8 h-2 bg-brand-orange'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
