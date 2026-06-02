import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronUp } from 'lucide-react'
import { blogPosts } from '../data/blogPosts'

const PACKAGE_NAMES = {
  'adi-kailash-expedition':            'Adi Kailash Expedition',
  'panchachuli-expedition':            'Panchachuli Trekking Expedition',
  'cinematic-expedition':              'Eastern Kumaon Cinematic Expedition',
  'wilderness-expedition':             'Eastern Kumaon Wilderness Expedition',
  'wellness-retreat':                  'Himalayan Wellness & Meditation Retreat',
  'darma-valley-womens-retreat':       'Women-Only Expedition (Darma Valley)',
  'photography-expedition':            'Himalayan Photography Expedition',
  'winter-himalayan-wellness-retreat': 'Winter Himalayan Wellness Retreat',
}

function crumbLink(label, href) {
  return { label, href }
}

function getBreadcrumbs(pathname) {
  const pkgMatch  = pathname.match(/^\/packages\/(.+)$/)
  const blogMatch = pathname.match(/^\/blog\/(.+)$/)

  if (pkgMatch) {
    const name = PACKAGE_NAMES[pkgMatch[1]] || pkgMatch[1]
    return [crumbLink('Home', '/'), crumbLink('Packages', null), crumbLink(name, null)]
  }
  if (blogMatch) {
    const post  = blogPosts.find(p => p.slug === blogMatch[1])
    const title = post ? post.title : blogMatch[1]
    return [crumbLink('Home', '/'), crumbLink('Blog', '/blog'), crumbLink(title, null)]
  }
  return null
}

const LINK_STYLE  = { fontSize: 11, color: '#666666', letterSpacing: '0.04em', textDecoration: 'none' }
const MUTED_STYLE = { fontSize: 11, color: '#444444', letterSpacing: '0.04em' }

export default function GlobalNav() {
  const { pathname } = useLocation()
  const isHome       = pathname === '/'
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop  = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const breadcrumbs  = getBreadcrumbs(pathname)

  return (
    <>
      {/* ── Back button / breadcrumb — all non-home pages ──────────────── */}
      <AnimatePresence>
        {!isHome && !pathname.startsWith('/retreats/') && (
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed left-5 sm:left-8 z-40"
            style={{ top: 76 }}
          >
            {breadcrumbs ? (
              // ── Breadcrumb for /packages/* and /blog/* ──────────────
              <nav className="flex items-center gap-1" aria-label="Breadcrumb">
                {breadcrumbs.map((crumb, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && (
                      <span style={{ color: '#3a3a3a', fontSize: 10, lineHeight: 1 }}>›</span>
                    )}
                    {crumb.href ? (
                      <Link
                        to={crumb.href}
                        className="font-sans transition-colors duration-200"
                        style={LINK_STYLE}
                        onMouseEnter={e => (e.currentTarget.style.color = '#aaaaaa')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#666666')}
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        className="font-sans max-w-[160px] sm:max-w-[260px] truncate inline-block align-bottom"
                        style={MUTED_STYLE}
                      >
                        {crumb.label}
                      </span>
                    )}
                  </span>
                ))}
              </nav>
            ) : (
              // ── Simple back link for all other pages ─────────────────
              <Link
                to="/"
                className="flex items-center gap-1 font-sans transition-colors duration-200"
                style={LINK_STYLE}
                onMouseEnter={e => (e.currentTarget.style.color = '#aaaaaa')}
                onMouseLeave={e => (e.currentTarget.style.color = '#666666')}
              >
                <ChevronLeft size={12} strokeWidth={1.5} />
                Back to Home
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll-to-top — appears after 400px, all pages ─────────────── */}
      <AnimatePresence>
        {scrollY > 400 && (
          <motion.button
            key="scroll-top"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.1, filter: 'brightness(1.15)' }}
            whileTap={{ scale: 0.93 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#e07b2a', boxShadow: '0 4px 20px rgba(224,123,42,0.35)' }}
            aria-label="Scroll to top"
          >
            <ChevronUp size={16} strokeWidth={2.5} className="text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
