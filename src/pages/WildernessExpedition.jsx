import { useState } from "react";
import { useSEO } from '../hooks/useSEO';
import { motion } from "framer-motion";
import ExpeditionForm from '../components/ExpeditionForm';

const itinerary = [
  {
    day: "Day 0",
    title: "Overnight Departure from Delhi",
    subtitle: "Delhi → Kumaon Himalaya",
    description:
      "Depart from Delhi NCR between 9:00 PM – 11:00 PM. The Eastern Himalaya is a long journey from the plains – and that distance is part of what makes it sacred.",
    experiences: ["Private SUV transfer", "Optional overnight train to the foothills"],
    stay: null,
  },
  {
    day: "Day 1",
    title: "Arrival in Lohaghat",
    subtitle: "Colonial Kumaon & Himalayan Forests",
    description:
      "As evening fog settles across the pine forests of Abbott Mount, guests experience the atmospheric colonial ridge known for its mysterious folklore, abandoned heritage architecture, and hauntingly quiet Himalayan ambience – followed by an intimate bonfire under the mountain night sky.",
    experiences: ["Scenic Himalayan drive", "Forest landscapes and pine ridges", "Sunset at Abbott Mount", "Slow nature walks", "Traditional Kumaoni dinner"],
    stay: "Lohaghat",
  },
  {
    day: "Day 2",
    title: "Lohaghat Exploration",
    subtitle: "Sacred Forests & Hidden Lakes",
    description:
      "A full day of forest immersion. Visit the serene Mayawati Ashram established under Swami Vivekananda's inspiration, photograph the emerald Kolidhek Lake, and trek to the mythological Banasur Fort ruins.",
    experiences: ["Morning visit to Mayawati Ashram", "Forest photography", "Kolidhek Lake excursion", "Guided Banasur Fort trek"],
    stay: "Lohaghat",
    difficulty: "Easy to Moderate",
  },
  {
    day: "Day 3",
    title: "Lohaghat → Pithoragarh",
    subtitle: "Entering Eastern Kumaon",
    description:
      "Drive through Gangolihat toward the mountain capital of Eastern Kumaon. An optional stop at the subterranean wonder of Patal Bhuvaneshwar – a cave temple of extraordinary mythological depth – before the golden-hour sunset at Chandak.",
    experiences: ["Gangolihat exploration", "Patal Bhuvaneshwar Cave visit (optional)", "Scenic ridge drives", "Chandak viewpoint sunset over Soar Valley"],
    stay: "Pithoragarh",
  },
  {
    day: "Day 4",
    title: "Pithoragarh → Munsiyari",
    subtitle: "Panchachuli Himalayan Approach",
    description:
      "The most dramatic drive of the expedition – ascending toward Munsiyari along mountain highways past Birthi Falls, with the five-peaked Panchachuli massif gradually dominating the horizon. Arrive in time for the evening golden hour.",
    experiences: ["Birthi Falls stop", "Panchachuli mountain views", "Himalayan ridge roads", "Traditional mountain villages", "Arrival golden-hour at Munsiyari"],
    stay: "Munsiyari",
  },
  {
    day: "Day 5",
    title: "Himalayan Birdwatching Expedition",
    subtitle: "Munsiyari Forest Belt",
    description:
      "Early mornings in Munsiyari's forests are among the most rewarding birdwatching experiences in the Indian Himalaya. The window between 5:00 AM and 9:00 AM in the Darkot and Kalamuni zones offers sightings that dedicated birders plan months for.",
    experiences: [
      "Early morning birding (5:00–9:00 AM)",
      "Darkot forest trails",
      "Kalamuni ridge",
      "Betulidhar region",
      "Afternoon village exploration",
      "Local weaving culture",
      "Photography walks",
    ],
    stay: "Munsiyari",
    birdNote: "Peak species: Himalayan Monal, Khalij Pheasant, Rufous Sibia, Himalayan Griffon",
  },
  {
    day: "Day 6",
    title: "Khaliya Top Trek",
    subtitle: "Alpine Meadows & Himalayan Panoramas",
    description:
      "The crown of this expedition. An early-morning ascent to Khaliya Top at 3,500+ metres – a vast alpine meadow with unobstructed 360° views of Nanda Devi, Panchachuli, and the Milam glacier range. On clear days, this view is life-changing.",
    experiences: ["Early departure 6:00 AM", "Alpine meadow traverse", "Snow peak panoramas including Nanda Devi", "Cloud-bed landscapes", "Optional Himalayan camping experience"],
    stay: "Munsiyari / Alpine Camp",
    difficulty: "Moderate",
  },
  {
    day: "Day 7",
    title: "Milam Trail & Askot Wildlife Region",
    subtitle: "Ancient Himalayan Trade Route",
    description:
      "Walk a section of the Milam glacier trail – an ancient trade route connecting Tibet and Kumaon, once used by Bhotiya merchants. Descend into the Askot wildlife sanctuary, one of Eastern Kumaon's most biologically rich zones.",
    experiences: ["Introductory Milam glacier trail section", "Traditional Johari villages", "Askot forest landscapes", "Wildlife and bird photography opportunities"],
    stay: "Askot / Didihat Region",
  },
  {
    day: "Day 8",
    title: "Didihat → Almora → Kathgodam",
    subtitle: "Scenic Return Through Kumaon",
    description:
      "The final descent from the high Himalaya – ridge viewpoints at Didihat, a cultural pause in Almora for local handicrafts and mountain café culture, before the foothills return you to the world you left behind.",
    experiences: ["Didihat ridge viewpoints", "Almora cultural stop", "Local café and handicrafts", "Scenic descent toward the foothills"],
    stay: "Overnight journey to Delhi",
  },
  {
    day: "Day 9",
    title: "Arrival in Delhi",
    subtitle: "Tour Concludes",
    description: "Return to Delhi NCR with memories of the Himalaya that no mainstream package can replicate.",
    experiences: [],
    stay: null,
  },
];

