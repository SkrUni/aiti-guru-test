import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { InputField } from './InputField';
import { loginApi } from '../../api/auth';
import { useAuthStore } from '../../store/authStore';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const [loginValue, setLoginValue] = useState('emilys');
  const [passwordValue, setPasswordValue] = useState('emilyspass');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ login?: string; password?: string; api?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!loginValue.trim()) errs.login = 'Поле обязательно для заполнения';
    if (!passwordValue.trim()) errs.password = 'Поле обязательно для заполнения';
    return errs;
  };

  const handleLogin = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const user = await loginApi(loginValue, passwordValue);
      setUser(user, rememberMe);
      navigate('/products');
    } catch (e: unknown) {
      const msg =
        e instanceof Error
          ? e.message
          : 'Неверный логин или пароль';
      setErrors({ api: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-12 w-full bg-white rounded-2xl max-w-[420px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] max-sm:p-6">
      <header className="flex justify-center mb-8">
        <Logo />
      </header>

      <div className="mb-2 text-center">
        <h1 className="text-3xl font-bold leading-10 text-zinc-900">
          Добро пожаловать!
        </h1>
      </div>

      <div className="mb-8 text-center">
        <p className="text-sm leading-5 text-gray-400">
          Пожалуйста, авторизуйтесь
        </p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
        <InputField
          label="Логин"
          type="text"
          value={loginValue}
          leftIcon="ti-user"
          onChange={setLoginValue}
          onClear={() => setLoginValue('')}
          error={errors.login}
        />

        <InputField
          label="Пароль"
          type="password"
          value={passwordValue}
          leftIcon="ti-lock"
          onChange={setPasswordValue}
          error={errors.password}
        />

        {errors.api && (
          <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200">
            <p className="text-sm text-red-600">{errors.api}</p>
          </div>
        )}

        <div className="flex gap-2 items-center mb-6">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border border-gray-300 cursor-pointer accent-indigo-600"
          />
          <label
            htmlFor="remember"
            className="text-sm leading-5 text-gray-500 cursor-pointer select-none"
          >
            Запомнить данные
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mb-4 w-full h-12 text-sm font-semibold leading-5 text-white bg-indigo-600 rounded-xl cursor-pointer border-none flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <i className="ti ti-loader-2 text-xl animate-spin" />
          ) : (
            'Войти'
          )}
        </button>
      </form>

      <div className="mb-4 text-center">
        <p className="text-sm leading-5 text-gray-300">или</p>
      </div>

      <div className="text-center">
        <p className="text-sm leading-5 text-gray-500">Нет аккаунта?</p>
        <button
          type="button"
          className="text-sm font-semibold leading-5 text-indigo-600 cursor-pointer hover:text-indigo-700 transition-colors bg-transparent border-none"
        >
          Создать
        </button>
      </div>
    </div>
  );
};
