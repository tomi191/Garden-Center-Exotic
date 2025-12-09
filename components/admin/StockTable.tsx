"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Search,
  Package,
  Plus,
  Minus,
  Trash2,
  AlertTriangle,
  Loader2,
  RefreshCw,
  History,
  TrendingUp,
  TrendingDown,
  Leaf
} from "lucide-react";
import toast from "react-hot-toast";
import { StockModal } from "./StockModal";
import { StockLogModal } from "./StockLogModal";

interface StockItem {
  id: string;
  name: string;
  category: string;
  image: string;
  priceUnit: string;
  stock: {
    productId: string;
    quantity: number;
    minQuantity: number;
    location: string;
  };
}

export function StockTable() {
  const [items, setItems] = useState<StockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<StockItem | null>(null);
  const [modalType, setModalType] = useState<"incoming" | "outgoing" | "writeoff" | null>(null);
  const [showLogModal, setShowLogModal] = useState(false);
  const [logProductId, setLogProductId] = useState<string | null>(null);

  const fetchStock = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterLowStock) params.set("lowStock", "true");

      const response = await fetch(`/api/stock?${params.toString()}`);
      if (!response.ok) throw new Error("Грешка при зареждане");

      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching stock:", error);
      toast.error("Грешка при зареждане на склада");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStock();
  }, [filterLowStock]);

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (product: StockItem, type: "incoming" | "outgoing" | "writeoff") => {
    setSelectedProduct(product);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalType(null);
  };

  const openLogModal = (productId?: string) => {
    setLogProductId(productId || null);
    setShowLogModal(true);
  };

  const handleStockUpdate = async (data: {
    quantity: number;
    reason?: string;
    notes?: string;
    documentNumber?: string;
    unitPrice?: number;
  }) => {
    if (!selectedProduct || !modalType) return;

    try {
      const response = await fetch("/api/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.id,
          type: modalType,
          ...data,
        }),
      });

      if (!response.ok) throw new Error("Грешка при обновяване");

      const result = await response.json();

      // Update local state
      setItems((prev) =>
        prev.map((item) =>
          item.id === selectedProduct.id
            ? { ...item, stock: { ...item.stock, quantity: result.newQuantity } }
            : item
        )
      );

      const typeLabels = {
        incoming: "Доставка добавена",
        outgoing: "Изписване записано",
        writeoff: "Брак записан",
      };

      toast.success(typeLabels[modalType]);
      closeModal();
    } catch (error) {
      toast.error("Грешка при обновяване на склада");
    }
  };

  // Stats
  const totalProducts = items.length;
  const lowStockCount = items.filter((i) => i.stock.quantity <= i.stock.minQuantity).length;
  const outOfStockCount = items.filter((i) => i.stock.quantity === 0).length;

  return (
    <>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Общо продукти</p>
                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Ниска наличност</p>
                <p className="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Изчерпани</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => openLogModal()}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <History className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">История</p>
                <p className="text-sm font-semibold text-purple-600">Виж всички движения →</p>
              </div>
            </div>
          </button>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <div className="p-5 border-b border-gray-100 bg-white flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-amber-600 transition-colors" />
              <Input
                placeholder="Търсене на продукт..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 bg-gray-50 border-transparent focus:bg-white focus:ring-amber-500/20"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterLowStock}
                  onChange={(e) => setFilterLowStock(e.target.checked)}
                  className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Само ниска наличност
                </span>
              </label>

              <Button
                variant="ghost"
                size="icon"
                onClick={fetchStock}
                disabled={loading}
                className="h-10 w-10"
                title="Опресни"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Продукт
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
                    Наличност
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
                    Мин. кол.
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
                        <p className="text-gray-500 font-medium">Зареждане...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <p className="text-gray-500 font-medium">Няма намерени продукти</p>
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => {
                    const isLowStock = item.stock.quantity <= item.stock.minQuantity;
                    const isOutOfStock = item.stock.quantity === 0;

                    return (
                      <tr key={item.id} className="group hover:bg-gray-50/80 transition-colors">
                        {/* Product */}
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                              {item.image ? (
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Leaf className="w-6 h-6 text-gray-300" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900">{item.name}</p>
                              <p className="text-xs text-gray-500">{item.priceUnit}</p>
                            </div>
                          </div>
                        </td>

                        {/* Quantity */}
                        <td className="py-4 px-6 text-center">
                          <span
                            className={`text-2xl font-bold ${
                              isOutOfStock
                                ? "text-red-600"
                                : isLowStock
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            {item.stock.quantity}
                          </span>
                        </td>

                        {/* Min Quantity */}
                        <td className="py-4 px-6 text-center">
                          <span className="text-gray-500">{item.stock.minQuantity}</span>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-6">
                          {isOutOfStock ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700">
                              <Trash2 className="w-3 h-3" />
                              Изчерпан
                            </span>
                          ) : isLowStock ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-700">
                              <AlertTriangle className="w-3 h-3" />
                              Ниска наличност
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                              <TrendingUp className="w-3 h-3" />
                              В наличност
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              className="bg-green-50 text-green-600 hover:bg-green-100 h-8 px-3"
                              onClick={() => openModal(item, "incoming")}
                              title="Доставка"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Доставка
                            </Button>
                            <Button
                              size="sm"
                              className="bg-blue-50 text-blue-600 hover:bg-blue-100 h-8 px-3"
                              onClick={() => openModal(item, "outgoing")}
                              title="Изписване"
                            >
                              <Minus className="w-4 h-4 mr-1" />
                              Изписване
                            </Button>
                            <Button
                              size="sm"
                              className="bg-red-50 text-red-600 hover:bg-red-100 h-8 px-3"
                              onClick={() => openModal(item, "writeoff")}
                              title="Брак"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Брак
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-purple-600"
                              onClick={() => openLogModal(item.id)}
                              title="История"
                            >
                              <History className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Stock Modal */}
      {selectedProduct && modalType && (
        <StockModal
          product={selectedProduct}
          type={modalType}
          isOpen={true}
          onClose={closeModal}
          onSubmit={handleStockUpdate}
        />
      )}

      {/* Log Modal */}
      {showLogModal && (
        <StockLogModal
          productId={logProductId}
          isOpen={true}
          onClose={() => setShowLogModal(false)}
        />
      )}
    </>
  );
}
