import React, { useEffect, useRef, useState } from 'react'
import { MessageCircle } from 'lucide-react'

export default function CTASection() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

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
        ref={ref}
        className={`relative max-w-2xl mx-auto px-5 sm:px-8 lg:px-10 text-center transition-all duration-700 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <p className="section-tag mb-6">Begin Your Ascent</p>
        <h2 className="section-title text-[2.8rem] lg:text-[3.6rem] mb-5 leading-[1.05]">
          Ready to experience<br />the extraordinary?
        </h2>
        <p className="font-sans text-brand-text-muted text-[14.5px] leading-[1.75] mb-12 max-w-md mx-auto">
          Every great journey begins with a single step. Let us guide yours through the
          sacred corridors of the Himalayas.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="/contact#consultation" className="btn-primary">
            Explore Packages
          </a>
          <a
            href="https://wa.me/919084642557"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <MessageCircle size={13} strokeWidth={1.5} />
            WhatsApp Concierge
          </a>
        </div>
      </div>
    </section>
  )
}
