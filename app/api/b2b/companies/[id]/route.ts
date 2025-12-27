import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { TIER_DISCOUNTS, TIER_PAYMENT_TERMS } from "@/lib/b2b-auth";

// GET - Get single B2B company (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const { data: company, error } = await supabaseAdmin
      .from("b2b_companies")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !company) {
      return NextResponse.json(
        { error: "Компанията не е намерена" },
        { status: 404 }
      );
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Възникна грешка" },
      { status: 500 }
    );
  }
}

// PATCH - Update B2B company (approve/reject/update tier)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    const updateData: Record<string, unknown> = {};

    // Handle status update
    if (body.status) {
      updateData.status = body.status;

      if (body.status === "approved") {
        updateData.approved_by = session.user.id;
        updateData.approved_at = new Date().toISOString();
      }
    }

    // Handle tier update
    if (body.tier) {
      updateData.tier = body.tier;
      updateData.discount_percent = TIER_DISCOUNTS[body.tier as keyof typeof TIER_DISCOUNTS];
      updateData.payment_terms = TIER_PAYMENT_TERMS[body.tier as keyof typeof TIER_PAYMENT_TERMS];
    }

    // Handle other fields
    if (body.discount_percent !== undefined) {
      updateData.discount_percent = body.discount_percent;
    }
    if (body.payment_terms !== undefined) {
      updateData.payment_terms = body.payment_terms;
    }
    if (body.credit_limit !== undefined) {
      updateData.credit_limit = body.credit_limit;
    }
    if (body.notes !== undefined) {
      updateData.notes = body.notes;
    }

    const { data: company, error } = await supabaseAdmin
      .from("b2b_companies")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating B2B company:", error);
      return NextResponse.json(
        { error: "Грешка при обновяване на компанията" },
        { status: 500 }
      );
    }

    return NextResponse.json(company);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Възникна грешка" },
      { status: 500 }
    );
  }
}

// DELETE - Delete B2B company (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const { error } = await supabaseAdmin
      .from("b2b_companies")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting B2B company:", error);
      return NextResponse.json(
        { error: "Грешка при изтриване на компанията" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Възникна грешка" },
      { status: 500 }
    );
  }
}
