import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Mail, Globe, CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react'
import { useSEO } from '../hooks/useSEO'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const EASE = [0.25, 0.46, 0.45, 0.94]

const fadeUp = {
  initial:     { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.8, ease: EASE },
}

const STATS = [
  { value: '30+',        label: 'Groups led into Eastern Kumaon' },
  { value: 'Multiple',   label: 'Visits to Adi Kailash & Om Parvat personally' },
  { value: '100%',       label: 'Inner Line Permits processed successfully' },
  { value: '0',          label: 'Safety incidents across all expeditions' },
  { value: 'Pithoragarh', label: 'Our headquarters — not Delhi, not Dehradun' },
]

const SPECIALITIES = [
  {
    title: 'Adi Kailash Yatra & Om Parvat',
    body:  "India's most sacred high-altitude pilgrimage. Inner Line Permits handled end-to-end. Over 30 groups led.",
    href:  '/packages/adi-kailash-expedition',
  },
  {
    title: 'Darma Valley Expeditions',
    body:  'One of the most remote valleys in the Himalaya. Very few operators know it. We grew up near it.',
    href:  '/retreats/darma-detox',
  },
  {
    title: 'Panchachuli Base Camp',
    body:  'Five sacred peaks. Via Munsiyari. Accessible for all fitness levels.',
    href:  '/packages/panchachuli-expedition',
  },
  {
    title: "Women's Himalayan Expeditions",
    body:  'Small, women-only groups. Safety and dignity built in — not bolted on.',
    href:  '/packages/darma-valley-womens-retreat',
  },
  {
    title: 'International Retreats',
    body:  'Four retreats built for international travellers — Himalayan wellness, digital detox, a women-only sacred journey and a high-end cultural expedition across Kumaon. From €1,400.',
    href:  '/international-retreats',
  },
  {
    title: 'Custom Private Expeditions',
    body:  'Your dates. Your group. Your pace. We build around you.',
    href:  '/contact',
  },
]

const PROMISES = [
  {
    title: 'Small groups — always.',
    body:  'We do not run large coaches of 40 people. Every expedition stays small enough that your guide knows your name, not just your booking number.',
  },
  {
    title: 'Safety first — not as a marketing line.',
    body:  'Oxygen support, an altitude medical kit, a satellite phone and emergency protocols are standard on every expedition. Not optional extras.',
  },
  {
    title: 'Honest communication.',
    body:  'If a route is closed, we tell you. If weather looks bad, we tell you. We would rather reschedule your trip than put you at risk.',
  },
  {
    title: 'Full Inner Line Permit handling.',
    body:  'Inner Line Permits for Adi Kailash are complex, time-sensitive and frequently mishandled by outside operators. We manage the entire process — you do not need to follow up with any government office.',
  },
  {
    title: 'Local stays, local guides.',
    body:  'We use Pithoragarh and Kumaon-based guides, homestays and local services wherever possible. Your money stays in the community that hosts you.',
  },
]

const TESTIMONIALS = [
  {
    quote: 'I had tried to do the Adi Kailash Yatra twice before with other operators and both times it fell apart — once due to permit issues, once because the group was too large and chaotic. With Himalayan Serenity, everything worked. The permit was ready before we even left Delhi. The group was just 8 people. I finally got my darshan.',
    name:  'Suresh Nair',
    info:  'Bangalore · Adi Kailash Yatra, September 2024',
  },
  {
    quote: "What I did not expect was how much these people actually know the place. Our guide pointed out things on the route — plants, old village paths, stories about the Bhotiya communities — that I could not have found in any guidebook. It felt like being shown someone's home, not taken on a tour.",
    name:  'Anita Sharma',
    info:  'Delhi · Darma Valley Expedition, June 2024',
  },
  {
    quote: 'The women-only expedition was exactly what I needed. Safe, well-paced, never rushed. The team understood that some of us were doing a high-altitude trek for the first time. I would go back without hesitation.',
    name:  'Priya Menon',
    info:  "Mumbai · Women's Himalayan Expedition, October 2024",
  },
]

const SCHEMA = {
  '@context':   'https://schema.org',
  '@type':      'TouristInformationCenter',
  name:         'Himalayan Serenity Travel',
  description:  'Pithoragarh-based expedition company specialising in Adi Kailash Yatra, Darma Valley and Eastern Kumaon expeditions. Founded and operated by a team born and raised in Kumaon, Uttarakhand.',
  url:          'https://www.himalayanserenitytravel.com',
  address: {
    '@type':        'PostalAddress',
    addressLocality: 'Pithoragarh',
    addressRegion:   'Uttarakhand',
    addressCountry:  'IN',
  },
  areaServed: ['Pithoragarh', 'Eastern Kumaon', 'Uttarakhand'],
  knowsAbout: ['Adi Kailash Yatra', 'Inner Line Permit', 'Darma Valley', 'Om Parvat', 'Panchachuli', 'Eastern Kumaon Expeditions'],
}

