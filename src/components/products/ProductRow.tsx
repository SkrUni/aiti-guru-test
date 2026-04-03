import React from 'react';
import type { Product } from '../../types';
import { TABLE_GRID, TABLE_GAP } from './columns';

interface ProductRowProps {
  product: Product;
  checked: boolean;
  onToggle: (id: number) => void;
}

function formatPrice(price: number) {
  const parts = price.toFixed(2).split('.');
  const int = Number(parts[0]).toLocaleString('ru-RU');
  const dec = `,${parts[1]}`;
  return { int, dec };
}

const DotsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
    <path d="M16 3C13.4288 3 10.9154 3.76244 8.77759 5.1909C6.63975 6.61935 4.97351 8.64968 3.98957 11.0251C3.00563 13.4006 2.74819 16.0144 3.2498 18.5362C3.75141 21.0579 4.98953 23.3743 6.80762 25.1924C8.6257 27.0105 10.9421 28.2486 13.4638 28.7502C15.9856 29.2518 18.5995 28.9944 20.9749 28.0104C23.3503 27.0265 25.3807 25.3603 26.8091 23.2224C28.2376 21.0846 29 18.5712 29 16C28.9964 12.5533 27.6256 9.24882 25.1884 6.81163C22.7512 4.37445 19.4467 3.00364 16 3ZM16 27C13.8244 27 11.6977 26.3549 9.88873 25.1462C8.07979 23.9375 6.66989 22.2195 5.83733 20.2095C5.00477 18.1995 4.78693 15.9878 5.21137 13.854C5.63581 11.7202 6.68345 9.7602 8.22183 8.22183C9.76021 6.68345 11.7202 5.6358 13.854 5.21136C15.9878 4.78692 18.1995 5.00476 20.2095 5.83733C22.2195 6.66989 23.9375 8.07979 25.1462 9.88873C26.3549 11.6977 27 13.8244 27 16C26.9967 18.9164 25.8367 21.7123 23.7745 23.7745C21.7123 25.8367 18.9164 26.9967 16 27ZM17.5 16C17.5 16.2967 17.412 16.5867 17.2472 16.8334C17.0824 17.08 16.8481 17.2723 16.574 17.3858C16.2999 17.4993 15.9983 17.5291 15.7074 17.4712C15.4164 17.4133 15.1491 17.2704 14.9393 17.0607C14.7296 16.8509 14.5867 16.5836 14.5288 16.2926C14.471 16.0017 14.5007 15.7001 14.6142 15.426C14.7277 15.1519 14.92 14.9176 15.1667 14.7528C15.4133 14.588 15.7033 14.5 16 14.5C16.3978 14.5 16.7794 14.658 17.0607 14.9393C17.342 15.2206 17.5 15.6022 17.5 16ZM23 16C23 16.2967 22.912 16.5867 22.7472 16.8334C22.5824 17.08 22.3481 17.2723 22.074 17.3858C21.7999 17.4993 21.4983 17.5291 21.2074 17.4712C20.9164 17.4133 20.6491 17.2704 20.4393 17.0607C20.2296 16.8509 20.0867 16.5836 20.0288 16.2926C19.9709 16.0017 20.0007 15.7001 20.1142 15.426C20.2277 15.1519 20.42 14.9176 20.6667 14.7528C20.9133 14.588 21.2033 14.5 21.5 14.5C21.8978 14.5 22.2794 14.658 22.5607 14.9393C22.842 15.2206 23 15.6022 23 16ZM12 16C12 16.2967 11.912 16.5867 11.7472 16.8334C11.5824 17.08 11.3481 17.2723 11.074 17.3858C10.7999 17.4993 10.4983 17.5291 10.2074 17.4712C9.9164 17.4133 9.64912 17.2704 9.43935 17.0607C9.22957 16.8509 9.08671 16.5836 9.02883 16.2926C8.97095 16.0017 9.00065 15.7001 9.11419 15.426C9.22772 15.1519 9.41998 14.9176 9.66665 14.7528C9.91332 14.588 10.2033 14.5 10.5 14.5C10.8978 14.5 11.2794 14.658 11.5607 14.9393C11.842 15.2206 12 15.6022 12 16Z" fill="#B2B3B9"/>
  </svg>
);

export const ProductRow: React.FC<ProductRowProps> = ({ product, checked, onToggle }) => {
  const { int, dec } = formatPrice(product.price);
  const ratingLow = product.rating < 3.5;

  return (
    <div className="relative border-b border-[#E2E2E2] bg-white hover:bg-slate-50 transition-colors">
      {checked && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#3C538E]" />}

      <div className={`grid ${TABLE_GRID} ${TABLE_GAP} items-center px-5 min-h-[71px]`}>

        {/* Checkbox */}
        <button
          onClick={() => onToggle(product.id)}
          className={`w-[22px] h-[22px] rounded border flex items-center justify-center transition-colors shrink-0 ${
            checked ? 'bg-[#3C538E] border-[#3C538E]' : 'bg-white border-[#B2B3B9]'
          }`}
          aria-label={`Выбрать ${product.title}`}
        >
          {checked && (
            <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
              <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>

        {/* Фото */}
        <div className="w-12 h-12 rounded-lg border border-[#ECECEB] bg-[#F5F5F5] overflow-hidden">
          {product.thumbnail && (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}
        </div>

        {/* Наименование + Категория */}
        <div className="flex flex-col gap-0.5 min-w-0 py-3">
          <span className="font-cairo font-bold text-sm text-[#161919] truncate">{product.title}</span>
          <span className="font-cairo text-xs text-[#B2B3B9] capitalize truncate">{product.category}</span>
        </div>

        {/* Вендор */}
        <div className="min-w-0">
          <span className="font-opensans font-bold text-sm text-black truncate block">
            {product.brand || '—'}
          </span>
        </div>

        {/* Артикул */}
        <div className="min-w-0">
          <span className="font-opensans text-sm text-black truncate block">
            {product.sku || '—'}
          </span>
        </div>

        {/* Оценка */}
        <div className="min-w-0">
          {ratingLow ? (
            <span className="font-opensans text-sm">
              <span className="text-[#F11010]">{product.rating}</span>
              <span className="text-black">/5</span>
            </span>
          ) : (
            <span className="font-opensans text-sm text-black">{product.rating}/5</span>
          )}
        </div>

        {/* Цена */}
        <div className="min-w-0">
          <span className="font-roboto-mono text-sm text-[#222222]">{int}</span>
          <span className="font-roboto-mono text-sm text-[#999999]">{dec}</span>
        </div>

        {/* Кнопки действий */}
        <div className="flex items-center gap-3">
          <button
            className="flex items-center justify-center w-[46px] h-[27px] rounded-full bg-[#242EDB] hover:bg-[#1c25c4] transition-colors shrink-0"
            aria-label="Добавить"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 5V19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="shrink-0 hover:opacity-70 transition-opacity" aria-label="Доп. действия">
            <DotsIcon />
          </button>
        </div>

      </div>
    </div>
  );
};
