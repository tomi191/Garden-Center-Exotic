"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Save,
  Send,
  ArrowLeft,
  Loader2,
  Eye,
  Code,
  Image as ImageIcon,
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

const WORD_COUNTS = [
  { value: 800, label: "800 думи" },
  { value: 1200, label: "1200 думи" },
  { value: 2000, label: "2000 думи" },
  { value: 3000, label: "3000 думи" },
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

export default function NewBlogPostPage() {
  const router = useRouter();

  // AI generation form
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [contentType, setContentType] = useState<ContentType>("tofu");
  const [category, setCategory] = useState("Грижи");
  const [targetWordCount, setTargetWordCount] = useState(1200);
  const [generating, setGenerating] = useState(false);

  // Blog post fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [tags, setTags] = useState("");
  const [postKeywords, setPostKeywords] = useState("");
  const [image, setImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [aiModel, setAiModel] = useState("");

  // UI state
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  async function handleGenerate() {
    if (!topic.trim()) {
      toast.error("Моля, въведете тема");
      return;
    }

    setGenerating(true);
    try {
      const res = await fetch("/api/blog/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          keywords: keywords.split(",").map((k) => k.trim()).filter(Boolean),
          contentType,
          category,
          targetWordCount,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Грешка при генериране");
      }

      const data = json.data;
      setTitle(data.title);
      setSlug(data.suggestedSlug);
      setExcerpt(data.excerpt);
      setContent(data.content);
      setMetaTitle(data.metaTitle);
      setMetaDescription(data.metaDescription);
      setPostKeywords(data.keywords?.join(", ") || "");
      setWordCount(data.wordCount);
      setReadingTime(data.readingTime);
      setAiModel(json.model || "");

      toast.success(`Статията е генерирана! (${data.wordCount} думи)`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Неизвестна грешка";
      toast.error(message);
    } finally {
      setGenerating(false);
    }
  }

  async function handleSave(status: "draft" | "published") {
    if (!title.trim() || !content.trim()) {
      toast.error("Заглавието и съдържанието са задължителни");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          slug: slug.trim() || undefined,
          excerpt: excerpt.trim() || null,
          content: content.trim(),
          meta_title: metaTitle.trim() || title.trim(),
          meta_description: metaDescription.trim() || null,
          category,
          image: image.trim() || null,
          featured,
          status,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          keywords: postKeywords.split(",").map((k) => k.trim()).filter(Boolean),
          word_count: wordCount,
          reading_time: readingTime,
          content_type: contentType,
          ai_model: aiModel || null,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Грешка при запис");
      }

      toast.success(
        status === "published" ? "Статията е публикувана!" : "Статията е запазена като чернова"
      );
      router.push("/admin/blog");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Грешка при запис";
      toast.error(message);
    } finally {
      setSaving(false);
    }
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
            <h1 className="text-sm sm:text-base font-semibold text-[var(--color-foreground)]">
              Нова статия
            </h1>
            <p className="text-sm text-[var(--color-gray-600)]">
              Генерирайте с AI или напишете ръчно
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left Panel - AI Generation */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-[var(--color-secondary)]" />
              <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500">AI Генератор</h2>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Тема *</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Напр.: Как да отглеждаме лавандула в България"
                className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Ключови думи (разделени с запетая)
              </label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="лавандула, отглеждане, подрязване"
                className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Тип съдържание</label>
              <div className="grid grid-cols-2 gap-2">
                {CONTENT_TYPES.map((ct) => (
                  <button
                    key={ct.value}
                    onClick={() => setContentType(ct.value)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      contentType === ct.value
                        ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]"
                        : "border-[var(--color-border)] hover:border-gray-300"
                    }`}
                  >
                    <span className="block text-sm font-medium">{ct.label}</span>
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

            <div>
              <label className="block text-sm font-medium mb-1.5">Брой думи</label>
              <div className="grid grid-cols-4 gap-2">
                {WORD_COUNTS.map((wc) => (
                  <button
                    key={wc.value}
                    onClick={() => setTargetWordCount(wc.value)}
                    className={`py-2 rounded-xl border text-xs font-medium transition-all ${
                      targetWordCount === wc.value
                        ? "border-[var(--color-primary)] bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                        : "border-[var(--color-border)] text-[var(--color-gray-600)] hover:border-gray-300"
                    }`}
                  >
                    {wc.label}
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={generating || !topic.trim()}
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
                  Генерирай с AI
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Right Panel - Editor */}
        <div className="lg:col-span-3 space-y-4">
          {/* Post fields */}
          <div className="bg-white rounded-xl border border-[var(--color-border)] p-6 space-y-4">
            <h2 className="text-xs font-medium uppercase tracking-wider text-gray-500">Данни за статията</h2>

            <div>
              <label className="block text-sm font-medium mb-1.5">Заглавие *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Заглавие на статията"
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
                  placeholder="url-slug"
                  className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Изображение URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Резюме</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Кратко описание на статията"
                className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                rows={2}
              />
            </div>

            {/* Content with toggle */}
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
                  placeholder="HTML съдържание на статията..."
                  className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm font-mono resize-vertical focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                  rows={12}
                />
              )}
            </div>

            {/* SEO fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="SEO заглавие"
                  className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Meta Description</label>
                <input
                  type="text"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="SEO описание (150-160 символа)"
                  className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Тагове (запетая)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="рози, лято, грижи"
                  className="w-full px-3 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Ключови думи (запетая)</label>
                <input
                  type="text"
                  value={postKeywords}
                  onChange={(e) => setPostKeywords(e.target.value)}
                  placeholder="ключова1, ключова2"
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
                <span className="text-sm font-medium">Препоръчана статия</span>
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
              disabled={saving || !title.trim() || !content.trim()}
              className="flex items-center gap-2"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Запази като чернова
            </Button>
            <Button
              onClick={() => handleSave("published")}
              disabled={saving || !title.trim() || !content.trim()}
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
