import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from '../../ui/Logo';
import { LoginForm } from './LoginForm';

interface LoginPageProps {
  onLogin: (userData: { name: string; email: string }) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#1e3a8a] to-[#0f172a] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo size="lg" withText={false} />
            </div>
            <p className="text-slate-600">Welcome back to your learning journey</p>
          </div>

          <LoginForm onLogin={onLogin} />

          {/* Create Account Link */}
          <div className="mt-6 text-center">
            <p className="text-slate-600">
              Don't have an account?{' '}
              <a href="#" className="text-blue-400 hover:text-blue-600 font-medium">
                Create account
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
