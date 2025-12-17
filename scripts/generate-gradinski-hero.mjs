/**
 * Garden Plants Category Hero Image Generator using OpenRouter API with Gemini 2.5 Flash Image
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

const prompt = `Generate a stunning professional photograph of seasonal garden plants and seedlings for a garden center hero section.
Show a beautiful display of garden-ready plants including:
- Colorful seasonal bedding plants (petunias, geraniums, marigolds)
- Vegetable seedlings in trays (tomatoes, peppers, herbs)
- Perennial flowers ready for planting
- Lavender and rosemary herb plants
- Seasonal flower arrangements in nursery pots
- Fresh green seedlings with vibrant colors

Style:
- Bright outdoor garden center setting with spring/summer vibes
- Natural daylight, fresh morning atmosphere
- Rich variety of flower colors (red, pink, purple, yellow, orange)
- Plants in nursery trays and small pots ready for garden planting
- Professional commercial photography style
- European garden center aesthetic
- No text, watermarks, or people visible
- Landscape orientation, suitable for website hero section
- Conveys freshness, seasonal variety, and gardening joy`;

async function generateImage() {
  console.log('Generating Garden Plants hero image...');

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
            content: prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      return null;
    }

    const data = await response.json();

    if (data.choices && data.choices[0] && data.choices[0].message) {
      const message = data.choices[0].message;

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

      const content = message.content;
      if (content && typeof content === 'string') {
        if (content.startsWith('data:image')) {
          const base64Data = content.split(',')[1];
          return Buffer.from(base64Data, 'base64');
        }
      }
    }

    console.log('Unexpected response:', JSON.stringify(data, null, 2).substring(0, 500));
    return null;
  } catch (error) {
    console.error('Error generating image:', error.message);
    return null;
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('Garden Plants Category Hero Image Generator');
  console.log('='.repeat(60));

  const imageBuffer = await generateImage();

  if (imageBuffer) {
    const filepath = path.join(OUTPUT_DIR, 'gradinski-hero.png');
    fs.writeFileSync(filepath, imageBuffer);
    console.log('SUCCESS: Saved to public/images/categories/gradinski-hero.png');
  } else {
    console.log('FAILED: Could not generate image');
  }
}

main().catch(console.error);
