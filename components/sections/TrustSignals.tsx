"use client";

import { motion } from "framer-motion";
import { Truck, Snowflake, BadgePercent, Award } from "lucide-react";
import { Container } from "@/components/ui/Container";

const benefits = [
  { icon: Truck, line1: "Бърза", line2: "доставка" },
  { icon: Snowflake, line1: "14+ дни", line2: "свежест" },
  { icon: BadgePercent, line1: "Без", line2: "посредник" },
  { icon: Award, line1: "Премиум", line2: "качество" },
];

export function TrustSignals() {
  return (
    <section className="py-4 md:py-5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)]">
      <Container>
        <div className="flex justify-between sm:justify-center items-start gap-2 sm:gap-8 md:gap-14 px-2 sm:px-0">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.line1}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center gap-1.5 group"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                  <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div className="text-center">
                  <span className="block text-xs md:text-sm font-semibold text-white">
                    {benefit.line1}
                  </span>
                  <span className="block text-[10px] md:text-xs text-white/80">
                    {benefit.line2}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
