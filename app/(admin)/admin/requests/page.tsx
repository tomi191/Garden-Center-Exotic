import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { RequestsTable } from "@/components/admin/RequestsTable";
import { supabaseAdmin } from "@/lib/supabase";
import { Plus, ClipboardList } from "lucide-react";

export const metadata = {
  title: "Заявки | Админ Панел",
};

export default async function AdminRequestsPage() {
  // Тук ще дърпаме заявките от базата данни.
  // За момента ще използваме mock данни в компонента, докато не създадем таблица в DB.
  
  /* 
  const { data: requests, error } = await supabaseAdmin
    .from("Requests")
    .select("*")
    .order("createdAt", { ascending: false });
  */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-foreground)] flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
               <ClipboardList className="w-6 h-6" />
            </div>
            Управление на Заявки
          </h1>
          <p className="text-[var(--color-gray-600)] mt-1 ml-14">
            Следете резервациите и интереса от клиенти
          </p>
        </div>
        <Link href="/admin/requests/new">
          <Button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white">
            <Plus className="w-4 h-4" />
            Нова Заявка
          </Button>
        </Link>
      </div>

      {/* Requests Table */}
      <RequestsTable />
    </div>
  );
}
