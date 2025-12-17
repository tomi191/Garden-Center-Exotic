import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { query } from "@anthropic-ai/claude-agent-sdk";

export const runtime = "nodejs";
export const maxDuration = 60;

interface BlogPostRequest {
  topic: string;
  tone: "professional" | "casual" | "friendly" | "educational";
  length: "short" | "medium" | "long";
  keywords?: string[];
  language: "bg" | "en";
}

const TONE_DESCRIPTIONS = {
  professional: "професионален, експертен и авторитетен",
  casual: "неформален и разговорен",
  friendly: "приятелски и достъпен",
  educational: "образователен и информативен",
};

const LENGTH_WORDS = {
  short: "300-500 думи",
  medium: "600-900 думи",
  long: "1000-1500 думи",
};

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body: BlogPostRequest = await request.json();
    const { topic, tone, length, keywords, language } = body;

    if (!topic || !tone || !length) {
      return NextResponse.json(
        { error: "Missing required fields: topic, tone, length" },
        { status: 400 }
      );
    }

    const keywordsText = keywords?.length
      ? `Включи следните ключови думи естествено в текста: ${keywords.join(", ")}.`
      : "";

    const languageInstruction = language === "bg"
      ? "Пиши на български език."
      : "Write in English.";

    const systemPrompt = `Ти си експертен копирайтър за градински център и цветарски магазин "Екзотик".
Специализираш в създаването на engaging блог съдържание за растения, цветя, градинарство и флористика.

Твоят стил е ${TONE_DESCRIPTIONS[tone]}.

Правила:
- Пиши в Markdown формат
- Започни с привлекателно заглавие (H1)
- Използвай подзаглавия (H2, H3) за структура
- Включи практични съвети където е уместно
- Завърши с call-to-action за посещение на магазина или контакт
- ${languageInstruction}
- Дължина: ${LENGTH_WORDS[length]}
${keywordsText}`;

    const prompt = `Напиши блог пост на тема: "${topic}"

Изисквания:
- Тон: ${TONE_DESCRIPTIONS[tone]}
- Дължина: ${LENGTH_WORDS[length]}
${keywordsText}
${languageInstruction}

Върни само Markdown съдържанието без допълнителни обяснения.`;

    // Create a streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = query({
            prompt,
            options: {
              model: "claude-sonnet-4-5",
              systemPrompt,
              maxBudgetUsd: 0.5,
            },
          });

          for await (const message of response) {
            // Handle assistant messages
            if (message.type === "assistant") {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const content = (message as any).content as string | undefined;

              if (content) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                );
              }
            }
            // Handle result messages that may contain text
            else if (message.type === "result") {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const result = (message as any).result as string | undefined;
              if (result) {
                controller.enqueue(
                  encoder.encode(`data: ${JSON.stringify({ content: result })}\n\n`)
                );
              }
            }
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : "Unknown error";
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: errorMessage })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Blog generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate blog post" },
      { status: 500 }
    );
  }
}
