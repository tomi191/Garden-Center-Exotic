import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { supabaseAdmin } from "@/lib/supabase";
import {
  Package,
  TrendingUp,
  AlertCircle,
  Star,
  Plus,
  ArrowRight,
  Leaf,
  ClipboardList,
  Clock,
  CheckCircle,
  Truck,
  Building2,
  ShoppingBag
} from "lucide-react";

export default async function AdminDashboard() {
  // Fetch statistics using Supabase
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

  // Fetch recent products
  const { data: recentProducts } = await supabaseAdmin
    .from("Product")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(5);

  // Category distribution
  const { data: allProducts } = await supabaseAdmin
    .from("Product")
    .select("category");

  const categoryStats = allProducts?.reduce((acc: Record<string, number>, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {}) || {};

  // Fetch request statistics
  const { count: totalRequests } = await supabaseAdmin
    .from("Request")
    .select("*", { count: "exact", head: true });

  const { count: pendingRequests } = await supabaseAdmin
    .from("Request")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  const { count: confirmedRequests } = await supabaseAdmin
    .from("Request")
    .select("*", { count: "exact", head: true })
    .eq("status", "confirmed");

  const { count: completedRequests } = await supabaseAdmin
    .from("Request")
    .select("*", { count: "exact", head: true })
    .eq("status", "completed");

  // Fetch recent requests
  const { data: recentRequests } = await supabaseAdmin
    .from("Request")
    .select("*")
    .order("createdAt", { ascending: false })
    .limit(5);

  // Fetch B2B statistics
  const { count: totalB2BOrders } = await supabaseAdmin
    .from("b2b_orders")
    .select("*", { count: "exact", head: true });

  const { count: pendingB2BOrders } = await supabaseAdmin
    .from("b2b_orders")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  const { count: confirmedB2BOrders } = await supabaseAdmin
    .from("b2b_orders")
    .select("*", { count: "exact", head: true })
    .in("status", ["confirmed", "processing"]);

  const { count: shippedB2BOrders } = await supabaseAdmin
    .from("b2b_orders")
    .select("*", { count: "exact", head: true })
    .in("status", ["shipped", "delivered"]);

  const { count: totalB2BCompanies } = await supabaseAdmin
    .from("b2b_companies")
    .select("*", { count: "exact", head: true })
    .eq("status", "approved");

  // Fetch recent B2B orders
  const { data: recentB2BOrders } = await supabaseAdmin
    .from("b2b_orders")
    .select(`
      *,
      company:b2b_companies(company_name, email)
    `)
    .order("created_at", { ascending: false })
    .limit(5);

  const categoryLabels: Record<string, string> = {
    "ryazan-tsvyat": "Отрязан цвят",
    "saksiyni-rasteniya": "Саксийни растения",
    "sezonni-tsvetya": "Сезонни цветя",
    "hrasti-darveta": "Храсти и дървета",
  };

  const productStatCards = [
    {
      title: "Общо Продукти",
      value: totalProducts || 0,
      icon: Package,
      description: "Активни артикула в каталога",
      gradient: "from-blue-500 to-blue-600",
      bg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Налични",
      value: inStockCount || 0,
      icon: TrendingUp,
      description: "Готови за продажба",
      gradient: "from-emerald-500 to-green-600",
      bg: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Изчерпани",
      value: outOfStockCount || 0,
      icon: AlertCircle,
      description: "Изискват зареждане",
      gradient: "from-rose-500 to-red-600",
      bg: "bg-rose-50 text-rose-600",
    },
    {
      title: "На фокус",
      value: featuredCount || 0,
      icon: Star,
      description: "Продукти на начална страница",
      gradient: "from-amber-500 to-orange-600",
      bg: "bg-amber-50 text-amber-600",
    },
  ];

  const requestStatCards = [
    {
      title: "Всички Заявки",
      value: totalRequests || 0,
      icon: ClipboardList,
      description: "Общо регистрирани",
      bg: "bg-purple-50 text-purple-600",
    },
    {
      title: "Чакащи",
      value: pendingRequests || 0,
      icon: Clock,
      description: "Изискват потвърждение",
      bg: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Потвърдени",
      value: confirmedRequests || 0,
      icon: CheckCircle,
      description: "В процес на изпълнение",
      bg: "bg-blue-50 text-blue-600",
    },
    {
      title: "Доставени",
      value: completedRequests || 0,
      icon: Truck,
      description: "Успешно завършени",
      bg: "bg-green-50 text-green-600",
    },
  ];

  const b2bStatCards = [
    {
      title: "B2B Заявки",
      value: totalB2BOrders || 0,
      icon: ShoppingBag,
      description: "Общо B2B поръчки",
      bg: "bg-indigo-50 text-indigo-600",
      href: "/admin/b2b/orders",
    },
    {
      title: "Чакащи",
      value: pendingB2BOrders || 0,
      icon: Clock,
      description: "Нуждаят се от потвърждение",
      bg: "bg-yellow-50 text-yellow-600",
      href: "/admin/b2b/orders",
    },
    {
      title: "В обработка",
      value: confirmedB2BOrders || 0,
      icon: Package,
      description: "Активни поръчки",
      bg: "bg-blue-50 text-blue-600",
      href: "/admin/b2b/orders",
    },
    {
      title: "B2B Партньори",
      value: totalB2BCompanies || 0,
      icon: Building2,
      description: "Одобрени компании",
      bg: "bg-emerald-50 text-emerald-600",
      href: "/admin/b2b",
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      {/* Header - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">
            Здравейте! 👋
          </h1>
          <p className="text-gray-500 text-sm md:text-base mt-1">
            Ето какво се случва в магазина днес.
          </p>
        </div>
        <Link href="/admin/products/new" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto rounded-full shadow-lg shadow-green-900/20 hover:shadow-xl text-sm md:text-base py-2.5 md:py-2">
            <Plus className="w-4 h-4 mr-2" />
            Добави Продукт
          </Button>
        </Link>
      </div>

      {/* Product Stats Grid - Mobile Optimized */}
      <div>
        <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2 px-1">
          <Package className="w-5 h-5 text-green-600" />
          Продукти
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {productStatCards.map((stat) => (
            <div key={stat.title} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className={`absolute top-0 right-0 p-2 md:p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
                <stat.icon className={`w-16 md:w-24 h-16 md:h-24 ${stat.bg.split(' ')[1]}`} />
              </div>

              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-4 ${stat.bg}`}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>

              <p className="text-xs md:text-sm font-medium text-gray-500 mb-0.5 md:mb-1">
                {stat.title}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                {stat.value}
              </h3>
              <p className="text-[10px] md:text-xs text-gray-400 mt-1 md:mt-2 line-clamp-1">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* B2B Stats Grid - Mobile Optimized */}
      <div>
        <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2 px-1">
          <Building2 className="w-5 h-5 text-indigo-600" />
          B2B Партньори
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {b2bStatCards.map((stat) => (
            <Link key={stat.title} href={stat.href} className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className={`absolute top-0 right-0 p-2 md:p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
                <stat.icon className={`w-16 md:w-24 h-16 md:h-24 ${stat.bg.split(' ')[1]}`} />
              </div>

              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center mb-2 md:mb-4 ${stat.bg}`}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>

              <p className="text-xs md:text-sm font-medium text-gray-500 mb-0.5 md:mb-1">
                {stat.title}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                {stat.value}
              </h3>
              <p className="text-[10px] md:text-xs text-gray-400 mt-1 md:mt-2 line-clamp-1">
                {stat.description}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 md:gap-8">
        {/* Recent Products - Mobile Optimized */}
        <div className="lg:col-span-2 bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-base md:text-lg text-gray-900 flex items-center gap-2">
                <Leaf className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                Последно добавени
              </h2>
              <Link
                href="/admin/products"
                className="text-xs md:text-sm font-medium text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 px-2 md:px-3 py-1 rounded-full transition-colors flex items-center gap-1"
              >
                Виж всички
                <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
              </Link>
            </div>

            <div className="p-2">
              {!recentProducts || recentProducts.length === 0 ? (
                <div className="text-center py-8 md:py-12">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <Package className="w-6 h-6 md:w-8 md:h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-500 text-sm md:text-base">Няма добавени продукти</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {recentProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/admin/products/${product.id}/edit`}
                      className="flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-gray-50 transition-all group"
                    >
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gray-100 overflow-hidden relative border border-gray-200 flex-shrink-0">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <Leaf className="w-5 h-5 md:w-6 md:h-6" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm md:text-base text-gray-900 truncate group-hover:text-[var(--color-primary)] transition-colors">
                          {product.name}
                        </p>
                        <p className="text-xs md:text-sm text-gray-500 truncate">
                          {categoryLabels[product.category] || product.category}
                        </p>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-sm md:text-base text-gray-900">
                          {product.price.toFixed(2)} лв.
                        </p>
                        <span className={`inline-block px-1.5 md:px-2 py-0.5 rounded text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${
                           product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                           {product.inStock ? "Наличен" : "Изчерпан"}
                        </span>
                      </div>

                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[var(--color-primary)] hidden md:block opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
        </div>

        {/* Category Distribution - Mobile Optimized */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-fit">
          <div className="p-4 md:p-6 border-b border-gray-100">
            <h2 className="font-bold text-base md:text-lg text-gray-900">
              Разпределение
            </h2>
          </div>
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {Object.keys(categoryStats).length === 0 ? (
                <p className="text-gray-500 text-center text-sm">Няма данни</p>
              ) : (
                Object.entries(categoryStats).sort((a,b) => b[1] - a[1]).map(([category, count]) => {
                  const percentage = Math.round(
                    ((count as number) / (totalProducts || 1)) * 100
                  );
                  return (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-1.5 md:mb-2">
                        <span className="text-xs md:text-sm font-medium text-gray-700">
                          {categoryLabels[category] || category}
                        </span>
                        <span className="text-[10px] md:text-xs font-bold text-gray-500 bg-gray-100 px-1.5 md:px-2 py-0.5 md:py-1 rounded-md">
                          {count as number}
                        </span>
                      </div>
                      <div className="h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--color-secondary)] rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })
              )}

              <div className="pt-3 md:pt-4 border-t border-gray-100">
                 <Link href="/admin/products" className="block w-full text-center text-xs md:text-sm font-medium text-[var(--color-primary)] hover:underline">
                    Управление на категориите
                 </Link>
              </div>
          </div>
        </div>
      </div>

      {/* Recent B2B Orders - Mobile Optimized */}
      <div className="bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-base md:text-lg text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" />
            Последни B2B заявки
          </h2>
          <Link
            href="/admin/b2b/orders"
            className="text-xs md:text-sm font-medium text-indigo-600 hover:bg-indigo-50 px-2 md:px-3 py-1 rounded-full transition-colors flex items-center gap-1"
          >
            Виж всички
            <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
          </Link>
        </div>

        <div className="p-2">
          {!recentB2BOrders || recentB2BOrders.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <ShoppingBag className="w-6 h-6 md:w-8 md:h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 text-sm md:text-base">Няма B2B заявки</p>
              <Link href="/admin/b2b" className="text-indigo-600 hover:underline text-xs md:text-sm mt-2 inline-block">
                Управление на B2B партньори
              </Link>
            </div>
          ) : (
            <div className="space-y-1">
              {recentB2BOrders.map((order: any) => {
                const statusStyles: Record<string, string> = {
                  pending: "bg-yellow-100 text-yellow-700",
                  confirmed: "bg-blue-100 text-blue-700",
                  processing: "bg-purple-100 text-purple-700",
                  shipped: "bg-indigo-100 text-indigo-700",
                  delivered: "bg-green-100 text-green-700",
                  cancelled: "bg-red-100 text-red-700",
                };
                const statusLabels: Record<string, string> = {
                  pending: "Чакаща",
                  confirmed: "Потвърдена",
                  processing: "Обработка",
                  shipped: "Изпратена",
                  delivered: "Доставена",
                  cancelled: "Отказана",
                };
                return (
                  <Link
                    key={order.id}
                    href={`/admin/b2b/orders/${order.id}`}
                    className="flex items-center gap-3 md:gap-4 p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-gray-50 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                      <ShoppingBag className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm md:text-base text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                        {order.company?.company_name || "Неизвестна компания"}
                      </p>
                      <p className="text-xs md:text-sm text-gray-500 truncate">
                        {order.order_number}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-sm md:text-base text-gray-900">
                        {order.total_amount?.toFixed(2)} лв
                      </p>
                      <span className={`inline-block px-1.5 md:px-2 py-0.5 rounded text-[9px] md:text-[10px] font-bold uppercase tracking-wider ${statusStyles[order.status] || statusStyles.pending}`}>
                        {statusLabels[order.status] || "Чакаща"}
                      </span>
                    </div>

                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-600 hidden md:block opacity-0 group-hover:opacity-100 transition-all" />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}