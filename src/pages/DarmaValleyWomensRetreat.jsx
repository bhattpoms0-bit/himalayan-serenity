import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'
import Footer from '../components/Footer'

const WEB3FORMS_ACCESS_KEY = 'a4bcce53-4a1d-4217-93b6-30b9d714bbdd'

const INPUT_CLASS =
  'bg-white/5 border border-amber-400/20 rounded-lg px-4 py-3 text-[#f0ece4] text-sm w-full focus:outline-none focus:border-amber-400/60 placeholder:text-white/20'

// ─── Data ─────────────────────────────────────────────────────────────────────

const DAYS = [
  {
    route:  'DAY 1 · DELHI → PITHORAGARH',
    theme:  'Entering the Himalaya Slowly',
    badge:  'Arrival Day',
    desc:   'Arriving into stillness. A scenic Himalayan welcome with a herbal tea ritual, sunset walk at Chandak viewpoint, and an opening wellness circle to set the tone and shared intentions for the journey ahead.',
    sigExp: 'Welcome herbal tea ceremony followed by an opening women\'s wellness circle — setting intentions and creating the sisterhood that will carry you through the retreat.',
    exp:    [
      'Scenic Himalayan arrival — flight, train, or private SUV',
      'Welcome herbal tea ritual',
      'Chandak sunset viewpoint walk',
      'Opening women\'s wellness circle',
    ],
    stay:   'Heritage Stay, Pithoragarh',
    img:    '/images/darma-valley-womens-retreat/day1-pithoragarh-sunset.jpg',
    imgAlt: 'Sunset over Pithoragarh valley, arrival day of the Darma Valley Women\'s Himalayan Retreat',
  },
  {
    route:  'DAY 2 · PITHORAGARH — FOREST HEALING',
    theme:  'Forest Healing & Breathwork',
    badge:  'Wellness Day',
    desc:   'A full day of mindful Himalayan living — sunrise yoga, guided breathwork, a forest mindfulness walk, and a journaling workshop. A digital detox afternoon creates space for genuine rest and nervous system renewal before the deeper journey begins.',
    sigExp: 'Journaling under ancient deodar trees with a guided reflection practice — creating space for intentions to form before you leave the foothills behind.',
    exp:    [
      'Sunrise yoga session',
      'Guided breathwork',
      'Forest mindfulness walk',
      'Himalayan herbal tea ritual',
      'Journaling workshop',
      'Digital detox afternoon',
    ],
    stay:   'Heritage Stay, Pithoragarh',
    img:    '/images/darma-valley-womens-retreat/day2-darma-valley-gorge.jpg',
    imgAlt: 'Forested Himalayan valley near Pithoragarh, forest healing wellness day on the Darma Valley Women\'s Retreat',
  },
  {
    route:  'DAY 3 · PITHORAGARH → DHARCHULA',
    theme:  'Along the Sacred Kali River',
    badge:  'Signature Experience',
    desc:   'A scenic drive through the Kali River valley along the Indo-Nepal corridor — one of India\'s most cinematic mountain roads. Riverside meditation at the Jauljibi confluence and a bonfire storytelling evening beside the mountain river.',
    sigExp: 'Riverside meditation session at the Jauljibi confluence — where two rivers meet in the heart of the mountains. A natural pause before the hidden valley opens ahead.',
    exp:    [
      'Scenic Kali River valley drive',
      'Jauljibi confluence stop',
      'Riverside meditation session',
      'Slow Himalayan exploration',
      'Bonfire storytelling evening',
    ],
    stay:   'Mountain Stay, Dharchula',
    img:    '/images/darma-valley-womens-retreat/day3-dugtu-village.jpg',
    imgAlt: 'Himalayan village along the Kali River valley corridor, Day 3 of the Darma Valley Women\'s Retreat',
  },
  {
    route:  'DAY 4 · DHARCHULA → DARMA VALLEY',
    theme:  'Into the Hidden Himalaya',
    badge:  'Signature Experience',
    desc:   'Disconnect to reconnect. A slow expedition into the remote Darma Valley — glacier-fed river landscapes, Himalayan silence, and ancient village stops through one of Eastern Kumaon\'s most hidden and beautiful corridors.',
    sigExp: 'First views of the Panchachuli massif rising above the valley — five sacred peaks revered by the Rang people as the cooking fires of the Pandavas, seen from within the valley itself.',
    exp:    [
      'Scenic valley expedition',
      'Glacier-fed river landscapes',
      'Himalayan silence immersion',
      'Panchachuli massif views',
      'Ancient Rang village stops',
    ],
    stay:   'Retreat Camp / Boutique Homestay, Darma Valley',
    img:    '/images/darma-valley-womens-retreat/day4-woman-trekking.jpg',
    imgAlt: 'Woman trekking through Darma Valley with Panchachuli peaks in the distance, Eastern Kumaon Himalaya',
  },
  {
    route:  'DAY 5 · DARMA VALLEY — SISTERHOOD CIRCLE',
    theme:  'The Heart of the Retreat',
    badge:  'Emotional Heart of the Journey',
    desc:   'The heart of the retreat. Sunrise yoga, guided meditation, breathwork and grounding exercises, a women\'s sharing circle, and riverside mindfulness sessions create space for emotional calm, nervous-system reset, and meaningful human connection.',
    sigExp: 'Women\'s Sharing Circle held in the open valley — a guided, safe space for reflection, personal stories, and genuine connection beneath the Himalayan peaks.',
    exp:    [
      'Sunrise yoga session',
      'Guided meditation',
      'Breathwork and grounding exercises',
      'Women\'s sharing circle',
      'Riverside mindfulness session',
      'Slow mountain walks',
    ],
    stay:   'Retreat Camp / Boutique Homestay, Darma Valley',
    img:    '/images/darma-valley-womens-retreat/day5-mountain-highway.jpg',
    imgAlt: 'Mountain landscape in Darma Valley, sisterhood circle day of the women\'s Himalayan retreat',
  },
  {
    route:  'DAY 6 · DARMA VALLEY — RANG CULTURE & CHAUKORI',
    theme:  'Living Traditions of the Rang People',
    badge:  'Cultural Immersion Day',
    desc:   'A profound cultural immersion day exploring resilience, wisdom, and community through the living traditions of the Rang people of Darma Valley. Traditional cooking, interaction with local women, folk songs, and an evening journey to Chaukori for its legendary Himalayan panorama.',
    sigExp: 'Traditional Rang cooking session followed by an evening journey to Chaukori — the renowned viewpoint with its sweeping sunset panorama of Panchachuli, Nanda Devi East, and the full Kumaon range.',
    exp:    [
      'Traditional Himalayan cooking session',
      'Interaction with local Rang women',
      'Cultural storytelling evening',
      'Folk songs and local traditions',
      'Chaukori panoramic viewpoint',
      'Sunset over Panchachuli peaks',
    ],
    stay:   'Tea Garden Retreat, Chaukori',
    img:    '/images/darma-valley-womens-retreat/day6-chaukori-panorama.jpg',
    imgAlt: 'Panoramic sunset view from Chaukori with Panchachuli peaks, cultural day on the Darma Valley Women\'s Retreat',
  },
  {
    route:  'DAY 7 · CHAUKORI → PITHORAGARH → DEPARTURE',
    theme:  'Carrying the Mountains Home',
    badge:  'Closing Circle',
    desc:   'A gentle scenic return through Kumaon — reflection journaling, a wellness café morning, and a closing bonfire ceremony to mark the end of the retreat. Departures by evening according to each guest\'s selected travel style.',
    sigExp: 'Closing women\'s bonfire ceremony at sunset — a sacred circle marking the end of the journey, held in the Himalayan foothills before departure.',
    exp:    [
      'Scenic Kumaon return drive',
      'Reflection journaling session',
      'Wellness café morning',
      'Closing women\'s bonfire ceremony',
      'Flexible departure options',
    ],
    stay:   'Departure Day — Delhi by overnight journey',
    img:    '/images/darma-valley-womens-retreat/day7-pithoragarh-valley.jpg',
    imgAlt: 'Pithoragarh valley panorama at sunset, final day of the Darma Valley Women\'s Himalayan Retreat',
  },
]

