import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../../hooks/useSEO'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const WEB3FORMS_ACCESS_KEY = 'a4bcce53-4a1d-4217-93b6-30b9d714bbdd'

const INPUT_CLASS =
  'bg-white/5 border border-rose-400/20 rounded-lg px-4 py-3 text-[#f0ece4] text-sm w-full focus:outline-none focus:border-rose-400/60 placeholder:text-white/20'

// ─── Data ─────────────────────────────────────────────────────────────────────

const DAYS = [
  {
    route:  'DAY 1 · DELHI → BHIMTAL',
    theme:  'Arrival in Kumaon',
    desc:   'Upon arrival in Delhi, guests begin their journey into the Kumaon foothills. The day is intentionally relaxed, allowing time to recover from international travel and settle into the slower rhythm of the mountains.',
    exp:    ['Private transfer from Delhi', 'Welcome herbal tea ceremony', 'Introduction to Kumaon and the journey ahead', 'Lakeside sunset walk', 'Farm-to-table Kumaoni dinner'],
    stay:   'Premium Lakeside Retreat, Bhimtal',
    img:    '/images/retreats/womens-retreat/bhimtal-arrival-women-kumaon-retreat-day1.webp',
    imgAlt: 'Bhimtal arrival on the Women of Kumaon retreat, day one beginning of the Himalayan journey',
  },
  {
    route:  'DAY 2 · BHIMTAL → PITHORAGARH',
    theme:  'Into the Heart of Kumaon',
    desc:   'Travel through scenic mountain roads, forests, and traditional villages toward Pithoragarh — often referred to as the cultural gateway to eastern Kumaon.',
    exp:    ['Scenic drive through the Kumaon Himalaya', 'Traditional Kumaoni lunch', 'Exploration of local markets', 'Evening storytelling session with local hosts', 'Introduction to Kumaoni customs and traditions'],
    stay:   'Boutique Heritage Hotel, Pithoragarh',
    img:    '/images/retreats/womens-retreat/kainchi-dham-jageshwar-womens-cultural-journey-day2.webp',
    imgAlt: 'Kainchi Dham and Jageshwar temple cultural journey, day two women\'s Himalayan retreat',
  },
  {
    route:  'DAY 3 · PITHORAGARH → MUNSIYARI',
    theme:  'First Glimpse of the Sacred Peaks',
    desc:   'The road gradually ascends into one of the most spectacular mountain regions in India. Along the way, guests experience dramatic landscapes and their first views of the Panchachuli mountain range — five sacred summits that will define the days ahead.',
    exp:    ['Visit to Birthi Waterfall', 'Scenic mountain viewpoints', 'Introduction to the history and mythology of Panchachuli', 'Sunset gathering overlooking the mountains'],
    stay:   'Premium Mountain Lodge, Munsiyari',
    img:    '/images/retreats/womens-retreat/panchachuli-peaks-munsiyari-sacred-himalaya-day3.webp',
    imgAlt: 'Panchachuli peaks above Munsiyari in the sacred Himalaya, day three women\'s retreat',
  },
  {
    route:  'DAY 4 · MUNSIYARI',
    theme:  'Women of the Mountains',
    desc:   'Spend the day learning from the women who sustain families, farms, and traditions in the high Himalaya. These are conversations and encounters that no guidebook can prepare you for — honest, warm, and quietly transformative.',
    exp:    ['Visit women-led farms and households', 'Learn about mountain agriculture and seasonal lifestyles', 'Traditional cooking experience', 'Shared lunch with local families', 'Conversations about life, resilience, and community in the Himalaya'],
    stay:   'Premium Mountain Lodge, Munsiyari',
    img:    '/images/retreats/womens-retreat/women-mountain-farming-kumaoni-community-munsiyari-day4.webp',
    imgAlt: 'Women mountain farming with Kumaoni community in Munsiyari, day four cultural immersion',
  },
  {
    route:  'DAY 5 · MUNSIYARI',
    theme:  'Craft, Culture & Creativity',
    desc:   'Discover the artistic traditions that have been passed down through generations of Kumaoni women. Under the guidance of master artisans, guests participate in the creative process — not as observers, but as makers.',
    exp:    ['Traditional weaving workshop', 'Natural dye demonstration', 'Wool preparation and textile techniques', 'Create a handmade keepsake under artisan guidance', 'Evening cultural interaction'],
    stay:   'Premium Mountain Lodge, Munsiyari',
    img:    '/images/retreats/womens-retreat/traditional-weaving-craft-himalayan-artisan-munsiyari-day5.webp',
    imgAlt: 'Traditional weaving craft with Himalayan artisan in Munsiyari, day five creative workshop',
  },
  {
    route:  'DAY 6 · MUNSIYARI',
    theme:  'Sacred Landscapes & Living Traditions',
    desc:   'Explore the spiritual relationship between local communities and the mountains they call home. This is Kumaon as it has always been — unhurried, rooted, and quietly profound.',
    exp:    ['Sunrise mindfulness session', 'Heritage village walk', 'Visit sacred springs and community gathering places', 'Introduction to traditional Himalayan herbs and healing practices', 'Reflection circle at sunset'],
    stay:   'Premium Mountain Lodge, Munsiyari',
    img:    '/images/retreats/womens-retreat/sacred-landscapes-himalayan-women-community-munsiyari-day6.webp',
    imgAlt: 'Sacred landscapes and Himalayan women community gathering in Munsiyari, day six',
  },
  {
    route:  'DAY 7 · MUNSIYARI → PITHORAGARH',
    theme:  'Return Through the Valleys',
    desc:   'A slower-paced day designed for reflection and integration of the experiences gained throughout the journey. The valleys look different on the return — familiar now, and full of memory.',
    exp:    ['Scenic drive through the Himalayan valleys', 'Personal journalling session', 'Free time for rest and reflection', 'Group sharing circle'],
    stay:   'Boutique Heritage Hotel, Pithoragarh',
    img:    '/images/retreats/womens-retreat/women-journalling-reflection-himalayan-valley-pithoragarh-day7.webp',
    imgAlt: 'Women journalling in reflection overlooking the Himalayan valley in Pithoragarh, day seven',
  },
  {
    route:  'DAY 8 · PITHORAGARH → LOHAGHAT',
    theme:  'Abbott Mount & The Art of Slow Living',
    desc:   'Travel to the peaceful hill region of Lohaghat and Abbott Mount, known for its pine forests, colonial heritage, and quiet atmosphere. A gentle, unhurried final full day.',
    exp:    ['Guided forest walk', 'Himalayan herbal tea experience', 'Personal reflection time', 'Closing ceremony', 'Farewell dinner with local specialties'],
    stay:   'Heritage Retreat, Abbott Mount',
    img:    '/images/retreats/womens-retreat/abbott-mount-slow-living-lohaghat-himalayan-views-day8.webp',
    imgAlt: 'Abbott Mount slow living in Lohaghat with Himalayan views, day eight peaceful retreat',
  },
  {
    route:  'DAY 9 · LOHAGHAT → DELHI',
    theme:  'Carrying Kumaon Home',
    desc:   'After breakfast, begin the journey back to Delhi with memories, friendships, and stories from the Kumaon Himalaya. The mountains do not leave you when you leave them.',
    exp:    ['Morning contemplation session', 'Closing blessing ceremony', 'Departure transfer'],
    stay:   'Departure day',
    img:    '/images/retreats/womens-retreat/carrying-kumaon-home-lohaghat-delhi-departure-day9.webp',
    imgAlt: 'Carrying Kumaon home from Lohaghat to Delhi, day nine departure',
  },
]

