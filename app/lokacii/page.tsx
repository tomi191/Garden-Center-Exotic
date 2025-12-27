import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Clock, MapPin, Navigation, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Map } from "@/components/ui/Map";
import { LOCATIONS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Локации",
  description: "Градински Център Екзотик във Варна и Нова Загора. Адреси, работно време и контакти.",
  keywords: ["градински център Варна", "градински център Нова Загора", "адрес", "работно време"],
};

export default function LocationsPage() {
  return (
    <>
      {/* Hero Section - consistent with other pages */}
      <section className="relative min-h-[70vh] flex items-center">
        {/* Full Screen Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/lokacii-bg.png"
            alt="Нашите Локации"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/25" />
        </div>

        <Container className="relative z-10 py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-[var(--color-secondary)] text-sm font-medium tracking-wider uppercase mb-4">
              Варна & Нова Загора
            </span>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold !text-white mb-6 leading-tight drop-shadow-lg">
              Нашите Локации
            </h1>

            <p className="!text-white text-lg md:text-xl leading-relaxed mb-8 drop-shadow-md">
              Посетете ни във Варна или Нова Загора. Очакваме ви с богат избор
              от растения и професионални съвети от нашите експерти.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="#varna">
                <Button className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white rounded-full px-6">
                  Варна
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="#nova-zagora">
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-6">
                  <MapPin className="w-4 h-4 mr-2" />
                  Нова Загора
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Section id="varna" className="bg-white py-16 md:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Info */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-sm font-medium mb-4">
                <MapPin className="w-4 h-4" />
                Основна локация
              </div>

              <h2 className="mb-6">{LOCATIONS.varna.name}</h2>

              <div className="space-y-6 mb-8">
                {/* Address */}
                <Card>
                  <CardContent className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Адрес</h4>
                      <p className="text-[var(--color-gray-700)]">
                        {LOCATIONS.varna.address}
                        <br />
                        {LOCATIONS.varna.city} {LOCATIONS.varna.postalCode}
                        <br />
                        {LOCATIONS.varna.country}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Working Hours */}
                <Card>
                  <CardContent className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[var(--color-secondary)]" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Работно време</h4>
                      <div className="space-y-1 text-[var(--color-gray-700)]">
                        <div className="flex justify-between gap-4">
                          <span className="font-medium">Понеделник - Петък:</span>
                          <span>{LOCATIONS.varna.hours.weekdays}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="font-medium">Събота - Неделя:</span>
                          <span className="text-[var(--color-error)]">Почивни дни</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact */}
                <Card>
                  <CardContent>
                    <h4 className="font-bold mb-3">Контакти</h4>
                    <div className="space-y-3">
                      <a
                        href={`tel:${LOCATIONS.varna.phone}`}
                        className="flex items-center gap-3 text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors group"
                      >
                        <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors">
                          <Phone className="w-5 h-5 text-[var(--color-primary)]" />
                        </div>
                        <span>{LOCATIONS.varna.phone}</span>
                      </a>
                      <a
                        href={`mailto:${LOCATIONS.varna.email}`}
                        className="flex items-center gap-3 text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors group"
                      >
                        <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors">
                          <Mail className="w-5 h-5 text-[var(--color-primary)]" />
                        </div>
                        <span>{LOCATIONS.varna.email}</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Directions */}
              <Card className="bg-[var(--color-light)] border-none">
                <CardContent>
                  <div className="flex items-start gap-3">
                    <Navigation className="w-5 h-5 text-[var(--color-primary)] mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">Как да стигнете до нас</h4>
                      <p className="text-sm text-[var(--color-gray-700)]">
                        От центъра на Варна: следвайте указанията за Вятърна мелница.
                        Намираме се на ул. Франга дере 27А, над Вятърна мелница.
                        Има паркинг пред обекта.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right - Map */}
            <div>
              <Map
                lat={LOCATIONS.varna.coordinates.lat}
                lng={LOCATIONS.varna.coordinates.lng}
                name={LOCATIONS.varna.name}
              />

              {/* Gallery */}
              <div className="mt-6">
                <h4 className="font-bold mb-4">Галерия</h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    'https://images.unsplash.com/photo-1466781783364-36c955e42a7f?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1591958911259-bee2173bdccc?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
                  ].map((img, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={img}
                        alt={`Градински Център Екзотик Варна ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Nova Zagora Location */}
      <Section id="nova-zagora" className="bg-[var(--color-light)] py-16 md:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Map */}
            <div className="order-2 lg:order-1">
              <Map
                lat={LOCATIONS.novaZagora.coordinates.lat}
                lng={LOCATIONS.novaZagora.coordinates.lng}
                name={LOCATIONS.novaZagora.name}
              />

              {/* Gallery */}
              <div className="mt-6">
                <h4 className="font-bold mb-4">Галерия</h4>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop',
                  ].map((img, i) => (
                    <div key={i} className="aspect-square rounded-lg overflow-hidden shadow-lg">
                      <img
                        src={img}
                        alt={`Градински Център Екзотик Нова Загора ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Info */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-full text-sm font-medium mb-4">
                <MapPin className="w-4 h-4" />
                Втора локация
              </div>

              <h2 className="mb-6">{LOCATIONS.novaZagora.name}</h2>

              <div className="space-y-6 mb-8">
                {/* Address */}
                <Card>
                  <CardContent className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-secondary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[var(--color-secondary)]" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Адрес</h4>
                      <p className="text-[var(--color-gray-700)]">
                        {LOCATIONS.novaZagora.address}
                        <br />
                        {LOCATIONS.novaZagora.city}
                        <br />
                        {LOCATIONS.novaZagora.country}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Working Hours */}
                <Card>
                  <CardContent className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[var(--color-secondary)]" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Работно време</h4>
                      <div className="space-y-1 text-[var(--color-gray-700)]">
                        <div className="flex justify-between gap-4">
                          <span className="font-medium">Понеделник - Петък:</span>
                          <span>{LOCATIONS.novaZagora.hours.weekdays}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="font-medium">Събота - Неделя:</span>
                          <span className="text-[var(--color-error)]">Почивни дни</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact */}
                <Card>
                  <CardContent>
                    <h4 className="font-bold mb-3">Контакти</h4>
                    <div className="space-y-3">
                      <a
                        href={`tel:${LOCATIONS.novaZagora.phone}`}
                        className="flex items-center gap-3 text-[var(--color-gray-700)] hover:text-[var(--color-secondary)] transition-colors group"
                      >
                        <div className="w-10 h-10 bg-[var(--color-secondary)]/10 rounded-full flex items-center justify-center group-hover:bg-[var(--color-secondary)]/20 transition-colors">
                          <Phone className="w-5 h-5 text-[var(--color-secondary)]" />
                        </div>
                        <span>{LOCATIONS.novaZagora.phone}</span>
                      </a>
                      <a
                        href={`mailto:${LOCATIONS.novaZagora.email}`}
                        className="flex items-center gap-3 text-[var(--color-gray-700)] hover:text-[var(--color-secondary)] transition-colors group"
                      >
                        <div className="w-10 h-10 bg-[var(--color-secondary)]/10 rounded-full flex items-center justify-center group-hover:bg-[var(--color-secondary)]/20 transition-colors">
                          <Mail className="w-5 h-5 text-[var(--color-secondary)]" />
                        </div>
                        <span>{LOCATIONS.novaZagora.email}</span>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Directions */}
              <Card className="bg-white border-none">
                <CardContent>
                  <div className="flex items-start gap-3">
                    <Navigation className="w-5 h-5 text-[var(--color-secondary)] mt-1" />
                    <div>
                      <h4 className="font-bold mb-2">Как да стигнете до нас</h4>
                      <p className="text-sm text-[var(--color-gray-700)]">
                        От магистрала Тракия: излез Нова Загора. Локацията е удобна
                        за достъп както от София-Бургас, така и от Стара Загора и Сливен.
                        Намира се на главния път през града.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
