"use client";

import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BeholdWidget } from "@behold/react";

// Behold Feed ID - Replace with your actual feed ID from behold.so
// Get your free feed at: https://behold.so
const BEHOLD_FEED_ID = process.env.NEXT_PUBLIC_BEHOLD_FEED_ID || "";

// Fallback images when Behold is not configured
const fallbackImages = [
  "/images/instagram/post-1.png",
  "/images/instagram/post-2.png",
  "/images/instagram/post-3.png",
  "/images/instagram/post-4.png",
  "/images/instagram/post-5.png",
  "/images/instagram/post-6.png",
];

export function InstagramFeed() {
  const hasBehold = BEHOLD_FEED_ID && BEHOLD_FEED_ID.length > 0;

  return (
    <Section className="py-10 md:py-16 overflow-hidden bg-[var(--color-background)]">
      <Container>
        <div className="flex flex-col items-center text-center mb-6 md:mb-8 px-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-2 md:mb-3 shadow-lg shadow-purple-500/20">
            <Instagram className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <h2 className="font-serif text-xl md:text-2xl font-bold mb-1">@gardencentarexotic</h2>
          <p className="text-[var(--color-gray-600)] text-xs md:text-sm mb-4 md:mb-5">
            Следете ни за ежедневна доза вдъхновение
          </p>

          <a href="https://www.instagram.com/gardencentarexotic" target="_blank" rel="noreferrer">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full px-6 md:px-8 border-gray-300 hover:border-purple-500 hover:text-purple-600 text-sm md:text-base"
            >
              Последвай ни
            </Button>
          </a>
        </div>
      </Container>

      {/* Instagram Feed */}
      <div className="w-full overflow-hidden px-1 md:px-4">
        {hasBehold ? (
          // Real Instagram feed from Behold
          <BeholdWidget feedId={BEHOLD_FEED_ID} />
        ) : (
          // Fallback to static images
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-1 md:gap-4">
            {fallbackImages.map((src, i) => (
              <motion.a
                key={i}
                href="https://www.instagram.com/gardencentarexotic"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="aspect-square relative group overflow-hidden rounded-lg md:rounded-2xl cursor-pointer"
              >
                <img
                  src={src}
                  alt="Instagram Post"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-lg" />
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
