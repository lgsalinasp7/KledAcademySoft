"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { MainSidebar } from "@/components/layout/MainSidebar";
import { CohortSidebar } from "@/components/layout/CohortSidebar";
import { AppHeader } from "@/components/layout/AppHeader";
import { HomeView } from "@/components/features/dashboard/HomeView";
import { ModulesView } from "@/components/features/dashboard/ModulesView";
import { ModuleDetailView } from "@/components/features/dashboard/ModuleDetailView";
import { VideoPlayer } from "@/components/features/dashboard/VideoPlayer";
import { LessonContentView } from "@/components/features/lessons/LessonContentView";
import { AdminDashboardView } from "@/components/features/admin/AdminDashboardView";
import { CredentialsManagement } from "@/components/features/admin/CredentialsManagement";
import { CoursesManagement } from "@/components/features/admin/CoursesManagement";
import { UsersManagement } from "@/components/features/admin/UsersManagement";
import { CohortsManagement } from "@/components/features/admin/CohortsManagement";
import { RolesManagement } from "@/components/features/admin/RolesManagement";
import { SettingsManagement } from "@/components/features/admin/SettingsManagement";
import { AnalyticsManagement } from "@/components/features/admin/AnalyticsManagement";
import { CalendarManagement } from "@/components/features/admin/CalendarManagement";
import { PlaceholderView } from "@/components/features/dashboard/PlaceholderView";
import { useProgress } from "@/hooks/useProgress";

type ViewType = 'home' | 'content' | 'module-detail' | 'lesson-content' | 'payment-management' | 'kaled-x' | 'video-feed' | 'members' | 'academic-data' | 'admin-dashboard' | 'admin-courses' | 'admin-users' | 'admin-cohorts' | 'admin-credentials' | 'admin-roles' | 'admin-settings' | 'admin-analytics' | 'admin-calendar';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, signOut, checkAuth } = useAuthStore();
  const router = useRouter();
  
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Hook de progreso
  const { progress, updateLessonProgress, isLessonCompleted } = useProgress(
    user?.id || 'student-1', 
    'fullstack-career'
  );

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = () => {
    signOut();
    router.push("/login");
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view as ViewType);
  };

  const navigateToHome = () => {
    setCurrentView('home');
    setSelectedModule(null);
    setSelectedLesson(null);
  };

  const navigateToModuleDetail = (moduleId: string) => {
    setSelectedModule(moduleId);
    setCurrentView('module-detail');
  };

  const navigateToLessonContent = (lessonId: string) => {
    setSelectedLesson(lessonId);
    setCurrentView('lesson-content');
  };

  const navigateBack = () => {
    if (currentView === 'lesson-content') {
      setCurrentView('module-detail');
      setSelectedLesson(null);
    } else if (currentView === 'module-detail') {
      setCurrentView('content');
      setSelectedModule(null);
    }
  };

  // Determinar si mostrar sidebars basado en el rol y vista actual
  const isAdmin = user && ['ADMIN', 'SUPER_ADMIN'].includes(user.role);
  const isTeacher = user && user.role === 'TEACHER';
  
  const shouldShowCohortSidebar = !['home', 'payment-management', 'kaled-x', 'lesson-content', 'admin-dashboard', 'admin-courses', 'admin-users', 'admin-cohorts', 'admin-credentials', 'admin-roles', 'admin-settings', 'admin-analytics', 'admin-calendar', 'video-feed'].includes(currentView);
  const shouldShowHeader = !['lesson-content'].includes(currentView);

  const getHeaderTitle = () => {
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

  const renderContent = () => {
    // Si es admin o profesor, mostrar vistas administrativas
    if (isAdmin || isTeacher) {
      switch (currentView) {
        case 'home':
          return (
            <AdminDashboardView 
              user={user!} 
              onNavigateToSection={(section) => setCurrentView(section as ViewType)}
              onLogout={handleLogout} 
            />
          );
        
        case 'admin-courses':
          return <CoursesManagement user={user! as any} />;
        
        case 'admin-users':
          return <UsersManagement user={user! as any} />;
        
        case 'admin-cohorts':
          return <CohortsManagement user={user! as any} />;
        
        case 'admin-credentials':
          return <CredentialsManagement user={user!} />;
        
        case 'admin-roles':
          return <RolesManagement user={user! as any} />;
        
        case 'admin-settings':
          return <SettingsManagement user={user! as any} />;
        
        case 'admin-analytics':
          return <AnalyticsManagement user={user! as any} />;
        
        case 'admin-calendar':
          return <CalendarManagement user={user! as any} />;
        
        case 'video-feed':
          return <VideoPlayer />;
        
        default:
          return (
            <div className="flex-1 bg-black flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-2xl font-bold mb-4">Vista en Desarrollo</h2>
                <p className="text-gray-400">Esta funcionalidad estará disponible pronto</p>
              </div>
            </div>
          );
      }
    }

    // Si es estudiante, mostrar dashboard normal
    switch (currentView) {
      case 'home':
        return (
          <HomeView 
            user={user!} 
            onNavigateToCareer={() => setCurrentView('content')} 
            onLogout={handleLogout} 
          />
        );
      
      case 'content':
        return (
          <ModulesView onModuleClick={navigateToModuleDetail} />
        );
      
      case 'module-detail':
        return selectedModule ? (
          <ModuleDetailView
            moduleId={selectedModule}
            onLessonClick={navigateToLessonContent}
            onBack={() => setCurrentView('content')}
          />
        ) : null;
      
      case 'lesson-content':
        return selectedLesson ? (
          <LessonContentView
            lessonCode={selectedLesson}
            lessonTitle="Intro & Herramientas"
            onBack={navigateBack}
            user={user!}
            onLogout={handleLogout}
          />
        ) : null;
      
      case 'video-feed':
        return <VideoPlayer />;
      
      case 'members':
      case 'academic-data':
      case 'payment-management':
      case 'kaled-x':
        return <PlaceholderView currentView={currentView} />;
      
      default:
        return (
          <div className="flex-1 bg-black flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-2xl font-bold mb-4">Vista en Desarrollo</h2>
              <p className="text-gray-400">Esta funcionalidad estará disponible pronto</p>
            </div>
          </div>
        );
    }
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

  if (!user) {
    return null;
  }

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      <MainSidebar userRole={user?.role} />
      
      {shouldShowCohortSidebar && (
        <CohortSidebar currentView={currentView} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {shouldShowHeader && (
          <AppHeader
            title={getHeaderTitle()}
            showBackButton={currentView !== 'home'}
            onBack={navigateToHome}
            user={user}
            onLogout={handleLogout}
            showUserDropdown={showUserDropdown}
            onToggleUserDropdown={() => setShowUserDropdown(!showUserDropdown)}
            showUserProfile={true}
          />
        )}

        <main className="flex-1 bg-black min-h-0">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
