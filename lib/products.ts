import { supabaseAdmin } from "./supabase";

// Fetch products for PUBLIC catalog (only in-stock by default)
export async function getProducts(filters?: {
  category?: string;
  origin?: string;
  inStock?: boolean;
  featured?: boolean;
  includeOutOfStock?: boolean; // For admin use only
}) {
  let query = supabaseAdmin.from("Product").select("*");

  if (filters?.category) {
    query = query.eq("category", filters.category);
  }
  if (filters?.origin) {
    query = query.eq("origin", filters.origin);
  }

  // By default, only show in-stock products (for public catalog)
  // Use includeOutOfStock: true for admin panel
  if (!filters?.includeOutOfStock) {
    if (filters?.inStock !== undefined) {
      query = query.eq("inStock", filters.inStock);
    } else {
      query = query.eq("inStock", true);
    }
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

// Fetch products by category (only in-stock for public catalog)
export async function getProductsByCategory(category: string, includeOutOfStock = false) {
  let query = supabaseAdmin
    .from("Product")
    .select("*")
    .eq("category", category);

  // Only show in-stock products for public catalog
  if (!includeOutOfStock) {
    query = query.eq("inStock", true);
  }

  const { data, error } = await query.order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }

  return data || [];
}

// Get product count by category (only counts in-stock products)
export async function getProductCountByCategory() {
  const { data, error } = await supabaseAdmin
    .from("Product")
    .select("category, inStock")
    .eq("inStock", true);

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

// Get all product slugs for static generation
export async function getAllProductSlugs() {
  const { data, error } = await supabaseAdmin
    .from("Product")
    .select("slug");

  if (error) {
    console.error("Error fetching product slugs:", error);
    return [];
  }

  return (data || []).map((p) => p.slug).filter(Boolean);
}

// Get all products with slug and category for sitemap generation (only in-stock)
export async function getAllProductsForSitemap() {
  const { data, error } = await supabaseAdmin
    .from("Product")
    .select("slug, category, inStock")
    .eq("inStock", true);

  if (error) {
    console.error("Error fetching products for sitemap:", error);
    return [];
  }

  return (data || []).filter((p) => p.slug && p.category);
}

// Get all products
export async function getAllProducts() {
  const { data, error } = await supabaseAdmin
    .from("Product")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching all products:", error);
    return [];
  }

  return data || [];
}

// Get related products (same category, excluding current)
export async function getRelatedProducts(category: string, excludeSlug: string, limit = 4) {
  const { data, error } = await supabaseAdmin
    .from("Product")
    .select("*")
    .eq("category", category)
    .neq("slug", excludeSlug)
    .eq("inStock", true)
    .limit(limit);

  if (error) {
    console.error("Error fetching related products:", error);
    return [];
  }

  return data || [];
}
