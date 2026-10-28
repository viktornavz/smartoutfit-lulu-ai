export type GarmentCategory = 'tops' | 'bottoms' | 'outerwear' | 'shoes' | 'dresses' | 'accessories' | 'bags';

export type FashionStyle = 'casual' | 'formal' | 'business_casual' | 'streetwear' | 'athleisure' | 'boho' | 'minimalist' | 'cocktail';

export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'all_season';

export type Occasion = 'everyday' | 'office' | 'date_night' | 'cocktail_party' | 'wedding_guest' | 'weekend_brunch' | 'travel' | 'rainy_day';

export interface WardrobeItem {
  id: string;
  name: string;
  category: GarmentCategory;
  subCategory: string;
  primaryColor: string;
  primaryColorHex: string;
  secondaryColors?: string[];
  style: FashionStyle[];
  season: Season[];
  warmthRating: number; // 1 (summer breeze) to 5 (heavy winter)
  imageUrl: string;
  dateAdded: string;
  timesWorn: number;
  lastWornDate?: string;
  detectedAttributes?: {
    pattern?: string;
    material?: string;
    neckline?: string;
    fit?: 'fitted' | 'regular' | 'oversized';
    confidenceScore: number;
  };
}

export interface StorePartnerItem {
  id: string;
  title: string;
  brand: string;
  storeName: 'Amazon Fashion' | 'Nordstrom' | 'ASOS' | 'Zara' | 'Farfetch';
  category: GarmentCategory;
  subCategory: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockLastSynced: string;
  affiliateUrl: string;
  affiliateCommissionRate: number; // e.g., 0.10 for 10%
  imageUrl: string;
  primaryColor: string;
  primaryColorHex: string;
  style: FashionStyle[];
  season: Season[];
  warmthRating: number;
  matchReason?: string;
}

export interface GeneratedOutfit {
  id: string;
  title: string;
  occasion: Occasion;
  style: FashionStyle;
  matchScore: number; // 0 to 100
  colorHarmonyType: 'Complementary' | 'Analogous' | 'Monochromatic' | 'Triadic' | 'Neutral-Accent';
  styleExplanation: string;
  weatherFitScore: number; // 0 to 100
  recommendedWeatherDescription: string;
  closetItems: WardrobeItem[];
  storeItems: StorePartnerItem[];
  estimatedTotalShopPrice: number;
  isSaved?: boolean;
  scheduledDate?: string;
}

export interface WeatherCondition {
  city: string;
  tempF: number;
  tempC: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Rainy' | 'Chilly' | 'Snow' | 'Windy';
  icon: string;
  humidity: number;
  windMph: number;
  recommendedWarmth: number; // 1 to 5
}
