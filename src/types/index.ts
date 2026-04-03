export interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  brand: string;
  sku: string;
  category: string;
  thumbnail: string;
}

export interface DummyProduct {
  id: number;
  title: string;
  price: number;
  rating: number;
  brand?: string;
  sku?: string;
  category: string;
  thumbnail: string;
}

export interface DummyProductsResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

export type SortField = 'title' | 'price' | 'rating' | 'brand' | null;
export type SortDirection = 'asc' | 'desc';

export interface SortState {
  field: SortField;
  direction: SortDirection;
}
