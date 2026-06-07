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
    theme:  'Arrival in the Kumaon Himalaya',
    desc:   'Your journey begins with a scenic drive into the Kumaon Himalaya. As the plains gradually give way to forested hills and mountain valleys, the pace of life begins to slow. Upon arrival in Pithoragarh — often called the Little Kashmir of Uttarakhand — guests are welcomed with a traditional herbal infusion and an introduction to the landscapes, culture, and communities that will shape the days ahead.',
    exp:    ['Private arrival transfer', 'Welcome herbal infusion ceremony', 'Introduction to Kumaon landscapes and culture', 'Soar Valley sunset walk', 'Rest and acclimatisation'],
    stay:   'Premium Hotel, Pithoragarh',
    img:    '/images/retreats/darma-detox/pithoragarh-sunset-kumaon-arrival-day1.jfif',
    imgAlt: 'Pithoragarh sunset panorama, Kumaon Himalaya arrival',
  },
  {
    route:  'DAY 2 · PITHORAGARH',
    theme:  'Discovering Hidden Kumaon',
    desc:   'Today is dedicated to gentle exploration and acclimatisation. Visit the panoramic viewpoints of Chandak, where sweeping views extend across the valleys and distant Himalayan ridges. Learn about Kumaoni traditions, mountain livelihoods, and the rich cultural heritage of the region.',
    exp:    ['Chandak panoramic viewpoints', 'Kumaoni cultural orientation', 'Mountain heritage walk', 'Evening meditation session', 'Reconnecting with the present moment'],
    stay:   'Premium Hotel, Pithoragarh',
    img:    '/images/retreats/darma-detox/kumaon-village-stone-house-himalayan-peaks-day2.jfif',
    imgAlt: 'Traditional Kumaoni stone village with Himalayan peaks, Chandak viewpoint',
  },
  {
    route:  'DAY 3 · PITHORAGARH → DHARCHULA',
    theme:  'Gateway to the Frontier',
    desc:   'Journey deeper into the Himalaya towards Dharchula, a historic border town nestled beside the Kali River. For centuries this region served as an important trading corridor linking India and Tibet. Today it marks the threshold between the modern world and the remote mountain landscapes that await. Digital detox officially begins.',
    exp:    ['Scenic drive along Kali River', 'Arrival in historic Dharchula', 'Meet the expedition team', 'Full trek briefing', 'Digital detox begins — phones collected and stored'],
    stay:   'Boutique Guesthouse, Dharchula',
    img:    '/images/retreats/darma-detox/dharchula-suspension-bridge-kali-river-day3.jfif',
    imgAlt: 'Dharchula suspension bridge over turquoise Kali River, border town',
  },
  {
    route:  'DAY 4 · DHARCHULA → SOBLA → BONGLING',
    theme:  'Into the Darma Valley',
    desc:   'The expedition begins. After a short drive to Sobla, the trek enters the spectacular Darma Valley. Ancient trails wind through forests, river valleys, and traditional Himalayan settlements. The first evening is spent beneath vast mountain skies, where the sounds of modern life are replaced by flowing rivers and crackling campfires.',
    exp:    ['Drive to Sobla trailhead', 'Trek into Darma Valley', 'Ancient forest and river valley trails', 'Traditional settlement visits', 'First campfire beneath mountain skies'],
    stay:   'Premium Expedition Camp',
    img:    '/images/retreats/darma-detox/darma-valley-glacier-river-forest-gorge-entry-day4.webp',
    imgAlt: 'Darma Valley glacier river through dense forest gorge, trek entry',
  },
  {
    route:  'DAY 5 · BONGLING → SELA',
    theme:  'Following the Rivers of the Himalaya',
    desc:   "Each morning begins with breathwork and gentle stretching facing the Panchachuli range. Today's trail follows glacier-fed rivers through pristine alpine landscapes where nature remains largely untouched. Along the way, your guide shares insights into local ecology, wildlife, and mountain traditions.",
    exp:    ['Morning breathwork facing Panchachuli', 'Glacier-fed river trail', 'Wildlife and ecology insights', 'Traditional mountain knowledge', 'Campfire beneath stars'],
    stay:   'Expedition Camp',
    img:    '/images/retreats/darma-detox/himalayan-trekker-alpine-meadow-wildflowers-day5.jfif',
    imgAlt: 'Trekker walking through alpine meadow with wildflowers, Darma Valley',
  },
  {
    route:  'DAY 6 · SELA → NAGLING',
    theme:  'Along Ancient Himalayan Trade Routes',
    desc:   'Walk paths once travelled by generations of traders moving between India and Tibet. Traditional villages, stone houses, and terraced fields offer a glimpse into a way of life shaped by the mountains for centuries. This is a day of stories — of resilience, migration, culture, and connection.',
    exp:    ['Ancient Tibet trade route trail', 'Traditional stone villages', 'Terraced field landscapes', 'Cultural storytelling with local guide', 'Village camp evening'],
    stay:   'Village Camp',
    img:    '/images/retreats/darma-detox/darma-valley-stone-village-ancient-trade-route-day6.jfif',
    imgAlt: 'Ancient stone village on Himalayan trade route, Darma Valley',
  },
  {
    route:  'DAY 7 · DUKTU VILLAGE',
    theme:  'Life Beneath Panchachuli',
    desc:   'Arrive in Duktu, one of the most picturesque villages in the entire Himalaya. Surrounded by towering peaks and dramatic landscapes, Duktu provides a rare opportunity to experience authentic mountain life. Spend time with local Shauka families, learn about traditional weaving practices, and enjoy a home-hosted cultural experience.',
    exp:    ['Arrival in Duktu village', 'Shauka family cultural exchange', 'Traditional weaving demonstration', 'Home-hosted cultural experience', 'Panchachuli peaks panorama'],
    stay:   'Village Homestay',
    img:    '/images/retreats/darma-detox/duktu-village-darma-valley-panchachuli-homestay-day7.jfif',
    imgAlt: 'Duktu village stone houses beneath Panchachuli peaks, Darma Valley homestay',
  },
  {
    route:  'DAY 8 · DUKTU — THE SILENCE DAY',
    theme:  'The Rarest Experience',
    desc:   'In a world filled with constant noise, true silence has become one of the rarest experiences. Today is intentionally unstructured. Guests are invited to spend the day in quiet reflection through guided meditation, mindful walking, journaling, and personal contemplation. Without phones, notifications, or distractions, the valley reveals itself in a different way.',
    exp:    ['Guided morning meditation', 'Mindful valley walking', 'Personal journalling time', 'Silent contemplation', 'No schedule, no phones, no distractions'],
    stay:   'Village Homestay',
    img:    '/images/retreats/darma-detox/silence-mindfulness-meditation-himalayan-valley-day8.jfif',
    imgAlt: 'Woman in mindful silence on rock in Himalayan valley, digital detox day',
  },
  {
    route:  'DAY 9 · DUKTU — PANCHACHULI WILDERNESS',
    theme:  'The Defining Moment',
    desc:   "The iconic Panchachuli peaks dominate today's experience. Begin the morning with yoga and meditation while the first sunlight illuminates the snow-covered summits. The remainder of the day is devoted to exploration, photography, and personal reflection amid some of the most inspiring landscapes in the Indian Himalaya. For many guests, this becomes the defining moment of the journey.",
    exp:    ['Sunrise yoga with Panchachuli backdrop', 'Morning meditation', 'Wilderness exploration', 'Himalayan photography', 'Personal reflection time'],
    stay:   'Village Homestay',
    img:    '/images/retreats/darma-detox/panchachuli-base-trekker-glacier-stream-wilderness-day9.jfif',
    imgAlt: 'Trekker beside glacier stream with Panchachuli massif, wilderness day',
  },
  {
    route:  'DAY 10 · DUKTU → DHARCHULA',
    theme:  'Return Through the Valley',
    desc:   'The return journey offers a final opportunity to absorb the beauty and solitude of Darma Valley. As you retrace the trail back toward Dharchula, there is time to reflect on the experiences, friendships, and insights gained during the expedition. A farewell gathering with the trekking team marks the end of the wilderness phase.',
    exp:    ['Final Darma Valley morning', 'Return trail reflection walk', 'Farewell gathering with expedition team', 'Sharing circle', 'Return to Dharchula'],
    stay:   'Dharchula',
    img:    '/images/retreats/darma-detox/himalayan-footbridge-glacial-river-return-journey-day10.jfif',
    imgAlt: 'Himalayan footbridge over glacial river, return journey through valley',
  },
  {
    route:  'DAY 11 · DHARCHULA → PITHORAGARH',
    theme:  'Wellness Reintegration',
    desc:   "After days immersed in nature, today's focus shifts toward recovery and reintegration. Upon arrival in Pithoragarh, guests enjoy a wellness programme designed to support both body and mind after the trek. Experiences include an Ayurvedic consultation, herbal therapies, relaxation treatments, and a restorative wellness session inspired by traditional Panchakarma principles.",
    exp:    ['Scenic return drive', 'Ayurvedic consultation', 'Herbal therapy treatments', 'Panchakarma-inspired restoration session', 'Body and mind recovery programme'],
    stay:   'Premium Wellness Hotel, Pithoragarh',
    img:    '/images/retreats/darma-detox/yoga-wellness-reintegration-golden-mountain-horizon-day11.jfif',
    imgAlt: 'Yoga wellness reintegration at golden mountain horizon, Pithoragarh',
  },
  {
    route:  'DAY 12 · PITHORAGARH → DEPARTURE',
    theme:  'The Art of Returning',
    desc:   'The final day is dedicated to integrating the lessons of the journey. A guided forest immersion at Thalkedar offers one last opportunity to connect with the natural world. Visit local Kumaoni markets, then gather at Chandak Hill for a sunset reflection ceremony. Each guest receives a personalised 30-day reintegration guide designed to carry the benefits of the journey into everyday life.',
    exp:    ['Thalkedar guided forest immersion', 'Kumaoni market visit', 'Chandak Hill sunset reflection ceremony', '30-day reintegration guide handover', 'Departure'],
    stay:   'Departure day',
    img:    '/images/retreats/darma-detox/himalayan-peaks-reflection-water-dawn-departure-day12.jfif',
    imgAlt: 'Himalayan peaks reflected in still water at dawn, final departure day',
  },
]

