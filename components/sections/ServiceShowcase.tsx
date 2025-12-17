"use client";

import { motion } from "framer-motion";
import { Truck, Users, Heart, Gift, Sparkles } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";

const serviceDetails = [
  {
    icon: Truck,
    title: "Доставка на Цветя",
    description: "Бърза и надеждна доставка на цветя и растения във Варна, Нова Загора и региона",
    examples: [
      "Експресна доставка в деня",
      "Планирана доставка за конкретен час",
      "Безплатна над 50 лв",
    ],
    pricing: "От 5 лв",
    gradient: "from-emerald-600 to-green-700",
    image: "/images/services/delivery.png",
  },
  {
    icon: Gift,
    title: "Букети и Аранжименти",
    description: "Индивидуални букети и флорални композиции за всеки повод",
    examples: [
      "Романтични букети",
      "Празнични аранжименти",
      "Траурни венци",
    ],
    pricing: "25 - 200+ лв",
    gradient: "from-rose-500 to-orange-600",
    image: "/images/services/bouquets.png",
  },
  {
    icon: Heart,
    title: "Сватби и Събития",
    description: "Цялостна флорална декорация за вашите най-важни моменти",
    examples: [
      "Булчински букети",
      "Декорация на маси и арки",
      "Корпоративни събития",
    ],
    pricing: "Индивидуална оферта",
    gradient: "from-amber-500 to-yellow-600",
    image: "/images/services/weddings.png",
  },
  {
    icon: Users,
    title: "B2B Партньорства",
    description: "Едрови доставки за цветарски магазини и организатори на събития",
    examples: [
      "Директен внос от борсата",
      "Преференциални цени",
      "Онлайн система за поръчки",
    ],
    pricing: "Цени на едро",
    gradient: "from-slate-600 to-slate-800",
    image: "/images/services/b2b.png",
  },
  {
    icon: Sparkles,
    title: "Консултации",
    description: "Експертни съвети за грижа и отглеждане на растенията",
    examples: [
      "Диагностика на болести",
      "Съвети за пресаждане",
      "План за торене",
    ],
    pricing: "Безплатно*",
    gradient: "from-teal-500 to-cyan-600",
    image: "/images/services/consultations.png",
  },
];

export function ServiceShowcase() {
  return (
    <Section className="relative py-12 md:py-20 overflow-hidden">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/backgrounds/services-bg.png"
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-[var(--color-background)]/60" />
      </div>

      {/* Decorative organic blobs */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[var(--color-primary-light)]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[1]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--color-secondary-light)]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none z-[1]" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14 max-w-2xl mx-auto"
        >
          <span className="text-[var(--color-secondary)] font-semibold tracking-wide uppercase text-xs mb-2 block">
            Нашите услуги
          </span>
          <h2 className="font-serif text-2xl md:text-3xl mb-3 text-[var(--color-primary-dark)]">
            Повече от просто <span className="italic text-[var(--color-primary)]">цветя</span>
          </h2>
          <p className="text-sm md:text-base text-[var(--color-gray-600)] leading-relaxed">
            От индивидуални букети до цялостна сватбена декорация. {new Date().getFullYear() - 1998}+ години опит във флористиката.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {serviceDetails.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 hover:shadow-xl transition-all duration-300 group bg-white rounded-2xl overflow-hidden shadow-sm">
                  {/* Image with organic blob shape */}
                  <div className="relative h-36 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90 z-10" />
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      style={{
                        clipPath: "ellipse(100% 85% at 50% 0%)",
                      }}
                    />
                    {/* Floating Icon Badge */}
                    <div
                      className={`absolute bottom-2 left-4 z-20 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-all duration-300 bg-gradient-to-br ${service.gradient}`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  <CardContent className="p-4 pt-2 flex flex-col h-auto">
                    {/* Content */}
                    <h3 className="text-sm font-serif font-bold mb-1 text-[var(--color-primary-dark)] group-hover:text-[var(--color-primary)] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-[11px] text-[var(--color-gray-600)] mb-3 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>

                    <ul className="space-y-1 mb-3">
                      {service.examples.map((example, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-1.5 text-[11px] text-[var(--color-gray-500)]"
                        >
                          <span className={`mt-1 w-1 h-1 rounded-full bg-gradient-to-br ${service.gradient} shrink-0`} />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Footer / Price */}
                    <div className="pt-2 mt-auto border-t border-[var(--color-border)]/50 flex justify-between items-center">
                      <span className="text-[9px] font-semibold text-[var(--color-gray-400)] uppercase tracking-wide">
                        Цена
                      </span>
                      <span className={`text-xs font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                        {service.pricing}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
