import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Clock, TrendingUp, Users } from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────
const FEATURED = [
  {
    tag:        'Most Popular',
    title:      'Adi Kailash Expedition',
    subtitle:   'Pithoragarh · Dharchula · Gunji · Om Parvat',
    days:       6,
    difficulty: 'Moderate',
    people:     12,
    spots:      8,
    price:      'Starting from ₹34,999',
    image:      '/images/packages/adi-kailash-base.webp',
    link:       '/packages/adi-kailash-expedition',
  },
  {
    tag:        'Trekking Expedition',
    title:      'Panchachuli Trekking Expedition',
    subtitle:   'Munsiyari · Darkot · Duktu · Panchachuli Glacier Region',
    days:       10,
    difficulty: 'Challenging',
    people:     8,
    spots:      4,
    price:      'On Request',
    image:      '/images/packages/panchachuli-real.webp',
    link:       '/packages/panchachuli-expedition',
  },
  {
    tag:      'Couples & Photographers',
    title:    'Eastern Kumaon Cinematic Expedition',
    subtitle: 'Lohaghat · Pithoragarh · Dharchula · Didihat',
    days:     8,
    difficulty: 'Moderate',
    people:   10,
    spots:    6,
    price:    'On Request',
    image:    '/images/packages/johar-valley.webp',
    link:     '/packages/cinematic-expedition',
  },
  {
    tag:      'Trekkers & Birdwatchers',
    title:    'Eastern Kumaon Wilderness Expedition',
    subtitle: 'Munsiyari · Khaliya Top · Milam Trail · Askot',
    days:     9,
    difficulty: 'Moderate',
    people:   10,
    spots:    5,
    price:    'On Request',
    image:    '/images/packages/panchachuli-sunrise.webp',
    link:     '/packages/wilderness-expedition',
  },
]

const MORE = [
  {
    tag:    'All-Inclusive',
    title:  'Himalayan Wellness & Meditation Retreat',
    days:   7,
    people: 15,
    spots:  7,
    price:  'On Request',
    image:  '/images/wellness/forest-meditation.webp',
    link:   '/packages/wellness-retreat',
  },
  {
    tag:      'Women Only',
    title:    'Women-Only Expedition (Darma Valley)',
    subtitle: 'Dharchula · Darma Valley · Hidden Himalayan Villages',
    days:     12,
    people:   6,
    spots:    3,
    price:    'On Request',
    image:    '/images/darma-valley-womens-retreat/woman-traveler-himalayan-mountain-sunset.webp',
    alt:      'Women-Only Expedition Darma Valley Himalaya',
    link:     '/packages/darma-valley-womens-retreat',
  },
  {
    tag:    'Comfort Plus',
    title:  'Himalayan Photography Expedition',
    days:   8,
    people: 10,
    spots:  5,
    price:  'On Request',
    image:  '/images/himalayan-photography-expedition/camera-tripod-golden-hour-himalayan-mountains.webp',
    alt:    'Himalayan Photography Expedition camera tripod golden hour',
    link:   '/packages/photography-expedition',
  },
  {
    tag:      'Winter Special',
    title:    'Winter Himalayan Wellness Retreat',
    subtitle: 'Pithoragarh · Munsiyari · Abbott Mount · Jageshwar · Kasar Devi',
    days:     9,
    people:   10,
    spots:    6,
    price:    'On Request',
    image:    '/images/wellness/above-clouds.webp',
    link:     '/packages/winter-himalayan-wellness-retreat',
  },
]

// Tag colour map
const TAG_BG = {
  'Most Popular':           '#e07b2a',
  'Trekking Expedition':    'rgba(99,102,241,0.85)',
  'All-Inclusive':          'rgba(16,185,129,0.85)',
  'Women Only':             'rgba(219,112,147,0.85)',
  'Comfort Plus':           'rgba(245,158,11,0.85)',
  'Couples & Photographers':'rgba(201,169,110,0.85)',
  'Trekkers & Birdwatchers':'rgba(125,191,142,0.85)',
  'Winter Special':         'rgba(99,155,210,0.85)',
}

const EASE       = [0.25, 0.46, 0.45, 0.94]
const HOVER_EASE = [0.34, 1.56, 0.64, 1]

