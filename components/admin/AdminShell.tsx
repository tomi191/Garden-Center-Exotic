"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { BottomNav } from "./BottomNav";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav";

interface AdminShellProps {
  user: { name?: string | null; email?: string | null };
  children: React.ReactNode;
}

function ShellInner({ user, children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newMessages, setNewMessages] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();

  const currentPage = ADMIN_NAV_ITEMS.find(
    (item) => item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href)
  );

  useEffect(() => {
    fetch("/api/admin/messages?status=new")
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setNewMessages(data.length); })
      .catch(() => {});
  }, []);

  useEffect(() => { setProfileOpen(false); }, [pathname]);

  return (
    <div data-admin className="min-h-screen bg-[#f0f0f0]">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-72 min-h-screen flex flex-col pb-[52px] lg:pb-0">
        {/* Compact native-style header */}
        <header className="sticky top-0 z-40 bg-[#1a1a1a] text-white">
          <div className="flex items-center justify-between h-[44px] px-3">
            <div className="flex items-center gap-2 min-w-0">
              {currentPage && (
                <currentPage.icon className="w-3.5 h-3.5 text-white/50 flex-shrink-0" />
              )}
              <span className="text-sm font-medium truncate">
                {currentPage?.title || "Admin"}
              </span>
            </div>

            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/80 hover:bg-white/20 transition-colors"
              >
                {(user.name?.[0] || user.email?.[0] || "A").toUpperCase()}
              </button>
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 mt-1 w-48 bg-[#2a2a2a] rounded-lg shadow-xl border border-white/10 py-1 z-50">
                    <div className="px-3 py-2 border-b border-white/10">
                      <p className="text-xs font-medium text-white/90 truncate">{user.name || "Admin"}</p>
                      <p className="text-[10px] text-white/40 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/admin/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-white/70 hover:bg-white/5"
                    >
                      <User className="w-3 h-3" /> Профил
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/admin/login" })}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-white/5"
                    >
                      <LogOut className="w-3 h-3" /> Изход
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-2 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      <BottomNav newMessages={newMessages} />
    </div>
  );
}

export function AdminShell({ user, children }: AdminShellProps) {
  return (
    <SessionProvider>
      <ShellInner user={user} children={children} />
    </SessionProvider>
  );
}
