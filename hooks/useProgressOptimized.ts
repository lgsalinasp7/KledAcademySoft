"use client";

import React from 'react';
import { useApp } from './useApp';
import { useProgress, useProgressActions, useProgressSelectors } from '@/stores/progressStore';

/**
 * Hook optimizado que combina el progreso del store principal
 * con las acciones específicas del store de progreso
 */
export const useProgressOptimized = () => {
  const { currentUser, overallProgress, activeCourse, activeModule, activeLesson } = useApp();
  const progress = useProgress();
  const { loadProgress, updateLessonProgress, markLessonCompleted, resetProgress } = useProgressActions();
  const { isLessonCompleted, getModuleProgress, getCompletedLessons } = useProgressSelectors();

  // Cargar progreso automáticamente cuando cambie el usuario
  React.useEffect(() => {
    if (currentUser && activeCourse) {
      loadProgress(currentUser.id, activeCourse.id);
    }
  }, [currentUser?.id, activeCourse?.id, loadProgress]);

  return {
    // Estado del progreso
    progress,
    overallProgress,
    currentUser,
    activeCourse,
    activeModule,
    activeLesson,
    
    // Acciones
    loadProgress,
    updateLessonProgress,
    markLessonCompleted,
    resetProgress,
    
    // Selectores optimizados
    isLessonCompleted,
    getModuleProgress,
    getCompletedLessons,
    
    // Helpers computados
    getCurrentModuleProgress: () => {
      if (!activeModule) return 0;
      return getModuleProgress(activeModule.id);
    },
    
    getCompletedLessonsCount: () => {
      return getCompletedLessons().length;
    },
    
    getTotalLessonsCount: () => {
      if (!activeCourse) return 0;
      return activeCourse.modules?.reduce((total: number, module: any) => {
        return total + (module.lessons?.length || 0);
      }, 0) || 0;
    },
    
    isCurrentLessonCompleted: () => {
      if (!activeModule || !activeLesson) return false;
      return isLessonCompleted(activeModule.id, activeLesson.id);
    },
    
    completeCurrentLesson: () => {
      if (!activeModule || !activeLesson) return;
      markLessonCompleted(activeModule.id, activeLesson.id);
    }
  };
};
