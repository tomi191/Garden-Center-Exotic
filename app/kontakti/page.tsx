import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { LOCATIONS, SOCIAL_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Контакти | Екзотик",
  description: "Свържете се с нас. Шоуруми във Варна и Нова Загора.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Свържете се с нас"
        description="Нашите експерти са тук, за да ви помогнат с избора на идеалните растения."
      />

      <Section className="relative z-10 -mt-20 pb-24">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Cards */}
            <div className="lg:col-span-1 space-y-6">
              {/* Varna Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-xl">
                <div className="w-12 h-12 bg-[var(--color-primary-light)] rounded-2xl flex items-center justify-center mb-6 text-[var(--color-primary)]">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">Варна</h3>
                <p className="text-[var(--color-gray-600)] mb-6 text-sm leading-relaxed">
                  {LOCATIONS.varna.address}<br/>{LOCATIONS.varna.city}
                </p>
                <div className="space-y-3">
                   <a href={`tel:${LOCATIONS.varna.phone}`} className="flex items-center gap-3 text-sm font-medium hover:text-[var(--color-primary)] transition-colors">
                     <Phone className="w-4 h-4 text-[var(--color-secondary)]" />
                     {LOCATIONS.varna.phone}
                   </a>
                   <a href={`mailto:${LOCATIONS.varna.email}`} className="flex items-center gap-3 text-sm font-medium hover:text-[var(--color-primary)] transition-colors">
                     <Mail className="w-4 h-4 text-[var(--color-secondary)]" />
                     {LOCATIONS.varna.email}
                   </a>
                   <div className="flex items-start gap-3 text-sm text-[var(--color-gray-500)] pt-2 border-t border-gray-100 mt-4">
                     <Clock className="w-4 h-4 mt-0.5" />
                     <div>
                       <p>Пн-Пт: {LOCATIONS.varna.hours.weekdays}</p>
                       <p>Съб: {LOCATIONS.varna.hours.saturday}</p>
                     </div>
                   </div>
                </div>
              </div>

              {/* Nova Zagora Card */}
              <div className="bg-white rounded-[2rem] p-8 shadow-xl">
                <div className="w-12 h-12 bg-[var(--color-secondary-light)] rounded-2xl flex items-center justify-center mb-6 text-[var(--color-secondary)]">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">Нова Загора</h3>
                <p className="text-[var(--color-gray-600)] mb-6 text-sm leading-relaxed">
                  {LOCATIONS.novaZagora.address}<br/>{LOCATIONS.novaZagora.city}
                </p>
                <div className="space-y-3">
                   <a href={`tel:${LOCATIONS.novaZagora.phone}`} className="flex items-center gap-3 text-sm font-medium hover:text-[var(--color-secondary)] transition-colors">
                     <Phone className="w-4 h-4 text-[var(--color-primary)]" />
                     {LOCATIONS.novaZagora.phone}
                   </a>
                   <a href={`mailto:${LOCATIONS.novaZagora.email}`} className="flex items-center gap-3 text-sm font-medium hover:text-[var(--color-secondary)] transition-colors">
                     <Mail className="w-4 h-4 text-[var(--color-primary)]" />
                     {LOCATIONS.novaZagora.email}
                   </a>
                </div>
              </div>

              {/* Quick Chat */}
              <a 
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#25D366] text-white rounded-[2rem] p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-2">
                  <MessageCircle className="w-8 h-8" />
                  <ArrowRight className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">Чат в WhatsApp</h3>
                <p className="text-white/80 text-sm">Отговаряме бързо</p>
              </a>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl h-full border border-gray-100">
                <div className="max-w-xl">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Пишете ни</h2>
                  <p className="text-[var(--color-gray-600)] mb-8">
                    Имате въпроси за продукти или партньорство? Попълнете формата и ще се свържем с вас до 24 часа.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}