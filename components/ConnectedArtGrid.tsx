// components/ConnectedArtGrid.tsx (refactor)
"use client"

import { PokemonCard } from "./PokemonCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Sparkles } from "lucide-react";

export interface PokemonCardData {
  id: number;
  name: string;
  set: string;        // map from set_name
  number: string;
  imageUrl: string;   // map from image_url
  tcgplayerUrl: string;
  position: { row: number; col: number }; // map from position_row/col
}

type Props = {
  cards: PokemonCardData[];
  buyAllUrl?: string;
  onCardPurchase?: (card: PokemonCardData) => void;
};


interface ConnectedArtGridProps {
  cards: PokemonCardData[];
  onCardPurchase: (card: PokemonCardData) => void;
  buyAllUrl?: string; // configurable
}

export function ConnectedArtGrid({ cards, onCardPurchase, buyAllUrl }: ConnectedArtGridProps) {
  const handleBuyAll = () => {
    if (!buyAllUrl) return;
    window.open(buyAllUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-primary animate-float" />
          <Badge variant="outline" className="bg-gradient-warm text-foreground font-light px-4 py-2 border-primary/20">
            2025 Connected Art Series
          </Badge>
          <Sparkles className="w-6 h-6 text-primary animate-float" style={{ animationDelay: "1s" }} />
        </div>

        <h1 className="text-5xl font-semibold text-foreground mb-4 tracking-tight">
          Tezziro Card Collection
        </h1>

        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Discover Teeziro&apos;s peaceful 9-card masterpiece. Each card connects to create one beautiful piece of art!
        </p>

        <div className="flex items-center justify-center gap-4 mt-6">
          {buyAllUrl && (
            <Button variant="nostalgic" size="lg" onClick={handleBuyAll} className="text-lg px-8 py-4">
              <ShoppingCart className="w-5 h-5" />
              Complete Collection
            </Button>
          )}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span>Collector&apos;s Edition</span>
          </div>
        </div>
      </div>

      {/* Connected Art Grid */}
      <Card className="bg-gradient-peaceful border-2 border-primary/20 shadow-glow">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-card-foreground flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Complete the Masterpiece!
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto" style={{ aspectRatio: "3/3" }}>
            {cards.map((card) => (
              <PokemonCard key={card.id} card={card} onBuyClick={onCardPurchase} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Each card tells a story that connects to create one beautiful art piece.
            </p>
            {buyAllUrl && (
              <Button variant="ocean" size="lg" onClick={handleBuyAll}>
                <ShoppingCart className="w-5 h-5" />
                Start Your Journey
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Individual Cards Section */}
      <Card className="bg-card border border-border">
        <CardHeader>
          <CardTitle className="text-xl text-card-foreground">Individual Card Collection</CardTitle>
          <p className="text-muted-foreground">Browse and purchase individual cards from the connected art series</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <PokemonCard key={`individual-${card.id}`} card={card} onBuyClick={onCardPurchase} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
