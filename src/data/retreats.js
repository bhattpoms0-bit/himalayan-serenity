// Owner-approved Phase 1 product facts. Supplier costing remains provisional.
export const RETREAT_PRICE_NOTE = 'Provisional starting price, subject to final supplier costing. Your final quotation will be confirmed individually.'

export const PANCHACHULI_WELLNESS = {
  name: 'Panchachuli Wellness Retreat',
  listingName: 'Panchachuli Himalayan Wellness & Cultural Immersion Retreat',
  href: '/retreats/panchachuli-wellness',
  days: 9,
  nights: 8,
  startingPrice: 1400,
  stays: [
    { destination: 'Pithoragarh', nights: 3, days: [1, 6, 7] },
    { destination: 'Munsiyari', nights: 4, days: [2, 3, 4, 5] },
    { destination: 'Kasar Devi', nights: 1, days: [8] },
  ],
  route: 'Pithoragarh → Munsiyari → Pithoragarh → Kasar Devi',
  highlights: 'Daily yoga · Sattvic diet · Ayurvedic massage · Panchachuli sunrise',
}

export const WOMENS_SACRED_HIMALAYA = {
  name: "Women's Sacred Himalaya Retreat",
  listingName: "Women's Sacred Himalaya Retreat",
  href: '/retreats/womens-retreat',
  days: 9,
  nights: 8,
  startingPrice: 2000,
  stays: [
    { destination: 'Bhimtal', nights: 1, days: [1] },
    { destination: 'Pithoragarh', nights: 2, days: [2, 7] },
    { destination: 'Munsiyari', nights: 4, days: [3, 4, 5, 6] },
    { destination: 'Abbott Mount', nights: 1, days: [8] },
  ],
  // Simplified hero sequence; the day-seven return to Pithoragarh remains in the itinerary.
  route: 'Bhimtal → Pithoragarh → Munsiyari → Abbott Mount',
  highlights: 'Women-led cultural exchange · Traditional weaving · Sacred landscapes',
}

export const retreatDuration = retreat => `${retreat.days} days / ${retreat.nights} nights`
export const retreatPrice = retreat => `From €${retreat.startingPrice.toLocaleString('en-GB')} per person`
export const retreatCardMeta = retreat => `${retreatDuration(retreat)} · ${retreat.stays.map(stay => stay.destination).join(' · ')}`
