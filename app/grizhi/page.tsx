import { Metadata } from "next";
import { Droplet, Sun, Leaf, AlertCircle, QrCode, PlayCircle, Sprout, Search, Smartphone, Lightbulb } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { PageHero } from "@/components/sections/PageHero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";

export const metadata: Metadata = {
  title: "Грижи за Растенията",
  description: "Подробни ръководства за грижи за растения. QR кодове, видео уроци и съвети от експерти.",
  keywords: ["грижи за растения", "поливане", "светлина", "торене", "проблеми", "QR код"],
};

const careTopics = [
  {
    icon: Droplet,
    title: "Поливане",
    description: "Колко често и колко вода се нуждаят растенията",
    color: "var(--color-primary)",
  },
  {
    icon: Sun,
    title: "Светлина",
    description: "Пълно слънце, полусянка или пълна сянка",
    color: "var(--color-accent)",
  },
  {
    icon: Leaf,
    title: "Почва и Торене",
    description: "Правилната почва и график на торене",
    color: "var(--color-secondary)",
  },
  {
    icon: AlertCircle,
    title: "Често Срещани Проблеми",
    description: "Жълти листа, вредители, болести и решения",
    color: "var(--color-error)",
  },
  {
    icon: QrCode,
    title: "QR Кодове",
    description: "Сканирайте етикета за пълно ръководство",
    color: "var(--color-primary)",
  },
  {
    icon: PlayCircle,
    title: "Видео Уроци",
    description: "Практически съвети за пресаждане и подрязване",
    color: "var(--color-accent)",
  },
];

export default function PlantCarePage() {
  return (
    <>
      <PageHero
        variant="gradient"
        badge={
          <span className="inline-flex items-center gap-2">
            <Sprout className="w-4 h-4" />
            Експертни Съвети
          </span>
        }
        title="Грижи за Растенията"
        description="Детайлни ръководства за успешно отглеждане на вашите растения"
      />

      <FeatureGrid
        title="Основни Теми"
        description="Научете всичко необходимо за грижите за вашите растения"
        features={careTopics}
      />

      <Section className="bg-white py-16">
        <Container>
          <Card className="bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] text-white border-0 shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-white mb-4 inline-flex items-center gap-3">
                    <Search className="w-8 h-8" />
                    QR Код Система
                  </h2>
                  <p className="text-white/90 mb-6">
                    Всяко растение от нашия магазин има уникален QR код с детайлна
                    информация за грижите. Просто сканирайте с вашия смартфон и
                    получете достъп до:
                  </p>
                  <ul className="space-y-2 text-white/90">
                    <li>✓ Точни инструкции за поливане</li>
                    <li>✓ Изисквания за светлина</li>
                    <li>✓ График на торене</li>
                    <li>✓ Решения на проблеми</li>
                    <li>✓ Видео уроци</li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <Smartphone className="w-16 h-16" />
                  </div>
                  <p className="text-lg font-medium">Сканирайте QR кода</p>
                  <p className="text-sm opacity-80 mt-2">
                    и научете всичко за вашето растение
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Section>

      <Section className="bg-[var(--color-light)] py-16">
        <Container>
          <div className="text-center">
            <h2 className="mb-4 inline-flex items-center gap-3 justify-center">
              <Lightbulb className="w-8 h-8" />
              Нуждаете се от помощ?
            </h2>
            <p className="text-lg text-[var(--color-gray-700)]">
              Нашият експертен екип е винаги на разположение за безплатни консултации
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
