import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Неоторизиран" }, { status: 401 });
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "AI не е конфигуриран" }, { status: 500 });
    }

    const { id } = await params;

    const { data: message } = await supabaseAdmin
      .from("contact_messages")
      .select("*")
      .eq("id", id)
      .single();

    if (!message) {
      return NextResponse.json({ error: "Съобщението не е намерено" }, { status: 404 });
    }

    const inquiryLabels: Record<string, string> = {
      general: "обща информация",
      b2b: "B2B партньорство",
      delivery: "доставка",
      "plant-care": "грижи за растения",
      complaint: "оплакване",
    };

    const prompt = `Ти си асистент на "Градински Център Екзотик" — директен вносител на премиум цветя от Еквадор, Холандия, Колумбия, Кения, Турция и Гърция от 1998 г. Два магазина: Варна (ул. Франга дере 27А, тел: 089 567 0370) и Нова Загора (ул. Г.С. Раковски 19, тел: 088 830 6000). Работно време: Пон-Пет 09:00-18:00, Съб-Нед почивни.

Услуги: Доставка на цветя (безплатна над 50лв), букети и аранжименти, озеленяване на офиси/градини, B2B за флористи и хотели, консултации за растения.

Продукти: Рози от Еквадор (60-80см), орхидеи, лалета, хортензии, екзотични цветя, саксийни растения, градински растения. Цените се предоставят при запитване (не ги споменавай конкретно).

Напиши професионален, топъл и кратък отговор на БЪЛГАРСКИ на следното клиентско запитване.

Клиент: ${message.name}
Тема: ${inquiryLabels[message.inquiry_type] || message.inquiry_type}
Локация: ${message.location === "varna" ? "Варна" : "Нова Загора"}
${message.phone ? `Телефон: ${message.phone}` : ""}

Съобщение:
${message.message}

Правила:
- Пиши на български, учтиво и професионално
- Бъди конкретен и полезен, не generic
- Ако е за цена — покани да се обади или да ни посети за актуална оферта
- Ако е за грижи за растения — дай кратък практичен съвет
- Ако е за B2B — покани за среща или обаждане за индивидуална оферта
- Максимум 150 думи
- НЕ използвай формални обръщения като "Уважаеми" — бъди приятелски професионален
- Подпиши с: "Екипът на Градински Център Екзотик"`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenRouter error:", errText);
      return NextResponse.json({ error: "AI грешка" }, { status: 500 });
    }

    const result = await response.json();
    const aiReply = result.choices?.[0]?.message?.content?.trim();

    if (!aiReply) {
      return NextResponse.json({ error: "Празен AI отговор" }, { status: 500 });
    }

    return NextResponse.json({ reply: aiReply });
  } catch (error) {
    console.error("AI reply error:", error);
    return NextResponse.json({ error: "Грешка при генериране" }, { status: 500 });
  }
}
