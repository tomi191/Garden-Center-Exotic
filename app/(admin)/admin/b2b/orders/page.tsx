"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag, Clock, CheckCircle, Truck, Package, XCircle,
  Eye, Search, Filter, Building2
} from "lucide-react";
import { Button } from "@/components/ui/Button";

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
  created_at: string;
  company: {
    id: string;
    company_name: string;
    email: string;
    phone: string;
    tier: string;
  };
  items: Array<{
    id: string;
    product_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
}

const statusConfig = {
  pending: {
    label: "Чакаща",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  confirmed: {
    label: "Потвърдена",
    color: "bg-blue-100 text-blue-800",
    icon: CheckCircle,
  },
  processing: {
    label: "В обработка",
    color: "bg-purple-100 text-purple-800",
    icon: Package,
  },
  shipped: {
    label: "Изпратена",
    color: "bg-indigo-100 text-indigo-800",
    icon: Truck,
  },
  delivered: {
    label: "Доставена",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Отказана",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
};

export default function AdminB2BOrdersPage() {
  const [orders, setOrders] = useState<B2BOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const url = filter === "all"
        ? "/api/b2b/orders"
        : `/api/b2b/orders?status=${filter}`;

      const response = await fetch(url, {
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

  const filteredOrders = orders.filter((order) =>
    order.order_number.toLowerCase().includes(search.toLowerCase()) ||
    order.company?.company_name.toLowerCase().includes(search.toLowerCase())
  );

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingBag className="w-7 h-7 text-[var(--color-primary)]" />
            B2B Заявки
          </h1>
          <p className="text-gray-500 mt-1">
            Управление на заявки от B2B партньори
          </p>
        </div>

        <div className="flex items-center gap-4">
          {pendingCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-xl">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">
                {pendingCount} чакащи заявки
              </span>
            </div>
          )}
          <Link href="/admin/b2b">
            <Button variant="outline" size="sm">
              <Building2 className="w-4 h-4 mr-2" />
              Компании
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = orders.filter((o) => o.status === status).length;
          const Icon = config.icon;
          return (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`p-4 rounded-xl border-2 transition-all ${
                filter === status
                  ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]"
                  : "border-transparent bg-white hover:border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${config.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-xl font-bold">{count}</p>
                  <p className="text-xs text-gray-500">{config.label}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Търси по номер или име на компания..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)]/20"
            >
              <option value="all">Всички</option>
              <option value="pending">Чакащи</option>
              <option value="confirmed">Потвърдени</option>
              <option value="processing">В обработка</option>
              <option value="shipped">Изпратени</option>
              <option value="delivered">Доставени</option>
              <option value="cancelled">Отказани</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[var(--color-primary)] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-500">Зареждане...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center">
            <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Няма намерени заявки</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Номер
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Компания
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Артикули
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Сума
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Дата
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => {
                  const statusInfo = statusConfig[order.status];
                  const StatusIcon = statusInfo.icon;

                  return (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                          {order.order_number}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{order.company?.company_name}</p>
                          <p className="text-sm text-gray-500">{order.company?.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {order.items?.length || 0} артикула
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{order.total_amount?.toFixed(2)} лв</p>
                          {order.discount_percent > 0 && (
                            <p className="text-xs text-green-600">-{order.discount_percent}%</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500">
                          {new Date(order.created_at).toLocaleDateString("bg-BG")}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/admin/b2b/orders/${order.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Преглед
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
