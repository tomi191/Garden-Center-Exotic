/**
 * Service Image Generator using OpenRouter API with Gemini 2.5 Flash Image
 * Generates images for ServiceShowcase section
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OPENROUTER_API_KEY = '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';

// Image output directory
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'services');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Service definitions with prompts for image generation
const SERVICES = [
  {
    id: 'delivery',
    name: 'Доставка на Цветя',
    prompt: `Generate a warm, professional photograph of a flower delivery scene.
Show a delivery person's hands carefully holding a beautiful wrapped bouquet of fresh flowers (roses, tulips mix).
The setting should feel welcoming and professional.
- Soft natural lighting
- Warm color palette with greens and pinks
- Focus on the flowers and the care of handling
- Clean, lifestyle photography style
- No text or watermarks
- Slightly blurred background of a doorstep or garden entrance
- Square format, artistic composition`
  },
  {
    id: 'bouquets',
    name: 'Букети и Аранжименти',
    prompt: `Generate a stunning professional photograph of a florist's hands creating a luxury flower arrangement.
Show skilled hands arranging premium roses, peonies, and greenery into an elegant bouquet.
- Soft studio lighting with natural feel
- Rich colors: deep reds, soft pinks, whites, and lush greens
- Professional florist workspace with ribbon and tools visible
- Focus on craftsmanship and artistry
- Clean, editorial photography style
- No text or watermarks
- Square format, centered artistic composition`
  },
  {
    id: 'weddings',
    name: 'Сватби и Събития',
    prompt: `Generate a romantic, elegant photograph of a wedding floral arrangement.
Show a beautiful bridal bouquet with white roses, peonies, and eucalyptus on a soft fabric background.
Also include hints of wedding table decoration with candles.
- Dreamy, soft romantic lighting
- Color palette: whites, creams, soft blush pink, sage green
- Elegant and luxurious feel
- Professional wedding photography style
- No text or watermarks
- Square format, romantic composition`
  },
  {
    id: 'b2b',
    name: 'B2B Партньорства',
    prompt: `Generate a professional photograph of a wholesale flower market or flower warehouse.
Show rows of fresh flowers in buckets - colorful roses, tulips, and mixed flowers ready for wholesale.
- Professional commercial lighting
- Vibrant colors showing variety of flowers
- Clean organized warehouse/market setting
- Business-oriented but warm atmosphere
- Professional commercial photography style
- No text or watermarks
- Square format, wide angle showing abundance`
  },
  {
    id: 'consultations',
    name: 'Консултации',
    prompt: `Generate a warm, friendly photograph of a plant care consultation scene.
Show hands gently examining a healthy green potted plant (like a peace lily or monstera).
The setting should feel like a garden center with other plants in soft focus background.
- Warm natural greenhouse lighting
- Fresh green colors with warm tones
- Focus on care and expertise
- Lifestyle photography style
- No text or watermarks
- Square format, intimate close-up composition`
  }
];

/**
 * Generate an image using OpenRouter API with Gemini 2.5 Flash Image
 */
async function generateImage(service) {
  console.log(`\nGenerating image for: ${service.name}...`);

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
            content: service.prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error for ${service.name}:`, errorText);
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

    console.log(`Unexpected response for ${service.name}:`, JSON.stringify(data, null, 2).substring(0, 500));
    return null;
  } catch (error) {
    console.error(`Error generating image for ${service.name}:`, error.message);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Service Image Generator');
  console.log('='.repeat(60));
  console.log(`\nGenerating ${SERVICES.length} service images...\n`);

  const results = {
    success: [],
    failed: []
  };

  for (let i = 0; i < SERVICES.length; i++) {
    const service = SERVICES[i];
    const progress = `[${i + 1}/${SERVICES.length}]`;

    const filename = `${service.id}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);

    console.log(`${progress} Processing: ${service.name}`);

    // Generate image
    const imageBuffer = await generateImage(service);

    if (imageBuffer) {
      fs.writeFileSync(filepath, imageBuffer);
      console.log(`${progress} SUCCESS: Saved to ${filename}`);
      results.success.push(service.name);
    } else {
      console.log(`${progress} FAILED: ${service.name}`);
      results.failed.push(service.name);
    }

    // Rate limiting
    if (i < SERVICES.length - 1) {
      console.log('Waiting 3 seconds...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Summary');
  console.log('='.repeat(60));
  console.log(`Total: ${SERVICES.length}`);
  console.log(`Success: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed services:');
    results.failed.forEach(name => console.log(`  - ${name}`));
  }

  console.log('\nImages saved to: public/images/services/');
  console.log('Update ServiceShowcase.tsx to use these images.');
}

main().catch(console.error);
