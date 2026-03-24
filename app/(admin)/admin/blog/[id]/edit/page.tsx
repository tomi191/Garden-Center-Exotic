"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Save,
  Send,
  ArrowLeft,
  Loader2,
  Eye,
  Code,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";
import type { ContentType } from "@/lib/content-engine/types";

const CONTENT_TYPES: { value: ContentType; label: string; desc: string }[] = [
  { value: "tofu", label: "TOFU", desc: "Образователна статия" },
  { value: "mofu", label: "MOFU", desc: "Ръководство" },
  { value: "bofu", label: "BOFU", desc: "Конверсия" },
  { value: "advertorial", label: "Advertorial", desc: "Рекламна история" },
];

const CATEGORIES = [
  "Грижи",
  "Сезонни съвети",
  "Начинаещи",
  "Аранжировки",
  "Вътрешни растения",
  "Градина",
  "Общи",
];

export default function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Blog post fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("Грижи");
  const [tags, setTags] = useState("");
  const [postKeywords, setPostKeywords] = useState("");
  const [image, setImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [contentType, setContentType] = useState<ContentType>("tofu");

  // AI regeneration
  const [regenTopic, setRegenTopic] = useState("");

  useEffect(() => {
    fetchPost();
  }, [id]);

  async function fetchPost() {
    try {
      const res = await fetch(`/api/blog/${id}`);
      if (!res.ok) throw new Error("Not found");
      const post = await res.json();
      setTitle(post.title || "");
      setSlug(post.slug || "");
      setExcerpt(post.excerpt || "");
      setContent(post.content || "");
      setMetaTitle(post.meta_title || "");
      setMetaDescription(post.meta_description || "");
      setCategory(post.category || "Грижи");
      setTags(post.tags?.join(", ") || "");
      setPostKeywords(post.keywords?.join(", ") || "");
      setImage(post.image || "");
      setFeatured(post.featured || false);
      setStatus(post.status || "draft");
      setWordCount(post.word_count || 0);
      setReadingTime(post.reading_time || 0);
      setContentType(post.content_type || "tofu");
    } catch {
      toast.error("Статията не е намерена");
      router.push("/admin/blog");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegenerate() {
    if (!regenTopic.trim()) {
      toast.error("Моля, въведете тема за регенерация");
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: regenTopic.trim(),
          keywords: postKeywords.split(",").map((k) => k.trim()).filter(Boolean),
          contentType,
          category,
          targetWordCount: 1200,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);

      const data = json.data;
      setTitle(data.title);
      setExcerpt(data.excerpt);
      setContent(data.content);
      setMetaTitle(data.metaTitle);
      setMetaDescription(data.metaDescription);
      setPostKeywords(data.keywords?.join(", ") || "");
      setWordCount(data.wordCount);
      setReadingTime(data.readingTime);
      toast.success("Съдържанието е прегенерирано!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Грешка");
    } finally {
      setGenerating(false);
    }
  }

  async function handleSave(newStatus?: "draft" | "published") {
    if (!title.trim() || !content.trim()) {
      toast.error("Заглавието и съдържанието са задължителни");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim(),
          excerpt: excerpt.trim() || null,
          content: content.trim(),
          meta_title: metaTitle.trim() || title.trim(),
          meta_description: metaDescription.trim() || null,
          category,
          image: image.trim() || null,
          featured,
          status: newStatus || status,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          keywords: postKeywords.split(",").map((k) => k.trim()).filter(Boolean),
          word_count: wordCount,
          reading_time: readingTime,
          content_type: contentType,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error);
      }

      toast.success("Статията е запазена!");
      if (newStatus) setStatus(newStatus);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Грешка при запис");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Сигурни ли сте, че искате да изтриете тази статия?")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Статията е изтрита");
        router.push("/admin/blog");
      }
    } catch {
      toast.error("Грешка при изтриване");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/admin/blog")}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-[var(--color-foreground)]">
              Редактиране
            </h1>
            <p className="text-sm text-[var(--color-gray-600)]">
              {status === "published" ? "Публикувана" : "Чернова"} / {category}
            </p>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="p-2 rounded-lg hover:bg-red-50 transition-colors"
          title="Изтрий"
        >
          <Trash2 className="w-5 h-5 text-red-500" />
        </button>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left - Regenerate */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[var(--color-secondary)]" />
              <h2 className="font-bold text-lg">Прегенерирай с AI</h2>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Нова тема</label>
              <textarea
                value={regenTopic}
                onChange={(e) => setRegenTopic(e.target.value)}
                placeholder="Въведете нова тема за AI генериране..."
                className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Тип</label>
              <div className="grid grid-cols-2 gap-2">
                {CONTENT_TYPES.map((ct) => (
                  <button
                    key={ct.value}
                    onClick={() => setContentType(ct.value)}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      contentType === ct.value
                        ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]"
                        : "border-[var(--color-border)] hover:border-gray-300"
                    }`}
                  >
                    <span className="block text-xs font-medium">{ct.label}</span>
                    <span className="block text-[10px] text-[var(--color-gray-600)]">
                      {ct.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Категория</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <Button
              onClick={handleRegenerate}
              disabled={generating || !regenTopic.trim()}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Генериране...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Прегенерирай съдържанието
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Right - Editor */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6 space-y-4">
            <h2 className="font-bold text-lg">Данни за статията</h2>

            <div>
              <label className="block text-sm font-medium mb-1.5">Заглавие *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Изображение URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Резюме</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                rows={2}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium">Съдържание *</label>
                <div className="flex gap-1">
                  <button
                    onClick={() => setPreviewMode(false)}
                    className={`p-1.5 rounded-lg text-xs flex items-center gap-1 ${
                      !previewMode ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
                    }`}
                  >
                    <Code className="w-3.5 h-3.5" />
                    HTML
                  </button>
                  <button
                    onClick={() => setPreviewMode(true)}
                    className={`p-1.5 rounded-lg text-xs flex items-center gap-1 ${
                      previewMode ? "bg-gray-100 font-medium" : "hover:bg-gray-50"
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Преглед
                  </button>
                </div>
              </div>
              {previewMode ? (
                <div
                  className="w-full min-h-[300px] max-h-[500px] overflow-y-auto px-4 py-3 border border-[var(--color-border)] rounded-xl text-sm prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              ) : (
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm font-mono resize-vertical focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                  rows={12}
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Meta Description</label>
                <input
                  type="text"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Тагове</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Ключови думи</label>
                <input
                  type="text"
                  value={postKeywords}
                  onChange={(e) => setPostKeywords(e.target.value)}
                  className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <span className="text-sm font-medium">Препоръчана</span>
              </label>
              {wordCount > 0 && (
                <span className="text-xs text-[var(--color-gray-600)]">
                  {wordCount} думи / {readingTime} мин четене
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 justify-end">
            <Button
              variant="outline"
              onClick={() => handleSave("draft")}
              disabled={saving}
              className="flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Запази като чернова
            </Button>
            <Button
              onClick={() => handleSave("published")}
              disabled={saving}
              className="flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Публикувай
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
