export interface Product {
  sku: string;
  details: string;
  features: string;
  minPrice: number;
  maxPrice: number;
  priceRange: string;
  photo?: string;
  video?: string;
}