"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, User, Mail, MessageSquare, Send, Loader2, CheckCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  priceUnit: string;
  image: string;
}

interface ProductRequestModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  eurRate?: number;
}

export function ProductRequestModal({ product, isOpen, onClose, eurRate = 1.9558 }: ProductRequestModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    quantity: 1,
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.clientPhone.trim()) {
      toast.error("Телефонът е задължителен");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/public/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          productId: product.id,
          productName: product.name,
          unit: product.priceUnit.includes("стрък") ? "стръка" :
                product.priceUnit.includes("саксия") ? "саксия" : "бр.",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Грешка при изпращане");
      }

      setSuccess(true);
      toast.success("Заявката е изпратена успешно!");

      // Close after 2 seconds
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          clientName: "",
          clientPhone: "",
          clientEmail: "",
          quantity: 1,
          notes: "",
        });
      }, 2000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Грешка при изпращане");
    } finally {
      setLoading(false);
    }
  };

  const priceEur = (product.price / eurRate).toFixed(2);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-start gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-xl font-bold text-gray-900 truncate">
                  {product.name}
                </h2>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-lg font-bold text-[var(--color-primary)]">
                    {product.price.toFixed(2)} лв
                  </span>
                  <span className="text-sm text-gray-500">
                    ({priceEur} €)
                  </span>
                  <span className="text-sm text-gray-400">
                    / {product.priceUnit.replace("лв/", "")}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Заявката е изпратена!
                  </h3>
                  <p className="text-gray-600">
                    Ще се свържем с вас на посочения телефон.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <Phone className="w-4 h-4 inline mr-1.5" />
                      Телефон *
                    </label>
                    <Input
                      type="tel"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      placeholder="+359 888 123 456"
                      required
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Ще се обадим за потвърждение на поръчката
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <User className="w-4 h-4 inline mr-1.5" />
                      Вашето име
                    </label>
                    <Input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="Иван Иванов"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <Mail className="w-4 h-4 inline mr-1.5" />
                      Имейл (опционално)
                    </label>
                    <Input
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <ShoppingBag className="w-4 h-4 inline mr-1.5" />
                      Количество
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <MessageSquare className="w-4 h-4 inline mr-1.5" />
                      Бележки / специални изисквания
                    </label>
                    <TextArea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Напр. дата на доставка, размер на цветовете, опаковка..."
                      rows={3}
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 text-base font-semibold rounded-xl"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Изпращане...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Изпрати заявка
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-gray-500">
                    След изпращане ще се свържем с вас за потвърждение
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
