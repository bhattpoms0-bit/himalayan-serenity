import sharp from 'sharp';
import { readdirSync, statSync, renameSync, unlinkSync } from 'fs';
import { join, extname, basename, relative } from 'path';

const IMAGE_DIR = './public/images';
const JPG_TARGET_KB = 200;
const PNG_TARGET_KB = 150;
const JPG_QUALITY = 85;

function getAllImages(dir) {
  let results = [];
  for (const file of readdirSync(dir)) {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(getAllImages(filePath));
    } else {
      const ext = extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        results.push(filePath);
      }
    }
  }
  return results;
}

const images = getAllImages(IMAGE_DIR);
console.log(`Found ${images.length} images to process...\n`);

const report = [];
let compressedCount = 0;
let skippedCount = 0;
let errorCount = 0;

for (const imgPath of images) {
  const ext = extname(imgPath).toLowerCase();
  const isJpeg = ['.jpg', '.jpeg'].includes(ext);
  const isPng = ext === '.png';
  const sizeBefore = statSync(imgPath).size;
  const sizeBeforeKB = sizeBefore / 1024;
  const targetKB = isJpeg ? JPG_TARGET_KB : PNG_TARGET_KB;
  const relName = relative(IMAGE_DIR, imgPath).replace(/\\/g, '/');

  if (sizeBeforeKB <= targetKB) {
    report.push({
      name: relName,
      before: Math.round(sizeBeforeKB * 10) / 10,
      after: Math.round(sizeBeforeKB * 10) / 10,
      reduction: 0,
      status: 'SKIPPED',
    });
    skippedCount++;
    continue;
  }

  const tmpPath = imgPath + '.__tmp__';
  try {
    if (isJpeg) {
      await sharp(imgPath)
        .jpeg({ quality: JPG_QUALITY, mozjpeg: true })
        .toFile(tmpPath);
    } else {
      await sharp(imgPath)
        .png({ compressionLevel: 9, palette: false })
        .toFile(tmpPath);
    }

    const sizeAfter = statSync(tmpPath).size;
    const sizeAfterKB = sizeAfter / 1024;
    const reduction = ((sizeBefore - sizeAfter) / sizeBefore * 100);

    if (sizeAfter < sizeBefore) {
      unlinkSync(imgPath);
      renameSync(tmpPath, imgPath);
      report.push({
        name: relName,
        before: Math.round(sizeBeforeKB * 10) / 10,
        after: Math.round(sizeAfterKB * 10) / 10,
        reduction: Math.round(reduction * 10) / 10,
        status: 'COMPRESSED',
      });
      compressedCount++;
    } else {
      unlinkSync(tmpPath);
      report.push({
        name: relName,
        before: Math.round(sizeBeforeKB * 10) / 10,
        after: Math.round(sizeBeforeKB * 10) / 10,
        reduction: 0,
        status: 'SKIPPED (no gain)',
      });
      skippedCount++;
    }
  } catch (err) {
    try { unlinkSync(tmpPath); } catch {}
    report.push({
      name: relName,
      before: Math.round(sizeBeforeKB * 10) / 10,
      after: Math.round(sizeBeforeKB * 10) / 10,
      reduction: 0,
      status: `ERROR: ${err.message}`,
    });
    errorCount++;
    console.error(`  ✗ ${relName}: ${err.message}`);
  }
}

// ── Print report ──────────────────────────────────────────────────────────────
const COL = 62;
console.log('\n' + '═'.repeat(110));
console.log('BEFORE / AFTER COMPRESSION REPORT');
console.log('═'.repeat(110));
console.log(
  'Image'.padEnd(COL) +
  'Before'.padStart(10) +
  'After'.padStart(10) +
  'Saved'.padStart(10) +
  '  Status'
);
console.log('─'.repeat(110));

for (const r of report) {
  const saved = r.reduction > 0 ? `-${r.reduction}%` : '—';
  const name = r.name.length > COL - 1 ? '…' + r.name.slice(-(COL - 2)) : r.name;
  console.log(
    name.padEnd(COL) +
    (`${r.before} KB`).padStart(10) +
    (`${r.after} KB`).padStart(10) +
    saved.padStart(10) +
    `  ${r.status}`
  );
}

console.log('─'.repeat(110));

const totalBefore = report.reduce((s, r) => s + r.before, 0);
const totalAfter = report.reduce((s, r) => s + r.after, 0);
const totalSaved = totalBefore - totalAfter;
const totalPct = totalBefore > 0 ? (totalSaved / totalBefore * 100).toFixed(1) : 0;

console.log(
  'TOTAL'.padEnd(COL) +
  (`${Math.round(totalBefore)} KB`).padStart(10) +
  (`${Math.round(totalAfter)} KB`).padStart(10) +
  (`-${totalPct}%`).padStart(10)
);
console.log(`\n  ✓ Compressed : ${compressedCount}`);
console.log(`  ○ Skipped    : ${skippedCount}`);
console.log(`  ✗ Errors     : ${errorCount}`);
console.log(`  Total saved  : ${Math.round(totalSaved)} KB (${(totalSaved/1024).toFixed(1)} MB)\n`);
