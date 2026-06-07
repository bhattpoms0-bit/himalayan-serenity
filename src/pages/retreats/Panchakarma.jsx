import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../../hooks/useSEO'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const WEB3FORMS_ACCESS_KEY = 'a4bcce53-4a1d-4217-93b6-30b9d714bbdd'

const INPUT_CLASS =
  'bg-white/5 border border-amber-400/20 rounded-lg px-4 py-3 text-[#f0ece4] text-sm w-full focus:outline-none focus:border-amber-400/60 placeholder:text-white/20'

// ─── Data ─────────────────────────────────────────────────────────────────────

const DAYS = [
  {
    route:  'DAY 1 · DELHI → BHIMTAL',
    theme:  'Into the Himalayan Foothills',
    badge:  'Signature Experience',
    desc:   'Scenic drive from Delhi into the Kumaon hills. Arrive at the tranquil lakeside town of Bhimtal and ease into the Himalayan rhythm.',
    sigExp: 'Welcome Kumaoni herbal tea ceremony followed by a Flavours of Kumaon hosted dinner with a local food expert — introducing regional ingredients, traditions, and stories.',
    exp:    ['Scenic drive from Delhi into Kumaon hills', 'Welcome herbal tea ceremony', 'Flavours of Kumaon hosted dinner', 'Introduction to regional ingredients and food traditions', 'Lakeside arrival and evening walk'],
    stay:   'Boutique Lakeside Retreat, Bhimtal',
    img:    '/images/retreats/borderlands/bhimtal-lake-reflection-himalayan-foothills-uttarakhand.png',
    imgAlt: 'Bhimtal lake mirroring the Himalayan foothills at dusk, arrival day on the Borderlands of the Himalaya retreat',
  },
  {
    route:  'DAY 2 · BHIMTAL → ABBOTT MOUNT',
    theme:  'Walking the Ramparts of the Demon King',
    badge:  'Signature Experience',
    desc:   'Drive through pine forests to the charming colonial-era settlement of Abbott Mount.',
    sigExp: 'Guided hike to Vanasur Ka Kila — the legendary fort of the Demon King. Explore the atmospheric ruins while your guide shares local folklore as the sun sets across the ridges.',
    exp:    ['Drive through pine forests', 'Guided hike to Vanasur Ka Kila', 'Local folklore and mythology storytelling', 'Sunset over the Himalayan ridges', 'Colonial heritage exploration'],
    stay:   'Heritage Colonial Cottage, Abbott Mount',
    img:    '/images/retreats/borderlands/vanasur-ka-kila-fort-ruins-sunset-kumaon-himalaya.png',
    imgAlt: 'Atmospheric ruins of Vanasur Ka Kila fort at sunset, Abbott Mount, Kumaon Himalaya',
  },
  {
    route:  'DAY 3 · ABBOTT MOUNT → MUNSIYARI',
    theme:  'Along the Forgotten Silk Routes',
    badge:  'Enriched Journey + Signature Experience',
    desc:   'A scenic journey deeper into eastern Kumaon, transformed into a rich travel experience rather than a simple transfer.',
    sigExp: 'Private evening with a Bhotiya family around the traditional hearth. Learn about the ancient trans-Himalayan trade routes between India and Tibet.',
    exp:    ['Stop at Birthi Falls', 'Hidden tea estate interaction', 'Shepherd community visit', 'Private Bhotiya family hearthside evening', 'Introduction to ancient Indo-Tibetan trade route history'],
    stay:   'Premium Mountain Lodge, Munsiyari (first of 4 nights)',
    img:    '/images/retreats/borderlands/johar-valley-ancient-trade-route-munsiyari-uttarakhand.png',
    imgAlt: 'Ancient Indo-Tibetan trade route winding through Johar Valley toward Munsiyari, Uttarakhand',
  },
  {
    route:  'DAY 4 · MUNSIYARI — KHALIYA TOP',
    theme:  'Where the Mountains Touch the Sky',
    badge:  'Signature Experience',
    desc:   'Full-day guided excursion to Khaliya Top with sweeping panoramic views of the Panchachuli, Nanda Devi East, Hardeol, and Rajrambha peaks.',
    sigExp: 'Curated Himalayan Picnic Experience featuring local cheeses, mountain herbs, traditional breads, and seasonal foraged elements — served at altitude with five sacred peaks as the backdrop.',
    exp:    ['Full-day Khaliya Top excursion', 'Panchachuli and Nanda Devi panoramic views', 'Curated high-altitude Himalayan picnic', 'Mountain herb and foraged element tasting', 'Photography of the five sacred summits'],
    stay:   'Premium Mountain Lodge, Munsiyari',
    img:    '/images/retreats/borderlands/khaliya-top-trek-panoramic-himalayan-views-munsiyari.png',
    imgAlt: 'Panoramic Himalayan views from Khaliya Top alpine meadows above Munsiyari, Panchachuli and Nanda Devi peaks',
  },
  {
    route:  'DAY 5 · MUNSIYARI — STORYKEEPERS DAY',
    theme:  'Around the Hearth of the Storykeepers',
    badge:  'Emotional Heart of the Journey',
    desc:   'A full day immersed in the living culture of the Johar Valley. This is the defining experience of the entire journey.',
    sigExp: 'Private Hearthside Storykeepers Supper — an exclusive gathering with Bhotiya elders, folk musicians, artisans, and historians. Stories, songs, and traditions shared across the firelight.',
    exp:    ['Full day in the Johar Valley', "Women's artisan workshop", 'Traditional weaving demonstration', 'Private Hearthside Storykeepers Supper', 'Evening with Bhotiya elders, folk musicians, and historians'],
    stay:   'Premium Mountain Lodge, Munsiyari',
    img:    '/images/retreats/borderlands/shauka-tribal-women-johar-valley-bhotiya-culture-kumaon.png',
    imgAlt: 'Shauka tribal women of Johar Valley sharing traditional Bhotiya culture and artisan heritage, Kumaon Himalaya',
  },
  {
    route:  'DAY 6 · MUNSIYARI → GANGOLIHAT',
    theme:  'Descending Into the Womb of the Earth',
    badge:  'Signature Experience',
    desc:   "Journey from the high mountains toward one of India's most mystical sacred sites.",
    sigExp: "Private guided exploration of Patal Bhuvaneshwar — one of India's most mystical underground cave temple systems, rich in Hindu mythology and natural limestone formations that have drawn pilgrims for centuries.",
    exp:    ['Departure from Munsiyari after 4 nights', 'Scenic mountain descent', 'Private guided Patal Bhuvaneshwar cave exploration', 'Hindu mythology and limestone formation interpretation', 'Evening at Gangolihat'],
    stay:   'Boutique Mountain Retreat, Gangolihat',
    img:    '/images/retreats/borderlands/patal-bhuvaneshwar-cave-temple-shiva-shrine-uttarakhand.png',
    imgAlt: 'Mystical underground chambers of Patal Bhuvaneshwar cave temple, ancient Shiva shrine, Uttarakhand',
  },
  {
    route:  'DAY 7 · GANGOLIHAT → JAGESHWAR',
    theme:  'Where the Gods Still Walk',
    badge:  'Exclusive Twilight Experience',
    desc:   'Travel through ancient cedar forests to the sacred temple town of Jageshwar — one of the twelve Jyotirlinga sites of Shiva, nestled in a valley of ancient deodar trees.',
    sigExp: 'Exclusive twilight exploration of the Jageshwar Dham temple complex after the day visitors depart — an atmospheric and deeply spiritual moment in near-silence among 125 ancient stone temples.',
    exp:    ['Drive through ancient cedar forests', 'Arrival at sacred Jageshwar temple town', 'Exclusive post-sunset temple complex exploration', '125 ancient stone temples in twilight', 'Deep spiritual immersion in near-silence'],
    stay:   'Forest Heritage Retreat, Jageshwar',
    img:    '/images/retreats/borderlands/jageshwar-dham-ancient-shiva-temples-deodar-forest-kumaon.png',
    imgAlt: 'Ancient Jageshwar Dham Shiva temples at twilight among deodar cedar forest, Kumaon Himalaya',
  },
  {
    route:  'DAY 8 · JAGESHWAR → LAKHUDIYAR → KASAR DEVI',
    theme:  'From Stone Age to Modern Mystics',
    badge:  'Two Signature Experiences',
    desc:   'A day that spans thousands of years — from prehistoric rock art to the legendary spiritual enclave that has drawn philosophers, artists, and seekers from around the world.',
    sigExp: "Exploration of prehistoric Lakhudiyar rock art shelters — some of the oldest human markings in the Himalayan region, thousands of years old. In Kasar Devi: Private conversation with a local artist, writer, or cultural historian for deeper insight into the region's creative and spiritual legacy.",
    exp:    ['Lakhudiyar prehistoric rock art exploration', 'Expert archaeological interpretation', 'Drive to legendary Kasar Devi ridge', 'Private conversation with local creative or historian', "Crank's Ridge evening walk"],
    stay:   'Boutique Retreat, Kasar Devi',
    img:    '/images/retreats/borderlands/kasar-devi-temple-lakhudiyar-rock-art-almora-uttarakhand.png',
    imgAlt: 'Kasar Devi spiritual ridge and prehistoric Lakhudiyar rock art shelters, Almora, Uttarakhand',
  },
  {
    route:  'DAY 9 · KASAR DEVI → SHITLAKHET',
    theme:  'The Last Sunrise Over Kumaon',
    badge:  'Farewell Experience',
    desc:   'A reflective day to absorb the journey with gentle forest walks, photography, and local experiences. The mountains look different when you know you are leaving them — familiar now, and full of memory.',
    sigExp: 'Special cultural farewell dinner celebrating the stories and friendships formed across nine days in the Himalayan borderlands.',
    exp:    ['Final Kasar Devi morning walk', 'Gentle forest photography session', 'Local craft and market exploration', 'Special cultural farewell dinner', 'Reflection and integration time'],
    stay:   'Luxury Mountain Retreat, Shitlakhet',
    img:    '/images/retreats/borderlands/kasar-devi-sunrise-meditation-himalayan-view-shitlakhet.png',
    imgAlt: 'Sunrise meditation at Kasar Devi ridge overlooking the Himalaya, farewell morning before Shitlakhet',
  },
  {
    route:  'DAY 10 · SHITLAKHET → KATHGODAM → DELHI',
    theme:  'Carrying the Mountains Home',
    badge:  'Final Morning',
    desc:   'Final Himalayan sunrise, farewell breakfast, and smooth transfer to Kathgodam railway station or Delhi. The borderlands do not leave you when you leave them.',
    sigExp: null,
    exp:    ['Final Himalayan sunrise contemplation', 'Farewell breakfast', 'Departure transfer to Kathgodam or Delhi'],
    stay:   'Departure day',
    img:    '/images/retreats/borderlands/himalayan-journey-sunrise-kumaon-borderlands-retreat.png',
    imgAlt: 'Final Himalayan sunrise over the Kumaon borderlands, departure day of the Borderlands of the Himalaya retreat',
  },
]

