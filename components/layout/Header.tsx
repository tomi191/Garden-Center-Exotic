"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, MapPin, Search, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE_CONFIG, LOCATIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          scrolled
            ? "bg-[#faf8f5]/80 backdrop-blur-lg border-b border-[var(--color-primary)]/10 py-2 md:py-3 shadow-sm"
            : "bg-transparent py-3 md:py-5"
        )}
      >
        <Container>
          <div className="flex items-center justify-between relative">
            {/* Logo - Centered on Mobile */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0 group z-40">
              <div className={cn(
                "relative transition-all duration-500 group-hover:scale-105",
                scrolled ? "w-[160px] h-[55px] md:w-[220px] md:h-[75px]" : "w-[180px] h-[60px] md:w-[260px] md:h-[90px]"
              )}>
                {/* White logo when at top (hero section), dark logo when scrolled */}
                <Image
                  src={scrolled ? "/images/logos/Logo print file.png" : "/images/logos/Logo print file white.png"}
                  alt="Exotic Flowers"
                  fill
                  className="object-contain transition-opacity duration-300"
                  priority
                  sizes="(max-width: 768px) 150px, 200px"
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
                scrolled
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
                scrolled
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
                  scrolled
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

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 lg:hidden transition-all duration-300 flex flex-col",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Logo at top of mobile menu */}
        <div className="flex justify-center pt-20 pb-6">
          <div className="relative w-[200px] h-[70px]">
            <Image
              src="/images/logos/Logo print file.png"
              alt="Exotic Flowers"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <nav className="flex flex-col items-center gap-4 text-center px-8 flex-1 overflow-y-auto pb-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-2xl font-bold text-[var(--color-primary-dark)] hover:text-[var(--color-secondary)] transition-colors py-2"
            >
              {link.label}
            </Link>
          ))}
          <div className="w-16 h-0.5 bg-[var(--color-gray-200)] my-4" />

          {/* Phone CTA */}
          <a href={`tel:${LOCATIONS.varna.phone}`} className="flex items-center gap-3 text-lg font-semibold text-[var(--color-primary)] mb-4">
            <Phone className="w-5 h-5" />
            <span>{LOCATIONS.varna.phone}</span>
          </a>

          <Link href="/kontakti" onClick={() => setMobileMenuOpen(false)} className="w-full max-w-xs">
            <Button size="lg" className="w-full text-lg py-6 rounded-full">Свържи се с нас</Button>
          </Link>
        </nav>
      </div>
    </>
  );
}