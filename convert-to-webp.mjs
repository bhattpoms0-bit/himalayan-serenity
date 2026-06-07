/**
 * convert-to-webp.mjs
 * 1. Converts every JPG/PNG in public/images → .webp (originals kept)
 *    - JPG/JPEG photos : quality 85
 *    - PNG infographics: quality 90
 * 2. Updates all /images/... references in src/ files to use .webp extension
 *    (external URLs like flagcdn.com are untouched)
 */

import sharp from 'sharp';
import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { join, extname, relative } from 'path';

const IMAGE_DIR  = './public/images';
const SRC_DIR    = './src';
const PHOTO_Q    = 85;   // JPG → WebP quality
const INFOGFX_Q  = 90;   // PNG → WebP quality

// ── helpers ────────────────────────────────────────────────────────────────

function walkImages(dir) {
  const results = [];
  for (const file of readdirSync(dir)) {
    const fp = join(dir, file);
    if (statSync(fp).isDirectory()) {
      results.push(...walkImages(fp));
    } else if (['.jpg', '.jpeg', '.png'].includes(extname(file).toLowerCase())) {
      results.push(fp);
    }
  }
  return results;
}

function walkSrc(dir) {
  const results = [];
  for (const file of readdirSync(dir)) {
    const fp = join(dir, file);
    if (statSync(fp).isDirectory()) {
      results.push(...walkSrc(fp));
    } else if (/\.(jsx?|tsx?|css)$/.test(file)) {
      results.push(fp);
    }
  }
  return results;
}

const KB = (b) => Math.round(b / 1024 * 10) / 10;

// ── STEP 1 — Convert images ────────────────────────────────────────────────

const images = walkImages(IMAGE_DIR);
console.log(`Converting ${images.length} images to WebP…\n`);

const convReport = [];
let ok = 0, fail = 0;

for (const src of images) {
  const ext      = extname(src).toLowerCase();
  const isPng    = ext === '.png';
  const quality  = isPng ? INFOGFX_Q : PHOTO_Q;
  const webpPath = src.replace(/\.(jpe?g|png)$/i, '.webp');
  const before   = statSync(src).size;
  const alreadyHad = existsSync(webpPath) ? KB(statSync(webpPath).size) : null;

  try {
    await sharp(src).webp({ quality }).toFile(webpPath);
    const after = statSync(webpPath).size;
    convReport.push({
      name      : relative(IMAGE_DIR, src).replace(/\\/g, '/'),
      ext       : ext.slice(1).toUpperCase(),
      quality,
      before    : KB(before),
      after     : KB(after),
      reduction : Math.round((before - after) / before * 100 * 10) / 10,
      alreadyHad,
      error     : null,
    });
    ok++;
  } catch (err) {
    convReport.push({
      name: relative(IMAGE_DIR, src).replace(/\\/g, '/'),
      ext: ext.slice(1).toUpperCase(), quality,
      before: KB(before), after: null, reduction: null, alreadyHad, error: err.message,
    });
    fail++;
    console.error(`  ✗ ${src}: ${err.message}`);
  }
}

// ── STEP 2 — Update src/ references ───────────────────────────────────────

const srcFiles = walkSrc(SRC_DIR);
const REF_RE   = /(\/images\/[^'"`\s]+?)\.(jpe?g|png)(['"`])/g;
const refUpdates = [];

for (const fp of srcFiles) {
  const original = readFileSync(fp, 'utf8');
  let count = 0;
  const updated = original.replace(REF_RE, (_, path, _ext, q) => {
    count++;
    return `${path}.webp${q}`;
  });
  if (count > 0) {
    writeFileSync(fp, updated, 'utf8');
    refUpdates.push({ file: relative(SRC_DIR, fp).replace(/\\/g, '/'), count });
  }
}

// ── STEP 3 — Print reports ─────────────────────────────────────────────────

const W = 108;
const C1 = 64;

console.log('\n' + '═'.repeat(W));
console.log('WEBP CONVERSION — BEFORE / AFTER');
console.log('═'.repeat(W));
console.log(
  'Image'.padEnd(C1) +
  'Fmt'.padStart(5) +
  'Q'.padStart(4) +
  'Before'.padStart(10) +
  'After'.padStart(10) +
  'Saved'.padStart(9)
);
console.log('─'.repeat(W));

for (const r of convReport) {
  if (r.error) {
    const n = r.name.length > C1 - 1 ? '…' + r.name.slice(-(C1-2)) : r.name;
    console.log(n.padEnd(C1) + r.ext.padStart(5) + String(r.quality).padStart(4) +
      (r.before + ' KB').padStart(10) + 'ERROR'.padStart(10) + `  ${r.error}`);
    continue;
  }
  const n = r.name.length > C1 - 1 ? '…' + r.name.slice(-(C1-2)) : r.name;
  const saved = r.reduction !== null ? `-${r.reduction}%` : '—';
  const prev  = r.alreadyHad !== null ? ` (was ${r.alreadyHad} KB)` : ' (new)';
  console.log(
    n.padEnd(C1) +
    r.ext.padStart(5) +
    String(r.quality).padStart(4) +
    (r.before  + ' KB').padStart(10) +
    (r.after   + ' KB').padStart(10) +
    saved.padStart(9) +
    prev
  );
}

console.log('─'.repeat(W));
const totBefore = convReport.filter(r => !r.error).reduce((s, r) => s + r.before, 0);
const totAfter  = convReport.filter(r => !r.error).reduce((s, r) => s + r.after,  0);
const totSaved  = totBefore - totAfter;
const totPct    = totBefore > 0 ? (totSaved / totBefore * 100).toFixed(1) : 0;
console.log(
  'TOTAL (originals → WebP)'.padEnd(C1 + 9) +
  (Math.round(totBefore) + ' KB').padStart(10) +
  (Math.round(totAfter)  + ' KB').padStart(10) +
  (`-${totPct}%`).padStart(9)
);
console.log(`\n  ✓ Converted  : ${ok}   ✗ Failed: ${fail}`);
console.log(`  Total saved  : ${Math.round(totSaved)} KB (${(totSaved/1024).toFixed(1)} MB) vs originals\n`);

console.log('─'.repeat(W));
console.log('SRC/ REFERENCE UPDATES');
console.log('─'.repeat(W));
const totalRefs = refUpdates.reduce((s, r) => s + r.count, 0);
for (const u of refUpdates) {
  console.log(`  ${u.file.padEnd(70)} ${u.count} reference${u.count > 1 ? 's' : ''} updated`);
}
console.log(`\n  Total: ${totalRefs} references updated across ${refUpdates.length} files\n`);
