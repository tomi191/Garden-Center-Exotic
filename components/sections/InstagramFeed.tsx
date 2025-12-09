"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const images = [
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
];

export function InstagramFeed() {
  return (
    <Section className="py-24 overflow-hidden bg-[var(--color-background)]">
      <Container>
        <div className="flex flex-col items-center text-center mb-12">
           <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-purple-500/20">
              <Instagram className="w-6 h-6" />
           </div>
           <h2 className="font-serif text-3xl font-bold mb-2">@GardenExotic</h2>
           <p className="text-[var(--color-gray-600)] mb-8">Следете ни за ежедневна доза вдъхновение</p>
           
           <a href="https://instagram.com" target="_blank" rel="noreferrer">
             <Button variant="outline" className="rounded-full px-8 border-gray-300 hover:border-purple-500 hover:text-purple-600">
               Последвай ни
             </Button>
           </a>
        </div>
      </Container>

      {/* Infinite Scroll / Grid */}
      <div className="w-full overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 px-2 md:px-4">
           {images.map((src, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="aspect-square relative group overflow-hidden rounded-2xl cursor-pointer"
             >
               <img src={src} alt="Instagram Post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
               <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white drop-shadow-lg" />
               </div>
             </motion.div>
           ))}
        </div>
      </div>
    </Section>
  );
}