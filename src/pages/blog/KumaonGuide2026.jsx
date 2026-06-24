import { Link } from 'react-router-dom'
import { useSEO } from '../../hooks/useSEO'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const IMG_BASE = '/images/blog/kumaon-guide'
const GOLD     = '#C9A84C'
const DARK_GRN = '#0a100d'

/* ── Layout CSS injected once ───────────────────────────────────────── */
const CSS = `
  .kg-narrow { max-width: 740px; margin: 0 auto; padding: 0 1.5rem; }

  /* Hero */
  .kg-hero { position: relative; margin-top: 68px; }
  .kg-hero-img { width: 100%; height: max(70vh, 420px); object-fit: cover; object-position: center; display: block; }
  .kg-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.28) 50%, transparent 80%); pointer-events: none; }
  .kg-hero-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 2.5rem 3rem; max-width: 860px; }
  .kg-hero-badge { display: inline-block; background: rgba(201,168,76,0.15); border: 1px solid rgba(201,168,76,0.4); color: var(--kg-gold); padding: 4px 14px; border-radius: 2px; font-size: 0.68rem; letter-spacing: 0.2em; font-family: sans-serif; text-transform: uppercase; margin-bottom: 0.9rem; }
  .kg-hero-title { color: #f0ece4; font-size: clamp(1.7rem, 3.6vw, 3rem); line-height: 1.15; font-weight: 400; font-family: Georgia, serif; margin: 0 0 0.85rem; max-width: 700px; }
  .kg-hero-byline { display: flex; gap: 0.9rem; flex-wrap: wrap; font-size: 0.8rem; color: rgba(255,255,255,0.5); font-family: sans-serif; }
  .kg-hero-dot { color: rgba(201,168,76,0.5); }

  /* Split image layouts */
  .kg-split { display: flex; min-height: 420px; margin: 3.5rem 0 0; }
  .kg-split-r { flex-direction: row-reverse; }
  .kg-split-img { width: 55%; flex-shrink: 0; overflow: hidden; }
  .kg-split-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .kg-split-text { flex: 1; background: var(--kg-dark); display: flex; flex-direction: column; justify-content: center; padding: 3rem 3.5rem; }
  .kg-split-caption { font-size: 0.78rem; color: rgba(255,255,255,0.38); font-family: sans-serif; font-style: italic; line-height: 1.5; padding: 0.45rem 1rem 0; display: block; }

  /* Sacred pair (images 06 + 07) */
  .kg-pair { display: flex; gap: 1rem; background: var(--kg-dark); padding: 1.5rem; margin: 1.5rem 0 2rem; border-top: 1px solid rgba(201,168,76,0.18); }
  .kg-pair-item { flex: 1; min-width: 0; }
  .kg-pair-item img { width: 100%; height: 380px; object-fit: cover; display: block; border-radius: 2px; }
  .kg-pair-caption { font-size: 0.75rem; color: rgba(201,168,76,0.65); font-family: sans-serif; font-style: italic; line-height: 1.5; text-align: center; margin-top: 0.5rem; }

  /* Kasar Devi cinematic quote overlay */
  .kg-cinematic { position: relative; margin: 1.5rem 0; border-radius: 2px; overflow: hidden; }
  .kg-cinematic img { width: 100%; height: 340px; object-fit: cover; display: block; }
  .kg-cinematic-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.36); display: flex; align-items: center; justify-content: center; }
  .kg-cinematic-box { background: rgba(0,0,0,0.58); padding: 1.5rem 2rem; max-width: 82%; text-align: center; }
  .kg-cinematic-quote { font-style: italic; font-size: 1.45rem; color: #fff; font-family: Georgia, serif; line-height: 1.6; margin: 0; }

  /* Image 11 — gold-bordered inline image */
  .kg-img-gold { width: 100%; display: block; border: 2px solid var(--kg-gold); border-radius: 12px; height: auto; margin: 1.5rem 0 0.4rem; }

  /* Final full-bleed CTA image */
  .kg-final { position: relative; margin: 3rem 0 0; }
  .kg-final img { width: 100%; height: 480px; object-fit: cover; object-position: center top; display: block; }
  .kg-final-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
  .kg-final-box { background: rgba(10,16,13,0.9); border: 1px solid rgba(201,168,76,0.4); padding: 2.5rem 2rem; text-align: center; max-width: 540px; width: 100%; }

  /* Inline CTA */
  .kg-cta-inline { border-left: 4px solid var(--kg-gold); background: rgba(10,16,13,0.55); padding: 1.25rem 1.5rem; margin: 2.5rem 0; }

  /* Tablet 768–1023 */
  @media (min-width: 768px) and (max-width: 1023px) {
    .kg-split { min-height: 360px; }
    .kg-split-img { width: 50%; }
    .kg-split-text { padding: 2rem 2.5rem; }
    .kg-hero-content { padding: 2rem; }
  }

  /* Mobile ≤ 767 */
  @media (max-width: 767px) {
    .kg-split, .kg-split-r { flex-direction: column; }
    .kg-split-img { width: 100%; height: 260px; }
    .kg-split-text { padding: 1.5rem; }
    .kg-hero-img { height: 50vh; min-height: 300px; }
    .kg-hero-content { padding: 1.25rem; }
    .kg-hero-title { font-size: 1.55rem !important; }
    .kg-pair { flex-direction: column; gap: 1.5rem; }
    .kg-pair-item img { height: 240px; }
    .kg-cinematic img { height: 260px; }
    .kg-cinematic-quote { font-size: 1.05rem !important; }
    .kg-final img { height: 300px; object-position: center; }
    .kg-final-box { padding: 1.5rem 1rem; }
    .kg-narrow { padding: 0 1rem; }
  }
`

/* ── Shared text style objects (no layout, pure typography) ─────────── */
const p   = { lineHeight: 1.9,  marginBottom: '1.2rem', color: 'rgba(255,255,255,0.75)', fontFamily: 'Georgia, serif', fontSize: '1rem' }
const h2  = { color: GOLD, fontSize: '1.4rem', margin: '2.8rem 0 1rem', lineHeight: 1.3, fontWeight: 400, borderBottom: '1px solid rgba(201,168,76,0.12)', paddingBottom: '0.6rem', fontFamily: 'Georgia, serif' }
const h2p = { color: GOLD, fontSize: '1.4rem', margin: '0 0 1rem', lineHeight: 1.3, fontWeight: 400, fontFamily: 'Georgia, serif' }   /* h2 inside a panel — no border */
const h3  = { color: '#f0ece4', fontSize: '1.05rem', margin: '1.8rem 0 0.6rem', fontWeight: 600, fontFamily: 'Georgia, serif' }

