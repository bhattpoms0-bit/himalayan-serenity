import { openWhatsApp } from '../utils/whatsapp';
import { trackEnquiry } from '../utils/consent';
import { useState, useRef, useId } from "react";

const WEB3FORMS_KEY = "a4bcce53-4a1d-4217-93b6-30b9d714bbdd";

const PACKAGES = [
  "Adi Kailash & Om Parvat Expedition",
  "Panchachuli Trekking Expedition",
  "Eastern Kumaon Cinematic Expedition",
  "Eastern Kumaon Wilderness Expedition",
  "Himalayan Wellness & Meditation Retreat",
  "Himalayan Photography Expedition",
  "Winter Himalayan Wellness Retreat",
  "Women-Only Expedition Darma Valley",
  "Not decided yet",
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
  "Not decided yet",
];

const gold  = "#c9a96e";
const dark  = "#07090b";

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(201,169,110,0.25)",
  borderRadius: 8,
  padding: "11px 14px",
  color: "#e8e0d4",
  fontSize: "0.9rem",
  fontFamily: "'Cormorant Garamond',Georgia,serif",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle = {
  display: "block",
  fontSize: "0.68rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#c0b8a8",
  marginBottom: 6,
  fontFamily: "'Cormorant Garamond',Georgia,serif",
};

export default function ExpeditionForm({ defaultPackage = "" }) {
  const [whatsApp, setWhatsApp] = useState(null);
  const uid = useId(); // unique per instance — avoids duplicate IDs when 2 forms on same page
  const [form, setForm]     = useState({ name: "", whatsapp: "", pkg: defaultPackage, month: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submissionInFlight = useRef(false)

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.whatsapp || !form.pkg || !form.month) return;
    if (submissionInFlight.current) return
    submissionInFlight.current = true
    setStatus("loading");

    try {
      const res  = await fetch("https://api.web3forms.com/submit", {
        method:  "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key:   WEB3FORMS_KEY,
          subject:      `New Expedition Inquiry — ${form.pkg}`,
          from_name:    form.name,
          name:         form.name,
          whatsapp:     form.whatsapp,
          package:      form.pkg,
          travel_month: form.month,
          botcheck:     "",
        }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        trackEnquiry('Expedition Inquiry');
        // Open WhatsApp with pre-filled message
        const msg = `Hello! I am ${form.name}. My WhatsApp is ${form.whatsapp}. I am interested in the ${form.pkg} package. I am planning to travel in ${form.month}. Please send me the itinerary.`;
        const url = `https://wa.me/919084642557?text=${encodeURIComponent(msg)}`;
        setWhatsApp({ url, opened: openWhatsApp(url) });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      submissionInFlight.current = false
    }
  };

  if (status === "success") {
    return (
      <div role="status" style={{ textAlign: "center", padding: "2rem 1rem" }}>
        <div style={{ fontSize: "2rem", marginBottom: 12 }}>🙏</div>
        <div style={{ fontSize: "1.1rem", color: gold, marginBottom: 8, fontFamily: "'Cormorant Garamond',Georgia,serif" }}>Namaste!</div>
        <div style={{ fontSize: "0.9rem", color: "#b5a898", lineHeight: 1.7, fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
          Your enquiry has been submitted.<br />
          {whatsApp?.opened ? 'Review your details in WhatsApp and send the message when ready.' : 'WhatsApp could not be opened automatically. Use the link below to review and send your message.'}
          <br />
          <a href={whatsApp?.url} target="_blank" rel="noopener noreferrer" style={{ color: gold, textDecoration: "underline" }}>Open WhatsApp</a>
        </div>
      </div>
    );
  }

  return (
    <form data-clarity-mask="true" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Name */}
      <div>
        <label htmlFor={`${uid}-name`} style={labelStyle}>Your Name</label>
        <input
          id={`${uid}-name`} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
          type="text" name="name" value={form.name} onChange={set}
          placeholder="Your Name" required style={inputStyle}
        />
      </div>

      {/* WhatsApp */}
      <div>
        <label htmlFor={`${uid}-whatsapp`} style={labelStyle}>WhatsApp Number</label>
        <input
          id={`${uid}-whatsapp`} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
          type="tel" name="whatsapp" value={form.whatsapp} onChange={set}
          placeholder="WhatsApp Number" required style={inputStyle}
        />
      </div>

      {/* Package */}
      <div>
        <label htmlFor={`${uid}-pkg`} style={labelStyle}>Preferred Travel Package</label>
        <select
          id={`${uid}-pkg`} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
          name="pkg" value={form.pkg} onChange={set}
          required
          style={{ ...inputStyle, cursor: "pointer", appearance: "none", WebkitAppearance: "none" }}
        >
          <option value="" disabled>Select a package…</option>
          {PACKAGES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {/* Month */}
      <div>
        <label htmlFor={`${uid}-month`} style={labelStyle}>Preferred Travel Month</label>
        <select
          id={`${uid}-month`} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
          name="month" value={form.month} onChange={set}
          required
          style={{ ...inputStyle, cursor: "pointer", appearance: "none", WebkitAppearance: "none" }}
        >
          <option value="" disabled>Select month…</option>
          {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {status === "error" && (
        <p role="alert" style={{ fontSize: "0.8rem", color: "#f87171", margin: 0, fontFamily: "inherit" }}>
          Something went wrong. Please try WhatsApp directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          width: "100%",
          padding: "13px 20px",
          background: status === "loading" ? `${gold}88` : gold,
          color: dark,
          border: "none",
          borderRadius: 8,
          fontSize: "0.82rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          transition: "all 0.2s",
          marginTop: 4,
        }}
      >
        {status === "loading" ? "Sending…" : "Get Free Itinerary on WhatsApp"}
      </button>
    </form>
  );
}
