"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, Package, Truck, MoreHorizontal, X, ClipboardList, Warehouse, Building2, ShoppingBag, PlusCircle, BookOpen, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const primaryTabs = [
  { href: "/admin", icon: LayoutDashboard, label: "Табло" },
  { href: "/admin/dostavki", icon: Truck, label: "Доставки" },
  { href: "/admin/messages", icon: MessageSquare, label: "Съобщения", badge: true },
];

const moreItems = [
  { href: "/admin/products", icon: Package, label: "Продукти" },
  { href: "/admin/requests", icon: ClipboardList, label: "Заявки" },
  { href: "/admin/stock", icon: Warehouse, label: "Склад" },
  { href: "/admin/b2b", icon: Building2, label: "B2B Компании" },
  { href: "/admin/b2b/orders", icon: ShoppingBag, label: "B2B Заявки" },
  { href: "/admin/products/new", icon: PlusCircle, label: "Добави Продукт" },
  { href: "/admin/blog", icon: BookOpen, label: "Блог" },
  { href: "/admin/users", icon: Users, label: "Потребители" },
  { href: "/admin/settings", icon: Settings, label: "Настройки" },
];

export function BottomNav({ newMessages = 0 }: { newMessages?: number }) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  // Close "more" when navigating
  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const isMoreActive = moreItems.some((item) => isActive(item.href));

  return (
    <>
      {/* More menu overlay */}
      {moreOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMoreOpen(false)} />
          <div className="absolute bottom-[60px] left-2 right-2 bg-white rounded-2xl shadow-2xl border border-gray-200 p-2 animate-in slide-in-from-bottom-4 fade-in duration-200">
            <div className="flex items-center justify-between px-3 py-2 mb-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Още</span>
              <button onClick={() => setMoreOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-1">
              {moreItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center gap-1 py-3 px-1 rounded-xl text-center transition-colors",
                      active
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                        : "text-gray-500 hover:bg-gray-50"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-[10px] font-medium leading-tight">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 safe-area-bottom">
        <div className="flex items-center justify-around h-[60px] px-2">
          {primaryTabs.map((tab) => {
            const active = isActive(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all min-w-[64px]",
                  active
                    ? "text-[var(--color-primary)]"
                    : "text-gray-400"
                )}
              >
                <div className="relative">
                  <tab.icon className={cn("w-5 h-5", active && "stroke-[2.5px]")} />
                  {tab.badge && newMessages > 0 && (
                    <span className="absolute -top-1 -right-2 min-w-[16px] h-4 flex items-center justify-center bg-red-500 text-white text-[9px] font-bold rounded-full px-1">
                      {newMessages > 9 ? "9+" : newMessages}
                    </span>
                  )}
                </div>
                <span className={cn("text-[10px] font-medium", active && "font-bold")}>{tab.label}</span>
                {active && <div className="w-4 h-0.5 bg-[var(--color-primary)] rounded-full" />}
              </Link>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className={cn(
              "flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all min-w-[64px]",
              moreOpen || isMoreActive
                ? "text-[var(--color-primary)]"
                : "text-gray-400"
            )}
          >
            <MoreHorizontal className={cn("w-5 h-5", (moreOpen || isMoreActive) && "stroke-[2.5px]")} />
            <span className={cn("text-[10px] font-medium", (moreOpen || isMoreActive) && "font-bold")}>Още</span>
            {(moreOpen || isMoreActive) && <div className="w-4 h-0.5 bg-[var(--color-primary)] rounded-full" />}
          </button>
        </div>
      </nav>
    </>
  );
}
