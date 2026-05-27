import React from 'react'
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
          Sacred Himalayan Journeys — Adi Kailash, Om Parvat &amp; Kumaon Expeditions
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
      <Footer />
    </div>
  )
}
