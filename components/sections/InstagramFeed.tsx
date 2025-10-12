"use client";

import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
    likes: 245,
    comments: 18,
    caption: "Пролетни лалета вече са тук! 🌷",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop",
    likes: 312,
    comments: 24,
    caption: "Перфектни рози за перфектния момент ❤️",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=400&fit=crop",
    likes: 189,
    comments: 12,
    caption: "Нови саксийни растения в магазина",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=400&h=400&fit=crop",
    likes: 421,
    comments: 35,
    caption: "Нашата оранжерия във Варна",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=400&h=400&fit=crop",
    likes: 278,
    comments: 21,
    caption: "Свежи букети всеки ден!",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    likes: 356,
    comments: 28,
    caption: "Качество което може да усетите",
  },
];

export function InstagramFeed() {
  return (
    <Section className="bg-white py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full mb-4">
            <Instagram className="w-4 h-4" />
            <span className="text-sm font-semibold">Следете ни в Instagram</span>
          </div>
          <h2 className="mb-4">Вдъхновете се от нашата галерия</h2>
          <p className="text-base text-[var(--color-gray-600)]">
            Ежедневни снимки на нови цветя, проекти и доволни клиенти
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Снимка */}
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Overlay на hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex items-center gap-4 text-white text-sm mb-2">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-white" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </div>
                </div>
                <p className="text-white text-xs line-clamp-2">{post.caption}</p>
              </div>

              {/* Instagram badge */}
              <div className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Instagram className="w-4 h-4 text-purple-600" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <a
            href="https://instagram.com/gardenexotic"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="primary"
              size="lg"
              className="inline-flex items-center gap-2"
            >
              <Instagram className="w-5 h-5" />
              Последвайте ни в Instagram
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
          <p className="mt-4 text-sm text-[var(--color-gray-500)]">
            @gardenexotic - Ежедневни актуализации и специални оферти
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}
