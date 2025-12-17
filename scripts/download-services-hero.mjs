import fs from 'fs';
import path from 'path';
import https from 'https';

// High-quality Unsplash images for services page (floral design, professional arrangements)
const UNSPLASH_IMAGES = [
  // Professional florist at work
  'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=1920&h=1080&fit=crop&q=95',
  // Beautiful flower arrangement workspace
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&q=95',
  // Elegant floral design
  'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=1920&h=1080&fit=crop&q=95',
  // Professional bouquet making
  'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=1920&h=1080&fit=crop&q=95',
];

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'backgrounds');

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(OUTPUT_DIR, filename);
    const file = fs.createWriteStream(filePath);

    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        https.get(response.headers.location, (redirectResponse) => {
          redirectResponse.pipe(file);
          file.on('finish', () => {
            file.close();
            console.log(`Downloaded: ${filename}`);
            resolve(filePath);
          });
        }).on('error', reject);
      } else {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${filename}`);
          resolve(filePath);
        });
      }
    }).on('error', (err) => {
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log('Downloading services hero image from Unsplash...\n');

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Download the first (best) option
  const url = UNSPLASH_IMAGES[0];
  const filename = 'services-bg.jpg';

  try {
    await downloadImage(url, filename);
    console.log(`\nSuccess! Image saved to: public/images/backgrounds/${filename}`);
    console.log('\nNote: Update the image src in app/uslugi/page.tsx from .png to .jpg');
  } catch (error) {
    console.error('Error downloading image:', error.message);

    // Try next image if first fails
    console.log('\nTrying alternative image...');
    try {
      await downloadImage(UNSPLASH_IMAGES[1], filename);
      console.log(`\nSuccess with alternative! Image saved to: public/images/backgrounds/${filename}`);
    } catch (err) {
      console.error('Alternative also failed:', err.message);
    }
  }
}

main();
