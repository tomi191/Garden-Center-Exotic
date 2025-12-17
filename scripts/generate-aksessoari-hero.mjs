/**
 * Accessories Category Hero Image Generator using OpenRouter API with Gemini 2.5 Flash Image
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

const prompt = `Generate a stunning professional photograph of garden accessories and plant care supplies for a garden center hero section.
Show a beautiful styled display including:
- Elegant ceramic and terracotta plant pots in various sizes
- Premium potting soil and substrate bags
- Organic fertilizers and plant food
- Quality gardening tools (trowels, pruners, watering cans)
- Decorative plant stakes and supports
- Woven baskets and plant stands

Style:
- Clean organized garden shop shelf or display setting
- Soft natural lighting, warm earthy tones
- Aesthetic arrangement of gardening supplies
- Mix of natural materials (terracotta, wood, wicker)
- Professional commercial photography style
- Premium garden boutique aesthetic
- No text, watermarks, or people visible
- Landscape orientation, suitable for website hero section
- Conveys quality tools and supplies for plant care`;

async function generateImage() {
  console.log('Generating Accessories hero image...');

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
  console.log('Accessories Category Hero Image Generator');
  console.log('='.repeat(60));

  const imageBuffer = await generateImage();

  if (imageBuffer) {
    const filepath = path.join(OUTPUT_DIR, 'aksessoari-hero.png');
    fs.writeFileSync(filepath, imageBuffer);
    console.log('SUCCESS: Saved to public/images/categories/aksessoari-hero.png');
  } else {
    console.log('FAILED: Could not generate image');
  }
}

main().catch(console.error);
