/**
 * Product Image Generator using OpenRouter API with Gemini 2.5 Flash Image
 *
 * This script fetches all products from Supabase and generates realistic
 * product images using AI, then updates the database with new image URLs.
 *
 * Run with: node scripts/generate-product-images.js
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OPENROUTER_API_KEY = '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';
const SUPABASE_URL = 'https://hajcdxqedeqpffbfahue.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhamNkeHFlZGVxcGZmYmZhaHVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMjkxNDUsImV4cCI6MjA4MDgwNTE0NX0.R0q8XrThicOUxNPxab4_8flk5D9gPVLJ4tv33XZaRfc';

// Initialize Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Image output directory
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'products', 'generated');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Product name translations and descriptions for better image generation
const FLOWER_DESCRIPTIONS = {
  // Cut flowers (Рязан цвят)
  'Мъх': 'Fresh green moss, natural preserved decorative moss for floristry',
  'Канелени пръчки': 'Cinnamon sticks bundle, natural brown cinnamon for decoration',
  'Типи': 'Typha cattail stems, brown natural dried cattail flowers',
  'Чико': 'Chico decorative branches, natural dried decorative branches',
  'Писташ': 'Pistachio green branches, fresh green pistachio leaves',
  'Хиперикум': 'Hypericum berries, red berry branches St Johns Wort',
  'Фрезия': 'Freesia flowers, delicate colorful fragrant freesia blooms',
  'Лиатрис': 'Liatris purple spikes, blazing star purple flower spikes',
  'Астилбе': 'Astilbe feathery plumes, pink fluffy astilbe flowers',
  'Еустома': 'Eustoma lisianthus, elegant rose-like white and pink flowers',
  'Матрикария': 'Matricaria feverfew, small white daisy-like flowers',
  'Краспедия': 'Craspedia billy buttons, yellow round ball flowers',
  'Астранция': 'Astrantia masterwort, delicate star-shaped pink flowers',
  'Лале': 'Tulip flowers, elegant colorful tulip blooms',
  'Карамфил Колумбия': 'Colombian carnation, premium red carnation flowers',
  'Хортензия микс': 'Hydrangea mix, large colorful hydrangea flower heads',
  'Рубелине': 'Rubeline decorative plant, ornamental foliage',
  'Гипсофила': 'Gypsophila baby breath, delicate white small flowers',
  'Хамалициум': 'Chamelaucium waxflower, small waxy pink flowers',
  'Полиантес Тубероза': 'Tuberose polianthes, fragrant white tubular flowers',
  'Роза Екв. микс 60см': 'Ecuador premium rose mix 60cm, large headed roses',
  'Хризантема (отрязан)': 'Cut chrysanthemum, colorful spider mum flower',
  'Цимбитиум': 'Cymbidium orchid, exotic large orchid blooms',
  'Гербер мини': 'Mini gerbera daisy, small colorful gerbera flowers',
  'Лилиум': 'Lilium lily, elegant white oriental lily flowers',
  'Стрелиция 17см': 'Strelitzia bird of paradise 17cm, orange exotic flower',
  'Стрелиция 23см': 'Strelitzia bird of paradise 23cm, large orange exotic flower',
  'Божур': 'Peony flower, lush pink peony bloom',
  'Астромерия микс': 'Alstroemeria mix, colorful Peruvian lily',
  'Роза Хол. микс 60см': 'Holland rose mix 60cm, premium Dutch roses',
  'Роза спрей 60см': 'Spray rose 60cm, multiple small roses on stem',
  'Роза Евър ред 80см': 'Ever Red rose 80cm, deep red premium rose',
  'Роза Екв. микс 70см': 'Ecuador rose mix 70cm, large premium roses',
  'Роза боя 60см': 'Painted rose 60cm, rainbow dyed rose flower',
  'Роза боя 70см': 'Painted rose 70cm, large rainbow dyed rose',

  // Potted plants (Саксийни)
  'Спатифилум': 'Spathiphyllum peace lily, white flower green leaves potted plant',
  'Тиланзия': 'Tillandsia air plant, unique green air plant',
  'Хипеаструм': 'Hippeastrum amaryllis, large red trumpet flower in pot',
  'Хризантема Спайдер': 'Spider chrysanthemum in pot, curly petals potted mum',
  'Хризантема Супернова': 'Supernova chrysanthemum pot, colorful potted mum',
  'Циклама микс': 'Cyclamen mix, colorful cyclamen flowers in pot',
  'Шлумбергера микс': 'Schlumbergera Christmas cactus, colorful blooming cactus',
  'Сентполия микс': 'Saintpaulia African violet, small purple flowers potted',
  'Роза микс': 'Rose mix potted plant, miniature roses in pot',
  'Рододендрон микс': 'Rhododendron azalea mix, colorful azalea in pot',
  'Пеперомия Лилиян': 'Peperomia Lilian, compact green variegated plant',
  'Калатея Медальон': 'Calathea medallion, round patterned tropical leaves',
  'Кафе': 'Coffee plant, glossy green coffee arabica in pot',
  'Замио': 'Zamioculcas ZZ plant, dark green glossy tropical plant',
  'Еуфорбия микс': 'Euphorbia mix, succulent-like euphorbia plant',
  'Драцена Голд кост': 'Dracaena Gold Coast, green yellow striped leaves',
  'Бегония рекс': 'Begonia rex, colorful patterned ornamental leaves',
  'Аехмея': 'Aechmea bromeliad, pink flower tropical plant',
  'Бегония микс': 'Begonia mix, colorful flowering begonia',
  'Антуриум микс': 'Anthurium mix, red heart-shaped flower plant',
  'Алоказия': 'Alocasia elephant ear, large dramatic tropical leaves',
  'Оксалис': 'Oxalis shamrock plant, purple clover-like leaves',
  'Нефролепсис': 'Nephrolepis Boston fern, lush green fern fronds',
  'Лилиум Ор.': 'Oriental lily in pot, fragrant white lily potted',
  'Лилиум Аз.': 'Asiatic lily in pot, colorful lily potted plant',
  'Купресус': 'Cupressus cypress, evergreen mini cypress tree'
};

/**
 * Generate an image using OpenRouter API with Gemini 2.5 Flash Image
 */
