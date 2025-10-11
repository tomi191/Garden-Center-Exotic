import { Hero } from "@/components/sections/Hero";
import { TrustSignals } from "@/components/sections/TrustSignals";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Testimonials } from "@/components/sections/Testimonials";
import { B2BCTA } from "@/components/sections/B2BCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustSignals />
      <FeaturedProducts />
      <Testimonials />
      <B2BCTA />
    </>
  );
}
