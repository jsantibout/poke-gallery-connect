// lib/connectedArtRepo.ts (server-only)
import "server-only";
import { supabase } from "./supabase-server";

export type ConnectedArtRow = {
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

export async function listConnectedArtCards(opts?: {
  activeOnly?: boolean;
  limit?: number;
  offset?: number;
}) {
  const { activeOnly = true, limit = 50, offset = 0 } = opts ?? {};
  let q = supabase
    .from("connected_art_cards")
    .select(
      "id,name,set_name,number,image_url,tcgplayer_url,position_row,position_col,is_active"
    )
    .order("position_row", { ascending: true })
    .order("position_col", { ascending: true })
    .range(offset, offset + limit - 1);

  if (activeOnly) q = q.eq("is_active", true);

  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as ConnectedArtRow[];
}

// Optional: keep this as config or move to a small settings table later
export async function getBuyAllUrl() {
  return "/api/affiliate/connected-art-complete";
}
