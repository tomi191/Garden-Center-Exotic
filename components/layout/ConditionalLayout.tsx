"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // B2B portal routes have their own header/footer
  const isB2BPortalRoute = pathname?.startsWith("/b2b") &&
    !pathname?.includes("/login") &&
    !pathname?.includes("/register");

  if (isAdminRoute || isB2BPortalRoute) {
    // Admin and B2B portal routes - no main header/footer (they have their own)
    return <>{children}</>;
  }

  // Public routes - with header/footer
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
