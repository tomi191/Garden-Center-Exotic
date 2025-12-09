"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-[var(--color-background)]">
      {/* Organic Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[50%] h-[70%] bg-[var(--color-primary-light)]/40 rounded-bl-[10rem] blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[50%] bg-[var(--color-secondary-light)]/30 rounded-tr-[12rem] blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 max-w-2xl"
          >
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge variant="glass" className="backdrop-blur-md border-[var(--color-primary)]/20 text-[var(--color-primary-dark)] px-4 py-2 rounded-full">
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Сезонен внос от Холандия
                </span>
              </Badge>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-[var(--color-primary-dark)]">
                Природата, <br />
                <span className="italic text-[var(--color-secondary)]">избрана</span> за теб.
              </h1>
              <p className="text-lg md:text-xl text-[var(--color-gray-600)] leading-relaxed max-w-lg">
                Пренасяме екзотиката от Колумбия, Еквадор и Холандия директно във вашия дом или бизнес. Качество без компромис от 1998 г.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/produkti">
                <Button size="lg" className="rounded-full px-8 text-lg shadow-xl shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/30 transition-all hover:-translate-y-1">
                  Разгледай Каталога
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/kontakti">
                <Button variant="outline" size="lg" className="rounded-full px-8 text-lg border-2 hover:bg-[var(--color-primary-light)]/50">
                  Свържи се с нас
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-[var(--color-gray-200)] flex flex-wrap gap-8 text-sm font-medium text-[var(--color-gray-500)]">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[var(--color-secondary)]" />
                <span>Директен внос</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-[var(--color-secondary)]" />
                <span>Свежест гарантирана</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:h-[700px] flex items-center justify-center"
          >
            {/* Main Image with Organic Shape */}
            <div className="relative w-full h-[500px] lg:h-[650px] rounded-[3rem] overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700 ease-out">
              <div className="absolute inset-0 bg-black/10 z-10" /> {/* Overlay */}
              <img
                src="/images/garden.jpg"
                alt="Градински Център Екзотик"
                className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-[2s]"
              />
              
              {/* Floating Glass Card - Stats */}
              <div className="absolute -bottom-6 -left-6 z-20">
                 <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
                   <div className="flex items-center gap-6 divide-x divide-gray-200/50">
                     <div className="text-center px-2">
                       <span className="block font-serif text-3xl font-bold text-[var(--color-primary)]">27+</span>
                       <span className="text-xs uppercase tracking-wider text-[var(--color-gray-500)]">Години опит</span>
                     </div>
                     <div className="text-center px-4">
                        <span className="block font-serif text-3xl font-bold text-[var(--color-primary)]">100%</span>
                        <span className="text-xs uppercase tracking-wider text-[var(--color-gray-500)]">Свежест</span>
                     </div>
                   </div>
                 </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[var(--color-secondary)]/10 rounded-full blur-2xl animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}