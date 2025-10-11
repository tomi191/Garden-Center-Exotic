import { Metadata } from "next";
import Link from "next/link";
import { Leaf } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { PageHero } from "@/components/sections/PageHero";
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

      <Section className="bg-white py-16">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            {PRODUCT_CATEGORIES.map((category, index) => (
              <Link
                key={index}
                href={`/produkti/${category.slug}`}
                className="block group"
              >
                <Card hover className="h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mb-4 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                      <Leaf className="w-8 h-8 text-[var(--color-primary)]" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-[var(--color-gray-700)] mb-4">
                      {category.description}
                    </p>
                    {category.subcategories && (
                      <div className="space-y-2">
                        {category.subcategories.map((sub, i) => (
                          <div
                            key={i}
                            className="text-sm text-[var(--color-primary)] font-medium"
                          >
                            → {sub.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
