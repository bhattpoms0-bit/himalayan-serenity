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
    title: 'Om Parvat: The Sacred Om Formation and Nabhidhang Viewpoint',
    subtitle: 'The natural Om-shaped formation and its pilgrimage significance',
    metaTitle: 'Om Parvat Guide: Nabhidhang Viewpoint | Himalayan Serenity',
    metaDescription: 'Learn about Om Parvat’s natural Om-shaped formation, religious significance and Nabhidhang viewpoint in Pithoragarh, Uttarakhand.',
    excerpt: 'Learn about Om Parvat’s natural Om-shaped formation, Nabhidhang viewpoint and pilgrimage significance.',
    imageAlt: 'Snow-streaked mountain peaks above a rocky valley and river.',
    content: [
      'Om Parvat is a mountain in Pithoragarh district, Uttarakhand, known for a natural formation resembling the sacred Om (ॐ) symbol.',
      '## Natural Om Formation',
      'The district tourism description identifies the Om shape as a natural rock formation on the mountain face.',
      '## Spiritual Significance',
      'For devout Hindus, seeing the natural Om on the mountain face is considered an extremely auspicious blessing.',
      '## Nabhidhang Viewpoint',
      'Om Parvat can be viewed from Nabhidhang on the Kailash Mansarovar route.',
      '## Viewing Conditions',
      'Treat clear views as a possibility, not a promise tied to a particular hour or month.',
      '## Combining with Adi Kailash',
      'Review the linked Adi Kailash and Om Parvat itinerary for the arrangements of that specific journey.',
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
  assert.deepEqual(blogPosts.filter(p => !approved[p.slug]), original.filter(p => !approved[p.slug]))
  assert.deepEqual(blogPosts.map(p => p.slug), original.map(p => p.slug))
})

test('BlogPost changes only the two approved exact insertion anchors', () => {
  let expected = oldSource('src/pages/BlogPost.jsx')
  const changes = [
    ['Most pilgrims visit both Om Parvat and Adi Kailash in a single 7-10 day expedition, as they are located in the same region.', approved['om-parvat-natural-om-symbol'].content.at(-1)],
    ['For first-time pilgrims, we recommend **September** as the ideal month — perfect weather, clear views, and a deeply spiritual atmosphere as the summer crowds thin out.', approved['best-time-visit-adi-kailash-season-guide'].content.at(-1)],
  ]
  for (const [before, after] of changes) {
    assert.equal(expected.split(before).length - 1, 1)
    expected = expected.replace(before, after)
  }
  assert.equal(source('src/pages/BlogPost.jsx'), expected)
})

test('production scope is limited to two source files and C2 release scope to three files; package, existing tests and deferred pages are untouched', () => {
  const productionFiles = ['src/data/blogPosts.js', 'src/pages/BlogPost.jsx']
  const testFile = 'tests/adi-article-seo.test.mjs'
  const trackedChanges = git('diff', '--name-only', '-z', baseline).split('\0').filter(Boolean)
  const untrackedFiles = git('ls-files', '--others', '--exclude-standard', '-z').split('\0').filter(Boolean)
  assert.deepEqual(trackedChanges.filter(path => path !== testFile).sort(), productionFiles)
  assert.deepEqual([...new Set([...trackedChanges, ...untrackedFiles])].sort(), [...productionFiles, testFile])
  for (const path of ['src/pages/AdiKailashExpedition.jsx', 'src/pages/blog/AdiKailashILPGuide.jsx', 'src/pages/blog/AdiKailashVsKailashMansarovar.jsx', 'tests/adi-kailash-onpage-seo.test.mjs', 'tests/blog-seo.test.mjs', 'public/favicon.svg']) {
    assert.equal(digest(source(path)), digest(oldSource(path)), path)
  }
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
