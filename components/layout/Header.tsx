"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, MapPin, Search, ShoppingBag } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
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
            ? "bg-white/80 backdrop-blur-lg border-b border-[var(--color-gray-100)] py-3 shadow-sm" 
            : "bg-transparent py-5"
        )}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group z-50">
              <div className="relative w-10 h-10 md:w-12 md:h-12 group-hover:rotate-3 transition-transform duration-500">
                <Image
                  src="/images/logo.jpg"
                  alt={SITE_CONFIG.nameBg}
                  fill
                  className="object-contain rounded-full"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl md:text-2xl font-bold text-[var(--color-primary-dark)] leading-none tracking-tight">
                  {SITE_CONFIG.nameBg}
                </span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-secondary)]">
                  Garden Center
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 bg-white/50 backdrop-blur-sm px-8 py-2.5 rounded-full border border-white/40 shadow-sm">
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

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <a href="tel:+35952600577" className="hidden xl:flex items-center gap-2 text-sm font-semibold text-[var(--color-gray-700)] hover:text-[var(--color-primary)] mr-4">
                <Phone className="w-4 h-4" />
                <span>+359 52 600 577</span>
              </a>

              <Button variant="ghost" size="icon" className="rounded-full hover:bg-[var(--color-primary-light)] text-[var(--color-gray-700)]">
                <Search className="w-5 h-5" />
              </Button>
              
              <Link href="/kontakti" className="hidden md:block">
                <Button className="rounded-full px-6">Свържи се</Button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-[var(--color-gray-800)] hover:bg-[var(--color-light)] rounded-full transition-colors z-50 relative"
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
          "fixed inset-0 bg-white/95 backdrop-blur-xl z-40 lg:hidden transition-all duration-300 flex items-center justify-center",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center gap-6 text-center p-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-serif text-3xl font-bold text-[var(--color-primary-dark)] hover:text-[var(--color-secondary)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="w-12 h-0.5 bg-[var(--color-gray-200)] my-4" />
          <Link href="/kontakti" onClick={() => setMobileMenuOpen(false)}>
             <Button size="lg" className="text-lg px-10 py-6">Свържи се с нас</Button>
          </Link>
        </nav>
      </div>
    </>
  );
}