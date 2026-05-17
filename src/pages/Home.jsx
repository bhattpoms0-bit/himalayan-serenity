import React from 'react'
import { useSEO } from '../hooks/useSEO'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import Packages from '../components/Packages'
import SpiritualSection from '../components/SpiritualSection'
import RouteMap from '../components/RouteMap'
import Transformation from '../components/Transformation'
import CTASection from '../components/CTASection'
import Footer from '../components/Footer'
import MobileCTA from '../components/MobileCTA'

export default function Home() {
  useSEO({
    title: 'Himalayan Serenity | Adi Kailash Yatra & Om Parvat Tour from Delhi',
    description: 'Book Adi Kailash Yatra, Om Parvat tour, Panchachuli trek and Darma Valley tour from Delhi. Adi Kailash temple darshan with Inner Line Permit. Headquartered in Pithoragarh & Dharchula, Uttarakhand.',
  })
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar activePage="home" />
      <main>
        <section aria-label="Hero"><Hero /></section>
        <section aria-label="Why Choose Us"><WhyChooseUs /></section>
        <section aria-label="Testimonials"><Testimonials /></section>
        <section aria-label="Packages"><Packages /></section>
        <SpiritualSection />
        <RouteMap />
        <Transformation />
        <section aria-label="Call to Action"><CTASection /></section>
      </main>
      <Footer />
      <MobileCTA />
    </div>
  )
}
