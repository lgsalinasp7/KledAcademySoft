import { ModuleConfig } from '../index';

export const dashboardModule: ModuleConfig = {
  id: 'dashboard',
  name: 'Dashboard',
  description: 'Panel principal para estudiantes y profesores',
  version: '1.0.0',
  enabled: true,
  dependencies: ['auth'],
  permissions: [
    'dashboard:read',
    'dashboard:progress:read',
    'dashboard:modules:read',
    'dashboard:lessons:read',
    'dashboard:profile:read',
    'dashboard:profile:update'
  ],
  routes: [
    {
      path: '/dashboard',
      component: 'DashboardHome',
      title: 'Dashboard',
      icon: 'Home',
      requiresAuth: true,
      roles: ['STUDENT', 'TEACHER', 'ADMIN']
    },
    {
      path: '/dashboard/modules',
      component: 'ModulesView',
      title: 'Módulos',
      icon: 'BookOpen',
      requiresAuth: true,
      roles: ['STUDENT', 'TEACHER', 'ADMIN']
    },
    {
      path: '/dashboard/profile',
      component: 'ProfileView',
      title: 'Perfil',
      icon: 'User',
      requiresAuth: true,
      roles: ['STUDENT', 'TEACHER', 'ADMIN']
    }
  ],
  components: [
    {
      name: 'DashboardHome',
      path: 'components/features/dashboard/HomeView.tsx',
      type: 'component'
    },
    {
      name: 'ModulesView',
      path: 'components/features/dashboard/ModulesView.tsx',
      type: 'component'
    },
    {
      name: 'ModuleDetailView',
      path: 'components/features/dashboard/ModuleDetailView.tsx',
      type: 'component'
    },
    {
      name: 'ProgressSection',
      path: 'components/features/dashboard/ProgressSection.tsx',
      type: 'component'
    }
  ]
};

// Funciones del módulo de dashboard
export const dashboardModuleFunctions = {
  // Gestión de progreso
  progress: {
    getProgress: async (userId: string) => {
      // Mock data - en producción vendría de la base de datos
      return {
        overallProgress: 65,
        completedLessons: 13,
        totalLessons: 20,
        currentModule: 'module-1',
        lastActivity: new Date().toISOString()
      };
    },
    
    updateProgress: async (userId: string, lessonId: string, completed: boolean) => {
      // Implementación de actualización de progreso
      return { success: true };
    },
    
    getModuleProgress: async (userId: string, moduleId: string) => {
      return {
        moduleId,
        progress: 75,
        completedLessons: 3,
        totalLessons: 4
      };
    }
  },

  // Gestión de módulos
  modules: {
    getModules: async (userId: string) => {
      // Mock data
      return [
        {
          id: 'module-1',
          title: 'Fundamentos de Programación',
          description: 'Introducción a los conceptos básicos',
          progress: 75,
          totalLessons: 4,
          completedLessons: 3
        },
        {
          id: 'module-2',
          title: 'Estructuras de Datos',
          description: 'Arrays, listas y objetos',
          progress: 25,
          totalLessons: 6,
          completedLessons: 1
        }
      ];
    },
    
    getModuleDetails: async (moduleId: string) => {
      return {
        id: moduleId,
        title: 'Fundamentos de Programación',
        description: 'Introducción a los conceptos básicos de programación',
        lessons: [
          { id: 'lesson-1', title: 'Variables y Tipos', completed: true },
          { id: 'lesson-2', title: 'Condicionales', completed: true },
          { id: 'lesson-3', title: 'Bucles', completed: true },
          { id: 'lesson-4', title: 'Funciones', completed: false }
        ]
      };
    }
  },

  // Gestión de perfil
  profile: {
    getUserProfile: async (userId: string) => {
      return {
        id: userId,
        name: 'Juan Pérez',
        email: 'juan.perez@email.com',
        role: 'STUDENT',
        avatar: null,
        preferences: {
          theme: 'dark',
          language: 'es',
          notifications: true
        }
      };
    },
    
    updateProfile: async (userId: string, profileData: any) => {
      return { success: true, profile: { id: userId, ...profileData } };
    }
  }
};

export default dashboardModule;
