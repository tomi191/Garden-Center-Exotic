import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET - Protected endpoint to fetch stock log with product info
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Неоторизиран достъп" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const type = searchParams.get("type");
    const limit = parseInt(searchParams.get("limit") || "50");

    let query = supabaseAdmin
      .from("StockLog")
      .select("*")
      .order("createdAt", { ascending: false })
      .limit(limit);

    if (productId) {
      query = query.eq("productId", productId);
    }

    if (type && type !== "all") {
      query = query.eq("type", type);
    }

    const { data: logs, error } = await query;

    if (error) {
      throw error;
    }

    // Get product names for the logs
    const productIds = [...new Set(logs?.map(l => l.productId) || [])];

    const { data: products } = await supabaseAdmin
      .from("Product")
      .select("id, name")
      .in("id", productIds);

    const productMap = new Map(products?.map(p => [p.id, p.name]) || []);

    const logsWithProducts = logs?.map(log => ({
      ...log,
      productName: productMap.get(log.productId) || "Неизвестен продукт",
    })) || [];

    return NextResponse.json(logsWithProducts);
  } catch (error) {
    console.error("Error fetching stock log:", error);
    return NextResponse.json(
      { error: "Грешка при зареждане на историята" },
      { status: 500 }
    );
  }
}
