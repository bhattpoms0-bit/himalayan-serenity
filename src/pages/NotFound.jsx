import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-dark text-brand-cream pb-24 lg:pb-0">
      <style>{`
        body:has([data-not-found]) .fixed[style*="top: 76px"] a[href="/"] {
          color: #F0E8D8 !important;
        }
        body:has([data-not-found]) .fixed[style*="top: 76px"] a[href="/"]:hover,
        body:has([data-not-found]) .fixed[style*="top: 76px"] a[href="/"]:focus-visible {
          color: #C8A44B !important;
        }
      `}</style>
      <Navbar />
      <main data-not-found className="max-w-3xl mx-auto px-6 sm:px-8 pt-44 pb-24 text-center [&_a:focus-visible]:outline-brand-gold">
        <p className="section-tag !text-brand-gold mb-5">404 · Page not found</p>
        <h1 className="font-serif text-4xl sm:text-5xl leading-tight mb-6">Let’s find your next journey.</h1>
        <p className="font-sans text-brand-cream-muted leading-relaxed mb-8">
          We couldn’t find this page. Explore our Himalayan retreats and sacred journeys, or contact our team for help.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/international-retreats" className="btn-primary !bg-brand-gold hover:!bg-brand-gold-light hover:!shadow-none !text-brand-dark min-h-11">Explore wellness retreats</Link>
          <Link to="/experiences" className="btn-secondary min-h-11">Discover sacred journeys</Link>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-brand-gold">
          <Link to="/" className="inline-flex items-center min-h-11 text-brand-cream hover:text-brand-gold-light underline underline-offset-4">Back to Home</Link>
          <Link to="/blog" className="inline-flex items-center min-h-11 text-brand-gold hover:text-brand-gold-light underline underline-offset-4">Travel blog</Link>
          <Link to="/contact" className="inline-flex items-center min-h-11 text-brand-gold hover:text-brand-gold-light underline underline-offset-4">Contact our team</Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
