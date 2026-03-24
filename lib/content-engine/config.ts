/**
 * Content Engine - Configuration for Exotic Flowers
 */

import type { AIModel, StorageAdapter, DatabaseAdapter, LogAdapter } from './types';

export const AI_MODELS: Record<string, AIModel> = {
  gemini_2_5_flash: {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google',
    costPer1M: { input: 0.075, output: 0.30 },
    maxTokens: 8192,
    contextWindow: 1_048_576,
    strengths: ['fast', 'high-quality', 'large-context'],
  },
  gemini_3_flash: {
    id: 'google/gemini-3-flash-preview',
    name: 'Gemini 3 Flash Preview',
    provider: 'Google',
    costPer1M: { input: 0.50, output: 3.0 },
    maxTokens: 65536,
    contextWindow: 1_048_576,
    strengths: ['long-form-content', 'reasoning', 'high-quality'],
  },
  gemini_image: {
    id: 'google/gemini-2.5-flash-image',
    name: 'Gemini 2.5 Flash Image',
    provider: 'Google',
    costPer1M: { input: 0, output: 0 },
    maxTokens: 8192,
    contextWindow: 1_048_576,
    strengths: ['image-generation', 'free'],
  },
};

export interface ContentEngineConfig {
  openrouterApiKey: string;
  defaultTextModel: string;
  imageModel: string;
  siteUrl: string;
  siteName: string;
  storage?: StorageAdapter;
  database?: DatabaseAdapter;
  logger?: LogAdapter;
}

export function createDefaultConfig(): ContentEngineConfig {
  return {
    openrouterApiKey: process.env.OPENROUTER_API_KEY || '',
    defaultTextModel: 'google/gemini-2.5-flash',
    imageModel: 'google/gemini-2.5-flash-image',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://exoticflowers.bg',
    siteName: 'Градински Център Екзотик',
    logger: {
      info: (msg, data) => console.log(`[ContentEngine] ${msg}`, data || ''),
      warn: (msg, data) => console.warn(`[ContentEngine] ${msg}`, data || ''),
      error: (msg, data) => console.error(`[ContentEngine] ${msg}`, data || ''),
    },
  };
}

export function getModelByKey(key: string): AIModel | undefined {
  return AI_MODELS[key];
}

export function estimateCost(modelKey: string, inputTokens: number, outputTokens: number): number {
  const model = AI_MODELS[modelKey];
  if (!model) return 0;
  return (inputTokens / 1_000_000) * model.costPer1M.input +
         (outputTokens / 1_000_000) * model.costPer1M.output;
}
