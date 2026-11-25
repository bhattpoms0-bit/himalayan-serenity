import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { blogPosts } from '../src/data/blogPosts.js'

const baseline = '0646c4633b65a8a83e35f8eee04fa62e40a5fd97'
const git = (...args) => execFileSync('git', ['-c', `safe.directory=${process.cwd().replaceAll('\\', '/')}`, ...args], { encoding: 'utf8' })
const oldSource = path => git('show', `${baseline}:${path}`).replace(/\r\n/g, '\n')
const source = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8').replace(/\r\n/g, '\n')
const { blogPosts: original } = await import('data:text/javascript;base64,' + Buffer.from(oldSource('src/data/blogPosts.js')).toString('base64'))
const digest = value => createHash('sha256').update(value).digest('hex')
const decode = value => value.replace(/&(?:amp|lt|gt|quot|apos|#39|#x27);/g, e => ({ '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'", '&#39;': "'", '&#x27;': "'" })[e])
const text = html => decode(html.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim()
const tags = (html, tag) => [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>`, 'g'))].map(m => Object.fromEntries([...m[1].matchAll(/([\w:-]+)="([^"]*)"/g)].map(a => [a[1], decode(a[2])])))
const approved = {
  'om-parvat-natural-om-symbol': {
    title: 'Om Parvat: A Guide to the Sacred Om Formation',
    subtitle: 'The sacred formation, Nabhidhang viewpoint and thoughtful journey planning',
    metaTitle: 'Om Parvat Guide: Nabhidhang Viewpoint | Himalayan Serenity',
    metaDescription: 'Learn about Om Parvat’s natural Om-shaped formation, religious significance and Nabhidhang viewpoint in Pithoragarh, Uttarakhand.',
    excerpt: 'Learn about Om Parvat’s natural Om-shaped formation, Nabhidhang viewpoint and pilgrimage significance.',
    image: '/images/packages/adi-kailash/om-parvat-2.webp',
    imageAlt: 'Snow-covered Himalayan mountain peaks beneath a deep blue sky and passing clouds.',
    content: [
      "## What Is Om Parvat?",
      "Om Parvat is a Himalayan mountain in Pithoragarh district, Uttarakhand, known for a natural formation resembling the sacred Om symbol. Its appeal brings together a distinctive mountain face and a place of pilgrimage. Understanding both helps visitors approach the journey with interest and respect.",
      "This guide introduces the destination and the questions worth asking before travel. It is not confirmation of current permits, road access or departure arrangements. Those details need checking for the dates and circumstances of your own journey.",
      "## The Natural Om-Shaped Formation",
      "The Pithoragarh district administration describes the Om shape as a natural rock formation. The resemblance is part of the mountain landscape, rather than an inscription placed on it. Snow and the contrast between light and dark areas can make the shape striking in photographs.",
      "A photograph records one moment, not a permanent viewing condition. Avoid treating a particular snow pattern, an edited picture or a promotional description as a promise of what you will see. Let the landscape be the subject of observation rather than expecting an exact copy of an image.",
      "## Spiritual Significance and Local Beliefs",
      "The district tourism account describes Om Parvat as sacred to Hindus and Buddhists and records beliefs associating it with Lord Shiva. These are religious traditions and interpretations, distinct from the geographic fact that the mountain has a naturally occurring formation.",
      "For pilgrims, the experience may be devotional; other visitors may come for the scenery and cultural context. Approach prayer and worship respectfully. Ask before photographing people or ceremonies, and allow space for those who wish to spend time quietly.",
      "## Nabhidhang Viewpoint",
      "Nabhidhang is the viewing location identified by the district administration, which places it on the Kailash Mansarovar pilgrimage route. The purpose of a visit is to view the mountain from an appropriate location, rather than to assume that a journey involves climbing Om Parvat.",
      "Confirm where your proposed itinerary plans to stop and what access is available at the time. A named viewpoint on a map does not establish that every visitor can reach it on every date. Ask how a change in conditions would affect the day.",
      "## Om Parvat and Adi Kailash: The Difference",
      "Om Parvat and Adi Kailash are separate destinations, even when they appear together in a pilgrimage programme. Om Parvat is associated with the natural Om-shaped formation. The district's Adi Kailash account describes its religious associations with Shiva and Parvati, along with Parvati Sarovar and Gauri Kund.",
      "Read each day's destination carefully when comparing journeys. A photograph or the shared use of sacred names should not substitute for a clear itinerary. Ask which places are included in the proposed journey and which remain dependent on conditions.",
      "## Planning a Journey from Pithoragarh",
      "If you are planning from Pithoragarh, begin with the joining point, the onward travel plan and the arrangements for the return. Establish who will communicate changes and what information you should reconfirm before leaving home.",
      "Ask for a written itinerary that explains the proposed stops, transport and overnight arrangements. Check current official guidance separately from older blogs or general destination descriptions. Agree how delays or unavailable access would be handled, rather than assuming that a published programme guarantees every stop.",
      "## Weather and Visibility",
      "Treat clear views as a possibility, not a promise tied to a particular hour or month. Cloud, precipitation and changing mountain conditions can affect both visibility and the practical decisions made during a journey.",
      "Check forecasts and official travel advisories close to departure, then continue checking information relevant to the onward route. Leave room in your expectations for a different view from the one in a photograph. A responsible decision to change plans can matter more than obtaining a particular image.",
      "## Practical Preparation",
      "Prepare clothing layers, weather protection and footwear for the conditions and walking described in your own itinerary. Check fit and comfort before departure, and keep essential personal items accessible during travel.",
      "Confirm accepted identity documents, any permit requirements and who is responsible for the necessary arrangements. Ask whether health documentation is required; do not infer a rule from an old packing list. Discuss personal health concerns with an appropriate clinician before travel and clarify the support and emergency arrangements for the specific journey.",
      "## Responsible Travel in the Himalaya",
      "Carry your litter back to an appropriate disposal point and avoid leaving offerings or packaging in the landscape. Respect local instructions about photography, worship and movement around sensitive places.",
      "Stay on permitted routes, avoid disturbing wildlife, and ask before entering private or religious spaces. Treat residents as people with homes and working lives, rather than as part of a photographic backdrop. Thoughtful conduct supports a respectful visit whether your main interest is pilgrimage, landscape photography or learning about the region.",
      "## Explore the Existing Journey",
      "Use the existing Adi Kailash and Om Parvat journey page to understand that particular programme. Compare its proposed destinations with your interests, and raise questions about access, preparation and arrangements before deciding.",
      "The article provides destination background; the journey page is the place to review the existing itinerary. Confirm current details directly rather than assuming that general destination information establishes commercial inclusions.",
      "Review the linked Adi Kailash and Om Parvat itinerary for the arrangements of that specific journey."
],
    rejected: /6,191|4,340|22 km|7-10|eternal snow|Many pilgrims report|October offers|Most pilgrims/,
  },
  'best-time-visit-adi-kailash-season-guide': {
    title: 'Best Time to Visit Adi Kailash: Seasonal Planning',
    subtitle: 'Published seasonal guidance and questions to check before travel',
    metaTitle: 'Best Time to Visit Adi Kailash: Seasons | Himalayan Serenity',
    metaDescription: 'Review published Adi Kailash seasonal guidance, rainy-season restrictions and the access checks to make before choosing travel dates.',
    excerpt: 'An overview of published seasonal guidance and the access checks to make before choosing travel dates.',
    imageAlt: 'Snow-covered mountain peak framed by clouds.',
    content: [
      'The Ministry of Tourism’s Pithoragarh destination plan identifies May, June and September as peak months for Adi Kailash and describes winter and rainy-season restrictions dependent on climatic conditions. This is seasonal planning guidance, not confirmation of access on particular travel dates.',
      '## May–June: Planning Options',
      'Consider May and June as planning options, then confirm access and arrangements for your proposed dates.',
      '## July - August: Monsoon Season',
      'Do not rely on an operator’s general safety assurance as confirmation that rainy-season travel is permitted or suitable for your dates.',
      '## September–October: Confirm Access',
      'September is included in the plan’s peak-month list. Confirm October access separately rather than assuming the same conditions or availability.',
      '## November–April: Check Winter Access',
      'Confirm the current winter access position rather than assuming a fixed November–April closure period.',
      '## Our Recommendation',
      'Choose dates after checking current access, weather information and the arrangements for your proposed journey.',
    ],
    rejected: /perfect weather|absolute best|can safely navigate|lower accommodation costs|Higher costs|rhododendrons|Yatra is not possible|Crystal clear skies|more pilgrims/,
  },
  'what-to-pack-himalayan-spiritual-journey': {
    title: 'What to Pack for Adi Kailash and Om Parvat',
    metaTitle: 'Adi Kailash & Om Parvat Packing Guide | Himalayan Serenity',
    metaDescription: 'Plan clothing layers, footwear and personal items for Adi Kailash and Om Parvat, with document questions to confirm before travel.',
    excerpt: 'A planning checklist for clothing, footwear, documents to confirm and personal spiritual items.',
    imageAlt: 'Snow-covered mountain peaks above a rocky valley under a blue sky.',
    content: [
      'Packing for a high-altitude Himalayan expedition requires careful planning. You need to balance warmth, functionality, and keeping your pack light enough to carry comfortably.',
      '## Clothing Essentials', '**Base Layers**',
      'Consider wool or synthetic base layers; choose quantities for your journey.',
      '**Insulation Layer**', 'Choose an insulating layer suited to the expected conditions.',
      '**Outer Shell**', 'A waterproof, windproof jacket and pants protect against sudden weather changes.',
      '**Accessories**', '- Wool or fleece hat covering ears', '- Balaclava for extreme cold', '- UV-protection sunglasses', '- Warm gloves and liner gloves',
      '## Footwear', 'Choose footwear suited to the planned walking and expected conditions. Use it before departure to check comfort and fit.',
      '## Documents to Confirm Before Travel',
      '- Confirm which identity document is accepted for your journey.',
      '- Confirm permit requirements and who is responsible for arranging any required permit.',
      '- Confirm whether a medical fitness certificate is required and the accepted format.',
      '- Carry emergency contact information.',
      '## Spiritual Items', '- Prayer beads (mala)', '- Small idol or photo of your deity', '- Confirm local rules before carrying offering materials',
      '## What NOT to Pack', '- Excessive clothing', '- Heavy books', '- Valuables (leave jewelry at home)', '- Unnecessary disposable packaging',
    ],
    rejected: /-10°C|2-3 sets|critical above|we arrange this|Aadhaar Card|you can wash basics|experienced guides share|non-negotiable/,
  },
}

for (const [slug, expected] of Object.entries(approved)) {
  test(`${slug}: exact approved copy and no unsupported assertions`, () => {
    const post = blogPosts.find(p => p.slug === slug)
    for (const [key, value] of Object.entries(expected)) {
      if (key === 'content') assert.deepEqual(post.content.split('\n').map(s => s.trim()).filter(Boolean), value)
      else if (key !== 'rejected') assert.equal(post[key], value, key)
    }
    assert.doesNotMatch(JSON.stringify(post), expected.rejected)
    const before = original.find(p => p.slug === slug)
    const allowed = new Set(Object.keys(expected).filter(k => k !== 'rejected'))
    for (const key of new Set([...Object.keys(before), ...Object.keys(post)])) {
      if (!allowed.has(key)) assert.deepEqual(post[key], before[key], `${key} must remain unchanged`)
    }
  })
}

test('every unselected blog record remains identical to the verified Production baseline', () => {
  const followUp = new Set(['adi-kailash-ilp-guide-2026', 'adi-kailash-vs-kailash-mansarovar'])
  assert.deepEqual(blogPosts.filter(p => !approved[p.slug] && !followUp.has(p.slug)), original.filter(p => !approved[p.slug] && !followUp.has(p.slug)))
  const correctedFields = new Set(['title', 'subtitle', 'metaTitle', 'metaDescription', 'excerpt'])
  for (const slug of followUp) {
    const before = original.find(p => p.slug === slug), after = blogPosts.find(p => p.slug === slug)
    for (const key of new Set([...Object.keys(before), ...Object.keys(after)])) {
      if (!correctedFields.has(key)) assert.deepEqual(after[key], before[key], `${slug}: ${key}`)
    }
  }
  assert.deepEqual(blogPosts.map(p => p.slug), original.map(p => p.slug))
})

test('BlogPost preserves the complete shared renderer outside the isolated Om hero and source notes plus approved anchors', () => {
  let expected = oldSource('src/pages/BlogPost.jsx')
  const changes = [
    ['Most pilgrims visit both Om Parvat and Adi Kailash in a single 7-10 day expedition, as they are located in the same region.', approved['om-parvat-natural-om-symbol'].content.at(-1)],
    ['For first-time pilgrims, we recommend **September** as the ideal month — perfect weather, clear views, and a deeply spiritual atmosphere as the summer crowds thin out.', approved['best-time-visit-adi-kailash-season-guide'].content.at(-1)],
  ]
  for (const [before, after] of changes) {
    assert.equal(expected.split(before).length - 1, 1)
    expected = expected.replace(before, after)
  }
  let actual = source('src/pages/BlogPost.jsx')
  assert.equal((actual.match(/\/\/ BEGIN Om Parvat route-only hero/g) || []).length, 1)
  actual = actual.replace(/\/\/ BEGIN Om Parvat route-only hero[\s\S]*?\/\/ END Om Parvat route-only hero\n\n/, '')
  actual = actual.replace("  const isOmParvat = slug === 'om-parvat-natural-om-symbol'\n", '')
  actual = actual.replace('      {isOmParvat ? <OmParvatHero post={post} /> : (\n', '')
  actual = actual.replace('      )}\n\n      {/* ── Content', '      {/* ── Content')
  actual = actual.replace('        {!isOmParvat && (\n        <p', '        <p')
  actual = actual.replace('          {post.subtitle}\n        </p>\n        )}', '          {post.subtitle}\n        </p>')
  actual = actual.replace(/        {\/\* BEGIN Om Parvat source notes \*\/}[\s\S]*?        {\/\* END Om Parvat source notes \*\/}\n\n/, '')
  assert.equal(actual, expected)
})

test('C2 remains published intact; only the authorised follow-up source and regression files may differ', () => {
  const published = 'b7b393aa678835938484a19a642c660e9808c42c'
  const productionFiles = ['src/data/blogPosts.js', 'src/pages/AdiKailashExpedition.jsx', 'src/pages/blog/AdiKailashILPGuide.jsx', 'src/pages/blog/AdiKailashVsKailashMansarovar.jsx']
  const testFiles = ['tests/adi-article-seo.test.mjs', 'tests/adi-kailash-onpage-seo.test.mjs', 'tests/blog-seo.test.mjs', 'tests/seo-content-consistency.test.mjs']
  const trackedChanges = git('diff', '--name-only', '-z', published).split('\0').filter(Boolean)
  const untrackedFiles = git('ls-files', '--others', '--exclude-standard', '-z').split('\0').filter(Boolean)
  assert.deepEqual(trackedChanges.filter(path => !testFiles.includes(path)).sort(), productionFiles)
  assert.deepEqual([...new Set([...trackedChanges, ...untrackedFiles])].sort(), [...productionFiles, ...testFiles])
  for (const path of ['src/pages/BlogPost.jsx', 'src/components/GlobalNav.jsx', 'public/favicon.svg']) {
    assert.equal(digest(source(path)), digest(git('show', `${published}:${path}`).replace(/\r\n/g, '\n')), path)
  }
})


const { blogPosts: reviewedFeature } = await import('data:text/javascript;base64,' + Buffer.from(git('show', 'abe82c84b8c28199d52cb14f552905e39358dae3:src/data/blogPosts.js')).toString('base64'))

test('seasonal and packing records remain byte-for-byte equivalent as data to the owner-approved feature', () => {
  for (const slug of ['best-time-visit-adi-kailash-season-guide', 'what-to-pack-himalayan-spiritual-journey']) {
    assert.deepEqual(blogPosts.find(p => p.slug === slug), reviewedFeature.find(p => p.slug === slug))
  }
})

test('Om destination guide has 700-1000 words, ten sections and an accurate non-identifying image description', () => {
  const post = blogPosts.find(p => p.slug === 'om-parvat-natural-om-symbol')
  const words = post.content.split('\n').filter(line => !line.startsWith('## ')).join(' ').trim().split(/\s+/).length
  assert.ok(words >= 700 && words <= 1000, String(words))
  assert.equal(post.content.split('\n').filter(line => line.startsWith('## ')).length, 10)
  assert.doesNotMatch(post.imageAlt, /Om|Nabhidhang|sacred/i)
  assert.doesNotMatch(post.content, /\bguaranteed\b|\b\d[\d,.]*\s*(?:km|metres|meters|hours)\b|we arrange|all-inclusive/i)
  assert.equal(post.date, 'March 28, 2025')
})

test('GlobalNav changes only the exact authorised Om route-specific breadcrumb corrections', () => {
  let actual = source('src/components/GlobalNav.jsx')
  const corrections = [
    [
        "  const isHome       = pathname === '/'",
        "  const isHome       = pathname === '/'\n  const isOmParvat = pathname === '/blog/om-parvat-natural-om-symbol'"
    ],
    [
        "            style={{ top: 76 }}",
        "            style={isOmParvat ? { top: 76, right: 20, width: 'fit-content', maxWidth: 'calc(100vw - 40px)', padding: '8px 10px', background: '#101e2b', border: '1px solid #a68a50', borderRadius: 6 } : { top: 76 }}"
    ],
    [
        "color: '#3a3a3a', fontSize: 10",
        "color: isOmParvat ? '#d5bc83' : '#3a3a3a', fontSize: 10"
    ],
    [
        "                        style={LINK_STYLE}",
        "                        style={isOmParvat ? { ...LINK_STYLE, color: '#e6d4ab', fontSize: 12 } : LINK_STYLE}"
    ],
    [
        "onMouseEnter={e => (e.currentTarget.style.color = '#aaaaaa')}",
        "onMouseEnter={e => (e.currentTarget.style.color = isOmParvat ? '#f0e8d8' : '#aaaaaa')}"
    ],
    [
        "onMouseLeave={e => (e.currentTarget.style.color = '#666666')}",
        "onMouseLeave={e => (e.currentTarget.style.color = isOmParvat ? '#e6d4ab' : '#666666')}"
    ],
    [
        "                        style={MUTED_STYLE}",
        "                        style={isOmParvat ? { ...MUTED_STYLE, color: '#f0e8d8', fontSize: 12 } : MUTED_STYLE}"
    ]
]
  for (const [before, after] of corrections) {
    assert.equal(actual.split(after).length - 1, 1)
    actual = actual.replace(after, before)
  }
  assert.equal(actual, oldSource('src/components/GlobalNav.jsx'))
})

const packagePath = '/packages/adi-kailash-expedition'
const links = [
  [packagePath, '/blog/best-time-visit-adi-kailash-season-guide', 'Adi Kailash seasonal travel guide'],
  [packagePath, '/blog/what-to-pack-himalayan-spiritual-journey', 'Himalayan expedition packing guide'],
  ['/blog/adi-kailash-complete-guide-2024', '/blog/adi-kailash-ilp-guide-2026', 'Adi Kailash Inner Line Permit guide'],
  ['/blog/om-parvat-natural-om-symbol', packagePath, 'View the Adi Kailash and Om Parvat itinerary'],
  ['/blog/best-time-visit-adi-kailash-season-guide', packagePath, 'Explore the Adi Kailash and Om Parvat itinerary'],
  ['/blog/what-to-pack-himalayan-spiritual-journey', packagePath, 'Explore the Adi Kailash and Om Parvat journey'],
]
for (const output of ['dist', 'dist-preview', 'dist-prototype', 'dist-vercel']) {
  const htmlAt = path => readFileSync(new URL(`../${output}${path}/index.html`, import.meta.url), 'utf8')
  for (const [slug, expected] of Object.entries(approved)) {
    test(`${output}/${slug}: complete initial HTML metadata, headings, image and preserved schema`, () => {
      const html = htmlAt('/blog/' + slug), post = blogPosts.find(p => p.slug === slug)
      assert.equal(text(html.match(/<title>([\s\S]*?)<\/title>/)[1]), expected.metaTitle)
      assert.deepEqual(tags(html, 'meta').filter(m => m.name === 'description').map(m => m.content), [expected.metaDescription])
      assert.equal(text(html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)[1]), expected.title)
      assert.deepEqual([...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map(m => text(m[1])), expected.content.filter(s => s.startsWith('## ')).map(s => s.slice(3)))
      for (const line of expected.content) assert.ok(text(html).includes(line.replace(/^## /, '').replace(/^\*\*|\*\*$/g, '')), line)
      assert.deepEqual(tags(html, 'img').filter(i => i.src === post.image).map(i => i.alt), [expected.imageAlt])
      const url = 'https://www.himalayanserenitytravel.com/blog/' + slug
      assert.deepEqual(tags(html, 'link').filter(l => l.rel === 'canonical').map(l => l.href), [url])
      const schemas = [...html.matchAll(/<script type="application\/ld\+json" data-useseo-schema>(.*?)<\/script>/g)].map(m => JSON.parse(m[1]))
      assert.deepEqual(schemas, [{ '@context': 'https://schema.org', '@type': 'BlogPosting', headline: expected.title, description: expected.excerpt,
        image: post.image, author: { '@type': 'Organization', name: post.author },
        publisher: { '@type': 'Organization', name: 'Himalayan Serenity', logo: { '@type': 'ImageObject', url: 'https://www.himalayanserenitytravel.com/favicon.svg' } },
        datePublished: { 'om-parvat-natural-om-symbol': '2025-03-28', 'best-time-visit-adi-kailash-season-guide': '2025-01-15', 'what-to-pack-himalayan-spiritual-journey': '2025-02-20' }[slug],
        keywords: post.keywords.join(', '), mainEntityOfPage: { '@type': 'WebPage', '@id': url } }])
    })
  }

  test(`${output}: Om hero and readable breadcrumbs are isolated from the approved seasonal and packing heroes`, () => {
    const html = htmlAt('/blog/om-parvat-natural-om-symbol')
    const hero = html.match(/<header\b[^>]*data-om-parvat-hero[\s\S]*?<\/header>/)?.[0]
    assert.ok(hero)
    assert.doesNotMatch(hero, /linear-gradient|absolute inset-0/)
    assert.ok(hero.indexOf('<img') < hero.indexOf('<h1'))
    assert.ok(hero.includes('Himalayan mountain landscape'))
    assert.ok(tags(hero, 'img').some(img => img.src === '/images/packages/adi-kailash/om-parvat-2.webp' && img.loading === 'eager'))
    assert.ok(html.includes('aria-label="Article sources"'))
    for (const url of ['https://pithoragarh.nic.in/tourist-place/om-parvat/', 'https://pithoragarh.nic.in/tourist-place/adi-kailash/']) {
      assert.equal(tags(html, 'a').filter(a => a.href === url).length, 1)
    }
    const crumbs = html.match(/<nav\b[^>]*aria-label="Breadcrumb"[\s\S]*?<\/nav>/)?.[0]
    assert.ok(crumbs?.includes('#e6d4ab') && crumbs.includes('#f0e8d8'))
    for (const slug of ['best-time-visit-adi-kailash-season-guide', 'what-to-pack-himalayan-spiritual-journey']) {
      const other = htmlAt('/blog/' + slug)
      assert.doesNotMatch(other, /data-om-parvat-hero|aria-label="Article sources"/)
      assert.doesNotMatch(other.match(/<nav\b[^>]*aria-label="Breadcrumb"[\s\S]*?<\/nav>/)?.[0] || '', /#e6d4ab/)
    }
  })

  test(`${output}: all six C1 links remain unique in their contextual paragraphs`, () => {
    for (const [path, destination, label] of links) {
      const html = htmlAt(path)
      const paragraphs = [...html.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].map(m => m[1])
      const matching = paragraphs.filter(p => [...p.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].some(m => tags('<a ' + m[1] + '>', 'a')[0].href === destination && text(m[2]) === label))
      assert.equal(matching.length, 1, `${path}: ${label}`)
      const anchors = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].filter(m => tags('<a ' + m[1] + '>', 'a')[0].href === destination && text(m[2]) === label)
      assert.equal(anchors.length, 1)
      if (approved[path.slice(6)]) {
        const expectedAnchor = path.includes('what-to-pack') ? approved[path.slice(6)].content[0] : approved[path.slice(6)].content.at(-1)
        assert.ok(text(matching[0]).startsWith(expectedAnchor))
      }
    }
  })
}
