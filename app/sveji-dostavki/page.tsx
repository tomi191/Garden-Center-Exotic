import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowRight, Package, Truck } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BreadcrumbJsonLd } from "@/components/seo/Breadcrumbs";
import { supabaseAdmin } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Свежи Доставки",
  description:
    "Нови пристигания на цветя и растения от цял свят. Директен внос от Еквадор, Холандия, Колумбия, Кения и Турция.",
};

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

export const dynamic = "force-dynamic";

export default async function FreshArrivalsPage() {
  const { data: arrivals } = await supabaseAdmin
    .from("fresh_arrivals")
    .select("*")
    .eq("status", "published")
    .order("arrival_date", { ascending: false });

  const items: Arrival[] = arrivals || [];

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Свежи Доставки", href: "/sveji-dostavki" }]} />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/services-bg.png"
            alt="Свежи Доставки"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/25" />
        </div>

        <Container className="relative z-10 py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-[var(--color-secondary)] text-sm font-medium tracking-wider uppercase mb-4">
              Директно от фермите
            </span>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold !text-white mb-6 leading-tight drop-shadow-lg">
              Свежи Доставки
            </h1>

            <p className="!text-white text-lg md:text-xl leading-relaxed mb-8 drop-shadow-md">
              Нови пристигания на цветя и растения от цял свят. Директен внос от
              Еквадор, Холандия, Колумбия, Кения и Турция.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="#arrivals">
                <Button className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white rounded-full px-6">
                  Виж доставките
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="tel:0895670370">
                <Button
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 rounded-full px-6"
                >
                  <Truck className="w-4 h-4 mr-2" />
                  Поръчай сега
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Arrivals Grid */}
      <Section id="arrivals" className="bg-white py-16 md:py-20">
        <Container>
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[var(--color-secondary)] font-semibold tracking-wider uppercase text-sm mb-2 block">
              Последни зареждания
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
              Нови Пристигания
            </h2>
            <p className="text-[var(--color-gray-600)] max-w-2xl mx-auto">
              Разгледайте последните доставки на свежи цветя и растения от нашите партньори по света
            </p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 mx-auto text-[var(--color-gray-600)] opacity-40 mb-6" />
              <p className="text-xl text-[var(--color-gray-600)] font-serif">
                Очаквайте скоро нови доставки!
              </p>
              <p className="text-sm text-[var(--color-gray-600)] mt-2">
                Следете ни за нови пристигания от цял свят
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((arrival) => (
                <Link key={arrival.id} href={`/sveji-dostavki/${arrival.slug}`}>
                  <div className="group bg-white rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Image */}
                    <div className="h-56 overflow-hidden relative bg-[var(--color-light)]">
                      {arrival.images && arrival.images.length > 0 ? (
                        <img
                          src={arrival.images[0]}
                          alt={arrival.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-12 h-12 text-[var(--color-gray-600)] opacity-30" />
                        </div>
                      )}
                      {/* Country badge */}
                      {arrival.country && (
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[var(--color-primary)] shadow-sm">
                          {countryLabels[arrival.country] || arrival.country}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3 text-xs text-[var(--color-gray-600)]">
                        {arrival.arrival_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(arrival.arrival_date).toLocaleDateString("bg-BG", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-bold mb-2 text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                        {arrival.title}
                      </h3>

                      {arrival.description && (
                        <p className="text-sm text-[var(--color-gray-700)] line-clamp-2 leading-relaxed">
                          {arrival.description}
                        </p>
                      )}

                      <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                        <span className="text-[var(--color-primary)] font-semibold text-sm">
                          Виж доставката →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
