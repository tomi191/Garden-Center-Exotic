import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, Briefcase } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Услуги",
  description: "Професионални услуги за физически лица и бизнес. Доставка, аранжименти, озеленяване и абонаменти.",
  keywords: ["услуги", "доставка", "букети", "озеленяване", "B2B"],
};

const services = [
  {
    icon: Home,
    title: "За Физически Лица",
    description: "Професионални услуги за вашия дом и градина",
    features: [
      "Доставка на цветя и растения",
      "Букети и аранжименти по поръчка",
      "Консултации за грижи",
      "Подаръци за специални случаи",
    ],
    buttonLabel: "Свържете се с нас",
    href: "/kontakti",
    gradient: "from-[var(--color-primary)] to-[var(--color-primary-hover)]",
    buttonColor: "text-[var(--color-primary)]",
  },
  {
    icon: Briefcase,
    title: "За Бизнеса",
    description: "Специализирани B2B решения и абонаменти",
    features: [
      "Абонаментна доставка",
      "Озеленяване на офиси",
      "Цветя за събития и сватби",
      "Обемни отстъпки",
    ],
    buttonLabel: "Виж B2B услуги",
    href: "/uslugi/za-biznesa",
    gradient: "from-[var(--color-secondary)] to-[var(--color-secondary-hover)]",
    buttonColor: "text-[var(--color-secondary)]",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Нашите Услуги"
        description="Професионално обслужване за вашите нужди"
      />

      <Section className="bg-white py-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={index}
                  className={`bg-gradient-to-br ${service.gradient} text-white border-0 shadow-xl`}
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mb-4 bg-white/20 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4 text-white">
                      {service.title}
                    </h2>
                  <p className="text-white/90 mb-6">{service.description}</p>
                  <ul className="space-y-3 mb-8 text-white/90">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span>✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href}>
                    <Button
                      className={`bg-white ${service.buttonColor} hover:bg-gray-100 group`}
                    >
                      {service.buttonLabel}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
