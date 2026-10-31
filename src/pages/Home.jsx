import React from 'react'
import { Link } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import BrandPromise from '../components/BrandPromise'
import Packages from '../components/Packages'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'
import { RetreatPrice } from '../components/RetreatDetails'
import { PANCHACHULI_WELLNESS, WOMENS_SACRED_HIMALAYA, retreatCardMeta } from '../data/retreats'

export default function Home() {
  useSEO({
    title: 'Himalayan Wellness Retreats in Kumaon, India | Himalayan Serenity Travel',
    description: 'Intimate yoga retreats, mindful mountain experiences and authentic Himalayan culture in Kumaon, Uttarakhand, India. Explore Himalayan Serenity wellness retreats and sacred journeys.',
    canonical: 'https://www.himalayanserenitytravel.com/',
  })
  return (
    <div className="min-h-screen bg-brand-dark pb-24 lg:pb-0">
      <Navbar activePage="home" />
      <main>
        <Hero />

        <section aria-label="Choose your Himalayan journey" className="bg-[#0d0d0d] py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { title: 'Himalayan Wellness Retreats', description: 'Curated yoga, mindfulness and cultural experiences in the Kumaon Himalaya.', cta: 'Explore Retreats', href: '/international-retreats', image: '/images/retreats/kumaon-wellness/group-yoga-khaliya-top-panchachuli-himalaya-hero.webp', alt: 'Yoga in the Kumaon Himalaya' },
              { title: 'Sacred Himalayan Journeys', description: 'Thoughtfully planned pilgrimages and cultural journeys through the sacred landscapes of Kumaon.', cta: 'Discover Journeys', href: '/experiences', image: '/images/packages/adi-kailash/om-parvat-1.webp', alt: 'Om Parvat in the Kumaon Himalaya' },
            ].map(pathway => (
              <Link key={pathway.href} to={pathway.href} className="group relative flex items-end min-h-[340px] sm:min-h-[360px] rounded-xl overflow-hidden border border-white/10">
                <img src={pathway.image} alt={pathway.alt} loading="lazy" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10" />
                <div className="relative p-6 sm:p-8">
                  <h2 className="font-serif text-brand-cream text-2xl sm:text-3xl leading-tight mb-4">{pathway.title}</h2>
                  <p className="text-brand-cream-muted text-sm leading-relaxed max-w-md mb-5">{pathway.description}</p>
                  <span data-floating-avoid className="inline-flex items-center min-h-11 font-sans text-brand-gold text-sm group-hover:underline underline-offset-4">{pathway.cta} →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── International Retreats Preview ────────────────────────────── */}
        <section aria-label="International Retreats" className="bg-[#0a100d] pt-16 pb-16">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

            {/* Header */}
            <div className="mb-16">
              <span style={{ color: '#C8A44B', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', display: 'block', marginBottom: 12 }}>
                International Retreats
              </span>
              <h2 className="font-serif text-brand-cream text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-[-0.02em]">
                Signature Himalayan Retreats
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
                      {PANCHACHULI_WELLNESS.listingName}
                    </h3>
                    <p className="text-[#f0ece4]/70 text-sm leading-relaxed mb-3">{retreatCardMeta(PANCHACHULI_WELLNESS)}</p>
                    <p className="text-[#f0ece4]/60 text-sm mb-6">{PANCHACHULI_WELLNESS.highlights}</p>
                    <div className="mt-auto"><RetreatPrice retreat={PANCHACHULI_WELLNESS} compact /></div>
                  </div>
                </div>
              </Link>

              {/* Card 2 — Women's Sacred Himalaya */}
              <Link to="/retreats/womens-retreat" className="no-underline group">
                <div className="bg-[#0a1a0a] border border-[#1D9E75]/10 rounded-2xl h-full flex flex-col overflow-hidden hover:border-[#1D9E75]/30 transition-colors duration-200">
                  <img
                    src="/images/retreats/womens-retreat/international-woman-kumaoni-women-himalayan-village-panchachuli.webp"
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
                      {WOMENS_SACRED_HIMALAYA.listingName}
                    </h3>
                    <p className="text-[#f0ece4]/70 text-sm leading-relaxed mb-3">{retreatCardMeta(WOMENS_SACRED_HIMALAYA)}</p>
                    <p className="text-[#f0ece4]/60 text-sm mb-6">{WOMENS_SACRED_HIMALAYA.highlights}</p>
                    <div className="mt-auto"><RetreatPrice retreat={WOMENS_SACRED_HIMALAYA} compact /></div>
                  </div>
                </div>
              </Link>

              {/* Card 3 — Borderlands (centered on tablet) */}
              <div className="md:col-span-2 lg:col-span-1">
                <div className="md:w-1/2 md:mx-auto lg:w-full">
                  <Link to="/retreats/borderlands-himalaya" className="no-underline group">
                    <div className="bg-[#0a1a0a] border border-[#1D9E75]/10 rounded-2xl h-full flex flex-col overflow-hidden hover:border-[#1D9E75]/30 transition-colors duration-200">
                      <img
                        src="/images/retreats/borderlands/kumaon-himalaya-luxury-retreat-sunrise-view.webp"
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
                Explore all wellness retreats →
              </Link>
            </div>

          </div>
        </section>

        <BrandPromise showThemes />

        <section id="packages-section" aria-label="Sacred Himalayan journeys"><Packages /></section>

        <section aria-labelledby="home-responsibility-title" className="bg-[#0b121a] py-16 sm:py-20 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-brand-gold text-xs uppercase tracking-luxury mb-4">Responsible Himalayan Travel</p>
            <h2 id="home-responsibility-title" className="font-serif text-brand-cream text-3xl sm:text-4xl leading-tight mb-6">Leave No Trace. Respect Every Life. Honour the Mountains.</h2>
            <p className="text-brand-cream-muted leading-relaxed mb-6">Respect local customs, sacred places and the communities that welcome us. Travel with care for the landscapes, wildlife and water sources along the way.</p>
            <Link to="/sustainability" className="inline-flex min-h-11 items-center text-brand-gold underline underline-offset-4">Our responsible-travel approach →</Link>
          </div>
        </section>

        <section aria-labelledby="home-company-title" className="border-y border-white/10 bg-brand-dark-2 px-6 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 id="home-company-title" className="font-serif text-brand-cream text-2xl sm:text-3xl mb-5">A personal connection to your Himalayan journey</h2>
            <p className="text-brand-cream-muted text-sm leading-relaxed mb-6">Himalayan Serenity Travel is a brand of LIFE &amp; LEISURE INDIA PRIVATE LIMITED, with a contact office in Pithoragarh and its registered office in Delhi.</p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-x-8 gap-y-3 text-sm">
              <a href="mailto:info@himalayanserenitytravel.com" className="min-h-11 inline-flex items-center break-all text-brand-gold underline underline-offset-4">info@himalayanserenitytravel.com</a>
              <a href="tel:+919084642557" className="min-h-11 inline-flex items-center text-brand-cream">+91 90846 42557</a>
              <Link to="/contact" className="min-h-11 inline-flex items-center text-brand-gold underline underline-offset-4">Our offices &amp; contact details →</Link>
            </div>
          </div>
        </section>
        <section aria-label="Call to Action"><CTASection /></section>
      </main>

      <Footer />
    </div>
  )
}
