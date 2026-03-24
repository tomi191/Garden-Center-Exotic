import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase";
import {
  Package,
  MessageSquare,
  ClipboardList,
  Building2,
  Plus,
  FileText,
  ArrowRight,
  Leaf,
  Mail,
  Truck,
} from "lucide-react";

function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "сега";
  if (diffMin < 60) return `${diffMin}м`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}ч`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}д`;
  return date.toLocaleDateString("bg-BG", { day: "numeric", month: "short" });
}

export default async function AdminDashboard() {
  const [
    { count: totalProducts },
    { count: outOfStockCount },
    { count: newMessagesCount },
    { count: pendingRequests },
    { count: b2bOrdersCount },
    { count: pendingB2BOrders },
    { data: recentMessages },
    { data: recentProducts },
    { data: allProducts },
    { count: arrivalsCount },
  ] = await Promise.all([
    supabaseAdmin.from("Product").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("Product").select("*", { count: "exact", head: true }).eq("inStock", false),
    supabaseAdmin.from("contact_messages").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabaseAdmin.from("Request").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabaseAdmin.from("b2b_orders").select("*", { count: "exact", head: true }),
    supabaseAdmin.from("b2b_orders").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabaseAdmin.from("contact_messages").select("id, name, message, status, created_at").order("created_at", { ascending: false }).limit(4),
    supabaseAdmin.from("Product").select("id, name, image, price, inStock").order("createdAt", { ascending: false }).limit(6),
    supabaseAdmin.from("Product").select("category"),
    supabaseAdmin.from("fresh_arrivals").select("*", { count: "exact", head: true }).eq("status", "published"),
  ]);

  const categoryStats = allProducts?.reduce((acc: Record<string, number>, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {}) || {};

  const catLabels: Record<string, string> = {
    "ryazan-tsvyat": "Отрязан цвят",
    "saksiyni-rasteniya": "Саксийни",
  };

  return (
    <div className="space-y-2">
      {/* Stats — tight inline row */}
      <div className="grid grid-cols-4 gap-1">
        {[
          { href: "/admin/products", n: totalProducts || 0, label: "Продукти", color: "text-emerald-600", warn: (outOfStockCount || 0) > 0 ? `${outOfStockCount} изч.` : null },
          { href: "/admin/messages", n: newMessagesCount || 0, label: "Нови", color: "text-blue-600", warn: null },
          { href: "/admin/requests", n: pendingRequests || 0, label: "Заявки", color: "text-amber-600", warn: null },
          { href: "/admin/dostavki", n: arrivalsCount || 0, label: "Доставки", color: "text-purple-600", warn: null },
        ].map((s) => (
          <Link key={s.href} href={s.href} className="bg-white rounded-lg p-2 hover:bg-gray-50 active:bg-gray-100 transition-colors">
            <p className={`text-[15px] font-bold ${s.color} leading-none`}>{s.n}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{s.label}</p>
            {s.warn && <p className="text-[9px] text-red-500 font-medium">{s.warn}</p>}
          </Link>
        ))}
      </div>

      {/* Quick actions — pill buttons */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide -mx-0.5 px-0.5">
        {[
          { href: "/admin/dostavki/nova", icon: Truck, label: "Зареждане" },
          { href: "/admin/products/new", icon: Plus, label: "Продукт" },
          { href: "/admin/blog/new", icon: FileText, label: "Блог" },
        ].map((a) => (
          <Link
            key={a.href}
            href={a.href}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#1a1a1a] text-white text-[11px] font-medium whitespace-nowrap flex-shrink-0 hover:bg-[#333] active:bg-[#444] transition-colors"
          >
            <a.icon className="w-3 h-3" />
            {a.label}
          </Link>
        ))}
      </div>

      {/* Messages */}
      <section className="bg-white rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
          <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
            <Mail className="w-3 h-3" /> Запитвания
          </span>
          <Link href="/admin/messages" className="text-[10px] text-blue-600 font-medium flex items-center gap-0.5">
            Всички <ArrowRight className="w-2.5 h-2.5" />
          </Link>
        </div>
        {!recentMessages || recentMessages.length === 0 ? (
          <p className="text-[11px] text-gray-300 text-center py-3">Няма запитвания</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentMessages.map((msg: { id: string; name: string; message: string; status: string; created_at: string }) => (
              <Link key={msg.id} href="/admin/messages" className="flex items-start gap-2 px-3 py-2 hover:bg-gray-50 active:bg-gray-100 transition-colors">
                <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${msg.status === "new" ? "bg-blue-500" : msg.status === "replied" ? "bg-green-400" : "bg-gray-200"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[12px] font-medium text-gray-800 truncate">{msg.name}</span>
                    <span className="text-[9px] text-gray-300 flex-shrink-0">{timeAgo(msg.created_at)}</span>
                  </div>
                  <p className="text-[11px] text-gray-400 truncate">{msg.message}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Products — tight grid */}
      <section className="bg-white rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-100">
          <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
            <Leaf className="w-3 h-3" /> Продукти
          </span>
          <Link href="/admin/products" className="text-[10px] text-blue-600 font-medium flex items-center gap-0.5">
            Всички <ArrowRight className="w-2.5 h-2.5" />
          </Link>
        </div>
        {!recentProducts || recentProducts.length === 0 ? (
          <p className="text-[11px] text-gray-300 text-center py-3">Няма продукти</p>
        ) : (
          <div className="grid grid-cols-3 gap-px bg-gray-100">
            {recentProducts.map((p: { id: string; name: string; image: string; price: number; inStock: boolean }) => (
              <Link key={p.id} href={`/admin/products/${p.id}/edit`} className="bg-white p-1.5 hover:bg-gray-50 transition-colors">
                <div className="aspect-square rounded bg-gray-50 overflow-hidden mb-1">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><Leaf className="w-4 h-4 text-gray-200" /></div>
                  )}
                </div>
                <p className="text-[10px] font-medium text-gray-700 truncate">{p.name}</p>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-gray-900">{p.price.toFixed(0)}лв</span>
                  {!p.inStock && <span className="w-1.5 h-1.5 rounded-full bg-red-400" />}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Categories — mini bars */}
      <section className="bg-white rounded-lg p-3">
        <span className="text-[11px] text-gray-400 font-medium">Категории</span>
        <div className="mt-2 space-y-1.5">
          {Object.entries(categoryStats).sort((a, b) => (b[1] as number) - (a[1] as number)).map(([cat, count]) => (
            <div key={cat} className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500 w-20 truncate">{catLabels[cat] || cat}</span>
              <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${((count as number) / (totalProducts || 1)) * 100}%` }} />
              </div>
              <span className="text-[10px] font-bold text-gray-600 w-5 text-right">{count as number}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
