"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Building2, Clock, CheckCircle, XCircle, AlertCircle, Eye, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { B2BCompany } from "@/types";

const statusConfig = {
  pending: {
    label: "Чакащи",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  approved: {
    label: "Одобрени",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
  rejected: {
    label: "Отказани",
    color: "bg-red-100 text-red-800",
    icon: XCircle,
  },
  suspended: {
    label: "Спрени",
    color: "bg-gray-100 text-gray-800",
    icon: AlertCircle,
  },
};

const tierConfig = {
  silver: { label: "Silver", color: "bg-gray-200 text-gray-700" },
  gold: { label: "Gold", color: "bg-yellow-200 text-yellow-800" },
  platinum: { label: "Platinum", color: "bg-purple-200 text-purple-800" },
};

export default function AdminB2BPage() {
  const [companies, setCompanies] = useState<B2BCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, [filter]);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const url = filter === "all"
        ? "/api/b2b/companies"
        : `/api/b2b/companies?status=${filter}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = companies.filter((company) =>
    company.company_name.toLowerCase().includes(search.toLowerCase()) ||
    company.eik.includes(search) ||
    company.email.toLowerCase().includes(search.toLowerCase())
  );

  const pendingCount = companies.filter((c) => c.status === "pending").length;

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <Building2 className="w-7 h-7 text-[var(--color-primary)]" />
            B2B Компании
          </h1>
          <p className="text-gray-500 mt-1">
            Управление на B2B партньори и заявки
          </p>
        </div>

        {pendingCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 border border-yellow-200 rounded-xl">
            <Clock className="w-5 h-5 text-yellow-600" />
            <span className="font-medium text-yellow-800">
              {pendingCount} чакащи заявки
            </span>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {Object.entries(statusConfig).map(([status, config]) => {
          const count = companies.filter((c) => c.status === status).length;
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
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-sm text-gray-500">{config.label}</p>
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
              placeholder="Търси по име, ЕИК или имейл..."
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
              <option value="approved">Одобрени</option>
              <option value="rejected">Отказани</option>
              <option value="suspended">Спрени</option>
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
        ) : filteredCompanies.length === 0 ? (
          <div className="p-12 text-center">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Няма намерени компании</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Фирма
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    ЕИК
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Контакт
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Ниво
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
                {filteredCompanies.map((company) => {
                  const statusInfo = statusConfig[company.status];
                  const StatusIcon = statusInfo.icon;
                  const tierInfo = company.tier ? tierConfig[company.tier] : null;

                  return (
                    <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{company.company_name}</p>
                          <p className="text-sm text-gray-500">МОЛ: {company.mol}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {company.eik}
                        </code>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm text-gray-900">{company.email}</p>
                          <p className="text-sm text-gray-500">{company.phone}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {tierInfo ? (
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${tierInfo.color}`}>
                            {tierInfo.label} ({company.discount_percent}%)
                          </span>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-500">
                          {new Date(company.created_at).toLocaleDateString("bg-BG")}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/admin/b2b/${company.id}`}>
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
