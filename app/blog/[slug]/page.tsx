import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Tag, User, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { supabaseAdmin } from "@/lib/supabase";
import { SITE_CONFIG } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: post } = await supabaseAdmin
    .from("blog_posts")
    .select("title, meta_title, meta_description, excerpt")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) {
    return { title: "Статията не е намерена" };
  }

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || "",
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || "",
      type: "article",
      url: `${SITE_CONFIG.url}/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const { data: post } = await supabaseAdmin
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!post) {
    notFound();
  }

  // Get related posts (same category, different post)
  const { data: relatedPosts } = await supabaseAdmin
    .from("blog_posts")
    .select("id, title, slug, excerpt, image, category, reading_time, published_at")
    .eq("status", "published")
    .eq("category", post.category)
    .neq("id", post.id)
    .order("published_at", { ascending: false })
    .limit(3);

  // Structured data
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || "",
    image: post.image || `${SITE_CONFIG.url}/images/backgrounds/blog-bg.png`,
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at || post.published_at || post.created_at,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@id": `${SITE_CONFIG.url}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${slug}`,
    },
    wordCount: post.word_count || undefined,
    inLanguage: "bg",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Начало",
        item: SITE_CONFIG.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Блог",
        item: `${SITE_CONFIG.url}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_CONFIG.url}/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([blogPostingJsonLd, breadcrumbJsonLd]),
        }}
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end">
        <div className="absolute inset-0">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src="/images/backgrounds/blog-bg.png"
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        </div>

        <Container className="relative z-10 pb-12 pt-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[var(--color-secondary)] text-white text-xs font-bold rounded-full">
                {post.category}
              </span>
              {post.featured && (
                <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                  Препоръчано
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold !text-white mb-4 leading-tight drop-shadow-lg">
              {post.title}
            </h1>

            <div className="flex items-center flex-wrap gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.published_at || post.created_at).toLocaleDateString("bg-BG", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.reading_time} мин четене
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Content */}
      <Section className="bg-white py-12 md:py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Обратно към блога
            </Link>

            {/* Article content */}
            <article
              className="prose prose-lg max-w-none
                prose-headings:font-serif prose-headings:text-[var(--color-primary-dark)]
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-[var(--color-gray-700)] prose-p:leading-relaxed
                prose-a:text-[var(--color-primary)] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[var(--color-foreground)]
                prose-ul:my-4 prose-ol:my-4
                prose-li:text-[var(--color-gray-700)]
                prose-blockquote:border-l-[var(--color-secondary)] prose-blockquote:bg-[var(--color-light)] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-xl
                prose-table:border-collapse prose-th:bg-[var(--color-primary-light)] prose-th:text-[var(--color-primary-dark)] prose-th:px-4 prose-th:py-2 prose-td:border prose-td:border-[var(--color-border)] prose-td:px-4 prose-td:py-2"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 mt-10 pt-6 border-t border-[var(--color-border)]">
                <Tag className="w-4 h-4 text-[var(--color-gray-600)]" />
                {post.tags.map((tag: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-[var(--color-light)] text-[var(--color-gray-600)] text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <Section className="bg-[var(--color-light)] py-12 md:py-16">
          <Container>
            <div className="text-center mb-10">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)]">
                Подобни статии
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link key={related.id} href={`/blog/${related.slug}`}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-sm line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-xs text-[var(--color-gray-600)] mt-2 line-clamp-2">
                        {related.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