const FAQS = [
  { q: 'Is Kumaon safe for solo women travellers?', a: 'Pithoragarh and Munsiyari are among the safest and most hospitable destinations in Uttarakhand for solo travellers of all genders. The mountain communities of Kumaon have a strong cultural tradition of hospitality toward visitors. Standard precautions appropriate to any mountain travel apply.' },
  { q: 'What language do people speak in Kumaon?', a: 'The local language is Kumaoni — a distinct Indo-Aryan language with four major dialect groups. Hindi is widely spoken and understood throughout the region. English is spoken in most accommodation and tourist-facing contexts in Pithoragarh.' },
  { q: 'What is the elevation of Munsiyari?', a: 'Approximately 2,298 metres (7,539 feet) above sea level, in Pithoragarh district, Uttarakhand.' },
  { q: 'What is the best trek near Munsiyari for beginners?', a: 'Khaliya Top — 5 to 6 kilometres one way from Eco Park in Munsiyari, reaching 3,500 metres. Suitable for beginners with reasonable fitness. Best done early morning for sunrise views of the Panchachuli range.' },
  { q: 'Do I need a permit to visit Munsiyari?', a: 'No permit is required to visit Munsiyari itself. Inner Line Permits are required for areas beyond Munsiyari — including the Milam Glacier trek and the Darma Valley — and for the Adi Kailash and Om Parvat routes from Pithoragarh.' },
  { q: 'What is the Lichen Park in Munsiyari?', a: "India's first Lichen Park, located in Munsiyari, covers 1.5 acres of forest land and contains over 150 species of lichens. Lichens are extremely sensitive to air pollution and cannot survive in contaminated environments — their abundance here is a direct indicator of the purity of Munsiyari's air." },
  { q: 'What is the Van Allen Belt connection to Kasar Devi?', a: 'Kasar Devi ridge near Almora sits within a geomagnetic anomaly where the inner Van Allen Radiation Belt dips closer to the surface than almost anywhere else on the planet. Two other such locations are Machu Picchu in Peru and Stonehenge in the UK. NASA confirmed this geomagnetic anomaly in 2013.' },
  { q: 'What food is Kumaon famous for?', a: 'Kumaoni cuisine is built around locally grown mountain ingredients — maddua (finger millet), bhatt (black soybeans), locally grown vegetables and Himalayan herbs. Key dishes include Bhatt ki Churkani, Kafuli, Aloo ke Gutke and the famous Bal Mithai sweet of Almora. The cuisine is largely vegetarian, rooted in Ayurvedic principles and shaped by the nutritional requirements of high-altitude mountain living.' },
]

/* ── Split section helper ───────────────────────────────────────────── */
function Split({ file, alt, width, height, caption, reverse, heading, children }) {
  return (
    <>
      <div className={`kg-split${reverse ? ' kg-split-r' : ''}`}>
        <div className="kg-split-img">
          <img src={`${IMG_BASE}/${file}`} alt={alt} width={width} height={height} loading="lazy" decoding="async" />
        </div>
        <div className="kg-split-text">
          <h2 style={h2p}>{heading}</h2>
          {children}
        </div>
      </div>
      {caption && <span className="kg-split-caption">{caption}</span>}
    </>
  )
}

