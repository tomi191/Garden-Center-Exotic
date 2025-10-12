"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sprout, Flower2, Flower, Trees } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const iconMap = {
  Sprout,
  Flower2,
  Flower,
  Trees,
};

const categories = [
  {
    title: "Саксийни Растения",
    description: "Стайни и външни растения за вашия дом и градина",
    icon: "Sprout",
    href: "/produkti/saksiyni-rasteniya",
    gradient: "from-emerald-500 to-green-600",
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Рязан Цвят",
    description: "Свежи цветя първо качество от цял свят",
    icon: "Flower2",
    href: "/produkti/ryazan-tsvyat",
    gradient: "from-pink-500 to-rose-600",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Сезонни Цветя",
    description: "Пролетни, лятни, есенни и зимни специалитети",
    icon: "Flower",
    href: "/produkti/sezonni-tsvetya",
    gradient: "from-amber-500 to-orange-600",
    image: "https://images.unsplash.com/photo-1464860810323-37a8ea6012e7?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Храсти и Дървета",
    description: "Декоративни растения за градинско озеленяване",
    icon: "Trees",
    href: "/produkti/hrasti-darveta",
    gradient: "from-teal-500 to-cyan-600",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070&auto=format&fit=crop",
  },
];

export function FeaturedProducts() {
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
          <h2 className="mb-4">Нашите Продукти</h2>
          <p className="text-base text-[var(--color-gray-600)] mx-auto">
            Разнообразие от висококачествени растения и цветя за всеки вкус и нужда
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={category.href} className="group block">
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                    {/* Image Area */}
                    <div className="h-48 relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <IconComponent className="w-16 h-16 text-white drop-shadow-lg" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-[var(--color-gray-600)] text-sm mb-4 leading-relaxed">
                        {category.description}
                      </p>
                      <div className="flex items-center gap-2 text-[var(--color-primary)] font-semibold text-sm group-hover:gap-3 transition-all">
                        Разгледай
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link href="/produkti">
            <Button size="lg" variant="outline">
              Всички Продукти
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}
