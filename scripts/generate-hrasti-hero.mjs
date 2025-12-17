/**
 * Shrubs and Trees Category Hero Image Generator using OpenRouter API with Gemini 2.5 Flash Image
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

const prompt = `Generate a stunning professional photograph of premium garden shrubs and ornamental trees for a garden center hero section.
Show a beautiful outdoor nursery display including:
- Elegant thuja and cypress trees in various sizes
- Ornamental Japanese maples with red leaves
- Flowering shrubs like hydrangeas and rhododendrons
- Boxwood and privet hedging plants
- Decorative evergreen conifers

Style:
- Outdoor garden center nursery setting
- Soft morning sunlight, golden hour warmth
- Rows of healthy green plants
- Mix of sizes from small shrubs to taller trees
- Professional landscape nursery aesthetic
- Rich greens with pops of color from flowering shrubs
- No text, watermarks, or people visible
- Landscape orientation, suitable for website hero section
- Conveys quality, variety, and healthy outdoor plants for gardens`;

async function generateImage() {
  console.log('Generating Shrubs and Trees hero image...');

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
  console.log('Shrubs and Trees Category Hero Image Generator');
  console.log('='.repeat(60));

  const imageBuffer = await generateImage();

  if (imageBuffer) {
    const filepath = path.join(OUTPUT_DIR, 'hrasti-darveta-hero.png');
    fs.writeFileSync(filepath, imageBuffer);
    console.log('SUCCESS: Saved to public/images/categories/hrasti-darveta-hero.png');
  } else {
    console.log('FAILED: Could not generate image');
  }
}

main().catch(console.error);
