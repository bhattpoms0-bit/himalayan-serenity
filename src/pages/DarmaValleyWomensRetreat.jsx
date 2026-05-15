import { useState } from "react";
import { motion } from "framer-motion";

const itinerary = [
  {
    day: "Day 1",
    title: "Arrival in Pithoragarh",
    subtitle: "Entering the Himalaya Slowly & Comfortably",
    description: "Arriving into stillness. A scenic Himalayan welcome with herbal tea ritual, sunset at Chandak viewpoint, and an opening wellness circle to set the tone for the days ahead.",
    experiences: ["Scenic Himalayan arrival", "Welcome herbal tea ritual", "Chandak sunset viewpoint", "Opening wellness circle"],
    stay: "Pithoragarh",
    theme: "🌸 Arriving Into Stillness",
  },
  {
    day: "Day 2",
    title: "Himalayan Wellness & Forest Healing",
    subtitle: "Yoga · Breathwork · Mindfulness",
    description: "A full day of mindful Himalayan living – sunrise yoga, guided breathwork, forest mindfulness walk, and a journaling workshop. Digital detox afternoon creates space for genuine rest and nervous system renewal.",
    experiences: ["Sunrise yoga session", "Guided breathwork", "Forest mindfulness walk", "Himalayan tea ritual", "Journaling workshop", "Digital detox afternoon"],
    stay: "Pithoragarh",
    theme: "🧘 Forest Healing",
  },
  {
    day: "Day 3",
    title: "Pithoragarh → Dharchula",
    subtitle: "Sacred Himalayan Corridor",
    description: "A scenic drive through the Kali River valley along the Indo-Nepal corridor – one of India's most cinematic mountain roads. Riverside meditation at the Jauljibi confluence, and a bonfire storytelling evening beside the mountain river.",
    experiences: ["Scenic Kali River valley drive", "Jauljibi confluence stop", "Riverside meditation session", "Slow Himalayan exploration", "Bonfire storytelling evening"],
    stay: "Dharchula",
    theme: "🌊 River Meditation",
  },
  {
    day: "Day 4",
    title: "Dharchula → Darma Valley",
    subtitle: "Entering the Hidden Himalaya",
    description: "Disconnect to reconnect. A slow expedition into the remote Darma Valley – glacier-fed river landscapes, Himalayan silence, and ancient village stops through one of Eastern Kumaon's most hidden and beautiful corridors.",
    experiences: ["Scenic valley expedition", "Glacier-fed river landscapes", "Himalayan silence immersion", "Slow village exploration"],
    stay: "Darma Valley Retreat Camp / Boutique Homestay",
    theme: "🏔️ Disconnect to Reconnect",
  },
  {
    day: "Day 5",
    title: "Darma Valley Wellness Retreat",
    subtitle: "Sisterhood · Yoga · Emotional Reset",
    description: "The heart of the retreat. Sunrise yoga, guided meditation, breathwork and grounding exercises, a women's sharing circle, and riverside mindfulness sessions create space for emotional calm, nervous-system reset, and meaningful human connection.",
    experiences: ["Sunrise yoga session", "Guided meditation", "Breathwork & grounding exercises", "Women's sharing circle", "Riverside mindfulness session", "Slow mountain walks"],
    stay: "Darma Valley",
    theme: "💫 Sisterhood Circle",
  },
  {
    day: "Day 6",
    title: "Himalayan Culture & Women's Wisdom",
    subtitle: "Stories · Food · Local Traditions",
    description: "A profound cultural immersion day exploring resilience, wisdom, and community through Himalayan women's traditions. Traditional cooking, interaction with local women, folk songs, and handmade Himalayan cuisine.",
    experiences: ["Traditional Himalayan cooking session", "Interaction with local women", "Cultural storytelling evening", "Folk songs & local traditions", "Handmade Himalayan cuisine"],
    stay: "Darma Valley",
    theme: "🌺 Women's Wisdom",
  },
  {
    day: "Day 7",
    title: "Return to Pithoragarh",
    subtitle: "Gentle Descent Through Kumaon",
    description: "A gentle scenic return through Kumaon – reflection journaling, wellness café evening, and a closing bonfire ceremony to mark the end of the retreat's deepest phase.",
    experiences: ["Scenic return drive", "Reflection journaling", "Wellness café evening", "Closing bonfire ceremony"],
    stay: "Pithoragarh",
    theme: "🔥 Closing Circle",
  },
  {
    day: "Day 8",
    title: "Slow Farewell to the Himalaya",
    subtitle: "Scenic Descent & Departure",
    description: "A mindful farewell – lakeside reflection stop, Himalayan farewell brunch, and departure according to each guest's selected arrival style: flight, train, or private SUV.",
    experiences: ["Scenic Kumaon descent", "Lakeside reflection stop", "Farewell Himalayan brunch", "Flexible departure options"],
    stay: "Overnight journey to Delhi",
    theme: "🌿 Farewell",
  },
  {
    day: "Day 9",
    title: "Arrival in Delhi",
    subtitle: "Retreat Concludes",
    description: "Return to Delhi carrying the stillness of the Himalaya – rested, reconnected, and renewed.",
    experiences: [],
    stay: null,
    theme: null,
  },
];

