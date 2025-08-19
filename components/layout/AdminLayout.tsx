"use client";

import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
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
  const [currentView, setCurrentView] = useState('admin-dashboard');
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const getPageTitle = () => {
    switch (currentView) {
      case 'admin-dashboard': return 'Dashboard Administrativo';
      case 'admin-courses': return 'Gestión de Cursos';
      case 'admin-cohorts': return 'Gestión de Cohortes';
      case 'admin-users': return 'Gestión de Usuarios';
      case 'admin-credentials': return 'Gestión de Credenciales';
      default: return 'Panel Administrativo';
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'admin-dashboard':
        return <AdminDashboardView user={user} onNavigateToSection={setCurrentView} onLogout={onLogout} />;
      
      case 'admin-courses':
        return <CoursesManagement />;
      
      case 'admin-cohorts':
        return <CohortsManagement />;
      
      case 'admin-users':
        return <UsersManagement user={user as any} />;
      
      case 'admin-credentials':
        return <CredentialsManagement />;
      
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
