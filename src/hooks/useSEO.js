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

function injectSchemas(schemas) {
  // Remove any previously injected schema scripts before re-injecting
  document.querySelectorAll('script[data-useseo-schema]').forEach(el => el.remove())
  const list = Array.isArray(schemas) ? schemas : [schemas]
  list.forEach(data => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-useseo-schema', '')
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  })
}

function removeSchemas() {
  document.querySelectorAll('script[data-useseo-schema]').forEach(el => el.remove())
}

export function useSEO({ title, description, canonical, schema }) {
  useEffect(() => {
    document.title = title
    setMeta('description', description)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    if (canonical) setCanonical(canonical)
    if (schema) injectSchemas(schema)
    return () => {
      document.title = DEFAULT_TITLE
      if (canonical) removeCanonical()
      if (schema) removeSchemas()
    }
  }, [title, description, canonical, schema])
}
