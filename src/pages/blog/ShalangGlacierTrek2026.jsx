import { Link } from 'react-router-dom'
import { useSEO } from '../../hooks/useSEO'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const IMG_BASE = '/images/blog'
const GOLD     = '#C9A84C'
const DARK_GRN = '#0a100d'

/* ── Layout CSS injected once ───────────────────────────────────────── */
const CSS = `
  .sg-narrow { max-width: 740px; margin: 0 auto; padding: 0 1.5rem; }

  /* Hero */
  .sg-hero { position: relative; margin-top: 68px; }
  .sg-hero-img { width: 100%; height: max(70vh, 420px); object-fit: cover; object-position: center; display: block; }
  .sg-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.28) 50%, transparent 80%); pointer-events: none; }
  .sg-hero-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 2.5rem 3rem; max-width: 860px; }
  .sg-hero-badge { display: inline-block; background: rgba(201,168,76,0.15); border: 1px solid rgba(201,168,76,0.4); color: var(--sg-gold); padding: 4px 14px; border-radius: 2px; font-size: 0.68rem; letter-spacing: 0.2em; font-family: sans-serif; text-transform: uppercase; margin-bottom: 0.9rem; }
  .sg-hero-title { color: #f0ece4; font-size: clamp(1.7rem, 3.6vw, 3rem); line-height: 1.15; font-weight: 400; font-family: Georgia, serif; margin: 0 0 0.85rem; max-width: 700px; }
  .sg-hero-byline { display: flex; gap: 0.9rem; flex-wrap: wrap; font-size: 0.8rem; color: rgba(255,255,255,0.5); font-family: sans-serif; }
  .sg-hero-dot { color: rgba(201,168,76,0.5); }

  /* Full-width inline image */
  .sg-full-img { width: 100%; display: block; border-radius: 2px; height: auto; }

  /* Gold-bordered inline image (used inside sections) */
  .sg-img-gold { width: 100%; display: block; border: 2px solid var(--sg-gold); border-radius: 12px; height: auto; }

  /* Inline CTA */
  .sg-cta-inline { border-left: 4px solid var(--sg-gold); background: rgba(10,16,13,0.55); padding: 1.25rem 1.5rem; margin: 2.5rem 0; }

  /* Info panel */
  .sg-panel { border-left: 2px solid rgba(201,168,76,0.2); padding: 0.7rem 1rem; margin-bottom: 0.9rem; background: rgba(255,255,255,0.012); }

  /* Final full-bleed CTA image */
  .sg-final { position: relative; margin: 3rem 0 0; }
  .sg-final img { width: 100%; height: 480px; object-fit: cover; object-position: center; display: block; }
  .sg-final-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
  .sg-final-box { background: rgba(10,16,13,0.9); border: 1px solid rgba(201,168,76,0.4); padding: 2.5rem 2rem; text-align: center; max-width: 540px; width: 100%; }

  @media (max-width: 767px) {
    .sg-hero-img { height: 50vh; min-height: 300px; }
    .sg-hero-content { padding: 1.25rem; }
    .sg-hero-title { font-size: 1.55rem !important; }
    .sg-narrow { padding: 0 1rem; }
    .sg-final img { height: 300px; }
    .sg-final-box { padding: 1.5rem 1rem; }
  }
`

