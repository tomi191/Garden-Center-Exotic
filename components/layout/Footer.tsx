import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle, Leaf } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LOCATIONS, SITE_CONFIG, SOCIAL_LINKS, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[var(--color-foreground)] to-[#16311d] text-white">
      {/* Main Footer Content */}
      <Container>
        <div className="py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">{SITE_CONFIG.nameBg}</span>
            </div>
            <p className="text-white/70 mb-8 leading-relaxed">
              Висококачествени цветя първо качество от Колумбия, Кения, Гърция, Нидерландия, Турция и България. 27 години опит.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/5 hover:bg-[var(--color-accent)] rounded-xl flex items-center justify-center transition-all hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/5 hover:bg-[var(--color-accent)] rounded-xl flex items-center justify-center transition-all hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 bg-white/5 hover:bg-[var(--color-accent)] rounded-xl flex items-center justify-center transition-all hover:scale-105"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-8 text-white">Бързи Връзки</h3>
            <ul className="space-y-3.5">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-all hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Varna Location */}
          <div>
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2 text-white">
              <div className="w-8 h-8 bg-[var(--color-accent)]/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              {LOCATIONS.varna.name}
            </h3>
            <ul className="space-y-3.5 text-white/70">
              <li className="leading-relaxed">{LOCATIONS.varna.address}</li>
              <li>{LOCATIONS.varna.city} {LOCATIONS.varna.postalCode}</li>
              <li className="flex items-center gap-2.5 pt-2">
                <Phone className="w-4 h-4 text-[var(--color-accent)]" />
                <a
                  href={`tel:${LOCATIONS.varna.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {LOCATIONS.varna.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--color-accent)]" />
                <a
                  href={`mailto:${LOCATIONS.varna.email}`}
                  className="hover:text-white transition-colors"
                >
                  {LOCATIONS.varna.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Nova Zagora Location */}
          <div>
            <h3 className="text-lg font-bold mb-8 flex items-center gap-2 text-white">
              <div className="w-8 h-8 bg-[var(--color-accent)]/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              {LOCATIONS.novaZagora.name}
            </h3>
            <ul className="space-y-3.5 text-white/70">
              <li className="leading-relaxed">{LOCATIONS.novaZagora.address}</li>
              <li>{LOCATIONS.novaZagora.city}</li>
              <li className="flex items-center gap-2.5 pt-2">
                <Phone className="w-4 h-4 text-[var(--color-accent)]" />
                <a
                  href={`tel:${LOCATIONS.novaZagora.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {LOCATIONS.novaZagora.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--color-accent)]" />
                <a
                  href={`mailto:${LOCATIONS.novaZagora.email}`}
                  className="hover:text-white transition-colors"
                >
                  {LOCATIONS.novaZagora.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/60">
            <p className="text-sm">
              © {currentYear} {SITE_CONFIG.name}. Всички права запазени.
            </p>
            <p className="text-sm font-medium">
              От {SITE_CONFIG.founded} г. | 27 години опит
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
