// app/(public)/connected-art/page.tsx
import { listConnectedArtCards, getBuyAllUrl } from "@/lib/connectArtRepo";
import { type PokemonCardData } from "@/components/ConnectedArtGrid";
import ConnectedArtPageClient from "@/components/ConnectedArtPageClient";

export const revalidate = 60; // cache the public read for 60s

export default async function ConnectedArtPage() {
  const [rows, buyAllUrl] = await Promise.all([
    listConnectedArtCards({ activeOnly: true, limit: 100 }),
    getBuyAllUrl(),
  ]);

  const cards: PokemonCardData[] = rows.map((r) => ({
    id: r.id,
    name: r.name,
    set: r.set_name,
    number: r.number,
    imageUrl: r.image_url,
    tcgplayerUrl: r.tcgplayer_url,
    position: { row: r.position_row, col: r.position_col },
  }));

  return (
    <ConnectedArtPageClient
      cards={cards}
      buyAllUrl={buyAllUrl}
    />
  );
}
