import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { b2bAuthOptions } from "@/lib/b2b-auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET - Get single B2B order
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Try admin session first
    let session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === "admin";

    // If not admin, try B2B session
    if (!isAdmin) {
      session = await getServerSession(b2bAuthOptions);
    }

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    let query = supabaseAdmin
      .from("b2b_orders")
      .select(`
        *,
        company:b2b_companies(id, company_name, email, phone, mol, address, city, tier, discount_percent),
        items:b2b_order_items(*)
      `)
      .eq("id", id);

    // If B2B client, ensure they can only see their own orders
    if (!isAdmin && session.user?.id) {
      query = query.eq("company_id", session.user.id);
    }

    const { data: order, error } = await query.single();

    if (error || !order) {
      return NextResponse.json(
        { error: "Заявката не е намерена" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Възникна грешка" },
      { status: 500 }
    );
  }
}

// PATCH - Update B2B order status (admin only)
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

      // Add timestamps based on status
      switch (body.status) {
        case "confirmed":
          updateData.confirmed_at = new Date().toISOString();
          updateData.confirmed_by = session.user.id;
          break;
        case "processing":
          updateData.processing_at = new Date().toISOString();
          break;
        case "shipped":
          updateData.shipped_at = new Date().toISOString();
          break;
        case "delivered":
          updateData.delivered_at = new Date().toISOString();
          break;
        case "cancelled":
          updateData.cancelled_at = new Date().toISOString();
          updateData.cancelled_by = session.user.id;
          break;
      }
    }

    // Handle admin notes
    if (body.admin_notes !== undefined) {
      updateData.admin_notes = body.admin_notes;
    }

    // Handle tracking number
    if (body.tracking_number !== undefined) {
      updateData.tracking_number = body.tracking_number;
    }

    const { data: order, error } = await supabaseAdmin
      .from("b2b_orders")
      .update(updateData)
      .eq("id", id)
      .select(`
        *,
        company:b2b_companies(id, company_name, email, phone),
        items:b2b_order_items(*)
      `)
      .single();

    if (error) {
      console.error("Error updating B2B order:", error);
      return NextResponse.json(
        { error: "Грешка при обновяване на заявката" },
        { status: 500 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Възникна грешка" },
      { status: 500 }
    );
  }
}

// DELETE - Delete B2B order (admin only)
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

    // First delete order items
    await supabaseAdmin.from("b2b_order_items").delete().eq("order_id", id);

    // Then delete the order
    const { error } = await supabaseAdmin
      .from("b2b_orders")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting B2B order:", error);
      return NextResponse.json(
        { error: "Грешка при изтриване на заявката" },
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
