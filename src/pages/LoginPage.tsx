import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <main className="flex justify-center items-center p-4 bg-slate-50 min-h-screen">
      <LoginForm />
    </main>
  );
};

export default LoginPage;
