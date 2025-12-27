"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Building2, ArrowLeft, CheckCircle, XCircle, AlertCircle, Clock,
  Mail, Phone, MapPin, Calendar, User, CreditCard, Percent, Loader2, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { B2BCompany, B2BTier } from "@/types";
import toast from "react-hot-toast";

const tierOptions: { value: B2BTier; label: string; discount: number; terms: number }[] = [
  { value: "silver", label: "Silver", discount: 10, terms: 0 },
  { value: "gold", label: "Gold", discount: 15, terms: 30 },
  { value: "platinum", label: "Platinum", discount: 20, terms: 60 },
];

export default function AdminB2BDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [company, setCompany] = useState<B2BCompany | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedTier, setSelectedTier] = useState<B2BTier>("silver");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const fetchCompany = async () => {
    try {
      const response = await fetch(`/api/b2b/companies/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCompany(data);
        setSelectedTier(data.tier || "silver");
        setNotes(data.notes || "");
      } else {
        toast.error("Компанията не е намерена");
        router.push("/admin/b2b");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Грешка при зареждане");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/b2b/companies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "approved",
          tier: selectedTier,
          notes,
        }),
      });

      if (response.ok) {
        toast.success("Компанията е одобрена!");
        fetchCompany();
      } else {
        throw new Error("Failed to approve");
      }
    } catch (error) {
      toast.error("Грешка при одобрение");
    } finally {
      setSaving(false);
    }
  };

  const handleReject = async () => {
    if (!confirm("Сигурни ли сте, че искате да откажете тази заявка?")) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/b2b/companies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "rejected",
          notes,
        }),
      });

      if (response.ok) {
        toast.success("Заявката е отказана");
        fetchCompany();
      }
    } catch (error) {
      toast.error("Грешка");
    } finally {
      setSaving(false);
    }
  };

  const handleSuspend = async () => {
    if (!confirm("Сигурни ли сте, че искате да спрете този акаунт?")) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/b2b/companies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "suspended", notes }),
      });

      if (response.ok) {
        toast.success("Акаунтът е спрян");
        fetchCompany();
      }
    } catch (error) {
      toast.error("Грешка");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("ВНИМАНИЕ: Това ще изтрие компанията и всички свързани данни. Продължи?")) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/b2b/companies/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Компанията е изтрита");
        router.push("/admin/b2b");
      }
    } catch (error) {
      toast.error("Грешка при изтриване");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateTier = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/b2b/companies/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tier: selectedTier,
          notes,
        }),
      });

      if (response.ok) {
        toast.success("Нивото е обновено");
        fetchCompany();
      }
    } catch (error) {
      toast.error("Грешка");
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

  if (!company) return null;

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/b2b">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Назад
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{company.company_name}</h1>
          <p className="text-gray-500">ЕИК: {company.eik}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[var(--color-primary)]" />
              Информация за фирмата
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <User className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">МОЛ</p>
                  <p className="font-medium">{company.mol}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Имейл</p>
                  <a href={`mailto:${company.email}`} className="font-medium text-[var(--color-primary)] hover:underline">
                    {company.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Телефон</p>
                  <a href={`tel:${company.phone}`} className="font-medium">
                    {company.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Адрес</p>
                  <p className="font-medium">
                    {company.address || "-"}{company.city && `, ${company.city}`}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Дата на регистрация</p>
                  <p className="font-medium">
                    {new Date(company.created_at).toLocaleDateString("bg-BG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-lg mb-4">Вътрешни бележки</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Добавете бележки за тази компания..."
              className="w-full h-32 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] resize-none"
            />
          </div>
        </div>

        {/* Sidebar - Actions */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-lg mb-4">Статус</h2>

            <div className={`p-4 rounded-xl mb-6 ${
              company.status === "pending" ? "bg-yellow-50" :
              company.status === "approved" ? "bg-green-50" :
              company.status === "rejected" ? "bg-red-50" : "bg-gray-50"
            }`}>
              <div className="flex items-center gap-3">
                {company.status === "pending" && <Clock className="w-6 h-6 text-yellow-600" />}
                {company.status === "approved" && <CheckCircle className="w-6 h-6 text-green-600" />}
                {company.status === "rejected" && <XCircle className="w-6 h-6 text-red-600" />}
                {company.status === "suspended" && <AlertCircle className="w-6 h-6 text-gray-600" />}
                <div>
                  <p className="font-semibold">
                    {company.status === "pending" && "Чакаща одобрение"}
                    {company.status === "approved" && "Одобрена"}
                    {company.status === "rejected" && "Отказана"}
                    {company.status === "suspended" && "Спряна"}
                  </p>
                  {company.approved_at && (
                    <p className="text-sm text-gray-500">
                      на {new Date(company.approved_at).toLocaleDateString("bg-BG")}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Tier Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ниво на партньорство
              </label>
              <div className="space-y-2">
                {tierOptions.map((tier) => (
                  <label
                    key={tier.value}
                    className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedTier === tier.value
                        ? "border-[var(--color-primary)] bg-[var(--color-primary-light)]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="tier"
                        value={tier.value}
                        checked={selectedTier === tier.value}
                        onChange={(e) => setSelectedTier(e.target.value as B2BTier)}
                        className="text-[var(--color-primary)]"
                      />
                      <span className="font-medium">{tier.label}</span>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-semibold text-[var(--color-primary)]">-{tier.discount}%</p>
                      <p className="text-gray-500">{tier.terms}д срок</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Current Settings */}
            {company.status === "approved" && (
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Отстъпка</p>
                    <p className="font-semibold">{company.discount_percent}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Срок</p>
                    <p className="font-semibold">{company.payment_terms} дни</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {company.status === "pending" && (
                <>
                  <Button
                    onClick={handleApprove}
                    disabled={saving}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                    Одобри компанията
                  </Button>
                  <Button
                    onClick={handleReject}
                    disabled={saving}
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Откажи заявката
                  </Button>
                </>
              )}

              {company.status === "approved" && (
                <>
                  <Button
                    onClick={handleUpdateTier}
                    disabled={saving}
                    className="w-full"
                  >
                    {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                    Обнови настройките
                  </Button>
                  <Button
                    onClick={handleSuspend}
                    disabled={saving}
                    variant="outline"
                    className="w-full text-orange-600 border-orange-200 hover:bg-orange-50"
                  >
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Спри временно
                  </Button>
                </>
              )}

              {(company.status === "rejected" || company.status === "suspended") && (
                <Button
                  onClick={handleApprove}
                  disabled={saving}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                  Активирай отново
                </Button>
              )}

              <Button
                onClick={handleDelete}
                disabled={saving}
                variant="outline"
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Изтрий компанията
              </Button>
            </div>
          </div>

          {/* Quick Link to Registry */}
          <a
            href={`https://portal.registryagency.bg/CR/Reports/VerificationPersonOrg?uic=${company.eik}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-blue-50 rounded-xl text-center hover:bg-blue-100 transition-colors"
          >
            <p className="text-sm font-medium text-blue-700">
              Проверка в Търговски регистър →
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
