import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../../hooks/useSEO'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const WEB3FORMS_ACCESS_KEY = 'a4bcce53-4a1d-4217-93b6-30b9d714bbdd'

const INPUT_CLASS =
  'bg-white/5 border border-[#1D9E75]/20 rounded-lg px-4 py-3 text-[#f0ece4] text-sm w-full focus:outline-none focus:border-[#1D9E75]/60 placeholder:text-white/20'

// ─── Data ─────────────────────────────────────────────────────────────────────

const DAYS = [
  {
    route:  'DAY 1 · DELHI → PITHORAGARH',
    theme:  'Arrival & Decompression',
    desc:   'After arrival in Delhi, guests travel to the "Little Kashmir" of Uttarakhand—Pithoragarh. The first day is intentionally slow, allowing guests to recover from international travel and begin disconnecting from everyday life.',
    exp:    ['Private arrival transfer', 'Welcome herbal infusion ceremony', 'Introduction to Himalayan wellness traditions', 'Sunset walk in Chandak Hill', 'Farm-to-table Kumaoni dinner'],
    stay:   'Boutique Heritage Stay, Pithoragarh',
    img:         '/images/retreats/kumaon-wellness/pithoragarh-arrival-decompression-himalayan-wellness-day1.webp',
    imgAlt:      'Pithoragarh arrival and decompression, Himalayan wellness retreat day one',
    imgOverride: { width: '100%', height: 'auto', objectFit: 'contain' },
  },
  {
    route:  'DAY 2 · BHIMTAL → MUNSIYARI',
    theme:  'Crossing Into Another World',
    desc:   'Travel deeper into Kumaon\'s mountain heartland through ancient river valleys, pine forests, and remote Himalayan landscapes.',
    exp:    ['Scenic mountain drive', 'Stop at Birthi Waterfall', 'Traditional mountain lunch', 'Storytelling about Himalayan culture and history', 'Arrival in Munsiyari beneath Panchachuli Peaks'],
    stay:   'Premium Mountain Lodge, Munsiyari',
    img:         '/images/retreats/kumaon-wellness/munsiyari-himalayan-drive-birthi-waterfall-day2.webp',
    imgAlt:      'Munsiyari Himalayan drive passing Birthi Waterfall, day two journey into the mountains',
    imgOverride: { width: '100%', height: 'auto', objectFit: 'contain' },
  },
  {
    route:  'DAY 3 · MUNSIYARI',
    theme:  'The Science of Self — Ayurveda & Personal Wellbeing',
    desc:   'The retreat begins with a personalised Ayurvedic consultation to understand your unique constitution and wellbeing needs.',
    exp:    ['Individual Ayurvedic assessment', 'Personal wellness consultation', 'Gentle yoga practice', 'Introduction to Himalayan medicinal herbs', 'Sunset mindfulness session'],
    stay:   'Munsiyari',
    img:         '/images/retreats/kumaon-wellness/ayurveda-yoga-munsiyari-panchachuli-wellness-day3.webp',
    imgAlt:      'Ayurveda and yoga practice in Munsiyari with Panchachuli peaks, wellness day three',
    imgOverride: { width: '100%', height: 'auto', objectFit: 'contain' },
  },
  {
    route:  'DAY 4 · MUNSIYARI',
    theme:  'Sunrise Above the Clouds — Awakening',
    desc:   'Before dawn, guests journey to the alpine meadows of Khaliya Top where the Panchachuli range emerges in golden light.',
    exp:    ['Sunrise yoga at Khaliya Top (3,500m)', 'Guided meditation', 'Himalayan breathwork session', 'Mountain breakfast', 'Ayurvedic Abhyanga therapy'],
    stay:   'Munsiyari',
    img:         '/images/retreats/kumaon-wellness/khaliya-top-sunrise-yoga-panchachuli-awakening-day4.webp',
    imgAlt:      'Sunrise yoga at Khaliya Top with Panchachuli awakening, day four mountain meditation',
    imgOverride: { width: '100%', height: 'auto', objectFit: 'contain' },
  },
  {
    route:  'DAY 5 · MUNSIYARI',
    theme:  'Himalayan Healing & Restoration — Restore',
    desc:   'A full day dedicated to healing and renewal. No schedule, no destinations — only the practice of receiving.',
    exp:    ['Yoga Nidra', 'Herbal steam therapy', 'Ayurvedic treatment session', 'Himalayan herbal tea ritual', 'Guided reflection and journalling'],
    stay:   'Munsiyari',
    img:         '/images/retreats/kumaon-wellness/yoga-nidra-himalayan-healing-restoration-munsiyari-day5.webp',
    imgAlt:      'Yoga nidra and Himalayan healing restoration in Munsiyari, day five wellness retreat',
    imgOverride: { width: '100%', height: 'auto', objectFit: 'contain' },
  },
  {
    route:    'DAY 6 · PITHORAGARH',
    theme:    'Himalayan Ayurveda & Renewal',
    subtitle: 'Ayurvedic Consultation · Panchakarma Therapy · Mountain Yoga',
    desc:     "A dedicated day of Himalayan healing in Pithoragarh — one of Kumaon's most sacred towns. Meet an Ayurvedic physician for a personalised consultation, experience traditional Panchakarma therapies, and close the day with a mountain yoga session overlooking the picturesque peaks.",
    exp:      ['Personal Ayurvedic dosha consultation', 'Signature Panchakarma therapy session', 'Himalayan herb walk with local vaidya', 'Mountain yoga', 'Sattvic Ayurvedic dinner'],
    stay:     'Heritage Stay, Pithoragarh',
    img:         '/images/retreats/kumaon-wellness/ayurvedic-consultation-panchakarma-yoga-pithoragarh-himalaya.webp',
    imgAlt:      'Ayurvedic consultation and Panchakarma therapy with mountain yoga in Pithoragarh Himalaya',
    imgOverride: { width: '100%', height: 'auto', objectFit: 'contain' },
  },
  {
    route:  'DAY 7 · PITHORAGARH',
    theme:  'Silence, Nature & Reflection — Stillness',
    desc:   'A carefully curated digital detox day. No screens, no schedules — only forest, breath, and silence.',
    exp:    ['Guided forest bathing', 'Silent nature immersion', 'Meditation practices', 'Journalling session', 'Optional wellness coaching'],
    stay:   'Munsiyari',
    img:         '/images/retreats/kumaon-wellness/forest-bathing-silence-pithoragarh-digital-detox-day7.webp',
    imgAlt:      'Forest bathing and silence practice in Pithoragarh, digital detox day seven',
    imgOverride: { width: '100%', height: 'auto', objectFit: 'contain' },
  },
  {
    route:  'DAY 8 · PITHORAGARH → KASAR DEVI',
    theme:  'The Spiritual Ridge of the Himalaya — Integration',
    desc:   'Travel through the Himalayan foothills to the legendary spiritual enclave of Kasar Devi. For generations, philosophers, artists, seekers, and writers have been drawn to this extraordinary ridge overlooking the Himalaya.',
    exp:    ['Scenic Himalayan drive', 'Traditional lunch en route', 'Sunset meditation at Kasar Devi', 'Walk along Crank\'s Ridge', 'Reflection circle'],
    stay:   'Boutique Heritage Stay, Kasar Devi',
    img:         '/images/retreats/kumaon-wellness/kasar-devi-spiritual-ridge-meditation-integration-day8.webp',
    imgAlt:      'Kasar Devi spiritual ridge meditation and integration practice, day eight Himalayan retreat',
    imgOverride: { width: '100%', height: 'auto', objectFit: 'contain' },
  },
  {
    route:  'DAY 9 · KASAR DEVI → DEPARTURE',
    theme:  'The Final Sunrise — Carrying the Mountains Home',
    desc:   'The final morning offers space for gratitude, reflection, and intention-setting before departure.',
    exp:    ['Sunrise yoga session', 'Closing wellness ceremony', 'Personal reflection time', 'Departure transfer to Delhi or Kathgodam'],
    stay:   'Departure day',
    img:         '/images/retreats/kumaon-wellness/final-sunrise-yoga-carrying-mountains-home-day9.webp',
    imgAlt:      'Final sunrise yoga session carrying the mountains home, departure day nine of Himalayan wellness retreat',
    imgOverride: { width: '100%', height: 'auto', objectFit: 'contain' },
  },
]

