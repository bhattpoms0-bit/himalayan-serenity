import { useEffect } from 'react'

const SITE_URL = 'https://www.himalayanserenitytravel.com/'
const DEFAULT_TITLE = 'Himalayan Wellness Retreats in Kumaon, India | Himalayan Serenity Travel'
const DEFAULT_DESCRIPTION = 'Intimate yoga retreats, mindful mountain experiences and authentic Himalayan culture in Kumaon, Uttarakhand, India. Explore Himalayan Serenity wellness retreats and sacred journeys.'
// Preserve the existing sharing asset until route-specific images are approved.
const DEFAULT_IMAGE = `${SITE_URL}images/packages/adi-kailash-base.jpg`

function setMeta(name, content, attr = 'name') {
  const matches = [...document.querySelectorAll(`meta[${attr}="${name}"]`)]
  let el = matches.shift()
  matches.forEach(duplicate => duplicate.remove())
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.content = content
}

function setCanonical(href) {
  const matches = [...document.querySelectorAll('link[rel="canonical"]')]
  let el = matches.shift()
  matches.forEach(duplicate => duplicate.remove())
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setPageMetadata({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION, canonical = SITE_URL, image = DEFAULT_IMAGE, type = 'website', socialTitle = title } = {}) {
  document.title = title
  setMeta('description', description)
  setCanonical(canonical)
  setMeta('og:title', socialTitle, 'property')
  setMeta('og:description', description, 'property')
  setMeta('og:url', canonical, 'property')
  setMeta('og:image', new URL(image, SITE_URL).href, 'property')
  setMeta('og:type', type, 'property')
  setMeta('twitter:card', 'summary_large_image')
  setMeta('twitter:title', title)
  setMeta('twitter:description', description)
  setMeta('twitter:image', new URL(image, SITE_URL).href)
  setMeta('twitter:url', canonical)
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

export function useSEO({ title, description, canonical, schema, image, type, socialTitle }) {
  useEffect(() => {
    const pageUrl = canonical || new URL(window.location.pathname, SITE_URL).href
    setPageMetadata({ title, description, canonical: pageUrl, image, type, socialTitle })
    if (schema) injectSchemas(schema)
    return () => {
      if (schema) removeSchemas()
      setPageMetadata()
    }
  }, [title, description, canonical, schema, image, type, socialTitle])
}
