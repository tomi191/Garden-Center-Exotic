import { Metadata } from "next";
import { Award, Building2, Globe, Leaf, ShieldCheck, Users, TrendingUp } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ContentSection } from "@/components/sections/ContentSection";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "За Нас | История и Ценности",
  description: "Градински Център Екзотик - 27 години традиция и иновации в света на растенията.",
};

const stats = [
  { label: "Години опит", value: "27+", icon: TrendingUp },
  { label: "Държави внос", value: "6", icon: Globe },
  { label: "Кв.м. оранжерии", value: "2000+", icon: Building2 },
  { label: "Доволни клиенти", value: "10k+", icon: Users },
];

export default function AboutPage() {
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - SITE_CONFIG.founded;

  return (
    <>
      <PageHero
        title="Нашата История"
        description="От малък семеен магазин до лидер във вноса на екзотични растения."
      />

      {/* Intro Stats */}
      <div className="relative z-10 -mt-16 pb-20">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-xl text-center border border-gray-100">
                  <div className="w-12 h-12 mx-auto bg-[var(--color-primary-light)] rounded-full flex items-center justify-center mb-4 text-[var(--color-primary)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-[var(--color-foreground)] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[var(--color-gray-500)]">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Main Story */}
      <ContentSection
        imageUrl="https://images.unsplash.com/photo-1466781783364-36c955e42a7f?q=80&w=2071&auto=format&fit=crop"
        imageAlt="Нашата оранжерия"
      >
        <div className="space-y-6">
          <span className="text-[var(--color-secondary)] font-bold tracking-widest uppercase text-sm">
            От {SITE_CONFIG.founded} г.
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-primary-dark)]">
            Страст към природата
          </h2>
          <div className="prose prose-lg text-[var(--color-gray-600)]">
            <p>
              Всичко започна с една проста идея: да донесем красотата на света в българския дом. 
              През {SITE_CONFIG.founded} година отворихме първия си малък магазин във Варна с няколко вида рози и огромно желание.
            </p>
            <p>
              Днес, {yearsInBusiness} години по-късно, <strong>Градински Център Екзотик</strong> е синоним на качество и разнообразие. 
              Ние не просто продаваме цветя – ние избираме най-добрите сортове директно от фермите в Колумбия, Еквадор и Холандия.
            </p>
            <p>
              Вярваме, че растенията променят средата, в която живеем, и носят спокойствие и радост. Затова нашата мисия е да направим тази екзотика достъпна за всеки.
            </p>
          </div>
          
          <div className="pt-6 border-t border-gray-200">
            <div className="flex items-center gap-4">
               <div className="flex -space-x-4">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-200" /> 
                 ))}
               </div>
               <div className="text-sm">
                 <p className="font-bold text-[var(--color-foreground)]">Нашият Екип</p>
                 <p className="text-[var(--color-gray-500)]">Винаги насреща за съвет</p>
               </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Philosophy / Values */}
      <Section className="bg-[var(--color-primary-dark)] text-white py-24">
        <Container>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-[var(--color-secondary)]" />
              </div>
              <h3 className="font-serif text-2xl font-bold">Безкомпромисно Качество</h3>
              <p className="text-white/70 leading-relaxed">
                Всяка пратка преминава през тройна проверка за качество преди да достигне до нашите рафтове.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-[var(--color-secondary)]" />
              </div>
              <h3 className="font-serif text-2xl font-bold">Устойчивост</h3>
              <p className="text-white/70 leading-relaxed">
                Работим с ферми, притежаващи сертификати за устойчиво земеделие и честни трудови практики.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-[var(--color-secondary)]" />
              </div>
              <h3 className="font-serif text-2xl font-bold">Експертиза</h3>
              <p className="text-white/70 leading-relaxed">
                Нашите флористи и агрономи са винаги на разположение за професионална консултация.
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}