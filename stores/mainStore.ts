import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { useAuthStore } from './authStore';
import { useNavigationStore } from './navigationStore';
import { useProgressStore } from './progressStore';
import { useUIStore } from './uiStore';
import { useDataStore } from './dataStore';

// Store principal que combina todos los stores
// Este store actúa como un facade que proporciona acceso unificado
// a todos los stores de la aplicación

interface MainStoreState {
  // Acciones principales
  initializeApp: () => Promise<void>;
  resetAllStores: () => void;
  
  // Acciones de autenticación
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  // signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>; // No implementado en authStore
  
  // Acciones de navegación
  navigateTo: (view: string) => void;
  navigateToModule: (moduleId: string) => void;
  navigateToLesson: (lessonId: string) => void;
  navigateBack: () => void;
  
  // Acciones de progreso
  loadUserProgress: (userId: string, courseId: string) => Promise<void>;
  markLessonCompleted: (moduleId: string, lessonId: string) => void;
  
  // Acciones de datos
  loadInitialData: () => Promise<void>;
  loadCourseData: (courseId: string) => Promise<void>;
  
  // Acciones de UI
  toggleSidebar: () => void;
  toggleTheme: () => void;
  addNotification: (notification: { type: 'success' | 'error' | 'warning' | 'info'; message: string; duration?: number }) => void;
  
  // Selectores computados
  isAuthenticated: boolean;
  currentUser: any;
  currentView: string;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  overallProgress: number;
  activeCourse: any;
  activeModule: any;
  activeLesson: any;
}

