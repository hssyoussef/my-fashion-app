export type NavTab = 'home' | 'try-on' | 'wardrobe';

export type EventType = 'party' | 'date' | 'casual' | 'formal' | 'business';

export type BoutiqueBrand = 'ZARA' | 'PULL & BEAR' | 'ZEN' | 'BERSHKA' | 'MASSIMO DUTTI';

export interface EventPill {
  id: EventType;
  label: string;
  icon: string;
  bgColor: string;
  textColor: string;
  iconBg: string;
}

export interface ClothingItem {
  id: string;
  title: string;
  price: string; // e.g. "129 DNT" or "89 DNT"
  boutique?: BoutiqueBrand;
  brand?: string;
  color?: string;
  gender?: 'men' | 'women' | 'unisex';
  sizes?: string[];
  imageUrl: string;
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories';
  eventTags: EventType[];
  liked?: boolean;
  tryOnResultUrl?: string;
  isCustomUpload?: boolean;
  description?: string;
  cutoutUrl?: string;
  matchScore?: number;
}

export interface SavedOutfit {
  id: string;
  title: string;
  date: string;
  resultImageUrl: string;
  type: 'outfits' | 'single';
  isFavorite: boolean;
  boutique?: BoutiqueBrand;
  totalPrice?: string;
  items: {
    title: string;
    price: string;
    boutique?: BoutiqueBrand;
    imageUrl?: string;
  }[];
}

export interface SuggestedLook {
  id: string;
  title: string;
  boutique: BoutiqueBrand;
  price: string;
  imageUrl: string;
  description: string;
  items: { title: string; price: string }[];
  targetGarmentId: string;
}

export interface UserProfile {
  photoUrl: string; // Full-body photo (head to toe)
  name: string;
  currentEvent: EventType;
  isFullBodyVerified: boolean;
  hasCustomUpload: boolean;
}

export interface BackendConfig {
  backendUrl: string;
  isLiveApi: boolean;
  replicateApiKey?: string;
  falAiApiKey?: string;
}
