"use client";

import { useEffect } from 'react';
import { useAppState, useAppActions } from '@/stores/mainStore';

/**
 * Hook principal de la aplicación que proporciona acceso unificado
 * a todo el estado y las acciones de la aplicación
 */
export const useApp = () => {
  const state = useAppState();
  const actions = useAppActions();

  // Inicializar la aplicación al montar el componente
  useEffect(() => {
    actions.initializeApp();
  }, [actions.initializeApp]);

  return {
    // Estado
    ...state,
    
    // Acciones
    ...actions,
    
    // Helpers
    isAdmin: state.currentUser && ['ADMIN', 'SUPER_ADMIN'].includes(state.currentUser.role),
    isTeacher: state.currentUser && state.currentUser.role === 'TEACHER',
    isStudent: state.currentUser && state.currentUser.role === 'STUDENT',
    
    // Acciones de navegación simplificadas
    goToHome: () => actions.navigateTo('home'),
    goToContent: () => actions.navigateTo('content'),
    goToAdmin: () => actions.navigateTo('admin-dashboard'),
    goToCourses: () => actions.navigateTo('admin-courses'),
    goToUsers: () => actions.navigateTo('admin-users'),
    goToCohorts: () => actions.navigateTo('admin-cohorts'),
    
    // Acciones de progreso simplificadas
    completeLesson: (moduleId: string, lessonId: string) => {
      actions.markLessonCompleted(moduleId, lessonId);
    },
    
    // Acciones de UI simplificadas
    showSuccess: (message: string) => {
      actions.addNotification({
        type: 'success',
        message,
        duration: 3000
      });
    },
    
    showError: (message: string) => {
      actions.addNotification({
        type: 'error',
        message,
        duration: 5000
      });
    },
    
    showWarning: (message: string) => {
      actions.addNotification({
        type: 'warning',
        message,
        duration: 4000
      });
    },
    
    showInfo: (message: string) => {
      actions.addNotification({
        type: 'info',
        message,
        duration: 3000
      });
    }
  };
};
