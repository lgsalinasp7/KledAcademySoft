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
import { LessonContentView } from "@/components/features/lessons/LessonContentView";
import { AdminDashboardView } from "@/components/features/admin/AdminDashboardView";
import { CredentialsManagement } from "@/components/features/admin/CredentialsManagement";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Users2, BarChart3, Settings, Shield, TrendingUp } from "lucide-react";

type ViewType = 'home' | 'content' | 'module-detail' | 'lesson-content' | 'payment-management' | 'kaled-x' | 'video-feed' | 'members' | 'academic-data' | 'admin-dashboard' | 'admin-courses' | 'admin-users' | 'admin-cohorts' | 'admin-credentials';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, signOut, checkAuth } = useAuthStore();
  const router = useRouter();
  
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

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
  
  const shouldShowCohortSidebar = !['home', 'payment-management', 'kaled-x', 'lesson-content', 'admin-dashboard', 'admin-courses', 'admin-users', 'admin-cohorts', 'admin-credentials'].includes(currentView);
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
        case 'content':
        case 'module-detail':
          return 'Mi Cohorte';
        default:
          return undefined;
      }
    } else {
      switch (currentView) {
        case 'content':
        case 'module-detail':
          return 'Mi Cohorte';
        case 'home':
          return undefined;
        default:
          return undefined;
      }
    }
  };

  const renderContent = () => {
    // Si es admin o profesor, mostrar vistas administrativas con el mismo diseño
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
          return (
            <div className="flex-1 bg-black p-6 overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2">Gestión de Cursos</h1>
                  <p className="text-gray-400">Administra los cursos disponibles en la plataforma</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-white">Full Stack Web Development</CardTitle>
                      <CardDescription className="text-gray-400">
                        Aprende desarrollo web completo con React, Node.js y MongoDB
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <span>Estado: Activo</span>
                        <span>6 meses</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-400 font-semibold">2999 USD</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black">
                            Editar
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-black">
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-white">Data Science Fundamentals</CardTitle>
                      <CardDescription className="text-gray-400">
                        Fundamentos de ciencia de datos con Python y SQL
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <span>Estado: Activo</span>
                        <span>4 meses</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-400 font-semibold">2499 USD</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black">
                            Editar
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-black">
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-white">UX/UI Design Masterclass</CardTitle>
                      <CardDescription className="text-gray-400">
                        Diseño de experiencias de usuario y interfaces
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <span>Estado: Activo</span>
                        <span>3 meses</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-400 font-semibold">1999 USD</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black">
                            Editar
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-black">
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          );

        case 'admin-users':
          return (
            <div className="flex-1 bg-black p-6 overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2">Gestión de Usuarios</h1>
                  <p className="text-gray-400">Administra los usuarios de la plataforma</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-white">Ana García</CardTitle>
                      <CardDescription className="text-gray-400">ana@kaledacademy.com</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <span className="bg-red-900 text-red-300 px-2 py-1 rounded">Super Admin</span>
                        <span>Activo</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-4">
                        Registrado: 31/12/2023<br/>
                        Último login: 13/1/2025
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black">
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-black">
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-white">Carlos López</CardTitle>
                      <CardDescription className="text-gray-400">carlos@kaledacademy.com</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <span className="bg-blue-900 text-blue-300 px-2 py-1 rounded">Administrador</span>
                        <span>Activo</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-4">
                        Registrado: 14/1/2024<br/>
                        Último login: 13/1/2025
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black">
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-black">
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-white">María Rodríguez</CardTitle>
                      <CardDescription className="text-gray-400">maria@kaledacademy.com</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <span className="bg-green-900 text-green-300 px-2 py-1 rounded">Profesor</span>
                        <span>Activo</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-4">
                        Registrado: 31/1/2024<br/>
                        Último login: 12/1/2025
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black">
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-black">
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          );

        case 'admin-cohorts':
          return (
            <div className="flex-1 bg-black p-6 overflow-y-auto">
              <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-white mb-2">Gestión de Cohortes</h1>
                  <p className="text-gray-400">Administra las cohortes de la plataforma</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-white">FS-Jan25</CardTitle>
                      <CardDescription className="text-gray-400">Full Stack Web Development</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <span className="bg-green-900 text-green-300 px-2 py-1 rounded">Activo</span>
                        <span>18/25 estudiantes</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-4">
                        15/1/2025 - 15/7/2025<br/>
                        Lunes, Miércoles, Viernes - 18:00
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black">
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-black">
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-white">DS-Feb25</CardTitle>
                      <CardDescription className="text-gray-400">Data Science & Analytics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded">Borrador</span>
                        <span>15/20 estudiantes</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-4">
                        1/2/2025 - 1/10/2025<br/>
                        Martes, Jueves - 19:00
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black">
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-black">
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-white">UX-Mar25</CardTitle>
                      <CardDescription className="text-gray-400">UX/UI Design Bootcamp</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                        <span className="bg-green-900 text-green-300 px-2 py-1 rounded">Activo</span>
                        <span>12/15 estudiantes</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-4">
                        1/3/2025 - 1/7/2025<br/>
                        Lunes, Miércoles - 17:00
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-black">
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-400 border-red-400 hover:bg-red-400 hover:text-black">
                          Eliminar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          );

        case 'admin-credentials':
          return <CredentialsManagement user={user} />;

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
      <MainSidebar currentView={currentView} onViewChange={handleViewChange} userRole={user?.role} />
      
      {shouldShowCohortSidebar && (
        <CohortSidebar currentView={currentView} onViewChange={handleViewChange} />
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
