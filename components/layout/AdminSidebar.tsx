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
  Shield
} from 'lucide-react';
import { Logo } from '../ui/Logo';

interface AdminSidebarProps {
  userRole: string;
}

export function AdminSidebar({ userRole }: AdminSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isRouteActive = (route: string) => {
    return pathname.includes(route);
  };

  const getNavigationItems = () => {
    const baseItems = [
      {
        id: 'admin-dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        route: '/dashboard/admin',
        section: 'main'
      }
    ];

    const adminItems = [
      {
        id: 'courses',
        label: 'Cursos',
        icon: GraduationCap,
        route: '/dashboard/admin/courses',
        section: 'content'
      },
      {
        id: 'cohorts',
        label: 'Cohortes',
        icon: School,
        route: '/dashboard/admin/cohorts',
        section: 'content'
      },
      {
        id: 'modules',
        label: 'Módulos',
        icon: BookOpen,
        route: '/dashboard/admin/modules',
        section: 'content'
      },
      {
        id: 'lessons',
        label: 'Lecciones',
        icon: FileText,
        route: '/dashboard/admin/lessons',
        section: 'content'
      }
    ];

    const managementItems = [
      {
        id: 'users',
        label: 'Usuarios',
        icon: Users,
        route: '/dashboard/admin/users',
        section: 'management'
      },
      {
        id: 'credentials',
        label: 'Gestión de Credenciales',
        icon: Shield,
        route: '/dashboard/admin/credentials',
        section: 'management'
      },
      {
        id: 'roles',
        label: 'Gestión de Roles',
        icon: UserCog,
        route: '/dashboard/admin/roles',
        section: 'management'
      },
      {
        id: 'calendar',
        label: 'Calendario',
        icon: Calendar,
        route: '/dashboard/admin/calendar',
        section: 'management'
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: BarChart3,
        route: '/dashboard/admin/analytics',
        section: 'management'
      }
    ];

    const systemItems = [
      {
        id: 'settings',
        label: 'Configuración',
        icon: Settings,
        route: '/dashboard/admin/settings',
        section: 'system'
      }
    ];

    return {
      main: baseItems,
      content: adminItems,
      management: managementItems,
      system: systemItems
    };
  };

  const sections = getNavigationItems();

  const renderSection = (items: any[], title?: string) => (
    <div key={title || 'main'} className="space-y-2">
      {title && (
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
          {title}
        </h3>
      )}
      {items.map(item => {
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

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-screen border-r border-gray-700">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <Logo size="md" />
        <div className="mt-2">
          <span className="text-xs text-blue-400 font-medium uppercase tracking-wider">
            Panel Administrativo
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 overflow-y-auto">
        <div className="px-4 space-y-8">
          {/* Main */}
          {sections.main.length > 0 && renderSection(sections.main)}

          {/* Content Management */}
          {sections.content.length > 0 && renderSection(sections.content, 'Gestión de Contenido')}

          {/* Management */}
          {sections.management.length > 0 && renderSection(sections.management, 'Administración')}

          {/* System */}
          {sections.system.length > 0 && renderSection(sections.system, 'Sistema')}
        </div>
      </nav>

      {/* Role Badge */}
      <div className="p-4 border-t border-gray-700">
        <div className="bg-gray-800 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              userRole === 'SUPER_ADMIN' ? 'bg-red-400' :
              userRole === 'ADMIN' ? 'bg-blue-400' :
              'bg-green-400'
            }`} />
            <span className="text-xs font-medium text-gray-300">
              {userRole === 'SUPER_ADMIN' ? 'Super Admin' :
               userRole === 'ADMIN' ? 'Administrador' :
               'Profesor'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
