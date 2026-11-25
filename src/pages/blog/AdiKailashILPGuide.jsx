import { useEffect } from "react";
import { useSEO } from "../../hooks/useSEO";
import { Link } from "react-router-dom";

export default function AdiKailashILPGuide() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    { q: "Can I get Adi Kailash ILP from Delhi?", a: "Confirm the application channel, competent issuing office and any in-person attendance or collection requirements with Pithoragarh district administration before travelling from Delhi. This guide does not confirm remote application or collection arrangements." },
    { q: "How many days does Adi Kailash ILP take to process?", a: "Ask the competent authority about current processing times for your route and dates. No fixed turnaround or faster approval through an operator is promised; allow for requests for further information and administrative delays." },
    { q: "Is ILP required for Om Parvat darshan?", a: "Before travelling to Om Parvat or other border-area destinations, confirm the permit and checkpoint requirements for your exact route with district administration. Ask which documents, formats and copies must be carried. A booking does not itself authorise entry." },
    { q: "Can foreign nationals apply for Adi Kailash ILP?", a: "Foreign nationals and OCI cardholders should obtain current, route-specific eligibility and permit advice from the competent Indian authorities before booking. Do not assume that an Indian traveller's permit, or a generic PAP or RAP reference, authorises the same journey." },
    { q: "What is the Adi Kailash ILP fee in 2026?", a: "Confirm whether an official fee applies, the current amount and the authorised payment channel with the competent authority. No fee, payment gateway or annual revision is certified by this guide. Distinguish official charges from any operator service charge." },
  ];

  const metaDescription = "Planning guidance for Adi Kailash and Om Parvat permits: confirm current documents, fees, eligibility and procedures with Pithoragarh district administration.";
  const metaKeywords = "Adi Kailash ILP, Om Parvat permit, inner line permit Uttarakhand, Darma Valley ILP, Pithoragarh ILP, SDM Dharchula permit, ILP 2026, how to get inner line permit for Adi Kailash 2026, is ILP mandatory for Om Parvat darshan, SDM Pithoragarh ILP border valley, documents required Adi Kailash permit, Adi Kailash yatra ILP online apply, Darma Valley inner line permit required 2026, who issues ILP Adi Kailash Pithoragarh, Adi Kailash ILP fee 2026, Pithoragarh Uttarakhand India, Dharchula Pithoragarh district, Gunji village Uttarakhand, Jolingkong Adi Kailash, Darma Valley Kumaon Himalaya, Lipulekh pass Uttarakhand, Navidhang Om Parvat, Delhi to Adi Kailash route, Kumaon Himalaya India";

  useSEO({
    title: "Adi Kailash ILP Guide: Requirements to Confirm | Himalayan Serenity Travel",
    description: metaDescription,
    canonical: 'https://www.himalayanserenitytravel.com/blog/adi-kailash-ilp-guide-2026',
    socialTitle: "Adi Kailash ILP Guide: Requirements to Confirm | Himalayan Serenity Travel",
    type: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Adi Kailash ILP Guide: Requirements to Confirm",
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
      "mainEntity": faqs.map(faq => ({ "@type": "Question", "name": faq.q, "acceptedAnswer": { "@type": "Answer", "text": faq.a } }))
    },
  });

  useEffect(() => {
    const previousKeywords = document.querySelector('meta[name="keywords"]');
    const previousContent = previousKeywords?.content;
    const keywords = previousKeywords || document.createElement('meta');
    keywords.name = 'keywords';
    keywords.content = metaKeywords;
    if (!previousKeywords) document.head.appendChild(keywords);
    const geoTags = Object.entries({
      'geo.region': 'IN-UT',
      'geo.placename': 'Pithoragarh, Uttarakhand',
      'geo.position': '29.5829;80.2183',
    }).map(([name, content]) => {
      const existing = document.querySelector(`meta[name="${name}"]`);
      const previous = existing?.content;
      const tag = existing || document.createElement('meta');
      tag.name = name;
      tag.content = content;
      if (!existing) document.head.appendChild(tag);
      return () => {
        if (existing) tag.content = previous;
        else tag.remove();
      };
    });
    return () => {
      if (previousKeywords) keywords.content = previousContent;
      else keywords.remove();
      geoTags.forEach(restore => restore());
    };
  }, [metaKeywords]);

  const sectionStyle = { maxWidth: "740px", margin: "0 auto", padding: "3rem 1.5rem" };
  const gold = "#C9A84C";
  const h2Style = { color: gold, fontSize: "1.4rem", margin: "2.8rem 0 1rem", lineHeight: 1.3, fontWeight: 400, borderBottom: "1px solid rgba(201,168,76,0.12)", paddingBottom: "0.6rem", fontFamily: "Georgia, serif" };
  const pStyle = { lineHeight: 1.9, marginBottom: "1.2rem", color: "rgba(255,255,255,0.75)", fontFamily: "Georgia, serif" };
  const liStyle = { marginBottom: "0.5rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75 };

  const documents = [
    "Ask which identity document is accepted for your nationality and route.",
    "Confirm whether photographs are required and in what format or quantity.",
    "Confirm whether medical documentation is required and who may issue it.",
    "Ask whether police verification, declarations or other supporting documents apply.",
    "Confirm the itinerary and travel-date information required for your application.",
    "Check any vehicle and driver documentation requirements for your journey.",
    "Keep emergency contact details and the documents the authority instructs you to carry."
];

  const steps = [
    {
        "num": "01",
        "title": "Start with district administration",
        "desc": "Use the official Pithoragarh district website and contact directory to confirm the competent office and current application channel."
    },
    {
        "num": "02",
        "title": "Confirm your route and eligibility",
        "desc": "Give the authority your intended destinations, travel dates and nationality. Ask which permissions apply to that exact journey."
    },
    {
        "num": "03",
        "title": "Obtain the current document list",
        "desc": "Confirm accepted identity documents, any medical or verification requirements, application format and attendance requirements."
    },
    {
        "num": "04",
        "title": "Confirm charges and timing",
        "desc": "Ask about any official fee, authorised payment method and current processing expectations. Do not rely on a fixed turnaround in an older guide."
    },
    {
        "num": "05",
        "title": "Follow the authority’s instructions",
        "desc": "Use the confirmed application channel. Permission is decided by the competent authority; an operator cannot guarantee approval."
    },
    {
        "num": "06",
        "title": "Check before departure",
        "desc": "Confirm the outcome, permitted route and validity, any current access restrictions, and the documents and copies required at checkpoints."
    }
];

  const tips = [
    {
        "title": "CHECK CURRENT GUIDANCE",
        "desc": "District notifications and security instructions can change. A historical tourism document is not confirmation of present access."
    },
    {
        "title": "CONFIRM DOCUMENT FORMATS",
        "desc": "Ask which originals, printed copies or digital documents will be accepted; no fixed number of copies is certified here."
    },
    {
        "title": "ALLOW FOR DELAYS",
        "desc": "Processing and access may be affected by administrative, security or weather conditions. Avoid assuming a guaranteed approval date."
    },
    {
        "title": "RESPECT CHECKPOINT INSTRUCTIONS",
        "desc": "Keep the documents specified by the authority accessible and follow current instructions. This guide does not certify a checkpoint list."
    },
    {
        "title": "ASK ABOUT OPERATOR ASSISTANCE",
        "desc": "Confirm what help, if any, is included in your booking. Assistance does not transfer the authority’s approval decision to an operator."
    }
];



  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh" }}>

      {/* Hero */}
      <div style={{ background: "#0d0d0d", padding: "5rem 2rem 3rem", textAlign: "center", borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
        <div style={{ display: "inline-block", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.35)", color: gold, padding: "5px 18px", borderRadius: "2px", fontSize: "0.68rem", letterSpacing: "0.2em", fontFamily: "sans-serif", marginBottom: "1.5rem", textTransform: "uppercase" }}>
          Travel Guide · ILP &amp; Permits · Pithoragarh
        </div>
        <h1 style={{ color: "#fff", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", lineHeight: 1.35, marginBottom: "1rem", maxWidth: "720px", marginLeft: "auto", marginRight: "auto", fontWeight: 400, fontFamily: "Georgia, serif" }}>
          Adi Kailash ILP Guide — Requirements to Confirm Before Travel
        </h1>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", maxWidth: "580px", margin: "0 auto", lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
          Planning questions for district administration; current permit rules and access are not certified by this guide
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
          Planning travel to <strong style={{ color: gold }}>Adi Kailash</strong>, <strong style={{ color: gold }}>Om Parvat</strong>, or <strong style={{ color: gold }}>Darma Valley</strong>? Confirm permissions for your exact route and nationality with <strong style={{ color: "#fff" }}>Pithoragarh district administration, Uttarakhand</strong> before booking or travelling.
        </p>
        <p style={pStyle}>
          This article explains what to ask about issuing authority, procedure, documents, charges and checkpoints. It does not newly certify every permit requirement, processing time or eligibility rule. The <a href="https://pithoragarh.nic.in/" target="_blank" rel="noopener noreferrer" style={{ color: gold }}>official district website</a> links to the <a href="https://ilppithoragarh.uk.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: gold }}>government ILP portal</a>. Use its published guidance and the district <a href="https://pithoragarh.nic.in/contact-directory/" target="_blank" rel="noopener noreferrer" style={{ color: gold }}>contact directory</a> to confirm the instructions applicable to your journey.
        </p>

        {/* We handle ILP note */}
        <div style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "2px", padding: "1.2rem 1.5rem", margin: "2rem 0" }}>
          <span style={{ color: gold, fontFamily: "sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", marginBottom: "0.5rem", display: "block", textTransform: "uppercase" }}>✦ Ask about permit assistance</span>
          <p style={{ color: "rgba(255,255,255,0.75)", margin: 0, fontSize: "0.92rem", fontFamily: "Georgia, serif", lineHeight: 1.8 }}>
            Ask Himalayan Serenity Travel what documentation or application assistance is included in your specific booking. The competent authority decides permission; assistance does not guarantee approval or access.{" "}
            <a href="https://wa.me/919084642557?text=Hello!%20I%20need%20ILP%20assistance%20for%20Adi%20Kailash." style={{ color: gold }}>Chat on WhatsApp →</a>
          </p>
        </div>

        {/* What is ILP */}
        <h2 style={h2Style}>What is an Inner Line Permit (ILP)?</h2>
        <p className="speakable-ilp-answer" style={pStyle}>
          An <strong style={{ color: "#fff" }}>Inner Line Permit (ILP)</strong> is a form of travel authorisation associated with restricted areas. Do not assume that one permission covers every destination or nationality. Confirm which authorisation applies to your intended journey and the conditions attached to it.
        </p>

        {/* Is ILP Mandatory */}
        <h2 style={h2Style}>What Must I Confirm for Adi Kailash?</h2>
        <p style={pStyle}><strong style={{ color: "#fff" }}>The government ILP portal states that a permit is required for Adi Kailash.</strong> Confirm the exact route, nationality-specific eligibility and current instructions before travel. Tell district administration which of these destinations you intend to visit:</p>
        <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
          {["Adi Kailash — Jolingkong, Gauri Kund, Parvati Sarovar, Bheem Ki Kheti", "Om Parvat — Navidhang viewpoint, Lipulekh pass corridor", "Gunji (Y-junction base camp), Nabi village, Kuti village", "Upper Vyas Valley sectors, Nabidhang ridge"].map(i => <li key={i} style={liStyle}>{i}</li>)}
        </ul>

        {/* Darma Valley */}
        <h2 style={h2Style}>Does Darma Valley Require ILP?</h2>
        <p style={pStyle}>Ask about permissions for the specific Darma Valley destinations in your itinerary. This guide does not confirm a blanket rule covering every village or approach:</p>
        <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.5rem" }}>
          {["Darma Valley — Sobla, Sela, Duktu, Dantu, Dugtu", "Panchachuli Base Camp region", "Vyans Valley upper sectors"].map(i => <li key={i} style={liStyle}>{i}</li>)}
        </ul>
        <div style={{ background: "rgba(201,168,76,0.06)", borderLeft: "2px solid #C9A84C", padding: "1rem 1.5rem", margin: "1.5rem 0", color: "rgba(201,168,76,0.9)", fontStyle: "italic", fontSize: "0.95rem", fontFamily: "Georgia, serif" }}>
          A tourism listing or older journey description is not an access authorisation. Obtain current, route-specific instructions from the competent authority.
        </div>

        {/* Who Issues */}
        <h2 className="speakable-who-issues" style={h2Style}>Which Authority Should I Contact?</h2>
        <p style={pStyle}>The official district directory lists <strong style={{ color: "#fff" }}>SDM Dharchula and SDM Pithoragarh</strong>. Ask district administration which office is competent for your route; the directory alone does not establish that both issue the same permit:</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", margin: "1.5rem 0", border: "1px solid rgba(201,168,76,0.15)", background: "rgba(201,168,76,0.15)" }}>
          {[
            { label: "District directory contact", title: "SDM Dharchula", desc: "Listed in the official Pithoragarh district directory. Confirm the competent issuing office, application procedure and any attendance requirements.", sub: "Dharchula, Pithoragarh district, Uttarakhand", link: null },
            { label: "District directory contact", title: "SDM Pithoragarh", desc: "Listed in the official Pithoragarh district directory. Ask which office and current channel apply to your journey; no issuing jurisdiction is certified here.", sub: null, link: "https://pithoragarh.nic.in/contact-directory/" },
          ].map(card => (
            <div key={card.title} style={{ background: "#0d0d0d", padding: "1.3rem" }}>
              <div style={{ display: "inline-block", background: "rgba(201,168,76,0.1)", color: gold, fontSize: "0.65rem", fontFamily: "sans-serif", letterSpacing: "0.15em", padding: "3px 10px", marginBottom: "0.7rem", textTransform: "uppercase" }}>{card.label}</div>
              <h3 style={{ color: "#fff", fontSize: "0.92rem", margin: "0 0 0.6rem", fontFamily: "sans-serif", fontWeight: 500 }}>{card.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.83rem", lineHeight: 1.75, margin: 0, fontFamily: "sans-serif" }}>
                {card.desc}
                {card.sub && <><br /><br /><span style={{ color: "rgba(255,255,255,0.3)" }}>{card.sub}</span></>}
                {card.link && <><br /><br /><a href={card.link} target="_blank" rel="noopener noreferrer" style={{ color: gold, fontSize: "0.82rem" }}>Official district contact directory →</a></>}
              </p>
            </div>
          ))}
        </div>

        <p style={pStyle}>Do not assume that your arrival point determines the issuing office. Follow the current instructions given by district administration for your route and circumstances.</p>

        {/* How to Apply */}
        <h2 style={h2Style}>Application Questions to Resolve Before Travel</h2>
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
        <h2 style={h2Style}>Documents to Confirm With the Authority</h2>
        <p style={pStyle}>The government portal’s <a href="https://ilppithoragarh.uk.gov.in/stepstogetilp" target="_blank" rel="noopener noreferrer" style={{ color: gold }}>published application guidance</a> lists government photo identification, a photograph, a medical fitness certificate and an affidavit. Confirm the current list, accepted formats and any additional requirements for your nationality and route. Its guidance is not a guarantee of approval or a fixed processing time.</p>
        <div style={{ border: "1px solid rgba(255,255,255,0.07)", padding: "0 1.2rem", margin: "1.5rem 0" }}>
          {documents.map(doc => (
            <div key={doc} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.65rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", fontFamily: "sans-serif", fontSize: "0.88rem" }}>
              <span style={{ color: gold }}>✓</span>{doc}
            </div>
          ))}
        </div>

        {/* Tips */}
        <h2 style={h2Style}>Practical Permit Planning</h2>
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
            Ask About Permit Assistance
          </h3>
          <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: "1.5rem", fontSize: "0.95rem", fontFamily: "Georgia, serif", lineHeight: 1.8, maxWidth: "500px", margin: "0 auto 1.5rem" }}>
            Ask Himalayan Serenity Travel about permit assistance for{' '}
            <Link to="/packages/adi-kailash-expedition" style={{ color: gold, textDecoration: "none" }}>Adi Kailash</Link>,
            Om Parvat and Darma Valley. Confirm the scope and any charges with our{' '}
            <Link to="/contact" style={{ color: gold, textDecoration: "none" }}>team</Link>.
            Approval, eligibility and access remain subject to the competent authority and current conditions.
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
