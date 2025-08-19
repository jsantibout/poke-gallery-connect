import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExternalLink, Key, Shield, CheckCircle } from 'lucide-react';

interface TCGPlayerConfig {
  publicApiKey?: string;
  privateApiKey?: string;
  affiliateId?: string;
}

export const TCGPlayerIntegration = () => {
  const [config, setConfig] = useState<TCGPlayerConfig>({});
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    // Check if TCGPlayer integration is configured
    const storedConfig = localStorage.getItem('tcgplayer-config');
    if (storedConfig) {
      const parsed = JSON.parse(storedConfig);
      setConfig(parsed);
      setIsConfigured(!!parsed.affiliateId);
    }
  }, []);

  const handleConfigSave = () => {
    localStorage.setItem('tcgplayer-config', JSON.stringify(config));
    setIsConfigured(!!config.affiliateId);
  };

  const generateAffiliateUrl = (cardName: string, setCode: string, cardNumber: string) => {
    if (!config.affiliateId) {
      return `https://www.tcgplayer.com/search/pokemon/${setCode}?q=${encodeURIComponent(cardName)}`;
    }
    
    // Generate affiliate URL with proper tracking
    const baseUrl = 'https://tcgplayer.pxf.io';
    const productPath = `${setCode}-${cardNumber}-${cardName.toLowerCase().replace(/\s+/g, '-')}`;
    return `${baseUrl}/${config.affiliateId}/${productPath}`;
  };

  if (!isConfigured) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            TCGPlayer Integration Setup
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Shield className="w-4 h-4" />
            <AlertDescription>
              To enable affiliate purchasing, configure your TCGPlayer API credentials and affiliate ID.
              This allows users to purchase cards through your affiliate links.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <Label htmlFor="affiliateId">Affiliate ID (Required for earnings)</Label>
              <Input
                id="affiliateId"
                placeholder="Your TCGPlayer affiliate ID"
                value={config.affiliateId || ''}
                onChange={(e) => setConfig({ ...config, affiliateId: e.target.value })}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Get your affiliate ID from the TCGPlayer affiliate program
              </p>
            </div>

            <div>
              <Label htmlFor="publicKey">Public API Key (Optional)</Label>
              <Input
                id="publicKey"
                placeholder="Your TCGPlayer public API key"
                value={config.publicApiKey || ''}
                onChange={(e) => setConfig({ ...config, publicApiKey: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="privateKey">Private API Key (Optional)</Label>
              <Input
                id="privateKey"
                type="password"
                placeholder="Your TCGPlayer private API key"
                value={config.privateApiKey || ''}
                onChange={(e) => setConfig({ ...config, privateApiKey: e.target.value })}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Private keys are stored locally and never transmitted
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Button onClick={handleConfigSave} disabled={!config.affiliateId}>
              Save Configuration
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.open('https://docs.tcgplayer.com/reference/app_authorizeapplication', '_blank')}
            >
              <ExternalLink className="w-4 h-4" />
              API Documentation
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-success">
          <CheckCircle className="w-5 h-5" />
          TCGPlayer Integration Active
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <CheckCircle className="w-4 h-4" />
          <AlertDescription>
            Your TCGPlayer affiliate integration is configured and ready! 
            All purchase links will include your affiliate tracking.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <p className="text-sm font-medium">Affiliate ID: {config.affiliateId}</p>
          <p className="text-sm text-muted-foreground">
            API Integration: {config.publicApiKey ? 'Configured' : 'Basic mode'}
          </p>
        </div>

        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => {
              setIsConfigured(false);
              setConfig({});
              localStorage.removeItem('tcgplayer-config');
            }}
          >
            Reconfigure
          </Button>
          <Button 
            variant="outline"
            onClick={() => window.open('https://affiliate.tcgplayer.com', '_blank')}
          >
            <ExternalLink className="w-4 h-4" />
            Affiliate Dashboard
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Utility function to generate affiliate URLs
export const generateTCGPlayerUrl = (cardName: string, setCode: string, cardNumber: string) => {
  const storedConfig = localStorage.getItem('tcgplayer-config');
  let affiliateId = '';
  
  if (storedConfig) {
    const config = JSON.parse(storedConfig);
    affiliateId = config.affiliateId || '';
  }

  if (!affiliateId) {
    return `https://www.tcgplayer.com/search/pokemon/${setCode}?q=${encodeURIComponent(cardName)}`;
  }
  
  // Generate affiliate URL with proper tracking
  const baseUrl = 'https://tcgplayer.pxf.io';
  const productPath = `${setCode}-${cardNumber}-${cardName.toLowerCase().replace(/\s+/g, '-')}`;
  return `${baseUrl}/${affiliateId}/${productPath}`;
};