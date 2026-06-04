import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Users, Star, Heart, Globe, Headphones } from 'lucide-react'

const EASE = [0.25, 0.46, 0.45, 0.94]

const features = [
  {
    icon:  Shield,
    title: 'Government Registered',
    desc:  'Fully licensed and accredited by the Ministry of Tourism, ensuring your journey meets the highest legal and ethical standards.',
  },
  {
    icon:  Users,
    title: 'Thousands of Travelers',
    desc:  'A global community of high-altitude seekers who have trusted us to guide their spiritual and physical ascents across the range.',
  },
  {
    icon:  Star,
    title: 'Expert Local Guides',
    desc:  'Our Sherpas and guides are born of the mountains, combining ancestral wisdom with modern safety certifications.',
  },
  {
    icon:  Heart,
    title: 'Oxygen & Safety Support',
    desc:  'Equipped with medical-grade oxygen, PAC chambers, and 24/7 satellite link support for total high-altitude peace of mind.',
  },
  {
    icon:  Globe,
    title: 'Women-Friendly Departures',
    desc:  'Dedicated all-women expeditions led by female mountain experts, fostering a safe and empowering environment for all.',
  },
  {
    icon:  Headphones,
    title: 'International Support',
    desc:  'Multi-language concierge services and seamless logistics for global travelers arriving from every corner of the world.',
  },
]

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ feature, index }) {
  const ref      = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const Icon     = feature.icon

  return (
    // Outer: scroll-reveal
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
    >
      {/* Inner: hover-lift */}
      <motion.div
        className="group rounded-2xl p-5 lg:p-8 h-full cursor-pointer"
        style={{
          backgroundColor: '#171717',
          border:          '1px solid #222222',
          boxShadow:       '0 0px 0px rgba(0,0,0,0)',
        }}
        whileHover={{
          y:               -6,
          boxShadow:       '0 20px 50px rgba(0,0,0,0.4)',
          borderColor:     'rgba(224,123,42,0.18)',
          backgroundColor: '#1c1c1c',
        }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        {/* Icon — spring bounce on direct hover */}
        <motion.div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
          style={{
            backgroundColor: 'rgba(224,123,42,0.08)',
            border:          '1px solid rgba(224,123,42,0.16)',
          }}
          whileHover={{ y: -3 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Icon size={18} className="text-brand-orange" strokeWidth={1.5} />
        </motion.div>

        <h3
          className="font-serif text-brand-cream tracking-[-0.01em] mb-3 leading-snug"
          style={{ fontSize: 20 }}
        >
          {feature.title}
        </h3>
        <p className="font-sans leading-[1.85]" style={{ fontSize: 14, color: '#777777' }}>
          {feature.desc}
        </p>
      </motion.div>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function WhyChooseUs() {
  const headerRef    = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-brand-dark py-16 lg:py-32">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section Header */}
        <motion.div
          ref={headerRef}
          className="max-w-xl mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="section-tag mb-5">The Foundation of Your Journey</p>
          <h2
            className="font-serif text-brand-cream leading-tight tracking-[-0.02em] mb-5 text-3xl sm:text-4xl lg:text-5xl"
          >
            Why Explorers<br />Choose Us
          </h2>
          <p className="font-sans text-brand-text-muted text-[14.5px] leading-[1.78]">
            Beyond the peaks and the trails lies a commitment to safety, heritage, and
            excellence that defines every ascent we lead.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
