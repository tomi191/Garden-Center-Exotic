"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export function PriceToggle() {
  const [hidePrices, setHidePrices] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      const data = await response.json();
      setHidePrices(data.hidePrices || false);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePrices = async () => {
    setSaving(true);
    const newValue = !hidePrices;

    try {
      // First get current settings
      const getResponse = await fetch("/api/settings");
      const currentSettings = await getResponse.json();

      // Update with new hidePrices value
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...currentSettings,
          hidePrices: newValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update settings");
      }

      setHidePrices(newValue);
      toast.success(
        newValue
          ? "Цените са скрити от каталога"
          : "Цените са видими в каталога"
      );
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Грешка при запазване на настройката");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
        <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
        <span className="text-sm text-gray-500">Зареждане...</span>
      </div>
    );
  }

  return (
    <button
      onClick={togglePrices}
      disabled={saving}
      className={`
        flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm
        transition-all duration-200 border-2
        ${
          hidePrices
            ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
            : "bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
        }
        ${saving ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {saving ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : hidePrices ? (
        <EyeOff className="w-5 h-5" />
      ) : (
        <Eye className="w-5 h-5" />
      )}
      <span>
        {hidePrices ? "Цените са скрити" : "Цените са видими"}
      </span>
      <div
        className={`
          relative w-11 h-6 rounded-full transition-colors duration-200
          ${hidePrices ? "bg-amber-400" : "bg-emerald-400"}
        `}
      >
        <div
          className={`
            absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md
            transition-transform duration-200
            ${hidePrices ? "translate-x-5" : "translate-x-0.5"}
          `}
        />
      </div>
    </button>
  );
}
