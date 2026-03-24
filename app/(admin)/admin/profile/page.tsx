"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  User,
  Lock,
  Save,
  Loader2,
  Eye,
  EyeOff,
  Shield,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();

  // Profile state
  const [name, setName] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  // Show/hide password toggles
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleSaveProfile = async () => {
    if (!name.trim()) {
      toast.error("Моля, въведете име");
      return;
    }

    setSavingProfile(true);
    try {
      const response = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Грешка при запазване");
      }

      await updateSession({ name: name.trim() });
      toast.success("Профилът е обновен успешно!");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Грешка при запазване на профила";
      toast.error(message);
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword) {
      toast.error("Моля, въведете текущата парола");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Новата парола трябва да е поне 6 символа");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Новите пароли не съвпадат");
      return;
    }

    setSavingPassword(true);
    try {
      const response = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Грешка при смяна на паролата");
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      toast.success("Паролата е сменена успешно!");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Грешка при смяна на паролата";
      toast.error(message);
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-100 rounded-xl text-emerald-600">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-gray-900">
              Профил
            </h1>
            <p className="text-gray-500 text-sm mt-0.5">
              Управлявайте вашата профилна информация и парола
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profile Info Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-900">
                  Профилна информация
                </h2>
                <p className="text-sm text-gray-500">
                  Обновете вашето име и данни
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Име
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Вашето име"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Имейл
                </label>
                <Input
                  type="email"
                  value={session?.user?.email || ""}
                  disabled
                  className="opacity-60 cursor-not-allowed"
                />
                <p className="text-xs text-gray-400 mt-1.5 ml-1">
                  Имейлът не може да бъде променян
                </p>
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleSaveProfile}
                  disabled={savingProfile}
                  className="rounded-full shadow-lg"
                >
                  {savingProfile ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Запазване...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Запази профила
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change Password Card */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-900">
                  Смяна на парола
                </h2>
                <p className="text-sm text-gray-500">
                  Променете паролата си за достъп
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Текуща парола
                </label>
                <div className="relative">
                  <Input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Въведете текущата парола"
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showCurrent ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Нова парола
                </label>
                <div className="relative">
                  <Input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Минимум 6 символа"
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showNew ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {newPassword.length > 0 && newPassword.length < 6 && (
                  <p className="text-xs text-red-500 mt-1.5 ml-1">
                    Паролата трябва да е поне 6 символа
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Потвърди нова парола
                </label>
                <div className="relative">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Повторете новата парола"
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirm ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {confirmPassword.length > 0 && newPassword !== confirmPassword && (
                  <p className="text-xs text-red-500 mt-1.5 ml-1">
                    Паролите не съвпадат
                  </p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleChangePassword}
                  disabled={savingPassword}
                  className="rounded-full shadow-lg"
                >
                  {savingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Смяна...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Смени паролата
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
