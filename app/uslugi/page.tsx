import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Building2, Flower, Phone } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ServiceShowcase } from "@/components/sections/ServiceShowcase";

export const metadata: Metadata = {
  title: "Услуги | Градински Център Екзотик",
  description: "Професионални решения за озеленяване, доставка на цветя и събития.",
};

const mainServices = [
  {
    title: "За Дома & Градината",
    description: "Превърнете дома си в зелен оазис с нашата помощ.",
    icon: Flower,
    features: [
      "Доставка на букети и саксийни растения",
      "Проектиране на домашни градини",
      "Консултации за болни растения",
      "Пресаждане на място"
    ],
    image: "/images/services/consultations.png",
    href: "/kontakti",
    cta: "Заявете консултация"
  },
  {
    title: "Корпоративни Клиенти",
    description: "Цялостни B2B решения за хотели, офиси и ресторанти.",
    icon: Building2,
    features: [
      "Абонаментно озеленяване",
      "Седмична доставка на свежи цветя",
      "Поддръжка на зелени площи",
      "Корпоративни подаръци"
    ],
    image: "/images/services/b2b.png",
    href: "/uslugi/za-biznesa",
    cta: "Вижте B2B оферти"
  }
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section - consistent with other pages */}
      <section className="relative min-h-[70vh] flex items-center">
        {/* Full Screen Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/services-bg.jpg"
            alt="Нашите Услуги"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/25" />
        </div>

        <Container className="relative z-10 py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-[var(--color-secondary)] text-sm font-medium tracking-wider uppercase mb-4">
              Професионални Решения
            </span>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold !text-white mb-6 leading-tight drop-shadow-lg">
              Нашите Услуги
            </h1>

            <p className="!text-white text-lg md:text-xl leading-relaxed mb-8 drop-shadow-md">
              Отвъд простото предлагане на цветя. Ние създаваме атмосфера и превръщаме
              всеки повод в незабравимо преживяване.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/kontakti">
                <Button className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white rounded-full px-6">
                  Заявете консултация
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <a href="tel:0895670370">
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-6">
                  <Phone className="w-4 h-4 mr-2" />
                  089 567 0370
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Services Section */}
      <Section className="py-16 md:py-20 bg-white">
        <Container>
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[var(--color-secondary)] font-semibold tracking-wider uppercase text-sm mb-2 block">
              Какво предлагаме
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              Основни Направления
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {mainServices.map((service, index) => (
              <div 
                key={index} 
                className="group relative rounded-[2.5rem] overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100"
              >
                {/* Image Section */}
                <div className="h-64 sm:h-80 overflow-hidden relative">
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                   <img 
                     src={service.image} 
                     alt={service.title} 
                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                   <div className="absolute top-6 left-6 z-20 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center text-[var(--color-primary)] shadow-lg">
                      <service.icon className="w-6 h-6" />
                   </div>
                </div>

                {/* Content Section */}
                <div className="p-8 sm:p-10">
                   <h2 className="font-serif text-3xl font-bold text-[var(--color-primary-dark)] mb-3">
                     {service.title}
                   </h2>
                   <p className="text-[var(--color-gray-600)] mb-8 text-lg leading-relaxed">
                     {service.description}
                   </p>

                   <ul className="space-y-4 mb-10">
                     {service.features.map((feature, i) => (
                       <li key={i} className="flex items-center gap-3 text-[var(--color-gray-700)]">
                         <div className="w-6 h-6 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center flex-shrink-0">
                           <Sparkles className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                         </div>
                         {feature}
                       </li>
                     ))}
                   </ul>

                   <Link href={service.href}>
                     <Button size="lg" className="w-full sm:w-auto rounded-xl group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors">
                       {service.cta}
                       <ArrowRight className="ml-2 w-5 h-5" />
                     </Button>
                   </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Процес на работа (вече съществуващ компонент, който може да се освежи) */}
      <ServiceShowcase />
    </>
  );
}