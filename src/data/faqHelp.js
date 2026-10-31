export const FAQ_HELP_TOPICS = ['Package Cost', 'Best Time', 'Safety', 'Senior Citizens', 'Visa Help', 'Weather']

export function getFaqHelpReply(question) {
  const text = question.toLowerCase()
  if (/cost|price|payment|quote|package/.test(text)) return 'Prices and inclusions depend on the journey. Review the relevant journey page and request a written quotation through the enquiry form for your plans.'
  if (/senior|fitness|health|age/.test(text)) return 'Suitability depends on the route, altitude, health and fitness. Discuss participation requirements with the team before booking, and seek qualified medical advice where appropriate.'
  if (/safe|oxygen|medical|emergency|insurance/.test(text)) return 'Support and emergency arrangements depend on the itinerary. Confirm what is included before booking. Travel insurance is strongly recommended; check cover for your planned destinations and activities.'
  if (/visa|permit|passport/.test(text)) return 'Travel-document and permit requirements depend on the destination and traveller. Ask the team about your specific itinerary and check requirements with the relevant authorities.'
  if (/weather|season|best time|date/.test(text)) return 'Conditions vary by route, altitude and season. This helper does not provide live weather or availability. Review the journey page and contact the team to discuss your travel plans.'
  return 'This helper provides general journey information and does not send your question to the team. For personal assistance, use WhatsApp or the enquiry form below. You can also choose a topic to explore general guidance.'
}
