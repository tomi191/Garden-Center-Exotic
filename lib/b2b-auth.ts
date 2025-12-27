import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "./supabase";

export const b2bAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "b2b-credentials",
      name: "B2B Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Моля, въведете имейл и парола");
        }

        // Query B2B company from Supabase
        const { data: company, error } = await supabaseAdmin
          .from("b2b_companies")
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (error || !company) {
          throw new Error("Невалиден имейл или парола");
        }

        // Check if company is approved
        if (company.status !== "approved") {
          if (company.status === "pending") {
            throw new Error("Вашият акаунт все още не е одобрен. Моля, изчакайте.");
          }
          if (company.status === "rejected") {
            throw new Error("Вашата заявка за регистрация е отказана.");
          }
          if (company.status === "suspended") {
            throw new Error("Вашият акаунт е временно спрян. Свържете се с нас.");
          }
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          company.password_hash
        );

        if (!isPasswordValid) {
          throw new Error("Невалиден имейл или парола");
        }

        return {
          id: company.id,
          email: company.email,
          name: company.company_name,
          role: "b2b",
          tier: company.tier,
          discount_percent: company.discount_percent,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
        token.tier = (user as { tier?: string }).tier;
        token.discount_percent = (user as { discount_percent?: number }).discount_percent;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
        (session.user as { tier?: string }).tier = token.tier as string;
        (session.user as { discount_percent?: number }).discount_percent = token.discount_percent as number;
      }
      return session;
    },
  },
  pages: {
    signIn: "/b2b/login",
    error: "/b2b/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Helper to hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// Helper to verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Tier discount mapping
export const TIER_DISCOUNTS = {
  silver: 10,
  gold: 15,
  platinum: 20,
} as const;

// Tier payment terms (days)
export const TIER_PAYMENT_TERMS = {
  silver: 0,
  gold: 30,
  platinum: 60,
} as const;
