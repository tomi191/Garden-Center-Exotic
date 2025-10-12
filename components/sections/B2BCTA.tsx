"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Truck, Phone, ArrowRight, Check } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const benefits = [
  { icon: Building2, title: "Обемни отстъпки", description: "Специални цени според обема" },
  { icon: Truck, title: "Редовна доставка", description: "Абонаментни пакети" },
  { icon: Phone, title: "Персонален мениджър", description: "Dedicated support 24/7" },
];

export function B2BCTA() {
  return (
    <Section className="relative bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white overflow-hidden py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-semibold">B2B УСЛУГИ</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Надежден партньор за вашия бизнес
            </h2>

            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Предлагаме специални B2B услуги за хотели, ресторанти, офиси,
              организатори на събития и цветарски магазини.
            </p>

            <div className="space-y-4 mb-10">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{benefit.title}</h4>
                      <p className="text-white/80 text-sm">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/uslugi/za-biznesa">
                <Button size="lg" className="bg-white text-[var(--color-primary)] hover:bg-gray-100 w-full sm:w-auto">
                  Научете повече
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/kontakti">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[var(--color-primary)] w-full sm:w-auto">
                  Заявка за оферта
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { number: "50+", label: "B2B клиенти" },
              { number: "100%", label: "Гаранция" },
              { number: "24/7", label: "Студена камера" },
              { number: "Net 30/60", label: "Плащане" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center hover:bg-white/15 transition-all"
              >
                <div className="text-2xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
