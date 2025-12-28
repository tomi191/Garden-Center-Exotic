"use client";

import { B2BSessionProvider } from "@/components/providers/B2BSessionProvider";

export default function B2BLayout({ children }: { children: React.ReactNode }) {
  return (
    <B2BSessionProvider>
      {children}
    </B2BSessionProvider>
  );
}