export const useMainStore = create<MainStoreState>()(
  subscribeWithSelector(
    devtools(
      (_, get) => ({
        // Acciones principales
        initializeApp: async () => {
          const authStore = useAuthStore.getState();
          const dataStore = useDataStore.getState();
          const progressStore = useProgressStore.getState();
          
          try {
            // Verificar autenticación
            await authStore.checkAuth();
            
            // Si está autenticado, cargar datos iniciales
            if (authStore.isAuthenticated && authStore.user) {
              await dataStore.loadCourses();
              await dataStore.loadCohorts();
              
              // Cargar progreso del usuario
              await progressStore.loadProgress(authStore.user.id, 'fullstack-career');
            }
          } catch (error) {
            console.error('Error initializing app:', error);
          }
        },

        resetAllStores: () => {
          // Resetear todos los stores
          useAuthStore.getState().signOut();
          useNavigationStore.getState().resetNavigation();
          useProgressStore.getState().resetProgress('', '');
          useUIStore.getState().clearNotifications();
          useDataStore.setState({
            courses: [],
            modules: [],
            lessons: [],
            cohorts: [],
            loading: false,
            error: null
          });
        },

        // Acciones de autenticación
        signIn: async (email: string, password: string) => {
          const authStore = useAuthStore.getState();
          const result = await authStore.signIn(email, password);
          
          if (result.success && authStore.user) {
            // Cargar datos después del login exitoso
            const dataStore = useDataStore.getState();
            const progressStore = useProgressStore.getState();
            
            await dataStore.loadCourses();
            await dataStore.loadCohorts();
            await progressStore.loadProgress(authStore.user.id, 'fullstack-career');
          }
          
          return result;
        },

        signOut: () => {
          get().resetAllStores();
        },

        // signUp: async (email: string, password: string, name: string) => {
        //   const authStore = useAuthStore.getState();
        //   return await authStore.signUp(email, password, name);
        // }, // No implementado en authStore

        // Acciones de navegación
        navigateTo: (view: string) => {
          useNavigationStore.getState().navigateTo(view as any);
        },

        navigateToModule: (moduleId: string) => {
          useNavigationStore.getState().navigateToModule(moduleId);
        },

        navigateToLesson: (lessonId: string) => {
          useNavigationStore.getState().navigateToLesson(lessonId);
        },

        navigateBack: () => {
          useNavigationStore.getState().navigateBack();
        },

        // Acciones de progreso
        loadUserProgress: async (userId: string, courseId: string) => {
          const progressStore = useProgressStore.getState();
          await progressStore.loadProgress(userId, courseId);
        },

        markLessonCompleted: (moduleId: string, lessonId: string) => {
          const progressStore = useProgressStore.getState();
          progressStore.markLessonCompleted(moduleId, lessonId);
          
          // Mostrar notificación de éxito
          get().addNotification({
            type: 'success',
            message: 'Lección completada exitosamente',
            duration: 3000
          });
        },

        // Acciones de datos
        loadInitialData: async () => {
          const dataStore = useDataStore.getState();
          await dataStore.loadCourses();
          await dataStore.loadCohorts();
        },

        loadCourseData: async (courseId: string) => {
          const dataStore = useDataStore.getState();
          await dataStore.loadModules(courseId);
        },

        // Acciones de UI
        toggleSidebar: () => {
          useUIStore.getState().toggleSidebar();
        },

        toggleTheme: () => {
          useUIStore.getState().toggleTheme();
        },

        addNotification: (notification) => {
          useUIStore.getState().addNotification(notification);
        },

        // Selectores computados
        get isAuthenticated() {
          return useAuthStore.getState().isAuthenticated;
        },

        get currentUser() {
          return useAuthStore.getState().user;
        },

        get currentView() {
          return useNavigationStore.getState().currentView;
        },

        get isLoading() {
          const authStore = useAuthStore.getState();
          const dataStore = useDataStore.getState();
          const progressStore = useProgressStore.getState();
          // const uiStore = useUIStore.getState();
          
          return authStore.isLoading || 
                 dataStore.loading || 
                 progressStore.loading || 
                                   false; // uiStore.isAnyLoading removed
        },

        get hasError() {
          const dataStore = useDataStore.getState();
          const progressStore = useProgressStore.getState();
          
          return !!(dataStore.error || progressStore.error);
        },

        get errorMessage() {
          const dataStore = useDataStore.getState();
          const progressStore = useProgressStore.getState();
          
          return dataStore.error || progressStore.error;
        },

        get overallProgress() {
          return useProgressStore.getState().getOverallProgress();
        },

        get activeCourse() {
          const dataStore = useDataStore.getState();
          // const navigationStore = useNavigationStore.getState();
          
          // Lógica para determinar el curso activo basado en la navegación
          // Por ahora retornamos el primer curso
          return dataStore.courses[0];
        },

        get activeModule() {
          const dataStore = useDataStore.getState();
          const navigationStore = useNavigationStore.getState();
          
          if (navigationStore.selectedModule) {
            return dataStore.modules.find(m => m.id === navigationStore.selectedModule);
          }
          return null;
        },

        get activeLesson() {
          const dataStore = useDataStore.getState();
          const navigationStore = useNavigationStore.getState();
          
          if (navigationStore.selectedLesson) {
            return dataStore.lessons.find(l => l.id === navigationStore.selectedLesson);
          }
          return null;
        }
      }),
      {
        name: 'main-store',
        enabled: process.env.NODE_ENV === 'development'
      }
    )
  )
);

// Selectores optimizados para el store principal
export const useAppState = () => useMainStore(state => ({
  isAuthenticated: state.isAuthenticated,
  currentUser: state.currentUser,
  currentView: state.currentView,
  isLoading: state.isLoading,
  hasError: state.hasError,
  errorMessage: state.errorMessage,
  overallProgress: state.overallProgress,
  activeCourse: state.activeCourse,
  activeModule: state.activeModule,
  activeLesson: state.activeLesson
}));

export const useAppActions = () => useMainStore(state => ({
  initializeApp: state.initializeApp,
  resetAllStores: state.resetAllStores,
  signIn: state.signIn,
  signOut: state.signOut,
  // signUp: state.signUp, // No implementado en authStore
  navigateTo: state.navigateTo,
  navigateToModule: state.navigateToModule,
  navigateToLesson: state.navigateToLesson,
  navigateBack: state.navigateBack,
  loadUserProgress: state.loadUserProgress,
  markLessonCompleted: state.markLessonCompleted,
  loadInitialData: state.loadInitialData,
  loadCourseData: state.loadCourseData,
  toggleSidebar: state.toggleSidebar,
  toggleTheme: state.toggleTheme,
  addNotification: state.addNotification
}));
