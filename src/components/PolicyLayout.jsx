import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { useSEO } from '../hooks/useSEO'
import './policy.css'

export function OwnerReview({ children }) {
  return <aside className="policy-review"><strong>Owner review required</strong><p>{children}</p></aside>
}

export function CompanyContact() {
  return <div className="policy-contact">
    <p>Himalayan Serenity Travel is a brand of <strong>LIFE &amp; LEISURE INDIA PRIVATE LIMITED</strong>.</p>
    <h3>Pithoragarh Contact Office</h3>
    <address>Plaza Hotel, Hydel Tiraha,<br />Tanakpur Road, Aincholi,<br />Pithoragarh, Uttarakhand – 262501,<br />India.</address>
    <h3>Registered Operating Company</h3>
    <p><strong>LIFE &amp; LEISURE INDIA PRIVATE LIMITED</strong></p>
    <h3>Delhi Registered Office</h3>
    <address>107–108, 1st Floor,<br />Roots Tower,<br />District Centre, Laxmi Nagar,<br />Delhi – 110092,<br />India.</address>
    <p><a href="https://lifeandleisure.travel/">Company website</a> · <a href="https://www.himalayanserenitytravel.com/">Travel website</a></p>
    <ul>
      <li>Bookings, privacy requests and customer support: <a href="mailto:info@himalayanserenitytravel.com">info@himalayanserenitytravel.com</a></li>
      <li>Phone: <a href="tel:+919084642557">+91 90846 42557</a></li>
    </ul>
  </div>
}

export default function PolicyLayout({ title, description, path, sections, children }) {
  useSEO({ title: `${title} | Himalayan Serenity Travel`, description, canonical: `https://www.himalayanserenitytravel.com${path}` })
  return <div className="policy-page">
    <Navbar />
    <main id="policy-top" className="policy-main">
      <header className="policy-header">
        <p className="policy-eyebrow">Himalayan Serenity Travel · Guest information</p>
        <h1>{title}</h1>
        <p className="policy-intro">{description}</p>
        <p className="policy-updated">Last updated: <time dateTime="2026-10-29">29 October 2026</time></p>
        <OwnerReview>This draft is prepared for the owner and legal adviser. Resolve the marked placeholders and operational checks before publication. This review date is not an effective date for existing bookings.</OwnerReview>
      </header>
      <div className="policy-grid">
        <nav className="policy-contents" aria-label={`${title} contents`}>
          <p className="policy-eyebrow">On this page</p>
          <ol>{sections.map(({ id, title: heading }) => <li key={id}><a href={`#${id}`}>{heading}</a></li>)}</ol>
        </nav>
        <article className="policy-article">
          {children}
          {sections.map(({ id, title: heading, content }, i) => <section id={id} key={id} aria-labelledby={`${id}-title`}>
            <span className="policy-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <h2 id={`${id}-title`}>{heading}</h2>
            {content}
          </section>)}
          <div className="policy-end"><a href="#policy-top">Back to top ↑</a><Link to={path === '/privacy' ? '/terms' : '/privacy'}>{path === '/privacy' ? 'Booking Terms & Conditions →' : 'Privacy Policy →'}</Link></div>
        </article>
      </div>
    </main>
    <Footer />
  </div>
}
