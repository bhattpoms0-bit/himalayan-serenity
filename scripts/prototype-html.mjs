const SITE = 'https://www.himalayanserenitytravel.com'
const IMAGE = SITE + '/images/packages/adi-kailash-base.jpg'
export function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character])
}
const meta = (key, value, attribute = 'name') => `<meta ${attribute}="${key}" content="${escapeHTML(value)}" />`

export function robotsForTarget(target, authored = 'index, follow') {
  if (!['production', 'preview'].includes(target)) throw Error('Unknown indexing target')
  if (typeof authored !== 'string' || !authored.trim()) throw Error('Invalid authored robots directives')
  if (target === 'production') return authored
  const extra = authored.split(',').map(value => value.trim().toLowerCase()).filter(value => value && !['index', 'follow', 'noindex', 'nofollow'].includes(value))
  return [...new Set(['noindex', 'nofollow', ...extra])].join(', ')
}

export function setDocumentRobots(html, target) {
  const matches = [...html.matchAll(/<meta\b[^>]*name="robots"[^>]*>/gi)]
  const directives = matches.map(match => /content="([^"]*)"/i.exec(match[0])?.[1]).filter(Boolean)
  // Preserve an intentional exclusion if the input document already has one.
  const authored = directives.find(value => /\bnoindex\b/i.test(value)) || directives[0] || 'index, follow'
  const stripped = html.replace(/<meta\b[^>]*name="robots"[^>]*>(?:\r?\n)?/gi, '')
  if (!stripped.includes('</head>')) throw Error('Document has no head')
  return stripped.replace('</head>', meta('robots', robotsForTarget(target, authored)) + '\n</head>')
}

export function makePrototypeHTML(shell, { markup, metadata }, styles = [], notFound = false, target = 'production') {
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
    meta('robots', robotsForTarget(target, metadata?.robots || (notFound ? 'noindex, nofollow' : 'index, follow'))),
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
      meta('og:url', metadata.canonical, 'property'),
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
