"use client";

import { motion } from "framer-motion";
import { Store, Building2, TrendingUp, Award, Users, Sparkles } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { SITE_CONFIG } from "@/lib/constants";

const timelineEvents = [
  {
    year: 1998,
    icon: Store,
    title: "Начало във Варна",
    description: "Открихме първия ни магазин във Варна с фокус върху качествени цветя и растения",
    color: "from-blue-500 to-cyan-500",
  },
  {
    year: 2003,
    icon: Building2,
    title: "Първа Оранжерия",
    description: "Изградихме първата ни собствена оранжерия за целогодишно производство",
    color: "from-green-500 to-emerald-500",
  },
  {
    year: 2008,
    icon: TrendingUp,
    title: "Международен Внос",
    description: "Започнахме директен внос на цветя от Колумбия, Кения и Холандия",
    color: "from-purple-500 to-violet-500",
  },
  {
    year: 2012,
    icon: Store,
    title: "Разширение в Нова Загора",
    description: "Отворихме втората ни локация на магистрала Тракия",
    color: "from-amber-500 to-orange-500",
  },
  {
    year: 2016,
    icon: Award,
    title: "Студена Камера",
    description: "Инвестирахме в професионална студена камера и cold chain система",
    color: "from-cyan-500 to-blue-500",
  },
  {
    year: 2020,
    icon: Users,
    title: "B2B Експанзия",
    description: "Разширихме портфолиото с услуги за хотели, ресторанти и корпоративни клиенти",
    color: "from-pink-500 to-rose-500",
  },
  {
    year: 2025,
    icon: Sparkles,
    title: `${new Date().getFullYear() - SITE_CONFIG.founded} Години Успех`,
    description: "Продължаваме да се развиваме и предлагаме най-доброто качество на нашите клиенти",
    color: "from-indigo-500 to-purple-500",
  },
];

export function CompanyTimeline() {
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
          <h2 className="mb-4">Нашето Пътуване</h2>
          <p className="text-xl text-[var(--color-gray-600)]">
            От малък магазин до водещ доставчик на цветя в региона
          </p>
        </motion.div>

        <div className="relative">
          {/* Вертикална линия (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] opacity-20"></div>

          {/* Timeline събития */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-8 items-center ${
                    isEven ? "" : "lg:grid-flow-col-dense"
                  }`}
                >
                  {/* Съдържание */}
                  <div className={`${isEven ? "lg:text-right" : "lg:col-start-2 lg:text-left"} mb-8 lg:mb-0`}>
                    <div className={`inline-block ${isEven ? "lg:ml-auto" : "lg:mr-auto"}`}>
                      <div className="flex items-center gap-3 mb-3">
                        {isEven && (
                          <span className="lg:hidden px-4 py-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-bold rounded-full">
                            {event.year}
                          </span>
                        )}
                        <h3 className="text-2xl font-bold text-[var(--color-foreground)]">{event.title}</h3>
                        {!isEven && (
                          <span className="hidden lg:inline-block px-4 py-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-bold rounded-full">
                            {event.year}
                          </span>
                        )}
                      </div>
                      <p className="text-[var(--color-gray-600)] leading-relaxed max-w-md">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Централна икона */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16">
                    <div className={`w-16 h-16 bg-gradient-to-br ${event.color} rounded-full flex items-center justify-center shadow-2xl ring-8 ring-white`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Година badge (Desktop) */}
                  <div className={`hidden lg:block ${isEven ? "lg:col-start-2" : "lg:col-start-1"}`}>
                    <div className={`${isEven ? "text-left" : "text-right"}`}>
                      <span className="inline-block px-6 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-2xl font-bold rounded-full shadow-lg">
                        {event.year}
                      </span>
                    </div>
                  </div>

                  {/* Mobile икона */}
                  <div className="lg:hidden flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${event.color} rounded-full flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="px-4 py-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white font-bold rounded-full">
                      {event.year}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-[2px] rounded-2xl">
            <div className="bg-white px-8 py-6 rounded-2xl">
              <p className="text-2xl font-bold text-[var(--color-foreground)]">
                {new Date().getFullYear() - SITE_CONFIG.founded} години традиция и иновация
              </p>
              <p className="text-[var(--color-gray-600)] mt-2">
                Благодарим ви, че сте част от нашето пътуване
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
