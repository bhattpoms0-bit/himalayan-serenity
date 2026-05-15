import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CTASection from '../components/CTASection'
import { ArrowRight } from 'lucide-react'

const packages = [
  { title: 'Adi Kailash Yatra', days: 14, difficulty: 'Moderate', people: 12, price: '$2,500', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80', tag: 'Most Popular', tagColor: 'bg-brand-orange' },
  { title: 'Om Parvat Trek', days: 10, difficulty: 'Challenging', people: 8, price: '$3,200', image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80', tag: 'Spiritual Peak', tagColor: 'bg-indigo-900/80' },
  { title: 'Inner Kora', days: 6, difficulty: 'Easy', people: 16, price: '$1,200', image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80', tag: 'Sacred Route', tagColor: 'bg-amber-900/80' },
  { title: 'Luxury Camping', days: 5, difficulty: 'Easy', people: 10, price: '$2,800', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', tag: 'All-Inclusive', tagColor: 'bg-emerald-900/80' },
  { title: 'Photography Expedition', days: 12, difficulty: 'Moderate', people: 6, price: '$4,500', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80', tag: 'Limited Edition', tagColor: 'bg-purple-900/80' },
  { title: 'Himalayan Photography Expedition', days: 8, difficulty: 'Easy', people: 10, price: '$2,100', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80', tag: 'Comfort Plus', tagColor: 'bg-amber-900/80' },
]

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar activePage="packages" />

      <section className="pt-32 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="section-tag mb-4">All Packages</p>
          <h1 className="section-title text-5xl lg:text-6xl mb-5">Choose Your Journey</h1>
          <p className="font-sans text-brand-text-muted text-lg leading-relaxed">
            Every expedition is crafted to balance spiritual depth, physical adventure, and luxury comfort.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, i) => (
              <div key={i} className="card-dark group cursor-pointer p-0 overflow-hidden">
                <div className="relative h-52">
                  <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className={`absolute top-4 left-4 ${pkg.tagColor} text-white text-xs font-sans px-3 py-1 rounded-full`}>{pkg.tag}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-brand-cream text-xl mb-2">{pkg.title}</h3>
                  <p className="font-sans text-brand-text-muted text-xs mb-4">
                    {pkg.days} Days • {pkg.difficulty} • {pkg.people} People
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-sans text-brand-text-muted text-xs uppercase tracking-wider">Starting at</p>
                      <p className="font-sans text-brand-orange font-medium text-lg">{pkg.price}</p>
                    </div>
                    <button className="btn-primary text-xs px-4 py-2 flex items-center gap-1">
                      View Details <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  )
}
