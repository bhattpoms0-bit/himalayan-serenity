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
            src="https://www.google.com/maps/embed?pb=!1m58!1m12!1m3!1d1769012.1586929768!2d79.44268!3d30.12234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m43!3e2!4m5!1s0x390a0bf6c0e6b7e9%3A0x7c4a26e08ea92f0a!2sKathgodam%2C+Uttarakhand!3m2!1d29.2696!2d79.5219!4m5!1s0x39a07a9bb8f7e5fb%3A0x1c2f6d5f2e0bbc1a!2sPithoragarh%2C+Uttarakhand!3m2!1d29.5819!2d80.2181!4m5!1s0x39a0b63dc9a4a3f3%3A0x8c7d5b1f0e2a9c4e!2sDharchula%2C+Uttarakhand!3m2!1d29.8498!2d80.5334!4m5!1s0x39a0c5b2d3e4f1a7%3A0x2b1c8d3e9f5a7b2c!2sGunji%2C+Uttarakhand!3m2!1d30.4289!2d80.7916!4m5!1s0x39a0d3f4c5b6a8e9%3A0x3c2d9e4f8a1b5c6d!2sOm+Parvat!3m2!1d30.4521!2d80.7945!4m5!1s0x39a0e1c2d3b4a5f6%3A0x4d3e8f9a2b6c7d8e!2sAdi+Kailash!3m2!1d30.2683!2d80.7631!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
            width="100%"
            height="500"
            style={{ border: 0, display: 'block' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

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
