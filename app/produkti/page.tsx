import { Metadata } from "next";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { PageHero } from "@/components/sections/PageHero";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Продукти",
  description: "Богат избор от саксийни растения, рязан цвят, сезонни цветя, храсти и дървета.",
  keywords: ["саксийни растения", "рязан цвят", "сезонни цветя", "храсти", "дървета"],
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Нашите Продукти"
        description="Разнообразие от висококачествени растения и цветя първо качество от Колумбия, Кения, Гърция, Нидерландия, Турция и България"
      />

      {/* Категории */}
      <Section className="bg-[var(--color-light)] py-12">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Категории Продукти</h2>
            <p className="text-[var(--color-gray-600)]">
              Разгледайте нашите основни категории
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCT_CATEGORIES.map((category, index) => (
              <Link
                key={index}
                href={`/produkti/${category.slug}`}
                className="block group"
              >
                <Card hover className="h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-[var(--color-gray-600)]">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Продуктова Галерия */}
      <ProductGallery />
    </>
  );
}
