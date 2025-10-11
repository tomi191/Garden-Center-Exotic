"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form data:", data);

    // TODO: Replace with actual API endpoint
    // await fetch("/api/contact", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // });

    setIsSubmitting(false);
    setIsSuccess(true);
    reset();

    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
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
    { value: "complaint", label: "Оплакване" },
  ];

  return (
    <Card>
      <CardContent className="p-8">
        {isSuccess && (
          <div className="mb-6 p-4 bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 rounded-lg flex items-center gap-3 text-[var(--color-success)] animate-slide-down">
            <CheckCircle className="w-5 h-5" />
            <p className="font-medium">
              Съобщението е изпратено успешно! Ще се свържем с вас скоро.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <Input
            label="Име"
            placeholder="Вашето име"
            {...register("name")}
            error={errors.name?.message}
            required
          />

          {/* Email */}
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            {...register("email")}
            error={errors.email?.message}
            required
          />

          {/* Phone */}
          <Input
            label="Телефон"
            type="tel"
            placeholder="+359 XXX XXX XXX"
            {...register("phone")}
            error={errors.phone?.message}
          />

          <div className="grid md:grid-cols-2 gap-6">
            {/* Location */}
            <Select
              label="Локация"
              options={locationOptions}
              {...register("location")}
              error={errors.location?.message}
              required
            />

            {/* Inquiry Type */}
            <Select
              label="Тип запитване"
              options={inquiryTypeOptions}
              {...register("inquiryType")}
              error={errors.inquiryType?.message}
              required
            />
          </div>

          {/* Message */}
          <TextArea
            label="Съобщение"
            placeholder="Вашето съобщение..."
            {...register("message")}
            error={errors.message?.message}
            rows={6}
            required
          />

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full group"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Изпращане..."
            ) : (
              <>
                Изпрати съобщение
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>

          <p className="text-sm text-[var(--color-gray-600)] text-center">
            * Задължителни полета
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
