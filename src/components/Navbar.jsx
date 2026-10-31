import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Wellness Retreats', href: '/international-retreats' },
  { label: 'Sacred Journeys', href: '/experiences' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuButton = useRef(null)
  const navigation = useRef(null)

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const closeOutside = event => {
      if (!navigation.current?.contains(event.target)) setMenuOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const onKeyDown = event => {
    if (event.key === 'Escape' && menuOpen) {
      setMenuOpen(false)
      menuButton.current?.focus()
    }
  }

  return (
    <nav ref={navigation} aria-label="Main navigation" onKeyDown={onKeyDown} className={`fixed top-0 inset-x-0 z-50 border-b border-white/10 backdrop-blur-xl transition-colors ${scrolled || menuOpen ? 'bg-[#090d12]/95' : 'bg-[#090d12]/75'}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between gap-5 min-h-[72px]">
          <Link to="/" onClick={closeMenu} className="min-h-11 inline-flex items-center font-display uppercase text-brand-cream text-xs sm:text-sm tracking-[0.14em] shrink-0">Himalayan Serenity</Link>
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {NAV_LINKS.map(link => <NavLink key={link.href} to={link.href} className={({ isActive }) => `min-h-11 inline-flex items-center text-[13px] font-sans whitespace-nowrap hover:text-brand-gold ${isActive ? 'text-brand-gold underline underline-offset-4' : 'text-brand-cream-muted'}`}>{link.label}</NavLink>)}
          </div>
          <Link to="/contact" className="hidden lg:inline-flex items-center justify-center min-h-11 rounded-full bg-brand-gold hover:bg-brand-gold-light text-brand-dark px-5 py-3 text-xs font-semibold whitespace-nowrap">Plan Your Journey</Link>
          <button ref={menuButton} type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(open => !open)} className="lg:hidden min-w-11 min-h-11 inline-flex items-center justify-center text-brand-cream">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && <div id="mobile-navigation" className="lg:hidden max-h-[calc(100dvh-160px)] overflow-y-auto overscroll-contain bg-[#090d12] border-t border-white/10 px-6 pb-6">
        {NAV_LINKS.map(link => <NavLink key={link.href} to={link.href} onClick={closeMenu} className={({ isActive }) => `min-h-12 flex items-center py-3 border-b border-white/10 text-base ${isActive ? 'text-brand-gold' : 'text-brand-cream-muted'}`}>{link.label}</NavLink>)}
        <Link to="/contact" onClick={closeMenu} className="min-h-12 flex items-center justify-center rounded-lg bg-brand-gold text-brand-dark text-sm font-semibold mt-5">Plan Your Journey</Link>
      </div>}
    </nav>
  )
}
