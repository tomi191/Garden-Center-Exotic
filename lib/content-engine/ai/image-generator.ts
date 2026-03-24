/**
 * AI Image Generator via OpenRouter (Gemini Image model)
 */

import type { ContentEngineConfig } from '../config';
import type { ImageGenerationResult } from '../types';
import { generateImageBase64 } from './openrouter-client';

export interface ImageOptions {
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export async function generateImage(
  config: ContentEngineConfig,
  prompt: string,
  options: ImageOptions = {}
): Promise<ImageGenerationResult> {
  const log = config.logger;
  log?.info('Generating image', { promptPreview: prompt.substring(0, 80) });

  const { base64, mimeType } = await generateImageBase64(config, prompt);
  const rawBuffer = Buffer.from(base64, 'base64');

  try {
    const sharp = require('sharp');
    let pipeline = sharp(rawBuffer);

    if (options.maxWidth || options.maxHeight) {
      pipeline = pipeline.resize(options.maxWidth, options.maxHeight, {
        fit: 'inside',
        withoutEnlargement: true,
      });
    }

    const webpBuffer: Buffer = await pipeline
      .webp({ quality: options.quality ?? 85, effort: 6 })
      .toBuffer();

    log?.info('Image generated (WebP)', { size: webpBuffer.length });

    return { buffer: webpBuffer, contentType: 'image/webp', size: webpBuffer.length };
  } catch {
    log?.warn('sharp not available, returning raw image');
    return { buffer: rawBuffer, contentType: mimeType, size: rawBuffer.length };
  }
}

export async function generateAndUploadImage(
  config: ContentEngineConfig,
  prompt: string,
  storagePath: string,
  bucket: string = 'images',
  options: ImageOptions = {}
): Promise<string> {
  if (!config.storage) {
    throw new Error('StorageAdapter not configured');
  }

  const image = await generateImage(config, prompt, options);
  const url = await config.storage.upload(bucket, storagePath, image.buffer, image.contentType);
  config.logger?.info('Image uploaded', { url, size: image.size });
  return url;
}
