"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, Loader2, Phone, MessageCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const contactSchema = z.object({
  name: z.string().min(2, "Името трябва да е поне 2 символа"),
  email: z.string().email("Невалиден email адрес"),
  phone: z.string().optional(),
  location: z.enum(["varna", "nova-zagora"]),
  inquiryType: z.enum(["general", "b2b", "delivery", "plant-care", "complaint"]),
  message: z.string().min(10, "Съобщението трябва да е поне 10 символа"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      location: "varna",
      inquiryType: "general",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Грешка при изпращане");
      }

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 8000);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Грешка при изпращане. Моля, опитайте отново."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const locationOptions = [
    { value: "varna", label: "Варна" },
    { value: "nova-zagora", label: "Нова Загора" },
  ];

  const inquiryTypeOptions = [
    { value: "general", label: "Обща информация" },
    { value: "b2b", label: "B2B услуги" },
    { value: "delivery", label: "Доставка" },
    { value: "plant-care", label: "Грижи за растения" },
  ];

  return (
    <div className="relative">
      {/* Quick contact options */}
      <div className="flex flex-wrap gap-3 mb-6">
        <a
          href="tel:+359895670370"
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 rounded-xl text-sm font-medium text-[var(--color-primary)] transition-colors"
        >
          <Phone className="w-4 h-4" />
          089 567 0370
        </a>
        <a
          href="viber://chat?number=%2B359895670370"
          className="flex items-center gap-2 px-4 py-2.5 bg-purple-50 hover:bg-purple-100 rounded-xl text-sm font-medium text-purple-700 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          Viber
        </a>
        <a
          href="mailto:exoticbg@abv.bg"
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-secondary)]/10 hover:bg-[var(--color-secondary)]/20 rounded-xl text-sm font-medium text-[var(--color-secondary-dark)] transition-colors"
        >
          <Send className="w-4 h-4" />
          exoticbg@abv.bg
        </a>
      </div>

      {isSuccess && (
        <div className="mb-8 p-6 bg-green-50 border border-green-100 rounded-2xl flex items-start gap-4 animate-in fade-in slide-in-from-top-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
             <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-green-900 text-lg mb-1">Успешно изпратено!</h4>
            <p className="text-green-700">
              Благодарим ви за запитването. Ще се свържем с вас в рамките на 24 часа.
            </p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-700 text-sm">{errorMessage}</p>
            <p className="text-red-500 text-xs mt-1">
              Можете да ни се обадите директно на <a href="tel:+359895670370" className="underline font-medium">089 567 0370</a>
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Име"
          placeholder="Вашето име"
          {...register("name")}
          error={errors.name?.message}
          required
        />

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Email"
            type="email"
            placeholder="name@example.com"
            {...register("email")}
            error={errors.email?.message}
            required
          />
          <Input
            label="Телефон"
            type="tel"
            placeholder="+359..."
            {...register("phone")}
            error={errors.phone?.message}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Select
            label="Локация"
            options={locationOptions}
            {...register("location")}
            error={errors.location?.message}
            required
          />
          <Select
            label="Тема"
            options={inquiryTypeOptions}
            {...register("inquiryType")}
            error={errors.inquiryType?.message}
            required
          />
        </div>

        <TextArea
          label="Съобщение"
          placeholder="Как можем да ви помогнем?"
          {...register("message")}
          error={errors.message?.message}
          rows={5}
          required
        />

        <Button
          type="submit"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          className="rounded-xl text-lg h-14"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 w-5 h-5 animate-spin" />
              Изпращане...
            </>
          ) : (
            <>
              Изпрати Запитване
              <Send className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
