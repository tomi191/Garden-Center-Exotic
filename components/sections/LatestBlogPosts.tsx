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
    <Section className="bg-[var(--color-light)] py-24">
      <Container>
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
           <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
             <span className="text-[var(--color-secondary)] font-bold tracking-widest uppercase text-sm mb-2 block">
               Блог & Съвети
             </span>
             <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)]">
               Актуално от Екзотик
             </h2>
           </motion.div>
           
           <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
           >
             <Link href="/blog">
               <Button variant="outline" className="border-gray-300 hover:border-[var(--color-primary)]">
                 Всички статии <ArrowRight className="ml-2 w-4 h-4" />
               </Button>
             </Link>
           </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6 shadow-md group-hover:shadow-xl transition-all duration-300">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">
                  {post.category}
                </div>
              </div>

              <div className="space-y-3 px-2">
                <div className="flex items-center gap-4 text-xs font-medium text-[var(--color-gray-500)]">
                  <span className="flex items-center gap-1">
                     <Calendar className="w-3.5 h-3.5" />
                     {new Date(post.date).toLocaleDateString("bg-BG")}
                  </span>
                  <span className="flex items-center gap-1">
                     <Clock className="w-3.5 h-3.5" />
                     {post.readTime} четене
                  </span>
                </div>
                
                <h3 className="font-serif text-xl font-bold leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-sm text-[var(--color-gray-600)] line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="pt-2">
                  <span className="text-sm font-bold underline decoration-2 underline-offset-4 decoration-[var(--color-secondary)]/30 group-hover:decoration-[var(--color-secondary)] transition-all">
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