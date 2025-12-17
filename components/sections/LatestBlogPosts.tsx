"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight, Clock } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const blogPosts = [
  {
    title: "Пролетни цветя за градината: Пълен наръчник",
    excerpt: "Подготовката за пролетта започва още през зимата. Научете кои цветя да засадите сега за цъфтяща градина.",
    date: "2025-03-01",
    category: "Съвети",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800&auto=format&fit=crop",
    readTime: "5 мин",
  },
  {
    title: "Как да запазим розите свежи по-дълго",
    excerpt: "Професионални трикове от нашите флористи за удължаване живота на рязания цвят у дома.",
    date: "2025-06-15",
    category: "Грижи",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    readTime: "4 мин",
  },
  {
    title: "ТОП 5 растения за пречистване на въздуха",
    excerpt: "Класация на най-ефективните стайни растения, които подобряват качеството на въздуха в офиса.",
    date: "2025-02-20",
    category: "Интериор",
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?q=80&w=800&auto=format&fit=crop",
    readTime: "6 мин",
  },
];

export function LatestBlogPosts() {
  return (
    <Section className="bg-[var(--color-light)] py-12 md:py-24">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-16 gap-4 md:gap-6">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
             <span className="text-[var(--color-secondary)] font-bold tracking-widest uppercase text-xs md:text-sm mb-1 md:mb-2 block">
               Блог & Съвети
             </span>
             <h2 className="font-serif text-2xl sm:text-3xl md:text-5xl font-bold text-[var(--color-primary-dark)]">
               Актуално от Екзотик
             </h2>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
             <Link href="/blog">
               <Button variant="outline" size="sm" className="border-gray-300 hover:border-[var(--color-primary)] text-sm">
                 Всички статии <ArrowRight className="ml-2 w-4 h-4" />
               </Button>
             </Link>
           </motion.div>
        </div>

        {/* Horizontal scroll on mobile */}
        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer flex-shrink-0 w-[280px] md:w-auto snap-center"
            >
              <div className="relative h-48 md:h-64 rounded-2xl md:rounded-[2rem] overflow-hidden mb-4 md:mb-6 shadow-md group-hover:shadow-xl transition-all duration-300">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/90 backdrop-blur-md px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">
                  {post.category}
                </div>
              </div>

              <div className="space-y-2 md:space-y-3 px-1 md:px-2">
                <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs font-medium text-[var(--color-gray-500)]">
                  <span className="flex items-center gap-1">
                     <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />
                     {new Date(post.date).toLocaleDateString("bg-BG")}
                  </span>
                  <span className="flex items-center gap-1">
                     <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                     {post.readTime} четене
                  </span>
                </div>

                <h3 className="font-serif text-lg md:text-xl font-bold leading-tight group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs md:text-sm text-[var(--color-gray-600)] line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="pt-1 md:pt-2">
                  <span className="text-xs md:text-sm font-bold underline decoration-2 underline-offset-4 decoration-[var(--color-secondary)]/30 group-hover:decoration-[var(--color-secondary)] transition-all">
                    Прочети цялата статия
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}