const WHY_ITEMS = [
  {
    title: 'Women-only departures',
    text:  'Maximum 10 women per departure — creating genuine safety, sisterhood, and space for honest connection that mixed-group travel rarely allows.',
  },
  {
    title: 'Remote Himalayan access',
    text:  'Darma Valley is one of India\'s most remote and beautiful corridors — few travelers ever reach it, and we know every part of it deeply.',
  },
  {
    title: 'Daily yoga in sacred landscapes',
    text:  'Every morning begins with sunrise yoga in open Himalayan landscapes — places most yoga studios can only dream of.',
  },
  {
    title: 'Rang tribal cultural immersion',
    text:  'Intimate access to the living culture and traditions of the Rang people — their cooking, folk songs, and seasonal wisdom.',
  },
  {
    title: 'Dedicated female coordinator',
    text:  'A dedicated female retreat coordinator accompanies every departure — for safety, support, and guidance at every step of the journey.',
  },
  {
    title: 'Journey AND retreat in one',
    text:  'Not a static resort retreat — a moving journey through some of India\'s most cinematic Himalayan landscapes, with wellness woven into every day.',
  },
]

const INCLUDED = [
  {
    title: 'Accommodation',
    items: [
      'Heritage Stay — Pithoragarh (2 nights)',
      'Mountain Stay — Dharchula (1 night)',
      'Retreat Camp / Boutique Homestay — Darma Valley (2 nights)',
      'Tea Garden Retreat — Chaukori (1 night)',
    ],
  },
  {
    title: 'Wellness & Cultural Experiences',
    items: [
      'Opening and closing women\'s wellness circle',
      'Daily sunrise yoga sessions',
      'Guided breathwork and meditation',
      'Riverside meditation — Jauljibi confluence',
      'Women\'s sharing circle — Darma Valley',
      'Traditional Rang cooking session',
      'Cultural storytelling evening',
      'Folk songs and local traditions',
      'Chaukori panoramic viewpoint visit',
      'Digital detox afternoon',
    ],
  },
  {
    title: 'Meals & Logistics',
    items: [
      'Daily breakfast and dinner throughout',
      'All internal transportation',
      'Dedicated female retreat coordinator',
      'Airport and railway transfers',
      'Pre-departure support and briefing',
      '24/7 operational support',
    ],
  },
]

