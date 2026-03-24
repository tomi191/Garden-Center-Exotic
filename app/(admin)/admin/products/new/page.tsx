import { ProductForm } from "@/components/admin/ProductForm";

export const metadata = {
  title: "Добави Продукт | Admin Panel",
};

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-[13px] font-semibold hidden sm:block text-[var(--color-foreground)] mb-3">
        Добави Нов Продукт
      </h1>
      <ProductForm mode="create" />
    </div>
  );
}
