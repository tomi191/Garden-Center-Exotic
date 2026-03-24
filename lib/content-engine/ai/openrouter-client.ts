/**
 * OpenRouter API Client
 */

import type { ContentEngineConfig } from '../config';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface CompletionOptions {
  model?: string;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
}

export interface CompletionResult {
  content: string;
  model: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function complete(
  config: ContentEngineConfig,
  options: CompletionOptions
): Promise<CompletionResult> {
  const model = options.model || config.defaultTextModel;

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.openrouterApiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': config.siteUrl,
      'X-Title': config.siteName,
    },
    body: JSON.stringify({
      model,
      messages: options.messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 8192,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenRouter API error (${response.status}): ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';

  return {
    content,
    model: data.model || model,
    usage: {
      promptTokens: data.usage?.prompt_tokens || 0,
      completionTokens: data.usage?.completion_tokens || 0,
      totalTokens: data.usage?.total_tokens || 0,
    },
  };
}

export async function generateImageBase64(
  config: ContentEngineConfig,
  prompt: string,
  model?: string
): Promise<{ base64: string; mimeType: string }> {
  const imageModel = model || config.imageModel;

  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${config.openrouterApiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': config.siteUrl,
      'X-Title': config.siteName,
    },
    body: JSON.stringify({
      model: imageModel,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Image generation failed (${response.status}): ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content || !Array.isArray(content)) {
    throw new Error('Unexpected image response format');
  }

  const imagePart = content.find(
    (part: Record<string, unknown>) =>
      part.type === 'image_url' && typeof part.image_url === 'object'
  );

  if (!imagePart?.image_url?.url) {
    throw new Error('No image data in response');
  }

  const dataUri: string = imagePart.image_url.url;
  const match = dataUri.match(/^data:([^;]+);base64,(.+)$/);

  if (!match) {
    throw new Error('Invalid image data URI');
  }

  return { mimeType: match[1], base64: match[2] };
}
