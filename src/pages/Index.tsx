import { useState } from 'react';
import { ConnectedArtGrid } from '@/components/ConnectedArtGrid';
import { TCGPlayerIntegration } from '@/components/TCGPlayerIntegration';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Sparkles, 
  Star, 
  ExternalLink,
  ShoppingCart,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PokemonCardData {
  id: number;
  name: string;
  set: string;
  number: string;
  imageUrl: string;
  tcgplayerUrl: string;
  position: { row: number; col: number };
}

const Index = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  const handleCardPurchase = (card: PokemonCardData) => {
    // Track purchase click for analytics
    console.log('Card purchase clicked:', card.name);
    
    // Generate affiliate URL and open
    const affiliateUrl = card.tcgplayerUrl;
    window.open(affiliateUrl, '_blank');
    
    toast({
      title: "Redirecting to TCGPlayer",
      description: `Opening ${card.name} on TCGPlayer marketplace`,
    });
  };

  if (showSettings) {
    return (
      <div className="min-h-screen bg-gradient-town py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => setShowSettings(false)}
              className="mb-4"
            >
              ← Back to Cards
            </Button>
          </div>
          <TCGPlayerIntegration />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-nostalgic">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-ocean rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Pallet Town Cards</h1>
                <p className="text-sm text-muted-foreground">Connected Art by Teeziro</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-gradient-coral text-secondary-foreground font-medium border-primary/20">
                <Star className="w-3 h-3 mr-1" />
                Classic 2024
              </Badge>
              <Button 
                variant="coral" 
                size="sm"
                onClick={() => setShowSettings(true)}
                className="font-medium"
              >
                <Settings className="w-4 h-4" />
                Setup
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4">
        <ConnectedArtGrid onCardPurchase={handleCardPurchase} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                About the Collection
              </h3>
              <p className="text-muted-foreground">
                This unique 9-card series by artist Teeziro creates a stunning connected 
                artwork when displayed together. Each card is part of Pokemon TCG history.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  TCGPlayer Marketplace
                </Button>
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Pokemon TCG Official
                </Button>
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Teeziro's Art
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <Card className="bg-gradient-water">
                <CardContent className="p-4">
                  <p className="text-sm text-secondary-foreground mb-3">
                    Support this site by purchasing through our affiliate links!
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Shop Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 PokéCard Showcase. Pokemon TCG cards © Nintendo/Game Freak.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
