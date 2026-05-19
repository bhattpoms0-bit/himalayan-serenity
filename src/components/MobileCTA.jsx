import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const MobileCTA = () => {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide on contact page — user is already in the funnel
  if (pathname === '/contact') return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
          style={{
            background:     'rgba(10,10,10,0.97)',
            backdropFilter: 'blur(20px)',
            borderTop:      '1px solid rgba(255,255,255,0.08)',
            paddingBottom:  'env(safe-area-inset-bottom)',
          }}
        >
          <div className="flex items-center gap-3 px-4 py-3">
            <p
              className="flex-1 font-sans text-xs leading-snug"
              style={{ color: '#888888' }}
            >
              Ready to begin your journey?
            </p>
            <a
              href="/contact"
              className="flex-shrink-0 text-white text-sm font-sans font-semibold px-5 py-3 rounded-full"
              style={{
                background: '#e07b2a',
                boxShadow:  '0 0 20px rgba(224,123,42,0.3)',
              }}
            >
              Book Now
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileCTA
