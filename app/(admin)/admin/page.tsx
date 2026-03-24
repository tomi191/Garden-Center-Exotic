import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
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
} from "lucide-react";

function timeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Току-що";
  if (diffMin < 60) return `Преди ${diffMin} мин`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `Преди ${diffHours} ч`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `Преди ${diffDays} дни`;
  return date.toLocaleDateString("bg-BG", { day: "numeric", month: "short" });
}

export default async function AdminDashboard() {
  // Products stats
  const { count: totalProducts } = await supabaseAdmin
    .from("Product")
    .select("*", { count: "exact", head: true });

  const { count: inStockCount } = await supabaseAdmin
    .from("Product")
    .select("*", { count: "exact", head: true })
    .eq("inStock", true);

  const { count: outOfStockCount } = await supabaseAdmin
    .from("Product")
    .select("*", { count: "exact", head: true })
    .eq("inStock", false);

  const { count: featuredCount } = await supabaseAdmin
    .from("Product")
    .select("*", { count: "exact", head: true })
    .eq("featured", true);

  // Recent products
  const { data: recentProducts } = await supabaseAdmin
    .from("Product")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(5);

  // Category distribution
  const { data: allProducts } = await supabaseAdmin
    .from("Product")
    .select("category");

  // B2B stats
  const { count: b2bOrdersCount } = await supabaseAdmin
    .from("b2b_orders")
    .select("*", { count: "exact", head: true });

  const { count: pendingB2BOrders } = await supabaseAdmin
    .from("b2b_orders")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  const { count: processingB2BOrders } = await supabaseAdmin
    .from("b2b_orders")
    .select("*", { count: "exact", head: true })
    .eq("status", "processing");

  const { count: b2bCompaniesCount } = await supabaseAdmin
    .from("b2b_companies")
    .select("*", { count: "exact", head: true })
    .eq("status", "approved");

  // New messages count
  const { count: newMessagesCount } = await supabaseAdmin
    .from("contact_messages")
    .select("*", { count: "exact", head: true })
    .eq("status", "new");

  // Recent messages
  const { data: recentMessages } = await supabaseAdmin
    .from("contact_messages")
    .select("id, name, email, message, inquiry_type, status, created_at")
    .order("created_at", { ascending: false })
    .limit(3);

  // Pending requests
  const { count: pendingRequests } = await supabaseAdmin
    .from("Request")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  // Category stats
  const categoryStats = allProducts?.reduce(
    (acc: Record<string, number>, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    },
    {}
  ) || {};

  const categoryLabels: Record<string, string> = {
    "ryazan-tsvyat": "Отрязан цвят",
    "saksiyni-rasteniya": "Саксийни растения",
    "sezonni-tsvetya": "Сезонни цветя",
    "hrasti-darveta": "Храсти и дървета",
  };

  const categoryColors: Record<string, string> = {
    "ryazan-tsvyat": "bg-green-500",
    "saksiyni-rasteniya": "bg-amber-500",
    "sezonni-tsvetya": "bg-rose-400",
    "hrasti-darveta": "bg-emerald-600",
  };

  const maxCategoryCount = Math.max(...Object.values(categoryStats), 1);

  const messagesTotal = newMessagesCount || 0;
  const b2bTotal =
    (b2bOrdersCount || 0) > 0
      ? `${pendingB2BOrders || 0}/${b2bOrdersCount || 0}`
      : String(b2bCompaniesCount || 0);

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Link href="/admin/products" className="block">
          <Card padding="none" className="p-3 border-l-4 border-l-green-500 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent>
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-green-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {totalProducts || 0}
                  </p>
                  <p className="text-xs text-gray-500 truncate">Продукти</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/messages" className="block">
          <Card padding="none" className="p-3 border-l-4 border-l-blue-500 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-semibold text-gray-900 leading-tight">
                      {messagesTotal}
                    </p>
                    {messagesTotal > 0 && (
                      <span className="bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                        Ново
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">Съобщения</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/requests" className="block">
          <Card padding="none" className="p-3 border-l-4 border-l-amber-500 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent>
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {pendingRequests || 0}
                  </p>
                  <p className="text-xs text-gray-500 truncate">Заявки</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/b2b" className="block">
          <Card padding="none" className="p-3 border-l-4 border-l-purple-500 hover:shadow-md transition-shadow cursor-pointer">
            <CardContent>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {b2bTotal}
                  </p>
                  <p className="text-xs text-gray-500 truncate">B2B</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
        <Link
          href="/admin/products/new"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors whitespace-nowrap flex-shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          Продукт
        </Link>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors whitespace-nowrap flex-shrink-0"
        >
          <FileText className="w-3.5 h-3.5" />
          Блог пост
        </Link>
        <Link
          href="/admin/requests"
          className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors whitespace-nowrap flex-shrink-0"
        >
          <ClipboardList className="w-3.5 h-3.5" />
          Виж заявки
        </Link>
      </div>

      {/* Recent Messages */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-3 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-blue-600" />
            Последни запитвания
          </h2>
          <Link
            href="/admin/messages"
            className="text-xs font-medium text-[var(--color-primary)] hover:underline flex items-center gap-0.5"
          >
            Виж всички
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="divide-y divide-gray-50">
          {!recentMessages || recentMessages.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-8 h-8 text-gray-200 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Няма съобщения</p>
            </div>
          ) : (
            recentMessages.map((msg: any) => {
              const statusDot =
                msg.status === "new"
                  ? "bg-blue-500"
                  : msg.status === "replied"
                  ? "bg-green-500"
                  : "bg-gray-300";
              const truncatedMsg =
                msg.message && msg.message.length > 60
                  ? msg.message.substring(0, 60) + "..."
                  : msg.message || "";
              return (
                <Link
                  key={msg.id}
                  href={`/admin/messages`}
                  className="flex items-start gap-3 p-3 hover:bg-gray-50 transition-colors"
                >
                  <span
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${statusDot}`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {msg.name}
                      </p>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap flex-shrink-0">
                        {timeAgo(msg.created_at)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                      {truncatedMsg}
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </Card>

      {/* Recent Products */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-3 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
            <Leaf className="w-4 h-4 text-green-600" />
            Последно добавени
          </h2>
          <Link
            href="/admin/products"
            className="text-xs font-medium text-[var(--color-primary)] hover:underline flex items-center gap-0.5"
          >
            Виж всички
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {!recentProducts || recentProducts.length === 0 ? (
          <div className="text-center py-8">
            <Package className="w-8 h-8 text-gray-200 mx-auto mb-2" />
            <p className="text-gray-400 text-sm">Няма добавени продукти</p>
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto p-3 scrollbar-hide">
            {recentProducts.map((product) => (
              <Link
                key={product.id}
                href={`/admin/products/${product.id}/edit`}
                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-50 transition-colors min-w-[220px] flex-shrink-0 border border-gray-100"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Leaf className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-gray-700">
                      {product.price.toFixed(2)} лв
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
                        product.inStock
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.inStock ? "Наличен" : "Изчерпан"}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Card>

      {/* Category Distribution */}
      <Card padding="none" className="overflow-hidden">
        <div className="p-3 border-b border-gray-100">
          <h2 className="font-bold text-sm text-gray-900">Категории</h2>
        </div>
        <div className="p-3 space-y-2.5">
          {Object.keys(categoryStats).length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">
              Няма данни
            </p>
          ) : (
            Object.entries(categoryStats)
              .sort((a, b) => (b[1] as number) - (a[1] as number))
              .map(([category, count]) => {
                const percentage = Math.round(
                  ((count as number) / maxCategoryCount) * 100
                );
                const barColor =
                  categoryColors[category] || "bg-[var(--color-secondary)]";
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-700">
                        {categoryLabels[category] || category}
                      </span>
                      <span className="text-xs font-bold text-gray-500">
                        {count as number}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${barColor} rounded-full transition-all duration-700 ease-out`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </Card>
    </div>
  );
}
