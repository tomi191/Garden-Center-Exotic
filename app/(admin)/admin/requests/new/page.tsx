import { RequestForm } from "@/components/admin/RequestForm";
import { ClipboardList } from "lucide-react";

export const metadata = {
  title: "Нова Заявка | Admin Panel",
};

export default function NewRequestPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-6 flex items-center gap-3">
        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
          <ClipboardList className="w-6 h-6" />
        </div>
        Нова Заявка
      </h1>
      <RequestForm mode="create" />
    </div>
  );
}
