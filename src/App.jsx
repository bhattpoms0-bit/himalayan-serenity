import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import Home from './pages/Home'
import About from './pages/About'
import Expeditions from './pages/Expeditions'
import Packages from './pages/Packages'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import WhatsAppButton from './components/WhatsAppButton'
import CinematicExpedition from './pages/CinematicExpedition'
import WildernessExpedition from './pages/WildernessExpedition'
import AdiKailashExpedition from './pages/AdiKailashExpedition'
import PanchachuliExpedition from './pages/PanchachuliExpedition'
import WellnessRetreat from './pages/WellnessRetreat'
import DarmaValleyWomensRetreat from './pages/DarmaValleyWomensRetreat'

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

function AnimatedRoutes() {
  const location = useLocation()
  return (
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
        <Route path="/packages/cinematic-expedition"   element={<PageTransition><CinematicExpedition /></PageTransition>} />
        <Route path="/packages/wilderness-expedition"  element={<PageTransition><WildernessExpedition /></PageTransition>} />
        <Route path="/packages/adi-kailash-expedition"   element={<PageTransition><AdiKailashExpedition /></PageTransition>} />
        <Route path="/packages/panchachuli-expedition"  element={<PageTransition><PanchachuliExpedition /></PageTransition>} />
        <Route path="/packages/wellness-retreat"        element={<PageTransition><WellnessRetreat /></PageTransition>} />
        <Route path="/packages/darma-valley-womens-retreat" element={<PageTransition><DarmaValleyWomensRetreat /></PageTransition>} />
      </Routes>
    </AnimatePresence>
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
