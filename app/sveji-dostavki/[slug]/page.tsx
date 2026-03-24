import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, ArrowLeft, Phone, MessageCircle } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd } from "@/components/seo/Breadcrumbs";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { supabaseAdmin } from "@/lib/supabase";
import { SITE_CONFIG } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

const countryLabels: Record<string, string> = {
  ecuador: "🇪🇨 Еквадор",
  colombia: "🇨🇴 Колумбия",
  kenya: "🇰🇪 Кения",
  netherlands: "🇳🇱 Холандия",
  turkey: "🇹🇷 Турция",
  greece: "🇬🇷 Гърция",
  bulgaria: "🇧🇬 България",
  other: "🌍 Друга",
};

interface Arrival {
  id: string;
  title: string;
  slug: string;
  country: string | null;
  description: string | null;
  images: string[] | null;
  video_url: string | null;
  arrival_date: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
}

async function getArrival(slug: string): Promise<Arrival | null> {
  const { data } = await supabaseAdmin
    .from("arrivals")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const arrival = await getArrival(slug);

  if (!arrival) {
    return { title: "Доставката не е намерена" };
  }

  const countryLabel = arrival.country
    ? countryLabels[arrival.country] || arrival.country
    : "";

  const description =
    arrival.description ||
    `Ново зареждане - ${countryLabel}. Директен внос в Градински Център Екзотик.`;

  return {
    title: arrival.title,
    description,
    openGraph: {
      title: arrival.title + " | Градински Център Екзотик",
      description,
      type: "article",
      images:
        arrival.images && arrival.images[0]
          ? [{ url: SITE_CONFIG.url + arrival.images[0] }]
          : [],
      ...(arrival.video_url
        ? { videos: [{ url: SITE_CONFIG.url + arrival.video_url }] }
        : {}),
    },
  };
}

export default async function ArrivalDetailPage({ params }: Props) {
  const { slug } = await params;
  const arrival = await getArrival(slug);

  if (!arrival) {
    notFound();
  }

  const countryLabel = arrival.country
    ? countryLabels[arrival.country] || arrival.country
    : null;

  const pageUrl = `${SITE_CONFIG.url}/sveji-dostavki/${arrival.slug}`;

  // JSON-LD Product schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: arrival.title,
    description: arrival.description || "",
    image: arrival.images?.map((img) => SITE_CONFIG.url + img) || [],
    brand: {
      "@type": "Brand",
      name: "Градински Център Екзотик",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "BGN",
      seller: {
        "@id": SITE_CONFIG.url + "/#organization",
      },
    },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Свежи Доставки", href: "/sveji-dostavki" },
          { name: arrival.title },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero with first image */}
      <section className="relative min-h-[50vh] flex items-end">
        <div className="absolute inset-0">
          {arrival.images && arrival.images.length > 0 ? (
            <img
              src={arrival.images[0]}
              alt={arrival.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src="/images/backgrounds/services-bg.png"
              alt={arrival.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        </div>

        <Container className="relative z-10 pb-12 pt-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              {countryLabel && (
                <span className="px-3 py-1 bg-[var(--color-secondary)] text-white text-xs font-bold rounded-full">
                  {countryLabel}
                </span>
              )}
              {arrival.arrival_date && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                  <Calendar className="w-3 h-3" />
                  {new Date(arrival.arrival_date).toLocaleDateString("bg-BG", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold !text-white mb-4 leading-tight drop-shadow-lg">
              {arrival.title}
            </h1>
          </div>
        </Container>
      </section>

      {/* Content */}
      <Section className="bg-white py-12 md:py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <Link
              href="/sveji-dostavki"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Всички доставки
            </Link>

            {/* Description */}
            {arrival.description && (
              <div className="mb-10">
                <p className="text-lg text-[var(--color-gray-700)] leading-relaxed">
                  {arrival.description}
                </p>
              </div>
            )}

            {/* Image Gallery */}
            {arrival.images && arrival.images.length > 0 && (
              <div className="mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {arrival.images.map((image, index) => (
                    <a
                      key={index}
                      href={image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block overflow-hidden rounded-xl group"
                    >
                      <img
                        src={image}
                        alt={`${arrival.title} - снимка ${index + 1}`}
                        className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Video */}
            {arrival.video_url && (
              <div className="mb-10">
                <video
                  controls
                  className="w-full rounded-xl"
                  poster={arrival.images?.[0] || undefined}
                >
                  <source src={arrival.video_url} />
                  Вашият браузър не поддържа видео.
                </video>
              </div>
            )}

            {/* CTA Section */}
            <div className="bg-[var(--color-primary-light)] rounded-2xl p-8 md:p-10 mb-10">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)] mb-3">
                Обади се за поръчка
              </h2>
              <p className="text-[var(--color-gray-600)] mb-6">
                Количествата са ограничени. Свържете се с нас за наличност и цени.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="tel:0895670370">
                  <Button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-full px-6">
                    <Phone className="w-4 h-4 mr-2" />
                    089 567 0370
                  </Button>
                </a>
                <a
                  href="viber://chat?number=+359895670370"
                  className="inline-block"
                >
                  <Button
                    variant="outline"
                    className="border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white rounded-full px-6"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Viber
                  </Button>
                </a>
              </div>
            </div>

            {/* Share */}
            <div className="pt-6 border-t border-[var(--color-border)]">
              <ShareButtons
                url={pageUrl}
                title={arrival.title}
                description={arrival.description || undefined}
              />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
