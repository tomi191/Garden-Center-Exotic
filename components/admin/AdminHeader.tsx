"use client";

import { signOut } from "next-auth/react";
import {
  LogOut,
  Menu,
  X,
  Bell,
  LayoutDashboard,
  ClipboardList,
  Warehouse,
  Package,
  PlusCircle,
  Sparkles,
  Settings,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface AdminHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

const navItems = [
  { title: "Табло", href: "/admin", icon: LayoutDashboard },
  { title: "Заявки", href: "/admin/requests", icon: ClipboardList },
  { title: "Склад", href: "/admin/stock", icon: Warehouse },
  { title: "Продукти", href: "/admin/products", icon: Package },
  { title: "Добави Продукт", href: "/admin/products/new", icon: PlusCircle },
  { title: "AI Блог", href: "/admin/blog-post-generator", icon: Sparkles },
  { title: "Настройки", href: "/admin/settings", icon: Settings },
];

export function AdminHeader({ user }: AdminHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 h-16">
      <div className="flex items-center justify-between h-full px-4 md:px-8">
        
        {/* Mobile Toggle & Breadcrumb Placeholder */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <h2 className="text-sm font-medium text-gray-500 hidden sm:block">
            Добре дошли, <span className="text-gray-900 font-bold">{user.name || user.email?.split('@')[0]}</span>
          </h2>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="h-8 w-px bg-gray-200 mx-2 hidden sm:block" />

          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-bold text-sm">
                {(user.email?.[0] || "U").toUpperCase()}
             </div>
             <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="text-gray-500 hover:text-red-600 hover:bg-red-50"
             >
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Изход</span>
             </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-xl animate-in slide-in-from-top-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-[var(--color-primary)]" : "text-gray-400")} />
                  {item.title}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="h-px bg-gray-200 my-3" />

            {/* External link to site */}
            <Link
              href="/"
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-gray-400" />
              Към сайта
            </Link>

            {/* Logout */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                signOut({ callbackUrl: "/admin/login" });
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Изход
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}