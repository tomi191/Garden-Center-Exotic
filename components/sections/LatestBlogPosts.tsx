"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, Calendar, ArrowRight, Clock } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  reading_time: number;
  published_at: string | null;
  created_at: string;
}

export function LatestBlogPosts({ initialPosts }: { initialPosts?: BlogPost[] }) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts || []);

  useEffect(() => {
    // Only fetch client-side if no initial posts provided (SSR fallback)
    if (initialPosts && initialPosts.length > 0) return;

    fetch("/api/blog?status=published")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPosts(data.slice(0, 3));
        }
      })
      .catch(() => {});
  }, [initialPosts]);

  if (posts.length === 0) {
    return null;
  }

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

        <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer flex-shrink-0 w-[280px] md:w-auto snap-center"
            >
              <Link href={`/blog/${post.slug}`}>
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
                       {new Date(post.published_at || post.created_at).toLocaleDateString("bg-BG")}
                    </span>
                    <span className="flex items-center gap-1">
                       <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                       {post.reading_time} мин четене
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
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
