import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useSEO } from '../hooks/useSEO'
import './experiences-hero.css'

// Existing expedition names, routes and imagery; no inventory or new product facts.
const EXPERIENCES = [
  { name: 'Adi Kailash Expedition', route: 'Pithoragarh · Dharchula · Gunji · Om Parvat', href: '/packages/adi-kailash-expedition', image: '/images/packages/adi-kailash-base.webp' },
  { name: 'Panchachuli Trekking Expedition', route: 'Munsiyari · Darkot · Duktu · Panchachuli Glacier Region', href: '/packages/panchachuli-expedition', image: '/images/packages/panchachuli-real.webp' },
  { name: 'Eastern Kumaon Cinematic Expedition', route: 'Lohaghat · Pithoragarh · Dharchula · Didihat', href: '/packages/cinematic-expedition', image: '/images/packages/johar-valley.webp' },
  { name: 'Eastern Kumaon Wilderness Expedition', route: 'Munsiyari · Khaliya Top · Milam Trail · Askot', href: '/packages/wilderness-expedition', image: '/images/packages/panchachuli-sunrise.webp' },
  { name: 'Women-Only Expedition (Darma Valley)', route: 'Dharchula · Darma Valley · Hidden Himalayan Villages', href: '/packages/darma-valley-womens-retreat', image: '/images/darma-valley-womens-retreat/woman-traveler-himalayan-mountain-sunset.webp' },
  { name: 'Himalayan Photography Expedition', route: 'Kumaon Himalaya', href: '/packages/photography-expedition', image: '/images/himalayan-photography-expedition/camera-tripod-golden-hour-himalayan-mountains.webp' },
]

export default function Experiences() {
  useSEO({
    title: 'Sacred Himalayan Journeys & Expeditions | Himalayan Serenity Travel',
    description: 'Explore our collection of sacred pilgrimages, cultural journeys and Himalayan expeditions, alongside our Himalayan wellness retreats.',
    canonical: 'https://www.himalayanserenitytravel.com/experiences',
  })
  return (
    <div className="min-h-screen bg-brand-dark text-brand-cream pb-24 lg:pb-0">
      <Navbar />
      <main>
        <header className="experiences-hero" aria-labelledby="experiences-hero-title">
          <img
            src="/images/om-parvat-view-himalayan-horses-pithoragarh.webp"
            alt="" aria-hidden="true" width="1080" height="670"
            fetchpriority="high" loading="eager" decoding="async"
            className="experiences-hero-image"
          />
          <div className="experiences-hero-shade" aria-hidden="true" />
          <div className="experiences-hero-content max-w-7xl mx-auto px-6 sm:px-8 pt-36 sm:pt-44 pb-12 sm:pb-16">
          <p className="section-tag mb-5">The expedition collection</p>
          <h1 id="experiences-hero-title" className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight max-w-4xl mb-6">Sacred Himalayan Journeys &amp; Expeditions</h1>
          <p className="font-sans text-brand-cream-muted text-base sm:text-lg leading-relaxed max-w-2xl">Discover sacred landscapes and cultural journeys through the Kumaon Himalaya. This collection complements our Himalayan wellness retreats, with a focus on pilgrimage, exploration and connection to place.</p>
          <Link to="/international-retreats" className="inline-flex items-center min-h-11 text-brand-gold underline underline-offset-4 mt-5">Explore our Himalayan wellness retreats →</Link>
          </div>
        </header>
        <section aria-label="Explore existing Himalayan expeditions" className="max-w-7xl mx-auto px-6 sm:px-8 pb-16 sm:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {EXPERIENCES.map(experience => (
              <article key={experience.href} className="overflow-hidden rounded-2xl bg-brand-dark-card border border-brand-dark-border flex flex-col">
                <img src={experience.image} alt={experience.name} loading="lazy" decoding="async" width="640" height="420" className="w-full aspect-[3/2] object-cover" />
                <div className="p-6 sm:p-7 flex flex-col flex-1">
                  <h2 className="font-serif text-2xl leading-snug mb-4">{experience.name}</h2>
                  <p className="font-sans text-brand-cream-muted text-sm leading-relaxed mb-6">{experience.route}</p>
                  <Link to={experience.href} className="mt-auto min-h-11 inline-flex items-center text-brand-gold text-sm underline underline-offset-4" aria-label={`Explore ${experience.name}`}>Explore journey →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="bg-brand-dark-2 border-t border-brand-dark-border px-6 py-14 sm:py-20 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="section-tag mb-4">A personal approach</p>
            <h2 className="font-serif text-3xl sm:text-4xl mb-5">Find a journey that feels meaningful to you.</h2>
            <p className="text-brand-cream-muted leading-relaxed mb-7">Explore the full itinerary on each journey page, or tell us about your interests so we can discuss the possibilities with you.</p>
            <Link to="/contact" className="btn-primary !text-brand-dark min-h-11">Send an enquiry</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