// ─── Package Card ─────────────────────────────────────────────────────────────
function PackageCard({ pkg, large = false, index = 0 }) {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const navigate = useNavigate()

  const meta = [
    pkg.days       && { Icon: Clock,      label: `${pkg.days} Days`  },
    pkg.difficulty && { Icon: TrendingUp, label: pkg.difficulty       },
    pkg.people     && { Icon: Users,      label: `${pkg.people} pax` },
  ].filter(Boolean)

  const bookUrl = `/contact?expedition=${encodeURIComponent(pkg.title)}`

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
    >
      <motion.div
        whileHover={{
          y: -10,
          scale: 1.012,
          boxShadow: '0 32px 72px rgba(0,0,0,0.55), 0 0 0 1px rgba(224,123,42,0.25)',
        }}
        transition={{ duration: 0.45, ease: HOVER_EASE }}
        onClick={() => pkg.link && navigate(pkg.link)}
        className="group cursor-pointer rounded-2xl overflow-hidden"
        style={{
          backgroundColor: '#1a1a1a',
          border:          '1px solid rgba(255,255,255,0.08)',
          boxShadow:       '0 0px 0px rgba(0,0,0,0)',
        }}
      >
        {/* ── Image ──────────────────────────────────────────────────────── */}
        <div className={`relative overflow-hidden ${large ? 'h-[280px]' : 'h-[224px]'}`}>
          <img
            src={pkg.image}
            alt={pkg.alt ?? pkg.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />

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

          {/* Spots badge */}
          {pkg.spots && (
            <span
              className="absolute bottom-3 right-3 text-white font-sans"
              style={{
                fontSize:        10,
                letterSpacing:   '0.05em',
                backgroundColor: pkg.spots <= 4 ? 'rgba(220,38,38,0.85)' : 'rgba(0,0,0,0.65)',
                backdropFilter:  'blur(4px)',
                borderRadius:    9999,
                padding:         '3px 10px',
                border:          '1px solid rgba(255,255,255,0.12)',
              }}
            >
              Only {pkg.spots} spots left
            </span>
          )}
        </div>

        {/* ── Card body ──────────────────────────────────────────────────── */}
        <div className="p-7">

          <h3
            className={`font-serif text-white leading-snug tracking-[-0.01em] ${pkg.subtitle ? 'mb-2' : 'mb-5'}`}
            style={{ fontSize: large ? '1.25rem' : '1.05rem' }}
          >
            {pkg.title}
          </h3>

          {pkg.subtitle && (
            <p
              className="font-sans mb-5"
              style={{ fontSize: 12, color: '#666666', letterSpacing: '0.03em' }}
            >
              {pkg.subtitle}
            </p>
          )}

          {/* Meta row */}
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

          {/* Price row */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <p
                className="uppercase mb-1"
                style={{ fontFamily: '"Cinzel", serif', fontSize: 9, letterSpacing: '0.15em', color: '#555555' }}
              >
                Pricing
              </p>
              <p
                className="font-serif leading-none"
                style={{ fontSize: pkg.price.length > 8 ? 18 : 26, color: '#e07b2a' }}
              >
                {pkg.price}
              </p>
            </div>

            <div
              className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0
                         transition-all duration-300 ease-out
                         group-hover:translate-x-[5px] group-hover:brightness-110"
              style={{ backgroundColor: '#e07b2a' }}
            >
              <ArrowRight size={16} strokeWidth={2} className="text-white" />
            </div>
          </div>

          {/* Book CTA — stops card-click propagation so it routes to /contact */}
          <Link
            to={bookUrl}
            onClick={e => e.stopPropagation()}
            className="block w-full text-center font-sans font-semibold rounded-xl py-3 transition-all duration-200"
            style={{
              fontSize:        13,
              letterSpacing:   '0.04em',
              color:           '#e07b2a',
              border:          '1px solid rgba(224,123,42,0.35)',
              backgroundColor: 'rgba(224,123,42,0.06)',
              textDecoration:  'none',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(224,123,42,0.14)'
              e.currentTarget.style.borderColor = 'rgba(224,123,42,0.6)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'rgba(224,123,42,0.06)'
              e.currentTarget.style.borderColor = 'rgba(224,123,42,0.35)'
            }}
          >
            Book This Expedition
          </Link>

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
            style={{ fontFamily: '"Cinzel", serif', fontSize: 11, letterSpacing: '0.2em', color: '#e07b2a' }}
          >
            Curated Journeys
          </p>

          <h2 className="font-serif text-brand-cream mb-5 leading-tight tracking-[-0.02em] text-3xl sm:text-4xl lg:text-5xl">
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

        {/* ── 2 featured cards ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {FEATURED.slice(0, 2).map((pkg, i) => (
            <PackageCard key={pkg.title} pkg={pkg} large index={i} />
          ))}
        </div>

        {/* ── View all link ─────────────────────────────────────────── */}
        <div className="flex justify-center">
          <Link
            to="/experiences"
            className="font-sans text-sm text-[#e07b2a] no-underline hover:opacity-75 transition-opacity duration-200"
          >
            View all expeditions →
          </Link>
        </div>

      </div>
    </section>
  )
}
