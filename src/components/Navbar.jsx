import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, ChevronDown } from 'lucide-react'

const EXPERIENCES = [
  { label: 'Adi Kailash & Om Parvat',   href: '/packages/adi-kailash-expedition'     },
  { label: 'Panchachuli Trek',           href: '/packages/panchachuli-expedition'      },
  { label: 'Munsiyari & Wilderness',     href: '/packages/wilderness-expedition'       },
  { label: "Darma Valley Women's Trek",  href: '/packages/darma-valley-womens-retreat' },
  { label: 'Eastern Kumaon Cinematic',   href: '/packages/cinematic-expedition'        },
  { label: 'Himalayan Wellness Retreat', href: '/packages/wellness-retreat'            },
  { label: 'Photography Expedition',     href: '/packages/photography-expedition'      },
]

const NAV_LINKS = [
  { label: 'About',   href: '/about'   },
  { label: 'Blog',    href: '/blog'    },
  { label: 'Contact', href: '/contact' },
]

// ─── Entrance easing ──────────────────────────────────────────────────────────
const EASE_OUT_EXPO = [0.25, 0.46, 0.45, 0.94]

export default function Navbar({ activePage = 'home' }) {
  const [scrollY, setScrollY]           = useState(0)
  const [menuOpen, setMenuOpen]         = useState(false)
  const [expOpen, setExpOpen]           = useState(false)
  const [mobileExpOpen, setMobileExpOpen] = useState(false)
  const closeTimer                      = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isIntlPage = activePage === 'international-retreats'
  const ctaLabel   = isIntlPage ? 'Enquire Now' : 'Book Now'
  const ctaHref    = isIntlPage ? '#enquiry' : '/contact'
  const ctaBg      = isIntlPage ? '#1D9E75' : '#e07b2a'
  const ctaGlow    = isIntlPage
    ? '0 0 20px rgba(29,158,117,0.4)'
    : '0 0 20px rgba(224,123,42,0.4)'

  // 3-state background driven by scroll depth
  const navBg =
    scrollY > 100 ? 'rgba(8,8,8,0.95)'
    : scrollY > 50 ? 'rgba(10,10,10,0.85)'
    : 'rgba(0,0,0,0)'

  const showBlur   = scrollY > 50
  const showBorder = scrollY > 50

  // Delay-close keeps dropdown alive while mouse travels to panel
  const handleExpEnter = () => {
    clearTimeout(closeTimer.current)
    setExpOpen(true)
  }
  const handleExpLeave = () => {
    closeTimer.current = setTimeout(() => setExpOpen(false), 120)
  }

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
          <Link
            to="/"
            className="uppercase text-white hover:opacity-75 transition-opacity duration-300 text-xs sm:text-sm"
            style={{ fontFamily: '"Cinzel", serif', letterSpacing: '0.18em', textDecoration: 'none' }}
          >
            Himalayan Serenity
          </Link>

          {/* ── Desktop nav links ─────────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-8">

            {/* Experiences dropdown */}
            <div
              className="relative"
              onMouseEnter={handleExpEnter}
              onMouseLeave={handleExpLeave}
            >
              <button className="flex items-center gap-1 font-sans text-[13px] text-[#aaaaaa] hover:text-white transition-colors duration-200 cursor-pointer">
                Experiences
                <ChevronDown
                  size={12}
                  strokeWidth={1.5}
                  className={`transition-transform duration-200 ${expOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {expOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-xl py-2 z-50 border border-white/[0.08] shadow-2xl"
                    style={{ background: 'rgba(10,10,10,0.97)' }}
                  >
                    {EXPERIENCES.map(exp => (
                      <Link
                        key={exp.href}
                        to={exp.href}
                        onClick={() => setExpOpen(false)}
                        className="block px-4 py-2.5 font-sans text-[12.5px] text-[#999999] hover:text-white hover:bg-white/[0.05] transition-colors duration-150"
                        style={{ textDecoration: 'none' }}
                      >
                        {exp.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* International Retreats */}
            <Link
              to="/international-retreats"
              className="font-sans text-[13px] text-[#1D9E75] hover:opacity-75 transition-opacity duration-200 cursor-pointer"
              style={{ textDecoration: 'none' }}
            >
              International Retreats
            </Link>

            {/* Regular links */}
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

            {/* Book / Enquire Now */}
            <motion.a
              href={ctaHref}
              whileHover={{
                scale: 1.03,
                filter: 'brightness(1.1)',
                boxShadow: ctaGlow,
              }}
              whileTap={{ scale: 0.97 }}
              className="text-white rounded-full px-5 py-2.5 cursor-pointer inline-block transition-colors duration-300"
              style={{
                fontFamily:      '"Cinzel", serif',
                fontSize:        11,
                letterSpacing:   '0.15em',
                textTransform:   'uppercase',
                backgroundColor: ctaBg,
              }}
            >
              {ctaLabel}
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

              {/* Experiences accordion */}
              <div className="border-b border-white/[0.06]">
                <button
                  onClick={() => setMobileExpOpen(v => !v)}
                  className="w-full flex items-center justify-between py-4 font-sans text-base transition-colors duration-200 cursor-pointer"
                  style={{ color: '#777777' }}
                >
                  Experiences
                  <ChevronDown
                    size={14}
                    strokeWidth={1.5}
                    className={`transition-transform duration-200 ${mobileExpOpen ? 'rotate-180' : ''}`}
                    style={{ color: '#555555' }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {mobileExpOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      {EXPERIENCES.map(exp => (
                        <Link
                          key={exp.href}
                          to={exp.href}
                          onClick={() => { setMenuOpen(false); setMobileExpOpen(false) }}
                          className="flex items-center py-3 pl-4 border-b border-white/[0.04] font-sans text-sm transition-colors duration-150"
                          style={{ color: '#555555', textDecoration: 'none' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#555555')}
                        >
                          {exp.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* International Retreats */}
              <a
                href="/international-retreats"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-4 border-b border-white/[0.06] font-sans text-base transition-colors duration-200 cursor-pointer"
                style={{ color: '#1D9E75', textDecoration: 'none' }}
              >
                International Retreats
              </a>

              {/* Regular links */}
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

              {/* Book / Enquire Now — full width */}
              <motion.a
                href={ctaHref}
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
                  backgroundColor: ctaBg,
                }}
              >
                {ctaLabel}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
