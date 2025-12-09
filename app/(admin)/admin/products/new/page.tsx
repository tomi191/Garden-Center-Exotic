import { ProductForm } from "@/components/admin/ProductForm";

export const metadata = {
  title: "Добави Продукт | Admin Panel",
};

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">
        Добави Нов Продукт
      </h1>
      <ProductForm mode="create" />
    </div>
  );
}
