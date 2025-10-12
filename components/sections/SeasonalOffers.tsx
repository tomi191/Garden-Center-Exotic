"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Heart, Sparkles, Gift, PartyPopper, Clock } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const seasonalOffers = [
  {
    icon: Heart,
    title: "Свети Валентин",
    date: "14 Февруари",
    description: "Романтични букети с рози първо качество от Колумбия и Кения",
    discount: "15% отстъпка",
    gradient: "from-rose-500 to-pink-600",
    available: true,
    deadline: "Поръчай до 10 февруари",
  },
  {
    icon: Sparkles,
    title: "Осми Март",
    date: "8 Март",
    description: "Пролетни цветя и елегантни аранжименти за специалния ден",
    discount: "10% отстъпка",
    gradient: "from-purple-500 to-violet-600",
    available: true,
    deadline: "Поръчай до 5 март",
  },
  {
    icon: Gift,
    title: "Майски Празници",
    date: "1-6 Май",
    description: "Цветя за градината, саксийни растения и пролетни букети",
    discount: "20% отстъпка",
    gradient: "from-green-500 to-emerald-600",
    available: false,
    deadline: "Скоро",
  },
  {
    icon: PartyPopper,
    title: "Сватбен Сезон",
    date: "Май - Септември",
    description: "Специални оферти за сватби и корпоративни събития",
    discount: "Индивидуална оферта",
    gradient: "from-amber-500 to-orange-600",
    available: true,
    deadline: "Резервирай 2-3 месеца предварително",
  },
];

export function SeasonalOffers() {
  return (
    <Section className="bg-gradient-to-b from-white to-[var(--color-light)] py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-full mb-4">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-semibold">Сезонни Оферти</span>
          </div>
          <h2 className="mb-4">Специални Предложения за Всеки Сезон</h2>
          <p className="text-base text-[var(--color-gray-600)]">
            Планирайте предварително и се възползвайте от ексклузивни отстъпки
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {seasonalOffers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 group overflow-hidden border-2 border-transparent hover:border-[var(--color-primary)]/30">
                  <CardContent className="p-6 relative">
                    {/* Статус Badge */}
                    <div className="absolute top-4 right-4">
                      {offer.available ? (
                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                          Налично
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-400 text-white text-xs font-bold rounded-full">
                          Скоро
                        </span>
                      )}
                    </div>

                    {/* Икона */}
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${offer.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Съдържание */}
                    <h3 className="text-xl font-bold mb-2 text-center text-[var(--color-foreground)]">
                      {offer.title}
                    </h3>
                    <p className="text-center text-[var(--color-primary)] font-semibold mb-3">
                      {offer.date}
                    </p>
                    <p className="text-[var(--color-gray-600)] text-center mb-4 leading-relaxed">
                      {offer.description}
                    </p>

                    {/* Отстъпка */}
                    <div className={`py-2 px-4 bg-gradient-to-r ${offer.gradient} text-white rounded-lg text-center font-bold mb-3`}>
                      {offer.discount}
                    </div>

                    {/* Краен срок */}
                    <div className="flex items-center justify-center gap-2 text-sm text-[var(--color-gray-500)]">
                      <Clock className="w-4 h-4" />
                      <span>{offer.deadline}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-[var(--color-foreground)]">
              Не пропускайте специалните оферти!
            </h3>
            <p className="text-[var(--color-gray-700)] mb-6">
              Свържете се с нас за повече информация или предварителна резервация
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/kontakti">
                <Button variant="primary" size="lg">
                  Свържете се с нас
                </Button>
              </Link>
              <a href="tel:+35952XXXXXX">
                <Button variant="outline" size="lg">
                  Обадете се сега
                </Button>
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
