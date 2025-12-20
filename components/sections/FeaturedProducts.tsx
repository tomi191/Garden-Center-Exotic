"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";

interface Product {
  id: string;
  name: string;
  category: string;
  origin?: string;
  price: number;
  priceUnit?: string;
  description?: string;
  image: string;
  inStock?: boolean;
  featured?: boolean;
}

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  // Use passed products, limit to 4 for display
  const featuredProducts = products.slice(0, 4);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle scroll to update active index
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const containerWidth = scrollRef.current.offsetWidth;
      const cardWidth = Math.min(containerWidth * 0.72, 280) + 16; // 72vw or max 280px + gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, featuredProducts.length - 1));
    }
  };

  // Scroll to specific card
  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.offsetWidth;
      const cardWidth = Math.min(containerWidth * 0.72, 280) + 16;
      scrollRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <Section className="py-10 md:py-16 bg-[var(--color-background)]">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 md:mb-10 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[var(--color-secondary)] font-semibold tracking-wide uppercase text-xs mb-1 block">
              Отрязани цветя
            </span>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)]">
              Премиум качество
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/produkti">
              <Button variant="outline" size="sm" className="rounded-full border-[var(--color-gray-300)] hover:border-[var(--color-primary)] text-sm md:text-base">
                Виж целия каталог
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Product Grid - Horizontal scroll on mobile with slider */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`flex-shrink-0 w-[68vw] max-w-[280px] md:w-auto md:max-w-none snap-start ${
                  index === 0 ? 'ml-4 md:ml-0' : ''
                } ${index === featuredProducts.length - 1 ? 'mr-4 md:mr-0' : ''}`}
              >
                <ProductCard product={product} index={index} disableViewportAnimation />
              </div>
            ))}
          </div>

          {/* Slider Dots - Mobile Only */}
          <div className="flex md:hidden justify-center gap-2 mt-4">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-[var(--color-primary)] w-6"
                    : "bg-[var(--color-gray-300)]"
                }`}
                aria-label={`Продукт ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Categories Preview (Mini Banners) */}
        <div className="mt-10 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
           <Link href="/produkti/saksiyni-rasteniya">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="group relative h-[180px] md:h-[240px] rounded-2xl overflow-hidden cursor-pointer"
             >
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
               <img
                 src="https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80"
                 alt="Орхидеи и саксийни растения"
                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 md:p-8">
                 <h3 className="font-serif text-lg md:text-xl font-bold mb-1" style={{ color: '#ffffff' }}>Саксийни растения</h3>
                 <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.9)' }}>Орхидеи, кактуси, тропически растения</p>
                 <span className="text-xs font-medium" style={{ color: '#ffffff' }}>Разгледай →</span>
               </div>
             </motion.div>
           </Link>

           <Link href="/produkti/gradinski">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.4 }}
               className="group relative h-[180px] md:h-[240px] rounded-2xl overflow-hidden cursor-pointer"
             >
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
               <img
                 src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80"
                 alt="Градински растения"
                 className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               <div className="absolute inset-0 z-20 flex flex-col justify-end p-5 md:p-8">
                 <h3 className="font-serif text-lg md:text-xl font-bold mb-1" style={{ color: '#ffffff' }}>Градински растения</h3>
                 <p className="text-xs mb-2" style={{ color: 'rgba(255,255,255,0.9)' }}>Храсти, дървета, сезонни разсади</p>
                 <span className="text-xs font-medium" style={{ color: '#ffffff' }}>Разгледай →</span>
               </div>
             </motion.div>
           </Link>
        </div>
      </Container>
    </Section>
  );
}