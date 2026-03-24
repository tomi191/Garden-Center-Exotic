import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { createDefaultConfig } from "@/lib/content-engine/config";
import { generateBlogPost } from "@/lib/content-engine/ai/blog-generator";
import type { ContentType } from "@/lib/content-engine/types";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Неоторизиран достъп" }, { status: 401 });
    }

    const body = await request.json();
    const { topic, keywords, contentType, category, targetWordCount } = body;

    if (!topic) {
      return NextResponse.json({ error: "Темата е задължителна" }, { status: 400 });
    }

    const config = createDefaultConfig();

    if (!config.openrouterApiKey) {
      return NextResponse.json(
        { error: "OPENROUTER_API_KEY не е конфигуриран" },
        { status: 500 }
      );
    }

    const result = await generateBlogPost(config, {
      topic,
      keywords: keywords || [],
      contentType: (contentType as ContentType) || "tofu",
      category: category || "Общи",
      targetWordCount: targetWordCount || 1200,
    });

    return NextResponse.json({
      success: true,
      data: result,
      model: config.defaultTextModel,
    });
  } catch (error) {
    console.error("Error generating blog post:", error);
    const message = error instanceof Error ? error.message : "Неизвестна грешка";
    return NextResponse.json(
      { error: `Грешка при генериране: ${message}` },
      { status: 500 }
    );
  }
}
