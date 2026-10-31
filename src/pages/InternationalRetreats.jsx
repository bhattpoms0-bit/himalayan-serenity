import EnquiryPrivacy from '../components/EnquiryPrivacy'
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BrandPromise from '../components/BrandPromise'
import { RetreatPrice } from '../components/RetreatDetails'
import { PANCHACHULI_WELLNESS, WOMENS_SACRED_HIMALAYA, retreatCardMeta } from '../data/retreats'
import './international-retreats-hero.css'

const WEB3FORMS_ACCESS_KEY = 'a4bcce53-4a1d-4217-93b6-30b9d714bbdd'

const INPUT_CLASS =
  'bg-white/5 border border-[#1D9E75]/20 rounded-lg px-4 py-3 text-[#f0ece4] text-sm w-full focus:outline-none focus:border-[#1D9E75]/60 placeholder:text-white/20'

const WHY_CARDS = [
  {
    title: 'Genuinely remote',
    text:  'No tourist infrastructure. Panchachuli peaks as your meditation backdrop at 3,500m.',
  },
  {
    title: 'Tribal culture',
    text:  'Stay with the Shauka people of Darma Valley — a living Himalayan tradition unchanged for centuries.',
  },
  {
    title: 'Local Ayurveda',
    text:  'Kumaon forest herbs, kafal berries, local ghee — ingredients no Kerala resort can source.',
  },
  {
    title: 'Permit guidance',
    text:  'Permit requirements vary by destination, nationality and current local regulations. Our team will advise you on applicable requirements before booking.',
  },
  {
    title: 'Born from the land',
    text:  'Our guides are from Pithoragarh and Dharchula. This is their home, not a tour route.',
  },
  {
    title: 'Tiny groups only',
    text:  'Thoughtfully curated small-group experiences.',
  },
]

const RETREAT_CARDS = [
  {
    badge:       'Yoga & Ayurveda',
    badgeClass:  'bg-[#1D9E75]/20 text-[#5DCAA5]',
    title:       PANCHACHULI_WELLNESS.listingName,
    meta:        retreatCardMeta(PANCHACHULI_WELLNESS),
    highlights:  PANCHACHULI_WELLNESS.highlights,
    retreat:     PANCHACHULI_WELLNESS,
    href:        '/retreats/panchachuli-wellness',
    cardImg:     '/images/retreats/kumaon-wellness-retreat-card.jfif',
    cardImgAlt:  'Group yoga at Khaliya Top with Panchachuli peaks, Kumaon Wellness Retreat',
  },
  {
    badge:       'Wilderness Detox',
    badgeClass:  'bg-[#1D9E75]/20 text-[#5DCAA5]',
    title:       'Darma Valley Digital Detox',
    meta:        'Darma Valley · 11 nights',
    highlights:  'Digital detox · Tribal village stay · Trail yoga · Herbal medicine',
    price:       'From €2,200 per person',
    href:        '/retreats/darma-detox',
    cardImg:     '/images/retreats/darma-valley-detox-trek-card.jfif',
    cardImgAlt:  'Trekker beside glacial stream with Panchachuli peaks, Darma Valley wilderness trek',
  },
  {
    badge:      'Women Only',
    badgeClass: 'bg-pink-900/30 text-pink-300',
    title:      WOMENS_SACRED_HIMALAYA.listingName,
    meta:       retreatCardMeta(WOMENS_SACRED_HIMALAYA),
    highlights: WOMENS_SACRED_HIMALAYA.highlights,
    retreat:    WOMENS_SACRED_HIMALAYA,
    href:       '/retreats/womens-retreat',
  },
  {
    badge:      'Ultra Premium',
    badgeClass: 'bg-purple-900/30 text-purple-300',
    title:      'The Borderlands of the Himalaya',
    meta:       'Johar Valley · Abbott Mount · Kasar Devi · Lohaghat',
    highlights: 'Myths · Mountains · Ancient Trade Routes · Signature experiences',
    price:      'From €1,800 per person',
    href:       '/retreats/borderlands-himalaya',
    cardImg:    '/images/retreats/borderlands/kumaon-himalaya-luxury-retreat-sunrise-view.webp',
    cardImgAlt: 'Kumaon Himalaya luxury retreat sunrise view, Borderlands of the Himalaya cultural journey',
  },
]

