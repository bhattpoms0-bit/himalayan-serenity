import { RETREAT_PRICE_NOTE, retreatDuration, retreatPrice } from '../data/retreats'

export function RetreatPrice({ retreat, compact = false }) {
  return (
    <div>
      <p className={compact ? 'text-[#e07b2a] font-medium' : 'font-serif text-[#f0ece4] text-2xl sm:text-3xl'}>
        {retreatPrice(retreat)}
      </p>
      <p className={`text-[#f0ece4]/70 leading-relaxed ${compact ? 'text-xs mt-2' : 'text-sm mt-3 max-w-xl'}`}>
        {RETREAT_PRICE_NOTE}
      </p>
    </div>
  )
}

export function RetreatOverview({ retreat }) {
  return (
    <div className="max-w-3xl mb-8">
      <p className="text-[#f0ece4]/85 text-base leading-7 mb-6" aria-label="Journey route">
        {retreat.route}
      </p>
      <RetreatPrice retreat={retreat} />
    </div>
  )
}

export function RetreatAccommodation({ retreat, women = false }) {
  const accent = women ? 'text-rose-300' : 'text-[#5DCAA5]'
  return (
    <section aria-labelledby="accommodation-heading" className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20">
      <div className="max-w-3xl">
        <p className={`${accent} text-xs uppercase tracking-widest mb-4`}>Your accommodation</p>
        <h2 id="accommodation-heading" className="font-serif text-[#f0ece4] text-3xl sm:text-4xl leading-tight mb-6">
          Rest Where the Mountains Meet the Sky
        </h2>
        <div className="text-[#f0ece4]/75 text-base leading-7 space-y-4">
          <p>Throughout your journey, stay in thoughtfully selected boutique hotels and intimate mountain retreats, chosen for their comfort, hospitality and connection to the Himalayan landscape.</p>
          <p>In Munsiyari, we prioritise accommodation with beautiful views of the Panchachuli peaks, creating a peaceful setting for reflection, mindful mornings and moments of stillness.</p>
          <p>Individual hotel names, assigned yoga teachers, facilitators and supplier arrangements are discussed during your personal consultation after enquiry. Relevant final arrangements will be set out in your written proposal before payment.</p>
        </div>
      </div>
      <ul aria-label={`${retreatDuration(retreat)} accommodation overview`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {retreat.stays.map(stay => (
          <li key={stay.destination} className="border border-white/10 rounded-xl p-6 bg-white/[0.02]">
            <p className={`${accent} text-sm mb-2`}>{stay.nights} {stay.nights === 1 ? 'night' : 'nights'}</p>
            <h3 className="font-serif text-[#f0ece4] text-xl">{stay.destination}</h3>
            {stay.destination === 'Pithoragarh' && <p className="text-[#f0ece4]/60 text-sm mt-2">Across two stays</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}
