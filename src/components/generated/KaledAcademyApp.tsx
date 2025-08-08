import React, { useState } from 'react';
import { LoginPage } from './LoginPage';
import { DashboardLayout } from './DashboardLayout';
export function KaledAcademyApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    initials: string;
  } | null>(null);
  const handleLogin = (userData: {
    name: string;
    email: string;
  }) => {
    const initials = userData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    setUser({
      ...userData,
      initials
    });
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };
  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} data-magicpath-id="0" data-magicpath-path="KaledAcademyApp.tsx" />;
  }
  return <DashboardLayout user={user!} onLogout={handleLogout} data-magicpath-id="1" data-magicpath-path="KaledAcademyApp.tsx" />;
}