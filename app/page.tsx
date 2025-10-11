import { Hero } from "@/components/sections/Hero";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { SeasonalOffers } from "@/components/sections/SeasonalOffers";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { LatestBlogPosts } from "@/components/sections/LatestBlogPosts";
import { InstagramFeed } from "@/components/sections/InstagramFeed";
import { Testimonials } from "@/components/sections/Testimonials";
import { B2BCTA } from "@/components/sections/B2BCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustSignals />
      <SeasonalOffers />
      <FeaturedProducts />
      <LatestBlogPosts />
      <Testimonials />
      <InstagramFeed />
      <B2BCTA />
    </>
  );
}
