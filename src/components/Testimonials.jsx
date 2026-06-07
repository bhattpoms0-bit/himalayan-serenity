import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const FLAG = {
  in: <img src="https://flagcdn.com/24x18/in.png" alt="India"     loading="lazy" className="inline-block w-6 h-4 rounded-sm align-middle" />,
  gb: <img src="https://flagcdn.com/24x18/gb.png" alt="UK"        loading="lazy" className="inline-block w-6 h-4 rounded-sm align-middle" />,
  de: <img src="https://flagcdn.com/24x18/de.png" alt="Germany"   loading="lazy" className="inline-block w-6 h-4 rounded-sm align-middle" />,
  fr: <img src="https://flagcdn.com/24x18/fr.png" alt="France"    loading="lazy" className="inline-block w-6 h-4 rounded-sm align-middle" />,
  au: <img src="https://flagcdn.com/24x18/au.png" alt="Australia" loading="lazy" className="inline-block w-6 h-4 rounded-sm align-middle" />,
  ru: <img src="https://flagcdn.com/24x18/ru.png" alt="Russia"    loading="lazy" className="inline-block w-6 h-4 rounded-sm align-middle" />,
}

const testimonials = [
  // ── Slide 1: 1 Indian + 2 International ────────────────────────────
  {
    stars:  5,
    quote:  'Standing before Om Parvat and seeing the sacred ॐ symbol in snow with my own eyes was a moment I cannot describe in words. A life-changing yatra — every detail arranged flawlessly by Himalayan Serenity.',
    name:   'Rajesh Sharma',
    info:   'New Delhi, India · Adi Kailash Expedition, May 2024',
    avatar: '/images/testimonials/rajesh-sharma.webp',
    flag:   FLAG.in,
  },
  {
    stars:  5,
    quote:  'I found Himalayan Serenity through a friend and it was the best travel decision I ever made. Our guide\'s knowledge of the ancient trade routes and local culture was extraordinary — worth every penny and more.',
    name:   'Sarah Thompson',
    info:   'London, UK · The Borderlands of the Himalaya, Oct 2024',
    avatar: '/images/testimonials/sarah-mitchell.webp',
    flag:   FLAG.gb,
  },
  {
    stars:  5,
    quote:  'I came for the yoga and Ayurveda — I stayed for the mountains. Seven days of Sattvic meals, morning practice at Khaliya Top with the Panchachuli peaks in front of me, and Ayurvedic treatments that reset my body completely. Nothing in Europe comes close to this.',
    name:   'Thomas Bergmann',
    info:   'Munich, Germany · Panchachuli Wellness Retreat, Sept 2024',
    avatar: '/images/testimonials/thomas-bergmann.webp',
    flag:   FLAG.de,
  },
  // ── Slide 2: 1 Indian + 2 International ────────────────────────────
  {
    stars:  5,
    quote:  'As a solo woman traveler I had concerns, but the all-women group and our female guide made me feel completely safe and empowered. The Darma Valley is paradise on earth.',
    name:   'Priya Nair',
    info:   "Bangalore, India · Women's Himalaya Retreat, April 2024",
    avatar: '/images/testimonials/priya-nair.webp',
    flag:   FLAG.in,
  },
  {
    stars:  5,
    quote:  'I came to the Himalayas searching for stillness after a difficult year. The women\'s retreat gave me far more than I expected — Shakti yoga at sunrise, Ayurvedic meals, and the warmth of guides who felt like family. I left a different person.',
    name:   'Emma Lescaut',
    info:   "Lyon, France · Women's Himalaya Retreat, May 2024",
    avatar: '/images/testimonials/yuki-tanaka.webp',
    flag:   FLAG.fr,
  },
  {
    stars:  5,
    quote:  'I booked the Darma Valley Detox to disconnect from screens and reconnect with myself. Eleven days of trail yoga, tribal village stays and herbal medicine in the most remote valley I have ever visited. Completely life-changing.',
    name:   'Daniel Hurst',
    info:   'Melbourne, Australia · Darma Valley Detox, June 2024',
    avatar: '/images/testimonials/amit-kulkarni.webp',
    flag:   FLAG.au,
  },
  // ── Slide 3: 2 International + 1 Indian ────────────────────────────
  {
    stars:  4,
    quote:  'Я приехала в Гималаи в поисках тишины и нашла нечто гораздо большее — связь с горами, которую невозможно описать словами. Медитации на высоте изменили меня изнутри. Himalayan Serenity — это не просто тур, это опыт на всю жизнь.',
    name:   'Natasha Volkova',
    info:   'Moscow, Russia · Panchachuli Retreat, March 2024',
    avatar: '/images/testimonials/sunita-rawat.webp',
    flag:   FLAG.ru,
  },
  {
    stars:  5,
    quote:  'As a wildlife and landscape photographer I needed guides who understood golden hour, patience and remote access. The Darma Valley delivered all three — came back with 50 portfolio-worthy shots.',
    name:   'Klaus Weber',
    info:   'Munich, Germany · Darma Valley Digital Detox, May 2024',
    avatar: '/images/testimonials/amit-kulkarni.webp',
    flag:   FLAG.de,
  },
  {
    stars:  5,
    quote:  'Turning 40 was the perfect excuse to do something bold. Challenging but the team never let me feel like giving up was an option. Crossed the glacier on day 6 and cried happy tears at the top.',
    name:   'Meera Joshi',
    info:   'Mumbai, India · Panchachuli Trek, August 2024',
    avatar: '/images/testimonials/meera-joshi.webp',
    flag:   FLAG.in,
  },
]

// Group into slides of 3 (3 + 3 + 3)
const slides = [
  testimonials.slice(0, 3),
  testimonials.slice(3, 6),
  testimonials.slice(6, 9),
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
            From Indian pilgrims to international seekers — real stories from the mountains.
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
