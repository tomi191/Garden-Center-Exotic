import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle, Leaf, Clock, Award, Globe, Shield } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LOCATIONS, SITE_CONFIG, SOCIAL_LINKS, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - SITE_CONFIG.founded;

  return (
    <footer className="bg-gradient-to-b from-[var(--color-foreground)] to-[#16311d] text-white">
      {/* Trust Bar */}
      <div className="border-b border-white/10">
        <Container>
          <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">{yearsInBusiness}+ години</div>
                <div className="text-xs text-white/60">На пазара</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">6 държави</div>
                <div className="text-xs text-white/60">Внос</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">Студена верига</div>
                <div className="text-xs text-white/60">Гарантирана</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">2 локации</div>
                <div className="text-xs text-white/60">Варна, Нова Загора</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Content */}
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">{SITE_CONFIG.nameBg}</span>
            </div>
            <p className="text-white/70 mb-6 leading-relaxed text-sm">
              Висококачествени цветя първо качество от Колумбия, Кения, Гърция, Нидерландия, Турция и България. {yearsInBusiness} години опит.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-[var(--color-accent)] rounded-lg flex items-center justify-center transition-all hover:scale-105"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-[var(--color-accent)] rounded-lg flex items-center justify-center transition-all hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 hover:bg-[var(--color-accent)] rounded-lg flex items-center justify-center transition-all hover:scale-105"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
            <div className="text-xs text-white/50">
              Следвайте ни за актуални оферти и съвети
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold mb-6 text-white">Навигация</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-all hover:translate-x-1 inline-block"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Varna Location */}
          <div>
            <h3 className="text-base font-bold mb-6 flex items-center gap-2 text-white">
              <div className="w-7 h-7 bg-[var(--color-accent)]/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              {LOCATIONS.varna.name}
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="leading-relaxed">{LOCATIONS.varna.address}</li>
              <li>{LOCATIONS.varna.city} {LOCATIONS.varna.postalCode}</li>
              <li className="flex items-center gap-2 pt-2">
                <Phone className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <a
                  href={`tel:${LOCATIONS.varna.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {LOCATIONS.varna.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <a
                  href={`mailto:${LOCATIONS.varna.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {LOCATIONS.varna.email}
                </a>
              </li>
              <li className="flex items-start gap-2 pt-2">
                <Clock className="w-3.5 h-3.5 text-[var(--color-accent)] mt-0.5" />
                <div className="text-xs">
                  <div>Пн-Пт: {LOCATIONS.varna.hours.weekdays}</div>
                  <div>Сб: {LOCATIONS.varna.hours.saturday}</div>
                  <div className="text-white/50">{LOCATIONS.varna.hours.sunday}</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Nova Zagora Location */}
          <div>
            <h3 className="text-base font-bold mb-6 flex items-center gap-2 text-white">
              <div className="w-7 h-7 bg-[var(--color-accent)]/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              {LOCATIONS.novaZagora.name}
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="leading-relaxed">{LOCATIONS.novaZagora.address}</li>
              <li>{LOCATIONS.novaZagora.city}</li>
              <li className="flex items-center gap-2 pt-2">
                <Phone className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <a
                  href={`tel:${LOCATIONS.novaZagora.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {LOCATIONS.novaZagora.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <a
                  href={`mailto:${LOCATIONS.novaZagora.email}`}
                  className="hover:text-white transition-colors break-all"
                >
                  {LOCATIONS.novaZagora.email}
                </a>
              </li>
              <li className="flex items-start gap-2 pt-2">
                <Clock className="w-3.5 h-3.5 text-[var(--color-accent)] mt-0.5" />
                <div className="text-xs">
                  <div>Пн-Пт: {LOCATIONS.novaZagora.hours.weekdays}</div>
                  <div>Сб: {LOCATIONS.novaZagora.hours.saturday}</div>
                  <div className="text-white/50">{LOCATIONS.novaZagora.hours.sunday}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/60 text-xs">
            <p>
              © {currentYear} {SITE_CONFIG.nameBg}. Всички права запазени.
            </p>
            <div className="flex items-center gap-4">
              <span>От {SITE_CONFIG.founded} г.</span>
              <span className="hidden md:inline">•</span>
              <span>{yearsInBusiness} години традиция</span>
              <span className="hidden md:inline">•</span>
              <span>Варна & Нова Загора</span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
