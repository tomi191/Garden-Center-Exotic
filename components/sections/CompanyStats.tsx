"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { Award, Users, Building2, Globe, Package, TrendingUp } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { useEffect, useRef } from "react";
import { SITE_CONFIG } from "@/lib/constants";

// Анимиран брояч за статистика
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2500, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString("bg-BG") + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

const stats = [
  {
    icon: Award,
    value: new Date().getFullYear() - SITE_CONFIG.founded,
    suffix: "+",
    label: "Години Опит",
    description: "От 1998 г. на пазара",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    value: 15000,
    suffix: "+",
    label: "Доволни Клиенти",
    description: "Годишно обслужване",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Package,
    value: 500,
    suffix: "+",
    label: "Вида Растения",
    description: "Постоянен асортимент",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: Globe,
    value: 6,
    suffix: "",
    label: "Държави Вносители",
    description: "Международно качество",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Building2,
    value: 3000,
    suffix: "м²",
    label: "Оранжерии",
    description: "Производствени площи",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: "%",
    label: "Удовлетвореност",
    description: "Рейтинг на клиенти",
    gradient: "from-indigo-500 to-purple-500",
  },
];

export function CompanyStats() {
  return (
    <Section className="bg-gradient-to-b from-white to-[var(--color-light)] py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Нашите Постижения в Цифри</h2>
          <p className="text-xl text-[var(--color-gray-600)]">
            Факти и резултати от нашата дългогодишна работа
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {/* Карта с градиент border */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`}></div>

                <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-[var(--color-border)]">
                  {/* Икона с градиент */}
                  <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Число */}
                  <div className={`text-5xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Етикет */}
                  <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">
                    {stat.label}
                  </h3>

                  {/* Описание */}
                  <p className="text-[var(--color-gray-600)]">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Допълнителен текст */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-[var(--color-gray-700)] mx-auto">
            Всяка от тези цифри представлява нашия ангажимент към качеството,
            професионализма и грижата за всеки клиент. Благодарим ви, че сте част от нашата история!
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
