import { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Hotel,
  UtensilsCrossed,
  Briefcase,
  Calendar as CalendarIcon,
  Truck,
  Phone,
  CheckCircle,
  CreditCard,
  Package,
  Clock,
  Shield,
} from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "B2B Услуги",
  description: "Професионални B2B услуги за хотели, ресторанти, офиси и събития. Обемни отстъпки, гъвкави условия и гарантирано качество.",
  keywords: [
    "цветя за хотели",
    "цветя за ресторанти",
    "озеленяване офиси",
    "цветя за събития",
    "доставка на едро",
    "абонаментна доставка",
  ],
};

export default function B2BServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <Section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white relative overflow-hidden pt-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-white rounded-full"></div>
        </div>

        <Container className="relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Briefcase className="w-4 h-4" />
              B2B Решения
            </div>
            <h1 className="text-white mb-6">Надежден партньор за вашия бизнес</h1>
            <p className="text-xl text-white/90 mb-8">
              Специализирани услуги за хотели, ресторанти, офиси, организатори на събития
              и цветарски магазини. Гарантирано качество и персонален подход.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakti">
                <Button size="lg" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
                  Заявка за оферта
                </Button>
              </Link>
              <Link href="#pricing">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Виж цените
                </Button>
              </Link>
            </div>
          </div>
        </Container>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
              fill="white"
            />
          </svg>
        </div>
      </Section>

      {/* Who We Serve */}
      <Section className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4">Кого обслужваме</h2>
            <p className="text-lg text-[var(--color-gray-700)]">
              Предлагаме специализирани решения за различни бизнес сегменти
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Hotel,
                title: "Хотели и Курорти",
                description: "Лоби аранжименти, стаи, събития и екстериорно озеленяване",
              },
              {
                icon: UtensilsCrossed,
                title: "Ресторанти и Кафенета",
                description: "Маси, антрета, тераси - седмични/месечни абонаменти",
              },
              {
                icon: Briefcase,
                title: "Офиси и Корпорации",
                description: "Рецепция, офис озеленяване, конферентни зали",
              },
              {
                icon: CalendarIcon,
                title: "Организатори на Събития",
                description: "Сватби, корпоративни събития - големи количества",
              },
              {
                icon: Building2,
                title: "Цветарски Магазини",
                description: "Доставка на едро - свежи цветя 2-3 пъти седмично",
              },
              {
                icon: Package,
                title: "Погребални Домове",
                description: "Симпатизиращи аранжименти, спешна доставка",
              },
            ].map((client, index) => {
              const Icon = client.icon;
              return (
                <Card key={index} hover className="h-full">
                  <CardContent>
                    <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-[var(--color-primary)]" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{client.title}</h3>
                    <p className="text-[var(--color-gray-700)]">{client.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* B2B Advantages */}
      <Section className="bg-[var(--color-light)]">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4">B2B Предимства</h2>
            <p className="text-lg text-[var(--color-gray-700)]">
              Какво получавате като наш бизнес партньор
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Package,
                title: "Обемни Отстъпки",
                description: "Тиеред ценообразуване според обема на поръчката. Колкото повече поръчвате, толкова по-добра цена получавате.",
              },
              {
                icon: CreditCard,
                title: "Гъвкави Плащания",
                description: "Net 30/60 условия, плащане с фактура, кредитни линии за постоянни партньори.",
              },
              {
                icon: Truck,
                title: "Студена Верига",
                description: "Рефрижериран транспорт 24/7 за гарантирана свежест на продуктите.",
              },
              {
                icon: Phone,
                title: "Персонален Мениджър",
                description: "Dedicated account manager за вашите нужди, наличен през работното време.",
              },
              {
                icon: Clock,
                title: "Планиране на Сезони",
                description: "Предварителни поръчки за пикови сезони (Свети Валентин, Майчин ден, сватби).",
              },
              {
                icon: Shield,
                title: "Гаранция за Качество",
                description: "100% гаранция за свежест, политика за замяна на увредени стоки.",
              },
            ].map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <Card key={index} className="bg-white h-full">
                  <CardContent>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[var(--color-secondary)]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{advantage.title}</h3>
                        <p className="text-sm text-[var(--color-gray-700)]">
                          {advantage.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Pricing Tiers */}
      <Section id="pricing" className="bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4">Ценови Нива</h2>
            <p className="text-lg text-[var(--color-gray-700)]">
              Обемни отстъпки според нивото на поръчка
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Bronze",
                range: "100-499 лв",
                discount: "5%",
                color: "from-orange-400 to-orange-600",
                features: [
                  "5% отстъпка от каталожна цена",
                  "Стандартна доставка",
                  "Email подкрепа",
                ],
              },
              {
                name: "Silver",
                range: "500-999 лв",
                discount: "10%",
                color: "from-gray-400 to-gray-600",
                features: [
                  "10% отстъпка от каталожна цена",
                  "Приоритетна доставка",
                  "Телефонна подкрепа",
                  "Персонален мениджър",
                ],
              },
              {
                name: "Gold",
                range: "1000+ лв",
                discount: "15%",
                color: "from-yellow-400 to-yellow-600",
                features: [
                  "15% отстъпка от каталожна цена",
                  "Безплатна доставка",
                  "Dedicated account manager",
                  "Net 30/60 плащане",
                  "Предварителни поръчки",
                ],
              },
            ].map((tier, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br ${tier.color} text-white relative overflow-hidden`}
              >
                <CardHeader>
                  <CardTitle className="text-white text-center">
                    <div className="text-3xl font-bold mb-2">{tier.name}</div>
                    <div className="text-sm opacity-90">{tier.range}</div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold">{tier.discount}</div>
                    <div className="text-sm opacity-90">отстъпка</div>
                  </div>

                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-[var(--color-gray-600)] mt-8">
            *Цените са базирани на месечен обем на поръчки. Свържете се за индивидуална оферта.
          </p>
        </Container>
      </Section>

      {/* Seasonal Calendar */}
      <Section className="bg-[var(--color-light)]">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4">Сезонно Планиране</h2>
            <p className="text-lg text-[var(--color-gray-700)]">
              Важни дати и срокове за предварителни поръчки
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                event: "Свети Валентин",
                date: "14 Февруари",
                deadline: "1 Февруари",
                increase: "300%+ обем",
              },
              {
                event: "Майчин ден",
                date: "Началото на Май",
                deadline: "3 седмици преди",
                increase: "400%+ обем",
              },
              {
                event: "Сватбен сезон",
                date: "Май - Септември",
                deadline: "2-3 месеца преди",
                increase: "Пик сезон",
              },
              {
                event: "Коледа/Нова Година",
                date: "Декември",
                deadline: "1 Декември",
                increase: "Високо търсене",
              },
            ].map((season, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="text-center">
                  <div className="w-14 h-14 mx-auto mb-3 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                    <CalendarIcon className="w-7 h-7 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{season.event}</h3>
                  <div className="space-y-1 text-sm text-[var(--color-gray-700)]">
                    <div>
                      <strong>Дата:</strong> {season.date}
                    </div>
                    <div>
                      <strong>Краен срок:</strong> {season.deadline}
                    </div>
                    <div className="text-[var(--color-error)] font-medium">
                      {season.increase}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-white mb-4">Готови ли сте да станете наш партньор?</h2>
            <p className="text-xl text-white/90 mb-8">
              Свържете се с нас за индивидуална оферта и специални условия
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakti">
                <Button size="lg" className="bg-white text-[var(--color-primary)] hover:bg-gray-100">
                  Заявка за оферта
                </Button>
              </Link>
              <a href="tel:+359XXXXXXXXX">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Phone className="mr-2 w-5 h-5" />
                  Обадете се
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
