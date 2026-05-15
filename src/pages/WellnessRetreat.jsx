import { useState } from "react";
import { motion } from "framer-motion";

const itinerary = [
  {
    day: "Day 0",
    title: "Overnight Departure from Delhi",
    subtitle: "Delhi → Kumaon Himalaya",
    description: "Depart from Delhi NCR between 8:00 PM – 10:00 PM for the overnight journey toward the healing forests of Kumaon. Leave the city behind.",
    experiences: ["Private SUV transfer (Ertiga / Scorpio / Premium SUV)", "Overnight mountain approach"],
    stay: null,
  },
  {
    day: "Day 1",
    title: "Arrival in Abbott Mount",
    subtitle: "Forest Silence & Mountain Calm",
    description: "As mist drifts across the pine forests of Abbott Mount, guests unwind within the quiet atmosphere of this forgotten colonial Himalayan retreat. A forest tea experience, sunset ridge meditation, and an evening bonfire under the mountain sky – the retreat begins slowly, as it should.",
    experiences: ["Slow arrival into Kumaon", "Forest tea experience", "Sunset ridge meditation", "Evening bonfire & storytelling", "Pine forest immersion"],
    stay: "Abbott Mount",
    theme: "🌲 Forest Silence",
  },
  {
    day: "Day 2",
    title: "Mayawati Ashram Experience",
    subtitle: "Sacred Stillness & Meditation",
    description: "A deeply peaceful day centered around silence, simplicity, and Himalayan spiritual atmosphere. The Mayawati Ashram – established under Swami Vivekananda's inspiration – offers one of the most serene meditation environments in all of Kumaon. Guided sessions, silent forest walks, and reflection journaling.",
    experiences: ["Guided meditation session", "Silent forest walk", "Himalayan mindfulness practice", "Reflection journaling", "Spiritual atmosphere immersion"],
    stay: "Abbott Mount / Lohaghat Region",
    theme: "🏔️ Sacred Energy",
  },
  {
    day: "Day 3",
    title: "Lohaghat → Jageshwar",
    subtitle: "Eternal Flames & Sacred Forests",
    description: "Journey into the ancient cedar forests of Jageshwar – one of the most spiritually significant temple complexes in the Himalaya. Evening aarti in the forest, temple meditation, and slow sacred exploration help deepen understanding of the relationship between nature and Himalayan spirituality.",
    experiences: ["Temple meditation at Jageshwar", "Sacred cedar forest immersion", "Evening aarti experience", "Slow spiritual exploration", "Cultural storytelling"],
    stay: "Jageshwar / Almora Region",
    theme: "🔥 Eternal Flames",
  },
  {
    day: "Day 4",
    title: "Kasar Devi Wellness Retreat",
    subtitle: "Cosmic Silence & Mountain Views",
    description: "Kasar Devi – historically called the 'Crank's Ridge' – has drawn spiritual seekers, artists, philosophers, writers, and meditators from around the world for decades. A sunrise yoga session, café mindfulness, mountain journaling, and sunset meditation in one of Kumaon's most energetically unique locations.",
    experiences: ["Sunrise yoga session", "Café mindfulness experience", "Mountain journaling session", "Sunset meditation", "Kasar Devi ridge exploration"],
    stay: "Kasar Devi / Almora",
    theme: "🌌 Cosmic Silence",
  },
  {
    day: "Day 5",
    title: "Himalayan Slow Living",
    subtitle: "Wellness Through Simplicity",
    description: "A full day of intentional rest and mindful living. Organic Himalayan meals, local herbal tea tasting, digital detox, and nature journaling create space for mental calm, emotional balance, and conscious presence – the heart of this retreat.",
    experiences: ["Organic Himalayan meals", "Local herbal tea tasting", "Digital detox day", "Nature journaling", "Leisure mountain walks"],
    stay: "Kasar Devi / Almora",
    theme: "🌿 Slow Living",
  },
  {
    day: "Day 6",
    title: "Hidden Kumaon Exploration",
    subtitle: "Slow Travel & Village Connection",
    description: "A gentle day of village interactions, traditional Kumaoni meals, and slow immersive exploration through hidden ridge roads – experiencing the living culture of the mountains as it has existed for centuries.",
    experiences: ["Village interaction", "Traditional Kumaoni meals", "Scenic ridge drives", "Local storytelling", "Slow immersive exploration"],
    stay: "Almora Region",
    theme: "🏘️ Village Life",
  },
  {
    day: "Day 7",
    title: "Almora → Bhimtal → Delhi",
    subtitle: "Gentle Return from the Himalaya",
    description: "A final lakeside stop at the serene Bhimtal, a farewell reflection session, and a mindful Himalayan brunch before the overnight return toward Delhi – carrying the stillness of the mountains inward.",
    experiences: ["Bhimtal lakeside stop", "Farewell reflection session", "Himalayan farewell brunch", "Overnight return to Delhi"],
    stay: "Overnight return to Delhi",
  },
  {
    day: "Day 8",
    title: "Arrival in Delhi",
    subtitle: "Retreat Concludes",
    description: "Return to Delhi NCR – rested, reset, and reconnected. The Himalaya has done its work.",
    experiences: [],
    stay: null,
  },
];

