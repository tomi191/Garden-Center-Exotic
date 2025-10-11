"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;
  customerType: "b2c" | "b2b";
  company?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Мария Петрова",
    location: "Варна",
    rating: 5,
    text: "Винаги поръчвам цветя от Екзотик за специални поводи. Качеството е изключително - цветята стоят свежи повече от две седмици! Персоналът е много любезен и винаги помага с избора.",
    date: "2025-09-15",
    customerType: "b2c",
  },
  {
    id: "2",
    name: "Иван Георгиев",
    location: "София",
    rating: 5,
    text: "Работим с Градински Център Екзотик за озеленяването на нашия офис. Професионализмът и качеството на растенията са на най-високо ниво. Абонаментната доставка е точна и надеждна.",
    date: "2025-08-22",
    customerType: "b2b",
    company: "IT Solutions ЕООД",
  },
  {
    id: "3",
    name: "Елена Димитрова",
    location: "Бургас",
    rating: 5,
    text: "Поръчах букет рози за рождения ден на съпругата ми. Бяха абсолютно зашеметяващи! Доставката беше бърза, а цветята прекрасно опаковани. Благодаря!",
    date: "2025-09-01",
    customerType: "b2c",
  },
  {
    id: "4",
    name: "Петър Стоянов",
    location: "Варна",
    rating: 5,
    text: "Като собственик на ресторант, разчитам на Екзотик за свежи цветя всяка седмица. Студената верига наистина работи - цветята винаги пристигат в перфектно състояние.",
    date: "2025-08-10",
    customerType: "b2b",
    company: "Ресторант 'Морски Бриз'",
  },
  {
    id: "5",
    name: "Ани Колева",
    location: "Стара Загора",
    rating: 5,
    text: "Купих няколко саксийни растения за дома. QR кодовете с инструкции за грижи са страхотна идея! Сега знам точно как да се грижа за всяко растение.",
    date: "2025-07-28",
    customerType: "b2c",
  },
  {
    id: "6",
    name: "Христо Иванов",
    location: "Нова Загора",
    rating: 5,
    text: "Нашият хотел работи с Екзотик от две години. Отличното качество и персоналното отношение са причината да продължаваме партньорството. Препоръчваме топло!",
    date: "2025-07-15",
    customerType: "b2b",
    company: "Хотел 'Загора'",
  },
];

export function Testimonials() {
  return (
    <Section className="bg-[var(--color-light)] py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4">Какво казват нашите клиенти</h2>
          <p className="text-xl text-[var(--color-gray-600)]">
            Вашето доверие е най-голямата ни награда
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white hover:shadow-xl transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="w-10 h-10 text-[var(--color-primary)]/20" />
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonial.rating
                            ? "fill-[var(--color-accent)] text-[var(--color-accent)]"
                            : "text-[var(--color-gray-300)]"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-[var(--color-gray-700)] mb-6 flex-grow leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="border-t border-[var(--color-gray-200)] pt-4">
                    <p className="font-bold text-[var(--color-foreground)]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-[var(--color-gray-600)]">
                      {testimonial.company ? testimonial.company : testimonial.location}
                    </p>
                    {testimonial.customerType === "b2b" && (
                      <span className="inline-block mt-2 px-3 py-1 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-xs font-semibold rounded-full">
                        B2B Партньор
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-[var(--color-gray-600)]">
            Присъединете се към стотици доволни клиенти
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
