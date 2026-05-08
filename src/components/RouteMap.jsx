import { motion } from 'framer-motion'

const EASE = [0.25, 0.46, 0.45, 0.94]

const WAYPOINTS = [
  { emoji: '🚂', name: 'Kathgodam',   elevation: 'Railway Head',    alt: false },
  { emoji: '🏔️', name: 'Pithoragarh', elevation: '5,500 ft',        alt: false },
  { emoji: '🛣️', name: 'Dharchula',   elevation: 'Base Camp',        alt: false },
  { emoji: '🏕️', name: 'Gunji Village', elevation: '10,500 ft',     alt: false },
  { emoji: '🕉️', name: 'Om Parvat',   elevation: '14,270 ft',       alt: false },
  { emoji: '⛰️', name: 'Adi Kailash', elevation: '20,305 ft',       alt: false },
]

export default function RouteMap() {
  return (
    <section style={{ backgroundColor: '#0d0d0d' }} className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-12"
        >
          <p
            className="mb-4 uppercase"
            style={{ fontFamily: '"Cinzel", serif', fontSize: 10, letterSpacing: '0.22em', color: '#e07b2a' }}
          >
            The Sacred Route
          </p>
          <h2
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#F0E8D8',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.018em',
              marginBottom: '1rem',
            }}
          >
            Trek Route Map
          </h2>
          <p className="font-sans text-sm max-w-md mx-auto" style={{ color: '#666666', lineHeight: 1.8 }}>
            Follow the ancient pilgrimage path from the foothills to the sacred peaks of Adi Kailash and Om Parvat.
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          }}
        >
          <iframe
            title="Adi Kailash & Om Parvat Trek Route"
            src="https://www.openstreetmap.org/export/embed.html?bbox=79.2%2C29.0%2C81.0%2C30.5&layer=mapnik&marker=30.2667%2C80.6000"
            width="100%"
            height="500"
            style={{ border: 0, borderRadius: '16px' }}
            loading="lazy"
            allowFullScreen
          />
        </motion.div>

        {/* View full route link */}
        <div className="text-center mt-4">
          <a
            href="https://www.google.com/maps/dir/Kathgodam,+Uttarakhand/Pithoragarh,+Uttarakhand/Dharchula,+Uttarakhand/Gunji+Village,+Uttarakhand/Nabidhang,+Uttarakhand"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-brand-orange text-sm font-sans hover:underline"
          >
            View Full Route on Google Maps →
          </a>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
          className="mt-12 relative"
        >
          {/* Connecting line */}
          <div
            className="absolute top-5 left-0 right-0 hidden sm:block"
            style={{
              height: 1,
              background: 'linear-gradient(to right, transparent, #e07b2a 15%, #e07b2a 85%, transparent)',
              opacity: 0.35,
              zIndex: 0,
            }}
          />

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-2 relative z-10">
            {WAYPOINTS.map((wp, i) => (
              <motion.div
                key={wp.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.08 }}
                className="flex flex-col items-center text-center"
              >
                {/* Emoji + dot */}
                <div className="relative mb-3">
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: '#1a1a1a',
                      border: '1px solid rgba(224,123,42,0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      boxShadow: '0 0 0 4px #0d0d0d',
                    }}
                  >
                    {wp.emoji}
                  </div>
                </div>

                {/* Name */}
                <p
                  className="mb-1 leading-tight"
                  style={{
                    fontFamily: '"Cinzel", serif',
                    fontSize: 9.5,
                    letterSpacing: '0.08em',
                    color: '#cccccc',
                  }}
                >
                  {wp.name}
                </p>

                {/* Elevation */}
                <p className="font-sans" style={{ fontSize: 11, color: '#777777' }}>
                  {wp.elevation}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
