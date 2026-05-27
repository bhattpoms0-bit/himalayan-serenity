import React from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TrustBar from '../components/TrustBar'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import Packages from '../components/Packages'
import SpiritualSection from '../components/SpiritualSection'
import RouteMap from '../components/RouteMap'
import Transformation from '../components/Transformation'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'

export default function Home() {
  // Respect system preference — animations skip/reduce for motion-sensitive users
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useSEO({
    title: 'Himalayan Serenity | Adi Kailash Yatra & Om Parvat Tour from Delhi',
    description: 'Book Adi Kailash Yatra, Om Parvat tour, Panchachuli trek and Darma Valley tour from Delhi. Adi Kailash temple darshan with Inner Line Permit. Headquartered in Pithoragarh & Dharchula, Uttarakhand.',
  })
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar activePage="home" />
      <main>
        {/* Visually hidden SEO h1 — Hero carries the visual heading (h2) */}
        <h1 style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
          Adi Kailash Yatra &amp; Om Parvat Tour from Delhi — Himalayan Serenity Travel
        </h1>
        <section aria-label="Hero"><Hero /></section>
        <TrustBar />
        <section aria-label="Why Choose Us"><WhyChooseUs /></section>
        <section id="packages-section" aria-label="Packages"><Packages /></section>
        <section aria-label="Testimonials"><Testimonials /></section>
        <SpiritualSection />
        <RouteMap />
        <Transformation />
        <section aria-label="Call to Action"><CTASection /></section>
      </main>

      {/* ── SEO Content Section — word count + keyword density ── */}
      <section className="dark-section" aria-label="About our expeditions">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          <h2 style={{ color: '#C9A84C', fontSize: '1.5rem', fontFamily: 'Georgia, serif', fontWeight: 400, marginBottom: '1.5rem' }}>
            Sacred Himalayan Journeys from Delhi — Adi Kailash, Om Parvat &amp; Kumaon Expeditions
          </h2>

          <p className="section-subtitle">
            Himalayan Serenity Travel is a Pithoragarh-based expedition company offering curated sacred journeys
            to Adi Kailash, Om Parvat, Panchachuli Base Camp and Darma Valley in the Kumaon Himalaya of
            Uttarakhand. Our expeditions combine spiritual pilgrimage, high-altitude adventure and authentic
            cultural immersion in some of India's most remote and breathtaking border landscapes.
          </p>

          <p className="section-subtitle">
            The Adi Kailash &amp; Om Parvat Expedition is our most sought-after pilgrimage package — a 6-day
            sacred journey from Delhi to Jolingkong, Parvati Sarovar, Gauri Kund and the Navidhang viewpoint
            of Om Parvat near Lipulekh Pass. Travelers also explore the Kali River valley, the historic trade
            route to Tibet and the high-altitude villages of Gunji, Nabi and Kuti in Pithoragarh district.
          </p>

          <p className="section-subtitle">
            Our Panchachuli Trekking Expedition takes adventurers deep into the Darma Valley wilderness
            beneath the five sacred peaks of Panchachuli — among the most dramatic trekking destinations in
            the Kumaon Himalaya. The Eastern Kumaon expeditions cover Munsiyari, Khaliya Top, Birthi Falls
            and the Johar Valley — ideal for photography, wildlife and nature immersion.
          </p>

          <p className="section-subtitle">
            All our expeditions include complete Inner Line Permit (ILP) assistance, medical documentation
            support, private vehicle transfers, handpicked accommodation and experienced local guides from
            Pithoragarh and Dharchula. We handle every detail — from Delhi departure to return — so travelers
            can focus entirely on the spiritual and natural beauty of the Himalayas.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '2.5rem' }}>
            {[
              { title: 'Adi Kailash & Om Parvat', desc: 'Sacred pilgrimage to the divine peaks of Pithoragarh' },
              { title: 'Panchachuli Trek',         desc: 'Darma Valley wilderness beneath five sacred summits' },
              { title: 'Kumaon Expeditions',       desc: 'Photography, wildlife and culture in Eastern Kumaon' },
              { title: 'Wellness Retreats',        desc: 'Himalayan yoga and meditation in the high mountains' },
            ].map(item => (
              <div key={item.title} style={{ borderLeft: '2px solid rgba(201,168,76,0.3)', paddingLeft: '1rem' }}>
                <h3 className="font-sans font-medium text-white" style={{ fontSize: '0.9rem', marginBottom: '0.4rem' }}>{item.title}</h3>
                <p className="font-sans" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.83rem', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <hr className="gold-divider" style={{ marginTop: '2.5rem' }} />

          <p className="font-sans" style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.45)' }}>
            Planning an Adi Kailash Yatra?{' '}
            <Link to="/blog/adi-kailash-ilp-guide-2026" style={{ color: '#C9A84C', textDecoration: 'none' }}>
              Read our Complete Guide to Adi Kailash ILP 2026 →
            </Link>
          </p>

        </div>
      </section>

      <Footer />
    </div>
  )
}
