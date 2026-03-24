/**
 * Content Engine - Prompt Templates
 * Customized for Градински Център Екзотик (Exotic Garden Center)
 */

import type { ContentType } from '../types';

interface PromptParams {
  topic: string;
  keywords: string[];
  contentType: ContentType;
  category: string;
  targetWordCount: number;
  systemPrompt?: string;
  internalLinks?: Record<string, string>;
  siteName?: string;
}

const DEFAULT_SYSTEM_PROMPT = `Ти си опитен копирайтър, специализиран в градинарство, цветарство и грижа за растения. Пишеш за Градински Център Екзотик — българска верига магазини за цветя и растения, внос от Еквадор, Холандия и Турция. Локации: Варна и Нова Загора.

СТИЛ:
- Пиши на български език, естествено и човешки
- Използвай разговорен, но експертен тон
- Вариирай дължината на изреченията (3-25 думи)
- Активен залог
- Без клишета като "в заключение", "в днешно време", "нека разгледаме"
- Когато е уместно, включвай практически съвети от опит

СТРУКТУРА:
1. Увод с кука (100-150 думи)
2. TL;DR секция (3-5 точки)
3. Основно съдържание (разделено на логични H2 секции, всяка с 2-3 H3 подсекции)
4. Секция "Практически съвети" (конкретни стъпки)
5. FAQ секция (3-5 въпроса и отговора)
6. Заключение (емоционален призив за действие, покана в магазина)

ТЕХНИЧЕСКИ:
- Поне 1 таблица на статия
- Използвай <h2>, <h3>, <p>, <ul>, <ol>, <strong>, <blockquote>
- Без <h1> (заглавието идва отделно)
- Включи маркери за изображения: <!-- HERO_IMAGE -->, <!-- IMAGE:1 -->, <!-- IMAGE:2 -->
- Без емотикони в заглавията

ИЗХОДЕН ФОРМАТ: Върни САМО валиден JSON:
{
  "title": "SEO заглавие (50-60 символа)",
  "metaTitle": "Мета заглавие (50-60 символа)",
  "metaDescription": "Мета описание (150-160 символа)",
  "excerpt": "Кратък преглед (150-200 символа)",
  "content": "Пълно HTML съдържание",
  "keywords": ["ключова1", "ключова2", ...]
}`;

function getContentTypeInstructions(contentType: ContentType, targetWordCount: number): string {
  switch (contentType) {
    case 'tofu':
      return `ЦЕЛ: Образователна статия за широка аудитория от градинари и любители на растения.
ФОКУС: Обясни концепции просто, включи полезни факти, практически примери.
МИНИМУМ: ${targetWordCount} думи. ОПТИМАЛНО: ${Math.ceil(targetWordCount * 1.25)} думи.
СЕКЦИИ: Увод (150-200д), TL;DR (80-100д), Основно (${Math.floor(targetWordCount * 0.50)}д, 4-6 H2), Практически съвети (${Math.floor(targetWordCount * 0.15)}д), FAQ (300-400д), Заключение (120-150д).`;

    case 'mofu':
      return `ЦЕЛ: Практическо ръководство, демонстриращо експертиза.
ФОКУС: Стъпка по стъпка инструкции, чести грешки, напреднали съвети.
МИНИМУМ: ${targetWordCount} думи. ОПТИМАЛНО: ${Math.ceil(targetWordCount * 1.2)} думи.
СЕКЦИИ: Увод (120-150д), TL;DR (60-80д), Стъпки (${Math.floor(targetWordCount * 0.55)}д, 5-7 стъпки), Грешки (${Math.floor(targetWordCount * 0.12)}д), Съвети (${Math.floor(targetWordCount * 0.10)}д), FAQ (250-400д), Заключение (100-130д).`;

    case 'bofu':
      return `ЦЕЛ: Статия, насочена към конверсия с директен призив за действие.
ФОКУС: Сравнения, отговори на възражения, социално доказателство, уникална стойност на Екзотик.
МИНИМУМ: ${targetWordCount} думи. ОПТИМАЛНО: ${Math.ceil(targetWordCount * 1.2)} думи.
СЕКЦИИ: Увод (130-160д), TL;DR (70-90д), Ползи (${Math.floor(targetWordCount * 0.25)}д), Аудитория (${Math.floor(targetWordCount * 0.15)}д), Сравнение (${Math.floor(targetWordCount * 0.20)}д), FAQ (300-450д), Спешност + Заключение (150-180д).`;

    case 'advertorial':
      return `ЦЕЛ: Максимална конверсия чрез разказ на история.
ФОКУС: Реалистична история, Проблем → Решение → Трансформация, емоционална връзка.
МИНИМУМ: ${targetWordCount} думи. ОПТИМАЛНО: ${Math.ceil(targetWordCount * 1.2)} думи.
СЕКЦИИ: Увод (150-180д), TL;DR (80-100д), Проблем (${Math.floor(targetWordCount * 0.18)}д), Откритие (${Math.floor(targetWordCount * 0.18)}д), Трансформация (${Math.floor(targetWordCount * 0.20)}д), Резултати (${Math.floor(targetWordCount * 0.15)}д), FAQ (280-350д), Финален CTA (150-180д).`;
  }
}

export function buildBlogPrompt(params: PromptParams): string {
  const {
    topic,
    keywords,
    contentType,
    category,
    targetWordCount,
    systemPrompt,
    internalLinks,
    siteName,
  } = params;

  const system = systemPrompt || DEFAULT_SYSTEM_PROMPT;
  const contentInstructions = getContentTypeInstructions(contentType, targetWordCount);
  const site = siteName || 'Градински Център Екзотик';

  const currentDate = new Date().toLocaleDateString('bg-BG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let linkInstructions = '';
  if (internalLinks && Object.keys(internalLinks).length > 0) {
    linkInstructions = '\nВЪТРЕШНИ ЛИНКОВЕ (използвай естествено в текста, само първо споменаване):\n';
    for (const [keyword, url] of Object.entries(internalLinks)) {
      linkInstructions += `- "${keyword}" → <a href="${url}">${keyword}</a>\n`;
    }
  }

  return `${system}

====================
КОНТЕКСТ
====================
ДАТА: ${currentDate}
САЙТ: ${site}

====================
ЗАДАЧА
====================
Напиши блог статия на тема: "${topic}"
КАТЕГОРИЯ: ${category}
КЛЮЧОВИ ДУМИ: ${keywords.join(', ')}

${contentInstructions}
${linkInstructions}

====================
SEO ИЗИСКВАНИЯ
====================
- Включи основната ключова дума "${keywords[0] || topic}" в:
  - Първото изречение
  - Поне 2 подзаглавия
  - Естествено в текста (1-2% плътност)
- Семантични ключови думи: ${keywords.slice(1).join(', ')}

Започни ДИРЕКТНО с { и завърши с }. Без друг текст!`;
}
