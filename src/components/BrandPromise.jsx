export default function BrandPromise({ className = 'bg-brand-dark-2', showThemes = false }) {
  return (
    <section className={`${className} py-16 sm:py-20 px-6 border-y border-white/[0.06]`}>
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-brand-gold text-xs uppercase tracking-luxury mb-4">Our approach</p>
        <h2 className="font-serif text-brand-cream text-3xl sm:text-4xl leading-tight mb-6">Rooted in the Himalayas. Guided by Care.</h2>
        <div className="font-sans text-brand-cream-muted text-base leading-relaxed space-y-5">
          <p>We create thoughtfully curated journeys through the Kumaon Himalaya, bringing travellers closer to its landscapes, living traditions and sacred heritage.</p>
          <p>With intimate groups, personalised attention and a commitment to responsible travel, we believe the most meaningful journeys are experienced slowly, respectfully and authentically.</p>
        </div>
        {showThemes && <ul className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10 pt-8 border-t border-brand-gold/20 text-brand-cream text-sm leading-relaxed">
          {['Local Himalayan Knowledge', 'Personalised Small-Group Experiences', 'Responsible Himalayan Travel'].map(theme => <li key={theme}>{theme}</li>)}
        </ul>}
      </div>
    </section>
  )
}