async function generateImage(productName, category, origin) {
  const description = FLOWER_DESCRIPTIONS[productName] || productName;
  const categoryType = category === 'ryazan-tsvyat' ? 'cut flower' : 'potted plant';

  const prompt = `Generate a highly realistic, professional product photography image of: ${description}.
This is a ${categoryType} from ${origin || 'Netherlands'}.
The image should be:
- Professional florist/garden center quality
- Clean white or light gradient background
- Sharp focus with beautiful lighting
- Showing the natural beauty and freshness of the plant
- High quality commercial product photo style
- No text, watermarks, or logos
- Square format, centered composition`;

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
      console.error(`API Error for ${productName}:`, errorText);
      return null;
    }

    const data = await response.json();

    // Check if we got an image in the response - Gemini returns images in the 'images' array
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

    console.log(`Unexpected response for ${productName}:`, JSON.stringify(data, null, 2).substring(0, 500));
    return null;
  } catch (error) {
    console.error(`Error generating image for ${productName}:`, error.message);
    return null;
  }
}

/**
 * Create a slug-friendly filename from product name
 */
function createSlug(name) {
  const translitMap = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
    'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
    'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sht', 'ъ': 'a', 'ь': '',
    'ю': 'yu', 'я': 'ya'
  };

  return name.toLowerCase()
    .split('')
    .map(char => translitMap[char] || char)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Main function to process all products
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Product Image Generator');
  console.log('='.repeat(60));

  // Fetch all products from Supabase
  console.log('\nFetching products from database...');
  const { data: products, error } = await supabase
    .from('Product')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  console.log(`Found ${products.length} products\n`);

  const results = {
    success: [],
    failed: [],
    skipped: []
  };

  // Process each product
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const progress = `[${i + 1}/${products.length}]`;

    // Create filename
    const slug = createSlug(product.name);
    const filename = `${slug}.png`;
    const filepath = path.join(OUTPUT_DIR, filename);
    const publicUrl = `/images/products/generated/${filename}`;

    // Check if image already exists
    if (fs.existsSync(filepath)) {
      console.log(`${progress} Skipping ${product.name} - image already exists`);
      results.skipped.push(product.name);
      continue;
    }

    // Generate image
    const imageBuffer = await generateImage(product.name, product.category, product.origin);

    if (imageBuffer) {
      // Save image
      fs.writeFileSync(filepath, imageBuffer);
      console.log(`${progress} Generated: ${product.name} -> ${filename}`);

      // Update product in database
      const { error: updateError } = await supabase
        .from('Product')
        .update({ image: publicUrl })
        .eq('id', product.id);

      if (updateError) {
        console.error(`  Error updating database for ${product.name}:`, updateError);
        results.failed.push(product.name);
      } else {
        results.success.push(product.name);
      }
    } else {
      console.log(`${progress} Failed: ${product.name}`);
      results.failed.push(product.name);
    }

    // Rate limiting - wait between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('Summary');
  console.log('='.repeat(60));
  console.log(`Total products: ${products.length}`);
  console.log(`Successfully generated: ${results.success.length}`);
  console.log(`Skipped (already exist): ${results.skipped.length}`);
  console.log(`Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed products:');
    results.failed.forEach(name => console.log(`  - ${name}`));
  }
}

// Run the script
main().catch(console.error);
