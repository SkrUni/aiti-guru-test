import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useProductsStore } from '../store/productsStore';
import { fetchProducts } from '../api/products';
import { ProductRow } from '../components/products/ProductRow';
import { TableHeader } from '../components/products/TableHeader';
import { AddProductModal } from '../components/products/AddProductModal';
import type { Product, SortField } from '../types';

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { search, sort, selectedIds, localProducts, setSearch, setSort, toggleSelected, clearSelected } =
    useProductsStore();

  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState(search);

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['products', search],
    queryFn: () => fetchProducts(search),
    staleTime: 1000 * 60,
  });

  const products: Product[] = useMemo(() => {
    const apiProducts = (data?.products ?? []).map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      rating: p.rating,
      brand: p.brand ?? '',
      sku: p.sku ?? '',
      category: p.category,
      thumbnail: p.thumbnail,
    }));

    // Filter local products by search query client-side
    const filteredLocal = search.trim()
      ? localProducts.filter((p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.brand.toLowerCase().includes(search.toLowerCase()) ||
          p.sku.toLowerCase().includes(search.toLowerCase())
        )
      : localProducts;

    return [...filteredLocal, ...apiProducts];
  }, [data, localProducts, search]);

  const sortedProducts = useMemo(() => {
    if (!sort.field) return products;
    return [...products].sort((a, b) => {
      const field = sort.field!;
      const aVal = a[field];
      const bVal = b[field];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sort.direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sort.direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  }, [products, sort]);

  const handleSort = (field: SortField) => {
    if (!field) return;
    if (sort.field === field) {
      setSort({ field, direction: sort.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ field, direction: 'asc' });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const allChecked = sortedProducts.length > 0 && sortedProducts.every((p) => selectedIds.includes(p.id));
  const toggleAll = () => {
    if (allChecked) {
      clearSelected();
    } else {
      sortedProducts.forEach((p) => {
        if (!selectedIds.includes(p.id)) toggleSelected(p.id);
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      {/* Header */}
      <header className="bg-white border-b border-[#E2E2E2] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28 16L20 12V20L28 16Z" fill="#1A1A1A" />
            <path d="M20 10L12 6V22L20 18V10Z" fill="#1A1A1A" />
            <path d="M12 8L4 4V28L12 24V8Z" fill="#1A1A1A" />
          </svg>
          <span className="font-cairo font-bold text-lg text-[#161919] hidden sm:block">Aiti Guru</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 hidden sm:block">
            {user?.firstName} {user?.lastName}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
          >
            <i className="ti ti-logout text-base" />
            <span className="hidden sm:inline">Выйти</span>
          </button>
        </div>
      </header>

      {/* Page content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6">
        {/* Toolbar */}
        <div className="relative flex items-center h-12 mb-4">
          {/* Left: title */}
          <h1 className="font-cairo font-bold text-xl text-[#161919] flex-shrink-0">Товары</h1>

          {/* Center: search ~53% wide (1023/1920) */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="absolute left-1/2 -translate-x-1/2 w-[53%]"
          >
            <div className="relative">
              <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value); setSearch(e.target.value); }}
                placeholder="Найти"
                className="pl-9 pr-9 h-12 w-full rounded-xl border border-gray-200 text-sm outline-none focus:border-indigo-400 transition-colors bg-white"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => { setInputValue(''); setSearch(''); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                >
                  <i className="ti ti-x text-sm" />
                </button>
              )}
            </div>
          </form>

          {/* Right: refresh + add */}
          <div className="ml-auto flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-gray-500 disabled:opacity-50"
              aria-label="Обновить таблицу"
              title="Обновить таблицу"
            >
              <i className={`ti ti-refresh text-base ${isFetching ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="h-10 px-4 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors flex items-center gap-1.5"
            >
              <i className="ti ti-plus text-base" />
              Добавить
            </button>
          </div>
        </div>

        {/* Progress bar */}
        {(isLoading || isFetching) && (
          <div className="w-full h-1 bg-gray-100 rounded-full mb-2 overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full w-[60%] animate-progress" />
          </div>
        )}

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#E2E2E2]">
          <TableHeader sort={sort} onSort={handleSort} allChecked={allChecked} onToggleAll={toggleAll} />

          {isLoading ? (
            <div className="flex items-center justify-center py-16 text-gray-400">
              <i className="ti ti-loader-2 text-3xl animate-spin mr-3" />
              <span className="font-opensans">Загрузка...</span>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <i className="ti ti-package-off text-4xl mb-3" />
              <p className="font-opensans text-sm">Товары не найдены</p>
            </div>
          ) : (
            <div>
              {sortedProducts.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  checked={selectedIds.includes(product.id)}
                  onToggle={toggleSelected}
                />
              ))}
            </div>
          )}

          {/* Footer */}
          {sortedProducts.length > 0 && (
            <div className="px-5 py-3 border-t border-[#E2E2E2] flex items-center justify-between">
              <span className="font-opensans text-sm text-[#B2B3B9]">
                Всего: {data?.total ?? sortedProducts.length} товаров
              </span>
              {selectedIds.length > 0 && (
                <span className="font-opensans text-sm text-indigo-600">
                  Выбрано: {selectedIds.length}
                </span>
              )}
            </div>
          )}
        </div>
      </main>

      {showModal && <AddProductModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ProductsPage;