const INCLUDED = [
  {
    title: 'Accommodation',
    items: [
      '1 Night Premium Lakeside Stay — Bhimtal',
      '6 Nights Premium Mountain Lodge — Munsiyari',
      '1 Night Boutique Heritage Stay — Kasar Devi',
    ],
  },
  {
    title: 'Wellness Experiences',
    items: [
      'Daily Yoga & Pranayama',
      'Guided Meditation Sessions',
      'Ayurvedic Constitution Assessment',
      'Personalised Wellness Consultation',
      'Ayurvedic Abhyanga Treatment',
      'Herbal Steam Therapy',
      'Forest Bathing Experience',
      'Personalised 30-Day Home Practice Guide',
    ],
  },
  {
    title: 'Cultural Experiences',
    items: [
      'Shauka Community Immersion',
      'Artisan Interaction Sessions',
      'Kumaoni Culinary Experiences',
      'Himalayan Storytelling Evenings',
      'Kasar Devi Spiritual Experience',
    ],
  },
  {
    title: 'Dining',
    items: [
      'Daily Breakfast, Lunch & Dinner',
      'Sattvic & Traditional Kumaoni Cuisine',
      'Himalayan Herbal Tea Rituals',
    ],
  },
  {
    title: 'Transport',
    items: [
      'All Internal Transfers',
      'Airport/Railway Transfers',
      'Guided Excursions Throughout',
    ],
  },
]

