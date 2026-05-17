import { useState } from "react";
import { useSEO } from '../hooks/useSEO';
import { motion } from "framer-motion";

const BASE = "/images/himalayan-photography-expedition/";

const imgStyle = (h) => ({
  width: "100%",
  height: h,
  objectFit: "cover",
  objectPosition: "center",
  display: "block",
  transition: "transform 0.4s ease",
});

const itinerary = [
  {
    day: "Day 1",
    title: "Arrival in Abbott Mount",
    subtitle: "Fog, Forests & Colonial Atmosphere",
    description: "The expedition begins in the atmospheric fog forests of Abbott Mount – moody Himalayan storytelling, colonial architecture, and cinematic road compositions. Blue-hour photography followed by bonfire storytelling beneath pine forests.",
    experiences: ["Atmospheric forest imagery", "Fog photography", "Colonial architecture", "Cinematic road compositions", "Blue-hour photography", "Bonfire storytelling"],
    stay: "Abbott Mount",
    focus: "📷 Atmospheric & Moody",
    dayImages: [
      { src: BASE + "abbott-mount-colonial-church-forest-uttarakhand.jpg", alt: "Abbott Mount colonial church in pine forest Uttarakhand" },
      { src: BASE + "abbott-mount-pine-forest-fog-photography.jpg", alt: "Abbott Mount pine forest fog photography morning" },
    ],
    imageHeight: 200,
    imageLayout: "two",
  },
  {
    day: "Day 2",
    title: "Abbott Mount → Pithoragarh",
    subtitle: "Cinematic Ridge Landscapes",
    description: "A cinematic ridge-road drive toward Pithoragarh with dramatic Soar Valley landscapes, sunset photography at Chandak viewpoint, and mountain village compositions along the way.",
    experiences: ["Ridge-road cinematography", "Soar Valley landscapes", "Sunset photography at Chandak", "Mountain village imagery"],
    stay: "Pithoragarh",
    focus: "📷 Ridge & Valley",
    dayImages: [
      { src: BASE + "pithoragarh-sunset-valley-view-kumaon.jpg", alt: "Pithoragarh sunset valley view Kumaon Himalayas" },
    ],
    imageHeight: 220,
    imageLayout: "one",
  },
  {
    day: "Day 3",
    title: "Pithoragarh → Munsiyari",
    subtitle: "Panchachuli First Light",
    description: "The most dramatic drive of the expedition – waterfall photography, mountain-road visuals, and the first reveal of the Panchachuli massif through the windshield as you ascend toward Munsiyari.",
    experiences: ["Waterfall photography", "Mountain-road visuals", "Panchachuli reveal shots", "Telephoto Himalayan compositions"],
    stay: "Munsiyari",
    focus: "📷 Waterfalls & Peaks",
    dayImages: [
      { src: BASE + "panchachuli-peak-sunrise-pink-munsiyari.jpg", alt: "Panchachuli peak sunrise pink glow Munsiyari" },
      { src: BASE + "birthi-falls-waterfall-munsiyari-kumaon.jpg", alt: "Birthi Falls waterfall Munsiyari Kumaon" },
    ],
    imageHeight: 200,
    imageLayout: "two",
  },
  {
    day: "Day 4",
    title: "Panchachuli Landscape Session",
    subtitle: "Sunrise & Astrophotography",
    description: "The crown jewel of the expedition. Pre-dawn positioning for Panchachuli sunrise, long-exposure mountain imagery, and after dark – Milky Way astrophotography sessions with cinematic nighttime storytelling. Optional discussions on framing, composition, and editing.",
    experiences: ["Sunrise landscape photography", "Long-exposure mountain imagery", "Astrophotography", "Milky Way sessions", "Framing & composition guidance", "Editing discussions"],
    stay: "Munsiyari",
    focus: "📷 Sunrise & Milky Way",
    dayImages: [
      { src: BASE + "milky-way-galaxy-himalayan-night-sky-tent.jpg", alt: "Milky Way galaxy over Himalayan night sky with tent camp" },
      { src: BASE + "astrophotography-milky-way-himalayan-silhouette.jpg", alt: "Astrophotography Milky Way with Himalayan mountain silhouette" },
      { src: BASE + "milky-way-night-sky-darma-valley-kumaon.jpg", alt: "Milky Way night sky over Darma Valley Kumaon" },
    ],
    imageHeight: 240,
    imageLayout: "three",
  },
  {
    day: "Day 5",
    title: "Munsiyari → Darma Valley",
    subtitle: "Hidden Himalayan Landscapes",
    description: "A slow expedition into the remote Darma Valley – river compositions, hidden valley landscapes, and documentary-style village imagery through one of Eastern Kumaon's most visually rich corridors.",
    experiences: ["Remote valley landscapes", "River compositions", "Himalayan village storytelling", "Documentary-style imagery"],
    stay: "Darma Valley Homestay / Retreat Camp",
    focus: "📷 Documentary & Landscape",
    dayImages: [
      { src: BASE + "remote-himalayan-village-prayer-flags-kumaon.jpg", alt: "Remote Himalayan village with prayer flags Kumaon" },
      { src: BASE + "darma-valley-landscape-eastern-kumaon.jpg", alt: "Darma Valley landscape Eastern Kumaon Himalayas" },
    ],
    imageHeight: 200,
    imageLayout: "two",
  },
  {
    day: "Day 6",
    title: "Culture & Portrait Photography",
    subtitle: "Stories of the Himalaya",
    description: "A full day of visual anthropology – portrait photography, traditional lifestyles, local food and culture documentation, and evening bonfire discussions on visual storytelling, travel narratives, and expedition filmmaking.",
    experiences: ["Portrait photography", "Traditional lifestyles", "Local food & culture", "Documentary storytelling", "Visual anthropology", "Bonfire storytelling discussions"],
    stay: "Darma Valley",
    focus: "📷 Portrait & Culture",
    dayImages: [
      { src: BASE + "himalayan-photography-expedition-group-kumaon.jpg", alt: "Himalayan Photography Expedition group in Kumaon" },
    ],
    imageHeight: 220,
    imageLayout: "one",
  },
  {
    day: "Day 7",
    title: "Cinematic Road Expedition",
    subtitle: "Return Through Eastern Kumaon",
    description: "A cinematic return through Eastern Kumaon – road-trip cinematography, drone landscapes where permitted, and golden-hour road visuals as the Himalaya slowly descends toward the plains.",
    experiences: ["Road-trip cinematography", "Drone landscapes", "Golden-hour road visuals", "Slow Himalayan travel imagery"],
    stay: "Pithoragarh",
    focus: "📷 Golden Hour & Roads",
    dayImages: [
      { src: BASE + "photographer-capturing-himalayan-landscape-snow.jpg", alt: "Photographer capturing Himalayan landscape in snow" },
    ],
    imageHeight: 220,
    imageLayout: "one",
  },
  {
    day: "Day 8",
    title: "Farewell to the Himalaya",
    subtitle: "Final Shots & Departure",
    description: "A final lakeside photography stop, farewell brunch, and closing storytelling session before departure according to the selected arrival experience.",
    experiences: ["Lakeside photography stop", "Farewell brunch", "Final storytelling session", "Flexible departure options"],
    stay: "Overnight journey to Delhi",
    focus: "📷 Final Frame",
    dayImages: [
      { src: BASE + "bhimtal-lake-morning-mist-kumaon.jpg", alt: "Bhimtal lake morning mist Kumaon hills" },
    ],
    imageHeight: 220,
    imageLayout: "one",
  },
  {
    day: "Day 9",
    title: "Arrival in Delhi",
    subtitle: "Expedition Concludes",
    description: "Return to Delhi with a visual archive of one of India's most cinematic Himalayan regions – stories, landscapes, and frames that no mainstream tour could ever provide.",
    experiences: [],
    stay: null,
    focus: null,
    dayImages: [],
    imageHeight: 0,
    imageLayout: null,
  },
];

