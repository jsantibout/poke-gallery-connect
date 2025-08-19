import { PokemonCard } from "./PokemonCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Sparkles } from "lucide-react";

interface PokemonCardData {
  id: number;
  name: string;
  set: string;
  number: string;
  imageUrl: string;
  tcgplayerUrl: string;
  position: { row: number; col: number };
}

const connectedArtCards: PokemonCardData[] = [
  {
    id: 1,
    name: "Dudunsparce",
    set: "Temporal Forces",
    number: "129",
    imageUrl: "https://images.pokemontcg.io/sv5/129_hires.png",
    tcgplayerUrl: "https://tcgplayer.pxf.io/dudunsparce-sv5-129",
    position: { row: 1, col: 1 }
  },
  {
    id: 2,
    name: "Torkoal",
    set: "Twilight Masquerade",
    number: "30",
    imageUrl: "https://images.pokemontcg.io/sv6/30_hires.png",
    tcgplayerUrl: "https://tcgplayer.pxf.io/torkoal-sv6-30",
    position: { row: 1, col: 2 }
  },
  {
    id: 3,
    name: "Wattrel",
    set: "Twilight Masquerade",
    number: "75",
    imageUrl: "https://images.pokemontcg.io/sv6/75_hires.png",
    tcgplayerUrl: "https://tcgplayer.pxf.io/wattrel-sv6-75",
    position: { row: 1, col: 3 }
  },
  {
    id: 4,
    name: "Golbat",
    set: "Shrouded Fable",
    number: "28",
    imageUrl: "https://images.pokemontcg.io/sv6pt5/28_hires.png",
    tcgplayerUrl: "https://tcgplayer.pxf.io/golbat-sv6pt5-28",
    position: { row: 2, col: 1 }
  },
  {
    id: 5,
    name: "Slowpoke",
    set: "Stellar Crown",
    number: "57",
    imageUrl: "https://images.pokemontcg.io/sv7/57_hires.png",
    tcgplayerUrl: "https://tcgplayer.pxf.io/slowpoke-sv7-57",
    position: { row: 2, col: 2 }
  },
  {
    id: 6,
    name: "Passimian",
    set: "Surging Sparks",
    number: "TBA",
    imageUrl: "/placeholder-passimian.jpg",
    tcgplayerUrl: "https://tcgplayer.pxf.io/passimian-surging-sparks",
    position: { row: 2, col: 3 }
  },
  {
    id: 7,
    name: "Vibrava",
    set: "Surging Sparks",
    number: "TBA",
    imageUrl: "/placeholder-vibrava.jpg",
    tcgplayerUrl: "https://tcgplayer.pxf.io/vibrava-surging-sparks",
    position: { row: 3, col: 1 }
  },
  {
    id: 8,
    name: "Togetic",
    set: "Surging Sparks",
    number: "TBA",
    imageUrl: "/placeholder-togetic.jpg",
    tcgplayerUrl: "https://tcgplayer.pxf.io/togetic-surging-sparks",
    position: { row: 3, col: 2 }
  },
  {
    id: 9,
    name: "Spheal",
    set: "Surging Sparks",
    number: "TBA",
    imageUrl: "/placeholder-spheal.jpg",
    tcgplayerUrl: "https://tcgplayer.pxf.io/spheal-surging-sparks",
    position: { row: 3, col: 3 }
  }
];

interface ConnectedArtGridProps {
  onCardPurchase: (card: PokemonCardData) => void;
}

export const ConnectedArtGrid = ({ onCardPurchase }: ConnectedArtGridProps) => {
  const handleBuyAll = () => {
    // Open TCGPlayer with all cards in affiliate link
    const affiliateUrl = "https://tcgplayer.pxf.io/teeziro-connected-art-2024";
    window.open(affiliateUrl, '_blank');
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-primary animate-float" />
          <Badge variant="outline" className="bg-gradient-warm text-foreground font-light px-4 py-2 border-primary/20">
            2024 Connected Art Series
          </Badge>
          <Sparkles className="w-6 h-6 text-primary animate-float" style={{ animationDelay: '1s' }} />
        </div>
        
        <h1 className="text-5xl font-semibold text-foreground mb-4 tracking-tight">
          Pallet Town Card Collection
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Discover Teeziro's peaceful 9-card masterpiece inspired by the nostalgic charm 
          of hometown adventures. Each card connects to create a beautiful memory!
        </p>

        <div className="flex items-center justify-center gap-4 mt-6">
          <Button 
            variant="nostalgic" 
            size="lg" 
            onClick={handleBuyAll}
            className="text-lg px-8 py-4"
          >
            <ShoppingCart className="w-5 h-5" />
            Complete Collection
          </Button>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span>Collector's Edition</span>
          </div>
        </div>
      </div>

      {/* Connected Art Grid */}
      <Card className="bg-gradient-peaceful border-2 border-primary/20 shadow-glow">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-card-foreground flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            Complete Hometown Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div 
            className="grid grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto"
            style={{
              aspectRatio: '3/3'
            }}
          >
            {connectedArtCards.map((card) => (
              <PokemonCard
                key={card.id}
                card={card}
                onBuyClick={onCardPurchase}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Each card tells a story that connects to create one beautiful hometown memory
            </p>
            <Button 
              variant="ocean" 
              size="lg"
              onClick={handleBuyAll}
            >
              <ShoppingCart className="w-5 h-5" />
              Start Your Journey
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Individual Cards Section */}
      <Card className="bg-card border border-border">
        <CardHeader>
          <CardTitle className="text-xl text-card-foreground">Individual Card Collection</CardTitle>
          <p className="text-muted-foreground">
            Browse and purchase individual cards from the connected art series
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectedArtCards.map((card) => (
              <PokemonCard
                key={`individual-${card.id}`}
                card={card}
                onBuyClick={onCardPurchase}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};