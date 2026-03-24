/**
 * Content Engine - Type Definitions
 */

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  costPer1M: { input: number; output: number };
  maxTokens: number;
  contextWindow: number;
  strengths: string[];
}

export type ContentType = 'tofu' | 'mofu' | 'bofu' | 'advertorial';

export interface BlogGenerationParams {
  topic: string;
  keywords: string[];
  contentType: ContentType;
  category: string;
  targetWordCount: number;
  extraContext?: string;
}

export interface BlogGenerationResult {
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  keywords: string[];
  readingTime: number;
  wordCount: number;
  suggestedSlug: string;
}

export interface ImageGenerationResult {
  buffer: Buffer;
  contentType: string;
  size: number;
}

export interface AIUsageLog {
  feature: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  costUSD: number;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

export interface StorageAdapter {
  upload(bucket: string, path: string, data: Buffer, contentType: string): Promise<string>;
}

export interface DatabaseAdapter {
  insert(table: string, data: Record<string, unknown>): Promise<void>;
  update(table: string, id: string, data: Record<string, unknown>): Promise<void>;
  query(table: string, filters: Record<string, unknown>): Promise<unknown[]>;
}

export interface LogAdapter {
  info(message: string, data?: Record<string, unknown>): void;
  warn(message: string, data?: Record<string, unknown>): void;
  error(message: string, data?: Record<string, unknown>): void;
}
