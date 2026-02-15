"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Phone, ArrowDown, MapPin, Clock, Flower2, Sparkles } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";

// ============================================
// DESIGN SYSTEM - Editorial Spring Elegance
// ============================================

const palette = {
  lilac: "#9B7EBD",
  lilacDeep: "#6A4C93",
  lilacLight: "#C8A8E9",
  cream: "#FFF8F0",
  creamDark: "#F5EDE4",
  rose: "#D4789C",
  roseLight: "#F0D0E0",
  green: "#5B8C5A",
  ink: "#1A1715",
  inkMuted: "#6B635B",
};

// ============================================
// FLOATING SPRING FLOWERS
// ============================================

function FloatingFlowers() {
  const [flowers, setFlowers] = useState<{ id: number; x: number; delay: number; emoji: string }[]>([]);

  useEffect(() => {
    const emojis = ["🌷", "🌸", "💐", "🌺", "🌼"];
    const newFlowers = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      emoji: emojis[i % emojis.length],
    }));
    setFlowers(newFlowers);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          className="absolute text-lg"
          style={{ left: `${flower.x}%`, opacity: 0.15 }}
          initial={{ y: "100vh", opacity: 0, rotate: -20 }}
          animate={{
            y: "-100vh",
            opacity: [0, 0.2, 0.2, 0],
            rotate: 20,
          }}
          transition={{
            duration: 18,
            delay: flower.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {flower.emoji}
        </motion.div>
      ))}
    </div>
  );
}

// ============================================
// HERO - Cinematic Full Screen
// ============================================