/* ── Shared text style objects ───────────────────────────────────────── */
const p    = { lineHeight: 1.9, marginBottom: '1.2rem', color: 'rgba(255,255,255,0.75)', fontFamily: 'Georgia, serif', fontSize: '1rem' }
const pTight = { ...p, marginBottom: '0.4rem' }
const h2   = { color: GOLD, fontSize: '1.4rem', margin: '2.8rem 0 1rem', lineHeight: 1.3, fontWeight: 400, borderBottom: '1px solid rgba(201,168,76,0.12)', paddingBottom: '0.6rem', fontFamily: 'Georgia, serif' }
const h3   = { color: '#f0ece4', fontSize: '1.05rem', margin: '1.8rem 0 0.6rem', fontWeight: 600, fontFamily: 'Georgia, serif' }
const src  = { fontSize: '0.82rem', color: 'rgba(201,168,76,0.6)', fontFamily: 'sans-serif', fontStyle: 'italic', marginBottom: '1.4rem', lineHeight: 1.6 }
const ul   = { margin: '0 0 1.2rem', paddingLeft: '1.3rem', color: 'rgba(255,255,255,0.75)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.9 }

const FAQS = [
  { q: 'What is the Shalang Glacier Trek?', a: 'The Shalang Glacier Trek is a high-altitude wilderness expedition in Johar Valley, Pithoragarh district, Kumaon, Uttarakhand. It approaches the Shalang Glacier and the Shalang Dhura peak region (5,678m), reaching maximum altitudes of approximately 16,500 feet (5,029m) depending on route and conditions. It was declared Trek of the Year 2026 by the Uttarakhand Tourism Development Board.' },
  { q: 'Why is Shalang called Trek of the Year 2026?', a: 'The Uttarakhand Tourism Development Board officially declared the Shalang Glacier Trek as one of the Treks of the Year 2026 as part of their annual initiative to promote extraordinary, undervisited Himalayan trails and develop sustainable adventure tourism beyond crowded routes. (Source: uttarakhandtourism.gov.in; Uttarakhand Tourism Official Facebook Page)' },
  { q: 'How difficult is the Shalang Glacier Trek?', a: 'Shalang is a serious Himalayan wilderness expedition — not suitable for beginners or casual trekkers. Good physical fitness, prior trekking experience at altitude and the guidance of experienced local mountain guides are all strongly recommended.' },
  { q: 'What is the best time to do the Shalang Glacier Trek?', a: 'May to June (pre-monsoon) and September to October (post-monsoon) are the recommended trekking windows. September and October offer the clearest skies and most exceptional mountain visibility.' },
  { q: 'Do I need a permit for the Shalang Glacier Trek?', a: 'Yes. Travel in the Johar Valley and Shalang region typically requires an Inner Line Permit (ILP) from the Pithoragarh District Administration, along with possible forest permits and ITBP clearance depending on the specific route. Requirements should always be confirmed before departure through a registered local operator or the district administration.' },
  { q: 'How do I get to the Shalang Glacier Trek?', a: 'Most trekkers fly into Delhi then connect to Pithoragarh by domestic flight (1 hour) or continue by road. From Pithoragarh, the journey continues to Munsiyari — the gateway to Johar Valley and the Shalang region. Allow a full day for this mountain road journey.' },
  { q: 'Is the Shalang Glacier Trek suitable for international travellers?', a: 'Yes — with proper preparation, experienced local guides and appropriate acclimatisation time. International travellers should allow extra days for the journey from Delhi and acclimatisation before the high-altitude sections of the trek.' },
]

const CONTENTS = [
  'What Is the Shalang Glacier Trek?',
  'Why Uttarakhand Tourism Declared It Trek of the Year 2026',
  'Shalang Dhura — The Heart of the Expedition',
  'Johar Valley — More Than Just Mountains',
  'The Bhotia and Johari Communities',
  'What the Landscape Actually Looks Like',
  'How to Reach the Shalang Glacier Trek',
  'Best Time to Trek Shalang Glacier',
  'Permits and Permissions',
  'Insider Tips for 2026',
  'Responsible Trekking in Johar Valley',
  'Frequently Asked Questions',
]

const PRACTICAL = [
  ['By Air — Naini Saini Airport, Pithoragarh (PGH)', 'The nearest regional airport for eastern Kumaon is Naini Saini Airport near Pithoragarh. From there, trekkers continue by road toward Munsiyari — approximately 94 km from the airport, though actual mountain road travel times depend heavily on road and weather conditions. (Source: Pithoragarh district tourism information)'],
  ['By Air — Pantnagar Airport', 'For many domestic travellers, Pantnagar Airport serves as an entry point into Kumaon, followed by a longer road journey into the mountains. The nearest airport is Pantnagar Airport, approximately 300 km from Munsiyari. (Source: Uttarakhand Trip, August 2025)'],
  ['By Train — Kathgodam Railway Station', 'Kathgodam is one of the most practical railway gateways into the Kumaon Himalaya. From Kathgodam, trekkers continue by road toward Munsiyari and the eastern Himalaya — approximately 300 km by mountain road. The drive is long. But it is also one of the great Himalayan road journeys — the landscape gradually transforming from foothills into deep valleys and high mountain country.'],
]

export default function ShalangGlacierTrek2026() {
  useSEO({
    title: 'Shalang Glacier Trek 2026 | Johar Valley Adventure Trek in Uttarakhand',
    description: "Discover the Shalang Glacier Trek in Johar Valley, Pithoragarh, Uttarakhand — officially declared Trek of the Year 2026 by Uttarakhand Tourism Development Board. A complete guide to one of Kumaon's most remote high-altitude Himalayan adventures.",
    canonical: 'https://www.himalayanserenitytravel.com/blog/shalang-glacier-trek-2026-johar-valley-uttarakhand',
  })

  return (
    <div style={{ '--sg-gold': GOLD, '--sg-dark': DARK_GRN, background: '#0d0d0d', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Navbar activePage="blog" />

      {/* ── HERO — featured image, title overlaid ───────────────────── */}
      <div className="sg-hero">
        <img
          className="sg-hero-img"
          src={`${IMG_BASE}/shalang-glacier-trek-route-map-2026.webp`}
          alt="Shalang Glacier Trek route map Johar Valley Pithoragarh Uttarakhand 2026"
          width={1200}
          height={729}
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="sg-hero-overlay" aria-hidden="true" />
        <div className="sg-hero-content">
          <span className="sg-hero-badge">Travel Guide · Uttarakhand · 2026</span>
          <h1 className="sg-hero-title">
            The Shalang Glacier Trek — Trek of the Year 2026
          </h1>
          <div className="sg-hero-byline">
            <span>By Pramod Bhatt</span>
            <span className="sg-hero-dot">·</span>
            <span>Pithoragarh, Uttarakhand</span>
            <span className="sg-hero-dot">·</span>
            <span>September 10, 2026</span>
            <span className="sg-hero-dot">·</span>
            <span>14 min read</span>
          </div>
        </div>
      </div>
      <figcaption style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.32)', textAlign: 'center', padding: '0.5rem 1rem', fontFamily: 'sans-serif', fontStyle: 'italic', background: '#0d0d0d' }}>
        Officially declared Trek of the Year 2026 by the Uttarakhand Tourism Development Board — Source: Uttarakhand Tourism Official Facebook Page and Instagram, uttarakhandtourism.gov.in
      </figcaption>

      {/* ── ARTICLE HEADER ──────────────────────────────────────────── */}
      <div className="sg-narrow" style={{ paddingTop: '2.5rem' }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.32)', fontFamily: 'sans-serif', marginBottom: '1.8rem' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.32)', textDecoration: 'none' }}>Home</Link>
          {' › '}
          <Link to="/blog" style={{ color: 'rgba(255,255,255,0.32)', textDecoration: 'none' }}>Blog</Link>
          {' › '}
          <span style={{ color: GOLD }}>Shalang Glacier Trek 2026</span>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.07)', margin: '0 0 2rem' }} />

        {/* At a Glance */}
        <div style={{ background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.18)', borderRadius: 2, padding: '1.2rem 1.5rem', marginBottom: '2rem' }}>
          <span style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: '0.6rem' }}>At a Glance</span>
          <p style={{ ...p, marginBottom: 0, fontSize: '0.93rem' }}>
            The Shalang Glacier Trek is a high-altitude wilderness expedition in Johar Valley, Pithoragarh district, Kumaon, Uttarakhand. Officially recognised as Trek of the Year 2026 by the Uttarakhand Tourism Development Board, Shalang offers one of the most remote and dramatically beautiful glacier landscapes in the Indian Himalaya — with maximum altitude reaching approximately 16,500 feet (5,029m) near the Shalang Dhura region. Best season: May to June and September to October.
          </p>
        </div>
      </div>

      {/* ── IMAGE 1 — full width, right after At a Glance ───────────── */}
      <div className="sg-narrow" style={{ marginBottom: '2.5rem' }}>
        <img
          className="sg-full-img"
          src={`${IMG_BASE}/shalang-glacier-trek-route-map-2026.webp`}
          alt="Shalang Glacier Trek route map Johar Valley Pithoragarh Uttarakhand 2026"
          width={1200}
          height={800}
          loading="lazy"
          decoding="async"
        />
        <figcaption style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.38)', fontFamily: 'sans-serif', fontStyle: 'italic', lineHeight: 1.5, textAlign: 'center', marginTop: '0.6rem' }}>
          The Shalang Glacier Trek route through Johar Valley, Pithoragarh district, Kumaon Himalaya
        </figcaption>
      </div>

      {/* ── Contents ─────────────────────────────────────────────────── */}
      <div className="sg-narrow">
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 2, padding: '1.2rem 1.5rem', marginBottom: '3rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'sans-serif', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: '0.8rem' }}>Contents</span>
          {CONTENTS.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.6rem', padding: '0.3rem 0', borderBottom: i < CONTENTS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <span style={{ color: 'rgba(201,168,76,0.5)', fontFamily: 'sans-serif', fontSize: '0.8rem', minWidth: '1.4rem' }}>{i + 1}.</span>
              <span style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'sans-serif', fontSize: '0.85rem', lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 1 ────────────────────────────────────────────────── */}
      <div className="sg-narrow">
        <h2 style={h2}>1. What Is the Shalang Glacier Trek?</h2>
        <p style={p}>There are Himalayan treks that are famous because everyone knows their name.</p>
        <p style={p}>And then there are treks that become unforgettable precisely because almost nobody does them.</p>
        <p style={p}>The Shalang Glacier Trek belongs firmly to the second category.</p>
        <p style={p}>Deep inside the high Himalaya of Johar Valley in Pithoragarh district, Kumaon, Uttarakhand, Shalang is a landscape that still feels genuinely wild. There are no crowded trekking queues, no cafés waiting at every viewpoint and no carefully engineered tourist experience.</p>
        <p style={p}>Instead, there are ancient trails, remote valleys, moraine fields, icy rivers, vast glaciers and some of the most dramatic mountain scenery in the entire Kumaon Himalaya.</p>
        <p style={p}>The Shalang Glacier region lies in the spectacular high-altitude landscape of Johar Valley — one of the great mountain valleys of eastern Kumaon, stretching from Munsiyari toward the high mountains along the Gori Ganga River, historically a thriving trade route to Tibet.</p>
        <p style={src}>(Source: Munsiyari Tourism, April 2026)</p>
        <p style={p}>The wider Shalang region is associated with dramatic mountain terrain around Nanda Kot (6,861m), Kuchela Dhura (6,294m), and Shalang Dhura (5,678m) — where glaciers and high valleys form a remarkably rugged Himalayan environment.</p>
        <p style={src}>(Source: Himalvin.com; ResearchGate — Namik Glacier Trek documentation)</p>
      </div>

      {/* ── SECTION 2 ────────────────────────────────────────────────── */}
      <div className="sg-narrow">
        <h2 style={h2}>2. Why Uttarakhand Tourism Declared It Trek of the Year 2026</h2>
        <p style={p}>The Uttarakhand Tourism Development Board — the state government's official tourism authority — runs an annual "Trek of the Year" initiative designed to spotlight extraordinary but undervisited Himalayan trails.</p>
        <p style={p}>In 2026, the Shalang Glacier Trek was officially selected as one of Uttarakhand's Treks of the Year — a recognition that reflects both the trek's extraordinary natural character and the state's commitment to promoting responsible, sustainable adventure tourism beyond overcrowded routes.</p>
        <p style={p}>This is not a marketing claim. It is an official government declaration, promoted through Uttarakhand's tourism channels including the Uttarakhand Tourism Development Board's official Facebook page and Instagram.</p>
        <p style={src}>(Source: Uttarakhand Tourism Official Facebook Page; Uttarakhand Tourism Instagram Reel; uttarakhandtourism.gov.in)</p>
        <p style={p}>The selection carries a practical implication for trekkers: registered tour operators leading Shalang Glacier expeditions receive a government incentive of ₹2,000 per trekker, making 2026 an especially good year to undertake this expedition with a professional local operator.</p>
        <p style={p}>The initiative is part of Uttarakhand's broader 2026 tourism strategy — described by Abhishek Ruhela, IAS, Additional Chief Executive Officer of UTDB, as a focus on "opening 83 peaks, conducting annual mountaineering expeditions for young climbers, and implementing the Trek of the Year initiative" to create year-round sustainable adventure tourism.</p>
        <p style={src}>(Source: Travel Trade Journal, February 2026)</p>
      </div>

      {/* ── SECTION 3 — image 2 embedded ────────────────────────────── */}
      <div className="sg-narrow">
        <h2 style={h2}>3. Shalang Dhura — The Heart of the Expedition</h2>
        <p style={p}>Shalang Dhura Peak rises to 5,678 metres above sea level in the Johar Valley of Munsiyari, Pithoragarh district.</p>
        <p style={p}>It is what mountaineers describe as a lesser-known summit — surrounded by the pristine beauty of the Shalang Glacier, offering untouched and unexplored landscapes that attract serious trekkers, beginner mountaineers and expedition photographers.</p>
        <p style={src}>(Source: Himalvin.com, April 2025)</p>

        <figure style={{ margin: '1.5rem 0 2rem' }}>
          <img
            className="sg-img-gold"
            src={`${IMG_BASE}/shalang-glacier-moraine-kumaon-himalaya.webp`}
            alt="Shalang Glacier moraine landscape Johar Valley Pithoragarh Kumaon Himalaya"
            width={900}
            height={600}
            loading="lazy"
            decoding="async"
          />
          <figcaption style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.38)', fontFamily: 'sans-serif', fontStyle: 'italic', lineHeight: 1.5, textAlign: 'center', marginTop: '0.45rem' }}>
            The Shalang Glacier moraine — Johar Valley, Pithoragarh, Kumaon Himalaya
          </figcaption>
        </figure>

        <p style={p}>Kuchela Dhura (6,294m) sits on the boundary landscape between the Lwa and Shalang glacier systems — its position documented in Himalayan mountaineering records as one of the key peaks defining this extraordinary glacial geography.</p>
        <p style={src}>(Source: ResearchGate, Namik Glacier Trek documentation)</p>
        <p style={p}>The expedition reaches high-altitude terrain at approximately 16,500 feet (5,029m) depending on the final route, camp positions and exploration objectives near the Shalang Dhura region.</p>
        <p style={p}>At these elevations, every step demands patience, acclimatisation and deep respect for the mountain environment.</p>
        <p style={p}>This is not a casual weekend trek.</p>
        <p style={p}>Shalang is a true Himalayan wilderness expedition.</p>
      </div>

      {/* ── SECTION 4 ────────────────────────────────────────────────── */}
      <div className="sg-narrow">
        <h2 style={h2}>4. Johar Valley — More Than Just Mountains</h2>
        <p style={p}>Johar Valley is located in the northern part of Pithoragarh district, Uttarakhand. It stretches from Munsiyari town towards the high mountains of the Himalayas along the Gori Ganga River, reaching close to the Milam Glacier and the Tibet border. It is surrounded by important Himalayan peaks including Panchachuli, Nanda Devi East and Rajrambha.</p>
        <p style={src}>(Source: Uttarakhand Trip, August 2025)</p>
        <p style={p}>The Johar Valley follows the historic Milam Glacier trail, once part of an ancient Indo-Tibetan trade route. For centuries, Johari traders crossed the high mountain passes between India and Tibet carrying wool, salt and grain in both directions — a tradition that shaped the entire culture of the valley.</p>
        <p style={src}>(Source: Munsiyari Holidays, 2025)</p>
        <p style={p}>Today, Johar Valley attracts nature lovers, trekkers, historians and those seeking to experience untouched Himalayan beauty — described by travel writers in 2026 as "considerably more rewarding for travellers willing to push a little deeper into the Kumaon Himalayas."</p>
        <p style={src}>(Source: StayVista Journal, March 2026)</p>
        <p style={p}>The landscape changes dramatically as you move deeper into the mountains.</p>
        <p style={p}>Lower down, the Himalaya feels inhabited. Villages, grazing grounds and old mountain pathways tell the story of communities that have walked these valleys for generations.</p>
        <p style={p}>Higher up, the human world begins to disappear.</p>
        <p style={p}>The trail becomes rock.</p>
        <p style={p}>Rock becomes moraine.</p>
        <p style={p}>Moraine becomes ice.</p>
        <p style={p}>And eventually, the mountains take complete control of the horizon.</p>
      </div>

      {/* ── SECTION 5 ────────────────────────────────────────────────── */}
      <div className="sg-narrow">
        <h2 style={h2}>5. The Bhotia and Johari Communities</h2>
        <p style={p}>Johar Valley is home to the Johari people, known for their unique customs, colourful attire and hospitality. The valley is famous for its traditional Johari culture and trade history — for centuries the centre of Indo-Tibetan trade.</p>
        <p style={src}>(Source: Uttarakhand Trip, August 2025)</p>
        <p style={p}>The Bhotia communities of Johar Valley — high-altitude traders and herders who historically maintained trans-Himalayan trade routes — carry within their culture a relationship with the mountains that no guidebook can manufacture.</p>
        <p style={p}>Their stone houses, ancient footpaths, seasonal settlements and stories passed through generations give the Shalang journey a dimension that goes far beyond physical adventure.</p>
        <p style={p}>For responsible travellers, this cultural depth makes the Shalang expedition far richer than simply reaching a glacier.</p>
        <p style={p}>The mountains are spectacular.</p>
        <p style={p}>But the human history of the valley gives the journey its soul.</p>
      </div>

      {/* ── SECTION 6 — image 3 embedded ────────────────────────────── */}
      <div className="sg-narrow">
        <h2 style={h2}>6. What the Landscape Actually Looks Like</h2>
        <p style={p}>There is a particular moment on a Himalayan expedition when you first step into a true glacial landscape.</p>
        <p style={p}>The scale changes instantly.</p>
        <p style={p}>A mountain that looked close from the valley suddenly appears impossibly far away.</p>
        <p style={p}>The glacier stretches beneath towering walls of rock and ice.</p>
        <p style={p}>The trail disappears into moraine.</p>
        <p style={p}>Cloud shadows move across peaks that seem too large to comprehend.</p>
        <p style={p}>The Shalang region delivers this sense of scale in abundance.</p>
        <p style={p}>The wider glacier system sits among some of the most dramatic mountains of the Kumaon Himalaya — including the region around Nanda Kot (6,861m) and Kuchela Dhura (6,294m).</p>

        <figure style={{ margin: '1.5rem 0 2rem' }}>
          <img
            className="sg-img-gold"
            src={`${IMG_BASE}/shalang-glacier-camp-johar-valley-uttarakhand.webp`}
            alt="High altitude camping Johar Valley Shalang Glacier trek Uttarakhand Himalaya"
            width={900}
            height={600}
            loading="lazy"
            decoding="async"
          />
          <figcaption style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.38)', fontFamily: 'sans-serif', fontStyle: 'italic', lineHeight: 1.5, textAlign: 'center', marginTop: '0.45rem' }}>
            High-altitude camp on the Shalang Glacier trek, Johar Valley, Uttarakhand
          </figcaption>
        </figure>

        <p style={p}>The geography is complex and dramatic:</p>
        <ul style={ul}>
          <li>High alpine valleys</li>
          <li>Glacial moraines</li>
          <li>Snowfields and ice formations</li>
          <li>Fast-flowing Himalayan streams fed by glacial melt</li>
          <li>Remote grazing grounds</li>
          <li>Rugged mountain ridges</li>
          <li>Towering six-thousand-metre Himalayan peaks</li>
        </ul>
        <p style={p}>Historical mountaineering accounts from the wider Shalang-Poting region describe a landscape of steep moraine ridges, grassy plateaus fed by snowmelt streams and complex glacier terrain marked by crevasses and enormous icefalls.</p>
        <p style={p}>Big country. Serious mountains. Very little human interference.</p>
      </div>

      {/* ── SECTION 7 ────────────────────────────────────────────────── */}
      <div className="sg-narrow">
        <h2 style={h2}>7. How to Reach the Shalang Glacier Trek</h2>
        <p style={p}>Reaching Shalang is an adventure in itself.</p>

        {PRACTICAL.map(([label, text]) => (
          <div key={label} className="sg-panel">
            <strong style={{ color: GOLD, display: 'block', fontFamily: 'sans-serif', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{label}</strong>
            <p style={{ ...p, marginBottom: 0, fontSize: '0.92rem' }}>{text}</p>
          </div>
        ))}

        <h3 style={h3}>From Delhi</h3>
        <p style={p}>International travellers fly into Delhi Indira Gandhi International Airport (DEL) — well connected to major European, Australian and American cities — then continue toward Kumaon by:</p>
        <ul style={ul}>
          <li>Domestic flight to Pithoragarh (PGH) — 1 hour</li>
          <li>Train to Kathgodam then road</li>
          <li>Private vehicle — approximately 12-14 hours</li>
        </ul>

        <div className="sg-cta-inline">
          <p style={{ color: 'rgba(255,255,255,0.75)', margin: '0 0 0.6rem', fontSize: '0.93rem', fontFamily: 'Georgia, serif', lineHeight: 1.85, fontStyle: 'italic' }}>
            <strong style={{ color: '#f0ece4', fontStyle: 'normal' }}>Insider Tip:</strong> Do not treat the journey to Munsiyari as a transfer day to be rushed. The road from Pithoragarh to Munsiyari passes through Birthi Falls, ancient Johari villages and some of the finest Himalayan scenery in Uttarakhand. Allow a full day and stop often.
          </p>
        </div>
      </div>

      {/* ── SECTION 8 ────────────────────────────────────────────────── */}
      <div className="sg-narrow">
        <h2 style={h2}>8. Best Time to Trek Shalang Glacier</h2>
        <p style={pTight}><strong style={{ color: '#f0ece4' }}>May to June (Pre-Monsoon):</strong> Clear skies, stable weather, rhododendron forests in bloom at lower elevations. Snow still present at high altitude. Excellent visibility of the peaks. Recommended for the main glacier approach.</p>
        <p style={pTight}><strong style={{ color: '#f0ece4' }}>September to October (Post-Monsoon):</strong> The finest trekking window in Kumaon. The monsoon has cleaned the air completely — skies are crystalline, visibility is exceptional and the high-altitude landscape turns golden. Strongly recommended for first-time Shalang trekkers.</p>
        <p style={pTight}><strong style={{ color: '#f0ece4' }}>July to August (Monsoon):</strong> Not recommended for high-altitude glacier trekking. Heavy rainfall makes mountain trails unstable and river crossings dangerous.</p>
        <p style={p}><strong style={{ color: '#f0ece4' }}>November to April:</strong> Snow closes the high routes. Not suitable for the Shalang Glacier approach without specialist mountaineering equipment and experience.</p>
      </div>

      {/* ── SECTION 9 ────────────────────────────────────────────────── */}
      <div className="sg-narrow">
        <h2 style={h2}>9. Permits and Permissions</h2>
        <p style={p}>The Johar Valley and Shalang region lie in a sensitive border area of Pithoragarh district.</p>
        <p style={p}>Trekkers typically require:</p>

        <div className="sg-panel">
          <strong style={{ color: GOLD, display: 'block', fontFamily: 'sans-serif', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Inner Line Permit (ILP)</strong>
          <p style={{ ...p, marginBottom: 0, fontSize: '0.92rem' }}>Required for travel into restricted border zones of Pithoragarh district. Administered by the District Administration Pithoragarh. Apply through the official portal or through a registered local tour operator.</p>
        </div>
        <p style={{ ...src, marginTop: '-0.4rem' }}>(Source: Himalaya Trekkers, August 2025)</p>

        <div className="sg-panel">
          <strong style={{ color: GOLD, display: 'block', fontFamily: 'sans-serif', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Forest Department Permits</strong>
          <p style={{ ...p, marginBottom: 0, fontSize: '0.92rem' }}>Standard forest entry permits may be required depending on the specific route and camping areas.</p>
        </div>

        <div className="sg-panel">
          <strong style={{ color: GOLD, display: 'block', fontFamily: 'sans-serif', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>ITBP Clearance</strong>
          <p style={{ ...p, marginBottom: 0, fontSize: '0.92rem' }}>Routes toward sensitive high-altitude border areas may require additional clearance from the Indo-Tibetan Border Police.</p>
        </div>

        <div className="sg-cta-inline">
          <p style={{ color: 'rgba(255,255,255,0.75)', margin: 0, fontSize: '0.93rem', fontFamily: 'Georgia, serif', lineHeight: 1.85, fontStyle: 'italic' }}>
            <strong style={{ color: '#f0ece4', fontStyle: 'normal' }}>Important:</strong> Permit requirements can change, particularly in sensitive Himalayan border regions. Always confirm the latest requirements before departure through a registered local operator or the Pithoragarh District Administration.
          </p>
        </div>
      </div>

      {/* ── SECTION 10 ───────────────────────────────────────────────── */}
      <div className="sg-narrow">
        <h2 style={h2}>10. Insider Tips for 2026</h2>

        <h3 style={h3}>1. Build Your Fitness Before You Arrive</h3>
        <p style={p}>The Shalang Glacier Trek is best suited to trekkers with a good level of physical fitness. Before the expedition focus on:</p>
        <ul style={ul}>
          <li>Long-distance walking — build to 6+ hours</li>
          <li>Stair and hill climbing</li>
          <li>Cardiovascular training</li>
          <li>Leg and core strength</li>
          <li>Trekking with a loaded backpack</li>
        </ul>
        <p style={p}>The goal is not speed. The goal is to move steadily and comfortably for several hours at altitude.</p>

        <h3 style={h3}>2. Respect Altitude — Always</h3>
        <p style={p}>High-altitude trekking requires proper acclimatisation. Never assume that physical fitness alone protects you from Acute Mountain Sickness (AMS).</p>
        <p style={p}>Follow your expedition leader's guidance on:</p>
        <ul style={ul}>
          <li>Acclimatisation days</li>
          <li>Hydration — minimum 3-4 litres daily at altitude</li>
          <li>Walking pace — slow and steady</li>
          <li>Recognising AMS symptoms</li>
          <li>Emergency descent procedures</li>
        </ul>
        <p style={p}>The strongest trekkers are always the ones who know when to slow down.</p>

        <h3 style={h3}>3. Travel With Experienced Local Support</h3>
        <p style={p}>Remote Kumaon trekking requires knowledge that cannot be found on any map.</p>
        <p style={p}>Local guides understand seasonal trail conditions, weather patterns, water sources, village logistics and emergency evacuation possibilities that no online resource can accurately describe.</p>
        <p style={p}>For an expedition into the Shalang region, experienced local support is not optional. It is essential.</p>

        <h3 style={h3}>4. Take Advantage of the 2026 Government Initiative</h3>
        <p style={p}>Registered tour operators leading Shalang Glacier expeditions in 2026 receive a government incentive of ₹2,000 per trekker as part of the Trek of the Year scheme. Booking through a registered operator ensures you benefit from this initiative and supports the local mountain economy.</p>

        <h3 style={h3}>5. Pack for a Real Himalayan Expedition</h3>
        <p style={p}>Essential equipment:</p>
        <ul style={ul}>
          <li>High-quality waterproof trekking boots</li>
          <li>Layered thermal clothing</li>
          <li>Waterproof outer shell jacket and trousers</li>
          <li>Insulated down jacket</li>
          <li>Warm gloves and hat</li>
          <li>UV-protection sunglasses (essential at altitude)</li>
          <li>Trekking poles</li>
          <li>Personal medical supplies including altitude medication</li>
          <li>Reusable water bottles and purification tablets</li>
          <li>High-SPF sunscreen — UV intensity is severe at altitude</li>
        </ul>
        <p style={p}>In the Himalaya, weather changes faster than any forecast. Always pack for conditions colder than you expect.</p>
      </div>

      {/* ── SECTION 11 ───────────────────────────────────────────────── */}
      <div className="sg-narrow">
        <h2 style={h2}>11. Responsible Trekking in Johar Valley</h2>
        <p style={p}>Shalang's greatest attraction is also its greatest responsibility.</p>
        <p style={p}>It is still wild.</p>
        <p style={p}>It is still relatively untouched.</p>
        <p style={p}>And it should remain that way.</p>
        <p style={p}>Every responsible trekker should practice Leave No Trace principles:</p>
        <ul style={ul}>
          <li>Carry all waste back — including food packaging</li>
          <li>Avoid single-use plastic — carry reusable bottles</li>
          <li>Respect water sources — camp at least 60 metres from streams and glacial water</li>
          <li>Do not disturb wildlife</li>
          <li>Camp only in designated or established areas</li>
          <li>Respect local customs, communities and sacred sites</li>
          <li>Purchase locally wherever possible</li>
        </ul>
        <p style={p}>The future of places like Shalang depends entirely on travellers understanding one simple truth:</p>
        <p style={p}>We are visitors in these mountains.</p>
        <p style={p}>The mountains are not ours to take from. They are ours to protect.</p>
      </div>

      {/* ── SECTION 12 — FAQ ─────────────────────────────────────────── */}
      <div className="sg-narrow">
        <h2 style={h2}>12. Frequently Asked Questions</h2>
        <div style={{ margin: '1.5rem 0' }}>
          {FAQS.map(f => (
            <div key={f.q} style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '1.1rem 0' }}>
              <strong style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', display: 'block', marginBottom: '0.4rem', fontFamily: 'sans-serif' }}>{f.q}</strong>
              <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '0.9rem', fontFamily: 'sans-serif', lineHeight: 1.75, margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>

        {/* Why 2026 */}
        <h2 style={h2}>Why 2026 Is the Year to Trek Shalang</h2>
        <p style={p}>Because some journeys should not wait until they become famous.</p>
        <p style={p}>Because the world's remaining wilderness is becoming increasingly precious.</p>
        <p style={p}>Because there is something deeply human about walking into a landscape where roads disappear, mobile networks fall silent and the mountains take complete control of the horizon.</p>
        <p style={p}>The Shalang Glacier Trek represents exactly the kind of adventure that serious travellers are searching for in 2026:</p>
        <ul style={{ ...ul, listStyle: 'none', paddingLeft: 0 }}>
          <li style={{ marginBottom: '0.4rem' }}><span style={{ color: GOLD, marginRight: '0.6rem' }}>✓</span>Remote but culturally rich</li>
          <li style={{ marginBottom: '0.4rem' }}><span style={{ color: GOLD, marginRight: '0.6rem' }}>✓</span>Challenging but deeply rewarding</li>
          <li style={{ marginBottom: '0.4rem' }}><span style={{ color: GOLD, marginRight: '0.6rem' }}>✓</span>Photogenic but genuinely wild</li>
          <li style={{ marginBottom: '0.4rem' }}><span style={{ color: GOLD, marginRight: '0.6rem' }}>✓</span>High-altitude but meaningful</li>
          <li style={{ marginBottom: '0.4rem' }}><span style={{ color: GOLD, marginRight: '0.6rem' }}>✓</span>Officially recognised but still undiscovered</li>
        </ul>
        <p style={p}>This is not a trek for ticking off a destination.</p>
        <p style={p}>It is a journey for remembering why we travel in the first place.</p>
      </div>

      {/* ── IMAGE — full bleed with CTA box overlaid ────────────────── */}
      <div className="sg-final">
        <img
          src={`${IMG_BASE}/shalang-glacier-camp-johar-valley-uttarakhand.webp`}
          alt="High altitude camping Johar Valley Shalang Glacier trek Uttarakhand Himalaya"
          width={900}
          height={600}
          loading="lazy"
          decoding="async"
        />
        <div className="sg-final-overlay">
          <div className="sg-final-box">
            <h3 style={{ color: GOLD, fontSize: '1.4rem', marginBottom: '0.8rem', fontFamily: 'Georgia, serif', fontWeight: 400 }}>
              Trek with Himalayan Serenity Travel
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.72)', marginBottom: '1.5rem', fontSize: '0.93rem', fontFamily: 'Georgia, serif', lineHeight: 1.8 }}>
              Himalayan Serenity Travel is a boutique Himalayan travel brand with a contact office in Pithoragarh. We lead professionally planned expeditions with experienced local guides who know the Shalang region intimately.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/contact"
                style={{ display: 'inline-block', background: 'transparent', color: GOLD, padding: '0.75rem 1.6rem', border: `1px solid ${GOLD}`, borderRadius: 2, textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', fontFamily: 'sans-serif', letterSpacing: '0.04em' }}
              >
                Plan Your Expedition
              </Link>
            </div>
          </div>
        </div>
      </div>
      <figcaption style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.32)', fontFamily: 'sans-serif', fontStyle: 'italic', padding: '0.45rem 1rem 0', display: 'block' }}>
        Himalayan Serenity Travel is based in Pithoragarh, Uttarakhand — the gateway to Johar Valley, Adi Kailash and the Shalang Glacier region.
      </figcaption>

      {/* ── Further reading + sources ───────────────────────────────── */}
      <div className="sg-narrow" style={{ paddingTop: '2.5rem' }}>
        <ul style={{ ...ul, marginBottom: '2rem' }}>
          <li><Link to="/packages/adi-kailash-expedition" style={{ color: GOLD, textDecoration: 'none' }}>Explore our Himalayan Expedition Programs →</Link></li>
          <li><Link to="/blog/kumaon-himalayas-travel-guide-wellness-2026" style={{ color: GOLD, textDecoration: 'none' }}>Read our Kumaon Travel Guide →</Link></li>
        </ul>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', marginBottom: '2rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'sans-serif', fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: '0.8rem' }}>Sources Cited</span>
          <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'sans-serif', fontSize: '0.8rem', lineHeight: 1.9 }}>
            <li>Uttarakhand Tourism Development Board — Trek of the Year 2026 Official Announcement, uttarakhandtourism.gov.in</li>
            <li>Uttarakhand Tourism Official Facebook Page</li>
            <li>Himalvin.com — Shalang Dhura Peak, April 2025</li>
            <li>Munsiyari Tourism (X/Twitter) — Johar Valley, April 2026</li>
            <li>Uttarakhand Trip — Johar Valley Guide, August 2025</li>
            <li>Munsiyari Holidays — Johar Valley Trek, 2025</li>
            <li>StayVista Journal — Pithoragarh Travel Guide 2026, March 2026</li>
            <li>Travel Trade Journal — Uttarakhand Tourism Strategy 2026, February 2026</li>
            <li>Himalaya Trekkers — Uttarakhand Permits, August 2025</li>
            <li>ResearchGate — Namik Glacier Trek documentation</li>
          </ul>
        </div>
      </div>

      {/* ── BACK TO BLOG ─────────────────────────────────────────────── */}
      <div className="sg-narrow" style={{ paddingTop: '1rem', paddingBottom: '4rem' }}>
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
