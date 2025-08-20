"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Users, 
  BookOpen, 
  FileText, 
  Settings, 
  BarChart3,
  Calendar,
  UserCog,
  School,
  Shield,
  ClipboardCheck,
  TrendingUp,
  Plus,
  UserPlus
} from 'lucide-react';
import { Logo } from '../ui/Logo';

interface EducationalSidebarProps {
  userRole: string;
}

export function EducationalSidebar({ userRole }: EducationalSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isRouteActive = (route: string) => {
    return pathname.includes(route);
  };

  const getNavigationItems = () => {
    const baseItems = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        route: '/dashboard/admin',
        section: 'main',
        roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
      }
    ];

    const contentItems = [
      {
        id: 'courses',
        label: 'Cursos',
        icon: GraduationCap,
        route: '/dashboard/admin/courses',
        section: 'content',
        roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
      },
      {
        id: 'lessons',
        label: 'Lecciones',
        icon: BookOpen,
        route: '/dashboard/lessons',
        section: 'content',
        roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
      },
      {
        id: 'assessments',
        label: 'Evaluaciones',
        icon: ClipboardCheck,
        route: '/dashboard/assessments',
        section: 'content',
        roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
      }
    ];

    const managementItems = [
      {
        id: 'students',
        label: 'Estudiantes',
        icon: Users,
        route: '/dashboard/students',
        section: 'management',
        roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
      },
      {
        id: 'cohorts',
        label: 'Cohortes',
        icon: School,
        route: '/dashboard/admin/cohorts',
        section: 'management',
        roles: ['SUPER_ADMIN', 'ADMIN']
      },
      {
        id: 'users',
        label: 'Usuarios',
        icon: UserCog,
        route: '/dashboard/admin/users',
        section: 'management',
        roles: ['SUPER_ADMIN', 'ADMIN']
      },
      {
        id: 'credentials',
        label: 'Credenciales',
        icon: Shield,
        route: '/dashboard/admin/credentials',
        section: 'management',
        roles: ['SUPER_ADMIN', 'ADMIN']
      }
    ];

    const analyticsItems = [
      {
        id: 'progress',
        label: 'Progreso',
        icon: TrendingUp,
        route: '/dashboard/progress',
        section: 'analytics',
        roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: BarChart3,
        route: '/dashboard/admin/analytics',
        section: 'analytics',
        roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
      },
      {
        id: 'calendar',
        label: 'Calendario',
        icon: Calendar,
        route: '/dashboard/admin/calendar',
        section: 'analytics',
        roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
      }
    ];

    const systemItems = [
      {
        id: 'settings',
        label: 'Configuración',
        icon: Settings,
        route: '/dashboard/admin/settings',
        section: 'system',
        roles: ['SUPER_ADMIN', 'ADMIN']
      }
    ];

    return {
      main: baseItems,
      content: contentItems,
      management: managementItems,
      analytics: analyticsItems,
      system: systemItems
    };
  };

  const sections = getNavigationItems();

  const renderSection = (items: any[], title?: string) => {
    // Filtrar items por rol del usuario
    const filteredItems = items.filter(item => 
      item.roles.includes(userRole) || item.roles.includes('SUPER_ADMIN')
    );

    if (filteredItems.length === 0) return null;

    return (
      <div key={title || 'main'} className="space-y-2">
        {title && (
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
            {title}
          </h3>
        )}
        {filteredItems.map(item => {
          const Icon = item.icon;
          const isActive = isRouteActive(item.route);
          
          return (
            <motion.button
              key={item.id}
              onClick={() => router.push(item.route)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                isActive 
                  ? 'bg-gray-800 text-white border-l-4 border-yellow-400' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Icon 
                size={18} 
                className={`${
                  isActive 
                    ? 'text-yellow-400' 
                    : 'text-gray-400 group-hover:text-white'
                }`} 
              />
              <span className="font-medium text-sm">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-screen border-r border-gray-700">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <Logo size="md" />
        <div className="mt-2">
          <span className="text-xs text-yellow-400 font-medium uppercase tracking-wider">
            KaledAcademy
          </span>
        </div>
        <div className="mt-1">
          <span className="text-xs text-gray-400">
            Plataforma Educativa
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto">
        <div className="px-4 space-y-8">
          {/* Main */}
          {renderSection(sections.main)}

          {/* Content Management */}
          {renderSection(sections.content, 'Contenido Educativo')}

          {/* Management */}
          {renderSection(sections.management, 'Gestión')}

          {/* Analytics */}
          {renderSection(sections.analytics, 'Analíticas')}

          {/* System */}
          {renderSection(sections.system, 'Sistema')}
        </div>
      </nav>

      {/* Role Badge */}
      <div className="p-4 border-t border-gray-700">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              userRole === 'SUPER_ADMIN' ? 'bg-red-400' :
              userRole === 'ADMIN' ? 'bg-blue-400' :
              userRole === 'TEACHER' ? 'bg-green-400' :
              'bg-yellow-400'
            }`} />
            <span className="text-xs font-medium text-gray-300">
              {userRole === 'SUPER_ADMIN' ? 'Super Admin' :
               userRole === 'ADMIN' ? 'Administrador' :
               userRole === 'TEACHER' ? 'Profesor' :
               'Estudiante'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
