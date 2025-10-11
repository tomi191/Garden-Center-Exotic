"use client";

import { motion } from "framer-motion";
import { Calendar, Building2, Users, MapPin } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";

const signals = [
  {
    icon: Calendar,
    title: "От 1998 г.",
    description: "27 години опит в отглеждането и продажбата на цветя и растения",
  },
  {
    icon: Building2,
    title: "Оранжерии и Студена Камера",
    description: "Модерна инфраструктура за гарантирано качество през цялата година",
  },
  {
    icon: Users,
    title: "Експертен Екип",
    description: "Професионално обучени специалисти с дългогодишен опит",
  },
  {
    icon: MapPin,
    title: "2 Локации",
    description: "Варна и Нова Загора - удобство и достъпност за всички клиенти",
  },
];

export function TrustSignals() {
  return (
    <Section className="bg-[var(--color-light)] py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Защо да изберете нас?</h2>
          <p className="text-xl text-[var(--color-gray-600)] mx-auto">
            Дългогодишен опит, професионализъм и грижа за всеки клиент
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <motion.div
                key={signal.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="w-14 h-14 bg-[var(--color-primary-light)] rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-[var(--color-foreground)]">
                  {signal.title}
                </h3>
                <p className="text-[var(--color-gray-600)] leading-relaxed text-sm">
                  {signal.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
