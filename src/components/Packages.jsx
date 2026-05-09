import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, MessageCircle, Clock, TrendingUp, Users } from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURED = [
  {
    tag:        'Most Popular',
    title:      'Adi Kailash Expedition',
    days:       14,
    difficulty: 'Moderate',
    people:     12,
    price:      '$2,500',
    image:      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=85',
  },
  {
    tag:        'Spiritual Peak',
    title:      'Om Parvat Journey',
    days:       10,
    difficulty: 'Challenging',
    people:     8,
    price:      '$3,200',
    image:      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=900&q=85',
  },
]

const MORE = [
  {
    tag:    'All-Inclusive',
    title:  'Luxury Spiritual Retreat',
    days:   7,
    people: 15,
    price:  '$1,800',
    image:  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80',
  },
  {
    tag:    'Limited Edition',
    title:  'Photography Expedition',
    days:   12,
    people: 6,
    price:  '$4,500',
    image:  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80',
  },
  {
    tag:    'Comfort Plus',
    title:  'Senior-Friendly Journey',
    days:   8,
    people: 10,
    price:  '$2,100',
    image:  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&q=80',
  },
]

// Tag colour map — Cinzel, 10px, tracking-[0.15em], uppercase, rounded-full
const TAG_BG = {
  'Most Popular':    '#e07b2a',
  'Spiritual Peak':  'rgba(99,102,241,0.85)',
  'All-Inclusive':   'rgba(16,185,129,0.85)',
  'Limited Edition': 'rgba(139,92,246,0.85)',
  'Comfort Plus':    'rgba(245,158,11,0.85)',
}

// Scroll-reveal easing
const EASE = [0.25, 0.46, 0.45, 0.94]

// Hover easing — spring-like overshoot makes the lift feel physical, not mechanical
const HOVER_EASE = [0.34, 1.56, 0.64, 1]

