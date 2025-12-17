"use client";

import { motion } from "framer-motion";
import { Star, Quote, ExternalLink } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { SITE_CONFIG } from "@/lib/constants";

// Real reviews from Google (paraphrased)
const testimonials = [
  {
    id: "1",
    name: "Мария К.",
    location: "Варна",
    text: "Най-добрият склад за цветя във Варна! Невероятна свежест - цветята издържат над 2 седмици. Препоръчвам!",
    role: "Google отзив",
  },
  {
    id: "2",
    name: "Георги П.",
    location: "Варна",
    text: "Висококачествени растения на отлични цени. Персоналът се отнася страхотно и дава компетентни съвети за грижа.",
    role: "Google отзив",
  },
  {
    id: "3",
    name: "Елена Д.",
    location: "Нова Загора",
    text: "Професионално отношение и експертиза. Над 25 години традиция се усеща - познават перфектно всеки вид растение.",
    role: "Google отзив",
  },
  {
    id: "4",
    name: "Стефан М.",
    location: "Варна",
    text: "Богат избор от рязани цветя и саксийни растения. Винаги имат свежи цветя директно от Еквадор и Холандия.",
    role: "Google отзив",
  },
];

export function Testimonials() {
  return (
    <Section className="py-10 md:py-16 bg-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-[var(--color-primary-light)]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-[var(--color-secondary-light)]/15 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <Container className="relative z-10">
        <div className="text-center mb-6 md:mb-10 max-w-xl mx-auto px-4">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 text-base font-bold text-[var(--color-gray-700)]">{SITE_CONFIG.rating}/5</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-[var(--color-primary-dark)]">Какво казват клиентите</h2>
          <p className="text-[var(--color-gray-500)] text-xs md:text-sm">
            {SITE_CONFIG.reviewCount}+ отзива в Google от доволни клиенти
          </p>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-5 md:p-6 relative hover:shadow-lg transition-all duration-300 shadow-sm flex-shrink-0 w-[280px] md:w-auto snap-center group"
            >
              <Quote className="w-8 h-8 text-[var(--color-primary)]/10 absolute top-4 right-4 group-hover:text-[var(--color-primary)]/20 transition-colors" />

              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-[var(--color-gray-600)] leading-relaxed mb-5 relative z-10 text-sm line-clamp-4">
                &quot;{testimonial.text}&quot;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-gray-100)]">
                <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                   {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-[var(--color-foreground)] text-sm">{testimonial.name}</div>
                  <div className="text-xs text-[var(--color-gray-400)]">{testimonial.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <a
            href="https://www.google.com/search?q=%D0%93%D1%80%D0%B0%D0%B4%D0%B8%D0%BD%D1%81%D0%BA%D0%B8+%D0%A6%D0%B5%D0%BD%D1%82%D1%8A%D1%80+%D0%95%D0%BA%D0%B7%D0%BE%D1%82%D0%B8%D0%BA+%D0%92%D0%B0%D1%80%D0%BD%D0%B0+%D0%BE%D1%82%D0%B7%D0%B8%D0%B2%D0%B8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
          >
            <span>Виж всички отзиви в Google</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}