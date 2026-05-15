import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react'

const WEB3FORMS_ACCESS_KEY = "a4bcce53-4a1d-4217-93b6-30b9d714bbdd"

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', expedition: '', pilgrims: '', message: ''
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `New Expedition Inquiry — ${form.expedition || 'General'}`,
        from_name: form.name,
        name: form.name,
        email: form.email,
        phone: form.phone,
        expedition: form.expedition,
        pilgrims: form.pilgrims,
        message: form.message,
        botcheck: '',
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      console.log('Web3Forms response:', res.status, data)

      if (res.ok && data.success) {
        setStatus('success')
      } else {
        console.error('Web3Forms error:', data)
        setStatus('error')
      }
    } catch (err) {
      console.error('Web3Forms fetch failed:', err)
      setStatus('error')
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar activePage="contact" />

      <section className="relative pt-32 pb-20">
        {/* Hero bg */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 to-brand-dark" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="section-tag mb-4">The Final Ascent</p>
            <h1 className="section-title text-5xl lg:text-6xl mb-5">
              Your Himalayan Journey<br />Begins Here
            </h1>
            <p className="font-sans text-brand-text-muted text-lg max-w-xl mx-auto">
              The peaks are calling. Step into a world of ancient wisdom and breathtaking beauty.
              Your spiritual ascent is just a conversation away.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="card-dark">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🙏</div>
                  <h3 className="font-serif text-2xl text-brand-cream mb-3">Namaste!</h3>
                  <p className="font-sans text-brand-text-muted">
                    Your inquiry has been received. Our concierge team will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-serif text-xl text-brand-cream mb-6">Book a Consultation</h3>

                  {[
                    { name: 'name',  label: 'Full Name',        type: 'text',  placeholder: 'Your name',       required: true  },
                    { name: 'email', label: 'Email Address',     type: 'email', placeholder: 'your@email.com',  required: true  },
                    { name: 'phone', label: 'Phone / WhatsApp',  type: 'tel',   placeholder: '+91 or +977...',  required: false },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="block font-sans text-xs text-brand-text-muted mb-2 uppercase tracking-wider">
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="w-full bg-brand-dark border border-brand-dark-border rounded-lg px-4 py-3 text-brand-cream text-sm placeholder-brand-text-muted focus:outline-none focus:border-brand-orange/50 transition-colors"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block font-sans text-xs text-brand-text-muted mb-2 uppercase tracking-wider">
                      Interested Expedition
                    </label>
                    <select
                      name="expedition"
                      value={form.expedition}
                      onChange={handleChange}
                      className="w-full bg-brand-dark border border-brand-dark-border rounded-lg px-4 py-3 text-brand-cream text-sm focus:outline-none focus:border-brand-orange/50 transition-colors"
                    >
                      <option value="" disabled>Select an expedition...</option>
                      <option>Adi Kailash Expedition</option>
                      <option>Panchachuli Trekking Expedition</option>
                      <option>Eastern Kumaon Cinematic Expedition</option>
                      <option>Eastern Kumaon Wilderness Expedition</option>
                      <option>Himalayan Wellness & Meditation Retreat</option>
                      <option>Himalayan Photography Expedition</option>
                      <option>Winter Himalayan Wellness Retreat</option>
                      <option>Women-Only Expedition (Darma Valley)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-sans text-xs text-brand-text-muted mb-2 uppercase tracking-wider">
                      Number of Pilgrims
                    </label>
                    <input
                      type="number"
                      name="pilgrims"
                      value={form.pilgrims}
                      onChange={handleChange}
                      placeholder="e.g. 2"
                      min="1"
                      className="w-full bg-brand-dark border border-brand-dark-border rounded-lg px-4 py-3 text-brand-cream text-sm placeholder-brand-text-muted focus:outline-none focus:border-brand-orange/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs text-brand-text-muted mb-2 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your journey goals..."
                      rows={4}
                      className="w-full bg-brand-dark border border-brand-dark-border rounded-lg px-4 py-3 text-brand-cream text-sm placeholder-brand-text-muted focus:outline-none focus:border-brand-orange/50 transition-colors resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="font-sans text-sm text-red-400">
                      Something went wrong. Please try again or contact us via WhatsApp.
                    </p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? 'Sending...' : 'Book Consultation'}
                    </button>
                    <a
                      href="https://wa.me/9771444000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 border border-green-700/40 text-green-400 text-sm font-sans px-5 py-3 rounded-full hover:bg-green-900/20 transition-all"
                    >
                      <MessageCircle size={14} /> WhatsApp Expert
                    </a>
                  </div>
                </form>
              )}
            </div>

            {/* Info Column */}
            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-2xl text-brand-cream mb-6">Connect With Us</h3>
                <div className="space-y-5">
                  {[
                    { icon: Mail,    label: 'Email',            value: 'info@himalayanserenitytravel.com' },
                    { icon: Phone,   label: 'Phone / WhatsApp', value: '+977-1-444-0000'              },
                    { icon: MapPin,  label: 'Address',          value: 'Pithoragarh, Uttarakhand 262529' },
                  ].map(item => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon size={15} className="text-brand-orange" />
                      </div>
                      <div>
                        <p className="font-sans text-xs text-brand-text-muted uppercase tracking-wider mb-1">{item.label}</p>
                        <p className="font-sans text-brand-cream text-sm">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package Quick CTA */}
              <div className="card-dark">
                <p className="section-tag mb-3">Explore Packages</p>
                <p className="font-sans text-brand-text-muted text-sm mb-5 leading-relaxed">
                  Browse our complete range of curated Himalayan expeditions.
                </p>
                <a href="/packages" className="btn-primary block text-center text-sm">
                  View All Packages
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
