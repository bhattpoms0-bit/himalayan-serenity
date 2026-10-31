import { useState } from 'react'
import { openPrivacySettings } from '../utils/consent'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

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

const COMPANY_LINKS = [
  { label: 'Sustainability', href: '/sustainability' },
  { label: 'FAQ',            href: '/faq'            },
]

const INTERNATIONAL_RETREATS = [
  { label: 'Panchachuli Himalayan Wellness Retreat', href: '/retreats/panchachuli-wellness'  },
  { label: "Women's Sacred Himalaya Retreat",        href: '/retreats/womens-retreat'         },
  { label: 'The Borderlands of the Himalaya',        href: '/retreats/borderlands-himalaya'   },
  { label: 'Darma Valley Digital Detox',             href: '/retreats/darma-detox'            },
]


// ─── Sub-components ───────────────────────────────────────────────────────────
function ColLabel({ children }) {
  return (
    <p
      className="mb-5 uppercase"
      style={{ fontFamily: '"Cinzel", serif', fontSize: 10, letterSpacing: '0.2em', color: '#C8A44B' }}
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
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="min-h-11 items-center gap-1.5 font-sans text-[13px] transition-all duration-200 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
        style={{
          color:     hovered ? '#F0E8D8' : '#C8BFAE',
          transform: hovered ? 'translateX(4px)' : 'translateX(0)',
          display:   'inline-flex',
          textDecoration: 'none',
        }}
      >
        <span
          aria-hidden="true" className="transition-all duration-200"
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

  return (
    <footer style={{ backgroundColor: '#0b121a', borderTop: '1px solid rgba(255,255,255,0.06)' }}>

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 lg:py-20"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* ── Brand column ──────────────────────────────────────────────── */}
          <div>
            <Link
              to="/"
              className="inline-block rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
              style={{ textDecoration: 'none' }}
            >
              <h3
                className="italic mb-4 leading-tight text-2xl lg:text-[2.2rem] hover:opacity-80 transition-opacity duration-300"
                style={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  color:      '#C8A44B',
                  fontWeight: 400,
                }}
              >
                Himalayan<br />Serenity
              </h3>
            </Link>

            <p
              className="font-sans"
              style={{ fontSize: 10, letterSpacing: '0.16em', color: '#C8BFAE', textTransform: 'uppercase', marginBottom: 18, marginTop: -8 }}
            >
              A brand of Life &amp; Leisure
            </p>

            {/* Orange divider */}
            <div
              className="mb-5"
              style={{
                width:           40,
                height:          1,
                backgroundColor: '#C8A44B',
                opacity:         0.3,
              }}
            />

            <p
              className="font-sans leading-[1.8]"
              style={{ fontSize: 13, color: '#C8BFAE', maxWidth: 220 }}
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

            <div className="mt-8">
              <ColLabel>Company</ColLabel>
              <ul className="space-y-3.5">
                {COMPANY_LINKS.map(({ label, href }) => (
                  <FooterLink key={label} href={href}>{label}</FooterLink>
                ))}
              </ul>
            </div>
          </div>

          {/* ── International Retreats column ─────────────────────────────── */}
          <div>
            <ColLabel>International Retreats</ColLabel>
            <ul className="space-y-3.5">
              {INTERNATIONAL_RETREATS.map(({ label, href }) => (
                <FooterLink key={label} href={href}>{label}</FooterLink>
              ))}
            </ul>
          </div>

          {/* ── Newsletter + social column ────────────────────────────────── */}
          <div>
            <ColLabel>Connect</ColLabel>

            {/* Newsletter hidden: subscription backend is not implemented. */}

            {/* Contact info */}
            <div className="space-y-2 mb-6 font-sans" style={{ fontSize: 13, color: '#C8BFAE' }}>
              <p><a href="mailto:info@himalayanserenitytravel.com" className="inline-flex min-h-11 items-center break-all hover:text-brand-cream rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold">info@himalayanserenitytravel.com</a></p>
              <p><a href="tel:+919084642557" className="inline-flex min-h-11 items-center hover:text-brand-cream rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold">+91 90846 42557</a></p>
              <p className="pt-3 text-brand-cream-muted">Pithoragarh Contact Office</p>
              <address className="not-italic leading-relaxed">Plaza Hotel, Hydel Tiraha,<br />Tanakpur Road, Aincholi,<br />Pithoragarh, Uttarakhand – 262501,<br />India.</address>
              <p className="pt-3 text-brand-cream-muted">Registered Operating Company</p>
              <p>LIFE &amp; LEISURE INDIA PRIVATE LIMITED</p>
              <p className="pt-3 text-brand-cream-muted">Delhi Registered Office</p>
              <address className="not-italic leading-relaxed">107–108, 1st Floor,<br />Roots Tower,<br />District Centre, Laxmi Nagar,<br />Delhi – 110092,<br />India.</address>
              <p><a href="https://lifeandleisure.travel/" className="inline-flex min-h-11 items-center hover:text-brand-cream rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold">Company website</a></p>
            </div>


          </div>

        </div>
      </motion.div>

      {/* ── Bottom bar ────────────────────────────────────────────────────── */}
      <div
        className="py-6"
        style={{
          backgroundColor: '#090d12',
          borderTop:       '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans" style={{ fontSize: 12, color: '#C8BFAE' }}>
            © 2024 Himalayan Serenity. All Rights Reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <button type="button" onClick={openPrivacySettings} className="min-h-11 font-sans text-xs underline underline-offset-4 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold" style={{ color: '#C8BFAE' }}>Privacy Settings</button>
            {[{ label: 'Privacy Policy', href: '/privacy' }, { label: 'Terms & Conditions', href: '/terms' }].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="inline-flex min-h-11 items-center font-sans underline underline-offset-4 transition-colors duration-200 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
                style={{ fontSize: 12, color: '#C8BFAE' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F0E8D8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#C8BFAE')}
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
