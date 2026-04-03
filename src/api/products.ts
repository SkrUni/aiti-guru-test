import axios from 'axios';
import type { DummyProductsResponse } from '../types';

const BASE = 'https://dummyjson.com';

export async function fetchProducts(search: string): Promise<DummyProductsResponse> {
  if (search.trim()) {
    const { data } = await axios.get<DummyProductsResponse>(
      `${BASE}/products/search?q=${encodeURIComponent(search)}&limit=100`
    );
    return data;
  }
  const { data } = await axios.get<DummyProductsResponse>(`${BASE}/products?limit=100`);
  return data;
}
