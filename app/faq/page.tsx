import { Metadata } from "next";
import { MessageCircle, Package, Leaf, CreditCard, Building2, RefreshCcw } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { faqData } from "@/data/faq";

export const metadata: Metadata = {
  title: "Често Задавани Въпроси (FAQ)",
  description: "Отговори на най-често задаваните въпроси за продукти, доставка, грижи, плащания и гаранции.",
  keywords: ["FAQ", "въпроси", "отговори", "помощ", "поддръжка"],
};

const categories = [
  { id: "products", name: "Продукти", icon: Package, color: "var(--color-primary)" },
  { id: "delivery", name: "Доставка", icon: RefreshCcw, color: "var(--color-secondary)" },
  { id: "plant-care", name: "Грижи за растения", icon: Leaf, color: "var(--color-accent)" },
  { id: "payment", name: "Плащане", icon: CreditCard, color: "var(--color-primary)" },
  { id: "b2b", name: "B2B услуги", icon: Building2, color: "var(--color-secondary)" },
  { id: "returns", name: "Връщания и гаранции", icon: RefreshCcw, color: "var(--color-accent)" },
];

export default function FAQPage() {
  return (
    <>
      <PageHero
        title="Често Задавани Въпроси"
        description="Намерете отговори на най-често срещаните въпроси. Ако не намерите това, което търсите, не се колебайте да се свържете с нас."
      />

      <Section className="bg-white py-16">
        <Container>
          <div className="space-y-12">
            {categories.map((category) => {
              const Icon = category.icon;
              const categoryQuestions = faqData.filter((faq) => faq.category === category.id);

              if (categoryQuestions.length === 0) return null;

              return (
                <div key={category.id} id={category.id}>
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: category.color }} />
                    </div>
                    <h2 className="text-2xl font-bold">{category.name}</h2>
                  </div>

                  <Accordion>
                    {categoryQuestions.map((faq, index) => (
                      <AccordionItem key={index} title={faq.question}>
                        {faq.answer}
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <CTASection
        icon={MessageCircle}
        title="Не намерихте отговор?"
        description="Нашият екип е готов да ви помогне. Свържете се с нас и ще отговорим в рамките на 24 часа в работни дни."
        buttons={[
          { label: "Свържете се с нас", href: "/kontakti", variant: "primary" },
          { label: "Позвънете ни", href: "tel:+359XXXXXXXXX", variant: "outline" },
        ]}
      />
    </>
  );
}
