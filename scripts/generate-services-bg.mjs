/**
 * Generate background image for Services section
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OPENROUTER_API_KEY = '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';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'backgrounds');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const prompt = `Generate a soft, elegant background image for a flower services section.
The image should feature:
- Soft, blurred floral elements (roses, greenery, petals)
- Very light, pastel color palette (soft greens, creams, blush pinks)
- Watercolor or dreamy aesthetic
- Subtle botanical pattern or scattered petals
- Light and airy feeling, not busy
- Works well as a website background at low opacity
- No text, no sharp focus elements
- Horizontal/landscape orientation
- Very soft and subtle, almost like a texture`;

async function generateImage() {
  console.log('Generating services background image...');

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
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      return;
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
            const buffer = Buffer.from(base64Data, 'base64');
            const filepath = path.join(OUTPUT_DIR, 'services-bg.png');
            fs.writeFileSync(filepath, buffer);
            console.log('SUCCESS: Saved to public/images/backgrounds/services-bg.png');
            return;
          }
        }
      }

      const content = message.content;
      if (content && typeof content === 'string' && content.startsWith('data:image')) {
        const base64Data = content.split(',')[1];
        const buffer = Buffer.from(base64Data, 'base64');
        const filepath = path.join(OUTPUT_DIR, 'services-bg.png');
        fs.writeFileSync(filepath, buffer);
        console.log('SUCCESS: Saved to public/images/backgrounds/services-bg.png');
        return;
      }
    }

    console.log('Unexpected response:', JSON.stringify(data, null, 2).substring(0, 500));
  } catch (error) {
    console.error('Error:', error.message);
  }
}

generateImage();
