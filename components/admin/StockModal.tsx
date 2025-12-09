"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, FileText, Hash, DollarSign, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";

interface StockModalProps {
  product: {
    id: string;
    name: string;
    image: string;
    stock: {
      quantity: number;
    };
  };
  type: "incoming" | "outgoing" | "writeoff";
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    quantity: number;
    reason?: string;
    notes?: string;
    documentNumber?: string;
    unitPrice?: number;
  }) => Promise<void>;
}

const typeConfig = {
  incoming: {
    title: "Добави доставка",
    icon: Plus,
    color: "green",
    description: "Добавете количество от нова доставка",
    buttonText: "Добави в склада",
    showPrice: true,
    showDocument: true,
    reasons: [],
  },
  outgoing: {
    title: "Изписване от склад",
    icon: Minus,
    color: "blue",
    description: "Изпишете количество (продажба, доставка на клиент)",
    buttonText: "Изпиши от склада",
    showPrice: false,
    showDocument: true,
    reasons: ["Продажба", "Доставка на клиент", "Вътрешна употреба", "Друго"],
  },
  writeoff: {
    title: "Брак / Отписване",
    icon: Trash2,
    color: "red",
    description: "Отпишете количество поради брак или загуба",
    buttonText: "Отпиши като брак",
    showPrice: false,
    showDocument: false,
    reasons: ["Повреден", "Изтекъл срок", "Изсъхнал", "Загуба", "Връщане към доставчик", "Друго"],
  },
};

export function StockModal({ product, type, isOpen, onClose, onSubmit }: StockModalProps) {
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [unitPrice, setUnitPrice] = useState<number | undefined>();

  const config = typeConfig[type];
  const Icon = config.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity <= 0) {
      return;
    }

    // Check if we have enough stock for outgoing/writeoff
    if ((type === "outgoing" || type === "writeoff") && quantity > product.stock.quantity) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        quantity,
        reason: reason || undefined,
        notes: notes || undefined,
        documentNumber: documentNumber || undefined,
        unitPrice: unitPrice || undefined,
      });
    } finally {
      setLoading(false);
    }
  };

  const colorClasses = {
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      button: "bg-green-600 hover:bg-green-700",
      border: "border-green-200",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700",
      border: "border-blue-200",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
      button: "bg-red-600 hover:bg-red-700",
      border: "border-red-200",
    },
  };

  const colors = colorClasses[config.color as keyof typeof colorClasses];

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className={`p-6 border-b ${colors.border} flex items-center gap-4`}>
              <div className={`w-12 h-12 ${colors.bg} rounded-xl flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${colors.text}`} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{config.title}</h2>
                <p className="text-sm text-gray-500">{product.name}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
              <p className="text-sm text-gray-600 mb-4">{config.description}</p>

              <div className="p-4 bg-gray-50 rounded-xl mb-4">
                <p className="text-sm text-gray-500 mb-1">Текуща наличност</p>
                <p className="text-3xl font-bold text-gray-900">{product.stock.quantity}</p>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Количество *
                </label>
                <Input
                  type="number"
                  min="1"
                  max={type !== "incoming" ? product.stock.quantity : undefined}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                  required
                  className="text-lg font-semibold"
                />
                {type !== "incoming" && quantity > product.stock.quantity && (
                  <p className="text-sm text-red-500 mt-1">
                    Не може да изпишете повече от наличното количество
                  </p>
                )}
              </div>

              {/* Reason */}
              {config.reasons.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Причина
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">-- Изберете причина --</option>
                    {config.reasons.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Document Number */}
              {config.showDocument && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <Hash className="w-4 h-4 inline mr-1" />
                    Номер на документ
                  </label>
                  <Input
                    type="text"
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    placeholder="Фактура №, Стокова разписка..."
                  />
                </div>
              )}

              {/* Unit Price */}
              {config.showPrice && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    <DollarSign className="w-4 h-4 inline mr-1" />
                    Единична цена (лв)
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    value={unitPrice || ""}
                    onChange={(e) => setUnitPrice(parseFloat(e.target.value) || undefined)}
                    placeholder="0.00"
                  />
                  {unitPrice && quantity > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Общо: <span className="font-semibold">{(unitPrice * quantity).toFixed(2)} лв</span>
                    </p>
                  )}
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  <FileText className="w-4 h-4 inline mr-1" />
                  Бележки
                </label>
                <TextArea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Допълнителна информация..."
                />
              </div>

              {/* Preview */}
              {type !== "incoming" && (
                <div className={`p-4 ${colors.bg} rounded-xl`}>
                  <p className="text-sm text-gray-600 mb-1">Нова наличност след операцията</p>
                  <p className={`text-2xl font-bold ${colors.text}`}>
                    {Math.max(0, product.stock.quantity - quantity)}
                  </p>
                </div>
              )}
              {type === "incoming" && (
                <div className={`p-4 ${colors.bg} rounded-xl`}>
                  <p className="text-sm text-gray-600 mb-1">Нова наличност след доставката</p>
                  <p className={`text-2xl font-bold ${colors.text}`}>
                    {product.stock.quantity + quantity}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || quantity <= 0 || (type !== "incoming" && quantity > product.stock.quantity)}
                className={`w-full h-12 text-base font-semibold ${colors.button} text-white`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Обработване...
                  </>
                ) : (
                  <>
                    <Icon className="w-5 h-5 mr-2" />
                    {config.buttonText}
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
