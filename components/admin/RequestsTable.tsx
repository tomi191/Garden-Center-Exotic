"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Search,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
  Edit,
  Phone,
  Calendar,
  Trash2,
  Loader2,
  RefreshCw
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

// Тип за заявка
interface Request {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  productId?: string;
  productName: string;
  quantity: number;
  unit: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  dueDate: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusLabels = {
  pending: "Чакаща",
  confirmed: "Потвърдена",
  completed: "Доставена",
  cancelled: "Отказана",
};

const statusIcons = {
  pending: Clock,
  confirmed: CheckCircle,
  completed: Truck,
  cancelled: XCircle,
};

export function RequestsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Зареждане на заявките от базата данни
  const fetchRequests = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterStatus !== "all") params.set("status", filterStatus);
      if (searchQuery) params.set("search", searchQuery);

      const response = await fetch(`/api/requests?${params.toString()}`);
      if (!response.ok) throw new Error("Грешка при зареждане");

      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Грешка при зареждане на заявките");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filterStatus]);

  // Търсене с debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchRequests();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Функция за промяна на статуса
  const changeStatus = async (id: string, newStatus: Request["status"]) => {
    try {
      setActionLoading(id);
      const response = await fetch(`/api/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Грешка при обновяване");

      setRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
      );
      toast.success(`Статусът е обновен на ${statusLabels[newStatus]}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Грешка при обновяване на статуса");
    } finally {
      setActionLoading(null);
    }
  };

  // Функция за изтриване на заявка
  const deleteRequest = async (id: string) => {
    if (!confirm("Сигурни ли сте, че искате да изтриете тази заявка?")) return;

    try {
      setActionLoading(id);
      const response = await fetch(`/api/requests/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Грешка при изтриване");

      setRequests((prev) => prev.filter((req) => req.id !== id));
      toast.success("Заявката е изтрита успешно");
    } catch (error) {
      console.error("Error deleting request:", error);
      toast.error("Грешка при изтриване на заявката");
    } finally {
      setActionLoading(null);
    }
  };

  // Филтриране на заявките (локално, ако вече са заредени)
  const filteredRequests = requests;

  return (
    <Card className="border-0 shadow-sm overflow-hidden">
      {/* Filters Bar */}
      <div className="p-5 border-b border-gray-100 bg-white flex flex-col md:flex-row gap-4 items-center justify-between sticky top-0 z-10">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
          <Input
            placeholder="Търсене на клиент или продукт..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-10 bg-gray-50 border-transparent focus:bg-white focus:ring-purple-500/20"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
            Статус:
          </span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-10 px-4 pr-8 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 cursor-pointer hover:bg-gray-50 transition-colors w-full md:w-auto"
          >
            <option value="all">Всички</option>
            <option value="pending">Чакащи</option>
            <option value="confirmed">Потвърдени</option>
            <option value="completed">Доставени</option>
            <option value="cancelled">Отказани</option>
          </select>
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchRequests}
            disabled={loading}
            className="h-10 w-10"
            title="Опресни"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Клиент
              </th>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Заявка
              </th>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
                Дата (Срок)
              </th>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
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
                    <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
                    <p className="text-gray-500 font-medium">Зареждане...</p>
                  </div>
                </td>
              </tr>
            ) : filteredRequests.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-16 text-center">
                  <p className="text-gray-500 font-medium">
                    Няма намерени заявки
                  </p>
                </td>
              </tr>
            ) : (
              filteredRequests.map((req) => {
                const StatusIcon = statusIcons[req.status];
                return (
                  <tr
                    key={req.id}
                    className="group hover:bg-gray-50/80 transition-colors"
                  >
                    {/* Клиент */}
                    <td className="py-4 px-6 align-top">
                      <div>
                        <p className="font-bold text-gray-900">
                          {req.clientName}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Phone className="w-3 h-3" />
                          {req.clientPhone}
                        </div>
                      </div>
                    </td>

                    {/* Заявка */}
                    <td className="py-4 px-6 align-top">
                      <p className="font-medium text-gray-800">
                        {req.productName}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-bold">{req.quantity}</span> {req.unit}
                      </p>
                      {req.notes && (
                        <p className="text-xs text-gray-500 mt-1 italic max-w-xs">
                          "{req.notes}"
                        </p>
                      )}
                    </td>

                    {/* Дата */}
                    <td className="py-4 px-6 align-top">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {req.dueDate}
                      </div>
                    </td>

                    {/* Статус */}
                    <td className="py-4 px-6 align-top text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                          statusStyles[req.status]
                        }`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {statusLabels[req.status]}
                      </span>
                    </td>

                    {/* Действия */}
                    <td className="py-4 px-6 align-top text-right">
                      <div className="flex items-center justify-end gap-2">
                        {actionLoading === req.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                        ) : (
                          <>
                            {/* Бутони за смяна на статус */}
                            {req.status === "pending" && (
                              <Button
                                size="sm"
                                className="bg-blue-50 text-blue-600 hover:bg-blue-100 h-8 px-2"
                                onClick={() => changeStatus(req.id, "confirmed")}
                                title="Потвърди"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            )}
                            {req.status === "confirmed" && (
                              <Button
                                size="sm"
                                className="bg-green-50 text-green-600 hover:bg-green-100 h-8 px-2"
                                onClick={() => changeStatus(req.id, "completed")}
                                title="Завърши"
                              >
                                <Truck className="w-4 h-4" />
                              </Button>
                            )}

                            <Link href={`/admin/requests/${req.id}/edit`}>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-gray-400 hover:text-purple-600 hover:bg-purple-50"
                                title="Редактирай"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>

                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50"
                              title="Изтрий"
                              onClick={() => deleteRequest(req.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
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
  );
}
