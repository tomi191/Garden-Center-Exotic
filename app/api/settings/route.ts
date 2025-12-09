import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET - Public endpoint to fetch settings (EUR rate, etc.)
export async function GET() {
  try {
    const { data: settings, error } = await supabaseAdmin
      .from("Settings")
      .select("*")
      .eq("id", "main")
      .single();

    if (error) {
      // Return default settings if not found
      return NextResponse.json({
        eurRate: 1.9558,
        storePhone: "+359 888 123 456",
        storeEmail: "info@gardenexotic.bg",
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Грешка при зареждане на настройките" },
      { status: 500 }
    );
  }
}

// PUT - Protected endpoint to update settings
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Неоторизиран достъп" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const { data: settings, error } = await supabaseAdmin
      .from("Settings")
      .upsert({
        id: "main",
        eurRate: body.eurRate,
        storePhone: body.storePhone,
        storeEmail: body.storeEmail,
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error updating settings:", error);
      return NextResponse.json(
        { error: "Грешка при запазване на настройките" },
        { status: 500 }
      );
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Грешка при запазване на настройките" },
      { status: 500 }
    );
  }
}