const INCLUDED = [
  {
    title: 'Accommodation',
    items: [
      'Premium Hotel — Pithoragarh (Days 1, 2)',
      'Boutique Guesthouse — Dharchula (Day 3)',
      'Premium Expedition Camps (Days 4, 5)',
      'Village Camp (Day 6)',
      'Village Homestay — Duktu (Days 7, 8, 9)',
      'Dharchula guesthouse (Day 10)',
      'Premium Wellness Hotel — Pithoragarh (Day 11)',
    ],
  },
  {
    title: 'Wilderness Experiences',
    items: [
      'Quality expedition camping equipment throughout',
      'Daily breathwork and meditation on trail',
      'Guided yoga sessions facing Panchachuli',
      'Digital detox support and phone storage',
      'Panchachuli wilderness immersion day',
      'Personal silence and reflection day',
      'Personalised 30-day reintegration programme',
    ],
  },
  {
    title: 'Cultural Experiences',
    items: [
      'Shauka community cultural immersion',
      'Traditional weaving demonstration',
      'Home-hosted village experience in Duktu',
      'Ancient trade route storytelling',
      'Chandak Hill sunset reflection ceremony',
      'Thalkedar guided forest immersion',
    ],
  },
  {
    title: 'Wellness',
    items: [
      'Ayurvedic consultation on Day 11',
      'Herbal therapy treatments',
      'Panchakarma-inspired restoration session',
      'Body and mind reintegration programme',
    ],
  },
  {
    title: 'Dining & Logistics',
    items: [
      'Daily breakfast, lunch, and dinner',
      'English-speaking expedition leader',
      'Local mountain guides and support staff',
      'All internal transportation and trek logistics',
    ],
  },
]

