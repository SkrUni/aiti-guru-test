import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product, SortState } from '../types';

interface ProductsStore {
  search: string;
  sort: SortState;
  selectedIds: number[];
  localProducts: Product[];
  setSearch: (search: string) => void;
  setSort: (sort: SortState) => void;
  toggleSelected: (id: number) => void;
  clearSelected: () => void;
  addLocalProduct: (product: Omit<Product, 'id' | 'thumbnail' | 'category'>) => void;
}

export const useProductsStore = create<ProductsStore>()(
  persist(
    (set) => ({
      search: '',
      sort: { field: null, direction: 'asc' },
      selectedIds: [],
      localProducts: [],
      setSearch: (search) => set({ search }),
      setSort: (sort) => set({ sort }),
      toggleSelected: (id) =>
        set((state) => ({
          selectedIds: state.selectedIds.includes(id)
            ? state.selectedIds.filter((i) => i !== id)
            : [...state.selectedIds, id],
        })),
      clearSelected: () => set({ selectedIds: [] }),
      addLocalProduct: (product) =>
        set((state) => ({
          localProducts: [
            {
              ...product,
              id: Date.now(),
              thumbnail: '',
              category: 'local',
            },
            ...state.localProducts,
          ],
        })),
    }),
    {
      name: 'products-ui-state',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state: ProductsStore) => ({ sort: state.sort, localProducts: state.localProducts }),
    }
  )
);
