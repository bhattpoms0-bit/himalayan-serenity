import { Fragment } from 'react'
import { motion } from 'framer-motion'

const SPRING = [0.16, 1, 0.3, 1]

const H1_LINES = [
  { text: 'Sacred Himalayan', italic: false },
  { text: 'Journeys',         italic: false },
  { text: 'Beyond Ordinary',  italic: true  },
  { text: 'Travel',           italic: true  },
]

const STATS = [
  { value: '500+',  label: 'Pilgrims Guided'    },
  { value: '15+',   label: 'Years Experience'   },
  { value: '100%',  label: 'Safe Expeditions'   },
  { value: '★ 4.9', label: 'Expert Guides'      },
]

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16"
    >

      {/* Mountain background — eager LCP image */}
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        loading="eager"
        decoding="async"
        width="1920"
        height="1080"
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ display: 'block' }}
      />

      {/* Left-to-right dark overlay — left readable, right shows mountain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(8,18,14,0.90) 0%, rgba(8,18,14,0.08) 100%)',
        }}
      />

      {/* 3% grain texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-10 -translate-y-[5%]">
        <div className="text-center sm:text-left">

          {/* Eyebrow — dot + text, no pill/border */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: SPRING }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span style={{ color: '#e07b2a', fontSize: 8, lineHeight: 1 }}>●</span>
            <span
              style={{
                fontFamily:    '"Cinzel", serif',
                fontSize:      11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color:         '#e07b2a',
              }}
            >
              Pithoragarh, Uttarakhand · Government Registered
            </span>
          </motion.div>

          {/* Heading — unchanged lines, clamp for mobile */}
          <h2 className="mb-5 leading-[1.05] tracking-[-0.02em]">
            {H1_LINES.map(({ text, italic }, i) => (
              <span key={text} className="block overflow-hidden pb-[0.05em]">
                <motion.span
                  className={`block font-serif ${italic ? 'font-light italic' : 'font-normal'}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.35 + i * 0.14, ease: SPRING }}
                  style={{
                    color:    italic ? '#d4af7a' : '#ffffff',
                    fontSize: 'clamp(32px, 8vw, 56px)',
                  }}
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Subtitle — new copy, 62% opacity, light weight */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.72, ease: 'easeOut' }}
            className="font-sans mb-8 sm:mx-0 mx-auto"
            style={{
              color:      'rgba(255,255,255,0.62)',
              maxWidth:   440,
              lineHeight: 1.8,
              fontWeight: 300,
              fontSize:   15,
            }}
          >
            Pilgrimage expeditions, yoga retreats and Ayurvedic immersions
            in the world's most sacred mountains — for seekers from every
            corner of the world.
          </motion.p>

          {/* Single CTA — solid gold, sharp corners */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.88, ease: SPRING }}
            className="mb-8 flex justify-center sm:justify-start"
          >
            <motion.a
              href="#packages-section"
              whileHover={{ filter: 'brightness(1.1)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display:        'inline-block',
                background:     '#e07b2a',
                color:          '#ffffff',
                padding:        '15px 32px',
                borderRadius:   4,
                fontSize:       12,
                fontFamily:     '"Cinzel", serif',
                letterSpacing:  '0.1em',
                textTransform:  'uppercase',
                textDecoration: 'none',
                fontWeight:     500,
              }}
            >
              Explore All Experiences
            </motion.a>
          </motion.div>

          {/* Trust stats — inside hero */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.05, ease: 'easeOut' }}
            style={{ maxWidth: 440 }}
            className="mx-auto sm:mx-0"
          >
            {/* Thin rule */}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.12)', marginBottom: 20 }} />

            {/* Stats row (desktop) / 2×2 grid (mobile) */}
            <div className="hidden sm:flex sm:items-center">
              {STATS.map(({ value, label }, i) => (
                <Fragment key={label}>
                  <div className="flex flex-col">
                    <span
                      className="font-serif"
                      style={{ fontSize: 19, color: '#e07b2a', lineHeight: 1.2 }}
                    >
                      {value}
                    </span>
                    <span
                      className="font-sans uppercase"
                      style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.38)' }}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STATS.length - 1 && (
                    <div
                      style={{
                        width:      1,
                        height:     28,
                        background: 'rgba(255,255,255,0.12)',
                        margin:     '0 20px',
                        flexShrink: 0,
                      }}
                    />
                  )}
                </Fragment>
              ))}
            </div>

            {/* Mobile 2×2 grid */}
            <div className="grid grid-cols-2 gap-5 sm:hidden">
              {STATS.map(({ value, label }) => (
                <div key={label} className="flex flex-col">
                  <span
                    className="font-serif"
                    style={{ fontSize: 19, color: '#e07b2a', lineHeight: 1.2 }}
                  >
                    {value}
                  </span>
                  <span
                    className="font-sans uppercase"
                    style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.38)' }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Season Badge — bottom right, hidden on mobile */}
      <div
        className="hidden sm:block absolute z-10"
        style={{
          bottom:       28,
          right:        28,
          background:   'rgba(255,255,255,0.04)',
          border:       '1px solid rgba(201,168,76,0.25)',
          borderRadius: 8,
          padding:      '12px 16px',
        }}
      >
        <div
          className="font-sans uppercase"
          style={{
            fontSize:      9,
            letterSpacing: '0.14em',
            color:         'rgba(255,255,255,0.38)',
            marginBottom:  4,
          }}
        >
          Season Open
        </div>
        <div
          className="font-sans"
          style={{ fontSize: 13, color: '#ffffff', fontWeight: 400 }}
        >
          May – October 2026
        </div>
      </div>

      {/* Scroll Indicator — centered bottom */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none">
        <div style={{ width: 1, height: 28, background: 'rgba(255,255,255,0.18)' }} />
        <span
          style={{
            fontFamily:    '"Cinzel", serif',
            fontSize:      9,
            letterSpacing: '0.15em',
            color:         'rgba(255,255,255,0.22)',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
      </div>

    </section>
  )
}
