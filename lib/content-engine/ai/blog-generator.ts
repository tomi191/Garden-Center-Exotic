/**
 * Blog Generator - Full pipeline: prompt → AI → parse → validate → result
 */

import type { ContentEngineConfig } from '../config';
import type { BlogGenerationParams, BlogGenerationResult } from '../types';
import { complete } from './openrouter-client';
import { buildBlogPrompt } from './prompts';
import { parseJSONResponse } from './response-parser';
import { generateSlug, calculateReadingTime, calculateWordCount } from '../utils/slug-generator';

export interface BlogGeneratorOptions {
  systemPrompt?: string;
  internalLinks?: Record<string, string>;
  temperature?: number;
  maxTokens?: number;
}

export async function generateBlogPost(
  config: ContentEngineConfig,
  params: BlogGenerationParams,
  options: BlogGeneratorOptions = {}
): Promise<BlogGenerationResult> {
  const log = config.logger;

  const prompt = buildBlogPrompt({
    topic: params.topic,
    keywords: params.keywords,
    contentType: params.contentType,
    category: params.category,
    targetWordCount: params.targetWordCount,
    systemPrompt: options.systemPrompt,
    internalLinks: options.internalLinks,
    siteName: config.siteName,
  });

  const fullPrompt = params.extraContext
    ? `${params.extraContext}\n\n${prompt}`
    : prompt;

  log?.info('Generating blog post', { topic: params.topic, wordTarget: params.targetWordCount });

  const completion = await complete(config, {
    messages: [{ role: 'user', content: fullPrompt }],
    temperature: options.temperature ?? 0.8,
    maxTokens: options.maxTokens ?? 12000,
  });

  log?.info('AI response received', {
    model: completion.model,
    tokens: completion.usage.totalTokens,
  });

  const parsed = parseJSONResponse<{
    title: string;
    metaTitle: string;
    metaDescription: string;
    excerpt: string;
    content: string;
    keywords: string[];
  }>(completion.content, ['title', 'content']);

  const wordCount = calculateWordCount(parsed.content);
  const readingTime = calculateReadingTime(parsed.content);
  const suggestedSlug = generateSlug(parsed.title);

  let metaDescription = parsed.metaDescription || parsed.excerpt || '';
  if (!metaDescription.trim()) {
    const text = parsed.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    metaDescription = text.length > 155 ? text.substring(0, 152) + '...' : text;
  }

  log?.info('Blog post generated', { title: parsed.title, wordCount, readingTime });

  return {
    title: parsed.title,
    metaTitle: parsed.metaTitle || parsed.title,
    metaDescription,
    excerpt: parsed.excerpt || metaDescription,
    content: parsed.content,
    keywords: Array.isArray(parsed.keywords) ? parsed.keywords : [],
    readingTime,
    wordCount,
    suggestedSlug,
  };
}
