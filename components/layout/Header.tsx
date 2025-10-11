"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      {/* Top Bar - Simplified */}
      <div className="bg-[var(--color-primary)] text-white">
        <Container>
          <div className="flex items-center justify-between py-2.5 text-sm">
            <div className="flex items-center gap-6">
              <a href="tel:+35952XXXXXX" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline font-medium">+359 52 XXX XXX</span>
              </a>
              <span className="hidden md:flex items-center gap-2 opacity-90">
                <MapPin className="w-3.5 h-3.5" />
                <span>Варна • Нова Загора</span>
              </span>
            </div>
            <div className="text-sm font-medium">
              От 1998 г.
            </div>
          </div>
        </Container>
      </div>

      {/* Main Navigation - Cleaner */}
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo.jpg"
                alt={SITE_CONFIG.nameBg}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="text-xl font-bold text-[var(--color-foreground)]">
                {SITE_CONFIG.nameBg}
              </div>
              <div className="text-xs text-[var(--color-gray-500)] font-medium tracking-wide">
                GARDEN CENTER
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-[var(--color-gray-700)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] rounded-lg font-medium text-sm transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-[var(--color-gray-700)] hover:bg-[var(--color-light)] rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-6 border-t">
            <div className="pt-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-3 px-4 text-[var(--color-gray-700)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] rounded-lg transition-all font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </Container>
    </header>
  );
}
