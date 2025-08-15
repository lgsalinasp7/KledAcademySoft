import { useState } from 'react';
import { ViewType } from '../types';

export const useNavigation = (initialView: ViewType = 'home') => {
  const [currentView, setCurrentView] = useState<ViewType>(initialView);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const navigateToHome = () => setCurrentView('home');
  const navigateToContent = () => setCurrentView('content');
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
      setSelectedLesson(null);
      setCurrentView('module-detail');
    } else if (currentView === 'module-detail') {
      setSelectedModule(null);
      setCurrentView('content');
    } else {
      setCurrentView('home');
    }
  };

  return {
    currentView,
    selectedModule,
    selectedLesson,
    setCurrentView,
    navigateToHome,
    navigateToContent,
    navigateToModuleDetail,
    navigateToLessonContent,
    navigateBack
  };
};
