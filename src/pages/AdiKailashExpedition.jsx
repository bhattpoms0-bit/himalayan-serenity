import { useState } from "react";
import { useSEO } from '../hooks/useSEO';
import { motion } from "framer-motion";

const itinerary = [
  {
    day: "Day 0",
    title: "Overnight Departure from Delhi",
    subtitle: "Delhi → Kumaon Himalaya",
    description:
      "Depart from Delhi NCR for the overnight journey toward the sacred Kumaon Himalaya. The journey to Adi Kailash begins long before the mountains appear — in the quiet of night, rolling through the foothills toward Pithoragarh.",
    experiences: ["Private SUV transfer (Ertiga / Scorpio / Premium SUV)", "Overnight mountain approach"],
    stay: null,
    altitude: null,
    image: null,
    imageAlt: null,
  },
  {
    day: "Day 1",
    title: "Arrival in Pithoragarh",
    subtitle: "Gateway to the Sacred Himalayas",
    description:
      "Arrive in Pithoragarh — the cultural heart of Kumaon and the gateway to the Adi Kailash corridor. Settle into the rhythm of the mountains. Evening excursion to Chandak viewpoint for panoramic sunset views over the Soar Valley. Expedition briefing and acclimatization support.",
    experiences: [
      "Himalayan mountain views",
      "Kumaoni cultural landscapes",
      "Chandak sunset viewpoint",
      "Expedition orientation",
      "Premium welcome assistance",
    ],
    stay: "Pithoragarh",
    altitude: null,
    image: "/images/adi-kailash-expedition/pithoragarh-arrival-gateway-sacred-himalayas-day1.png",
    imageAlt: "Pithoragarh arrival gateway to the sacred Himalayas, day one of Adi Kailash expedition",
  },
  {
    day: "Day 2",
    title: "Pithoragarh to Dharchula",
    subtitle: "Into the Himalayan Frontier | Optional Nepal Visit",
    description:
      "Morning drive toward Dharchula via Jauljibi. Arrival at the Indo-Nepal Himalayan border town. Optional Nepal market and cultural visit (subject to permissions). Introduction to high Himalayan trade routes and border culture.",
    experiences: [
      "Kali River valley drive",
      "Indo-Nepal border experience",
      "Himalayan frontier landscapes",
    ],
    stay: "Dharchula / Gunji Region",
    altitude: null,
    note: "Inner Line Permit (ILP) required. Complete assistance and documentation support provided.",
    image: "/images/adi-kailash-expedition/dharchula-himalayan-frontier-gunji-day2.png",
    imageAlt: "Dharchula Himalayan frontier en route to Gunji, day two of Adi Kailash expedition",
  },
  {
    day: "Day 3",
    title: "Adi Kailash Darshan Expedition",
    subtitle: "Sacred Himalayan Pilgrimage Experience",
    description:
      "Early morning departure toward one of the holiest Himalayan destinations. A deeply sacred day of spiritual immersion, high-altitude landscapes, and mythological heritage.",
    keyDestinations: [
      "Adi Kailash Darshan",
      "Parvati Sarovar",
      "Gauri Kund",
      "Bheem Ki Kheti",
      "Jolingkong Region",
    ],
    experiences: [
      "Spiritual Himalayan immersion",
      "High-altitude sacred lake experience",
      "Rare Himalayan landscapes",
      "Photography opportunities",
      "Mythological storytelling and local culture",
    ],
    stay: "Gunji / Nabi Region",
    altitude: "3,600+ m",
    image: "/images/adi-kailash-expedition/adi-kailash-darshan-expedition-parvati-sarovar-day3.png",
    imageAlt: "Adi Kailash darshan and Parvati Sarovar sacred lake, day three spiritual expedition",
  },
  {
    day: "Day 4",
    title: "Om Parvat & Lipulekh Viewpoint",
    subtitle: "Sacred Symbol Mountain & Kailash View Corridor",
    description:
      "Early morning excursion toward Om Parvat. View the naturally formed sacred ॐ symbol on the snow-covered mountain face. Continue toward Lipulekh Himalayan viewpoint. Weather permitting, distant Himalayan views toward Mount Kailash region. Return journey toward Pithoragarh.",
    experiences: [
      "Om Parvat darshan",
      "Lipulekh Himalayan corridor",
      "High-altitude scenic drive",
      "Sacred Himalayan photography points",
    ],
    stay: "Pithoragarh",
    altitude: "3,600+ m",
    image: "/images/adi-kailash-expedition/om-parvat-lipulekh-viewpoint-sacred-himalaya-day4.png",
    imageAlt: "Om Parvat and Lipulekh viewpoint sacred Himalaya, day four of Adi Kailash expedition",
  },
  {
    day: "Day 5",
    title: "Kumaon Spiritual Temple Circuit",
    subtitle: "Ancient Temples & Himalayan Heritage",
    description:
      "A spiritually immersive journey through Kumaon's revered temple circuit — ancient shrines, sacred forests, and Himalayan cultural heritage.",
    keyDestinations: [
      "Haat Kalika Temple (Optional)",
      "Patal Bhuvaneshwar Cave Temple (Optional)",
      "Jageshwar Dham",
      "Chitai Golu Devta Temple",
      "Kainchi Dham",
    ],
    experiences: [
      "Ancient Himalayan temple architecture",
      "Spiritual forest landscapes",
      "Cave temple exploration",
      "Cultural and mythological heritage",
    ],
    stay: "Bhimtal / Haldwani",
    altitude: null,
    image: "/images/adi-kailash-expedition/kumaon-spiritual-temple-circuit-jageshwar-kainchi-day5.png",
    imageAlt: "Kumaon spiritual temple circuit including Jageshwar and Kainchi Dham, day five",
  },
  {
    day: "Day 6",
    title: "Return to Delhi",
    subtitle: "Completion of the Sacred Himalayan Journey",
    description:
      "Morning departure toward Delhi. Scenic descent through Kumaon hills. Expedition concludes with unforgettable Himalayan memories.",
    experiences: [],
    stay: "Home",
    altitude: null,
    image: null,
    imageAlt: null,
  },
];

