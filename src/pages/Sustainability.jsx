import { motion } from 'framer-motion'
import { useSEO } from '../hooks/useSEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const EASE = [0.25, 0.46, 0.45, 0.94]

const fadeUp = {
  initial:   { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport:  { once: true },
  transition: { duration: 0.8, ease: EASE },
}

const PILLARS = [
  {
    icon: '👥',
    title: 'Small Group Departures',
    body: 'We deliberately keep groups under 10 travelers. Smaller groups mean less environmental impact and deeper community connections.',
  },
  {
    icon: '🌿',
    title: 'Leave No Trace',
    body: 'Every expedition follows strict Leave No Trace principles. We carry out everything we carry in.',
  },
  {
    icon: '🏡',
    title: 'Supporting Local Communities',
    body: 'We hire local guides, porters, cooks, and homestay owners. Every rupee flows back into mountain communities.',
  },
  {
    icon: '🚗',
    title: 'Low-Impact Transportation',
    body: 'Shared vehicles, minimal travel, most direct fuel-efficient routes through sensitive terrain.',
  },
  {
    icon: '🙏',
    title: 'Sacred Landscape Respect',
    body: 'We train every traveler to honor local customs, temple etiquette, and sacred site protocols.',
  },
  {
    icon: '♻️',
    title: 'Plastic-Free Expeditions',
    body: 'Reusable water bottles, cloth bags, biodegradable toiletry kits. Single-use plastic strictly prohibited.',
  },
]

const STATS = [
  { value: '100%', label: 'Local guides and staff' },
  { value: '0',    label: 'Single-use plastics on expeditions' },
  { value: '10',   label: 'Maximum travelers per departure' },
  { value: '8+',   label: 'Local village communities supported' },
]

export default function Sustainability() {
  useSEO({
    title: 'Responsible Adi Kailash Yatra | Eco Tourism Kumaon | Himalayan Serenity',
    description: 'Responsible Adi Kailash Yatra and Kumaon eco tourism from Pithoragarh. Small groups, supporting local Dharchula communities, plastic-free Himalayan travel.',
  })
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar activePage="sustainability" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end pb-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/packages/khaliya-meadow.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <p className="section-tag mb-5">Our Philosophy</p>
            <h1
              className="section-title max-w-3xl"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)', lineHeight: 1.1 }}
            >
              Sustainability
            </h1>
            <p
              className="font-sans mt-6 max-w-xl leading-relaxed"
              style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', color: '#c8b89a', fontStyle: 'italic' }}
            >
              "We Travel Light. We Leave Less."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 1 — Our Commitment ────────────────────────────────────── */}
      <section className="py-24 bg-brand-dark-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <p className="section-tag mb-5">Our Commitment</p>
            <h2 className="section-title text-3xl lg:text-4xl mb-8">
              Treading Gently Through Sacred Landscapes
            </h2>
            <p className="font-sans text-brand-text-muted text-lg leading-[1.9]">
              The mountains that shelter us deserve our deepest respect. At Himalayan
              Serenity, sustainability isn't a policy — it's a philosophy woven into every
              journey we design. We believe that the most profound travel experiences come
              from treading gently, giving generously, and leaving landscapes exactly as
              nature intended them.
            </p>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            {...fadeUp}
            className="flex items-center justify-center gap-4 mt-16"
          >
            <div className="h-px w-24 bg-brand-orange/30" />
            <span style={{ color: '#e07b2a', fontSize: 18 }}>❋</span>
            <div className="h-px w-24 bg-brand-orange/30" />
          </motion.div>
        </div>
      </section>

      {/* ── Section 2 — How We Travel Responsibly ─────────────────────────── */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="section-tag mb-4">How We Travel</p>
            <h2 className="section-title text-3xl lg:text-4xl">
              Travelling Responsibly
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="group rounded-2xl p-8 transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(224,123,42,0.06)'
                  e.currentTarget.style.borderColor = 'rgba(224,123,42,0.25)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                }}
              >
                <div className="text-3xl mb-5">{pillar.icon}</div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: '1.1rem',
                    color: '#F0E8D8',
                    fontWeight: 400,
                  }}
                >
                  {pillar.title}
                </h3>
                <p className="font-sans text-brand-text-muted text-sm leading-relaxed">
                  {pillar.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3 — Our Promise (quote) ───────────────────────────────── */}
      <section className="py-24 bg-brand-dark-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <p className="section-tag mb-8">Our Promise</p>

            <div
              className="relative rounded-2xl px-10 py-12 sm:px-16 sm:py-14"
              style={{
                background: 'rgba(224,123,42,0.06)',
                border: '1px solid rgba(224,123,42,0.2)',
              }}
            >
              {/* Decorative quote mark */}
              <div
                className="absolute top-6 left-10 select-none"
                style={{ fontFamily: 'Georgia, serif', fontSize: '5rem', color: 'rgba(224,123,42,0.15)', lineHeight: 1 }}
              >
                "
              </div>

              <p
                className="font-sans leading-[1.95] relative z-10"
                style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', color: '#c8b89a', fontStyle: 'italic' }}
              >
                The Himalaya has given us everything — breathtaking beauty, spiritual depth,
                and a livelihood we cherish. Our promise is simple: to protect what sustains
                us, support those who live here, and ensure these sacred peaks remain
                pristine for the next generation.
              </p>

              <p
                className="font-sans mt-8 text-sm tracking-widest uppercase"
                style={{ color: '#e07b2a', letterSpacing: '0.2em' }}
              >
                — Himalayan Serenity Travel Team
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section 4 — Stats ─────────────────────────────────────────────── */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="section-tag mb-4">By The Numbers</p>
            <h2 className="section-title text-3xl lg:text-4xl">
              Our Impact in Practice
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
                className="text-center rounded-2xl py-10 px-6"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div
                  style={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                    color: '#e07b2a',
                    lineHeight: 1,
                    marginBottom: '12px',
                  }}
                >
                  {stat.value}
                </div>
                <p className="font-sans text-brand-text-muted text-sm leading-snug">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
