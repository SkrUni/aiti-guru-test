import React, { useState } from 'react';

interface InputFieldProps {
  label: string;
  type: 'text' | 'password';
  value: string;
  leftIcon: string;
  rightIcon?: string;
  onRightIconClick?: () => void;
  onChange?: (value: string) => void;
  onClear?: () => void;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  leftIcon,
  rightIcon,
  onRightIconClick,
  onChange,
  onClear,
  error,
}) => {
  const [inputType, setInputType] = useState(type);

  const handleRightIconClick = () => {
    if (type === 'password') {
      setInputType(inputType === 'password' ? 'text' : 'password');
    }
    if (onRightIconClick) {
      onRightIconClick();
    }
  };

  const handleClearClick = () => {
    if (onClear) {
      onClear();
    }
  };

  const getRightIcon = () => {
    if (type === 'text' && value) return 'ti-x';
    if (type === 'password') return inputType === 'password' ? 'ti-eye-off' : 'ti-eye';
    return rightIcon;
  };

  return (
    <div className="mb-5">
      <label className="mb-2 text-sm font-medium leading-5 text-zinc-900 block">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-2/4 text-gray-400 -translate-y-2/4">
          <i className={`ti ${leftIcon} text-xl`} />
        </div>
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={`px-12 w-full h-12 text-sm leading-5 rounded-xl border text-zinc-900 outline-none transition-colors focus:border-indigo-400 ${
            error ? 'border-red-400 bg-red-50' : 'border-gray-200'
          }`}
        />
        {getRightIcon() && (
          <div
            className="absolute right-4 top-2/4 text-gray-300 -translate-y-2/4 cursor-pointer hover:text-gray-500 transition-colors"
            onClick={type === 'text' ? handleClearClick : handleRightIconClick}
          >
            <i className={`ti ${getRightIcon()} text-xl`} />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};
