import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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
    title: 'No permits needed',
    text:  'Darma Valley and Munsiyari are fully open to international travellers.',
  },
  {
    title: 'Born from the land',
    text:  'Our guides are from Pithoragarh and Dharchula. This is their home, not a tour route.',
  },
  {
    title: 'Tiny groups only',
    text:  'Maximum 6 to 8 guests per retreat. Never a crowd.',
  },
]

const RETREAT_CARDS = [
  {
    badge:      'Yoga & Ayurveda',
    badgeClass: 'bg-[#1D9E75]/20 text-[#5DCAA5]',
    title:      'Kumaon Wellness Immersion',
    meta:       'Munsiyari · Khaliya Top · 7 nights',
    highlights: 'Daily yoga · Sattvic diet · Ayurvedic massage · Panchachuli sunrise',
    price:      'From €1,400 per person',
    href:       '/retreats/kumaon-wellness',
  },
  {
    badge:      'Wilderness Detox',
    badgeClass: 'bg-[#1D9E75]/20 text-[#5DCAA5]',
    title:      'Darma Valley Detox Trek',
    meta:       'Darma Valley · 11 nights',
    highlights: 'Digital detox · Tribal village stay · Trail yoga · Herbal medicine',
    price:      'From €2,200 per person',
    href:       '/retreats/darma-detox',
  },
  {
    badge:      'Women Only',
    badgeClass: 'bg-pink-900/30 text-pink-300',
    title:      "Women's Sacred Himalaya Retreat",
    meta:       'Munsiyari + Darma · 9 nights',
    highlights: 'Female guides · Shakti yoga · Cultural exchange · Moon meditation',
    price:      'From €2,000 per person',
    href:       '/retreats/womens-retreat',
  },
  {
    badge:      'Ultra Premium',
    badgeClass: 'bg-purple-900/30 text-purple-300',
    title:      'Panchakarma Silence Retreat',
    meta:       'Munsiyari · 14 nights · Max 4 guests',
    highlights: 'BAMS physician · Panchakarma treatments · 3-day silence',
    price:      'From €3,500 per person',
    href:       '/retreats/panchakarma',
  },
]

