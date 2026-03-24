"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Camera,
  Check,
  Copy,
  ExternalLink,
  Loader2,
  Play,
  Plus,
  Send,
  Save,
  Share2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";

const COUNTRIES = [
  { value: "ecuador", flag: "\u{1F1EA}\u{1F1E8}", name: "\u0415\u043A\u0432\u0430\u0434\u043E\u0440" },
  { value: "colombia", flag: "\u{1F1E8}\u{1F1F4}", name: "\u041A\u043E\u043B\u0443\u043C\u0431\u0438\u044F" },
  { value: "kenya", flag: "\u{1F1F0}\u{1F1EA}", name: "\u041A\u0435\u043D\u0438\u044F" },
  { value: "netherlands", flag: "\u{1F1F3}\u{1F1F1}", name: "\u0425\u043E\u043B\u0430\u043D\u0434\u0438\u044F" },
  { value: "turkey", flag: "\u{1F1F9}\u{1F1F7}", name: "\u0422\u0443\u0440\u0446\u0438\u044F" },
  { value: "greece", flag: "\u{1F1EC}\u{1F1F7}", name: "\u0413\u044A\u0440\u0446\u0438\u044F" },
  { value: "bulgaria", flag: "\u{1F1E7}\u{1F1EC}", name: "\u0411\u044A\u043B\u0433\u0430\u0440\u0438\u044F" },
  { value: "other", flag: "\u{1F30D}", name: "\u0414\u0440\u0443\u0433\u0430" },
];

const AUTO_TITLES: Record<string, string> = {
  ecuador: "\u0421\u0432\u0435\u0436\u0438 \u0440\u043E\u0437\u0438 \u043E\u0442 \u0415\u043A\u0432\u0430\u0434\u043E\u0440",
  colombia: "\u0421\u0432\u0435\u0436\u0438 \u0446\u0432\u0435\u0442\u044F \u043E\u0442 \u041A\u043E\u043B\u0443\u043C\u0431\u0438\u044F",
  kenya: "\u0420\u043E\u0437\u0438 \u0438 \u0445\u0440\u0438\u0437\u0430\u043D\u0442\u0435\u043C\u0438 \u043E\u0442 \u041A\u0435\u043D\u0438\u044F",
  netherlands: "\u041B\u0430\u043B\u0435\u0442\u0430 \u0438 \u0440\u0430\u0441\u0442\u0435\u043D\u0438\u044F \u043E\u0442 \u0425\u043E\u043B\u0430\u043D\u0434\u0438\u044F",
  turkey: "\u0420\u043E\u0437\u0438 \u0438 \u0441\u0435\u0437\u043E\u043D\u043D\u0438 \u0446\u0432\u0435\u0442\u044F \u043E\u0442 \u0422\u0443\u0440\u0446\u0438\u044F",
  greece: "\u0421\u0440\u0435\u0434\u0438\u0437\u0435\u043C\u043D\u043E\u043C\u043E\u0440\u0441\u043A\u0438 \u0440\u0430\u0441\u0442\u0435\u043D\u0438\u044F \u043E\u0442 \u0413\u044A\u0440\u0446\u0438\u044F",
  bulgaria: "\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0430 \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u044F",
  other: "\u041D\u043E\u0432\u043E \u0437\u0430\u0440\u0435\u0436\u0434\u0430\u043D\u0435",
};

const COUNTRY_NAMES: Record<string, string> = {
  ecuador: "\u0415\u043A\u0432\u0430\u0434\u043E\u0440",
  colombia: "\u041A\u043E\u043B\u0443\u043C\u0431\u0438\u044F",
  kenya: "\u041A\u0435\u043D\u0438\u044F",
  netherlands: "\u0425\u043E\u043B\u0430\u043D\u0434\u0438\u044F",
  turkey: "\u0422\u0443\u0440\u0446\u0438\u044F",
  greece: "\u0413\u044A\u0440\u0446\u0438\u044F",
  bulgaria: "\u0411\u044A\u043B\u0433\u0430\u0440\u0438\u044F",
  other: "\u0434\u0440\u0443\u0433\u0430 \u0441\u0442\u0440\u0430\u043D\u0430",
};