function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] flex items-end md:items-center justify-center overflow-hidden pt-[70px] md:pt-[100px]"
    >
      {/* Background with Parallax */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src="/images/march8/march8-hero.png"
          alt="Пролетни букети за 8-ми Март"
          fill
          className="object-cover"
          priority
          quality={95}
        />
        {/* Cinematic Overlay - stronger for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 100%, transparent 0%, ${palette.ink}50 100%),
              linear-gradient(to bottom, ${palette.ink}30 0%, transparent 40%, ${palette.ink}70 100%)
            `,
          }}
        />
      </motion.div>

      {/* Decorative Frame */}
      <div className="absolute inset-4 md:inset-16 border border-white/10 pointer-events-none z-10" />

      {/* Content - padded to clear fixed nav */}
      <motion.div style={{ opacity, y: textY }} className="relative z-20 text-center px-6 pb-20 md:pb-0 pt-24 md:pt-0">
        {/* Date Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-4 md:mb-6"
        >
          <span
            className="inline-flex items-center gap-3 px-6 py-3 text-[10px] md:text-xs tracking-[0.4em] uppercase"
            style={{
              backgroundColor: palette.lilacDeep,
              color: palette.cream,
            }}
          >
            <Sparkles className="w-3 h-3" />
            8 Март 2026
            <Sparkles className="w-3 h-3" />
          </span>
        </motion.div>

        {/* Main Title - Editorial Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <h1 className="font-serif leading-[0.85] mb-4 md:mb-6">
            <span
              className="block text-[clamp(3rem,11vw,9rem)] font-light tracking-tight"
              style={{
                color: palette.cream,
                textShadow: `0 4px 30px ${palette.ink}80`,
              }}
            >
              Ден на
            </span>
            <span
              className="block text-[clamp(3.5rem,13vw,11rem)] font-medium italic -mt-2 md:-mt-6"
              style={{
                color: palette.lilacLight,
                textShadow: `0 4px 40px ${palette.lilacDeep}`,
              }}
            >
              Жената
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-sm md:text-xl lg:text-2xl font-light tracking-wide max-w-xl mx-auto mb-8 md:mb-12"
          style={{
            color: palette.cream,
            textShadow: `0 2px 20px ${palette.ink}`,
          }}
        >
          Пролетни букети от свежи <span className="italic font-medium">лалета, фрезии и рози</span>
          <br />
          <span className="text-sm md:text-lg opacity-80">Директен внос от Нидерландия и Еквадор</span>
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <a
            href={`tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`}
            className="group relative inline-flex items-center gap-4 overflow-hidden"
          >
            <span
              className="relative z-10 flex items-center gap-4 px-10 py-5 text-lg font-medium tracking-wide transition-all duration-500"
              style={{ backgroundColor: palette.cream, color: palette.lilacDeep }}
            >
              <Phone className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span>Обадете се сега</span>
            </span>
            <motion.span
              className="absolute inset-0 z-0"
              style={{ backgroundColor: palette.lilacLight }}
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - hidden on mobile since content pushes down */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="hidden md:block absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: palette.cream + "99" }}
          >
            Открийте повече
          </span>
          <ArrowDown className="w-4 h-4" style={{ color: palette.cream + "99" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============================================
// SPLIT SECTION - Editorial Asymmetry
// ============================================

function SplitEditorialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative" style={{ backgroundColor: palette.cream }}>
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left - Image */}
        <motion.div
          className="relative h-[60vh] lg:h-auto overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/march8/march8-flowers-closeup.png"
            alt="Пролетни цветя - лалета и фрезии"
            fill
            className="object-cover"
          />
          {/* Diagonal Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, transparent 50%, ${palette.cream} 50%)`,
              opacity: 0.3,
            }}
          />
          {/* Lilac Accent Line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ backgroundColor: palette.lilac }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>

        {/* Right - Content */}
        <div className="flex items-center px-8 md:px-16 lg:px-24 py-20 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {/* Label */}
            <span
              className="inline-block text-[10px] tracking-[0.4em] uppercase mb-8 pb-2"
              style={{
                color: palette.lilac,
                borderBottom: `1px solid ${palette.lilac}`,
              }}
            >
              Защо да изберете нас
            </span>

            {/* Title */}
            <h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8"
              style={{ color: palette.ink }}
            >
              Свежест от първия ден.
              <br />
              <span className="italic" style={{ color: palette.lilacDeep }}>
                Директен внос.
              </span>
            </h2>

            {/* Description */}
            <p
              className="text-lg md:text-xl font-light leading-relaxed mb-12 max-w-md"
              style={{ color: palette.inkMuted }}
            >
              Пролетни цветя от плантациите на Нидерландия и Еквадор директно до вашите ръце.
              Лалета, фрезии, зюмбюли и рози - подбрани лично и транспортирани с грижа.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              {[
                { value: "26+", label: "години" },
                { value: "100%", label: "внос" },
                { value: "4.9", label: "рейтинг" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                >
                  <span
                    className="block font-serif text-4xl md:text-5xl mb-1"
                    style={{ color: palette.lilacDeep }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs tracking-[0.2em] uppercase"
                    style={{ color: palette.inkMuted }}
                  >
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// PRIORITY BANNER - Full Width Statement
// ============================================

function PriorityBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ backgroundColor: palette.lilacDeep }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 30 L30 55 L5 30 Z' fill='none' stroke='%23FFF8F0' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-1/2 left-0 w-32 md:w-48 h-px"
        style={{ backgroundColor: palette.lilacLight }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="absolute top-1/2 right-0 w-32 md:w-48 h-px"
        style={{ backgroundColor: palette.lilacLight }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {/* Quote Mark */}
          <span
            className="block font-serif text-[8rem] md:text-[12rem] leading-none -mb-16 md:-mb-24 opacity-20"
            style={{ color: palette.lilacLight }}
          >
            &ldquo;
          </span>

          {/* Main Text */}
          <h2
            className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight mb-8"
            style={{ color: palette.cream }}
          >
            Клиентите с предварителни заявки
            <br />
            <span className="italic" style={{ color: palette.roseLight }}>
              се обслужват с приоритет
            </span>
          </h2>

          {/* Subtext */}
          <p
            className="text-lg md:text-xl font-light max-w-2xl mx-auto mb-12"
            style={{ color: palette.cream + "bb" }}
          >
            Направете заявка до 5 март и получете персонализирана консултация
            за перфектния пролетен букет
          </p>

          {/* CTA */}
          <motion.a
            href={`tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-4 px-12 py-6 text-xl font-medium transition-all duration-500 hover:scale-105"
            style={{ backgroundColor: palette.cream, color: palette.lilacDeep }}
            whileHover={{ boxShadow: `0 20px 40px ${palette.ink}40` }}
          >
            <Phone className="w-6 h-6" />
            <span className="tracking-wide">{LOCATIONS.varna.phone}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// OFFERINGS GRID - Bento Style
// ============================================

function OfferingsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const offerings = [
    {
      title: "Пролетни Букети",
      description: "Свежи лалета, фрезии, зюмбюли и нарциси от Нидерландия. Директен внос, без посредници.",
      image: "/images/march8/march8-bouquet.png",
      span: "lg:col-span-1",
    },
    {
      title: "Букети по Поръчка",
      description: "Уникални композиции с пролетни цветя и рози от Еквадор, създадени специално за нея.",
      image: "/images/march8/march8-spring-setting.png",
      span: "lg:col-span-1",
    },
  ];

  return (
    <section
      ref={ref}
      className="py-24 md:py-32"
      style={{ backgroundColor: palette.creamDark }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span
            className="inline-block text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ color: palette.lilac }}
          >
            Нашето Предложение
          </span>
          <h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl"
            style={{ color: palette.ink }}
          >
            Всичко за <span className="italic" style={{ color: palette.lilacDeep }}>нея</span>
          </h2>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {offerings.map((item, index) => (
            <motion.div
              key={index}
              className={`group relative overflow-hidden ${item.span}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            >
              <div className="relative h-80 lg:h-[450px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-90"
                  style={{
                    background: `linear-gradient(to top, ${palette.ink}ee 0%, ${palette.ink}40 50%, transparent 100%)`,
                  }}
                />
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3
                    className="font-serif text-2xl md:text-3xl mb-2"
                    style={{ color: palette.cream }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm font-light"
                    style={{ color: palette.cream + "bb" }}
                  >
                    {item.description}
                  </p>
                </div>
                {/* Hover Border */}
                <div
                  className="absolute inset-0 border-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ borderColor: palette.lilac }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// PROCESS SECTION - Horizontal Steps
// ============================================

function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { number: "01", title: "Обадете се", icon: Phone },
    { number: "02", title: "Консултация", icon: Flower2 },
    { number: "03", title: "Поръчка", icon: Sparkles },
    { number: "04", title: "Получаване", icon: MapPin },
  ];

  return (
    <section
      ref={ref}
      className="py-24 md:py-32"
      style={{ backgroundColor: palette.cream }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          <span
            className="inline-block text-[10px] tracking-[0.4em] uppercase mb-6"
            style={{ color: palette.lilac }}
          >
            Как работи
          </span>
          <h2
            className="font-serif text-4xl md:text-5xl"
            style={{ color: palette.ink }}
          >
            Четири <span className="italic" style={{ color: palette.lilacDeep }}>лесни</span> стъпки
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-12 left-1/2 w-full h-px"
                  style={{ backgroundColor: palette.roseLight }}
                />
              )}

              {/* Icon Circle */}
              <motion.div
                className="relative z-10 w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: palette.creamDark }}
                whileHover={{ scale: 1.1, backgroundColor: palette.lilacDeep }}
              >
                <step.icon
                  className="w-8 h-8 transition-colors duration-300"
                  style={{ color: palette.lilacDeep }}
                />
              </motion.div>

              {/* Number */}
              <span
                className="block text-xs tracking-[0.2em] uppercase mb-2"
                style={{ color: palette.lilac }}
              >
                Стъпка {step.number}
              </span>

              {/* Title */}
              <h3
                className="font-serif text-xl md:text-2xl"
                style={{ color: palette.ink }}
              >
                {step.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// FINAL CTA - Dramatic Closing
// ============================================

function FinalCTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden"
      style={{ backgroundColor: palette.ink }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/march8/march8-spring-setting.png"
          alt="Пролетна обстановка с цветя"
          fill
          className="object-cover"
        />
      </div>

      {/* Radial Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, ${palette.ink} 70%)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {/* Decorative Flowers */}
          <motion.div
            className="flex justify-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {[0, 1, 2].map((i) => (
              <Flower2
                key={i}
                className="w-4 h-4 fill-current"
                style={{ color: palette.lilacLight, opacity: 0.3 + i * 0.2 }}
              />
            ))}
          </motion.div>

          {/* Title */}
          <h2
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-8"
            style={{ color: palette.cream }}
          >
            Направете заявка
            <br />
            <span className="italic" style={{ color: palette.lilacLight }}>
              до 5 март
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl font-light mb-16 max-w-xl mx-auto"
            style={{ color: palette.cream + "99" }}
          >
            За гарантирано приоритетно обслужване и най-свежите пролетни букети
          </p>

          {/* Phone Button */}
          <div className="flex justify-center mb-20">
            <motion.a
              href={`tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center gap-4 px-12 py-6 text-xl font-medium"
              style={{ backgroundColor: palette.lilacDeep, color: palette.cream }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-6 h-6" />
              <span>{LOCATIONS.varna.phone}</span>
            </motion.a>
          </div>

          {/* Location */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <MapPin className="w-4 h-4" style={{ color: palette.lilacLight }} />
              <span
                className="text-lg font-medium"
                style={{ color: palette.cream }}
              >
                Варна
              </span>
            </div>
            <p
              className="text-sm font-light"
              style={{ color: palette.cream + "99" }}
            >
              {LOCATIONS.varna.address}
            </p>
            <p
              className="text-xs font-light mt-1"
              style={{ color: palette.cream + "66" }}
            >
              {LOCATIONS.varna.landmark}
            </p>
          </motion.div>

          {/* Working Hours */}
          <motion.div
            className="mt-16 pt-8"
            style={{ borderTop: `1px solid ${palette.cream}15` }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center justify-center gap-3">
              <Clock className="w-4 h-4" style={{ color: palette.lilacLight }} />
              <span
                className="text-sm font-light"
                style={{ color: palette.cream + "77" }}
              >
                Работно време: {LOCATIONS.varna.hours.weekdays}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// FLOATING URGENCY BAR
// ============================================

function UrgencyBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 py-4"
          style={{ backgroundColor: palette.lilacDeep }}
        >
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
              className="text-sm md:text-base font-light text-center sm:text-left"
              style={{ color: palette.cream }}
            >
              <span className="hidden sm:inline">🌷</span> Заявка до{" "}
              <span className="font-semibold" style={{ color: palette.roseLight }}>
                5 март
              </span>{" "}
              = приоритетно обслужване
            </p>
            <a
              href={`tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium shrink-0"
              style={{ backgroundColor: palette.cream, color: palette.lilacDeep }}
            >
              <Phone className="w-4 h-4" />
              <span>{LOCATIONS.varna.phone}</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function March8Page() {
  return (
    <main className="overflow-hidden">
      <FloatingFlowers />
      <HeroSection />
      <SplitEditorialSection />
      <PriorityBanner />
      <OfferingsSection />
      <ProcessSection />
      <FinalCTASection />
      <UrgencyBar />
    </main>
  );
}
