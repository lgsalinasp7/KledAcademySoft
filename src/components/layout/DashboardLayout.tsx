import React, { useState } from 'react';
import { useNavigation } from '../../hooks/useNavigation';
import { MainSidebar } from './MainSidebar';
import { CohortSidebar } from './CohortSidebar';
import { AppHeader } from './AppHeader';
import { BaseLayoutProps } from '../../types';

// Views
import { HomeView } from '../features/dashboard/HomeView';
import { ModulesView } from '../features/dashboard/ModulesView';
import { ModuleDetailView } from '../features/dashboard/ModuleDetailView';
import { LessonContentView } from '../features/lessons/LessonContentView';
import { VideoPlayer } from '../features/dashboard/VideoPlayer';
import { PlaceholderView } from '../features/dashboard/PlaceholderView';

export function DashboardLayout({ user, onLogout }: BaseLayoutProps) {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const {
    currentView,
    selectedModule,
    selectedLesson,
    setCurrentView,
    navigateToHome,
    navigateToModuleDetail,
    navigateToLessonContent,
    navigateBack
  } = useNavigation();

  const shouldShowCohortSidebar = !['home', 'payment-management', 'kaled-x', 'lesson-content'].includes(currentView);
  const shouldShowHeader = !['lesson-content'].includes(currentView);

  const getHeaderTitle = () => {
    switch (currentView) {
      case 'content':
      case 'module-detail':
        return 'Mi Cohorte';
      case 'home':
        return undefined; // Home tendrá un header especial
      default:
        return undefined;
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView 
            user={user} 
            onNavigateToCareer={() => setCurrentView('content')} 
            onLogout={onLogout} 
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
            user={user}
            onLogout={onLogout}
          />
        ) : null;
      
      case 'video-feed':
        return <VideoPlayer />;
      
      default:
        return <PlaceholderView currentView={currentView} />;
    }
  };

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      <MainSidebar currentView={currentView} onViewChange={setCurrentView} />
      
      {shouldShowCohortSidebar && (
        <CohortSidebar currentView={currentView} onViewChange={setCurrentView} />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {shouldShowHeader && (
          <AppHeader
            title={getHeaderTitle()}
            showBackButton={currentView !== 'home'}
            onBack={navigateToHome}
            user={user}
            onLogout={onLogout}
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
