"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  FileText,
  Star,
  Calendar,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  status: "draft" | "published";
  featured: boolean;
  word_count: number;
  reading_time: number;
  created_at: string;
  published_at: string | null;
}

export default function AdminBlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchPosts();
  }, [statusFilter]);

  async function fetchPosts() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      const res = await fetch(`/api/blog?${params}`);
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch {
      toast.error("Грешка при зареждане на статиите");
    } finally {
      setLoading(false);
    }
  }

  async function toggleStatus(post: BlogPost) {
    const newStatus = post.status === "published" ? "draft" : "published";
    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        toast.success(newStatus === "published" ? "Статията е публикувана" : "Статията е чернова");
        fetchPosts();
      }
    } catch {
      toast.error("Грешка при промяна на статуса");
    }
  }

  async function deletePost(post: BlogPost) {
    if (!confirm(`Сигурни ли сте, че искате да изтриете "${post.title}"?`)) return;
    try {
      const res = await fetch(`/api/blog/${post.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Статията е изтрита");
        fetchPosts();
      }
    } catch {
      toast.error("Грешка при изтриване");
    }
  }

  const filtered = posts.filter((p) =>
    search ? p.title.toLowerCase().includes(search.toLowerCase()) : true
  );

  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-[13px] font-semibold hidden sm:block text-[var(--color-foreground)]">
            Блог Управление
          </h1>
          <p className="text-[var(--color-gray-600)] mt-1">
            {posts.length} статии ({publishedCount} публикувани, {draftCount} чернови)
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Нова статия
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-gray-600)]" />
          <input
            type="text"
            placeholder="Търси по заглавие..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
          />
        </div>
        <div className="flex gap-2">
          {[
            { value: "all", label: "Всички" },
            { value: "published", label: "Публикувани" },
            { value: "draft", label: "Чернови" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                statusFilter === f.value
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-white border border-[var(--color-border)] text-[var(--color-gray-600)] hover:bg-gray-50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12 text-[var(--color-gray-600)]">
          Зареждане...
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-9 mx-auto text-[var(--color-gray-600)] opacity-30 mb-2" />
          <p className="text-[var(--color-gray-600)]">
            {search ? "Няма намерени статии" : "Все още няма статии"}
          </p>
          {!search && (
            <Link href="/admin/blog/new" className="inline-block mt-4">
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Създай първата статия
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-xl border border-[var(--color-border)] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-gray-50/50">
                  <th className="text-left px-3 py-3 text-xs font-semibold text-[var(--color-gray-600)] uppercase tracking-wider">
                    Заглавие
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-gray-600)] uppercase tracking-wider">
                    Категория
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[var(--color-gray-600)] uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[var(--color-gray-600)] uppercase tracking-wider">
                    Думи
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-gray-600)] uppercase tracking-wider">
                    Дата
                  </th>
                  <th className="text-right px-3 py-3 text-xs font-semibold text-[var(--color-gray-600)] uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-2.5">
                      <div className="flex items-center gap-2">
                        {post.featured && (
                          <Star className="w-4 h-4 text-[var(--color-secondary)] fill-current flex-shrink-0" />
                        )}
                        <div>
                          <p className="font-medium text-sm text-[var(--color-foreground)] line-clamp-1">
                            {post.title}
                          </p>
                          <p className="text-xs text-[var(--color-gray-600)] line-clamp-1 mt-0.5">
                            /{post.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="inline-block px-2.5 py-1 bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <span
                        className={`inline-block px-2.5 py-1 text-xs font-medium rounded-full ${
                          post.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {post.status === "published" ? "Публикувана" : "Чернова"}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-center text-sm text-[var(--color-gray-600)]">
                      {post.word_count}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-[var(--color-gray-600)]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.created_at).toLocaleDateString("bg-BG")}
                      </div>
                    </td>
                    <td className="px-6 py-2.5">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => toggleStatus(post)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          title={post.status === "published" ? "Скрий" : "Публикувай"}
                        >
                          {post.status === "published" ? (
                            <EyeOff className="w-4 h-4 text-[var(--color-gray-600)]" />
                          ) : (
                            <Eye className="w-4 h-4 text-green-600" />
                          )}
                        </button>
                        <button
                          onClick={() => router.push(`/admin/blog/${post.id}/edit`)}
                          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Редактирай"
                        >
                          <Pencil className="w-4 h-4 text-[var(--color-gray-600)]" />
                        </button>
                        <button
                          onClick={() => deletePost(post)}
                          className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                          title="Изтрий"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filtered.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl border border-[var(--color-border)] p-4 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {post.featured && (
                        <Star className="w-4 h-4 text-[var(--color-secondary)] fill-current flex-shrink-0" />
                      )}
                      <h3 className="font-medium text-sm line-clamp-2">{post.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                          post.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {post.status === "published" ? "Публикувана" : "Чернова"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-[var(--color-gray-600)]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      {post.word_count} думи
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.created_at).toLocaleDateString("bg-BG")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleStatus(post)}
                      className="p-1.5 rounded-lg hover:bg-gray-100"
                    >
                      {post.status === "published" ? (
                        <EyeOff className="w-4 h-4 text-[var(--color-gray-600)]" />
                      ) : (
                        <Eye className="w-4 h-4 text-green-600" />
                      )}
                    </button>
                    <button
                      onClick={() => router.push(`/admin/blog/${post.id}/edit`)}
                      className="p-1.5 rounded-lg hover:bg-gray-100"
                    >
                      <Pencil className="w-4 h-4 text-[var(--color-gray-600)]" />
                    </button>
                    <button
                      onClick={() => deletePost(post)}
                      className="p-1.5 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
