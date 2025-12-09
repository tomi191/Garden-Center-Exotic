"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Leaf, Lock, Mail, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-400)]" />
          <Input
            name="email"
            type="email"
            placeholder="Имейл адрес"
            required
            className="pl-12 h-12"
            autoComplete="email"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-400)]" />
          <Input
            name="password"
            type="password"
            placeholder="Парола"
            required
            className="pl-12 h-12"
            autoComplete="current-password"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-12 text-base font-semibold"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Влизане...
          </span>
        ) : (
          "Влез в системата"
        )}
      </Button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-dark)] to-[var(--color-secondary)]">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-2xl flex items-center justify-center shadow-lg">
              <Leaf className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[var(--color-foreground)]">
              Администраторски Панел
            </h1>
            <p className="text-sm text-[var(--color-gray-600)] mt-2">
              Градински Център Екзотик
            </p>
          </div>

          {/* Form */}
          <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
          </Suspense>

          {/* Footer */}
          <p className="text-center text-xs text-[var(--color-gray-500)] mt-6">
            Защитен достъп само за администратори
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