const INCLUDED = [
  {
    title: 'Accommodation',
    items: [
      '1 Night Premium Lakeside Retreat — Bhimtal',
      '2 Nights Boutique Heritage Hotel — Pithoragarh',
      '4 Nights Premium Mountain Lodge — Munsiyari',
      '1 Night Heritage Retreat — Abbott Mount',
    ],
  },
  {
    title: 'Cultural Experiences',
    items: [
      'Women-led cultural immersion experiences',
      'Traditional weaving workshop',
      'Natural dye and textile demonstration',
      'Handmade keepsake creation',
      'Heritage village walks',
      'Sacred springs and community visits',
      'Artisan interaction sessions',
      'Storytelling evenings with local hosts',
    ],
  },
  {
    title: 'Wellness & Reflection',
    items: [
      'Sunrise mindfulness sessions',
      'Reflection and integration circles',
      'Personal journalling time',
      'Closing blessing ceremony',
      'Welcome gift package',
    ],
  },
  {
    title: 'Meals',
    items: [
      'Daily breakfast, lunch, and dinner',
      'Traditional Kumaoni cuisine throughout',
      'Farm-to-table dining experiences',
      'Himalayan herbal tea rituals',
    ],
  },
  {
    title: 'Services',
    items: [
      'Female English-speaking tour leader',
      'Airport and internal transfers',
      'All internal transportation',
      'Drinking water throughout',
      '24/7 local support',
    ],
  },
]

