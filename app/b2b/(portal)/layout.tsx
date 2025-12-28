"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard, Package, ShoppingCart, User, LogOut, Menu, X, ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
const navItems = [
  { title: "Каталог", href: "/b2b/katalog", icon: Package },
  { title: "Моите заявки", href: "/b2b/zayavki", icon: ShoppingCart },
];

function B2BPortalContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Redirect if not authenticated or not B2B user
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/b2b/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-light)]">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[var(--color-gray-600)]">Зареждане...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  const user = session?.user as { name?: string; email?: string; tier?: string; discount_percent?: number };

  return (
    <div className="min-h-screen bg-[var(--color-light)]">
      {/* Header */}
      <header className="bg-white border-b border-[var(--color-border)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/b2b/katalog" className="flex items-center gap-3">
              <div className="relative w-[120px] h-[40px]">
                <Image
                  src="/images/logos/Logo print file.png"
                  alt="Exotic Flowers"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="hidden sm:inline-flex items-center px-2 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full text-xs font-semibold">
                B2B
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                        : "text-[var(--color-gray-600)] hover:bg-gray-100"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.title}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Discount Badge */}
              {user?.discount_percent && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  <span>-{user.discount_percent}%</span>
                </div>
              )}

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-[var(--color-primary-light)] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-[var(--color-primary)]" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium max-w-[150px] truncate">
                    {user?.name}
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[var(--color-border)] py-2 z-20">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        {user?.tier && (
                          <span className={cn(
                            "inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium",
                            user.tier === "platinum" ? "bg-purple-100 text-purple-700" :
                            user.tier === "gold" ? "bg-yellow-100 text-yellow-700" :
                            "bg-gray-100 text-gray-700"
                          )}>
                            {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)}
                          </span>
                        )}
                      </div>
                      <Link
                        href="/"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Към сайта
                      </Link>
                      <button
                        onClick={() => signOut({ callbackUrl: "/b2b/login" })}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Изход
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--color-border)] bg-white">
            <nav className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium",
                      isActive
                        ? "bg-[var(--color-primary-light)] text-[var(--color-primary)]"
                        : "text-[var(--color-gray-600)]"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}

export default function B2BPortalLayout({ children }: { children: React.ReactNode }) {
  return <B2BPortalContent>{children}</B2BPortalContent>;
}
