"use client";

import { motion } from "framer-motion";
import { Calendar, Warehouse, Users, MapPin } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";

const signals = [
  {
    icon: Calendar,
    title: "Наследство от 1998",
    description: "Над 27 години история в отглеждането и вноса на растения.",
  },
  {
    icon: Warehouse,
    title: "Студена Верига",
    description: "Гарантирана свежест чрез модерни климатизирани складове.",
  },
  {
    icon: Users,
    title: "Експертен Екип",
    description: "Професионални флористи, готови да съдействат за всеки повод.",
  },
  {
    icon: MapPin,
    title: "Две Локации",
    description: "Удобни шоуруми във Варна и Нова Загора.",
  },
];

export function TrustSignals() {
  return (
    <Section className="py-20">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {signals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <motion.div
                key={signal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-full bg-[var(--color-primary-light)]/40 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[var(--color-primary)] group-hover:scale-110">
                  <Icon className="w-8 h-8 text-[var(--color-primary-dark)] transition-colors group-hover:text-white" />
                </div>
                
                <h3 className="font-serif text-xl font-bold mb-3 text-[var(--color-foreground)]">
                  {signal.title}
                </h3>
                <p className="text-[var(--color-gray-600)] leading-relaxed text-sm max-w-xs">
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