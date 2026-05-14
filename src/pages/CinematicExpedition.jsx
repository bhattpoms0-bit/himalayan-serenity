import { useState } from "react";
import { motion } from "framer-motion";

const itinerary = [
  {
    day: "Day 0",
    title: "Overnight Departure from Delhi",
    subtitle: "Delhi → Kumaon Hills",
    description:
      "Depart from Delhi NCR between 9:00 PM – 11:00 PM for an overnight journey toward Eastern Kumaon. The mountains await.",
    experiences: ["Private SUV transfer", "Optional overnight train to the foothills"],
    stay: null,
  },
  {
    day: "Day 1",
    title: "Arrival in Lohaghat",
    subtitle: "Colonial Kumaon & Forest Retreats",
    description:
      "As evening fog settles across the pine forests of Abbott Mount, experience the atmospheric colonial ridge known for its mysterious folklore, abandoned heritage architecture, and hauntingly quiet Himalayan ambience – followed by an intimate bonfire under the mountain night sky.",
    experiences: ["Scenic drive via Champawat", "Pine forest landscapes", "Colonial-era architecture", "Sunset at Abbott Mount ridge", "Local Kumaoni dinner"],
    stay: "Lohaghat",
  },
  {
    day: "Day 2",
    title: "Lohaghat Exploration",
    subtitle: "Sacred Forests, Lakes & Mythological Trails",
    description:
      "A full day of immersive exploration – from serene ashram grounds to hidden lakes and ancient fort ruins.",
    experiences: ["Morning visit to Mayawati Ashram", "Kolidhek Lake excursion", "Guided Banasur Fort trek", "Local village interactions"],
    stay: "Lohaghat",
    difficulty: "Easy to Moderate",
  },
  {
    day: "Day 3",
    title: "Lohaghat → Pithoragarh",
    subtitle: "Entering Eastern Kumaon",
    description:
      "Drive deeper into Eastern Kumaon with a stop at the otherworldly Patal Bhuvaneshwar cave temple, before arriving in the mountain city of Pithoragarh for a golden-hour sunset over the Soar Valley.",
    experiences: ["Gangolihat region", "Patal Bhuvaneshwar Cave Temple (optional)", "Traditional Kumaoni lunch", "Chandak viewpoint sunset"],
    stay: "Pithoragarh",
  },
  {
    day: "Day 4",
    title: "Pithoragarh Adventure Day",
    subtitle: "Paragliding & Cultural Exploration",
    description:
      "Take flight over the dramatic Soar Valley in a tandem paragliding session – one of Eastern Kumaon's most exhilarating experiences. Spend the afternoon exploring temples, local markets, and mountain cafés.",
    experiences: ["Tandem paragliding over Soar Valley (weather dependent)", "Kamakhya Temple visit", "Ulka Devi Temple", "Local markets and cafés"],
    stay: "Pithoragarh",
  },
  {
    day: "Day 5",
    title: "Pithoragarh → Dharchula",
    subtitle: "Himalayan Border Road Expedition",
    description:
      "One of the most cinematic drives in all of India – following the turquoise Kali River along the Indo-Nepal corridor, past suspension bridges, ancient confluences, and raw Himalayan border landscapes.",
    experiences: ["Kali River valley drive", "Jauljibi confluence stop", "Indo-Nepal cultural corridor", "Suspension bridge walks"],
    stay: "Dharchula",
  },
  {
    day: "Day 6",
    title: "River Adventure & Hidden Valleys",
    subtitle: "Remote Himalayan Exploration",
    description:
      "A day to slow down, breathe in, and go deeper. River rafting on the Kali, optional drives into secluded valleys, and riverside evenings unlike anything on the standard Uttarakhand trail.",
    experiences: ["Seasonal river rafting on the Kali", "Optional hidden valley drives", "Village exploration", "Riverside relaxation"],
    stay: "Dharchula / Riverside Camp",
  },
  {
    day: "Day 7",
    title: "Dharchula → Didihat",
    subtitle: "Offbeat Eastern Kumaon Landscapes",
    description:
      "Wind through ridge roads toward the underrated gem of Didihat – dramatic valley views, photography stops, village walks, and a final Himalayan sunset before the journey home begins.",
    experiences: ["Scenic ridge drives", "Photography stops", "Village walks", "Sunset viewpoint experience"],
    stay: "Didihat",
  },
  {
    day: "Day 8",
    title: "Didihat → Almora → Delhi",
    subtitle: "Farewell to the Himalaya",
    description:
      "A final stop in Almora for café culture, local sweets, and Kumaoni handicrafts before the scenic descent toward the plains. The mountains will wait for your return.",
    experiences: ["Almora café stop", "Local sweets and handicrafts", "Scenic foothills descent"],
    stay: null,
  },
];

