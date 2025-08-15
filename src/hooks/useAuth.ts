import { useState } from 'react';
import { User, UserRole } from '../types';
import { demoUsers } from '../data/mvpData';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userData: { name: string; email: string }) => {
    // Buscar usuario en datos demo
    const demoUser = demoUsers.find(u => u.email === userData.email);
    
    if (demoUser) {
      // Usar datos del demo user
      setUser(demoUser);
    } else {
      // Crear usuario temporal para emails no encontrados
      const initials = userData.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      
      // Determine role based on email domain
      let role: UserRole = 'student';
      if (userData.email.includes('@kaledacademy.com')) {
        if (userData.email.includes('admin') || userData.email.includes('director')) {
          role = 'super_admin';
        } else if (userData.email.includes('teacher') || userData.email.includes('profesor')) {
          role = 'teacher';
        } else {
          role = 'admin';
        }
      }
      
      setUser({
        id: Math.random().toString(36).substring(7),
        name: userData.name,
        email: userData.email,
        initials,
        role,
        isActive: true,
        createdAt: new Date().toISOString()
      });
    }
    
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return {
    isLoggedIn,
    user,
    handleLogin,
    handleLogout
  };
};