const NOT_INCLUDED = [
  'International or domestic flights',
  'Travel insurance (mandatory)',
  'Personal trekking equipment (kit list on booking)',
  'Alcoholic beverages',
  'Personal expenses and gratuities',
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function DarmaDetox() {
  useSEO({
    title:       'Darma Valley Digital Detox & Panchachuli Immersion — 12-Day Retreat | Himalayan Serenity',
    description: 'Detox retreat in Darma Valley, Uttarakhand. 12-day digital detox & Ayurvedic reintegration in remote Kumaon wilderness — Panchachuli & Shauka culture. Max 6 guests.',
    canonical:   'https://www.himalayanserenitytravel.com/retreats/darma-detox',
  })

  const [form, setForm] = useState({
    name: '', country: '', retreat: 'Darma Valley Digital Detox',
    dates: '', groupSize: '', fitnessLevel: '', email: '', message: '',
  })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      const payload = {
        access_key:     WEB3FORMS_ACCESS_KEY,
        subject:        `Retreat Enquiry — ${form.retreat}`,
        from_name:      form.name,
        name:           form.name,
        email:          form.email,
        country:        form.country,
        retreat:        form.retreat,
        dates:          form.dates,
        group_size:     form.groupSize,
        fitness_level:  form.fitnessLevel,
        message:        form.message,
        botcheck:       '',
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
      <Navbar activePage="darma-detox" />

      {/* ── SECTION 1 — HERO ─────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen bg-[#0a100d] flex flex-col justify-start overflow-hidden">
        <img
          src="/images/retreats/darma-detox/darma-valley-panchachuli-peaks-golden-sunrise-hero.jfif"
          alt="Panchachuli peaks at golden sunrise over Darma Valley, Uttarakhand"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: '50% 50%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80"></div>
        <Link to="/" className="relative z-30 block pt-24 pb-4 px-6 lg:px-16 text-sm text-white/50 hover:text-white/80 transition-colors">← Back to Home</Link>
        <div className="relative z-20 px-6 lg:px-16 pb-16">
          <span className="inline-block border border-[#1D9E75] text-[#1D9E75] uppercase text-xs rounded-full px-3 py-1 mb-4">
            Wilderness Detox · 12 Days
          </span>
          <h1 className="font-serif text-[#f0ece4] text-4xl lg:text-6xl font-normal leading-tight mb-4">
            Darma Valley Detox Retreat — Digital Detox in Uttarakhand
          </h1>
          <p className="font-serif italic text-[#1D9E75] text-xl mb-6">
            Wilderness · Culture · Silence · Self-Discovery
          </p>
          <div className="mb-8">
            {['12 Days / 11 Nights', 'Darma Valley', 'Max 6 Guests'].map(stat => (
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
              className="bg-[#1D9E75] text-white rounded-full px-6 py-3 text-sm font-medium hover:bg-[#0F6E56] transition-colors duration-200"
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
          <p className="text-[#1D9E75] text-xs uppercase tracking-widest mb-6">
            A Journey Into the Hidden Himalaya
          </p>
          <h2 className="font-serif text-[#f0ece4] text-2xl lg:text-3xl font-normal leading-relaxed mb-8 italic">
            "There are still places in the world where silence<br />
            is not a luxury but a way of life."
          </h2>
          <p className="text-[#f0ece4]/60 text-sm leading-relaxed max-w-2xl mx-auto mb-4 text-left">
            Hidden beyond the familiar routes of Himalayan tourism, Darma Valley remains one of
            India's last truly untouched mountain landscapes. Home to the indigenous Shauka community
            and framed by the{' '}
            <Link to="/retreats/panchachuli-wellness" style={{ color: '#1D9E75', textDecoration: 'none' }}>magnificent Panchachuli peaks</Link>,
            this remote valley offers something increasingly rare in modern travel: genuine disconnection.
          </p>
          <p className="text-[#f0ece4]/60 text-sm leading-relaxed max-w-2xl mx-auto mb-4 text-left">
            For twelve transformative days, you will leave behind schedules, notifications, and
            constant connectivity, exchanging them for glacier-fed rivers, ancient shepherd trails,
            traditional mountain villages, and some of the most spectacular Himalayan scenery on Earth.
          </p>
          <p className="font-medium text-[#f0ece4]/80 mt-6 font-serif italic text-lg">
            This is not simply a trek. It is an immersive journey into wilderness, culture, and self-discovery.
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
            const dayNum = i + 1
            return (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 border-b border-[#1D9E75]/10 ${isEven ? 'bg-[#0a1510]' : 'bg-[#0d1a0f]'}`}
              >
                {/* Image column */}
                <div className={`h-[260px] lg:h-[420px] overflow-hidden ${isEven ? 'order-first lg:order-last' : ''}`}>
                  {day.img ? (
                    <img
                      src={day.img}
                      alt={day.imgAlt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      style={{ objectPosition: '50% 50%' }}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#0a1a0e] flex items-center justify-center text-[#1D9E75]/20 text-xs tracking-widest uppercase">
                      Day {dayNum} · Image
                    </div>
                  )}
                </div>

                {/* Text column */}
                <div className={`px-6 py-8 lg:p-10 xl:p-14 flex flex-col justify-center ${isEven ? 'order-last lg:order-first' : ''}`}>
                  <p className="text-[#1D9E75] text-xs font-medium tracking-[0.2em] uppercase mb-2">
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
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1D9E75] flex-shrink-0 mt-1.5"></span>
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

      {/* ── SECTION 4 — ACCENT BREAK ─────────────────────────────────────── */}
      <div className="w-full border-t border-b border-[#1D9E75]/20 overflow-hidden">
        <img
          src="/images/retreats/darma-detox/darma-valley-gorge-waterfall-himalayan-wilderness.jfif"
          alt="Darma Valley dramatic gorge with waterfalls, Himalayan wilderness"
          loading="lazy"
          className="w-full object-cover"
          style={{ height: '50vh', objectPosition: '50% 40%' }}
        />
      </div>

      {/* ── SECTION 5 — WHAT'S INCLUDED ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-20">
        <p className="text-[#1D9E75] text-xs uppercase tracking-widest mb-4">{"What's Included"}</p>
        <h2 className="font-serif text-[#f0ece4] text-2xl lg:text-3xl mb-10">Everything taken care of</h2>

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

      {/* ── SECTION 6 — SIGNATURE PROMISE ───────────────────────────────── */}
      <section className="bg-[#061008] py-20 px-6 text-center">
        <h2 className="font-serif text-[#f0ece4] text-3xl max-w-2xl mx-auto leading-snug">
          This is not a trekking holiday.
        </h2>
        <p className="text-[#f0ece4]/60 text-sm leading-relaxed max-w-2xl mx-auto mt-6 text-left">
          It is an opportunity to experience one of the last truly remote valleys of the Himalaya
          through the lenses of wilderness, culture, wellness, and meaningful human connection.
        </p>
        <p className="text-[#f0ece4]/60 text-sm leading-relaxed max-w-2xl mx-auto mt-4 text-left">
          For those willing to step away from the modern world, Darma Valley offers something
          increasingly difficult to find: space to breathe, time to reflect, and a journey worth
          remembering.
        </p>
        <p className="font-serif italic text-[#1D9E75] text-xl text-center mt-10">
          Space to breathe. Time to reflect.<br />
          A journey worth remembering.
        </p>
      </section>

      {/* ── SECTION 7 — ENQUIRY FORM ─────────────────────────────────────── */}
      <section id="enquiry" className="bg-[#061008] py-16 px-6">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-[#f0ece4] text-3xl mb-2">Book your place on this retreat</h2>
          <p className="text-sm text-[#f0ece4]/50 mb-8">
            Maximum 6 guests per departure. We respond within 24 hours.
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
                placeholder="e.g. September 2026" className={INPUT_CLASS}
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
              </select>
              <select
                name="fitnessLevel" value={form.fitnessLevel} onChange={handleChange}
                required className={`${INPUT_CLASS} bg-[#0d1a0d]`}
              >
                <option value="" disabled>Fitness level</option>
                <option>Moderate</option>
                <option>Good</option>
                <option>Excellent — I trek regularly</option>
              </select>
              <input
                type="email" name="email" value={form.email} onChange={handleChange}
                placeholder="Your email address" required className={INPUT_CLASS}
              />
              <textarea
                name="message" value={form.message} onChange={handleChange}
                placeholder="Any questions, health considerations, or special requirements?"
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
