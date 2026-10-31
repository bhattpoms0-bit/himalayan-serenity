import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import WhatsAppButton from './WhatsAppButton'
import { PANCHACHULI_WELLNESS, WOMENS_SACRED_HIMALAYA } from '../data/retreats'

const MobileCTA = () => {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(false)
  const isReviewedRetreat = [PANCHACHULI_WELLNESS.href, WOMENS_SACRED_HIMALAYA.href].includes(pathname)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide on contact page — user is already in the funnel
  if (pathname === '/contact') return null

  // Dedicated slots keep WhatsApp clear of the retreat enquiry action on small screens.
  if (isReviewedRetreat) return (
    <div data-mobile-actions className="fixed bottom-0 left-0 right-0 z-40 lg:hidden border-t border-white/10 bg-[#0a100d]" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <div className="flex items-center gap-4 px-5 py-3">
        <WhatsAppButton inline />
        <a href="#enquiry" className={`flex-1 min-w-0 min-h-11 flex items-center justify-center rounded-full px-4 py-3 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${pathname === WOMENS_SACRED_HIMALAYA.href ? 'bg-rose-700' : 'bg-[#1D9E75]'}`}>
          Enquire About This Retreat
        </a>
      </div>
    </div>
  )

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-mobile-actions
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
              className="flex-shrink-0 text-brand-dark text-sm font-sans font-semibold px-5 py-3 rounded-full"
              style={{
                background: '#e07b2a',
                boxShadow:  '0 0 20px rgba(224,123,42,0.3)',
              }}
            >
              Plan Your Journey
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileCTA
