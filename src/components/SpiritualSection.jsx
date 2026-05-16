import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const EASE = [0.25, 0.46, 0.45, 0.94]

export default function SpiritualSection() {
  const imageRef    = useRef(null)
  const imageInView = useInView(imageRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-brand-dark py-28 lg:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* ── Two-column layout ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">

          {/* ── Image Column ──────────────────────────────────────────────── */}
          <div ref={imageRef} className="relative">
            <motion.div
              className="relative rounded-2xl overflow-hidden h-[520px]"
              initial={{ scale: 1.0, opacity: 0 }}
              animate={imageInView ? { scale: 1.02, opacity: 1 } : {}}
              transition={{ duration: 1.2, ease: EASE }}
            >
              <img
                src="/images/packages/adi-kailash/adi-kailash-trishul.jpg"
                alt="Trishul at Adi Kailash"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            </motion.div>

            {/* Floating Quote Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={imageInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              className="absolute bottom-8 right-0 translate-x-6 backdrop-blur-xl rounded-xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              style={{
                maxWidth:        240,
                backgroundColor: 'rgba(10,10,10,0.88)',
                borderTop:       '1px solid rgba(255,255,255,0.07)',
                borderRight:     '1px solid rgba(255,255,255,0.07)',
                borderBottom:    '1px solid rgba(255,255,255,0.07)',
                borderLeft:      '3px solid #e07b2a',
              }}
            >
              <div
                className="leading-none mb-3 select-none font-serif"
                style={{ fontSize: '2.5rem', color: 'rgba(224,123,42,0.4)' }}
              >
                "
              </div>
              <p
                className="font-serif italic leading-[1.75] mb-4"
                style={{ fontSize: 14, color: '#cccccc' }}
              >
                The silence of the mountains is not empty — it is full of answers for those who listen.
              </p>
              <span className="divider-luxury" />
            </motion.div>
          </div>

          {/* ── Text Column — staggered whileInView ───────────────────────── */}
          <div>
            <motion.p
              className="section-tag mb-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0, ease: EASE }}
            >
              Sanctuary of the Soul
            </motion.p>

            <motion.h2
              className="section-title mb-6"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.2rem)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              Spiritual<br />Significance
            </motion.h2>

            <motion.span
              className="divider-luxury mb-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              style={{ display: 'block', transformOrigin: 'left' }}
            />

            <motion.p
              className="font-sans text-brand-text-muted text-[14.5px] leading-[1.78] mb-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            >
              In the shadow of the world's highest peaks, spirituality is not a practice,
              but the very air one breathes. Our journeys are curated to facilitate an
              internal ascent as profound as the physical climb.
            </motion.p>

            <motion.p
              className="font-sans text-brand-text-muted text-[14.5px] leading-[1.78] mb-11"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
            >
              We invite you to step into the sacred spaces where the veil between the
              earthly and the divine is at its thinnest.
            </motion.p>

            {/* Animated underline text link */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
            >
              <motion.a
                href="/about"
                className="inline-flex items-center gap-2 relative"
                initial="rest"
                whileHover="hover"
                animate="rest"
                style={{
                  fontFamily:    '"Cinzel", serif',
                  fontSize:      11,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color:         '#e07b2a',
                }}
              >
                Discover Our Story
                <ArrowRight size={13} strokeWidth={1.5} />
                <motion.span
                  variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ backgroundColor: '#e07b2a', transformOrigin: 'left' }}
                />
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* ── Pilgrimage Routes ─────────────────────────────────────────────── */}
        <div className="mt-28 border-t border-brand-dark-border pt-28">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="section-tag mb-5">The Sacred Path</p>
            <h2 className="section-title" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.2rem)' }}>
              Ancient Pilgrimage Routes
            </h2>
          </motion.div>

          <motion.div
            className="relative rounded-2xl overflow-hidden h-[440px] group cursor-pointer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            <img
              src="/images/packages/adi-kailash/adi-kailash-road.jpg"
              alt="Adi Kailash Road"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 img-overlay-side" />

            <div className="absolute bottom-12 left-12 max-w-lg">
              <h3 className="font-serif text-white text-[1.7rem] tracking-[-0.015em] mb-4 leading-snug">
                Adi Kailash: The Inner Peak
              </h3>
              <p className="font-sans text-white/60 text-[13.5px] leading-[1.72] mb-7">
                Retrace the steps of sages and seekers along a route that has remained
                unchanged for millennia. A journey of 200 kilometers that transforms the
                traveler into a pilgrim.
              </p>
              <a
                href="/contact#consultation"
                className="inline-flex items-center gap-2 text-brand-orange text-[12.5px] font-sans font-semibold tracking-luxury uppercase hover:text-brand-orange-light hover:gap-3 transition-all duration-300"
              >
                Explore the Route
                <ArrowRight size={13} strokeWidth={1.5} />
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
