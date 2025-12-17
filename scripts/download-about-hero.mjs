/**
 * Download high-quality hero image from Unsplash for About Us page
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// High-quality greenhouse/garden center images from Unsplash (16:9 aspect ratio)
// Image with darker left side for text overlay
const UNSPLASH_IMAGES = [
  // Greenhouse interior - darker with plants
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1920&h=1080&fit=crop&q=95',
  // Premium greenhouse interior with plants
  'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&h=1080&fit=crop&q=90',
  // Garden center with flowers
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop&q=90',
];

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'backgrounds');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete incomplete file
      reject(err);
    });
  });
}

async function main() {
  console.log('='.repeat(60));
  console.log('Downloading high-quality About Us hero image from Unsplash');
  console.log('='.repeat(60));

  // Try the first image (premium greenhouse)
  const imageUrl = UNSPLASH_IMAGES[0];
  const outputPath = path.join(OUTPUT_DIR, 'about-bg.jpg');

  try {
    console.log('Downloading from:', imageUrl);
    await downloadImage(imageUrl, outputPath);

    // Check file size
    const stats = fs.statSync(outputPath);
    console.log('SUCCESS: Saved to public/images/backgrounds/about-bg.jpg');
    console.log('File size:', (stats.size / 1024).toFixed(0), 'KB');
  } catch (error) {
    console.error('FAILED:', error.message);
  }
}

main().catch(console.error);
