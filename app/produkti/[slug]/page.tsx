import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Leaf, AlertCircle, Phone, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { getProductsByCategory, getProductCountByCategory } from "@/lib/products";
import { products as staticProducts } from "@/data/products";
import { CategoryProductGallery } from "@/components/sections/CategoryProductGallery";

// Дефиниция на категориите с богати данни за визуализация
const CATEGORY_DATA: Record<string, {
  title: string;
  description: string;
  image?: string;
  icon: string;
  seoKeywords: string[];
}> = {
  "ryazan-tsvyat": {
    title: "Рязан Цвят",
    description: "Ексклузивна селекция от свежи рози, лалета и екзотични цветове, директен внос от най-добрите плантации в Колумбия, Еквадор и Холандия.",
    icon: "🌹",
    seoKeywords: ["рязан цвят", "рози на едро", "лалета", "букети", "внос цветя"],
  },
  "saksiyni-rasteniya": {
    title: "Саксийни Растения",
    description: "Внесете живот в интериора с нашите зелени и цъфтящи саксийни растения. От класически орхидеи до модерни големи палми.",
    icon: "🪴",
    seoKeywords: ["саксийни цветя", "орхидеи", "стайни растения", "палми", "озеленяване"],
  },
  "sezonni-tsvetya": {
    title: "Сезонни Цветя",
    description: "Най-доброто от всеки сезон. Пролетни луковични, летни петунии или есенни хризантеми – винаги актуални и свежи.",
    icon: "🌷",
    seoKeywords: ["сезонни цветя", "разсад", "градински цветя", "пролетни цветя"],
  },
  "hrasti-darveta": {
    title: "Храсти и Дървета",
    description: "Мащабни решения за вашата градина. Декоративни храсти, туи и дървета, подходящи за климата в България.",
    icon: "🌳",
    seoKeywords: ["градински храсти", "туи", "дървета за градина", "озеленяване двор"],
  }
};

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Генериране на SEO метаданни
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORY_DATA[slug];

  if (!category) {
    return {
      title: "Категорията не е намерена",
    };
  }

  return {
    title: `${category.title} | Градински Център Екзотик`,
    description: category.description,
    keywords: category.seoKeywords,
  };
}

// Генериране на статични параметри за билда
export function generateStaticParams() {
  return Object.keys(CATEGORY_DATA).map((slug) => ({
    slug,
  }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categoryInfo = CATEGORY_DATA[slug];

  // Ако категорията не съществува в нашата "база", връщаме 404
  if (!categoryInfo) {
    notFound();
  }

  // Fetch products from database, fallback to static data
  let categoryProducts;
  try {
    const dbProducts = await getProductsByCategory(slug);
    if (dbProducts.length > 0) {
      categoryProducts = dbProducts;
    } else {
      // Fallback to static products if DB is empty
      categoryProducts = staticProducts.filter(p => p.category === slug);
    }
  } catch {
    // Fallback to static products on error
    categoryProducts = staticProducts.filter(p => p.category === slug);
  }

  // Get counts for all categories (for related categories section)
  let categoryCounts: Record<string, number> = {};
  try {
    const counts = await getProductCountByCategory();
    counts.forEach(c => {
      categoryCounts[c.category] = c._count.id;
    });
  } catch {
    // Calculate from static data as fallback
    staticProducts.forEach(p => {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    });
  }

  return (
    <>
      {/* Hero Section */}
      <PageHero
        title={categoryInfo.title}
        description={categoryInfo.description}
        variant="gradient"
        badge={
          <span className="inline-flex items-center gap-2">
            <Leaf className="w-4 h-4" />
            {categoryProducts.length} артикула
          </span>
        }
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-[var(--color-gray-100)]">
        <Container>
          <div className="py-4 flex items-center justify-between">
            <Link
              href="/produkti"
              className="inline-flex items-center text-sm font-medium text-[var(--color-gray-500)] hover:text-[var(--color-primary)] transition-colors group"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--color-gray-100)] flex items-center justify-center mr-2 group-hover:bg-[var(--color-primary-light)] transition-colors">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              Всички категории
            </Link>

            {/* Category Quick Nav */}
            <div className="hidden md:flex items-center gap-2">
              {Object.entries(CATEGORY_DATA)
                .filter(([key]) => key !== slug)
                .slice(0, 3)
                .map(([key, data]) => (
                  <Link
                    key={key}
                    href={`/produkti/${key}`}
                    className="px-3 py-1.5 text-sm font-medium text-[var(--color-gray-600)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] rounded-full transition-colors"
                  >
                    {data.title}
                  </Link>
                ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Products Section */}
      {categoryProducts.length > 0 ? (
        <div className="bg-[var(--color-background)] min-h-[60vh]">
          <CategoryProductGallery products={categoryProducts} categoryName={categoryInfo.title} />
        </div>
      ) : (
        <Section className="py-24 bg-[var(--color-background)]">
          <Container>
            <div className="max-w-lg mx-auto text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-[2rem] shadow-lg flex items-center justify-center">
                <span className="text-5xl">{categoryInfo.icon}</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[var(--color-primary-dark)] mb-4">
                Очаквайте скоро
              </h2>
              <p className="text-[var(--color-gray-600)] mb-8 leading-relaxed">
                В момента обновяваме каталога за категория <strong>{categoryInfo.title}</strong>.
                Свържете се с нас за персонална оферта или проверете отново скоро.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakti">
                  <Button size="lg" className="rounded-full">
                    Направете запитване
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <a href="tel:+35952600577">
                  <Button variant="outline" size="lg" className="rounded-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Обадете се
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Related Categories */}
      <Section className="py-16 bg-white border-t border-[var(--color-gray-100)]">
        <Container>
          <div className="text-center mb-10">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)] mb-2">
              Разгледайте и други категории
            </h2>
            <p className="text-[var(--color-gray-600)]">
              Открийте още растения от нашата колекция
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {Object.entries(CATEGORY_DATA)
              .filter(([key]) => key !== slug)
              .map(([key, data]) => (
                <Link
                  key={key}
                  href={`/produkti/${key}`}
                  className="group relative overflow-hidden rounded-[2rem] bg-[var(--color-light)] p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{data.icon}</span>
                    {categoryCounts[key] > 0 && (
                      <span className="px-3 py-1 text-xs font-bold bg-[var(--color-primary-light)] text-[var(--color-primary)] rounded-full">
                        {categoryCounts[key]} продукта
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[var(--color-primary-dark)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                    {data.title}
                  </h3>
                  <p className="text-sm text-[var(--color-gray-600)] line-clamp-2 mb-4">
                    {data.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-semibold text-[var(--color-secondary)] group-hover:gap-2 transition-all">
                    Разгледай <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <CTASection
        icon={Phone}
        title="Нуждаете се от специална поръчка?"
        description="Внасяме директно от водещи плантации в Колумбия, Еквадор и Холандия. Свържете се за персонална оферта."
        buttons={[
          { label: "Свържете се с нас", href: "/kontakti", variant: "primary" },
          { label: "Обадете се", href: "tel:+35952600577", variant: "outline" },
        ]}
      />
    </>
  );
}