/* ── Component ──────────────────────────────────────────────────────── */
export default function KumaonGuide2026() {
  useSEO({
    title: "Kumaon, Uttarakhand — India's Best Kept Himalayan Secret: A Complete Travel Guide 2026",
    description: 'A complete guide to Kumaon, Uttarakhand — Munsiyari, Khaliya Top, Adi Kailash, Kasar Devi, Bhotia culture, Kumaoni food and how to travel here in 2026. Written by a local from Pithoragarh.',
    canonical: 'https://www.himalayanserenitytravel.com/blog/kumaon-himalayas-travel-guide-wellness-2026',
  })

  return (
    <div style={{ '--kg-gold': GOLD, '--kg-dark': DARK_GRN, background: '#0d0d0d', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Navbar activePage="blog" />

      {/* ── HERO — image 01, full viewport width, title overlaid ───── */}
      <div className="kg-hero">
        <img
          className="kg-hero-img"
          src={`${IMG_BASE}/01-panchachuli-peaks-sunrise-munsiyari.webp`}
          alt="Panchachuli peaks at sunrise from Munsiyari, Kumaon Himalayas"
          width={1200}
          height={729}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="kg-hero-overlay" aria-hidden="true" />
        <div className="kg-hero-content">
          <span className="kg-hero-badge">Travel Guide · Uttarakhand · 2026</span>
          <h1 className="kg-hero-title">
            Kumaon, Uttarakhand — India's Best Kept Himalayan Secret: A Complete Travel Guide 2026
          </h1>
          <div className="kg-hero-byline">
            <span>By Pramod Bhatt</span>
            <span className="kg-hero-dot">·</span>
            <span>Born and raised in Pithoragarh, Kumaon</span>
            <span className="kg-hero-dot">·</span>
            <span>June 2026</span>
            <span className="kg-hero-dot">·</span>
            <span>16 min read</span>
          </div>
        </div>
      </div>
      <figcaption style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.32)', textAlign: 'center', padding: '0.5rem 1rem', fontFamily: 'sans-serif', fontStyle: 'italic', background: '#0d0d0d' }}>
        The Panchachuli range at dawn, viewed from Munsiyari — five peaks between 6,334 and 6,904 metres
      </figcaption>

      {/* ── ARTICLE HEADER ──────────────────────────────────────────── */}
      <div className="kg-narrow" style={{ paddingTop: '2.5rem' }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.32)', fontFamily: 'sans-serif', marginBottom: '1.8rem' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.32)', textDecoration: 'none' }}>Home</Link>
          {' › '}
          <Link to="/blog" style={{ color: 'rgba(255,255,255,0.32)', textDecoration: 'none' }}>Blog</Link>
          {' › '}
          <span style={{ color: GOLD }}>Kumaon Travel Guide 2026</span>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 2rem' }} />

        {/* At a Glance */}
        <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.18)', borderRadius: 2, padding: '1.2rem 1.5rem', marginBottom: '2rem' }}>
          <span style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>At a Glance</span>
          <p style={{ ...p, marginBottom: 0, fontSize: '0.93rem' }}>
            Kumaon is the eastern region of Uttarakhand in northern India — a land of thirty peaks above 5,500 metres, ancient mountain cultures, sacred pilgrimage routes and pristine Himalayan wilderness that has drawn seekers, artists and healers for over a century. This guide covers everything a traveller needs to know about Kumaon in 2026 — where to go, what to experience, when to visit and why this region changes the people who come here.
          </p>
        </div>

        {/* Table of Contents */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 2, padding: '1.2rem 1.5rem', marginBottom: '3rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'sans-serif', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: '0.8rem' }}>Contents</span>
          {[
            'What Is Kumaon and Where Is It?',
            'The People Kumaon Has Always Attracted',
            'Munsiyari — The Mountain Town Above the Clouds',
            'Khaliya Top — The Morning That Stays With You',
            'Forest Bathing in the Himalayan Oak Forests',
            "India's First Lichen Park",
            'The Bhotia and Shauka Communities',
            'The Sacred Geography of Kumaon',
            'Kasar Devi — Where Science Meets the Spiritual',
            'The Food of the Kumaon Mountains',
            'Wildlife and Birds of Kumaon',
            'When to Visit Kumaon',
            'How to Get to Kumaon from Delhi',
            'Practical Information for International Travellers',
            'Frequently Asked Questions',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.6rem', padding: '0.3rem 0', borderBottom: i < 14 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <span style={{ color: 'rgba(201,168,76,0.5)', fontFamily: 'sans-serif', fontSize: '0.8rem', minWidth: '1.4rem' }}>{i + 1}.</span>
              <span style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'sans-serif', fontSize: '0.85rem', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 1 — narrow ──────────────────────────────────────── */}
      <div className="kg-narrow">
        <h2 style={h2}>1. What Is Kumaon and Where Is It?</h2>
        <p style={p}>Most people who fall in love with Kumaon do so before they understand exactly where they are.</p>
        <p style={p}>It happens on the road. The car has been climbing for hours. The plains have disappeared. The air has changed — thinner, cooler, carrying the smell of pine and something else, something harder to name. And then the mountains appear.</p>
        <p style={p}>Not as a backdrop. Not as scenery. As a presence.</p>
        <p style={p}>Kumaon is the eastern region of Uttarakhand in northern India, bordering Nepal to the east and Tibet to the north. It comprises six districts — Almora, Bageshwar, Champawat, Nainital, Pithoragarh and Udham Singh Nagar — and contains over thirty Himalayan peaks rising above 5,500 metres in a tract just 225 kilometres long and 65 kilometres wide.</p>
        <p style={p}>Its name derives from the Sanskrit word "Kurmanchal" — the land of Kurmavatar, the tortoise incarnation of Lord Vishnu. It has been called Devbhumi — the abode of gods — since before recorded history.</p>
        <p style={p}>Historically, Kumaon was ruled by the Katyuri dynasty from the 7th century, who built the great temple complexes of Jageshwar and Katarmal. The Chand dynasty later unified the region and moved the capital to Almora in 1563 — a town that remains the cultural heart of Kumaon today. The British annexed the region in 1815 following the Anglo-Nepalese War, and it was during the colonial period that Almora began attracting the writers, thinkers and spiritual seekers who would define its international reputation.</p>
        <p style={p}>Pithoragarh, the eastern gateway of Kumaon, sits at 1,627 metres above sea level. Known locally as "Little Kashmir," it offers direct views of the Panchachuli peaks (6,904 metres) — five sacred Himalayan summits that dominate the eastern horizon.</p>
        <p style={p}>From Pithoragarh, the roads lead deeper — to Munsiyari, to the Darma Valley, to the base of Adi Kailash, to the last Indian villages before the Tibetan plateau begins.</p>
      </div>

      {/* ── SECTION 2 — narrow ──────────────────────────────────────── */}
      <div className="kg-narrow">
        <h2 style={h2}>2. The People Kumaon Has Always Attracted</h2>
        <p style={p}>Kumaon has never needed to advertise itself.</p>
        <p style={p}>The people who come tend to find it through other people who came — a quiet word, a personal recommendation, a letter written from the mountains.</p>
        <p style={p}>Mahatma Gandhi stayed in Almora in 1929, recovering from imprisonment. He wrote: <em style={{ color: 'rgba(255,255,255,0.6)' }}>"I wonder whether the scenery of these hills and the climate are surpassed, if equalled, by any of the beauty spots anywhere of the world. After having been nearly three weeks in Almora hills, I am more than ever amazed why our people need go to Europe in search of health."</em> It was here that he wrote Anashakti Yoga — his commentary on the Bhagavad Gita.</p>
        <p style={p}>Swami Vivekananda came to Almora in the late 1800s and meditated at Kasar Devi — a ridge above the town that he described as possessing unusual spiritual energy.</p>
        <p style={p}>In the 1960s, Bob Dylan and Allen Ginsberg arrived. They were followed by Cat Stevens, George Harrison, Uma Thurman. Steve Jobs came later.</p>
        <p style={p}>None of them came for a package tour.</p>
        <p style={p}>Nobel Laureate Rabindranath Tagore wrote here. Jim Corbett — the legendary conservationist and author of <em>Man-Eaters of Kumaon</em> — spent much of his life in these forests.</p>
        <p style={p}>The pattern that connects all these visitors is not religion or adventure or even wellness in the modern sense. It is something older and harder to categorise — the instinct that certain places on earth hold a quality that cannot be replicated anywhere else.</p>
        <p style={p}>Kumaon is one of those places.</p>

        {/* Inline CTA — left-bordered callout */}
        <div className="kg-cta-inline">
          <p style={{ color: 'rgba(255,255,255,0.75)', margin: '0 0 0.6rem', fontSize: '0.93rem', fontFamily: 'Georgia, serif', lineHeight: 1.85, fontStyle: 'italic' }}>
            If you are planning a wellness retreat or expedition in Kumaon, Himalayan Serenity Travel has been guiding international travellers through this region for 15+ years.
          </p>
          <Link to="/retreats/panchachuli-wellness" style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '0.87rem', textDecoration: 'none' }}>
            Explore retreat and expedition programs →
          </Link>
        </div>
      </div>

      {/* ── SECTION 3 — image 11 inline, gold border ────────────────── */}
      <div className="kg-narrow">
        <h2 style={h2}>3. Munsiyari — The Mountain Town Above the Clouds</h2>

        <figure style={{ margin: '1.5rem 0 2rem' }}>
          <img
            className="kg-img-gold"
            src={`${IMG_BASE}/11-mountain-road-munsiyari-town.webp`}
            alt="Munsiyari town with Panchachuli peaks backdrop, Pithoragarh district, Uttarakhand"
            width={600}
            height={400}
            loading="lazy"
            decoding="async"
          />
          <figcaption style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.38)', fontFamily: 'sans-serif', fontStyle: 'italic', lineHeight: 1.5, textAlign: 'center', marginTop: '0.45rem' }}>
            Munsiyari — the mountain town at 2,298 metres, with the Panchachuli range filling the horizon
          </figcaption>
        </figure>

        <p style={p}>Of all the places in Kumaon, Munsiyari is the one that most consistently surprises the people who reach it.</p>
        <p style={p}>It is a small town. It has no luxury hotels. The roads to get there are long and winding. And yet, when travellers arrive and see the Panchachuli range filling the entire horizon from the main street — five peaks between 6,334 and 6,904 metres, glowing at dawn with a golden light that changes every few minutes — they tend to go quiet.</p>
        <p style={p}>Munsiyari sits at approximately 2,298 metres above sea level in Pithoragarh district. Its name translates from the local dialect simply as "place of snow."</p>
        <p style={p}>It lies at the entrance of the Johar Valley, along the ancient salt route that Shauka traders walked between India and Tibet for centuries — a trade route that carried wool, salt, grain and stories across the roof of the world before the borders closed in the 1960s.</p>
        <p style={p}>Today Munsiyari serves as the base camp for several major Himalayan treks — to the Milam Glacier, the Ralam Glacier, the Namik Glacier and Khaliya Top. It is also, for travellers who simply want to sit with the mountains, one of the finest viewpoints in the Indian Himalayas.</p>
        <p style={p}>The Panchachuli peaks are visible from virtually every point in the town. At sunrise, when the light catches the snow and turns it through amber, orange and gold before settling into the white of full morning, the view has been described by seasoned Himalayan travellers as one of the most beautiful mountain panoramas accessible by road anywhere in Uttarakhand.</p>
      </div>

      {/* ── SECTION 4 — image 02 FULL BLEED LEFT ───────────────────── */}
      <Split
        file="02-khaliya-top-sunrise-panorama.webp"
        alt="Khaliya Top sunrise panorama showing layered Himalayan ridges, Munsiyari, Uttarakhand"
        width={900} height={506}
        caption="Dawn from Khaliya Top (3,500m) — a panorama that takes several minutes to fully absorb"
        heading="4. Khaliya Top — The Morning That Stays With You"
      >
        <p style={{ ...p, color: 'rgba(255,255,255,0.72)' }}>Five kilometres from Munsiyari, the trail begins.</p>
        <p style={{ ...p, color: 'rgba(255,255,255,0.72)', marginBottom: 0 }}>It climbs through dense forest — oak, rhododendron and pine — gaining elevation steadily before opening, somewhere above the treeline, into the high alpine meadows of Khaliya Top.</p>
      </Split>
      <div className="kg-narrow" style={{ paddingTop: '1.8rem' }}>
        <p style={p}>At 3,500 metres above sea level, Khaliya Top is one of the highest accessible viewpoints in the Munsiyari region. From here, the view encompasses Panchachuli (6,904m), Rajrambha (6,537m), Hardeol (7,151m) and Nanda Kot (6,861m) in an unbroken panorama of Himalayan peaks.</p>
        <p style={p}>The trek is approximately 5 to 6 kilometres one way from Eco Park in Munsiyari and is considered suitable for beginners with reasonable fitness. The best time is early morning — arriving at the top before sunrise to watch the first light touch the Panchachuli range.</p>
        <p style={p}>On clear autumn mornings between September and October, when the monsoon has cleaned the air and the skies are crystalline, the visibility from Khaliya Top is extraordinary — hundreds of kilometres of Himalayan ridgeline visible from a single meadow.</p>
        <p style={p}>There is a Zero Point above Khaliya Top at approximately 4,000 metres where the views extend even further for those who wish to continue.</p>
      </div>

      {/* ── SECTION 5 — image 03 FULL BLEED RIGHT ──────────────────── */}
      <Split
        file="03-oak-forest-trail-munsiyari.webp"
        alt="Sunlight through oak and pine forest trail near Munsiyari, Kumaon Himalayas"
        width={900} height={600}
        caption="Morning light through the oak forests above Munsiyari — the practice of Shinrin-yoku, or forest bathing, finds its ideal terrain here"
        reverse
        heading="5. Forest Bathing in the Himalayan Oak Forests"
      >
        <p style={{ ...p, color: 'rgba(255,255,255,0.72)' }}>The forests around Munsiyari are not merely scenery. They are ecosystems of extraordinary complexity and biodiversity — and spending deliberate, unhurried time within them has measurable effects on the human body.</p>
        <p style={{ ...p, color: 'rgba(255,255,255,0.72)', marginBottom: 0 }}>The Japanese practice of Shinrin-yoku — forest bathing — involves slow, mindful immersion in forest environments. A systematic review published in <em>Environmental Health and Preventive Medicine</em> found consistent evidence that time in forest settings significantly reduces cortisol levels, lowers blood pressure and improves psychological wellbeing.</p>
      </Split>
      <div className="kg-narrow" style={{ paddingTop: '1.8rem' }}>
        <p style={p}>The oak forests of Kumaon — <em>Quercus leucotrichophora</em>, or banj oak, growing between 1,500 and 2,200 metres — are among the most biodiverse temperate forest habitats in the western Himalayas. Research conducted across 42 sites in the Nainital and Almora districts of Kumaon recorded 136 species of birds in this forest type alone, of which 104 are likely breeding residents. Of these, 48 are Himalayan endemic species found nowhere else on earth.</p>
        <p style={p}>Walking in these forests — slowly, without agenda, without a destination — is not a wellness activity in the commercial sense. It is simply what happens when a human being spends time in a living ecosystem of this complexity and age.</p>
        <p style={p}>The body responds. It always has.</p>
      </div>

      {/* ── SECTION 6 — image 04 FULL BLEED LEFT ───────────────────── */}
      <Split
        file="04-lichen-park-kumaon-closeup.webp"
        alt="Lichen Park close-up showing vivid yellow-green lichen on tree bark, Munsiyari, Kumaon"
        width={900} height={600}
        caption="India's first Lichen Park, Munsiyari — home to over 150 species, some thousands of years old. Their presence here is a direct measure of the purity of the air."
        heading="6. India's First Lichen Park"
      >
        <p style={{ ...p, color: 'rgba(255,255,255,0.72)' }}>Hidden within the forests of Munsiyari is something that almost no visitor knows exists — and that makes it, once discovered, one of the most unexpectedly moving places in the entire region.</p>
        <p style={{ ...p, color: 'rgba(255,255,255,0.72)', marginBottom: 0 }}>India's first Lichen Park is located in Munsiyari, spread across 1.5 acres of forest land and home to over 150 species of lichens.</p>
      </Split>
      <div className="kg-narrow" style={{ paddingTop: '1.8rem' }}>
        <p style={p}>Lichens — symbiotic organisms formed from the partnership of fungi and algae — are among the oldest living things on earth. Some lichen colonies are thousands of years old. They grow on rock faces, tree bark and forest floors, in colours ranging from pale grey and silver to vivid orange, green and deep rust-red.</p>
        <p style={p}>They are also extraordinarily sensitive to air quality — lichens cannot survive in polluted environments. Their presence in such diversity and abundance in the Munsiyari forests is, in itself, a statement about the purity of the air in this region.</p>
        <p style={p}>Standing in the Lichen Park — among organisms that have been growing on these rocks since before any living human being was born — has a quality that is difficult to describe. It is something like perspective. The ordinary sense of urgency that accompanies modern life becomes, briefly but genuinely, impossible to maintain.</p>
      </div>

      {/* ── SECTION 7 — image 05 FULL BLEED RIGHT ──────────────────── */}
      <Split
        file="05-bhotia-shauka-woman-weaving.webp"
        alt="Bhotia Shauka woman weaving traditional textile outdoors, Darma Valley, Kumaon"
        width={800} height={1202}
        caption="A Bhotia woman weaving in the Darma Valley — a craft tradition shaped by centuries of trans-Himalayan trade and mountain life"
        reverse
        heading="7. The Bhotia and Shauka Communities"
      >
        <p style={{ ...p, color: 'rgba(255,255,255,0.72)' }}>Kumaon is home to several indigenous mountain communities whose cultures are as extraordinary as the landscape they inhabit.</p>
        <p style={{ ...p, color: 'rgba(255,255,255,0.72)', marginBottom: 0 }}>The Johari Bhotia of Munsiyari are historically known as skilled trans-Himalayan traders. For centuries, Bhotia families crossed the high mountain passes between India and Tibet each summer — carrying wool, salt and grain in both directions — before descending to the valleys for winter. Their seasonal migration patterns, their distinctive handwoven textiles and their deep relationship with the mountain ecosystem reflect a way of life shaped entirely by the landscape they inhabit.</p>
      </Split>
      <div className="kg-narrow" style={{ paddingTop: '1.8rem' }}>
        <p style={p}>The Shauka people of Pithoragarh district share a similar heritage — high-altitude traders and herders whose culture bridges the Hindu traditions of the Indian plains and the Buddhist influences of the Tibetan plateau. Their wood-carved homes, their textile traditions and their festivals reflect centuries of life at the intersection of two civilisations.</p>
        <p style={p}>The Tribal Heritage Museum in Munsiyari town, established in 2000, documents the history, culture and material life of the Bhotia community through a remarkable private collection of artefacts, photographs and oral histories.</p>
        <p style={p}>Kumaon's cultural diversity extends further — the region is also home to Tharu, Rung and Jaunsari communities, each with distinct languages, craft traditions and belief systems. The folk art of Aipan — intricate rice paste paintings made by Kumaoni women for auspicious occasions — is perhaps the most recognised expression of Kumaoni visual culture, practiced across ethnic boundaries as a shared artistic tradition.</p>
        <p style={p}>The festival calendar of Kumaon is tied to the agrarian and seasonal cycles of mountain life — Harela celebrates the monsoon and the planting of seeds; Ghughutiya marks the winter solstice with handmade sweets hung from children's necks for the crows; Phooldei welcomes spring with flowers placed at doorsteps before dawn. These are not performances for visitors. They are simply how this culture marks time.</p>
      </div>

      {/* ── SECTION 8 — Sacred Geography, images 06+07 side by side ── */}
      <div className="kg-narrow">
        <h2 style={h2}>8. The Sacred Geography of Kumaon</h2>
        <h3 style={h3}>Adi Kailash (5,945 metres)</h3>

        {/* Side-by-side pair */}
        <div style={{ height: 1, background: 'rgba(201,168,76,0.2)', margin: '1.5rem 0 0' }} />
        <div className="kg-pair">
          <div className="kg-pair-item">
            <img
              src={`${IMG_BASE}/06-adi-kailash-parvati-sarovar-reflection.webp`}
              alt="Gauri Kund glacial lake at the base of Adi Kailash, Jolingkong, Pithoragarh, Uttarakhand"
              width={900} height={505}
              loading="lazy"
              decoding="async"
            />
            <p className="kg-pair-caption">Gauri Kund at Jolingkong meadow (4,420m) — the sacred glacial lake at the base of Adi Kailash, Pithoragarh</p>
          </div>
          <div className="kg-pair-item">
            <img
              src={`${IMG_BASE}/07-om-parvat-sacred-himalaya.webp`}
              alt="Om Parvat showing natural Om symbol in snow, Pithoragarh, Uttarakhand"
              width={900} height={585}
              loading="lazy"
              decoding="async"
            />
            <p className="kg-pair-caption">Om Parvat (5,590m) — where the natural pattern of snow against darker rock creates a visible ॐ symbol on the south face of the mountain</p>
          </div>
        </div>

        <p style={p}>Known also as Chhota Kailash or Little Kailash, Adi Kailash is a pyramid-shaped peak in Pithoragarh district revered as one of five sacred Kailash peaks in the Himalayas. It bears a striking visual resemblance to Mount Kailash in Tibet and is considered its terrestrial counterpart — but unlike the Kailash Mansarovar Yatra which requires crossing international borders, Adi Kailash is accessible entirely within India via an Inner Line Permit issued by the Pithoragarh district administration.</p>
        <p style={p}>The viewpoint for Adi Kailash is at Jolingkong meadow, approximately 4,420 metres above sea level — a flat, sacred campsite where the full face of the peak fills the sky.</p>

        <h3 style={h3}>Om Parvat (5,590 metres)</h3>
        <p style={p}>A mountain in the Dharchula subdivision of Pithoragarh where a natural geological feature — the pattern of snow accumulation against darker rock — creates a visible image of the sacred Sanskrit symbol ॐ (Om) on the mountain's south face. The phenomenon is attributed to wind patterns, topography and precipitation rather than any artificial intervention. It is best viewed from Nabhidhang Camp on the Kailash Mansarovar Yatra route, near Lipulekh Pass.</p>

        <h3 style={h3}>Jageshwar Dham</h3>
        <p style={p}>One of the most significant Shaiva pilgrimage complexes in India — a collection of 124 ancient stone temples dating from the 7th to 12th centuries, set within a dense deodar forest near Almora. Jageshwar is considered one of the twelve Jyotirlingas — the sacred abodes of Lord Shiva — and draws pilgrims from across India throughout the year.</p>
      </div>

      {/* ── SECTION 9 — Kasar Devi, image 08 cinematic quote ───────── */}
      <div className="kg-narrow">
        <h2 style={h2}>9. Kasar Devi — Where Science Meets the Spiritual</h2>

        <div className="kg-cinematic">
          <img
            src={`${IMG_BASE}/08-kasar-devi-temple-sunset.webp`}
            alt="Kasar Devi temple at sunset, Almora, Kumaon, Uttarakhand"
            width={700} height={400}
            loading="lazy"
            decoding="async"
          />
          <div className="kg-cinematic-overlay" aria-hidden="true">
            <div className="kg-cinematic-box">
              <p className="kg-cinematic-quote">"Bob Dylan felt it. Allen Ginsberg felt it. Steve Jobs felt it."</p>
            </div>
          </div>
        </div>
        <figcaption style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.38)', fontFamily: 'sans-serif', fontStyle: 'italic', lineHeight: 1.5, marginTop: '0.45rem', marginBottom: '1.5rem' }}>
          Kasar Devi Temple, nine kilometres above Almora — a 2,000-year-old rock-cut shrine that sits within one of only three confirmed geomagnetic anomalies on Earth
        </figcaption>

        <p style={p}>Nine kilometres above Almora, on a pine-forested ridge with unobstructed views of the Himalayan range, stands the Kasar Devi Temple — a rock-cut shrine dedicated to a local form of Goddess Durga, believed to be approximately 2,000 years old.</p>
        <p style={p}>Swami Vivekananda meditated in a cave behind this temple in the late 1800s. He described it as a place of unusual spiritual power — and as with several of his observations, the scientific explanation came much later.</p>
        <p style={p}>In 1958, American physicist James Van Allen discovered the Van Allen Radiation Belts — toroidal zones of energetically charged particles trapped in Earth's magnetic field, encircling the planet.</p>
        <p style={p}>What was later established is that in three specific locations on earth, the inner Van Allen Belt dips significantly closer to the surface than anywhere else — creating measurably different electromagnetic environments. Those three locations are Machu Picchu in Peru, Stonehenge in the United Kingdom, and Crank's Ridge at Kasar Devi, Almora. NASA confirmed this in 2013.</p>
        <p style={p}>Research suggests this electromagnetic anomaly may influence melatonin production, cortisol levels and alpha and theta brainwave states — the states associated with deep relaxation and meditation.</p>
        <p style={p}>Whether you approach this scientifically or spiritually — or both, or neither — sitting on Crank's Ridge at sunset, looking out over hundreds of kilometres of Himalayan ridgeline, you will feel something shift.</p>
        <p style={p}>Bob Dylan felt it. Allen Ginsberg felt it. Steve Jobs felt it.</p>
        <p style={p}>Most people who sit here long enough do.</p>
      </div>

      {/* ── SECTION 10 — image 09 FULL BLEED LEFT ──────────────────── */}
      <Split
        file="09-kumaoni-food-spread-traditional.webp"
        alt="Traditional Kumaoni food spread — aloo ke gutke, mandua roti and bhaang ki chutney"
        width={900} height={506}
        caption="A traditional Kumaoni meal — aloo ke gutke (left), mandua roti (centre) and kafuli or green chutney (right). Mountain food shaped by centuries of altitude and necessity."
        heading="10. The Food of the Kumaon Mountains"
      >
        <p style={{ ...p, color: 'rgba(255,255,255,0.72)' }}>Kumaoni cuisine deserves to be far better known than it is.</p>
        <p style={{ ...p, color: 'rgba(255,255,255,0.72)', marginBottom: 0 }}>It is the food of a mountain people who learned — through centuries of living at altitude, far from trading centres, through long winters and short growing seasons — exactly which locally available ingredients nourish the human body most effectively.</p>
      </Split>
      <div className="kg-narrow" style={{ paddingTop: '1.8rem' }}>
        <p style={{ ...p, marginBottom: '0.5rem' }}><strong style={{ color: '#f0ece4' }}>Maddua (finger millet):</strong> Grown in the Kumaon hills at altitude, maddua flour is exceptionally rich in calcium, potassium and dietary fibre. Research has documented its traditional use in blood sugar regulation. Maddua roti — flatbread made from this flour — is the everyday staple of Kumaoni mountain households.</p>
        <p style={{ ...p, marginBottom: '0.5rem' }}><strong style={{ color: '#f0ece4' }}>Bhatt ki Churkani:</strong> A slow-cooked preparation of black soybeans indigenous to the Kumaon hills. Protein-dense, warming and deeply flavoured — a dish that has sustained Kumaoni mountain communities through high-altitude winters for generations.</p>
        <p style={{ ...p, marginBottom: '0.5rem' }}><strong style={{ color: '#f0ece4' }}>Kafuli:</strong> A preparation of green leafy vegetables — typically spinach or fenugreek — cooked slowly with mustard oil and mountain spices. Medicinal and deeply nourishing.</p>
        <p style={{ ...p, marginBottom: '0.5rem' }}><strong style={{ color: '#f0ece4' }}>Aloo ke Gutke:</strong> Locally grown potatoes tempered with mustard seeds, dried red chillies and jakhiya — a seed found only in the Himalayan hills — that gives this simple dish a flavour impossible to replicate anywhere else.</p>
        <p style={{ ...p, marginBottom: '0.5rem' }}><strong style={{ color: '#f0ece4' }}>Bal Mithai:</strong> The most famous sweet of Kumaon — a chocolate-brown fudge made from roasted khoya, coated in white sugar balls. Made in the traditional halwai shops of Almora for over a century.</p>
        <p style={p}>The herbal teas of Kumaon — made from locally foraged buransh (rhododendron flower), tulsi, ginger and mountain herbs — are in a category of their own. Consumed daily by mountain communities throughout the year, they carry the altitude and the ecosystem in every cup.</p>
      </div>

      {/* ── SECTION 11 — image 10 FULL BLEED LEFT ──────────────────── */}
      <Split
        file="10-himalayan-monal-pheasant-kumaon.webp"
        alt="Himalayan Monal pheasant pair in Kumaon forest, Uttarakhand state bird"
        width={900} height={600}
        caption="The Himalayan Monal (Lophophorus impejanus) — Uttarakhand's state bird — commonly seen in the oak and rhododendron forests around Munsiyari"
        heading="11. Wildlife and Birds of Kumaon"
      >
        <p style={{ ...p, color: 'rgba(255,255,255,0.72)' }}>The forests and alpine zones of Kumaon support an extraordinary range of wildlife.</p>
        <p style={{ ...p, color: 'rgba(255,255,255,0.72)', marginBottom: 0 }}>The oak forests at mid-elevation — between 1,500 and 2,200 metres — are among the richest bird habitats in the western Himalayas. Research conducted across 42 sites in Kumaon's Nainital and Almora districts recorded 136 bird species, of which 48 are endemic to the Himalayas.</p>
      </Split>
      <div className="kg-narrow" style={{ paddingTop: '1.8rem' }}>
        <p style={p}>Species commonly observed in the Munsiyari forests include the Himalayan Monal (Uttarakhand's state bird), the Cheer Pheasant, the Himalayan Griffon, the serpent eagle and numerous species of woodpecker.</p>
        <p style={p}>Larger mammals present in the region include Himalayan black bears, musk deer, leopards and — in the higher zones — snow leopards, though sightings of the latter are rare.</p>
        <p style={p}>The Nanda Devi Biosphere Reserve — a UNESCO World Heritage Site that includes the Nanda Devi National Park and Valley of Flowers — lies within the broader Kumaon region and is one of the most significant protected areas in the Indian Himalayas.</p>
      </div>

      {/* ── SECTIONS 12–14 — narrow ─────────────────────────────────── */}
      <div className="kg-narrow">
        <h2 style={h2}>12. When to Visit Kumaon</h2>
        <p style={{ ...p, marginBottom: '0.5rem' }}><strong style={{ color: '#f0ece4' }}>May to June:</strong> The pre-monsoon months bring warm days, clear skies and the rhododendron forests of March and April still fading into green. Good visibility of the peaks. Best for trekking to Khaliya Top and longer glacier routes.</p>
        <p style={{ ...p, marginBottom: '0.5rem' }}><strong style={{ color: '#f0ece4' }}>July to August:</strong> Monsoon season. The valleys turn intensely green — a deep, saturated green that is uniquely beautiful. Some mountain roads become difficult. Rain can be heavy. Not ideal for high-altitude trekking but extraordinarily lush for forest immersion and cultural experiences.</p>
        <p style={{ ...p, marginBottom: '0.5rem' }}><strong style={{ color: '#f0ece4' }}>September to October:</strong> The finest season in Kumaon. The monsoon has washed the air completely clean. The skies are crystalline. The Panchachuli range from Munsiyari in October morning light — sharp, snow-white against deep blue — is among the most beautiful mountain views in India. Strongly recommended for first-time visitors.</p>
        <p style={p}><strong style={{ color: '#f0ece4' }}>November to February:</strong> Cold at altitude. Munsiyari can see temperatures drop to -12°C. Snow covers the higher routes. However, for those who seek genuine mountain winter — wood fires, snow-draped forests, complete solitude and the quality of silence that only comes when a mountain town empties of its summer visitors — this is a deeply rewarding season.</p>

        <h2 style={h2}>13. How to Get to Kumaon from Delhi</h2>
        <p style={{ ...p, marginBottom: '0.5rem' }}><strong style={{ color: '#f0ece4' }}>By air:</strong> The nearest airport to eastern Kumaon is Naini Saini Airport in Pithoragarh (IATA: PGH). Domestic flights connect Delhi to Pithoragarh in approximately 1 hour. Mountain aviation is subject to weather — flights can be delayed or cancelled at short notice. Always build flexibility into arrival plans when flying to Pithoragarh.</p>
        <p style={p}>Pantnagar Airport — approximately 250 km from Munsiyari — is an alternative with more regular connections to Delhi, followed by a full-day road journey into the mountains.</p>
        <p style={{ ...p, marginBottom: '0.5rem' }}><strong style={{ color: '#f0ece4' }}>By road from Delhi:</strong> Delhi to Pithoragarh is approximately 470 km by road — a journey of 12 to 14 hours depending on traffic and road conditions. The route passes through Moradabad, Haldwani and Almora. We strongly recommend breaking the journey overnight in Almora or Bhimtal — both are worthwhile destinations in their own right.</p>
        <p style={p}>Delhi to Munsiyari is approximately 620 km — a full day and a half of driving. Breaking at Pithoragarh is standard.</p>
        <p style={{ ...p, marginBottom: '0.5rem' }}><strong style={{ color: '#f0ece4' }}>By rail:</strong> Kathgodam railway station (approximately 275 km from Munsiyari) is the nearest major railhead, well connected to Delhi and other major Indian cities. From Kathgodam, shared taxis and buses run regularly to Pithoragarh and Munsiyari.</p>

        <h2 style={h2}>14. Practical Information for International Travellers</h2>
        {[
          ['Visa', 'Most international visitors require an Indian tourist visa, available online through the e-Visa system at indianvisaonline.gov.in. Processing typically takes 3 to 5 business days.'],
          ['Inner Line Permit', 'Travel to certain areas of Pithoragarh district — including the route to Adi Kailash, Om Parvat and the Darma Valley — requires an Inner Line Permit (ILP) issued by the Pithoragarh district administration. This is a straightforward administrative process that local tour operators manage routinely.'],
          ['Currency', 'Indian Rupee (INR). ATMs are available in Pithoragarh but limited in Munsiyari — carry sufficient cash before departing for higher mountain areas.'],
          ['Connectivity', 'Mobile signal is limited in Munsiyari and largely absent above the town. Most accommodation in Pithoragarh offers wifi. This is, for most visitors, a feature rather than a problem.'],
          ['What to pack', 'Warm layers for early mornings and evenings — temperatures at 2,200m drop significantly after sunset even in summer. Comfortable walking shoes with grip for mountain trails. Reusable water bottle. Sunscreen — UV intensity is significantly higher at altitude. Universal travel adaptor (India uses Type C and D plugs, 230V/50Hz). Personal medications and a basic first aid kit.'],
          ['Altitude awareness', 'Pithoragarh at 1,627m is unlikely to cause altitude issues for most travellers. Munsiyari at 2,298m may cause mild symptoms — headache, fatigue — for the first 24 hours. Rest, hydration and avoiding alcohol on arrival days are standard recommendations. Higher routes like Khaliya Top (3,500m) should be approached gradually.'],
        ].map(([label, text]) => (
          <div key={label} style={{ borderLeft: '2px solid rgba(201,168,76,0.2)', padding: '0.7rem 1rem', marginBottom: '0.9rem', background: 'rgba(255,255,255,0.012)' }}>
            <strong style={{ color: GOLD, display: 'block', fontFamily: 'sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{label}</strong>
            <p style={{ ...p, marginBottom: 0, fontSize: '0.92rem' }}>{text}</p>
          </div>
        ))}

        {/* Section 15 FAQ */}
        <h2 style={h2}>15. Frequently Asked Questions</h2>
        <div style={{ margin: '1.5rem 0' }}>
          {FAQS.map(f => (
            <div key={f.q} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '1.1rem 0' }}>
              <strong style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', display: 'block', marginBottom: '0.4rem', fontFamily: 'sans-serif' }}>{f.q}</strong>
              <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '0.9rem', fontFamily: 'sans-serif', lineHeight: 1.75, margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>

        {/* A Final Note — text paragraphs before the full-bleed CTA */}
        <h2 style={h2}>A Final Note</h2>
        <p style={p}>Kumaon does not need to be sold.</p>
        <p style={p}>It has been drawing people for centuries — before tourism existed as an industry, before the roads were paved, before anyone thought to photograph the mountains for social media. It drew them because it has something that is genuinely rare in the modern world — a landscape that has not been remade around human convenience, a culture that has not been performed for visitors, a quality of silence that the noise of ordinary life simply cannot follow you into.</p>
        <p style={p}>Mahatma Gandhi understood this. So did Swami Vivekananda. So, in their different ways, did Bob Dylan and Steve Jobs.</p>
        <p style={p}>The mountains of Kumaon are not waiting for you. They do not wait for anyone. But they are there — as they have always been — for whoever is ready to come.</p>
      </div>

      {/* ── IMAGE 12 — full bleed with CTA box overlaid ─────────────── */}
      <div className="kg-final">
        <img
          src={`${IMG_BASE}/12-small-group-trekkers-himalaya.webp`}
          alt="Small group of trekkers posing by Himalayan river with mountain backdrop, Himalayan Serenity Travel"
          width={900}
          height={600}
          loading="lazy"
          decoding="async"
        />
        <div className="kg-final-overlay">
          <div className="kg-final-box">
            <h3 style={{ color: GOLD, fontSize: '1.4rem', marginBottom: '0.8rem', fontFamily: 'Georgia, serif', fontWeight: 400 }}>
              Experience Kumaon With Us
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.72)', marginBottom: '1.5rem', fontSize: '0.93rem', fontFamily: 'Georgia, serif', lineHeight: 1.8 }}>
              We run small-group wellness retreats and expeditions in Kumaon — max 12 guests, female guides available, departures August through December 2026.
            </p>
            <Link
              to="/retreats/panchachuli-wellness"
              style={{ display: 'inline-block', background: 'transparent', color: GOLD, padding: '0.75rem 2rem', border: `1px solid ${GOLD}`, borderRadius: 2, textDecoration: 'none', fontWeight: 600, fontSize: '0.88rem', fontFamily: 'sans-serif', letterSpacing: '0.06em' }}
            >
              View Our Retreats
            </Link>
          </div>
        </div>
      </div>
      <figcaption style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.32)', fontFamily: 'sans-serif', fontStyle: 'italic', padding: '0.45rem 1rem 0', display: 'block' }}>
        Small groups, real experiences — the Himalayan Serenity approach to travel in Kumaon
      </figcaption>

      {/* ── BACK TO BLOG ─────────────────────────────────────────────── */}
      <div className="kg-narrow" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <hr style={{ border: 'none', borderTop: '1px solid rgba(201,168,76,0.1)', marginBottom: '2rem' }} />
        <div style={{ textAlign: 'center' }}>
          <Link to="/blog" style={{ color: GOLD, textDecoration: 'none', fontSize: '0.85rem', letterSpacing: '0.1em', fontFamily: 'sans-serif' }}>
            ← Back to All Blogs
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
