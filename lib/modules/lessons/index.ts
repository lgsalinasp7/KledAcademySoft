import { ModuleConfig } from '../index';

export const lessonsModule: ModuleConfig = {
  id: 'lessons',
  name: 'Lecciones',
  description: 'Sistema de gestión de contenido educativo y lecciones',
  version: '1.0.0',
  enabled: true,
  dependencies: ['auth', 'dashboard'],
  permissions: [
    'lessons:read',
    'lessons:create',
    'lessons:update',
    'lessons:delete',
    'lessons:progress:update'
  ],
  routes: [
    {
      path: '/dashboard/lessons/:lessonId',
      component: 'LessonContentView',
      title: 'Lección',
      icon: 'BookOpen',
      requiresAuth: true,
      roles: ['STUDENT', 'TEACHER', 'ADMIN']
    }
  ],
  components: [
    {
      name: 'LessonContentView',
      path: 'components/features/lessons/LessonContentView.tsx',
      type: 'component'
    },
    {
      name: 'LessonContent',
      path: 'components/features/lessons/LessonContent.tsx',
      type: 'component'
    },
    {
      name: 'LessonNavigation',
      path: 'components/features/lessons/LessonNavigation.tsx',
      type: 'component'
    },
    {
      name: 'LessonSidebar',
      path: 'components/features/lessons/LessonSidebar.tsx',
      type: 'component'
    }
  ]
};

export const lessonsModuleFunctions = {
  getLesson: async (lessonId: string) => {
    return {
      id: lessonId,
      title: 'Variables y Tipos de Datos',
      content: 'Contenido de la lección...',
      videoUrl: 'https://example.com/video.mp4',
      duration: 1800,
      completed: false
    };
  },
  
  markAsCompleted: async (lessonId: string, userId: string) => {
    return { success: true };
  }
};

export default lessonsModule;
