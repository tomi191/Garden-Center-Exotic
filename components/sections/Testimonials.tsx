"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";

const testimonials = [
  {
    id: "1",
    name: "Мария Петрова",
    location: "Варна",
    text: "Винаги поръчвам цветя от Екзотик за специални поводи. Качеството е изключително - цветята стоят свежи повече от две седмици!",
    role: "Редовен клиент",
  },
  {
    id: "2",
    name: "Иван Георгиев",
    location: "София",
    text: "Работим с Градински Център Екзотик за озеленяването на нашия офис. Професионализмът и качеството на растенията са на най-високо ниво.",
    role: "IT Solutions CEO",
  },
  {
    id: "3",
    name: "Елена Димитрова",
    location: "Бургас",
    text: "Поръчах букет рози за рождения ден на съпругата ми. Бяха абсолютно зашеметяващи! Доставката беше бърза.",
    role: "Клиент",
  },
];

export function Testimonials() {
  return (
    <Section className="py-24 bg-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--color-primary-light)]/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--color-secondary-light)]/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <Container className="relative z-10">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl font-bold mb-4">Доверие, изградено с години</h2>
          <p className="text-[var(--color-gray-600)] text-lg">
            Гордеем се с хилядите усмивки, които сме доставили. Ето какво казват някои от нашите клиенти.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[var(--color-background)] rounded-[2rem] p-8 relative hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-[var(--color-gray-100)]"
            >
              <Quote className="w-10 h-10 text-[var(--color-primary)]/10 absolute top-8 right-8" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-[var(--color-gray-700)] leading-relaxed mb-6 italic relative z-10">
                &quot;{testimonial.text}&quot;
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-[var(--color-gray-200)]/50">
                <div className="w-10 h-10 bg-[var(--color-primary-dark)] text-white rounded-full flex items-center justify-center font-bold font-serif">
                   {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-[var(--color-foreground)] text-sm">{testimonial.name}</div>
                  <div className="text-xs text-[var(--color-gray-500)]">{testimonial.role} • {testimonial.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}