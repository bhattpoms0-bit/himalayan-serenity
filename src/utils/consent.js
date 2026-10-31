export const CONSENT_KEY = 'hs-privacy-v1'
export const CONSENT_LIFETIME = 180 * 24 * 60 * 60 * 1000
const GA_ID = 'G-KSWWR8H3WM'
const CLARITY_ID = 'wo7l0sf1rk'
let current = { analytics: false, recording: false }
let started = { analytics: false, recording: false }

export function readConsent() {
  try {
    // Emergency fail-closed reload when the browser refuses a withdrawal write.
    if (new URLSearchParams(location.search).get('privacy') === 'off') return null
    const value = JSON.parse(localStorage.getItem(CONSENT_KEY))
    if (value?.version === 1 && typeof value.analytics === 'boolean' && typeof value.recording === 'boolean' &&
      Number.isFinite(value.savedAt) && value.savedAt <= Date.now() && Date.now() - value.savedAt < CONSENT_LIFETIME) return value
  } catch { /* Unavailable or malformed storage means no permission. */ }
  return null
}

function script(id, src) {
  if (document.getElementById(id)) return
  const element = document.createElement('script')
  element.id = id
  element.async = true
  element.src = src
  document.head.appendChild(element)
}

// Remove known first-party analytics cookies, including parent-domain/path variants.
// Third-party/HttpOnly cookies cannot be erased by this website.
export function clearTrackingCookies({ analytics = true, recording = true } = {}) {
  const domains = location.hostname.split('.').map((_, i, parts) => parts.slice(i).join('.'))
  const paths = location.pathname.split('/').map((_, i, parts) => parts.slice(0, i + 1).join('/') || '/')
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.trim().split('=')[0]
    if (!(analytics && /^(_ga(?:_|$)|_gid$|_gat(?:_|$))/.test(name)) &&
        !(recording && /^(_clck$|_clsk$)/.test(name))) continue
    for (const path of new Set(['/', ...paths])) {
      for (const domain of ['', ...domains, ...domains.map(d => `.${d}`)]) {
        document.cookie = `${name}=; Max-Age=0; path=${path}${domain ? `; domain=${domain}` : ''}; SameSite=Lax`
      }
    }
  }
}

export function applyConsent(choice) {
  current = { analytics: choice?.analytics === true, recording: choice?.recording === true }
  if (current.analytics && !started.analytics) {
    started.analytics = true
    window[`ga-disable-${GA_ID}`] = false
    window.dataLayer = window.dataLayer || []
    window.gtag = function () { window.dataLayer.push(arguments) }
    window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
    window.gtag('consent', 'update', { analytics_storage: 'granted' })
    window.gtag('js', new Date())
    window.gtag('config', GA_ID, {
      allow_google_signals: false, allow_ad_personalization_signals: false,
      // Do not copy enquiry query strings or fragments to explicit page events.
      page_location: location.origin + location.pathname, page_referrer: '',
    })
    script('hs-google-analytics', `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`)
  }
  if (current.recording && !started.recording) {
    started.recording = true
    window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments) }
    window.clarity('consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' })
    script('hs-clarity', `https://www.clarity.ms/tag/${CLARITY_ID}`)
  }
}

export function saveConsent(choice) {
  const next = { version: 1, analytics: choice.analytics === true, recording: choice.recording === true, savedAt: Date.now() }
  let persisted = true
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(next)) } catch { persisted = false }
  if (persisted && new URLSearchParams(location.search).get('privacy') === 'off') {
    const url = new URL(location.href)
    url.searchParams.delete('privacy')
    history.replaceState(history.state, '', url.href)
  }
  const withdrawal = (started.analytics && !next.analytics) || (started.recording && !next.recording)
  if (withdrawal) {
    current = { analytics: false, recording: false }
    window[`ga-disable-${GA_ID}`] = true
    window.gtag?.('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
    window.clarity?.('consentv2', { analytics_Storage: 'denied', ad_Storage: 'denied' })
    clearTrackingCookies()
    // Removing script elements alone cannot stop already-running SDKs.
    // Reload starts a fresh document with only the saved permissions.
    if (persisted) location.reload()
    else {
      // An older grant must not become active again after a failed save.
      try { localStorage.removeItem(CONSENT_KEY) } catch { /* URL veto also covers read-only storage. */ }
      const url = new URL(location.href)
      url.searchParams.set('privacy', 'off')
      location.replace(url.href)
    }
  } else {
    if (!next.analytics && !next.recording) clearTrackingCookies()
    applyConsent(next)
  }
  return { choice: next, persisted }
}

export function trackEnquiry(category) {
  if (current.analytics && readConsent()?.analytics) {
    window.gtag?.('event', 'form_submit', { event_category: category, value: 1 })
  }
}

export function openPrivacySettings() {
  window.dispatchEvent(new Event('hs-open-privacy'))
}
