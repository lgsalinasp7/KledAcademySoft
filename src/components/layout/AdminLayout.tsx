import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AppHeader } from './AppHeader';
import { User } from '../../types';

// Admin Views
import { AdminDashboard } from '../features/admin/AdminDashboard';
import { CoursesManagement } from '../features/admin/CoursesManagement';
import { CohortsManagement } from '../features/admin/CohortsManagement';
import { ModulesManagement } from '../features/admin/ModulesManagement';
import { LessonsManagement } from '../features/admin/LessonsManagement';
import { UsersManagement } from '../features/admin/UsersManagement';
import { CalendarManagement } from '../features/admin/CalendarManagement';
import { AnalyticsManagement } from '../features/admin/AnalyticsManagement';
import { RolesManagement } from '../features/admin/RolesManagement';
import { SettingsManagement } from '../features/admin/SettingsManagement';

interface AdminLayoutProps {
  user: User;
  onLogout: () => void;
}

export function AdminLayout({ user, onLogout }: AdminLayoutProps) {
  const [currentView, setCurrentView] = useState('admin-dashboard');
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const getPageTitle = () => {
    switch (currentView) {
      case 'admin-dashboard': return 'Dashboard Administrativo';
      case 'admin-courses': return 'Gestión de Cursos';
      case 'admin-cohorts': return 'Gestión de Cohortes';
      case 'admin-modules': return 'Gestión de Módulos';
      case 'admin-lessons': return 'Gestión de Lecciones';
      case 'admin-users': return 'Gestión de Usuarios';
      case 'admin-calendar': return 'Calendario Académico';
      case 'admin-analytics': return 'Analytics y Reportes';
      case 'admin-roles': return 'Roles y Permisos';
      case 'admin-settings': return 'Configuración del Sistema';
      default: return 'Panel Administrativo';
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'admin-dashboard':
        return <AdminDashboard user={user} />;
      
      case 'admin-courses':
        return <CoursesManagement user={user} />;
      
      case 'admin-cohorts':
        return <CohortsManagement user={user} />;
      
      case 'admin-modules':
        return <ModulesManagement user={user} />;
      
      case 'admin-lessons':
        return <LessonsManagement user={user} />;
      
      case 'admin-users':
        return <UsersManagement user={user} />;
      
      case 'admin-calendar':
        return <CalendarManagement user={user} />;
      
      case 'admin-analytics':
        return <AnalyticsManagement user={user} />;
      
      case 'admin-roles':
        return <RolesManagement user={user} />;
      
      case 'admin-settings':
        return <SettingsManagement user={user} />;
      
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">Vista en Desarrollo</h2>
              <p className="text-gray-400">Esta sección está siendo desarrollada.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      {/* Admin Sidebar */}
      <AdminSidebar 
        currentView={currentView} 
        onViewChange={setCurrentView}
        userRole={user.role}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <AppHeader
          title={getPageTitle()}
          user={user}
          onLogout={onLogout}
          showUserDropdown={showUserDropdown}
          onToggleUserDropdown={() => setShowUserDropdown(!showUserDropdown)}
          showUserProfile={true}
        />

        {/* Content Area */}
        <main className="flex-1 bg-gray-50 min-h-0 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
