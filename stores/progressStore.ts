import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { persist } from 'zustand/middleware';

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

interface ProgressState {
  // Estado
  progress: StudentProgress | null;
  loading: boolean;
  error: string | null;
  
  // Acciones
  loadProgress: (userId: string, courseId: string) => Promise<void>;
  updateLessonProgress: (moduleId: string, lessonId: string, completed: boolean) => void;
  markLessonCompleted: (moduleId: string, lessonId: string) => void;
  resetProgress: (userId: string, courseId: string) => void;
  
  // Selectores computados
  isLessonCompleted: (moduleId: string, lessonId: string) => boolean;
  getModuleProgress: (moduleId: string) => number;
  getOverallProgress: () => number;
  getCompletedLessons: () => string[];
}

// Mock data
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

export const useProgressStore = create<ProgressState>()(
  subscribeWithSelector(
    devtools(
      persist(
        (set, get) => ({
          // Estado inicial
          progress: null,
          loading: false,
          error: null,

          // Acciones
          loadProgress: async (userId: string, courseId: string) => {
            set({ loading: true, error: null });
            
            try {
              // Simular delay de red
              await new Promise(resolve => setTimeout(resolve, 500));
              
              // Buscar progreso en datos demo
              const userProgress = demoStudentProgress.find(
                p => p.userId === userId && p.courseId === courseId
              );

              if (userProgress) {
                set({ progress: userProgress, loading: false });
              } else {
                // Crear progreso inicial si no existe
                const initialProgress: StudentProgress = {
                  userId,
                  courseId,
                  moduleProgress: [],
                  overallProgress: 0,
                  lastActivity: new Date().toISOString()
                };
                set({ progress: initialProgress, loading: false });
              }
            } catch (error) {
              set({ 
                error: 'Error al cargar el progreso', 
                loading: false 
              });
            }
          },

          updateLessonProgress: (moduleId: string, lessonId: string, completed: boolean) => {
            const { progress } = get();
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

            set({ progress: updatedProgress });
          },

          markLessonCompleted: (moduleId: string, lessonId: string) => {
            get().updateLessonProgress(moduleId, lessonId, true);
          },

          resetProgress: (userId: string, courseId: string) => {
            const initialProgress: StudentProgress = {
              userId,
              courseId,
              moduleProgress: [],
              overallProgress: 0,
              lastActivity: new Date().toISOString()
            };
            set({ progress: initialProgress });
          },

          // Selectores computados
          isLessonCompleted: (moduleId: string, lessonId: string) => {
            const { progress } = get();
            if (!progress) return false;
            
            const module = progress.moduleProgress.find(m => m.moduleId === moduleId);
            return module ? module.completedLessons.includes(lessonId) : false;
          },

          getModuleProgress: (moduleId: string) => {
            const { progress } = get();
            if (!progress) return 0;
            
            const module = progress.moduleProgress.find(m => m.moduleId === moduleId);
            return module ? module.progress : 0;
          },

          getOverallProgress: () => {
            const { progress } = get();
            return progress ? progress.overallProgress : 0;
          },

          getCompletedLessons: () => {
            const { progress } = get();
            if (!progress) return [];
            
            return progress.moduleProgress.flatMap(module => module.completedLessons);
          }
        }),
        {
          name: 'progress-storage',
          partialize: (state) => ({ 
            progress: state.progress 
          })
        }
      ),
      {
        name: 'progress-store',
        enabled: process.env.NODE_ENV === 'development'
      }
    )
  )
);

// Selectores optimizados
export const useProgress = () => useProgressStore(state => state.progress);
export const useProgressLoading = () => useProgressStore(state => state.loading);
export const useProgressError = () => useProgressStore(state => state.error);
export const useProgressActions = () => useProgressStore(state => ({
  loadProgress: state.loadProgress,
  updateLessonProgress: state.updateLessonProgress,
  markLessonCompleted: state.markLessonCompleted,
  resetProgress: state.resetProgress
}));
export const useProgressSelectors = () => useProgressStore(state => ({
  isLessonCompleted: state.isLessonCompleted,
  getModuleProgress: state.getModuleProgress,
  getOverallProgress: state.getOverallProgress,
  getCompletedLessons: state.getCompletedLessons
}));
