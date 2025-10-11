"use client";

import { motion } from "framer-motion";
import { Package, Truck, Calendar, Users, Building2, Heart, Gift, Sparkles } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";

const serviceDetails = [
  {
    icon: Truck,
    title: "Доставка на Цветя",
    description: "Бърза и надеждна доставка на цветя и растения във Варна, Нова Загора и региона",
    examples: [
      "Експресна доставка в рамките на 2-3 часа",
      "Планирана доставка на определена дата и час",
      "Безплатна доставка при поръчки над 50 лв",
      "Специална опаковка за подарък",
    ],
    pricing: "От 5 лв (според локация)",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Gift,
    title: "Букети и Аранжименти",
    description: "Индивидуални букети и флорални композиции за всеки повод",
    examples: [
      "Романтични букети за двойки",
      "Празнични аранжименти",
      "Траурни венци и букети",
      "Корпоративни цветя",
    ],
    pricing: "От 25 лв до 200+ лв",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Heart,
    title: "Специални Поводи",
    description: "Цветя и декорация за вашите най-важни моменти",
    examples: [
      "Сватби - декорация и булчински букети",
      "Рождени дни и юбилеи",
      "Корпоративни събития",
      "Свети Валентин, 8 Март, Майски празници",
    ],
    pricing: "Индивидуална оферта",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: Building2,
    title: "Озеленяване на Офиси",
    description: "Професионални решения за озеленяване на работни пространства",
    examples: [
      "Избор на подходящи растения",
      "Поставяне и аранжиране",
      "Редовна поддръжка и полив",
      "Замяна на растения при нужда",
    ],
    pricing: "От 50 лв/месец",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Calendar,
    title: "Абонаментни Услуги",
    description: "Редовна доставка на свежи цветя за дома или офиса",
    examples: [
      "Седмична доставка на сезонни цветя",
      "Месечни букети по избор",
      "Автоматично подновяване",
      "Специални отстъпки за абонати",
    ],
    pricing: "От 80 лв/месец",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Users,
    title: "B2B Партньорства",
    description: "Дългосрочни договори за хотели, ресторанти и корпорации",
    examples: [
      "Редовна доставка на цветя",
      "Специални цени за обемни поръчки",
      "Приоритетно обслужване",
      "Месечно фактуриране",
    ],
    pricing: "Индивидуална оферта",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    icon: Sparkles,
    title: "Консултации и Грижи",
    description: "Професионални съвети за отглеждане на растенията",
    examples: [
      "Безплатна консултация при покупка",
      "Препоръки за грижи",
      "Диагностика на проблеми",
      "Помощ при избор на растения",
    ],
    pricing: "Безплатно",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    icon: Package,
    title: "Специални Пакети",
    description: "Готови решения за различни нужди и бюджети",
    examples: [
      "Пакет 'Романтика' - 101 рози",
      "Пакет 'Градина в дома' - 5 саксийни растения",
      "Пакет 'Офис' - месечна доставка",
      "Пакет 'Сватба' - пълна декорация",
    ],
    pricing: "От 150 лв до 2000+ лв",
    gradient: "from-rose-500 to-pink-500",
  },
];

export function ServiceShowcase() {
  return (
    <Section className="bg-white py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Нашите Услуги в Детайли</h2>
          <p className="text-xl text-[var(--color-gray-600)] mx-auto">
            От доставка на цветя до пълно озеленяване - ние сме тук за всяка ваша нужда
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {serviceDetails.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 group">
                  <CardContent className="p-6">
                    {/* Икона с градиент */}
                    <div
                      className={`w-14 h-14 mb-4 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Заглавие */}
                    <h3 className="text-xl font-bold mb-3 text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors">
                      {service.title}
                    </h3>

                    {/* Описание */}
                    <p className="text-sm text-[var(--color-gray-600)] mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Примери */}
                    <div className="mb-4 space-y-2">
                      {service.examples.map((example, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-[var(--color-gray-700)]"
                        >
                          <span className="text-[var(--color-primary)] mt-0.5">•</span>
                          <span className="flex-1">{example}</span>
                        </div>
                      ))}
                    </div>

                    {/* Ценова информация */}
                    <div className="pt-4 border-t border-[var(--color-border)]">
                      <div className="text-sm font-semibold text-[var(--color-gray-500)]">
                        Цена:
                      </div>
                      <div className={`text-base font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                        {service.pricing}
                      </div>
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
