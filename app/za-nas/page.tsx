import { Metadata } from "next";
import { Award, Building2, Globe, Leaf, Shield, Users, Home, Snowflake, Store, MapPin } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { PageHero } from "@/components/sections/PageHero";
import { ContentSection } from "@/components/sections/ContentSection";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { CertificationBadges } from "@/components/sections/CertificationBadges";
import { CompanyTimeline } from "@/components/sections/CompanyTimeline";
import { CompanyStats } from "@/components/sections/CompanyStats";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "За Нас",
  description: "Градински Център Екзотик - 27 години опит в отглеждането и продажбата на цветя. Нашата история, екип и ценности.",
  keywords: ["за нас", "история", "градински център", "опит", "екип", "качество"],
};

const importCountries = [
  { name: "Колумбия", specialty: "Рози, Карнации" },
  { name: "Кения", specialty: "Рози, Тропични цветя" },
  { name: "Гърция", specialty: "Средиземноморски" },
  { name: "Нидерландия", specialty: "Лалета, Орхидеи" },
  { name: "Турция", specialty: "Сезонни цветя" },
  { name: "България", specialty: "Рози, Лавандула" },
];

const ourValues = [
  {
    icon: Shield,
    title: "Качество",
    description: "Работим само с проверени доставчици от Колумбия, Кения, Гърция, Нидерландия, Турция и България. Всяко растение преминава строг контрол.",
    color: "var(--color-primary)",
  },
  {
    icon: Users,
    title: "Експертиза",
    description: "Нашият екип се състои от обучени специалисти с дългогодишен опит в хортикултурата.",
    color: "var(--color-secondary)",
  },
  {
    icon: Leaf,
    title: "Грижа",
    description: "Предлагаме пълна подкрепа - от избора на растение до съвети за отглеждане.",
    color: "var(--color-accent)",
  },
  {
    icon: Building2,
    title: "Инфраструктура",
    description: "Модерни оранжерии и студена камера гарантират свежестта на продуктите.",
    color: "var(--color-primary)",
  },
  {
    icon: Globe,
    title: "Разнообразие",
    description: "Богат избор от местни и екзотични растения за всеки вкус и нужда.",
    color: "var(--color-secondary)",
  },
  {
    icon: Award,
    title: "Надеждност",
    description: "27 години безупречна работа и хиляди доволни клиенти.",
    color: "var(--color-accent)",
  },
];

const facilities = [
  {
    icon: Home,
    title: "Оранжерии",
    description: "Съвременни оранжерии за целогодишно отглеждане на саксийни растения с контролирана среда и оптимални условия.",
    gradient: "from-[var(--color-primary)] to-[var(--color-primary-hover)]",
  },
  {
    icon: Snowflake,
    title: "Студена Камера",
    description: "Специализирани хладилни помещения за съхранение на рязан цвят, гарантиращи максимална свежест.",
    gradient: "from-[var(--color-secondary)] to-[var(--color-secondary-hover)]",
  },
  {
    icon: Store,
    title: "Retail Магазини",
    description: "Просторни търговски площи във Варна и Нова Загора с удобен достъп и широка експозиция на продуктите.",
    gradient: "from-[var(--color-accent)] to-[var(--color-accent-hover)]",
  },
];

const qualityStandards = [
  {
    title: "Контрол на качеството",
    description: "Всяка доставка преминава задължителна инспекция при получаване",
  },
  {
    title: "Температурен контрол",
    description: "Студена верига от доставка до продажба",
  },
  {
    title: "Гаранция за свежест",
    description: "Гарантираме дълъг живот на растенията при правилна грижа",
  },
  {
    title: "Професионална подкрепа",
    description: "Консултации и съвети от нашите експерти",
  },
];

