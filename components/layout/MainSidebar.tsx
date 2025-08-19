"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Building, Square, BookOpen, Users, Users2, Settings, Shield, BarChart3, Calendar, UserCheck } from 'lucide-react';
import { Logo } from '../ui/Logo';

interface NavigationProps {
  userRole?: string;
}

export function MainSidebar({ userRole }: NavigationProps) {
  const pathname = usePathname();
  
  // Determinar el rol del usuario
  const isAdmin = userRole && ['ADMIN', 'SUPER_ADMIN'].includes(userRole);
  const isTeacher = userRole === 'TEACHER';

  // Función para determinar si una ruta está activa
  const isRouteActive = (route: string) => {
    if (route === 'teacher') {
      return pathname === '/dashboard/teacher';
    }
    return pathname.startsWith(`/dashboard/${route}`);
  };

  const studentNavigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      view: 'home',
      active: isRouteActive('home')
    },
    {
      id: 'demo',
      label: 'Demo Store',
      icon: Square,
      view: 'demo',
      active: isRouteActive('demo')
    },
    {
      id: 'payment-management',
      label: 'Gestión de pagos',
      icon: Building,
      view: 'payment-management',
      active: isRouteActive('payment-management')
    },
    {
      id: 'kaled-x',
      label: 'KaledAcademy X',
      icon: Square,
      view: 'kaled-x',
      active: isRouteActive('kaled-x')
    }
  ];

  const adminNavigationItems = [
    {
      id: 'home',
      label: 'Dashboard',
      icon: Home,
      view: 'home',
      active: isRouteActive('home')
    },
    {
      id: 'admin-courses',
      label: 'Gestión de Cursos',
      icon: BookOpen,
      view: 'admin-courses',
      active: isRouteActive('admin-courses')
    },
    {
      id: 'admin-users',
      label: 'Gestión de Usuarios',
      icon: Users,
      view: 'admin-users',
      active: isRouteActive('admin-users')
    },
    {
      id: 'admin-cohorts',
      label: 'Gestión de Cohortes',
      icon: Users2,
      view: 'admin-cohorts',
      active: isRouteActive('admin-cohorts')
    },
    {
      id: 'admin-credentials',
      label: 'Gestión de Credenciales',
      icon: Shield,
      view: 'admin-credentials',
      active: isRouteActive('admin-credentials')
    },
    {
      id: 'admin-roles',
      label: 'Gestión de Roles',
      icon: UserCheck,
      view: 'admin-roles',
      active: isRouteActive('admin-roles')
    },
    {
      id: 'admin-settings',
      label: 'Configuraciones',
      icon: Settings,
      view: 'admin-settings',
      active: isRouteActive('admin-settings')
    },
    {
      id: 'admin-analytics',
      label: 'Analytics',
      icon: BarChart3,
      view: 'admin-analytics',
      active: isRouteActive('admin-analytics')
    },
    {
      id: 'admin-calendar',
      label: 'Calendario',
      icon: Calendar,
      view: 'admin-calendar',
      active: isRouteActive('admin-calendar')
    }
  ];

  const teacherNavigationItems = [
    {
      id: 'home',
      label: 'Dashboard',
      icon: Home,
      view: 'teacher-dashboard',
      active: isRouteActive('teacher-dashboard')
    },
    {
      id: 'courses',
      label: 'Mis Cursos',
      icon: BookOpen,
      view: 'teacher-dashboard/courses',
      active: isRouteActive('teacher-dashboard/courses')
    },
    {
      id: 'students',
      label: 'Mis Estudiantes',
      icon: Users,
      view: 'teacher-dashboard/students',
      active: isRouteActive('teacher-dashboard/students')
    },
    {
      id: 'evaluations',
      label: 'Evaluaciones',
      icon: UserCheck,
      view: 'teacher-dashboard/evaluations',
      active: isRouteActive('teacher-dashboard/evaluations')
    },
    {
      id: 'messages',
      label: 'Mensajes',
      icon: Calendar,
      view: 'teacher-dashboard/messages',
      active: isRouteActive('teacher-dashboard/messages')
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
              <Link
                key={item.id}
                href={`/dashboard/${item.view}`}
                className={`block w-full`}
              >
                <motion.div
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
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