const highlights = [
  { icon: "🌄", title: "Panchachuli Sunrise", desc: "Pre-dawn positioning for the most dramatic Himalayan sunrise photography" },
  { icon: "🌌", title: "Milky Way Sessions", desc: "High-altitude astrophotography away from all light pollution" },
  { icon: "🌫️", title: "Abbott Mount Fog", desc: "Atmospheric misty forest landscapes and colonial architecture" },
  { icon: "🏡", title: "Darma Valley Storytelling", desc: "Portrait and documentary photography in remote Himalayan villages" },
  { icon: "🛣️", title: "Road-Trip Cinematography", desc: "Eastern Kumaon's most cinematic mountain roads and ridge drives" },
  { icon: "🦅", title: "Drone Landscapes", desc: "Aerial photography in drone-friendly Himalayan zones" },
];

const arrivalOptions = [
  {
    icon: "✈️",
    title: "Premium Flight",
    route: "Delhi → Naini Saini Airport",
    bestFor: "Professionals, luxury travelers, international guests",
    benefit: "Minimal road fatigue, fastest access",
  },
  {
    icon: "🚂",
    title: "Train + Curated Transfer",
    route: "Delhi → Kathgodam → Expedition Route",
    bestFor: "Solo photographers, slow-travel creators",
    benefit: "Scenic transition, immersive pacing",
    recommended: true,
  },
  {
    icon: "🚗",
    title: "Private SUV Expedition",
    route: "Delhi → Eastern Kumaon direct",
    bestFor: "Filmmakers, heavy gear transport, private groups",
    benefit: "Maximum flexibility, customized departure",
  },
];

