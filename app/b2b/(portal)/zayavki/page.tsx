"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Package, Clock, CheckCircle, Truck, XCircle, Calendar, ChevronRight, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderItem {
  id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface Order {
  id: string;
  order_number: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  discount_percent: number;
  discount_amount: number;
  total_amount: number;
  notes?: string;
  tracking_number?: string;
  created_at: string;
  confirmed_at?: string;
  shipped_at?: string;
  delivered_at?: string;
  items: OrderItem[];
}

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "Чакаща потвърждение", color: "bg-yellow-100 text-yellow-700", icon: Clock },
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
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/b2b/orders", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <ShoppingBag className="w-7 h-7 text-[var(--color-primary)]" />
          Моите заявки
        </h1>
        <p className="text-gray-500 mt-1">
          Преглед на всички ваши B2B заявки
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
            Нямате заявки все още
          </h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Разгледайте нашия каталог и направете първата си B2B заявка с преференциални цени.
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
            const isExpanded = expandedOrder === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Order Header */}
                <button
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  className="w-full p-6 text-left"
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
                          {new Date(order.created_at).toLocaleDateString("bg-BG", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                        <span>{order.items?.length || 0} артикула</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[var(--color-primary)]">
                        {order.total_amount?.toFixed(2)} лв
                      </p>
                      {order.discount_amount > 0 && (
                        <p className="text-sm text-green-600">
                          Спестени: {order.discount_amount?.toFixed(2)} лв
                        </p>
                      )}
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-6 bg-gray-50">
                    {/* Status Timeline */}
                    {order.status !== "cancelled" && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Статус на заявката</h4>
                        <div className="flex items-center justify-between">
                          {["pending", "confirmed", "processing", "shipped", "delivered"].map((step, index) => {
                            const stepIndex = ["pending", "confirmed", "processing", "shipped", "delivered"].indexOf(order.status);
                            const isActive = index <= stepIndex;
                            const StepIcon = statusConfig[step].icon;
                            return (
                              <div key={step} className="flex-1 flex items-center">
                                <div className={`flex flex-col items-center ${index < 4 ? "flex-1" : ""}`}>
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? "bg-[var(--color-primary)] text-white" : "bg-gray-200 text-gray-400"}`}>
                                    <StepIcon className="w-4 h-4" />
                                  </div>
                                  <span className={`mt-1 text-xs ${isActive ? "text-[var(--color-primary)] font-medium" : "text-gray-400"}`}>
                                    {statusConfig[step].label.split(" ")[0]}
                                  </span>
                                </div>
                                {index < 4 && (
                                  <div className={`flex-1 h-0.5 ${index < stepIndex ? "bg-[var(--color-primary)]" : "bg-gray-200"}`} />
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Tracking Number */}
                    {order.tracking_number && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Номер за проследяване:</strong> {order.tracking_number}
                        </p>
                      </div>
                    )}

                    {/* Items List */}
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Артикули</h4>
                    <div className="divide-y divide-gray-100 bg-white rounded-lg border border-gray-200">
                      {order.items?.map((item) => (
                        <div key={item.id} className="p-3 flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-900">{item.product_name}</p>
                            <p className="text-sm text-gray-500">
                              {item.quantity} x {item.unit_price?.toFixed(2)} лв
                            </p>
                          </div>
                          <p className="font-semibold">{item.total_price?.toFixed(2)} лв</p>
                        </div>
                      ))}
                    </div>

                    {/* Totals */}
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Междинна сума:</span>
                        <span>{order.subtotal?.toFixed(2)} лв</span>
                      </div>
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Отстъпка ({order.discount_percent}%):</span>
                        <span>-{order.discount_amount?.toFixed(2)} лв</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2">
                        <span>Общо:</span>
                        <span className="text-[var(--color-primary)]">{order.total_amount?.toFixed(2)} лв</span>
                      </div>
                    </div>

                    {/* Notes */}
                    {order.notes && (
                      <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                        <p className="text-sm text-gray-600">
                          <strong>Бележка:</strong> {order.notes}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
