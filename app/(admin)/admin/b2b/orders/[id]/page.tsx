"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag, ArrowLeft, CheckCircle, XCircle, Clock, Truck, Package,
  Building2, Mail, Phone, MapPin, Calendar, Loader2, AlertCircle, ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

interface B2BOrder {
  id: string;
  order_number: string;
  company_id: string;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  subtotal: number;
  discount_percent: number;
  discount_amount: number;
  total_amount: number;
  notes?: string;
  admin_notes?: string;
  tracking_number?: string;
  created_at: string;
  confirmed_at?: string;
  shipped_at?: string;
  delivered_at?: string;
  cancelled_at?: string;
  company: {
    id: string;
    company_name: string;
    email: string;
    phone: string;
    mol: string;
    address?: string;
    city?: string;
    tier: string;
    discount_percent: number;
  };
  items: Array<{
    id: string;
    product_id: string;
    product_name: string;
    product_image?: string;
    price_unit?: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
}

const statusSteps = [
  { key: "pending", label: "Чакаща", icon: Clock },
  { key: "confirmed", label: "Потвърдена", icon: CheckCircle },
  { key: "processing", label: "В обработка", icon: Package },
  { key: "shipped", label: "Изпратена", icon: Truck },
  { key: "delivered", label: "Доставена", icon: CheckCircle },
];

export default function AdminB2BOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<B2BOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/b2b/orders/${id}`, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
        setAdminNotes(data.admin_notes || "");
        setTrackingNumber(data.tracking_number || "");
      } else {
        toast.error("Заявката не е намерена");
        router.push("/admin/b2b/orders");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Грешка при зареждане");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus: string) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/b2b/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          status: newStatus,
          admin_notes: adminNotes,
          tracking_number: trackingNumber,
        }),
      });

      if (response.ok) {
        toast.success("Статусът е обновен!");
        fetchOrder();
      } else {
        throw new Error("Failed to update");
      }
    } catch (error) {
      toast.error("Грешка при обновяване");
    } finally {
      setSaving(false);
    }
  };

  const saveNotes = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/b2b/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          admin_notes: adminNotes,
          tracking_number: trackingNumber,
        }),
      });

      if (response.ok) {
        toast.success("Запазено!");
        fetchOrder();
      }
    } catch (error) {
      toast.error("Грешка");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    if (!confirm("Сигурни ли сте, че искате да откажете тази заявка?")) return;
    await updateStatus("cancelled");
  };

  const handleDelete = async () => {
    if (!confirm("ВНИМАНИЕ: Това ще изтрие заявката завинаги. Продължи?")) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/b2b/orders/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Заявката е изтрита");
        router.push("/admin/b2b/orders");
      }
    } catch (error) {
      toast.error("Грешка при изтриване");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[var(--color-primary)]" />
        <p className="text-gray-500">Зареждане...</p>
      </div>
    );
  }

  if (!order) return null;

  const currentStepIndex = statusSteps.findIndex((s) => s.key === order.status);
  const isCancelled = order.status === "cancelled";

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/b2b/orders">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Назад
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Заявка {order.order_number}
          </h1>
          <p className="text-gray-500">
            от {new Date(order.created_at).toLocaleDateString("bg-BG", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* Status Progress */}
      {!isCancelled && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index <= currentStepIndex;
              const isCurrent = step.key === order.status;

              return (
                <div key={step.key} className="flex-1 flex items-center">
                  <div className={`flex flex-col items-center ${index < statusSteps.length - 1 ? "flex-1" : ""}`}>
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isActive
                          ? "bg-[var(--color-primary)] text-white"
                          : "bg-gray-100 text-gray-400"
                      } ${isCurrent ? "ring-4 ring-[var(--color-primary)]/20" : ""}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`mt-2 text-xs font-medium ${isActive ? "text-[var(--color-primary)]" : "text-gray-400"}`}>
                      {step.label}
                    </span>
                  </div>
                  {index < statusSteps.length - 1 && (
                    <div className={`flex-1 h-1 mx-2 rounded ${index < currentStepIndex ? "bg-[var(--color-primary)]" : "bg-gray-200"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cancelled Banner */}
      {isCancelled && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center gap-3">
          <XCircle className="w-6 h-6 text-red-600" />
          <div>
            <p className="font-semibold text-red-800">Заявката е отказана</p>
            {order.cancelled_at && (
              <p className="text-sm text-red-600">
                на {new Date(order.cancelled_at).toLocaleDateString("bg-BG")}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[var(--color-primary)]" />
              Артикули ({order.items?.length || 0})
            </h2>
            <div className="divide-y divide-gray-100">
              {order.items?.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-4">
                  {/* Product Image */}
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {item.product_image ? (
                      <Image
                        src={item.product_image}
                        alt={item.product_name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-gray-300" />
                      </div>
                    )}
                  </div>
                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item.product_name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} x {item.unit_price.toFixed(2)} {item.price_unit || "лв"}
                    </p>
                  </div>
                  {/* Price */}
                  <p className="font-semibold text-gray-900">{item.total_price.toFixed(2)} лв</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Междинна сума:</span>
                <span>{order.subtotal?.toFixed(2)} лв</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>Отстъпка ({order.discount_percent}%):</span>
                <span>-{order.discount_amount?.toFixed(2)} лв</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Общо:</span>
                <span className="text-[var(--color-primary)]">{order.total_amount?.toFixed(2)} лв</span>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[var(--color-primary)]" />
              Информация за клиента
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Компания</p>
                  <Link href={`/admin/b2b/${order.company?.id}`} className="font-medium text-[var(--color-primary)] hover:underline">
                    {order.company?.company_name}
                  </Link>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Имейл</p>
                  <a href={`mailto:${order.company?.email}`} className="font-medium hover:underline">
                    {order.company?.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Телефон</p>
                  <a href={`tel:${order.company?.phone}`} className="font-medium">
                    {order.company?.phone}
                  </a>
                </div>
              </div>
              {order.company?.address && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Адрес</p>
                    <p className="font-medium">
                      {order.company.address}{order.company.city && `, ${order.company.city}`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-lg mb-4">Бележки</h2>
            {order.notes && (
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">От клиента:</p>
                <p className="text-gray-700">{order.notes}</p>
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Вътрешни бележки
                </label>
                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Добавете бележки..."
                  className="w-full h-24 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Номер за проследяване
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="напр. SPEEDY123456"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
                />
              </div>
              <Button variant="outline" onClick={saveNotes} disabled={saving}>
                Запази бележките
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar - Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-lg mb-4">Действия</h2>

            {!isCancelled && (
              <div className="space-y-3">
                {order.status === "pending" && (
                  <Button
                    onClick={() => updateStatus("confirmed")}
                    disabled={saving}
                    className="w-full bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)]"
                  >
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                    Потвърди заявката
                  </Button>
                )}

                {order.status === "confirmed" && (
                  <Button
                    onClick={() => updateStatus("processing")}
                    disabled={saving}
                    className="w-full bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)]"
                  >
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Package className="w-4 h-4 mr-2" />}
                    Започни обработка
                  </Button>
                )}

                {order.status === "processing" && (
                  <Button
                    onClick={() => updateStatus("shipped")}
                    disabled={saving}
                    className="w-full bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)]"
                  >
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Truck className="w-4 h-4 mr-2" />}
                    Маркирай като изпратена
                  </Button>
                )}

                {order.status === "shipped" && (
                  <Button
                    onClick={() => updateStatus("delivered")}
                    disabled={saving}
                    className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)]"
                  >
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                    Маркирай като доставена
                  </Button>
                )}

                {order.status !== "delivered" && (
                  <Button
                    onClick={handleCancel}
                    disabled={saving}
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Откажи заявката
                  </Button>
                )}
              </div>
            )}

            <div className="mt-6 pt-6 border-t">
              <Button
                onClick={handleDelete}
                disabled={saving}
                variant="outline"
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                Изтрий заявката
              </Button>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
              История
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-500">Създадена:</span>
                <span className="font-medium">
                  {new Date(order.created_at).toLocaleDateString("bg-BG")}
                </span>
              </div>
              {order.confirmed_at && (
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-500">Потвърдена:</span>
                  <span className="font-medium">
                    {new Date(order.confirmed_at).toLocaleDateString("bg-BG")}
                  </span>
                </div>
              )}
              {order.shipped_at && (
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="w-4 h-4 text-indigo-500" />
                  <span className="text-gray-500">Изпратена:</span>
                  <span className="font-medium">
                    {new Date(order.shipped_at).toLocaleDateString("bg-BG")}
                  </span>
                </div>
              )}
              {order.delivered_at && (
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-gray-500">Доставена:</span>
                  <span className="font-medium">
                    {new Date(order.delivered_at).toLocaleDateString("bg-BG")}
                  </span>
                </div>
              )}
              {order.cancelled_at && (
                <div className="flex items-center gap-3 text-sm">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-gray-500">Отказана:</span>
                  <span className="font-medium">
                    {new Date(order.cancelled_at).toLocaleDateString("bg-BG")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