const highlights = [
  { icon: "🏔️", title: "Adi Kailash Darshan", desc: "Earthly abode of Lord Shiva, Chhota Kailash" },
  { icon: "🏔️", title: "Om Parvat", desc: "Sacred Om symbol in permanent Himalayan snow" },
  { icon: "💧", title: "Parvati Sarovar", desc: "Meditation at the sacred high-altitude lake" },
  { icon: "🛕", title: "Narayan Ashram", desc: "Spiritual retreat in the remote Himalayan zone" },
  { icon: "🌊", title: "Kali River Corridor", desc: "Cinematic Indo-Nepal border road expedition" },
  { icon: "🏘️", title: "Indo-Tibetan Culture", desc: "Rang community villages and Himalayan traditions" },
];

const inclusions = [
  "Accommodation on twin-sharing basis",
  "Daily breakfast & dinner",
  "All internal road transportation (SUV)",
  "Experienced expedition coordinator",
  "Inner Line Permit assistance",
  "Sightseeing as per itinerary",
  "Basic first-aid support",
  "Emergency vehicle coordination",
];

const exclusions = [
  "Airfare / train tickets to Pithoragarh",
  "Personal expenses",
  "Porter services",
  "Travel insurance (strongly recommended)",
  "Camera or drone permits",
  "Lunches & beverages",
  "Emergency evacuation expenses",
  "GST and applicable taxes",
];

const packing = [
  "Warm thermal clothing (layers)",
  "Waterproof jacket",
  "Gloves & wool cap",
  "Trekking shoes",
  "Sunglasses & high-SPF sunscreen",
  "Personal medication",
  "Portable chargers & power banks",
  "Inner Line Permit documents",
];

const altitudeChart = [
  { place: "Delhi", alt: "216 m" },
  { place: "Pithoragarh", alt: "1,650 m" },
  { place: "Chandak", alt: "2,000 m" },
  { place: "Dharchula", alt: "940 m" },
  { place: "Narayan Ashram", alt: "2,734 m" },
  { place: "Gunji", alt: "3,300 m" },
  { place: "Adi Kailash", alt: "3,600 m" },
  { place: "Nabhidhang (Om Parvat)", alt: "3,600+ m" },
];

const seasons = [
  { period: "May – June", experience: "Best season – clear skies, Adi Kailash approach open" },
  { period: "September – October", experience: "Post-monsoon clarity, excellent photography" },
  { period: "November onwards", experience: "High passes close – expedition not possible" },
];

const travelerTypes = [
  { icon: "🕉️", label: "Spiritual Seekers" },
  { icon: "🏔️", label: "Adventure Travelers" },
  { icon: "💎", label: "Luxury Explorers" },
  { icon: "🌍", label: "International Travelers" },
  { icon: "📸", label: "Photographers" },
  { icon: "🧘", label: "Wellness Travelers" },
  { icon: "🎭", label: "Cultural Explorers" },
];

const routeStops = [
  "Delhi", "Kathgodam / Haldwani", "Pithoragarh", "Dharchula",
  "Tawaghat", "Gunji", "Nabi", "Kuti", "Jolingkong (Adi Kailash)",
  "Om Parvat", "Lipulekh Viewpoint", "Pithoragarh",
  "Kumaon Temple Circuit", "Bhimtal / Haldwani", "Delhi",
];

