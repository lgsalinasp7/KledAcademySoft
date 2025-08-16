import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

interface UIState {
  // Estado
  sidebarOpen: boolean;
  userDropdownOpen: boolean;
  theme: 'light' | 'dark';
  loadingStates: Record<string, boolean>;
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
  }>;
  
  // Acciones
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleUserDropdown: () => void;
  setUserDropdownOpen: (open: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setLoading: (key: string, loading: boolean) => void;
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Selectores computados
  isAnyLoading: boolean;
  hasNotifications: boolean;
  successNotifications: UIState['notifications'];
  errorNotifications: UIState['notifications'];
}

export const useUIStore = create<UIState>()(
  subscribeWithSelector(
    devtools(
      (set, get) => ({
        // Estado inicial
        sidebarOpen: true,
        userDropdownOpen: false,
        theme: 'dark',
        loadingStates: {},
        notifications: [],

        // Acciones
        toggleSidebar: () => {
          set(state => ({ sidebarOpen: !state.sidebarOpen }));
        },

        setSidebarOpen: (open: boolean) => {
          set({ sidebarOpen: open });
        },

        toggleUserDropdown: () => {
          set(state => ({ userDropdownOpen: !state.userDropdownOpen }));
        },

        setUserDropdownOpen: (open: boolean) => {
          set({ userDropdownOpen: open });
        },

        toggleTheme: () => {
          set(state => ({ 
            theme: state.theme === 'light' ? 'dark' : 'light' 
          }));
        },

        setTheme: (theme: 'light' | 'dark') => {
          set({ theme });
        },

        setLoading: (key: string, loading: boolean) => {
          set(state => ({
            loadingStates: {
              ...state.loadingStates,
              [key]: loading
            }
          }));
        },

        addNotification: (notification) => {
          const id = Date.now().toString();
          const newNotification = { ...notification, id };
          
          set(state => ({
            notifications: [...state.notifications, newNotification]
          }));

          // Auto-remove notification after duration
          if (notification.duration !== undefined) {
            setTimeout(() => {
              get().removeNotification(id);
            }, notification.duration);
          }
        },

        removeNotification: (id: string) => {
          set(state => ({
            notifications: state.notifications.filter(n => n.id !== id)
          }));
        },

        clearNotifications: () => {
          set({ notifications: [] });
        },

        // Selectores computados
        get isAnyLoading() {
          const { loadingStates } = get();
          return Object.values(loadingStates).some(loading => loading);
        },

        get hasNotifications() {
          const { notifications } = get();
          return notifications.length > 0;
        },

        get successNotifications() {
          const { notifications } = get();
          return notifications.filter(n => n.type === 'success');
        },

        get errorNotifications() {
          const { notifications } = get();
          return notifications.filter(n => n.type === 'error');
        }
      }),
      {
        name: 'ui-store',
        enabled: process.env.NODE_ENV === 'development'
      }
    )
  )
);

// Selectores optimizados
export const useSidebarState = () => useUIStore(state => ({
  sidebarOpen: state.sidebarOpen,
  toggleSidebar: state.toggleSidebar,
  setSidebarOpen: state.setSidebarOpen
}));

export const useUserDropdownState = () => useUIStore(state => ({
  userDropdownOpen: state.userDropdownOpen,
  toggleUserDropdown: state.toggleUserDropdown,
  setUserDropdownOpen: state.setUserDropdownOpen
}));

export const useTheme = () => useUIStore(state => ({
  theme: state.theme,
  toggleTheme: state.toggleTheme,
  setTheme: state.setTheme
}));

export const useLoadingStates = () => useUIStore(state => ({
  loadingStates: state.loadingStates,
  setLoading: state.setLoading,
  isAnyLoading: state.isAnyLoading
}));

export const useNotifications = () => useUIStore(state => ({
  notifications: state.notifications,
  hasNotifications: state.hasNotifications,
  successNotifications: state.successNotifications,
  errorNotifications: state.errorNotifications,
  addNotification: state.addNotification,
  removeNotification: state.removeNotification,
  clearNotifications: state.clearNotifications
}));