const WHY_ITEMS = [
  {
    title: 'Signature exclusive experiences',
    text:  'You cannot easily book these independently — each day features a curated encounter designed for this journey alone.',
  },
  {
    title: 'Deep Bhotiya cultural immersion',
    text:  'Intimate access to trade culture and Himalayan borderland heritage that few outsiders ever witness.',
  },
  {
    title: 'Story-led journeys',
    text:  'Every drive becomes an enriched experience — stops at waterfalls, tea estates, shepherd communities, and rock art.',
  },
  {
    title: 'Handpicked heritage properties',
    text:  'Boutique and heritage stays with strong character, chosen for their connection to place and story.',
  },
  {
    title: 'Maximum 10 guests',
    text:  'Intimate and flexible — never a crowd, always a conversation.',
  },
  {
    title: 'Expert cultural guides',
    text:  'Part storytellers, part historians — guides who bring the landscape alive through mythology, memory, and meaning.',
  },
]

const INCLUDED = [
  {
    title: 'Accommodation',
    items: [
      'Boutique Lakeside Retreat — Bhimtal',
      'Heritage Colonial Cottage — Abbott Mount',
      'Premium Mountain Lodge — Munsiyari (4 nights)',
      'Boutique Mountain Retreat — Gangolihat',
      'Forest Heritage Retreat — Jageshwar',
      'Boutique Retreat — Kasar Devi',
      'Luxury Mountain Retreat — Shitlakhet',
    ],
  },
  {
    title: 'Signature Experiences',
    items: [
      'Welcome Kumaoni hearthside dinner',
      'Vanasur Ka Kila fort guided hike',
      'Private Bhotiya family hearthside evening',
      'Khaliya Top Himalayan picnic experience',
      'Private Hearthside Storykeepers Supper',
      'Patal Bhuvaneshwar cave exploration',
      'Exclusive Jageshwar twilight temple visit',
      'Lakhudiyar prehistoric rock art tour',
      'Kasar Devi private cultural conversation',
      'Special farewell cultural dinner',
    ],
  },
  {
    title: 'Meals & Logistics',
    items: [
      'Daily breakfast and dinner throughout',
      'Selected cultural lunches and picnics',
      'All internal transportation',
      'English-speaking cultural guide',
      'Local expert guides at each location',
      'Airport and railway transfers',
      '24/7 operational support',
    ],
  },
]

