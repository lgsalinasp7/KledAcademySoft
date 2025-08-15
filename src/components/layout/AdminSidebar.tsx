import React from 'react';
import { motion } from 'framer-motion';
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
  School
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { UserRole } from '../../types';

interface AdminSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  userRole: UserRole;
}

export function AdminSidebar({ currentView, onViewChange, userRole }: AdminSidebarProps) {
  const getNavigationItems = () => {
    const baseItems = [
      {
        id: 'admin-dashboard',
        label: 'Dashboard',
        icon: LayoutDashboard,
        view: 'admin-dashboard',
        section: 'main'
      }
    ];

    const adminItems = [
      {
        id: 'courses',
        label: 'Cursos',
        icon: GraduationCap,
        view: 'admin-courses',
        section: 'content'
      },
      {
        id: 'cohorts',
        label: 'Cohortes',
        icon: School,
        view: 'admin-cohorts',
        section: 'content'
      },
      {
        id: 'modules',
        label: 'Módulos',
        icon: BookOpen,
        view: 'admin-modules',
        section: 'content'
      },
      {
        id: 'lessons',
        label: 'Lecciones',
        icon: FileText,
        view: 'admin-lessons',
        section: 'content'
      }
    ];

    const managementItems = [
      {
        id: 'users',
        label: 'Usuarios',
        icon: Users,
        view: 'admin-users',
        section: 'management'
      },
      {
        id: 'calendar',
        label: 'Calendario',
        icon: Calendar,
        view: 'admin-calendar',
        section: 'management'
      },
      {
        id: 'analytics',
        label: 'Analytics',
        icon: BarChart3,
        view: 'admin-analytics',
        section: 'management'
      }
    ];

    const systemItems = [
      {
        id: 'roles',
        label: 'Roles y Permisos',
        icon: UserCog,
        view: 'admin-roles',
        section: 'system'
      },
      {
        id: 'settings',
        label: 'Configuración',
        icon: Settings,
        view: 'admin-settings',
        section: 'system'
      }
    ];

    // Filter based on role
    if (userRole === 'teacher') {
      return [
        ...baseItems,
        ...adminItems.filter(item => ['modules', 'lessons'].includes(item.id)),
        ...managementItems.filter(item => ['calendar', 'analytics'].includes(item.id))
      ];
    }

    if (userRole === 'admin') {
      return [...baseItems, ...adminItems, ...managementItems];
    }

    // super_admin gets everything
    return [...baseItems, ...adminItems, ...managementItems, ...systemItems];
  };

  const navigationItems = getNavigationItems();
  const sections = {
    main: navigationItems.filter(item => item.section === 'main'),
    content: navigationItems.filter(item => item.section === 'content'),
    management: navigationItems.filter(item => item.section === 'management'),
    system: navigationItems.filter(item => item.section === 'system')
  };

  const renderSection = (items: any[], title?: string) => (
    <div className="space-y-2">
      {title && (
        <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          {title}
        </h3>
      )}
      {items.map(item => {
        const Icon = item.icon;
        const isActive = currentView === item.view;
        
        return (
          <motion.button
            key={item.id}
            onClick={() => onViewChange(item.view)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
              isActive 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <Icon 
              size={18} 
              className={`${
                isActive 
                  ? 'text-white' 
                  : 'text-gray-400 group-hover:text-white'
              }`} 
            />
            <span className="font-medium text-sm">{item.label}</span>
            {isActive && (
              <motion.div
                layoutId="activeIndicator"
                className="ml-auto w-2 h-2 bg-white rounded-full"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
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
              userRole === 'super_admin' ? 'bg-red-400' :
              userRole === 'admin' ? 'bg-blue-400' :
              'bg-green-400'
            }`} />
            <span className="text-xs font-medium text-gray-300">
              {userRole === 'super_admin' ? 'Super Admin' :
               userRole === 'admin' ? 'Administrador' :
               'Profesor'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
