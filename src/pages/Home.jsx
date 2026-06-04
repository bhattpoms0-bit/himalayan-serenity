import React from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import Packages from '../components/Packages'
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

        {/* ── Audience Split ────────────────────────────────────────────── */}
        <section aria-label="Who we serve" className="bg-[#0d0d0d] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10">
            <div className="flex flex-col md:flex-row gap-4">

              {/* Left — Indian Pilgrims */}
              <div className="flex-1 border border-[#e07b2a]/20 rounded-xl p-8">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#e07b2a] mb-3">
                  Indian Pilgrims &amp; Trekkers
                </p>
                <p className="font-sans text-sm text-white/60 leading-relaxed mb-5">
                  Adi Kailash, Om Parvat, Panchachuli yatras
                </p>
                <Link
                  to="/experiences"
                  className="font-sans text-sm text-[#e07b2a] no-underline hover:opacity-75 transition-opacity duration-200"
                >
                  Explore expeditions →
                </Link>
              </div>

              {/* Right — International Travellers */}
              <div className="flex-1 border border-[#1D9E75]/20 rounded-xl p-8">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1D9E75] mb-3">
                  International Travellers
                </p>
                <p className="font-sans text-sm text-white/60 leading-relaxed mb-5">
                  Yoga, meditation, Ayurveda &amp; detox retreats
                </p>
                <Link
                  to="/international-retreats"
                  className="font-sans text-sm text-[#1D9E75] no-underline hover:opacity-75 transition-opacity duration-200"
                >
                  Discover retreats →
                </Link>
              </div>

            </div>
          </div>
        </section>

        <section aria-label="Why Choose Us"><WhyChooseUs /></section>
        <section id="packages-section" aria-label="Packages"><Packages /></section>

        {/* ── International Retreats Preview ────────────────────────────── */}
        <section aria-label="International Retreats" className="bg-[#0a100d] py-28 lg:py-36">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            {/* Header */}
            <div className="text-center mb-16">
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#1D9E75] mb-5">
                International Retreats · Yoga · Meditation · Ayurveda
              </p>
              <h2 className="font-serif text-brand-cream text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-[-0.02em]">
                Heal in the world's most sacred mountains
              </h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">

              {/* Card 1 — Yoga & Ayurveda */}
              <Link to="/international-retreats" className="no-underline group">
                <div className="rounded-2xl border border-[#1D9E75]/20 bg-[#0d1510] p-8 h-full flex flex-col transition-all duration-300 group-hover:border-[#1D9E75]/40 group-hover:-translate-y-1">
                  <span className="inline-block self-start font-sans text-[10px] uppercase tracking-[0.15em] text-[#1D9E75] bg-[#1D9E75]/10 rounded-full px-3 py-1.5 mb-6">
                    Yoga &amp; Ayurveda
                  </span>
                  <h3 className="font-serif text-white text-xl leading-snug mb-3">
                    Kumaon Wellness Immersion
                  </h3>
                  <p className="font-sans text-sm text-white/50 mb-5">
                    Munsiyari · 7 nights · No permit required
                  </p>
                  <p className="font-sans text-sm font-medium text-[#1D9E75] mt-auto">
                    From €1,400 per person
                  </p>
                </div>
              </Link>

              {/* Card 2 — Wilderness Detox */}
              <Link to="/international-retreats" className="no-underline group">
                <div className="rounded-2xl border border-[#1D9E75]/20 bg-[#0d1510] p-8 h-full flex flex-col transition-all duration-300 group-hover:border-[#1D9E75]/40 group-hover:-translate-y-1">
                  <span className="inline-block self-start font-sans text-[10px] uppercase tracking-[0.15em] text-[#1D9E75] bg-[#1D9E75]/10 rounded-full px-3 py-1.5 mb-6">
                    Wilderness Detox
                  </span>
                  <h3 className="font-serif text-white text-xl leading-snug mb-3">
                    Darma Valley Detox Trek
                  </h3>
                  <p className="font-sans text-sm text-white/50 mb-5">
                    Darma Valley · 11 nights · No permit required
                  </p>
                  <p className="font-sans text-sm font-medium text-[#1D9E75] mt-auto">
                    From €2,200 per person
                  </p>
                </div>
              </Link>

              {/* Card 3 — Women Only */}
              <Link to="/international-retreats" className="no-underline group">
                <div className="rounded-2xl border border-pink-500/20 bg-[#110d0e] p-8 h-full flex flex-col transition-all duration-300 group-hover:border-pink-500/40 group-hover:-translate-y-1">
                  <span className="inline-block self-start font-sans text-[10px] uppercase tracking-[0.15em] text-pink-400 bg-pink-500/10 rounded-full px-3 py-1.5 mb-6">
                    Women Only
                  </span>
                  <h3 className="font-serif text-white text-xl leading-snug mb-3">
                    Women's Sacred Himalaya Retreat
                  </h3>
                  <p className="font-sans text-sm text-white/50 mb-5">
                    Munsiyari + Darma · 9 nights
                  </p>
                  <p className="font-sans text-sm font-medium text-pink-400 mt-auto">
                    From €2,000 per person
                  </p>
                </div>
              </Link>

            </div>

            {/* Explore all link */}
            <div className="flex justify-center">
              <Link
                to="/international-retreats"
                className="font-sans text-sm text-[#1D9E75] no-underline hover:opacity-75 transition-opacity duration-200"
              >
                Explore all international retreats →
              </Link>
            </div>

          </div>
        </section>

        <section aria-label="Testimonials"><Testimonials /></section>
        <section aria-label="Call to Action"><CTASection /></section>
      </main>

      <Footer />
    </div>
  )
}
