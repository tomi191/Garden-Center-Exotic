"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Truck, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const benefits = [
  { 
    icon: Building2, 
    title: "За Хотели & Ресторанти", 
    description: "Седмична доставка на свежи цветя и поддръжка на интериорно озеленяване." 
  },
  { 
    icon: Truck, 
    title: "Търговия на Едро", 
    description: "Директен внос от борсите в Холандия. Конкурентни цени за магазини." 
  },
  { 
    icon: ShieldCheck, 
    title: "Гаранция за Качество", 
    description: "Замяна на стока при проблем до 24 часа. Студена верига на доставка." 
  },
];

export function B2BCTA() {
  return (
    <Section className="py-24 overflow-hidden">
      <Container>
        <div className="relative rounded-[3rem] bg-[var(--color-primary-dark)] text-white p-8 md:p-16 overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
                Партньор за вашия бизнес
              </h2>
              <p className="text-white/70 text-lg mb-10 leading-relaxed max-w-lg">
                Работим успешно с над 50 корпоративни клиента. Предлагаме гъвкави условия и персонален акаунт мениджър.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/uslugi/za-biznesa">
                  <Button size="lg" className="bg-white text-[var(--color-primary-dark)] hover:bg-[var(--color-secondary)] hover:text-white rounded-full px-8 text-lg w-full sm:w-auto">
                    Научете повече
                  </Button>
                </Link>
                <Link href="/kontakti">
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 text-lg w-full sm:w-auto">
                    Заявка за оферта
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {benefits.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)]/20 flex items-center justify-center flex-shrink-0 text-[var(--color-secondary)]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}