const inclusions = [
  "Accommodation on twin-sharing basis",
  "Daily breakfast & dinner",
  "All internal road transportation (private SUV)",
  "Experienced local tour coordinator",
  "Sightseeing as per itinerary",
  "Bonfire experiences (weather permitting)",
  "Guided Banasur Fort trek",
  "Paragliding coordination assistance",
];

const exclusions = [
  "Airfare / train tickets (Delhi to foothills)",
  "Personal expenses",
  "Travel insurance (strongly recommended)",
  "Camera or drone permits",
  "Adventure activity charges (paragliding, rafting)",
  "Lunches & beverages",
  "Entry fees to monuments or protected areas",
  "GST and applicable taxes",
];

const addOns = [
  { label: "Professional photography support", icon: "📷" },
  { label: "Drone cinematography", icon: "🎬" },
  { label: "Luxury glamping upgrade", icon: "⛺" },
  { label: "Birdwatching extension", icon: "🦜" },
  { label: "Adi Kailash extension", icon: "🏔️" },
];

const seasons = [
  { period: "March – June", experience: "Pleasant weather, all adventure activities open" },
  { period: "September – November", experience: "Crystal-clear Himalayan views, peak photography" },
  { period: "December – February", experience: "Winter misty forests and snow landscapes" },
];

const altitudes = [
  { place: "Delhi", alt: "216 m" },
  { place: "Lohaghat", alt: "1,745 m" },
  { place: "Abbott Mount", alt: "1,981 m" },
  { place: "Pithoragarh", alt: "1,650 m" },
  { place: "Chandak", alt: "2,000 m" },
  { place: "Dharchula", alt: "940 m" },
  { place: "Didihat", alt: "1,725 m" },
];

