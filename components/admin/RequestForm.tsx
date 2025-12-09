"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import toast from "react-hot-toast";
import { Save, ArrowLeft, User, Phone, Package, Calendar, FileText, Loader2, Lock } from "lucide-react";
import Link from "next/link";

// Product type
interface Product {
  id: string;
  name: string;
  priceUnit: string;
}

const requestSchema = z.object({
  clientName: z.string().min(1, "Името на клиента е задължително"),
  clientPhone: z.string().min(1, "Телефонът е задължителен"),
  clientEmail: z.string().email("Невалиден имейл").optional().or(z.literal("")),
  productId: z.string().optional().nullable(),
  productName: z.string().min(1, "Продуктът е задължителен"),
  quantity: z.number().positive("Количеството трябва да е положително число"),
  unit: z.string().min(1, "Единицата е задължителна"),
  dueDate: z.string().min(1, "Датата е задължителна"),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
  notes: z.string().optional(),
  internalNotes: z.string().optional().nullable(),
});

type RequestFormData = z.infer<typeof requestSchema>;

interface RequestFormProps {
  request?: RequestFormData & { id: string };
  mode: "create" | "edit";
}

const statusOptions = [
  { value: "pending", label: "Чакаща" },
  { value: "confirmed", label: "Потвърдена" },
  { value: "completed", label: "Доставена" },
  { value: "cancelled", label: "Отказана" },
];

const unitOptions = [
  { value: "стръка", label: "стръка" },
  { value: "букет", label: "букет" },
  { value: "саксия", label: "саксия" },
  { value: "бр.", label: "бр." },
  { value: "кг", label: "кг" },
];

export function RequestForm({ request, mode }: RequestFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // Зареждане на продукти
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setProductsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    defaultValues: request || {
      clientName: "",
      clientPhone: "",
      clientEmail: "",
      productId: null,
      productName: "",
      quantity: 1,
      unit: "стръка",
      dueDate: new Date().toISOString().split("T")[0],
      status: "pending",
      notes: "",
      internalNotes: "",
    },
  });

  const status = watch("status");
  const selectedProductId = watch("productId");

  // При избор на продукт - попълва името и единицата
  const handleProductSelect = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setValue("productId", productId);
      setValue("productName", product.name);
      // Извлечи единицата от priceUnit (напр. "лв/стрък" -> "стръка")
      const unitMatch = product.priceUnit.match(/\/(.*)/);
      if (unitMatch) {
        const unit = unitMatch[1].replace(".", "");
        setValue("unit", unit === "стрък" ? "стръка" : unit);
      }
    }
  };

  async function onSubmit(data: RequestFormData) {
    setLoading(true);

    try {
      const url = mode === "create"
        ? "/api/requests"
        : `/api/requests/${request?.id}`;

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
          ? "Заявката е добавена успешно!"
          : "Заявката е обновена успешно!"
      );

      router.push("/admin/requests");
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
          href="/admin/requests"
          className="inline-flex items-center gap-2 text-[var(--color-gray-600)] hover:text-[var(--color-foreground)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад към списъка
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Fields */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Info */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-lg text-[var(--color-foreground)] mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-purple-600" />
                Информация за клиента
              </h2>

              <div>
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">
                  Име на клиента *
                </label>
                <Input
                  {...register("clientName")}
                  placeholder="Напр. Хотел Черно Море"
                />
                {errors.clientName && (
                  <p className="text-sm text-red-500 mt-1">{errors.clientName.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">
                    Телефон *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      {...register("clientPhone")}
                      placeholder="0888 123 456"
                      className="pl-10"
                    />
                  </div>
                  {errors.clientPhone && (
                    <p className="text-sm text-red-500 mt-1">{errors.clientPhone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">
                    Имейл (опционално)
                  </label>
                  <Input
                    {...register("clientEmail")}
                    type="email"
                    placeholder="email@example.com"
                  />
                  {errors.clientEmail && (
                    <p className="text-sm text-red-500 mt-1">{errors.clientEmail.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Info */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-lg text-[var(--color-foreground)] mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-600" />
                Детайли на поръчката
              </h2>

              <div>
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">
                  Избор от каталога
                </label>
                <div className="relative">
                  {productsLoading ? (
                    <div className="flex items-center gap-2 h-10 px-4 bg-gray-50 rounded-lg text-gray-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Зареждане на продукти...
                    </div>
                  ) : (
                    <select
                      value={selectedProductId || ""}
                      onChange={(e) => handleProductSelect(e.target.value)}
                      className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">-- Изберете продукт (опционално) --</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Изберете от каталога или въведете ръчно по-долу
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">
                  Име на продукта *
                </label>
                <Input
                  {...register("productName")}
                  placeholder="Напр. Червени Рози (Колумбия)"
                />
                {errors.productName && (
                  <p className="text-sm text-red-500 mt-1">{errors.productName.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">
                    Количество *
                  </label>
                  <Input
                    type="number"
                    min="1"
                    {...register("quantity", { valueAsNumber: true })}
                    placeholder="100"
                  />
                  {errors.quantity && (
                    <p className="text-sm text-red-500 mt-1">{errors.quantity.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">
                    Единица *
                  </label>
                  <select
                    {...register("unit")}
                    className="w-full px-4 py-2 border border-[var(--color-border)] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {unitOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-gray-700)] mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Краен срок *
                </label>
                <Input
                  type="date"
                  {...register("dueDate")}
                />
                {errors.dueDate && (
                  <p className="text-sm text-red-500 mt-1">{errors.dueDate.message}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg text-[var(--color-foreground)] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                Бележки от клиента
              </h2>

              <TextArea
                {...register("notes")}
                rows={3}
                placeholder="Бележки от клиента..."
              />
            </CardContent>
          </Card>

          {/* Internal Notes - Admin Only */}
          <Card className="border-2 border-orange-200 bg-orange-50/30">
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg text-orange-700 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Вътрешни бележки
                <span className="text-xs font-normal bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
                  Само за мен
                </span>
              </h2>

              <TextArea
                {...register("internalNotes")}
                rows={4}
                placeholder="Лични бележки за този клиент/заявка... (напр. 'Винаги закъснява с плащането', 'VIP клиент', 'Предпочита по-големи глави')"
                className="bg-white"
              />
              <p className="text-xs text-orange-600 mt-2">
                Тези бележки се виждат само от теб и не са видими за клиента.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-lg text-[var(--color-foreground)] mb-2">
                Статус на заявката
              </h2>

              <div className="space-y-2">
                {statusOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-colors ${
                      status === opt.value
                        ? opt.value === "pending"
                          ? "bg-yellow-50 border border-yellow-200"
                          : opt.value === "confirmed"
                          ? "bg-blue-50 border border-blue-200"
                          : opt.value === "completed"
                          ? "bg-green-50 border border-green-200"
                          : "bg-red-50 border border-red-200"
                        : "hover:bg-gray-50 border border-transparent"
                    }`}
                  >
                    <input
                      type="radio"
                      value={opt.value}
                      checked={status === opt.value}
                      onChange={() => setValue("status", opt.value as RequestFormData["status"])}
                      className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                    />
                    <span
                      className={`font-medium ${
                        status === opt.value
                          ? opt.value === "pending"
                            ? "text-yellow-700"
                            : opt.value === "confirmed"
                            ? "text-blue-700"
                            : opt.value === "completed"
                            ? "text-green-700"
                            : "text-red-700"
                          : "text-gray-700"
                      }`}
                    >
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700"
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
                  {mode === "create" ? "Създай заявка" : "Запази промените"}
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
