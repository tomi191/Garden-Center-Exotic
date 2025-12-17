"use client";

import { motion } from "framer-motion";
import { Truck, Snowflake, BadgePercent, Gift } from "lucide-react";
import { Container } from "@/components/ui/Container";

const benefits = [
  { icon: Truck, text: "Бърза доставка" },
  { icon: Snowflake, text: "14+ дни свежест" },
  { icon: BadgePercent, text: "Цени без посредник" },
  { icon: Gift, text: "Безплатна опаковка" },
];

export function TrustSignals() {
  return (
    <section className="py-4 bg-[var(--color-primary)]">
      <Container>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.text}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <Icon className="w-5 h-5 text-white/90" />
                <span className="text-sm md:text-base font-medium text-white">
                  {benefit.text}
                </span>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
