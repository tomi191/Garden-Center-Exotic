import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Phone, MapPin, Truck, Leaf, Heart, Calendar, Check, ShoppingBag } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getProductBySlug, getRelatedProducts, getAllProductSlugs } from "@/lib/products";
import { LOCATIONS, SITE_CONFIG } from "@/lib/constants";
import { ProductCard } from "@/components/ui/ProductCard";

// SEO данни за категориите
const CATEGORY_SEO: Record<string, {
  name: string;
  suitableFor: string[];
  careLevel: string;
  idealFor: string;
}> = {
  "ryazan-tsvyat": {
    name: "Рязан цвят",
    suitableFor: ["Букети", "Подаръци", "Сватби", "Събития", "Декорация"],
    careLevel: "Сменяйте водата на всеки 2 дни",
    idealFor: "Перфектен за букети и специални поводи",
  },
  "saksiyni-rasteniya": {
    name: "Саксийно растение",
    suitableFor: ["Дом", "Офис", "Подарък", "Интериор", "Озеленяване"],
    careLevel: "Умерено поливане, непряка светлина",
    idealFor: "Идеален за интериорно озеленяване",
  },
  "gradinski": {
    name: "Градинско растение",
    suitableFor: ["Градина", "Двор", "Тераса", "Озеленяване", "Ландшафт"],
    careLevel: "Редовно поливане, пълна светлина",
    idealFor: "Подходящ за градински пространства",
  },
  "hrasti-darveta": {
    name: "Храст/Дърво",
    suitableFor: ["Градина", "Парк", "Двор", "Жив плет", "Ландшафт"],
    careLevel: "Сезонна грижа, резитба",
    idealFor: "За по-големи градински проекти",
  },
  "aksessoari": {
    name: "Аксесоар",
    suitableFor: ["Грижа за растения", "Декорация", "Градинарство"],
    careLevel: "Следвайте инструкциите",
    idealFor: "За грижа за вашите растения",
  },
};

// Генериране на SEO описание
function generateSeoDescription(product: {
  name: string;
  description: string;
  origin: string;
  category: string;
}): string {
  const categoryInfo = CATEGORY_SEO[product.category];
  return `${product.name} - ${product.description} Внос от ${product.origin}. ${categoryInfo?.idealFor || ""}. Купете от Градински Център Екзотик - директен вносител от 1998г.`;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Генериране на метаданни за SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Продуктът не е намерен" };
  }

  const description = generateSeoDescription(product);
  const categoryInfo = CATEGORY_SEO[product.category];

  return {
    title: `${product.name} | ${categoryInfo?.name || "Продукт"} | Градински Център Екзотик`,
    description,
    keywords: [
      product.name,
      categoryInfo?.name || "",
      product.origin,
      "купи цветя",
      "растения Варна",
      ...(categoryInfo?.suitableFor || []),
    ],
    openGraph: {
      title: `${product.name} - ${SITE_CONFIG.nameBg}`,
      description,
      images: [product.image],
      type: "website",
    },
  };
}

