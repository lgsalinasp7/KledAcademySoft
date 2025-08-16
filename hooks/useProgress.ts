"use client";

import { useState, useEffect } from 'react';

// Types
export interface StudentProgress {
  userId: string;
  courseId: string;
  moduleProgress: {
    moduleId: string;
    completedLessons: string[];
    currentLesson: string;
    progress: number;
  }[];
  overallProgress: number;
  lastActivity: string;
}

// Mock data - esto se puede mover a un archivo separado después
const demoStudentProgress: StudentProgress[] = [
  {
    userId: 'student-1',
    courseId: 'fullstack-career',
    moduleProgress: [
      {
        moduleId: 'module-0',
        completedLessons: ['lesson-1', 'lesson-2', 'lesson-3'],
        currentLesson: 'lesson-4',
        progress: 75
      },
      {
        moduleId: 'module-1',
        completedLessons: ['lesson-1'],
        currentLesson: 'lesson-2',
        progress: 25
      }
    ],
    overallProgress: 50,
    lastActivity: '2024-01-15T10:30:00Z'
  }
];

export const useProgress = (userId: string, courseId: string) => {
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    const loadProgress = () => {
      setLoading(true);
      
      // Buscar progreso en datos demo
      const userProgress = demoStudentProgress.find(
        p => p.userId === userId && p.courseId === courseId
      );

      if (userProgress) {
        setProgress(userProgress);
      } else {
        // Crear progreso inicial si no existe
        const initialProgress: StudentProgress = {
          userId,
          courseId,
          moduleProgress: [],
          overallProgress: 0,
          lastActivity: new Date().toISOString()
        };
        setProgress(initialProgress);
      }
      
      setLoading(false);
    };

    loadProgress();
  }, [userId, courseId]);

  const updateLessonProgress = (moduleId: string, lessonId: string, completed: boolean) => {
    if (!progress) return;

    const updatedProgress = { ...progress };
    const moduleIndex = updatedProgress.moduleProgress.findIndex(m => m.moduleId === moduleId);

    if (moduleIndex >= 0) {
      const module = updatedProgress.moduleProgress[moduleIndex];
      
      if (completed && !module.completedLessons.includes(lessonId)) {
        module.completedLessons.push(lessonId);
      } else if (!completed) {
        module.completedLessons = module.completedLessons.filter(id => id !== lessonId);
      }

      // Recalcular progreso del módulo
      // Esto debería venir de los datos del curso, pero por ahora usamos un valor fijo
      const totalLessons = 4; // Valor hardcodeado por ahora
      module.progress = (module.completedLessons.length / totalLessons) * 100;
    } else {
      // Crear nuevo módulo si no existe
      updatedProgress.moduleProgress.push({
        moduleId,
        completedLessons: completed ? [lessonId] : [],
        currentLesson: lessonId,
        progress: completed ? 25 : 0 // 25% por lección completada
      });
    }

    // Recalcular progreso general
    const totalModules = updatedProgress.moduleProgress.length;
    const totalProgress = updatedProgress.moduleProgress.reduce((sum, module) => sum + module.progress, 0);
    updatedProgress.overallProgress = totalModules > 0 ? totalProgress / totalModules : 0;

    updatedProgress.lastActivity = new Date().toISOString();
    setProgress(updatedProgress);
  };

  const getModuleProgress = (moduleId: string) => {
    if (!progress) return null;
    return progress.moduleProgress.find(m => m.moduleId === moduleId);
  };

  const isLessonCompleted = (moduleId: string, lessonId: string) => {
    const moduleProgress = getModuleProgress(moduleId);
    return moduleProgress?.completedLessons.includes(lessonId) || false;
  };

  return {
    progress,
    loading,
    updateLessonProgress,
    getModuleProgress,
    isLessonCompleted,
    overallProgress: progress?.overallProgress || 0
  };
};
