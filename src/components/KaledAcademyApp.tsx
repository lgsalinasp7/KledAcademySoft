import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { LoginPage } from './features/auth/LoginPage';
import { DashboardLayout } from './layout/DashboardLayout';
import { AdminLayout } from './layout/AdminLayout';

export function KaledAcademyApp() {
  const { isLoggedIn, user, handleLogin, handleLogout } = useAuth();

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Route to appropriate layout based on user role
  const isAdminUser = user!.role === 'admin' || user!.role === 'teacher' || user!.role === 'super_admin';
  
  if (isAdminUser) {
    return <AdminLayout user={user!} onLogout={handleLogout} />;
  }

  return <DashboardLayout user={user!} onLogout={handleLogout} />;
}
