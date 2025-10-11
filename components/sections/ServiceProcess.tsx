"use client";

import { motion } from "framer-motion";
import { Phone, MessageCircle, ShoppingCart, Truck, CheckCircle, Star } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";

const processSteps = [
  {
    icon: Phone,
    number: "1",
    title: "Свържете се с нас",
    description: "Позвънете, изпратете имейл или посетете магазина ни",
    details: ["Телефон", "WhatsApp", "Email", "Директно на място"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: MessageCircle,
    number: "2",
    title: "Консултация",
    description: "Нашите експерти ще ви помогнат с избора",
    details: ["Препоръки за растения", "Помощ с избора", "Информация за грижи", "Ценова оферта"],
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: ShoppingCart,
    number: "3",
    title: "Поръчка",
    description: "Финализирайте вашата поръчка",
    details: ["Избор на продукти", "Опаковка", "Дата и час на доставка", "Начин на плащане"],
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Truck,
    number: "4",
    title: "Доставка",
    description: "Бърза и надеждна доставка до вас",
    details: ["Професионална опаковка", "Студена верига", "Точност при доставката", "SMS уведомление"],
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: CheckCircle,
    number: "5",
    title: "Получаване",
    description: "Прегледайте и приемете поръчката",
    details: ["Проверка на качеството", "Инструкции за грижи", "Гаранция за свежест", "Опции за плащане"],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Star,
    number: "6",
    title: "Следгаранционна подкрепа",
    description: "Винаги сме на ваше разположение",
    details: ["Консултации по телефон", "Съвети за грижи", "Помощ при проблеми", "Бонус програма"],
    gradient: "from-indigo-500 to-purple-500",
  },
];

export function ServiceProcess() {
  return (
    <Section className="bg-gradient-to-b from-[var(--color-light)] to-white py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Как Работим?</h2>
          <p className="text-xl text-[var(--color-gray-600)] mx-auto">
            Простият ни процес гарантира качествено обслужване на всяка стъпка
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting Line */}
          <div className="absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-pink-500 via-amber-500 via-green-500 to-indigo-500 opacity-20"></div>

          <div className="grid grid-cols-6 gap-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Number Circle */}
                  <div className="flex justify-center mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center shadow-2xl ring-8 ring-white relative z-10`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <div className="mb-3">
                      <span
                        className={`inline-block px-3 py-1 bg-gradient-to-r ${step.gradient} text-white text-sm font-bold rounded-full`}
                      >
                        Стъпка {step.number}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-[var(--color-foreground)]">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--color-gray-600)] mb-4">
                      {step.description}
                    </p>
                    <div className="space-y-1">
                      {step.details.map((detail, i) => (
                        <div key={i} className="text-xs text-[var(--color-gray-600)]">
                          • {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-8">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4"
              >
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="mb-2">
                    <span
                      className={`inline-block px-3 py-1 bg-gradient-to-r ${step.gradient} text-white text-xs font-bold rounded-full`}
                    >
                      Стъпка {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-[var(--color-foreground)]">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--color-gray-600)] mb-3">
                    {step.description}
                  </p>
                  <div className="space-y-1">
                    {step.details.map((detail, i) => (
                      <div
                        key={i}
                        className="text-sm text-[var(--color-gray-600)] flex items-center gap-2"
                      >
                        <span className="text-[var(--color-primary)]">✓</span>
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
