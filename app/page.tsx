import { Hero } from "@/components/sections/Hero";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { ServiceShowcase } from "@/components/sections/ServiceShowcase";
import { LatestBlogPosts } from "@/components/sections/LatestBlogPosts";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { Testimonials } from "@/components/sections/Testimonials";
import { B2BCTA } from "@/components/sections/B2BCTA";
import { FreshArrivalsPreview } from "@/components/sections/FreshArrivalsPreview";
import { getFeaturedProducts } from "@/lib/products";
import { products as staticProducts } from "@/data/products";
import { SITE_CONFIG, LOCATIONS } from "@/lib/constants";
import { supabaseAdmin } from "@/lib/supabase";

// JSON-LD Structured Data for LocalBusiness
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["FlowerShop", "GardenStore"],
  "@id": `${SITE_CONFIG.url}/#business`,
  name: SITE_CONFIG.nameBg,
  alternateName: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  url: SITE_CONFIG.url,
  telephone: LOCATIONS.varna.phone,
  email: LOCATIONS.varna.email,
  foundingDate: "1998",
  priceRange: "$$",
  image: `${SITE_CONFIG.url}/images/logos/exotic-logo.jpg`,
  logo: `${SITE_CONFIG.url}/images/logos/exotic-logo.jpg`,
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: LOCATIONS.varna.address,
      addressLocality: LOCATIONS.varna.city,
      postalCode: LOCATIONS.varna.postalCode,
      addressCountry: "BG",
    },
    {
      "@type": "PostalAddress",
      streetAddress: LOCATIONS.novaZagora.address,
      addressLocality: LOCATIONS.novaZagora.city,
      addressCountry: "BG",
    },
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: LOCATIONS.varna.coordinates.lat,
    longitude: LOCATIONS.varna.coordinates.lng,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: SITE_CONFIG.rating,
    reviewCount: SITE_CONFIG.reviewCount,
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=100028020589420",
    "https://www.instagram.com/gardencentarexotic",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Продукти и услуги",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Отрязани цветя",
        description: "Премиум рози, орхидеи и екзотични цветя от Еквадор и Холандия",
      },
      {
        "@type": "OfferCatalog",
        name: "Саксийни растения",
        description: "Стайни и градински растения",
      },
      {
        "@type": "OfferCatalog",
        name: "Озеленяване",
        description: "Професионално озеленяване на офиси, хотели и градини",
      },
    ],
  },
};

export default async function HomePage() {
  // Fetch featured products from database, fallback to static
  let featuredProducts;
  try {
    const dbProducts = await getFeaturedProducts();
    if (dbProducts.length > 0) {
      featuredProducts = dbProducts;
    } else {
      featuredProducts = staticProducts.filter(p => p.featured).slice(0, 8);
    }
  } catch {
    featuredProducts = staticProducts.filter(p => p.featured).slice(0, 8);
  }

  // Fetch latest blog posts for SSR
  let blogPosts: { id: string; title: string; slug: string; excerpt: string; category: string; image: string; reading_time: number; published_at: string | null; created_at: string }[] = [];
  try {
    const { data } = await supabaseAdmin
      .from("blog_posts")
      .select("id, title, slug, excerpt, category, image, reading_time, published_at, created_at")
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(3);
    if (data) blogPosts = data;
  } catch {}

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <TrustSignals />
      <FreshArrivalsPreview />
      <FeaturedProducts products={featuredProducts} />
      <ServiceShowcase />
      <LatestBlogPosts initialPosts={blogPosts} />
      <Testimonials />
      <InstagramFeed />
      <B2BCTA />
    </>
  );
}
