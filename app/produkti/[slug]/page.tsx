import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Leaf, AlertCircle, Phone, ArrowRight, ShoppingBag } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";
import { getProductsByCategory, getProductCountByCategory } from "@/lib/products";
import { products as staticProducts } from "@/data/products";
import { CategoryProductGallery } from "@/components/sections/CategoryProductGallery";

// Дефиниция на категориите с богати данни за визуализация
const CATEGORY_DATA: Record<string, {
  title: string;
  subtitle?: string;
  description: string;
  heroImage: string;
  cardImage: string;
  seoKeywords: string[];
  icon: string;
}> = {
  "ryazan-tsvyat": {
    title: "Рязани Цветя",
    subtitle: "Директен внос",
    description: "Ексклузивна селекция от свежи рози, лалета и екзотични цветове, директен внос от най-добрите плантации в Колумбия, Еквадор и Холандия.",
    heroImage: "/images/categories/ryazani-cvetya-hero.png",
    cardImage: "https://images.unsplash.com/photo-1596043286045-8f553229b433?auto=format&fit=crop&q=80&w=800",
    seoKeywords: ["рязан цвят", "рози на едро", "лалета", "букети", "внос цветя"],
    icon: "🌹",
  },
  "saksiyni-rasteniya": {
    title: "Саксийни Растения",
    subtitle: "Стайни & Външни",
    description: "Внесете живот в интериора с нашите зелени и цъфтящи саксийни растения. От класически орхидеи до модерни големи палми.",
    heroImage: "/images/categories/saksiyni-rasteniya-hero.png",
    cardImage: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800",
    seoKeywords: ["саксийни цветя", "орхидеи", "стайни растения", "палми", "озеленяване"],
    icon: "🪴",
  },
  "hrasti-darveta": {
    title: "Храсти и Дървета",
    subtitle: "За Градината",
    description: "Мащабни решения за вашата градина. Декоративни храсти, туи и дървета, подходящи за климата в България.",
    heroImage: "/images/categories/hrasti-darveta-hero.png",
    cardImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800",
    seoKeywords: ["градински храсти", "туи", "дървета за градина", "озеленяване двор"],
    icon: "🌳",
  },
  "gradinski": {
    title: "Градински Растения",
    subtitle: "Сезонни & Многогодишни",
    description: "Храсти, дървета и сезонни разсади за вашата градина. Декоративни и плодни видове, подходящи за българския климат.",
    heroImage: "/images/categories/gradinski-hero.png",
    cardImage: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&q=80&w=800",
    seoKeywords: ["градински растения", "храсти", "дървета", "разсади", "озеленяване"],
    icon: "🌿",
  },
  "aksessoari": {
    title: "Аксесоари",
    subtitle: "Грижа за Растенията",
    description: "Всичко необходимо за грижа за вашите растения - почви, торове, саксии и градински инструменти.",
    heroImage: "/images/categories/aksessoari-hero.png",
    cardImage: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800",
    seoKeywords: ["градински аксесоари", "почви", "торове", "саксии", "инструменти"],
    icon: "🧰",
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
      {/* Hero Section - consistent with other pages */}
      <section className="relative min-h-[60vh] flex items-center">
        {/* Full Screen Background Image */}
        <div className="absolute inset-0">
          <Image
            src={categoryInfo.heroImage}
            alt={categoryInfo.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/25" />
        </div>

        <Container className="relative z-10 py-16">
          <div className="max-w-2xl">
            {categoryInfo.subtitle && (
              <span className="inline-block text-[var(--color-secondary)] text-sm font-medium tracking-wider uppercase mb-4">
                {categoryInfo.subtitle}
              </span>
            )}

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold !text-white mb-6 leading-tight drop-shadow-lg">
              {categoryInfo.title}
            </h1>

            <p className="!text-white text-lg md:text-xl leading-relaxed mb-8 drop-shadow-md">
              {categoryInfo.description}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                <Leaf className="w-4 h-4" />
                {categoryProducts.length} артикула
              </div>
              <Link href="#products">
                <Button className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white rounded-full px-6">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Разгледай продуктите
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

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
        <div id="products" className="bg-[var(--color-background)] min-h-[60vh]">
          <CategoryProductGallery products={categoryProducts} categoryName={categoryInfo.title} />
        </div>
      ) : (
        <Section className="py-16 md:py-20 bg-[var(--color-background)]">
          <Container>
            <div className="max-w-md mx-auto text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-white rounded-2xl shadow-md flex items-center justify-center">
                <span className="text-3xl md:text-4xl">{categoryInfo.icon}</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)] mb-2">
                Очаквайте скоро
              </h2>
              <p className="text-xs md:text-sm text-[var(--color-gray-500)] mb-5 leading-relaxed">
                В момента обновяваме каталога за категория <strong>{categoryInfo.title}</strong>.
                Свържете се с нас за персонална оферта или проверете отново скоро.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/kontakti">
                  <Button size="sm" className="rounded-full">
                    Направете запитване
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <a href="tel:0895670370">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Phone className="w-4 h-4 mr-2" />
                    089 567 0370
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Related Categories */}
      <Section className="py-8 md:py-10 bg-white">
        <Container>
          <div className="text-center mb-6 md:mb-8">
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)] mb-2">
              Разгледайте и други категории
            </h2>
            <p className="text-xs md:text-sm text-[var(--color-gray-500)]">
              Открийте още растения от нашата колекция
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {Object.entries(CATEGORY_DATA)
              .filter(([key]) => key !== slug)
              .map(([key, data]) => (
                <Link
                  key={key}
                  href={`/produkti/${key}`}
                  className="group relative h-36 md:h-44 rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${data.cardImage})` }}
                  />
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-colors duration-300" />

                  <div className="absolute inset-0 p-4 md:p-5 flex flex-col justify-end z-10">
                    <h3 className="font-serif text-base md:text-lg font-bold !text-white mb-0.5 group-hover:-translate-y-0.5 transition-transform drop-shadow-lg">
                      {data.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-semibold !text-white opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      Разгледай <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <CTASection
        icon={Phone}
        title="Нуждаете се от специална поръчка?"
        description="Внасяме директно от водещи плантации в Еквадор и Холандия. Свържете се за персонална оферта."
        buttons={[
          { label: "Свържете се с нас", href: "/kontakti", variant: "primary" },
          { label: "089 567 0370", href: "tel:0895670370", variant: "outline" },
        ]}
      />
    </>
  );
}
