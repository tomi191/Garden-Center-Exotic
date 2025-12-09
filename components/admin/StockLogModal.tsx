"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, History, Plus, Minus, Trash2, RefreshCw, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface StockLog {
  id: string;
  productId: string;
  productName: string;
  type: "incoming" | "outgoing" | "writeoff" | "adjustment";
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  reason?: string;
  notes?: string;
  documentNumber?: string;
  unitPrice?: number;
  totalPrice?: number;
  createdAt: string;
  createdBy?: string;
}

interface StockLogModalProps {
  productId?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const typeConfig = {
  incoming: {
    label: "Доставка",
    icon: Plus,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  outgoing: {
    label: "Изписване",
    icon: Minus,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  writeoff: {
    label: "Брак",
    icon: Trash2,
    color: "text-red-600",
    bg: "bg-red-100",
  },
  adjustment: {
    label: "Корекция",
    icon: RefreshCw,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
};

export function StockLogModal({ productId, isOpen, onClose }: StockLogModalProps) {
  const [logs, setLogs] = useState<StockLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<string>("all");

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen, productId, filterType]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (productId) params.set("productId", productId);
      if (filterType !== "all") params.set("type", filterType);
      params.set("limit", "100");

      const response = await fetch(`/api/stock/log?${params.toString()}`);
      if (!response.ok) throw new Error("Грешка при зареждане");

      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("bg-BG", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <History className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">История на движенията</h2>
                <p className="text-sm text-gray-500">
                  {productId ? "За избрания продукт" : "Всички продукти"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filters */}
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant={filterType === "all" ? "primary" : "outline"}
                  onClick={() => setFilterType("all")}
                >
                  Всички
                </Button>
                <Button
                  size="sm"
                  variant={filterType === "incoming" ? "primary" : "outline"}
                  onClick={() => setFilterType("incoming")}
                  className={filterType === "incoming" ? "bg-green-600" : ""}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  Доставки
                </Button>
                <Button
                  size="sm"
                  variant={filterType === "outgoing" ? "primary" : "outline"}
                  onClick={() => setFilterType("outgoing")}
                  className={filterType === "outgoing" ? "bg-blue-600" : ""}
                >
                  <Minus className="w-3 h-3 mr-1" />
                  Изписвания
                </Button>
                <Button
                  size="sm"
                  variant={filterType === "writeoff" ? "primary" : "outline"}
                  onClick={() => setFilterType("writeoff")}
                  className={filterType === "writeoff" ? "bg-red-600" : ""}
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Брак
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                  <p className="text-gray-500 mt-2">Зареждане...</p>
                </div>
              ) : logs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <History className="w-12 h-12 text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium">Няма записи</p>
                  <p className="text-sm text-gray-400">Все още няма движения в склада</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {logs.map((log) => {
                    const config = typeConfig[log.type];
                    const Icon = config.icon;

                    return (
                      <div
                        key={log.id}
                        className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 ${config.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${config.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-sm font-bold ${config.color}`}>
                                {config.label}
                              </span>
                              <span className="text-xs text-gray-400">
                                {formatDate(log.createdAt)}
                              </span>
                            </div>
                            <p className="font-medium text-gray-900 truncate">
                              {log.productName}
                            </p>

                            {/* Quantity change */}
                            <div className="flex items-center gap-2 mt-2 text-sm">
                              <span className="text-gray-500">{log.previousQuantity}</span>
                              <ArrowRight className="w-4 h-4 text-gray-400" />
                              <span className={`font-bold ${config.color}`}>
                                {log.newQuantity}
                              </span>
                              <span className="text-gray-400">
                                ({log.type === "incoming" ? "+" : "-"}{Math.abs(log.quantity)})
                              </span>
                            </div>

                            {/* Additional info */}
                            {(log.reason || log.documentNumber || log.totalPrice) && (
                              <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500 space-y-1">
                                {log.reason && (
                                  <p>Причина: <span className="text-gray-700">{log.reason}</span></p>
                                )}
                                {log.documentNumber && (
                                  <p>Документ: <span className="text-gray-700">{log.documentNumber}</span></p>
                                )}
                                {log.totalPrice && (
                                  <p>Стойност: <span className="text-gray-700 font-medium">{log.totalPrice.toFixed(2)} лв</span></p>
                                )}
                                {log.notes && (
                                  <p className="italic">"{log.notes}"</p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
