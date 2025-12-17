import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Tag, User, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { blogPosts, getBlogCategories } from "@/data/blog";

export const metadata: Metadata = {
  title: "Блог",
  description: "Статии и съвети за градинарство, грижи за растения и сезонни препоръки от нашите експерти.",
  keywords: ["блог", "статии", "съвети", "градинарство", "растения", "сезонни"],
};

const categories = getBlogCategories();

export default function BlogPage() {
  return (
    <>
      {/* Hero Section - consistent with other pages */}
      <section className="relative min-h-[70vh] flex items-center">
        {/* Full Screen Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/backgrounds/blog-bg.png"
            alt="Блог за Растения"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/25" />
        </div>

        <Container className="relative z-10 py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-[var(--color-secondary)] text-sm font-medium tracking-wider uppercase mb-4">
              Статии & Съвети
            </span>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold !text-white mb-6 leading-tight drop-shadow-lg">
              Зелен Блог
            </h1>

            <p className="!text-white text-lg md:text-xl leading-relaxed mb-8 drop-shadow-md">
              Сезонни съвети, ръководства и новини от света на растенията.
              Научете тайните на успешното градинарство от нашите експерти.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="#articles">
                <Button className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white rounded-full px-6">
                  Разгледай статиите
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/grizhi">
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-6">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Наръчник за грижи
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Section id="articles" className="bg-white py-16 md:py-20">
        <Container>
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[var(--color-secondary)] font-semibold tracking-wider uppercase text-sm mb-2 block">
              Последни публикации
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
              Статии и Ръководства
            </h2>
            <p className="text-[var(--color-gray-600)] max-w-2xl mx-auto">
              Открийте полезни съвети за грижа за растенията и сезонни препоръки от нашите експерти
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="h-full group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* Снимка */}
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {post.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-xs font-bold rounded-full shadow-lg">
                          Препоръчано
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Съдържание */}
                  <div className="p-6">
                    {/* Мета информация */}
                    <div className="flex items-center flex-wrap gap-3 mb-3 text-xs text-[var(--color-gray-600)]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(post.date).toLocaleDateString("bg-BG")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        <span>{post.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Заглавие */}
                    <h3 className="text-xl font-bold mb-3 text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-[var(--color-gray-700)] mb-4 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Автор */}
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                      <div className="flex items-center gap-2 text-sm text-[var(--color-gray-600)]">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <span className="text-[var(--color-primary)] font-semibold text-sm group-hover:gap-2 transition-all">
                        Прочети →
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[var(--color-gray-600)]">
              {blogPosts.length} статии налични. Редовно публикуваме ново съдържание!
            </p>
          </div>
        </Container>
      </Section>

      {/* Категории */}
      <Section className="bg-[var(--color-light)] py-16 md:py-20">
        <Container>
          <div className="text-center mb-12">
            <span className="text-[var(--color-secondary)] font-semibold tracking-wider uppercase text-sm mb-2 block">
              Теми
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
              Категории
            </h2>
            <p className="text-[var(--color-gray-600)]">
              Разгледайте статиите по теми
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="bg-white text-center cursor-pointer hover:shadow-xl transition-all group">
                <CardContent className="py-8">
                  <h3 className="font-bold text-lg text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">
                    {category}
                  </h3>
                  <p className="text-sm text-[var(--color-gray-600)] mt-2">
                    {blogPosts.filter(p => p.category === category).length} статии
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