export default function AboutPage() {
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - SITE_CONFIG.founded;

  return (
    <>
      <PageHero
        variant="gradient"
        badge={
          <span className="inline-flex items-center gap-2">
            <Leaf className="w-4 h-4" />
            От {SITE_CONFIG.founded} г.
          </span>
        }
        title="За Нас"
        description={`${yearsInBusiness} години опит в предлагането на висококачествени цветя и растения за цяла България`}
      />

      {/* Нашата История */}
      <ContentSection
        imageUrl="https://images.unsplash.com/photo-1466781783364-36c955e42a7f?q=80&w=2071&auto=format&fit=crop"
      >
        <h2 className="mb-6">Нашата История</h2>
        <div className="space-y-4 text-[var(--color-gray-700)]">
          <p>
            <strong className="text-[var(--color-foreground)]">Градински Център Екзотик</strong> е основан през{" "}
            <strong className="text-[var(--color-primary)]">{SITE_CONFIG.founded} година</strong> с мисията
            да предлага най-качествените цветя и растения на българския пазар.
          </p>
          <p>
            През годините разширихме дейността си от един малък магазин във Варна до{" "}
            <strong className="text-[var(--color-foreground)]">две локации</strong> - във Варна и Нова Загора,
            с модерни оранжерии и професионално оборудване.
          </p>
          <p>
            Днес сме един от водещите доставчици на цветя и растения в региона, обслужващи
            както индивидуални клиенти, така и бизнес партньори - хотели, ресторанти,
            офиси и организатори на събития.
          </p>
          <p>
            Нашият успех се дължи на <strong className="text-[var(--color-primary)]">три основни стълба</strong>:
            качество на продуктите, експертно обслужване и дългосрочни партньорства.
          </p>
        </div>
      </ContentSection>

      {/* Timeline Хронология */}
      <CompanyTimeline />

      {/* Статистика */}
      <CompanyStats />

      {/* Държави Вносители */}
      <Section className="bg-white py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4">Световно Качество</h2>
            <p className="text-lg text-[var(--color-gray-700)]">
              Внасяме цветя <strong className="text-[var(--color-primary)]">първо качество</strong> от{" "}
              водещи производители в световен мащаб
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {importCountries.map((country, index) => (
              <Card key={index} hover className="h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                    <Globe className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="font-bold mb-2 text-[var(--color-foreground)]">
                    {country.name}
                  </h3>
                  <p className="text-sm text-[var(--color-gray-600)]">
                    {country.specialty}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-[var(--color-foreground)] inline-flex items-center gap-3 justify-center">
              <Snowflake className="w-7 h-7" />
              Студена Верига (Cold Chain)
            </h3>
            <p className="text-[var(--color-gray-700)] mx-auto">
              Всички цветя се транспортират при контролирана температура <strong>2-4°C</strong> и се
              съхраняват в нашата студена камера - специализирано помещение, което забавя метаболизма
              на растенията и ги поддържа в състояние на &quot;хибернация&quot;. Студената верига никога не се
              прекъсва от фермата до клиента, гарантирайки максимална свежест и дълъг живот на цветята.
            </p>
          </div>
        </Container>
      </Section>

      {/* Нашите Ценности */}
      <FeatureGrid
        variant="light"
        title="Нашите Ценности"
        description="Принципите, които ръководят работата ни всеки ден"
        features={ourValues}
      />

      {/* Нашите Съоръжения */}
      <Section className="bg-white py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4">Нашите Съоръжения</h2>
            <p className="text-lg text-[var(--color-gray-700)]">
              Модерна инфраструктура за гарантирано качество
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {facilities.map((facility, index) => {
              const Icon = facility.icon;
              return (
                <Card
                  key={index}
                  className={`bg-gradient-to-br ${facility.gradient} text-white border-0 shadow-xl`}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">{facility.title}</h3>
                    <p className="text-white/90">{facility.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Стандарти за Качество */}
      <ContentSection
        variant="light"
        reverse
        imageUrl="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop"
      >
        <h2 className="mb-6">Стандарти за Качество</h2>
        <div className="space-y-4 text-[var(--color-gray-700)]">
          <p>
            Работим с доказани международни доставчици от{" "}
            <strong className="text-[var(--color-foreground)]">Колумбия, Кения, Гърция, Нидерландия и Турция</strong>,
            както и с местни производители на сезонни български цветя. Всички цветя са{" "}
            <strong className="text-[var(--color-primary)]">първо качество</strong> и преминават строг контрол.
          </p>

          <div className="space-y-3">
            {qualityStandards.map((standard, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[var(--color-primary)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs">✓</span>
                </div>
                <p>
                  <strong className="text-[var(--color-foreground)]">{standard.title}:</strong>{" "}
                  {standard.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ContentSection>

      {/* Сертификати и Стандарти */}
      <CertificationBadges />

      {/* Как Работим */}
      <HowWeWork />

      {/* Нашият Екип */}
      <Section className="bg-white py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="mb-4">Нашият Екип</h2>
            <p className="text-lg text-[var(--color-gray-700)]">
              Професионалисти с дългогодишен опит и страст към растенията
            </p>
          </div>

          <div className="bg-[var(--color-light)] rounded-2xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
              <Users className="w-12 h-12 text-[var(--color-primary)]" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Експертен Екип</h3>
            <p className="text-[var(--color-gray-700)]">
              Нашият екип се състои от обучени специалисти в областта на хортикултурата,
              готови да ви помогнат с професионални съвети и препоръки. Всеки член на екипа
              споделя нашата страст към растенията и ангажимент към качественото обслужване.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
