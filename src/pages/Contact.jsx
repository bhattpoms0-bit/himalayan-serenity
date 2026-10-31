import { trackEnquiry } from '../utils/consent'
import React, { useState, useRef } from 'react'
import { useSEO } from '../hooks/useSEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import EnquiryPrivacy from '../components/EnquiryPrivacy'
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react'

const WEB3FORMS_ACCESS_KEY = "a4bcce53-4a1d-4217-93b6-30b9d714bbdd"

const INTERESTED_IN_OPTIONS = [
  { value: 'Adi Kailash & Om Parvat Expedition', label: 'Adi Kailash & Om Parvat Expedition' },
  { value: 'Panchachuli Wellness – Yoga & Ayurveda', label: 'Panchachuli Wellness Retreat — Yoga & Ayurveda' },
  { value: 'The Borderlands of the Himalaya', label: 'The Borderlands of the Himalaya' },
  { value: "Women's Wellness Retreat in the Himalaya", label: "Women's Sacred Himalaya Retreat" },
  { value: 'Darma Valley Digital Detox', label: 'Darma Valley Digital Detox' },
  { value: 'Custom / Other', label: 'Custom / Other' },
]

// Older names map only to the same confirmed product.
const ENQUIRY_ALIASES = new Map([
  ['Kumaon Wellness Retreat', 'Panchachuli Wellness – Yoga & Ayurveda'],
  ['Adi Kailash Expedition', 'Adi Kailash & Om Parvat Expedition'],
])

const TRAVEL_PLAN_OPTIONS = [
  'Within 3 months',
  '3 to 6 months',
  '6 to 12 months',
  'Just exploring for now',
]

const INPUT_CLASS =
  "w-full min-w-0 bg-brand-dark border border-brand-dark-border rounded-lg px-4 py-3 text-brand-cream text-base sm:text-sm placeholder-brand-text-muted focus:outline-none focus:border-brand-orange/50 transition-colors"

