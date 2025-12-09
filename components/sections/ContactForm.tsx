"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
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
    
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
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