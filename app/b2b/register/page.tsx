"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Building2, User, Mail, Phone, MapPin, Lock, Eye, EyeOff, CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function B2BRegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    company_name: "",
    eik: "",
    mol: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    password: "",
    confirm_password: "",
    accept_terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirm_password) {
      setError("Паролите не съвпадат");
      return;
    }

    if (!formData.accept_terms) {
      setError("Трябва да приемете условията за ползване");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/b2b/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company_name: formData.company_name,
          eik: formData.eik,
          mol: formData.mol,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Грешка при регистрация");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Възникна грешка");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary-light)] to-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[var(--color-primary-dark)] mb-4">
            Регистрацията е успешна!
          </h1>
          <p className="text-[var(--color-gray-600)] mb-8">
            Благодарим ви за интереса! Вашата заявка е изпратена за одобрение.
            Ще получите известие на имейла си след като бъде разгледана.
          </p>
          <div className="space-y-4">
            <Link href="/b2b/login">
              <Button className="w-full rounded-full">
                Към вход за B2B клиенти
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full rounded-full">
                Обратно към началото
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--color-primary-light)] to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-[var(--color-border)] sticky top-0 z-50">
        <Container>
          <div className="py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-[140px] h-[48px]">
                <Image
                  src="/images/logos/Logo print file.png"
                  alt="Exotic Flowers"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[var(--color-gray-600)] hidden sm:inline">
                Вече имате акаунт?
              </span>
              <Link href="/b2b/login">
                <Button variant="outline" size="sm" className="rounded-full">
                  Вход
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-sm font-medium mb-4">
              <Building2 className="w-4 h-4" />
              B2B Партньорска програма
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
              Регистрация на фирма
            </h1>
            <p className="text-[var(--color-gray-600)]">
              Попълнете формата и получете достъп до преференциални B2B цени
            </p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-[var(--color-border)]"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Info Section */}
              <div>
                <h3 className="font-semibold text-[var(--color-primary-dark)] mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Информация за фирмата
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      Име на фирмата *
                    </label>
                    <input
                      type="text"
                      name="company_name"
                      value={formData.company_name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                      placeholder="ООД / ЕООД / ЕТ..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      ЕИК / БУЛСТАТ *
                    </label>
                    <input
                      type="text"
                      name="eik"
                      value={formData.eik}
                      onChange={handleChange}
                      required
                      maxLength={13}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                      placeholder="123456789"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      МОЛ (Представляващ) *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-400)]" />
                      <input
                        type="text"
                        name="mol"
                        value={formData.mol}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                        placeholder="Име Фамилия"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div>
                <h3 className="font-semibold text-[var(--color-primary-dark)] mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Контактна информация
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      Имейл адрес *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-400)]" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                        placeholder="firma@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      Телефон *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-400)]" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                        placeholder="+359 888 123 456"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      Адрес
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-400)]" />
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                        placeholder="ул. Примерна 123"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      Град
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                      placeholder="София"
                    />
                  </div>
                </div>
              </div>

              {/* Password Section */}
              <div>
                <h3 className="font-semibold text-[var(--color-primary-dark)] mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Парола за достъп
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      Парола *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-400)]" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full pl-11 pr-12 py-3 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-gray-400)] hover:text-[var(--color-gray-600)]"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-2">
                      Потвърди парола *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-gray-400)]" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        required
                        minLength={6}
                        className="w-full pl-11 pr-12 py-3 rounded-xl border border-[var(--color-border)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-gray-400)] hover:text-[var(--color-gray-600)]"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="accept_terms"
                  name="accept_terms"
                  checked={formData.accept_terms}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <label htmlFor="accept_terms" className="text-sm text-[var(--color-gray-600)]">
                  Съгласен съм с{" "}
                  <Link href="/terms" className="text-[var(--color-primary)] hover:underline">
                    условията за ползване
                  </Link>{" "}
                  и{" "}
                  <Link href="/privacy" className="text-[var(--color-primary)] hover:underline">
                    политиката за поверителност
                  </Link>
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full py-4 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Изпращане...
                  </>
                ) : (
                  <>
                    Изпрати заявка за регистрация
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Benefits */}
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { title: "10-20% отстъпка", desc: "Според обема на заявките" },
              { title: "До 60 дни разсрочено", desc: "Плащане с фактура" },
              { title: "Приоритетна доставка", desc: "Експресни доставки" },
            ].map((benefit, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 text-center">
                <h4 className="font-semibold text-[var(--color-primary-dark)]">{benefit.title}</h4>
                <p className="text-sm text-[var(--color-gray-600)]">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
