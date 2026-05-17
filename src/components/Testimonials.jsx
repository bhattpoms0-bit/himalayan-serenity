import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    stars:  5,
    quote:  'Standing before Om Parvat and seeing the sacred ॐ symbol in snow with my own eyes was a moment I cannot describe in words. Himalayan Serenity arranged everything flawlessly — permits, accommodation, guides. A life-changing yatra.',
    name:   'Rajesh Sharma',
    info:   'New Delhi, India · Adi Kailash Expedition, May 2024',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Rajesh+Sharma',
    flag:   '🇮🇳',
  },
  {
    stars:  5,
    quote:  'As a solo woman traveler I had concerns, but the all-women group and our female guide made me feel completely safe and empowered. The Darma Valley is paradise on earth. Will do this again next year.',
    name:   'Priya Nair',
    info:   'Bangalore, India · Women-Only Expedition, April 2024',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Priya+Nair',
    flag:   '🇮🇳',
  },
  {
    stars:  5,
    quote:  'I have trekked in Nepal, Peru and Patagonia — but Panchachuli was something else entirely. Raw, untouched, spiritual. The team\'s attention to safety at altitude was exceptional. Highly recommended for serious trekkers.',
    name:   'Thomas Bergmann',
    info:   'Munich, Germany · Panchachuli Trekking Expedition, Sept 2024',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Thomas+Bergmann',
    flag:   '🇩🇪',
  },
  {
    stars:  4,
    quote:  'Maine pehle kai baar suna tha Adi Kailash ke baare mein, par is yatra ne meri aatma ko chhu liya. Guides bahut experienced the aur har zaroorat ka khayal rakha. Bas kuch aur din hote toh aur achha hota. Himalayan Serenity ko dil se dhanyavaad.',
    name:   'Sunita Rawat',
    info:   'Dehradun, India · Adi Kailash Yatra, June 2024',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Sunita+Rawat',
    flag:   '🇮🇳',
  },
  {
    stars:  5,
    quote:  'I found Himalayan Serenity through a friend and it was the best travel decision I ever made. The Milam Trail is absolutely stunning and our guide Deepak\'s knowledge of local culture and flora was incredible. Worth every penny.',
    name:   'Sarah Mitchell',
    info:   'London, United Kingdom · Eastern Kumaon Wilderness, Oct 2024',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Sarah+Mitchell',
    flag:   '🇬🇧',
  },
  {
    stars:  5,
    quote:  'As a wildlife and landscape photographer, I needed guides who understood golden hour, patience, and remote access. This team delivered beyond expectations. Came back with 3000 shots, 50 of which are portfolio-worthy. Extraordinary.',
    name:   'Amit Kulkarni',
    info:   'Pune, India · Himalayan Photography Expedition, May 2024',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Amit+Kulkarni',
    flag:   '🇮🇳',
  },
  {
    stars:  4,
    quote:  'I came searching for silence and found something much deeper — a connection to the mountains I did not know was possible. The meditation sessions at altitude were transformative. Would have loved one extra day at the retreat. I will carry this experience forever.',
    name:   'Yuki Tanaka',
    info:   'Tokyo, Japan · Himalayan Wellness & Meditation Retreat, March 2024',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Yuki+Tanaka',
    flag:   '🇯🇵',
  },
  {
    stars:  5,
    quote:  'Turning 40 was the perfect excuse to do something bold. This trek was challenging but the team never let me feel like giving up was an option. Crossed the glacier on day 6 and cried happy tears at the top. Best birthday gift to myself.',
    name:   'Meera Joshi',
    info:   'Mumbai, India · Panchachuli Trek, August 2024',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Meera+Joshi',
    flag:   '🇮🇳',
  },
]

// Group into slides of 3 (3 + 3 + 2)
const slides = [
  testimonials.slice(0, 3),
  testimonials.slice(3, 6),
  testimonials.slice(6, 8),
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
              <div
                key={i}
                className={`w-8 h-8 rounded-full overflow-hidden border-2 border-[#111111] bg-[#222]${i > 0 ? ' -ml-2' : ''}`}
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-full h-full"
                  loading="lazy"
                  decoding="async"
                />
              </div>
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
                          <div className="text-brand-orange text-sm mb-4">
                            {'★'.repeat(t.stars)}{'☆'.repeat(5 - t.stars)}
                          </div>

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
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-[#222]">
                              <img
                                src={t.avatar}
                                alt={t.name}
                                className="w-full h-full"
                                loading="lazy"
                                decoding="async"
                              />
                            </div>
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
