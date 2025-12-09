import { StockTable } from "@/components/admin/StockTable";
import { Warehouse } from "lucide-react";

export const metadata = {
  title: "Склад | Admin Panel",
};

export default function StockPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-6 flex items-center gap-3">
        <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
          <Warehouse className="w-6 h-6" />
        </div>
        Управление на склада
      </h1>
      <StockTable />
    </div>
  );
}
