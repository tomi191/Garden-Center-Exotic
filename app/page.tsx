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
