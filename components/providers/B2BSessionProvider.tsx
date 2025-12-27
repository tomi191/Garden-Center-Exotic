"use client";

import { SessionProvider } from "next-auth/react";

export function B2BSessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider basePath="/api/b2b/auth">
      {children}
    </SessionProvider>
  );
}
