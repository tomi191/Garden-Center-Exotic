import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const MIN_SIZE_BYTES = 500 * 1024; // 500KB minimum to optimize

// Directories to scan for large images
const dirsToScan = [
  'images/products/generated',
  'images/services',
  'images/instagram',
  'images/backgrounds',
];

async function getFilesRecursively(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...await getFilesRecursively(fullPath));
    } else if (item.isFile() && item.name.toLowerCase().endsWith('.png')) {
      const stats = fs.statSync(fullPath);
      if (stats.size >= MIN_SIZE_BYTES) {
        files.push({ path: fullPath, size: stats.size });
      }
    }
  }

  return files;
}

async function optimizeImage(filePath, originalSize) {
  const relativePath = path.relative(publicDir, filePath);
  const webpPath = filePath.replace(/\.png$/i, '.webp');

  try {
    // Read the image
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Resize if very large (max 1200px width for products, 1920px for backgrounds)
    const isBackground = filePath.includes('backgrounds');
    const maxWidth = isBackground ? 1920 : 1200;

    let pipeline = image;

    if (metadata.width > maxWidth) {
      pipeline = pipeline.resize(maxWidth, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    // Convert to WebP with good quality
    const webpBuffer = await pipeline
      .webp({
        quality: 85,
        effort: 6
      })
      .toBuffer();

    // Also create optimized PNG as fallback
    const pngBuffer = await pipeline
      .png({
        quality: 85,
        compressionLevel: 9,
        palette: true
      })
      .toBuffer();

    // Write WebP file
    fs.writeFileSync(webpPath, webpBuffer);

    // Overwrite original PNG with optimized version
    fs.writeFileSync(filePath, pngBuffer);

    const newPngSize = pngBuffer.length;
    const webpSize = webpBuffer.length;

    const pngReduction = ((originalSize - newPngSize) / originalSize * 100).toFixed(1);
    const webpReduction = ((originalSize - webpSize) / originalSize * 100).toFixed(1);

    console.log(`✅ ${relativePath}`);
    console.log(`   PNG: ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newPngSize / 1024 / 1024).toFixed(2)}MB (-${pngReduction}%)`);
    console.log(`   WebP: ${(webpSize / 1024 / 1024).toFixed(2)}MB (-${webpReduction}%)`);

    return {
      file: relativePath,
      originalSize,
      newPngSize,
      webpSize,
      success: true
    };
  } catch (error) {
    console.error(`❌ Error optimizing ${relativePath}:`, error.message);
    return {
      file: relativePath,
      originalSize,
      success: false,
      error: error.message
    };
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('============================\n');
  console.log(`Looking for PNG files larger than ${MIN_SIZE_BYTES / 1024}KB...\n`);

  let allFiles = [];

  for (const dir of dirsToScan) {
    const fullDir = path.join(publicDir, dir);
    if (fs.existsSync(fullDir)) {
      const files = await getFilesRecursively(fullDir);
      allFiles.push(...files);
      console.log(`Found ${files.length} large files in ${dir}`);
    }
  }

  console.log(`\nTotal files to optimize: ${allFiles.length}\n`);
  console.log('Starting optimization...\n');

  const results = [];
  let totalOriginal = 0;
  let totalNewPng = 0;
  let totalWebp = 0;

  for (const file of allFiles) {
    const result = await optimizeImage(file.path, file.size);
    results.push(result);

    if (result.success) {
      totalOriginal += result.originalSize;
      totalNewPng += result.newPngSize;
      totalWebp += result.webpSize;
    }
  }

  console.log('\n============================');
  console.log('📊 Summary:');
  console.log(`   Files processed: ${results.filter(r => r.success).length}/${results.length}`);
  console.log(`   Original total: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   Optimized PNG: ${(totalNewPng / 1024 / 1024).toFixed(2)}MB (saved ${((totalOriginal - totalNewPng) / 1024 / 1024).toFixed(2)}MB)`);
  console.log(`   WebP total: ${(totalWebp / 1024 / 1024).toFixed(2)}MB (saved ${((totalOriginal - totalWebp) / 1024 / 1024).toFixed(2)}MB)`);

  const failedFiles = results.filter(r => !r.success);
  if (failedFiles.length > 0) {
    console.log(`\n❌ Failed files: ${failedFiles.length}`);
    failedFiles.forEach(f => console.log(`   - ${f.file}: ${f.error}`));
  }
}

main().catch(console.error);
