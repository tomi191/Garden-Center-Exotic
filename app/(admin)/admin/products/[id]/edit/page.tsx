import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";
import { supabaseAdmin } from "@/lib/supabase";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditProductPageProps) {
  const { id } = await params;
  const { data: product } = await supabaseAdmin
    .from("Product")
    .select("name")
    .eq("id", id)
    .single();

  return {
    title: product
      ? `Редактирай: ${product.name} | Admin Panel`
      : "Продуктът не е намерен",
  };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  const { data: product, error } = await supabaseAdmin
    .from("Product")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !product) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-6">
        Редактирай Продукт
      </h1>
      <ProductForm
        mode="edit"
        product={{
          id: product.id,
          name: product.name,
          category: product.category,
          subcategory: product.subcategory || "",
          origin: product.origin,
          price: product.price,
          priceUnit: product.priceUnit,
          description: product.description,
          image: product.image,
          inStock: product.inStock,
          featured: product.featured,
          characteristics: product.characteristics,
        }}
      />
    </div>
  );
}