export default function ContactPage() {
  useSEO({
    title: 'Plan Your Himalayan Journey | Contact Himalayan Serenity Travel',
    description: 'Enquire about Himalayan wellness retreats, sacred journeys and cultural expeditions in Kumaon, India. Discuss your preferences with the Himalayan Serenity Travel team.',
    canonical: 'https://www.himalayanserenitytravel.com/contact',
  })

  const [origin, setOrigin] = useState('')
  const [form, setForm] = useState(() => {
    const requested = new URLSearchParams(window.location.search).get('expedition') || ''
    const mapped = ENQUIRY_ALIASES.get(requested) || requested
    const matched = INTERESTED_IN_OPTIONS.find(option => option.value === mapped || option.label === mapped)
    const expedition = matched?.value || (requested ? 'Custom / Other' : '')
    const message = requested && !matched ? `Journey of interest: ${requested}\n\n` : ''
    return { name: '', email: '', phone: '', expedition, travellers: '', travelPlan: '', message }
  })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submissionInFlight = useRef(false)

  const handleSubmit = async e => {
    e.preventDefault()
    if (!origin) return
    if (submissionInFlight.current) return
    submissionInFlight.current = true
    setStatus('loading')

    try {
      const payload = {
        access_key:              WEB3FORMS_ACCESS_KEY,
        subject:                 `New ${origin === 'india' ? 'Expedition' : 'Retreat'} Inquiry — ${form.expedition || 'General'}`,
        from_name:               form.name,
        name:                    form.name,
        email:                   form.email,
        travelling_from:         origin === 'india' ? 'India' : 'Outside India',
        ...(origin === 'india'   ? { phone_whatsapp: form.phone }             : {}),
        interested_in:           form.expedition,
        ...(origin === 'outside' ? { when_planning_to_travel: form.travelPlan } : {}),
        number_of_travellers:    form.travellers,
        message:                 form.message,
        botcheck:                '',
      }

      const res  = await fetch('https://api.web3forms.com/submit', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body:    JSON.stringify(payload),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        trackEnquiry('Contact')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      submissionInFlight.current = false
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar activePage="contact" />

      {/* Visually hidden SEO h1 */}
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        Contact Himalayan Serenity Travel — Plan Your Sacred Journey
      </h1>

      <section className="relative pt-32 pb-20">
        {/* Hero bg */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 to-brand-dark" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="section-tag mb-4">The Final Ascent</p>
            <h2 className="section-title text-5xl lg:text-6xl mb-5">
              Your Himalayan Journey<br />Begins Here
            </h2>
            <p className="font-sans text-brand-text-muted text-lg max-w-xl mx-auto">
              The peaks are calling. Step into a world of ancient wisdom and breathtaking beauty.
              Your spiritual ascent is just a conversation away.
            </p>
          </div>

          <section id="journey-planning" aria-labelledby="journey-planning-heading" className="scroll-mt-28 max-w-5xl mx-auto mb-12 rounded-2xl border border-brand-gold/20 bg-[#0b121a] p-6 sm:p-8">
            <h2 id="journey-planning-heading" className="font-serif text-brand-cream text-3xl sm:text-4xl leading-tight mb-5">Your Journey, Thoughtfully Planned</h2>
            <div className="max-w-3xl text-brand-cream/80 text-base leading-relaxed space-y-4">
              <p>Every Himalayan Serenity journey begins with a conversation. We take time to understand your interests, travel preferences and expectations before sharing a detailed itinerary and proposal.</p>
              <p>Before confirming your booking, you'll receive information about your proposed accommodation, retreat facilitators, inclusions and applicable booking terms.</p>
            </div>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {[
                ['Send Your Enquiry', 'Tell us which retreat interests you.'],
                ['Speak With Our Team', 'Discuss the journey and your preferences.'],
                ['Review Your Proposal', 'Receive the detailed itinerary, accommodation and facilitator information.'],
                ['Confirm Your Journey', 'Proceed under the agreed booking terms.'],
              ].map(([title, description], index) => (
                <li key={title} className="min-w-0">
                  <span aria-hidden="true" className="text-brand-gold text-sm">0{index + 1}</span>
                  <h3 className="font-serif text-brand-cream text-xl mt-2 mb-2">{title}</h3>
                  <p className="text-brand-cream/75 text-sm leading-relaxed">{description}</p>
                </li>
              ))}
            </ol>
            <p className="text-brand-cream/75 text-sm leading-relaxed mt-6 max-w-3xl">Before payment, review the full itinerary, proposed accommodation and facilitator information, confirmed inclusions and exclusions, and applicable price and payment terms with our team.</p>
            <a href="/terms" className="inline-flex min-h-11 items-center mt-5 text-brand-cream/85 text-sm underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Review our booking terms</a>
          </section>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

            {/* ── Consultation Form ──────────────────────────────────────── */}
            <div id="consultation" data-floating-avoid className="card-dark min-w-0 scroll-mt-28">
              {status === 'success' ? (
                <div role="status" className="text-center py-12">
                  <div className="text-4xl mb-4">🙏</div>
                  <h3 className="font-serif text-2xl text-brand-cream mb-3">Namaste!</h3>
                  <p className="font-sans text-brand-text-muted">
                    Your enquiry has been submitted. Our team will contact you to discuss the next steps.
                  </p>
                </div>
              ) : (
                <form data-clarity-mask="true" onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-serif text-xl text-brand-cream mb-2">Send Your Enquiry</h3>
                  <p className="font-sans text-sm text-brand-cream/75 mb-6 pb-4 border-b border-white/[0.06]">
                    Share your interests and questions to start a personal conversation about your journey.
                  </p>

                  {/* ── 1. Where are you travelling from? ── */}
                  <fieldset>
                    <legend className="block font-sans text-xs text-brand-cream/75 mb-3 uppercase tracking-wider">
                      Where are you travelling from?
                    </legend>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        aria-pressed={origin === 'india'}
                        onClick={() => setOrigin('india')}
                        className="w-full py-3 px-4 rounded-lg text-sm font-sans font-medium border transition-all duration-200"
                        style={{
                          backgroundColor: origin === 'india' ? '#C8A44B'              : 'transparent',
                          borderColor:     origin === 'india' ? '#C8A44B'              : 'rgba(255,255,255,0.1)',
                          color:           origin === 'india' ? '#090909'              : '#C8BFAE',
                        }}
                      >
                        🇮🇳 From India
                      </button>
                      <button
                        type="button"
                        aria-pressed={origin === 'outside'}
                        onClick={() => setOrigin('outside')}
                        className="w-full py-3 px-4 rounded-lg text-sm font-sans font-medium border transition-all duration-200"
                        style={{
                          backgroundColor: origin === 'outside' ? '#C8A44B'            : 'transparent',
                          borderColor:     origin === 'outside' ? '#C8A44B'            : 'rgba(255,255,255,0.1)',
                          color:           origin === 'outside' ? '#090909'            : '#C8BFAE',
                        }}
                      >
                        🌍 Outside India
                      </button>
                    </div>
                  </fieldset>

                  {/* ── 2. Full Name ── */}
                  <div>
                    <label htmlFor="contact-name" className="block font-sans text-xs text-brand-cream/75 mb-2 uppercase tracking-wider">
                      Full Name
                    </label>
                    <input id="contact-name" autoComplete="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className={INPUT_CLASS}
                    />
                  </div>

                  {/* ── 3. Email Address ── */}
                  <div>
                    <label htmlFor="contact-email" className="block font-sans text-xs text-brand-cream/75 mb-2 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input id="contact-email" autoComplete="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className={INPUT_CLASS}
                    />
                  </div>

                  {/* ── 4. Phone / WhatsApp — India only ── */}
                  <div
                    hidden={origin !== 'india'}
                    style={{
                      overflow:   'hidden',
                      maxHeight:  origin === 'india' ? '120px' : '0px',
                      opacity:    origin === 'india' ? 1 : 0,
                      transition: 'max-height 0.3s ease, opacity 0.3s ease',
                    }}
                  >
                    <label htmlFor="contact-phone" className="block font-sans text-xs text-brand-cream/75 mb-2 uppercase tracking-wider">
                      Phone / WhatsApp
                    </label>
                    <input id="contact-phone" autoComplete="tel"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      required={origin === 'india'}
                      className={INPUT_CLASS}
                    />
                  </div>

                  {/* ── 5. Interested In ── */}
                  <div>
                    <label htmlFor="contact-expedition" className="block font-sans text-xs text-brand-cream/75 mb-2 uppercase tracking-wider">
                      Interested In
                    </label>
                    <select id="contact-expedition"
                      name="expedition"
                      value={form.expedition}
                      onChange={handleChange}
                      required
                      className={INPUT_CLASS}
                      style={{ backgroundColor: 'var(--color-brand-dark, #0d0d0d)' }}
                    >
                      <option value="" disabled>Select an expedition or retreat…</option>
                      {INTERESTED_IN_OPTIONS.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* ── 6. When are you planning to travel? — Outside India only ── */}
                  <div
                    hidden={origin !== 'outside'}
                    style={{
                      overflow:   'hidden',
                      maxHeight:  origin === 'outside' ? '120px' : '0px',
                      opacity:    origin === 'outside' ? 1 : 0,
                      transition: 'max-height 0.3s ease, opacity 0.3s ease',
                    }}
                  >
                    <label htmlFor="contact-travelPlan" className="block font-sans text-xs text-brand-cream/75 mb-2 uppercase tracking-wider">
                      When are you planning to travel?
                    </label>
                    <select id="contact-travelPlan"
                      name="travelPlan"
                      value={form.travelPlan}
                      onChange={handleChange}
                      className={INPUT_CLASS}
                      style={{ backgroundColor: 'var(--color-brand-dark, #0d0d0d)' }}
                    >
                      <option value="">Select a timeframe…</option>
                      {TRAVEL_PLAN_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  {/* ── 7. Number of Travellers ── */}
                  <div>
                    <label htmlFor="contact-travellers" className="block font-sans text-xs text-brand-cream/75 mb-2 uppercase tracking-wider">
                      Number of Travellers
                    </label>
                    <input id="contact-travellers"
                      type="number"
                      name="travellers"
                      value={form.travellers}
                      onChange={handleChange}
                      placeholder="e.g. 2"
                      min="1"
                      className={INPUT_CLASS}
                    />
                  </div>

                  {/* ── 8. Message ── */}
                  <div>
                    <label htmlFor="contact-message" className="block font-sans text-xs text-brand-cream/75 mb-2 uppercase tracking-wider">
                      Message
                    </label>
                    <p id="contact-message-hint" className="text-xs text-brand-cream/75 leading-relaxed mb-2">You can include your country of residence, preferred dates, dietary or room preferences and questions about travel connections.</p>
                    <textarea id="contact-message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      aria-describedby="contact-message-hint"
                      placeholder="Tell us about your journey goals…"
                      rows={4}
                      className={`${INPUT_CLASS} resize-none`}
                    />
                  </div>

                  {status === 'error' && (
                    <p role="alert" className="font-sans text-sm text-red-400">
                      Something went wrong. Please try again or contact us via WhatsApp.
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={status === 'loading' || !origin}
                      className="btn-primary flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? 'Sending…' : 'Send Enquiry'}
                    </button>
                    <a
                      href="https://wa.me/919084642557"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 border border-green-700/40 text-green-400 text-sm font-sans px-5 py-3 rounded-full hover:bg-green-900/20 transition-all"
                    >
                      <MessageCircle size={14} /> Speak With Our Team
                    </a>
                  </div>
                  <EnquiryPrivacy />
                </form>
              )}
            </div>

            {/* ── Info Column ───────────────────────────────────────────── */}
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-2xl text-brand-cream mb-6">Connect With Us</h3>
                <div className="space-y-5">
                  {[
                    { icon: Mail, label: 'Bookings, privacy requests & customer support', value: 'info@himalayanserenitytravel.com', href: 'mailto:info@himalayanserenitytravel.com' },
                    { icon: Phone, label: 'Phone', value: '+91 90846 42557', href: 'tel:+919084642557' },
                    { icon: MapPin, label: 'Pithoragarh Contact Office', value: <>Plaza Hotel, Hydel Tiraha,<br />Tanakpur Road, Aincholi,<br />Pithoragarh, Uttarakhand – 262501,<br />India.</> },
                    { icon: MapPin, label: 'Delhi Registered Office', value: <>LIFE &amp; LEISURE INDIA PRIVATE LIMITED<br />107–108, 1st Floor,<br />Roots Tower,<br />District Centre, Laxmi Nagar,<br />Delhi – 110092,<br />India.</> },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon size={15} className="text-brand-orange" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-sans text-xs text-brand-text-muted uppercase tracking-wider mb-1">{item.label}</p>
                        <div className="font-sans text-brand-cream text-sm leading-relaxed break-words">{item.href ? <a href={item.href} className="hover:text-brand-orange">{item.value}</a> : <address className="not-italic">{item.value}</address>}</div>
                      </div>
                    </div>
                  ))}
                  <p className="font-sans text-brand-text-muted text-sm leading-relaxed">Himalayan Serenity Travel is a brand of LIFE &amp; LEISURE INDIA PRIVATE LIMITED. <a href="https://lifeandleisure.travel/" className="text-brand-orange hover:text-brand-orange-light">Company website</a></p>
                </div>
              </div>

              {/* Package Quick CTA — FIX 2 */}
              <div className="card-dark">
                <p className="section-tag mb-3">Explore Packages</p>
                <p className="font-sans text-brand-text-muted text-sm mb-5 leading-relaxed">
                  Browse our complete range of curated Himalayan expeditions.
                </p>
                <a href="/international-retreats" className="btn-primary block text-center text-sm">
                  View All Packages
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SEO Content Section ───────────────────────────────────────── */}
      <section className="py-16" style={{ backgroundColor: '#0d0d0d', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="font-serif text-brand-cream mb-5" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Get in Touch
          </h2>
          <p className="font-sans mb-4 leading-relaxed" style={{ color: '#C8BFAE', fontSize: 15 }}>
            Himalayan Serenity Travel is a Pithoragarh-based expedition company specializing in sacred Himalayan
            journeys to Adi Kailash, Om Parvat, Panchachuli and Darma Valley. Our team of experienced local guides
            and permit specialists ensure a seamless, safe and spiritually enriching experience for every traveler.
          </p>
          <p className="font-sans mb-10 leading-relaxed" style={{ color: '#C8BFAE', fontSize: 15 }}>
            We typically respond to all inquiries within 2–4 hours on WhatsApp and within 24 hours via email.
            For urgent Inner Line Permit or booking queries, WhatsApp is the fastest way to reach us.
          </p>

          <h2 className="font-serif text-brand-cream mb-5" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)' }}>
            Why Reach Out to Us?
          </h2>
          <ul className="font-sans mb-10 space-y-3" style={{ color: '#C8BFAE', fontSize: 15 }}>
            <li>• Complete ILP and Inner Line Permit assistance for Adi Kailash Yatra and Darma Valley expeditions</li>
            <li>• Custom itinerary planning for groups, families and solo Himalayan pilgrimage travelers</li>
            <li>• On-ground local support from Pithoragarh and Dharchula — real people, real expertise</li>
            <li>• Medical documentation guidance and high-altitude preparation for Om Parvat darshan</li>
          </ul>

          <h2 className="font-serif text-brand-cream mb-5" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)' }}>
            Our Location
          </h2>
          <p className="font-sans mb-10 leading-relaxed" style={{ color: '#C8BFAE', fontSize: 15 }}>
            Himalayan Serenity Travel has a contact office in Pithoragarh, Uttarakhand — the gateway district to
            Adi Kailash, Om Parvat, Darma Valley and Panchachuli Base Camp. Our local presence means faster
            Inner Line Permit processing, real-time route updates and genuine on-ground support throughout your
            Himalayan pilgrimage journey.
          </p>

          <h2 className="font-serif text-brand-cream mb-5" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)' }}>
            Common Questions
          </h2>
          <div className="space-y-5" style={{ color: '#C8BFAE', fontSize: 15 }}>
            <div>
              <p className="font-sans font-semibold mb-1" style={{ color: '#bbbbbb' }}>Do you arrange Inner Line Permits (ILP) for Adi Kailash?</p>
              <p className="font-sans leading-relaxed">
                Yes. We provide complete ILP assistance for Adi Kailash Yatra, Om Parvat darshan and Darma Valley expeditions —
                covering documentation, SDM Dharchula coordination, submission and collection.
              </p>
            </div>
            <div>
              <p className="font-sans font-semibold mb-1" style={{ color: '#bbbbbb' }}>Can you plan a custom Himalayan itinerary from Delhi?</p>
              <p className="font-sans leading-relaxed">
                Absolutely. We design custom Adi Kailash Yatra and Kumaon expedition packages from Delhi with flexible
                dates, group sizes and comfort levels — including senior-friendly and women-only options.
              </p>
            </div>
            <div>
              <p className="font-sans font-semibold mb-1" style={{ color: '#bbbbbb' }}>What is the Adi Kailash opening date in 2026?</p>
              <p className="font-sans leading-relaxed">
                The Adi Kailash Yatra season typically opens in May and closes in October. Exact 2026 dates are
                confirmed once the district administration issues the annual notification. Contact us for the latest update.
              </p>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}
