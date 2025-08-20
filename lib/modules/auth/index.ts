import { ModuleConfig } from '../index';

export const authModule: ModuleConfig = {
  id: 'auth',
  name: 'Autenticación',
  description: 'Sistema de autenticación y autorización de usuarios',
  version: '1.0.0',
  enabled: true,
  dependencies: [],
  permissions: [
    'auth:login',
    'auth:logout',
    'auth:register',
    'auth:reset-password',
    'auth:change-password'
  ],
  routes: [
    {
      path: '/login',
      component: 'LoginPage',
      title: 'Iniciar Sesión',
      icon: 'LogIn',
      requiresAuth: false,
      roles: []
    },
    {
      path: '/register',
      component: 'RegisterPage',
      title: 'Registrarse',
      icon: 'UserPlus',
      requiresAuth: false,
      roles: []
    },
    {
      path: '/reset-password',
      component: 'ResetPasswordPage',
      title: 'Restablecer Contraseña',
      icon: 'Key',
      requiresAuth: false,
      roles: []
    }
  ],
  components: [
    {
      name: 'LoginPage',
      path: 'app/(auth)/login/page.tsx',
      type: 'page'
    },
    {
      name: 'LoginForm',
      path: 'components/features/auth/LoginForm.tsx',
      type: 'component'
    }
  ]
};

// Funciones del módulo de autenticación
export const authModuleFunctions = {
  // Validar credenciales
  validateCredentials: (email: string, password: string) => {
    // Mock validation - en producción usaría Supabase Auth
    const mockUsers = [
      { email: 'admin@gmail.com', password: 'demo123', role: 'ADMIN' },
      { email: 'teacher@gmail.com', password: 'demo123', role: 'TEACHER' },
      { email: 'student@gmail.com', password: 'demo123', role: 'STUDENT' }
    ];
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    return user ? { success: true, user } : { success: false, error: 'Credenciales inválidas' };
  },

  // Verificar permisos
  hasPermission: (userRole: string, permission: string) => {
    const rolePermissions = {
      'SUPER_ADMIN': ['*'],
      'ADMIN': ['auth:login', 'auth:logout', 'admin:*'],
      'TEACHER': ['auth:login', 'auth:logout', 'teacher:*'],
      'STUDENT': ['auth:login', 'auth:logout', 'student:*']
    };
    
    const permissions = rolePermissions[userRole as keyof typeof rolePermissions] || [];
    return permissions.includes('*') || permissions.includes(permission);
  },

  // Generar token de sesión
  generateSessionToken: (user: any) => {
    return `token_${user.email}_${Date.now()}`;
  }
};

export default authModule;
