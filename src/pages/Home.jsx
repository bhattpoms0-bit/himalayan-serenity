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
    canonical: 'https://www.himalayanserenitytravel.com/',
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
        <section aria-label="Who we serve" className="bg-[#0d0d0d] py-10">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex flex-col md:flex-row gap-4">

              {/* Card 1 — Indian Pilgrims */}
              <Link to="/experiences" className="flex-1 no-underline group">
                <div className="relative h-[300px] rounded-[10px] overflow-hidden">
                  <img
                    src="/images/packages/adi-kailash/om-parvat-1.webp"
                    alt="Om Parvat sacred mountain, Adi Kailash yatra Kumaon Himalaya"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-sans" style={{ color: '#e07b2a', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 0 }}>
                      Indian Pilgrims &amp; Trekkers
                    </p>
                    <h3 className="font-serif text-white" style={{ fontSize: 22, fontWeight: 400, margin: '6px 0' }}>
                      Adi Kailash, Om Parvat &amp; Panchachuli Yatras
                    </h3>
                    <p className="font-sans" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 300, marginBottom: 10 }}>
                      Sacred high-altitude pilgrimages from Pithoragarh into the divine Kumaon Himalaya.
                    </p>
                    <span className="font-sans" style={{ color: '#e07b2a', fontSize: 13, fontWeight: 500 }}>
                      Explore expeditions →
                    </span>
                  </div>
                </div>
              </Link>

              {/* Card 2 — International Travellers */}
              <Link to="/international-retreats" className="flex-1 no-underline group">
                <div className="relative h-[300px] rounded-[10px] overflow-hidden">
                  <img
                    src="/images/retreats/kumaon-wellness/group-yoga-khaliya-top-panchachuli-himalaya-hero.webp"
                    alt="Group yoga at Khaliya Top with Panchachuli peaks, Kumaon wellness retreat"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0) 100%)' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="font-sans" style={{ color: '#1D9E75', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 0 }}>
                      International Travellers
                    </p>
                    <h3 className="font-serif text-white" style={{ fontSize: 22, fontWeight: 400, margin: '6px 0' }}>
                      Yoga, Ayurveda &amp; Himalayan Wellness Retreats
                    </h3>
                    <p className="font-sans" style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 300, marginBottom: 10 }}>
                      Transformative retreats designed for global seekers — no permits required.
                    </p>
                    <span className="font-sans" style={{ color: '#1D9E75', fontSize: 13, fontWeight: 500 }}>
                      Discover retreats →
                    </span>
                  </div>
                </div>
              </Link>

            </div>
          </div>
        </section>

        <section id="packages-section" aria-label="Packages"><Packages /></section>

        {/* ── International Retreats Preview ────────────────────────────── */}
        <section aria-label="International Retreats" className="bg-[#0a100d] pt-16 pb-16">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            {/* Header */}
            <div className="mb-16">
              <span style={{ color: '#C8A44B', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: 12 }}>
                International Retreats
              </span>
              <h2 className="font-serif text-brand-cream text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-[-0.02em]">
                Heal in the world's most sacred mountains
              </h2>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">

              {/* Card 1 — Panchachuli Wellness */}
              <Link to="/retreats/panchachuli-wellness" className="no-underline group">
                <div className="bg-[#0a1a0a] border border-[#1D9E75]/10 rounded-2xl h-full flex flex-col overflow-hidden hover:border-[#1D9E75]/30 transition-colors duration-200">
                  <img
                    src="/images/retreats/kumaon-wellness-retreat-card.jfif"
                    alt="Group yoga at Khaliya Top with Panchachuli peaks, Kumaon Wellness Retreat"
                    loading="lazy"
                    className="w-full object-cover"
                    style={{ height: 220, objectPosition: 'center' }}
                  />
                  <div className="flex flex-col flex-1 p-7">
                    <span className="inline-block self-start text-xs rounded-full px-3 py-1 mb-4 bg-[#1D9E75]/20 text-[#5DCAA5]">
                      Yoga &amp; Ayurveda
                    </span>
                    <h3 className="font-serif text-[#f0ece4] text-xl mb-2">
                      Panchachuli Himalayan Wellness &amp; Cultural Immersion Retreat
                    </h3>
                    <p className="text-[#f0ece4]/50 text-sm mb-3">Munsiyari · Khaliya Top · 7 nights</p>
                    <p className="text-[#f0ece4]/60 text-sm mb-6">Daily yoga · Sattvic diet · Ayurvedic massage · Panchachuli sunrise</p>
                    <p className="text-[#e07b2a] font-medium mt-auto">From €1,400 per person</p>
                  </div>
                </div>
              </Link>

              {/* Card 2 — Women's Sacred Himalaya */}
              <Link to="/retreats/womens-retreat" className="no-underline group">
                <div className="bg-[#0a1a0a] border border-[#1D9E75]/10 rounded-2xl h-full flex flex-col overflow-hidden hover:border-[#1D9E75]/30 transition-colors duration-200">
                  <img
                    src="/images/retreats/womens-retreat/international-woman-kumaoni-women-himalayan-village-panchachuli.png"
                    alt="International woman with Kumaoni women in Himalayan village with Panchachuli peaks, Women of Kumaon retreat"
                    loading="lazy"
                    className="w-full object-cover"
                    style={{ height: 220, objectPosition: 'center top' }}
                  />
                  <div className="flex flex-col flex-1 p-7">
                    <span className="inline-block self-start text-xs rounded-full px-3 py-1 mb-4 bg-pink-900/30 text-pink-300">
                      Women Only
                    </span>
                    <h3 className="font-serif text-[#f0ece4] text-xl mb-2">
                      Women's Sacred Himalaya Retreat
                    </h3>
                    <p className="text-[#f0ece4]/50 text-sm mb-3">Munsiyari + Darma · 9 nights</p>
                    <p className="text-[#f0ece4]/60 text-sm mb-6">Female guides · Shakti yoga · Cultural exchange · Moon meditation</p>
                    <p className="text-[#e07b2a] font-medium mt-auto">From €2,000 per person</p>
                  </div>
                </div>
              </Link>

              {/* Card 3 — Borderlands (centered on tablet) */}
              <div className="md:col-span-2 lg:col-span-1">
                <div className="md:w-1/2 md:mx-auto lg:w-full">
                  <Link to="/retreats/borderlands-himalaya" className="no-underline group">
                    <div className="bg-[#0a1a0a] border border-[#1D9E75]/10 rounded-2xl h-full flex flex-col overflow-hidden hover:border-[#1D9E75]/30 transition-colors duration-200">
                      <img
                        src="/images/retreats/borderlands/kumaon-himalaya-luxury-retreat-sunrise-view.png"
                        alt="Kumaon Himalaya luxury retreat sunrise view, Borderlands of the Himalaya cultural journey"
                        loading="lazy"
                        className="w-full object-cover"
                        style={{ height: 220, objectPosition: 'center' }}
                      />
                      <div className="flex flex-col flex-1 p-7">
                        <span className="inline-block self-start text-xs rounded-full px-3 py-1 mb-4 bg-purple-900/30 text-purple-300">
                          Ultra Premium
                        </span>
                        <h3 className="font-serif text-[#f0ece4] text-xl mb-2">
                          The Borderlands of the Himalaya
                        </h3>
                        <p className="text-[#f0ece4]/50 text-sm mb-3">Johar Valley · Abbott Mount · Kasar Devi · Lohaghat</p>
                        <p className="text-[#f0ece4]/60 text-sm mb-6">Myths · Mountains · Ancient Trade Routes · Signature experiences</p>
                        <p className="text-[#e07b2a] font-medium mt-auto">From €1,800 per person</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

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

        <section aria-label="Why Choose Us"><WhyChooseUs /></section>

        {/* ── Brand Story ──────────────────────────────────────────────────── */}
        <section aria-label="Brand Story" className="bg-brand-dark" style={{ paddingTop: '64px', paddingBottom: '80px' }}>
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex flex-col md:flex-row" style={{ minHeight: 480 }}>

              {/* Left column — image */}
              <div className="w-full md:w-1/2 overflow-hidden rounded-[8px]" style={{ minHeight: 280 }}>
                {/* TODO: replace with Trishul or Om Parvat image if a higher-res version is added */}
                <img
                  src="/images/om-parvat-shrine.webp"
                  alt="Om Parvat sacred shrine, Himalayan pilgrimage Kumaon Uttarakhand"
                  className="w-full h-[280px] md:h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Right column — text */}
              <div
                className="w-full md:w-1/2 flex flex-col justify-center px-6 py-10 md:px-12 md:py-16"
              >
                <span style={{ color: '#C8A44B', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: 16 }}>
                  OUR PHILOSOPHY
                </span>

                <h2 className="font-serif text-white" style={{ fontSize: 36, lineHeight: 1.2, marginBottom: 20 }}>
                  Where the Sacred Meets the Summit
                </h2>

                <div style={{ width: 40, height: 2, background: '#C8A44B', display: 'block', marginBottom: 24 }} />

                <p className="font-sans" style={{ fontSize: 15, color: 'rgba(255,255,255,0.62)', lineHeight: 1.75, marginBottom: 16 }}>
                  In the shadow of the world's highest peaks, spirituality is not a practice — it is the very air one breathes. Our journeys are curated to facilitate an internal ascent as profound as the physical climb.
                </p>

                <p className="font-sans" style={{ fontSize: 15, color: 'rgba(255,255,255,0.62)', lineHeight: 1.75, marginBottom: 32 }}>
                  We invite you to step into the sacred spaces where the veil between the earthly and the divine is at its thinnest.
                </p>

                <Link
                  to="/about"
                  style={{ color: '#C8A44B', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500, textDecoration: 'none' }}
                >
                  Discover our story →
                </Link>
              </div>

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
