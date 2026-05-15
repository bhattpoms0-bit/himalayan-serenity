import { useState } from "react";
import { motion } from "framer-motion";

const itinerary = [
  {
    day: "Day 0",
    title: "Overnight Departure from Delhi",
    subtitle: "Delhi → Kumaon Himalaya",
    description: "Depart from Delhi NCR between 8:00 PM – 10:00 PM for the overnight journey toward the Panchachuli Himalaya. The five sacred peaks await.",
    experiences: ["Private SUV transfer (Ertiga / Scorpio / Premium SUV)", "Overnight mountain approach"],
    stay: null,
    altitude: null,
  },
  {
    day: "Day 1",
    title: "Arrival in Pithoragarh",
    subtitle: "Gateway to Eastern Kumaon",
    description: "Arrive in Pithoragarh and settle into the rhythm of the mountains. Evening excursion to Chandak viewpoint for panoramic sunset views over the vast Soar Valley surrounded by pine-covered Himalayan ridges.",
    experiences: ["Scenic Himalayan drive through Kumaon", "Soar Valley arrival", "Chandak sunset viewpoint", "Mountain acclimatization"],
    stay: "Pithoragarh",
    altitude: "1,650 m",
  },
  {
    day: "Day 2",
    title: "Pithoragarh → Munsiyari",
    subtitle: "Panchachuli Himalayan Approach",
    description: "The most dramatic drive of the expedition – ascending through Himalayan ridge roads past Birthi Falls into the Johar Valley. The five peaks of Panchachuli gradually dominate the horizon as you approach Munsiyari. The first sunset view of the Panchachuli massif from Munsiyari is unforgettable.",
    experiences: ["Birthi Falls stop", "Himalayan ridge roads", "Johar Valley landscapes", "Panchachuli peak first reveal", "Munsiyari sunset views"],
    stay: "Munsiyari",
    altitude: "2,200 m",
  },
  {
    day: "Day 3",
    title: "Munsiyari Exploration & Acclimatization",
    subtitle: "Culture & Mountain Preparation",
    description: "A full acclimatization day before entering the trekking zone. Explore the heritage Darkot village with its traditional Bhotiya weaving culture, followed by a trek briefing, equipment review, and acclimatization walk in the Munsiyari forest belt.",
    experiences: ["Darkot heritage village visit", "Local weaving & Bhotiya culture", "Trek briefing & safety review", "Acclimatization walk", "Himalayan café experience"],
    stay: "Munsiyari",
    altitude: "2,200 m",
  },
  {
    day: "Day 4",
    title: "Munsiyari → Duktu Village",
    subtitle: "Entering the Panchachuli Valley",
    description: "Drive deep into the Panchachuli valley through glacier river crossings and remote Himalayan settlements – landscapes that most travelers never see. Short acclimatization hikes around Duktu village with the Panchachuli peaks dominating the skyline.",
    experiences: ["Scenic mountain drive", "Glacier river crossings", "Remote Himalayan settlements", "Panchachuli valley landscapes", "Duktu village acclimatization hike"],
    stay: "Duktu Village Homestay / Mountain Camp",
    altitude: "2,600 m",
  },
  {
    day: "Day 5",
    title: "Panchachuli Base Camp Trek",
    subtitle: "Glacier Valley Expedition",
    description: "The heart of this expedition – a full trekking day through glacier-fed valleys with massive Panchachuli views, alpine terrain, and high-altitude wilderness that exists far beyond the reach of mainstream Himalayan tourism. Return to Duktu for overnight stay.",
    experiences: ["Trek to Panchachuli Base Camp region", "Glacier-fed streams", "Massive Panchachuli peak views", "Alpine terrain trekking", "High-altitude photography", "Himalayan silence & wilderness"],
    stay: "Duktu Village",
    altitude: "3,800+ m",
    difficulty: "Moderate to Active",
  },
  {
    day: "Day 6",
    title: "Duktu → Munsiyari",
    subtitle: "Return Through Himalayan Valleys",
    description: "A relaxed return through the valley with time for photography, riverside relaxation, and village stops before settling into a comfortable evening in Munsiyari.",
    experiences: ["Scenic valley return", "Village photography stops", "Riverside relaxation", "Leisure evening in Munsiyari"],
    stay: "Munsiyari",
    altitude: "2,200 m",
  },
  {
    day: "Day 7",
    title: "Munsiyari → Didihat",
    subtitle: "Hidden Eastern Kumaon Landscapes",
    description: "A scenic descent through Eastern Kumaon's hidden ridge roads – photography stops, village walks, and slow mountain travel through landscapes that define the quiet beauty of the region.",
    experiences: ["Ridge drives through Eastern Kumaon", "Village walks", "Scenic photography stops", "Slow mountain travel"],
    stay: "Didihat",
    altitude: "1,725 m",
  },
  {
    day: "Day 8",
    title: "Didihat → Almora → Delhi",
    subtitle: "Farewell to the Himalaya",
    description: "Optional spiritual stops en route – Jageshwar Temple Complex or Kainchi Dham – before a cultural pause in Almora for local handicrafts, mountain café culture, and the final descent toward the plains.",
    experiences: ["Jageshwar Temple Complex (optional)", "Kainchi Dham (optional)", "Almora cultural stop", "Local sweets & handicrafts", "Scenic foothills descent"],
    stay: "Overnight return to Delhi",
    altitude: null,
  },
  {
    day: "Day 9",
    title: "Arrival in Delhi",
    subtitle: "Trek Concludes",
    description: "Return to Delhi NCR with memories of the Panchachuli peaks – one of the Himalaya's most dramatic yet least-visited trekking destinations.",
    experiences: [],
    stay: null,
    altitude: null,
  },
];

