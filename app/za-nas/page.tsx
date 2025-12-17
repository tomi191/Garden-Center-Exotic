"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Award, Building2, Globe, Leaf, ShieldCheck, Users, TrendingUp, ArrowRight, MapPin, Calendar } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/lib/constants";

const stats = [
  { label: "Години опит", value: "27+", icon: TrendingUp },
  { label: "Държави внос", value: "6", icon: Globe },
  { label: "Кв.м. оранжерии", value: "2000+", icon: Building2 },
  { label: "Доволни клиенти", value: "10k+", icon: Users },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Безкомпромисно Качество",
    description: "Всяка пратка преминава през тройна проверка за качество преди да достигне до нашите рафтове."
  },
  {
    icon: Leaf,
    title: "Устойчивост",
    description: "Работим с ферми, притежаващи сертификати за устойчиво земеделие и честни трудови практики."
  },
  {
    icon: Award,
    title: "Експертиза",
    description: "Нашите флористи и агрономи са винаги на разположение за професионална консултация."
  },
];

const timeline = [
  { year: "1998", title: "Началото", description: "Отваряме първия магазин във Варна с мечта за екзотични цветя." },
  { year: "2005", title: "Първи внос", description: "Започваме директен внос от Холандия и Колумбия." },
  { year: "2012", title: "Разширение", description: "Откриваме втори обект в Нова Загора и изграждаме оранжерии." },
  { year: "2020", title: "B2B услуги", description: "Стартираме програма за хотели, ресторанти и флористи." },
  { year: "2024", title: "Днес", description: "Над 10,000 доволни клиенти и 6 държави партньори." },
];

export default function AboutPage() {
  const currentYear = new Date().getFullYear();
  const yearsInBusiness = currentYear - SITE_CONFIG.founded;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center">
        {/* Full Screen Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/about-bg.jpg"
            alt="Градински Център Екзотик"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/25" />
        </div>

        <Container className="relative z-10 py-20">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[var(--color-secondary)] text-sm font-medium tracking-wider uppercase mb-4"
            >
              От {SITE_CONFIG.founded} година
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Нашата История
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/90 text-lg md:text-xl leading-relaxed mb-8"
            >
              От малък семеен магазин до лидер във вноса на екзотични растения.
              {yearsInBusiness} години страст, качество и грижа за всеки клиент.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/kontakti">
                <Button className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white rounded-full px-6">
                  Свържете се с нас
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/lokacii">
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-6">
                  <MapPin className="w-4 h-4 mr-2" />
                  Нашите локации
                </Button>
              </Link>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <Section className="py-16 md:py-20 bg-white">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 md:p-8 rounded-2xl bg-[var(--color-light)] border border-[var(--color-primary)]/10"
                >
                  <div className="w-14 h-14 mx-auto bg-[var(--color-primary)]/10 rounded-xl flex items-center justify-center mb-4 text-[var(--color-primary)]">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-[var(--color-gray-600)] uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Story Section */}
      <Section className="py-16 md:py-24 bg-[var(--color-light)]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/backgrounds/store-bg.jpg"
                  alt="Нашата оранжерия"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 bg-white rounded-2xl p-5 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[var(--color-secondary)]/20 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[var(--color-secondary)]" />
                  </div>
                  <div>
                    <div className="font-serif text-2xl font-bold text-[var(--color-primary-dark)]">{yearsInBusiness}</div>
                    <div className="text-sm text-[var(--color-gray-600)]">години опит</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <span className="text-[var(--color-secondary)] font-semibold tracking-wider uppercase text-sm">
                Нашата мисия
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
                Страст към природата
              </h2>
              <div className="space-y-4 text-[var(--color-gray-600)] leading-relaxed">
                <p>
                  Всичко започна с една проста идея: да донесем красотата на света в българския дом.
                  През {SITE_CONFIG.founded} година отворихме първия си малък магазин във Варна с няколко вида рози и огромно желание.
                </p>
                <p>
                  Днес, {yearsInBusiness} години по-късно, <strong className="text-[var(--color-primary-dark)]">Градински Център Екзотик</strong> е синоним на качество и разнообразие.
                  Ние не просто продаваме цветя – ние избираме най-добрите сортове директно от фермите в Колумбия, Еквадор и Холандия.
                </p>
                <p>
                  Вярваме, че растенията променят средата, в която живеем, и носят спокойствие и радост.
                  Затова нашата мисия е да направим тази екзотика достъпна за всеки.
                </p>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Timeline Section */}
      <Section className="py-16 md:py-24 bg-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[var(--color-secondary)] font-semibold tracking-wider uppercase text-sm mb-3 block">
              Нашият път
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)]">
              Ключови моменти
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[var(--color-primary)]/20 md:-translate-x-1/2" />

            <div className="space-y-8 md:space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-[var(--color-secondary)] rounded-full md:-translate-x-1/2 z-10" />

                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-[var(--color-light)] rounded-xl p-6 inline-block">
                      <span className="text-[var(--color-secondary)] font-bold text-lg">{item.year}</span>
                      <h3 className="font-serif text-xl font-bold text-[var(--color-primary-dark)] mt-1 mb-2">{item.title}</h3>
                      <p className="text-[var(--color-gray-600)] text-sm">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section className="py-16 md:py-24 bg-[var(--color-primary-dark)] text-white">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-[var(--color-secondary)] font-semibold tracking-wider uppercase text-sm mb-3 block">
              Нашите ценности
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
              Какво ни отличава
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-8 rounded-2xl bg-white/5 border border-white/10"
                >
                  <div className="w-16 h-16 mx-auto bg-[var(--color-secondary)]/20 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-[var(--color-secondary)]" />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section className="py-16 md:py-20 bg-[var(--color-light)]">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
              Готови ли сте да ни посетите?
            </h2>
            <p className="text-[var(--color-gray-600)] mb-8">
              Елате и вижте нашите оранжерии, разгледайте богатия избор от екзотични растения
              и се консултирайте с нашите експерти.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/lokacii">
                <Button size="lg" className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-full px-8">
                  <MapPin className="w-5 h-5 mr-2" />
                  Намери ни
                </Button>
              </Link>
              <Link href="/kontakti">
                <Button size="lg" variant="outline" className="border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white rounded-full px-8">
                  Свържи се
                </Button>
              </Link>
            </div>
          </motion.div>
        </Container>
      </Section>
    </>
  );
}
