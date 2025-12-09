import { notFound } from "next/navigation";
import { RequestForm } from "@/components/admin/RequestForm";
import { ClipboardList } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase";

interface EditRequestPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: EditRequestPageProps) {
  const { id } = await params;
  return {
    title: `Редактирай заявка ${id} | Admin Panel`,
  };
}

async function getRequest(id: string) {
  const { data, error } = await supabaseAdmin
    .from("Request")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function EditRequestPage({ params }: EditRequestPageProps) {
  const { id } = await params;

  const request = await getRequest(id);

  if (!request) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--color-foreground)] mb-6 flex items-center gap-3">
        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
          <ClipboardList className="w-6 h-6" />
        </div>
        Редактирай Заявка
        <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {request.id}
        </span>
      </h1>
      <RequestForm
        mode="edit"
        request={request}
      />
    </div>
  );
}
