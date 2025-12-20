"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LOCATIONS, SITE_CONFIG, SOCIAL_LINKS } from "@/lib/constants";

const footerLinks = {
  navigation: [
    { label: "Начало", href: "/" },
    { label: "Продукти", href: "/produkti" },
    { label: "Услуги", href: "/uslugi" },
    { label: "За нас", href: "/za-nas" },
  ],
  services: [
    { label: "Отрязани цветя", href: "/produkti/ryazan-tsvyat" },
    { label: "Саксийни растения", href: "/produkti/saksiyni-rasteniya" },
    { label: "Градински растения", href: "/produkti/gradinski" },
    { label: "Контакти", href: "/kontakti" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a2e1a]">
      {/* Main Footer */}
      <Container>
        <div className="py-10 md:py-16">
          {/* Mobile: Logo + Social centered */}
          <div className="flex flex-col items-center text-center md:hidden mb-8">
            <Link href="/" className="inline-block mb-4">
              <div className="relative w-[160px] h-[55px]">
                <Image
                  src="/images/logos/Logo print file white.png"
                  alt="Градински Център Екзотик"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-white text-sm leading-relaxed mb-4 max-w-[280px]">
              Директен вносител на премиум цветя от Еквадор, Холандия и Турция
            </p>
            {/* Social Icons - Mobile */}
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#1877F2] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[var(--color-secondary)] transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Working Hours - Mobile */}
          <div className="md:hidden mb-8 p-4 bg-white/5 rounded-2xl">
            <div className="flex items-center gap-2 text-[var(--color-secondary)] mb-3">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-semibold">Работно време</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-white/60">Пон - Пет</div>
              <div className="text-white">09:00 - 18:00</div>
              <div className="text-white/60">Събота</div>
              <div className="text-white">09:00 - 16:00</div>
              <div className="text-white/60">Неделя</div>
              <div className="text-white/50">Почивен ден</div>
            </div>
          </div>

          {/* Links Grid - Mobile: 2 columns */}
          <div className="grid grid-cols-2 gap-6 md:hidden mb-8">
            <div>
              <h4 className="!text-[var(--color-secondary)] font-semibold text-sm mb-4">Навигация</h4>
              <ul className="space-y-2.5">
                {footerLinks.navigation.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="!text-[var(--color-secondary)] font-semibold text-sm mb-4">Продукти</h4>
              <ul className="space-y-2.5">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info - Mobile */}
          <div className="md:hidden space-y-3 mb-6">
            <a
              href={`tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-[var(--color-secondary)]" />
              <span className="text-sm">{LOCATIONS.varna.phone}</span>
            </a>
            <a
              href={`mailto:${LOCATIONS.varna.email}`}
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 text-[var(--color-secondary)]" />
              <span className="text-sm">{LOCATIONS.varna.email}</span>
            </a>
            <div className="flex items-start gap-3 text-white">
              <MapPin className="w-4 h-4 text-[var(--color-secondary)] mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p>Варна • Нова Загора</p>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-6">
                <div className="relative w-[180px] h-[60px]">
                  <Image
                    src="/images/logos/Logo print file white.png"
                    alt="Градински Център Екзотик"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
              <p className="text-white text-sm leading-relaxed mb-6 max-w-xs">
                Директен вносител на премиум цветя от Еквадор, Холандия и Турция. Над {currentYear - 1998} години опит.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#1877F2] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[var(--color-secondary)] transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links Column */}
            <div className="lg:col-span-2">
              <h4 className="!text-[var(--color-secondary)] font-semibold mb-5">Навигация</h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Column */}
            <div className="lg:col-span-2">
              <h4 className="!text-[var(--color-secondary)] font-semibold mb-5">Продукти</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="lg:col-span-4">
              <h4 className="!text-[var(--color-secondary)] font-semibold mb-5">Контакти</h4>
              <div className="space-y-4">
                <a
                  href={`tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 group-hover:bg-[var(--color-secondary)]/20 transition-colors">
                    <Phone className="w-4 h-4 text-[var(--color-secondary)]" />
                  </div>
                  <span className="text-sm">{LOCATIONS.varna.phone}</span>
                </a>
                <a
                  href={`mailto:${LOCATIONS.varna.email}`}
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 group-hover:bg-[var(--color-secondary)]/20 transition-colors">
                    <Mail className="w-4 h-4 text-[var(--color-secondary)]" />
                  </div>
                  <span className="text-sm">{LOCATIONS.varna.email}</span>
                </a>
                <div className="flex items-start gap-3 text-white">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 flex-shrink-0">
                    <MapPin className="w-4 h-4 text-[var(--color-secondary)]" />
                  </div>
                  <div className="text-sm pt-1">
                    <p className="mb-1">Варна: {LOCATIONS.varna.address}</p>
                    <p>Нова Загора: {LOCATIONS.novaZagora.address}</p>
                  </div>
                </div>
                {/* Working Hours - Desktop */}
                <div className="flex items-start gap-3 text-white pt-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 flex-shrink-0">
                    <Clock className="w-4 h-4 text-[var(--color-secondary)]" />
                  </div>
                  <div className="text-sm pt-1">
                    <p className="mb-1">Пон-Пет: 09:00-18:00</p>
                    <p>Събота: 09:00-16:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/40 text-xs">
              © {currentYear} {SITE_CONFIG.nameBg}
            </p>
            <div className="flex items-center gap-4 text-xs">
              <Link href="/privacy" className="text-white/40 hover:text-white/70 transition-colors">
                Поверителност
              </Link>
              <span className="text-white/20">•</span>
              <Link href="/terms" className="text-white/40 hover:text-white/70 transition-colors">
                Условия
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
