import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const logoPath = path.join(publicDir, 'images', 'logos', '47815_Exotic_DP-01.png');

async function generateFavicons() {
  console.log('Generating favicons from logo...');

  // Read the original logo
  const logo = sharp(logoPath);
  const metadata = await logo.metadata();
  console.log(`Original logo: ${metadata.width}x${metadata.height}`);

  // For favicon, we need a square image
  // The logo is horizontal, so we'll create a square version
  // First, let's extract and resize maintaining aspect ratio with padding

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];

  // Create a square version of the logo with white/transparent background
  // We'll fit the logo into a square and add padding
  for (const { name, size } of sizes) {
    const outputPath = path.join(publicDir, name);

    await sharp(logoPath)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toFile(outputPath);

    console.log(`Created: ${name} (${size}x${size})`);
  }

  // Create favicon.ico (we'll use the 32x32 PNG as base)
  // Sharp doesn't support ICO directly, so we'll create a high-quality PNG
  // and update the HTML to use PNG favicons (modern browsers support this)

  // Also create og-image.jpg for social sharing (1200x630)
  await sharp(logoPath)
    .resize(1200, 630, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .jpeg({ quality: 90 })
    .toFile(path.join(publicDir, 'images', 'og-image.jpg'));

  console.log('Created: images/og-image.jpg (1200x630)');

  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);