export default function InternationalRetreats() {
  useSEO({
    title:       'International Retreats — Yoga, Ayurveda & Detox in the Himalayas | Himalayan Serenity',
    description: 'Intimate yoga, Ayurveda and wellness retreats in the Kumaon Himalaya. No permits required for international travellers. Small groups. Prices in EUR, USD, GBP.',
  })

  const [form, setForm] = useState({
    name: '', country: '', retreat: '', dates: '', groupSize: '', email: '', message: '',
  })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
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
    }
  }

  return (
    <div className="min-h-screen bg-[#0a100d]">
      <Navbar activePage="international-retreats" />

      {/* ── SECTION 1 — HERO ─────────────────────────────────────────────── */}
      <section className="pt-36 pb-24 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <span className="inline-block border border-[#1D9E75] text-[#1D9E75] uppercase text-xs rounded-full px-3 py-1 mb-6">
            International Retreats · No Permit Required
          </span>
          <h1 className="font-serif text-[#f0ece4] text-4xl sm:text-5xl lg:text-[3.5rem] leading-tight tracking-tight mb-4">
            Where the Himalayas become your healer
          </h1>
          <p className="font-serif italic text-[#1D9E75] text-xl mb-6">
            Yoga · Meditation · Ayurveda · Detox
          </p>
          <p className="text-sm text-[#f0ece4]/60 max-w-lg leading-relaxed mb-8">
            Intimate small-group retreats in the Kumaon Himalaya — the India that Rishikesh has
            forgotten. No crowds. No permits. Just the mountains and your practice.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#retreats"
              className="bg-[#1D9E75] text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-[#0F6E56] transition-colors duration-200"
            >
              See all retreats
            </a>
            <a
              href="https://wa.me/919084642557"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#1D9E75] text-[#1D9E75] rounded-full px-6 py-3 text-sm font-medium hover:bg-[#1D9E75]/10 transition-colors duration-200"
            >
              Download retreat guide
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — TRUST STRIP ──────────────────────────────────────── */}
      <div className="bg-[#061008] py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {[
            'No Inner Line Permit required for international travellers',
            'Small groups — maximum 6 to 8 guests',
            'Prices in EUR · USD · GBP',
            'Certified Ayurvedic practitioners',
          ].map((item, i) => (
            <React.Fragment key={item}>
              {i > 0 && <span className="text-[#f0ece4]/20 hidden sm:inline">·</span>}
              <p className="text-[#f0ece4]/50 text-xs">{item}</p>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* ── SECTION 3 — RETREAT CARDS ────────────────────────────────────── */}
      <section id="retreats" className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
        <p className="text-[#1D9E75] text-xs uppercase tracking-widest mb-2">Our Retreats</p>
        <h2 className="font-serif text-[#f0ece4] text-3xl mb-8">Four ways to find stillness</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {RETREAT_CARDS.map(({ badge, badgeClass, title, meta, highlights, price, href }) => (
            <Link key={href} to={href} className="no-underline group">
              <div className="bg-[#0a1a0a] border border-[#1D9E75]/10 rounded-2xl p-7 h-full flex flex-col hover:border-[#1D9E75]/30 transition-colors duration-200">
                <span className={`inline-block self-start text-xs rounded-full px-3 py-1 mb-4 ${badgeClass}`}>
                  {badge}
                </span>
                <h3 className="font-serif text-[#f0ece4] text-xl mb-2">{title}</h3>
                <p className="text-[#f0ece4]/50 text-sm mb-3">{meta}</p>
                <p className="text-[#f0ece4]/60 text-sm mb-6">{highlights}</p>
                <p className="text-[#1D9E75] font-medium mt-auto">{price}</p>
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

      {/* ── SECTION 5 — ENQUIRY FORM ─────────────────────────────────────── */}
      <section id="enquiry" className="bg-[#061008] py-16 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-[#f0ece4] text-3xl mb-2">Plan your retreat</h2>
          <p className="text-sm text-[#f0ece4]/50 mb-8">
            Tell us what you are looking for — we respond within 24 hours.
          </p>

          {status === 'success' ? (
            <div className="text-center py-12">
              <p className="text-[#1D9E75] font-serif text-xl mb-2">Enquiry sent</p>
              <p className="text-[#f0ece4]/50 text-sm">We will be in touch within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className={INPUT_CLASS}
              />
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Your country"
                required
                className={INPUT_CLASS}
              />
              <select
                name="retreat"
                value={form.retreat}
                onChange={handleChange}
                required
                className={`${INPUT_CLASS} bg-[#0d1a0d]`}
              >
                <option value="" disabled>Which retreat?</option>
                <option>Kumaon Wellness Immersion</option>
                <option>Darma Valley Detox Trek</option>
                <option>{"Women's Sacred Himalaya Retreat"}</option>
                <option>Panchakarma Silence Retreat</option>
                <option>Not sure yet — help me choose</option>
              </select>
              <input
                type="text"
                name="dates"
                value={form.dates}
                onChange={handleChange}
                placeholder="e.g. October 2025"
                className={INPUT_CLASS}
              />
              <select
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
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your email address"
                required
                className={INPUT_CLASS}
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Any questions or special requirements?"
                rows={4}
                className={`${INPUT_CLASS} resize-none`}
              />

              {status === 'error' && (
                <p className="text-red-400 text-xs">Something went wrong. Please try again or WhatsApp us directly.</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-[#1D9E75] hover:bg-[#0F6E56] text-white rounded-lg py-3 text-sm font-medium transition-colors disabled:opacity-60"
              >
                {status === 'loading' ? 'Sending…' : "Send enquiry — we'll reply within 24 hours"}
              </button>
              <p className="text-xs text-[#f0ece4]/30 text-center mt-3">
                Or WhatsApp us directly · No commitment required · Your information is never shared
              </p>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
