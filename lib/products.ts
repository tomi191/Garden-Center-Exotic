import { supabaseAdmin } from "./supabase";

// Fetch all products with optional filters
export async function getProducts(filters?: {
  category?: string;
  origin?: string;
  inStock?: boolean;
  featured?: boolean;
}) {
  let query = supabaseAdmin.from("Product").select("*");

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }
  if (filters?.origin) {
    query = query.eq("origin", filters.origin);
  }
  if (filters?.inStock !== undefined) {
    query = query.eq("inStock", filters.inStock);
  }
  if (filters?.featured !== undefined) {
    query = query.eq("featured", filters.featured);
  }

  const { data, error } = await query.order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data || [];
}

// Fetch featured products
export async function getFeaturedProducts() {
  const { data, error } = await supabaseAdmin
    .from("Product")
    .select("*")
    .eq("featured", true)
    .eq("inStock", true)
    .order("createdAt", { ascending: false })
    .limit(8);

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return data || [];
}

// Fetch product by slug
export async function getProductBySlug(slug: string) {
  const { data, error } = await supabaseAdmin
    .from("Product")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }

  return data;
}

// Fetch products by category
export async function getProductsByCategory(category: string) {
  const { data, error } = await supabaseAdmin
    .from("Product")
    .select("*")
    .eq("category", category)
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }

  return data || [];
}

// Get product count by category
export async function getProductCountByCategory() {
  const { data, error } = await supabaseAdmin
    .from("Product")
    .select("category");

  if (error) {
    console.error("Error fetching product count:", error);
    return [];
  }

  // Group manually
  const categoryCount = (data || []).reduce((acc: Record<string, number>, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(categoryCount).map(([category, count]) => ({
    category,
    _count: { id: count },
  }));
}
