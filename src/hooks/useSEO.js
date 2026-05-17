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

export function useSEO({ title, description }) {
  useEffect(() => {
    document.title = title
    setMeta('description', description)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    return () => { document.title = DEFAULT_TITLE }
  }, [title, description])
}
