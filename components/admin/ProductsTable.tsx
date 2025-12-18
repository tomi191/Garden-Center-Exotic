"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Edit,
  Trash2,
  Search,
  Star,
  Package,
  Eye,
  EyeOff,
  ChevronDown,
  X,
  Filter,
  LayoutGrid,
  List
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  origin: string;
  price: number;
  priceUnit: string;
  image: string;
  inStock: boolean;
  featured: boolean;
  createdAt: Date;
}

interface ProductsTableProps {
  products: Product[];
}

const categoryLabels: Record<string, string> = {
  "ryazan-tsvyat": "Отрязан цвят",
  "saksiyni-rasteniya": "Саксийни",
  "sezonni-tsvetya": "Сезонни",
  "hrasti-darveta": "Храсти",
};

const categoryColors: Record<string, string> = {
  "ryazan-tsvyat": "bg-pink-100 text-pink-700",
  "saksiyni-rasteniya": "bg-green-100 text-green-700",
  "sezonni-tsvetya": "bg-amber-100 text-amber-700",
  "hrasti-darveta": "bg-emerald-100 text-emerald-700",
};

export function ProductsTable({ products }: ProductsTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.origin.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  async function toggleStock(productId: string, currentStock: boolean) {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inStock: !currentStock }),
      });

      if (!response.ok) throw new Error();
      toast.success(currentStock ? "Скрито от каталога" : "Продуктът е активен");
      router.refresh();
    } catch {
      toast.error("Грешка при обновяване");
    }
  }

  async function toggleFeatured(productId: string, currentFeatured: boolean) {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featured: !currentFeatured }),
      });

      if (!response.ok) throw new Error();
      toast.success(currentFeatured ? "Премахнато от фокус" : "Добавено на начална страница");
      router.refresh();
    } catch {
      toast.error("Грешка");
    }
  }

  async function deleteProduct(productId: string) {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error();
      toast.success("Продуктът е изтрит");
      setDeleteConfirm(null);
      router.refresh();
    } catch {
      toast.error("Грешка при изтриване");
    }
  }

  return (
    <div className="space-y-4">
      {/* Mobile Search & Filter Header */}
      <Card className="border-0 shadow-sm overflow-hidden">
        <div className="p-4 space-y-3">
          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" />
            <Input
              placeholder="Търсене..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-12 bg-gray-50 border-transparent focus:bg-white text-base rounded-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>

          {/* Filter & View Toggle Row */}
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                showFilters
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              <Filter className="w-4 h-4" />
              Филтри
              {selectedCategory !== "all" && (
                <span className="w-2 h-2 bg-amber-400 rounded-full" />
              )}
            </button>

            {/* View Mode Toggle - Mobile Only */}
            <div className="flex items-center bg-gray-100 rounded-xl p-1 md:hidden">
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewMode === "list"
                    ? "bg-white shadow-sm text-[var(--color-primary)]"
                    : "text-gray-500"
                )}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-[var(--color-primary)]"
                    : "text-gray-500"
                )}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>

            <span className="text-sm text-gray-500 hidden sm:block">
              {filteredProducts.length} продукта
            </span>
          </div>

          {/* Expandable Filter Options */}
          {showFilters && (
            <div className="pt-3 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Категория</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: "all", label: "Всички" },
                  { value: "ryazan-tsvyat", label: "Отрязан цвят" },
                  { value: "saksiyni-rasteniya", label: "Саксийни" },
                  { value: "sezonni-tsvetya", label: "Сезонни" },
                  { value: "hrasti-darveta", label: "Храсти" },
                ].map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all",
                      selectedCategory === cat.value
                        ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/20"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    )}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Empty State */}
      {filteredProducts.length === 0 ? (
        <Card className="border-0 shadow-sm p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-gray-900 font-bold text-lg mb-1">Няма продукти</p>
            <p className="text-gray-500 text-sm mb-4">Опитайте да промените филтрите</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-[var(--color-primary)] font-medium hover:underline"
            >
              Изчисти филтрите
            </button>
          </div>
        </Card>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className={cn(
            "md:hidden space-y-3",
            viewMode === "grid" && "grid grid-cols-2 gap-3 space-y-0"
          )}>
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className={cn(
                  "border-0 shadow-sm overflow-hidden transition-all",
                  expandedCard === product.id && "ring-2 ring-[var(--color-primary)]/20"
                )}
              >
                {viewMode === "list" ? (
                  /* List View Card */
                  <div className="p-4">
                    {/* Main Content Row */}
                    <div className="flex items-start gap-3">
                      {/* Image */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-6 h-6 text-gray-300" />
                          </div>
                        )}
                        {/* Featured Badge */}
                        {product.featured && (
                          <div className="absolute top-1 right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                            <Star className="w-3 h-3 text-white fill-current" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.origin}</p>
                          </div>
                          <button
                            onClick={() => setExpandedCard(expandedCard === product.id ? null : product.id)}
                            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                          >
                            <ChevronDown
                              className={cn(
                                "w-5 h-5 text-gray-400 transition-transform",
                                expandedCard === product.id && "rotate-180"
                              )}
                            />
                          </button>
                        </div>

                        {/* Tags Row */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className={cn(
                            "px-2 py-0.5 rounded-md text-xs font-medium",
                            categoryColors[product.category] || "bg-gray-100 text-gray-600"
                          )}>
                            {categoryLabels[product.category] || product.category}
                          </span>
                          <span className={cn(
                            "px-2 py-0.5 rounded-md text-xs font-medium",
                            product.inStock
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          )}>
                            {product.inStock ? "Наличен" : "Скрит"}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="mt-2">
                          <span className="text-lg font-bold text-gray-900">
                            {product.price.toFixed(2)} лв.
                          </span>
                          <span className="text-xs text-gray-400 ml-1">/{product.priceUnit}</span>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Actions */}
                    {expandedCard === product.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                        {deleteConfirm === product.id ? (
                          <div className="bg-red-50 rounded-xl p-4 space-y-3">
                            <p className="text-sm font-bold text-red-700 text-center">
                              Сигурни ли сте, че искате да изтриете този продукт?
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => deleteProduct(product.id)}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl text-sm font-bold transition-colors"
                              >
                                Да, изтрий
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl text-sm font-bold transition-colors"
                              >
                                Отказ
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 gap-2">
                            {/* Toggle Stock */}
                            <button
                              onClick={() => toggleStock(product.id, product.inStock)}
                              className={cn(
                                "flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all",
                                product.inStock
                                  ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                  : "bg-green-100 text-green-700 hover:bg-green-200"
                              )}
                            >
                              {product.inStock ? (
                                <>
                                  <EyeOff className="w-4 h-4" />
                                  Скрий
                                </>
                              ) : (
                                <>
                                  <Eye className="w-4 h-4" />
                                  Покажи
                                </>
                              )}
                            </button>

                            {/* Toggle Featured */}
                            <button
                              onClick={() => toggleFeatured(product.id, product.featured)}
                              className={cn(
                                "flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all",
                                product.featured
                                  ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              )}
                            >
                              <Star className={cn("w-4 h-4", product.featured && "fill-current")} />
                              {product.featured ? "Премахни" : "Фокус"}
                            </button>

                            {/* Edit */}
                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20 transition-all"
                            >
                              <Edit className="w-4 h-4" />
                              Редактирай
                            </Link>

                            {/* Delete */}
                            <button
                              onClick={() => setDeleteConfirm(product.id)}
                              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                              Изтрий
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Grid View Card */
                  <div className="p-3">
                    {/* Image */}
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-300" />
                        </div>
                      )}
                      {/* Status Badges */}
                      <div className="absolute top-2 left-2 right-2 flex justify-between">
                        {product.featured && (
                          <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                            <Star className="w-3.5 h-3.5 text-white fill-current" />
                          </div>
                        )}
                        {!product.inStock && (
                          <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg ml-auto">
                            Скрит
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <h3 className="font-bold text-gray-900 text-sm truncate">{product.name}</h3>
                    <p className="text-xs text-gray-500 truncate">{product.origin}</p>
                    <p className="text-base font-bold text-gray-900 mt-1">
                      {product.price.toFixed(2)} лв.
                    </p>

                    {/* Quick Actions */}
                    <div className="flex gap-1 mt-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="flex-1 flex items-center justify-center p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => toggleStock(product.id, product.inStock)}
                        className={cn(
                          "flex-1 flex items-center justify-center p-2 rounded-lg transition-all",
                          product.inStock
                            ? "bg-green-100 text-green-600 hover:bg-green-200"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                      >
                        {product.inStock ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => toggleFeatured(product.id, product.featured)}
                        className={cn(
                          "flex-1 flex items-center justify-center p-2 rounded-lg transition-all",
                          product.featured
                            ? "bg-amber-100 text-amber-600"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                        )}
                      >
                        <Star className={cn("w-4 h-4", product.featured && "fill-current")} />
                      </button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <Card className="hidden md:block border-0 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Продукт</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Статус</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Цена</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Начална</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Действия</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="group hover:bg-gray-50/80 transition-colors">
                      {/* Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 relative flex-shrink-0">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Package className="w-6 h-6" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-gray-900 truncate max-w-[180px] group-hover:text-[var(--color-primary)] transition-colors">
                              {product.name}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                              <span className={cn(
                                "px-1.5 py-0.5 rounded",
                                categoryColors[product.category] || "bg-gray-100 text-gray-600"
                              )}>
                                {categoryLabels[product.category] || product.category}
                              </span>
                              <span>•</span>
                              <span>{product.origin}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Stock Toggle */}
                      <td className="py-4 px-6">
                        <button
                          onClick={() => toggleStock(product.id, product.inStock)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
                            product.inStock ? "bg-green-500" : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              product.inStock ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                        <span className="ml-3 text-sm font-medium text-gray-600 w-16 inline-block">
                          {product.inStock ? "Наличен" : "Скрит"}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-6">
                        <div className="font-bold text-gray-900">{product.price.toFixed(2)} лв.</div>
                        <div className="text-xs text-gray-400 uppercase">{product.priceUnit}</div>
                      </td>

                      {/* Featured Star */}
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => toggleFeatured(product.id, product.featured)}
                          className={`p-2 rounded-full transition-all ${
                            product.featured
                              ? "text-amber-400 hover:bg-amber-50 hover:scale-110"
                              : "text-gray-300 hover:text-amber-400 hover:bg-gray-100"
                          }`}
                          title="Добави в Начална страница"
                        >
                          <Star className={`w-5 h-5 ${product.featured ? "fill-current" : ""}`} />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        {deleteConfirm === product.id ? (
                          <div className="flex items-center justify-end gap-2 animate-in fade-in slide-in-from-right-2">
                            <span className="text-xs font-bold text-red-600 mr-2">Сигурни ли сте?</span>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all hover:shadow-red-500/20"
                            >
                              Да, изтрий
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                            >
                              Отказ
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-1">
                            <Link href={`/admin/products/${product.id}/edit`}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-500 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setDeleteConfirm(product.id)}
                              className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-4 border-t border-gray-100 text-xs text-gray-500 flex justify-between items-center">
              <span>Показани {filteredProducts.length} от {products.length} записа</span>
            </div>
          </Card>
        </>
      )}

      {/* Mobile Footer Stats */}
      <div className="md:hidden text-center text-sm text-gray-500 py-2">
        {filteredProducts.length} от {products.length} продукта
      </div>
    </div>
  );
}
