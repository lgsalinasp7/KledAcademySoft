import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { persist } from 'zustand/middleware';

// Datos mock para desarrollo
const mockUsers = [
  {
    id: '1',
    email: 'student@gmail.com',
    name: 'Estudiante Demo',
    role: 'STUDENT' as const,
    password: '123456'
  },
  {
    id: '2',
    email: 'teacher@kaledacademy.com',
    name: 'Profesor Demo',
    role: 'TEACHER' as const,
    password: '123456'
  },
  {
    id: '3',
    email: 'admin@kaledacademy.com',
    name: 'Administrador Demo',
    role: 'ADMIN' as const,
    password: '123456'
  }
];

interface User {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'TEACHER' | 'STUDENT';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  signUp: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector(
    devtools(
      persist(
        (set, get) => ({
          // Estado inicial
          user: null,
          isAuthenticated: false,
          isLoading: false,

          signIn: async (email: string, password: string) => {
            console.log('🔐 AuthStore: signIn called with:', { email, password });
            set({ isLoading: true });
            
            try {
              // Simular delay de red
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              // Buscar usuario en datos mock
              const user = mockUsers.find(u => u.email === email && u.password === password);
              console.log('🔐 AuthStore: found user:', user);
              
              if (user) {
                const { password: _, ...userWithoutPassword } = user;
                console.log('🔐 AuthStore: setting user state:', userWithoutPassword);
                set({
                  user: userWithoutPassword,
                  isAuthenticated: true,
                  isLoading: false
                });
                console.log('🔐 AuthStore: login successful, returning success');
                return { success: true };
              } else {
                console.log('🔐 AuthStore: user not found, returning error');
                set({ isLoading: false });
                return { 
                  success: false, 
                  error: 'Credenciales inválidas. Usa los usuarios de prueba.' 
                };
              }
            } catch (error) {
              console.error('🔐 AuthStore: login error:', error);
              set({ isLoading: false });
              return { 
                success: false, 
                error: 'Error de conexión' 
              };
            }
          },

          signOut: () => {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false
            });
          },

          signUp: async (email: string, password: string, name: string) => {
            set({ isLoading: true });
            
            try {
              // Simular delay de red
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              // Verificar si el usuario ya existe
              const existingUser = mockUsers.find(u => u.email === email);
              if (existingUser) {
                set({ isLoading: false });
                return { 
                  success: false, 
                  error: 'El usuario ya existe' 
                };
              }
              
              // Crear nuevo usuario (en un caso real, esto iría a la base de datos)
              const newUser = {
                id: Date.now().toString(),
                email,
                name,
                role: 'STUDENT' as const
              };
              
              set({
                user: newUser,
                isAuthenticated: true,
                isLoading: false
              });
              
              return { success: true };
            } catch (error) {
              set({ isLoading: false });
              return { 
                success: false, 
                error: 'Error al crear la cuenta' 
              };
            }
          },

          checkAuth: async () => {
            // Si ya hay un usuario autenticado, no hacer nada
            const { user, isAuthenticated } = get();
            if (user && isAuthenticated) {
              return;
            }
            
            set({ isLoading: true });
            
            try {
              // En un caso real, aquí verificarías el token con Supabase
              // Por ahora, solo simulamos un delay
              await new Promise(resolve => setTimeout(resolve, 500));
              
              // Si hay un usuario en el estado, lo mantenemos
              const currentUser = get().user;
              if (currentUser) {
                set({ isAuthenticated: true, isLoading: false });
              } else {
                set({ isAuthenticated: false, isLoading: false });
              }
            } catch (error) {
              set({ isAuthenticated: false, isLoading: false });
            }
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
      {
        name: 'auth-store',
        enabled: process.env.NODE_ENV === 'development'
      }
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
  signUp: state.signUp,
  checkAuth: state.checkAuth
}));

export const useUser = () => useAuthStore(state => state.user);
export const useIsAuthenticated = () => useAuthStore(state => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore(state => state.isLoading);