export default function CinematicExpedition() {
  const [activeDay, setActiveDay] = useState(0);
  const [tab, setTab] = useState("inclusions");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0a0d0f 0%, #0f1a14 50%, #080c10 100%)",
        color: "#e8e0d4",
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
            "linear-gradient(to bottom, rgba(8,12,16,0.3) 0%, rgba(8,12,16,0.6) 60%, rgba(8,12,16,0.97) 100%), url('/images/packages/village-road.jpg') center/cover no-repeat",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px", width: "100%" }}>
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
                color: "#c9a96e",
                borderBottom: "1px solid #c9a96e44",
                paddingBottom: 8,
                marginBottom: 24,
              }}
            >
              Cinematic Road Expedition · 7 Nights / 8 Days
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
              <span style={{ color: "#c9a96e", fontStyle: "italic" }}>Cinematic Expedition</span>
            </h1>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "#b5a898",
                fontWeight: 300,
                margin: "16px 0 36px",
                letterSpacing: "0.04em",
              }}
            >
              Lohaghat &nbsp;·&nbsp; Pithoragarh &nbsp;·&nbsp; Dharchula &nbsp;·&nbsp; Didihat &nbsp;·&nbsp; Almora
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[
                { label: "Couples & Honeymooners", icon: "👫" },
                { label: "Photographers", icon: "📸" },
                { label: "Adventure Travelers", icon: "🏔️" },
              ].map((tag) => (
                <div
                  key={tag.label}
                  style={{
                    padding: "8px 18px",
                    border: "1px solid #c9a96e55",
                    borderRadius: 2,
                    fontSize: 13,
                    color: "#c9a96e",
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
      <div
        style={{
          borderTop: "1px solid #ffffff11",
          borderBottom: "1px solid #ffffff11",
          background: "#0d1610",
        }}
      >
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
            { label: "Duration", value: "7 Nights / 8 Days" },
            { label: "Starts", value: "Delhi NCR" },
            { label: "Ends", value: "Delhi NCR" },
            { label: "Group Size", value: "Max 8–10 travelers" },
            { label: "Fitness Level", value: "Moderate" },
            { label: "Pricing", value: "On Request" },
          ].map((item) => (
            <div key={item.label}>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 6 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 16, color: "#e8e0d4" }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "72px 32px" }}>

        {/* OVERVIEW */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{ marginBottom: 80 }}
        >
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 20 }}>
            The Journey
          </div>
          <p style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.35rem)", lineHeight: 1.85, color: "#c8bfb5", fontWeight: 300, maxWidth: 760 }}>
            Discover one of India's most unexplored Himalayan regions through a carefully curated road expedition across
            Eastern Kumaon. Colonial hill stations, sacred retreats, hidden river valleys, paragliding over dramatic gorges,
            and the cinematic Indo-Nepal border corridor – this journey reveals the Himalaya that mainstream tourism has
            never touched.
          </p>
          <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", lineHeight: 1.85, color: "#9a9088", fontWeight: 300, marginTop: 20, maxWidth: 720 }}>
            Unlike conventional Uttarakhand packages, this expedition is built for slow travel – for the traveler who
            wants to feel a place, not just photograph it. Every stop has been chosen for its atmosphere, its story,
            and its quiet distance from the crowd.
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
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 32 }}>
            Journey Highlights
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "auto auto",
              gap: 8,
            }}
          >
            {[
              { src: "/images/packages/pine-temple.jpg",    caption: "Lohaghat Forest Trails",         span: false },
              { src: "/images/packages/kumaon-village.jpg", caption: "Kumaoni Village Life",            span: false },
              { src: "/images/packages/river-rafting.jpg",  caption: "Kali River Adventure",           span: false },
              { src: "/images/packages/dharchula-town.jpg", caption: "Dharchula — Gateway to Tibet",   span: false },
              { src: "/images/packages/johar-valley.jpg",   caption: "Johar Valley Corridor",          span: "2" },
            ].map((photo) => (
              <div
                key={photo.src}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  height: 240,
                  gridColumn: photo.span ? `span ${photo.span}` : undefined,
                  cursor: "pointer",
                }}
                className="gallery-item"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
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
                    background: "linear-gradient(to top, rgba(8,12,16,0.88) 0%, rgba(8,12,16,0.3) 60%, transparent 100%)",
                    padding: "28px 16px 14px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: "#e8e0d4",
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
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 40 }}>
            Day by Day Itinerary
          </div>

          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {/* Day selector */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 120 }}>
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
                    borderLeft: activeDay === i ? "2px solid #c9a96e" : "2px solid #ffffff11",
                    color: activeDay === i ? "#c9a96e" : "#6a6058",
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

            {/* Day detail */}
            <div style={{ flex: 1, minWidth: 280 }}>
              <motion.div
                key={activeDay}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  background: "#0d1610",
                  border: "1px solid #ffffff0d",
                  padding: "36px",
                  borderRadius: 2,
                }}
              >
                <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "#c9a96e", textTransform: "uppercase", marginBottom: 8 }}>
                  {itinerary[activeDay].day}
                </div>
                <h3 style={{ fontSize: "1.6rem", fontWeight: 300, margin: "0 0 4px", color: "#e8e0d4" }}>
                  {itinerary[activeDay].title}
                </h3>
                <div style={{ fontSize: 13, color: "#7a7068", letterSpacing: "0.08em", marginBottom: 20 }}>
                  {itinerary[activeDay].subtitle}
                </div>
                <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#b5a898", marginBottom: 24, fontWeight: 300 }}>
                  {itinerary[activeDay].description}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {itinerary[activeDay].experiences.map((exp) => (
                    <div
                      key={exp}
                      style={{
                        padding: "5px 12px",
                        border: "1px solid #c9a96e33",
                        borderRadius: 2,
                        fontSize: 12,
                        color: "#b5a898",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {exp}
                    </div>
                  ))}
                </div>
                {itinerary[activeDay].stay && (
                  <div style={{ marginTop: 20, fontSize: 12, color: "#c9a96e", letterSpacing: "0.1em" }}>
                    🏨 Overnight: {itinerary[activeDay].stay}
                  </div>
                )}
              </motion.div>
            </div>
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
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 32 }}>
            Package Details
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
            {["inclusions", "exclusions", "add-ons"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: tab === t ? "#c9a96e" : "transparent",
                  border: "1px solid #c9a96e55",
                  color: tab === t ? "#0a0d0f" : "#c9a96e",
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
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", background: "#0d1610", border: "1px solid #ffffff09" }}>
                    <span style={{ color: "#c9a96e", marginTop: 2 }}>✓</span>
                    <span style={{ fontSize: 14, color: "#b5a898", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === "exclusions" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 12 }}>
                {exclusions.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", background: "#0d1610", border: "1px solid #ffffff09" }}>
                    <span style={{ color: "#6a6058", marginTop: 2 }}>✗</span>
                    <span style={{ fontSize: 14, color: "#7a7068", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
            {tab === "add-ons" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                {addOns.map((item) => (
                  <div key={item.label} style={{ padding: "18px 20px", background: "#0d1610", border: "1px solid #c9a96e22", display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: 22 }}>{item.icon}</span>
                    <span style={{ fontSize: 14, color: "#b5a898" }}>{item.label}</span>
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
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 32 }}>
            Best Travel Season
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {seasons.map((s) => (
              <div
                key={s.period}
                style={{
                  padding: "28px 24px",
                  background: "#0d1610",
                  border: "1px solid #ffffff0d",
                  borderTop: "2px solid #c9a96e",
                }}
              >
                <div style={{ fontSize: "1.1rem", color: "#e8e0d4", marginBottom: 10 }}>{s.period}</div>
                <div style={{ fontSize: 13, color: "#7a7068", lineHeight: 1.6 }}>{s.experience}</div>
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
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 32 }}>
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
                  background: i % 2 === 0 ? "#0d1610" : "transparent",
                  borderBottom: "1px solid #ffffff08",
                }}
              >
                <span style={{ fontSize: 15, color: "#b5a898" }}>{a.place}</span>
                <span style={{ fontSize: 13, color: "#c9a96e", letterSpacing: "0.06em" }}>{a.alt}</span>
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
            background: "#0d1610",
            border: "1px solid #c9a96e22",
            borderTop: "1px solid #c9a96e",
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", marginBottom: 20 }}>
            Begin Your Expedition
          </div>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 300, margin: "0 0 16px", color: "#e8e0d4" }}>
            Eastern Kumaon Awaits
          </h2>
          <p style={{ fontSize: "1.1rem", color: "#7a7068", marginBottom: 40, maxWidth: 480, margin: "0 auto 40px" }}>
            Limited departures. Maximum 8–10 travelers per group.
            Dates available on request.
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-block",
              padding: "16px 44px",
              background: "#c9a96e",
              color: "#0a0d0f",
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
          <div style={{ marginTop: 20, fontSize: 12, color: "#4a4038", letterSpacing: "0.08em" }}>
            Travel insurance strongly recommended · SUV expeditions · Local expert guides
          </div>
        </motion.section>

      </div>
    </div>
  );
}
