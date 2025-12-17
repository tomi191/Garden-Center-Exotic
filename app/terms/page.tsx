import { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { FileText, ShieldCheck, Truck, CreditCard, AlertCircle, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Общи Условия | Градински Център Екзотик",
  description: "Общи условия за ползване на услугите на Градински Център Екзотик.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Общи Условия"
        description="Условия за ползване на услугите на Градински Център Екзотик"
      />

      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Last Updated */}
            <div className="bg-gray-50 rounded-xl p-4 mb-12 flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">
                Последна актуализация: <strong>Декември 2025</strong>
              </span>
            </div>

            {/* Section 1 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[var(--color-foreground)]">
                  1. Общи положения
                </h2>
              </div>
              <div className="prose prose-lg text-[var(--color-gray-600)] ml-13">
                <p>
                  Настоящите Общи условия уреждат отношенията между <strong>Градински Център Екзотик</strong>
                  (наричан по-долу &quot;Доставчик&quot;) и клиентите (наричани по-долу &quot;Купувач&quot;),
                  използващи услугите на дружеството.
                </p>
                <p>
                  С използването на нашите услуги, Купувачът приема настоящите Общи условия в тяхната цялост.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[var(--color-foreground)]">
                  2. Качество на продуктите
                </h2>
              </div>
              <div className="prose prose-lg text-[var(--color-gray-600)] ml-13">
                <ul>
                  <li>Всички растения и цветя се доставят в отлично състояние, преминали качествен контрол.</li>
                  <li>Гарантираме свежестта на отрязаните цветя при правилно съхранение.</li>
                  <li>Саксийните растения се продават здрави и жизнени.</li>
                  <li>Снимките на сайта са примерни; реалните продукти може да варират леко по размер и цвят.</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[var(--color-foreground)]">
                  3. Цени и плащане
                </h2>
              </div>
              <div className="prose prose-lg text-[var(--color-gray-600)] ml-13">
                <ul>
                  <li>Всички цени са в български лева (BGN) и включват ДДС.</li>
                  <li>Цените могат да се променят без предупреждение, но поръчките се изпълняват по цената в момента на поръчка.</li>
                  <li>Приемаме плащане в брой, с дебитна/кредитна карта и банков превод.</li>
                  <li>За B2B клиенти са налични специални ценови условия и отложено плащане.</li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[var(--color-foreground)]">
                  4. Доставка
                </h2>
              </div>
              <div className="prose prose-lg text-[var(--color-gray-600)] ml-13">
                <ul>
                  <li>Доставката се извършва с наш транспорт или чрез куриерска фирма.</li>
                  <li>Сроковете за доставка се уговарят индивидуално при поръчка.</li>
                  <li>Разходите за доставка се определят според разстоянието и обема на поръчката.</li>
                  <li>При получаване, Купувачът е длъжен да провери стоката за видими повреди.</li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[var(--color-foreground)]">
                  5. Рекламации и връщане
                </h2>
              </div>
              <div className="prose prose-lg text-[var(--color-gray-600)] ml-13">
                <ul>
                  <li>Рекламации за качество се приемат до 24 часа след получаване.</li>
                  <li>За рекламация е необходима снимка на продукта и касова бележка/фактура.</li>
                  <li>Отрязаните цветя не подлежат на връщане поради естеството си.</li>
                  <li>Саксийните растения могат да бъдат заменени при доказан производствен дефект.</li>
                  <li>Не приемаме рекламации при неправилно съхранение или грижа от страна на клиента.</li>
                </ul>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[var(--color-foreground)]">
                  6. Заключителни разпоредби
                </h2>
              </div>
              <div className="prose prose-lg text-[var(--color-gray-600)] ml-13">
                <p>
                  Настоящите Общи условия могат да бъдат променяни едностранно от Доставчика.
                  Промените влизат в сила от момента на публикуването им на този уебсайт.
                </p>
                <p>
                  Всички спорове се решават чрез преговори, а при невъзможност – от компетентния български съд.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-[var(--color-primary-light)] rounded-2xl p-8 text-center">
              <h3 className="font-serif text-xl font-bold text-[var(--color-primary-dark)] mb-2">
                Имате въпроси?
              </h3>
              <p className="text-[var(--color-gray-600)] mb-4">
                Свържете се с нас за повече информация относно нашите условия.
              </p>
              <a
                href="/kontakti"
                className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[var(--color-primary-dark)] transition-colors"
              >
                Свържете се с нас
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