const NOT_INCLUDED = [
  'International flights',
  'Indian visa fees',
  'Travel insurance (strongly recommended)',
  'Alcoholic beverages',
  'Personal shopping and souvenirs',
  'Personal expenses and gratuities',
]

const IDEAL_FOR = [
  'Solo female travelers',
  'Friends traveling together',
  'Cultural explorers',
  'Slow-travel enthusiasts',
  'Creatives and professionals seeking inspiration',
  'Women interested in authentic local experiences',
  'Travelers seeking meaningful connections',
]

// ─── Component ────────────────────────────────────────────────────────────────

const WOMENS_RETREAT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: "Women's Sacred Himalaya Retreat",
  description: "A 9-day women-only cultural immersion journey through the Kumaon Himalaya with women guides, Shakti yoga, weaving, sacred landscapes, and Panchachuli views. Max 8 guests.",
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
  url: 'https://www.himalayanserenitytravel.com/retreats/womens-retreat',
}

export default function WomensRetreat() {
  useSEO({
    title:       'Women of Kumaon — Women-Only Cultural Immersion Retreat | Himalayan Serenity',
    description: "Women's wellness retreat in the Himalayas 2026. 9-day women-only journey in Kumaon — female guides, Shakti yoga & sacred landscapes. Max 8 guests. Book now.",
    canonical:   'https://www.himalayanserenitytravel.com/retreats/womens-retreat',
    schema:      WOMENS_RETREAT_SCHEMA,
  })

  const [form, setForm] = useState({
    name: '', country: '', retreat: "Women's Sacred Himalaya Retreat",
    dates: '', groupSize: '', heardFrom: '', email: '', message: '',
  })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const payload = {
        access_key:   WEB3FORMS_ACCESS_KEY,
        subject:      `Retreat Enquiry — ${form.retreat}`,
        from_name:    form.name,
        name:         form.name,
        email:        form.email,
        country:      form.country,
        retreat:      form.retreat,
        dates:        form.dates,
        group_size:   form.groupSize,
        heard_from:   form.heardFrom,
        message:      form.message,
        botcheck:     '',
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
      <Navbar activePage="womens-retreat" />

      {/* ── SECTION 1 — HERO ─────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen bg-[#0d0508] flex flex-col justify-start overflow-hidden">
        <img
          src="/images/retreats/womens-retreat/international-woman-kumaoni-women-himalayan-village-panchachuli.webp"
          alt="International woman with Kumaoni women in Himalayan village with Panchachuli peaks, Women of Kumaon retreat"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover object-[center_top]"
          onError={(e) => { e.target.style.display = 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80 z-10" />
        <Link to="/" className="relative z-30 block pt-24 pb-4 px-6 lg:px-16 text-sm text-white/50 hover:text-white/80 transition-colors">← Back to Home</Link>
        <div className="relative z-20 px-6 lg:px-16 pb-16">
          <span className="inline-block border border-rose-400 text-rose-400 uppercase text-xs rounded-full px-3 py-1 mb-4">
            Women Only · 9 Days · Max 8 Guests
          </span>
          <h1 className="font-serif text-[#f0ece4] text-4xl lg:text-6xl font-normal leading-tight mb-4">
            Women's Wellness Retreat in the Himalayas
          </h1>
          <p className="font-serif italic text-rose-400 text-xl mb-3">
            Mountain Wisdom · Living Traditions · Sacred Landscapes
          </p>
          <p className="text-[#f0ece4]/60 text-sm mb-6">
            A premium women-led cultural immersion journey through the Kumaon Himalaya
          </p>
          <div className="mb-8">
            {['9 Days / 8 Nights', 'Kumaon Himalaya', 'Max 8 Guests'].map(stat => (
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
              className="bg-rose-700 text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-rose-800 transition-colors duration-200"
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
      <section className="bg-[#0a100d] py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-rose-400 text-xs uppercase tracking-widest mb-6">
            A Journey Into Living Kumaon
          </p>
          <h2 className="font-serif text-[#f0ece4] text-2xl lg:text-3xl font-normal leading-relaxed mb-8 italic">
            "This is not a tour where guests simply observe<br />
            Himalayan life. It is an invitation to participate in it."
          </h2>
          <p className="text-[#f0ece4]/60 text-sm leading-relaxed max-w-2xl mx-auto mb-4 text-left">
            The Kumaon Himalaya is a land shaped by resilient women, sacred landscapes, and
            centuries-old traditions. This journey invites guests beyond conventional tourism and
            into the daily lives of the women who preserve the region's culture, crafts, cuisine,
            and community wisdom.
          </p>
          <p className="text-[#f0ece4]/60 text-sm leading-relaxed max-w-2xl mx-auto mb-4 text-left">
            From the tranquil lakes of Bhimtal and the cultural heart of Pithoragarh to the
            majestic <Link to="/retreats/panchachuli-wellness" style={{ color: '#f9a8d4', textDecoration: 'none' }}>Panchachuli peaks of Munsiyari</Link> and the pine forests of Abbott Mount, every
            experience has been thoughtfully designed to foster connection, learning, and inspiration.
          </p>
          <p className="font-serif italic text-rose-400 text-lg text-center mt-6">
            Led by women. Limited to eight guests.<br />
            Designed for those who travel to truly connect.
          </p>
        </div>
      </section>

      {/* ── SECTION 3 — ITINERARY ────────────────────────────────────────── */}
      <section className="pb-0">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pb-12">
          <p className="text-rose-400 text-xs uppercase tracking-widest mb-4">Itinerary</p>
          <h2 className="font-serif text-[#f0ece4] text-2xl">Your journey day by day</h2>
        </div>

        <div>
          {DAYS.map((day, i) => {
            const isEven = i % 2 === 1
            return (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 border-b border-rose-400/10 ${isEven ? 'bg-[#150810]' : 'bg-[#1a0a0e]'}`}
              >
                {/* Image column */}
                <div className={`overflow-hidden ${isEven ? 'order-first lg:order-last' : ''}`}>
                  <div className="w-full h-auto overflow-hidden">
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
                  <p className="text-rose-400 text-xs font-medium tracking-[0.2em] uppercase mb-2">
                    {day.route}
                  </p>
                  <h3 className="font-serif text-[#f0ece4] text-2xl lg:text-3xl mb-4">
                    {day.theme}
                  </h3>
                  <p className="text-[#f0ece4]/60 text-sm leading-relaxed mb-6">
                    {day.desc}
                  </p>
                  <ul className="space-y-2">
                    {day.exp.map(item => (
                      <li key={item} className="flex items-start gap-2 text-[#f0ece4]/50 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0 mt-1.5"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="text-rose-400/60 text-xs italic mt-6 pt-4 border-t border-rose-400/10">
                    Overnight: {day.stay}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── SECTION 4 — ACCENT BREAK ─────────────────────────────────────── */}
      <div className="my-16 border-t border-b border-rose-400/20">
        <img
          src="/images/retreats/womens-retreat/kumaoni-thali-traditional-food-mountain-cuisine.jfif"
          alt="Traditional Kumaoni thali with local mountain cuisine"
          loading="lazy"
          className="w-full h-[60vh] object-cover object-center"
        />
      </div>

      {/* ── SECTION 5 — WHAT'S INCLUDED ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
        <p className="text-rose-400 text-xs uppercase tracking-widest mb-4">{"What's Included"}</p>
        <h2 className="font-serif text-[#f0ece4] text-2xl lg:text-3xl mb-10">Everything taken care of</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INCLUDED.map(({ title, items }) => (
            <div key={title} className="bg-[#1a0a0e] border border-rose-400/10 rounded-xl p-6">
              <h3 className="text-rose-400 font-medium text-sm mb-3 uppercase tracking-wide">
                {title}
              </h3>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[#f0ece4]/70 text-sm">
                    <span className="text-rose-400 mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-[#1a0a0e] border border-red-900/20 rounded-xl p-6">
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

      {/* ── SECTION 6 — SUSTAINABILITY ───────────────────────────────────── */}
      <section className="bg-[#0d0508] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-rose-400 text-xs uppercase tracking-widest mb-4">
            Sustainability &amp; Community Impact
          </p>
          <h2 className="font-serif text-[#f0ece4] text-2xl mb-6">Travel that gives back</h2>
          <p className="text-[#f0ece4]/60 text-sm leading-relaxed">
            This journey directly supports women artisans, family-run guesthouses, local farmers,
            and community-based tourism initiatives throughout the{' '}
            <Link to="/international-retreats" style={{ color: '#f9a8d4', textDecoration: 'none' }}>Kumaon Himalaya</Link>.
            By traveling in small groups and engaging directly with local communities, guests contribute to
            preserving traditional knowledge and creating sustainable economic opportunities for
            women in rural mountain regions.
          </p>
        </div>
      </section>

      {/* ── SECTION 7 — IDEAL FOR ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
        <p className="text-rose-400 text-xs uppercase tracking-widest mb-4">Ideal For</p>
        <h2 className="font-serif text-[#f0ece4] text-2xl mb-8">Who comes on this journey</h2>
        <div className="flex flex-wrap gap-3">
          {IDEAL_FOR.map(label => (
            <span
              key={label}
              className="bg-rose-900/20 border border-rose-400/20 text-[#f0ece4]/70 text-sm rounded-full px-4 py-2"
            >
              {label}
            </span>
          ))}
        </div>
      </section>

      {/* ── SECTION 8 — ENQUIRY FORM ─────────────────────────────────────── */}
      <section id="enquiry" className="bg-[#0d0508] py-16 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-[#f0ece4] text-3xl mb-2">Join this journey</h2>
          <p className="text-sm text-[#f0ece4]/50 mb-8">
            Limited to 8 guests per departure. We respond within 24 hours.
          </p>

          {status === 'success' ? (
            <div className="text-center py-12">
              <p className="text-rose-400 font-serif text-xl mb-2">Enquiry sent</p>
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
                required className={`${INPUT_CLASS} bg-[#150810]`}
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
                placeholder="e.g. April or October 2026" className={INPUT_CLASS}
              />
              <select
                name="groupSize" value={form.groupSize} onChange={handleChange}
                required className={`${INPUT_CLASS} bg-[#150810]`}
              >
                <option value="" disabled>Group size</option>
                <option>Traveling solo</option>
                <option>2 women</option>
                <option>3–4 women</option>
                <option>5–6 women</option>
                <option>Larger group</option>
              </select>
              <select
                name="heardFrom" value={form.heardFrom} onChange={handleChange}
                className={`${INPUT_CLASS} bg-[#150810]`}
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
                className="w-full bg-rose-700 hover:bg-rose-800 text-white rounded-lg py-3 text-sm font-medium transition-colors disabled:opacity-60"
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
