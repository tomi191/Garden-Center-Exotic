"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

        {/* Product Grid - Horizontal scroll on mobile */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="flex-shrink-0 w-[280px] md:w-auto snap-center">
              <ProductCard product={product} index={index} />
            </div>
          ))}
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