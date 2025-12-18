"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Settings,
  Save,
  Loader2,
  Eye,
  EyeOff,
  DollarSign,
  Phone,
  Mail,
  RefreshCw,
  CheckCircle,
  Globe,
  Store
} from "lucide-react";
import toast from "react-hot-toast";

interface SiteSettings {
  eurRate: number;
  storePhone: string;
  storeEmail: string;
  hidePrices: boolean;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    eurRate: 1.9558,
    storePhone: "",
    storeEmail: "",
    hidePrices: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalSettings, setOriginalSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/settings");
      const data = await response.json();
      setSettings({
        eurRate: data.eurRate || 1.9558,
        storePhone: data.storePhone || "",
        storeEmail: data.storeEmail || "",
        hidePrices: data.hidePrices || false,
      });
      setOriginalSettings({
        eurRate: data.eurRate || 1.9558,
        storePhone: data.storePhone || "",
        storeEmail: data.storeEmail || "",
        hidePrices: data.hidePrices || false,
      });
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Грешка при зареждане на настройките");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof SiteSettings, value: string | number | boolean) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      setOriginalSettings(settings);
      setHasChanges(false);
      toast.success("Настройките са запазени успешно!");
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Грешка при запазване на настройките");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (originalSettings) {
      setSettings(originalSettings);
      setHasChanges(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)] mx-auto mb-3" />
          <p className="text-gray-500">Зареждане на настройките...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-xl text-purple-600">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-gray-900">
              Настройки на сайта
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Управлявайте основните настройки на магазина
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {hasChanges && (
            <Button
              variant="outline"
              onClick={handleReset}
              className="text-gray-600"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Отмени
            </Button>
          )}
          <Button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            className="rounded-full shadow-lg"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Запазване...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Запази промените
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Visibility Settings */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-900">Видимост</h2>
                <p className="text-sm text-gray-500">Контролирайте какво виждат клиентите</p>
              </div>
            </div>

            {/* Hide Prices Toggle */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {settings.hidePrices ? (
                    <EyeOff className="w-5 h-5 text-amber-600" />
                  ) : (
                    <Eye className="w-5 h-5 text-green-600" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">
                      {settings.hidePrices ? "Цените са СКРИТИ" : "Цените са ВИДИМИ"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {settings.hidePrices
                        ? "Клиентите виждат 'Свържете се с нас' вместо цени"
                        : "Всички цени се показват в каталога"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleChange("hidePrices", !settings.hidePrices)}
                  className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                    settings.hidePrices ? "bg-amber-500" : "bg-green-500"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-200 ${
                      settings.hidePrices ? "translate-x-7" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Currency Settings */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-900">Валута</h2>
                <p className="text-sm text-gray-500">Настройки на валутния курс</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Курс EUR → BGN
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="number"
                  step="0.0001"
                  value={settings.eurRate}
                  onChange={(e) => handleChange("eurRate", parseFloat(e.target.value) || 1.9558)}
                  className="pl-10"
                  placeholder="1.9558"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Фиксиран курс: 1 EUR = 1.9558 BGN (официален)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="border-0 shadow-sm lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-900">Контакти на магазина</h2>
                <p className="text-sm text-gray-500">Информация за връзка с клиенти</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="tel"
                    value={settings.storePhone}
                    onChange={(e) => handleChange("storePhone", e.target.value)}
                    className="pl-10"
                    placeholder="+359 888 123 456"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Имейл
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => handleChange("storeEmail", e.target.value)}
                    className="pl-10"
                    placeholder="info@gardenexotic.bg"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status indicator */}
      {hasChanges && (
        <div className="fixed bottom-6 right-6 bg-amber-100 text-amber-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-4">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium">Имате незапазени промени</span>
        </div>
      )}
    </div>
  );
}
