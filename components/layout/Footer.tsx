"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
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
    { label: "Рязани цветя", href: "/produkti/ryazani-cvetya" },
    { label: "Саксийни растения", href: "/produkti/saksiyni-rasteniya" },
    { label: "Сватбена декорация", href: "/uslugi" },
    { label: "B2B доставки", href: "/kontakti" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a2e1a]">
      {/* Main Footer */}
      <Container>
        <div className="py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

            {/* Brand Column */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-6">
                <div className="relative w-[200px] h-[70px]">
                  <Image
                    src="/images/logos/Logo print file white.png"
                    alt="Градински Център Екзотик"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
              <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-xs">
                Директен вносител на премиум цветя от Еквадор, Холандия и Турция. Над 27 години опит.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-4">
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Links Column */}
            <div className="lg:col-span-2">
              <h4 className="text-white font-medium mb-6">Навигация</h4>
              <ul className="space-y-4">
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
              <h4 className="text-white font-medium mb-6">Продукти</h4>
              <ul className="space-y-4">
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
              <h4 className="text-white font-medium mb-6">Контакти</h4>
              <div className="space-y-5">
                <a
                  href={`tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                >
                  <Phone className="w-4 h-4 text-[var(--color-secondary)]" />
                  <span className="text-sm">{LOCATIONS.varna.phone}</span>
                </a>
                <a
                  href={`mailto:${LOCATIONS.varna.email}`}
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[var(--color-secondary)]" />
                  <span className="text-sm">{LOCATIONS.varna.email}</span>
                </a>
                <div className="flex items-start gap-3 text-white/70">
                  <MapPin className="w-4 h-4 text-[var(--color-secondary)] mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="mb-1">Варна: {LOCATIONS.varna.address}</p>
                    <p>Нова Загора: {LOCATIONS.novaZagora.address}</p>
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
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © {currentYear} {SITE_CONFIG.nameBg}
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-white/50 hover:text-white/80 transition-colors">
                Поверителност
              </Link>
              <Link href="/terms" className="text-white/50 hover:text-white/80 transition-colors">
                Условия
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
