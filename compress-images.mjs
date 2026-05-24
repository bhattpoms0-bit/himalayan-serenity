import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

const IMAGE_DIR = './public/images';
const MAX_WIDTH = 1920;
const QUALITY = 80;

function getAllImages(dir) {
  let results = [];
  const list = readdirSync(dir);
  list.forEach(file => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllImages(filePath));
    } else {
      const ext = extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        results.push(filePath);
      }
    }
  });
  return results;
}

const images = getAllImages(IMAGE_DIR);
console.log(`Found ${images.length} images to compress...`);

let ok = 0, fail = 0;
for (const imgPath of images) {
  const webpPath = imgPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  try {
    await sharp(imgPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(webpPath);
    console.log(`✓ Converted: ${imgPath} → ${webpPath}`);
    ok++;
  } catch (err) {
    console.error(`✗ Failed: ${imgPath}`, err.message);
    fail++;
  }
}
console.log(`\nDone! ${ok} converted, ${fail} failed.`);
