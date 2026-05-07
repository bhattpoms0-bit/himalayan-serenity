import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MobileCTA = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
            background:      'rgba(10,10,10,0.95)',
            backdropFilter:  'blur(20px)',
            borderTop:       '1px solid rgba(255,255,255,0.08)',
            paddingBottom:   'env(safe-area-inset-bottom)',
          }}
        >
          <div className="flex gap-3 px-4 py-3">
            <a
              href="/expeditions"
              className="flex-1 text-center border border-white/20 text-white text-sm font-sans py-3 rounded-full hover:border-white/40 transition-all duration-200"
            >
              Explore
            </a>
            <a
              href="/contact"
              className="flex-1 text-center text-sm font-sans py-3 rounded-full text-white font-medium transition-all duration-200"
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
