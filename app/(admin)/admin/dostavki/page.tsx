"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Package, Calendar, Pencil, Loader2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

interface Arrival {
  id: string;
  title: string;
  slug: string;
  country: string;
  description: string | null;
  arrival_date: string;
  status: "published" | "draft";
  images: string[];
  videos: string[];
  created_at: string;
}

const COUNTRY_FLAGS: Record<string, string> = {
  ecuador: "\u{1F1EA}\u{1F1E8} \u0415\u043A\u0432\u0430\u0434\u043E\u0440",
  colombia: "\u{1F1E8}\u{1F1F4} \u041A\u043E\u043B\u0443\u043C\u0431\u0438\u044F",
  kenya: "\u{1F1F0}\u{1F1EA} \u041A\u0435\u043D\u0438\u044F",
  netherlands: "\u{1F1F3}\u{1F1F1} \u0425\u043E\u043B\u0430\u043D\u0434\u0438\u044F",
  turkey: "\u{1F1F9}\u{1F1F7} \u0422\u0443\u0440\u0446\u0438\u044F",
  greece: "\u{1F1EC}\u{1F1F7} \u0413\u044A\u0440\u0446\u0438\u044F",
  bulgaria: "\u{1F1E7}\u{1F1EC} \u0411\u044A\u043B\u0433\u0430\u0440\u0438\u044F",
  other: "\u{1F30D} \u0414\u0440\u0443\u0433\u0430",
};

export default function AdminDostavkiPage() {
  const [arrivals, setArrivals] = useState<Arrival[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  useEffect(() => {
    fetchArrivals();
  }, []);

  async function fetchArrivals() {
    setLoading(true);
    try {
      const statusParam = filter === "all" ? "" : `?status=${filter}`;
      const res = await fetch(`/api/arrivals${statusParam}`);
      if (res.ok) {
        const data = await res.json();
        setArrivals(data);
      } else {
        toast.error("\u0413\u0440\u0435\u0448\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0440\u0435\u0436\u0434\u0430\u043D\u0435 \u043D\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438\u0442\u0435");
      }
    } catch {
      toast.error("\u0413\u0440\u0435\u0448\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u0440\u0435\u0436\u0434\u0430\u043D\u0435 \u043D\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438\u0442\u0435");
    } finally {
      setLoading(false);
    }
  }

  const filtered = arrivals.filter((a) => {
    if (filter === "all") return true;
    return a.status === filter;
  });

  const publishedCount = arrivals.filter((a) => a.status === "published").length;
  const draftCount = arrivals.filter((a) => a.status === "draft").length;

  return (
    <div className="space-y-4 p-3 sm:p-0">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-[13px] font-semibold hidden sm:block text-[var(--color-foreground)]">
          {"\u0421\u0432\u0435\u0436\u0438 \u0414\u043E\u0441\u0442\u0430\u0432\u043A\u0438"}
        </h1>
        <Link href="/admin/dostavki/nova">
          <Button
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white min-h-[48px] px-5 text-base rounded-xl"
          >
            <Plus className="w-5 h-5" />
            {"\u041D\u043E\u0432\u043E \u0437\u0430\u0440\u0435\u0436\u0434\u0430\u043D\u0435"}
          </Button>
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {[
          { value: "all" as const, label: `\u0412\u0441\u0438\u0447\u043A\u0438 (${arrivals.length})` },
          { value: "published" as const, label: `\u041F\u0443\u0431\u043B\u0438\u043A\u0443\u0432\u0430\u043D\u0438 (${publishedCount})` },
          { value: "draft" as const, label: `\u0427\u0435\u0440\u043D\u043E\u0432\u0438 (${draftCount})` },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors min-h-[44px] ${
              filter === f.value
                ? "bg-[var(--color-primary)] text-white"
                : "bg-white border border-[var(--color-border)] text-[var(--color-gray-600)] hover:bg-gray-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-16 h-16 mx-auto text-[var(--color-gray-600)] opacity-30 mb-2" />
          <p className="text-sm text-[var(--color-gray-600)] mb-2">
            {"\u041D\u044F\u043C\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438. \u0414\u043E\u0431\u0430\u0432\u0435\u0442\u0435 \u043F\u044A\u0440\u0432\u0430\u0442\u0430!"}
          </p>
          <Link href="/admin/dostavki/nova">
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white min-h-[48px] px-6 text-base rounded-xl mx-auto">
              <Plus className="w-5 h-5" />
              {"\u041D\u043E\u0432\u043E \u0437\u0430\u0440\u0435\u0436\u0434\u0430\u043D\u0435"}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((arrival) => (
            <Link
              key={arrival.id}
              href={`/admin/dostavki/${arrival.id}`}
              className="block"
            >
              <div className="bg-white rounded-xl border border-[var(--color-border)] p-4 flex items-center gap-4 hover:shadow-md transition-shadow active:bg-gray-50">
                {/* Thumbnail */}
                <div className="w-[60px] h-[60px] rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                  {arrival.images && arrival.images.length > 0 ? (
                    <Image
                      src={arrival.images[0]}
                      alt={arrival.title}
                      width={60}
                      height={60}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-gray-300" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-[var(--color-foreground)] line-clamp-1">
                    {arrival.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-sm">
                      {COUNTRY_FLAGS[arrival.country] || COUNTRY_FLAGS.other}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[var(--color-gray-600)]">
                      <Calendar className="w-3 h-3" />
                      {new Date(arrival.arrival_date).toLocaleDateString("bg-BG", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="mt-1.5">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-xs font-medium rounded-full ${
                        arrival.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {arrival.status === "published" ? "\u041F\u0443\u0431\u043B\u0438\u043A\u0443\u0432\u0430\u043D\u0430" : "\u0427\u0435\u0440\u043D\u043E\u0432\u0430"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (confirm("Сигурни ли сте, че искате да изтриете тази доставка?")) {
                        fetch(`/api/arrivals/${arrival.id}`, { method: "DELETE" })
                          .then((r) => {
                            if (r.ok) {
                              setArrivals((prev) => prev.filter((a) => a.id !== arrival.id));
                              toast.success("Изтрито");
                            } else {
                              toast.error("Грешка при изтриване");
                            }
                          });
                      }
                    }}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Изтрий доставка"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Pencil className="w-5 h-5 text-[var(--color-gray-600)]" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
