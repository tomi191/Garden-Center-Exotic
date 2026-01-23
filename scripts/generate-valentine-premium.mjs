/**
 * Valentine's Day Premium Image Generation
 * Using KIE AI - Seedream 4.5 (high quality) or Z-Image (fast/cheap)
 *
 * Usage: node scripts/generate-valentine-premium.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration - KIE AI
const KIE_API_KEY = '68b095368a4615c4259c546dee223fe9';
const KIE_API_BASE = 'https://api.kie.ai';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'valentine');

// Choose model: 'z-image' (fast/cheap $0.004) or 'seedream-4.5' (4K quality)
const MODEL = 'z-image';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Premium Valentine's Day Image Prompts
const VALENTINE_IMAGES = [
  {
    id: 'hero',
    filename: 'valentine-hero-new.png',
    aspectRatio: '16:9',
    prompt: `Ultra-realistic professional photograph of luxury Valentine's Day red rose arrangement.
Premium long-stem Ecuador roses in elegant crystal vase on white Carrara marble.
Deep crimson red, morning dewdrops, soft golden bokeh background.
Magazine-quality editorial photography, shallow depth of field.
Warm romantic lighting, rose petals scattered artistically.
NO text, NO watermarks, NO logos, NO people. Photorealistic.`
  },
  {
    id: 'roses-closeup',
    filename: 'valentine-roses-closeup-new.png',
    aspectRatio: '1:1',
    prompt: `Extreme macro photograph of a single perfect red rose from Ecuador.
Velvety crimson petals with dewdrops like tiny diamonds.
Soft warm backlighting, cream/gold blurred background.
Professional botanical macro photography, sharp focus on petal textures.
Dreamy romantic mood. NO text, NO watermarks. Photorealistic.`
  },
  {
    id: 'bouquet-delivery',
    filename: 'valentine-bouquet-delivery-new.png',
    aspectRatio: '4:3',
    prompt: `Professional photograph of elegant female hands holding luxury red rose bouquet.
French manicure hands, 50+ deep red Ecuador roses wrapped in cream paper with silk burgundy ribbon.
Soft natural window light, clean bright background.
Fashion/lifestyle photography, soft feminine aesthetic, moment of receiving flowers.
Only hands visible, no face. NO text, NO watermarks. Photorealistic.`
  },
  {
    id: 'rose-box',
    filename: 'valentine-rose-box-new.png',
    aspectRatio: '1:1',
    prompt: `Professional product photograph of luxury rose gift box.
Deep burgundy velvet box with fresh red roses arranged in heart pattern.
Gold foil accents, white marble surface, soft romantic lighting.
Premium product photography, clean minimalist composition.
Luxurious Valentine's gift. NO text, NO watermarks. Photorealistic.`
  },
  {
    id: 'romantic-setting',
    filename: 'valentine-romantic-setting-new.png',
    aspectRatio: '16:9',
    prompt: `Professional photograph of romantic Valentine's dinner table setting.
Red roses centerpiece in low glass vase, crystal wine glasses, soft candlelight.
White linen tablecloth, blurred fairy lights bokeh background.
Intimate luxury restaurant setting, warm romantic atmosphere.
NO people, NO text, NO watermarks. Photorealistic editorial photography.`
  },
  {
    id: 'florist-workspace',
    filename: 'valentine-florist-workspace-new.png',
    aspectRatio: '16:9',
    prompt: `Professional photograph of luxury florist workspace with roses being arranged.
Elegant hands arranging red Ecuador roses, silk ribbons, kraft paper.
Rose petals scattered on wooden work surface, soft natural window light.
Behind-the-scenes editorial photography, artisanal craft atmosphere.
NO faces, NO text, NO watermarks. Magazine-quality photorealism.`
  }
];

// Sleep utility
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate an image using KIE AI (Seedream 4.5 or Z-Image)
 */
async function generateImage(imageConfig) {
  console.log(`\n🎨 Generating: ${imageConfig.id} (${MODEL})...`);

  // Map aspect ratio format
  const aspectRatio = imageConfig.aspectRatio || '1:1';

  try {
    // Create task using jobs API
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

    console.log(`   ✅ Task: ${taskId}`);
    process.stdout.write(`   ⏳ `);

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
        console.log(`\n   ✅ Done!`);
        // resultJson is a string that needs to be parsed
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
        console.error(`\n   ❌ Failed: ${pollResult.data?.failMsg || 'Unknown'}`);
        return null;
      }

      process.stdout.write('.');
    }

    console.error(`\n   ❌ Timeout`);
    return null;
  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('╔════════════════════════════════════════════════════════╗');
  console.log('║  🌹 Valentine Premium Image Generation                 ║');
  console.log(`║  Using KIE AI: ${MODEL.padEnd(36)}║`);
  console.log('╚════════════════════════════════════════════════════════╝');
  console.log(`\nModel: ${MODEL}`);
  console.log(`Images to generate: ${VALENTINE_IMAGES.length}\n`);

  const results = {
    success: [],
    failed: []
  };

  for (let i = 0; i < VALENTINE_IMAGES.length; i++) {
    const image = VALENTINE_IMAGES[i];
    const progress = `[${i + 1}/${VALENTINE_IMAGES.length}]`;

    console.log(`${progress} Processing: ${image.id}`);

    // Generate image
    const imageBuffer = await generateImage(image);

    if (imageBuffer) {
      const filepath = path.join(OUTPUT_DIR, image.filename);
      fs.writeFileSync(filepath, imageBuffer);
      console.log(`   ✅ Saved: /images/valentine/${image.filename}`);
      results.success.push(image.id);
    } else {
      console.log(`   ❌ Failed to generate`);
      results.failed.push(image.id);
    }

    // Rate limiting - wait between requests
    if (i < VALENTINE_IMAGES.length - 1) {
      console.log(`   ⏳ Waiting 3s...`);
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Success: ${results.success.length} - ${results.success.join(', ') || 'none'}`);
  console.log(`❌ Failed:  ${results.failed.length} - ${results.failed.join(', ') || 'none'}`);
  console.log('='.repeat(60));
}

main().catch(console.error);
