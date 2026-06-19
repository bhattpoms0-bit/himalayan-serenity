/**
 * optimize-images.mjs
 *
 * 1. Converts every .jfif file in public/images → .webp (quality 85)
 * 2. Creates desktop (1920px q85) and mobile (768px q75) WebP variants
 *    for the listed hero images
 *
 * Run: node optimize-images.mjs
 */

import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname  = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC_IMG = path.join(__dirname, 'public/images')

// Hero images that need responsive desktop + mobile WebP variants
const HERO_TARGETS = [
  'retreats/himalayan-yoga-meditation-retreat-hero.webp',
  'retreats/kumaon-wellness/group-yoga-khaliya-top-panchachuli-himalaya-hero.webp',
  'retreats/womens-retreat/international-woman-kumaoni-women-himalayan-village-panchachuli.webp',
  'retreats/borderlands/kumaon-himalaya-luxury-retreat-sunrise-view.webp',
  'retreats/darma-detox/darma-valley-panchachuli-peaks-golden-sunrise-hero.jfif',
  'packages/adi-kailash/adi-kailash-nandi.webp',
]

async function kb(p) {
  try { return Math.round((await stat(p)).size / 1024) }
  catch { return 0 }
}

async function scanJFIF(dir, out = []) {
  const entries = await readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) await scanJFIF(full, out)
    else if (/\.jfif$/i.test(e.name)) out.push(full)
  }
  return out
}

async function main() {
  // ── 1. Convert all JFIF → WebP ─────────────────────────────────────
  console.log('\n══════════════════════════════════════════════════')
  console.log('  STEP 1: Convert all JFIF files to WebP (q85)')
  console.log('══════════════════════════════════════════════════\n')

  const jfifs      = await scanJFIF(PUBLIC_IMG)
  let jfifSavedKB  = 0
  const jfifLog    = []

  for (const jfifPath of jfifs) {
    const webpPath = jfifPath.replace(/\.jfif$/i, '.webp')
    const before   = await kb(jfifPath)
    try {
      await sharp(jfifPath).webp({ quality: 85 }).toFile(webpPath)
      const after  = await kb(webpPath)
      const saved  = before - after
      jfifSavedKB += saved
      const rel    = path.relative(PUBLIC_IMG, jfifPath)
      console.log(`  ✓  ${rel}`)
      console.log(`     ${before} KB  →  ${after} KB  (saved ${saved} KB)\n`)
      jfifLog.push({ rel, before, after, saved })
    } catch (err) {
      console.log(`  ✗  ${path.relative(PUBLIC_IMG, jfifPath)} — ${err.message}\n`)
    }
  }

  // ── 2. Create desktop + mobile WebP variants for hero images ────────
  console.log('══════════════════════════════════════════════════')
  console.log('  STEP 2: Desktop (1920px q85) + Mobile (768px q75) variants')
  console.log('══════════════════════════════════════════════════\n')

  const heroLog = []

  for (const rel of HERO_TARGETS) {
    const input    = path.join(PUBLIC_IMG, rel)
    const base     = input.replace(/\.(jfif|webp|jpg|jpeg|png)$/i, '')
    const deskPath = base + '-desktop.webp'
    const mobiPath = base + '-mobile.webp'
    const before   = await kb(input)
    try {
      await sharp(input)
        .resize(1920, null, { withoutEnlargement: true, fit: 'inside' })
        .webp({ quality: 85 })
        .toFile(deskPath)
      await sharp(input)
        .resize(768, null, { withoutEnlargement: true, fit: 'inside' })
        .webp({ quality: 75 })
        .toFile(mobiPath)
      const deskKB = await kb(deskPath)
      const mobiKB = await kb(mobiPath)
      console.log(`  ✓  ${rel}`)
      console.log(`     Original:      ${before} KB`)
      console.log(`     Desktop 1920px: ${deskKB} KB`)
      console.log(`     Mobile  768px:  ${mobiKB} KB  (saves ${before - mobiKB} KB on mobile)\n`)
      heroLog.push({ rel, before, deskKB, mobiKB })
    } catch (err) {
      console.log(`  ✗  ${rel} — ${err.message}\n`)
    }
  }

  // ── Summary ─────────────────────────────────────────────────────────
  const mobiSaved = heroLog.reduce((s, r) => s + r.before - r.mobiKB, 0)

  console.log('══════════════════════════════════════════════════')
  console.log('  SUMMARY')
  console.log('══════════════════════════════════════════════════\n')
  console.log(`  JFIF files converted:      ${jfifLog.length}`)
  console.log(`  KB saved (JFIF → WebP):    ${jfifSavedKB} KB`)
  console.log(`  Hero variants created:      ${heroLog.length * 2} files (${heroLog.length} desktop + ${heroLog.length} mobile)`)
  console.log(`  KB saved per mobile visit:  ~${mobiSaved} KB (across all hero pages)\n`)
}

main().catch(console.error)
