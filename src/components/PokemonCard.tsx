import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface PokemonCardData {
  id: number;
  name: string;
  set: string;
  number: string;
  imageUrl: string;
  tcgplayerUrl: string;
  position: { row: number; col: number };
}

interface PokemonCardProps {
  card: PokemonCardData;
  onBuyClick: (card: PokemonCardData) => void;
}

export const PokemonCard = ({ card, onBuyClick }: PokemonCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Card 
      className="pokemon-card bg-card border-2 border-border shadow-card hover:shadow-hover rounded-2xl overflow-hidden group"
      style={{
        gridRow: card.position.row,
        gridColumn: card.position.col,
      }}
    >
      <CardContent className="p-0 relative">
        {/* Card Image */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 shimmer rounded-t-2xl" />
          )}
          {imageError ? (
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <div className="text-4xl mb-2">🎴</div>
                <p className="text-sm">Card Image</p>
                <p className="text-xs">{card.name}</p>
              </div>
            </div>
          ) : (
            <img
              src={card.imageUrl}
              alt={`${card.name} Pokemon card #${card.number} from ${card.set}`}
              className={`w-full h-full object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              loading="lazy"
            />
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-4">
            <Button
              variant="peaceful"
              size="sm"
              onClick={() => onBuyClick(card)}
              className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              <ShoppingCart className="w-4 h-4" />
              Buy Now
            </Button>
          </div>
        </div>

        {/* Card Info */}
        <div className="p-4" style={{background: "hsl(200 65% 55%)"}}>
          <h3 className="font-bold text-lg text-white mb-1 text-center">
            {card.name}
          </h3>
          <p className="text-sm text-white/80 text-center mb-2">
            {card.set} #{card.number}
          </p>
          
          <div className="flex gap-2">
            <Button
              variant="ocean"
              size="sm"
              className="flex-1"
              onClick={() => onBuyClick(card)}
            >
              <ShoppingCart className="w-4 h-4" />
              TCGPlayer
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(card.tcgplayerUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};