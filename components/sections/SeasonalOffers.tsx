"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Flower, Crown, Calendar } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const seasonalOffers = [
  {
    icon: Heart,
    title: "Свети Валентин",
    subtitle: "Колекция Любов",
    date: "14 Февруари",
    description: "Ексклузивни червени рози от Колумбия с дължина до 90см.",
    color: "bg-rose-50 text-rose-900",
    iconColor: "text-rose-600",
    available: true,
  },
  {
    icon: Flower,
    title: "8-ми Март",
    subtitle: "За нея",
    date: "8 Март",
    description: "Пролетни букети с лалета, зюмбюли и фрезии.",
    color: "bg-purple-50 text-purple-900",
    iconColor: "text-purple-600",
    available: true,
  },
  {
    icon: Crown,
    title: "Сватбен Сезон",
    subtitle: "Ранно записване",
    date: "Май - Септември",
    description: "Безплатна консултация за сватбена декорация.",
    color: "bg-amber-50 text-amber-900",
    iconColor: "text-amber-600",
    available: true,
  },
];

export function SeasonalOffers() {
  return (
    <Section className="py-24 bg-[var(--color-light)] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--color-primary-light)] rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[var(--color-secondary)] font-bold tracking-widest uppercase text-sm mb-3 block">
            Календар на събитията
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)] mb-6">
            Сезонни Колекции
          </h2>
          <p className="text-lg text-[var(--color-gray-600)]">
            Специални предложения за най-важните моменти през годината. 
            Планирайте празника с нашите флористи.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {seasonalOffers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-[2rem] p-8 ${offer.color} transition-transform hover:-translate-y-2`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm ${offer.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {offer.available && (
                    <span className="px-3 py-1 bg-white/50 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider">
                      Активно
                    </span>
                  )}
                </div>

                <div className="space-y-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-70">
                    {offer.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-bold leading-tight">
                    {offer.title}
                  </h3>
                </div>

                <p className="text-sm opacity-80 leading-relaxed mb-6 min-h-[3rem]">
                  {offer.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium opacity-70 border-t border-black/5 pt-4">
                  <Calendar className="w-4 h-4" />
                  {offer.date}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}