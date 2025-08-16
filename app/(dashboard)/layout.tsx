"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/hooks/useApp";
import { MainSidebar } from "@/components/layout/MainSidebar";
import { CohortSidebar } from "@/components/layout/CohortSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { Notifications } from "@/components/ui/Notifications";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { slug?: string[] };
}

export default function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const { 
    currentUser, 
    isAuthenticated, 
    isLoading, 
    signOut,
    currentView
  } = useApp();
  
  // Determinar la vista actual basada en la URL
  const shouldShowCohortSidebar = !['home', 'payment-management', 'kaled-x', 'lesson-content', 'admin-dashboard', 'admin-courses', 'admin-users', 'admin-cohorts', 'admin-credentials', 'admin-roles', 'admin-settings', 'admin-analytics', 'admin-calendar', 'video-feed'].includes(currentView);
  const shouldShowHeader = !['lesson-content'].includes(currentView);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = () => {
    signOut();
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!currentUser || !isAuthenticated) {
    return null;
  }

  const getHeaderTitle = () => {
    const isAdmin = currentUser && ['ADMIN', 'SUPER_ADMIN'].includes(currentUser.role);
    const isTeacher = currentUser && currentUser.role === 'TEACHER';

    if (isAdmin || isTeacher) {
      switch (currentView) {
        case 'admin-dashboard':
          return 'Panel de Administración';
        case 'admin-courses':
          return 'Gestión de Cursos';
        case 'admin-users':
          return 'Gestión de Usuarios';
        case 'admin-cohorts':
          return 'Gestión de Cohortes';
        case 'admin-credentials':
          return 'Gestión de Credenciales';
        case 'admin-roles':
          return 'Gestión de Roles';
        case 'admin-settings':
          return 'Configuración del Sistema';
        case 'admin-analytics':
          return 'Analytics y Reportes';
        case 'admin-calendar':
          return 'Calendario Académico';
        case 'content':
        case 'module-detail':
          return 'Mi Cohorte';
        case 'video-feed':
          return 'Video Feed';
        default:
          return undefined;
      }
    } else {
      switch (currentView) {
        case 'content':
        case 'module-detail':
          return 'Mi Cohorte';
        case 'video-feed':
          return 'Video Feed';
        case 'home':
          return undefined;
        default:
          return undefined;
      }
    }
  };

  return (
    <>
      <div className="h-screen bg-black flex overflow-hidden">
        <MainSidebar userRole={currentUser?.role} />
        
        {shouldShowCohortSidebar && (
          <CohortSidebar currentView={currentView} />
        )}

        <div className="flex-1 flex flex-col min-w-0">
          {shouldShowHeader && (
            <AppHeader
              title={getHeaderTitle()}
              showBackButton={currentView !== 'home'}
              user={currentUser}
              onLogout={handleLogout}
              showUserProfile={true}
            />
          )}

          <main className="flex-1 bg-black min-h-0">
            {children}
          </main>
        </div>
      </div>
      
      {/* Sistema de notificaciones global */}
      <Notifications />
    </>
  );
}
