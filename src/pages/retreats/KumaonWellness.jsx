import EnquiryPrivacy from '../../components/EnquiryPrivacy'
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../../hooks/useSEO'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { RetreatAccommodation, RetreatOverview } from '../../components/RetreatDetails'
import { PANCHACHULI_WELLNESS, retreatDuration } from '../../data/retreats'

const WEB3FORMS_ACCESS_KEY = 'a4bcce53-4a1d-4217-93b6-30b9d714bbdd'

const INPUT_CLASS =
  'bg-white/5 border border-[#1D9E75]/20 rounded-lg px-4 py-3 text-[#f0ece4] text-base sm:text-sm min-w-0 w-full focus:outline-none focus:border-[#1D9E75]/60 placeholder:text-white/20'

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
    route:  'DAY 2 · PITHORAGARH → MUNSIYARI',
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
    stay:   'Pithoragarh',
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

// Display the photography within existing composite assets, leaving their originals intact.
// Each fraction stops before the right-hand infographic. Day six is already text-free.
const PHOTO_WIDTHS = [0.635, 0.625, 0.61, 0.59, 0.645, null, 0.625, 0.61, 0.61]

const INCLUDED = [
  {
    title: 'Accommodation',
    items: [
      ...PANCHACHULI_WELLNESS.stays.map(stay => `${stay.nights} ${stay.nights === 1 ? 'night' : 'nights'} — ${stay.destination}`),
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
      'Shauka Community Immersion (Village Tour)',
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

const DEPARTURES = [
  { month: 'November 2026', dates: '20 November – 28 November 2026' },
  { month: 'December 2026', dates: '4 December – 12 December 2026' },
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
  '@type': 'Product',
  name: 'Panchachuli Himalayan Wellness & Cultural Immersion Retreat',
  description: 'A 9-day / 8-night Himalayan wellness retreat through Pithoragarh, Munsiyari and Kasar Devi, with yoga, Ayurveda and Kumaon culture. Provisional starting price: €1,400 per person, subject to final supplier costing.',
  image: 'https://www.himalayanserenitytravel.com/images/retreats/kumaon-wellness/group-yoga-khaliya-top-panchachuli-himalaya-hero.webp',
  brand: {
    '@type': 'Organization',
    name: 'Himalayan Serenity Travel',
    url: 'https://www.himalayanserenitytravel.com',
  },
  offers: {
    '@type': 'Offer',
    url: 'https://www.himalayanserenitytravel.com/retreats/panchachuli-wellness',
    seller: {
      '@type': 'Organization',
      name: 'Himalayan Serenity Travel',
    },
  },
}

export default function KumaonWellness() {
  useSEO({
    title:       'Panchachuli Wellness Retreat — Yoga & Ayurveda | Himalayan Serenity Travel',
    description: 'Panchachuli Wellness Retreat: 9 days / 8 nights through Pithoragarh, Munsiyari and Kasar Devi. From €1,400 per person, subject to final supplier costing.',
    canonical:   'https://www.himalayanserenitytravel.com/retreats/panchachuli-wellness',
    schema:      KUMAON_WELLNESS_SCHEMA,
  })

  const [form, setForm] = useState({
    name: '', country: '', retreat: 'Panchachuli Himalayan Wellness & Cultural Immersion Retreat',
    dates: '', groupSize: '', email: '', message: '',
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
    } finally {
      submissionInFlight.current = false
    }
  }

  return (
    <div data-retreat-detail className="min-h-screen bg-[#0a100d] pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0">
      <Navbar activePage="kumaon-wellness" />

      {/* ── SECTION 1 — HERO ─────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen bg-[#0a100d] flex flex-col justify-start overflow-hidden">
        <img
          src="/images/retreats/kumaon-wellness/group-yoga-khaliya-top-panchachuli-himalaya-hero.webp"
          alt="Group yoga at Khaliya Top with Panchachuli peaks, Kumaon Himalaya"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
        <Link to="/" className="relative z-30 block pt-24 pb-4 px-6 lg:px-16 text-sm text-white/50 hover:text-white/80 transition-colors">← Back to Home</Link>
        <div className="relative z-20 px-6 lg:px-16 pb-16">
          <span className="inline-block bg-[#1D9E75]/20 text-[#5DCAA5] text-xs rounded-full px-3 py-1 mb-6">
            Yoga &amp; Ayurveda
          </span>
          <h1 className="font-serif text-[#f0ece4] text-4xl lg:text-5xl leading-tight tracking-tight mb-4">
            {PANCHACHULI_WELLNESS.name}
          </h1>
          <p className="font-serif italic text-[#1D9E75] text-xl mb-8">
            Yoga · Ayurveda · Himalayan Culture · Slow Travel · Personal Transformation
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            {[retreatDuration(PANCHACHULI_WELLNESS), 'Kumaon Himalaya', 'Small Group'].map(stat => (
              <span
                key={stat}
                className="border border-[#1D9E75]/30 rounded-full px-4 py-2 text-sm text-[#f0ece4]/70"
              >
                {stat}
              </span>
            ))}
          </div>
          <RetreatOverview retreat={PANCHACHULI_WELLNESS} />
          <div className="flex flex-wrap gap-4">
            <a
              href="#enquiry"
              className="bg-[#1D9E75] text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-[#0F6E56] transition-colors duration-200"
            >
              Enquire About This Retreat
            </a>
            <a
              href="https://wa.me/919084642557"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#1D9E75] text-[#1D9E75] rounded-full px-6 py-3 text-sm font-medium hover:bg-[#1D9E75]/10 transition-colors duration-200"
            >
              Speak With Our Team
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

      {/* ── SECTION 3 — UPCOMING DEPARTURES ─────────────────────────────── */}
      <section className="bg-[#061008] py-20 px-6 border-t border-[#C9A84C]/8">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <p
            className="font-sans uppercase tracking-widest mb-3"
            style={{ fontSize: 10, letterSpacing: '0.22em', color: '#C9A84C' }}
          >
            2026 Season
          </p>
          <h2 className="font-serif text-[#f0ece4] text-3xl lg:text-4xl mb-3">
            Upcoming Departures — November &amp; December 2026
          </h2>
          <p className="text-[#f0ece4]/40 text-sm mb-14">
            9 days / 8 nights · Small groups of 6 to 8 guests
          </p>

          {/* Departure rows */}
          <div>
            {DEPARTURES.map((dep, i) => (
              <div key={i}>
                {i > 0 && (
                  <div style={{ borderTop: '1px solid rgba(201,168,76,0.10)' }} />
                )}
                <div className="flex items-center justify-between gap-6 py-8 flex-wrap sm:flex-nowrap">

                  {/* Left — month + date range */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-sans uppercase mb-2"
                      style={{ fontSize: 10, letterSpacing: '0.22em', color: '#C9A84C' }}
                    >
                      {dep.month}
                    </p>
                    <p className="font-serif text-[#f0ece4] text-xl lg:text-2xl leading-tight">
                      {dep.dates}
                    </p>
                  </div>

                  {/* Right — availability dot + enquire button */}
                  <div className="flex items-center gap-5 flex-shrink-0">
                    <span className="flex items-center gap-2 font-sans text-[#f0ece4]/45"
                      style={{ fontSize: 11 }}>
                      <span
                        className="rounded-full flex-shrink-0"
                        style={{ width: 7, height: 7, backgroundColor: '#1D9E75' }}
                      />
                      Enquire About Availability
                    </span>
                    <Link
                      to="/contact"
                      className="font-sans transition-colors duration-200"
                      style={{
                        fontSize:        11,
                        letterSpacing:   '0.14em',
                        textTransform:   'uppercase',
                        color:           '#C9A84C',
                        border:          '1px solid rgba(201,168,76,0.35)',
                        borderRadius:    999,
                        padding:         '9px 22px',
                        textDecoration:  'none',
                        whiteSpace:      'nowrap',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(201,168,76,0.08)')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      Enquire
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p
            className="font-sans text-center mt-10"
            style={{ fontSize: 11, color: 'rgba(240,236,228,0.25)', letterSpacing: '0.04em' }}
          >
            We recommend enquiring at least 8–12 weeks in advance · All dates subject to availability
          </p>

        </div>
      </section>

      {/* ── SECTION 4 — ITINERARY ────────────────────────────────────────── */}
      <section className="pb-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-12">
          <p className="text-[#1D9E75] text-xs uppercase tracking-widest mb-4">Itinerary</p>
          <h2 className="font-serif text-[#f0ece4] text-2xl">Your journey day by day</h2>
          <nav aria-label="Jump to itinerary day" className="flex flex-wrap gap-2 mt-6">
            {DAYS.map((day, i) => <a key={day.route} href={`#day-${i + 1}`} className="inline-flex min-h-11 items-center border border-white/15 rounded-full px-4 py-2 text-sm text-[#f0ece4]/80 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5DCAA5]">Day {i + 1}</a>)}
          </nav>
        </div>

        <div>
          {DAYS.map((day, i) => {
            const isEven = i % 2 === 1
            return (
              <div
                key={i}
                id={`day-${i + 1}`}
                className={`scroll-mt-24 grid grid-cols-1 lg:grid-cols-2 border-b border-[#1D9E75]/10 ${isEven ? 'bg-[#0a1510]' : 'bg-[#0d1a0f]'}`}
              >
                {/* Image column */}
                <div
                  className={`relative aspect-[4/3] w-full overflow-hidden self-center ${isEven ? 'order-first lg:order-last' : ''}`}
                >
                  <img
                    src={day.img}
                    alt={day.imgAlt}
                    loading="lazy"
                    className={PHOTO_WIDTHS[i] ? 'absolute top-0 left-0 h-auto max-w-none' : 'w-full h-full object-cover'}
                    style={PHOTO_WIDTHS[i] ? { width: `${100 / PHOTO_WIDTHS[i]}%` } : undefined}
                  />
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
                  <p className="text-[#f0ece4]/75 text-base leading-7 mb-6">
                    {day.desc}
                  </p>
                  <ul className="space-y-2">
                    {day.exp.map(item => (
                      <li key={item} className="flex items-start gap-2 text-[#f0ece4]/75 text-base leading-7">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-[#5DCAA5] text-sm italic mt-6 pt-4 border-t border-[#1D9E75]/10">
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

      <RetreatAccommodation retreat={PANCHACHULI_WELLNESS} />

      {/* ── SECTION 5 — WHAT'S INCLUDED ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
        <p className="text-[#1D9E75] text-xs uppercase tracking-widest mb-4">What's Included</p>
        <h2 className="font-serif text-[#f0ece4] text-2xl mb-4">Inclusions &amp; exclusions</h2>
        <p className="text-[#f0ece4]/70 text-sm leading-relaxed max-w-2xl mb-10">The details below reflect the current itinerary. Final arrangements and inclusions will be confirmed in your personalised quotation.</p>

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

      {/* ── SECTION 6 — IDEAL FOR ────────────────────────────────────────── */}
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

      {/* ── SECTION 7 — SIGNATURE PROMISE ───────────────────────────────── */}
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

      {/* ── SECTION 8 — ENQUIRY FORM ─────────────────────────────────────── */}
      <section id="enquiry" className="scroll-mt-24 bg-[#061008] py-16 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-[#f0ece4] text-3xl mb-2">Enquire About This Retreat</h2>
          <p className="text-sm text-[#f0ece4]/75 mb-4">
            Share your preferences and questions below.
          </p>

          <nav aria-label="Travel planning information" className="flex flex-wrap gap-x-5 gap-y-1 mb-4 text-sm text-[#f0ece4]/85">
            <a href="#day-1" className="inline-flex min-h-11 items-center underline underline-offset-4">Arrival day</a>
            <a href="#day-9" className="inline-flex min-h-11 items-center underline underline-offset-4">Departure day</a>
            <a href="#accommodation-heading" className="inline-flex min-h-11 items-center underline underline-offset-4">Accommodation overview</a>
          </nav>

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
                type="text" name="name" value={form.name} onChange={handleChange}
                placeholder="Your full name" required className={INPUT_CLASS}
              />
              <label htmlFor="enquiry-country" className="block text-sm text-[#f0ece4]/85">Country of residence</label>
              <input id="enquiry-country" autoComplete="country-name"
                type="text" name="country" value={form.country} onChange={handleChange}
                placeholder="Your country" required className={INPUT_CLASS}
              />
              <label htmlFor="enquiry-retreat" className="block text-sm text-[#f0ece4]/85">Retreat or journey of interest</label>
              <select id="enquiry-retreat"
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
              <label htmlFor="enquiry-dates" className="block text-sm text-[#f0ece4]/85">Preferred departure date (optional)</label>
              <input id="enquiry-dates"
                type="text" name="dates" value={form.dates} onChange={handleChange}
                placeholder="e.g. November 2026" className={INPUT_CLASS}
              />
              <label htmlFor="enquiry-groupSize" className="block text-sm text-[#f0ece4]/85">Number of travellers</label>
              <select id="enquiry-groupSize"
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
              <label htmlFor="enquiry-email" className="block text-sm text-[#f0ece4]/85">Email address</label>
              <input id="enquiry-email" autoComplete="email"
                type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="Your email address" required className={INPUT_CLASS}
              />
              <label htmlFor="enquiry-message" className="block text-sm text-[#f0ece4]/85">Additional questions (optional)</label>
              <p id="enquiry-message-hint" className="text-xs text-[#f0ece4]/75 leading-relaxed">You can share dietary or room preferences and questions about travel connections here.</p>
              <textarea id="enquiry-message" aria-describedby="enquiry-message-hint"
                name="message" value={form.message} onChange={handleChange}
                placeholder="Any questions or special requirements?"
                rows={4} className={`${INPUT_CLASS} resize-none`}
              />

              {status === 'error' && (
                <p role="alert" className="text-red-400 text-sm">
                  Something went wrong. Please try again or WhatsApp us directly.
                </p>
              )}

              <button
                type="submit" disabled={status === 'loading'}
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