const NOT_INCLUDED = [
  'Flights or trains to Pithoragarh (we advise on best options)',
  'Travel insurance (strongly recommended)',
  'Personal expenses and beverages',
  'Camera and drone permits',
  'GST and applicable taxes',
]

const IDEAL_FOR = [
  'Solo women travelers',
  'Wellness seekers',
  'Mindful explorers',
  'Friends traveling together',
  'Women seeking sisterhood',
  'Culturally curious travelers',
  'Women on a digital detox',
]

// ─── Schema ───────────────────────────────────────────────────────────────────

const DARMA_WOMENS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: "Darma Valley Women's Retreat",
  description: "A 7-day women-only retreat through Darma Valley, Panchachuli Base Camp and Chaukori in the Kumaon Himalayas. Sisterhood, friendship and the sacred Himalaya. Maximum 10 women. From ₹74,900.",
  image: 'https://www.himalayanserenitytravel.com/images/darma-valley-womens-retreat/woman-traveler-himalayan-mountain-sunset.webp',
  brand: {
    '@type': 'Organization',
    name: 'Himalayan Serenity Travel',
    url: 'https://www.himalayanserenitytravel.com',
  },
  offers: {
    '@type': 'Offer',
    url: 'https://www.himalayanserenitytravel.com/packages/darma-valley-womens-retreat',
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Himalayan Serenity Travel',
    },
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DarmaValleyWomensRetreat() {
  useSEO({
    title:       "Darma Valley Women's Retreat 2026 | 7 Days · Panchachuli · Chaukori | Himalayan Serenity Travel",
    description: 'A 7-day women-only retreat through Darma Valley, Panchachuli Base Camp and Chaukori in the Kumaon Himalayas. Sisterhood, friendship and the sacred Himalaya. Maximum 10 women. From ₹74,900.',
    canonical:   'https://www.himalayanserenitytravel.com/packages/darma-valley-womens-retreat',
    schema:      DARMA_WOMENS_SCHEMA,
  })

  const [form, setForm] = useState({
    name: '', country: '', retreat: "Darma Valley Women's Retreat",
    dates: '', groupSize: '', heardFrom: '', email: '', message: '',
  })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const payload = {
        access_key:  WEB3FORMS_ACCESS_KEY,
        subject:     `Retreat Enquiry — ${form.retreat}`,
        from_name:   form.name,
        name:        form.name,
        email:       form.email,
        country:     form.country,
        retreat:     form.retreat,
        dates:       form.dates,
        group_size:  form.groupSize,
        heard_from:  form.heardFrom,
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
    <div className="min-h-screen bg-[#0a0d14]">

      {/* ── SECTION 1 — HERO ─────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen bg-[#080a12] flex flex-col justify-start overflow-hidden">
        <img
          src="/images/darma-valley-womens-retreat/woman-traveler-himalayan-mountain-sunset.webp"
          alt="Woman traveler at Himalayan mountain sunset, Darma Valley women's retreat, Eastern Kumaon"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
        <Link to="/" className="relative z-30 block pt-24 pb-4 px-6 lg:px-16 text-sm text-white/50 hover:text-white/80 transition-colors">← Back to Home</Link>
        <div className="relative z-20 px-6 lg:px-16 pb-16">
          <h1 className="font-serif text-[#f0ece4] text-4xl lg:text-6xl font-normal leading-tight mb-3">
            Darma Valley Women's Retreat — 7 Days in the Sacred Kumaon Himalaya
          </h1>
          <p className="font-serif italic text-amber-400 text-xl mb-3">
            Sisterhood · Yoga · Wild Himalaya · Slow Travel
          </p>
          <p className="text-[#f0ece4]/60 text-sm mb-6 max-w-xl">
            A women-only retreat through Darma Valley, Panchachuli Base Camp, and Chaukori —
            a safe, slow, and deeply restorative Himalayan journey for a maximum of 10 women.
          </p>
          <div className="mb-8">
            {['7 Days / 6 Nights', 'Eastern Kumaon', 'Max 10 Women'].map(stat => (
              <span
                key={stat}
                className="border border-white/20 rounded-full px-4 py-2 text-sm text-[#f0ece4]/70 mr-3 mb-3 inline-block"
              >
                {stat}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#enquiry"
              className="bg-amber-700 text-white rounded-full px-6 py-3 mr-3 text-sm font-medium hover:bg-amber-800 transition-colors duration-200"
            >
              Enquire about this retreat
            </a>
            <a
              href="https://wa.me/919084642557"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/40 text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-white/5 transition-colors duration-200"
            >
              Download full itinerary
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — OPENING STATEMENT ───────────────────────────────── */}
      <section className="bg-[#0a0d14] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-400 text-xs uppercase tracking-widest mb-6">
            A Women-Only Himalayan Journey
          </p>
          <h2 className="font-serif text-[#f0ece4] text-2xl lg:text-3xl font-normal leading-relaxed mb-8 italic">
            "More than a holiday — a meaningful Himalayan retreat
            centred around sisterhood, wellness, and the sacred mountains."
          </h2>
          <p className="text-[#f0ece4]/60 text-sm leading-relaxed max-w-2xl mx-auto mb-4 text-left">
            Unlike conventional group tours or commercial yoga retreats, this journey has been
            intentionally designed as a safe, slow, and deeply restorative Himalayan retreat for
            women — blending yoga, cultural immersion, emotional wellbeing, and cinematic slow travel.
          </p>
          <p className="text-[#f0ece4]/60 text-sm leading-relaxed max-w-2xl mx-auto mb-4 text-left">
            The route takes you from Pithoragarh through the sacred Kali River corridor to
            Darma Valley — one of Eastern Kumaon's most hidden and untouched Himalayan landscapes —
            before returning via the legendary Panchachuli viewpoint at Chaukori.
          </p>
          <p className="font-serif italic text-amber-400 text-lg text-center mt-6">
            A rare, women-only experience designed to leave you rested, reconnected, and renewed.
          </p>
        </div>
      </section>

      {/* ── SECTION 3 — WHY THIS RETREAT STANDS APART ───────────────────── */}
      <section className="bg-[#0a0d14] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-amber-400 text-xs uppercase tracking-widest mb-4">
            Why This Retreat Stands Apart
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_ITEMS.map(({ title, text }) => (
              <div key={title} className="bg-[#14100a] border border-amber-400/10 rounded-xl p-5">
                <h3 className="font-sans font-medium text-[#f0ece4] text-sm mb-2">{title}</h3>
                <p className="text-[#f0ece4]/50 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — ITINERARY ────────────────────────────────────────── */}
      <section className="pb-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-12">
          <p className="text-amber-400 text-xs uppercase tracking-widest mb-4">Itinerary</p>
          <h2 className="font-serif text-[#f0ece4] text-2xl">Your journey day by day</h2>
        </div>

        <div>
          {DAYS.map((day, i) => {
            const isEven = i % 2 === 1
            return (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-[60%_40%] border-b border-amber-400/10 ${isEven ? 'bg-[#100d14]' : 'bg-[#14100a]'}`}
              >
                {/* Image column */}
                <div className={`overflow-hidden ${isEven ? 'order-first lg:order-last' : ''}`}>
                  <div className="w-full h-auto">
                    <img
                      src={day.img}
                      alt={day.imgAlt}
                      loading="lazy"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>

                {/* Text column */}
                <div className={`px-6 py-8 lg:p-10 xl:p-14 flex flex-col justify-center ${isEven ? 'order-last lg:order-first' : ''}`}>
                  <p className="text-amber-400 text-xs font-medium tracking-[0.2em] uppercase mb-2">
                    {day.route}
                  </p>
                  <h3 className="font-serif text-[#f0ece4] text-2xl lg:text-3xl mb-3">
                    {day.theme}
                  </h3>
                  <span className="inline-block self-start bg-amber-900/30 text-amber-400 text-xs px-3 py-1 rounded-full mb-4">
                    {day.badge}
                  </span>
                  <p className="text-[#f0ece4]/60 text-sm leading-relaxed mb-4">
                    {day.desc}
                  </p>
                  {day.sigExp && (
                    <p className="text-amber-400/70 text-xs italic leading-relaxed border-l-2 border-amber-400/30 pl-3 mb-4">
                      {day.sigExp}
                    </p>
                  )}
                  <ul className="space-y-2">
                    {day.exp.map(item => (
                      <li key={item} className="flex items-start gap-2 text-[#f0ece4]/50 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-amber-400/60 text-xs italic mt-6 pt-4 border-t border-amber-400/10">
                    Overnight: {day.stay}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── SECTION 5 — SAFETY & WOMEN-FIRST NOTE ───────────────────────── */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 my-16">
        <div className="bg-[#14100a] border border-amber-400/20 rounded-2xl py-12 px-6">
          <p className="text-amber-400 text-xs uppercase tracking-widest mb-3">
            Women's Safety Commitment
          </p>
          <h2 className="font-serif text-[#f0ece4] text-xl mb-4">
            Safe, Slow &amp; Deeply Considered
          </h2>
          <p className="text-[#f0ece4]/60 text-sm leading-relaxed">
            Every aspect of this retreat has been designed with women's safety and comfort as the
            primary consideration — safe daytime-only travel, women-friendly accommodations,
            an experienced female retreat coordinator, and a small, intimate group of maximum
            10 women. You will never feel rushed, unsafe, or alone.
          </p>
        </div>
      </div>

      {/* ── SECTION 6 — ACCENT BREAK ─────────────────────────────────────── */}
      <div className="bg-[#080a12] py-16 px-6 text-center">
        <p className="font-serif italic text-amber-400/30 text-2xl">· · ·</p>
      </div>

      {/* ── SECTION 7 — WHAT'S INCLUDED ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
        <p className="text-amber-400 text-xs uppercase tracking-widest mb-4">{"What's Included"}</p>
        <h2 className="font-serif text-[#f0ece4] text-2xl lg:text-3xl mb-10">Everything taken care of</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INCLUDED.map(({ title, items }) => (
            <div key={title} className="bg-[#14100a] border border-amber-400/10 rounded-xl p-6">
              <h3 className="text-amber-400 font-medium text-sm mb-3 uppercase tracking-wide">
                {title}
              </h3>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[#f0ece4]/70 text-sm">
                    <span className="text-amber-400 mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-[#14100a] border border-red-900/20 rounded-xl p-6">
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

      {/* ── SECTION 8 — IDEAL FOR ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-20">
        <p className="text-amber-400 text-xs uppercase tracking-widest mb-4">Ideal For</p>
        <h2 className="font-serif text-[#f0ece4] text-2xl mb-8">Who joins this retreat</h2>
        <div className="flex flex-wrap gap-3">
          {IDEAL_FOR.map(label => (
            <span
              key={label}
              className="bg-amber-900/20 border border-amber-400/20 text-[#f0ece4]/70 text-sm rounded-full px-4 py-2"
            >
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* ── SECTION 9 — PRICING ──────────────────────────────────────────── */}
      <section className="bg-[#080a12] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-amber-400 text-xs uppercase tracking-widest mb-4">Pricing</p>
          <h2 className="font-serif text-[#f0ece4] text-3xl mb-6">From ₹74,900 per person</h2>
          <p className="text-[#f0ece4]/60 text-sm leading-relaxed max-w-xl mx-auto mb-4">
            Based on twin sharing. Available departures May–June and September–October 2026.
            Price varies by departure date, arrival style, and single-supplement preference.
          </p>
          <p className="font-serif italic text-amber-400 text-lg mt-6">
            Enquire for exact dates and pricing for your preferred departure.
          </p>
        </div>
      </section>

      {/* ── SECTION 10 — CLOSING STATEMENT ──────────────────────────────── */}
      <section className="bg-[#080a12] py-12 px-6 text-center border-t border-amber-400/10">
        <h2 className="font-serif text-[#f0ece4] text-3xl max-w-2xl mx-auto">
          The valley is waiting.
        </h2>
        <p className="text-[#f0ece4]/60 text-sm leading-relaxed max-w-2xl mx-auto mt-6 text-left">
          This is not a group tour. It is a carefully curated women's journey into one of the
          Himalaya's most hidden and beautiful valleys — where silence, sisterhood, and the
          sacred mountains create something that is very difficult to describe, and impossible
          to forget.
        </p>
        <p className="font-serif italic text-amber-400 text-xl text-center mt-10">
          Safe. Slow. Deeply restorative.
        </p>
      </section>

      {/* ── SECTION 11 — ENQUIRY FORM ────────────────────────────────────── */}
      <section id="enquiry" className="bg-[#080a12] py-16 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-[#f0ece4] text-3xl mb-2">Join this retreat</h2>
          <p className="text-sm text-[#f0ece4]/50 mb-8">
            Maximum 10 women per departure. We respond within 24 hours.
          </p>

          {status === 'success' ? (
            <div className="text-center py-12">
              <p className="text-amber-400 font-serif text-xl mb-2">Enquiry sent</p>
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
                required className={`${INPUT_CLASS} bg-[#14100a]`}
              >
                <option value="" disabled>Which retreat?</option>
                <option>{"Darma Valley Women's Retreat"}</option>
                <option>Panchachuli Himalayan Wellness &amp; Cultural Immersion Retreat</option>
                <option>{"Women's Sacred Himalaya Retreat"}</option>
                <option>The Borderlands of the Himalaya</option>
                <option>Not sure yet — help me choose</option>
              </select>
              <input
                type="text" name="dates" value={form.dates} onChange={handleChange}
                placeholder="e.g. May or October 2026" className={INPUT_CLASS}
              />
              <select
                name="groupSize" value={form.groupSize} onChange={handleChange}
                required className={`${INPUT_CLASS} bg-[#14100a]`}
              >
                <option value="" disabled>Group size</option>
                <option>Solo</option>
                <option>2 people</option>
                <option>3–4 people</option>
                <option>5–6 people</option>
                <option>Larger group</option>
              </select>
              <select
                name="heardFrom" value={form.heardFrom} onChange={handleChange}
                className={`${INPUT_CLASS} bg-[#14100a]`}
              >
                <option value="" disabled>How did you hear about us?</option>
                <option>Instagram</option>
                <option>Google search</option>
                <option>Friend recommendation</option>
                <option>Travel blog</option>
                <option>Other</option>
              </select>
              <input
                type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="Your email address" required className={INPUT_CLASS}
              />
              <textarea
                name="message" value={form.message} onChange={handleChange}
                placeholder="Tell us what draws you to this retreat, or any questions you have"
                rows={4} className={`${INPUT_CLASS} resize-none`}
              />

              {status === 'error' && (
                <p className="text-red-400 text-xs">
                  Something went wrong. Please try again or WhatsApp us directly.
                </p>
              )}

              <button
                type="submit" disabled={status === 'loading'}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white rounded-lg py-3 text-sm font-medium transition-colors disabled:opacity-60"
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