const arrivalOptions = [
  {
    icon: "✈️",
    title: "Premium Flight",
    route: "Delhi → Naini Saini Airport",
    bestFor: "Luxury travelers, solo professionals, international guests",
    benefit: "Minimal road fatigue, fastest Himalayan access",
  },
  {
    icon: "🚂",
    title: "Train + Mountain Transfer",
    route: "Delhi → Kathgodam → Pithoragarh",
    bestFor: "Wellness travelers, solo women, slow-travel guests",
    benefit: "Safe daytime travel, scenic Himalayan transition",
    recommended: true,
  },
  {
    icon: "🚗",
    title: "Private SUV Expedition",
    route: "Delhi → Pithoragarh direct",
    bestFor: "Private groups, friends traveling together",
    benefit: "Flexible departure timing, personalized experience",
  },
];

const highlights = [
  { icon: "🧘", title: "Daily Yoga & Meditation", desc: "Sunrise sessions in sacred Himalayan landscapes" },
  { icon: "💫", title: "Women's Sharing Circle", desc: "Safe space for connection, reflection, and sisterhood" },
  { icon: "🏔️", title: "Darma Valley Exploration", desc: "One of India's most remote and beautiful Himalayan valleys" },
  { icon: "🌺", title: "Cultural Immersion", desc: "Local women's traditions, folk songs, and Himalayan cooking" },
  { icon: "🌊", title: "Riverside Meditation", desc: "Kali River valley and glacier-fed stream sessions" },
  { icon: "🔥", title: "Bonfire Storytelling", desc: "Evenings of connection under the Himalayan night sky" },
];

const safetyFeatures = [
  "Safe daytime travel only",
  "Women-friendly accommodations",
  "Experienced Himalayan drivers",
  "Small group departures",
  "Dedicated female retreat coordinator",
  "Wellness-focused pacing",
  "Pre-departure support group access",
  "Emergency coordination support",
];

const inclusions = [
  "Women-only departures",
  "Accommodation on twin-sharing basis",
  "Daily breakfast & dinner",
  "Yoga & meditation sessions",
  "Dedicated female retreat coordinator",
  "All internal transportation",
  "Cultural immersion experiences",
  "Wellness activities & reflection sessions",
  "Bonfire evenings (weather permitting)",
  "Flight / train tickets (as per selected arrival option)",
];

const exclusions = [
  "Lunches & beverages",
  "Personal expenses",
  "Camera / drone permits",
  "Travel insurance (strongly recommended)",
  "GST and applicable taxes",
];

const packing = [
  "Comfortable layered clothing",
  "Yoga / wellness wear",
  "Trek / walking shoes",
  "Journal or notebook",
  "Reusable water bottle",
  "Sunscreen & sunglasses",
  "Personal medication",
  "Meditation shawl or wrap",
];

const seasons = [
  { period: "April – June", experience: "Ideal – pleasant weather, valley trails open, wildflowers in bloom" },
  { period: "September – October", experience: "Post-monsoon clarity, golden Himalayan landscapes" },
  { period: "November – March", experience: "Valley roads closed – retreat not available" },
];

