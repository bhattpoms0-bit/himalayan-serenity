import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar activePage="about" />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/parvati-sarovar-hero.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <p className="section-tag mb-4">Elite Mountain Journeys</p>
          <h1 className="section-title text-5xl lg:text-6xl max-w-2xl">The Foundation of Your Journey</h1>
        </div>
      </section>

      {/* Why Choose Us Text */}
      <section className="py-20 bg-brand-dark-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="section-title text-3xl lg:text-4xl mb-6">Why Explorers Choose Us</h2>
              <p className="font-sans text-brand-text-muted text-base leading-relaxed">
                Beyond the peaks and the trails lies a commitment to safety, heritage, and
                excellence that defines every ascent we lead. Since 2012, we have crafted
                transformative journeys to the roof of the world.
              </p>
            </div>
            <div>
              <p className="font-sans text-brand-text-muted text-base leading-relaxed">
                Our team of expert Sherpas, spiritual guides, and logistics professionals
                ensures that every detail of your journey is handled with care. From oxygen
                support to luxury camping, we redefine what it means to explore the Himalayas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spiritual Significance */}
      <section className="py-20 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-tag mb-4">Sanctuary of the Soul</p>
              <h2 className="section-title text-4xl mb-6">Spiritual Significance</h2>
              <p className="font-sans text-brand-text-muted leading-relaxed mb-4">
                In the shadow of the world's highest peaks, spirituality is not a practice,
                but the very air one breathes. Our journeys are curated to facilitate an
                internal ascent as profound as the physical climb.
              </p>
              <p className="font-sans text-brand-text-muted leading-relaxed">
                We invite you to step into the sacred spaces where the veil between the
                earthly and the divine is thinnest.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-96">
              <img
                src="/images/om-parvat-shrine.jpg"
                alt="Om Parvat Shrine"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Culture Photo Grid */}
      <section className="py-20 bg-brand-dark-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-tag mb-4">The Living Culture</p>
            <h2 className="section-title text-4xl">Himalayan Culture</h2>
            <p className="font-sans text-brand-text-muted mt-4 max-w-xl mx-auto">
              Where time slows to the rhythm of ancient chants and every gesture is a prayer whispered to the wind.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { src: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80', label: 'The Wisdom of Elders', sub: 'Stories etched in time and tradition.' },
              { src: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=80', label: 'Eternal Flames', sub: 'A light that never fades in the cold.' },
              { src: 'https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=600&q=80', label: 'Rhythm of Faith', sub: 'Cycles of devotion in every turn.' },
            ].map((item, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden h-64 group">
                <img src={item.src} alt={item.label} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="section-tag mb-1">{item.label}</p>
                  <p className="font-sans text-white/60 text-xs">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