const highlights = [
  { icon: "🏔️", title: "Panchachuli Base Camp", desc: "Trek to the base of the five sacred Pandava peaks" },
  { icon: "🌄", title: "Panchachuli Sunrise", desc: "Dramatic dawn views of all five snow peaks from Munsiyari" },
  { icon: "🏘️", title: "Darkot Heritage Village", desc: "Ancient Bhotiya village with traditional weaving culture" },
  { icon: "🏞️", title: "Glacier Valley Trek", desc: "Alpine meadows and glacier-fed streams" },
  { icon: "📸", title: "High-altitude Photography", desc: "Cinematic Himalayan landscapes beyond mainstream tourism" },
  { icon: "🍽️", title: "Kumaoni Culture", desc: "Authentic local cuisine, homestays, and mountain hospitality" },
];

const inclusions = [
  "Accommodation on twin-sharing basis",
  "Daily breakfast & dinner",
  "All internal transportation (SUV)",
  "Trekking support staff",
  "Experienced local guide",
  "Sightseeing as per itinerary",
  "Bonfire experiences (weather permitting)",
  "Basic first-aid support",
];

const exclusions = [
  "Airfare / train tickets",
  "Personal trekking gear",
  "Travel insurance (strongly recommended)",
  "Porter charges",
  "Lunches & beverages",
  "Camera or drone permits",
  "Emergency evacuation expenses",
  "GST and applicable taxes",
];

const packing = [
  "Trekking shoes (ankle support)",
  "Thermal clothing (layers)",
  "Waterproof jacket",
  "Gloves & wool cap",
  "Trekking pole",
  "Sunglasses & high-SPF sunscreen",
  "Personal medication",
  "Day backpack (20–30L)",
];

const altitudeChart = [
  { place: "Delhi", alt: "216 m" },
  { place: "Pithoragarh", alt: "1,650 m" },
  { place: "Munsiyari", alt: "2,200 m" },
  { place: "Duktu Village", alt: "2,600 m" },
  { place: "Panchachuli Base Camp Trek", alt: "3,800+ m" },
  { place: "Didihat", alt: "1,725 m" },
];

const seasons = [
  { period: "April – June", experience: "Best season – clear skies, all trails open, wildflowers in bloom" },
  { period: "September – November", experience: "Post-monsoon crystal clarity, peak photography conditions" },
  { period: "December – March", experience: "High passes closed – trek not possible" },
];