export default function DarmaValleyWomensRetreat() {
  const [activeDay, setActiveDay] = useState(0);
  const [tab, setTab] = useState("inclusions");

  const rose = "#c4847a";
  const bg = "#0a0708";
  const card = "#100c0d";
  const text = "#ede8e6";
  const muted = "#7a6868";
  const accent = "#c8b8b4";

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(160deg, ${bg} 0%, #140e10 50%, ${bg} 100%)`, color: text, fontFamily: "'Cormorant Garamond', Georgia, serif", overflowX: "hidden" }}>

      {/* HERO */}
      <div style={{
        position: "relative", minHeight: "95vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 0 80px 0",
        background: "linear-gradient(to bottom, rgba(10,7,8,0.2) 0%, rgba(10,7,8,0.55) 55%, rgba(10,7,8,0.97) 100%), url('/images/packages/darma-valley.jpg') center/cover no-repeat",
      }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 32px", width: "100%" }}>
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: "easeOut" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
              <div style={{ height: 1, width: 40, background: rose }} />
              <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: rose }}>
                Women-Only Himalayan Retreat · 8 Nights / 9 Days
              </div>
            </div>
            <h1 style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)", fontWeight: 300, lineHeight: 1.05, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
              Darma Valley
            </h1>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", fontWeight: 300, fontStyle: "italic", color: rose, margin: "0 0 20px" }}>
              Women's Himalayan Wellness Retreat
            </h2>
            <p style={{ fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)", color: accent, fontWeight: 300, margin: "0 0 24px", letterSpacing: "0.06em" }}>
              Yoga &nbsp;·&nbsp; Wellness &nbsp;·&nbsp; Sacred Himalaya &nbsp;·&nbsp; Slow Travel &nbsp;·&nbsp; Sisterhood
            </p>
            <p style={{ fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)", color: muted, fontWeight: 300, margin: "0 0 36px", maxWidth: 600, lineHeight: 1.7 }}>
              Delhi &nbsp;·&nbsp; Pithoragarh &nbsp;·&nbsp; Dharchula &nbsp;·&nbsp; Darma Valley
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["Women Travelers", "Wellness Seekers", "Solo Women", "Mindful Explorers"].map(tag => (
                <div key={tag} style={{ padding: "8px 18px", border: `1px solid ${rose}55`, borderRadius: 2, fontSize: 12, color: rose, letterSpacing: "0.1em" }}>
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
            { label: "Group", value: "Women Only" },
            { label: "Group Size", value: "Max 8–12 travelers" },
            { label: "Fitness Level", value: "Easy to Moderate" },
            { label: "Style", value: "Wellness & Slow Travel" },
            { label: "Pricing", value: "On Request" },
          ].map(item => (
            <div key={item.label}>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: rose, marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 15, color: text }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "72px 32px" }}>

        {/* OVERVIEW */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: rose, marginBottom: 24 }}>The Retreat</div>
          <p style={{ fontSize: "clamp(1.15rem, 2.4vw, 1.45rem)", lineHeight: 1.85, color: accent, fontWeight: 300, maxWidth: 760, marginBottom: 24 }}>
            The Darma Valley Women's Himalayan Wellness Retreat is a carefully curated women-only journey designed for travelers seeking emotional wellbeing, mindful exploration, safety, meaningful connection, and immersive slow travel in one of India's most untouched mountain regions.
          </p>
          <p style={{ fontSize: "clamp(1rem, 1.8vw, 1.2rem)", lineHeight: 1.85, color: muted, fontWeight: 300, maxWidth: 720, marginBottom: 28 }}>
            Unlike conventional group tours or commercial yoga retreats, this journey has been intentionally designed as a safe, slow, and deeply restorative Himalayan retreat for women – blending yoga, cultural immersion, emotional wellbeing, and cinematic slow travel.
          </p>
          <div style={{ padding: "20px 28px", borderLeft: `3px solid ${rose}`, background: `${rose}0a`, maxWidth: 640 }}>
            <p style={{ margin: 0, fontSize: "1.05rem", color: accent, fontStyle: "italic", lineHeight: 1.7 }}>
              "More than a holiday – a meaningful Himalayan journey centered around wellness, safety, mindfulness, connection, and slow immersive travel."
            </p>
          </div>
        </motion.section>

        {/* HIGHLIGHTS */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: rose, marginBottom: 36 }}>Signature Experiences</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {highlights.map(h => (
              <div key={h.title} style={{ padding: "24px", background: card, border: "1px solid #ffffff0a", borderTop: `2px solid ${rose}44` }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{h.icon}</div>
                <div style={{ fontSize: "1.05rem", color: text, marginBottom: 8 }}>{h.title}</div>
                <div style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{h.desc}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ARRIVAL OPTIONS */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: rose, marginBottom: 36 }}>Arrival Options</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
            {arrivalOptions.map(a => (
              <div key={a.title} style={{ padding: "28px 24px", background: card, border: a.recommended ? `1px solid ${rose}55` : "1px solid #ffffff0a", position: "relative" }}>
                {a.recommended && (
                  <div style={{ position: "absolute", top: -1, right: 20, background: rose, color: bg, fontSize: 10, letterSpacing: "0.15em", padding: "3px 10px", textTransform: "uppercase" }}>
                    Recommended
                  </div>
                )}
                <div style={{ fontSize: 28, marginBottom: 12 }}>{a.icon}</div>
                <div style={{ fontSize: "1.1rem", color: text, marginBottom: 8 }}>{a.title}</div>
                <div style={{ fontSize: 12, color: rose, marginBottom: 12, letterSpacing: "0.05em" }}>{a.route}</div>
                <div style={{ fontSize: 13, color: muted, lineHeight: 1.6, marginBottom: 8 }}>Best for: {a.bestFor}</div>
                <div style={{ fontSize: 12, color: accent, fontStyle: "italic" }}>{a.benefit}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ITINERARY */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: rose, marginBottom: 40 }}>Day by Day Journey</div>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 110 }}>
              {itinerary.map((item, i) => (
                <button key={i} onClick={() => setActiveDay(i)} style={{
                  background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "10px 16px",
                  borderLeft: activeDay === i ? `2px solid ${rose}` : "2px solid #ffffff11",
                  color: activeDay === i ? rose : "#6a5050",
                  fontSize: 13, letterSpacing: "0.08em", transition: "all 0.2s", fontFamily: "inherit",
                }}>
                  {item.day}
                </button>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <motion.div key={activeDay} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
                style={{ background: card, border: "1px solid #ffffff0d", padding: "36px", borderRadius: 2 }}>
                <div style={{ fontSize: 11, letterSpacing: "0.2em", color: rose, textTransform: "uppercase", marginBottom: 6 }}>{itinerary[activeDay].day}</div>
                <h3 style={{ fontSize: "1.7rem", fontWeight: 300, margin: "0 0 4px", color: text }}>{itinerary[activeDay].title}</h3>
                <div style={{ fontSize: 13, color: muted, letterSpacing: "0.08em", marginBottom: 16 }}>{itinerary[activeDay].subtitle}</div>
                {itinerary[activeDay].theme && (
                  <div style={{ display: "inline-block", padding: "3px 12px", background: `${rose}15`, border: `1px solid ${rose}33`, borderRadius: 2, fontSize: 12, color: rose, marginBottom: 16 }}>
                    {itinerary[activeDay].theme}
                  </div>
                )}
                <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: accent, marginBottom: 24, fontWeight: 300 }}>{itinerary[activeDay].description}</p>
                {itinerary[activeDay].experiences.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {itinerary[activeDay].experiences.map(exp => (
                      <div key={exp} style={{ padding: "5px 12px", border: `1px solid ${rose}33`, borderRadius: 2, fontSize: 12, color: accent, letterSpacing: "0.05em" }}>{exp}</div>
                    ))}
                  </div>
                )}
                {itinerary[activeDay].stay && (
                  <div style={{ marginTop: 16, fontSize: 12, color: rose, letterSpacing: "0.1em" }}>🏡 Overnight: {itinerary[activeDay].stay}</div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* SAFETY */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: rose, marginBottom: 32 }}>Women's Safety Commitment</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            {safetyFeatures.map(item => (
              <div key={item} style={{ display: "flex", gap: 12, padding: "16px 18px", background: card, border: "1px solid #ffffff09", borderLeft: `2px solid ${rose}44` }}>
                <span style={{ color: rose, marginTop: 2 }}>🛡️</span>
                <span style={{ fontSize: 14, color: accent, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* INCLUSIONS */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: rose, marginBottom: 32 }}>Retreat Details</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
            {["inclusions", "exclusions", "packing"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: tab === t ? rose : "transparent", border: `1px solid ${rose}55`,
                color: tab === t ? bg : rose, padding: "8px 20px", cursor: "pointer",
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
                    <span style={{ color: rose, marginTop: 2 }}>✓</span>
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
                    <span style={{ color: rose, marginTop: 2 }}>✓</span>
                    <span style={{ fontSize: 14, color: accent, lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.section>

        {/* BEST SEASON */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} style={{ marginBottom: 80 }}>
          <div style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: rose, marginBottom: 32 }}>Best Travel Season</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {seasons.map(s => (
              <div key={s.period} style={{ padding: "28px 24px", background: card, border: "1px solid #ffffff0d", borderTop: `2px solid ${rose}` }}>
                <div style={{ fontSize: "1.1rem", color: text, marginBottom: 10 }}>{s.period}</div>
                <div style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{s.experience}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
          style={{ textAlign: "center", padding: "72px 32px", background: card, border: `1px solid ${rose}22`, borderTop: `1px solid ${rose}` }}>
          <div style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: rose, marginBottom: 20 }}>Begin Your Retreat</div>
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 300, margin: "0 0 16px", color: text }}>The Valley Is Waiting</h2>
          <p style={{ fontSize: "1.1rem", color: muted, margin: "0 auto 40px", maxWidth: 520 }}>
            A rare women-only Himalayan retreat – safe, slow, and deeply restorative. Limited seasonal departures.
          </p>
          <a href="#contact" style={{
            display: "inline-block", padding: "16px 52px", background: rose, color: bg,
            textDecoration: "none", fontSize: 13, letterSpacing: "0.2em", textTransform: "uppercase",
            fontFamily: "inherit", marginBottom: 20,
          }}>
            Enquire Now
          </a>
          <div style={{ fontSize: 12, color: "#3a2828", letterSpacing: "0.08em" }}>
            Women-only departures · Pricing on request · Dedicated female coordinator
          </div>
        </motion.section>

      </div>
    </div>
  );
}
