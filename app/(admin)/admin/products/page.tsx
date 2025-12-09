import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { supabaseAdmin } from "@/lib/supabase";
import { Plus } from "lucide-react";

export default async function AdminProductsPage() {
  const { data: products, error } = await supabaseAdmin
    .from("Product")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-foreground)]">
            Управление на Продукти
          </h1>
          <p className="text-[var(--color-gray-600)] mt-1">
            {products?.length || 0} продукта в каталога
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Добави Продукт
          </Button>
        </Link>
      </div>

      {/* Products Table */}
      <ProductsTable products={products || []} />
    </div>
  );
}
