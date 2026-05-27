import { motion } from 'framer-motion'
import { Play, Calendar } from 'lucide-react'

const SPRING = [0.16, 1, 0.3, 1]

const H1_LINES = [
  { text: 'Sacred Himalayan', italic: false },
  { text: 'Journeys',         italic: false },
  { text: 'Beyond Ordinary',  italic: true  },
  { text: 'Travel',           italic: true  },
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

      {/* Layer 1 — radial vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, transparent 25%, rgba(0,0,0,0.52) 100%)',
        }}
      />

      {/* Layer 2 — cinematic bottom fade */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.08) 40%, rgba(13,13,13,1) 100%)',
        }}
      />

      {/* Layer 3 — 3% grain */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: 0.03,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-10 -translate-y-[5%]">
        <div className="text-center sm:text-left">

          {/* Badge — 32px height, mb-6 = 24px bottom margin */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: SPRING }}
            className="inline-flex items-center gap-2.5 border border-brand-orange/40 bg-brand-orange/[0.07] rounded-full px-4 py-2 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse-slow flex-shrink-0" />
            <span
              className="text-brand-orange uppercase"
              style={{ fontFamily: '"Cinzel", serif', fontSize: 10, letterSpacing: '0.25em' }}
            >
              Luxury Heritage
            </span>
          </motion.div>

          {/* Heading — 4 lines, sized to stay under 280px total */}
          <h2 className="mb-5 leading-[1.05] tracking-[-0.02em]">
            {H1_LINES.map(({ text, italic }, i) => (
              <span key={text} className="block overflow-hidden pb-[0.05em]">
                <motion.span
                  className={`block font-serif text-[38px] sm:text-5xl lg:text-[56px] ${
                    italic ? 'font-light italic' : 'font-normal'
                  }`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, delay: 0.35 + i * 0.14, ease: SPRING }}
                  style={{ color: italic ? '#d4af7a' : '#ffffff' }}
                >
                  {text}
                </motion.span>
              </span>
            ))}
          </h2>

          {/* Subtitle — #999, tighter mb */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.72, ease: 'easeOut' }}
            className="font-sans mb-5 sm:mx-0 mx-auto text-sm sm:text-base"
            style={{ color: '#999999', maxWidth: 460, lineHeight: 1.8 }}
          >
            Experience Adi Kailash, Om Parvat, and transformative Himalayan
            expeditions with safety, luxury, and authenticity.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.88, ease: SPRING }}
            className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start"
          >
            {/* Primary */}
            <motion.a
              href="/contact#consultation"
              whileHover={{
                filter: 'brightness(1.1)',
                boxShadow: '0 0 30px rgba(224,123,42,0.4)',
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-brand-orange hover:bg-brand-orange-light text-white font-sans font-medium rounded-full px-6 py-3 text-[13px] tracking-wide cursor-pointer inline-flex items-center justify-center gap-2 transition-colors duration-300 w-full sm:w-auto"
            >
              Plan My Sacred Journey
            </motion.a>

            {/* Secondary */}
            <motion.div
              whileHover={{
                borderColor: 'rgba(255,255,255,0.4)',
                backgroundColor: 'rgba(255,255,255,0.05)',
              }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/20 rounded-full w-full sm:w-auto"
              style={{ display: 'inline-block' }}
            >
              <a
                href="#packages-section"
                className="block text-white/75 hover:text-white font-sans font-medium px-6 py-3 text-[13px] tracking-wide cursor-pointer transition-colors duration-300 text-center"
                style={{ textDecoration: 'none' }}
              >
                View Expeditions
              </a>
            </motion.div>

            {/* Video */}
            <button className="flex items-center gap-2 text-white/45 hover:text-white/80 transition-colors duration-300 text-[13px] font-sans ml-1 group">
              <motion.span
                whileHover={{ backgroundColor: 'rgba(224,123,42,0.18)' }}
                className="w-8 h-8 rounded-full border border-white/20 group-hover:border-white/35 flex items-center justify-center flex-shrink-0 transition-colors duration-300"
              >
                <Play size={9} fill="currentColor" />
              </motion.span>
              Watch Film
            </button>
          </motion.div>

          {/* Urgency text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease: 'easeOut' }}
            className="font-sans mt-3 mb-6 text-center sm:text-left"
            style={{ fontSize: 12, color: 'rgba(224,123,42,0.75)', letterSpacing: '0.04em' }}
          >
            ⚡ Limited spots for 2026 season — Book Early
          </motion.p>

          {/* Departure Bar — mt-6 keeps it anchored below buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 1.05, ease: SPRING }}
            className="inline-flex flex-wrap items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 border border-white/10 mt-6"
            style={{ background: 'rgba(0,0,0,0.5)' }}
          >
            <Calendar size={12} strokeWidth={1.5} className="text-brand-orange flex-shrink-0" />
            <span
              className="text-white/40 uppercase flex-shrink-0"
              style={{ fontFamily: '"Cinzel", serif', fontSize: 9, letterSpacing: '0.22em' }}
            >
              Next Departure:
            </span>
            <span className="w-px h-3 bg-white/15 flex-shrink-0" />
            <span className="text-white/85 text-xs sm:text-[13px] font-sans font-medium whitespace-nowrap">
              Adi Kailash — June 15
            </span>
            <span className="text-brand-orange text-[11px] font-sans font-semibold uppercase tracking-wide cursor-pointer hover:underline hover:text-brand-orange-light transition-colors duration-200 whitespace-nowrap">
              View All Dates
            </span>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10 pointer-events-none">
        <motion.span
          animate={{ opacity: [0.3, 0.65, 0.3] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontFamily: '"Cinzel", serif',
            fontSize: 9,
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
          }}
        >
          Ascend Further
        </motion.span>
        <motion.div
          animate={{ y: [0, 12, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px bg-gradient-to-b from-white/40 to-transparent"
          style={{ height: 60 }}
        />
      </div>

    </section>
  )
}
