import { Metadata } from "next";
import { Calendar, Tag, User } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Блог",
  description: "Статии и съвети за градинарство, грижи за растения и сезонни препоръки от нашите експерти.",
  keywords: ["блог", "статии", "съвети", "градинарство", "растения", "сезонни"],
};

// Example blog posts
const examplePosts = [
  {
    title: "Пролетни цветя за градината: Кога и как да засадим",
    excerpt: "Подготовката за пролетта започва още през зимата. Научете кои цветя да засадите и кога...",
    date: "2025-03-01",
    category: "Сезонни съвети",
    author: "Експертен екип",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "Грижи за розите през лятото",
    excerpt: "Розите са кралици на градината, но изискват специфични грижи през горещите месеци...",
    date: "2025-06-15",
    category: "Грижи",
    author: "Експертен екип",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "10-те най-лесни за отглеждане стайни растения",
    excerpt: "Ако сте начинаещ, тези растения са перфектни за начало. Издържливи и красиви...",
    date: "2025-02-20",
    category: "Начинаещи",
    author: "Експертен екип",
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHero
        title="Блог"
        description="Сезонни съвети, ръководства и новини от света на растенията"
      />

      <Section className="bg-white py-16">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {examplePosts.map((post, index) => (
              <Card key={index} hover className="h-full">
                <CardContent className="p-0">
                  <div className="h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-[var(--color-gray-600)]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString("bg-BG")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        <span>{post.category}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-[var(--color-gray-700)] mb-4">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-sm text-[var(--color-gray-600)]">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[var(--color-gray-600)]">
              📝 Редовно публикуваме нови статии. Следете ни за актуална информация!
            </p>
          </div>
        </Container>
      </Section>

      {/* Categories */}
      <Section className="bg-[var(--color-light)]">
        <Container>
          <div className="text-center mb-8">
            <h2 className="mb-4">Категории</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {["Сезонни съвети", "Грижи за растения", "Проекти", "Събития"].map(
              (category, index) => (
                <Card key={index} className="bg-white text-center cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="py-6">
                    <h3 className="font-bold text-[var(--color-primary)]">{category}</h3>
                  </CardContent>
                </Card>
              )
            )}
          </div>
        </Container>
      </Section>
    </>
  );
}
