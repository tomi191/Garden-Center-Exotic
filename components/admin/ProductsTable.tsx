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
  MoreVertical,
  AlertTriangle,
  Package,
  ArrowUpDown
} from "lucide-react";
import toast from "react-hot-toast";

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

export function ProductsTable({ products }: ProductsTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

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
      // Optimistic update (optional)
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
    <Card className="border-0 shadow-sm overflow-hidden">
      {/* Filters Bar */}
      <div className="p-5 border-b border-gray-100 bg-white flex flex-col md:flex-row gap-4 items-center justify-between sticky top-0 z-10">
         <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" />
            <Input
              placeholder="Търсене на продукт..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 bg-gray-50 border-transparent focus:bg-white"
            />
         </div>
         
         <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Филтър:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 px-4 pr-8 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 cursor-pointer hover:bg-gray-50 transition-colors w-full md:w-auto"
            >
              <option value="all">Всички категории</option>
              <option value="ryazan-tsvyat">Отрязан цвят</option>
              <option value="saksiyni-rasteniya">Саксийни растения</option>
              <option value="sezonni-tsvetya">Сезонни цветя</option>
              <option value="hrasti-darveta">Храсти и дървета</option>
            </select>
         </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Продукт</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider hidden md:table-cell">Статус</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider hidden sm:table-cell">Цена</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Начална</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Package className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-500 font-medium">Няма намерени продукти</p>
                  <button onClick={() => {setSearchQuery(""); setSelectedCategory("all")}} className="text-sm text-[var(--color-primary)] mt-2 hover:underline">Изчисти филтрите</button>
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id} className="group hover:bg-gray-50/80 transition-colors">
                  {/* Info */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 relative flex-shrink-0">
                         {product.image ? (
                           <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                         ) : (
                           <div className="w-full h-full flex items-center justify-center text-gray-400"><Package className="w-6 h-6"/></div>
                         )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 truncate max-w-[180px] group-hover:text-[var(--color-primary)] transition-colors">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                           <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                             {categoryLabels[product.category] || product.category}
                           </span>
                           <span>•</span>
                           <span>{product.origin}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Stock Toggle */}
                  <td className="py-4 px-6 hidden md:table-cell">
                    <button
                      onClick={() => toggleStock(product.id, product.inStock)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 ${
                        product.inStock ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          product.inStock ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className="ml-3 text-sm font-medium text-gray-600 w-16 inline-block">
                       {product.inStock ? 'Наличен' : 'Скрит'}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="py-4 px-6 hidden sm:table-cell">
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
                      <div className="flex items-center justify-end gap-1 opacity-100 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10">
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
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-50 p-4 border-t border-gray-100 text-xs text-gray-500 flex justify-between items-center">
         <span>Показани {filteredProducts.length} от {products.length} записа</span>
         <div className="flex gap-2">
            {/* Pagination could go here */}
         </div>
      </div>
    </Card>
  );
}