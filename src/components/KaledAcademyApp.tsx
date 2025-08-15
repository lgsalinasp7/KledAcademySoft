import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoginPage } from './features/auth/LoginPage';
import { DashboardLayout } from './layout/DashboardLayout';

export function KaledAcademyApp() {
  const { isLoggedIn, user, handleLogin, handleLogout } = useAuth();

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <DashboardLayout user={user!} onLogout={handleLogout} />;
}
