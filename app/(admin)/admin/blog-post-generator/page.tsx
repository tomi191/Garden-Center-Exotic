"use client";

import { useState, useRef } from "react";
import { FileText, Sparkles, Copy, Check, RefreshCw, Download } from "lucide-react";

type Tone = "professional" | "casual" | "friendly" | "educational";
type Length = "short" | "medium" | "long";
type Language = "bg" | "en";

const TONE_OPTIONS: { value: Tone; label: string; description: string }[] = [
  { value: "professional", label: "Професионален", description: "Експертен и авторитетен" },
  { value: "casual", label: "Неформален", description: "Разговорен стил" },
  { value: "friendly", label: "Приятелски", description: "Топъл и достъпен" },
  { value: "educational", label: "Образователен", description: "Информативен и полезен" },
];

const LENGTH_OPTIONS: { value: Length; label: string; words: string }[] = [
  { value: "short", label: "Кратък", words: "300-500 думи" },
  { value: "medium", label: "Среден", words: "600-900 думи" },
  { value: "long", label: "Дълъг", words: "1000-1500 думи" },
];

export default function BlogPostGeneratorPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<Tone>("professional");
  const [length, setLength] = useState<Length>("medium");
  const [language, setLanguage] = useState<Language>("bg");
  const [keywords, setKeywords] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setIsGenerating(true);
    setGeneratedContent("");
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/admin/generate-blog-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          tone,
          length,
          language,
          keywords: keywords
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean),
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to generate");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                setGeneratedContent((prev) => prev + parsed.content);
              } else if (parsed.error) {
                console.error("Generation error:", parsed.error);
              }
            } catch {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Error generating blog post:", error);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStop = () => {
    abortControllerRef.current?.abort();
    setIsGenerating(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `blog-post-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          Blog Post Generator
        </h1>
        <p className="text-gray-600 mt-2">
          Генерирайте качествено блог съдържание с помощта на AI
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left - Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
          <h2 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-500" />
            Настройки
          </h2>

          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тема на публикацията *
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Напр: 10 съвета за грижа за орхидеи през зимата"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Tone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тон на писане
            </label>
            <div className="grid grid-cols-2 gap-3">
              {TONE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTone(option.value)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${
                    tone === option.value
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-medium text-gray-900">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Length */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дължина
            </label>
            <div className="grid grid-cols-3 gap-3">
              {LENGTH_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLength(option.value)}
                  className={`p-3 rounded-xl border-2 text-center transition-all ${
                    length === option.value
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-medium text-gray-900">{option.label}</div>
                  <div className="text-xs text-gray-500">{option.words}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Език
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setLanguage("bg")}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  language === "bg"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-medium text-gray-900">🇧🇬 Български</div>
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`p-3 rounded-xl border-2 text-center transition-all ${
                  language === "en"
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-medium text-gray-900">🇬🇧 English</div>
              </button>
            </div>
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ключови думи (по избор)
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="орхидея, грижа, зима (разделени със запетая)"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={isGenerating ? handleStop : handleGenerate}
            disabled={!topic.trim() && !isGenerating}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
              isGenerating
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Спри генерирането
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Генерирай публикация
              </>
            )}
          </button>
        </div>

        {/* Right - Output */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg text-gray-900">
              Генериран текст
            </h2>
            {generatedContent && (
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Копирай"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Изтегли като Markdown"
                >
                  <Download className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 min-h-[500px] bg-gray-50 rounded-xl p-4 overflow-auto">
            {generatedContent ? (
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-gray-800 text-sm leading-relaxed">
                  {generatedContent}
                </pre>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Генерираният текст ще се появи тук</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
