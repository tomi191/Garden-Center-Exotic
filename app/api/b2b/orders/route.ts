import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { b2bAuthOptions } from "@/lib/b2b-auth";
import { supabaseAdmin } from "@/lib/supabase";
import { resend, FROM_EMAIL, ADMIN_EMAIL, getOrderConfirmationEmail } from "@/lib/resend";

// GET - List B2B orders
// For admin: all orders
// For B2B client: only their orders
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let query = supabaseAdmin
      .from("b2b_orders")
      .select(`
        *,
        company:b2b_companies(id, company_name, email, phone, tier),
        items:b2b_order_items(*)
      `)
      .order("created_at", { ascending: false });

    // Filter by company if B2B client
    if (!isAdmin && session.user?.id) {
      query = query.eq("company_id", session.user.id);
    }

    // Filter by status if provided
    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    const { data: orders, error } = await query;

    if (error) {
      console.error("Error fetching B2B orders:", error);
      return NextResponse.json(
        { error: "Грешка при зареждане на заявките" },
        { status: 500 }
      );
    }

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Възникна грешка" },
      { status: 500 }
    );
  }
}

// POST - Create new B2B order (B2B clients only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(b2bAuthOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { items, notes } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Заявката трябва да съдържа поне един продукт" },
        { status: 400 }
      );
    }

    // Get company details for discount
    const { data: company, error: companyError } = await supabaseAdmin
      .from("b2b_companies")
      .select("id, company_name, discount_percent, tier")
      .eq("id", session.user.id)
      .single();

    if (companyError || !company) {
      return NextResponse.json(
        { error: "Компанията не е намерена" },
        { status: 404 }
      );
    }

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: { unit_price: number; quantity: number }) =>
        sum + item.unit_price * item.quantity,
      0
    );
    const discountAmount = subtotal * (company.discount_percent / 100);
    const totalAmount = subtotal - discountAmount;

    // Generate order number
    const orderNumber = `B2B-${Date.now().toString(36).toUpperCase()}`;

    // Create order
    const { data: order, error: orderError } = await supabaseAdmin
      .from("b2b_orders")
      .insert({
        company_id: company.id,
        order_number: orderNumber,
        status: "pending",
        subtotal,
        discount_percent: company.discount_percent,
        discount_amount: discountAmount,
        total_amount: totalAmount,
        notes: notes || null,
      })
      .select()
      .single();

    if (orderError) {
      console.error("Error creating order:", orderError);
      return NextResponse.json(
        { error: "Грешка при създаване на заявката" },
        { status: 500 }
      );
    }

    // Create order items
    const orderItems = items.map((item: {
      product_id: string;
      product_name: string;
      quantity: number;
      unit_price: number;
      product_image?: string;
      price_unit?: string;
    }) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product_name,
      quantity: item.quantity,
      unit_price: item.unit_price,
      total_price: item.unit_price * item.quantity,
      product_image: item.product_image || null,
      price_unit: item.price_unit || "лв",
    }));

    const { error: itemsError } = await supabaseAdmin
      .from("b2b_order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("Error creating order items:", itemsError);
      // Rollback order
      await supabaseAdmin.from("b2b_orders").delete().eq("id", order.id);
      return NextResponse.json(
        { error: "Грешка при създаване на заявката" },
        { status: 500 }
      );
    }

    // Send order confirmation emails
    try {
      // Get company email
      const { data: companyData } = await supabaseAdmin
        .from("b2b_companies")
        .select("email")
        .eq("id", company.id)
        .single();

      if (companyData?.email) {
        const emailContent = getOrderConfirmationEmail(
          company.company_name,
          orderNumber,
          orderItems.map((item: { product_name: string; quantity: number; total_price: number }) => ({
            product_name: item.product_name,
            quantity: item.quantity,
            total_price: item.total_price,
          })),
          totalAmount,
          company.discount_percent
        );

        // Send to company
        await resend.emails.send({
          from: FROM_EMAIL,
          to: companyData.email,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        // Send copy to admin
        await resend.emails.send({
          from: FROM_EMAIL,
          to: ADMIN_EMAIL,
          subject: `[Копие] ${emailContent.subject}`,
          html: emailContent.html,
        });
      }
    } catch (emailError) {
      console.error("Error sending order emails:", emailError);
      // Don't fail order creation if email fails
    }

    return NextResponse.json({
      ...order,
      items: orderItems,
    }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Възникна грешка" },
      { status: 500 }
    );
  }
}
