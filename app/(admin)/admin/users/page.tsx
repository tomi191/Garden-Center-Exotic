"use client";

import { useState, useEffect } from "react";
import { Users, Plus, Trash2, Calendar, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchCurrentUser();
  }, []);

  async function fetchCurrentUser() {
    try {
      const res = await fetch("/api/auth/session");
      if (res.ok) {
        const session = await res.json();
        if (session?.user?.email) {
          setCurrentUserEmail(session.user.email);
        }
      }
    } catch {
      // ignore
    }
  }

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        toast.error("Грешка при зареждане на потребителите");
      }
    } catch {
      toast.error("Грешка при зареждане на потребителите");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    if (formData.password.length < 6) {
      setFormError("Паролата трябва да е поне 6 символа");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError("Паролите не съвпадат");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (res.ok) {
        toast.success("Потребителят е добавен успешно");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setShowForm(false);
        fetchUsers();
      } else {
        const data = await res.json();
        toast.error(data.error || "Грешка при добавяне на потребител");
      }
    } catch {
      toast.error("Грешка при добавяне на потребител");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(user: User) {
    if (!window.confirm(`Сигурни ли сте, че искате да изтриете "${user.name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Потребителят е изтрит");
        fetchUsers();
      } else {
        const data = await res.json();
        toast.error(data.error || "Грешка при изтриване");
      }
    } catch {
      toast.error("Грешка при изтриване на потребител");
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-foreground)]">
              Управление на потребители
            </h1>
            <p className="text-[var(--color-gray-600)] mt-0.5">
              Добавяне и управление на администратори
            </p>
          </div>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2"
          size="sm"
        >
          {showForm ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Скрий формата
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Добави потребител
            </>
          )}
        </Button>
      </div>

      {/* Add User Form (slide-down panel) */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-[var(--color-foreground)]">
              Нов потребител
            </h2>
            <button
              onClick={() => {
                setShowForm(false);
                setFormError("");
              }}
              className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-[var(--color-gray-600)]" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Име"
                placeholder="Въведете име"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="Въведете email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                label="Парола"
                type="password"
                placeholder="Минимум 6 символа"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
              />
              <Input
                label="Потвърди парола"
                type="password"
                placeholder="Повторете паролата"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                minLength={6}
              />
            </div>

            {formError && (
              <p className="mt-3 text-sm font-medium text-red-500">{formError}</p>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowForm(false);
                  setFormError("");
                }}
              >
                Отказ
              </Button>
              <Button type="submit" size="sm" disabled={submitting}>
                {submitting ? "Запазване..." : "Добави потребител"}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      {loading ? (
        <div className="text-center py-12 text-[var(--color-gray-600)]">
          Зареждане...
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-12">
          <Users className="w-12 h-12 mx-auto text-[var(--color-gray-600)] opacity-30 mb-4" />
          <p className="text-[var(--color-gray-600)]">Все още няма потребители</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-gray-600)] uppercase tracking-wider">
                    Име
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-gray-600)] uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-center px-4 py-3 text-xs font-semibold text-[var(--color-gray-600)] uppercase tracking-wider">
                    Роля
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-[var(--color-gray-600)] uppercase tracking-wider">
                    Създаден
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-[var(--color-gray-600)] uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => {
                  const isCurrentUser = currentUserEmail === user.email;
                  return (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-medium text-sm text-[var(--color-foreground)]">
                          {user.name}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-sm text-[var(--color-gray-600)]">
                        {user.email}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                          Админ
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-[var(--color-gray-600)]">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(user.created_at).toLocaleDateString("bg-BG")}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end">
                          <button
                            onClick={() => handleDelete(user)}
                            disabled={isCurrentUser}
                            className={`p-2 rounded-lg transition-colors ${
                              isCurrentUser
                                ? "opacity-30 cursor-not-allowed"
                                : "hover:bg-red-50"
                            }`}
                            title={isCurrentUser ? "Не можете да изтриете себе си" : "Изтрий"}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {users.map((user) => {
              const isCurrentUser = currentUserEmail === user.email;
              return (
                <div
                  key={user.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-[var(--color-foreground)]">
                        {user.name}
                      </h3>
                      <p className="text-xs text-[var(--color-gray-600)] mt-0.5">
                        {user.email}
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 flex-shrink-0">
                      Админ
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-[var(--color-gray-600)]">
                      <Calendar className="w-3 h-3" />
                      {new Date(user.created_at).toLocaleDateString("bg-BG")}
                    </span>
                    <button
                      onClick={() => handleDelete(user)}
                      disabled={isCurrentUser}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isCurrentUser
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:bg-red-50"
                      }`}
                      title={isCurrentUser ? "Не можете да изтриете себе си" : "Изтрий"}
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
