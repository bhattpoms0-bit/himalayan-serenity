import { Link } from 'react-router-dom'
import { useSEO } from '../../hooks/useSEO'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function AdiKailashVsKailashMansarovar() {
  useSEO({
    title: 'Adi Kailash vs Kailash Mansarovar: Travel Planning | Himalayan Serenity',
    description: 'Compare Adi Kailash in Uttarakhand with the government-organised Kailash Manasarovar Yatra. The 2026 KMY portal is closed; confirm future rules officially.',
    canonical: 'https://www.himalayanserenitytravel.com/blog/adi-kailash-vs-kailash-mansarovar',
  })

  const faqData = [
    {
        "q": "Is Kailash Mansarovar Yatra open in 2026?",
        "a": "The official KMY portal reports that the 2026 Yatra has been completed and its online portal is closed. Check kmy.gov.in for any future programme announcement; this article does not confirm new registrations or departures."
    },
    {
        "q": "What is the difference between Adi Kailash and Kailash Mansarovar?",
        "a": "Adi Kailash is in Pithoragarh, Uttarakhand, India. Mount Kailash and Lake Manasarovar are in Tibet, China. The government-organised Kailash Manasarovar Yatra is separate from Himalayan Serenity Travel’s Adi Kailash packages, which have their own confirmed joining-point arrangements."
    },
    {
        "q": "Who is eligible for Kailash Mansarovar Yatra?",
        "a": "Consult the current MEA eligibility notice for any announced programme. Do not assume that older age, nationality, passport or OCI conditions certify eligibility for a future Yatra. The 2026 portal is closed."
    },
    {
        "q": "How are yatris selected for Kailash Mansarovar Yatra?",
        "a": "Follow the official selection procedure published for the relevant programme when announced. This page does not certify a future draw, priority rule, notification method or selection outcome."
    },
    {
        "q": "What medical conditions disqualify you from Kailash Mansarovar Yatra?",
        "a": "Use the current official medical criteria and assessment instructions for the relevant programme, and discuss personal health concerns with an appropriate clinician. This comparison is not medical clearance or a definitive disqualification checklist."
    },
    {
        "q": "Is Inner Line Permit required for Adi Kailash?",
        "a": <>Confirm current <Link to="/blog/adi-kailash-ilp-guide-2026" style={{ color: "#c4a050", textDecoration: "none" }}>permit requirements</Link>, the competent authority and the scope of any operator assistance for your exact route and nationality. A package booking does not guarantee permission or access.</>
    },
    {
        "q": "Can foreign nationals do Adi Kailash Yatra?",
        "a": "Foreign nationals and OCI cardholders must obtain current route-specific advice from the competent Indian authorities before booking. Do not assume that permission for Indian travellers, or eligibility for another pilgrimage, applies to the same journey."
    },
    {
        "q": "Where can I apply for Kailash Mansarovar Yatra 2026?",
        "a": "The official KMY portal reports that the 2026 programme is complete and the portal is closed. Use kmy.gov.in for official announcements about any future application window; no current registration is offered by this page."
    }
]


  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar activePage="blog" />
      <article style={{
        paddingTop: 68,
        backgroundColor: "#0a0e1a",
        minHeight: "100vh",
        color: "#e8e0d0",
        fontFamily: "'Georgia', serif",
      }}>

        {/* OFFICIAL SOURCE BANNER */}
        <div style={{
          backgroundColor: "rgba(196,160,80,0.1)",
          borderBottom: "1px solid rgba(196,160,80,0.2)",
          padding: "12px 6%",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "0.85rem", color: "#c4a050", margin: 0 }}>
            ℹ️ Check government-organised Kailash Manasarovar Yatra status at{" "}
            <a href="https://kmy.gov.in" target="_blank" rel="noopener noreferrer"
              style={{ color: "#c4a050", textDecoration: "underline" }}>kmy.gov.in</a>
            {" "}— the official Government of India portal. The 2026 Yatra is complete and its portal is closed; future arrangements require a new official announcement.
          </p>
        </div>

        {/* HERO */}
        <div style={{
          background: "linear-gradient(135deg, #0a0e1a 0%, #1a1200 50%, #0a0e1a 100%)",
          padding: "100px 6% 80px",
          borderBottom: "1px solid rgba(196,160,80,0.2)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 30% 50%, rgba(196,160,80,0.07) 0%, transparent 60%)",
          }} />
          <div style={{ maxWidth: "900px", position: "relative", zIndex: 2 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              backgroundColor: "rgba(196,160,80,0.12)",
              border: "1px solid rgba(196,160,80,0.3)",
              borderRadius: "100px", padding: "6px 16px", marginBottom: "24px",
            }}>
              <span style={{ fontSize: "11px", color: "#c4a050", letterSpacing: "3px", textTransform: "uppercase" }}>
                Pilgrimage Guide · Status and Planning
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(2rem, 5vw, 3.6rem)",
              fontWeight: "400",
              lineHeight: "1.15",
              marginBottom: "24px",
              color: "#f0ece4",
            }}>
              Adi Kailash vs Kailash Mansarovar —<br />
              <span style={{ color: "#c4a050", fontStyle: "italic" }}>
                Understanding the Two Journeys
              </span>
            </h1>

            <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#a09080", maxWidth: "700px", marginBottom: "32px" }}>
              A planning comparison of two sacred Himalayan journeys. Government-organised KMY and company-operated Adi Kailash packages have different arrangements; current access, eligibility and future programme details need separate confirmation.
            </p>

            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              {[
                { icon: "🏔️", text: "Pilgrimage Comparison" },
                { icon: "✓", text: "Confirm Current Requirements" },
                { icon: "⏱️", text: "15 min read" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "#7a6a50" }}>
                  <span>{item.icon}</span><span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 6% 0" }}>
          <img
            src="/images/blog/adi-kailash-vs-mount-kailash-mansarovar-comparison.webp"
            alt="Mount Kailash Tibet vs Adi Kailash Uttarakhand comparison"
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: "clamp(300px, 40vw, 500px)",
              objectFit: "cover",
              borderRadius: "16px",
              display: "block",
            }}
          />
        </div>

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 6%" }}>

          {/* INTRO */}
          <section style={{ marginBottom: "80px" }}>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.9", color: "#c8b898", marginBottom: "20px" }}>
              For millions of Shiva devotees, one pilgrimage stands above all others — the sacred journey to <strong style={{ color: "#c4a050" }}>Kailash</strong>, the divine abode of Lord Shiva. But which Kailash? And which route is right for you?
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.9", color: "#a09080", marginBottom: "20px" }}>
              The government-organised <strong style={{ color: "#c4a050" }}>Kailash Mansarovar Yatra</strong> via Tibet, and the Uttarakhand-based <Link to="/packages/adi-kailash-expedition" style={{ color: "#c4a050", textDecoration: "none" }}>Adi Kailash Yatra</Link> entirely within India are different journeys. The official KMY portal reports that its 2026 programme is complete and the portal is closed. Adi Kailash arrangements must be confirmed separately for the selected package and travel dates.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.9", color: "#a09080" }}>
              Use this comparison for context, then consult the competent authority for regulatory requirements and the operator for the exact Adi Kailash arrangements. Historical programme material does not establish future eligibility or operating status.
            </p>
          </section>

          {/* OFFICIAL INFO BOX */}
          <section style={{ marginBottom: "80px" }}>
            <div style={{
              padding: "32px",
              backgroundColor: "rgba(196,160,80,0.06)",
              border: "1px solid rgba(196,160,80,0.25)",
              borderLeft: "4px solid #c4a050",
              borderRadius: "0 16px 16px 0",
            }}>
              <p style={{ fontSize: "11px", color: "#c4a050", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>
                📋 Official Source — kmy.gov.in
              </p>
              <h3 style={{ fontSize: "1.1rem", color: "#f0ece4", marginBottom: "16px", fontWeight: "400" }}>
                Kailash Manasarovar Yatra — Status and Official Guidance
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  {
                                    "label": "Programme",
                                    "value": "Government-organised Kailash Manasarovar Yatra; separate from our Adi Kailash packages"
                  },
                  {
                                    "label": "Official portal",
                                    "value": "kmy.gov.in"
                  },
                  {
                                    "label": "2026 status",
                                    "value": "Programme completed; online portal closed"
                  },
                  {
                                    "label": "Future eligibility",
                                    "value": "Confirm nationality, age and passport conditions in the relevant MEA notice"
                  },
                  {
                                    "label": "Medical criteria",
                                    "value": "Use the current official assessment instructions; no clearance is provided here"
                  },
                  {
                                    "label": "Selection and dates",
                                    "value": "Await the relevant official announcement; no place or departure is guaranteed"
                  }
].map((item, i) => (
                  <div key={i} style={{
                    padding: "12px 16px",
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderRadius: "8px",
                  }}>
                    <p style={{ fontSize: "0.78rem", color: "#6a5a40", textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 4px" }}>{item.label}</p>
                    <p style={{ fontSize: "0.9rem", color: "#c8b898", margin: 0 }}>{item.value}</p>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.82rem", color: "#5a4a30", fontStyle: "italic", margin: "20px 0 0" }}>
                ⚠️ Information subject to change. Always verify the latest details at kmy.gov.in before planning your Yatra.
              </p>
            </div>
          </section>

          {/* SPIRITUAL SIGNIFICANCE */}
          <section style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: "400", color: "#f0ece4", marginBottom: "24px" }}>
              Spiritual Significance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "24px" }}>
              {[
                {
                  title: "🏔️ Adi Kailash",
                  subtitle: "Chhota Kailash — The Indian Kailash",
                  color: "#c4a050",
                  points: [
                    "Located in Pithoragarh, Uttarakhand, India — entirely within Indian territory",
                    "Revered in ancient scriptures as Chhota Kailash and Baba Kailash",
                    "Believed to be where Lord Shiva meditated — sacred to Shiva devotees",
                    "Om Parvat nearby — a peak where snow naturally forms the sacred Om symbol (ॐ)",
                    "Parvati Sarovar — a sacred lake at the base of Adi Kailash",
                    "Ancient Shiva temple at Jolingkong at the foot of the peak",
                    "Associated with the Pandavas' final Himalayan journey in the Mahabharata",
                    "Accessible via Inner Line Permit — open to eligible visitors",
                  ]
                },
                {
                  title: "🏔️ Kailash Mansarovar",
                  subtitle: "The Supreme Abode of Lord Shiva",
                  color: "#8ab4d4",
                  points: [
                    "Mount Kailash (6,638m) located in Tibet Autonomous Region, China",
                    "Widely revered as the primary abode of Lord Shiva in Hindu scripture",
                    "Lake Mansarovar — one of the holiest lakes in Hinduism, Buddhism, and Jainism",
                    "Kailash Kora — a 52km sacred circumambulation around Mount Kailash",
                    "Sacred across four religions — Hinduism, Buddhism, Jainism, and Bon",
                    "Organized officially by Ministry of External Affairs, Government of India",
                    "Never been climbed — protected for its sanctity",
                    "One of Asia's highest freshwater lakes nearby",
                  ]
                }
              ].map((card, i) => (
                <div key={i} style={{
                  padding: "32px",
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: `1px solid ${card.color}25`,
                  borderTop: `3px solid ${card.color}`,
                  borderRadius: "16px",
                }}>
                  <h3 style={{ fontSize: "1.15rem", color: card.color, marginBottom: "4px", fontWeight: "500" }}>{card.title}</h3>
                  <p style={{ fontSize: "0.82rem", color: "#5a4a30", marginBottom: "20px", fontStyle: "italic" }}>{card.subtitle}</p>
                  {card.points.map((point, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px", fontSize: "0.88rem", color: "#a09080" }}>
                      <span style={{ color: card.color, marginTop: "3px", flexShrink: 0 }}>✓</span>
                      {point}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* OM PARVAT */}
          <section style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: "400", color: "#f0ece4", marginBottom: "24px" }}>
              The Unique Gift of Adi Kailash — Om Parvat
            </h2>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.9", color: "#a09080", marginBottom: "20px" }}>
              One experience is unique to Adi Kailash and found nowhere else in the world of pilgrimage — <strong style={{ color: "#c4a050" }}>Om Parvat darshan</strong>.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.9", color: "#a09080", marginBottom: "20px" }}>
              Om Parvat is a sacred peak near Adi Kailash where the eternal symbol <strong style={{ color: "#c4a050" }}>ॐ (Om)</strong> appears naturally formed by snow on the mountain face. This is not painted or carved — it is a naturally occurring phenomenon on the snow-covered peak, visible from the Nabidang viewpoint.
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.9", color: "#a09080" }}>
              Om Parvat is associated with a natural formation resembling the sacred Om symbol. Whether a journey includes its viewpoint depends on the specific route, programme and current conditions; it should not be assumed from the pilgrimage name alone.
            </p>
          </section>

          {/* KEY DIFFERENCES TABLE */}
          <section style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: "400", color: "#f0ece4", marginBottom: "16px" }}>
              Key Differences at a Glance
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#5a4a30", fontStyle: "italic", marginBottom: "28px" }}>
              * Confirm government programme requirements at kmy.gov.in and Adi Kailash package arrangements with the operator. Neither column is a guarantee of access or availability.
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "rgba(196,160,80,0.1)", borderBottom: "2px solid rgba(196,160,80,0.3)" }}>
                    <th style={{ padding: "14px 18px", textAlign: "left", color: "#7a6a50", fontWeight: "500" }}>Factor</th>
                    <th style={{ padding: "14px 18px", textAlign: "left", color: "#c4a050", fontWeight: "500" }}>🏔️ Adi Kailash</th>
                    <th style={{ padding: "14px 18px", textAlign: "left", color: "#8ab4d4", fontWeight: "500" }}>🏔️ Kailash Mansarovar</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                  {
                                    "factor": "Location",
                                    "adi": "Pithoragarh, Uttarakhand, India",
                                    "kmy": "Mount Kailash and Lake Manasarovar in Tibet, China"
                  },
                  {
                                    "factor": "2026 programme status",
                                    "adi": "Confirm current access and arrangements for your travel dates",
                                    "kmy": "Official portal reports programme complete; portal closed"
                  },
                  {
                                    "factor": "Nationality and passport",
                                    "adi": "Confirm route-specific eligibility and identity requirements with the competent authority",
                                    "kmy": "Consult the applicable MEA notice; older rules do not certify future eligibility"
                  },
                  {
                                    "factor": "Foreign nationals / OCI",
                                    "adi": "Obtain current advice before booking; access is not assumed",
                                    "kmy": "Confirm any future programme’s nationality rules officially"
                  },
                  {
                                    "factor": "Medical requirements",
                                    "adi": "Confirm documentation and suitability for your specific itinerary",
                                    "kmy": "Follow the official medical criteria and assessment for the relevant programme"
                  },
                  {
                                    "factor": "Booking or selection",
                                    "adi": "Confirm the chosen company package; booking is not permit approval",
                                    "kmy": "Follow the procedure in the relevant official announcement"
                  },
                  {
                                    "factor": "Permissions",
                                    "adi": "Confirm the competent authority, route, validity and required documents",
                                    "kmy": "Use official programme instructions for international travel documentation"
                  },
                  {
                                    "factor": "Duration",
                                    "adi": "Owner-advised options: 3 days from Pithoragarh; 5 days / 4 nights from Kathgodam or Delhi. Obtain the matching itinerary.",
                                    "kmy": "Confirm the duration in the relevant official programme"
                  },
                  {
                                    "factor": "Om Parvat viewpoint",
                                    "adi": "Check the selected itinerary and current access conditions",
                                    "kmy": "Depends on the official route and programme; do not assume inclusion or exclusion"
                  },
                  {
                                    "factor": "Difficulty",
                                    "adi": "Assess the actual route and personal suitability before booking",
                                    "kmy": "High-altitude journey; follow official preparation and medical instructions"
                  },
                  {
                                    "factor": "Information source",
                                    "adi": "Himalayan Serenity Travel for package arrangements; authorities for permissions",
                                    "kmy": "kmy.gov.in for the government-organised programme"
                  }
].map((row, i) => (
                    <tr key={i} style={{
                      borderBottom: "1px solid rgba(196,160,80,0.08)",
                      backgroundColor: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent"
                    }}>
                      <td style={{ padding: "14px 18px", color: "#6a5a40", fontWeight: "500", fontSize: "0.85rem" }}>{row.factor}</td>
                      <td style={{ padding: "14px 18px", color: "#c8b898", fontSize: "0.88rem", lineHeight: "1.5" }}>{row.adi}</td>
                      <td style={{ padding: "14px 18px", color: "#8ab4d4", fontSize: "0.88rem", lineHeight: "1.5" }}>{row.kmy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "0.82rem", color: "#5a4a30", marginTop: "12px", fontStyle: "italic" }}>
              ⚠️ Information subject to change — verify at kmy.gov.in before planning your Kailash Mansarovar Yatra.
            </p>
          </section>

          {/* ELIGIBILITY - KMY */}
          <section style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: "400", color: "#f0ece4", marginBottom: "24px" }}>
              Kailash Manasarovar — Eligibility to Confirm
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#5a4a30", fontStyle: "italic", marginBottom: "28px" }}>
              Source: kmy.gov.in — Ministry of External Affairs, Government of India
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              {[
                  "Check the relevant official announcement before assuming that applications are open.",
                  "Confirm nationality and OCI eligibility, age criteria and passport type and validity requirements.",
                  "Read the current medical criteria, required examinations and reporting instructions; this page is not medical clearance.",
                  "Confirm any selection priorities, repeat-traveller rules, charges and cancellation terms in that programme’s official material.",
                  "The 2026 portal is closed; historical eligibility conditions do not establish a future programme’s rules."
].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: "14px",
                  padding: "16px 20px",
                  backgroundColor: "rgba(196,160,80,0.04)",
                  border: "1px solid rgba(196,160,80,0.1)",
                  borderRadius: "10px",
                  fontSize: "0.92rem", color: "#a09080", lineHeight: "1.6",
                }}>
                  <span style={{ color: "#c4a050", marginTop: "2px", flexShrink: 0 }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
            <div style={{
              padding: "20px 24px",
              backgroundColor: "rgba(239,83,80,0.06)",
              border: "1px solid rgba(239,83,80,0.2)",
              borderRadius: "12px",
            }}>
              <p style={{ fontSize: "0.9rem", color: "#ef5350", margin: 0 }}>
                ⚠️ Medical decisions, participation conditions and refund rules must be checked in the applicable official programme documents. No medical acceptance, selection outcome or refund entitlement is promised here.
              </p>
            </div>
          </section>

          {/* SELECTION PROCESS */}
          <section style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: "400", color: "#f0ece4", marginBottom: "24px" }}>
              How Kailash Mansarovar Yatris Are Selected
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#5a4a30", fontStyle: "italic", marginBottom: "28px" }}>
              Confirm the applicable selection process in the official programme announcement at kmy.gov.in
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                  {
                                    "step": "01",
                                    "title": "Check programme status",
                                    "desc": "The official portal reports that the 2026 programme is complete and closed. Look for an official announcement before planning an application."
                  },
                  {
                                    "step": "02",
                                    "title": "Read the applicable instructions",
                                    "desc": "Confirm eligibility, passport and medical requirements, selection method and any participation conditions for that specific programme."
                  },
                  {
                                    "step": "03",
                                    "title": "Use official channels",
                                    "desc": "Follow only the application, payment and notification instructions confirmed in the relevant official material. This page offers no KMY registration."
                  },
                  {
                                    "step": "04",
                                    "title": "Confirm before making arrangements",
                                    "desc": "Selection, medical acceptance, permissions and departure arrangements must be established through official channels; no outcome is guaranteed."
                  }
].map((item, i) => (
                <div key={i} style={{
                  display: "flex", gap: "20px", alignItems: "flex-start",
                  padding: "24px",
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(196,160,80,0.1)",
                  borderRadius: "14px",
                }}>
                  <div style={{
                    minWidth: "48px", height: "48px", borderRadius: "50%",
                    backgroundColor: "rgba(196,160,80,0.12)",
                    border: "1px solid rgba(196,160,80,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.85rem", color: "#c4a050", fontWeight: "600", flexShrink: 0,
                  }}>{item.step}</div>
                  <div>
                    <h3 style={{ fontSize: "1rem", color: "#f0ece4", marginBottom: "8px", fontWeight: "500" }}>{item.title}</h3>
                    <p style={{ fontSize: "0.9rem", color: "#a09080", lineHeight: "1.7", margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* WHO SHOULD CHOOSE */}
          <section style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: "400", color: "#f0ece4", marginBottom: "32px" }}>
              Which Pilgrimage is Right for You?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "24px" }}>
              {[
                  {
                                    "title": "Consider an Adi Kailash journey if you...",
                                    "color": "#c4a050",
                                    "points": [
                                                      "Want to explore a pilgrimage in Kumaon, Uttarakhand, India",
                                                      "Wish to discuss an owner-advised joining-point option with Himalayan Serenity Travel",
                                                      "Will obtain a matching day-wise itinerary before booking",
                                                      "Will confirm route-specific permissions and personal suitability separately",
                                                      "Understand that mountain views and access depend on conditions"
                                    ]
                  },
                  {
                                    "title": "Consider future government-organised KMY if you...",
                                    "color": "#8ab4d4",
                                    "points": [
                                                      "Want to understand the international pilgrimage to Mount Kailash and Lake Manasarovar",
                                                      "Will wait for and read an applicable official programme announcement",
                                                      "Will confirm nationality, passport, selection and medical requirements officially",
                                                      "Understand that the 2026 programme has completed and its portal is closed",
                                                      "Will distinguish MEA programme arrangements from company-operated Adi Kailash packages"
                                    ]
                  }
].map((card, i) => (
                <div key={i} style={{
                  padding: "32px",
                  backgroundColor: "rgba(255,255,255,0.02)",
                  border: `1px solid ${card.color}25`,
                  borderTop: `3px solid ${card.color}`,
                  borderRadius: "16px",
                }}>
                  <h3 style={{ fontSize: "0.9rem", color: card.color, marginBottom: "24px", fontWeight: "500", textTransform: "uppercase", letterSpacing: "1px" }}>{card.title}</h3>
                  {card.points.map((point, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px", fontSize: "0.88rem", color: "#a09080" }}>
                      <span style={{ color: card.color, marginTop: "3px", flexShrink: 0 }}>✓</span>
                      {point}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: "400", color: "#f0ece4", marginBottom: "12px" }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#5a4a30", fontStyle: "italic", marginBottom: "32px" }}>
              The official portal provides government programme announcements. These answers identify what still needs confirmation and do not certify future rules.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {faqData.map((faq, i) => (
                <div key={i} style={{
                  padding: "28px",
                  backgroundColor: "rgba(196,160,80,0.04)",
                  border: "1px solid rgba(196,160,80,0.12)",
                  borderRadius: "12px",
                }}>
                  <h3 style={{ fontSize: "1rem", color: "#c4a050", marginBottom: "12px", fontWeight: "500", lineHeight: "1.4" }}>
                    Q: {faq.q}
                  </h3>
                  <p style={{ fontSize: "0.93rem", color: "#a09080", lineHeight: "1.7", margin: 0 }}>
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* DISCLAIMER */}
          <section style={{ marginBottom: "80px" }}>
            <div style={{
              padding: "28px 32px",
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
            }}>
              <p style={{ fontSize: "11px", color: "#5a4a30", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px" }}>Important Disclaimer</p>
              <p style={{ fontSize: "0.88rem", color: "#5a4a30", lineHeight: "1.7", margin: 0 }}>
                Consult <strong style={{ color: "#6a5a40" }}>kmy.gov.in</strong>, the official Ministry of External Affairs portal, for government programme information. Its 2026 closure notice does not establish a future programme’s dates, eligibility or fees. Himalayan Serenity Travel is not affiliated with the Government of India's Kailash Mansarovar Yatra program. Always verify the latest eligibility criteria, dates, fees, and process at <strong style={{ color: "#6a5a40" }}>kmy.gov.in</strong> before making any plans. For Adi Kailash Yatra inquiries, contact our team directly.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section style={{
            padding: "60px 40px",
            background: "linear-gradient(135deg, rgba(196,160,80,0.08) 0%, rgba(10,14,26,0.9) 100%)",
            border: "1px solid rgba(196,160,80,0.2)",
            borderRadius: "24px",
            textAlign: "center",
          }}>
            <p style={{ fontSize: "11px", color: "#c4a050", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "16px" }}>
              Begin Your Sacred Journey
            </p>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: "400", color: "#f0ece4", marginBottom: "16px" }}>
              Book Your Adi Kailash Yatra with Himalayan Serenity
            </h2>
            <p style={{ fontSize: "0.95rem", color: "#7a6a50", maxWidth: "520px", margin: "0 auto 32px", lineHeight: "1.7" }}>
              Ask about Adi Kailash joining points, the matching itinerary, accommodation, transport and permit assistance for your chosen option. Regulatory permission and access remain subject to the competent authority and current conditions.
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/contact#consultation" style={{
                display: "inline-block", padding: "16px 40px",
                backgroundColor: "#c4a050", color: "#0a0e1a",
                borderRadius: "100px", textDecoration: "none",
                fontSize: "0.95rem", fontWeight: "600",
              }}>
                Book Consultation
              </a>
              <a href="https://wa.me/919084642557" style={{
                display: "inline-block", padding: "16px 40px",
                backgroundColor: "transparent",
                border: "1px solid rgba(196,160,80,0.4)",
                color: "#c4a050",
                borderRadius: "100px", textDecoration: "none",
                fontSize: "0.95rem",
              }}>
                WhatsApp +91 90846 42557
              </a>
            </div>
            <p style={{ fontSize: "0.8rem", color: "#4a3a20", marginTop: "20px" }}>
              For Kailash Mansarovar Yatra organized by Government of India, visit{" "}
              <a href="https://kmy.gov.in" target="_blank" rel="noopener noreferrer"
                style={{ color: "#5a4a30", textDecoration: "underline" }}>kmy.gov.in</a>
            </p>
          </section>

        </div>
      </article>
      <Footer />
    </div>
  )
}
