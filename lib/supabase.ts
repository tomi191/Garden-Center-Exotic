import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy initialization to prevent build-time errors when env vars are not available
let _supabase: SupabaseClient | null = null;
let _supabaseAdmin: SupabaseClient | null = null;

const getSupabaseUrl = () => process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const getSupabaseAnonKey = () => process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const getSupabaseServiceKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;

// Public client for client-side operations (lazy initialization)
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!_supabase) {
      const url = getSupabaseUrl();
      const key = getSupabaseAnonKey();
      if (!url || !key) {
        throw new Error("Supabase credentials not configured");
      }
      _supabase = createClient(url, key);
    }
    return (_supabase as unknown as Record<string, unknown>)[prop as string];
  },
});

// Server client with service role for admin operations (lazy initialization)
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!_supabaseAdmin) {
      const url = getSupabaseUrl();
      const serviceKey = getSupabaseServiceKey();
      const anonKey = getSupabaseAnonKey();

      if (!url) {
        throw new Error("Supabase URL not configured");
      }

      _supabaseAdmin = serviceKey
        ? createClient(url, serviceKey)
        : createClient(url, anonKey);
    }
    return (_supabaseAdmin as unknown as Record<string, unknown>)[prop as string];
  },
});

export default supabase;
