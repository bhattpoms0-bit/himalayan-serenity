import { motion } from 'framer-motion'

const EASE = [0.25, 0.46, 0.45, 0.94]

const steps = [
  {
    number: '01',
    label:  'The Departure',
    desc:   'Leave behind the noise of the modern world. Arrive with expectations, leave with a new perspective.',
  },
  {
    number: '02',
    label:  'The Ascent',
    desc:   'Face the majesty of the peaks. Discover that the greatest mountain to climb is the one within.',
  },
  {
    number: '03',
    label:  'The Return',
    desc:   "Descending does not mean going back. You return with the mountain's stillness carried in your heart.",
  },
]

export default function Transformation() {
  return (
    <section className="py-28 lg:py-36" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="max-w-2xl mx-auto px-5 sm:px-8 lg:px-10 text-center">

        {/* ── Header ────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* Spinning icon */}
          <motion.div
            className="flex items-center justify-center mx-auto mb-8"
            style={{
              width:           52,
              height:          52,
              borderRadius:    '50%',
              backgroundColor: 'rgba(224,123,42,0.08)',
              border:          '1px solid rgba(224,123,42,0.25)',
            }}
            initial={{ rotate: 0 }}
            whileInView={{ rotate: 360 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: EASE }}
          >
            <span className="text-brand-orange text-lg leading-none font-serif">✦</span>
          </motion.div>

          <p className="section-tag mb-5">The Journey Within</p>
          <h2
            className="font-serif text-brand-cream leading-tight tracking-[-0.02em] mb-16"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
          >
            Personal Transformation
          </h2>
        </motion.div>

        {/* ── Steps ─────────────────────────────────────────────────────────── */}
        <div>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative pl-8 py-7 text-left group"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.2, ease: EASE }}
            >
              {/* Left border — CSS group-hover handles color transition */}
              <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/[0.08] group-hover:bg-brand-orange transition-colors duration-300" />

              {/* Dot */}
              <span className="absolute left-0 top-7 -translate-x-1/2 w-[7px] h-[7px] rounded-full bg-[#222222] border border-[#333333] group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300" />

              <div className="flex items-baseline gap-3 mb-2">
                <span
                  className="uppercase"
                  style={{
                    fontFamily:    '"Cinzel", serif',
                    fontSize:      10,
                    letterSpacing: '0.2em',
                    color:         '#444444',
                  }}
                >
                  {step.number}
                </span>
                <p className="section-tag">{step.label}</p>
              </div>
              <p className="font-sans text-[14.5px] leading-[1.78]" style={{ color: '#666666' }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Quote + CTA ───────────────────────────────────────────────────── */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
        >
          <span className="divider-luxury mx-auto block mb-8" />

          {/* Decorative opening quote above the text */}
          <div
            className="leading-none select-none mb-1"
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize:   '3rem',
              color:      '#e07b2a',
              opacity:    0.45,
            }}
          >
            "
          </div>
          <p
            className="font-serif italic leading-[1.65] mb-10"
            style={{ fontSize: 20, color: '#555555' }}
          >
            I went to the mountains to find peace,<br />and I found myself.
          </p>

          <a href="/contact#consultation" className="btn-primary">Begin Your Journey</a>
        </motion.div>

      </div>
    </section>
  )
}
