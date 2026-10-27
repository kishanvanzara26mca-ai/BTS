/**
 * Type definitions for Black Tecno Shop
 */

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string; // SKU code, e.g. BTS-MOB-001
  name: string;
  category: string;
  description: string;
  images: string[];
  sellingPrice: number; // in INR
  originalPrice?: number; // MRP in INR
  discountPercent?: number;
  availableSizes?: string[];
  availableColors?: string[];
  inStock: boolean;
  stockCountText?: string; // e.g. "Only 4 left" or "In Stock"
  specifications: ProductSpecification[];
  offers?: string[];
  isFeatured?: boolean;
  isBestseller?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;
  isRecentlyAdded?: boolean;
  rating?: number; // 1.0 - 5.0
  reviewsCount?: number;
}

export interface CartItem {
  cartItemId: string; // unique combo of product id + size + color
  product: Product;
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  bannerImage?: string;
}

export type ModalType = 
  | 'none'
  | 'cart'
  | 'wishlist'
  | 'order-panel'
  | 'product-detail'
  | 'about'
  | 'contact'
  | 'policy'
  | 'owner-guide';

export type PolicyTab = 'shipping' | 'returns' | 'privacy' | 'terms';
