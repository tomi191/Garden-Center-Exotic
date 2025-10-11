"use client";

import { motion } from "framer-motion";
import { ArrowRight, Globe, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-light)] via-white to-[var(--color-primary-light)]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-[var(--color-accent)]/10 to-[var(--color-primary)]/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-[var(--color-secondary)]/10 to-[var(--color-accent)]/10 rounded-full blur-3xl"
        />
      </div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-140px)] py-20 relative z-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Badge variant="gradient" pulse className="text-sm shadow-xl">
                <Sparkles className="w-4 h-4" />
                От 1998 година - 27 години опит
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
              >
                Градински Център{" "}
                <span className="gradient-text">Екзотик</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl md:text-2xl text-[var(--color-gray-600)] leading-relaxed"
              >
                Висококачествени цветя{" "}
                <span className="font-bold text-[var(--color-primary)]">първо качество</span>{" "}
                от водещи световни производители
              </motion.p>
            </div>

            {/* Countries */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap items-center gap-3 py-6 px-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/60 shadow-lg"
            >
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center shadow-lg">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div className="text-base text-[var(--color-gray-700)] font-medium flex-1">
                Колумбия • Кения • Гърция • Нидерландия • Турция • България
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center gap-4 pt-4"
            >
              <Link href="/produkti">
                <Button size="lg" variant="accent" className="shadow-2xl">
                  Разгледай Продуктите
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/za-nas">
                <Button size="lg" variant="outline">
                  Научи Повече
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[600px] hidden lg:block"
            style={{ perspective: "1000px" }}
          >
            {/* Main Image Container */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/garden.jpg"
                alt="Цветя и растения в оранжерия - Градински Център Екзотик"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Floating Stats Card with Glass Effect */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="absolute -left-8 bottom-12 z-20"
            >
              <GlassCard glow className="p-8 bg-white shadow-2xl">
                <div className="grid grid-cols-3 gap-8">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1, type: "spring", stiffness: 200 }}
                      className="text-4xl font-bold gradient-text mb-2"
                    >
                      27
                    </motion.div>
                    <div className="text-sm text-[var(--color-gray-600)] font-semibold">Години</div>
                  </div>
                  <div className="text-center border-l border-r border-gray-200 px-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
                      className="text-4xl font-bold gradient-text mb-2"
                    >
                      2
                    </motion.div>
                    <div className="text-sm text-[var(--color-gray-600)] font-semibold">Локации</div>
                  </div>
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
                      className="text-4xl font-bold gradient-text mb-2"
                    >
                      100%
                    </motion.div>
                    <div className="text-sm text-[var(--color-gray-600)] font-semibold">Качество</div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Floating Accent Elements */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 w-24 h-24 gradient-accent rounded-2xl opacity-20 blur-xl"
            />
            <motion.div
              animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 w-32 h-32 gradient-secondary rounded-2xl opacity-20 blur-xl"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
