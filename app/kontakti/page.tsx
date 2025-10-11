import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle, Timer } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { LOCATIONS, SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Контакти",
  description: "Свържете се с Градински Център Екзотик. Телефон, email, адреси и работно време.",
  keywords: ["контакти", "телефон", "email", "адрес Варна", "адрес Нова Загора"],
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Свържете се с нас"
        description="Готови сме да отговорим на всички ваши въпроси. Очакваме вашето запитване!"
      />

      <Section className="bg-white py-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6">Информация за контакт</h2>
                <p className="text-[var(--color-gray-700)] mb-8">
                  Свържете се с нас по телефон, email или посетете нашите локации.
                  Работим всеки ден с изключение на неделя.
                </p>
              </div>

              {/* Varna Location */}
              <Card className="bg-[var(--color-light)] border-none">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-[var(--color-primary)] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Варна</h3>
                      <p className="text-[var(--color-gray-700)]">
                        {LOCATIONS.varna.address}
                        <br />
                        {LOCATIONS.varna.city} {LOCATIONS.varna.postalCode}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    <a
                      href={`tel:${LOCATIONS.varna.phone}`}
                      className="flex items-center gap-3 text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      <Phone className="w-5 h-5 text-[var(--color-primary)]" />
                      <span>{LOCATIONS.varna.phone}</span>
                    </a>
                    <a
                      href={`mailto:${LOCATIONS.varna.email}`}
                      className="flex items-center gap-3 text-[var(--color-gray-700)] hover:text-[var(--color-primary)] transition-colors"
                    >
                      <Mail className="w-5 h-5 text-[var(--color-primary)]" />
                      <span>{LOCATIONS.varna.email}</span>
                    </a>
                    <div className="flex items-start gap-3 text-[var(--color-gray-700)]">
                      <Clock className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <div>Пон-Пет: {LOCATIONS.varna.hours.weekdays}</div>
                        <div>Съб: {LOCATIONS.varna.hours.saturday}</div>
                        <div>Нед: {LOCATIONS.varna.hours.sunday}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Nova Zagora Location */}
              <Card className="bg-[var(--color-light)] border-none">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-[var(--color-secondary)] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-bold mb-2">Нова Загора</h3>
                      <p className="text-[var(--color-gray-700)]">
                        {LOCATIONS.novaZagora.address}
                        <br />
                        {LOCATIONS.novaZagora.city}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mt-4">
                    <a
                      href={`tel:${LOCATIONS.novaZagora.phone}`}
                      className="flex items-center gap-3 text-[var(--color-gray-700)] hover:text-[var(--color-secondary)] transition-colors"
                    >
                      <Phone className="w-5 h-5 text-[var(--color-secondary)]" />
                      <span>{LOCATIONS.novaZagora.phone}</span>
                    </a>
                    <a
                      href={`mailto:${LOCATIONS.novaZagora.email}`}
                      className="flex items-center gap-3 text-[var(--color-gray-700)] hover:text-[var(--color-secondary)] transition-colors"
                    >
                      <Mail className="w-5 h-5 text-[var(--color-secondary)]" />
                      <span>{LOCATIONS.novaZagora.email}</span>
                    </a>
                    <div className="flex items-start gap-3 text-[var(--color-gray-700)]">
                      <Clock className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <div>Пон-Пет: {LOCATIONS.novaZagora.hours.weekdays}</div>
                        <div>Съб: {LOCATIONS.novaZagora.hours.saturday}</div>
                        <div>Нед: {LOCATIONS.novaZagora.hours.sunday}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp */}
              <Card className="bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] border-none text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">WhatsApp</h4>
                      <p className="text-sm opacity-90">
                        Пишете ни директно за бързи отговори
                      </p>
                    </div>
                    <a
                      href={SOCIAL_LINKS.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-white text-[var(--color-secondary)] rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      Напиши
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="border-2 border-[var(--color-primary)]/20">
                <CardContent className="p-6 text-center">
                  <h4 className="font-bold mb-2 text-[var(--color-primary)] inline-flex items-center gap-2 justify-center">
                    <Timer className="w-5 h-5" />
                    Време за отговор
                  </h4>
                  <p className="text-[var(--color-gray-700)]">
                    Отговаряме на всички запитвания в рамките на{" "}
                    <strong>24 часа</strong> в работни дни
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right - Contact Form */}
            <div>
              <h2 className="mb-6">Изпратете запитване</h2>
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
