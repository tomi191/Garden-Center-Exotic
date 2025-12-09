import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";
import { z } from "zod";

// Validation schema for creating/updating products
const productSchema = z.object({
  name: z.string().min(1, "Името е задължително"),
  category: z.string().min(1, "Категорията е задължителна"),
  subcategory: z.string().optional().nullable(),
  origin: z.string().min(1, "Произходът е задължителен"),
  price: z.number().positive("Цената трябва да е положително число"),
  priceUnit: z.string().min(1, "Единицата е задължителна"),
  description: z.string().min(1, "Описанието е задължително"),
  image: z.string().min(1, "Изображението е задължително"),
  inStock: z.boolean().default(true),
  featured: z.boolean().default(false),
  characteristics: z.array(z.string()).default([]),
});

// Generate slug from Bulgarian name
function generateSlug(name: string): string {
  const cyrillicToLatin: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ж: "zh", з: "z",
    и: "i", й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p",
    р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch",
    ш: "sh", щ: "sht", ъ: "a", ь: "y", ю: "yu", я: "ya",
  };

  return name
    .toLowerCase()
    .split("")
    .map((char) => cyrillicToLatin[char] || char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// GET - Public endpoint to fetch all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const origin = searchParams.get("origin");
    const inStock = searchParams.get("inStock");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    let query = supabaseAdmin.from("Product").select("*");

    if (category && category !== "all") {
      query = query.eq("category", category);
    }
    if (origin && origin !== "all") {
      query = query.eq("origin", origin);
    }
    if (inStock !== null && inStock !== undefined) {
      query = query.eq("inStock", inStock === "true");
    }
    if (featured !== null && featured !== undefined) {
      query = query.eq("featured", featured === "true");
    }
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const { data: products, error } = await query.order("createdAt", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      return NextResponse.json(
        { error: "Грешка при зареждане на продуктите" },
        { status: 500 }
      );
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Грешка при зареждане на продуктите" },
      { status: 500 }
    );
  }
}

// POST - Protected endpoint to create a new product
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
    const validated = productSchema.parse(body);

    // Generate unique slug
    let slug = generateSlug(validated.name);

    // Check if slug exists
    const { data: existingProduct } = await supabaseAdmin
      .from("Product")
      .select("slug")
      .eq("slug", slug)
      .single();

    if (existingProduct) {
      slug = `${slug}-${Date.now()}`;
    }

    // Generate unique ID
    const id = `clp${Date.now()}${Math.random().toString(36).substr(2, 9)}`;

    const { data: product, error } = await supabaseAdmin
      .from("Product")
      .insert({
        id,
        ...validated,
        slug,
        subcategory: validated.subcategory || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating product:", error);
      return NextResponse.json(
        { error: "Грешка при създаване на продукта" },
        { status: 500 }
      );
    }

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Невалидни данни", details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Грешка при създаване на продукта" },
      { status: 500 }
    );
  }
}
