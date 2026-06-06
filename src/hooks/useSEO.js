import { useEffect } from 'react'

const DEFAULT_TITLE = 'Himalayan Serenity | Adi Kailash Yatra & Om Parvat Tour from Delhi'

function setMeta(name, content, attr = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.content = content
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function removeCanonical() {
  const el = document.querySelector('link[rel="canonical"]')
  if (el) el.remove()
}

export function useSEO({ title, description, canonical }) {
  useEffect(() => {
    document.title = title
    setMeta('description', description)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    if (canonical) setCanonical(canonical)
    return () => {
      document.title = DEFAULT_TITLE
      if (canonical) removeCanonical()
    }
  }, [title, description, canonical])
}