const themes = [
  { icon: "🌲", title: "Forest Silence", desc: "Guided forest walks, mindful breathing, silent nature immersion, pine forest healing environments" },
  { icon: "🏔️", title: "Sacred Himalayan Energy", desc: "Temple meditation, sacred forest exploration, spiritual storytelling, Himalayan mindfulness practices" },
  { icon: "🧘", title: "Slow Living & Inner Reset", desc: "Digital detox, mindful eating, conscious rest, emotional recalibration, reduced screen time" },
];

const highlights = [
  { icon: "🧘", title: "Guided Meditation", desc: "Daily sessions in sacred Himalayan environments" },
  { icon: "🌲", title: "Mayawati Ashram", desc: "Meditation at one of Kumaon's most serene spiritual retreats" },
  { icon: "🛕", title: "Jageshwar Sacred Forest", desc: "Ancient temple complex in eternal cedar forests" },
  { icon: "⭐", title: "Kasar Devi Ridge", desc: "Globally known for unique spiritual and cosmic energy" },
  { icon: "🍵", title: "Herbal Tea & Organic Meals", desc: "Local Kumaoni cuisine and Himalayan wellness foods" },
  { icon: "📵", title: "Digital Detox", desc: "Conscious disconnection for deep rest and renewal" },
];

const inclusions = [
  "Accommodation on twin-sharing basis",
  "Daily breakfast & dinner",
  "Guided meditation sessions",
  "Nature & mindfulness walks",
  "All internal transportation (SUV)",
  "Wellness coordination support",
  "Bonfire experiences (weather permitting)",
];

const exclusions = [
  "Airfare / train tickets",
  "Personal wellness therapies",
  "Yoga mats & personal equipment",
  "Lunches & beverages",
  "Travel insurance",
  "GST and applicable taxes",
];

const packing = [
  "Comfortable layered clothing",
  "Journal or notebook",
  "Meditation shawl or wrap",
  "Trek / walking shoes",
  "Reusable water bottle",
  "Personal wellness essentials",
];

const seasons = [
  { period: "March – June", experience: "Pleasant weather, forest in full bloom, ideal for meditation outdoors" },
  { period: "September – November", experience: "Crystal clarity, cool mountain air, peak mindfulness season" },
  { period: "December – February", experience: "Misty winter forests, deep silence, intimate retreat atmosphere" },
];

