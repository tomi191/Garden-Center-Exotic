import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const metadata = {
  title: "Admin Panel | Екзотик",
  description: "Управление на продукти и поръчки",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]"> {/* Светъл, чист фон */}
      <AdminSidebar /> {/* Sidebar is now full height and fixed */}
      
      <div className="lg:pl-72 min-h-screen flex flex-col"> {/* Offset content by sidebar width */}
        <AdminHeader user={session.user} />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
}