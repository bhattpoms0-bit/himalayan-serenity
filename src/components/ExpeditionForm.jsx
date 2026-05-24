import { useState } from "react";

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
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle = {
  display: "block",
  fontSize: "0.68rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#7a7068",
  marginBottom: 6,
  fontFamily: "'Cormorant Garamond',Georgia,serif",
};

export default function ExpeditionForm({ defaultPackage = "" }) {
  const [form, setForm]     = useState({ name: "", whatsapp: "", pkg: defaultPackage, month: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.whatsapp || !form.pkg || !form.month) return;
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
        if (typeof window.gtag !== "undefined") {
          window.gtag("event", "form_submit", { event_category: "Expedition Inquiry", value: 1 });
        }
        // Open WhatsApp with pre-filled message
        const msg = `Hello! I am ${form.name}. My WhatsApp is ${form.whatsapp}. I am interested in the ${form.pkg} package. I am planning to travel in ${form.month}. Please send me the itinerary.`;
        window.open(`https://wa.me/919084642557?text=${encodeURIComponent(msg)}`, "_blank");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
        <div style={{ fontSize: "2rem", marginBottom: 12 }}>🙏</div>
        <div style={{ fontSize: "1.1rem", color: gold, marginBottom: 8, fontFamily: "'Cormorant Garamond',Georgia,serif" }}>Namaste!</div>
        <div style={{ fontSize: "0.9rem", color: "#b5a898", lineHeight: 1.7, fontFamily: "'Cormorant Garamond',Georgia,serif" }}>
          WhatsApp is opening with your details.<br />We will send your itinerary shortly!
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Name */}
      <div>
        <label style={labelStyle}>Your Name</label>
        <input
          type="text" name="name" value={form.name} onChange={set}
          placeholder="Your Name" required style={inputStyle}
        />
      </div>

      {/* WhatsApp */}
      <div>
        <label style={labelStyle}>WhatsApp Number</label>
        <input
          type="tel" name="whatsapp" value={form.whatsapp} onChange={set}
          placeholder="WhatsApp Number" required style={inputStyle}
        />
      </div>

      {/* Package */}
      <div>
        <label style={labelStyle}>Preferred Travel Package</label>
        <select
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
        <label style={labelStyle}>Preferred Travel Month</label>
        <select
          name="month" value={form.month} onChange={set}
          required
          style={{ ...inputStyle, cursor: "pointer", appearance: "none", WebkitAppearance: "none" }}
        >
          <option value="" disabled>Select month…</option>
          {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {status === "error" && (
        <p style={{ fontSize: "0.8rem", color: "#f87171", margin: 0, fontFamily: "inherit" }}>
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
