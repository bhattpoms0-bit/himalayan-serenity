import { useState } from "react";
import { useSEO } from '../hooks/useSEO';

const BASE = "/images/winter-himalayan-wellness-retreat/";

const imgStyle = (h = 220) => ({
  width: "100%", height: h, objectFit: "cover", objectPosition: "center",
  display: "block", transition: "transform 0.4s ease",
});

const WinterHimalayanWellnessRetreat = () => {
  useSEO({
    title: 'Winter Kumaon Tour 2026 | Himalayan Winter Travel Package from Delhi',
    description: '9-day winter Kumaon tour from Delhi and Pithoragarh. Munsiyari snowfall, Abbott Mount, Jageshwar temple winter tour, Kasar Devi. Best winter Uttarakhand travel package 2026.',
  });
  const [activeDay, setActiveDay] = useState(null);
  const [activeTab, setActiveTab] = useState("inclusions");

  const itinerary = [
    {
      day: 1,
      title: "Arrival in Pithoragarh",
      subtitle: "Entering the Winter Himalaya",
      location: "Pithoragarh",
      theme: "Arriving into stillness.",
      experiences: [
        "Scenic Himalayan arrival",
        "Welcome herbal tea ritual",
        "Chandak winter sunset viewpoint",
        "Opening wellness circle",
      ],
      evening: "Settle into the winter Himalayan atmosphere with a calming opening wellness circle.",
      dayImage: "chandak-snowfall-pithoragarh-winter-view.jpg",
      dayImageAlt: "Chandak viewpoint during snowfall, Pithoragarh winter panorama",
    },
    {
      day: 2,
      title: "Pithoragarh → Munsiyari",
      subtitle: "Snow Landscapes & Panchachuli Views",
      location: "Munsiyari",
      theme: null,
      experiences: [
        "Scenic winter mountain drive",
        "Birthi Falls stop",
        "Panchachuli mountain photography",
        "Cozy fireplace evening",
      ],
      evening: "Cozy fireplace evening with views of the Panchachuli massif.",
      dayImage: "panchachuli-snow-view-munsiyari-winter.jpg",
      dayImageAlt: "Panchachuli snow peaks panorama from Munsiyari in winter",
    },
    {
      day: 3,
      title: "Winter Wellness Retreat Day",
      subtitle: "Snow · Silence · Slow Living",
      location: "Munsiyari",
      theme: "Emotional reset through seasonal Himalayan slow living.",
      experiences: [
        "Sunrise mindfulness session",
        "Gentle snow walks",
        "Guided breathwork",
        "Hot Himalayan herbal drinks",
        "Journaling workshop",
        "Bonfire & storytelling evening",
        "Stargazing session (weather permitting)",
      ],
      evening: "Bonfire storytelling and stargazing in the crisp Himalayan night.",
      dayImage: "winter-bonfire-himalayan-cabin-night.jpg",
      dayImageAlt: "Winter bonfire outside a Himalayan cabin at night",
    },
    {
      day: 4,
      title: "Munsiyari → Pithoragarh",
      subtitle: "Return Through Winter Valleys",
      location: "Pithoragarh",
      theme: null,
      experiences: [
        "Scenic snow-route return",
        "Slow photography stops",
        "Himalayan cafe break",
        "Relaxed wellness evening",
      ],
      evening: "A gentle, unhurried return through snow-dusted Himalayan valleys.",
      dayImage: "himalayan-snow-peaks-scenic-winter-view.jpg",
      dayImageAlt: "Scenic Himalayan snow peaks on the winter drive from Munsiyari to Pithoragarh",
    },
    {
      day: 5,
      title: "Pithoragarh → Abbott Mount",
      subtitle: "Foggy Forests & Colonial Winter Charm",
      location: "Abbott Mount",
      theme: "Abbott Mount transforms into a cinematic winter landscape with drifting fog, pine forests, and haunting Himalayan silence.",
      experiences: [
        "Scenic ridge drive",
        "Pine forest mindfulness walk",
        "Colonial ridge exploration",
        "Fireplace storytelling evening",
      ],
      evening: "Fireplace storytelling in the colonial charm of Abbott Mount.",
      dayImage: "himalayan-forest-snowfall-winter-landscape.jpg",
      dayImageAlt: "Himalayan forest during heavy snowfall, atmospheric winter landscape",
    },
    {
      day: 6,
      title: "Abbott Mount → Jageshwar",
      subtitle: "Sacred Winter Forest Experience",
      location: "Jageshwar / Almora",
      theme: "Experiencing Himalayan spirituality within ancient winter forests.",
      experiences: [
        "Cedar forest meditation",
        "Temple exploration",
        "Evening aarti experience",
        "Sacred Himalayan silence",
      ],
      evening: "Evening aarti in the ancient Jageshwar temple complex.",
      dayImage: "jageshwar-temple-snow-winter-uttarakhand.jpg",
      dayImageAlt: "Jageshwar temple complex covered in snow, sacred winter scene in Uttarakhand",
    },
    {
      day: 7,
      title: "Jageshwar → Kasar Devi",
      subtitle: "Conscious Winter Slow Travel",
      location: "Kasar Devi / Almora",
      theme: null,
      experiences: [
        "Scenic winter drive",
        "Cafe mindfulness session",
        "Sunset meditation",
        "Reflection journaling",
      ],
      evening: "Sunset meditation at the mystical Kasar Devi ridge.",
      dayImage: "snow-covered-trees-himalayan-winter.jpg",
      dayImageAlt: "Snow covered trees along the Himalayan road to Kasar Devi in winter",
    },
    {
      day: 8,
      title: "Kasar Devi → Bhimtal",
      subtitle: "Gentle Farewell to the Himalaya",
      location: "Bhimtal / Nainital",
      theme: "Optional extension to Nainital depending on weather and preference.",
      experiences: [
        "Lakeside winter exploration",
        "Slow cafe experience",
        "Farewell brunch",
        "Final reflection session",
      ],
      evening: "A gentle farewell by the lake, reflecting on the journey.",
      dayImage: "nainital-lake-aerial-winter-snowfall-kumaon.jpg",
      dayImageAlt: "Nainital lake aerial view during winter snowfall, Kumaon Himalayas",
    },
    {
      day: 9,
      title: "Departure Toward Delhi",
      subtitle: "Farewell to the Mountains",
      location: "Delhi",
      theme: null,
      experiences: [
        "Kathgodam → Delhi train (Shatabdi)",
        "OR private SUV transfer to Delhi",
      ],
      evening: "Retreat concludes with arrival in Delhi, carrying the stillness of the Himalaya.",
      dayImage: null,
      dayImageAlt: null,
    },
  ];

  const inclusions = [
    "Accommodation on twin-sharing basis",
    "Daily breakfast & dinner",
    "Wellness & mindfulness sessions",
    "All internal transportation",
    "Bonfire / fireplace experiences",
    "Cultural immersion activities",
    "Scenic winter exploration",
    "Retreat coordination support",
    "Herbal winter tea rituals",
    "Guided breathwork & meditation",
    "Journaling sessions",
    "Slow winter walks",
  ];

  const exclusions = [
    "Flight / train tickets",
    "Personal winter gear",
    "Lunches & beverages",
    "Personal wellness therapies",
    "Camera / drone permits",
    "Travel insurance",
    "GST and applicable taxes",
  ];

  const packing = [
    "Thermal layers",
    "Waterproof winter jacket",
    "Wool cap & gloves",
    "Winter trekking shoes",
    "Moisturizer & lip balm",
    "Sunglasses",
    "Personal medication",
  ];

  const wellnessFeatures = [
    { icon: "🍵", label: "Herbal Tea Rituals" },
    { icon: "🧘", label: "Mindfulness Sessions" },
    { icon: "🌬️", label: "Breathwork & Meditation" },
    { icon: "📝", label: "Journaling Workshops" },
    { icon: "🌨️", label: "Snow Walks" },
    { icon: "🔥", label: "Fireplace Evenings" },
    { icon: "🌌", label: "Stargazing" },
    { icon: "🌄", label: "Sunrise Yoga" },
  ];

  const galleryImages = [
    { src: "jageshwar-ancient-temple-snow-kumaon.jpg",         alt: "Ancient Jageshwar temple complex in snow, Kumaon Uttarakhand", span: 1, h: 340 },
    { src: "munsiyari-snowfall-pine-trees-winter.jpg",         alt: "Pine trees under heavy snowfall in Munsiyari winter",          span: 1, h: 340 },
    { src: "himalayan-winter-camp-sunrise-snowfield.jpg",      alt: "Himalayan winter camp at sunrise on a snowfield",              span: 1, h: 340 },
    { src: "snow-covered-trees-himalayan-winter.jpg",          alt: "Snow covered trees lining the Himalayan winter road",          span: 2, h: 280 },
    { src: "chandak-panchachuli-silhouette-winter-view.jpg",   alt: "Panchachuli peaks silhouette seen from Chandak in winter",     span: 1, h: 280 },
  ];

  return (
    <div style={{ backgroundColor: "#0a0e1a", minHeight: "100vh", color: "#e8e0d0", fontFamily: "'Georgia', serif" }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "flex-end",
        overflow: "hidden",
        backgroundColor: "#0a0e1a",
      }}>
        {/* Hero background image */}
        <img
          src={`${BASE}nainital-lake-aerial-winter-snowfall-kumaon.jpg`}
          alt="Nainital lake aerial view during winter snowfall, Kumaon Himalayas"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", zIndex: 0 }}
        />

        {/* Snowflake decorative elements */}
        {[...Array(12)].map((_, i) => (
          <div key={i} style={{
            position: "absolute", zIndex: 2,
            width: i % 3 === 0 ? "6px" : "4px",
            height: i % 3 === 0 ? "6px" : "4px",
            backgroundColor: "rgba(200,220,255,0.5)",
            borderRadius: "50%",
            top: `${10 + (i * 7)}%`,
            left: `${5 + (i * 8)}%`,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
          }} />
        ))}

        {/* Dark gradient overlay */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(to top, rgba(10,14,26,0.97) 0%, rgba(10,14,26,0.6) 55%, rgba(10,14,26,0.25) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(ellipse at 30% 50%, rgba(100,140,200,0.12) 0%, transparent 60%)" }} />

        <div style={{ position: "relative", zIndex: 3, padding: "0 6% 8%", maxWidth: "900px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            backgroundColor: "rgba(100,140,200,0.15)",
            border: "1px solid rgba(100,140,200,0.3)",
            borderRadius: "100px", padding: "6px 16px", marginBottom: "24px",
          }}>
            <span style={{ fontSize: "12px", color: "#8ab4d4", letterSpacing: "3px", textTransform: "uppercase" }}>
              ❄ Wellness Retreat · 8 Nights / 9 Days
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", fontWeight: "400", lineHeight: "1.1", marginBottom: "20px", color: "#f0ece4", letterSpacing: "-0.5px" }}>
            Winter Himalayan<br />
            <span style={{ color: "#8ab4d4", fontStyle: "italic" }}>Wellness Retreat</span>
          </h1>

          <p style={{ fontSize: "1.1rem", color: "#8ab4d4", letterSpacing: "2px", marginBottom: "32px" }}>
            Snow · Silence · Forest Healing · Slow Himalayan Living
          </p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
            {["Pithoragarh", "Munsiyari", "Abbott Mount", "Jageshwar", "Kasar Devi"].map((place) => (
              <span key={place} style={{ backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "100px", padding: "6px 14px", fontSize: "13px", color: "#c8d8e8" }}>{place}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
            {[
              { label: "Duration", value: "8 Nights / 9 Days" },
              { label: "Starting Point", value: "Delhi / Pithoragarh" },
              { label: "Pricing", value: "On Request" },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ fontSize: "11px", color: "#6a8aaa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" }}>{item.label}</div>
                <div style={{ fontSize: "1rem", color: "#e8e0d0", fontWeight: "500" }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); opacity: 0.4; }
            50% { transform: translateY(-15px); opacity: 0.8; }
          }
        `}</style>
      </div>

      {/* ── OVERVIEW ──────────────────────────────────────────────────────── */}
      <div style={{ padding: "100px 6%", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "80px", alignItems: "start" }}>
          <div>
            <p style={{ fontSize: "11px", color: "#6a8aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>About This Retreat</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: "400", lineHeight: "1.3", marginBottom: "24px", color: "#f0ece4" }}>
              Where Stillness Meets the<br />
              <span style={{ color: "#8ab4d4", fontStyle: "italic" }}>Winter Himalaya</span>
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: "1.9", color: "#a0b4c8", marginBottom: "20px" }}>
              The Winter Himalayan Wellness Retreat is a carefully curated slow-travel experience designed for travelers seeking stillness, emotional reset, forest healing, and mindful Himalayan living during the most atmospheric season in the mountains.
            </p>
            <p style={{ fontSize: "1rem", lineHeight: "1.9", color: "#a0b4c8" }}>
              Unlike conventional winter holidays focused only on sightseeing, this retreat blends wellness, snow landscapes, mindfulness, forest immersion, yoga & breathwork, cozy mountain living, and cinematic Himalayan travel into a deeply restorative winter experience.
            </p>
          </div>
          <div>
            <p style={{ fontSize: "11px", color: "#6a8aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "20px" }}>Retreat Philosophy</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { icon: "❄️", text: "Winter stillness & reduced travel fatigue" },
                { icon: "🧘", text: "Mindful pacing & emotional restoration" },
                { icon: "🏔️", text: "Comfort-focused Himalayan experiences" },
                { icon: "🌿", text: "Meaningful slow-travel philosophy" },
                { icon: "🌟", text: "Seasonal Himalayan beauty at its finest" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px 20px", backgroundColor: "rgba(100,140,200,0.06)", border: "1px solid rgba(100,140,200,0.12)", borderRadius: "12px" }}>
                  <span style={{ fontSize: "1.4rem" }}>{item.icon}</span>
                  <span style={{ fontSize: "0.95rem", color: "#c8d8e8" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Overview image pair */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginTop: "60px" }}>
          {[
            { src: "panchachuli-snow-view-munsiyari-winter.jpg",       alt: "Panchachuli snow peaks panorama from Munsiyari in winter" },
            { src: "chandak-panchachuli-silhouette-winter-view.jpg",   alt: "Panchachuli peaks silhouette from Chandak viewpoint in winter" },
          ].map(img => (
            <div key={img.src} style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
              <img
                src={`${BASE}${img.src}`}
                alt={img.alt}
                loading="lazy"
                style={imgStyle(320)}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── SIGNATURE EXPERIENCES ─────────────────────────────────────────── */}
      <div style={{ padding: "80px 6%", background: "rgba(100,140,200,0.04)", borderTop: "1px solid rgba(100,140,200,0.1)", borderBottom: "1px solid rgba(100,140,200,0.1)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", color: "#6a8aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px", textAlign: "center" }}>Signature Experiences</p>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: "400", textAlign: "center", marginBottom: "50px", color: "#f0ece4" }}>
            What Makes This Retreat <span style={{ color: "#8ab4d4", fontStyle: "italic" }}>Unforgettable</span>
          </h2>

          {/* Atmospheric feature image */}
          <div style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.6)", marginBottom: "48px" }}>
            <img
              src={`${BASE}himalayan-winter-camp-sunrise-snowfield.jpg`}
              alt="Himalayan winter camp at sunrise on a pristine snowfield"
              loading="lazy"
              style={imgStyle(400)}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {wellnessFeatures.map((f, i) => (
              <div key={i} style={{ textAlign: "center", padding: "32px 20px", backgroundColor: "rgba(10,14,26,0.6)", border: "1px solid rgba(100,140,200,0.15)", borderRadius: "16px", transition: "all 0.3s ease", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(138,180,212,0.4)"; e.currentTarget.style.backgroundColor = "rgba(100,140,200,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(100,140,200,0.15)"; e.currentTarget.style.backgroundColor = "rgba(10,14,26,0.6)"; }}
              >
                <div style={{ fontSize: "2.2rem", marginBottom: "12px" }}>{f.icon}</div>
                <div style={{ fontSize: "0.9rem", color: "#c8d8e8", lineHeight: "1.4" }}>{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ARRIVAL OPTIONS ───────────────────────────────────────────────── */}
      <div style={{ padding: "100px 6%", maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", color: "#6a8aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Getting Here</p>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: "400", marginBottom: "48px", color: "#f0ece4" }}>
          Arrival & Departure <span style={{ color: "#8ab4d4", fontStyle: "italic" }}>Options</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "40px" }}>
          {[
            { title: "Premium Flight Arrival", route: "Delhi → Naini Saini Airport", ideal: ["Luxury travelers", "Short-duration guests", "Premium wellness travelers"], icon: "✈️" },
            { title: "Private SUV Arrival", route: "Direct Delhi → Pithoragarh", ideal: ["Private groups", "Customized departures", "Flexible road journeys"], icon: "🚗" },
          ].map((opt, i) => (
            <div key={i} style={{ padding: "32px", backgroundColor: "rgba(100,140,200,0.06)", border: "1px solid rgba(100,140,200,0.15)", borderRadius: "16px" }}>
              <div style={{ fontSize: "2rem", marginBottom: "16px" }}>{opt.icon}</div>
              <h3 style={{ fontSize: "1.1rem", color: "#f0ece4", marginBottom: "8px", fontWeight: "500" }}>{opt.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "#8ab4d4", marginBottom: "20px", fontStyle: "italic" }}>{opt.route}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {opt.ideal.map((item, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#a0b4c8" }}>
                    <span style={{ color: "#8ab4d4" }}>✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          <div style={{ padding: "24px 32px", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}>
            <p style={{ fontSize: "11px", color: "#6a8aaa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Departure Option 1 – Recommended</p>
            <p style={{ color: "#c8d8e8", fontSize: "0.95rem" }}>🚂 Kathgodam → Delhi via Shatabdi Express</p>
          </div>
          <div style={{ padding: "24px 32px", backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}>
            <p style={{ fontSize: "11px", color: "#6a8aaa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Departure Option 2</p>
            <p style={{ color: "#c8d8e8", fontSize: "0.95rem" }}>🚗 Private SUV direct road transfer from Kumaon to Delhi</p>
          </div>
        </div>
      </div>

      {/* ── ITINERARY ─────────────────────────────────────────────────────── */}
      <div style={{ padding: "80px 6%", background: "rgba(0,0,0,0.3)", borderTop: "1px solid rgba(100,140,200,0.1)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", color: "#6a8aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Day by Day</p>
          <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: "400", marginBottom: "48px", color: "#f0ece4" }}>
            Detailed <span style={{ color: "#8ab4d4", fontStyle: "italic" }}>Itinerary</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {itinerary.map((day) => (
              <div key={day.day} style={{ border: "1px solid rgba(100,140,200,0.15)", borderRadius: "16px", overflow: "hidden", backgroundColor: activeDay === day.day ? "rgba(100,140,200,0.08)" : "rgba(10,14,26,0.5)", transition: "all 0.3s ease" }}>
                <div onClick={() => setActiveDay(activeDay === day.day ? null : day.day)} style={{ display: "flex", alignItems: "center", gap: "20px", padding: "24px 28px", cursor: "pointer" }}>
                  <div style={{ minWidth: "48px", height: "48px", borderRadius: "50%", backgroundColor: "rgba(138,180,212,0.15)", border: "1px solid rgba(138,180,212,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", color: "#8ab4d4", fontWeight: "600" }}>
                    {String(day.day).padStart(2, "0")}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: "1rem", color: "#f0ece4", marginBottom: "4px", fontWeight: "500" }}>{day.title}</h3>
                    <p style={{ fontSize: "0.85rem", color: "#6a8aaa", fontStyle: "italic" }}>{day.subtitle}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ fontSize: "0.8rem", color: "#6a8aaa" }}>📍 {day.location}</span>
                    <span style={{ color: "#8ab4d4", fontSize: "1.2rem", transition: "transform 0.3s", transform: activeDay === day.day ? "rotate(180deg)" : "rotate(0deg)" }}>›</span>
                  </div>
                </div>

                {activeDay === day.day && (
                  <div style={{ padding: "0 28px 28px 28px", borderTop: "1px solid rgba(100,140,200,0.1)" }}>
                    <div style={{ paddingTop: "24px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "32px" }}>
                      <div>
                        <p style={{ fontSize: "11px", color: "#6a8aaa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px" }}>Experiences</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                          {day.experiences.map((exp, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9rem", color: "#c8d8e8" }}>
                              <span style={{ color: "#8ab4d4", marginTop: "2px" }}>✓</span>
                              {exp}
                            </div>
                          ))}
                        </div>
                      </div>
                      {(day.theme || day.evening) && (
                        <div>
                          {day.theme && (
                            <div style={{ padding: "20px", backgroundColor: "rgba(138,180,212,0.08)", border: "1px solid rgba(138,180,212,0.2)", borderRadius: "12px", marginBottom: "16px" }}>
                              <p style={{ fontSize: "0.9rem", color: "#8ab4d4", fontStyle: "italic", lineHeight: "1.6" }}>"{day.theme}"</p>
                            </div>
                          )}
                          {day.evening && (
                            <div>
                              <p style={{ fontSize: "11px", color: "#6a8aaa", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px" }}>Evening</p>
                              <p style={{ fontSize: "0.9rem", color: "#a0b4c8", lineHeight: "1.6" }}>{day.evening}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    {day.dayImage && (
                      <div style={{ borderRadius: 12, overflow: "hidden", marginTop: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
                        <img
                          src={`${BASE}${day.dayImage}`}
                          alt={day.dayImageAlt}
                          loading="lazy"
                          style={imgStyle(220)}
                          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── VILLAGE & CULTURE ─────────────────────────────────────────────── */}
      <div style={{ padding: "80px 6%", maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", color: "#6a8aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Life in the Winter Himalaya</p>
        <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: "400", marginBottom: "32px", color: "#f0ece4" }}>
          Villages, People & <span style={{ color: "#8ab4d4", fontStyle: "italic" }}>Himalayan Winter Life</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px" }}>
          {[
            { src: "himalayan-village-sunny-winter-day-kumaon.jpg",   alt: "Himalayan village on a clear sunny winter day, Kumaon Uttarakhand" },
            { src: "himalayan-village-snowfall-winter-kumaon.jpg",    alt: "Himalayan village during snowfall in winter, Kumaon" },
            { src: "munsiyari-winter-village-snow-kumaon.jpg",        alt: "Munsiyari winter village covered in snow, Kumaon Himalayas" },
          ].map(img => (
            <div key={img.src} style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 6px 24px rgba(0,0,0,0.5)" }}>
              <img
                src={`${BASE}${img.src}`}
                alt={img.alt}
                loading="lazy"
                style={imgStyle(260)}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── INCLUSIONS / EXCLUSIONS / PACKING ────────────────────────────── */}
      <div style={{ padding: "100px 6%", maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", color: "#6a8aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Package Details</p>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: "400", marginBottom: "40px", color: "#f0ece4" }}>
          What's <span style={{ color: "#8ab4d4", fontStyle: "italic" }}>Included</span>
        </h2>
        <div style={{ display: "flex", gap: "0", marginBottom: "40px", border: "1px solid rgba(100,140,200,0.2)", borderRadius: "12px", overflow: "hidden" }}>
          {["inclusions", "exclusions", "packing"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex: 1, padding: "16px", border: "none", cursor: "pointer", backgroundColor: activeTab === tab ? "rgba(138,180,212,0.2)" : "transparent", color: activeTab === tab ? "#8ab4d4" : "#6a8aaa", fontSize: "0.85rem", letterSpacing: "1.5px", textTransform: "uppercase", borderRight: tab !== "packing" ? "1px solid rgba(100,140,200,0.2)" : "none", transition: "all 0.2s" }}>
              {tab === "inclusions" ? "✓ Included" : tab === "exclusions" ? "✗ Excluded" : "🎒 Packing"}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
          {(activeTab === "inclusions" ? inclusions : activeTab === "exclusions" ? exclusions : packing).map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "16px 20px", backgroundColor: "rgba(100,140,200,0.05)", border: "1px solid rgba(100,140,200,0.1)", borderRadius: "10px", fontSize: "0.9rem", color: "#c8d8e8" }}>
              <span style={{ color: activeTab === "inclusions" ? "#4CAF50" : activeTab === "exclusions" ? "#ef5350" : "#8ab4d4", fontSize: "1rem" }}>
                {activeTab === "inclusions" ? "✓" : activeTab === "exclusions" ? "✗" : "✓"}
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* ── TRANSPORTATION ────────────────────────────────────────────────── */}
      <div style={{ padding: "60px 6%", background: "rgba(0,0,0,0.2)", borderTop: "1px solid rgba(100,140,200,0.1)", borderBottom: "1px solid rgba(100,140,200,0.1)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", color: "#6a8aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "20px" }}>Transportation</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            {["Mahindra Scorpio", "Mahindra Bolero Neo", "Toyota Innova Crysta", "Premium SUV (Private)"].map((v) => (
              <div key={v} style={{ padding: "20px 24px", textAlign: "center", backgroundColor: "rgba(100,140,200,0.06)", border: "1px solid rgba(100,140,200,0.12)", borderRadius: "12px", fontSize: "0.9rem", color: "#c8d8e8" }}>
                🚙 {v}
              </div>
            ))}
          </div>
          <p style={{ marginTop: "20px", fontSize: "0.85rem", color: "#6a8aaa", textAlign: "center" }}>
            All vehicles selected for winter terrain capability · mountain-road safety · passenger comfort
          </p>
        </div>
      </div>

      {/* ── ACCOMMODATION ─────────────────────────────────────────────────── */}
      <div style={{ padding: "80px 6%", maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", color: "#6a8aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Where You'll Stay</p>
        <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: "400", marginBottom: "32px", color: "#f0ece4" }}>
          Handpicked <span style={{ color: "#8ab4d4", fontStyle: "italic" }}>Winter Accommodation</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {[
            { src: "munsiyari-snow-dome-camp-winter-night.jpg",    alt: "Snow dome camp at Munsiyari lit up during a winter night" },
            { src: "munsiyari-winter-himalayan-resort-snow.jpg",   alt: "Himalayan resort in Munsiyari covered in fresh snow in winter" },
          ].map(img => (
            <div key={img.src} style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.55)" }}>
              <img
                src={`${BASE}${img.src}`}
                alt={img.alt}
                loading="lazy"
                style={imgStyle(280)}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── WHY HIMALAYAN SERENITY ────────────────────────────────────────── */}
      <div style={{ padding: "100px 6%", maxWidth: "1200px", margin: "0 auto" }}>
        <p style={{ fontSize: "11px", color: "#6a8aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Why Travel With Us</p>
        <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: "400", marginBottom: "48px", color: "#f0ece4" }}>
          Himalayan <span style={{ color: "#8ab4d4", fontStyle: "italic" }}>Serenity</span> Promise
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {[
            { icon: "🏔️", title: "Local Kumaon Expertise", desc: "Deep knowledge of Eastern Kumaon's hidden landscapes, seasons, and communities." },
            { icon: "🌿", title: "Premium Slow-Travel", desc: "Every itinerary is paced for meaningful experiences, not rushed checklists." },
            { icon: "🔥", title: "Small Immersive Groups", desc: "Intimate departures that prioritize quality over quantity." },
            { icon: "📖", title: "Authentic Storytelling", desc: "Real Himalayan narratives, local voices, and genuine cultural immersion." },
            { icon: "❄️", title: "Winter Operations Expert", desc: "Comfort-focused logistics designed specifically for Himalayan winter travel." },
            { icon: "✨", title: "Handcrafted Journeys", desc: "No two retreats are the same – each one is lovingly curated." },
          ].map((item, i) => (
            <div key={i} style={{ padding: "28px", backgroundColor: "rgba(100,140,200,0.04)", border: "1px solid rgba(100,140,200,0.12)", borderRadius: "16px" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "12px" }}>{item.icon}</div>
              <h3 style={{ fontSize: "0.95rem", color: "#f0ece4", marginBottom: "8px", fontWeight: "500" }}>{item.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "#7a94ac", lineHeight: "1.6" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── EXPEDITION GALLERY ────────────────────────────────────────────── */}
      <div style={{ padding: "80px 6%", background: "rgba(0,0,0,0.2)", borderTop: "1px solid rgba(100,140,200,0.1)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", color: "#6a8aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "12px" }}>Expedition Gallery</p>
          <h2 style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", fontWeight: "400", marginBottom: "32px", color: "#f0ece4" }}>
            The <span style={{ color: "#8ab4d4", fontStyle: "italic" }}>Winter Himalaya</span> in Frames
          </h2>
          <div className="resp-grid-3" style={{ gap: "10px" }}>
            {galleryImages.map(img => (
              <div key={img.src} style={{ gridColumn: `span ${img.span}`, borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.5)" }}>
                <img
                  src={`${BASE}${img.src}`}
                  alt={img.alt}
                  loading="lazy"
                  style={imgStyle(img.h)}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOOKING CTA ───────────────────────────────────────────────────── */}
      <div style={{ padding: "100px 6%", textAlign: "center", background: "linear-gradient(135deg, rgba(100,140,200,0.08) 0%, rgba(10,14,26,0.9) 100%)", borderTop: "1px solid rgba(100,140,200,0.15)" }}>
        <p style={{ fontSize: "11px", color: "#6a8aaa", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>Ready to Begin?</p>
        <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)", fontWeight: "400", marginBottom: "20px", color: "#f0ece4" }}>
          Step Into the <span style={{ color: "#8ab4d4", fontStyle: "italic" }}>Winter Himalaya</span>
        </h2>
        <p style={{ fontSize: "1rem", color: "#7a94ac", marginBottom: "16px", maxWidth: "500px", margin: "0 auto 16px" }}>
          Inquiry & consultation → Arrival option selection → Availability confirmation → Winter travel preparation → Booking confirmation
        </p>
        <div style={{ display: "inline-block", padding: "14px 24px", backgroundColor: "rgba(138,180,212,0.1)", border: "1px solid rgba(138,180,212,0.3)", borderRadius: "12px", marginBottom: "40px", marginTop: "16px" }}>
          <p style={{ fontSize: "0.85rem", color: "#8ab4d4", margin: 0 }}>
            ❄ Pricing on request – depends on snowfall conditions, room category & group size
          </p>
        </div>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginTop: "8px" }}>
          <a href="/contact#consultation" style={{ display: "inline-block", padding: "16px 40px", backgroundColor: "#8ab4d4", color: "#0a0e1a", borderRadius: "100px", textDecoration: "none", fontSize: "0.95rem", fontWeight: "600", letterSpacing: "0.5px", transition: "all 0.3s ease" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#aac8e4"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#8ab4d4"}
          >
            Enquire Now
          </a>
          <a href="https://wa.me/919997845351" style={{ display: "inline-block", padding: "16px 40px", backgroundColor: "transparent", border: "1px solid rgba(138,180,212,0.4)", color: "#8ab4d4", borderRadius: "100px", textDecoration: "none", fontSize: "0.95rem", letterSpacing: "0.5px", transition: "all 0.3s ease" }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(138,180,212,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}
          >
            WhatsApp Us
          </a>
        </div>
      </div>

    </div>
  );
};

export default WinterHimalayanWellnessRetreat;
