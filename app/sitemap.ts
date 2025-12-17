import { MetadataRoute } from "next";
import { SITE_CONFIG, PRODUCT_CATEGORIES } from "@/lib/constants";
import { getAllProductsForSitemap } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  const currentDate = new Date().toISOString();

  // Static pages with proper priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/produkti`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/uslugi`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kontakti`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lokacii`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/za-nas`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/grizhi`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // Category pages - important for SEO
  const categoryPages: MetadataRoute.Sitemap = PRODUCT_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/produkti/${cat.slug}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Product pages - fetch dynamically from database with new URL structure
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProductsForSitemap();
    productPages = products.map((product) => ({
      url: `${baseUrl}/produkti/${product.category}/${product.slug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  return [...staticPages, ...categoryPages, ...productPages];
}
