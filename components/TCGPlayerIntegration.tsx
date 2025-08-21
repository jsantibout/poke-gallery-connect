// Dummy TCGPlayer affiliate configuration
const DUMMY_CONFIG = {
  publicApiKey: 'pk_test_123456789abcdef',
  privateApiKey: 'sk_test_987654321fedcba',
  affiliateId: 'DEMO123'
};

const generateAffiliateUrl = (cardName: string, setCode: string, cardNumber: string) => {
  // Always use affiliate URL with dummy affiliate ID
  const baseUrl = 'https://tcgplayer.pxf.io';
  const productPath = `${setCode}-${cardNumber}-${cardName.toLowerCase().replace(/\s+/g, '-')}`;
  return `${baseUrl}/${DUMMY_CONFIG.affiliateId}/${productPath}`;
};

// This component is no longer needed since we use dummy affiliate values
export const TCGPlayerIntegration = () => {
  return null;
};

// Utility function to generate affiliate URLs using dummy config
export const generateTCGPlayerUrl = (cardName: string, setCode: string, cardNumber: string) => {
  // Always generate affiliate URL with dummy affiliate ID
  const baseUrl = 'https://tcgplayer.pxf.io';
  const productPath = `${setCode}-${cardNumber}-${cardName.toLowerCase().replace(/\s+/g, '-')}`;
  return `${baseUrl}/${DUMMY_CONFIG.affiliateId}/${productPath}`;
};