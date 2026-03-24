"use client";

import { signOut } from "next-auth/react";
import { LogOut, User, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav";

interface AdminHeaderProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Find current page title
  const currentPage = ADMIN_NAV_ITEMS.find(
    (item) => item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between h-11 md:h-14 px-3 md:px-8">
        {/* Left: page title */}
        <div className="flex items-center gap-2">
          {currentPage && (
            <>
              <currentPage.icon className="w-4 h-4 text-[var(--color-primary)] hidden sm:block" />
              <h1 className="text-sm font-semibold text-gray-800">{currentPage.title}</h1>
            </>
          )}
        </div>

        {/* Right: profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] flex items-center justify-center text-white font-bold text-xs">
              {(user.name?.[0] || user.email?.[0] || "A").toUpperCase()}
            </div>
            <span className="hidden sm:block text-xs font-medium text-gray-600 max-w-[100px] truncate">
              {user.name || user.email?.split("@")[0]}
            </span>
            <ChevronDown className="w-3 h-3 text-gray-400 hidden sm:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 animate-in fade-in slide-in-from-top-2 z-50">
              <div className="px-3 py-2 border-b border-gray-50">
                <p className="text-xs font-semibold text-gray-900 truncate">{user.name || "Admin"}</p>
                <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
              </div>
              <Link
                href="/admin/profile"
                onClick={() => setProfileOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-gray-400" />
                Профил и парола
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/admin/login" })}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Изход
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
