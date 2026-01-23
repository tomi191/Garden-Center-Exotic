"use client";

import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Phone, ArrowDown, MapPin, Clock, Heart, Sparkles, X, Gift } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";

// ============================================
// DESIGN SYSTEM - Editorial Luxury Romance
// ============================================

const palette = {
  burgundy: "#722F37",
  burgundyDeep: "#4A1D23",
  burgundyLight: "#8B3A44",
  cream: "#FAF7F2",
  creamDark: "#EDE8E0",
  gold: "#C9A962",
  goldLight: "#E8DCC4",
  ink: "#1A1715",
  inkMuted: "#6B635B",
};

// ============================================
// ANIMATED CURSOR HEART
// ============================================

function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-burgundy/10"
          style={{ left: `${heart.x}%` }}
          initial={{ y: "100vh", opacity: 0, rotate: -20 }}
          animate={{
            y: "-100vh",
            opacity: [0, 0.3, 0.3, 0],
            rotate: 20,
          }}
          transition={{
            duration: 15,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart className="w-4 h-4 fill-current" style={{ color: palette.burgundy }} />
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
      className="relative h-[100svh] flex items-center justify-center overflow-hidden"
    >
      {/* Background with Parallax */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src="/images/valentine/valentine-hero-new.png"
          alt="Луксозни рози за Свети Валентин"
          fill
          className="object-cover"
          priority
          quality={95}
        />
        {/* Cinematic Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 100%, transparent 0%, ${palette.ink}40 100%),
              linear-gradient(to bottom, ${palette.ink}10 0%, transparent 30%, ${palette.ink}60 100%)
            `,
          }}
        />
      </motion.div>

      {/* Decorative Frame */}
      <div className="absolute inset-8 md:inset-16 border border-white/10 pointer-events-none z-10" />

      {/* Content */}
      <motion.div style={{ opacity, y: textY }} className="relative z-20 text-center px-6">
        {/* Date Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <span
            className="inline-flex items-center gap-3 px-6 py-3 text-[10px] md:text-xs tracking-[0.4em] uppercase"
            style={{
              backgroundColor: palette.burgundy,
              color: palette.cream,
            }}
          >
            <Sparkles className="w-3 h-3" />
            14 Февруари 2026
            <Sparkles className="w-3 h-3" />
          </span>
        </motion.div>

        {/* Main Title - Editorial Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          <h1 className="font-serif leading-[0.85] mb-6">
            <span
              className="block text-[clamp(3rem,12vw,10rem)] font-light tracking-tight"
              style={{
                color: palette.cream,
                textShadow: `0 4px 30px ${palette.ink}80`,
              }}
            >
              Свети
            </span>
            <span
              className="block text-[clamp(4rem,15vw,13rem)] font-medium italic -mt-4 md:-mt-8"
              style={{
                color: palette.gold,
                textShadow: `0 4px 40px ${palette.burgundy}`,
              }}
            >
              Валентин
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="text-base md:text-xl lg:text-2xl font-light tracking-wide max-w-xl mx-auto mb-12"
          style={{
            color: palette.cream,
            textShadow: `0 2px 20px ${palette.ink}`,
          }}
        >
          Premium рози от <span className="italic font-medium">Еквадор</span>
          <br />
          <span className="text-sm md:text-lg opacity-80">Директен внос • Без посредници</span>
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
              style={{ backgroundColor: palette.cream, color: palette.burgundy }}
            >
              <Phone className="w-5 h-5 transition-transform group-hover:rotate-12" />
              <span>Обадете се сега</span>
            </span>
            <motion.span
              className="absolute inset-0 z-0"
              style={{ backgroundColor: palette.gold }}
              initial={{ x: "-100%" }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.4 }}
            />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
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
            src="/images/valentine/valentine-roses-closeup-new.png"
            alt="Макро снимка на роза"
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
          {/* Gold Accent Line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ backgroundColor: palette.gold }}
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
                color: palette.gold,
                borderBottom: `1px solid ${palette.gold}`,
              }}
            >
              Защо да изберете нас
            </span>

            {/* Title */}
            <h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-8"
              style={{ color: palette.ink }}
            >
              Директен внос.
              <br />
              <span className="italic" style={{ color: palette.burgundy }}>
                Без компромиси.
              </span>
            </h2>

            {/* Description */}
            <p
              className="text-lg md:text-xl font-light leading-relaxed mb-12 max-w-md"
              style={{ color: palette.inkMuted }}
            >
              От плантациите на Еквадор директно до вашите ръце.
              Всяка роза е подбрана лично и транспортирана с грижа.
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
                    style={{ color: palette.burgundy }}
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
      style={{ backgroundColor: palette.burgundy }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 30 L30 55 L5 30 Z' fill='none' stroke='%23FAF7F2' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-1/2 left-0 w-32 md:w-48 h-px"
        style={{ backgroundColor: palette.gold }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.5 }}
      />
      <motion.div
        className="absolute top-1/2 right-0 w-32 md:w-48 h-px"
        style={{ backgroundColor: palette.gold }}
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
            style={{ color: palette.gold }}
          >
            "
          </span>

          {/* Main Text */}
          <h2
            className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight mb-8"
            style={{ color: palette.cream }}
          >
            Клиентите с предварителни заявки
            <br />
            <span className="italic" style={{ color: palette.goldLight }}>
              се обслужват с приоритет
            </span>
          </h2>

          {/* Subtext */}
          <p
            className="text-lg md:text-xl font-light max-w-2xl mx-auto mb-12"
            style={{ color: palette.cream + "bb" }}
          >
            Направете заявка до 12 февруари и получете персонализирана консултация
            за перфектния подарък
          </p>

          {/* CTA */}
          <motion.a
            href={`tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-4 px-12 py-6 text-xl font-medium transition-all duration-500 hover:scale-105"
            style={{ backgroundColor: palette.cream, color: palette.burgundy }}
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
      title: "Premium Рози",
      description: "Дълги стъбла от плантациите на Еквадор. Директен внос, без посредници.",
      image: "/images/valentine/valentine-bouquet-delivery-new.png",
      span: "lg:col-span-1",
    },
    {
      title: "Букети по Поръчка",
      description: "Уникални композиции, създадени специално за вашия любим човек.",
      image: "/images/valentine/valentine-florist-workspace-new.png",
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
            style={{ color: palette.gold }}
          >
            Нашето Предложение
          </span>
          <h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl"
            style={{ color: palette.ink }}
          >
            Всичко за <span className="italic" style={{ color: palette.burgundy }}>любовта</span>
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
                  style={{ borderColor: palette.gold }}
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
    { number: "02", title: "Консултация", icon: Heart },
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
            style={{ color: palette.gold }}
          >
            Как работи
          </span>
          <h2
            className="font-serif text-4xl md:text-5xl"
            style={{ color: palette.ink }}
          >
            Четири <span className="italic" style={{ color: palette.burgundy }}>лесни</span> стъпки
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
                  style={{ backgroundColor: palette.goldLight }}
                />
              )}

              {/* Icon Circle */}
              <motion.div
                className="relative z-10 w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: palette.creamDark }}
                whileHover={{ scale: 1.1, backgroundColor: palette.burgundy }}
              >
                <step.icon
                  className="w-8 h-8 transition-colors duration-300"
                  style={{ color: palette.burgundy }}
                />
              </motion.div>

              {/* Number */}
              <span
                className="block text-xs tracking-[0.2em] uppercase mb-2"
                style={{ color: palette.gold }}
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
          src="/images/valentine/valentine-romantic-setting-new.png"
          alt="Романтична обстановка"
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
          {/* Decorative Hearts */}
          <motion.div
            className="flex justify-center gap-4 mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {[0, 1, 2].map((i) => (
              <Heart
                key={i}
                className="w-4 h-4 fill-current"
                style={{ color: palette.gold, opacity: 0.3 + i * 0.2 }}
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
            <span className="italic" style={{ color: palette.gold }}>
              до 12 февруари
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-lg md:text-xl font-light mb-16 max-w-xl mx-auto"
            style={{ color: palette.cream + "99" }}
          >
            За гарантирано приоритетно обслужване и най-красивите рози от Еквадор
          </p>

          {/* Phone Button */}
          <div className="flex justify-center mb-20">
            <motion.a
              href={`tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center justify-center gap-4 px-12 py-6 text-xl font-medium"
              style={{ backgroundColor: palette.burgundy, color: palette.cream }}
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
              <MapPin className="w-4 h-4" style={{ color: palette.gold }} />
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
              <Clock className="w-4 h-4" style={{ color: palette.gold }} />
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
          style={{ backgroundColor: palette.burgundy }}
        >
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p
              className="text-sm md:text-base font-light text-center sm:text-left"
              style={{ color: palette.cream }}
            >
              <span className="hidden sm:inline">🌹</span> Заявка до{" "}
              <span className="font-semibold" style={{ color: palette.goldLight }}>
                12 февруари
              </span>{" "}
              = приоритетно обслужване
            </p>
            <a
              href={`tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 px-6 py-2 text-sm font-medium shrink-0"
              style={{ backgroundColor: palette.cream, color: palette.burgundy }}
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
// MOBILE FLOATING ACTION BUTTON
// ============================================

function MobileFAB() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  useEffect(() => {
    // Calculate days until Valentine's Day
    const valentineDate = new Date("2026-02-14");
    const today = new Date();
    const diffTime = valentineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysLeft(Math.max(0, diffDays));

    // Show FAB after 2 seconds
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-24 right-4 z-[60] md:hidden">
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              // Collapsed FAB Button
              <motion.button
                key="fab-button"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExpanded(true)}
                className="relative w-16 h-16 rounded-full shadow-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${palette.burgundy} 0%, ${palette.burgundyDeep} 100%)`,
                  boxShadow: `0 8px 32px ${palette.burgundy}50`,
                }}
              >
                {/* Pulse rings */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: `2px solid ${palette.gold}` }}
                  animate={{
                    scale: [1, 1.4, 1.4],
                    opacity: [0.6, 0, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ border: `2px solid ${palette.gold}` }}
                  animate={{
                    scale: [1, 1.4, 1.4],
                    opacity: [0.6, 0, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: 0.5,
                  }}
                />

                {/* Heart icon with bounce */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Heart
                    className="w-7 h-7 fill-current"
                    style={{ color: palette.gold }}
                  />
                </motion.div>

                {/* Days counter badge */}
                {daysLeft > 0 && daysLeft <= 30 && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{
                      backgroundColor: palette.gold,
                      color: palette.burgundyDeep,
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    {daysLeft}
                  </motion.div>
                )}
              </motion.button>
            ) : (
              // Expanded Card
              <motion.div
                key="fab-card"
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                className="relative w-72 rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  background: `linear-gradient(145deg, ${palette.burgundy}f5 0%, ${palette.burgundyDeep}f5 100%)`,
                  backdropFilter: "blur(20px)",
                  boxShadow: `0 20px 60px ${palette.burgundy}40`,
                }}
              >
                {/* Close button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center z-10"
                  style={{
                    backgroundColor: palette.cream + "20",
                  }}
                >
                  <X className="w-4 h-4" style={{ color: palette.cream }} />
                </motion.button>

                {/* Content */}
                <div className="p-5">
                  {/* Header with icon */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${palette.gold}30 0%, ${palette.gold}10 100%)`,
                      }}
                    >
                      <Gift className="w-6 h-6" style={{ color: palette.gold }} />
                    </div>
                    <div>
                      <h3
                        className="font-serif text-lg font-semibold leading-tight"
                        style={{ color: palette.cream }}
                      >
                        Свети Валентин
                      </h3>
                      <p
                        className="text-xs"
                        style={{ color: palette.goldLight }}
                      >
                        Premium рози от Еквадор
                      </p>
                    </div>
                  </div>

                  {/* Countdown */}
                  {daysLeft > 0 && (
                    <motion.div
                      className="mb-4 py-3 px-4 rounded-2xl text-center"
                      style={{
                        backgroundColor: palette.cream + "10",
                        border: `1px solid ${palette.gold}20`,
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <p
                        className="text-[10px] uppercase tracking-widest mb-1"
                        style={{ color: palette.goldLight + "99" }}
                      >
                        Остават
                      </p>
                      <p
                        className="text-3xl font-serif font-bold"
                        style={{ color: palette.gold }}
                      >
                        {daysLeft}
                        <span
                          className="text-sm font-sans font-normal ml-1"
                          style={{ color: palette.goldLight }}
                        >
                          {daysLeft === 1 ? "ден" : "дни"}
                        </span>
                      </p>
                    </motion.div>
                  )}

                  {/* Priority message */}
                  <p
                    className="text-xs text-center mb-4 leading-relaxed"
                    style={{ color: palette.cream + "cc" }}
                  >
                    Заявка до <span style={{ color: palette.gold }}>12 февруари</span>
                    <br />= приоритетно обслужване
                  </p>

                  {/* Call button */}
                  <motion.a
                    href={`tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-semibold text-sm"
                    style={{
                      background: `linear-gradient(135deg, ${palette.gold} 0%, ${palette.goldLight} 100%)`,
                      color: palette.burgundyDeep,
                    }}
                  >
                    <Phone className="w-5 h-5" />
                    <span>{LOCATIONS.varna.phone}</span>
                  </motion.a>

                  {/* Subtitle */}
                  <p
                    className="text-[10px] text-center mt-3"
                    style={{ color: palette.cream + "66" }}
                  >
                    Обадете се сега за консултация
                  </p>
                </div>

                {/* Decorative hearts */}
                <motion.div
                  className="absolute -bottom-4 -left-4 opacity-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Heart className="w-24 h-24 fill-current" style={{ color: palette.gold }} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function ValentinePage() {
  return (
    <main className="overflow-hidden">
      <FloatingHearts />
      <HeroSection />
      <SplitEditorialSection />
      <PriorityBanner />
      <OfferingsSection />
      <ProcessSection />
      <FinalCTASection />
      <UrgencyBar />
      <MobileFAB />
    </main>
  );
}
