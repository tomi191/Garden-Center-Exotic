/**
 * About Us Page Hero Image Generator using OpenRouter API with Gemini 2.5 Flash Image
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OPENROUTER_API_KEY = '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';

// Image output directory
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'backgrounds');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const prompt = `Create a ULTRA HIGH RESOLUTION 4K professional photograph for a website hero banner.

CRITICAL REQUIREMENTS:
- MUST be exactly 16:9 aspect ratio (1920x1080 or higher)
- ULTRA HIGH DEFINITION - crisp, sharp, detailed
- 4K quality minimum

Scene: Premium European greenhouse/garden center interior
- Glass ceiling with soft diffused natural light
- Elegant display of premium flowers: roses, orchids, tropical plants
- The LEFT SIDE must be darker/shadowed for text overlay
- RIGHT SIDE brighter with colorful flower arrangements
- Clean, modern, luxurious aesthetic
- Shallow depth of field with soft bokeh background

Style:
- Professional commercial photography
- Magazine-quality editorial shot
- Warm, inviting atmosphere
- Rich colors but not oversaturated
- NO text, watermarks, logos, or people visible
- European premium garden center feel`;

async function generateImage() {
  console.log('Generating About Us hero image...');

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
        model: 'openai/dall-e-3',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        // DALL-E 3 supports landscape 1792x1024 (close to 16:9)
        provider: {
          openai: {
            size: '1792x1024',
            quality: 'hd'
          }
        }
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
  console.log('About Us Page Hero Image Generator');
  console.log('='.repeat(60));

  const imageBuffer = await generateImage();

  if (imageBuffer) {
    const filepath = path.join(OUTPUT_DIR, 'about-bg.png');
    fs.writeFileSync(filepath, imageBuffer);
    console.log('SUCCESS: Saved to public/images/backgrounds/about-bg.png');
  } else {
    console.log('FAILED: Could not generate image');
  }
}

main().catch(console.error);