const destinations = [
  { place: "Abbott Mount", vibe: "Colonial forest retreat, pine ridge silence", alt: "1,981 m" },
  { place: "Mayawati Ashram", vibe: "Spiritual stillness, sacred meditation", alt: "1,940 m" },
  { place: "Jageshwar", vibe: "Ancient temple, eternal cedar forest", alt: "1,870 m" },
  { place: "Kasar Devi", vibe: "Cosmic ridge, global spiritual destination", alt: "2,116 m" },
  { place: "Almora", vibe: "Mountain culture, café community", alt: "1,638 m" },
  { place: "Bhimtal", vibe: "Lakeside farewell, gentle descent", alt: "1,370 m" },
];

export default function WellnessRetreat() {
  const [activeDay, setActiveDay] = useState(0);
  const [tab, setTab] = useState("inclusions");

  const sage = "#8fad88";
  const gold = "#c9a96e";
  const bg = "#070a08";
  const card = "#0b100c";
  const text = "#e0e8e2";
  const muted = "#6a7868";
  const accent = "#a8c0a4";

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${bg} 0%, #0c140e 50%, ${bg} 100%)`, color: text, fontFamily: "'Cormorant Garamond', Georgia, serif", overflowX: "hidden" }}>

      {/* HERO */}
      <div style={{
        position: "relative", minHeight: "95vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 0 80px 0",
        background: "linear-gradient(to bottom, rgba(7,10,8,0.2) 0%, rgba(7,10,8,0.55) 55%, rgba(7,10,8,0.97) 100%), url('/images/wellness/forest-meditation.jpg') center/cover no-repeat",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px", width: "100%" }}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
              <div style={{ height: 1, width: 40, background: sage }} />
              <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: sage }}>
                Himalayan Wellness Journey · 7 Nights / 8 Days
              </div>
            </div>
            <h1 style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", fontWeight: 300, lineHeight: 1.05, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
              Himalayan Wellness
            </h1>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", fontWeight: 300, fontStyle: "italic", color: sage, margin: "0 0 20px" }}>
              & Meditation Retreat
            </h2>
            <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", color: accent, fontWeight: 300, margin: "0 0 36px", letterSpacing: "0.06em" }}>
              Mayawati &nbsp;·&nbsp; Abbott Mount &nbsp;·&nbsp; Jageshwar &nbsp;·&nbsp; Kasar Devi
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["Wellness Seekers", "Digital Detox", "Spiritual Travelers", "Mindful Explorers"].map(tag => (
                <div key={tag} style={{ padding: "8px 18px", border: `1px solid ${sage}55`, borderRadius: 2, fontSize: 12, color: sage, letterSpacing: "0.1em" }}>
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
            { label: "Duration", value: "7 Nights / 8 Days" },
            { label: "Retreat Style", value: "Slow & Immersive" },
            { label: "Group Size", value: "Max 8–10 travelers" },
            { label: "Fitness Level", value: "Easy" },
            { label: "Digital Detox", value: "Encouraged" },
            { label: "Pricing", value: "On Request" },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: sage, marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 15, color: text }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "72px 32px" }}>

        {/* OVERVIEW */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: sage, marginBottom: 24 }}>The Retreat</div>
          <p style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.45rem)", lineHeight: 1.85, color: accent, fontWeight: 300, maxWidth: 760, marginBottom: 24 }}>
            Reconnect with silence, nature, and inner balance through a carefully curated Himalayan wellness retreat across the spiritual forests and mountain sanctuaries of Kumaon, Uttarakhand.
          </p>
          <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", lineHeight: 1.85, color: muted, fontWeight: 300, maxWidth: 720, marginBottom: 28 }}>
            Unlike commercial wellness resorts, this retreat focuses on authentic Himalayan stillness, emotional reset, spiritual atmosphere, and immersive nature experiences – designed for modern travelers seeking meaningful rest beyond luxury tourism.
          </p>
          <div style={{ padding: "20px 28px", borderLeft: `3px solid ${sage}`, background: `${sage}0a`, maxWidth: 640 }}>
            <p style={{ margin: 0, fontSize: "1.05rem", color: accent, fontStyle: "italic", lineHeight: 1.7 }}>
              "The silence of the mountains is not empty – it is full of answers for those who listen."
            </p>
          </div>
        </motion.section>

        {/* RETREAT THEMES */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: sage, marginBottom: 36 }}>Retreat Themes</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {themes.map(t => (
              <div key={t.title} style={{ padding: "32px 28px", background: card, border: "1px solid #ffffff0a", borderTop: `2px solid ${sage}` }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{t.icon}</div>
                <div style={{ fontSize: "1.2rem", color: text, marginBottom: 12, letterSpacing: "0.02em" }}>{t.title}</div>
                <div style={{ fontSize: 13, color: muted, lineHeight: 1.7 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* GALLERY */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: sage, marginBottom: 32 }}>Journey Highlights</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {[
              { src: "/images/wellness/forest-meditation.jpg",  caption: "Forest Meditation",              span: "2" },
              { src: "/images/wellness/jageshwar-temple.jpg",   caption: "Jageshwar Temple Complex",       span: false },
              { src: "/images/wellness/kasar-devi-temple.jpg",  caption: "Kasar Devi — Cosmic Ridge",      span: false },
              { src: "/images/wellness/kasar-devi-sunset.jpg",  caption: "Sunset from Kasar Devi",         span: false },
              { src: "/images/wellness/cedar-forest.jpg",       caption: "Sacred Cedar Forest",            span: false },
              { src: "/images/wellness/pine-forest.jpg",        caption: "Forest Retreat",                 span: "2" },
              { src: "/images/wellness/bhimtal-lake.jpg",       caption: "Bhimtal Farewell Lake",          span: false },
              { src: "/images/wellness/bhimtal-evening.jpg",    caption: "Bhimtal Evening Reflection",     span: false },
              { src: "/images/wellness/mountain-cafe.jpg",      caption: "Mountain Café Mindfulness",      span: false },
              { src: "/images/wellness/yoga-meditation.jpg",    caption: "Guided Meditation Circle",       span: false },
              { src: "/images/wellness/himalayan-dawn.jpg",     caption: "Himalayan Dawn",                 span: "2" },
              { src: "/images/wellness/above-clouds.jpg",       caption: "Above the Clouds",               span: false },
              { src: "/images/wellness/organic-cuisine.jpg",    caption: "Himalayan Organic Cuisine",      span: false },
              { src: "/images/wellness/mountain-road.jpg",      caption: "Slow Mountain Roads",            span: "2" },
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
                    background: "linear-gradient(to top, rgba(7,10,8,0.92) 0%, rgba(7,10,8,0.3) 60%, transparent 100%)",
                    padding: "28px 16px 14px",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#e0e8e2", letterSpacing: "0.08em", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    {photo.caption}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* HIGHLIGHTS */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: sage, marginBottom: 36 }}>Retreat Highlights</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {highlights.map(h => (
              <div key={h.title} style={{ padding: "24px", background: card, border: "1px solid #ffffff0a", borderLeft: `2px solid ${sage}44` }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{h.icon}</div>
                <div style={{ fontSize: "1.05rem", color: text, marginBottom: 8 }}>{h.title}</div>
                <div style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{h.desc}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ITINERARY */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: sage, marginBottom: 40 }}>Day by Day Journey</div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 110 }}>
              {itinerary.map((item, i) => (
                <button key={i} onClick={() => setActiveDay(i)} style={{
                  background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "10px 16px",
                  borderLeft: activeDay === i ? `2px solid ${sage}` : "2px solid #ffffff11",
                  color: activeDay === i ? sage : "#4a6048",
                  fontSize: 13, letterSpacing: "0.08em", transition: "all 0.2s", fontFamily: "inherit",
                }}>
                  {item.day}
                </button>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <motion.div key={activeDay} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                style={{ background: card, border: "1px solid #ffffff0d", padding: "36px", borderRadius: 2 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.2em", color: sage, textTransform: "uppercase", marginBottom: 6 }}>{itinerary[activeDay].day}</div>
                <h3 style={{ fontSize: "1.7rem", fontWeight: 300, margin: "0 0 4px", color: text }}>{itinerary[activeDay].title}</h3>
                <div style={{ fontSize: 13, color: muted, letterSpacing: "0.08em", marginBottom: 16 }}>{itinerary[activeDay].subtitle}</div>
                {itinerary[activeDay].theme && (
                  <div style={{ display: "inline-block", padding: "3px 12px", background: `${sage}15`, border: `1px solid ${sage}33`, borderRadius: 2, fontSize: 12, color: sage, marginBottom: 16 }}>
                    {itinerary[activeDay].theme}
                  </div>
                )}
                <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: accent, marginBottom: 24, fontWeight: 300 }}>{itinerary[activeDay].description}</p>
                {itinerary[activeDay].experiences.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {itinerary[activeDay].experiences.map(exp => (
                      <div key={exp} style={{ padding: "5px 12px", border: `1px solid ${sage}33`, borderRadius: 2, fontSize: 12, color: accent, letterSpacing: "0.05em" }}>{exp}</div>
                    ))}
                  </div>
                )}
                {itinerary[activeDay].stay && (
                  <div style={{ marginTop: 16, fontSize: 12, color: sage, letterSpacing: "0.1em" }}>🏡 Overnight: {itinerary[activeDay].stay}</div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* DESTINATIONS */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: sage, marginBottom: 32 }}>Retreat Destinations</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {destinations.map((d, i) => (
              <div key={d.place} style={{ display: "grid", gridTemplateColumns: "160px 1fr 80px", alignItems: "center", padding: "16px 20px", background: i % 2 === 0 ? card : "transparent", borderBottom: "1px solid #ffffff08", gap: 16 }}>
                <span style={{ fontSize: 15, color: text }}>{d.place}</span>
                <span style={{ fontSize: 13, color: muted, fontStyle: "italic" }}>{d.vibe}</span>
                <span style={{ fontSize: 12, color: sage, letterSpacing: "0.06em", textAlign: "right" }}>{d.alt}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* INCLUSIONS */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: sage, marginBottom: 32 }}>Retreat Details</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
            {["inclusions", "exclusions", "packing"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: tab === t ? sage : "transparent", border: `1px solid ${sage}55`,
                color: tab === t ? bg : sage, padding: "8px 20px", cursor: "pointer",
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
                    <span style={{ color: sage, marginTop: 2 }}>✓</span>
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
                    <span style={{ color: sage, marginTop: 2 }}>✓</span>
                    <span style={{ fontSize: 14, color: accent, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.section>

        {/* BEST SEASON */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: sage, marginBottom: 32 }}>Best Season for the Retreat</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {seasons.map(s => (
              <div key={s.period} style={{ padding: "28px 24px", background: card, border: "1px solid #ffffff0d", borderTop: `2px solid ${sage}` }}>
                <div style={{ fontSize: "1.1rem", color: text, marginBottom: 10 }}>{s.period}</div>
                <div style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{s.experience}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          style={{ textAlign: "center", padding: "72px 32px", background: card, border: `1px solid ${sage}22`, borderTop: `1px solid ${sage}` }}>
          <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: sage, marginBottom: 20 }}>Begin Your Retreat</div>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 300, margin: "0 0 16px", color: text }}>The Mountains Are Waiting</h2>
          <p style={{ fontSize: "1.1rem", color: muted, margin: "0 auto 40px", maxWidth: 500 }}>
            A slow, immersive journey for those who need to stop – and listen. Limited departures, maximum 8–10 travelers.
          </p>
          <a href="#contact" style={{
            display: "inline-block", padding: "16px 52px", background: sage, color: bg,
            textDecoration: "none", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
            fontFamily: "inherit", marginBottom: 20,
          }}>
            Enquire Now
          </a>
          <div style={{ fontSize: 12, color: "#2a3828", letterSpacing: "0.08em" }}>
            Pricing on request · Digital detox encouraged · Wellness coordination included
          </div>
        </motion.section>

      </div>
    </div>
  );
}
