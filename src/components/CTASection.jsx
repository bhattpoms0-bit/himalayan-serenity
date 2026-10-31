import React from 'react'
import { MessageCircle } from 'lucide-react'

export default function CTASection() {
  return (
    <section
      className="py-16 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/packages/panchachuli-sunrise.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'rgba(8, 18, 14, 0.82)' }} />
      {/* Subtle radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] rounded-full bg-brand-orange/[0.04] blur-[100px]" />
      </div>

      <div
        className="relative max-w-2xl mx-auto px-5 sm:px-8 lg:px-10 text-center"
      >
        <p className="section-tag mb-6">Your Himalayan journey</p>
        <h2 className="section-title text-[2.8rem] lg:text-[3.6rem] mb-5 leading-[1.05]">
          Plan a journey<br />that feels meaningful to you.
        </h2>
        <p className="font-sans text-brand-cream-muted text-[14.5px] leading-[1.75] mb-8 max-w-md mx-auto">
          Tell us about your interests and travel plans. We can help you explore our Himalayan wellness retreats and sacred journeys.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="/contact" className="btn-primary !bg-brand-gold !text-brand-dark min-h-12">
            Plan Your Journey
          </a>
          <a
            href="https://wa.me/919084642557"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <MessageCircle size={13} strokeWidth={1.5} />
            Contact us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
