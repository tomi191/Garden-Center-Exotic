"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/data/products";

export function FeaturedProducts() {
  // Select top 4 featured products
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  return (
    <Section className="py-24 bg-[var(--color-background)]">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[var(--color-secondary)] font-bold tracking-widest uppercase text-sm mb-2 block">
              Избрана селекция
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)]">
              Топ Предложения
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/produkti">
              <Button variant="outline" className="rounded-full border-[var(--color-gray-300)] hover:border-[var(--color-primary)]">
                Виж целия каталог
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* Categories Preview (Mini Banners) */}
        <div className="mt-24 grid md:grid-cols-2 gap-8">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="group relative h-[300px] rounded-[2rem] overflow-hidden cursor-pointer"
           >
             <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10" />
             <img 
               src="https://images.unsplash.com/photo-1542359649-31e03cd4d909?q=80&w=2000&auto=format&fit=crop" 
               alt="Интериорно озеленяване"
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
             />
             <div className="absolute inset-0 z-20 flex flex-col justify-end p-10">
               <h3 className="font-serif text-3xl font-bold text-white mb-2">За Дома & Офиса</h3>
               <p className="text-white/90 mb-4">Интериорни решения за уют и свежест</p>
               <span className="text-white font-bold underline decoration-[var(--color-secondary)] underline-offset-4 decoration-2">Разгледай колекцията</span>
             </div>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4 }}
             className="group relative h-[300px] rounded-[2rem] overflow-hidden cursor-pointer"
           >
             <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors z-10" />
             <img 
               src="https://images.unsplash.com/photo-1591189863430-ab87e120f312?q=80&w=2000&auto=format&fit=crop" 
               alt="Градински решения"
               className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
             />
             <div className="absolute inset-0 z-20 flex flex-col justify-end p-10">
               <h3 className="font-serif text-3xl font-bold text-white mb-2">За Градината</h3>
               <p className="text-white/90 mb-4">Храсти, дървета и сезонни цветя</p>
               <span className="text-white font-bold underline decoration-[var(--color-secondary)] underline-offset-4 decoration-2">Разгледай колекцията</span>
             </div>
           </motion.div>
        </div>
      </Container>
    </Section>
  );
}