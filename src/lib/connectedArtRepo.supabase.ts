// lib/connectedArtRepo.supabase.ts (server only)
import "server-only";
import { createClient } from "@supabase/supabase-js";

export type ConnectedArtCard = {
  id: number;
  name: string;
  set_name: string;
  number: string;
  image_url: string;
  tcgplayer_url: string | null;
  position_row: number;
  position_col: number;
  is_active: boolean;
};

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function listConnectedArtCards({ activeOnly = true, limit = 50, offset = 0 } = {}) {
  let q = supabase
    .from("connected_art_cards")
    .select("*")
    .order("position_row", { ascending: true })
    .order("position_col", { ascending: true })
    .range(offset, offset + limit - 1);

  if (activeOnly) q = q.eq("is_active", true);

  const { data, error } = await q;
  if (error) throw error;
  return data as ConnectedArtCard[];
}
