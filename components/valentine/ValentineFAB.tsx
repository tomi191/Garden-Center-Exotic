"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Phone, Heart, X, Gift } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";

const palette = {
  burgundy: "#722F37",
  burgundyDeep: "#4A1D23",
  cream: "#FAF7F2",
  gold: "#C9A962",
  goldLight: "#E8DCC4",
};

export function ValentineFAB() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);

  // Hide on admin and b2b pages only
  const shouldShow = !pathname.startsWith("/admin") && !pathname.startsWith("/b2b");

  useEffect(() => {
    if (!shouldShow) return;

    // Calculate days until Valentine's Day
    const valentineDate = new Date("2026-02-14");
    const today = new Date();
    const diffTime = valentineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysLeft(Math.max(0, diffDays));

    // Show FAB after 2 seconds
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-4 z-[60] md:hidden">
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
