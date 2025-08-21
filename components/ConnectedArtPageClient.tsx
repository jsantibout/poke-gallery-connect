'use client'

import { ConnectedArtGrid, type PokemonCardData } from "@/components/ConnectedArtGrid";

interface ConnectedArtPageClientProps {
  cards: PokemonCardData[];
  buyAllUrl?: string;
}

export default function ConnectedArtPageClient({ cards, buyAllUrl }: ConnectedArtPageClientProps) {
  const handleCardPurchase = (card: PokemonCardData) => {
    if (card.tcgplayerUrl) {
      window.open(card.tcgplayerUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <ConnectedArtGrid
      cards={cards}
      buyAllUrl={buyAllUrl}
      onCardPurchase={handleCardPurchase}
    />
  );
}
