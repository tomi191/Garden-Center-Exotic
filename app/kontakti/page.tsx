import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight, Send } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
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
      {/* Hero Section - consistent with other pages */}
      <section className="relative min-h-[70vh] flex items-center">
        {/* Full Screen Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/kontakti-bg.png"
            alt="Свържете се с нас"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/25" />
        </div>

        <Container className="relative z-10 py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-[var(--color-secondary)] text-sm font-medium tracking-wider uppercase mb-4">
              Ние сме тук за вас
            </span>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold !text-white mb-6 leading-tight drop-shadow-lg">
              Свържете се с нас
            </h1>

            <p className="!text-white text-lg md:text-xl leading-relaxed mb-8 drop-shadow-md">
              Нашите експерти са тук, за да ви помогнат с избора на идеалните
              растения. Пишете ни или ни посетете в нашите локации.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href={`tel:${LOCATIONS.varna.phone}`}>
                <Button className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white rounded-full px-6">
                  <Phone className="w-4 h-4 mr-2" />
                  Обади се сега
                </Button>
              </a>
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-6">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp чат
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>

      <Section className="bg-white py-16 md:py-20">
        <Container>
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[var(--color-secondary)] font-semibold tracking-wider uppercase text-sm mb-2 block">
              Контактна информация
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
              Как да се свържете с нас
            </h2>
            <p className="text-[var(--color-gray-600)] max-w-2xl mx-auto">
              Изберете удобния за вас начин за връзка - обадете се, пишете ни или ни посетете
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Cards */}
            <div className="lg:col-span-1 space-y-6">
              {/* Varna Card */}
              <div className="bg-[var(--color-light)] rounded-[2rem] p-8 shadow-lg border border-[var(--color-border)]">
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
              <div className="bg-[var(--color-light)] rounded-[2rem] p-8 shadow-lg border border-[var(--color-border)]">
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
              <div className="bg-[var(--color-light)] rounded-[2rem] p-8 md:p-12 shadow-lg h-full border border-[var(--color-border)]">
                <div className="max-w-xl mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-sm font-medium mb-4">
                    <Send className="w-4 h-4" />
                    Форма за контакт
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Пишете ни</h2>
                  <p className="text-[var(--color-gray-600)]">
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