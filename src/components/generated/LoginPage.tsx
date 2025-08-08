import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
interface LoginPageProps {
  onLogin: (userData: {
    name: string;
    email: string;
  }) => void;
}
export function LoginPage({
  onLogin
}: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: {
      email?: string;
      password?: string;
    } = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        onLogin({
          name: 'Daniela Sofia Salinas Ospino',
          email: email
        });
        setIsLoading(false);
      }, 1500);
    }
  };
  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate Google OAuth
    setTimeout(() => {
      onLogin({
        name: 'Daniela Sofia Salinas Ospino',
        email: 'daniela@kaledacademy.com'
      });
      setIsLoading(false);
    }, 1500);
  };
  return <div className="min-h-screen bg-gradient-to-br from-[#1e1b4b] via-[#1e3a8a] to-[#0f172a] flex items-center justify-center p-4" data-magicpath-id="0" data-magicpath-path="LoginPage.tsx">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.6
    }} className="w-full max-w-md" data-magicpath-id="1" data-magicpath-path="LoginPage.tsx">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-slate-200" data-magicpath-id="2" data-magicpath-path="LoginPage.tsx">
          {/* Logo */}
          <div className="text-center mb-8" data-magicpath-id="3" data-magicpath-path="LoginPage.tsx">
            <div className="flex justify-center mb-4" data-magicpath-id="4" data-magicpath-path="LoginPage.tsx">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] rounded-full flex items-center justify-center relative" data-magicpath-id="5" data-magicpath-path="LoginPage.tsx">
                {/* Hexagonal shapes */}
                <div className="absolute inset-2" data-magicpath-id="6" data-magicpath-path="LoginPage.tsx">
                  <svg viewBox="0 0 48 48" className="w-full h-full" data-magicpath-id="7" data-magicpath-path="LoginPage.tsx">
                    {/* Outer hexagon */}
                    <path d="M24 4 L36 12 L36 28 L24 36 L12 28 L12 12 Z" fill="none" stroke="#06b6d4" strokeWidth="2" data-magicpath-id="8" data-magicpath-path="LoginPage.tsx" />
                    {/* Inner hexagon */}
                    <path d="M24 8 L32 14 L32 26 L24 32 L16 26 L16 14 Z" fill="none" stroke="#06b6d4" strokeWidth="1.5" data-magicpath-id="9" data-magicpath-path="LoginPage.tsx" />
                    {/* Connected circles */}
                    <circle cx="20" cy="18" r="3" fill="#06b6d4" data-magicpath-id="10" data-magicpath-path="LoginPage.tsx" />
                    <circle cx="28" cy="22" r="3" fill="#06b6d4" data-magicpath-id="11" data-magicpath-path="LoginPage.tsx" />
                    <circle cx="24" cy="30" r="3" fill="#06b6d4" data-magicpath-id="12" data-magicpath-path="LoginPage.tsx" />
                    {/* Connection lines */}
                    <line x1="20" y1="18" x2="28" y2="22" stroke="#06b6d4" strokeWidth="2" />
                    <line x1="28" y1="22" x2="24" y2="30" stroke="#06b6d4" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1e1b4b] to-[#06b6d4] bg-clip-text text-transparent mb-2" data-magicpath-id="13" data-magicpath-path="LoginPage.tsx">
              KALED
            </h1>
            <p className="text-xs font-medium text-slate-500 tracking-wider mb-1" data-magicpath-id="14" data-magicpath-path="LoginPage.tsx">ACADEMY</p>
            <p className="text-slate-600" data-magicpath-id="15" data-magicpath-path="LoginPage.tsx">Welcome back to your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" data-magicpath-id="16" data-magicpath-path="LoginPage.tsx">
            {/* Google Login Button */}
            <motion.button type="button" onClick={handleGoogleLogin} disabled={isLoading} whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-300 text-slate-700 py-3 px-4 rounded-xl font-medium hover:border-[#06b6d4] hover:bg-slate-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" data-magicpath-id="17" data-magicpath-path="LoginPage.tsx">
              <svg className="w-5 h-5" viewBox="0 0 24 24" data-magicpath-id="18" data-magicpath-path="LoginPage.tsx">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" data-magicpath-id="19" data-magicpath-path="LoginPage.tsx" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" data-magicpath-id="20" data-magicpath-path="LoginPage.tsx" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" data-magicpath-id="21" data-magicpath-path="LoginPage.tsx" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" data-magicpath-id="22" data-magicpath-path="LoginPage.tsx" />
              </svg>
              Continue with Google
            </motion.button>

            <div className="relative" data-magicpath-id="23" data-magicpath-path="LoginPage.tsx">
              <div className="absolute inset-0 flex items-center" data-magicpath-id="24" data-magicpath-path="LoginPage.tsx">
                <div className="w-full border-t border-slate-300" data-magicpath-id="25" data-magicpath-path="LoginPage.tsx"></div>
              </div>
              <div className="relative flex justify-center text-sm" data-magicpath-id="26" data-magicpath-path="LoginPage.tsx">
                <span className="px-2 bg-white text-slate-500" data-magicpath-id="27" data-magicpath-path="LoginPage.tsx">Or continue with email</span>
              </div>
            </div>

            {/* Email Field */}
            <div data-magicpath-id="28" data-magicpath-path="LoginPage.tsx">
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2" data-magicpath-id="29" data-magicpath-path="LoginPage.tsx">
                Email
              </label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#06b6d4] focus:border-transparent transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-slate-300'}`} placeholder="Enter your email" data-magicpath-id="30" data-magicpath-path="LoginPage.tsx" />
              {errors.email && <p className="mt-1 text-sm text-red-600" data-magicpath-id="31" data-magicpath-path="LoginPage.tsx">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div data-magicpath-id="32" data-magicpath-path="LoginPage.tsx">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2" data-magicpath-id="33" data-magicpath-path="LoginPage.tsx">
                Password
              </label>
              <div className="relative" data-magicpath-id="34" data-magicpath-path="LoginPage.tsx">
                <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className={`w-full px-4 py-3 pr-12 border rounded-xl focus:ring-2 focus:ring-[#06b6d4] focus:border-transparent transition-all duration-200 ${errors.password ? 'border-red-500' : 'border-slate-300'}`} placeholder="Enter your password" data-magicpath-id="35" data-magicpath-path="LoginPage.tsx" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600" data-magicpath-id="36" data-magicpath-path="LoginPage.tsx">
                  {showPassword ? <EyeOff size={20} data-magicpath-id="37" data-magicpath-path="LoginPage.tsx" /> : <Eye size={20} data-magicpath-id="38" data-magicpath-path="LoginPage.tsx" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600" data-magicpath-id="39" data-magicpath-path="LoginPage.tsx">{errors.password}</p>}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between" data-magicpath-id="40" data-magicpath-path="LoginPage.tsx">
              <label className="flex items-center" data-magicpath-id="41" data-magicpath-path="LoginPage.tsx">
                <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} className="w-4 h-4 text-[#06b6d4] border-slate-300 rounded focus:ring-[#06b6d4]" data-magicpath-id="42" data-magicpath-path="LoginPage.tsx" />
                <span className="ml-2 text-sm text-slate-600" data-magicpath-id="43" data-magicpath-path="LoginPage.tsx">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#06b6d4] hover:text-[#0891b2] font-medium">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <motion.button type="submit" disabled={isLoading} whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className="w-full bg-gradient-to-r from-[#1e1b4b] to-[#06b6d4] text-white py-3 px-4 rounded-xl font-medium hover:from-[#1e1b4b] hover:to-[#0891b2] focus:ring-4 focus:ring-[#06b6d4]/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" data-magicpath-id="44" data-magicpath-path="LoginPage.tsx">
              {isLoading ? <div className="flex items-center justify-center" data-magicpath-id="45" data-magicpath-path="LoginPage.tsx">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" data-magicpath-id="46" data-magicpath-path="LoginPage.tsx"></div>
                  Signing in...
                </div> : 'Sign In'}
            </motion.button>
          </form>

          {/* Create Account Link */}
          <div className="mt-6 text-center" data-magicpath-id="47" data-magicpath-path="LoginPage.tsx">
            <p className="text-slate-600" data-magicpath-id="48" data-magicpath-path="LoginPage.tsx">
              Don't have an account?{' '}
              <a href="#" className="text-[#06b6d4] hover:text-[#0891b2] font-medium">
                Create account
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>;
}