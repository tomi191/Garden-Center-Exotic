"use client";

import React from "react";
import { motion } from "framer-motion";

export function BotanicalBranding() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* 
        BOTANICAL OVERLAY
        Uses SVG shapes to create a branded frame of leaves.
        Opacity is kept low so it doesn't interfere with reading.
      */}

      {/* Top Right - Large Monstera Leaf */}
      <motion.div 
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, 2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 w-[400px] h-[400px] opacity-[0.06] text-[var(--color-primary)]"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
           <path d="M12,22c4.97,0,9-4.03,9-9c0-4.97-9-13-9-13S3,8.03,3,13C3,17.97,7.03,22,12,22z M7.5,10.5 c0-0.83,0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5S9.83,12,9,12S7.5,11.33,7.5,10.5z M13.5,14.5c0-0.83,0.67-1.5,1.5-1.5 s1.5,0.67,1.5,1.5S15.83,16,15,16S13.5,15.33,13.5,14.5z M12,6c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S10.9,6,12,6z"/>
           {/* Abstract Monstera Shape */}
           <path d="M17.45,6.01C17.45,6.01,10.66,0.3,10.66,0.3C10.15,-0.08,9.45,-0.1,8.92,0.25C4.33,3.31,1.13,8.44,1.13,14.33 C1.13,22.06,7.4,28.33,15.13,28.33c4.15,0,7.88-1.81,10.43-4.69c0.4-0.45,0.36-1.15-0.1-1.55l-0.66-0.58 c-0.45-0.39-1.12-0.34-1.51,0.11c-2.02,2.29-4.96,3.72-8.22,3.72c-5.83,0-10.62-4.52-11.02-10.25l5.59-4.82 c0.67-0.58,0.75-1.58,0.17-2.25L9.13,8.74C8.55,8.07,7.55,7.99,6.88,8.57L2.46,12.38c0.07-4.24,2.39-7.94,5.84-10.02 c2.62-1.58,5.7-2.04,8.59-1.28L17.45,6.01z" fill="currentColor"/>
        </svg>
      </motion.div>

      {/* Bottom Left - Palm Leaf */}
      <motion.div 
        initial={{ rotate: 0 }}
        animate={{ rotate: [0, -3, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-24 -left-20 w-[500px] h-[500px] opacity-[0.04] text-[var(--color-secondary)]"
      >
        <svg viewBox="0 0 512 512" fill="currentColor" className="w-full h-full">
           <path d="M256,0C114.6,0,0,114.6,0,256s114.6,256,256,256s256-114.6,256-256S397.4,0,256,0z M256,464 c-114.7,0-208-93.3-208-208S141.3,48,256,48s208,93.3,208,208S370.7,464,256,464z M256,96c-88.4,0-160,71.6-160,160h32 c0-70.7,57.3-128,128-128V96z M256,160c-53,0-96,43-96,96h32c0-35.3,28.7-64,64-64V160z"/>
           {/* Stylized Palm */}
           <path d="M433.2,166.5c-20.4-38.3-52.6-68.9-91.8-87.8c-7.4-3.6-15.6,1.9-15.6,10.2v334.3c0,4.6,3.7,8.3,8.3,8.3 c1.5,0,3-0.4,4.3-1.2c56.7-34.9,94.9-97,94.9-167.9C433.3,228.6,433.3,197.3,433.2,166.5z"/>
           <path d="M304.7,83.9c-4.4,0-8,3.6-8,8v314.9c0,5.7,5.9,9.4,11,6.9c25.5-12.7,48.5-30.8,67.6-53.1V102.5 C353.5,90.6,329.8,83.9,304.7,83.9z"/>
        </svg>
      </motion.div>

      {/* Floating Petal Particles (Subtle) */}
      <div className="absolute top-1/4 left-10 w-4 h-4 rounded-full bg-[var(--color-secondary)] opacity-20 blur-[1px]" />
      <div className="absolute bottom-1/3 right-20 w-3 h-3 rounded-full bg-[var(--color-primary)] opacity-10 blur-[2px]" />
    </div>
  );
}