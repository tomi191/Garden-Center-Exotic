import { Hero } from "@/components/sections/Hero";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { ServiceShowcase } from "@/components/sections/ServiceShowcase";
import { LatestBlogPosts } from "@/components/sections/LatestBlogPosts";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { Testimonials } from "@/components/sections/Testimonials";
import { B2BCTA } from "@/components/sections/B2BCTA";
import { getFeaturedProducts } from "@/lib/products";
import { products as staticProducts } from "@/data/products";
import { SITE_CONFIG, LOCATIONS } from "@/lib/constants";

// JSON-LD Structured Data for LocalBusiness
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": SITE_CONFIG.url,
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
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "16:00",
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
        name: "Рязани цветя",
        description: "Премиум рози, орхидеи и екзотични цветя от Еквадор и Холандия",
      },
      {
        "@type": "OfferCatalog",
        name: "Саксийни растения",
        description: "Стайни и градински растения",
      },
      {
        "@type": "OfferCatalog",
        name: "Сватбена декорация",
        description: "Професионална флорална декорация за сватби и събития",
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

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <TrustSignals />
      <FeaturedProducts products={featuredProducts} />
      <ServiceShowcase />
      <LatestBlogPosts />
      <Testimonials />
      <InstagramFeed />
      <B2BCTA />
    </>
  );
}
