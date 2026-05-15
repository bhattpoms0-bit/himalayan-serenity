import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import WhatsAppButton from './components/WhatsAppButton'

// Lazy-load every page so only the current route's JS chunk is downloaded
const Home                           = lazy(() => import('./pages/Home'))
const About                          = lazy(() => import('./pages/About'))
const Expeditions                    = lazy(() => import('./pages/Expeditions'))
const Packages                       = lazy(() => import('./pages/Packages'))
const FAQ                            = lazy(() => import('./pages/FAQ'))
const Contact                        = lazy(() => import('./pages/Contact'))
const Blog                           = lazy(() => import('./pages/Blog'))
const BlogPost                       = lazy(() => import('./pages/BlogPost'))
const CinematicExpedition            = lazy(() => import('./pages/CinematicExpedition'))
const WildernessExpedition           = lazy(() => import('./pages/WildernessExpedition'))
const AdiKailashExpedition           = lazy(() => import('./pages/AdiKailashExpedition'))
const PanchachuliExpedition          = lazy(() => import('./pages/PanchachuliExpedition'))
const WellnessRetreat                = lazy(() => import('./pages/WellnessRetreat'))
const DarmaValleyWomensRetreat       = lazy(() => import('./pages/DarmaValleyWomensRetreat'))
const PhotographyExpedition          = lazy(() => import('./pages/PhotographyExpedition'))
const WinterHimalayanWellnessRetreat = lazy(() => import('./pages/WinterHimalayanWellnessRetreat'))

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}

// Minimal dark screen shown while a lazy chunk downloads
function PageLoader() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#090909',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          fontFamily: '"Cinzel", serif',
          fontSize: 11,
          letterSpacing: '0.3em',
          color: '#e07b2a',
          textTransform: 'uppercase',
        }}
      >
        Loading
      </motion.div>
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"           element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about"      element={<PageTransition><About /></PageTransition>} />
          <Route path="/expeditions" element={<PageTransition><Expeditions /></PageTransition>} />
          <Route path="/packages"   element={<PageTransition><Packages /></PageTransition>} />
          <Route path="/faq"        element={<PageTransition><FAQ /></PageTransition>} />
          <Route path="/contact"    element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/blog"          element={<PageTransition><Blog /></PageTransition>} />
          <Route path="/blog/:slug"    element={<PageTransition><BlogPost /></PageTransition>} />
          <Route path="/packages/cinematic-expedition"              element={<PageTransition><CinematicExpedition /></PageTransition>} />
          <Route path="/packages/wilderness-expedition"             element={<PageTransition><WildernessExpedition /></PageTransition>} />
          <Route path="/packages/adi-kailash-expedition"           element={<PageTransition><AdiKailashExpedition /></PageTransition>} />
          <Route path="/packages/panchachuli-expedition"           element={<PageTransition><PanchachuliExpedition /></PageTransition>} />
          <Route path="/packages/wellness-retreat"                 element={<PageTransition><WellnessRetreat /></PageTransition>} />
          <Route path="/packages/darma-valley-womens-retreat"      element={<PageTransition><DarmaValleyWomensRetreat /></PageTransition>} />
          <Route path="/packages/photography-expedition"           element={<PageTransition><PhotographyExpedition /></PageTransition>} />
          <Route path="/packages/winter-himalayan-wellness-retreat" element={<PageTransition><WinterHimalayanWellnessRetreat /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  )
}

export default function App() {
  const { scrollYProgress } = useScroll()

  return (
    <BrowserRouter>
      {/* Scroll progress bar */}
      <motion.div
        style={{
          scaleX:          scrollYProgress,
          position:        'fixed',
          top:             0,
          left:            0,
          right:           0,
          height:          '2px',
          background:      '#e07b2a',
          transformOrigin: '0%',
          zIndex:          9999,
        }}
      />

      <AnimatedRoutes />

      {/* Persistent across all pages */}
      <WhatsAppButton />
    </BrowserRouter>
  )
}