const gear = [
  "DSLR / Mirrorless camera",
  "Wide-angle lens",
  "Telephoto lens",
  "Tripod (essential)",
  "Drone (where permitted)",
  "ND filters",
  "Extra batteries & storage",
  "Laptop for backup / editing",
];

const inclusions = [
  "Accommodation on twin-sharing basis",
  "Daily breakfast & dinner",
  "All internal transportation",
  "Expedition coordination",
  "Photography-oriented itinerary pacing",
  "Bonfire storytelling evenings",
  "Local cultural interaction experiences",
  "Sunrise & astrophotography sessions",
];

const exclusions = [
  "Flight / train tickets",
  "Photography equipment",
  "Drone permits",
  "Editing software / workshops",
  "Lunches & beverages",
  "Personal expenses",
  "Travel insurance (strongly recommended)",
  "GST and applicable taxes",
];

const seasons = [
  { period: "October – November", experience: "Peak photography season – crystal clear skies, golden autumn light" },
  { period: "March – May", experience: "Spring clarity, Panchachuli snow cover, wildflowers in valley" },
  { period: "December – February", experience: "Winter mist, dramatic fog forests, rare cold-light photography" },
];

const galleryImages = [
  { src: BASE + "panchachuli-sunrise-photography-munsiyari-dawn.jpg", alt: "Panchachuli sunrise photography Munsiyari dawn golden light", span: 2, h: 340 },
  { src: BASE + "kumaon-hills-terraced-fields-aerial-view.jpg", alt: "Kumaon hills terraced fields aerial view Eastern Himalayas", span: 1, h: 340 },
  { src: BASE + "abbott-mount-pine-forest-fog-photography.jpg", alt: "Abbott Mount pine forest fog photography morning mist", span: 1, h: 280 },
  { src: BASE + "remote-himalayan-village-prayer-flags-kumaon.jpg", alt: "Remote Himalayan village with colorful prayer flags Kumaon", span: 1, h: 280 },
  { src: BASE + "birthi-falls-waterfall-munsiyari-kumaon.jpg", alt: "Birthi Falls waterfall cascading Munsiyari Kumaon", span: 1, h: 280 },
  { src: BASE + "panchachuli-peak-sunrise-pink-munsiyari.jpg", alt: "Panchachuli peak bathed in pink sunrise light Munsiyari", span: 3, h: 320 },
];

function DayImages({ day }) {
  if (!day.dayImages || day.dayImages.length === 0) return null;

  const gridClass = day.imageLayout === "three" ? "resp-grid-3"
                  : day.imageLayout === "two"   ? "resp-grid-2"
                  : "";

  return (
    <div className={gridClass} style={{ marginTop: 24, gap: 12 }}>
      {day.dayImages.map((img, i) => (
        <div key={i} style={{ overflow: "hidden", borderRadius: 12 }}>
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            style={imgStyle(day.imageHeight)}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
          />
        </div>
      ))}
    </div>
  );
}

