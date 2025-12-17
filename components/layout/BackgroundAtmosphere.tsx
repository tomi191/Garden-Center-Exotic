"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function BackgroundAtmosphere() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  // Opacity Transforms for 3 Stages
  // Stage 1: Market/Entrance (Starts visible, fades out by 45%)
  const opacity1 = useTransform(scrollYProgress, [0, 0.35, 0.45], [1, 1, 0]);
  
  // Stage 2: Garden/Greenery (Fades in at 35%, visible till 75%)
  const opacity2 = useTransform(scrollYProgress, [0.35, 0.45, 0.65, 0.75], [0, 1, 1, 0]);
  
  // Stage 3: Floral/Details (Fades in at 65%, stays visible)
  const opacity3 = useTransform(scrollYProgress, [0.65, 0.75, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none h-screen w-screen bg-[var(--color-background)]">
      
      {/* --- SCENE 1: THE MARKET (TOP) --- */}
      <motion.div style={{ opacity: opacity1 }} className="absolute inset-0">
         <div className="absolute inset-0 opacity-[0.06] grayscale-[20%] animate-slide-slow will-change-transform">
            <div className="flex w-[200%] h-full">
              {[1, 2].map((i) => (
                <div key={i} className="flex w-1/2 h-full shrink-0">
                    <div className="w-1/2 h-full relative overflow-hidden">
                        <img src="/images/backgrounds/store-bg.jpg" className="w-full h-full object-cover blur-[4px] scale-110" alt="" />
                    </div>
                    <div className="w-1/2 h-full relative overflow-hidden">
                        <img src="/images/backgrounds/hero-bg.jpg" className="w-full h-full object-cover blur-[4px] scale-110" alt="" />
                    </div>
                </div>
              ))}
            </div>
         </div>
      </motion.div>

      {/* --- SCENE 2: THE GARDEN (MIDDLE) --- */}
      <motion.div style={{ opacity: opacity2 }} className="absolute inset-0">
         <div className="absolute inset-0 opacity-[0.06] grayscale-[10%] animate-slide-slow-reverse will-change-transform">
            <div className="flex w-[200%] h-full">
              {[1, 2].map((i) => (
                <div key={i} className="flex w-1/2 h-full shrink-0">
                    <div className="w-1/2 h-full relative overflow-hidden">
                        <img src="/images/garden.jpg" className="w-full h-full object-cover blur-[4px] scale-110" alt="" />
                    </div>
                    <div className="w-1/2 h-full relative overflow-hidden">
                        <img src="/images/backgrounds/contact-bg.jpg" className="w-full h-full object-cover blur-[4px] scale-110" alt="" />
                    </div>
                </div>
              ))}
            </div>
         </div>
      </motion.div>

      {/* --- SCENE 3: FLORAL BLOOM (BOTTOM) --- */}
      <motion.div style={{ opacity: opacity3 }} className="absolute inset-0">
         <div className="absolute inset-0 opacity-[0.06] grayscale-[0%] animate-slide-slow will-change-transform">
            <div className="flex w-[200%] h-full">
              {[1, 2].map((i) => (
                <div key={i} className="flex w-1/2 h-full shrink-0">
                    <div className="w-1/2 h-full relative overflow-hidden">
                        <img src="/images/backgrounds/florist-flowers-flower-shop-5905133.png" className="w-full h-full object-cover blur-[4px] scale-110" alt="" />
                    </div>
                    <div className="w-1/2 h-full relative overflow-hidden">
                        <img src="/images/backgrounds/about-bg.jpg" className="w-full h-full object-cover blur-[4px] scale-110" alt="" />
                    </div>
                </div>
              ))}
            </div>
         </div>
      </motion.div>

      {/* --- GLOBAL OVERLAYS --- */}
      
      {/* 1. Grain Texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      {/* 2. Warm Wash Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-background)]/90 via-[var(--color-background)]/85 to-[var(--color-background)]/90" />
      
      {/* 3. Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.03)_100%)]" />
    </div>
  );
}