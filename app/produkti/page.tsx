import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
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
      {/* Hero Section - like Za-nas page */}
      <section className="relative min-h-[70vh] flex items-center">
        {/* Full Screen Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/flowers/pexels-rovenimagescom-949582.jpg"
            alt="Колекция Природа"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/25" />
        </div>

        <Container className="relative z-10 py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-[var(--color-secondary)] text-sm font-medium tracking-wider uppercase mb-4">
              Премиум Селекция
            </span>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold !text-white mb-6 leading-tight drop-shadow-lg">
              Колекция Природа
            </h1>

            <p className="!text-white text-lg md:text-xl leading-relaxed mb-8 drop-shadow-md">
              Разгледайте нашия каталог с премиум растения, селектирани от най-добрите ферми в света.
              Директен внос от Колумбия, Еквадор и Холандия.
            </p>
          </div>
        </Container>
      </section>

      {/* Visual Categories Navigation */}
      <Section className="py-12 md:py-16 bg-white">
        <Container>
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-10">
            <span className="text-[var(--color-secondary)] font-semibold tracking-wider uppercase text-sm mb-2 block">
              Разгледайте по категория
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)]">
              Нашите Категории
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {PRODUCT_CATEGORIES.map((category, index) => (
              <Link
                key={index}
                href={`/produkti/${category.slug}`}
                className="group relative h-48 md:h-56 lg:h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/90 transition-colors duration-500" />

                <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end z-10">
                  <h3 className="font-serif text-lg md:text-xl lg:text-2xl font-bold !text-white mb-1 group-hover:-translate-y-1 transition-transform duration-300 drop-shadow-lg">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-[var(--color-secondary)] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    Разгледай колекцията <ArrowRight className="w-4 h-4" />
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