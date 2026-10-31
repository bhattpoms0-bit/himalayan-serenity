import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { applyConsent, clearTrackingCookies, CONSENT_KEY, CONSENT_LIFETIME, readConsent, saveConsent } from '../utils/consent'
import './cookie-consent.css'

export default function CookieConsent() {
  const [choice, setChoice] = useState(readConsent)
  const [visible, setVisible] = useState(() => !readConsent())
  const [settings, setSettings] = useState(false)
  const [draft, setDraft] = useState(() => readConsent() || { analytics: false, recording: false })
  const [notice, setNotice] = useState('')
  const panel = useRef(null)
  const settingsButton = useRef(null)
  const returnFocus = useRef(null)

  useEffect(() => {
    const saved = readConsent()
    clearTrackingCookies({ analytics: !saved?.analytics, recording: !saved?.recording })
    applyConsent(saved)
    const open = () => {
      returnFocus.current = document.activeElement
      setDraft(readConsent() || { analytics: false, recording: false })
      setSettings(true)
      setVisible(true)
    }
    const sync = event => { if (event.key === CONSENT_KEY || event.key === null) location.reload() }
    window.addEventListener('hs-open-privacy', open)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('hs-open-privacy', open)
      window.removeEventListener('storage', sync)
    }
  }, [])

  useEffect(() => {
    // Browser timeout values are limited to about 24 days; use a bounded check.
    const expiry = window.setInterval(() => {
      if (choice && Date.now() - choice.savedAt >= CONSENT_LIFETIME) location.reload()
    }, 60000)
    return () => clearInterval(expiry)
  }, [choice])

  useEffect(() => { if (settings && visible) panel.current?.focus() }, [settings, visible])

  useLayoutEffect(() => {
    if (!visible || !panel.current) return
    const root = document.documentElement
    let frame = 0
    const observed = new Set()
    const measure = () => {
      const actions = [...document.querySelectorAll('[data-mobile-actions]')]
      const current = new Set(actions)
      for (const element of observed) if (!current.has(element)) { resize.unobserve(element); observed.delete(element) }
      for (const element of actions) if (!observed.has(element)) { resize.observe(element); observed.add(element) }
      const actionsHeight = Math.max(0, ...actions.map(element => element.offsetWidth ? element.offsetHeight : 0))
      root.style.setProperty('--privacy-dock-height', `${Math.ceil(panel.current?.getBoundingClientRect().height || 0)}px`)
      root.style.setProperty('--privacy-actions-height', `${actionsHeight}px`)
      root.classList.add('privacy-dock-visible')
    }
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }
    const resize = new ResizeObserver(schedule)
    resize.observe(panel.current)
    const mutations = new MutationObserver(schedule)
    mutations.observe(document.getElementById('root'), { childList: true, subtree: true })
    window.addEventListener('resize', schedule)
    measure()
    return () => {
      cancelAnimationFrame(frame)
      resize.disconnect()
      mutations.disconnect()
      window.removeEventListener('resize', schedule)
      root.classList.remove('privacy-dock-visible')
      root.style.removeProperty('--privacy-dock-height')
      root.style.removeProperty('--privacy-actions-height')
    }
  }, [visible])

  function close() {
    setSettings(false)
    setVisible(!choice)
    requestAnimationFrame(() => {
      (returnFocus.current?.isConnected ? returnFocus.current : settingsButton.current)?.focus()
    })
  }
  function save(next) {
    const result = saveConsent(next)
    setChoice(result.choice)
    setVisible(false)
    setSettings(false)
    setNotice(result.persisted ? 'Privacy preferences saved.' : 'Preferences apply for this visit. Your browser could not save them for future visits.')
    requestAnimationFrame(() => {
      (returnFocus.current?.isConnected ? returnFocus.current : settingsButton.current)?.focus()
    })
  }

  return <>
    <span className="sr-only" role="status">{notice}</span>
    {visible && <section ref={panel} tabIndex={-1} role="region" aria-label="Privacy choices"
      data-floating-avoid className="privacy-dock"
      onKeyDown={event => { if (event.key === 'Escape' && settings) close() }}>
      {settings && <div id="privacy-preferences" className="privacy-preferences">
        <h2>Privacy Settings</h2>
        <p>Choose which optional analytics you allow. New preferences start off.</p>
        <div className="privacy-options">
          <label><input type="checkbox" checked={draft.analytics} onChange={e => setDraft({ ...draft, analytics: e.target.checked })} /> Google Analytics: visit statistics</label>
          <label><input type="checkbox" checked={draft.recording} onChange={e => setDraft({ ...draft, recording: e.target.checked })} /> Microsoft Clarity: recordings and heatmaps</label>
        </div>
        <p>Your choice is remembered for 180 days. Turning off an active service reloads the page; save unfinished enquiries first. Advertising stays off. Withdrawal stops future collection and does not erase earlier provider records.</p>
      </div>}
      <div className="privacy-bar">
        <p>We use optional analytics to improve your experience.</p>
        <Link className="privacy-policy-link" to="/privacy">Privacy Policy</Link>
        <div className="privacy-actions">
          <button type="button" onClick={() => save({ analytics: true, recording: true })}>Accept</button>
          <button type="button" onClick={() => save({ analytics: false, recording: false })}>Reject</button>
          {settings ? <><button type="button" onClick={() => save(draft)}>Save</button><button type="button" onClick={close}>Close settings</button></> :
            <button ref={settingsButton} type="button" aria-expanded={false} aria-controls="privacy-preferences" onClick={() => { returnFocus.current = document.activeElement; setDraft(choice || { analytics: false, recording: false }); setSettings(true) }}>Settings</button>}
        </div>
      </div>
    </section>}
  </>
}
