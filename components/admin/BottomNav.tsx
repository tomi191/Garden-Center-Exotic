"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MessageSquare, Truck, MoreHorizontal, X, Package, ClipboardList, Warehouse, Building2, ShoppingBag, PlusCircle, BookOpen, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const tabs = [
  { href: "/admin", icon: LayoutDashboard, label: "Табло" },
  { href: "/admin/dostavki", icon: Truck, label: "Зареждане" },
  { href: "/admin/messages", icon: MessageSquare, label: "Поща", badge: true },
];

const moreItems = [
  { href: "/admin/products", icon: Package, label: "Продукти" },
  { href: "/admin/requests", icon: ClipboardList, label: "Заявки" },
  { href: "/admin/stock", icon: Warehouse, label: "Склад" },
  { href: "/admin/b2b", icon: Building2, label: "B2B" },
  { href: "/admin/b2b/orders", icon: ShoppingBag, label: "B2B Заявки" },
  { href: "/admin/products/new", icon: PlusCircle, label: "Нов продукт" },
  { href: "/admin/blog", icon: BookOpen, label: "Блог" },
  { href: "/admin/users", icon: Users, label: "Екип" },
  { href: "/admin/settings", icon: Settings, label: "Настройки" },
];

export function BottomNav({ newMessages = 0 }: { newMessages?: number }) {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => { setMoreOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
  const isMoreActive = moreItems.some((item) => isActive(item.href));

  return (
    <>
      {moreOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMoreOpen(false)} />
          <div className="absolute bottom-[52px] left-1 right-1 bg-[#1a1a1a] rounded-xl shadow-2xl p-1.5 animate-in slide-in-from-bottom-2 fade-in duration-150">
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-[10px] text-white/30 font-medium">Още</span>
              <button onClick={() => setMoreOpen(false)} className="p-1 hover:bg-white/10 rounded">
                <X className="w-3.5 h-3.5 text-white/40" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-0.5">
              {moreItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex flex-col items-center gap-0.5 py-2.5 px-1 rounded-lg text-center transition-colors",
                      active ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white/70"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-[10px] font-medium leading-tight">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[#1a1a1a] safe-area-bottom">
        <div className="flex items-center justify-around h-[52px]">
          {tabs.map((tab) => {
            const active = isActive(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex flex-col items-center gap-[2px] py-1 min-w-[56px] transition-colors",
                  active ? "text-white" : "text-white/35"
                )}
              >
                <div className="relative">
                  <tab.icon className={cn("w-[18px] h-[18px]", active && "stroke-[2.5px]")} />
                  {tab.badge && newMessages > 0 && (
                    <span className="absolute -top-1 -right-1.5 min-w-[14px] h-[14px] flex items-center justify-center bg-red-500 text-white text-[8px] font-bold rounded-full px-0.5">
                      {newMessages > 9 ? "9+" : newMessages}
                    </span>
                  )}
                </div>
                <span className={cn("text-[9px]", active ? "font-semibold" : "font-medium")}>{tab.label}</span>
              </Link>
            );
          })}
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className={cn(
              "flex flex-col items-center gap-[2px] py-1 min-w-[56px] transition-colors",
              moreOpen || isMoreActive ? "text-white" : "text-white/35"
            )}
          >
            <MoreHorizontal className="w-[18px] h-[18px]" />
            <span className="text-[9px] font-medium">Още</span>
          </button>
        </div>
      </nav>
    </>
  );
}