export default function InternationalRetreats() {
  useSEO({
    title:       'International Retreats — Yoga, Ayurveda & Detox in the Himalayas | Himalayan Serenity',
    description: 'Luxury yoga retreat India for international travelers. Kumaon Himalaya wellness journeys — Ayurveda and cultural immersion. Permit requirements vary by journey and nationality. Small groups. Book 2026.',
    canonical:   'https://www.himalayanserenitytravel.com/international-retreats',
  })

  const [form, setForm] = useState({
    name: '', country: '', retreat: '', dates: '', groupSize: '', email: '', message: '',
  })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submissionInFlight = useRef(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (submissionInFlight.current) return
    submissionInFlight.current = true
    setStatus('loading')
    try {
      const payload = {
        access_key:  WEB3FORMS_ACCESS_KEY,
        subject:     `International Retreat Enquiry — ${form.retreat || 'General'}`,
        from_name:   form.name,
        name:        form.name,
        email:       form.email,
        country:     form.country,
        retreat:     form.retreat,
        dates:       form.dates,
        group_size:  form.groupSize,
        message:     form.message,
        botcheck:    '',
      }
      const res  = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(payload),
      })
      const data = await res.json()
      setStatus(res.ok && data.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    } finally {
      submissionInFlight.current = false
    }
  }

  return (
    <div className="min-h-screen bg-[#0a100d]">
      <Navbar activePage="international-retreats" />

      {/* ── SECTION 1 — HERO ─────────────────────────────────────────────── */}
      <section aria-labelledby="international-hero-title" className="international-hero">
        <img
          src="/images/retreats/himalayan-yoga-meditation-retreat-hero.webp"
          alt="Woman practising yoga at sunrise with Himalayan peaks, international yoga and meditation retreat in Kumaon"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="international-hero-image"
        />
        <div aria-hidden="true" className="international-hero-shade" />
        <div className="international-hero-content">
          <div className="international-hero-copy" data-floating-avoid>
            <p className="international-hero-eyebrow">
              HIMALAYAN WELLNESS · KUMAON, INDIA
            </p>
            <h1 id="international-hero-title" className="font-serif">
              Find Your Stillness in the Himalayas
            </h1>
            <p className="international-hero-description">
              Yoga, mindfulness and authentic mountain experiences, thoughtfully curated for international travellers.
            </p>
            <div className="international-hero-actions">
              <a
                href="#retreats"
                className="international-hero-primary"
              >
                See all retreats
              </a>
              <a
                href="https://wa.me/919084642557"
                target="_blank"
                rel="noopener noreferrer"
                className="international-hero-secondary"
              >
                Speak With Our Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — TRUST STRIP ──────────────────────────────────────── */}
      <div className="bg-[#061008] py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            'Permit requirements vary by destination and nationality',
            'Thoughtfully curated small-group experiences',
            'Prices in EUR · USD · GBP',
            'Yoga, Ayurveda and local culture',
          ].map((item, i) => (
            <React.Fragment key={item}>
              {i > 0 && <span className="text-[#f0ece4]/20 hidden sm:inline">·</span>}
              <p className="text-[#f0ece4]/50 text-xs">{item}</p>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── FEATURED OFFER BANNER ────────────────────────────────────────── */}
      <div style={{ background: '#051007', borderBottom: '1px solid rgba(29,158,117,0.12)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

            {/* Text */}
            <div>
              <p
                className="font-sans uppercase mb-3"
                style={{ fontSize: 10, letterSpacing: '0.22em', color: '#1D9E75' }}
              >
                Featured Retreat · 2026 Season
              </p>
              <h2 className="font-serif text-[#f0ece4] text-2xl sm:text-[1.75rem] leading-snug mb-2">
                {PANCHACHULI_WELLNESS.name} · 9 days / 8 nights
              </h2>
              <div className="mb-4 max-w-xl"><RetreatPrice retreat={PANCHACHULI_WELLNESS} compact /></div>
              <p className="font-sans text-[#f0ece4]/45 text-sm tracking-wide">
                Small Groups &nbsp;·&nbsp; Authentic Kumaon, India &nbsp;·&nbsp; Permit guidance before booking
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 sm:flex-shrink-0">
              <Link
                to="/retreats/panchachuli-wellness"
                className="font-sans text-white text-sm font-medium rounded-full px-6 py-3 transition-colors duration-200 whitespace-nowrap"
                style={{ backgroundColor: '#1D9E75', textDecoration: 'none' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#0F6E56')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#1D9E75')}
              >
                View Dates &amp; Book
              </Link>
              <Link
                to="/contact"
                className="font-sans text-sm font-medium rounded-full px-6 py-3 transition-colors duration-200 whitespace-nowrap"
                style={{ border: '1px solid rgba(29,158,117,0.5)', color: '#1D9E75', textDecoration: 'none', backgroundColor: 'transparent' }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(29,158,117,0.08)')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                Enquire About This Retreat
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ── SECTION 3 — RETREAT CARDS ────────────────────────────────────── */}
      <section id="retreats" className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
        <p className="text-[#1D9E75] text-xs uppercase tracking-widest mb-2">Our Retreats</p>
        <h2 className="font-serif text-[#f0ece4] text-3xl mb-8">Four ways to find stillness</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {RETREAT_CARDS.map(({ badge, badgeClass, title, meta, highlights, price, retreat, href, cardImg, cardImgAlt }) => (
            <Link key={href} to={href} className="no-underline group">
              <div className={`bg-[#0a1a0a] border border-[#1D9E75]/10 rounded-2xl h-full flex flex-col hover:border-[#1D9E75]/30 transition-colors duration-200 ${cardImg || href === '/retreats/womens-retreat' ? 'overflow-hidden' : 'p-7'}`}>
                {cardImg && (
                  <img
                    src={cardImg}
                    alt={cardImgAlt}
                    loading="lazy"
                    className="w-full block"
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                      objectFit: 'contain',
                      backgroundColor: '#0a100d',
                      maxWidth: '100%',
                    }}
                  />
                )}
                {href === '/retreats/womens-retreat' && (
                  <div className="w-full rounded-t-xl overflow-hidden bg-[#150810]">
                    <img
                      src="/images/retreats/womens-retreat/international-woman-kumaoni-women-himalayan-village-panchachuli.webp"
                      alt="International woman with Kumaoni women in Himalayan village with Panchachuli peaks, Women of Kumaon retreat"
                      loading="lazy"
                      className="w-full block"
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        objectFit: 'contain',
                        maxWidth: '100%'
                      }}
                    />
                  </div>
                )}
                <div className={`flex flex-col flex-1 ${cardImg || href === '/retreats/womens-retreat' ? 'p-7' : ''}`}>
                  <span className={`inline-block self-start text-xs rounded-full px-3 py-1 mb-4 ${badgeClass}`}>
                    {badge}
                  </span>
                  <h3 className="font-serif text-[#f0ece4] text-xl mb-2">{title}</h3>
                  <p className="text-[#f0ece4]/50 text-sm mb-3">{meta}</p>
                  <p className="text-[#f0ece4]/60 text-sm mb-6">{highlights}</p>
                  {retreat ? <div className="mt-auto"><RetreatPrice retreat={retreat} compact /></div> : <p className="text-[#1D9E75] font-medium mt-auto">{price}</p>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── SECTION 4 — WHY KUMAON ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-20">
        <p className="text-[#1D9E75] text-xs uppercase tracking-widest mb-2">Why Kumaon, Not Rishikesh</p>
        <h2 className="font-serif text-[#f0ece4] text-3xl mb-10">The India that asks something of you</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {WHY_CARDS.map(({ title, text }) => (
            <div key={title} className="bg-[#0a1a0a] border border-[#1D9E75]/10 rounded-xl p-5">
              <h3 className="font-sans font-medium text-[#f0ece4] text-sm mb-2">{title}</h3>
              <p className="text-[#f0ece4]/50 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <BrandPromise className="bg-[#061008]" />

      {/* ── SECTION 6 — ENQUIRY FORM ─────────────────────────────────────── */}
      <section id="enquiry" className="scroll-mt-24 bg-[#061008] py-16 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-[#f0ece4] text-3xl mb-2">Plan your retreat</h2>
          <p className="text-sm text-[#f0ece4]/75 mb-4">
            Share your preferences and questions below.
          </p>

          <p className="text-sm text-[#f0ece4]/75 leading-relaxed mb-6">
            <Link to="/contact#journey-planning" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">How your enquiry works</Link>
          </p>

          {status === 'success' ? (
            <div role="status" className="text-center py-12">
              <p className="text-[#1D9E75] font-serif text-xl mb-2">Enquiry sent</p>
              <p className="text-[#f0ece4]/75 text-sm">Your enquiry has been submitted. Our team will contact you to discuss the next steps.</p>
            </div>
          ) : (
            <form data-clarity-mask="true" onSubmit={handleSubmit} className="space-y-4">
              <label htmlFor="enquiry-name" className="block text-sm text-[#f0ece4]/85">Full name</label>
              <input id="enquiry-name" autoComplete="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className={INPUT_CLASS}
              />
              <label htmlFor="enquiry-country" className="block text-sm text-[#f0ece4]/85">Country of residence</label>
              <input id="enquiry-country" autoComplete="country-name"
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Your country"
                required
                className={INPUT_CLASS}
              />
              <label htmlFor="enquiry-retreat" className="block text-sm text-[#f0ece4]/85">Retreat or journey of interest</label>
              <select id="enquiry-retreat"
                name="retreat"
                value={form.retreat}
                onChange={handleChange}
                required
                className={`${INPUT_CLASS} bg-[#0d1a0d]`}
              >
                <option value="" disabled>Which retreat?</option>
                <option>Panchachuli Himalayan Wellness &amp; Cultural Immersion Retreat</option>
                <option>{"Women's Sacred Himalaya Retreat"}</option>
                <option>The Borderlands of the Himalaya</option>
                <option>Darma Valley Digital Detox</option>
                <option>Not sure yet — help me choose</option>
              </select>
              <label htmlFor="enquiry-dates" className="block text-sm text-[#f0ece4]/85">Preferred departure date (optional)</label>
              <input id="enquiry-dates"
                type="text"
                name="dates"
                value={form.dates}
                onChange={handleChange}
                placeholder="Your preferred month or departure date"
                className={INPUT_CLASS}
              />
              <label htmlFor="enquiry-groupSize" className="block text-sm text-[#f0ece4]/85">Number of travellers</label>
              <select id="enquiry-groupSize"
                name="groupSize"
                value={form.groupSize}
                onChange={handleChange}
                required
                className={`${INPUT_CLASS} bg-[#0d1a0d]`}
              >
                <option value="" disabled>Group size</option>
                <option>Solo</option>
                <option>2 people</option>
                <option>3–4 people</option>
                <option>5–6 people</option>
                <option>Larger group</option>
              </select>
              <label htmlFor="enquiry-email" className="block text-sm text-[#f0ece4]/85">Email address</label>
              <input id="enquiry-email" autoComplete="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your email address"
                required
                className={INPUT_CLASS}
              />
              <label htmlFor="enquiry-message" className="block text-sm text-[#f0ece4]/85">Additional questions (optional)</label>
              <p id="enquiry-message-hint" className="text-xs text-[#f0ece4]/75 leading-relaxed">You can share dietary or room preferences and questions about travel connections here.</p>
              <textarea id="enquiry-message" aria-describedby="enquiry-message-hint"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Any questions or special requirements?"
                rows={4}
                className={`${INPUT_CLASS} resize-none`}
              />

              {status === 'error' && (
                <p role="alert" className="text-red-400 text-sm">Something went wrong. Please try again or WhatsApp us directly.</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#1D9E75] hover:bg-[#0F6E56] text-white rounded-lg py-3 text-sm font-medium transition-colors disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending…' : 'Send Enquiry'}
              </button>
              <EnquiryPrivacy />
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
