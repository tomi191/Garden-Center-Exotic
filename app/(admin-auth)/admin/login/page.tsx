"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Lock, Mail, AlertCircle, Eye, EyeOff, Sparkles } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Невалиден имейл или парола");
        setLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("Възникна грешка. Моля, опитайте отново.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm animate-in slide-in-from-top-2">
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <span className="font-medium">{error}</span>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Имейл адрес
          </label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" />
            <input
              name="email"
              type="email"
              placeholder="admin@gardenexotic.bg"
              required
              autoComplete="email"
              className="w-full pl-12 pr-4 h-14 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 outline-none transition-all text-gray-900 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Парола
          </label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full pl-12 pr-14 h-14 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 outline-none transition-all text-gray-900 placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-14 text-base font-bold rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:shadow-lg hover:shadow-[var(--color-primary)]/30 transition-all duration-300 hover:-translate-y-0.5"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-3">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Влизане...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Влез в панела
          </span>
        )}
      </Button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[#1a3a25] overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          {/* Large blurred circles */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-[var(--color-secondary)]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[var(--color-primary)]/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-white/5 rounded-full blur-2xl" />

          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Top - Logo */}
          <div>
            <div className="flex items-center gap-4">
              <Image
                src="/images/logos/Logo print file white.png"
                alt="Екзотик"
                width={200}
                height={70}
                className="h-16 w-auto"
              />
            </div>
          </div>

          {/* Middle - Main Text */}
          <div className="space-y-6">
            <h1 className="text-5xl font-serif font-bold !text-white leading-tight drop-shadow-lg">
              Управлявайте<br />
              <span className="!text-white">вашия бизнес</span><br />
              с лекота
            </h1>
            <p className="!text-white text-lg max-w-md leading-relaxed drop-shadow-md">
              Пълен контрол над продукти, заявки и складови наличности.
              Всичко на едно място.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 pt-4">
              {["Продукти", "Заявки", "Склад", "Настройки"].map((feature) => (
                <span
                  key={feature}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium border border-white/10"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom - Stats or Trust */}
          <div className="flex items-center gap-8">
            <div>
              <p className="text-3xl font-bold !text-white drop-shadow-md">27+</p>
              <p className="!text-white/80 text-sm">Години опит</p>
            </div>
            <div className="w-px h-12 bg-white/40" />
            <div>
              <p className="text-3xl font-bold !text-white drop-shadow-md">63</p>
              <p className="!text-white/80 text-sm">Продукта</p>
            </div>
            <div className="w-px h-12 bg-white/40" />
            <div>
              <p className="text-3xl font-bold !text-white drop-shadow-md">2</p>
              <p className="!text-white/80 text-sm">Локации</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Image
              src="/images/logos/Logo print file.png"
              alt="Градински Център Екзотик"
              width={200}
              height={80}
              className="h-20 w-auto mx-auto mb-4"
            />
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 rounded-2xl mb-4">
                <Lock className="w-8 h-8 text-[var(--color-primary)]" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Добре дошли обратно
              </h1>
              <p className="text-gray-500 mt-2">
                Влезте в администраторския панел
              </p>
            </div>

            {/* Form */}
            <Suspense fallback={
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-[var(--color-primary)]/30 border-t-[var(--color-primary)] rounded-full animate-spin" />
              </div>
            }>
              <LoginForm />
            </Suspense>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                Защитен достъп • SSL криптиране
              </p>
            </div>
          </div>

          {/* Bottom Link */}
          <p className="text-center text-sm text-gray-500 mt-6">
            <a href="/" className="text-[var(--color-primary)] hover:underline font-medium">
              ← Обратно към сайта
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
