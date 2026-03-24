import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// PATCH - Bulk update B2B prices (admin only)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { updates } = body;

    if (!Array.isArray(updates) || updates.length === 0) {
      return NextResponse.json(
        { error: "Няма промени за запазване" },
        { status: 400 }
      );
    }

    // Validate updates
    const validCategories = ["saksiya", "ryazan-tsvyat", "kashpi", "pochva", null];

    for (const update of updates) {
      if (!update.id) {
        return NextResponse.json(
          { error: "Липсва ID на продукт" },
          { status: 400 }
        );
      }

      if (update.b2b_price !== null && (isNaN(update.b2b_price) || update.b2b_price < 0)) {
        return NextResponse.json(
          { error: "Невалидна B2B цена" },
          { status: 400 }
        );
      }

      if (update.b2b_category !== null && !validCategories.includes(update.b2b_category)) {
        return NextResponse.json(
          { error: "Невалидна B2B категория" },
          { status: 400 }
        );
      }
    }

    // Process updates one by one (Supabase doesn't support bulk upsert with different values easily)
    const results = [];
    const errors = [];

    for (const update of updates) {
      const { data, error } = await supabaseAdmin
        .from("Product")
        .update({
          b2b_price: update.b2b_price,
          b2b_category: update.b2b_category,
          updatedAt: new Date().toISOString(),
        })
        .eq("id", update.id)
        .select("id, name")
        .single();

      if (error) {
        errors.push({ id: update.id, error: error.message });
      } else {
        results.push(data);
      }
    }

    if (errors.length > 0) {
      console.error("Errors updating B2B prices:", errors);
    }

    return NextResponse.json({
      success: true,
      updated: results.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Error updating B2B prices:", error);
    return NextResponse.json(
      { error: "Грешка при обновяване на цените" },
      { status: 500 }
    );
  }
}

// GET - Get all products with B2B prices (for price list)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("b2b_category");
    const onlyWithPrices = searchParams.get("onlyWithPrices") === "true";

    let query = supabaseAdmin
      .from("Product")
      .select("id, name, image, price, priceUnit, category, b2b_price, b2b_category, inStock")
      .order("category", { ascending: true })
      .order("name", { ascending: true });

    if (category && category !== "all") {
      query = query.eq("b2b_category", category);
    }

    if (onlyWithPrices) {
      query = query.not("b2b_price", "is", null);
    }

    const { data: products, error } = await query;

    if (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { error: "Грешка при зареждане на продуктите" },
        { status: 500 }
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Възникна грешка" },
      { status: 500 }
    );
  }
}