const birds = [
  { species: "Himalayan Monal", season: "March – May", icon: "🦜" },
  { species: "Khalij Pheasant", season: "Year-round", icon: "🦜" },
  { species: "Rufous Sibia", season: "Spring & Autumn", icon: "🦜" },
  { species: "Himalayan Griffon", season: "Winter & Spring", icon: "🦅" },
  { species: "Laughing Thrush", season: "Spring", icon: "🦜" },
  { species: "Sunbirds", season: "Summer", icon: "🦜" },
  { species: "Himalayan Woodpecker", season: "Year-round", icon: "🦜" },
  { species: "Snow Pigeon", season: "Winter", icon: "🕊️" },
];

const inclusions = [
  "Accommodation on twin-sharing basis",
  "Daily breakfast & dinner",
  "All internal transportation (private SUV)",
  "Experienced local mountain guide",
  "Guided trekking support throughout",
  "Birdwatching assistance",
  "Bonfire experiences (weather permitting)",
  "Sightseeing as per itinerary",
];

const exclusions = [
  "Airfare / train tickets",
  "Travel insurance (strongly recommended)",
  "Personal expenses",
  "Camera or drone permits",
  "Entry fees to protected areas",
  "Porter charges",
  "Lunches & beverages",
  "GST and applicable taxes",
];

const addOns = [
  { label: "Professional birding guide", icon: "🦜" },
  { label: "Wildlife photography support", icon: "📷" },
  { label: "Drone cinematography", icon: "🎬" },
  { label: "Luxury alpine camping upgrade", icon: "⛺" },
  { label: "Adi Kailash extension", icon: "🏔️" },
];

const seasons = [
  { period: "March – May", experience: "Peak birdwatching season – Himalayan Monal at its most active" },
  { period: "September – November", experience: "Crystal-clear mountain visibility for trekking and photography" },
  { period: "December – February", experience: "Snow landscapes and rare winter birding species" },
];

const altitudes = [
  { place: "Delhi", alt: "216 m" },
  { place: "Lohaghat", alt: "1,745 m" },
  { place: "Abbott Mount", alt: "1,981 m" },
  { place: "Pithoragarh", alt: "1,650 m" },
  { place: "Munsiyari", alt: "2,200 m" },
  { place: "Khaliya Top", alt: "3,500+ m" },
  { place: "Askot Wildlife Region", alt: "1,100–2,000 m" },
];

