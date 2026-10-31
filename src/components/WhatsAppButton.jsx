import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { PANCHACHULI_WELLNESS, WOMENS_SACRED_HIMALAYA } from '../data/retreats'
import { chooseFloatingPosition } from '../utils/floatingPlacement'

const WA_MSG = encodeURIComponent(
  "Hello! I found your website and I am interested in your Himalayan travel packages. Please share more details."
)

export default function WhatsAppButton({ inline = false }) {
  const { pathname } = useLocation()
  const buttonRef = useRef(null)
  const [obscuresContent, setObscuresContent] = useState(false)
  const [homePlacement, setHomePlacement] = useState(null)
  const isHome = pathname === '/'
  const isContact = pathname === '/contact'
  const [mobileViewport, setMobileViewport] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const isMobileExperiences = pathname === '/experiences' && mobileViewport
  const usesMeasuredPlacement = isHome || isContact || isMobileExperiences
  const currentPlacement = homePlacement?.pathname === pathname ? homePlacement : null
  const isReviewedRetreat = [PANCHACHULI_WELLNESS.href, WOMENS_SACRED_HIMALAYA.href].includes(pathname)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const update = () => setMobileViewport(query.matches)
    query.addEventListener('change', update)
    update()
    return () => query.removeEventListener('change', update)
  }, [])

  // Do not reuse coordinates from a previous visit or a different viewport.
  useLayoutEffect(() => {
    if (isMobileExperiences) setHomePlacement(null)
  }, [pathname, isMobileExperiences])

  useEffect(() => {
    if (inline || !isReviewedRetreat) return
    let frame = 0
    const checkOverlap = () => {
      const button = buttonRef.current
      const page = document.querySelector('[data-retreat-detail]')
      if (!button || !page) return
      const rect = button.getBoundingClientRect()
      const overlaps = [...page.querySelectorAll('p, h1, h2, h3, li, a, button, form, input, select, textarea')].some(element => {
        const bounds = element.getBoundingClientRect()
        return bounds.width > 0 && bounds.height > 0 &&
          bounds.left < rect.right + 8 && bounds.right > rect.left - 8 &&
          bounds.top < rect.bottom + 8 && bounds.bottom > rect.top - 8
      })
      setObscuresContent(overlaps)
    }
    const scheduleCheck = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(checkOverlap)
    }
    window.addEventListener('scroll', scheduleCheck, { passive: true })
    window.addEventListener('resize', scheduleCheck)
    const observer = new ResizeObserver(scheduleCheck)
    observer.observe(document.body)
    scheduleCheck()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleCheck)
      window.removeEventListener('resize', scheduleCheck)
      observer.disconnect()
    }
  }, [inline, isReviewedRetreat, pathname])

  useEffect(() => {
    if (inline || !usesMeasuredPlacement) return
    let frame = 0
    let active = true
    let targetsDirty = true
    let elements = []
    const observed = new Set()
    const selector = isMobileExperiences
      ? 'main h1, main h2, main h3, main p, main li, a:not(.wa-float), button, form, input, select, textarea, footer, [data-floating-avoid], [data-mobile-actions], [data-scroll-top], [aria-label="Main navigation"], #mobile-navigation'
      : 'main .btn-primary, main .btn-secondary, [data-floating-avoid], [data-mobile-actions], [data-scroll-top], [aria-label="Main navigation"], #mobile-navigation'
    const measure = () => {
      if (!active || !buttonRef.current) return
      const button = buttonRef.current
      // Discover targets only when DOM membership changes; geometry stays live on scroll.
      if (targetsDirty) {
        elements = [...document.querySelectorAll(selector)]
        const current = new Set(elements)
        for (const element of observed) {
          if (!current.has(element)) { resize.unobserve(element); observed.delete(element) }
        }
        for (const element of elements) {
          if (!observed.has(element)) { resize.observe(element); observed.add(element) }
        }
        targetsDirty = false
      }
      const obstacles = elements.map(element => {
        const bounds = element.getBoundingClientRect()
        // Reserve the sticky bar's final position even while its entrance animates.
        if (element.hasAttribute('data-mobile-actions') && element.offsetHeight > 0) {
          const bottom = window.innerHeight - (parseFloat(window.getComputedStyle(element).bottom) || 0)
          return { left: 0, right: document.documentElement.clientWidth, top: bottom - element.offsetHeight, bottom, width: document.documentElement.clientWidth, height: element.offsetHeight }
        }
        if (element.hasAttribute('data-scroll-top') && element.offsetWidth > 0) {
          const style = window.getComputedStyle(element)
          const right = document.documentElement.clientWidth - parseFloat(style.right)
          const bottom = window.innerHeight - parseFloat(style.bottom)
          return { left: right - element.offsetWidth, right, top: bottom - element.offsetHeight, bottom, width: element.offsetWidth, height: element.offsetHeight }
        }
        return bounds
      })
      const next = chooseFloatingPosition({
        viewportWidth: document.documentElement.clientWidth,
        viewportHeight: window.innerHeight,
        width: button.offsetWidth, height: button.offsetHeight, obstacles,
      })
      setHomePlacement(previous => previous?.pathname === pathname && previous?.left === next?.left && previous?.top === next?.top ? previous : next ? { ...next, pathname } : null)
    }
    const schedule = () => {
      if (!active || frame) return
      frame = requestAnimationFrame(() => { frame = 0; measure() })
    }
    const resize = new ResizeObserver(schedule)
    resize.observe(document.body)
    const mutations = new MutationObserver(() => { targetsDirty = true; schedule() })
    mutations.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    document.fonts?.ready.then(() => { if (active) schedule() })
    schedule()
    return () => {
      active = false
      cancelAnimationFrame(frame)
      resize.disconnect()
      mutations.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [inline, usesMeasuredPlacement, isMobileExperiences, pathname])

  if (inline) return (
    <a
      href={`https://wa.me/919084642557?text=${WA_MSG}`}
      target="_blank" rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#6bc69a]/40 text-[#9edaba] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <MessageCircle size={20} strokeWidth={2} />
    </a>
  )

  return (
    <>
      <style>{`
        .wa-float {
          position:       fixed;
          bottom:         32px;
          left:           24px;
          right:          auto;
          z-index:        40;
          display:        flex;
          align-items:    center;
          gap:            8px;
          background:     #26734d;
          color:          #ffffff;
          text-decoration: none;
          border-radius:  50px;
          min-height:     44px;
          padding:        10px 14px;
          font-size:      13px;
          font-weight:    600;
          font-family:    sans-serif;
          box-shadow:     0 2px 10px rgba(0,0,0,0.18);
          transition:     transform 0.2s ease, background 0.2s ease;
          user-select:    none;
        }
        .wa-float:hover  { background: #205f40; }
        .wa-float:active { transform: scale(0.96); }
        .wa-float:focus-visible { outline: 2px solid white; outline-offset: 4px; }
        .wa-label { display: inline; white-space: nowrap; }
        .wa-float.wa-home, .wa-float.wa-contact, .wa-float.wa-experiences-mobile { width: 48px; height: 48px; min-height: 48px; padding: 0; justify-content: center; border-radius: 50%; }
        .wa-home .wa-label, .wa-contact .wa-label, .wa-experiences-mobile .wa-label { display: none; }

        @media (max-width: 1023px) {
          .wa-float.wa-retreat { display: none; }
        }

        @media (max-width: 767px) {
          .wa-float {
            bottom:        90px;
            left:          16px;
            right:         auto;
            padding:       14px;
            border-radius: 50%;
          }
          .wa-label { display: none; }
        }
      `}</style>

      <motion.a
        ref={buttonRef}
        href={`https://wa.me/919084642557?text=${WA_MSG}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`wa-float ${isReviewedRetreat ? 'wa-retreat' : ''} ${isHome ? 'wa-home' : ''} ${isContact ? 'wa-contact' : ''} ${isMobileExperiences ? 'wa-experiences-mobile' : ''}`}
        aria-label="Chat on WhatsApp"
        aria-hidden={isReviewedRetreat && obscuresContent ? true : undefined}
        tabIndex={isReviewedRetreat && obscuresContent ? -1 : undefined}
        style={{
          pointerEvents: isReviewedRetreat && obscuresContent ? 'none' : 'auto',
          ...(usesMeasuredPlacement ? currentPlacement ? { left: currentPlacement.left, top: currentPlacement.top, right: 'auto', bottom: 'auto' } : { position: 'relative', left: 'auto', right: 'auto', bottom: 'auto', margin: '16px 24px' } : {}),
        }}
        initial={usesMeasuredPlacement ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: isReviewedRetreat && obscuresContent ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={20} strokeWidth={2} />
        <span className="wa-label">Chat on WhatsApp</span>
      </motion.a>
    </>
  )
}
