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
    image: "/images/darma-valley-womens-retreat/scenic-mountain-highway-kumaon-river.jpg",
    imageAlt: "Scenic mountain highway Kumaon river drive to Pithoragarh",
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
    image: "/images/darma-valley-womens-retreat/naini-saini-airport-pithoragarh-uttarakhand.jpg",
    imageAlt: "Naini Saini Airport Pithoragarh gateway to Adi Kailash",
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
    image: "/images/adi-kailash-nandi-bull-sacred-peak-uttarakhand.jpg",
    imageAlt: "Adi Kailash sacred peak Nandi bull Uttarakhand darshan",
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
    image: "/images/om-parvat-view-himalayan-horses-pithoragarh.jpg",
    imageAlt: "Om Parvat sacred mountain view Pithoragarh Himalaya",
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
    image: "/images/darma-valley-womens-retreat/darma-valley-dugtu-village-uttarakhand.jpg",
    imageAlt: "Kumaon village temple circuit Uttarakhand Himalaya",
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
    price: "₹29,999",
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
  });
  const [tab, setTab] = useState("inclusions");
  const [activeDay, setActiveDay] = useState(0);

  const gold = "#c9a96e";
  const bg = "#07090b";
  const card = "#0c1018";
  const text = "#e8e0d4";
  const muted = "#7a7068";
  const accent = "#b5a898";

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${bg} 0%, #0a0f18 50%, ${bg} 100%)`, color: text, fontFamily: "'Cormorant Garamond', Georgia, serif", overflowX: "hidden" }}>


      {/* HERO */}
      <div style={{
        position: "relative", minHeight: "95vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 0 80px 0",
        background: "linear-gradient(to bottom, rgba(7,9,11,0.2) 0%, rgba(7,9,11,0.5) 55%, rgba(7,9,11,0.97) 100%), url('/images/packages/adi-kailash/adi-kailash-nandi.jpg') center/cover no-repeat",
      }}>
        <div className="hero-inner" style={{ maxWidth: 960, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
              <div style={{ height: 1, width: 40, background: gold }} />
              <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: gold }}>
                Sacred Himalayan Expedition · 6 Days / 5 Nights
              </div>
            </div>
            <h1 style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 300, lineHeight: 1.05, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
              Adi Kailash
            </h1>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 300, fontStyle: "italic", color: gold, margin: "0 0 20px" }}>
              Sacred Himalayan Expedition
            </h2>
            <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", color: accent, fontWeight: 300, margin: "0 0 36px", letterSpacing: "0.06em" }}>
              Adi Kailash &nbsp;·&nbsp; Om Parvat &nbsp;·&nbsp; Parvati Sarovar &nbsp;·&nbsp; Narayan Ashram &nbsp;·&nbsp; Dharchula
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              {["Pilgrimage Travelers", "Spiritual Seekers", "High-Altitude Adventurers"].map(tag => (
                <div key={tag} style={{ padding: "8px 18px", border: `1px solid ${gold}55`, borderRadius: 2, fontSize: 12, color: gold, letterSpacing: "0.1em" }}>
                  {tag}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <div style={{ display: "inline-block", padding: "6px 16px", background: `${gold}22`, border: `1px solid ${gold}`, borderRadius: 2 }}>
                <span style={{ fontSize: 13, color: gold, letterSpacing: "0.1em" }}>From ₹29,999 per person</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* STATS STRIP */}
      <div style={{ borderTop: `1px solid #ffffff0f`, borderBottom: `1px solid #ffffff0f`, background: card }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24 }}>
          {[
            { label: "Duration", value: "6 Days / 5 Nights" },
            { label: "Max Altitude", value: "3,600+ m" },
            { label: "Group Size", value: "Max 8–10 travelers" },
            { label: "Fitness Level", value: "Moderate" },
            { label: "Permit Required", value: "Inner Line Permit" },
            { label: "Starting From", value: "₹29,999 / person" },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: gold, marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 15, color: text }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="page-inner" style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* EXPEDITION ROUTE */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 28 }}>Expedition Route</div>

          {/* Hero scenic image */}
          <div style={{ borderRadius: "16px", overflow: "hidden", marginBottom: 32 }}>
            <img
              src="/images/adi-kailash-expedition-route-map-6-day-pithoragarh.jpg"
              alt="Adi Kailash Expedition complete route map Delhi to Om Parvat"
              loading="eager"
              style={{
                width: "100%",
                height: "380px",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                borderRadius: "16px",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
              }}
            />
          </div>

          {/* Journey stops strip */}
          <div style={{ padding: "28px 32px", background: card, border: `1px solid #ffffff0a`, borderRadius: 12, marginBottom: 16 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.2em", color: gold, textTransform: "uppercase", marginBottom: 20 }}>Complete Journey Path</div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0 }}>
              {routeStops.map((stop, i) => (
                <span key={stop + i} style={{ display: "flex", alignItems: "center" }}>
                  <span style={{
                    padding: "5px 12px",
                    background: i === 0 || i === routeStops.length - 1 ? `${gold}22` : "transparent",
                    border: `1px solid ${i === 0 || i === routeStops.length - 1 ? gold + "55" : gold + "22"}`,
                    borderRadius: 2,
                    fontSize: 12,
                    color: i === 0 || i === routeStops.length - 1 ? gold : accent,
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                  }}>
                    {stop}
                  </span>
                  {i < routeStops.length - 1 && (
                    <span style={{ color: `${gold}66`, fontSize: 11, padding: "0 4px", flexShrink: 0 }}>→</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <p style={{ fontSize: "0.8rem", color: "#5a4a30", fontStyle: "italic" }}>
            Route for reference only. Subject to weather, road &amp; permit conditions. Itinerary may be adjusted as required.
          </p>
        </motion.section>

        {/* SACRED IMPORTANCE */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 24 }}>The Sacred Journey</div>
          <p style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.45rem)", lineHeight: 1.85, color: accent, fontWeight: 300, maxWidth: 760, marginBottom: 24 }}>
            Embark on one of the Himalaya's most spiritually significant journeys through the sacred landscapes of Adi Kailash and Om Parvat in the remote Kumaon region of Uttarakhand.
          </p>
          <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", lineHeight: 1.85, color: muted, fontWeight: 300, maxWidth: 720, marginBottom: 24 }}>
            Often referred to as the "Chhota Kailash," Adi Kailash is believed to be one of the earthly abodes of Lord Shiva and remains among the most exclusive Himalayan pilgrimage routes in India. Unlike conventional pilgrimage tours, this expedition is designed to balance spirituality, comfort, exploration, and authentic Himalayan storytelling.
          </p>
          <div style={{ padding: "20px 28px", borderLeft: `3px solid ${gold}`, background: `${gold}0a`, maxWidth: 640 }}>
            <p style={{ margin: 0, fontSize: "1.05rem", color: accent, fontStyle: "italic", lineHeight: 1.7 }}>
              "One of the most exclusive Himalayan pilgrimage and expedition routes in India – a journey that combines sacred experiences, cinematic mountain roads, and authentic Indo-Tibetan culture."
            </p>
          </div>
        </motion.section>

        {/* BEST SEASON & TRAVELER TYPES */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 32 }}>Best Travel Season</div>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "10px 22px", background: `${gold}18`, border: `1px solid ${gold}55`, borderRadius: 2, marginBottom: 28 }}>
            <span style={{ fontSize: 16 }}>🗓️</span>
            <span style={{ fontSize: 14, color: gold, letterSpacing: "0.1em" }}>Best Season: May to October</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 28 }}>
            {seasons.map(s => (
              <div key={s.period} style={{ padding: "28px 24px", background: card, border: `1px solid #ffffff0d`, borderTop: `2px solid ${gold}` }}>
                <div style={{ fontSize: "1.1rem", color: text, marginBottom: 10 }}>{s.period}</div>
                <div style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{s.experience}</div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 32, padding: "16px 20px", background: "#12080a", border: `1px solid #ff444422`, borderLeft: `3px solid #ff4444` }}>
            <div style={{ fontSize: 13, color: "#ff8888" }}>⚠️ Important – Route closes November onwards due to snowfall and permit restrictions. Plan your expedition between May and October only.</div>
          </div>

          <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: gold, marginBottom: 16 }}>Recommended For</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {travelerTypes.map(t => (
              <div key={t.label} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 18px", background: card,
                border: `1px solid ${gold}33`, borderRadius: 2,
                fontSize: 13, color: accent,
              }}>
                <span style={{ fontSize: 16 }}>{t.icon}</span>
                <span>{t.label}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ITINERARY */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 40 }}>Day by Day Itinerary</div>

          <div className="resp-itinerary" style={{ gap: 32 }}>

            {/* LEFT: day navigation tabs */}
            <div className="resp-itinerary-nav" style={{ gap: 4 }}>
              {itinerary.map((item, i) => (
                <button key={i} onClick={() => setActiveDay(i)} style={{
                  background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "10px 16px",
                  borderLeft: activeDay === i ? `2px solid ${gold}` : "2px solid #ffffff11",
                  color: activeDay === i ? gold : "#5a5048",
                  fontSize: 13, letterSpacing: "0.08em", transition: "all 0.2s", fontFamily: "inherit",
                }}>
                  {item.day}
                </button>
              ))}
            </div>

            {/* RIGHT: selected day content panel */}
            <div style={{ flex: 1, minWidth: 280 }}>
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                style={{ background: card, border: "1px solid #ffffff0d", padding: "36px", borderRadius: 2 }}
              >
                {/* Day image — shown above title when available */}
                {itinerary[activeDay].image && (
                  <img
                    src={itinerary[activeDay].image}
                    alt={itinerary[activeDay].imageAlt}
                    loading="lazy"
                    style={{ width: "100%", height: 380, objectFit: "cover", borderRadius: 16, marginBottom: 32 }}
                  />
                )}

                {/* Day header */}
                <div style={{ fontSize: 11, letterSpacing: "0.2em", color: gold, textTransform: "uppercase", marginBottom: 6 }}>
                  {itinerary[activeDay].day}
                </div>
                <h3 style={{ fontSize: "1.7rem", fontWeight: 300, margin: "0 0 4px", color: text }}>
                  {itinerary[activeDay].title}
                </h3>
                <div style={{ fontSize: 13, color: muted, letterSpacing: "0.08em", marginBottom: 20 }}>
                  {itinerary[activeDay].subtitle}
                </div>

                {itinerary[activeDay].altitude && (
                  <div style={{ display: "inline-block", padding: "3px 10px", background: `${gold}15`, border: `1px solid ${gold}33`, borderRadius: 2, fontSize: 11, color: gold, letterSpacing: "0.1em", marginBottom: 16 }}>
                    ⛰️ {itinerary[activeDay].altitude}
                  </div>
                )}

                <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: accent, marginBottom: 20, fontWeight: 300 }}>
                  {itinerary[activeDay].description}
                </p>

                {itinerary[activeDay].keyDestinations && (
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 10, letterSpacing: "0.2em", color: gold, textTransform: "uppercase", marginBottom: 10 }}>Key Destinations</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {itinerary[activeDay].keyDestinations.map(dest => (
                        <div key={dest} style={{ padding: "4px 12px", background: `${gold}12`, border: `1px solid ${gold}44`, borderRadius: 2, fontSize: 12, color: gold, letterSpacing: "0.04em" }}>
                          {dest}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {itinerary[activeDay].experiences && itinerary[activeDay].experiences.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                    {itinerary[activeDay].experiences.map(exp => (
                      <div key={exp} style={{ padding: "5px 12px", border: `1px solid ${gold}33`, borderRadius: 2, fontSize: 12, color: accent, letterSpacing: "0.05em" }}>{exp}</div>
                    ))}
                  </div>
                )}

                {itinerary[activeDay].note && (
                  <div style={{ padding: "10px 14px", background: "#1a1208", borderLeft: `2px solid ${gold}`, fontSize: 13, color: gold, marginBottom: 12 }}>
                    ⚠️ {itinerary[activeDay].note}
                  </div>
                )}

                {itinerary[activeDay].stay && (
                  <div style={{ marginTop: 12, fontSize: 12, color: gold, letterSpacing: "0.1em" }}>
                    🏨 Overnight: {itinerary[activeDay].stay}
                  </div>
                )}
              </motion.div>
            </div>

          </div>
        </motion.section>

        {/* INCLUSIONS */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 32 }}>Package Details</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
            {["inclusions", "exclusions", "packing"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: tab === t ? gold : "transparent", border: `1px solid ${gold}55`,
                color: tab === t ? bg : gold, padding: "8px 20px", cursor: "pointer",
                fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
                fontFamily: "inherit", transition: "all 0.2s", borderRadius: 2,
              }}>{t}</button>
            ))}
          </div>
          <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {tab === "inclusions" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 10 }}>
                {inclusions.map(item => (
                  <div key={item} style={{ display: "flex", gap: 12, padding: "14px 16px", background: card, border: `1px solid #ffffff09` }}>
                    <span style={{ color: gold, marginTop: 2 }}>✓</span>
                    <span style={{ fontSize: 14, color: accent, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === "exclusions" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 10 }}>
                {exclusions.map(item => (
                  <div key={item} style={{ display: "flex", gap: 12, padding: "14px 16px", background: card, border: `1px solid #ffffff09` }}>
                    <span style={{ color: muted, marginTop: 2 }}>✗</span>
                    <span style={{ fontSize: 14, color: muted, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === "packing" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10 }}>
                {packing.map(item => (
                  <div key={item} style={{ display: "flex", gap: 12, padding: "14px 16px", background: card, border: `1px solid #ffffff09` }}>
                    <span style={{ color: gold, marginTop: 2 }}>✓</span>
                    <span style={{ fontSize: 14, color: accent, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.section>

        {/* PRICING TIERS */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 10 }}>Choose Your Expedition</div>
          <p style={{ fontSize: 14, color: muted, marginBottom: 36, letterSpacing: "0.06em" }}>All packages depart from Delhi</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {pricingTiers.map((tier) => (
              <div key={tier.name} style={{
                background: card,
                border: tier.badge ? `1px solid ${gold}` : `1px solid #ffffff0d`,
                borderTop: `3px solid ${tier.badge ? gold : gold + "44"}`,
                padding: "32px 28px",
                position: "relative",
                boxShadow: tier.badge ? `0 0 40px ${gold}18` : "none",
              }}>
                {tier.badge && (
                  <div style={{
                    position: "absolute", top: -1, right: 20,
                    background: gold, color: bg,
                    fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
                    padding: "4px 12px", fontFamily: "inherit",
                  }}>
                    {tier.badge}
                  </div>
                )}
                <div style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: muted, marginBottom: 8 }}>{tier.name}</div>
                <div style={{ fontSize: "2.2rem", fontWeight: 300, color: gold, marginBottom: 4, lineHeight: 1 }}>{tier.price}</div>
                <div style={{ fontSize: 11, color: muted, letterSpacing: "0.08em", marginBottom: 28 }}>per person</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                  {tier.items.map(item => (
                    <div key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <span style={{ color: gold, fontSize: 13, marginTop: 1, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: 13, color: accent, lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div style={{ padding: "10px 14px", background: `${gold}0a`, borderLeft: `2px solid ${gold}44`, marginBottom: 24 }}>
                  <div style={{ fontSize: 10, color: muted, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 4 }}>Ideal For</div>
                  <div style={{ fontSize: 12, color: accent, lineHeight: 1.5 }}>{tier.ideal}</div>
                </div>
                <a href="/contact#consultation" style={{
                  display: "block", textAlign: "center",
                  padding: "13px 20px",
                  background: tier.badge ? gold : "transparent",
                  border: `1px solid ${gold}`,
                  color: tier.badge ? bg : gold,
                  textDecoration: "none",
                  fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase",
                  fontFamily: "inherit", transition: "all 0.2s",
                }}>
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ALTITUDE */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 32 }}>Altitude Profile</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {altitudeChart.map((a, i) => (
              <div key={a.place} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", background: i % 2 === 0 ? card : "transparent", borderBottom: "1px solid #ffffff08" }}>
                <span style={{ fontSize: 15, color: accent }}>{a.place}</span>
                <span style={{ fontSize: 13, color: gold, letterSpacing: "0.06em" }}>{a.alt}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* TRAVEL ACCESS INFORMATION */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 32 }}>Travel Access Information</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {[
              { icon: "🚂", label: "Nearest Railway Station", value: "Kathgodam" },
              { icon: "✈️", label: "Nearest Airport", value: "Pithoragarh Airport (Naini Saini Airport)" },
              { icon: "🛕", label: "Optional Spiritual Stops", value: "Haat Kalika Temple · Patal Bhuvaneshwar Cave Temple" },
            ].map(item => (
              <div key={item.label} style={{
                padding: "24px", background: card,
                border: `1px solid #ffffff0d`, borderTop: `2px solid ${gold}44`,
                display: "flex", gap: 16, alignItems: "flex-start",
              }}>
                <div style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: gold, marginBottom: 8 }}>{item.label}</div>
                  <div style={{ fontSize: 15, color: text, lineHeight: 1.6 }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* SAFETY */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 32 }}>Expedition Safety</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {["Local mountain coordinators", "Permit support teams", "Basic medical assistance", "Emergency vehicle coordination", "Experienced Himalayan drivers", "Travel insurance strongly recommended"].map(item => (
              <div key={item} style={{ padding: "18px 20px", background: card, border: `1px solid #ffffff09`, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: gold, fontSize: 16 }}>🛡️</span>
                <span style={{ fontSize: 13, color: accent, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          style={{ textAlign: "center", padding: "72px 32px", background: card, border: `1px solid ${gold}22`, borderTop: `1px solid ${gold}` }}>
          <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: gold, marginBottom: 20 }}>Begin Your Sacred Journey</div>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 300, margin: "0 0 12px", color: text }}>Adi Kailash Awaits</h2>
          <p style={{ fontSize: "1.1rem", color: muted, margin: "0 auto 16px", maxWidth: 480 }}>
            One of India's most exclusive Himalayan expeditions.
          </p>
          <div style={{ fontSize: "1.4rem", color: gold, margin: "0 auto 8px", letterSpacing: "0.05em" }}>
            From ₹29,999 per person
          </div>
          <div style={{ fontSize: 12, color: muted, margin: "0 auto 36px", letterSpacing: "0.06em" }}>
            Standard · Deluxe · Premium
          </div>
          <a href="/contact#consultation" style={{
            display: "inline-block", padding: "16px 52px", background: gold, color: bg,
            textDecoration: "none", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
            fontFamily: "inherit", marginBottom: 20,
          }}>
            Enquire Now
          </a>
          <div style={{ fontSize: 12, color: "#3a3028", letterSpacing: "0.08em" }}>
            Limited seasonal departures · Inner Line Permit included · Max 8–10 travelers
          </div>
        </motion.section>

      </div>
    </div>
  );
}
