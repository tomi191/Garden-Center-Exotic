import Link from "next/link";
import Image from "next/image";
import { Home, Search, Phone, ArrowLeft, Flower2, Leaf } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { LOCATIONS } from "@/lib/constants";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[var(--color-background)] via-white to-[var(--color-primary-light)] relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating leaves */}
        <div className="absolute top-20 left-10 text-[var(--color-primary)]/10 animate-pulse">
          <Leaf className="w-32 h-32 rotate-45" />
        </div>
        <div className="absolute top-40 right-20 text-[var(--color-secondary)]/10 animate-pulse delay-500">
          <Flower2 className="w-24 h-24 -rotate-12" />
        </div>
        <div className="absolute bottom-40 left-1/4 text-[var(--color-primary)]/5 animate-pulse delay-1000">
          <Leaf className="w-48 h-48 rotate-180" />
        </div>
        <div className="absolute bottom-20 right-10 text-[var(--color-secondary)]/10 animate-pulse delay-700">
          <Flower2 className="w-20 h-20 rotate-45" />
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[var(--color-secondary)]/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="min-h-screen flex flex-col items-center justify-center py-20 text-center">
          {/* 404 Number with gradient */}
          <div className="relative mb-8">
            <span className="text-[12rem] md:text-[16rem] font-serif font-bold leading-none bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[var(--color-secondary)] bg-clip-text text-transparent select-none">
              404
            </span>
            {/* Decorative flower in the 0 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
              <Flower2 className="w-24 h-24 text-[var(--color-secondary)]" />
            </div>
          </div>

          {/* Message */}
          <div className="max-w-lg mx-auto mb-10">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
              Страницата не е намерена
            </h1>
            <p className="text-lg text-[var(--color-gray-600)] leading-relaxed">
              Изглежда, че тази страница е отцъфнала. Но не се притеснявайте -
              нашата градина е пълна с прекрасни растения, които ви очакват!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link href="/">
              <Button size="lg" className="rounded-full px-8 gap-2">
                <Home className="w-5 h-5" />
                Към началото
              </Button>
            </Link>
            <Link href="/produkti">
              <Button variant="outline" size="lg" className="rounded-full px-8 gap-2">
                <Search className="w-5 h-5" />
                Разгледай продуктите
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="w-full max-w-2xl">
            <p className="text-sm text-[var(--color-gray-500)] mb-6 uppercase tracking-wider font-medium">
              Или посетете
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { href: "/uslugi", label: "Услуги", icon: "🌸" },
                { href: "/za-nas", label: "За нас", icon: "🌿" },
                { href: "/lokacii", label: "Локации", icon: "📍" },
                { href: "/kontakti", label: "Контакти", icon: "💬" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-center gap-2 px-4 py-3 bg-white rounded-xl border border-[var(--color-gray-200)] hover:border-[var(--color-primary)] hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">{link.icon}</span>
                  <span className="text-sm font-medium text-[var(--color-gray-700)] group-hover:text-[var(--color-primary)]">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-16 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-[var(--color-gray-200)] shadow-sm">
            <p className="text-sm text-[var(--color-gray-600)] mb-3">
              Имате нужда от помощ? Свържете се с нас:
            </p>
            <a
              href={`tel:${LOCATIONS.varna.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:text-[var(--color-primary-dark)] transition-colors"
            >
              <Phone className="w-5 h-5" />
              {LOCATIONS.varna.phone}
            </a>
          </div>
        </div>
      </Container>
    </main>
  );
}
