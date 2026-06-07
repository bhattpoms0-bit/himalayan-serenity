import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function AdiKailashILPGuide() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Complete 2026 Guide to Adi Kailash ILP (Inner Line Permit) | Himalayan Serenity Travel";
  }, []);

  const metaDescription = "Complete 2026 guide to Inner Line Permit (ILP) for Adi Kailash, Om Parvat and Darma Valley. SDM Dharchula and SDM Pithoragarh process, documents, fees and expert tips from Himalayan Serenity Travel, Pithoragarh.";
  const metaKeywords = "Adi Kailash ILP, Om Parvat permit, inner line permit Uttarakhand, Darma Valley ILP, Pithoragarh ILP, SDM Dharchula permit, ILP 2026, how to get inner line permit for Adi Kailash 2026, is ILP mandatory for Om Parvat darshan, SDM Pithoragarh ILP border valley, documents required Adi Kailash permit, Adi Kailash yatra ILP online apply, Darma Valley inner line permit required 2026, who issues ILP Adi Kailash Pithoragarh, Adi Kailash ILP fee 2026, Pithoragarh Uttarakhand India, Dharchula Pithoragarh district, Gunji village Uttarakhand, Jolingkong Adi Kailash, Darma Valley Kumaon Himalaya, Lipulekh pass Uttarakhand, Navidhang Om Parvat, Delhi to Adi Kailash route, Kumaon Himalaya India";

  useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", metaDescription);
    else {
      const m = document.createElement("meta");
      m.name = "description"; m.content = metaDescription;
      document.head.appendChild(m);
    }
    const metaKw = document.querySelector('meta[name="keywords"]');
    if (metaKw) metaKw.setAttribute("content", metaKeywords);
    else {
      const m = document.createElement("meta");
      m.name = "keywords"; m.content = metaKeywords;
      document.head.appendChild(m);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", "Complete 2026 Guide to Adi Kailash ILP | Himalayan Serenity Travel");
    const geoRegion = document.createElement("meta");
    geoRegion.name = "geo.region"; geoRegion.content = "IN-UT";
    document.head.appendChild(geoRegion);
    const geoPlace = document.createElement("meta");
    geoPlace.name = "geo.placename"; geoPlace.content = "Pithoragarh, Uttarakhand";
    document.head.appendChild(geoPlace);
    const geoPos = document.createElement("meta");
    geoPos.name = "geo.position"; geoPos.content = "29.5829;80.2183";
    document.head.appendChild(geoPos);
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Complete 2026 Guide to Adi Kailash ILP (Inner Line Permit)",
      "description": metaDescription,
      "author": { "@type": "Organization", "name": "Himalayan Serenity Travel", "url": "https://www.himalayanserenitytravel.com" },
      "publisher": { "@type": "Organization", "name": "Himalayan Serenity Travel", "logo": { "@type": "ImageObject", "url": "https://www.himalayanserenitytravel.com/logo.png" } },
      "datePublished": "2026-05-25",
      "dateModified": "2026-05-25",
      "mainEntityOfPage": "https://www.himalayanserenitytravel.com/blog/adi-kailash-ilp-guide-2026",
      "keywords": "Adi Kailash ILP, Om Parvat permit, inner line permit Uttarakhand 2026",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".speakable-intro", ".speakable-ilp-answer", ".speakable-who-issues"]
      },
      "mainEntity": [
        { "@type": "Question", "name": "What permit do I need for Adi Kailash?", "acceptedAnswer": { "@type": "Answer", "text": "You need an Inner Line Permit (ILP) issued by SDM Dharchula or SDM Pithoragarh, Uttarakhand. Apply online at pass.pithoragarh.online. Carry 4 printed copies for ITBP checkpoints." } },
        { "@type": "Question", "name": "Is ILP mandatory for Om Parvat 2026?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Om Parvat lies beyond Gunji in the restricted border zone of Pithoragarh district. ILP is mandatory and checked at Tawaghat, Gunji and Nabidhang checkpoints." } },
        { "@type": "Question", "name": "Who can help with Adi Kailash ILP in Pithoragarh?", "acceptedAnswer": { "@type": "Answer", "text": "Himalayan Serenity Travel, headquartered in Pithoragarh, provides complete ILP assistance — documentation, SDM submission, verification and collection — for Adi Kailash, Om Parvat and Darma Valley expeditions." } },
        { "@type": "Question", "name": "Can I get Adi Kailash ILP from Delhi?", "acceptedAnswer": { "@type": "Answer", "text": "No. ILP is issued only by SDM Dharchula or SDM Pithoragarh. Online applications via pass.pithoragarh.online are processed by these offices — you cannot collect it from Delhi." } },
        { "@type": "Question", "name": "How many days does Adi Kailash ILP take to process?", "acceptedAnswer": { "@type": "Answer", "text": "Online applications typically take 3–7 working days. During peak yatra season (May–June) allow 10–14 days." } }
      ]
    });
    document.head.appendChild(schema);
    return () => { document.head.removeChild(schema); };
  }, []);

  const sectionStyle = { maxWidth: "740px", margin: "0 auto", padding: "3rem 1.5rem" };
  const gold = "#C9A84C";
  const h2Style = { color: gold, fontSize: "1.4rem", margin: "2.8rem 0 1rem", lineHeight: 1.3, fontWeight: 400, borderBottom: "1px solid rgba(201,168,76,0.12)", paddingBottom: "0.6rem", fontFamily: "Georgia, serif" };
  const pStyle = { lineHeight: 1.9, marginBottom: "1.2rem", color: "rgba(255,255,255,0.75)", fontFamily: "Georgia, serif" };
  const liStyle = { marginBottom: "0.5rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75 };

  const documents = [
    "Government photo ID — Aadhaar / Passport / Voter ID / Driving License",
    "Passport-size photographs (minimum 4 copies)",
    "Medical fitness certificate from registered doctor",
    "OPD slip if required at checkpoint",
    "Police verification certificate",
    "Self-declaration / indemnity affidavit",
    "Detailed travel itinerary with dates",
    "Emergency contact details",
    "Vehicle registration and driver's license if self-driving",
  ];

  const steps = [
    { num: "01", title: "Visit the official portal", desc: "Go to pass.pithoragarh.online — the centralized ILP portal for Pithoragarh district covering Adi Kailash, Om Parvat and Darma Valley routes." },
    { num: "02", title: "Register and choose route", desc: "Create account with mobile and email. Select your route — Adi Kailash, Om Parvat viewpoint or Darma Valley border sector." },
    { num: "03", title: "Fill application form", desc: "Enter personal details, address, emergency contact, travel dates, vehicle info, driver details and complete route itinerary." },
    { num: "04", title: "Upload documents", desc: "Government ID, passport photos, medical fitness certificate, police verification and signed self-declaration form." },
    { num: "05", title: "Pay permit fee", desc: "Fee varies per current district guidelines. Pay online through the portal's payment gateway." },
    { num: "06", title: "Download and carry permit", desc: "Download approved PDF. Carry minimum 4 printed copies — one each for ITBP checkpoints at Dharchula, Tawaghat, Gunji and upper sectors." },
  ];

  const tips = [
    { title: "APPLY 10–14 DAYS EARLY", desc: "During peak season (May–June, Sept–Oct), SDM offices process high volumes. Apply well in advance to avoid delays that could push your departure date." },
    { title: "CARRY MINIMUM 4 PRINTED COPIES", desc: "Each ITBP checkpoint retains one copy. Digital copies are not always accepted in remote areas with poor connectivity." },
    { title: "MEDICAL CERTIFICATE IS NON-NEGOTIABLE", desc: "Get your fitness certificate from a registered allopathic doctor before leaving Delhi or Pithoragarh. High altitude above 3,600m is physically demanding." },
    { title: "EXPECT MULTIPLE SECURITY CHECKS", desc: "ITBP, Uttarakhand Police and district administration run checkpoints at Dharchula, Tawaghat, Gunji and Nabidhang. Keep documents accessible." },
    { title: "USE A LOCAL PITHORAGARH OPERATOR", desc: "A Pithoragarh-based operator handles SDM liaisoning, last-minute administrative changes and emergency support — especially important during weather disruptions." },
  ];

  const faqs = [
    { q: "Can I get Adi Kailash ILP from Delhi?", a: "No. ILP is issued only by SDM Dharchula or SDM Pithoragarh. Online applications via pass.pithoragarh.online are still processed and approved by these offices — you cannot collect it from Delhi." },
    { q: "How many days does Adi Kailash ILP take to process?", a: "Online applications typically take 3–7 working days. During peak yatra season (May–June) allow 10–14 days. Using a local travel operator with SDM connections speeds up the process." },
    { q: "Is ILP required for Om Parvat darshan?", a: "Yes. Om Parvat lies beyond Gunji near the Navidhang viewpoint — well within the ILP-required zone. No ILP means denied entry at Tawaghat checkpoint." },
    { q: "Can foreign nationals apply for Adi Kailash ILP?", a: "Foreign citizens require a Protected Area Permit (PAP) or Restricted Area Permit (RAP) — separate from the standard ILP. These require additional government approvals arranged through authorized operators." },
    { q: "What is the Adi Kailash ILP fee in 2026?", a: "Fees are set by Pithoragarh district administration and may be revised annually. Current fee details are available on pass.pithoragarh.online or via your travel operator." },
  ];

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: "#0d0d0d", padding: "5rem 2rem 3rem", textAlign: "center", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
        <div style={{ display: "inline-block", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.35)", color: gold, padding: "5px 18px", borderRadius: "2px", fontSize: "0.68rem", letterSpacing: "0.2em", fontFamily: "sans-serif", marginBottom: "1.5rem", textTransform: "uppercase" }}>
          Travel Guide · ILP &amp; Permits · Pithoragarh
        </div>
        <h1 style={{ color: "#fff", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", lineHeight: 1.35, marginBottom: "1rem", maxWidth: "720px", marginLeft: "auto", marginRight: "auto", fontWeight: 400, fontFamily: "Georgia, serif" }}>
          Complete 2026 Guide to Adi Kailash ILP — Inner Line Permit for Om Parvat &amp; Darma Valley
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", maxWidth: "580px", margin: "0 auto", lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
          Updated for 2026 — ILP process, SDM offices, documents, checkpoints and expert tips from Pithoragarh
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.2rem", marginTop: "1.2rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", fontFamily: "sans-serif", flexWrap: "wrap" }}>
          <span>May 2026</span>
          <span style={{ color: "rgba(201,168,76,0.4)" }}>·</span>
          <span>10 min read</span>
          <span style={{ color: "rgba(201,168,76,0.4)" }}>·</span>
          <span>Himalayan Serenity Travel</span>
          <span style={{ color: "rgba(201,168,76,0.4)" }}>·</span>
          <span>Pithoragarh, Uttarakhand</span>
        </div>
      </div>

      {/* Content */}
      <div style={sectionStyle}>

        {/* Breadcrumb */}
        <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", fontFamily: "sans-serif", marginBottom: "2.5rem" }}>
          <Link to="/" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Home</Link>
          {" › "}
          <Link to="/blog" style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>Blog</Link>
          {" › "}
          <span style={{ color: gold }}>Adi Kailash ILP Guide 2026</span>
        </div>

        {/* Intro */}
        <p className="speakable-intro" style={pStyle}>
          Planning a pilgrimage to <strong style={{ color: gold }}>Adi Kailash</strong>, <strong style={{ color: gold }}>Om Parvat</strong>, or <strong style={{ color: gold }}>Darma Valley</strong> in 2026? The single most overlooked requirement is the <strong style={{ color: "#fff" }}>Inner Line Permit (ILP)</strong>. These regions lie within sensitive Indo-Tibet and Nepal border zones of <strong style={{ color: "#fff" }}>Pithoragarh district, Uttarakhand</strong> — and entry is strictly regulated by the district administration and ITBP security forces.
        </p>
        <p style={pStyle}>
          This guide covers everything — who issues the permit, online vs offline process, required documents, checkpoint protocol and what to expect on the ground — based on 2026 operational realities from Dharchula and Pithoragarh.
        </p>

        {/* We handle ILP note */}
        <div style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "2px", padding: "1.2rem 1.5rem", margin: "2rem 0" }}>
          <span style={{ color: gold, fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", marginBottom: "0.5rem", display: "block", textTransform: "uppercase" }}>✦ We handle your ILP — completely</span>
          <p style={{ color: "rgba(255,255,255,0.75)", margin: 0, fontSize: "0.92rem", fontFamily: "Georgia, serif", lineHeight: 1.8 }}>
            Himalayan Serenity Travel, headquartered in Pithoragarh, manages your entire ILP process — documentation, SDM coordination, submission and collection. You focus on your sacred journey.{" "}
            <a href="https://wa.me/919084642557?text=Hello!%20I%20need%20ILP%20assistance%20for%20Adi%20Kailash." style={{ color: gold }}>Chat on WhatsApp →</a>
          </p>
        </div>

        {/* What is ILP */}
        <h2 style={h2Style}>What is an Inner Line Permit (ILP)?</h2>
        <p className="speakable-ilp-answer" style={pStyle}>
          An <strong style={{ color: "#fff" }}>Inner Line Permit (ILP)</strong> is an official travel authorization required for entry into sensitive border regions of India. In Uttarakhand's Pithoragarh district, ILP applies to high-altitude zones near the India–China (Tibet) and Nepal borders. It functions as a mandatory security clearance — checked at every ITBP checkpoint along the route from Dharchula to Gunji and beyond.
        </p>

        {/* Is ILP Mandatory */}
        <h2 style={h2Style}>Is ILP Mandatory for Adi Kailash in 2026?</h2>
        <p style={pStyle}><strong style={{ color: "#fff" }}>Yes — absolutely mandatory.</strong> An ILP is required for all Indian travelers visiting:</p>
        <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
          {["Adi Kailash — Jolingkong, Gauri Kund, Parvati Sarovar, Bheem Ki Kheti", "Om Parvat — Navidhang viewpoint, Lipulekh pass corridor", "Gunji (Y-junction base camp), Nabi village, Kuti village", "Upper Vyas Valley sectors, Nabidhang ridge"].map(i => <li key={i} style={liStyle}>{i}</li>)}
        </ul>

        {/* Darma Valley */}
        <h2 style={h2Style}>Does Darma Valley Require ILP?</h2>
        <p style={pStyle}>Yes. Enforcement has become significantly stricter since 2023. The following areas now require ILP clearance:</p>
        <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
          {["Darma Valley — Sobla, Sela, Duktu, Dantu, Dugtu", "Panchachuli Base Camp region", "Vyans Valley upper sectors"].map(i => <li key={i} style={liStyle}>{i}</li>)}
        </ul>
        <div style={{ background: "rgba(201,168,76,0.06)", borderLeft: "2px solid #C9A84C", padding: "1rem 1.5rem", margin: "1.5rem 0", color: "rgba(201,168,76,0.9)", fontStyle: "italic", fontSize: "0.95rem", fontFamily: "Georgia, serif" }}>
          For 2026: assume ILP is required for Adi Kailash, Om Parvat, Darma Valley and all upper Pithoragarh border sectors without exception.
        </div>

        {/* Who Issues */}
        <h2 className="speakable-who-issues" style={h2Style}>Who Issues the Adi Kailash ILP in 2026?</h2>
        <p style={pStyle}>There are now <strong style={{ color: "#fff" }}>two authorized SDM offices</strong> that issue the Inner Line Permit for Adi Kailash and border valley travel:</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", margin: "1.5rem 0", border: "1px solid rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.15)" }}>
          {[
            { label: "Primary Office", title: "SDM Dharchula", desc: "Sub-Divisional Magistrate, Dharchula. The traditional on-ground hub for Adi Kailash ILP — closest to the route departure point. Most physical applications are processed here.", sub: "Dharchula, Pithoragarh district, Uttarakhand", link: null },
            { label: "Also Issues ILP", title: "SDM Pithoragarh", desc: "Sub-Divisional Magistrate, Pithoragarh. Now actively issues ILP for Adi Kailash and border valley travel. Useful for travelers arriving via Pithoragarh before proceeding to Dharchula.", sub: null, link: "https://pass.pithoragarh.online/" },
          ].map(card => (
            <div key={card.title} style={{ background: "#0d0d0d", padding: "1.3rem" }}>
              <div style={{ display: "inline-block", background: "rgba(201,168,76,0.1)", color: gold, fontSize: "0.65rem", fontFamily: "sans-serif", letterSpacing: "0.15em", padding: "3px 10px", marginBottom: "0.7rem", textTransform: "uppercase" }}>{card.label}</div>
              <h3 style={{ color: "#fff", fontSize: "0.92rem", margin: "0 0 0.6rem", fontFamily: "sans-serif", fontWeight: 500 }}>{card.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.83rem", lineHeight: 1.75, margin: 0, fontFamily: "sans-serif" }}>
                {card.desc}
                {card.sub && <><br /><br /><span style={{ color: "rgba(255,255,255,0.3)" }}>{card.sub}</span></>}
                {card.link && <><br /><br /><a href={card.link} target="_blank" rel="noopener noreferrer" style={{ color: gold, fontSize: "0.82rem" }}>pass.pithoragarh.online →</a></>}
              </p>
            </div>
          ))}
        </div>

        <p style={pStyle}>Both offices operate under the centralized Pithoragarh district administration. Travelers using Himalayan Serenity Travel have permits processed from whichever office aligns with their arrival route.</p>

        {/* How to Apply */}
        <h2 style={h2Style}>How to Apply Online — Step by Step</h2>
        <div style={{ margin: "1.5rem 0" }}>
          {steps.map(s => (
            <div key={s.num} style={{ display: "flex", gap: "1rem", marginBottom: "1.2rem", alignItems: "flex-start" }}>
              <div style={{ background: "transparent", border: "1px solid rgba(201,168,76,0.35)", color: gold, width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.72rem", fontWeight: 600, flexShrink: 0, fontFamily: "sans-serif", letterSpacing: "0.05em" }}>{s.num}</div>
              <div>
                <strong style={{ color: "rgba(255,255,255,0.9)", display: "block", marginBottom: "0.3rem", fontSize: "0.92rem", fontFamily: "sans-serif" }}>{s.title}</strong>
                <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.87rem", lineHeight: 1.75, fontFamily: "sans-serif" }}>{s.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Documents */}
        <h2 style={h2Style}>Documents Required</h2>
        <div style={{ border: "1px solid rgba(255,255,255,0.07)", padding: "0 1.2rem", margin: "1.5rem 0" }}>
          {documents.map(doc => (
            <div key={doc} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.65rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", fontFamily: "sans-serif", fontSize: "0.88rem" }}>
              <span style={{ color: gold }}>✓</span>{doc}
            </div>
          ))}
        </div>

        {/* Tips */}
        <h2 style={h2Style}>Important Tips for 2026</h2>
        <div style={{ margin: "1.5rem 0" }}>
          {tips.map(t => (
            <div key={t.title} style={{ borderLeft: "2px solid rgba(201,168,76,0.25)", padding: "0.9rem 1.2rem", marginBottom: "0.8rem", background: "rgba(255,255,255,0.015)" }}>
              <strong style={{ color: gold, display: "block", marginBottom: "0.3rem", fontFamily: "sans-serif", fontSize: "0.78rem", letterSpacing: "0.12em" }}>{t.title}</strong>
              <p style={{ color: "rgba(255,255,255,0.6)", margin: 0, fontSize: "0.88rem", fontFamily: "sans-serif", lineHeight: 1.75 }}>{t.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 style={h2Style}>Frequently Asked Questions</h2>
        <div style={{ margin: "1.5rem 0" }}>
          {faqs.map(f => (
            <div key={f.q} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "1.1rem 0" }}>
              <strong style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.92rem", display: "block", marginBottom: "0.4rem", fontFamily: "sans-serif" }}>{f.q}</strong>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.87rem", fontFamily: "sans-serif", lineHeight: 1.75, margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr style={{ border: "none", borderTop: "1px solid rgba(201,168,76,0.1)", margin: "2.5rem 0" }} />

        {/* CTA */}
        <div style={{ background: "rgba(201,168,76,0.07)", border: "1px solid rgba(201,168,76,0.25)", borderRadius: "2px", padding: "2.5rem", textAlign: "center", margin: "2rem 0" }}>
          <h3 style={{ color: gold, fontSize: "1.4rem", marginBottom: "1rem", fontFamily: "Georgia, serif", fontWeight: 400 }}>
            Let Us Handle Your ILP — Completely
          </h3>
          <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: "1.5rem", fontSize: "0.95rem", fontFamily: "Georgia, serif", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto 1.5rem" }}>
            Himalayan Serenity Travel provides end-to-end ILP assistance for{' '}
            <Link to="/packages/adi-kailash-expedition" style={{ color: gold, textDecoration: "none" }}>Adi Kailash</Link>,
            Om Parvat and Darma Valley. Documentation, verification, submission — all handled by our{' '}
            <Link to="/contact" style={{ color: gold, textDecoration: "none" }}>expert team</Link>.
            You just show up and experience the Himalayas.
          </p>
          <a
            href="https://wa.me/919084642557?text=Hello!%20I%20need%20ILP%20assistance%20for%20Adi%20Kailash%20expedition."
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", background: "#25D366", color: "#fff", padding: "0.85rem 2rem", borderRadius: "50px", textDecoration: "none", fontWeight: 600, fontSize: "0.95rem", fontFamily: "sans-serif" }}
          >
            Get ILP Help on WhatsApp
          </a>
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: "2.5rem", padding: "1rem 1.5rem", borderLeft: "2px solid rgba(255,255,255,0.08)", fontSize: "0.8rem", color: "rgba(255,255,255,0.3)", fontFamily: "sans-serif", lineHeight: 1.7 }}>
          <strong style={{ color: "rgba(255,255,255,0.4)" }}>Disclaimer:</strong> Permit rules and border regulations may change depending on district administration notifications and security advisories. Always verify the latest updates through official government portals or authorized travel operators before finalizing your journey.
        </div>

        {/* Back to blog */}
        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <Link to="/blog" style={{ color: gold, textDecoration: "none", fontSize: "0.85rem", letterSpacing: "0.1em", fontFamily: "sans-serif" }}>
            ← Back to All Blogs
          </Link>
        </div>

      </div>
    </div>
  );
}
