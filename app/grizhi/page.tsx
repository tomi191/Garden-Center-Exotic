import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Droplet, Sun, Sprout,
  Smartphone, Search, PlayCircle,
  HelpCircle, BookOpen, MessageCircle, ArrowRight
} from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";
import { Card, CardContent } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Грижи за Растенията | Наръчник",
  description: "Експертни съвети за поливане, светлина и торене. Сканирайте QR кодовете на нашите продукти.",
};

const careCards = [
  {
    title: "Поливане",
    desc: "Как да разберете кога растението е жадно и да избегнете преовлажняване.",
    icon: Droplet,
    color: "var(--color-primary)",
    bgColor: "var(--color-primary-light)",
  },
  {
    title: "Светлина",
    desc: "Разликата между пряка слънчева светлина, ярка индиректна и полусянка.",
    icon: Sun,
    color: "var(--color-secondary)",
    bgColor: "var(--color-secondary-light)",
  },
  {
    title: "Почва & Храна",
    desc: "Кога да пресаждате и какъв тор да използвате за буен растеж.",
    icon: Sprout,
    color: "var(--color-accent)",
    bgColor: "var(--color-accent-light)",
  },
  {
    title: "Чести Проблеми",
    desc: "Диагностика на жълти листа, вредители и как да ги лекуваме.",
    icon: HelpCircle,
    color: "var(--color-error)",
    bgColor: "rgba(239, 68, 68, 0.1)",
  },
];

const tips = [
  {
    title: "Златното правило",
    desc: "По-добре по-малко вода, отколкото повече. Повечето стайни растения загиват от преливане.",
  },
  {
    title: "Проверете почвата",
    desc: "Пъхнете пръст на 2-3 см в почвата. Ако е суха – време е за поливане.",
  },
  {
    title: "Сезонни нужди",
    desc: "През зимата растенията спят – намалете поливането наполовина.",
  },
];

export default function PlantCarePage() {
  return (
    <>
      {/* Hero Section - consistent with other pages */}
      <section className="relative min-h-[70vh] flex items-center">
        {/* Full Screen Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/plant-care-bg.png"
            alt="Грижи за Растенията"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/25" />
        </div>

        <Container className="relative z-10 py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-[var(--color-secondary)] text-sm font-medium tracking-wider uppercase mb-4">
              Наръчник за Грижа
            </span>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold !text-white mb-6 leading-tight drop-shadow-lg">
              Зелено Знание
            </h1>

            <p className="!text-white text-lg md:text-xl leading-relaxed mb-8 drop-shadow-md">
              Всичко, което трябва да знаете, за да бъдат вашите растения
              здрави и щастливи. Експертни съвети от нашите специалисти.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="#care-tips">
                <Button className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white rounded-full px-6">
                  Научете повече
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/kontakti">
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-6">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Задайте въпрос
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Grid */}
      <Section id="care-tips" className="py-16 md:py-20 bg-white">
        <Container>
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[var(--color-secondary)] font-semibold tracking-wider uppercase text-sm mb-2 block">
              Основи на грижата
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
              Четири Стълба на Успеха
            </h2>
            <p className="text-[var(--color-gray-600)] max-w-2xl mx-auto">
              Овладейте тези основни принципи и вашите растения ще процъфтяват
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {careCards.map((card, idx) => (
              <Card
                key={idx}
                className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: card.bgColor }}
                  >
                    <card.icon className="w-7 h-7" style={{ color: card.color }} />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3 text-[var(--color-foreground)]">
                    {card.title}
                  </h3>
                  <p className="text-[var(--color-gray-600)] leading-relaxed text-sm">
                    {card.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Tips Section */}
          <div className="bg-[var(--color-light)] rounded-[2rem] p-8 md:p-12 mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)] mb-6">
                  Бързи Съвети за Поливане
                </h3>
                <div className="space-y-6">
                  {tips.map((tip, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-[var(--color-foreground)] mb-1">{tip.title}</h4>
                        <p className="text-sm text-[var(--color-gray-600)]">{tip.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
                  <Image
                    src="/images/care/watering-tips.png"
                    alt="Поливане на растения"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[var(--color-primary-light)] rounded-xl flex items-center justify-center">
                      <Droplet className="w-6 h-6 text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <p className="font-bold text-[var(--color-foreground)]">Про Съвет</p>
                      <p className="text-xs text-[var(--color-gray-500)]">Поливайте сутрин</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Feature */}
          <div className="bg-[var(--color-primary-dark)] rounded-[3rem] p-8 md:p-16 relative overflow-hidden text-white">
            {/* Abstract Circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--color-secondary)]/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/10 text-sm font-medium">
                  <Smartphone className="w-4 h-4" />
                  Интелигентни етикети
                </div>
                <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight">
                  Сканирай и научи <br/>
                  <span className="text-[var(--color-secondary)]">за секунди</span>
                </h2>
                <p className="text-white/80 text-lg leading-relaxed max-w-lg">
                  Всяко наше растение идва с персонален QR код. Сканирайте го с телефона си, за да отворите неговия "дигитален паспорт" с инструкции за грижа, видео уроци и напомняния.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl backdrop-blur-sm">
                    <PlayCircle className="w-5 h-5 text-[var(--color-secondary)]" />
                    <span className="font-medium">Видео Уроци</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 px-4 py-3 rounded-xl backdrop-blur-sm">
                    <Search className="w-5 h-5 text-[var(--color-secondary)]" />
                    <span className="font-medium">Диагностика</span>
                  </div>
                </div>
              </div>

              {/* QR Visual */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-64 h-64 bg-white rounded-3xl p-4 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-0 border-4 border-[var(--color-secondary)] rounded-3xl -m-2 -z-10" />
                  <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center bg-gray-50">
                    <Smartphone className="w-24 h-24 text-gray-300" />
                    <span className="absolute text-xs font-bold text-gray-400 mt-20">QR CODE</span>
                  </div>
                  {/* Floating Badge */}
                  <div className="absolute -bottom-6 -left-6 bg-[var(--color-secondary)] text-white px-6 py-3 rounded-full font-bold shadow-lg">
                    Опитай сега!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <CTASection
        icon={MessageCircle}
        title="Имате въпрос за вашето растение?"
        description="Нашите експерти са тук да помогнат. Изпратете ни снимка и ще ви дадем персонализиран съвет."
        buttons={[
          { label: "Свържете се с нас", href: "/kontakti", variant: "primary" },
          { label: "Разгледайте блога", href: "/blog", variant: "outline" },
        ]}
      />
    </>
  );
}
