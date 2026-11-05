// Serialize an existing editorial date without inferring a date or timezone.
// Visible article dates remain exactly as authored in blogPosts.
export function articleDate(value) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const match = /^(\w+) (\d{1,2}), (\d{4})$/.exec(value)
  if (!match || !months.includes(match[1])) throw Error('Invalid authored article date: ' + value)
  const month = months.indexOf(match[1]) + 1
  const iso = `${match[3]}-${String(month).padStart(2, '0')}-${match[2].padStart(2, '0')}`
  if (new Date(iso + 'T00:00:00Z').toISOString().slice(0, 10) !== iso) throw Error('Invalid calendar date: ' + value)
  return iso
}
