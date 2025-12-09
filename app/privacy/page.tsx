import { Metadata } from "next";
import { Container, Section } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { Shield, Database, Eye, Lock, UserCheck, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Политика за Поверителност | Градински Център Екзотик",
  description: "Как обработваме и защитаваме вашите лични данни в Градински Център Екзотик.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Политика за Поверителност"
        description="Как обработваме и защитаваме вашите лични данни"
      />

      <Section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Last Updated */}
            <div className="bg-gray-50 rounded-xl p-4 mb-12 flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-500" />
              <span className="text-gray-600">
                Последна актуализация: <strong>Декември 2025</strong>
              </span>
            </div>

            {/* Intro */}
            <div className="bg-[var(--color-primary-light)] rounded-2xl p-8 mb-12">
              <p className="text-lg text-[var(--color-gray-700)]">
                <strong>Градински Център Екзотик</strong> зачита вашата поверителност и се ангажира
                да защитава личните ви данни в съответствие с Регламент (ЕС) 2016/679 (GDPR)
                и българското законодателство.
              </p>
            </div>

            {/* Section 1 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[var(--color-foreground)]">
                  1. Какви данни събираме
                </h2>
              </div>
              <div className="prose prose-lg text-[var(--color-gray-600)] ml-13">
                <p>Ние събираме следните категории лични данни:</p>
                <ul>
                  <li><strong>Идентификационни данни:</strong> име, фамилия, фирма (за B2B клиенти)</li>
                  <li><strong>Данни за контакт:</strong> телефон, имейл адрес, адрес за доставка</li>
                  <li><strong>Данни за поръчки:</strong> история на покупки, предпочитания</li>
                  <li><strong>Технически данни:</strong> IP адрес, тип браузър (чрез бисквитки)</li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[var(--color-foreground)]">
                  2. Защо обработваме вашите данни
                </h2>
              </div>
              <div className="prose prose-lg text-[var(--color-gray-600)] ml-13">
                <p>Обработваме личните ви данни за следните цели:</p>
                <ul>
                  <li>Изпълнение на поръчки и доставки</li>
                  <li>Комуникация относно вашите запитвания</li>
                  <li>Издаване на фактури и счетоводна отчетност</li>
                  <li>Подобряване на нашите услуги</li>
                  <li>Изпращане на промоционални съобщения (само с ваше съгласие)</li>
                </ul>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[var(--color-foreground)]">
                  3. Как защитаваме вашите данни
                </h2>
              </div>
              <div className="prose prose-lg text-[var(--color-gray-600)] ml-13">
                <ul>
                  <li>Използваме SSL криптиране за защитена комуникация</li>
                  <li>Достъпът до лични данни е ограничен само до оторизирани служители</li>
                  <li>Редовно актуализираме нашите системи за сигурност</li>
                  <li>Не споделяме данни с трети страни без ваше съгласие (освен за доставка)</li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[var(--color-foreground)]">
                  4. Вашите права
                </h2>
              </div>
              <div className="prose prose-lg text-[var(--color-gray-600)] ml-13">
                <p>Съгласно GDPR, вие имате право на:</p>
                <ul>
                  <li><strong>Достъп</strong> – да получите копие от вашите лични данни</li>
                  <li><strong>Коригиране</strong> – да поискате корекция на неточни данни</li>
                  <li><strong>Изтриване</strong> – да поискате изтриване на вашите данни (&quot;право да бъдеш забравен&quot;)</li>
                  <li><strong>Ограничаване</strong> – да ограничите обработката на данните</li>
                  <li><strong>Преносимост</strong> – да получите данните си в машинночетим формат</li>
                  <li><strong>Възражение</strong> – да възразите срещу обработката за маркетингови цели</li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[var(--color-foreground)]">
                  5. Бисквитки (Cookies)
                </h2>
              </div>
              <div className="prose prose-lg text-[var(--color-gray-600)] ml-13">
                <p>Нашият уебсайт използва бисквитки за:</p>
                <ul>
                  <li><strong>Необходими бисквитки:</strong> за функциониране на сайта</li>
                  <li><strong>Аналитични бисквитки:</strong> за разбиране как използвате сайта</li>
                  <li><strong>Маркетингови бисквитки:</strong> за персонализирани реклами (с ваше съгласие)</li>
                </ul>
                <p>Можете да управлявате бисквитките чрез настройките на браузъра си.</p>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[var(--color-primary-light)] rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[var(--color-foreground)]">
                  6. Контакт за въпроси относно поверителността
                </h2>
              </div>
              <div className="prose prose-lg text-[var(--color-gray-600)] ml-13">
                <p>
                  Ако имате въпроси относно обработката на вашите лични данни или искате да
                  упражните някое от правата си, моля свържете се с нас:
                </p>
                <ul>
                  <li><strong>Имейл:</strong> privacy@gardenexotic.bg</li>
                  <li><strong>Телефон:</strong> +359 52 600 577</li>
                  <li><strong>Адрес:</strong> ул. Франга дере 27А, Варна</li>
                </ul>
                <p>
                  Имате право да подадете жалба до Комисията за защита на личните данни (КЗЛД)
                  на адрес: <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer">www.cpdp.bg</a>
                </p>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-[var(--color-primary-light)] rounded-2xl p-8 text-center">
              <h3 className="font-serif text-xl font-bold text-[var(--color-primary-dark)] mb-2">
                Вашата поверителност е важна за нас
              </h3>
              <p className="text-[var(--color-gray-600)] mb-4">
                Ние се ангажираме да защитаваме вашите лични данни и да спазваме всички
                приложими закони за защита на данните.
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
