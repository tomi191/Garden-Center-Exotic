import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET - Single arrival by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: arrival, error } = await supabaseAdmin
      .from("fresh_arrivals")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !arrival) {
      return NextResponse.json(
        { error: "Пратката не е намерена" },
        { status: 404 }
      );
    }

    return NextResponse.json(arrival);
  } catch (error) {
    console.error("Error fetching arrival:", error);
    return NextResponse.json(
      { error: "Грешка при зареждане на пратката" },
      { status: 500 }
    );
  }
}

// PATCH - Update arrival (auth required)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Неоторизиран достъп" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updateData: Record<string, unknown> = {
      ...body,
      updated_at: new Date().toISOString(),
    };

    // If publishing and published_at is not already set, set it now
    if (body.status === "published") {
      const { data: existing } = await supabaseAdmin
        .from("fresh_arrivals")
        .select("published_at")
        .eq("id", id)
        .single();

      if (existing && !existing.published_at) {
        updateData.published_at = new Date().toISOString();
      }
    }

    const { data: arrival, error } = await supabaseAdmin
      .from("fresh_arrivals")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating arrival:", error);
      return NextResponse.json(
        { error: "Грешка при обновяване на пратката" },
        { status: 500 }
      );
    }

    if (!arrival) {
      return NextResponse.json(
        { error: "Пратката не е намерена" },
        { status: 404 }
      );
    }

    return NextResponse.json(arrival);
  } catch (error) {
    console.error("Error updating arrival:", error);
    return NextResponse.json(
      { error: "Грешка при обновяване на пратката" },
      { status: 500 }
    );
  }
}

// DELETE - Delete arrival (auth required)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Неоторизиран достъп" }, { status: 401 });
    }

    const { id } = await params;

    const { data: existing } = await supabaseAdmin
      .from("fresh_arrivals")
      .select("id")
      .eq("id", id)
      .single();

    if (!existing) {
      return NextResponse.json(
        { error: "Пратката не е намерена" },
        { status: 404 }
      );
    }

    const { error } = await supabaseAdmin
      .from("fresh_arrivals")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting arrival:", error);
      return NextResponse.json(
        { error: "Грешка при изтриване на пратката" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting arrival:", error);
    return NextResponse.json(
      { error: "Грешка при изтриване на пратката" },
      { status: 500 }
    );
  }
}
