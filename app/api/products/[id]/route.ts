import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

// GET - Public endpoint to fetch a single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: product, error } = await supabaseAdmin
      .from("Product")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !product) {
      return NextResponse.json(
        { error: "Продуктът не е намерен" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Грешка при зареждане на продукта" },
      { status: 500 }
    );
  }
}

// PUT - Protected endpoint to update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Неоторизиран достъп" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    // Check if product exists
    const { data: existingProduct } = await supabaseAdmin
      .from("Product")
      .select("id")
      .eq("id", id)
      .single();

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Продуктът не е намерен" },
        { status: 404 }
      );
    }

    const { data: product, error } = await supabaseAdmin
      .from("Product")
      .update({
        name: body.name,
        category: body.category,
        subcategory: body.subcategory || null,
        origin: body.origin,
        price: body.price,
        priceUnit: body.priceUnit,
        description: body.description,
        image: body.image,
        inStock: body.inStock,
        featured: body.featured,
        characteristics: body.characteristics || [],
        updatedAt: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating product:", error);
      return NextResponse.json(
        { error: "Грешка при обновяване на продукта" },
        { status: 500 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Грешка при обновяване на продукта" },
      { status: 500 }
    );
  }
}

// DELETE - Protected endpoint to delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Неоторизиран достъп" },
        { status: 401 }
      );
    }

    const { id } = await params;

    // Check if product exists
    const { data: existingProduct } = await supabaseAdmin
      .from("Product")
      .select("id")
      .eq("id", id)
      .single();

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Продуктът не е намерен" },
        { status: 404 }
      );
    }

    const { error } = await supabaseAdmin
      .from("Product")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting product:", error);
      return NextResponse.json(
        { error: "Грешка при изтриване на продукта" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Грешка при изтриване на продукта" },
      { status: 500 }
    );
  }
}

// PATCH - Protected endpoint for quick updates (e.g., toggle inStock)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Неоторизиран достъп" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const { data: product, error } = await supabaseAdmin
      .from("Product")
      .update({
        ...body,
        updatedAt: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error patching product:", error);
      return NextResponse.json(
        { error: "Грешка при обновяване на продукта" },
        { status: 500 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error patching product:", error);
    return NextResponse.json(
      { error: "Грешка при обновяване на продукта" },
      { status: 500 }
    );
  }
}
