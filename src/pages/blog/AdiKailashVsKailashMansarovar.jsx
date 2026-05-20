import { useSEO } from '../../hooks/useSEO'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function AdiKailashVsKailashMansarovar() {
  useSEO({
    title: 'Adi Kailash vs Kailash Mansarovar 2026 | Complete Verified Guide',
    description: 'Honest comparison of Adi Kailash Yatra and Kailash Mansarovar Yatra 2026. Official eligibility, selection process, Om Parvat darshan, and which sacred pilgrimage is right for you. KMY facts verified from kmy.gov.in.',
  })

  const faqData = [
    {
      q: "Is Kailash Mansarovar Yatra open in 2026?",
      a: "Yes. Kailash Mansarovar Yatra 2026 is open and organized by the Ministry of External Affairs, Government of India. The registration portal is kmy.gov.in. Please verify current status and dates directly at kmy.gov.in as information is subject to change."
    },
    {
      q: "What is the difference between Adi Kailash and Kailash Mansarovar?",
      a: "Kailash Mansarovar (Mount Kailash, 6,638m) is located in Tibet, China, and is organized as an international pilgrimage by the Ministry of External Affairs. Adi Kailash (6,191m) is located entirely within India in Pithoragarh, Uttarakhand, and is accessible to all Indian and foreign nationals with an Inner Line Permit."
    },
    {
      q: "Who is eligible for Kailash Mansarovar Yatra?",
      a: "As per kmy.gov.in: Must be a citizen of India, hold a valid Indian passport (minimum 6 months validity as on 1st September of current year), age between 18 and 70 years as on 01 January of current year, BMI of 25 or less, physically fit and medically healthy. Foreign nationals and OCI cardholders are not eligible."
    },
    {
      q: "How are yatris selected for Kailash Mansarovar Yatra?",
      a: "As per kmy.gov.in: Yatris are selected through a fair computer-generated, random, gender-balanced draw of lots conducted by the Ministry of External Affairs. Selected applicants are informed via registered email and mobile number."
    },
    {
      q: "What medical conditions disqualify you from Kailash Mansarovar Yatra?",
      a: "As per kmy.gov.in: Applicants should not suffer from high blood pressure, diabetes, asthma, heart disease, epilepsy, or similar conditions. Selected yatris must pass medical examinations conducted by Delhi Heart and Lung Institute (DHLI) and ITBP Base Hospital in New Delhi."
    },
    {
      q: "Is Inner Line Permit required for Adi Kailash?",
      a: "Yes. Inner Line Permit (ILP) is mandatory for Adi Kailash Yatra as it falls in the restricted border zone of Pithoragarh, Uttarakhand. It can be obtained from the District Magistrate office in Pithoragarh or Dharchula. When you book with Himalayan Serenity, we handle your ILP process."
    },
    {
      q: "Can foreign nationals do Adi Kailash Yatra?",
      a: "Foreign nationals are not eligible for the government-organized Kailash Mansarovar Yatra as per kmy.gov.in. However, Adi Kailash in Uttarakhand may be accessible to foreign nationals with appropriate permits — please check current regulations with the relevant authorities before planning."
    },
    {
      q: "Where can I apply for Kailash Mansarovar Yatra 2026?",
      a: "The official application portal is kmy.gov.in, operated by the Ministry of External Affairs, Government of India. Always use the official government portal and verify all information there. Do not rely on third-party websites for registration."
    },
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
            ℹ️ Kailash Mansarovar Yatra information in this article is sourced directly from{" "}
            <a href="https://kmy.gov.in" target="_blank" rel="noopener noreferrer"
              style={{ color: "#c4a050", textDecoration: "underline" }}>kmy.gov.in</a>
            {" "}— the official Government of India portal. Always verify at kmy.gov.in before planning.
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
                Pilgrimage Guide · 2026 · Verified Facts Only
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
                Which Should You Choose in 2026?
              </span>
            </h1>

            <p style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "#a09080", maxWidth: "700px", marginBottom: "32px" }}>
              A complete, honest comparison of two of India's most sacred Himalayan pilgrimages — their spiritual significance, eligibility, process, difficulty, and which one is right for you. All Kailash Mansarovar facts verified directly from kmy.gov.in.
            </p>

            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              {[
                { icon: "🏔️", text: "Pilgrimage Comparison" },
                { icon: "✓", text: "Verified Facts Only" },
                { icon: "⏱️", text: "15 min read" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "#7a6a50" }}>
                  <span>{item.icon}</span><span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "80px 6%" }}>

          {/* INTRO */}
          <section style={{ marginBottom: "80px" }}>
            <p style={{ fontSize: "1.1rem", lineHeight: "1.9", color: "#c8b898", marginBottom: "20px" }}>
              For millions of Shiva devotees, one pilgrimage stands above all others — the sacred journey to <strong style={{ color: "#c4a050" }}>Kailash</strong>, the divine abode of Lord Shiva. But which Kailash? And which route is right for you?
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.9", color: "#a09080", marginBottom: "20px" }}>
              In 2026, two sacred Kailash pilgrimages are available to devotees — the government-organized <strong style={{ color: "#c4a050" }}>Kailash Mansarovar Yatra</strong> via Tibet, and the Uttarakhand-based <strong style={{ color: "#c4a050" }}>Adi Kailash Yatra</strong> entirely within India. Both are open. Both are deeply sacred. The question is — which is right for you?
            </p>
            <p style={{ fontSize: "1.05rem", lineHeight: "1.9", color: "#a09080" }}>
              In this guide, we have laid out the facts clearly and honestly — using only information verified from official government sources — so you can make the right decision for your sacred journey.
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
                Kailash Mansarovar Yatra 2026 — Key Official Facts
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                {[
                  { label: "Organized by", value: "Ministry of External Affairs, Govt of India" },
                  { label: "Official Portal", value: "kmy.gov.in" },
                  { label: "Routes", value: "Lipulekh Pass (Uttarakhand) & Nathu La (Sikkim)" },
                  { label: "Eligibility", value: "Indian citizens only, age 18–70 years" },
                  { label: "Passport", value: "Valid Indian passport, min 6 months validity" },
                  { label: "BMI Requirement", value: "BMI of 25 or less" },
                  { label: "Medical Test", value: "Mandatory — DHLI & ITBP Base Hospital, Delhi" },
                  { label: "Selection", value: "Computer-generated random draw of lots" },
                  { label: "Foreign Nationals", value: "Not eligible (including OCI cardholders)" },
                  { label: "End Points", value: "Dharchula/Delhi (Lipulekh) · Gangtok/Delhi (Nathu La)" },
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
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
              Pilgrims who have experienced Om Parvat darshan describe the moment as deeply moving — standing on Indian soil, beholding Lord Shiva's own symbol written by nature on a Himalayan peak. This experience is not available on the Kailash Mansarovar route.
            </p>
          </section>

          {/* KEY DIFFERENCES TABLE */}
          <section style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: "400", color: "#f0ece4", marginBottom: "16px" }}>
              Key Differences at a Glance
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#5a4a30", fontStyle: "italic", marginBottom: "28px" }}>
              * Kailash Mansarovar column based on information from kmy.gov.in. Adi Kailash information based on our local expertise in Pithoragarh. Verify all details before planning.
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
                    { factor: "Location", adi: "Pithoragarh, Uttarakhand, India", kmy: "Tibet, China (international journey)" },
                    { factor: "Status 2026", adi: "✓ Open — available year-round (season May–Oct)", kmy: "✓ Open — organized by MEA, June to August" },
                    { factor: "Who Can Go", adi: "Indian nationals + check ILP rules for foreigners", kmy: "Indian citizens only (18–70 yrs, valid passport)" },
                    { factor: "OCI / Foreign", adi: "Check current ILP regulations", kmy: "✗ Not eligible (per kmy.gov.in)" },
                    { factor: "Medical Requirement", adi: "Reasonable fitness — moderate difficulty", kmy: "Mandatory medical exam at DHLI & ITBP, Delhi. BMI ≤ 25. No BP, diabetes, heart disease, asthma, epilepsy" },
                    { factor: "Selection Process", adi: "Direct booking — no draw required", kmy: "Computer-generated random draw of lots by MEA" },
                    { factor: "Permit Required", adi: "Inner Line Permit (ILP) — obtainable in India", kmy: "Chinese visa + Tibet Travel Permit (arranged by MEA)" },
                    { factor: "Duration", adi: "7 to 12 days from Delhi", kmy: "Approx 21–22 days (verify at kmy.gov.in)" },
                    { factor: "Om Parvat Darshan", adi: "✓ Yes — unique natural Om symbol on snow", kmy: "✗ Not on this route" },
                    { factor: "Difficulty", adi: "Moderate — accessible to most pilgrims", kmy: "Strenuous — high altitude, 52km Kora trek" },
                    { factor: "Official Portal", adi: "Book via Himalayan Serenity Travel", kmy: "kmy.gov.in (Government of India)" },
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
              Kailash Mansarovar Eligibility — Official Checklist
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#5a4a30", fontStyle: "italic", marginBottom: "28px" }}>
              Source: kmy.gov.in — Ministry of External Affairs, Government of India
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
              {[
                "Must be a citizen of India",
                "Must possess a valid ordinary Indian passport — minimum 6 months validity as on 1st September of the current year",
                "Age between 18 and 70 years as on 01 January of the current year",
                "Body Mass Index (BMI) of 25 or less",
                "Physically fit and medically healthy for high-altitude travel",
                "Must not suffer from high blood pressure, diabetes, asthma, heart disease, or epilepsy",
                "Must pass mandatory medical examinations at Delhi Heart & Lung Institute (DHLI) and ITBP Base Hospital, New Delhi",
                "Foreign nationals are NOT eligible — OCI cardholders are also NOT eligible",
                "First-time applicants are given priority over those who have done the Yatra before",
                "Applicants who have already done this Yatra more than four times previously may be subject to a moratorium",
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
                ⚠️ Any yatri found medically unfit at any stage will not be permitted to continue. All payments made earlier will be forfeited. Source: kmy.gov.in
              </p>
            </div>
          </section>

          {/* SELECTION PROCESS */}
          <section style={{ marginBottom: "80px" }}>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: "400", color: "#f0ece4", marginBottom: "24px" }}>
              How Kailash Mansarovar Yatris Are Selected
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#5a4a30", fontStyle: "italic", marginBottom: "28px" }}>
              Source: kmy.gov.in — Selection Process page
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { step: "01", title: "Apply Online", desc: "Register at kmy.gov.in. Maximum two registrations per user account (for those wishing to travel together). All fields are compulsory." },
                { step: "02", title: "Computer-Generated Draw of Lots", desc: "Yatris are selected through a fair, computer-generated, random, gender-balanced selection process by the Ministry of External Affairs. Efforts are made to keep groups of two together where requested." },
                { step: "03", title: "Intimation", desc: "Selected applicants are informed through automated messages to their registered email ID and mobile number. Status can also be checked via helpline 011-23088214." },
                { step: "04", title: "Confirm Participation", desc: "Selected yatris must confirm by paying the non-refundable Confirmation Amount to KMVN (Lipulekh route) or STDC (Nathu La route) before the cut-off date. Failure to pay removes you from the selected list." },
                { step: "05", title: "Medical Examination in Delhi", desc: "Confirmed yatris must report at Delhi Heart & Lung Institute (DHLI) on scheduled date for mandatory medical tests. Any yatri found unfit will not proceed." },
                { step: "06", title: "Yatra Begins", desc: "All yatris in a batch travel together and return with the same batch. The batch leaves on scheduled dates regardless of individual absences." },
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              {[
                {
                  title: "Choose Adi Kailash if you...",
                  color: "#c4a050",
                  points: [
                    "Want to do the pilgrimage this season without waiting for a draw",
                    "Are planning your first Himalayan sacred journey",
                    "Want Om Parvat darshan — the divine Om symbol in snow",
                    "Prefer a complete journey entirely within India",
                    "Have a BMI above 25 or have health conditions that may disqualify you from KMY",
                    "Are a foreign national or OCI cardholder (not eligible for KMY)",
                    "Have 7 to 12 days available",
                    "Want a private, customized small-group experience",
                    "Want to visit Darma Valley, Dharchula, or Eastern Kumaon alongside",
                  ]
                },
                {
                  title: "Consider Kailash Mansarovar if you...",
                  color: "#8ab4d4",
                  points: [
                    "Are an Indian citizen with a valid passport and BMI of 25 or less",
                    "Are medically fit with no BP, diabetes, asthma, heart disease, or epilepsy",
                    "Have 21–22 days available between June and August",
                    "Are comfortable with a government-organized group journey",
                    "Want to complete the sacred Kailash Kora (52km parikrama)",
                    "Have not previously done the MEA-organized Kailash Mansarovar Yatra (first-timers get priority)",
                    "Have applied successfully via kmy.gov.in",
                    "Are in excellent physical condition for high-altitude trekking",
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
              Kailash Mansarovar answers sourced from kmy.gov.in. Verify latest details at kmy.gov.in before planning.
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
                All Kailash Mansarovar Yatra information in this article has been sourced directly from <strong style={{ color: "#6a5a40" }}>kmy.gov.in</strong>, the official portal of the Ministry of External Affairs, Government of India. This information is subject to change without notice. Himalayan Serenity Travel is not affiliated with the Government of India's Kailash Mansarovar Yatra program. Always verify the latest eligibility criteria, dates, fees, and process at <strong style={{ color: "#6a5a40" }}>kmy.gov.in</strong> before making any plans. For Adi Kailash Yatra inquiries, contact our team directly.
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
              We handle your Inner Line Permit, accommodation, transport and every detail of your Adi Kailash Yatra from Delhi and Pithoragarh. Small groups. Authentic experience. Local expertise.
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
              <a href="https://wa.me/919997845351" style={{
                display: "inline-block", padding: "16px 40px",
                backgroundColor: "transparent",
                border: "1px solid rgba(196,160,80,0.4)",
                color: "#c4a050",
                borderRadius: "100px", textDecoration: "none",
                fontSize: "0.95rem",
              }}>
                WhatsApp +91 99978 45351
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