export default function AboutPage() {
  useSEO({
    title: 'About Us | Adi Kailash Yatra Specialists in Pithoragarh',
    description: 'Himalayan Serenity is a Pithoragarh-based Adi Kailash Yatra operator. Inner Line Permits, local guides and Eastern Kumaon expertise. 30+ groups led.',
    canonical: 'https://www.himalayanserenitytravel.com/about',
    schema: SCHEMA,
  })
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar activePage="about" />

      {/* Visually hidden SEO h1 */}
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        About Himalayan Serenity Travel — Adi Kailash Yatra Specialists in Pithoragarh, Kumaon Himalaya
      </h1>

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parvati-sarovar-hero.webp')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <p className="section-tag mb-4">Born in the Kumaon Himalaya</p>
          <h2 className="section-title text-4xl lg:text-5xl max-w-2xl">
            We are not travel agents who sell the Himalayas. We are people who grew up in them.
          </h2>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-brand-dark-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14 max-w-3xl mx-auto">
            <p className="section-tag mb-4">Our Story</p>
            <h2 className="section-title text-3xl lg:text-4xl">Home, Not a Destination</h2>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div {...fadeUp} className="space-y-5">
              <p className="font-sans text-brand-text-muted text-base leading-relaxed">
                We were born and raised in Pithoragarh, Uttarakhand — the same town where your journey into Eastern Kumaon begins.
              </p>
              <p className="font-sans text-brand-text-muted text-base leading-relaxed">
                These mountains are not a product for us. They are home. The routes to Adi Kailash, the villages of Darma Valley, the high passes above Munsiyari — we have known them since childhood, long before they appeared on any travel website.
              </p>
            </motion.div>
            <motion.div {...fadeUp} className="space-y-5">
              <p className="font-sans text-brand-text-muted text-base leading-relaxed">
                Himalayan Serenity Travel was founded with one simple belief: that the people who live closest to these mountains should be the ones who guide you through them.
              </p>
              <p className="font-sans text-brand-text-muted text-base leading-relaxed">
                For too long, Eastern Kumaon's most sacred and spectacular destinations — Adi Kailash, Om Parvat, Parvati Sarovar, Darma Valley — were handled by operators based in Delhi or Dehradun who had never actually walked the routes they were selling. Pilgrims arrived at high altitude unprepared. Permits were delayed. Groups were too large. The trip that should have mattered most to them became something they had to survive.
              </p>
              <p className="font-sans text-brand-cream text-base leading-relaxed font-medium">
                We started this company to change that.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-20 bg-brand-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-10">
            <p className="section-tag mb-4">By The Numbers</p>
            <h2 className="section-title text-3xl lg:text-4xl">Our Eastern Kumaon Track Record</h2>
          </motion.div>
          <div className="flex flex-wrap gap-4 lg:gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="grow shrink basis-[calc(50%-0.5rem)] lg:basis-0 min-w-0 overflow-hidden text-center rounded-2xl py-7 px-3"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div
                  className="font-sans font-bold"
                  style={{
                    fontSize:     'clamp(1rem, 1.8vw, 1.5rem)',
                    color:        '#e07b2a',
                    lineHeight:   1.15,
                    marginBottom: '10px',
                    whiteSpace:   'nowrap',
                    overflow:     'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {stat.value}
                </div>
                <p className="font-sans text-brand-text-muted text-sm leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Local Matters */}
      <section className="pt-32 pb-20 bg-brand-dark-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <p className="section-tag mb-4">Local Knowledge</p>
              <h2 className="section-title text-4xl mb-6">Why Being Local to Pithoragarh Changes Everything</h2>
              <p className="font-sans text-brand-text-muted leading-relaxed mb-4">
                When you ask us about road conditions on the Dharchula–Gunji stretch, we know — because one of our team drove it last week.
              </p>
              <p className="font-sans text-brand-text-muted leading-relaxed mb-4">
                When you ask which homestay in Gunji actually has warm water and good food, we know — because we have stayed there ourselves, not just read about it online.
              </p>
              <p className="font-sans text-brand-text-muted leading-relaxed mb-4">
                When you ask about the Inner Line Permit process, we do not have to make calls to find out — we have processed over a hundred of them, directly with the District Magistrate's office in Pithoragarh.
              </p>
              <p className="font-sans text-brand-text-muted leading-relaxed mb-4">
                This is the difference between a local operator and everyone else. No catalogue. No middlemen. No guesswork.
              </p>
              <p className="font-sans text-brand-cream leading-relaxed font-medium">
                We live here. This is our backyard. And we want to share it with you properly.
              </p>
            </motion.div>
            <motion.div {...fadeUp} className="relative rounded-2xl overflow-hidden h-96">
              <img
                src="/images/om-parvat-shrine.webp"
                alt="Om Parvat Shrine"
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Specialise In */}
      <section className="py-20 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="section-tag mb-4">Our Expertise</p>
            <h2 className="section-title text-3xl lg:text-4xl">What We Specialise In: Adi Kailash Yatra & Eastern Kumaon</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIALITIES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              >
                <Link to={item.href} className="card-dark block h-full group">
                  <h3 className="font-serif text-brand-cream text-lg mb-3 group-hover:text-brand-orange transition-colors duration-300">
                    {item.title} →
                  </h3>
                  <p className="font-sans text-brand-text-muted text-sm leading-relaxed">{item.body}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20 bg-brand-dark-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="section-tag mb-4">Our Promise</p>
            <h2 className="section-title text-3xl lg:text-4xl">What you can expect from us</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {PROMISES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.06 }}
                className="flex gap-4"
              >
                <CheckCircle2 size={20} className="text-brand-orange flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="font-sans text-brand-cream font-semibold text-sm mb-1.5">{item.title}</h3>
                  <p className="font-sans text-brand-text-muted text-sm leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <p className="section-tag mb-4">Traveller Stories</p>
            <h2 className="section-title text-3xl lg:text-4xl">What our travellers say</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="card-dark"
              >
                <span
                  style={{
                    fontFamily:   '"Playfair Display", Georgia, serif',
                    fontSize:     '3.5rem',
                    color:        'rgba(224,123,42,0.15)',
                    lineHeight:   1,
                    display:      'block',
                    marginBottom: '-12px',
                  }}
                >
                  "
                </span>
                <p className="font-serif italic text-brand-text-muted text-sm leading-[1.8] mb-6">{t.quote}</p>
                <hr className="border-white/[0.06] mb-4" />
                <p className="font-sans text-brand-cream text-sm font-medium">{t.name}</p>
                <p className="font-sans text-brand-text-muted text-xs mt-0.5">{t.info}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registered & Verified */}
      <section className="py-20 bg-brand-dark-2">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <p className="section-tag mb-4">Legitimacy</p>
            <h2 className="section-title text-3xl lg:text-4xl mb-6">Registered & Verified in Pithoragarh</h2>
            <p className="font-sans text-brand-text-muted leading-relaxed mb-10 max-w-2xl mx-auto">
              Himalayan Serenity Travel is a registered business operating from Pithoragarh, Uttarakhand — the gateway to Eastern Kumaon.
            </p>
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-5">
              <div className="flex items-center gap-2 text-brand-text-muted font-sans text-sm">
                <MapPin size={16} className="text-brand-orange" strokeWidth={1.5} />
                Pithoragarh, Uttarakhand 262501
              </div>
              <a
                href="mailto:parmod@himalayanserenitytravel.com"
                className="flex items-center gap-2 text-brand-text-muted hover:text-brand-orange font-sans text-sm transition-colors"
              >
                <Mail size={16} className="text-brand-orange" strokeWidth={1.5} />
                parmod@himalayanserenitytravel.com
              </a>
              <a
                href="https://himalayanserenitytravel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-text-muted hover:text-brand-orange font-sans text-sm transition-colors"
              >
                <Globe size={16} className="text-brand-orange" strokeWidth={1.5} />
                himalayanserenitytravel.com
              </a>
              <div className="flex items-center gap-2 text-brand-text-muted font-sans text-sm">
                <ShieldCheck size={16} className="text-brand-orange" strokeWidth={1.5} />
                TripAdvisor verified operator
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/images/packages/panchachuli-sunrise.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <div className="absolute inset-0" style={{ background: 'rgba(8, 18, 14, 0.85)' }} />
        <motion.div {...fadeUp} className="relative max-w-2xl mx-auto px-5 sm:px-8 lg:px-10 text-center">
          <p className="section-tag mb-6">Ready to Plan Your Journey?</p>
          <h2 className="section-title text-[2.4rem] lg:text-[3.2rem] mb-6 leading-[1.1]">
            Talk to our team directly.<br />No booking forms, no call centres.
          </h2>
          <p className="font-sans text-brand-text-muted text-[14.5px] leading-[1.75] mb-2 max-w-md mx-auto">
            <a href="https://wa.me/919084642557" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:text-brand-orange-light">
              WhatsApp us
            </a>{' '}
            — we respond within a few hours, usually faster.
          </p>
          <p className="font-sans text-brand-text-muted text-[14.5px] leading-[1.75] mb-10 max-w-md mx-auto">
            <a href="mailto:parmod@himalayanserenitytravel.com" className="text-brand-orange hover:text-brand-orange-light">
              Email us
            </a>{' '}
            — parmod@himalayanserenitytravel.com
          </p>
          <p className="font-sans text-brand-text-muted text-[14.5px] leading-[1.75] mb-10 max-w-md mx-auto">
            We will listen to what you want, tell you honestly whether it is possible, and if it is, build the expedition around your dates, your group and your budget.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Plan Your Expedition
            </Link>
            <Link to="/international-retreats" className="btn-secondary">
              See Our Packages
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
