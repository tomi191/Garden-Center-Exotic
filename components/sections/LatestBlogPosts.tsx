"use client";

import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight, Leaf } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const blogPosts = [
  {
    title: "Пролетни цветя за градината: Кога и как да засадим",
    excerpt: "Подготовката за пролетта започва още през зимата. Научете кои цветя да засадите и кога...",
    date: "2025-03-01",
    category: "Сезонни съвети",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800&auto=format&fit=crop",
    readTime: "5 мин",
  },
  {
    title: "Грижи за розите през лятото",
    excerpt: "Розите са кралици на градината, но изискват специфични грижи през горещите месеци...",
    date: "2025-06-15",
    category: "Грижи",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    readTime: "4 мин",
  },
  {
    title: "10-те най-лесни за отглеждане стайни растения",
    excerpt: "Ако сте начинаещ, тези растения са перфектни за начало. Издържливи и красиви...",
    date: "2025-02-20",
    category: "Начинаещи",
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?q=80&w=800&auto=format&fit=crop",
    readTime: "6 мин",
  },
];

export function LatestBlogPosts() {
  return (
    <Section className="bg-[var(--color-light)] py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-full mb-4">
            <BookOpen className="w-4 h-4" />
            <span className="text-sm font-semibold">Нашият Блог</span>
          </div>
          <h2 className="mb-4">Полезни Съвети и Ръководства</h2>
          <p className="text-xl text-[var(--color-gray-600)]">
            Научете повече за грижите за растенията от нашите експерти
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 group overflow-hidden">
                <CardContent className="p-0">
                  {/* Снимка */}
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Категория badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[var(--color-primary)] text-white text-xs font-bold rounded-full shadow-lg">
                        {post.category}
                      </span>
                    </div>
                    {/* Време за четене */}
                    <div className="absolute bottom-4 right-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[var(--color-foreground)] text-xs font-semibold rounded-full">
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Съдържание */}
                  <div className="p-6">
                    {/* Дата */}
                    <div className="flex items-center gap-2 text-sm text-[var(--color-gray-500)] mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.date).toLocaleDateString("bg-BG")}</span>
                    </div>

                    {/* Заглавие */}
                    <h3 className="text-xl font-bold mb-3 text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[var(--color-gray-600)] mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Прочети повече */}
                    <div className="flex items-center gap-2 text-[var(--color-primary)] font-semibold group-hover:gap-3 transition-all">
                      <span>Прочети повече</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA към всички статии */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button href="/blog" variant="outline" size="lg" className="inline-flex items-center gap-2">
            <Leaf className="w-5 h-5" />
            Виж всички статии
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
