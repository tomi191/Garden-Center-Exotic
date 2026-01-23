/**
 * Valentine's Day Image Generation Script
 * Using KIE AI API (GPT-4o Image)
 *
 * Usage: node scripts/generate-valentine-images.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// KIE AI Configuration
const KIE_API_KEY = '68b095368a4615c4259c546dee223fe9';
const KIE_API_BASE = 'https://api.kie.ai';

// Image prompts for Valentine's Day campaign
const VALENTINE_PROMPTS = [
  {
    id: 'hero',
    filename: 'valentine-hero.png',
    prompt: `Ultra-realistic professional photograph of a stunning luxury red rose bouquet arrangement.
      Premium long-stem Colombian roses (90cm) in deep crimson red, arranged elegantly in a modern minimalist glass vase.
      Soft romantic ambient lighting with bokeh effect in background.
      Rose petals scattered artistically on white marble surface.
      High-end florist photography style, 8K quality, shallow depth of field.
      Mood: romantic, luxurious, sophisticated, Valentine's Day.`,
    aspectRatio: '16:9'
  },
  {
    id: 'roses-closeup',
    filename: 'valentine-roses-closeup.png',
    prompt: `Extreme close-up macro photograph of a single perfect red rose.
      Dewdrops on velvet petals catching soft morning light.
      Rich crimson color, soft blurred background in warm tones.
      Professional botanical photography, ultra-detailed, 8K.
      Romantic and elegant mood for Valentine's Day.`,
    aspectRatio: '1:1'
  },
  {
    id: 'bouquet-hands',
    filename: 'valentine-bouquet-delivery.png',
    prompt: `Professional photograph of elegant female hands holding a luxurious red rose bouquet.
      Wrapped in premium cream/beige paper with silk ribbon.
      Soft natural lighting, shallow depth of field.
      Modern minimalist aesthetic, clean background.
      The moment of receiving flowers, emotional and romantic.
      High-end fashion editorial style photography.`,
    aspectRatio: '3:2'
  },
  {
    id: 'arrangement-box',
    filename: 'valentine-rose-box.png',
    prompt: `Luxury flower box with perfectly arranged red roses in a heart shape.
      Velvet black or burgundy gift box, roses in pristine condition.
      Gold accents, elegant styling on marble surface.
      Professional product photography with soft shadows.
      Premium Valentine's Day gift concept.
      High-end commercial photography style.`,
    aspectRatio: '1:1'
  },
  {
    id: 'romantic-setting',
    filename: 'valentine-romantic-setting.png',
    prompt: `Elegant romantic dinner table setting with red roses centerpiece.
      Crystal glasses, candlelight, soft bokeh lights.
      Luxurious restaurant or home setting.
      Warm intimate atmosphere, Valentine's evening mood.
      Professional interior/lifestyle photography.
      Rich colors, sophisticated composition.`,
    aspectRatio: '16:9'
  }
];

// Sleep utility
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate image using KIE AI 4o Image API
async function generateImage(promptConfig) {
  console.log(`\n🎨 Generating: ${promptConfig.id}...`);
  console.log(`   Prompt: ${promptConfig.prompt.substring(0, 80)}...`);

  const requestBody = {
    prompt: promptConfig.prompt,
    aspectRatio: promptConfig.aspectRatio || '1:1'
  };

  try {
    // Start generation task
    const response = await fetch(`${KIE_API_BASE}/api/v1/gpt4o-image/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIE_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();

    if (result.code !== 200) {
      throw new Error(`API Error: ${result.msg}`);
    }

    const taskId = result.data?.taskId;
    if (!taskId) {
      throw new Error('No taskId received');
    }

    console.log(`   ✅ Task created: ${taskId}`);

    // Poll for result
    return await pollForResult(taskId, promptConfig);

  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return null;
  }
}

// Poll for task completion
async function pollForResult(taskId, promptConfig, maxAttempts = 60) {
  console.log(`   ⏳ Waiting for generation...`);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await sleep(3000); // Wait 3 seconds between polls

    try {
      const pollResponse = await fetch(
        `${KIE_API_BASE}/api/v1/gpt4o-image/record-info?taskId=${taskId}`,
        {
          headers: {
            'Authorization': `Bearer ${KIE_API_KEY}`
          }
        }
      );

      if (!pollResponse.ok) {
        process.stdout.write('.');
        continue;
      }

      const result = await pollResponse.json();

      if (result.code !== 200) {
        process.stdout.write('x');
        continue;
      }

      const status = result.data?.status;

      if (status === 'SUCCESS') {
        console.log(`\n   ✅ Generation complete!`);

        const imageUrls = result.data?.response?.resultUrls;
        if (imageUrls && imageUrls.length > 0) {
          return await downloadImage(imageUrls[0], promptConfig);
        }

        throw new Error('No image URLs in response');
      }

      if (status === 'FAILED' || result.data?.errorMessage) {
        throw new Error(`Generation failed: ${result.data?.errorMessage || 'Unknown error'}`);
      }

      // Still processing
      process.stdout.write('.');

    } catch (error) {
      if (error.message.includes('Generation failed')) {
        throw error;
      }
      // Continue polling on other errors
      process.stdout.write('?');
    }
  }

  throw new Error('Timeout waiting for image generation');
}

// Download and save image
async function downloadImage(url, promptConfig) {
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'valentine');

  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`   📁 Created directory: ${outputDir}`);
  }

  const outputPath = path.join(outputDir, promptConfig.filename);

  console.log(`   📥 Downloading from: ${url.substring(0, 50)}...`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));

  console.log(`   ✅ Saved: /images/valentine/${promptConfig.filename}`);
  return outputPath;
}

// Main execution
async function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  🌹 Valentine\'s Day Image Generation            ║');
  console.log('║  Using KIE AI (GPT-4o Image)                    ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log(`\nAPI Key: ${KIE_API_KEY.substring(0, 8)}...`);
  console.log(`Images to generate: ${VALENTINE_PROMPTS.length}\n`);

  const results = [];

  for (const prompt of VALENTINE_PROMPTS) {
    try {
      const result = await generateImage(prompt);
      results.push({ id: prompt.id, success: !!result, path: result });
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}`);
      results.push({ id: prompt.id, success: false, error: error.message });
    }

    // Rate limiting - wait between requests
    await sleep(2000);
  }

  console.log('\n\n╔══════════════════════════════════════════════════╗');
  console.log('║  📊 Generation Summary                           ║');
  console.log('╚══════════════════════════════════════════════════╝\n');

  results.forEach(r => {
    const status = r.success ? '✅' : '❌';
    console.log(`${status} ${r.id}: ${r.success ? 'Success' : r.error}`);
  });

  const successCount = results.filter(r => r.success).length;
  console.log(`\n🎯 Total: ${successCount}/${results.length} images generated`);

  if (successCount > 0) {
    console.log(`\n📂 Images saved to: public/images/valentine/`);
  }
}

main().catch(console.error);
