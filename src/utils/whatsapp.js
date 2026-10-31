// A browser may refuse the popup or throw. Opening a window never sends a message.
export function openWhatsApp(url) {
  try {
    const popup = window.open(url, '_blank')
    if (!popup) return false
    try { popup.opener = null } catch { /* Some browsers restrict the window proxy. */ }
    return true
  } catch {
    return false
  }
}