export default function PanchachuliExpedition() {
  const [activeDay, setActiveDay] = useState(0);
  const [tab, setTab] = useState("inclusions");

  const gold = "#c9a96e";
  const bg = "#08090b";
  const card = "#0d1014";
  const text = "#e8e0d4";
  const muted = "#7a7068";
  const accent = "#b5a898";

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${bg} 0%, #0c1018 50%, ${bg} 100%)`, color: text, fontFamily: "'Cormorant Garamond', Georgia, serif", overflowX: "hidden" }}>

      {/* HERO */}
      <div style={{
        position: "relative", minHeight: "95vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 0 80px 0",
        background: "linear-gradient(to bottom, rgba(8,9,11,0.2) 0%, rgba(8,9,11,0.55) 55%, rgba(8,9,11,0.97) 100%), url('/images/packages/panchachuli-real.jpg') center/cover no-repeat",
      }}>
        <div className="hero-inner" style={{ maxWidth: 960, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
              <div style={{ height: 1, width: 40, background: gold }} />
              <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: gold }}>
                Premium Trekking Expedition · 8 Nights / 9 Days
              </div>
            </div>
            <h1 style={{ fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 300, lineHeight: 1.05, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
              Panchachuli
            </h1>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", fontWeight: 300, fontStyle: "italic", color: gold, margin: "0 0 20px" }}>
              Base Camp Trek Expedition
            </h2>
            <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", color: accent, fontWeight: 300, margin: "0 0 36px", letterSpacing: "0.06em" }}>
              Munsiyari &nbsp;·&nbsp; Darkot &nbsp;·&nbsp; Duktu &nbsp;·&nbsp; Panchachuli Glacier Region
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["Trekkers", "Mountain Photographers", "Adventure Travelers"].map(tag => (
                <div key={tag} style={{ padding: "8px 18px", border: `1px solid ${gold}55`, borderRadius: 2, fontSize: 12, color: gold, letterSpacing: "0.1em" }}>
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* STATS STRIP */}
      <div style={{ borderTop: "1px solid #ffffff0f", borderBottom: "1px solid #ffffff0f", background: card }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 32px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 24 }}>
          {[
            { label: "Duration", value: "8 Nights / 9 Days" },
            { label: "Max Altitude", value: "3,800+ m" },
            { label: "Group Size", value: "Max 8–10 travelers" },
            { label: "Fitness Level", value: "Moderate to Active" },
            { label: "Trek Style", value: "Offbeat & Immersive" },
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

        {/* OVERVIEW */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 24 }}>The Expedition</div>
          <p style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.45rem)", lineHeight: 1.85, color: accent, fontWeight: 300, maxWidth: 760, marginBottom: 24 }}>
            Embark on one of the most visually dramatic trekking expeditions in the Indian Himalaya through the remote landscapes of Munsiyari and the legendary Panchachuli range in Eastern Kumaon, Uttarakhand.
          </p>
          <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", lineHeight: 1.85, color: muted, fontWeight: 300, maxWidth: 720, marginBottom: 24 }}>
            Named after the five sacred snow peaks believed in local mythology to symbolize the "five cooking hearths of the Pandavas," the Panchachuli massif offers a rare combination of cinematic Himalayan landscapes, glacier-fed valleys, authentic mountain villages, and premium slow-travel experiences far beyond overcrowded trekking circuits.
          </p>
          <div style={{ padding: "20px 28px", borderLeft: `3px solid ${gold}`, background: `${gold}0a`, maxWidth: 640 }}>
            <p style={{ margin: 0, fontSize: "1.05rem", color: accent, fontStyle: "italic", lineHeight: 1.7 }}>
              "Unlike commercial high-volume treks, this expedition focuses on immersive mountain exploration, balanced acclimatization, boutique Himalayan hospitality, and authentic Kumaoni storytelling."
            </p>
          </div>
        </motion.section>

        {/* HIGHLIGHTS */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 36 }}>Signature Highlights</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {highlights.map(h => (
              <div key={h.title} style={{ padding: "24px", background: card, border: "1px solid #ffffff0a", borderTop: `2px solid ${gold}44` }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{h.icon}</div>
                <div style={{ fontSize: "1.1rem", color: text, marginBottom: 8 }}>{h.title}</div>
                <div style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{h.desc}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ITINERARY */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: gold, marginBottom: 40 }}>Day by Day Itinerary</div>
          <div className="resp-itinerary" style={{ gap: 32 }}>
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
            <div style={{ flex: 1, minWidth: 280 }}>
              <motion.div key={activeDay} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                style={{ background: card, border: "1px solid #ffffff0d", padding: "36px", borderRadius: 2 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.2em", color: gold, textTransform: "uppercase", marginBottom: 6 }}>{itinerary[activeDay].day}</div>
                <h3 style={{ fontSize: "1.7rem", fontWeight: 300, margin: "0 0 4px", color: text }}>{itinerary[activeDay].title}</h3>
                <div style={{ fontSize: 13, color: muted, letterSpacing: "0.08em", marginBottom: 20 }}>{itinerary[activeDay].subtitle}</div>
                {itinerary[activeDay].altitude && (
                  <div style={{ display: "inline-block", padding: "3px 10px", background: `${gold}15`, border: `1px solid ${gold}33`, borderRadius: 2, fontSize: 11, color: gold, letterSpacing: "0.1em", marginBottom: 16 }}>
                    ⛰️ {itinerary[activeDay].altitude}
                  </div>
                )}
                {itinerary[activeDay].difficulty && (
                  <div style={{ display: "inline-block", padding: "3px 10px", background: "#1a1208", border: "1px solid #c9a96e55", borderRadius: 2, fontSize: 11, color: gold, letterSpacing: "0.1em", marginBottom: 16, marginLeft: 8 }}>
                    🥾 {itinerary[activeDay].difficulty}
                  </div>
                )}
                <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: accent, marginBottom: 24, fontWeight: 300 }}>{itinerary[activeDay].description}</p>
                {itinerary[activeDay].experiences.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {itinerary[activeDay].experiences.map(exp => (
                      <div key={exp} style={{ padding: "5px 12px", border: `1px solid ${gold}33`, borderRadius: 2, fontSize: 12, color: accent, letterSpacing: "0.05em" }}>{exp}</div>
                    ))}
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
                  <div key={item} style={{ display: "flex", gap: 12, padding: "14px 16px", background: card, border: "1px solid #ffffff09" }}>
                    <span style={{ color: gold, marginTop: 2 }}>✓</span>
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
            {tab === "packing" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 10 }}>
                {packing.map(item => (
                  <div key={item} style={{ display: "flex", gap: 12, padding: "14px 16px", background: card, border: "1px solid #ffffff09" }}>
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
              <div key={s.period} style={{ padding: "28px 24px", background: card, border: "1px solid #ffffff0d", borderTop: `2px solid ${gold}` }}>
                <div style={{ fontSize: "1.1rem", color: text, marginBottom: 10 }}>{s.period}</div>
                <div style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{s.experience}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "16px 20px", background: "#12080a", border: "1px solid #ff444422", borderLeft: "3px solid #ff4444" }}>
            <div style={{ fontSize: 13, color: "#ff8888" }}>⚠️ Trek not possible December – March due to snowfall and trail closures. Plan between April and November only.</div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          style={{ textAlign: "center", padding: "72px 32px", background: card, border: `1px solid ${gold}22`, borderTop: `1px solid ${gold}` }}>
          <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: gold, marginBottom: 20 }}>Begin Your Trek</div>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 300, margin: "0 0 16px", color: text }}>The Five Peaks Are Calling</h2>
          <p style={{ fontSize: "1.1rem", color: muted, margin: "0 auto 40px", maxWidth: 480 }}>
            Limited seasonal departures. Maximum 8–10 travelers per group.
          </p>
          <a href="#contact" style={{
            display: "inline-block", padding: "16px 52px", background: gold, color: bg,
            textDecoration: "none", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
            fontFamily: "inherit", marginBottom: 20,
          }}>
            Enquire Now
          </a>
          <div style={{ fontSize: 12, color: "#3a3028", letterSpacing: "0.08em" }}>
            Pricing on request · Travel insurance recommended · Local expert guides
          </div>
        </motion.section>

      </div>
    </div>
  );
}
