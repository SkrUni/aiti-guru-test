import React from 'react';
import type { SortState, SortField } from '../../types';
import { TABLE_GRID, TABLE_GAP } from './columns';

interface TableHeaderProps {
  sort: SortState;
  onSort: (field: SortField) => void;
  allChecked: boolean;
  onToggleAll: () => void;
}

function SortIcon({ field, sort }: { field: SortField; sort: SortState }) {
  if (!field) return null;
  if (sort.field !== field)
    return <i className="ti ti-arrows-sort text-[#B2B3B9] text-xs ml-1" />;
  return sort.direction === 'asc'
    ? <i className="ti ti-sort-ascending text-[#3C538E] text-xs ml-1" />
    : <i className="ti ti-sort-descending text-[#3C538E] text-xs ml-1" />;
}

interface ColProps {
  label: string;
  field: SortField;
  sort: SortState;
  onSort: (f: SortField) => void;
}

function Col({ label, field, sort, onSort }: ColProps) {
  return (
    <div
      className={`flex items-center min-w-0 ${field ? 'cursor-pointer select-none' : ''}`}
      onClick={() => field && onSort(field)}
    >
      <span className="font-opensans font-semibold text-xs text-[#B2B3B9] uppercase tracking-wide truncate">
        {label}
      </span>
      <SortIcon field={field} sort={sort} />
    </div>
  );
}

export const TableHeader: React.FC<TableHeaderProps> = ({ sort, onSort, allChecked, onToggleAll }) => {
  return (
    <div className={`grid ${TABLE_GRID} ${TABLE_GAP} items-center px-5 py-3 bg-[#F8F8F8] border-b border-[#E2E2E2]`}>
      {/* Checkbox */}
      <button
        onClick={onToggleAll}
        className={`w-[22px] h-[22px] rounded border flex items-center justify-center transition-colors ${
          allChecked ? 'bg-[#3C538E] border-[#3C538E]' : 'bg-white border-[#B2B3B9]'
        }`}
        aria-label="Выбрать все"
      >
        {allChecked && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Photo — empty */}
      <div />

      <Col label="Наименование" field="title"  sort={sort} onSort={onSort} />
      <Col label="Вендор"       field="brand"  sort={sort} onSort={onSort} />
      <Col label="Артикул"      field={null}   sort={sort} onSort={onSort} />
      <Col label="Оценка"       field="rating" sort={sort} onSort={onSort} />
      <Col label="Цена, Р"      field="price"  sort={sort} onSort={onSort} />

      {/* Actions — empty */}
      <div />
    </div>
  );
};