const NOT_INCLUDED = [
  'International flights to Delhi',
  'Travel insurance (strongly recommended)',
  'Personal expenses and tips',
  'Alcoholic beverages',
]

const IDEAL_FOR = [
  'Wellness Travelers',
  'Yoga Practitioners',
  'Cultural Explorers',
  'Solo Travelers',
  'Couples',
  'Slow Travel Enthusiasts',
  'Photographers',
  'Professionals Seeking Renewal',
]

// ─── Component ────────────────────────────────────────────────────────────────

const KUMAON_WELLNESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Panchachuli Himalayan Wellness & Cultural Immersion Retreat',
  description: 'A 9-day Himalayan wellness retreat combining daily yoga, Ayurvedic treatments, Panchachuli sunrise views, and Shauka cultural immersion in Munsiyari, Kumaon.',
  organizer: {
    '@type': 'Organization',
    name: 'Himalayan Serenity Travel',
    url: 'https://www.himalayanserenitytravel.com',
  },
  location: {
    '@type': 'Place',
    name: 'Munsiyari, Kumaon Himalayas, Uttarakhand',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Munsiyari',
      addressRegion: 'Uttarakhand',
      addressCountry: 'IN',
    },
  },
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  url: 'https://www.himalayanserenitytravel.com/retreats/panchachuli-wellness',
}

