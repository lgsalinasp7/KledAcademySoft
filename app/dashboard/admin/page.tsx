'use client';

import React from 'react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { useAuthStore } from '@/stores/authStore';

export default function AdminDashboard() {
  const { user, signOut } = useAuthStore();

  // Mock user data for the admin layout
  const adminUser = {
    id: user?.id || '1',
    name: user?.name || 'Administrador',
    email: user?.email || 'admin@gmail.com',
    initials: 'AD',
    role: user?.role || 'ADMIN',
    avatar: '',
    isActive: true,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <AdminLayout 
      user={adminUser} 
      onLogout={handleLogout}
    />
  );
}
