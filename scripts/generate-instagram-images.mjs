/**
 * Instagram Feed Image Generator using OpenRouter API with Gemini 2.5 Flash Image
 * Generates 6 Instagram-style images for the Instagram Feed section
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OPENROUTER_API_KEY = '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';

// Image output directory
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'instagram');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Instagram post definitions with prompts
const INSTAGRAM_POSTS = [
  {
    id: '1',
    prompt: `Generate a beautiful Instagram-style photo of a luxurious rose bouquet.
- Fresh red and pink roses arranged elegantly
- Wrapped in craft paper with ribbon
- Natural soft lighting, slightly warm tones
- Square format (1:1 ratio)
- Lifestyle photography aesthetic
- No text or watermarks
- Garden center/florist shop setting visible in background
- Professional but authentic feel like a real Instagram post`
  },
  {
    id: '2',
    prompt: `Generate an Instagram-style photo of exotic orchids in a nursery.
- Various phalaenopsis orchids in bloom (white, purple, pink)
- Displayed on wooden shelves in a greenhouse
- Soft natural light filtering through
- Square format (1:1 ratio)
- Warm, inviting atmosphere
- No text or watermarks
- Professional garden center setting
- Clean, aesthetic Instagram post style`
  },
  {
    id: '3',
    prompt: `Generate an Instagram-style flat lay photo of florist work.
- Top-down view of florist workspace
- Roses, greenery, scissors, ribbon scattered artistically
- Wooden table background
- Natural daylight
- Square format (1:1 ratio)
- Modern Instagram aesthetic
- No text or watermarks
- Creative, artistic composition`
  },
  {
    id: '4',
    prompt: `Generate an Instagram-style photo of a beautiful wedding bouquet.
- Elegant bridal bouquet with white roses, peonies, eucalyptus
- Held by hands or resting on soft fabric
- Dreamy, romantic soft lighting
- Square format (1:1 ratio)
- Professional wedding photography style
- No text or watermarks
- Blush and white color palette
- Instagram-worthy composition`
  },
  {
    id: '5',
    prompt: `Generate an Instagram-style photo of tropical houseplants.
- Monstera, fiddle leaf fig, or peace lily
- Bright modern interior setting
- Natural light from window
- Square format (1:1 ratio)
- Trendy plant parent aesthetic
- No text or watermarks
- Clean, minimalist style
- Authentic Instagram home decor feel`
  },
  {
    id: '6',
    prompt: `Generate an Instagram-style photo of colorful tulips.
- Fresh tulips in various colors (red, yellow, pink, purple)
- In rustic bucket or vase
- Bright, cheerful lighting
- Square format (1:1 ratio)
- Spring garden aesthetic
- No text or watermarks
- Vibrant colors, natural feel
- Perfect Instagram post composition`
  }
];

/**
 * Generate an image using OpenRouter API with Gemini 2.5 Flash Image
 */
async function generateImage(post) {
  console.log(`\nGenerating Instagram image ${post.id}...`);

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
            content: post.prompt
          }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error for post ${post.id}:`, errorText);
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

    console.log(`Unexpected response for post ${post.id}:`, JSON.stringify(data, null, 2).substring(0, 500));
    return null;
  } catch (error) {
    console.error(`Error generating image for post ${post.id}:`, error.message);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Instagram Feed Image Generator');
  console.log('='.repeat(60));
  console.log(`\nGenerating ${INSTAGRAM_POSTS.length} Instagram images...\n`);

  const results = {
    success: [],
    failed: []
  };

  for (let i = 0; i < INSTAGRAM_POSTS.length; i++) {
    const post = INSTAGRAM_POSTS[i];
    const progress = `[${i + 1}/${INSTAGRAM_POSTS.length}]`;

    const filename = `post-${post.id}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);

    console.log(`${progress} Processing: Instagram Post ${post.id}`);

    // Generate image
    const imageBuffer = await generateImage(post);

    if (imageBuffer) {
      fs.writeFileSync(filepath, imageBuffer);
      console.log(`${progress} SUCCESS: Saved to ${filename}`);
      results.success.push(post.id);
    } else {
      console.log(`${progress} FAILED: Post ${post.id}`);
      results.failed.push(post.id);
    }

    // Rate limiting
    if (i < INSTAGRAM_POSTS.length - 1) {
      console.log('Waiting 3 seconds...');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Summary');
  console.log('='.repeat(60));
  console.log(`Total: ${INSTAGRAM_POSTS.length}`);
  console.log(`Success: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed posts:');
    results.failed.forEach(id => console.log(`  - Post ${id}`));
  }

  console.log('\nImages saved to: public/images/instagram/');
  console.log('Update InstagramFeed.tsx to use these images.');
}

main().catch(console.error);
