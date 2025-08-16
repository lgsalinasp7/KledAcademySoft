"use client";

import { useState } from 'react';
import { ViewType } from '../types';

export const useNavigation = (initialView: ViewType = 'home') => {
  const [currentView, setCurrentView] = useState<ViewType>(initialView);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const navigateToHome = () => {
    setCurrentView('home');
    setSelectedModule(null);
    setSelectedLesson(null);
  };

  const navigateToContent = () => {
    setCurrentView('content');
    setSelectedModule(null);
    setSelectedLesson(null);
  };

  const navigateToModuleDetail = (moduleId: string) => {
    setSelectedModule(moduleId);
    setCurrentView('module-detail');
    setSelectedLesson(null);
  };

  const navigateToLessonContent = (lessonId: string) => {
    setSelectedLesson(lessonId);
    setCurrentView('lesson-content');
  };

  const navigateToVideoFeed = () => {
    setCurrentView('video-feed');
    setSelectedModule(null);
    setSelectedLesson(null);
  };

  const navigateToAdminSection = (section: string) => {
    setCurrentView(section as ViewType);
    setSelectedModule(null);
    setSelectedLesson(null);
  };

  const navigateBack = () => {
    if (currentView === 'lesson-content') {
      setSelectedLesson(null);
      setCurrentView('module-detail');
    } else if (currentView === 'module-detail') {
      setSelectedModule(null);
      setCurrentView('content');
    } else if (currentView.startsWith('admin-')) {
      setCurrentView('home');
    } else {
      setCurrentView('home');
    }
  };

  const resetNavigation = () => {
    setCurrentView('home');
    setSelectedModule(null);
    setSelectedLesson(null);
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
    navigateToVideoFeed,
    navigateToAdminSection,
    navigateBack,
    resetNavigation
  };
};