export default function KumaonWellness() {
  useSEO({
    title:       'Kumaon Wellness Immersion — Yoga, Ayurveda & Himalayan Culture Retreat | Himalayan Serenity',
    description: 'Luxury yoga & Ayurveda retreat in Kumaon, Uttarakhand. 9 days in Munsiyari — Panchachuli sunrise, Shauka cultural immersion & Ayurvedic massage. Book now.',
    canonical:   'https://www.himalayanserenitytravel.com/retreats/panchachuli-wellness',
    schema:      KUMAON_WELLNESS_SCHEMA,
  })

  const [form, setForm] = useState({
    name: '', country: '', retreat: 'Panchachuli Himalayan Wellness & Cultural Immersion Retreat',
    dates: '', groupSize: '', email: '', message: '',
  })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject:    `Retreat Enquiry — ${form.retreat}`,
        from_name:  form.name,
        name:       form.name,
        email:      form.email,
        country:    form.country,
        retreat:    form.retreat,
        dates:      form.dates,
        group_size: form.groupSize,
        message:    form.message,
        botcheck:   '',
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
      <Navbar activePage="kumaon-wellness" />

      {/* ── SECTION 1 — HERO ─────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen bg-[#0a100d] flex flex-col justify-start overflow-hidden">
        <img
          src="/images/retreats/kumaon-wellness/group-yoga-khaliya-top-panchachuli-himalaya-hero.webp"
          alt="Group yoga at Khaliya Top with Panchachuli peaks, Kumaon Himalaya"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
        <Link to="/" className="relative z-30 block pt-24 pb-4 px-6 lg:px-16 text-sm text-white/50 hover:text-white/80 transition-colors">← Back to Home</Link>
        <div className="relative z-20 px-6 lg:px-16 pb-16">
          <span className="inline-block bg-[#1D9E75]/20 text-[#5DCAA5] text-xs rounded-full px-3 py-1 mb-6">
            Yoga &amp; Ayurveda
          </span>
          <h1 className="font-serif text-[#f0ece4] text-4xl lg:text-5xl leading-tight tracking-tight mb-4">
            Kumaon Wellness Retreat — Yoga, Ayurveda &amp; Himalayan Cultural Immersion
          </h1>
          <p className="font-serif italic text-[#1D9E75] text-xl mb-8">
            Yoga · Ayurveda · Himalayan Culture · Slow Travel · Personal Transformation
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            {['9 Days / 8 Nights', 'Kumaon Himalaya', 'Small Group'].map(stat => (
              <span
                key={stat}
                className="border border-[#1D9E75]/30 rounded-full px-4 py-2 text-sm text-[#f0ece4]/70"
              >
                {stat}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#enquiry"
              className="bg-[#1D9E75] text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-[#0F6E56] transition-colors duration-200"
            >
              Enquire about this retreat
            </a>
            <a
              href="https://wa.me/919084642557"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#1D9E75] text-[#1D9E75] rounded-full px-6 py-3 text-sm font-medium hover:bg-[#1D9E75]/10 transition-colors duration-200"
            >
              Download full itinerary
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — JOURNEY PHILOSOPHY ──────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-5 sm:px-8 py-20">
        <p className="text-[#1D9E75] text-xs uppercase tracking-widest mb-4">Journey Philosophy</p>
        <h2 className="font-serif text-[#f0ece4] text-2xl leading-snug mb-8">
          Most wellness retreats teach you how to practice yoga.
          This journey teaches you how to live differently.
        </h2>
        <div className="space-y-4">
          <p className="text-[#f0ece4]/70 text-sm leading-relaxed">
            Designed for{' '}
            <Link to="/international-retreats" style={{ color: '#1D9E75', textDecoration: 'none' }}>discerning international travelers</Link>,
            this immersive Himalayan retreat combines
            Ayurveda, yoga, meditation, authentic mountain culture, conscious travel, and meaningful
            human connection within one of India's most untouched Himalayan regions. Unlike commercial
            wellness destinations, Kumaon offers silence, authenticity, and a deep sense of place.
          </p>
          <p className="text-[#f0ece4]/70 text-sm leading-relaxed">
            The retreat gradually moves guests from the busy plains of India into the serenity of the
            high Himalaya, before gently returning them to the world renewed, restored, and inspired.
          </p>
        </div>
      </section>

      {/* ── SECTION 3 — ITINERARY ────────────────────────────────────────── */}
      <section className="pb-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-12">
          <p className="text-[#1D9E75] text-xs uppercase tracking-widest mb-4">Itinerary</p>
          <h2 className="font-serif text-[#f0ece4] text-2xl">Your journey day by day</h2>
        </div>

        <div>
          {DAYS.map((day, i) => {
            const isEven = i % 2 === 1
            return (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 border-b border-[#1D9E75]/10 ${isEven ? 'bg-[#0a1510]' : 'bg-[#0d1a0f]'}`}
              >
                {/* Image column */}
                <div
                  className={`h-auto overflow-hidden ${isEven ? 'order-first lg:order-last' : ''}`}
                >
                  {day.imgOverride ? (
                    <img
                      src={day.img}
                      alt={day.imgAlt}
                      loading="lazy"
                      style={day.imgOverride}
                    />
                  ) : (
                    <img
                      src={day.img}
                      alt={day.imgAlt}
                      loading="lazy"
                      className={`w-full h-full object-cover ${day.imgPos ?? ''}`}
                    />
                  )}
                </div>

                {/* Text column */}
                <div
                  className={`px-6 py-8 lg:p-10 xl:p-14 flex flex-col justify-center ${isEven ? 'order-last lg:order-first' : ''}`}
                >
                  <p className="text-[#1D9E75] text-xs font-medium tracking-[0.2em] uppercase mb-2">
                    {day.route}
                  </p>
                  <h3 className="font-serif text-[#f0ece4] text-2xl lg:text-3xl mb-3">
                    {day.theme}
                  </h3>
                  {day.subtitle && (
                    <p className="font-serif italic text-[#1D9E75] text-sm mb-4">{day.subtitle}</p>
                  )}
                  <p className="text-[#f0ece4]/60 text-sm leading-relaxed mb-6">
                    {day.desc}
                  </p>
                  <ul className="space-y-2">
                    {day.exp.map(item => (
                      <li key={item} className="flex items-start gap-2 text-[#f0ece4]/50 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[#1D9E75]/60 text-xs italic mt-6 pt-4 border-t border-[#1D9E75]/10">
                    Overnight: {day.stay}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── ACCENT IMAGE ─────────────────────────────────────────────────── */}
      <div className="w-full h-[50vh] border-t border-b border-[#1D9E75]/20 overflow-hidden">
        <img
          src="/images/retreats/kumaon-wellness/panchachuli-peaks-sunrise-darma-valley-kumaon.webp"
          alt="Panchachuli peaks at sunrise, Darma Valley, Kumaon Himalaya"
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* ── SECTION 4 — WHAT'S INCLUDED ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
        <p className="text-[#1D9E75] text-xs uppercase tracking-widest mb-4">What's Included</p>
        <h2 className="font-serif text-[#f0ece4] text-2xl mb-10">Everything taken care of</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INCLUDED.map(({ title, items }) => (
            <div key={title} className="bg-[#0a1a0a] border border-[#1D9E75]/10 rounded-xl p-6">
              <h3 className="text-[#1D9E75] font-medium text-sm mb-3 uppercase tracking-wide">
                {title}
              </h3>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[#f0ece4]/70 text-sm">
                    <span className="text-[#1D9E75] mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Not Included */}
          <div className="bg-[#0a1a0a] border border-red-900/20 rounded-xl p-6">
            <h3 className="text-red-400/70 font-medium text-sm mb-3 uppercase tracking-wide">
              Not Included
            </h3>
            <ul className="space-y-2">
              {NOT_INCLUDED.map(item => (
                <li key={item} className="flex items-start gap-2 text-[#f0ece4]/50 text-sm">
                  <span className="text-red-400/60 mt-0.5 flex-shrink-0">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — IDEAL FOR ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-20">
        <p className="text-[#1D9E75] text-xs uppercase tracking-widest mb-4">Ideal For</p>
        <h2 className="font-serif text-[#f0ece4] text-2xl mb-8">Who comes on this retreat</h2>
        <div className="flex flex-wrap gap-3">
          {IDEAL_FOR.map(label => (
            <span
              key={label}
              className="bg-[#1D9E75]/10 border border-[#1D9E75]/20 text-[#f0ece4]/70 text-sm rounded-full px-4 py-2"
            >
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* ── SECTION 6 — SIGNATURE PROMISE ───────────────────────────────── */}
      <section className="bg-[#061008] py-16 px-6 text-center">
        <h2 className="font-serif text-[#f0ece4] text-3xl max-w-2xl mx-auto leading-snug">
          This is not a yoga holiday.
        </h2>
        <p className="text-[#f0ece4]/60 text-sm leading-relaxed max-w-2xl mx-auto mt-4">
          It is a thoughtfully curated Himalayan wellness journey where yoga, Ayurveda, culture,
          nature, and human connection come together beneath the sacred Panchachuli peaks —
          creating memories and personal transformation that remain long after the journey ends.
        </p>
      </section>

      {/* ── SECTION 7 — ENQUIRY FORM ─────────────────────────────────────── */}
      <section id="enquiry" className="bg-[#061008] py-16 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-[#f0ece4] text-3xl mb-2">Book your place on this retreat</h2>
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
                type="text" name="name" value={form.name} onChange={handleChange}
                placeholder="Your name" required className={INPUT_CLASS}
              />
              <input
                type="text" name="country" value={form.country} onChange={handleChange}
                placeholder="Your country" required className={INPUT_CLASS}
              />
              <select
                name="retreat" value={form.retreat} onChange={handleChange}
                required className={`${INPUT_CLASS} bg-[#0d1a0d]`}
              >
                <option value="" disabled>Which retreat?</option>
                <option>Panchachuli Himalayan Wellness &amp; Cultural Immersion Retreat</option>
                <option>{"Women's Sacred Himalaya Retreat"}</option>
                <option>The Borderlands of the Himalaya</option>
                <option>Darma Valley Digital Detox</option>
                <option>Not sure yet — help me choose</option>
              </select>
              <input
                type="text" name="dates" value={form.dates} onChange={handleChange}
                placeholder="e.g. October 2026" className={INPUT_CLASS}
              />
              <select
                name="groupSize" value={form.groupSize} onChange={handleChange}
                required className={`${INPUT_CLASS} bg-[#0d1a0d]`}
              >
                <option value="" disabled>Group size</option>
                <option>Solo</option>
                <option>2 people</option>
                <option>3–4 people</option>
                <option>5–6 people</option>
                <option>Larger group</option>
              </select>
              <input
                type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="Your email address" required className={INPUT_CLASS}
              />
              <textarea
                name="message" value={form.message} onChange={handleChange}
                placeholder="Any questions or special requirements?"
                rows={4} className={`${INPUT_CLASS} resize-none`}
              />

              {status === 'error' && (
                <p className="text-red-400 text-xs">
                  Something went wrong. Please try again or WhatsApp us directly.
                </p>
              )}

              <button
                type="submit" disabled={status === 'loading'}
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
