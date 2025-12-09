import { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  CalendarCheck,
  PackageCheck,
  CreditCard,
  Truck,
  Phone,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "B2B Партньорство | Екзотик",
  description: "Специални условия за хотели, ресторанти и корпоративни клиенти.",
};

const tiers = [
  {
    name: "Silver",
    volume: "500 - 1000 лв/мес",
    discount: "10%",
    features: ["Приоритетна доставка", "Телефонна поддръжка", "Фактура по банка"],
    bg: "bg-white",
    border: "border-gray-200",
    text: "text-gray-900",
    button: "outline"
  },
  {
    name: "Gold",
    volume: "1000 - 5000 лв/мес",
    discount: "15%",
    features: ["Безплатна доставка", "Персонален мениджър", "Отложено плащане (30 дни)", "Ексклузивни сортове"],
    bg: "bg-[var(--color-primary-dark)]",
    border: "border-[var(--color-primary-dark)]",
    text: "text-white",
    button: "white", // custom variant logic or secondary
    badge: "Най-популярен"
  },
  {
    name: "Platinum",
    volume: "5000+ лв/мес",
    discount: "20%+",
    features: ["VIP обслужване 24/7", "Внос по поръчка", "Брандирани опаковки", "Обучение на персонал"],
    bg: "bg-gray-900",
    border: "border-gray-900",
    text: "text-white",
    button: "white"
  }
];

export default function B2BPage() {
  return (
    <>
      <Section className="bg-[var(--color-primary-dark)] text-white py-24 relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute inset-0 opacity-20">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <Container className="relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm mb-8">
            <Building2 className="w-4 h-4" />
            <span className="text-sm font-medium">B2B Партньорство</span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            Растете с нас
          </h1>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Превърнете пространството си в преживяване. Специални условия за хотели, ресторанти, офиси и организатори на събития.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/kontakti">
              <Button size="lg" className="bg-white text-[var(--color-primary-dark)] hover:bg-[var(--color-secondary)] hover:text-white rounded-full px-8">
                Заявете оферта
              </Button>
            </Link>
            <Link href="#pricing">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8">
                Разгледайте плановете
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Benefits Grid */}
      <Section className="py-24 bg-white">
        <Container>
          <div className="grid md:grid-cols-3 gap-12">
             {[
               { icon: Truck, title: "Студена верига", desc: "Гарантирана свежест чрез специализиран транспорт с температурен контрол." },
               { icon: CalendarCheck, title: "Надеждност", desc: "Точни доставки по график, съобразени с работното време на вашия бизнес." },
               { icon: CreditCard, title: "Гъвкави плащания", desc: "Възможност за отложено плащане и месечно фактуриране за редовни партньори." }
             ].map((item, i) => (
               <div key={i} className="text-center px-4">
                 <div className="w-16 h-16 mx-auto mb-6 bg-[var(--color-light)] rounded-2xl flex items-center justify-center text-[var(--color-primary)]">
                   <item.icon className="w-8 h-8" />
                 </div>
                 <h3 className="font-serif text-xl font-bold mb-3">{item.title}</h3>
                 <p className="text-gray-600 leading-relaxed">{item.desc}</p>
               </div>
             ))}
          </div>
        </Container>
      </Section>

      {/* Pricing Tiers */}
      <Section id="pricing" className="bg-[var(--color-light)] py-24">
        <Container>
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl font-bold mb-4">Партньорски Програми</h2>
            <p className="text-gray-600">Изберете нивото, което отговаря на вашите нужди</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
             {tiers.map((tier, i) => (
               <div 
                 key={i} 
                 className={`relative rounded-[2rem] p-8 border ${tier.border} ${tier.bg} ${tier.text} ${
                   tier.name === 'Gold' ? 'shadow-2xl scale-105 z-10' : 'shadow-lg'
                 }`}
               >
                 {tier.badge && (
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--color-secondary)] text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                     {tier.badge}
                   </div>
                 )}
                 
                 <div className="text-center mb-8">
                   <h3 className="font-serif text-2xl font-bold mb-2">{tier.name}</h3>
                   <div className="text-sm opacity-80 mb-6">{tier.volume}</div>
                   <div className="text-5xl font-bold mb-2">{tier.discount}</div>
                   <div className="text-sm opacity-80">отстъпка</div>
                 </div>

                 <ul className="space-y-4 mb-8">
                   {tier.features.map((feature, idx) => (
                     <li key={idx} className="flex items-start gap-3 text-sm">
                       <CheckCircle2 className={`w-5 h-5 flex-shrink-0 ${tier.text === 'text-white' ? 'text-[var(--color-secondary)]' : 'text-[var(--color-primary)]'}`} />
                       <span className="opacity-90">{feature}</span>
                     </li>
                   ))}
                 </ul>

                 <Button 
                   fullWidth 
                   variant={tier.button === 'white' ? 'secondary' : 'outline'}
                   className="rounded-xl"
                 >
                   Избери {tier.name}
                 </Button>
               </div>
             ))}
          </div>
        </Container>
      </Section>
      
      {/* Contact CTA */}
      <Section className="py-24 bg-white">
        <Container>
           <div className="bg-[var(--color-background)] rounded-[3rem] p-12 text-center">
              <h2 className="font-serif text-3xl font-bold mb-6">Имате специфични изисквания?</h2>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Разбираме, че всеки бизнес е уникален. Свържете се с нашия B2B мениджър за изготвяне на индивидуална оферта.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
                 <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[var(--color-primary)]" />
                    <span className="font-bold text-lg">+359 888 123 456</span>
                 </div>
                 <span className="hidden sm:block text-gray-300">|</span>
                 <Link href="/kontakti" className="text-[var(--color-primary)] font-bold hover:underline">
                    Изпрати запитване →
                 </Link>
              </div>
           </div>
        </Container>
      </Section>
    </>
  );
}