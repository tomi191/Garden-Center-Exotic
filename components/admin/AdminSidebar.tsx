"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Settings,
  Leaf,
  LogOut,
  ExternalLink,
  ClipboardList,
  Warehouse,
  Sparkles,
  Building2
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Табло",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Заявки",
    href: "/admin/requests",
    icon: ClipboardList,
  },
  {
    title: "Склад",
    href: "/admin/stock",
    icon: Warehouse,
  },
  {
    title: "B2B Компании",
    href: "/admin/b2b",
    icon: Building2,
  },
  {
    title: "Всички Продукти",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Добави Продукт",
    href: "/admin/products/new",
    icon: PlusCircle,
  },
  {
    title: "AI Блог Генератор",
    href: "/admin/blog-post-generator",
    icon: Sparkles,
  },
  {
    title: "Настройки",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-50 h-full w-72 bg-[var(--color-primary-dark)] text-white hidden lg:flex flex-col shadow-xl">
      {/* Brand */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-[var(--color-secondary)] flex items-center justify-center shadow-lg">
          <Leaf className="w-5 h-5 text-white" />
        </div>
        <div>
          <span className="block font-serif font-bold text-lg leading-none">Екзотик</span>
          <span className="text-[10px] uppercase tracking-wider text-white/50 font-medium">Admin Panel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="px-4 text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Меню</p>
        
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[var(--color-secondary)] rounded-r-full" />
              )}
              <item.icon className={cn("w-5 h-5", isActive ? "text-[var(--color-secondary)]" : "text-white/50 group-hover:text-white")} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
          Към сайта
        </Link>
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-colors"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
        >
          <LogOut className="w-5 h-5" />
          Изход
        </button>
      </div>
    </aside>
  );
}