const pricingTiers = [
  {
    name: "Standard Expedition",
    price: "₹34,999",
    badge: null,
    items: [
      "Standard hotels & guesthouses",
      "Shared SUV transportation",
      "Vegetarian meals during expedition",
      "Permit assistance",
      "Basic expedition support",
      "Sightseeing as per itinerary",
    ],
    ideal: "Budget-conscious spiritual travelers",
    cta: "Book Standard",
  },
  {
    name: "Deluxe Expedition",
    price: "₹44,999",
    badge: null,
    items: [
      "Deluxe hotels & premium homestays",
      "Comfortable SUV transportation",
      "All meals included",
      "Expedition coordinator support",
      "Guided cultural experiences",
      "Bonfire sessions (weather permitting)",
      "Welcome kit",
    ],
    ideal: "Travelers seeking enhanced comfort and curated experiences",
    cta: "Book Deluxe",
  },
  {
    name: "Premium Expedition",
    price: "₹54,999",
    badge: "Most Popular",
    items: [
      "Premium boutique stays",
      "Luxury SUV transportation",
      "Dedicated expedition leader",
      "Premium meals & hospitality",
      "Photography assistance",
      "Oxygen support & altitude care kit",
      "Personalized travel assistance",
      "VIP coordination support",
    ],
    ideal: "Premium travelers, photographers, international guests and spiritual explorers",
    cta: "Book Premium",
  },
];

