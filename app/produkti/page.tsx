import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { getProducts } from "@/lib/products";
import { products as staticProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Продукти | Екзотик",
  description: "Ексклузивна селекция от растения и цветя. Внос от Колумбия, Кения и Холандия.",
};

export default async function ProductsPage() {
  let products;
  try {
    const dbProducts = await getProducts();
    products = dbProducts.length > 0 ? dbProducts : staticProducts;
  } catch {
    products = staticProducts;
  }

  return (
    <>
      <PageHero
        title="Колекция Природа"
        description="Разгледайте нашия каталог с премиум растения, селектирани от най-добрите ферми в света."
      />

      {/* Visual Categories Navigation */}
      <Section className="py-12 bg-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCT_CATEGORIES.map((category, index) => (
              <Link
                key={index}
                href={`/produkti/${category.slug}`}
                className="group relative h-40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Background Image (Placeholder gradient if no image) */}
                <div className={`absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] opacity-10 group-hover:opacity-20 transition-opacity`} />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                  <h3 className="font-serif text-xl font-bold text-[var(--color-primary-dark)] mb-1 group-hover:-translate-y-1 transition-transform">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Разгледай <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Main Gallery */}
      <div className="bg-[var(--color-background)] min-h-screen">
         <ProductGallery initialProducts={products} />
      </div>
    </>
  );
}