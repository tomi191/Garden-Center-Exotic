"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Snowflake, Star, Phone, ChevronDown, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { LOCATIONS, SITE_CONFIG } from "@/lib/constants";

const backgroundImages = [
  "/images/flowers/pexels-dimitri-kuliuk-1488310-scaled.jpg",
  "/images/flowers/roses-vase-flowers-1867911.jpg",
  "/images/flowers/hd-wallpaper-nature-wallpaper-flowers-3655451.jpg",
  "/images/backgrounds/store-bg.jpg",
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 100, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Full-screen Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={backgroundImages[currentSlide]}
            alt="Градински Център Екзотик - екзотични цветя"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/20 via-black/10 to-black/30" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[var(--color-primary)]/20 rounded-full blur-3xl z-[1]" />
      <div className="absolute bottom-40 right-10 w-40 h-40 bg-[var(--color-secondary)]/20 rounded-full blur-3xl z-[1]" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto border border-white/30 rounded-3xl p-8 backdrop-blur-sm"
        >
          {/* Top Badges */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center gap-3 flex-wrap mb-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-white text-sm font-medium">{SITE_CONFIG.rating}/5 ({SITE_CONFIG.reviewCount}+ отзива)</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Snowflake className="w-4 h-4 text-cyan-300" />
              <span className="text-white text-sm font-medium">Студена верига</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <Clock className="w-4 h-4 text-green-300" />
              <span className="text-white text-sm font-medium">{SITE_CONFIG.yearsInBusiness}+ години опит</span>
            </div>
          </motion.div>

          {/* Main Headline - Static for SEO */}
          <div className="mb-6">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-4 [text-shadow:_1px_1px_4px_rgb(0_0_0_/_40%)]" style={{ color: '#ffffff' }}>
              Директен внос на
              <br />
              <span className="italic [text-shadow:_1px_1px_4px_rgb(0_0_0_/_40%)]" style={{ color: '#ffffff' }}>
                екзотични цветя
              </span>
            </h1>
            <p style={{ color: '#ffffff' }} className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed [text-shadow:_1px_1px_3px_rgb(0_0_0_/_40%)]">
              Премиум рози от Еквадор, орхидеи и тропически растения с гарантирана свежест
            </p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <Link href="/produkti">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full px-8 py-4 text-lg shadow-2xl shadow-[var(--color-primary)]/30 hover:shadow-[var(--color-primary)]/50 transition-all hover:-translate-y-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]"
              >
                Разгледай Каталога
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href={`tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`}>
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto rounded-full px-8 py-4 text-lg border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm"
              >
                <Phone className="w-5 h-5 mr-2" />
                Обади се сега
              </Button>
            </a>
          </motion.div>

          {/* Trust Indicators - Country Flags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-6 md:gap-10 text-white"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/30 shadow-md">
                <img src="https://flagcdn.com/w80/ec.png" alt="Ecuador" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-medium">Еквадор</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/30 shadow-md">
                <img src="https://flagcdn.com/w80/nl.png" alt="Netherlands" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-medium">Холандия</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/30 shadow-md">
                <img src="https://flagcdn.com/w80/tr.png" alt="Turkey" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-medium">Турция</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/30 shadow-md">
                <img src="https://flagcdn.com/w80/bg.png" alt="Bulgaria" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-medium">България</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-32 sm:bottom-28 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-10 h-3 bg-white"
                : "w-3 h-3 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Слайд ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
      >
        <span className="text-xs uppercase tracking-widest">Разгледай</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.button>

      {/* Location Badge - Bottom Left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="hidden lg:flex absolute bottom-8 left-8 z-20 items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20"
      >
        <MapPin className="w-5 h-5 text-[var(--color-secondary-light)]" />
        <div>
          <p className="text-xs" style={{ color: '#ffffff' }}>Два магазина</p>
          <p className="text-sm font-semibold" style={{ color: '#ffffff' }}>Варна & Нова Загора</p>
        </div>
      </motion.div>

    </section>
  );
}
