import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, Building2, Flower, Truck } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
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
    image: "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?q=80&w=2071&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
    href: "/uslugi/za-biznesa",
    cta: "Вижте B2B оферти"
  }
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Нашите Услуги"
        description="Отвъд простото предлагане на цветя. Ние създаваме атмосфера."
      />

      <Section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12">
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