import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET - List arrivals (public for published, all for authenticated)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let query = supabaseAdmin.from("fresh_arrivals").select("*");

    if (session?.user) {
      // Authenticated: return all, with optional status filter
      if (status && status !== "all") {
        query = query.eq("status", status);
      }
      query = query.order("created_at", { ascending: false });
    } else {
      // Public: only published
      query = query.eq("status", "published").order("arrival_date", { ascending: false });
    }

    const { data: arrivals, error } = await query;

    if (error) {
      console.error("Error fetching arrivals:", error);
      return NextResponse.json(
        { error: "Грешка при зареждане на пратките" },
        { status: 500 }
      );
    }

    return NextResponse.json(arrivals);
  } catch (error) {
    console.error("Error fetching arrivals:", error);
    return NextResponse.json(
      { error: "Грешка при зареждане на пратките" },
      { status: 500 }
    );
  }
}

// POST - Create arrival (auth required)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Неоторизиран достъп" }, { status: 401 });
    }

    const body = await request.json();

    // Auto-generate slug from title
    const slug =
      body.title
        .toLowerCase()
        .replace(/[^a-zа-яёіїє0-9\s-]/gi, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim() +
      "-" +
      Date.now();

    const now = new Date().toISOString();
    const isPublished = body.status === "published";

    const { data: arrival, error } = await supabaseAdmin
      .from("fresh_arrivals")
      .insert({
        title: body.title,
        slug,
        country: body.country || null,
        description: body.description || null,
        images: body.images || [],
        video_url: body.video_url || null,
        arrival_date: body.arrival_date || null,
        status: body.status || "draft",
        published_at: isPublished ? now : null,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating arrival:", error);
      return NextResponse.json(
        { error: "Грешка при създаване на пратката" },
        { status: 500 }
      );
    }

    return NextResponse.json(arrival, { status: 201 });
  } catch (error) {
    console.error("Error creating arrival:", error);
    return NextResponse.json(
      { error: "Грешка при създаване на пратката" },
      { status: 500 }
    );
  }
}
