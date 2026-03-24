"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, Save, FileDown, Search, Filter, Loader2,
  ImageIcon, Check, X, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  priceUnit: string;
  category: string;
  b2b_price: number | null;
  b2b_category: string | null;
  inStock: boolean;
}

const b2bCategories = [
  { value: "saksiya", label: "Саксия" },
  { value: "ryazan-tsvyat", label: "Рязан цвят" },
  { value: "kashpi", label: "Кашпи" },
  { value: "pochva", label: "Почва" },
];

export default function B2BPricesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [editedPrices, setEditedPrices] = useState<Record<string, { b2b_price: string; b2b_category: string }>>({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Грешка при зареждане на продуктите");
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (productId: string, field: "b2b_price" | "b2b_category", value: string) => {
    setEditedPrices((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
    setHasChanges(true);
  };

  const getEditedValue = (product: Product, field: "b2b_price" | "b2b_category") => {
    if (editedPrices[product.id]?.[field] !== undefined) {
      return editedPrices[product.id][field];
    }
    if (field === "b2b_price") {
      return product.b2b_price?.toString() || "";
    }
    return product.b2b_category || "";
  };

  const saveAllChanges = async () => {
    if (Object.keys(editedPrices).length === 0) {
      toast.error("Няма промени за запазване");
      return;
    }

    setSaving(true);
    try {
      const updates = Object.entries(editedPrices).map(([productId, changes]) => ({
        id: productId,
        b2b_price: changes.b2b_price ? parseFloat(changes.b2b_price) : null,
        b2b_category: changes.b2b_category || null,
      }));

      const response = await fetch("/api/products/b2b-prices", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });

      if (response.ok) {
        toast.success(`${updates.length} продукта обновени успешно!`);
        setEditedPrices({});
        setHasChanges(false);
        fetchProducts();
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      toast.error("Грешка при запазване");
    } finally {
      setSaving(false);
    }
  };

  const generatePDF = async () => {
    try {
      toast.loading("Генериране на PDF...", { id: "pdf" });

      const response = await fetch("/api/b2b/price-list/pdf", {
        method: "POST",
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `B2B-Ценоразпис-${new Date().toISOString().split("T")[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        toast.success("PDF генериран успешно!", { id: "pdf" });
      } else {
        throw new Error("Failed to generate PDF");
      }
    } catch (error) {
      toast.error("Грешка при генериране на PDF", { id: "pdf" });
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" ||
      product.b2b_category === categoryFilter ||
      (categoryFilter === "unassigned" && !product.b2b_category);
    return matchesSearch && matchesCategory;
  });

  const productsWithB2BPrice = products.filter((p) => p.b2b_price !== null).length;

  if (loading) {
    return (
      <div className="p-12 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[var(--color-primary)]" />
        <p className="text-gray-500">Зареждане...</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-4">
          <Link href="/admin/b2b">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Назад
            </Button>
          </Link>
          <div>
            <h1 className="text-sm font-semibold hidden sm:block text-gray-900">B2B Ценоразпис</h1>
            <p className="text-gray-500 text-sm">
              {productsWithB2BPrice} от {products.length} продукта с B2B цени
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={generatePDF}
            className="gap-2"
          >
            <FileDown className="w-4 h-4" />
            <span className="hidden sm:inline">Генерирай PDF</span>
          </Button>
          <Button
            onClick={saveAllChanges}
            disabled={!hasChanges || saving}
            className="gap-2"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">Запази промените</span>
            {hasChanges && (
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                {Object.keys(editedPrices).length}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-3">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Търси по име..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
            >
              <option value="all">Всички категории</option>
              <option value="unassigned">Без B2B категория</option>
              {b2bCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <Button
            variant="outline"
            onClick={fetchProducts}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Обнови</span>
          </Button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                  Продукт
                </th>
                <th className="text-center px-4 py-3 text-sm font-semibold text-gray-700 w-32">
                  Retail цена
                </th>
                <th className="text-center px-4 py-3 text-sm font-semibold text-gray-700 w-40">
                  B2B цена
                </th>
                <th className="text-center px-4 py-3 text-sm font-semibold text-gray-700 w-44">
                  B2B категория
                </th>
                <th className="text-center px-4 py-3 text-sm font-semibold text-gray-700 w-24">
                  Наличен
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => {
                const isEdited = editedPrices[product.id] !== undefined;
                return (
                  <tr
                    key={product.id}
                    className={`hover:bg-gray-50 transition-colors ${isEdited ? "bg-amber-50" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-9 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-5 h-5 text-gray-300" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-medium text-gray-700">
                        {product.price.toFixed(2)} {product.priceUnit}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={getEditedValue(product, "b2b_price")}
                        onChange={(e) => handlePriceChange(product.id, "b2b_price", e.target.value)}
                        placeholder="—"
                        className={`w-full px-3 py-2 rounded-lg border text-center font-medium ${
                          isEdited
                            ? "border-amber-400 bg-amber-50"
                            : "border-gray-200 focus:border-[var(--color-primary)]"
                        } focus:ring-2 focus:ring-[var(--color-primary)]/20`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={getEditedValue(product, "b2b_category")}
                        onChange={(e) => handlePriceChange(product.id, "b2b_category", e.target.value)}
                        className={`w-full px-3 py-2 rounded-lg border ${
                          isEdited
                            ? "border-amber-400 bg-amber-50"
                            : "border-gray-200 focus:border-[var(--color-primary)]"
                        } focus:ring-2 focus:ring-[var(--color-primary)]/20`}
                      >
                        <option value="">— Без категория —</option>
                        {b2bCategories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {product.inStock ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          <Check className="w-3 h-3" />
                          Да
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                          <X className="w-3 h-3" />
                          Не
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">Няма намерени продукти</p>
          </div>
        )}
      </div>

      {/* Floating Save Button for Mobile */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6 md:hidden">
          <Button
            onClick={saveAllChanges}
            disabled={saving}
            className="rounded-full w-14 h-9 shadow-lg"
          >
            {saving ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Save className="w-6 h-6" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
