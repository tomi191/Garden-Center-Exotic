"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Truck, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const benefits = [
  {
    icon: Building2,
    title: "Хотели и ресторанти",
    description: "Цветен абонамент със седмична смяна. Вази под наем."
  },
  {
    icon: Truck,
    title: "Търговия на едро",
    description: "Директен внос от Еквадор и Холандия. Цени без посредници."
  },
  {
    icon: ShieldCheck,
    title: "Студена верига",
    description: "Гарантирана свежест над 2 седмици. Редовни доставки."
  },
];

export function B2BCTA() {
  return (
    <Section className="py-10 md:py-16 overflow-hidden">
      <Container>
        <div className="relative rounded-2xl md:rounded-3xl bg-[var(--color-primary-dark)] text-white p-5 md:p-10 overflow-hidden">
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 w-[200px] md:w-[400px] h-[200px] md:h-[400px] bg-white/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-6 md:gap-10 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <span className="text-[var(--color-secondary)] text-xs font-semibold tracking-wide uppercase mb-2 block">
                B2B партньорство
              </span>
              <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-3 !text-white">
                За вашия бизнес
              </h2>
              <p className="text-white/80 text-xs md:text-sm mb-5 leading-relaxed max-w-md mx-auto lg:mx-0">
                Флористи, хотели, ресторанти - предлагаме преференциални цени и редовни доставки директно от вносител.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link href="/kontakti" className="w-full sm:w-auto">
                  <Button size="sm" className="bg-white text-[var(--color-primary-dark)] hover:bg-[var(--color-secondary)] hover:text-white rounded-full w-full">
                    Заявка за оферта
                  </Button>
                </Link>
                <a href="tel:0895670370" className="w-full sm:w-auto">
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 rounded-full w-full">
                    <Phone className="w-4 h-4 mr-1.5" />
                    089 567 0370
                  </Button>
                </a>
              </div>
            </motion.div>

            {/* Right Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-2 md:space-y-3"
            >
              {benefits.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-secondary)]/20 flex items-center justify-center flex-shrink-0 text-[var(--color-secondary)]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-0.5 !text-white">{item.title}</h3>
                      <p className="text-xs text-white/70 leading-relaxed">
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