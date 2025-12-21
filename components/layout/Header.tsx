"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MapPin, Clock, Instagram, Facebook, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE_CONFIG, LOCATIONS, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Pages with dark hero backgrounds that need white logo at top
  const hasHero = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || !hasHero
            ? "bg-[#faf8f5]/80 backdrop-blur-lg border-b border-[var(--color-primary)]/10 py-2 md:py-3 shadow-sm"
            : "bg-transparent py-3 md:py-5"
        )}
      >
        <Container>
          <div className="flex items-center justify-between relative">
            {/* Logo - Centered on Mobile */}
            <Link
              href="/"
              className={cn(
                "absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0 group z-40 transition-all duration-300",
                mobileMenuOpen && "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto"
              )}
            >
              <div className={cn(
                "relative transition-all duration-500 group-hover:scale-105 flex items-center justify-center",
                scrolled || !hasHero
                  ? "w-[140px] h-[48px] md:w-[220px] md:h-[75px]"
                  : "w-[160px] h-[56px] md:w-[260px] md:h-[90px]"
              )}>
                {/* White logo when at top (hero section), dark logo when scrolled or on pages without hero */}
                <Image
                  src={scrolled || !hasHero ? "/images/logos/Logo print file.png" : "/images/logos/Logo print file white.png"}
                  alt="Exotic Flowers"
                  fill
                  className={cn(
                    "object-contain transition-all duration-300",
                    !scrolled && hasHero && "drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                  )}
                  priority
                  sizes="(max-width: 768px) 160px, 260px"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 bg-[#faf8f5]/60 backdrop-blur-sm px-8 py-2.5 rounded-full border border-[var(--color-primary)]/10 shadow-sm">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
              ))}
            </nav>

            {/* Left side - Phone icon on mobile for balance */}
            <div className="flex items-center z-50">
              <a href={`tel:${LOCATIONS.varna.phone}`} className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-colors lg:hidden",
                scrolled || !hasHero
                  ? "text-[var(--color-gray-700)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)]"
                  : "text-white hover:text-white/80 hover:bg-white/10"
              )}>
                <Phone className="w-5 h-5" />
              </a>
            </div>

            {/* Actions - Right side */}
            <div className="flex items-center gap-1 md:gap-4 z-50">
              {/* Phone - visible on desktop */}
              <a href={`tel:${LOCATIONS.varna.phone}`} className={cn(
                "hidden lg:flex items-center gap-2 text-sm font-semibold mr-4 transition-colors",
                scrolled || !hasHero
                  ? "text-[var(--color-gray-700)] hover:text-[var(--color-primary)]"
                  : "text-white hover:text-white/80"
              )}>
                <Phone className="w-5 h-5" />
                <span className="hidden xl:inline">{LOCATIONS.varna.phone}</span>
              </a>

              <Link href="/kontakti" className="hidden md:block">
                <Button className="rounded-full px-6">Свържи се</Button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "lg:hidden p-2.5 rounded-full transition-colors",
                  scrolled || !hasHero
                    ? "text-[var(--color-gray-800)] hover:bg-[var(--color-primary-light)]"
                    : "text-white hover:bg-white/10"
                )}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay - Modern 2025 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#faf8f5]/95 backdrop-blur-xl z-40 lg:hidden flex flex-col"
          >
            {/* Logo at top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="flex justify-center pt-20 pb-4"
            >
              <div className="relative w-[180px] h-[60px]">
                <Image
                  src="/images/logos/Logo print file.png"
                  alt="Exotic Flowers"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>

            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-1 px-8 -mt-8">
              {NAV_LINKS.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-serif text-2xl font-bold text-[var(--color-primary-dark)] hover:text-[var(--color-secondary)] transition-all py-2.5 hover:translate-x-2"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Section - Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="px-6 pb-8 space-y-4"
            >
              {/* Working Hours Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-[var(--color-gray-600)]">
                <Clock className="w-4 h-4" />
                <span>Пон-Пет: 09:00-18:00 | Съб: 09:00-16:00</span>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <a
                  href={`tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-[var(--color-primary)] text-white rounded-2xl font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>Обади се</span>
                </a>
                <Link
                  href="/lokacii"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-white border-2 border-[var(--color-primary)]/20 text-[var(--color-primary-dark)] rounded-2xl font-semibold hover:border-[var(--color-primary)] transition-colors"
                >
                  <MapPin className="w-5 h-5" />
                  <span>Локации</span>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-[var(--color-gray-200)] text-[var(--color-gray-600)] hover:text-[#1877F2] hover:border-[#1877F2] transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-[var(--color-gray-200)] text-[var(--color-gray-600)] hover:text-[#E4405F] hover:border-[#E4405F] transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 flex items-center justify-center rounded-full bg-white border border-[var(--color-gray-200)] text-[var(--color-gray-600)] hover:text-[#25D366] hover:border-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}