"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Building2, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function B2BLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/b2b/katalog";

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("b2b-credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("Възникна грешка. Моля, опитайте отново.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-[var(--color-secondary)] rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="relative w-[200px] h-[70px] mb-8">
            <Image
              src="/images/logos/Logo print file white.png"
              alt="Exotic Flowers"
              fill
              className="object-contain"
            />
          </div>

          <h2 className="font-serif text-4xl font-bold mb-6 text-center">
            B2B Партньорски Портал
          </h2>

          <p className="text-white/80 text-center max-w-md mb-10">
            Достъп до преференциални цени, каталог на едро и лесно управление на поръчките
          </p>

          <div className="space-y-4 w-full max-w-sm">
            {[
              "Цени с 10-20% отстъпка",
              "Достъп до пълен каталог",
              "История на поръчките",
              "Приоритетна доставка",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl px-5 py-3">
                <div className="w-2 h-2 bg-[var(--color-secondary)] rounded-full" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-[var(--color-border)]">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-[120px] h-[40px] lg:hidden">
              <Image
                src="/images/logos/Logo print file.png"
                alt="Exotic Flowers"
                fill
                className="object-contain"
              />
            </div>
            <span className="hidden lg:inline text-sm text-[var(--color-gray-600)]">
              ← Обратно към сайта
            </span>
          </Link>
          <Link href="/b2b/register">
            <Button variant="outline" size="sm" className="rounded-full">
              Регистрация
            </Button>
          </Link>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-sm font-medium mb-4">
                <Building2 className="w-4 h-4" />
                B2B Портал
              </div>
              <h1 className="font-serif text-3xl font-bold text-[var(--color-primary-dark)] mb-2">
                Вход за партньори
              </h1>
              <p className="text-[var(--color-gray-600)]">
                Въведете данните на вашата фирма
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Имейл адрес
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-400)]" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                    placeholder="firma@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                  Парола
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-400)]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-12 py-4 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-gray-400)] hover:text-[var(--color-gray-600)]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full py-4 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Влизане...
                  </>
                ) : (
                  <>
                    Вход в портала
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-[var(--color-gray-600)]">
                Нямате акаунт?{" "}
                <Link href="/b2b/register" className="text-[var(--color-primary)] font-semibold hover:underline">
                  Регистрирайте се
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-[var(--color-secondary-light)] rounded-xl">
              <p className="text-sm text-[var(--color-gray-600)] text-center">
                Имате въпроси? Свържете се с нас на{" "}
                <a href="tel:0895670370" className="font-semibold text-[var(--color-primary)]">
                  089 567 0370
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