interface FilePreview {
  file: File;
  url: string;
  isVideo: boolean;
}

export default function NovaDostavkaPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [country, setCountry] = useState("");
  const [arrivalDate, setArrivalDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [title, setTitle] = useState("");
  const [titleManuallyEdited, setTitleManuallyEdited] = useState(false);
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<FilePreview[]>([]);

  // UI state
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [published, setPublished] = useState(false);
  const [publishedSlug, setPublishedSlug] = useState("");
  const [publishedId, setPublishedId] = useState("");

  function handleCountrySelect(value: string) {
    setCountry(value);
    if (!titleManuallyEdited) {
      setTitle(AUTO_TITLES[value] || AUTO_TITLES.other);
    }
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    setTitleManuallyEdited(true);
  }

  function handleFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files;
    if (!selected) return;

    const newFiles: FilePreview[] = Array.from(selected).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isVideo: file.type.startsWith("video/"),
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    // Reset input so same file can be selected again
    e.target.value = "";
  }

  function removeFile(index: number) {
    setFiles((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].url);
      updated.splice(index, 1);
      return updated;
    });
  }

  async function uploadFiles(): Promise<{ images: string[]; videos: string[] }> {
    if (files.length === 0) return { images: [], videos: [] };

    const formData = new FormData();
    files.forEach((f) => {
      formData.append("files", f.file);
    });

    const res = await fetch("/api/upload/arrival-images", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("\u0413\u0440\u0435\u0448\u043A\u0430 \u043F\u0440\u0438 \u043A\u0430\u0447\u0432\u0430\u043D\u0435 \u043D\u0430 \u0444\u0430\u0439\u043B\u043E\u0432\u0435\u0442\u0435");
    }

    return await res.json();
  }

  async function handleSave(status: "published" | "draft") {
    if (!country) {
      toast.error("\u041C\u043E\u043B\u044F, \u0438\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0430");
      return;
    }
    if (!title.trim()) {
      toast.error("\u041C\u043E\u043B\u044F, \u0432\u044A\u0432\u0435\u0434\u0435\u0442\u0435 \u0437\u0430\u0433\u043B\u0430\u0432\u0438\u0435");
      return;
    }

    setSaving(true);
    setUploading(files.length > 0);

    try {
      // Upload files first
      let uploadedMedia = { images: [] as string[], videos: [] as string[] };
      if (files.length > 0) {
        uploadedMedia = await uploadFiles();
        setUploading(false);
      }

      const res = await fetch("/api/arrivals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          country,
          description: description.trim() || null,
          arrival_date: arrivalDate,
          status,
          images: uploadedMedia.images,
          videos: uploadedMedia.videos,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "\u0413\u0440\u0435\u0448\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u043F\u0438\u0441");
      }

      const data = await res.json();

      if (status === "published") {
        setPublishedSlug(data.slug || data.id);
        setPublishedId(data.id);
        setPublished(true);
        toast.success("\u041F\u0443\u0431\u043B\u0438\u043A\u0443\u0432\u0430\u043D\u043E!");
      } else {
        toast.success("\u0417\u0430\u043F\u0430\u0437\u0435\u043D\u043E \u043A\u0430\u0442\u043E \u0447\u0435\u0440\u043D\u043E\u0432\u0430");
        router.push("/admin/dostavki");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430 \u0433\u0440\u0435\u0448\u043A\u0430";
      toast.error(message);
    } finally {
      setSaving(false);
      setUploading(false);
    }
  }

  function resetForm() {
    setCountry("");
    setArrivalDate(new Date().toISOString().split("T")[0]);
    setTitle("");
    setTitleManuallyEdited(false);
    setDescription("");
    files.forEach((f) => URL.revokeObjectURL(f.url));
    setFiles([]);
    setPublished(false);
    setPublishedSlug("");
    setPublishedId("");
  }

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const arrivalUrl = `${siteUrl}/dostavki/${publishedSlug}`;
  const shareText = `\u041D\u043E\u0432\u043E \u0437\u0430\u0440\u0435\u0436\u0434\u0430\u043D\u0435 \u043E\u0442 ${COUNTRY_NAMES[country] || country}! \u0412\u0438\u0436: ${arrivalUrl}`;

  // Success screen after publish
  if (published) {
    return (
      <div className="p-3 max-w-lg mx-auto">
        <div className="text-center py-12 space-y-6">
          {/* Success icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-green-600" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[var(--color-foreground)]">
              {"\u041F\u0443\u0431\u043B\u0438\u043A\u0443\u0432\u0430\u043D\u043E!"}
            </h1>
            <p className="text-[var(--color-gray-600)] mt-2">
              {"\u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0430\u0442\u0430 \u0435 \u0432\u0438\u0434\u0438\u043C\u0430 \u043D\u0430 \u0441\u0430\u0439\u0442\u0430"}
            </p>
          </div>

          {/* Share buttons */}
          <div>
            <p className="text-sm font-medium text-[var(--color-gray-600)] mb-3">
              {"\u0421\u043F\u043E\u0434\u0435\u043B\u0438 \u0432:"}
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(arrivalUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#1877F2] text-white text-lg font-bold hover:opacity-90 transition-opacity"
              >
                f
              </a>
              <a
                href={`viber://forward?text=${encodeURIComponent(shareText)}`}
                className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#7360F2] text-white text-lg font-bold hover:opacity-90 transition-opacity"
              >
                V
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#25D366] text-white text-lg font-bold hover:opacity-90 transition-opacity"
              >
                W
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(arrivalUrl);
                  toast.success("\u041B\u0438\u043D\u043A\u044A\u0442 \u0435 \u043A\u043E\u043F\u0438\u0440\u0430\u043D");
                }}
                className="flex items-center justify-center w-14 h-14 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-4">
            <a
              href={arrivalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full min-h-[48px] px-6 rounded-xl border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-medium hover:bg-[var(--color-primary-light)] transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              {"\u0412\u0438\u0436 \u043D\u0430 \u0441\u0430\u0439\u0442\u0430 \u2192"}
            </a>
            <button
              onClick={resetForm}
              className="flex items-center justify-center gap-2 w-full min-h-[48px] px-6 rounded-xl bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
            >
              <Plus className="w-5 h-5" />
              {"\u041D\u043E\u0432\u043E \u0437\u0430\u0440\u0435\u0436\u0434\u0430\u043D\u0435"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 max-w-lg mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/admin/dostavki")}
          className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-[var(--color-foreground)]">
          {"\u041D\u043E\u0432\u043E \u0437\u0430\u0440\u0435\u0436\u0434\u0430\u043D\u0435"}
        </h1>
      </div>

      {/* Country selector */}
      <div>
        <label className="block text-sm font-semibold text-[var(--color-gray-700)] mb-2 ml-1">
          {"\u0421\u0442\u0440\u0430\u043D\u0430 *"}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {COUNTRIES.map((c) => (
            <button
              key={c.value}
              onClick={() => handleCountrySelect(c.value)}
              className={`flex items-center gap-2 p-3 rounded-xl border-2 text-left min-h-[52px] transition-all ${
                country === c.value
                  ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]"
                  : "border-[var(--color-border)] bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-2xl leading-none">{c.flag}</span>
              <span className="font-medium text-sm">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Date picker */}
      <div>
        <label className="block text-sm font-semibold text-[var(--color-gray-700)] mb-2 ml-1">
          {"\u0414\u0430\u0442\u0430 \u043D\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0430"}
        </label>
        <input
          type="date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
          className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-[var(--color-border)] text-[var(--color-foreground)] min-h-[48px] text-base focus:outline-none focus:border-[var(--color-primary)]/50 focus:ring-2 focus:ring-[var(--color-primary)]/10 transition-all"
        />
      </div>

      {/* Title */}
      <Input
        label={"\u0417\u0430\u0433\u043B\u0430\u0432\u0438\u0435 *"}
        value={title}
        onChange={(e) => handleTitleChange(e.target.value)}
        placeholder={"\u041D\u0430\u043F\u0440. \u0421\u0432\u0435\u0436\u0438 \u0446\u0432\u0435\u0442\u044F \u043E\u0442 \u0415\u043A\u0432\u0430\u0434\u043E\u0440"}
        className="min-h-[48px] text-base"
      />

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-[var(--color-gray-700)] mb-2 ml-1">
          {"\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 (\u043D\u0435\u0437\u0430\u0434\u044A\u043B\u0436\u0438\u0442\u0435\u043B\u043D\u043E)"}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={"\u0414\u043E\u0431\u0430\u0432\u0435\u0442\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435..."}
          rows={2}
          className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-[var(--color-border)] text-[var(--color-foreground)] text-base resize-none focus:outline-none focus:border-[var(--color-primary)]/50 focus:ring-2 focus:ring-[var(--color-primary)]/10 transition-all placeholder:text-[var(--color-gray-400)]"
        />
      </div>

      {/* Photo/Video upload */}
      <div>
        <label className="block text-sm font-semibold text-[var(--color-gray-700)] mb-2 ml-1">
          {"\u0421\u043D\u0438\u043C\u043A\u0438 \u0438 \u0432\u0438\u0434\u0435\u043E"}
        </label>

        {/* Upload area */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full min-h-[100px] border-2 border-dashed border-[var(--color-border)] rounded-xl flex flex-col items-center justify-center gap-2 p-4 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)]/30 transition-all active:bg-[var(--color-primary-light)]/50"
        >
          <Camera className="w-8 h-8 text-[var(--color-gray-600)]" />
          <span className="text-sm font-medium text-[var(--color-gray-600)]">
            {"\u0414\u043E\u0431\u0430\u0432\u0438 \u0441\u043D\u0438\u043C\u043A\u0438 \u0438\u043B\u0438 \u0432\u0438\u0434\u0435\u043E"}
          </span>
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFilesSelected}
          className="hidden"
        />

        {/* Thumbnails grid */}
        {files.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-3">
            {files.map((f, idx) => (
              <div
                key={idx}
                className="relative aspect-square rounded-xl overflow-hidden bg-gray-100"
              >
                {f.isVideo ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <video
                      src={f.url}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 text-gray-800 ml-0.5" />
                      </div>
                    </div>
                  </div>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={f.url}
                    alt={`\u0421\u043D\u0438\u043C\u043A\u0430 ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="absolute top-1 right-1 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="space-y-3 pt-2 pb-6">
        {/* Publish button */}
        <button
          onClick={() => handleSave("published")}
          disabled={saving || !country || !title.trim()}
          className="w-full h-14 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-base flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {saving && !uploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {"\u041F\u0443\u0431\u043B\u0438\u043A\u0443\u0432\u0430\u043D\u0435..."}
            </>
          ) : uploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {"\u041A\u0430\u0447\u0432\u0430\u043D\u0435 \u043D\u0430 \u0444\u0430\u0439\u043B\u043E\u0432\u0435..."}
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              {"\u041F\u0443\u0431\u043B\u0438\u043A\u0443\u0432\u0430\u0439"}
            </>
          )}
        </button>

        {/* Save draft button */}
        <button
          onClick={() => handleSave("draft")}
          disabled={saving || !country || !title.trim()}
          className="w-full h-12 rounded-xl border-2 border-[var(--color-border)] text-[var(--color-gray-600)] font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          <Save className="w-4 h-4" />
          {"\u0417\u0430\u043F\u0430\u0437\u0438 \u043A\u0430\u0442\u043E \u0447\u0435\u0440\u043D\u043E\u0432\u0430"}
        </button>
      </div>
    </div>
  );
}
