"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Package, Clock, CheckCircle, Truck, XCircle, Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Order {
  id: string;
  order_number: string;
  status: string;
  subtotal: number;
  discount_percent: number;
  discount_amount: number;
  total: number;
  delivery_date?: string;
  notes?: string;
  created_at: string;
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "Чакаща", color: "bg-yellow-100 text-yellow-700", icon: Clock },
  confirmed: { label: "Потвърдена", color: "bg-blue-100 text-blue-700", icon: CheckCircle },
  processing: { label: "В обработка", color: "bg-purple-100 text-purple-700", icon: Package },
  shipped: { label: "Изпратена", color: "bg-indigo-100 text-indigo-700", icon: Truck },
  delivered: { label: "Доставена", color: "bg-green-100 text-green-700", icon: CheckCircle },
  cancelled: { label: "Отказана", color: "bg-red-100 text-red-700", icon: XCircle },
};

export default function B2BOrdersPage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In real implementation, fetch orders from API
    // For now, show empty state
    setLoading(false);
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Моите поръчки</h1>
        <p className="text-gray-500 mt-1">
          Преглед на всички ваши B2B поръчки
        </p>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Зареждане...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Нямате поръчки все още
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Разгледайте нашия каталог и направете първата си B2B поръчка с преференциални цени.
          </p>
          <a
            href="/b2b/katalog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-full font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
          >
            Към каталога
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status] || statusConfig.pending;
            const StatusIcon = status.icon;

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Order Info */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {order.order_number}
                      </h3>
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                        status.color
                      )}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(order.created_at).toLocaleDateString("bg-BG")}
                      </span>
                      {order.delivery_date && (
                        <span className="flex items-center gap-1">
                          <Truck className="w-4 h-4" />
                          Доставка: {new Date(order.delivery_date).toLocaleDateString("bg-BG")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[var(--color-primary)]">
                      {order.total.toFixed(2)} лв
                    </p>
                    {order.discount_amount > 0 && (
                      <p className="text-sm text-green-600">
                        Спестени: {order.discount_amount.toFixed(2)} лв
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
