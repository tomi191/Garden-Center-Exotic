/**
 * Category Image Generator using OpenRouter API with Gemini 2.5 Flash Image
 * Generates images for Product Categories section
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OPENROUTER_API_KEY = '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';

// Image output directory
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'categories');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Category definitions with prompts for image generation
const CATEGORIES = [
  {
    id: 'cut-flowers',
    name: 'Рязани Цветя',
    prompt: `Generate a stunning professional photograph of freshly cut premium flowers.
Show a beautiful arrangement of mixed cut flowers: red and pink roses, white lilies, purple tulips and delicate baby's breath.
The flowers should look fresh and vibrant as if just cut from the garden.
- Soft natural lighting from the side
- Rich, vibrant colors: deep reds, soft pinks, whites, purples
- Clean cream/white background or rustic wooden surface
- Professional florist photography style
- Sharp focus on the flowers with shallow depth of field
- No text, watermarks, or people
- Landscape orientation, suitable for a category card`
  },
  {
    id: 'potted-plants',
    name: 'Саксийни Растения',
    prompt: `Generate a beautiful professional photograph of elegant potted indoor plants.
Show 2-3 decorative houseplants in stylish ceramic pots: a monstera with large green leaves, a small fiddle leaf fig, and a succulent.
The setting should feel like a modern interior or greenhouse.
- Soft natural window lighting
- Fresh green colors with white and terracotta pot accents
- Clean, minimalist styling
- Interior design photography style
- Sharp focus with pleasant bokeh background
- No text, watermarks, or people
- Landscape orientation, suitable for a category card`
  },
  {
    id: 'garden-plants',
    name: 'Градински Растения',
    prompt: `Generate a lush professional photograph of a beautiful garden landscape.
Show a vibrant garden scene with flowering shrubs, ornamental trees, and colorful perennial flowers.
Include roses bushes, hydrangeas, and green hedges creating a dreamy garden atmosphere.
- Golden hour natural sunlight
- Rich greens with pops of pink, purple, and white flowers
- Depth showing garden layers and paths
- Landscape garden photography style
- Dreamy, inviting atmosphere
- No text, watermarks, or people
- Landscape orientation, suitable for a category card`
  },
  {
    id: 'accessories',
    name: 'Аксесоари',
    prompt: `Generate a stylish professional photograph of garden accessories and supplies.
Show an artistic arrangement of: ceramic plant pots in earth tones, a small bag of premium soil,
garden gloves, pruning shears, and decorative pebbles on a rustic wooden surface.
- Warm natural lighting
- Earth tones: terracotta, brown, cream, with green plant accents
- Flat lay or styled product arrangement
- Product photography style, clean and organized
- Professional and inviting
- No text, watermarks, or people
- Landscape orientation, suitable for a category card`
  }
];

/**
 * Generate an image using OpenRouter API with Gemini 2.5 Flash Image
 */
async function generateImage(category) {
  console.log(`\nGenerating image for: ${category.name}...`);

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://gardenexotic.bg',
        'X-Title': 'Garden Center Exotic'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image',
        messages: [
          {
            role: 'user',
            content: category.prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error for ${category.name}:`, errorText);
      return null;
    }

    const data = await response.json();

    // Check if we got an image in the response
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const message = data.choices[0].message;

      // Check for images array (OpenRouter/Gemini format)
      if (message.images && message.images.length > 0) {
        const imageData = message.images[0];
        if (imageData.image_url && imageData.image_url.url) {
          const url = imageData.image_url.url;
          if (url.startsWith('data:image')) {
            const base64Data = url.split(',')[1];
            return Buffer.from(base64Data, 'base64');
          }
        }
      }

      // Fallback: check content for base64 image
      const content = message.content;
      if (content && typeof content === 'string') {
        if (content.startsWith('data:image')) {
          const base64Data = content.split(',')[1];
          return Buffer.from(base64Data, 'base64');
        }
      }
    }

    console.log(`Unexpected response for ${category.name}:`, JSON.stringify(data, null, 2).substring(0, 500));
    return null;
  } catch (error) {
    console.error(`Error generating image for ${category.name}:`, error.message);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Category Image Generator');
  console.log('='.repeat(60));
  console.log(`\nGenerating ${CATEGORIES.length} category images...\n`);

  const results = {
    success: [],
    failed: []
  };

  for (let i = 0; i < CATEGORIES.length; i++) {
    const category = CATEGORIES[i];
    const progress = `[${i + 1}/${CATEGORIES.length}]`;

    const filename = `${category.id}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);

    console.log(`${progress} Processing: ${category.name}`);

    // Generate image
    const imageBuffer = await generateImage(category);

    if (imageBuffer) {
      fs.writeFileSync(filepath, imageBuffer);
      console.log(`${progress} SUCCESS: Saved to ${filename}`);
      results.success.push(category.name);
    } else {
      console.log(`${progress} FAILED: ${category.name}`);
      results.failed.push(category.name);
    }

    // Rate limiting
    if (i < CATEGORIES.length - 1) {
      console.log('Waiting 3 seconds...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Summary');
  console.log('='.repeat(60));
  console.log(`Total: ${CATEGORIES.length}`);
  console.log(`Success: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed categories:');
    results.failed.forEach(name => console.log(`  - ${name}`));
  }

  console.log('\nImages saved to: public/images/categories/');
  console.log('\nNext step: Update lib/constants.ts PRODUCT_CATEGORIES to use these images:');
  console.log('  image: "/images/categories/cut-flowers.png"');
  console.log('  image: "/images/categories/potted-plants.png"');
  console.log('  image: "/images/categories/garden-plants.png"');
  console.log('  image: "/images/categories/accessories.png"');
}

main().catch(console.error);
