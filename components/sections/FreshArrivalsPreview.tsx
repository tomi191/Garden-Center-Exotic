"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Package } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

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
  arrival_date: string | null;
}

export function FreshArrivalsPreview() {
  const [arrival, setArrival] = useState<Arrival | null>(null);

  useEffect(() => {
    fetch("/api/arrivals?status=published")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Get the most recent arrival
          const latest = data[0];

          // Only show if arrival is within the last 14 days
          if (latest.arrival_date) {
            const arrivalDate = new Date(latest.arrival_date);
            const fourteenDaysAgo = new Date();
            fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

            if (arrivalDate >= fourteenDaysAgo) {
              setArrival(latest);
            }
          } else {
            // If no arrival_date, check created_at or published_at
            const createdDate = new Date(latest.published_at || latest.created_at);
            const fourteenDaysAgo = new Date();
            fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

            if (createdDate >= fourteenDaysAgo) {
              setArrival(latest);
            }
          }
        }
      })
      .catch(() => {});
  }, []);

  if (!arrival) {
    return null;
  }

  const countryLabel = arrival.country
    ? countryLabels[arrival.country] || arrival.country
    : null;

  return (
    <Section className="bg-[var(--color-primary-light)] py-12 md:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[var(--color-secondary)] font-bold tracking-widest uppercase text-xs md:text-sm mb-4 block text-center">
            ТАЗИ СЕДМИЦА ПРИСТИГНА
          </span>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[var(--color-border)] max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="w-full md:w-[200px] h-48 md:h-auto flex-shrink-0 overflow-hidden bg-[var(--color-light)]">
                {arrival.images && arrival.images.length > 0 ? (
                  <img
                    src={arrival.images[0]}
                    alt={arrival.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-10 h-10 text-[var(--color-gray-600)] opacity-30" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col justify-center flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-3 text-xs text-[var(--color-gray-600)]">
                  {countryLabel && (
                    <span className="px-2 py-0.5 bg-[var(--color-primary-light)] rounded-full font-semibold text-[var(--color-primary)]">
                      {countryLabel}
                    </span>
                  )}
                  {arrival.arrival_date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(arrival.arrival_date).toLocaleDateString("bg-BG", {
                        day: "numeric",
                        month: "long",
                      })}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl md:text-2xl font-bold text-[var(--color-primary-dark)] mb-2 line-clamp-2">
                  {arrival.title}
                </h3>

                {arrival.description && (
                  <p className="text-sm text-[var(--color-gray-600)] mb-4 line-clamp-2 leading-relaxed">
                    {arrival.description}
                  </p>
                )}

                <Link href={`/sveji-dostavki/${arrival.slug}`}>
                  <Button
                    size="sm"
                    className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-full px-5 w-fit"
                  >
                    Виж доставката
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