// Генериране на статични пътища
export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categoryInfo = CATEGORY_SEO[product.category] || CATEGORY_SEO["ryazan-tsvyat"];
  const relatedProducts = await getRelatedProducts(product.category, slug, 4);
  const priceEur = (product.price / 1.9558).toFixed(2);

  // JSON-LD структурирани данни за SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${SITE_CONFIG.url}${product.image}`,
    brand: { "@type": "Brand", name: SITE_CONFIG.nameBg },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "BGN",
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: SITE_CONFIG.nameBg },
    },
  };

  return (
    <>
      {/* JSON-LD за Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-[var(--color-gray-100)] pt-24">
        <Container>
          <div className="py-4 flex items-center gap-2 text-sm">
            <Link href="/produkti" className="text-[var(--color-gray-500)] hover:text-[var(--color-primary)] transition-colors">
              Продукти
            </Link>
            <span className="text-[var(--color-gray-300)]">/</span>
            <Link href={`/produkti/${product.category}`} className="text-[var(--color-gray-500)] hover:text-[var(--color-primary)] transition-colors">
              {categoryInfo.name}
            </Link>
            <span className="text-[var(--color-gray-300)]">/</span>
            <span className="text-[var(--color-primary)] font-medium">{product.name}</span>
          </div>
        </Container>
      </div>

      {/* Основна секция */}
      <Section className="py-8 md:py-12 bg-[var(--color-background)]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Изображение */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-lg">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Произход badge */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm">
                <MapPin className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-sm font-bold text-[var(--color-primary)]">{product.origin}</span>
              </div>
              {!product.inStock && (
                <div className="absolute top-4 right-4 px-4 py-2 bg-[var(--color-secondary)] text-white text-sm font-bold rounded-full">
                  Изчерпан
                </div>
              )}
            </div>

            {/* Информация */}
            <div className="flex flex-col">
              <span className="text-[var(--color-secondary)] font-semibold tracking-wide uppercase text-sm mb-2">
                {categoryInfo.name}
              </span>

              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary-dark)] mb-4">
                {product.name}
              </h1>

              <p className="text-lg text-[var(--color-gray-600)] mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Цена */}
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <span className="text-sm text-[var(--color-gray-400)] font-medium uppercase tracking-wide">Цена</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-4xl font-bold text-[var(--color-primary)]">
                        {product.price.toFixed(2)}
                      </span>
                      <span className="text-lg text-[var(--color-gray-500)]">лв</span>
                    </div>
                    <span className="text-sm text-[var(--color-gray-400)]">
                      {priceEur} € / {product.priceUnit?.replace("лв/", "") || "бр"}
                    </span>
                  </div>
                  {product.inStock ? (
                    <span className="flex items-center gap-2 text-green-600 font-medium">
                      <Check className="w-5 h-5" />
                      В наличност
                    </span>
                  ) : (
                    <span className="text-[var(--color-secondary)] font-medium">Изчерпан</span>
                  )}
                </div>

                {/* CTA бутони */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={`tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`} className="flex-1">
                    <Button size="lg" className="w-full rounded-full">
                      <Phone className="w-5 h-5 mr-2" />
                      Обади се
                    </Button>
                  </a>
                  <Link href="/kontakti" className="flex-1">
                    <Button variant="outline" size="lg" className="w-full rounded-full">
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Направи запитване
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Подходящ за */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="font-serif text-xl font-bold text-[var(--color-primary-dark)] mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[var(--color-secondary)]" />
                  Подходящ за
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {categoryInfo.suitableFor.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] text-sm font-medium rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-[var(--color-gray-500)]">
                  <Leaf className="w-4 h-4 inline mr-1" />
                  {categoryInfo.careLevel}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Предимства */}
      <Section className="py-8 bg-white">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: "Бърза доставка", desc: "До 3 часа" },
              { icon: Leaf, title: "Свежест", desc: "Гарантирана" },
              { icon: Calendar, title: "От 1998 г.", desc: `${SITE_CONFIG.yearsInBusiness}+ години` },
              { icon: MapPin, title: "2 локации", desc: "Варна и Н. Загора" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-4">
                <Icon className="w-8 h-8 mx-auto mb-2 text-[var(--color-primary)]" />
                <h3 className="font-semibold text-[var(--color-gray-800)]">{title}</h3>
                <p className="text-sm text-[var(--color-gray-500)]">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Свързани продукти */}
      {relatedProducts.length > 0 && (
        <Section className="py-10 md:py-16 bg-[var(--color-background)]">
          <Container>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)] mb-8 text-center">
              Подобни продукти
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section className="py-10 bg-[var(--color-primary)]">
        <Container>
          <div className="text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 !text-white">
              Нуждаете се от съвет?
            </h2>
            <p className="mb-6 !text-white">
              Нашите експерти ще ви помогнат да изберете перфектното растение.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`}>
                <Button variant="secondary" size="lg" className="rounded-full">
                  <Phone className="w-5 h-5 mr-2" />
                  {LOCATIONS.varna.phone}
                </Button>
              </a>
              <Link href="/kontakti">
                <Button variant="outline" size="lg" className="rounded-full border-white text-white hover:bg-white hover:text-[var(--color-primary)]">
                  Контакти
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
