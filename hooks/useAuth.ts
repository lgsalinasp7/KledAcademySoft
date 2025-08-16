"use client";

import { useState, useEffect } from 'react';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'SUPER_ADMIN';
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export type UserRole = 'student' | 'teacher' | 'admin' | 'super_admin';

// Mock data - esto se puede mover a un archivo separado después
const demoUsers: User[] = [
  {
    id: '1',
    name: 'Ana García',
    email: 'ana@kaledacademy.com',
    initials: 'AG',
    role: 'SUPER_ADMIN',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Carlos López',
    email: 'carlos@kaledacademy.com',
    initials: 'CL',
    role: 'ADMIN',
    isActive: true,
    createdAt: '2024-01-02T00:00:00Z',
    lastLogin: '2024-01-15T09:15:00Z'
  },
  {
    id: '3',
    name: 'María Rodríguez',
    email: 'maria@kaledacademy.com',
    initials: 'MR',
    role: 'TEACHER',
    isActive: true,
    createdAt: '2024-01-03T00:00:00Z',
    lastLogin: '2024-01-15T08:45:00Z'
  },
  {
    id: '4',
    name: 'Juan Pérez',
    email: 'juan@email.com',
    initials: 'JP',
    role: 'STUDENT',
    isActive: true,
    createdAt: '2024-01-04T00:00:00Z',
    lastLogin: '2024-01-15T11:20:00Z'
  }
];

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('kaledacademy_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('kaledacademy_user');
      }
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData: { name: string; email: string }) => {
    setIsLoading(true);
    
    // Buscar usuario en datos demo
    const demoUser = demoUsers.find(u => u.email === userData.email);
    
    if (demoUser) {
      // Usar datos del demo user
      const updatedUser = {
        ...demoUser,
        lastLogin: new Date().toISOString()
      };
      setUser(updatedUser);
      setIsLoggedIn(true);
      localStorage.setItem('kaledacademy_user', JSON.stringify(updatedUser));
    } else {
      // Crear usuario temporal para emails no encontrados
      const initials = userData.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      
      // Determine role based on email domain
      let role: User['role'] = 'STUDENT';
      if (userData.email.includes('@kaledacademy.com')) {
        if (userData.email.includes('admin') || userData.email.includes('director')) {
          role = 'SUPER_ADMIN';
        } else if (userData.email.includes('teacher') || userData.email.includes('profesor')) {
          role = 'TEACHER';
        } else {
          role = 'ADMIN';
        }
      }
      
      const newUser: User = {
        id: Math.random().toString(36).substring(7),
        name: userData.name,
        email: userData.email,
        initials,
        role,
        isActive: true,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      };
      
      setUser(newUser);
      setIsLoggedIn(true);
      localStorage.setItem('kaledacademy_user', JSON.stringify(newUser));
    }
    
    setIsLoading(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('kaledacademy_user');
  };

  const checkAuth = () => {
    const savedUser = localStorage.getItem('kaledacademy_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('kaledacademy_user');
      }
    }
  };

  return {
    isLoggedIn,
    user,
    isLoading,
    handleLogin,
    handleLogout,
    checkAuth
  };
};
