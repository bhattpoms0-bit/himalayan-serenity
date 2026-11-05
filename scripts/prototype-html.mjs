const SITE = 'https://www.himalayanserenitytravel.com'
const IMAGE = SITE + '/images/packages/adi-kailash-base.jpg'
export function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character])
}
const meta = (key, value, attribute = 'name') => `<meta ${attribute}="${key}" content="${escapeHTML(value)}" />`

export function makePrototypeHTML(shell, { markup, metadata }, styles = [], notFound = false) {
  if (!notFound && (!metadata?.title || !metadata?.description || !metadata?.canonical)) {
    throw Error('Approved route metadata was not captured')
  }
  let html = shell
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<link\b[^>]*\brel="canonical"[^>]*>/gi, '')
    .replace(/<meta\b[^>]*(?:name|property)="(?:description|robots|og:[^"]+|twitter:[^"]+)"[^>]*>/gi, '')
  const title = notFound ? '404 · Page not found | Himalayan Serenity Travel' : metadata.title
  const description = notFound
    ? 'We couldn’t find this page. Explore our Himalayan retreats and sacred journeys, or contact our team for help.'
    : metadata.description
  const image = metadata?.image ? new URL(metadata.image, SITE).href : IMAGE
  const head = [
    `<title>${escapeHTML(title)}</title>`,
    meta('description', description),
    meta('og:type', metadata?.type || 'website', 'property'),
    meta('og:title', metadata?.socialTitle || title, 'property'),
    meta('og:description', description, 'property'),
    meta('og:image', image, 'property'),
    meta('og:site_name', 'Himalayan Serenity Travel', 'property'),
    meta('twitter:card', 'summary_large_image'),
    meta('twitter:title', title), meta('twitter:description', description),
    meta('twitter:image', image),
  ]
  if (!notFound) {
    head.push(`<link rel="canonical" href="${escapeHTML(metadata.canonical)}" />`,
      meta('robots', 'index, follow'), meta('og:url', metadata.canonical, 'property'),
      meta('twitter:url', metadata.canonical))
  }
  if (metadata?.schema) {
    for (const schema of Array.isArray(metadata.schema) ? metadata.schema : [metadata.schema]) {
      // Escape '<' so embedded data cannot terminate a script element.
      head.push(`<script type="application/ld+json" data-useseo-schema>${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`)
    }
  }
  for (const file of styles) head.push(`<link rel="stylesheet" href="/${escapeHTML(file)}" />`)
  head.push('<style id="prerender-handoff-style">html[data-prerender-pending] #root{visibility:hidden;position:absolute;inset:0}</style>')
  html = html.replace('</head>', head.join('\n') + '\n</head>')
  // Snapshot forms must never submit a native GET while React is downloading.
  // Original interactive forms mount unchanged in #root at handoff.
  const snapshot = markup.replace(/<form\b/g, '<form inert=""')
  if (!html.includes('<div id="root"></div>')) throw Error('Unexpected Vite root template')
  return html.replace('<div id="root"></div>',
    `<div id="prerender-content">${snapshot}</div><div id="root"></div>`)
}
