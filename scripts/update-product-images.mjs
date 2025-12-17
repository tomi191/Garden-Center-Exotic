/**
 * Update all products in database with generated image URLs
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = 'https://hajcdxqedeqpffbfahue.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhamNkeHFlZGVxcGZmYmZhaHVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMjkxNDUsImV4cCI6MjA4MDgwNTE0NX0.R0q8XrThicOUxNPxab4_8flk5D9gPVLJ4tv33XZaRfc';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Transliteration function
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

async function main() {
  console.log('Fetching products from database...');

  const { data: products, error } = await supabase
    .from('Product')
    .select('id, name, image')
    .order('name');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${products.length} products`);

  const imagesDir = path.join(__dirname, '..', 'public', 'images', 'products', 'generated');
  const existingImages = fs.readdirSync(imagesDir);

  let updated = 0;
  let skipped = 0;
  let notFound = 0;

  for (const product of products) {
    const slug = createSlug(product.name);
    const filename = `${slug}.png`;
    const publicUrl = `/images/products/generated/${filename}`;

    // Check if image file exists
    if (!existingImages.includes(filename)) {
      console.log(`Image not found for: ${product.name} (${filename})`);
      notFound++;
      continue;
    }

    // Check if already updated
    if (product.image === publicUrl) {
      skipped++;
      continue;
    }

    // Update the product
    const { error: updateError } = await supabase
      .from('Product')
      .update({ image: publicUrl })
      .eq('id', product.id);

    if (updateError) {
      console.error(`Failed to update ${product.name}:`, updateError);
    } else {
      console.log(`Updated: ${product.name} -> ${publicUrl}`);
      updated++;
    }
  }

  console.log('\n=== Summary ===');
  console.log(`Total products: ${products.length}`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped (already correct): ${skipped}`);
  console.log(`Image not found: ${notFound}`);
}

main().catch(console.error);
