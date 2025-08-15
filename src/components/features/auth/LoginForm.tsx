import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '../../ui/Button';
import { demoUsers } from '../../../data/mvpData';

interface LoginFormProps {
  onLogin: (userData: { name: string; email: string }) => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        // Buscar usuario demo para obtener el nombre real
        const demoUser = demoUsers.find(u => u.email === email);
        const userName = demoUser ? demoUser.name : 'Usuario';
        
        onLogin({
          name: userName,
          email: email
        });
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin({
        name: 'Laura Martínez',
        email: 'laura@kaledacademy.com'
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Google Login Button */}
      <Button
        onClick={handleGoogleLogin}
        disabled={isLoading}
        variant="secondary"
        className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-300 text-slate-700 hover:border-blue-400 hover:bg-slate-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
                 Acceder como Laura (Estudiante)
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
                     <span className="px-2 bg-white text-slate-500">O acceder con email específico</span>
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
          Email
        </label>
        <input 
          id="email" 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
            errors.email ? 'border-red-500' : 'border-slate-300'
          }`} 
                     placeholder="ana@kaledacademy.com, carlos@kaledacademy.com, maria@kaledacademy.com"  
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input 
            id="password" 
            type={showPassword ? 'text' : 'password'} 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
              errors.password ? 'border-red-500' : 'border-slate-300'
            }`} 
            placeholder="Cualquier contraseña (mínimo 3 caracteres)" 
          />
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input 
            type="checkbox" 
            checked={rememberMe} 
            onChange={e => setRememberMe(e.target.checked)} 
            className="w-4 h-4 text-blue-400 border-slate-300 rounded focus:ring-blue-400" 
          />
          <span className="ml-2 text-sm text-slate-600">Remember me</span>
        </label>
        <a href="#" className="text-sm text-blue-400 hover:text-blue-600 font-medium">
          Forgot password?
        </a>
      </div>

      {/* Login Button */}
      <Button
        type="submit"
        disabled={isLoading}
        variant="primary"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Signing in...
          </div>
                 ) : (
           'Iniciar Sesión'
         )}
      </Button>
    </form>
  );
}
