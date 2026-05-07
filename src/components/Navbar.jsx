import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Packages',    href: '/packages'    },
  { label: 'Expeditions', href: '/expeditions' },
  { label: 'Blog',        href: '/blog'        },
  { label: 'About',       href: '/about'       },
  { label: 'FAQ',         href: '/faq'         },
  { label: 'Contact',     href: '/contact'     },
]

// ─── Entrance easing ──────────────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.25, 0.46, 0.45, 0.94]

export default function Navbar({ activePage = 'home' }) {
  const [scrollY, setScrollY]     = useState(0)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 3-state background driven by scroll depth
  const navBg =
    scrollY > 100 ? 'rgba(8,8,8,0.95)'
    : scrollY > 50 ? 'rgba(10,10,10,0.85)'
    : 'rgba(0,0,0,0)'

  const showBlur   = scrollY > 50
  const showBorder = scrollY > 50

  return (
    <motion.nav
      // ── Entrance: slides down from above once on mount ─────────────────────
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, backgroundColor: navBg }}
      transition={{
        opacity:         { duration: 0.6, ease: EASE_OUT_EXPO },
        y:               { duration: 0.6, ease: EASE_OUT_EXPO },
        backgroundColor: { duration: 0.5, ease: 'easeOut'     },
      }}
      className={`fixed top-0 left-0 right-0 z-50 ${showBlur ? 'backdrop-blur-xl' : ''}`}
      style={{
        borderBottom: showBorder ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        transition: 'border-color 500ms ease, backdrop-filter 500ms ease',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-[68px]">

          {/* ── Logo ──────────────────────────────────────────────────────── */}
          <a
            href="/"
            className="uppercase text-white hover:opacity-75 transition-opacity duration-300 text-xs sm:text-sm"
            style={{ fontFamily: '"Cinzel", serif', letterSpacing: '0.18em' }}
          >
            Himalayan Serenity
          </a>

          {/* ── Desktop nav links ─────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activePage === link.label.toLowerCase()
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className={`font-sans text-[13px] transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white underline underline-offset-4 decoration-brand-orange decoration-[1.5px]'
                      : 'hover:text-white'
                  }`}
                  style={{ color: isActive ? '#ffffff' : '#aaaaaa' }}
                >
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* ── Right controls ────────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-4">

            {/* Globe */}
            <button
              className="p-1.5 transition-colors duration-200"
              style={{ color: '#666666' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#aaaaaa')}
              onMouseLeave={e => (e.currentTarget.style.color = '#666666')}
            >
              <Globe size={15} strokeWidth={1.5} />
            </button>

            {/* Book Now */}
            <motion.a
              href="/contact"
              whileHover={{
                scale: 1.03,
                filter: 'brightness(1.1)',
                boxShadow: '0 0 20px rgba(224,123,42,0.4)',
              }}
              whileTap={{ scale: 0.97 }}
              className="text-white rounded-full px-5 py-2.5 cursor-pointer inline-block"
              style={{
                fontFamily:      '"Cinzel", serif',
                fontSize:        11,
                letterSpacing:   '0.15em',
                textTransform:   'uppercase',
                backgroundColor: '#e07b2a',
              }}
            >
              Book Now
            </motion.a>
          </div>

          {/* ── Mobile hamburger — 3 hand-drawn lines ─────────────────────── */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="md:hidden p-3 -mr-3 flex flex-col justify-center items-center gap-[5px]"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }}
              transition={{ duration: 0.25 }}
              className="block bg-white rounded-full"
              style={{ width: 18, height: 1.5 }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="block bg-white rounded-full"
              style={{ width: 18, height: 1.5 }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }}
              transition={{ duration: 0.25 }}
              className="block bg-white rounded-full"
              style={{ width: 18, height: 1.5 }}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile menu — AnimatePresence slide ───────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
            style={{ background: 'rgba(8,8,8,0.98)', backdropFilter: 'blur(24px)' }}
          >
            <div className="px-5 pt-2 pb-6 border-t border-white/[0.06]">

              {/* Staggered nav links */}
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.22, delay: i * 0.05, ease: 'easeOut' }}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-white/[0.06] font-sans text-base transition-colors duration-200 cursor-pointer"
                  style={{ color: activePage === link.label.toLowerCase() ? '#ffffff' : '#777777' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={e => (e.currentTarget.style.color =
                    activePage === link.label.toLowerCase() ? '#ffffff' : '#777777')}
                >
                  {link.label}
                  {activePage === link.label.toLowerCase() && (
                    <span className="w-1 h-1 rounded-full bg-brand-orange" />
                  )}
                </motion.a>
              ))}

              {/* Book Now — full width */}
              <motion.a
                href="/contact"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.22, delay: NAV_LINKS.length * 0.05, ease: 'easeOut' }}
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center text-white rounded-xl py-3.5 mt-6 cursor-pointer"
                style={{
                  fontFamily:      '"Cinzel", serif',
                  fontSize:        11,
                  letterSpacing:   '0.15em',
                  textTransform:   'uppercase',
                  backgroundColor: '#e07b2a',
                }}
              >
                Book Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
