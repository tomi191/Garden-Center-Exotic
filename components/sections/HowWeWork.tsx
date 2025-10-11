"use client";

import { motion } from "framer-motion";
import { Search, ShoppingCart, Snowflake, Truck, HeadphonesIcon } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Избор и Консултация",
    description: "Разгледайте нашия богат асортимент или се свържете с нашите експерти за професионална консултация и препоръки.",
    color: "from-[var(--color-primary)] to-[var(--color-secondary)]",
  },
  {
    number: "02",
    icon: ShoppingCart,
    title: "Поръчка",
    description: "Направете поръчка онлайн, по телефон или посетете някоя от нашите две локации във Варна и Нова Загора.",
    color: "from-[var(--color-secondary)] to-[var(--color-accent)]",
  },
  {
    number: "03",
    icon: Snowflake,
    title: "Подготовка",
    description: "Вашите цветя и растения се подготвят с грижа. Рязаният цвят преминава през нашата студена верига за максимална свежест.",
    color: "from-[var(--color-accent)] to-[var(--color-primary)]",
  },
  {
    number: "04",
    icon: Truck,
    title: "Доставка",
    description: "Безопасна доставка до вас или бизнеса ви с нашия специализиран транспорт, поддържащ оптималната температура.",
    color: "from-[var(--color-primary)] to-[var(--color-secondary)]",
  },
  {
    number: "05",
    icon: HeadphonesIcon,
    title: "Следпродажбено обслужване",
    description: "Продължаваме да ви подкрепяме с безплатни консултации за грижи, QR кодове с инструкции и винаги отворени врати за въпроси.",
    color: "from-[var(--color-secondary)] to-[var(--color-accent)]",
  },
];

export function HowWeWork() {
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
          <h2 className="mb-4">Как работим</h2>
          <p className="text-xl text-[var(--color-gray-600)] max-w-3xl mx-auto">
            От избора до доставката - процес, създаден да гарантира качество и вашето удовлетворение
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] opacity-20"></div>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Step Card */}
                  <div className="bg-[var(--color-light)] rounded-2xl p-6 h-full flex flex-col items-center text-center hover:shadow-lg transition-shadow">
                    {/* Number Badge */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                      <span className={`text-lg font-bold bg-gradient-to-br ${step.color} bg-clip-text text-transparent`}>
                        {step.number}
                      </span>
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg`}
                    >
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 text-[var(--color-foreground)]">
                      {step.title}
                    </h3>
                    <p className="text-[var(--color-gray-600)] text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-full shadow-lg">
            <Snowflake className="w-5 h-5" />
            <span className="font-semibold">Студена верига за максимална свежест</span>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
