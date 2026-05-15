import { useState } from "react";
import { motion } from "framer-motion";

const itinerary = [
  {
    day: "Day 0",
    title: "Overnight Departure from Delhi",
    subtitle: "Delhi → Kumaon Himalaya",
    description:
      "Depart from Delhi NCR between 8:00 PM – 10:00 PM for the overnight journey toward the sacred Kumaon Himalaya. The journey to Adi Kailash begins long before the mountains appear.",
    experiences: ["Private SUV transfer (Ertiga / Scorpio)", "Overnight mountain approach"],
    stay: null,
    altitude: null,
  },
  {
    day: "Day 1",
    title: "Arrival in Pithoragarh",
    subtitle: "Gateway to Eastern Kumaon",
    description:
      "Arrive in Pithoragarh – the gateway to Eastern Kumaon and the starting point for the Adi Kailash corridor. Evening excursion to Chandak viewpoint for panoramic sunset views over the vast Soar Valley, surrounded by pine-covered Himalayan ridges.",
    experiences: ["Scenic Kumaon mountain drive", "Soar Valley arrival", "Chandak sunset viewpoint", "Mountain acclimatization", "Expedition orientation"],
    stay: "Pithoragarh",
    altitude: "1,650 m",
  },
  {
    day: "Day 2",
    title: "Pithoragarh → Dharchula",
    subtitle: "Indo-Nepal Himalayan Corridor",
    description:
      "A cinematic drive following the turquoise Kali River through the dramatic Indo-Nepal border corridor. Suspension bridges, ancient confluences, mountain bazaars, and the raw energy of Himalayan border life.",
    experiences: ["Kali River valley expedition", "Jauljibi confluence stop", "Indo-Nepal cultural corridor", "Himalayan suspension bridges", "Dharchula bazaar exploration"],
    stay: "Dharchula",
    altitude: "940 m",
  },
  {
    day: "Day 3",
    title: "Dharchula → Gunji",
    subtitle: "Entering the Sacred Himalayan Zone",
    description:
      "The most transformative drive of the expedition – ascending through dramatic Himalayan terrain past Narayan Ashram, scenic waterfalls, and remote mountain valleys into the high-altitude sacred zone. Inner Line Permit verification required.",
    experiences: ["Narayan Ashram visit", "High-altitude Himalayan terrain", "Scenic waterfalls", "Remote valley exploration", "Inner Line Permit checkpoint"],
    stay: "Gunji",
    altitude: "3,300 m",
    note: "Inner Line Permit required – assistance provided",
  },
  {
    day: "Day 4",
    title: "Adi Kailash & Parvati Sarovar",
    subtitle: "Sacred Kailash Darshan",
    description:
      "The sacred heart of this expedition. Darshan of Adi Kailash – the earthly abode of Lord Shiva, also known as Chhota Kailash – followed by meditation at the sacred Parvati Sarovar lake. A slow, immersive spiritual experience with full acclimatization and reflection time.",
    experiences: ["Darshan of Adi Kailash", "Meditation at Parvati Sarovar", "Sacred Himalayan rituals", "High-altitude photography", "Spiritual immersion"],
    stay: "Gunji / Nabi Region",
    altitude: "3,600+ m",
  },
  {
    day: "Day 5",
    title: "Om Parvat Excursion",
    subtitle: "The Sacred Om Symbol Mountain",
    description:
      "Witness one of the most extraordinary natural phenomena in the Himalaya – the sacred Om symbol formed by permanent snow on the face of Om Parvat, visible from Nabhidhang. A profound spiritual and visual experience at the edge of India and Tibet.",
    experiences: ["Om Parvat darshan from Nabhidhang", "Indo-Tibet Himalayan landscape", "High-altitude photography", "Spiritual reflection", "Himalayan silence"],
    stay: "Dharchula",
    altitude: "3,600+ m (Nabhidhang)",
  },
  {
    day: "Day 6",
    title: "Dharchula → Pithoragarh",
    subtitle: "Return Through Eastern Kumaon",
    description:
      "A gentle return through the Kali River corridor – riverside landscapes, unhurried mountain drives, and a relaxed evening in Pithoragarh to absorb the journey before the descent begins.",
    experiences: ["Scenic Himalayan return drive", "Riverside landscapes", "Slow mountain travel", "Leisure evening in Pithoragarh"],
    stay: "Pithoragarh",
    altitude: "1,650 m",
  },
  {
    day: "Day 7",
    title: "Pithoragarh → Almora → Delhi",
    subtitle: "Farewell to the Himalaya",
    description:
      "Optional spiritual stops en route – Patal Bhuvaneshwar Cave Temple, Jageshwar Temple Complex, or Kainchi Dham – before a cultural pause in Almora for local handicrafts and mountain café culture, and the final descent toward the plains.",
    experiences: ["Patal Bhuvaneshwar Cave (optional)", "Jageshwar Temple (optional)", "Kainchi Dham (optional)", "Almora cultural stop", "Local sweets & handicrafts"],
    stay: "Overnight return to Delhi",
    altitude: null,
  },
  {
    day: "Day 8",
    title: "Arrival in Delhi",
    subtitle: "Tour Concludes",
    description: "Return to Delhi NCR carrying memories of the sacred Himalaya – a journey that few travelers in the world will ever make.",
    experiences: [],
    stay: null,
    altitude: null,
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

export default function AdiKailashExpedition() {
  const [activeDay, setActiveDay] = useState(0);
  const [tab, setTab] = useState("inclusions");

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
                Sacred Himalayan Expedition · 7 Nights / 8 Days
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
            <div style={{ display: "inline-block", padding: "6px 16px", background: `${gold}22`, border: `1px solid ${gold}`, borderRadius: 2 }}>
              <span style={{ fontSize: 13, color: gold, letterSpacing: "0.1em" }}>Premium Expedition · Pricing On Request</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* STATS STRIP */}
      <div style={{ borderTop: `1px solid #ffffff0f`, borderBottom: `1px solid #ffffff0f`, background: card }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24 }}>
          {[
            { label: "Duration", value: "7 Nights / 8 Days" },
            { label: "Max Altitude", value: "3,600+ m" },
            { label: "Group Size", value: "Max 8–10 travelers" },
            { label: "Fitness Level", value: "Moderate" },
            { label: "Permit Required", value: "Inner Line Permit" },
            { label: "Pricing", value: "On Request" },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: gold, marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 15, color: text }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="page-inner" style={{ maxWidth: 960, margin: "0 auto" }}>

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

        {/* SIGNATURE HIGHLIGHTS */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 36 }}>Signature Highlights</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {highlights.map(h => (
              <div key={h.title} style={{ padding: "24px", background: card, border: `1px solid #ffffff0a`, borderTop: `2px solid ${gold}44` }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{h.icon}</div>
                <div style={{ fontSize: "1.1rem", color: text, marginBottom: 8 }}>{h.title}</div>
                <div style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{h.desc}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* GALLERY */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 32 }}>Journey Highlights</div>
          <div className="resp-grid-3" style={{ gap: 8 }}>
            {[
              { src: "/images/packages/adi-kailash/adi-kailash-nandi.jpg",    caption: "Nandi at the Foot of Adi Kailash",    span: "2" },
              { src: "/images/packages/adi-kailash/adi-kailash-peak.jpg",     caption: "Adi Kailash — Chhota Kailash",        span: false },
              { src: "/images/packages/adi-kailash/adi-kailash-approach.jpg", caption: "Base of Adi Kailash",                 span: false },
              { src: "/images/packages/adi-kailash/parvati-sarovar.jpg",      caption: "Parvati Sarovar — Sacred Lake",       span: false },
              { src: "/images/packages/adi-kailash/om-parvat-1.jpg",          caption: "Om Parvat — The Sacred Om in Snow",   span: "2" },
              { src: "/images/packages/adi-kailash/om-parvat-2.jpg",          caption: "Om Parvat Close View",               span: false },
              { src: "/images/packages/adi-kailash/jageshwar-temple.jpg",     caption: "Jageshwar Temple Complex",            span: false },
              { src: "/images/packages/adi-kailash/jageshwar-temple-2.jpg",   caption: "Ancient Jageshwar Shiva Shrine",      span: false },
              { src: "/images/packages/adi-kailash/kainchi-dham.jpg",         caption: "Kainchi Dham",                       span: false },
              { src: "/images/packages/adi-kailash/adi-kailash-trishul.jpg",   caption: "Trishul at Adi Kailash — Sacred Symbol of Shiva", span: false },
              { src: "/images/packages/adi-kailash/dawn-himalaya.jpg",        caption: "Himalayan Dawn",                     span: "2" },
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
                    background: "linear-gradient(to top, rgba(7,9,11,0.92) 0%, rgba(7,9,11,0.3) 60%, transparent 100%)",
                    padding: "28px 16px 14px",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#e8e0d4", letterSpacing: "0.08em", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    {photo.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ITINERARY */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 40 }}>Day by Day Itinerary</div>
          <div className="resp-itinerary" style={{ gap: 32 }}>
            {/* Day selector */}
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

            {/* Day detail */}
            <div style={{ flex: 1, minWidth: 280 }}>
              <motion.div key={activeDay} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                style={{ background: card, border: `1px solid #ffffff0d`, padding: "36px", borderRadius: 2 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.2em", color: gold, textTransform: "uppercase", marginBottom: 6 }}>{itinerary[activeDay].day}</div>
                <h3 style={{ fontSize: "1.7rem", fontWeight: 300, margin: "0 0 4px", color: text }}>{itinerary[activeDay].title}</h3>
                <div style={{ fontSize: 13, color: muted, letterSpacing: "0.08em", marginBottom: 20 }}>{itinerary[activeDay].subtitle}</div>
                {itinerary[activeDay].altitude && (
                  <div style={{ display: "inline-block", padding: "3px 10px", background: `${gold}15`, border: `1px solid ${gold}33`, borderRadius: 2, fontSize: 11, color: gold, letterSpacing: "0.1em", marginBottom: 16 }}>
                    ⛰️ {itinerary[activeDay].altitude}
                  </div>
                )}
                <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: accent, marginBottom: 24, fontWeight: 300 }}>{itinerary[activeDay].description}</p>
                {itinerary[activeDay].experiences.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                    {itinerary[activeDay].experiences.map(exp => (
                      <div key={exp} style={{ padding: "5px 12px", border: `1px solid ${gold}33`, borderRadius: 2, fontSize: 12, color: accent, letterSpacing: "0.05em" }}>{exp}</div>
                    ))}
                  </div>
                )}
                {itinerary[activeDay].note && (
                  <div style={{ padding: "10px 14px", background: "#1a1208", borderLeft: `2px solid ${gold}`, fontSize: 13, color: gold, marginTop: 12 }}>
                    ⚠️ {itinerary[activeDay].note}
                  </div>
                )}
                {itinerary[activeDay].stay && (
                  <div style={{ marginTop: 16, fontSize: 12, color: gold, letterSpacing: "0.1em" }}>🏨 Overnight: {itinerary[activeDay].stay}</div>
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

        {/* BEST SEASON */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 32 }}>Best Travel Season</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {seasons.map(s => (
              <div key={s.period} style={{ padding: "28px 24px", background: card, border: `1px solid #ffffff0d`, borderTop: `2px solid ${gold}` }}>
                <div style={{ fontSize: "1.1rem", color: text, marginBottom: 10 }}>{s.period}</div>
                <div style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{s.experience}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "16px 20px", background: "#12080a", border: `1px solid #ff444422`, borderLeft: `3px solid #ff4444` }}>
            <div style={{ fontSize: 13, color: "#ff8888" }}>⚠️ Important – Route closes November onwards due to snowfall and permit restrictions. Plan your expedition between May and October only.</div>
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
          <div style={{ fontSize: "1.4rem", color: gold, margin: "0 auto 36px", letterSpacing: "0.05em" }}>
            Pricing On Request
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
