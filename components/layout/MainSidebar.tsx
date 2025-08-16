"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building, Square, BookOpen, Users, Users2, Settings, Shield } from 'lucide-react';
import { Logo } from '../ui/Logo';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userRole?: string;
}

export function MainSidebar({ currentView, onViewChange, userRole }: NavigationProps) {
  const isAdmin = userRole && ['ADMIN', 'SUPER_ADMIN'].includes(userRole);
  const isTeacher = userRole === 'TEACHER';

  const studentNavigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      view: 'home',
      active: currentView === 'home'
    },
    {
      id: 'payment-management',
      label: 'Gestión de pagos',
      icon: Building,
      view: 'payment-management',
      active: currentView === 'payment-management'
    },
    {
      id: 'kaled-x',
      label: 'KaledAcademy X',
      icon: Square,
      view: 'kaled-x',
      active: currentView === 'kaled-x'
    }
  ];

  const adminNavigationItems = [
    {
      id: 'home',
      label: 'Dashboard',
      icon: Home,
      view: 'home',
      active: currentView === 'home'
    },
    {
      id: 'admin-courses',
      label: 'Gestión de Cursos',
      icon: BookOpen,
      view: 'admin-courses',
      active: currentView === 'admin-courses'
    },
    {
      id: 'admin-users',
      label: 'Gestión de Usuarios',
      icon: Users,
      view: 'admin-users',
      active: currentView === 'admin-users'
    },
    {
      id: 'admin-cohorts',
      label: 'Gestión de Cohortes',
      icon: Users2,
      view: 'admin-cohorts',
      active: currentView === 'admin-cohorts'
    },
    {
      id: 'admin-credentials',
      label: 'Gestión de Credenciales',
      icon: Shield,
      view: 'admin-credentials',
      active: currentView === 'admin-credentials'
    },
    {
      id: 'payment-management',
      label: 'Gestión de Pagos',
      icon: Building,
      view: 'payment-management',
      active: currentView === 'payment-management'
    },
    {
      id: 'settings',
      label: 'Configuraciones',
      icon: Settings,
      view: 'settings',
      active: currentView === 'settings'
    }
  ];

  const teacherNavigationItems = [
    {
      id: 'home',
      label: 'Dashboard',
      icon: Home,
      view: 'home',
      active: currentView === 'home'
    },
    {
      id: 'admin-courses',
      label: 'Mis Cursos',
      icon: BookOpen,
      view: 'admin-courses',
      active: currentView === 'admin-courses'
    },
    {
      id: 'admin-cohorts',
      label: 'Mis Cohortes',
      icon: Users2,
      view: 'admin-cohorts',
      active: currentView === 'admin-cohorts'
    },
    {
      id: 'content',
      label: 'Contenido',
      icon: Square,
      view: 'content',
      active: currentView === 'content'
    }
  ];

  const navigationItems = isAdmin 
    ? adminNavigationItems 
    : isTeacher 
    ? teacherNavigationItems 
    : studentNavigationItems;

  return (
    <div className="w-64 bg-black text-white flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Logo size="md" />
      </div>

      {/* Role Badge */}
      {(isAdmin || isTeacher) && (
        <div className="px-6 py-3 border-b border-gray-800">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            isAdmin 
              ? 'bg-red-900 text-red-300' 
              : 'bg-green-900 text-green-300'
          }`}>
            <Shield className="w-3 h-3 mr-1" />
            {isAdmin ? 'Administrador' : 'Profesor'}
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 py-6">
        <div className="space-y-2 px-4">
          {navigationItems.map(item => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => onViewChange(item.view)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                  item.active 
                    ? 'bg-gray-800 text-white border-l-4 border-yellow-400' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Icon 
                  size={20} 
                  className={`${
                    item.active 
                      ? 'text-yellow-400' 
                      : 'text-gray-400 group-hover:text-white'
                  }`} 
                />
                <span className="font-medium text-sm">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
