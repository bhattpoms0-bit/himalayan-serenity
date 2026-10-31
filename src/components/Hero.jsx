import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section aria-labelledby="home-hero-title" className="relative min-h-[min(900px,100svh)] flex items-center overflow-hidden bg-[#0b121a] pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-28 lg:pb-14">
      <img
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85"
        alt="" aria-hidden="true" fetchpriority="high" loading="eager" decoding="async"
        width="1920" height="1080" className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#081018]/95 via-[#081018]/75 to-[#081018]/35" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#090909]/70 via-transparent to-[#090909]/20" />
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-10">
        <div data-floating-avoid className="max-w-3xl">
          <p className="font-sans text-brand-gold text-[10px] sm:text-xs uppercase tracking-[0.16em] leading-relaxed mb-6 lg:mb-5">HIMALAYAN SERENITY · KUMAON HIMALAYA, INDIA</p>
          <h1 id="home-hero-title" className="font-serif text-brand-cream text-[clamp(2.65rem,6vw,5.4rem)] lg:text-[clamp(2.65rem,5vw,4.5rem)] leading-[1.08] tracking-[-0.025em] mb-7 lg:mb-6">Wellness Journeys Rooted in the Himalayas</h1>
          <p className="font-sans text-brand-cream-muted text-base sm:text-lg leading-relaxed max-w-xl mb-9 lg:mb-7">Reconnect through intimate yoga retreats, mindful mountain experiences and authentic Himalayan culture in Uttarakhand, India.</p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4">
            <Link data-floating-avoid to="/international-retreats" className="min-h-12 rounded px-6 py-4 bg-brand-gold text-brand-dark text-center font-sans text-sm font-semibold hover:bg-brand-gold-light transition-colors">Explore Wellness Retreats</Link>
            <Link data-floating-avoid to="/experiences" className="min-h-12 rounded px-6 py-4 border border-brand-cream/50 text-brand-cream bg-black/20 text-center font-sans text-sm hover:bg-white/10 transition-colors">Discover Sacred Journeys</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
