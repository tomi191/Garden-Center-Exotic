"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ImageUpload } from "./ImageUpload";
import toast from "react-hot-toast";
import { Plus, X, Save, ArrowLeft, Building2, Info } from "lucide-react";
import Link from "next/link";

// B2B tier configuration
const b2bTiers = [
  { name: "Silver", discount: 10, color: "text-gray-600", bg: "bg-gray-100" },
  { name: "Gold", discount: 15, color: "text-amber-600", bg: "bg-amber-50" },
  { name: "Platinum", discount: 20, color: "text-indigo-600", bg: "bg-indigo-50" },
];

const productSchema = z.object({
  name: z.string().min(1, "Името е задължително"),
  category: z.string().min(1, "Категорията е задължителна"),
  subcategory: z.string().optional(),
  origin: z.string().min(1, "Произходът е задължителен"),
  price: z.number().positive("Цената трябва да е положително число"),
  priceUnit: z.string().min(1, "Единицата е задължителна"),
  description: z.string().min(10, "Описанието трябва да е поне 10 символа"),
  image: z.string().min(1, "Изображението е задължително"),
  inStock: z.boolean(),
  featured: z.boolean(),
  characteristics: z.array(z.string()),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: ProductFormData & { id: string };
  mode: "create" | "edit";
}

const categoryOptions = [
  { value: "ryazan-tsvyat", label: "Отрязан Цвят" },
  { value: "saksiyni-rasteniya", label: "Саксийни Растения" },
  { value: "sezonni-tsvetya", label: "Сезонни Цветя" },
  { value: "hrasti-darveta", label: "Храсти и Дървета" },
];

const originOptions = [
  { value: "Еквадор", label: "Еквадор" },
  { value: "Колумбия", label: "Колумбия" },
  { value: "Кения", label: "Кения" },
  { value: "Нидерландия", label: "Нидерландия" },
  { value: "Турция", label: "Турция" },
  { value: "Гърция", label: "Гърция" },
  { value: "България", label: "България" },
];

const priceUnitOptions = [
  { value: "лв/стрък", label: "лв/стрък" },
  { value: "лв/букет", label: "лв/букет" },
  { value: "лв/саксия", label: "лв/саксия" },
  { value: "лв", label: "лв" },
];

export function ProductForm({ product, mode }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [newCharacteristic, setNewCharacteristic] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      name: "",
      category: "",
      subcategory: "",
      origin: "",
      price: 0,
      priceUnit: "лв",
      description: "",
      image: "",
      inStock: true,
      featured: false,
      characteristics: [],
    },
  });

  const imageUrl = watch("image");
  const characteristics = watch("characteristics");
  const inStock = watch("inStock");
  const featured = watch("featured");
  const price = watch("price");
  const priceUnit = watch("priceUnit");

  function addCharacteristic() {
    if (newCharacteristic.trim()) {
      setValue("characteristics", [...characteristics, newCharacteristic.trim()]);
      setNewCharacteristic("");
    }
  }

  function removeCharacteristic(index: number) {
    setValue(
      "characteristics",
      characteristics.filter((_, i) => i !== index)
    );
  }

  async function onSubmit(data: ProductFormData) {
    setLoading(true);

    try {
      const url =
        mode === "create" ? "/api/products" : `/api/products/${product?.id}`;

      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Грешка при запазване");
      }

      toast.success(
        mode === "create"
          ? "Продуктът е добавен успешно!"
          : "Продуктът е обновен успешно!"
      );

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Възникна грешка"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-[var(--color-gray-600)] hover:text-[var(--color-foreground)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад към списъка
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-lg text-[var(--color-foreground)] mb-4">
                Основна информация
              </h2>

              <div>
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">
                  Име на продукта *
                </label>
                <Input
                  {...register("name")}
                  placeholder="Напр. Червени Рози"
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">
                    Категория *
                  </label>
                  <select
                    {...register("category")}
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  >
                    <option value="">Избери категория</option>
                    {categoryOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">
                    Произход *
                  </label>
                  <select
                    {...register("origin")}
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  >
                    <option value="">Избери произход</option>
                    {originOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {errors.origin && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.origin.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">
                    Цена *
                  </label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register("price")}
                    placeholder="0.00"
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">
                    Единица *
                  </label>
                  <select
                    {...register("priceUnit")}
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  >
                    {priceUnitOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* B2B Price Preview */}
              {price > 0 && (
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Building2 className="w-4 h-4 text-indigo-600" />
                    <h4 className="font-medium text-indigo-900">B2B Цени за партньори</h4>
                    <div className="group relative">
                      <Info className="w-4 h-4 text-indigo-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        Автоматични отстъпки за B2B клиенти
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {b2bTiers.map((tier) => {
                      const discountedPrice = Number(price) * (1 - tier.discount / 100);
                      return (
                        <div
                          key={tier.name}
                          className={`${tier.bg} rounded-lg p-3 text-center`}
                        >
                          <p className={`text-xs font-medium ${tier.color} mb-1`}>
                            {tier.name} (-{tier.discount}%)
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            {discountedPrice.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">{priceUnit}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">
                  Описание *
                </label>
                <TextArea
                  {...register("description")}
                  rows={4}
                  placeholder="Опишете продукта..."
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Characteristics */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg text-[var(--color-foreground)] mb-4">
                Характеристики
              </h2>

              <div className="flex gap-2 mb-4">
                <Input
                  value={newCharacteristic}
                  onChange={(e) => setNewCharacteristic(e.target.value)}
                  placeholder="Напр. Свежест 10-14 дни"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCharacteristic();
                    }
                  }}
                />
                <Button type="button" onClick={addCharacteristic}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {characteristics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {characteristics.map((char, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1 bg-[var(--color-gray-100)] rounded-full"
                    >
                      <span className="text-sm">{char}</span>
                      <button
                        type="button"
                        onClick={() => removeCharacteristic(index)}
                        className="text-[var(--color-gray-500)] hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Image Upload */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg text-[var(--color-foreground)] mb-4">
                Изображение *
              </h2>
              <ImageUpload
                value={imageUrl}
                onChange={(url) => setValue("image", url)}
                error={errors.image?.message}
              />
            </CardContent>
          </Card>

          {/* Status */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-lg text-[var(--color-foreground)] mb-2">
                Статус
              </h2>

              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-[var(--color-gray-50)] transition-colors">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setValue("inStock", e.target.checked)}
                  className="w-5 h-5 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <div>
                  <span className="font-medium text-[var(--color-foreground)]">
                    В наличност
                  </span>
                  <p className="text-xs text-[var(--color-gray-500)]">
                    Показва се като наличен в каталога
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-[var(--color-gray-50)] transition-colors">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setValue("featured", e.target.checked)}
                  className="w-5 h-5 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
                <div>
                  <span className="font-medium text-[var(--color-foreground)]">
                    Препоръчан продукт
                  </span>
                  <p className="text-xs text-[var(--color-gray-500)]">
                    Показва се на началната страница
                  </p>
                </div>
              </label>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Запазване...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {mode === "create" ? "Добави продукт" : "Запази промените"}
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => router.back()}
            >
              Отказ
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
