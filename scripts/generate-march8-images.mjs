/**
 * March 8 (Women's Day) Image Generation Script
 * Using KIE AI - Z-Image model
 *
 * Usage: node scripts/generate-march8-images.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration - KIE AI
const KIE_API_KEY = '68b095368a4615c4259c546dee223fe9';
const KIE_API_BASE = 'https://api.kie.ai';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'march8');
const MODEL = 'z-image';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// March 8 Image Prompts
const MARCH8_IMAGES = [
  {
    id: 'hero',
    filename: 'march8-hero.png',
    aspectRatio: '16:9',
    prompt: `Ultra-realistic professional photograph of a luxurious spring bouquet for Women's Day.
Premium pink and purple tulips, white freesias, blue hyacinths, and yellow daffodils.
Elegant wrapping in lilac tissue paper with satin ribbon.
Clean cream-colored background with soft golden bokeh.
Magazine-quality editorial florist photography, shallow depth of field.
Warm natural lighting, pastel spring color palette.
NO text, NO watermarks, NO logos, NO people. Photorealistic.`
  },
  {
    id: 'flowers-closeup',
    filename: 'march8-flowers-closeup.png',
    aspectRatio: '1:1',
    prompt: `Extreme macro photograph of fresh spring flowers close-up.
Delicate freesia petals in soft pink, purple tulip with morning dew drops, hyacinth clusters in lavender blue.
Shallow depth of field, dreamy bokeh background in pastel tones.
Professional botanical macro photography, sharp focus on petal textures.
Natural daylight, romantic spring mood.
NO text, NO watermarks. Photorealistic.`
  },
  {
    id: 'bouquet',
    filename: 'march8-bouquet.png',
    aspectRatio: '4:3',
    prompt: `Professional photograph of elegant female hands holding a beautiful spring bouquet.
Pink tulips, white freesias, purple hyacinths, yellow narcissus, and a few premium Ecuador roses in soft pink.
Wrapped in craft paper with lilac satin ribbon.
Soft natural window light, clean bright flower shop background.
Fashion/lifestyle photography, the moment of receiving spring flowers.
Only hands visible, no face. NO text, NO watermarks. Photorealistic.`
  },
  {
    id: 'spring-setting',
    filename: 'march8-spring-setting.png',
    aspectRatio: '16:9',
    prompt: `Beautiful spring still life interior photography.
An elegant glass vase with mixed bouquet of tulips, freesias, and roses on white marble table.
Soft morning light streaming through a window with sheer curtains.
Pastel color palette - lilac, blush pink, cream, soft green.
Minimalist Scandinavian interior, clean aesthetic.
NO people, NO text, NO watermarks. Photorealistic editorial photography.`
  }
];

// Sleep utility
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate an image using KIE AI (Z-Image)
 */
async function generateImage(imageConfig) {
  console.log(`\n🌷 Generating: ${imageConfig.id} (${MODEL})...`);

  const aspectRatio = imageConfig.aspectRatio || '1:1';

  try {
    const response = await fetch(`${KIE_API_BASE}/api/v1/jobs/createTask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIE_API_KEY}`
      },
      body: JSON.stringify({
        model: MODEL,
        input: {
          prompt: imageConfig.prompt,
          aspect_ratio: aspectRatio
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`   API Error:`, errorText.substring(0, 300));
      return null;
    }

    const result = await response.json();

    if (result.code !== 200) {
      console.error(`   API Error: ${result.msg}`);
      return null;
    }

    const taskId = result.data?.taskId;
    if (!taskId) {
      console.error(`   No taskId received`);
      return null;
    }

    console.log(`   Task: ${taskId}`);
    process.stdout.write(`   Waiting: `);

    // Poll for result
    for (let attempt = 0; attempt < 90; attempt++) {
      await sleep(2000);

      const pollResponse = await fetch(
        `${KIE_API_BASE}/api/v1/jobs/recordInfo?taskId=${taskId}`,
        { headers: { 'Authorization': `Bearer ${KIE_API_KEY}` } }
      );

      if (!pollResponse.ok) {
        process.stdout.write('.');
        continue;
      }

      const pollResult = await pollResponse.json();
      const state = pollResult.data?.state?.toLowerCase();

      if (state === 'success') {
        console.log(` Done!`);
        let imageUrls = [];
        if (pollResult.data?.resultJson) {
          try {
            const parsed = JSON.parse(pollResult.data.resultJson);
            imageUrls = parsed.resultUrls || [];
          } catch (e) {}
        }
        if (imageUrls.length > 0) {
          const imgResponse = await fetch(imageUrls[0]);
          if (imgResponse.ok) {
            const buffer = await imgResponse.arrayBuffer();
            return Buffer.from(buffer);
          }
        }
        return null;
      }

      if (state === 'fail' || state === 'failed') {
        console.error(` Failed: ${pollResult.data?.failMsg || 'Unknown'}`);
        return null;
      }

      process.stdout.write('.');
    }

    console.error(` Timeout`);
    return null;
  } catch (error) {
    console.error(`   Error: ${error.message}`);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('========================================================');
  console.log('  🌷 March 8 - Women\'s Day Image Generation');
  console.log(`  Using KIE AI: ${MODEL}`);
  console.log('========================================================');
  console.log(`\nImages to generate: ${MARCH8_IMAGES.length}\n`);

  const results = {
    success: [],
    failed: []
  };

  for (let i = 0; i < MARCH8_IMAGES.length; i++) {
    const image = MARCH8_IMAGES[i];
    const progress = `[${i + 1}/${MARCH8_IMAGES.length}]`;

    console.log(`${progress} Processing: ${image.id}`);

    const imageBuffer = await generateImage(image);

    if (imageBuffer) {
      const filepath = path.join(OUTPUT_DIR, image.filename);
      fs.writeFileSync(filepath, imageBuffer);
      console.log(`   Saved: /images/march8/${image.filename}`);
      results.success.push(image.id);
    } else {
      console.log(`   Failed to generate`);
      results.failed.push(image.id);
    }

    // Rate limiting
    if (i < MARCH8_IMAGES.length - 1) {
      console.log(`   Waiting 3s...`);
      await sleep(3000);
    }
  }

  console.log('\n========================================================');
  console.log('SUMMARY');
  console.log('========================================================');
  console.log(`Success: ${results.success.length} - ${results.success.join(', ') || 'none'}`);
  console.log(`Failed:  ${results.failed.length} - ${results.failed.join(', ') || 'none'}`);
  console.log('========================================================');
}

main().catch(console.error);
