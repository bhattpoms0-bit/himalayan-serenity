import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ArrowRight, MessageCircle } from 'lucide-react'

const expeditions = [
  {
    tag: 'Most Popular',
    tagColor: 'bg-brand-orange',
    title: 'Adi Kailash Expedition',
    subtitle: '14 Days • Moderate • 12 People',
    price: '$2,500',
    desc: 'Retrace the steps of sages and seekers along a route that has remained unchanged for millennia.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
  },
  {
    tag: 'Spiritual Peak',
    tagColor: 'bg-indigo-900/80',
    title: 'Om Parvat Journey',
    subtitle: '10 Days • Challenging • 8 People',
    price: '$3,200',
    desc: 'Witness the sacred natural Om symbol etched on the face of the mountain.',
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=80',
  },
  {
    tag: 'All-Inclusive',
    tagColor: 'bg-emerald-900/80',
    title: 'Luxury Spiritual Retreat',
    subtitle: '7 Days • Easy • 15 People',
    price: '$1,800',
    desc: 'A curated luxury experience combining meditation, mountain views and fine cuisine.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
  },
  {
    tag: 'Limited Edition',
    tagColor: 'bg-purple-900/80',
    title: 'Photography Expedition',
    subtitle: '12 Days • Moderate • 6 People',
    price: '$4,500',
    desc: 'Capture the Himalayas through the lens of a professional photographer guide.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80',
  },
  {
    tag: 'Comfort Plus',
    tagColor: 'bg-amber-900/80',
    title: 'Senior-Friendly Journey',
    subtitle: '8 Days • Easy • 10 People',
    price: '$2,100',
    desc: 'Thoughtfully designed for senior travelers seeking spiritual enrichment without strenuous trekking.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=80',
  },
  {
    tag: 'Women Only',
    tagColor: 'bg-rose-900/80',
    title: 'Women-Only Expedition',
    subtitle: '10 Days • Moderate • 12 People',
    price: '$2,800',
    desc: 'A safe, empowering journey led by female mountain experts for women seeking transformation.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  },
]

export default function ExpeditionsPage() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar activePage="expeditions" />

      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-brand-dark-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-tag mb-4">Curated Journeys</p>
          <h1 className="section-title text-5xl lg:text-6xl mb-6">Sacred Peaks & Spiritual Trails</h1>
          <p className="font-sans text-brand-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Embark on a transformative journey through the world's most majestic landscapes.
            Our expeditions blend physical challenge with profound spiritual renewal.
          </p>
        </div>
      </section>

      {/* Expeditions Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expeditions.map((exp, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden h-60 mb-5">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className={`absolute top-4 left-4 ${exp.tagColor} text-white text-xs font-sans px-3 py-1 rounded-full`}>
                    {exp.tag}
                  </span>
                </div>
                <h3 className="font-serif text-brand-cream text-xl mb-1">{exp.title}</h3>
                <p className="font-sans text-brand-text-muted text-xs mb-3">{exp.subtitle}</p>
                <p className="font-sans text-brand-text-muted text-sm leading-relaxed mb-4">{exp.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-orange font-sans font-medium">Starting at {exp.price}</span>
                  <button className="btn-primary text-xs px-4 py-2 flex items-center gap-1">
                    View Details <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp Float */}
      <a
        href="https://wa.me/9771444000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-sans px-4 py-3 rounded-full shadow-lg transition-all duration-300 z-50"
      >
        <MessageCircle size={16} />
        WhatsApp Support
      </a>

      <Footer />
    </div>
  )
}
