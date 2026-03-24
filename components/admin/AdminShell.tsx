"use client";

import { useState, useEffect } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { BottomNav } from "./BottomNav";
import { SessionProvider } from "next-auth/react";

interface AdminShellProps {
  user: {
    name?: string | null;
    email?: string | null;
  };
  children: React.ReactNode;
}

export function AdminShell({ user, children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newMessages, setNewMessages] = useState(0);

  useEffect(() => {
    fetch("/api/admin/messages?status=new")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setNewMessages(data.length);
      })
      .catch(() => {});
  }, []);

  return (
    <SessionProvider>
      <div className="min-h-screen bg-[#F5F6F8]">
        {/* Desktop sidebar */}
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="lg:pl-72 min-h-screen flex flex-col pb-[60px] lg:pb-0">
          <AdminHeader user={user} />
          <main className="flex-1 p-3 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>

        {/* Mobile bottom tab bar */}
        <BottomNav newMessages={newMessages} />
      </div>
    </SessionProvider>
  );
}
