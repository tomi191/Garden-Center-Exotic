import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle, Leaf, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LOCATIONS, SITE_CONFIG, SOCIAL_LINKS, NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - SITE_CONFIG.founded;

  return (
    <footer className="relative bg-[var(--color-primary-dark)] text-white mt-20">
      {/* Organic Top Curve */}
      <div className="absolute -top-16 left-0 right-0 h-16 bg-[var(--color-primary-dark)] rounded-t-[3rem] -z-10" />

      <Container className="pt-8 pb-12">
        {/* Top Section: CTA & Brand */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 border-b border-white/10 pb-16">
          <div className="space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
              Готови ли сте за <br />
              <span className="text-[var(--color-secondary)] italic">зелена промяна?</span>
            </h2>
            <p className="text-white/60 text-lg max-w-md">
              Свържете се с нашите експерти за консултация или посетете нашите градински центрове.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
            <Link href="/kontakti">
              <Button size="lg" className="bg-white text-[var(--color-primary-dark)] hover:bg-[var(--color-secondary)] hover:text-white border-none rounded-full px-8 text-lg">
                Направи запитване
              </Button>
            </Link>
            <Link href="/produkti">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 text-lg">
                Разгледай Каталога
              </Button>
            </Link>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                <Leaf className="w-6 h-6 text-[var(--color-secondary)]" />
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold">{SITE_CONFIG.nameBg}</span>
                <span className="text-[10px] uppercase tracking-widest text-white/50">Est. 1998</span>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed">
              Вашият доверен партньор в озеленяването. Директен внос на екзотични растения и цветя от най-добрите световни производители.
            </p>
            <div className="flex gap-4 pt-2">
              {[
                { icon: Facebook, href: SOCIAL_LINKS.facebook },
                { icon: Instagram, href: SOCIAL_LINKS.instagram },
                { icon: MessageCircle, href: SOCIAL_LINKS.whatsapp }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-[var(--color-secondary)] flex items-center justify-center transition-all hover:-translate-y-1"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="font-serif text-xl font-bold mb-6 text-[var(--color-secondary)]">Меню</h3>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-[var(--color-secondary)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Locations */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 gap-8">
            {/* Varna */}
            <div>
              <h3 className="font-serif text-xl font-bold mb-6 text-[var(--color-secondary)]">Варна</h3>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 flex-shrink-0 text-white/40" />
                  <span>{LOCATIONS.varna.address},<br/>{LOCATIONS.varna.city}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 flex-shrink-0 text-white/40" />
                  <a href={`tel:${LOCATIONS.varna.phone}`} className="hover:text-white">{LOCATIONS.varna.phone}</a>
                </li>
                <li className="flex gap-3">
                  <Mail className="w-5 h-5 flex-shrink-0 text-white/40" />
                  <a href={`mailto:${LOCATIONS.varna.email}`} className="hover:text-white">{LOCATIONS.varna.email}</a>
                </li>
              </ul>
            </div>

            {/* Nova Zagora */}
            <div>
              <h3 className="font-serif text-xl font-bold mb-6 text-[var(--color-secondary)]">Нова Загора</h3>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex gap-3">
                  <MapPin className="w-5 h-5 flex-shrink-0 text-white/40" />
                  <span>{LOCATIONS.novaZagora.address},<br/>{LOCATIONS.novaZagora.city}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="w-5 h-5 flex-shrink-0 text-white/40" />
                  <a href={`tel:${LOCATIONS.novaZagora.phone}`} className="hover:text-white">{LOCATIONS.novaZagora.phone}</a>
                </li>
                <li className="flex gap-3">
                  <Mail className="w-5 h-5 flex-shrink-0 text-white/40" />
                  <a href={`mailto:${LOCATIONS.novaZagora.email}`} className="hover:text-white">{LOCATIONS.novaZagora.email}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {currentYear} {SITE_CONFIG.nameBg} • Всички права запазени</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white">Общи условия</Link>
            <Link href="/privacy" className="hover:text-white">Политика за поверителност</Link>
            <a href="https://nextjs.org" target="_blank" rel="noreferrer" className="hover:text-white">Powered by Next.js</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}