export default function WildernessExpedition() {
  useSEO({
    title: 'Kumaon Wilderness Tour 2026 | Eastern Kumaon Travel Package from Delhi',
    description: 'Eastern Kumaon wilderness tour from Delhi and Pithoragarh. Remote Kumaon villages near Dharchula, ancient forests and Himalayan landscapes. Authentic slow travel package 2026.',
  });
  const [activeDay, setActiveDay] = useState(0);
  const [tab, setTab] = useState("inclusions");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #080c0a 0%, #0a150e 50%, #070a08 100%)",
        color: "#e0e8e2",
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        overflowX: "hidden",
      }}
    >
      {/* HERO */}
      <div
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 0 80px 0",
          background:
            "linear-gradient(to bottom, rgba(7,10,8,0.25) 0%, rgba(7,10,8,0.55) 55%, rgba(7,10,8,0.97) 100%), url('/images/packages/panchachuli-sunrise.webp') center/cover no-repeat",
        }}
      >
        <div className="hero-inner" style={{ maxWidth: 900, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            <div
              style={{
                display: "inline-block",
                letterSpacing: "0.25em",
                fontSize: 11,
                textTransform: "uppercase",
                color: "#7dbf8e",
                borderBottom: "1px solid #7dbf8e44",
                paddingBottom: 8,
                marginBottom: 24,
              }}
            >
              Trekking & Wilderness Expedition · 8 Nights / 9 Days
            </div>
            <h1
              style={{
                fontSize: "clamp(2.6rem, 6vw, 5rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                margin: "0 0 12px 0",
                letterSpacing: "-0.01em",
              }}
            >
              Eastern Kumaon
              <br />
              <span style={{ color: "#7dbf8e", fontStyle: "italic" }}>Wilderness Expedition</span>
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "#8da898",
                fontWeight: 300,
                margin: "16px 0 36px",
                letterSpacing: "0.04em",
              }}
            >
              Munsiyari &nbsp;·&nbsp; Khaliya Top &nbsp;·&nbsp; Milam Trail &nbsp;·&nbsp; Askot &nbsp;·&nbsp; Pithoragarh &nbsp;·&nbsp; Lohaghat
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[
                { label: "Trekkers", icon: "🥾" },
                { label: "Birdwatchers", icon: "🐦" },
                { label: "Wildlife Photographers", icon: "📸" },
              ].map((tag) => (
                <div
                  key={tag.label}
                  style={{
                    padding: "8px 18px",
                    border: "1px solid #7dbf8e55",
                    borderRadius: 2,
                    fontSize: 13,
                    color: "#7dbf8e",
                    letterSpacing: "0.1em",
                  }}
                >
                  {tag.icon} {tag.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* OVERVIEW STRIP */}
      <div style={{ borderTop: "1px solid #ffffff11", borderBottom: "1px solid #ffffff11", background: "#0a130d" }}>
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "28px 32px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 24,
          }}
        >
          {[
            { label: "Duration", value: "8 Nights / 9 Days" },
            { label: "Starts", value: "Delhi NCR" },
            { label: "Ends", value: "Delhi NCR" },
            { label: "Group Size", value: "Max 8–10 travelers" },
            { label: "Fitness Level", value: "Moderate" },
            { label: "Max Altitude", value: "3,500+ m (Khaliya Top)" },
          ].map((item) => (
            <div key={item.label}>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7dbf8e", marginBottom: 6 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 16, color: "#e0e8e2" }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="page-inner" style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* OVERVIEW */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ marginBottom: 80 }}
        >
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#7dbf8e", marginBottom: 20 }}>
            The Expedition
          </div>
          <p style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)", lineHeight: 1.85, color: "#a8c0ae", fontWeight: 300, maxWidth: 760 }}>
            Experience the untouched wilderness of Eastern Kumaon through a meticulously designed trekking and
            birdwatching expedition across some of the Himalaya's most scenic yet least-visited regions. Alpine meadow
            treks, Himalayan birding at world-class sites, ancient glacier trails, and the Panchachuli sunrise – this
            journey is for those who know what the mountains are really for.
          </p>
          <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", lineHeight: 1.85, color: "#6a8070", fontWeight: 300, marginTop: 20, maxWidth: 720 }}>
            Unlike mainstream Uttarakhand packages, this expedition prioritizes biodiversity-rich forest zones,
            low-density tourism routes, and immersive village experiences over commercial sightseeing. Every day is
            built around what nature offers – not what the calendar demands.
          </p>
        </motion.section>

        {/* GALLERY */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ marginBottom: 80 }}
        >
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#7dbf8e", marginBottom: 32 }}>
            Journey Highlights
          </div>
          <div className="resp-grid-3" style={{ gap: 8 }}>
            {[
              { src: "/images/packages/abbott-mount.webp",   caption: "Abbott Mount, Lohaghat",         span: "2" },
              { src: "/images/packages/banasur-fort.webp",   caption: "Banasur Fort Ruins",             span: false },
              { src: "/images/packages/birthi-falls.webp",   caption: "Birthi Falls, Munsiyari Road",   span: false },
              { src: "/images/packages/khaliya-meadow.webp", caption: "Khaliya Top Alpine Meadow",      span: false },
              { src: "/images/packages/askot-wildlife.webp",  caption: "Himalayan Wildflower Valley",    span: false },
              { src: "/images/packages/askot-deer.webp",     caption: "Askot Wildlife Sanctuary",       span: false },
              { src: "/images/packages/himalayan-view.webp", caption: "Milam Glacier Trail",            span: "2" },
            ].map((photo) => (
              <div
                key={photo.src}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: 280,
                  gridColumn: photo.span ? `span ${photo.span}` : undefined,
                  cursor: "pointer",
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    transition: "transform 0.6s ease",
                    display: "block",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.07)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "linear-gradient(to top, rgba(7,10,8,0.9) 0%, rgba(7,10,8,0.3) 60%, transparent 100%)",
                    padding: "28px 16px 14px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: "#e0e8e2",
                      letterSpacing: "0.08em",
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                    }}
                  >
                    {photo.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ITINERARY */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ marginBottom: 80 }}
        >
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#7dbf8e", marginBottom: 40 }}>
            Day by Day Itinerary
          </div>

          <div className="resp-itinerary" style={{ gap: 32 }}>
            <div className="resp-itinerary-nav" style={{ gap: 6 }}>
              {itinerary.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: "10px 16px",
                    borderLeft: activeDay === i ? "2px solid #7dbf8e" : "2px solid #ffffff11",
                    color: activeDay === i ? "#7dbf8e" : "#4a6050",
                    fontSize: 13,
                    letterSpacing: "0.1em",
                    transition: "all 0.2s",
                    fontFamily: "inherit",
                  }}
                >
                  {item.day}
                </button>
              ))}
            </div>

            <div style={{ flex: 1, minWidth: 280 }}>
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: "#0a130d",
                  border: "1px solid #ffffff0d",
                  padding: "36px",
                  borderRadius: 2,
                }}
              >
                <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#7dbf8e", textTransform: "uppercase", marginBottom: 8 }}>
                  {itinerary[activeDay].day}
                </div>
                <h3 style={{ fontSize: "1.6rem", fontWeight: 300, margin: "0 0 4px", color: "#e0e8e2" }}>
                  {itinerary[activeDay].title}
                </h3>
                <div style={{ fontSize: 13, color: "#5a7060", letterSpacing: "0.08em", marginBottom: 20 }}>
                  {itinerary[activeDay].subtitle}
                </div>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#8da898", marginBottom: 24, fontWeight: 300 }}>
                  {itinerary[activeDay].description}
                </p>
                {itinerary[activeDay].experiences.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {itinerary[activeDay].experiences.map((exp) => (
                      <div
                        key={exp}
                        style={{
                          padding: "5px 12px",
                          border: "1px solid #7dbf8e33",
                          borderRadius: 2,
                          fontSize: 12,
                          color: "#8da898",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {exp}
                      </div>
                    ))}
                  </div>
                )}
                {itinerary[activeDay].birdNote && (
                  <div style={{ marginTop: 16, padding: "10px 14px", background: "#0f1f12", borderLeft: "2px solid #7dbf8e", fontSize: 13, color: "#7dbf8e" }}>
                    🐦 {itinerary[activeDay].birdNote}
                  </div>
                )}
                {itinerary[activeDay].stay && (
                  <div style={{ marginTop: 20, fontSize: 12, color: "#7dbf8e", letterSpacing: "0.1em" }}>
                    🏨 Overnight: {itinerary[activeDay].stay}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* BIRDWATCHING */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ marginBottom: 80 }}
        >
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#7dbf8e", marginBottom: 32 }}>
            Himalayan Bird Species
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {birds.map((b) => (
              <div
                key={b.species}
                style={{
                  padding: "18px 20px",
                  background: "#0a130d",
                  border: "1px solid #ffffff0d",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: 14, color: "#e0e8e2", marginBottom: 4 }}>{b.species}</div>
                  <div style={{ fontSize: 11, color: "#4a6050", letterSpacing: "0.06em" }}>{b.season}</div>
                </div>
                <span style={{ fontSize: 20 }}>{b.icon}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* INCLUSIONS / EXCLUSIONS */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ marginBottom: 80 }}
        >
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#7dbf8e", marginBottom: 32 }}>
            Package Details
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
            {["inclusions", "exclusions", "add-ons"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: tab === t ? "#7dbf8e" : "transparent",
                  border: "1px solid #7dbf8e55",
                  color: tab === t ? "#080c0a" : "#7dbf8e",
                  padding: "8px 20px",
                  cursor: "pointer",
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: "inherit",
                  transition: "all 0.2s",
                  borderRadius: 2,
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {tab === "inclusions" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 12 }}>
                {inclusions.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", background: "#0a130d", border: "1px solid #ffffff09" }}>
                    <span style={{ color: "#7dbf8e", marginTop: 2 }}>✓</span>
                    <span style={{ fontSize: 14, color: "#8da898", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === "exclusions" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 12 }}>
                {exclusions.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", background: "#0a130d", border: "1px solid #ffffff09" }}>
                    <span style={{ color: "#4a6050", marginTop: 2 }}>✗</span>
                    <span style={{ fontSize: 14, color: "#5a7060", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === "add-ons" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                {addOns.map((item) => (
                  <div key={item.label} style={{ padding: "18px 20px", background: "#0a130d", border: "1px solid #7dbf8e22", display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: 22 }}>{item.icon}</span>
                    <span style={{ fontSize: 14, color: "#8da898" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.section>

        {/* BEST SEASON */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ marginBottom: 80 }}
        >
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#7dbf8e", marginBottom: 32 }}>
            Best Travel Season
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {seasons.map((s) => (
              <div
                key={s.period}
                style={{
                  padding: "28px 24px",
                  background: "#0a130d",
                  border: "1px solid #ffffff0d",
                  borderTop: "2px solid #7dbf8e",
                }}
              >
                <div style={{ fontSize: "1.1rem", color: "#e0e8e2", marginBottom: 10 }}>{s.period}</div>
                <div style={{ fontSize: 13, color: "#5a7060", lineHeight: 1.6 }}>{s.experience}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ALTITUDE */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ marginBottom: 80 }}
        >
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#7dbf8e", marginBottom: 32 }}>
            Altitude Profile
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {altitudes.map((a, i) => (
              <div
                key={a.place}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "14px 20px",
                  background: i % 2 === 0 ? "#0a130d" : "transparent",
                  borderBottom: "1px solid #ffffff08",
                }}
              >
                <span style={{ fontSize: 15, color: "#8da898" }}>{a.place}</span>
                <span style={{ fontSize: 13, color: "#7dbf8e", letterSpacing: "0.06em" }}>{a.alt}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{
            textAlign: "center",
            padding: "64px 32px",
            background: "#0a130d",
            border: "1px solid #7dbf8e22",
            borderTop: "1px solid #7dbf8e",
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#7dbf8e", marginBottom: 20 }}>
            Join the Expedition
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 300, margin: "0 0 16px", color: "#e0e8e2" }}>
            The Wilderness is Waiting
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#5a7060", marginBottom: 40, maxWidth: 480, margin: "0 auto 40px" }}>
            Limited seasonal departures. Maximum 8–10 travelers.
            Premium and backpacker versions available.
          </p>
          <a
            href="/contact#consultation"
            style={{
              display: "inline-block",
              padding: "16px 44px",
              background: "#7dbf8e",
              color: "#080c0a",
              textDecoration: "none",
              fontSize: 13,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
          >
            Enquire Now
          </a>
          <div style={{ marginTop: 20, fontSize: 12, color: "#3a5040", letterSpacing: "0.08em" }}>
            Travel insurance strongly recommended · Eco-certified travel · Local expert guides
          </div>
        </motion.section>

      </div>

      {/* ── BOTTOM CTA FORM ──────────────────────────────── */}
      <section style={{ background: "#0a0a0a", padding: "80px 24px", borderTop: "1px solid rgba(201,169,110,0.15)" }}>
        <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 16, fontFamily: "'Cormorant Garamond',Georgia,serif" }}>Begin Your Journey</div>
          <h2 style={{ fontSize: "clamp(1.5rem,4vw,2.5rem)", fontWeight: 300, color: "#c9a96e", margin: "0 0 16px", lineHeight: 1.2, fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
            Ready to Explore the Eastern Kumaon Wilderness?
          </h2>
          <p style={{ fontSize: "1rem", color: "#7a7068", marginBottom: 36, lineHeight: 1.7, fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
            Pristine trails, rare wildlife and authentic Himalayan villages await your discovery
          </p>
          <ExpeditionForm defaultPackage="Eastern Kumaon Wilderness Expedition" />
        </div>
      </section>

    </div>
  );
}