export default function PhotographyExpedition() {
  useSEO({
    title: 'Himalayan Photography Tour 2026 | Om Parvat Photo Trip from Delhi & Pithoragarh',
    description: '9-day Himalayan photography tour from Delhi and Pithoragarh. Om Parvat, Panchachuli sunrise, Milky Way astrophotography, Darma Valley near Dharchula. Best Kumaon photo tour 2026.',
  });
  const [activeDay, setActiveDay] = useState(0);
  const [tab, setTab] = useState("inclusions");

  const amber = "#c4a45a";
  const bg = "#09080a";
  const card = "#100f12";
  const text = "#ede8e0";
  const muted = "#6a6058";
  const accent = "#c0b8a8";

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${bg} 0%, #120f14 50%, ${bg} 100%)`, color: text, fontFamily: "'Cormorant Garamond', Georgia, serif", overflowX: "hidden" }}>

      {/* HERO */}
      <div style={{ position: "relative", minHeight: "95vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 0 80px 0" }}>
        {/* Hero background image */}
        <img
          src={BASE + "panchachuli-mountain-golden-sunrise-kumaon.jpg"}
          alt="Panchachuli mountain golden sunrise Kumaon Himalayas"
          loading="eager"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0 }}
        />
        {/* Dark gradient overlay */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(9,8,10,0.2) 0%, rgba(9,8,10,0.55) 55%, rgba(9,8,10,0.97) 100%)", zIndex: 1 }} />
        {/* Content */}
        <div className="hero-inner" style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
              <div style={{ height: 1, width: 40, background: amber }} />
              <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: amber }}>
                Premium Photography Expedition · 8 Nights / 9 Days
              </div>
            </div>
            <h1 style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", fontWeight: 300, lineHeight: 1.05, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
              Himalayan
            </h1>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", fontWeight: 300, fontStyle: "italic", color: amber, margin: "0 0 20px" }}>
              Photography Expedition
            </h2>
            <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", color: accent, fontWeight: 300, margin: "0 0 36px", letterSpacing: "0.06em" }}>
              Panchachuli &nbsp;·&nbsp; Munsiyari &nbsp;·&nbsp; Darma Valley &nbsp;·&nbsp; Abbott Mount
            </p>
            <p style={{ fontSize: 13, color: muted, margin: "0 0 36px", letterSpacing: "0.1em" }}>
              Cinematic Landscapes &nbsp;·&nbsp; Astro Photography &nbsp;·&nbsp; Himalayan Storytelling
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["Photographers", "Filmmakers", "Visual Storytellers", "Creators"].map(tag => (
                <div key={tag} style={{ padding: "8px 18px", border: `1px solid ${amber}55`, borderRadius: 2, fontSize: 12, color: amber, letterSpacing: "0.1em" }}>
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ borderTop: "1px solid #ffffff0f", borderBottom: "1px solid #ffffff0f", background: card }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24 }}>
          {[
            { label: "Duration", value: "8 Nights / 9 Days" },
            { label: "Max Altitude", value: "2,200+ m" },
            { label: "Group Size", value: "Max 6 photographers" },
            { label: "Pace", value: "Cinematic & Slow" },
            { label: "Astrophotography", value: "Included" },
            { label: "Pricing", value: "On Request" },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: amber, marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 15, color: text }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="page-inner" style={{ maxWidth: 960, margin: "0 auto" }}>

        {/* OVERVIEW */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: amber, marginBottom: 24 }}>The Expedition</div>
          <p style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.45rem)", lineHeight: 1.85, color: accent, fontWeight: 300, maxWidth: 760, marginBottom: 24 }}>
            A carefully curated cinematic journey through the remote landscapes of Eastern Kumaon, designed for photographers, filmmakers, creators, and visual storytellers seeking immersive Himalayan experiences beyond conventional tourism.
          </p>
          <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", lineHeight: 1.85, color: muted, fontWeight: 300, maxWidth: 720, marginBottom: 28 }}>
            Unlike standard sightseeing tours, this expedition is intentionally paced around light, atmosphere, storytelling, and visual immersion – with travel timings planned to maximize sunrise access, sunset light, atmospheric conditions, and creative freedom.
          </p>
          <div style={{ padding: "20px 28px", borderLeft: `3px solid ${amber}`, background: `${amber}0a`, maxWidth: 640, marginBottom: 40 }}>
            <p style={{ margin: 0, fontSize: "1.05rem", color: accent, fontStyle: "italic", lineHeight: 1.7 }}>
              "Every frame tells a story. Every road reveals a landscape. Every village holds a portrait waiting to be made."
            </p>
          </div>

          {/* Overview 2-image pair */}
          <div className="resp-grid-2" style={{ gap: 16 }}>
            {[
              { src: BASE + "darma-valley-landscape-eastern-kumaon.jpg", alt: "Darma Valley sweeping landscape Eastern Kumaon Himalayas" },
              { src: BASE + "kumaon-hills-terraced-fields-aerial-view.jpg", alt: "Kumaon hills terraced fields aerial view Uttarakhand" },
            ].map((img, i) => (
              <div key={i} style={{ overflow: "hidden", borderRadius: 16 }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  style={imgStyle(320)}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* HIGHLIGHTS */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: amber, marginBottom: 36 }}>Signature Photography Experiences</div>

          {/* Photography in Action images */}
          <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: muted, marginBottom: 12 }}>Photography in Action</div>
          <div className="resp-grid-3" style={{ gap: 12, marginBottom: 36 }}>
            {[
              { src: BASE + "camera-tripod-golden-hour-himalayan-mountains.jpg", alt: "Camera on tripod golden hour Himalayan mountains" },
              { src: BASE + "photographer-camera-himalayan-valley-kumaon.jpg", alt: "Photographer with camera in Himalayan valley Kumaon" },
              { src: BASE + "photographer-shooting-himalayan-peaks-kumaon.jpg", alt: "Photographer shooting Himalayan peaks Kumaon" },
            ].map((img, i) => (
              <div key={i} style={{ overflow: "hidden", borderRadius: 14 }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  style={imgStyle(260)}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {highlights.map(h => (
              <div key={h.title} style={{ padding: "24px", background: card, border: "1px solid #ffffff0a", borderTop: `2px solid ${amber}44` }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{h.icon}</div>
                <div style={{ fontSize: "1.05rem", color: text, marginBottom: 8 }}>{h.title}</div>
                <div style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{h.desc}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ARRIVAL OPTIONS */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: amber, marginBottom: 36 }}>Arrival Options</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {arrivalOptions.map(a => (
              <div key={a.title} style={{ padding: "28px 24px", background: card, border: a.recommended ? `1px solid ${amber}55` : "1px solid #ffffff0a", position: "relative" }}>
                {a.recommended && (
                  <div style={{ position: "absolute", top: -1, right: 20, background: amber, color: bg, fontSize: 10, letterSpacing: "0.15em", padding: "3px 10px", textTransform: "uppercase" }}>
                    Recommended
                  </div>
                )}
                <div style={{ fontSize: 28, marginBottom: 12 }}>{a.icon}</div>
                <div style={{ fontSize: "1.1rem", color: text, marginBottom: 8 }}>{a.title}</div>
                <div style={{ fontSize: 12, color: amber, marginBottom: 12, letterSpacing: "0.05em" }}>{a.route}</div>
                <div style={{ fontSize: 13, color: muted, lineHeight: 1.6, marginBottom: 8 }}>Best for: {a.bestFor}</div>
                <div style={{ fontSize: 12, color: accent, fontStyle: "italic" }}>{a.benefit}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ITINERARY */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: amber, marginBottom: 40 }}>Day by Day Expedition</div>
          <div className="resp-itinerary" style={{ gap: 32 }}>
            <div className="resp-itinerary-nav" style={{ gap: 4 }}>
              {itinerary.map((item, i) => (
                <button key={i} onClick={() => setActiveDay(i)} style={{
                  background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "10px 16px",
                  borderLeft: activeDay === i ? `2px solid ${amber}` : "2px solid #ffffff11",
                  color: activeDay === i ? amber : "#6a5838",
                  fontSize: 13, letterSpacing: "0.08em", transition: "all 0.2s", fontFamily: "inherit",
                }}>
                  {item.day}
                </button>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <motion.div key={activeDay} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                style={{ background: card, border: "1px solid #ffffff0d", padding: "36px", borderRadius: 2 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.2em", color: amber, textTransform: "uppercase", marginBottom: 6 }}>{itinerary[activeDay].day}</div>
                <h3 style={{ fontSize: "1.7rem", fontWeight: 300, margin: "0 0 4px", color: text }}>{itinerary[activeDay].title}</h3>
                <div style={{ fontSize: 13, color: muted, letterSpacing: "0.08em", marginBottom: 16 }}>{itinerary[activeDay].subtitle}</div>
                {itinerary[activeDay].focus && (
                  <div style={{ display: "inline-block", padding: "3px 12px", background: `${amber}15`, border: `1px solid ${amber}33`, borderRadius: 2, fontSize: 12, color: amber, marginBottom: 16 }}>
                    {itinerary[activeDay].focus}
                  </div>
                )}
                <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: accent, marginBottom: 24, fontWeight: 300 }}>{itinerary[activeDay].description}</p>
                {itinerary[activeDay].experiences.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {itinerary[activeDay].experiences.map(exp => (
                      <div key={exp} style={{ padding: "5px 12px", border: `1px solid ${amber}33`, borderRadius: 2, fontSize: 12, color: accent, letterSpacing: "0.05em" }}>{exp}</div>
                    ))}
                  </div>
                )}
                {itinerary[activeDay].stay && (
                  <div style={{ marginTop: 16, fontSize: 12, color: amber, letterSpacing: "0.1em" }}>🏨 Overnight: {itinerary[activeDay].stay}</div>
                )}
                {/* Day images — only shown for the active day */}
                <DayImages day={itinerary[activeDay]} />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* INCLUSIONS / EXCLUSIONS / GEAR */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: amber, marginBottom: 32 }}>Expedition Details</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
            {["inclusions", "exclusions", "gear"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: tab === t ? amber : "transparent", border: `1px solid ${amber}55`,
                color: tab === t ? bg : amber, padding: "8px 20px", cursor: "pointer",
                fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase",
                fontFamily: "inherit", transition: "all 0.2s", borderRadius: 2,
              }}>{t}</button>
            ))}
          </div>
          <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {tab === "inclusions" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 10 }}>
                {inclusions.map(item => (
                  <div key={item} style={{ display: "flex", gap: 12, padding: "14px 16px", background: card, border: "1px solid #ffffff09" }}>
                    <span style={{ color: amber, marginTop: 2 }}>✓</span>
                    <span style={{ fontSize: 14, color: accent, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === "exclusions" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 10 }}>
                {exclusions.map(item => (
                  <div key={item} style={{ display: "flex", gap: 12, padding: "14px 16px", background: card, border: "1px solid #ffffff09" }}>
                    <span style={{ color: muted, marginTop: 2 }}>✗</span>
                    <span style={{ fontSize: 14, color: muted, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === "gear" && (
              <>
                {/* Gear photographer images */}
                <div className="resp-grid-3" style={{ gap: 12, marginBottom: 24 }}>
                  {[
                    { src: BASE + "photographer-snow-landscape-himalayan-expedition.jpg", alt: "Photographer in snow landscape Himalayan expedition" },
                    { src: BASE + "photographer-capturing-himalayan-landscape-snow.jpg", alt: "Photographer capturing Himalayan landscape in snow" },
                    { src: BASE + "photographer-camera-himalayan-valley-kumaon.jpg", alt: "Photographer with camera in Himalayan valley Kumaon" },
                  ].map((img, i) => (
                    <div key={i} style={{ overflow: "hidden", borderRadius: 14 }}>
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        style={imgStyle(240)}
                        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10 }}>
                  {gear.map(item => (
                    <div key={item} style={{ display: "flex", gap: 12, padding: "14px 16px", background: card, border: "1px solid #ffffff09" }}>
                      <span style={{ color: amber, marginTop: 2 }}>✓</span>
                      <span style={{ fontSize: 14, color: accent, lineHeight: 1.5 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </motion.section>

        {/* BEST SEASON */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: amber, marginBottom: 32 }}>Best Photography Season</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {seasons.map(s => (
              <div key={s.period} style={{ padding: "28px 24px", background: card, border: "1px solid #ffffff0d", borderTop: `2px solid ${amber}` }}>
                <div style={{ fontSize: "1.1rem", color: text, marginBottom: 10 }}>{s.period}</div>
                <div style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{s.experience}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* EXPEDITION GALLERY */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: amber, marginBottom: 12 }}>Expedition Gallery</div>
          <h3 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 300, color: text, margin: "0 0 32px" }}>Frames from the Field</h3>
          <div className="resp-grid-3" style={{ gap: 12 }}>
            {galleryImages.map((img, i) => (
              <div key={i} style={{ gridColumn: `span ${img.span}`, overflow: "hidden", borderRadius: 14 }}>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  style={imgStyle(img.h)}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          style={{ textAlign: "center", padding: "72px 32px", background: card, border: `1px solid ${amber}22`, borderTop: `1px solid ${amber}` }}>
          <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: amber, marginBottom: 20 }}>Join the Expedition</div>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 300, margin: "0 0 16px", color: text }}>Every Frame Tells a Story</h2>
          <p style={{ fontSize: "1.1rem", color: muted, margin: "0 auto 40px", maxWidth: 520 }}>
            Maximum 6 photographers per departure. Cinematic pacing. Creative freedom.
          </p>
          <a href="/contact#consultation" style={{
            display: "inline-block", padding: "16px 52px", background: amber, color: bg,
            textDecoration: "none", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
            fontFamily: "inherit", marginBottom: 20,
          }}>
            Enquire Now
          </a>
          <div style={{ fontSize: 12, color: "#3a3020", letterSpacing: "0.08em" }}>
            Pricing on request · Small group departures · Photography-oriented pacing
          </div>
        </motion.section>

      </div>
    </div>
  );
}
