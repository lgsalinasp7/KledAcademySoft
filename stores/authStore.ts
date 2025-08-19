import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { persist } from 'zustand/middleware';
import { logger } from '@/lib/logger';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN' | 'SUPER_ADMIN';
  username?: string;
  phone?: string;
  paymentStatus?: 'PENDING' | 'COMPLETED' | 'FAILED';
  paymentDate?: string;
  paymentNotes?: string;
  credentialsGenerated?: boolean;
  lastLogin?: string;
  createdAt: string;
  isActive: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Acciones
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

// Mock users para desarrollo (se pueden eliminar cuando esté todo conectado)
const mockUsers = [
  {
    id: '1',
    email: 'admin@gmail.com',
    name: 'Administrador',
    role: 'ADMIN' as const,
    username: 'admin',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    email: 'teacher@gmail.com',
    name: 'Profesor Demo',
    role: 'TEACHER' as const,
    username: 'teacher',
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    email: 'estudiante@gmail.com',
    name: 'Estudiante',
    role: 'STUDENT' as const,
    username: 'estudiante',
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

// Función para establecer cookies de autenticación
const setAuthCookies = (user: User) => {
  if (typeof document !== 'undefined') {
    // Establecer cookie de autenticación (simulando un token)
    document.cookie = `auth-token=mock-token-${user.id}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
    
    // Establecer cookie de rol
    document.cookie = `user-role=${user.role}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
    
    logger.debug('🍪 Cookies de autenticación establecidas', { userId: user.id, role: user.role });
  }
};

// Función para limpiar cookies de autenticación
const clearAuthCookies = () => {
  if (typeof document !== 'undefined') {
    // Limpiar cookies estableciendo fecha de expiración en el pasado
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'user-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
    logger.debug('🧹 Cookies de autenticación limpiadas');
  }
};

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector(
    devtools(
      persist(
        (set, get) => ({
          // Estado inicial
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
          
          // Acciones
          signIn: async (email: string, password: string) => {
            set({ isLoading: true, error: null });
            
            try {
              // Simular delay de red
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              // Primero intentar con usuarios mock para desarrollo
              const mockUser = mockUsers.find(u => 
                u.email === email && 
                (password === 'demo123' || password === 'admin123' || password === 'teacher123')
              );
              
              if (mockUser) {
                // Establecer cookies de autenticación
                setAuthCookies(mockUser);
                
                set({ 
                  user: mockUser, 
                  isAuthenticated: true, 
                  isLoading: false 
                });
                
                logger.info('✅ Login exitoso con usuario mock', { email, role: mockUser.role });
                return { success: true };
              }
              
              // Si no es un usuario mock, intentar con la API real
              const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
              });
              
              const data = await response.json();
              
              if (!response.ok) {
                set({ 
                  error: data.error || 'Error de autenticación', 
                  isLoading: false 
                });
                return { success: false, error: data.error };
              }
              
              // Establecer cookies de autenticación para usuario real
              setAuthCookies(data.user);
              
              set({ 
                user: data.user, 
                isAuthenticated: true, 
                isLoading: false 
              });
              
              return { success: true };
              
            } catch (error) {
              logger.error('Error en signIn', { error });
              set({
                error: 'Error de conexión',
                isLoading: false
              });
              return { success: false, error: 'Error de conexión' };
            }
          },
          
          signOut: () => {
            // Limpiar cookies de autenticación
            clearAuthCookies();
            
            set({ 
              user: null, 
              isAuthenticated: false, 
              error: null 
            });
            
            logger.info('👋 Usuario desconectado');
          },
          
          checkAuth: async () => {
            const { user, isAuthenticated } = get();
            if (user && isAuthenticated) {
              // Verificar que las cookies estén presentes
              if (typeof document !== 'undefined') {
                const hasAuthToken = document.cookie.includes('auth-token=');
                const hasUserRole = document.cookie.includes('user-role=');
                
                if (!hasAuthToken || !hasUserRole) {
                  // Re-establecer cookies si faltan
                  setAuthCookies(user);
                  logger.debug('🔄 Cookies re-establecidas durante checkAuth');
                }
              }
              return; // Ya está autenticado
            }
            
            // Aquí podrías verificar el token con el backend
            // Por ahora, solo limpiamos el estado si no hay usuario
            set({ 
              user: null, 
              isAuthenticated: false 
            });
          },
          
          clearError: () => {
            set({ error: null });
          }
        }),
        {
          name: 'auth-store-persist',
          partialize: (state: AuthState) => ({ 
            user: state.user, 
            isAuthenticated: state.isAuthenticated 
          })
        }
      ),
      { name: 'auth-store', enabled: process.env.NODE_ENV === 'development' }
    )
  )
);

// Selectores optimizados para evitar re-renders innecesarios
export const useAuthState = () => useAuthStore(state => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  isLoading: state.isLoading
}));

export const useAuthActions = () => useAuthStore(state => ({
  signIn: state.signIn,
  signOut: state.signOut,
  checkAuth: state.checkAuth,
  clearError: state.clearError
}));

export const useUser = () => useAuthStore(state => state.user);
export const useIsAuthenticated = () => useAuthStore(state => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore(state => state.isLoading);
export const useAuthError = () => useAuthStore(state => state.error);
