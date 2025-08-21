// lib/supabase-server.ts
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.SUPABASE_URL!,           // e.g. https://xyz.supabase.co
  process.env.SUPABASE_ANON_KEY!,      // safe for public reads under RLS
  { auth: { persistSession: false } }
);
