import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET - Protected endpoint to fetch all stock with product info
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
    const lowStock = searchParams.get("lowStock");

    // Get all products with their stock info
    const { data: products, error: productsError } = await supabaseAdmin
      .from("Product")
      .select("id, name, category, image, priceUnit")
      .order("name");

    if (productsError) {
      throw productsError;
    }

    // Get all stock records
    const { data: stockRecords, error: stockError } = await supabaseAdmin
      .from("Stock")
      .select("*");

    if (stockError) {
      throw stockError;
    }

    // Merge products with stock info
    const stockMap = new Map(stockRecords?.map(s => [s.productId, s]) || []);

    let result = products?.map(product => ({
      ...product,
      stock: stockMap.get(product.id) || {
        productId: product.id,
        quantity: 0,
        minQuantity: 10,
        location: "Основен склад",
      }
    })) || [];

    // Filter low stock if requested
    if (lowStock === "true") {
      result = result.filter(item => item.stock.quantity <= item.stock.minQuantity);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching stock:", error);
    return NextResponse.json(
      { error: "Грешка при зареждане на склада" },
      { status: 500 }
    );
  }
}

// POST - Protected endpoint to update stock (add/remove/writeoff)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Неоторизиран достъп" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { productId, type, quantity, reason, notes, documentNumber, unitPrice } = body;

    if (!productId || !type || quantity === undefined) {
      return NextResponse.json(
        { error: "Липсват задължителни полета" },
        { status: 400 }
      );
    }

    // Get current stock
    const { data: currentStock } = await supabaseAdmin
      .from("Stock")
      .select("quantity")
      .eq("productId", productId)
      .single();

    const previousQuantity = currentStock?.quantity || 0;
    let newQuantity = previousQuantity;

    // Calculate new quantity based on type
    switch (type) {
      case "incoming":
        newQuantity = previousQuantity + quantity;
        break;
      case "outgoing":
      case "writeoff":
        newQuantity = Math.max(0, previousQuantity - quantity);
        break;
      case "adjustment":
        newQuantity = quantity; // Direct set
        break;
    }

    // Update or create stock record
    const { error: stockError } = await supabaseAdmin
      .from("Stock")
      .upsert({
        id: `stock_${productId}`,
        productId,
        quantity: newQuantity,
        minQuantity: body.minQuantity || 10,
        location: body.location || "Основен склад",
        updatedAt: new Date().toISOString(),
      });

    if (stockError) {
      throw stockError;
    }

    // Create log entry
    const logId = `log${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
    const totalPrice = unitPrice ? unitPrice * quantity : null;

    const { error: logError } = await supabaseAdmin
      .from("StockLog")
      .insert({
        id: logId,
        productId,
        type,
        quantity: type === "adjustment" ? newQuantity - previousQuantity : quantity,
        previousQuantity,
        newQuantity,
        reason,
        notes,
        documentNumber,
        unitPrice,
        totalPrice,
        createdAt: new Date().toISOString(),
        createdBy: session.user.email,
      });

    if (logError) {
      throw logError;
    }

    return NextResponse.json({
      success: true,
      previousQuantity,
      newQuantity,
    });
  } catch (error) {
    console.error("Error updating stock:", error);
    return NextResponse.json(
      { error: "Грешка при обновяване на склада" },
      { status: 500 }
    );
  }
}
