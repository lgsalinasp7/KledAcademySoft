"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { EducationalSidebar } from './EducationalSidebar';
import { AppHeader } from './AppHeader';

// Admin Views
import { AdminDashboardView } from '../features/admin/AdminDashboardView';
import { CoursesManagement } from '../features/admin/CoursesManagement';
import { CohortsManagement } from '../features/admin/CohortsManagement';
import { UsersManagement } from '../features/admin/UsersManagement';
import { CredentialsManagement } from '../features/admin/CredentialsManagement';

interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

interface AdminLayoutProps {
  user: User;
  onLogout: () => void;
}

export function AdminLayout({ user, onLogout }: AdminLayoutProps) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname.includes('/dashboard/admin/courses')) return 'Gestión de Cursos';
    if (pathname.includes('/dashboard/admin/cohorts')) return 'Gestión de Cohortes';
    if (pathname.includes('/dashboard/admin/users')) return 'Gestión de Usuarios';
    if (pathname.includes('/dashboard/admin/credentials')) return 'Gestión de Credenciales';
    if (pathname.includes('/dashboard/admin/roles')) return 'Gestión de Roles';
    if (pathname.includes('/dashboard/admin/analytics')) return 'Analytics';
    if (pathname.includes('/dashboard/admin/calendar')) return 'Calendario';
    if (pathname.includes('/dashboard/admin/settings')) return 'Configuración';
    if (pathname.includes('/dashboard/lessons')) return 'Lecciones';
    if (pathname.includes('/dashboard/assessments')) return 'Evaluaciones';
    if (pathname.includes('/dashboard/students')) return 'Estudiantes';
    if (pathname.includes('/dashboard/progress')) return 'Progreso';
    return 'Dashboard Educativo';
  };

  const renderContent = () => {
    if (pathname.includes('/dashboard/admin/courses')) {
      return <CoursesManagement />;
    }
    if (pathname.includes('/dashboard/admin/cohorts')) {
      return <CohortsManagement />;
    }
    if (pathname.includes('/dashboard/admin/users')) {
      return <UsersManagement user={user as any} />;
    }
    if (pathname.includes('/dashboard/admin/credentials')) {
      return <CredentialsManagement />;
    }
    if (pathname.includes('/dashboard/admin/roles')) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Roles</h2>
            <p className="text-gray-600">Esta sección está siendo desarrollada.</p>
          </div>
        </div>
      );
    }
    if (pathname.includes('/dashboard/admin/analytics')) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics</h2>
            <p className="text-gray-600">Esta sección está siendo desarrollada.</p>
          </div>
        </div>
      );
    }
    if (pathname.includes('/dashboard/admin/calendar')) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Calendario</h2>
            <p className="text-gray-600">Esta sección está siendo desarrollada.</p>
          </div>
        </div>
      );
    }
    if (pathname.includes('/dashboard/admin/settings')) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Configuración</h2>
            <p className="text-gray-600">Esta sección está siendo desarrollada.</p>
          </div>
        </div>
      );
    }
    if (pathname.includes('/dashboard/lessons')) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Lecciones</h2>
            <p className="text-gray-600">Sistema de lecciones en desarrollo.</p>
          </div>
        </div>
      );
    }
    if (pathname.includes('/dashboard/assessments')) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Evaluaciones</h2>
            <p className="text-gray-600">Sistema de evaluaciones en desarrollo.</p>
          </div>
        </div>
      );
    }
    if (pathname.includes('/dashboard/students')) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Estudiantes</h2>
            <p className="text-gray-600">Gestión de estudiantes en desarrollo.</p>
          </div>
        </div>
      );
    }
    if (pathname.includes('/dashboard/progress')) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Progreso</h2>
            <p className="text-gray-600">Seguimiento de progreso en desarrollo.</p>
          </div>
        </div>
      );
    }
    
    // Default dashboard view
    return <AdminDashboardView user={user} onNavigateToSection={() => {}} onLogout={onLogout} />;
  };

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      {/* Educational Sidebar */}
      <EducationalSidebar userRole={user.role} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <AppHeader
          title={getPageTitle()}
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