export default function AdiKailashExpedition() {
  useSEO({
    title: 'Adi Kailash Yatra 2026 | Adi Kailash Temple Tour | Om Parvat Darshan from Delhi',
    description: 'Book Adi Kailash Yatra 2026 from Delhi. Adi Kailash temple darshan with Om Parvat tour. Dharchula to Adi Kailash package with Inner Line Permit included. Adi Kailash opening date 2026 — May to October. Small group departures from Delhi and Pithoragarh.',
    canonical: 'https://www.himalayanserenitytravel.com/packages/adi-kailash-expedition',
  });
  const [tab, setTab] = useState("inclusions");
  const [activeDay, setActiveDay] = useState(0);
  const [waName, setWaName] = useState('');
  const [waPhone, setWaPhone] = useState('');

  const gold = "#c9a96e";
  const bg = "#07090b";
  const card = "#0c1018";
  const text = "#e8e0d4";
  const muted = "#7a7068";
  const accent = "#b5a898";

  const css = `
    /* ── Global ─────────────────────────────────────────── */
    .ak-page { overflow-x: hidden; width: 100%; max-width: 100vw; }
    .ak-page img { max-width: 100%; }

    /* ── Hero ────────────────────────────────────────────── */
    .ak-hero {
      position: relative; min-height: 100vh;
      display: flex; flex-direction: column; justify-content: flex-end;
      padding: 0 0 80px;
      background: linear-gradient(to bottom,rgba(7,9,11,.2) 0%,rgba(7,9,11,.5) 55%,rgba(7,9,11,.97) 100%),
        url('/images/packages/adi-kailash/adi-kailash-nandi.webp') center/cover no-repeat;
    }
    .ak-hero-inner   { max-width: 960px; margin: 0 auto; padding: 0 2rem; }
    .ak-hero-layout  { display: flex; align-items: flex-end; gap: 48px; }
    .ak-hero-text    { flex: 1; min-width: 0; }

    /* ── Stats ───────────────────────────────────────────── */
    .ak-stats-grid {
      max-width: 960px; margin: 0 auto;
      padding: 28px 2rem;
      display: grid; grid-template-columns: repeat(6,1fr); gap: 24px;
    }

    /* ── Page inner ──────────────────────────────────────── */
    .ak-page-inner { max-width: 960px; margin: 0 auto; padding: 4rem 2rem; }

    /* ── Sections ────────────────────────────────────────── */
    .ak-section { padding: 80px 0; }

    /* ── Route map ───────────────────────────────────────── */
    .ak-route-map-wrap { border-radius: 16px; margin-bottom: 32px; }
    .ak-route-img { width: 100%; height: auto; object-fit: contain; display: block; border-radius: 16px; box-shadow: 0 8px 40px rgba(0,0,0,.4); }

    /* ── Itinerary ───────────────────────────────────────── */
    .ak-itinerary-wrap { display: flex; flex-direction: row; gap: 32px; }
    .ak-itinerary-nav {
      display: flex; flex-direction: column;
      width: 160px; flex-shrink: 0; gap: 4px;
    }
    .ak-itinerary-panel { flex: 1; min-width: 0; overflow: visible; }
    .ak-day-panel { background: ${card}; border: 1px solid #ffffff0d; padding: 24px; border-radius: 2px; width: 100%; box-sizing: border-box; }
    .ak-day-layout { display: flex; flex-direction: column; gap: 24px; width: 100%; }
    .ak-day-img-col { width: 100%; }
    .ak-day-img-col img { width: 100%; height: auto; object-fit: contain; display: block; border-radius: 12px; }
    .ak-day-text-col { width: 100%; }
    .ak-day-text-col { flex: 1; min-width: 0; }

    /* ── Inclusions / pricing grids ──────────────────────── */
    .ak-inclusions-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(300px,1fr)); gap: 10px; }
    .ak-pricing-grid    { display: grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap: 20px; }
    .ak-pricing-btn {
      display: block; width: 100%; text-align: center;
      padding: 13px 20px; text-decoration: none;
      font-size: 12px; letter-spacing: .18em; text-transform: uppercase;
      font-family: inherit; transition: all .2s; box-sizing: border-box;
    }

    /* ── CTA ─────────────────────────────────────────────── */
    .ak-cta-section { text-align: center; padding: 72px 32px; }
    .ak-cta-btn {
      display: inline-block; padding: 16px 52px;
      text-decoration: none; font-size: 13px;
      letter-spacing: .2em; text-transform: uppercase;
      font-family: inherit; margin-bottom: 20px;
    }

    /* ── Tablet 768–1023px ───────────────────────────────── */
    @media (min-width:768px) and (max-width:1023px) {
      .ak-stats-grid { grid-template-columns: repeat(3,1fr); padding: 24px 1.5rem; }
      .ak-page-inner { padding: 3rem 1.5rem; }
      .ak-section { padding: 60px 0; }
      .ak-itinerary-nav { width: 130px; }
      .ak-day-panel { padding: 28px; }
      .ak-day-img { height: 360px; }
    }

    /* ── Mobile ≤767px ───────────────────────────────────── */
    @media (max-width:767px) {
      .ak-hero { min-height: auto; padding: 0 0 40px; }
      .ak-hero-inner { padding: 0 1rem; }
      .ak-hero-layout { flex-direction: column; gap: 24px; }
      .ak-stats-grid { grid-template-columns: repeat(2,1fr); padding: 1.5rem 1rem; gap: 16px; }

      .ak-page-inner { padding: 2rem 1rem; }
      .ak-section { padding: 48px 0; }

      .ak-route-map-wrap { border-radius: 12px; }
      .ak-route-img { border-radius: 12px; }
      .ak-route-pill { font-size: .75rem !important; }

      /* Horizontal scrollable tab bar */
      .ak-itinerary-wrap { flex-direction: column; gap: 0; }
      .ak-itinerary-nav {
        flex-direction: row; overflow-x: auto;
        width: 100%; gap: 0; padding-bottom: 4px;
        scrollbar-width: none; margin-bottom: 16px;
        border-bottom: 1px solid #ffffff11;
      }
      .ak-itinerary-nav::-webkit-scrollbar { display: none; }
      .ak-day-btn {
        border-left: none !important;
        border-bottom: 2px solid transparent !important;
        white-space: nowrap; flex-shrink: 0;
        padding: 8px 14px !important;
      }
      .ak-day-btn.is-active {
        border-bottom: 2px solid ${gold} !important;
        border-left: none !important;
      }

      .ak-day-panel { padding: 20px 16px; }
      .ak-day-layout { flex-direction: column; }
      .ak-day-img-col { width: 100%; }

      .ak-inclusions-grid { grid-template-columns: 1fr; }
      .ak-pricing-grid    { grid-template-columns: 1fr; }

      .ak-cta-section { padding: 48px 1rem; }
      .ak-cta-btn { display: block !important; width: 100%; box-sizing: border-box; padding: 16px 20px !important; }
    }
  `;

  return (
    <div className="ak-page" style={{ minHeight: "100vh", background: `linear-gradient(160deg,${bg} 0%,#0a0f18 50%,${bg} 100%)`, color: text, fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
      <style>{css}</style>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <div className="ak-hero">
        <div className="ak-hero-inner">
          <div className="ak-hero-layout">

            {/* Left: title / subtitle */}
            <motion.div className="ak-hero-text" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
                <div style={{ height: 1, width: 40, background: gold, flexShrink: 0 }} />
                <div style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  background: "rgba(0,0,0,0.5)",
                  padding: "6px 16px",
                  borderRadius: 4,
                  border: "1px solid rgba(201,168,76,0.5)",
                }}>
                  Sacred Himalayan Expedition · 6 Days / 5 Nights
                </div>
              </div>
              <h1 style={{ fontSize: "clamp(1.8rem,7vw,5.5rem)", fontWeight: 300, lineHeight: 1.05, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
                Adi Kailash
              </h1>
              <h2 style={{ fontSize: "clamp(1rem,4vw,3.2rem)", fontWeight: 300, fontStyle: "italic", color: gold, margin: "0 0 20px" }}>
                Sacred Himalayan Expedition
              </h2>
              <p style={{ fontSize: "clamp(0.85rem,1.8vw,1.15rem)", color: accent, fontWeight: 300, margin: "0 0 28px", letterSpacing: "0.06em" }}>
                Adi Kailash &nbsp;·&nbsp; Om Parvat &nbsp;·&nbsp; Parvati Sarovar &nbsp;·&nbsp; Narayan Ashram &nbsp;·&nbsp; Dharchula
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
                {["Pilgrimage Travelers", "Spiritual Seekers", "High-Altitude Adventurers"].map(tag => (
                  <div key={tag} style={{ padding: "7px 16px", border: `1px solid ${gold}55`, borderRadius: 2, fontSize: 12, color: gold, letterSpacing: "0.1em" }}>
                    {tag}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display: "inline-block", padding: "6px 16px", background: `${gold}22`, border: `1px solid ${gold}`, borderRadius: 2, marginBottom: 28 }}>
                  <span style={{ fontSize: 13, color: gold, letterSpacing: "0.1em" }}>From ₹34,999 per person</span>
                </div>
              </div>
              <div>
                <a
                  href="#enquiry"
                  style={{ display: "inline-block", padding: "16px 48px", background: gold, color: bg, textDecoration: "none", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "inherit", borderRadius: 2 }}
                >
                  Plan Your Expedition
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── STATS STRIP ──────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid #ffffff0f`, borderBottom: `1px solid #ffffff0f`, background: card }}>
        <div className="ak-stats-grid">
          {[
            { label: "Duration",        value: "6 Days / 5 Nights"   },
            { label: "Max Altitude",    value: "3,600+ m"            },
            { label: "Group Size",      value: "Max 8–10 travelers"  },
            { label: "Fitness Level",   value: "Moderate"            },
            { label: "Permit Required", value: "Inner Line Permit"   },
            { label: "Starting From",   value: "₹34,999 / person"   },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: gold, marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: "clamp(0.78rem,1.5vw,0.95rem)", color: text }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PAGE BODY ─────────────────────────────────────────── */}
      <div className="ak-page-inner">

        {/* EXPEDITION ROUTE */}
        <motion.section className="ak-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 28 }}>Expedition Route</div>
          <div className="ak-route-map-wrap">
            <img
              className="ak-route-img"
              src="/images/adi-kailash-expedition/adi-kailash-expedition-route-map.jpg"
              alt="Himalayan Serenity Travel Adi Kailash Om Parvat 6-day expedition route map"
              loading="eager"
            />
          </div>
          <p style={{ fontSize: "0.8rem", color: "#5a4a30", fontStyle: "italic" }}>
            Route for reference only. Subject to weather, road &amp; permit conditions.
          </p>
        </motion.section>

        {/* SACRED IMPORTANCE */}
        <motion.section className="ak-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 24 }}>The Sacred Journey</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: "clamp(1rem,2.4vw,1.45rem)", lineHeight: 1.85, color: accent, fontWeight: 300, marginBottom: 24 }}>
                Embark on one of the Himalaya's most spiritually significant journeys through the sacred landscapes of Adi Kailash and Om Parvat in the remote Kumaon region of Uttarakhand.
              </p>
              <p style={{ fontSize: "clamp(0.9rem,1.8vw,1.2rem)", lineHeight: 1.85, color: muted, fontWeight: 300, marginBottom: 24 }}>
                Often referred to as the "Chhota Kailash," Adi Kailash is believed to be one of the earthly abodes of Lord Shiva and remains among the most exclusive Himalayan pilgrimage routes in India. Unlike conventional pilgrimage tours, this expedition is designed to balance spirituality, comfort, exploration, and authentic Himalayan storytelling.
              </p>
              <div style={{ padding: "20px 24px", borderLeft: `3px solid ${gold}`, background: `${gold}0a` }}>
                <p style={{ margin: 0, fontSize: "clamp(0.9rem,1.5vw,1.05rem)", color: accent, fontStyle: "italic", lineHeight: 1.7 }}>
                  "One of the most exclusive Himalayan pilgrimage and expedition routes in India – a journey that combines sacred experiences, cinematic mountain roads, and authentic Indo-Tibetan culture."
                </p>
              </div>
            </div>
            <div style={{ height: 400, borderRadius: 12, overflow: "hidden" }}>
              <img
                src="/images/adi-kailash-expedition/om-parvat-sacred-shrine-himalayan-pilgrimage-kumaon.jpg"
                alt="Om Parvat sacred shrine with Himalayan peaks Kumaon pilgrimage"
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 12, display: "block" }}
              />
            </div>
          </div>
        </motion.section>

        {/* BEST SEASON */}
        <motion.section className="ak-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 32 }}>Best Travel Season</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 22px", background: `${gold}18`, border: `1px solid ${gold}55`, borderRadius: 2, marginBottom: 28 }}>
            <span style={{ fontSize: 16 }}>🗓️</span>
            <span style={{ fontSize: 14, color: gold, letterSpacing: "0.1em" }}>Best Season: May to October</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16, marginBottom: 28 }}>
            {seasons.map(s => (
              <div key={s.period} style={{ padding: "24px 20px", background: card, border: `1px solid #ffffff0d`, borderTop: `2px solid ${gold}` }}>
                <div style={{ fontSize: "clamp(0.95rem,1.8vw,1.1rem)", color: text, marginBottom: 10 }}>{s.period}</div>
                <div style={{ fontSize: "clamp(0.8rem,1.5vw,0.85rem)", color: muted, lineHeight: 1.6 }}>{s.experience}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 28, padding: "14px 18px", background: "#12080a", border: `1px solid #ff444422`, borderLeft: `3px solid #ff4444` }}>
            <div style={{ fontSize: "clamp(0.8rem,1.5vw,0.85rem)", color: "#ff8888" }}>⚠️ Important – Route closes November onwards due to snowfall and permit restrictions. Plan your expedition between May and October only.</div>
          </div>
        </motion.section>

        {/* ITINERARY */}
        <motion.section className="ak-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 32 }}>Day by Day Itinerary</div>

          <div className="ak-itinerary-wrap">
            {/* LEFT / TOP: day tabs */}
            <div className="ak-itinerary-nav">
              {itinerary.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={`ak-day-btn${activeDay === i ? " is-active" : ""}`}
                  style={{
                    background: "none", border: "none", cursor: "pointer", textAlign: "left",
                    padding: "10px 16px",
                    borderLeft: activeDay === i ? `2px solid ${gold}` : "2px solid #ffffff11",
                    color: activeDay === i ? gold : "#5a5048",
                    fontSize: "clamp(0.75rem,1.5vw,0.85rem)", letterSpacing: "0.08em",
                    transition: "all 0.2s", fontFamily: "inherit",
                  }}
                >
                  {item.day}
                </button>
              ))}
            </div>

            {/* RIGHT / BELOW: content panel */}
            <div className="ak-itinerary-panel">
              <motion.div key={activeDay} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="ak-day-panel">
                <div className="ak-day-layout">
                  {itinerary[activeDay].image && (
                    <div className="ak-day-img-col">
                      <img
                        src={itinerary[activeDay].image}
                        alt={itinerary[activeDay].imageAlt}
                        loading="lazy"
                        style={{ width: "100%", height: "auto", objectFit: "contain", borderRadius: 12, display: "block" }}
                      />
                    </div>
                  )}
                  <div className="ak-day-text-col">
                    <div style={{ fontSize: "clamp(0.8rem,2vw,1rem)", letterSpacing: "0.2em", color: gold, textTransform: "uppercase", marginBottom: 6 }}>
                      {itinerary[activeDay].day}
                    </div>
                    <h3 style={{ fontSize: "clamp(1.4rem,4vw,2.2rem)", fontWeight: 300, margin: "0 0 4px", color: text }}>
                      {itinerary[activeDay].title}
                    </h3>
                    <div style={{ fontSize: "clamp(0.85rem,2vw,1.1rem)", color: muted, letterSpacing: "0.08em", marginBottom: 20 }}>
                      {itinerary[activeDay].subtitle}
                    </div>
                    {itinerary[activeDay].altitude && (
                      <div style={{ display: "inline-block", padding: "3px 10px", background: `${gold}15`, border: `1px solid ${gold}33`, borderRadius: 2, fontSize: 11, color: gold, letterSpacing: "0.1em", marginBottom: 16 }}>
                        ⛰️ {itinerary[activeDay].altitude}
                      </div>
                    )}
                    <p style={{ fontSize: "clamp(0.9rem,1.5vw,1rem)", lineHeight: 1.85, color: accent, marginBottom: 20, fontWeight: 300 }}>
                      {itinerary[activeDay].description}
                    </p>
                    {itinerary[activeDay].keyDestinations && (
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: gold, textTransform: "uppercase", marginBottom: 10 }}>Key Destinations</div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                          {itinerary[activeDay].keyDestinations.map(dest => (
                            <div key={dest} style={{ padding: "4px 12px", background: `${gold}12`, border: `1px solid ${gold}44`, borderRadius: 2, fontSize: "clamp(0.75rem,1.5vw,0.8rem)", color: gold, letterSpacing: "0.04em" }}>
                              {dest}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {itinerary[activeDay].experiences && itinerary[activeDay].experiences.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                        {itinerary[activeDay].experiences.map(exp => (
                          <div key={exp} style={{ padding: "5px 12px", border: `1px solid ${gold}33`, borderRadius: 2, fontSize: "clamp(0.75rem,1.5vw,0.8rem)", color: accent, letterSpacing: "0.05em" }}>{exp}</div>
                        ))}
                      </div>
                    )}
                    {itinerary[activeDay].note && (
                      <div style={{ padding: "10px 14px", background: "#1a1208", borderLeft: `2px solid ${gold}`, fontSize: "clamp(0.8rem,1.5vw,0.85rem)", color: gold, marginBottom: 12 }}>
                        ⚠️ {itinerary[activeDay].note}
                      </div>
                    )}
                    {itinerary[activeDay].stay && (
                      <div style={{ marginTop: 16, padding: "12px 16px", background: `${gold}0a`, border: `1px solid ${gold}22`, fontSize: "clamp(0.8rem,1.5vw,0.85rem)", color: gold, letterSpacing: "0.1em" }}>
                        🏨 Overnight: {itinerary[activeDay].stay}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* PACKAGE DETAILS */}
        <motion.section className="ak-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 32 }}>Package Details</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
            {["inclusions", "exclusions", "packing"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: tab === t ? gold : "transparent", border: `1px solid ${gold}55`,
                color: tab === t ? bg : gold, padding: "8px 20px", cursor: "pointer",
                fontSize: "clamp(0.75rem,1.5vw,0.8rem)", letterSpacing: "0.12em", textTransform: "uppercase",
                fontFamily: "inherit", transition: "all 0.2s", borderRadius: 2,
              }}>{t}</button>
            ))}
          </div>
          <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {(tab === "inclusions" || tab === "packing") && (
              <div className="ak-inclusions-grid">
                {(tab === "inclusions" ? inclusions : packing).map(item => (
                  <div key={item} style={{ display: "flex", gap: 12, padding: "14px 16px", background: card, border: `1px solid #ffffff09` }}>
                    <span style={{ color: gold, marginTop: 2, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: "clamp(0.85rem,2vw,0.9rem)", color: accent, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === "exclusions" && (
              <div className="ak-inclusions-grid">
                {exclusions.map(item => (
                  <div key={item} style={{ display: "flex", gap: 12, padding: "14px 16px", background: card, border: `1px solid #ffffff09` }}>
                    <span style={{ color: muted, marginTop: 2, flexShrink: 0 }}>✗</span>
                    <span style={{ fontSize: "clamp(0.85rem,2vw,0.9rem)", color: muted, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.section>

        {/* PRICING */}
        <motion.section className="ak-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 10 }}>Choose Your Expedition</div>
          <p style={{ fontSize: "clamp(0.8rem,1.5vw,0.9rem)", color: muted, marginBottom: 36, letterSpacing: "0.06em" }}>All packages depart from Delhi</p>
          <div className="ak-pricing-grid">
            {pricingTiers.map((tier) => (
              <div key={tier.name} style={{
                background: card,
                border: tier.badge ? `1px solid ${gold}` : `1px solid #ffffff0d`,
                borderTop: `3px solid ${tier.badge ? gold : gold + "44"}`,
                padding: "32px 28px", position: "relative",
                boxShadow: tier.badge ? `0 0 40px ${gold}18` : "none",
              }}>
                {tier.badge && (
                  <div style={{ position: "absolute", top: -1, right: 20, background: gold, color: bg, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", padding: "4px 12px", fontFamily: "inherit" }}>
                    {tier.badge}
                  </div>
                )}
                <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: muted, marginBottom: 8 }}>{tier.name}</div>
                <div style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)", fontWeight: 300, color: gold, marginBottom: 4, lineHeight: 1 }}>{tier.price}</div>
                <div style={{ fontSize: 11, color: muted, letterSpacing: "0.08em", marginBottom: 28 }}>per person</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  {tier.items.map(item => (
                    <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: gold, fontSize: 13, marginTop: 1, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: "clamp(0.8rem,1.5vw,0.85rem)", color: accent, lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "10px 14px", background: `${gold}0a`, borderLeft: `2px solid ${gold}44`, marginBottom: 24 }}>
                  <div style={{ fontSize: 10, color: muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>Ideal For</div>
                  <div style={{ fontSize: "clamp(0.8rem,1.5vw,0.85rem)", color: accent, lineHeight: 1.5 }}>{tier.ideal}</div>
                </div>
                <a href="/contact#consultation" className="ak-pricing-btn" style={{ background: tier.badge ? gold : "transparent", border: `1px solid ${gold}`, color: tier.badge ? bg : gold }}>
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ALTITUDE PROFILE */}
        <motion.section className="ak-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 32 }}>Altitude Profile</div>
          {(() => {
            const altNums = [216, 1650, 2000, 940, 2734, 3300, 3600, 3600];
            const maxAlt = 3600;
            return altitudeChart.map((a, i) => (
              <div key={a.place} style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
                <span style={{ width: 180, fontSize: "clamp(0.8rem,1.5vw,0.9rem)", color: accent, textAlign: "right", flexShrink: 0 }}>{a.place}</span>
                <div style={{ flex: 1, background: "#ffffff08", borderRadius: 2, height: 8 }}>
                  <div style={{ width: `${(altNums[i] / maxAlt) * 100}%`, height: "100%", background: gold, borderRadius: 2 }} />
                </div>
                <span style={{ width: 90, fontSize: "clamp(0.78rem,1.5vw,0.85rem)", color: gold, letterSpacing: "0.05em", flexShrink: 0 }}>{a.alt}</span>
              </div>
            ));
          })()}
        </motion.section>

        {/* TRAVEL ACCESS */}
        <motion.section className="ak-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 32 }}>Travel Access Information</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {[
              { icon: "🚂", label: "Nearest Railway Station", value: "Kathgodam" },
              { icon: "✈️", label: "Nearest Airport", value: "Pithoragarh Airport (Naini Saini Airport)" },
              { icon: "🛕", label: "Optional Spiritual Stops", value: "Haat Kalika Temple · Patal Bhuvaneshwar Cave Temple" },
            ].map(item => (
              <div key={item.label} style={{ padding: "24px", background: card, border: `1px solid #ffffff0d`, borderTop: `2px solid ${gold}44`, display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ fontSize: 26, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: gold, marginBottom: 8 }}>{item.label}</div>
                  <div style={{ fontSize: "clamp(0.85rem,1.5vw,0.95rem)", color: text, lineHeight: 1.6 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SAFETY */}
        <motion.section className="ak-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 32 }}>Expedition Safety</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
            {["Local mountain coordinators", "Permit support teams", "Basic medical assistance", "Emergency vehicle coordination", "Experienced Himalayan drivers", "Travel insurance strongly recommended"].map(item => (
              <div key={item} style={{ padding: "18px 20px", background: card, border: `1px solid #ffffff09`, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: gold, fontSize: 16, flexShrink: 0 }}>🛡️</span>
                <span style={{ fontSize: "clamp(0.8rem,1.5vw,0.85rem)", color: accent, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section className="ak-section ak-cta-section" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          style={{ background: card, border: `1px solid ${gold}22`, borderTop: `1px solid ${gold}`, marginBottom: 0 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: gold, marginBottom: 20 }}>Begin Your Sacred Journey</div>
          <h2 style={{ fontSize: "clamp(1.6rem,5vw,3.2rem)", fontWeight: 300, margin: "0 0 12px", color: text }}>Adi Kailash Awaits</h2>
          <p style={{ fontSize: "clamp(0.9rem,1.8vw,1.1rem)", color: muted, margin: "0 auto 16px", maxWidth: 480 }}>
            One of India's most exclusive Himalayan expeditions.
          </p>
          <div style={{ fontSize: "clamp(1.1rem,3vw,1.4rem)", color: gold, margin: "0 auto 8px", letterSpacing: "0.05em" }}>
            From ₹34,999 per person
          </div>
          <div style={{ fontSize: 12, color: muted, margin: "0 auto 36px", letterSpacing: "0.06em" }}>
            Standard · Deluxe · Premium
          </div>
          <a href="/contact#consultation" className="ak-cta-btn" style={{ background: gold, color: bg }}>
            Enquire Now
          </a>
          <div style={{ fontSize: 12, color: "#3a3028", letterSpacing: "0.08em" }}>
            Limited seasonal departures · Inner Line Permit included · Max 8–10 travelers
          </div>
        </motion.section>

      </div>

      {/* ── ENQUIRY FORM ──────────────────────────────── */}
      <section id="enquiry" style={{ background: "#0a0a0a", padding: "80px 24px", borderTop: "1px solid rgba(201,169,110,0.15)" }}>
        <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 16 }}>
            Begin Your Journey
          </div>
          <h2 style={{ fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: 300, color: gold, margin: "0 0 16px", lineHeight: 1.2 }}>
            Ready to Begin Your Sacred Himalayan Journey?
          </h2>
          <p style={{ fontSize: "1rem", color: muted, marginBottom: 36, lineHeight: 1.7 }}>
            Join hundreds of pilgrims who have experienced the divine darshan of Adi Kailash &amp; Om Parvat
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
            <input
              type="text"
              placeholder="Your name"
              value={waName}
              onChange={e => setWaName(e.target.value)}
              style={{ background: "#111", border: "1px solid rgba(201,169,110,0.2)", borderRadius: 4, padding: "14px 18px", color: text, fontSize: 14, fontFamily: "inherit", outline: "none" }}
            />
            <input
              type="tel"
              placeholder="WhatsApp number (with country code)"
              value={waPhone}
              onChange={e => setWaPhone(e.target.value)}
              style={{ background: "#111", border: "1px solid rgba(201,169,110,0.2)", borderRadius: 4, padding: "14px 18px", color: text, fontSize: 14, fontFamily: "inherit", outline: "none" }}
            />
            <button
              onClick={() => {
                const msg = encodeURIComponent(`Hi, I'm ${waName || 'interested in'} the Adi Kailash & Om Parvat Expedition. My WhatsApp: ${waPhone}`);
                window.open(`https://wa.me/919084642557?text=${msg}`, '_blank');
              }}
              style={{ background: gold, color: bg, border: "none", borderRadius: 4, padding: "18px", fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase", fontFamily: "inherit", cursor: "pointer", width: "100%" }}
            >
              Start Planning on WhatsApp
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