// ─── Package Card ─────────────────────────────────────────────────────────────
function PackageCard({ pkg, large = false, index = 0 }) {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Build meta items, filter empty fields
  const meta = [
    pkg.days       && { Icon: Clock,      label: `${pkg.days} Days`   },
    pkg.difficulty && { Icon: TrendingUp, label: pkg.difficulty        },
    pkg.people     && { Icon: Users,      label: `${pkg.people} pax`  },
  ].filter(Boolean)

  return (
    // ── Outer div: scroll-reveal animation ──────────────────────────────────
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
    >
      {/* ── Inner div: hover-lift animation — also the visual card ────────── */}
      <motion.div
        whileHover={{
          y: -10,
          scale: 1.012,
          boxShadow: '0 32px 72px rgba(0,0,0,0.55), 0 0 0 1px rgba(224,123,42,0.25)',
        }}
        transition={{ duration: 0.45, ease: HOVER_EASE }}
        className="group cursor-pointer rounded-2xl overflow-hidden"
        style={{
          backgroundColor: '#1a1a1a',
          border:          '1px solid rgba(255,255,255,0.08)',
          boxShadow:       '0 0px 0px rgba(0,0,0,0), 0 0 0 0px rgba(224,123,42,0)',
        }}
      >

        {/* ── Image ──────────────────────────────────────────────────────── */}
        {/* FIX 2: small card was 190px — too squat for landscape photography */}
        <div className={`relative overflow-hidden ${large ? 'h-[280px]' : 'h-[224px]'}`}>
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />

          {/* Subtle bottom gradient so card-body transition looks clean */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.45) 100%)' }}
          />

          {/* Tag badge */}
          {pkg.tag && (
            <span
              className="absolute top-4 left-4 text-white"
              style={{
                fontFamily:      '"Cinzel", serif',
                fontSize:        10,
                letterSpacing:   '0.15em',
                textTransform:   'uppercase',
                backgroundColor: TAG_BG[pkg.tag] ?? '#e07b2a',
                borderRadius:    9999,
                padding:         '4px 12px',
              }}
            >
              {pkg.tag}
            </span>
          )}
        </div>

        {/* ── Card body ──────────────────────────────────────────────────── */}
        {/* Spacing +20%: p-6 → p-7 */}
        <div className="p-7">

          {/* Title — mb-4 → mb-5 */}
          <h3
            className="font-serif text-white leading-snug tracking-[-0.01em] mb-5"
            style={{ fontSize: large ? '1.25rem' : '1.05rem' }}
          >
            {pkg.title}
          </h3>

          {/* Meta row — mb-5 → mb-6 */}
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mb-6">
            {meta.map(({ Icon, label }, i) => (
              <span key={label} className="flex items-center gap-1.5">
                {i > 0 && (
                  <span style={{ color: '#e07b2a', fontSize: 8, lineHeight: 1 }}>•</span>
                )}
                <span
                  className="flex items-center gap-1 font-sans uppercase tracking-wide"
                  style={{ color: '#666666', fontSize: 11 }}
                >
                  <Icon size={10} strokeWidth={1.5} />
                  {label}
                </span>
              </span>
            ))}
          </div>

          {/* FIX 1: items-end → items-center; arrow responds to card group-hover */}
          <div className="flex items-center justify-between">
            <div>
              <p
                className="uppercase mb-1"
                style={{
                  fontFamily:    '"Cinzel", serif',
                  fontSize:      9,
                  letterSpacing: '0.15em',
                  color:         '#555555',
                }}
              >
                Starting at
              </p>
              <p
                className="font-serif leading-none"
                style={{ fontSize: 26, color: '#e07b2a' }}
              >
                {pkg.price}
              </p>
            </div>

            {/* FIX 3: arrow responds to CARD hover via group-hover, not its own whileHover */}
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0
                         transition-all duration-300 ease-out
                         group-hover:translate-x-[5px] group-hover:brightness-110"
              style={{ backgroundColor: '#e07b2a' }}
            >
              <ArrowRight size={16} strokeWidth={2} className="text-white" />
            </div>
          </div>

        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Packages() {
  const headerRef    = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-brand-dark-2 py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-20"
        >
          <p
            className="mb-5 uppercase"
            style={{
              fontFamily:    '"Cinzel", serif',
              fontSize:      11,
              letterSpacing: '0.2em',
              color:         '#e07b2a',
            }}
          >
            Curated Journeys
          </p>

          <h2
            className="font-serif text-brand-cream mb-5 leading-tight tracking-[-0.02em] text-3xl sm:text-4xl lg:text-5xl"
          >
            Sacred Peaks &amp; Spiritual Trails
          </h2>

          <p
            className="font-sans mx-auto text-center leading-[1.75]"
            style={{ fontSize: 16, color: '#888888', maxWidth: '36rem' }}
          >
            Embark on a transformative journey through the world's most majestic landscapes.
            Our expeditions blend physical challenge with profound spiritual renewal.
          </p>
        </motion.div>

        {/* ── Featured 2 large cards ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {FEATURED.map((pkg, i) => (
            <PackageCard key={pkg.title} pkg={pkg} large index={i} />
          ))}
        </div>

        {/* ── 3 smaller cards — stagger restarts from 0 for this grid ─────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {MORE.map((pkg, i) => (
            <PackageCard key={pkg.title} pkg={pkg} index={i} />
          ))}
        </div>

        {/* ── Bottom actions ────────────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/packages" className="btn-primary">View All Packages</a>
          <a
            href="https://wa.me/9771444000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 border border-emerald-800/50 text-emerald-500/80 text-[12.5px] font-sans font-semibold tracking-luxury uppercase px-6 py-3.5 rounded-full hover:border-emerald-700/70 hover:text-emerald-400 transition-all duration-300"
          >
            <MessageCircle size={13} strokeWidth={1.5} />
            WhatsApp Concierge
          </a>
        </div>

      </div>
    </section>
  )
}
