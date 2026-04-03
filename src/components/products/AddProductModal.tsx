import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useProductsStore } from '../../store/productsStore';

interface AddProductModalProps {
  onClose: () => void;
}

interface FormData {
  name: string;
  price: string;
  vendor: string;
  article: string;
}

interface FormErrors {
  name?: string;
  price?: string;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({ onClose }) => {
  const addLocalProduct = useProductsStore((s) => s.addLocalProduct);
  const [form, setForm] = useState<FormData>({ name: '', price: '', vendor: '', article: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const setField = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = 'Обязательное поле';
    if (!form.price.trim()) errs.price = 'Обязательное поле';
    else if (isNaN(Number(form.price)) || Number(form.price) <= 0) errs.price = 'Введите корректную цену';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    addLocalProduct({
      title: form.name,
      price: Number(form.price),
      brand: form.vendor,
      sku: form.article,
      rating: 5,
    });
    toast.success('Товар успешно добавлен!', {
      duration: 3000,
      style: { borderRadius: '12px', fontFamily: 'Open Sans, sans-serif' },
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-cairo font-bold text-xl text-[#161919]">Добавить товар</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-400"
          >
            <i className="ti ti-x text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Наименование <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={setField('name')}
              placeholder="Введите название товара"
              className={`w-full h-11 px-4 rounded-xl border text-sm outline-none transition-colors focus:border-indigo-400 ${
                errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">
              Цена <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={form.price}
              onChange={setField('price')}
              placeholder="0.00"
              min="0"
              step="0.01"
              className={`w-full h-11 px-4 rounded-xl border text-sm outline-none transition-colors focus:border-indigo-400 ${
                errors.price ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
            />
            {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Вендор</label>
            <input
              type="text"
              value={form.vendor}
              onChange={setField('vendor')}
              placeholder="Название производителя"
              className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm outline-none transition-colors focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1.5">Артикул</label>
            <input
              type="text"
              value={form.article}
              onChange={setField('article')}
              placeholder="SKU-000"
              className="w-full h-11 px-4 rounded-xl border border-gray-200 text-sm outline-none transition-colors focus:border-indigo-400"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="flex-1 h-11 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
            >
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
