/**
 * Valentine's Day TikTok Video Generation Script
 * Using KIE AI SORA 2 API
 *
 * Viral TikTok Formula:
 * - Hook in first 3 seconds (65%+ retention = 4-7x impressions)
 * - Pattern interrupt + Curiosity gap
 * - Emotional storytelling
 * - Transformation reveal
 *
 * Usage: node scripts/generate-valentine-tiktok.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// KIE AI Configuration
// API Docs: https://docs.kie.ai/market/sora2/sora-2-text-to-video
const KIE_API_KEY = '68b095368a4615c4259c546dee223fe9';
const KIE_API_BASE = 'https://api.kie.ai';
const SORA2_MODEL = 'sora-2-text-to-video';

// ============================================
// VIRAL TIKTOK VIDEO CONCEPTS
// ============================================

const TIKTOK_VIDEOS = [
  {
    id: 'bouquet-timelapse',
    filename: 'valentine-bouquet-timelapse.mp4',
    title: 'Създаване на букет',
    hook: 'Гледай как създаваме перфектния букет',
    prompt: `Cinematic time-lapse video of professional florist's hands creating a luxury red rose bouquet. Starting with empty elegant marble table. Red roses from Ecuador, long stems 90cm, being placed one by one. Wrapping in premium cream paper with silk ribbon. Final reveal: stunning finished bouquet, slow motion 360 rotation. High-end florist studio, soft natural lighting, shallow depth of field. Valentine's Day mood, romantic, luxurious. Professional commercial quality, 4K, cinematic color grading.`,
    duration: 15,
    aspectRatio: 'portrait'
  },
  {
    id: 'luxury-box-unboxing',
    filename: 'valentine-luxury-box.mp4',
    title: 'Луксозна кутия рози',
    hook: 'Най-красивият подарък',
    prompt: `Cinematic unboxing video of a luxury Valentine's Day flower box. Elegant female hands with subtle manicure slowly opening a black velvet gift box with gold ribbon. Inside: perfectly arranged red roses in heart shape. Gold tissue paper, premium presentation. Slow motion lid reveal, roses come into view dramatically. Soft romantic lighting, bokeh background with fairy lights. ASMR-like satisfying quality, smooth movements. High-end product video style, 4K cinematic. No face visible, only hands and product.`,
    duration: 15,
    aspectRatio: 'portrait'
  },
  {
    id: 'rose-macro',
    filename: 'valentine-rose-macro.mp4',
    title: 'Красотата на розата',
    hook: 'Виж тази красота отблизо',
    prompt: `Stunning macro cinematography of a perfect red rose. Extreme close-up of velvety petals with morning dewdrops. Camera slowly moves across the rose surface revealing intricate petal textures. Soft focus transitions between different parts of the flower. Rich crimson colors, dramatic lighting. Water droplets catching light like diamonds. Professional studio macro photography style, 4K ultra-detailed. Romantic, luxurious Valentine's Day mood.`,
    duration: 15,
    aspectRatio: 'portrait'
  },
  {
    id: 'ecuador-roses',
    filename: 'valentine-ecuador-roses.mp4',
    title: 'Премиум рози от Еквадор',
    hook: 'Виждали ли сте такива рози?',
    prompt: `Product showcase video of premium Ecuador long-stem roses. Camera starts with extreme close-up of perfect red rose head with velvety petals. Slowly pulls back revealing the impressive stem length. Multiple roses arranged elegantly, rich crimson colors against clean white background. Professional studio lighting, rotating display. Dewdrops on petals catching light. Luxurious premium quality showcase, 4K commercial style. Valentine's Day mood.`,
    duration: 15,
    aspectRatio: 'portrait'
  }
];

// Sleep utility
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Generate video using SORA 2 API
// Endpoint: POST https://api.kie.ai/api/v1/jobs/createTask
async function generateVideo(videoConfig) {
  console.log(`\n🎬 Generating: ${videoConfig.title}...`);
  console.log(`   Hook: "${videoConfig.hook}"`);
  console.log(`   Duration: ${videoConfig.duration}s`);

  // Request body format per KIE AI docs (with size and character_id_list)
  const requestBody = {
    model: SORA2_MODEL,
    input: {
      prompt: videoConfig.prompt,
      aspect_ratio: videoConfig.aspectRatio || 'portrait',
      n_frames: String(videoConfig.duration <= 10 ? '10' : '15'),
      size: 'standard',
      remove_watermark: true,
      character_id_list: []
    }
  };

  try {
    // Start generation task
    console.log(`   📤 Sending request to KIE AI...`);
    const response = await fetch(`${KIE_API_BASE}/api/v1/jobs/createTask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIE_API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();

    if (result.code !== 200) {
      throw new Error(`API Error: ${result.msg || result.message || 'Unknown error'}`);
    }

    const taskId = result.data?.taskId;
    if (!taskId) {
      throw new Error('No taskId received');
    }

    console.log(`   ✅ Task created: ${taskId}`);

    // Poll for result
    return await pollForVideoResult(taskId, videoConfig);

  } catch (error) {
    console.error(`   ❌ Error: ${error.message}`);
    return null;
  }
}

// Poll for video completion
// Endpoint: GET https://api.kie.ai/api/v1/jobs/recordInfo?taskId=xxx
// States: waiting, queuing, generating, success, fail
async function pollForVideoResult(taskId, videoConfig, maxAttempts = 120) {
  console.log(`   ⏳ Generating video (this may take several minutes)...`);

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await sleep(5000); // Wait 5 seconds between polls (videos take longer)

    try {
      const pollResponse = await fetch(
        `${KIE_API_BASE}/api/v1/jobs/recordInfo?taskId=${taskId}`,
        {
          headers: {
            'Authorization': `Bearer ${KIE_API_KEY}`
          }
        }
      );

      if (!pollResponse.ok) {
        process.stdout.write('.');
        continue;
      }

      const result = await pollResponse.json();

      if (result.code !== 200) {
        process.stdout.write('x');
        continue;
      }

      // KIE API uses 'state' field: waiting, queuing, generating, success, fail
      const state = result.data?.state;

      // Show progress indicator based on state
      if (state === 'waiting') {
        process.stdout.write('W');
      } else if (state === 'queuing') {
        process.stdout.write('Q');
      } else if (state === 'generating') {
        process.stdout.write('G');
      } else {
        process.stdout.write('.');
      }

      if (state === 'success') {
        console.log(`\n   ✅ Video generation complete!`);

        // Parse resultJson to get video URLs
        let videoUrls = [];
        if (result.data?.resultJson) {
          try {
            const resultData = JSON.parse(result.data.resultJson);
            videoUrls = resultData.resultUrls || [];
          } catch (e) {
            console.log(`   ⚠️ Failed to parse resultJson: ${e.message}`);
          }
        }

        if (videoUrls.length > 0) {
          return await downloadVideo(videoUrls[0], videoConfig);
        }

        throw new Error('No video URLs in response');
      }

      if (state === 'fail') {
        const failMsg = result.data?.failMsg || result.data?.failCode || 'Unknown error';
        throw new Error(`Generation failed: ${failMsg}`);
      }

    } catch (error) {
      if (error.message.includes('Generation failed')) {
        throw error;
      }
      process.stdout.write('?');
    }
  }

  throw new Error('Timeout waiting for video generation');
}

// Download and save video
async function downloadVideo(url, videoConfig) {
  const outputDir = path.join(__dirname, '..', 'public', 'videos', 'valentine');

  // Create directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`   📁 Created directory: ${outputDir}`);
  }

  const outputPath = path.join(outputDir, videoConfig.filename);

  console.log(`   📥 Downloading video...`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download video: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));

  console.log(`   ✅ Saved: /videos/valentine/${videoConfig.filename}`);
  return outputPath;
}

// Generate shot list document
function generateShotList() {
  const outputDir = path.join(__dirname, '..', 'public', 'videos', 'valentine');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const shotList = `
# 🌹 Valentine's Day TikTok Video Shot List
## Екзотик Флауърс - Вирусна Кампания

---

## ВИРУСНА ФОРМУЛА ЗА TIKTOK

### Правило на 3-те секунди
- 65%+ retention в първите 3 секунди = 4-7x повече impressions
- Силен HOOK е критичен за успеха

### Типове ефективни hooks:
1. **Bold Statement** - "Това е най-красивият букет, който ще видите"
2. **Question** - "Знаете ли колко дълги са тези рози?"
3. **Pattern Interrupt** - Неочаквана визия или звук
4. **Proof First** - Показване на резултата първо

---

## ВИДЕО 1: Transformation
**Заглавие:** Букет за 30 секунди
**Hook:** "Гледайте как създаваме букет за $500 за 30 секунди"
**Формат:** Time-lapse transformation

### Кадри:
| Време | Кадър | Описание |
|-------|-------|----------|
| 0-3s | HOOK | Close-up празна маса, текст overlay |
| 3-8s | BUILD | Fast-motion сглобяване на букета |
| 8-12s | REVEAL | Готов букет, slow-mo ротация |
| 12-15s | CTA | "Обадете се" + телефон |

### Текст overlays:
- "Гледайте как създаваме..."
- "101 рози от Колумбия"
- "📞 089 567 0370"

---

## ВИДЕО 2: Unboxing
**Заглавие:** Луксозна кутия рози
**Hook:** "Това ли е най-красивият подарък?"
**Формат:** ASMR-style unboxing

### Кадри:
| Време | Кадър | Описание |
|-------|-------|----------|
| 0-3s | HOOK | Черна кутия, текст "Това ли е..." |
| 3-8s | BUILD | Бавно отваряне на капака |
| 8-12s | REVEAL | Сърцевидна аранжировка от рози |
| 12-15s | CTA | Close-up + "Поръчай за Валентин" |

### Аудио:
- ASMR звуци (отваряне, rustling)
- Soft romantic music

---

## ВИДЕО 3: Delivery Moment
**Заглавие:** Моментът на изненадата
**Hook:** "Реакцията ѝ е безценна"
**Формат:** Emotional reaction video

### Кадри:
| Време | Кадър | Описание |
|-------|-------|----------|
| 0-3s | HOOK | Врата се отваря, текст |
| 3-8s | BUILD | Жена получава букета |
| 8-10s | REVEAL | Щастлива реакция |
| 10-15s | CTA | "Изненадайте я този Валентин" |

### Emotion triggers:
- Genuine surprise
- Happy tears (optional)
- Grateful hug

---

## ВИДЕО 4: Rose Beauty
**Заглавие:** 90см рози от Еквадор
**Hook:** "Виждали ли сте такива рози?"
**Формат:** Product showcase

### Кадри:
| Време | Кадър | Описание |
|-------|-------|----------|
| 0-3s | HOOK | Extreme macro на роза |
| 3-10s | BUILD | Slow reveal на дължината |
| 10-13s | REVEAL | Сравнение за мащаб |
| 13-15s | CTA | "Директен внос от Еквадор" |

### WOW factors:
- Dewdrops macro
- Size comparison
- Color richness

---

## ХАШТАГ СТРАТЕГИЯ

### Broad reach:
#fyp #viral #foryou #foryoupage

### Niche:
#valentinesday #valentines2025 #roses #flowers
#romanticgift #luxuryflowers #roses90cm

### Local:
#варна #bulgaria #varna #цветя

### Trending:
#флорист #букет #свeтивалентин #14февруари

---

## POSTING STRATEGY

### Best times (Bulgaria):
- 12:00-14:00 (lunch break)
- 18:00-21:00 (evening)
- Sunday 10:00-12:00

### Frequency:
- 4-7 videos leading up to Valentine's (Feb 7-13)
- Peak posting Feb 10-13

### Engagement:
- Reply to every comment in first hour
- Pin best comments
- Create duet/stitch opportunities

---

## CTA VARIATIONS

1. "📞 Обадете се сега: 089 567 0370"
2. "🌹 Линк в био за повече"
3. "💬 Пишете ни за персонална оферта"
4. "📍 Варна, ул. Франга дере 27А"

---

Generated: ${new Date().toISOString()}
`;

  const outputPath = path.join(outputDir, 'TIKTOK-SHOT-LIST.md');
  fs.writeFileSync(outputPath, shotList);
  console.log(`📋 Shot list saved to: ${outputPath}`);
  return outputPath;
}

// Main execution
async function main() {
  console.log('╔══════════════════════════════════════════════════╗');
  console.log('║  🎬 Valentine\'s Day TikTok Video Generation     ║');
  console.log('║  Using KIE AI SORA 2                            ║');
  console.log('╚══════════════════════════════════════════════════╝');
  console.log(`\nAPI Key: ${KIE_API_KEY.substring(0, 8)}...`);
  console.log(`Videos to generate: ${TIKTOK_VIDEOS.length}\n`);

  // First, generate the shot list document
  console.log('📋 Generating TikTok shot list document...');
  generateShotList();

  // Then generate videos
  const results = [];

  for (const video of TIKTOK_VIDEOS) {
    try {
      const result = await generateVideo(video);
      results.push({ id: video.id, title: video.title, success: !!result, path: result });
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}`);
      results.push({ id: video.id, title: video.title, success: false, error: error.message });
    }

    // Rate limiting
    await sleep(3000);
  }

  console.log('\n\n╔══════════════════════════════════════════════════╗');
  console.log('║  📊 Video Generation Summary                     ║');
  console.log('╚══════════════════════════════════════════════════╝\n');

  results.forEach(r => {
    const status = r.success ? '✅' : '❌';
    console.log(`${status} ${r.title}: ${r.success ? 'Success' : r.error || 'Failed'}`);
  });

  const successCount = results.filter(r => r.success).length;
  console.log(`\n🎯 Total: ${successCount}/${results.length} videos generated`);

  if (successCount > 0) {
    console.log(`\n📂 Videos saved to: public/videos/valentine/`);
  }

  console.log(`\n📋 Shot list document: public/videos/valentine/TIKTOK-SHOT-LIST.md`);
}

// Run with just shot list if --plan flag is passed
if (process.argv.includes('--plan')) {
  console.log('📋 Generating TikTok shot list only (--plan mode)...\n');
  generateShotList();
  console.log('\n✅ Done! Check public/videos/valentine/TIKTOK-SHOT-LIST.md');
} else {
  main().catch(console.error);
}
