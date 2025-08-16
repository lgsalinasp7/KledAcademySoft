import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

export type ViewType = 
  | 'home' 
  | 'content' 
  | 'module-detail' 
  | 'lesson-content' 
  | 'payment-management' 
  | 'kaled-x' 
  | 'video-feed' 
  | 'members' 
  | 'academic-data' 
  | 'admin-dashboard' 
  | 'admin-courses' 
  | 'admin-users' 
  | 'admin-cohorts' 
  | 'admin-credentials' 
  | 'admin-roles' 
  | 'admin-settings' 
  | 'admin-analytics' 
  | 'admin-calendar';

interface NavigationState {
  // Estado
  currentView: ViewType;
  selectedModule: string | null;
  selectedLesson: string | null;
  breadcrumbs: string[];
  
  // Acciones
  navigateTo: (view: ViewType) => void;
  navigateToModule: (moduleId: string) => void;
  navigateToLesson: (lessonId: string) => void;
  navigateBack: () => void;
  resetNavigation: () => void;
  updateBreadcrumbs: (breadcrumbs: string[]) => void;
  
  // Selectores computados
  isAdminView: boolean;
  isStudentView: boolean;
  shouldShowCohortSidebar: boolean;
  shouldShowHeader: boolean;
}

export const useNavigationStore = create<NavigationState>()(
  subscribeWithSelector(
    devtools(
      (set, get) => ({
        // Estado inicial
        currentView: 'home',
        selectedModule: null,
        selectedLesson: null,
        breadcrumbs: ['Home'],

        // Acciones
        navigateTo: (view: ViewType) => {
          set({ 
            currentView: view,
            selectedModule: null,
            selectedLesson: null 
          });
        },

        navigateToModule: (moduleId: string) => {
          set({ 
            currentView: 'module-detail',
            selectedModule: moduleId,
            selectedLesson: null 
          });
        },

        navigateToLesson: (lessonId: string) => {
          set({ 
            currentView: 'lesson-content',
            selectedLesson: lessonId 
          });
        },

        navigateBack: () => {
          const { currentView, selectedModule } = get();
          
          if (currentView === 'lesson-content') {
            set({ 
              currentView: 'module-detail',
              selectedLesson: null 
            });
          } else if (currentView === 'module-detail') {
            set({ 
              currentView: 'content',
              selectedModule: null 
            });
          } else {
            set({ currentView: 'home' });
          }
        },

        resetNavigation: () => {
          set({
            currentView: 'home',
            selectedModule: null,
            selectedLesson: null,
            breadcrumbs: ['Home']
          });
        },

        updateBreadcrumbs: (breadcrumbs: string[]) => {
          set({ breadcrumbs });
        },

        // Selectores computados
        get isAdminView() {
          const { currentView } = get();
          return currentView.startsWith('admin-');
        },

        get isStudentView() {
          const { currentView } = get();
          return !currentView.startsWith('admin-') && currentView !== 'home';
        },

        get shouldShowCohortSidebar() {
          const { currentView } = get();
          const hiddenViews: ViewType[] = [
            'home', 'payment-management', 'kaled-x', 'lesson-content', 
            'admin-dashboard', 'admin-courses', 'admin-users', 'admin-cohorts', 
            'admin-credentials', 'admin-roles', 'admin-settings', 
            'admin-analytics', 'admin-calendar', 'video-feed'
          ];
          return !hiddenViews.includes(currentView);
        },

        get shouldShowHeader() {
          const { currentView } = get();
          return currentView !== 'lesson-content';
        }
      }),
      {
        name: 'navigation-store',
        enabled: process.env.NODE_ENV === 'development'
      }
    )
  )
);

// Selectores optimizados para evitar re-renders innecesarios
export const useCurrentView = () => useNavigationStore(state => state.currentView);
export const useSelectedModule = () => useNavigationStore(state => state.selectedModule);
export const useSelectedLesson = () => useNavigationStore(state => state.selectedLesson);
export const useBreadcrumbs = () => useNavigationStore(state => state.breadcrumbs);
export const useNavigationActions = () => useNavigationStore(state => ({
  navigateTo: state.navigateTo,
  navigateToModule: state.navigateToModule,
  navigateToLesson: state.navigateToLesson,
  navigateBack: state.navigateBack,
  resetNavigation: state.resetNavigation,
  updateBreadcrumbs: state.updateBreadcrumbs
}));
export const useNavigationComputed = () => useNavigationStore(state => ({
  isAdminView: state.isAdminView,
  isStudentView: state.isStudentView,
  shouldShowCohortSidebar: state.shouldShowCohortSidebar,
  shouldShowHeader: state.shouldShowHeader
}));