const NOT_INCLUDED = [
  'International and domestic flights',
  'Travel insurance (mandatory)',
  'Visa fees',
  'Personal expenses and alcoholic beverages',
  'Tips and gratuities',
]

const IDEAL_FOR = [
  'Cultural explorers',
  'Photographers',
  'Slow travelers',
  'Couples',
  'Solo adventurers',
  'Spiritual seekers',
  'Those seeking authentic story-rich experiences',
]

// ─── Component ────────────────────────────────────────────────────────────────

const BORDERLANDS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'The Borderlands of the Himalaya',
  description: 'A 10-day premium cultural journey through the Kumaon Himalayan borderlands — ancient Indo-Tibetan trade routes, Bhotiya culture, sacred caves, and mountain kingdoms. Max 10 guests.',
  organizer: {
    '@type': 'Organization',
    name: 'Himalayan Serenity Travel',
    url: 'https://www.himalayanserenitytravel.com',
  },
  location: {
    '@type': 'Place',
    name: 'Johar Valley, Kumaon Himalayas, Uttarakhand',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pithoragarh',
      addressRegion: 'Uttarakhand',
      addressCountry: 'IN',
    },
  },
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  url: 'https://www.himalayanserenitytravel.com/retreats/borderlands-himalaya',
}

export default function Panchakarma() {
  useSEO({
    title:       'The Borderlands of the Himalaya — Premium Cultural Journey | Himalayan Serenity',
    description: 'Himalayan cultural immersion tour in Kumaon, Uttarakhand. 10-day journey through Indo-Tibetan borderlands — Bhotiya culture, sacred caves & mountain kingdoms. Book now.',
    canonical:   'https://www.himalayanserenitytravel.com/retreats/borderlands-himalaya',
    schema:      BORDERLANDS_SCHEMA,
  })

  const [form, setForm] = useState({
    name: '', country: '', retreat: 'The Borderlands of the Himalaya',
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
      <Navbar activePage="panchakarma" />

      {/* ── SECTION 1 — HERO ─────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen bg-[#080a12] flex flex-col justify-start overflow-hidden">
        <img
          src="/images/retreats/borderlands/kumaon-himalaya-luxury-retreat-sunrise-view.png"
          alt="Sunrise panorama over the Kumaon Himalaya, Borderlands of the Himalaya luxury cultural retreat"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80" />
        <Link to="/" className="relative z-30 block pt-24 pb-4 px-6 lg:px-16 text-sm text-white/50 hover:text-white/80 transition-colors">← Back to Home</Link>
        <div className="relative z-20 px-6 lg:px-16 pb-16">
          <h1 className="font-serif text-[#f0ece4] text-4xl lg:text-6xl font-normal leading-tight mb-3">
            The Borderlands of the Himalaya — Cultural Immersion Retreat in Kumaon
          </h1>
          <p className="font-serif italic text-amber-400 text-xl mb-3">
            Myths · Mountains · Ancient Trade Routes
          </p>
          <p className="text-[#f0ece4]/60 text-sm mb-6 max-w-xl">
            A rare journey into one of the Himalaya's last living frontiers — where ancient
            Indo-Tibetan trade routes, mountain kingdoms, sacred caves, and living Bhotiya
            culture still thrive.
          </p>
          <div className="mb-8">
            {['10 Days / 9 Nights', 'Kumaon Himalaya', 'Max 10 Guests'].map(stat => (
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
              Enquire about this journey
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
            A Rare Himalayan Journey
          </p>
          <h2 className="font-serif text-[#f0ece4] text-2xl lg:text-3xl font-normal leading-relaxed mb-8 italic">
            "This is not a tour of places. It is a carefully crafted
            journey into the Borderlands of the Himalaya."
          </h2>
          <p className="text-[#f0ece4]/60 text-sm leading-relaxed max-w-2xl mx-auto mb-4 text-left">
            While most travelers chase the famous icons of India, few discover Kumaon — the eastern
            Himalayan borderlands where ancient Indo-Tibetan trade routes, mountain kingdoms, sacred
            caves, and living Bhotiya culture still thrive.
          </p>
          <p className="text-[#f0ece4]/60 text-sm leading-relaxed max-w-2xl mx-auto mb-4 text-left">
            This is not a conventional sightseeing tour. It is a story-led journey through myths,
            forgotten forts, high-alpine meadows, and communities that have preserved traditions for
            centuries. Designed for discerning international travelers, every day features a signature
            experience, seamless logistics, and genuine cultural connection.
          </p>
          <p className="font-serif italic text-amber-400 text-lg text-center mt-6">
            A rare, premium experience designed to leave you transformed.
          </p>
        </div>
      </section>

      {/* ── SECTION 3 — WHY THIS JOURNEY STANDS APART ───────────────────── */}
      <section className="bg-[#0a0d14] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-amber-400 text-xs uppercase tracking-widest mb-4">
            Why This Journey Stands Apart
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

      {/* ── SECTION 5 — FESTIVAL SPECIAL NOTE ───────────────────────────── */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 my-16">
        <div className="bg-[#14100a] border border-amber-400/20 rounded-2xl py-12 px-6">
          <p className="text-amber-400 text-xs uppercase tracking-widest mb-3">
            Special Departure
          </p>
          <h2 className="font-serif text-[#f0ece4] text-xl mb-4">
            August Festival Edition — Hidden Kingdoms
          </h2>
          <p className="text-[#f0ece4]/60 text-sm leading-relaxed">
            For our August departure, Day 2 is replaced with a visit to the vibrant Devidhura Bagwal
            Festival — witnessing ancient rituals, folk performances, and community traditions with
            expert cultural interpretation. One of the most extraordinary festival experiences in
            the Himalaya.
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
        <h2 className="font-serif text-[#f0ece4] text-2xl mb-8">Who joins this journey</h2>
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

      {/* ── SECTION 9 — SIGNATURE PROMISE ───────────────────────────────── */}
      <section className="bg-[#080a12] py-20 px-6 text-center">
        <h2 className="font-serif text-[#f0ece4] text-3xl max-w-2xl mx-auto">
          This is not a tour of places.
        </h2>
        <p className="text-[#f0ece4]/60 text-sm leading-relaxed max-w-2xl mx-auto mt-6 text-left">
          It is a carefully crafted journey into the Borderlands of the Himalaya — where ancient
          trade routes, mountain myths, and resilient communities continue to shape life at the
          edge of the world.
        </p>
        <p className="font-serif italic text-amber-400 text-xl text-center mt-10">
          A rare, premium experience designed to leave you transformed.
        </p>
      </section>

      {/* ── SECTION 10 — ENQUIRY FORM ────────────────────────────────────── */}
      <section id="enquiry" className="bg-[#080a12] py-16 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-[#f0ece4] text-3xl mb-2">Join this journey</h2>
          <p className="text-sm text-[#f0ece4]/50 mb-8">
            Maximum 10 guests per departure. We respond within 24 hours.
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
                <option>Panchachuli Himalayan Wellness &amp; Cultural Immersion Retreat</option>
                <option>{"Women's Sacred Himalaya Retreat"}</option>
                <option>The Borderlands of the Himalaya</option>
                <option>Darma Valley Digital Detox</option>
                <option>Not sure yet — help me choose</option>
              </select>
              <input
                type="text" name="dates" value={form.dates} onChange={handleChange}
                placeholder="e.g. October or November 2026" className={INPUT_CLASS}
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
                placeholder="Tell us what draws you to this journey, or any questions you have"
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
