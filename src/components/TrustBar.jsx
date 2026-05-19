import { motion } from 'framer-motion'

const STATS = [
  { value: '500+',  label: 'Pilgrims Guided'    },
  { value: '15+',   label: 'Years Experience'   },
  { value: '100%',  label: 'Safe Expeditions'   },
  { value: '★ 4.9', label: 'Expert Local Guides' },
]

export default function TrustBar() {
  return (
    <div
      className="border-y border-white/[0.06]"
      style={{ backgroundColor: '#0d0d0d' }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
          {STATS.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center text-center"
            >
              <span
                className="font-serif leading-none mb-1"
                style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: '#e07b2a' }}
              >
                {value}
              </span>
              <span
                className="font-sans uppercase"
                style={{ fontSize: 10, letterSpacing: '0.14em', color: '#555555' }}
              >
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
