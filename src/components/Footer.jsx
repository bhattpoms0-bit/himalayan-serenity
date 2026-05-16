import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Globe, Mail, Share2, ArrowRight } from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────
const EXPLORATIONS = [
  { label: 'Adi Kailash Expedition',                href: '/packages/adi-kailash-expedition' },
  { label: 'Panchachuli Trekking Expedition',       href: '/packages/panchachuli-expedition' },
  { label: 'Eastern Kumaon Cinematic Expedition',   href: '/packages/cinematic-expedition' },
  { label: 'Eastern Kumaon Wilderness Expedition',  href: '/packages/wilderness-expedition' },
  { label: 'Himalayan Wellness & Meditation Retreat', href: '/packages/wellness-retreat' },
  { label: 'Himalayan Photography Expedition',      href: '/packages/photography-expedition' },
  { label: 'Winter Himalayan Wellness Retreat',     href: '/packages/winter-himalayan-wellness-retreat' },
  { label: 'Women-Only Expedition (Darma Valley)',  href: '/packages/darma-valley-womens-retreat' },
]

const COMPANY = [
  { label: 'Our Story',       href: '/about'   },
  { label: 'Sustainability',  href: '/sustainability' },
  { label: 'Certifications',  href: '/about'   },
  { label: 'Careers',         href: '/contact' },
]

const SOCIAL = [Globe, Mail, Share2]

// ─── Sub-components ───────────────────────────────────────────────────────────
function ColLabel({ children }) {
  return (
    <p
      className="mb-5 uppercase"
      style={{ fontFamily: '"Cinzel", serif', fontSize: 10, letterSpacing: '0.2em', color: '#e07b2a' }}
    >
      {children}
    </p>
  )
}

function FooterLink({ href, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <li>
      <Link
        to={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex items-center gap-1.5 font-sans text-[13px] transition-all duration-200"
        style={{
          color:     hovered ? '#cccccc' : '#666666',
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          display:   'inline-flex',
          textDecoration: 'none',
        }}
      >
        <span
          className="transition-all duration-200"
          style={{ opacity: hovered ? 1 : 0, fontSize: 11 }}
        >
          →
        </span>
        {children}
      </Link>
    </li>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function Footer() {
  const [inputFocused, setInputFocused] = useState(false)

  return (
    <footer style={{ backgroundColor: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.06)' }}>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 lg:py-20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

          {/* ── Brand column ──────────────────────────────────────────────── */}
          <div>
            <h3
              className="italic mb-4 leading-tight text-2xl lg:text-[2.2rem]"
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                color:      '#e07b2a',
                fontWeight: 400,
              }}
            >
              Himalayan<br />Serenity
            </h3>

            {/* Orange divider */}
            <div
              className="mb-5"
              style={{
                width:           40,
                height:          1,
                backgroundColor: '#e07b2a',
                opacity:         0.3,
              }}
            />

            <p
              className="font-sans leading-[1.8]"
              style={{ fontSize: 13, color: '#666666', maxWidth: 220 }}
            >
              Preserving the sanctity of the mountains through sustainable, luxury exploration.
            </p>
          </div>

          {/* ── Explorations column ───────────────────────────────────────── */}
          <div>
            <ColLabel>Explorations</ColLabel>
            <ul className="space-y-3.5">
              {EXPLORATIONS.map(({ label, href }) => (
                <FooterLink key={label} href={href}>{label}</FooterLink>
              ))}
            </ul>
          </div>

          {/* ── Company column ────────────────────────────────────────────── */}
          <div>
            <ColLabel>Company</ColLabel>
            <ul className="space-y-3.5">
              {COMPANY.map(({ label, href }) => (
                <FooterLink key={label} href={href}>{label}</FooterLink>
              ))}
            </ul>
          </div>

          {/* ── Newsletter + social column ────────────────────────────────── */}
          <div>
            <ColLabel>Connect</ColLabel>

            <p className="font-sans mb-4 leading-[1.75]" style={{ fontSize: 13, color: '#666666' }}>
              Join our monthly journal for spiritual insights and expedition updates.
            </p>

            {/* Email input row */}
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Your email"
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                className="flex-1 font-sans text-sm rounded-xl px-4 py-2.5 text-white/80 placeholder-white/20 outline-none transition-all duration-200"
                style={{
                  backgroundColor: '#111111',
                  border:          inputFocused
                    ? '1px solid rgba(224,123,42,0.4)'
                    : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: inputFocused
                    ? '0 0 0 3px rgba(224,123,42,0.1)'
                    : 'none',
                }}
              />
              <motion.button
                whileHover={{ filter: 'brightness(1.1)' }}
                whileTap={{ scale: 0.96 }}
                className="flex-shrink-0 flex items-center justify-center rounded-xl px-4 py-2.5"
                style={{ backgroundColor: '#e07b2a' }}
              >
                <ArrowRight size={15} strokeWidth={2} className="text-white" />
              </motion.button>
            </div>

            {/* Contact info */}
            <div className="space-y-1.5 mb-6 font-sans" style={{ fontSize: 12, color: '#555555' }}>
              <p>info@himalayanserenitytravel.com</p>
              <p>+977-1-444-0000</p>
              <p>Pithoragarh, Uttarakhand 262529</p>
            </div>

            {/* Social icons */}
            <div className="flex gap-2.5">
              {SOCIAL.map((Icon, i) => (
                <motion.button
                  key={i}
                  whileHover={{
                    y: -2,
                    borderColor: 'rgba(255,255,255,0.2)',
                  }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center rounded-lg transition-colors duration-200"
                  style={{
                    width:           36,
                    height:          36,
                    border:          '1px solid rgba(255,255,255,0.08)',
                    color:           '#555555',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#aaaaaa')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#555555')}
                >
                  <Icon size={13} strokeWidth={1.5} />
                </motion.button>
              ))}
            </div>
          </div>

        </div>
      </motion.div>

      {/* ── Bottom bar ────────────────────────────────────────────────────── */}
      <div
        className="py-6"
        style={{
          backgroundColor: '#090909',
          borderTop:       '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans" style={{ fontSize: 12, color: '#444444' }}>
            © 2024 Himalayan Serenity. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            {[{ label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms of Service', href: '/terms' }].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-sans transition-colors duration-200"
                style={{ fontSize: 12, color: '#555555' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#aaaaaa')}
                onMouseLeave={e => (e.currentTarget.style.color = '#555555')}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}
