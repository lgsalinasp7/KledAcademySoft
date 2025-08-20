import { AppConfig, BrandingConfig, ThemeConfig } from '@/lib/config';

// Configuración base común para todos los templates
export const baseConfig: AppConfig = {
  name: 'KaledAcademy Template',
  version: '1.0.0',
  description: 'Template base modular para aplicaciones web',
  author: 'KaledAcademy Team',
  repository: 'https://github.com/kaledacademy/template-base',
  
  // Configuración de la aplicación
  app: {
    port: 3000,
    environment: 'development',
    debug: true,
    apiPrefix: '/api',
    cors: {
      origin: ['http://localhost:3000'],
      credentials: true
    }
  },

  // Configuración de base de datos
  database: {
    provider: 'postgresql',
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/kaledacademy',
    pool: {
      min: 2,
      max: 10
    }
  },

  // Configuración de autenticación
  auth: {
    provider: 'supabase',
    secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
    session: {
      strategy: 'jwt',
      maxAge: 30 * 24 * 60 * 60 // 30 días
    }
  },

  // Configuración de logging
  logging: {
    level: 'info',
    format: 'json',
    transports: ['console', 'file']
  },

  // Configuración de seguridad
  security: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100 // límite por IP
    },
    cors: {
      origin: true,
      credentials: true
    }
  },

  // Configuración de módulos por defecto
  modules: {
    default: ['auth', 'dashboard'],
    available: [
      'auth',
      'admin', 
      'dashboard',
      'analytics',
      'calendar',
      'notifications'
    ]
  },

  // Configuración de roles por defecto
  roles: {
    default: 'STUDENT',
    available: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
  },

  // Configuración de temas
  themes: {
    default: 'kaledAcademy',
    available: ['kaledAcademy', 'business', 'minimal']
  }
};

// Branding base
export const baseBranding: BrandingConfig = {
  name: 'KaledAcademy',
  tagline: 'Plataforma Educativa Modular',
  description: 'Sistema modular para gestión educativa',
  
  // Información de contacto
  contact: {
    email: 'info@kaledacademy.com',
    phone: '+1 (555) 123-4567',
    address: '123 Education St, Learning City, LC 12345',
    website: 'https://kaledacademy.com'
  },

  // Redes sociales
  social: {
    facebook: 'https://facebook.com/kaledacademy',
    twitter: 'https://twitter.com/kaledacademy',
    instagram: 'https://instagram.com/kaledacademy',
    linkedin: 'https://linkedin.com/company/kaledacademy'
  },

  // Colores del tema
  colors: {
    primary: '#fbbf24', // Amarillo KaledAcademy
    secondary: '#1f2937', // Gris oscuro
    accent: '#3b82f6', // Azul
    success: '#10b981', // Verde
    warning: '#f59e0b', // Naranja
    error: '#ef4444', // Rojo
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827'
  },

  // Logo y branding visual
  logo: {
    light: '/kaled-logo.svg',
    dark: '/kaled-logo-dark.svg',
    favicon: '/favicon.ico'
  }
};

// Tema base
export const baseTheme: ThemeConfig = {
  id: 'kaledAcademy',
  name: 'KaledAcademy Theme',
  description: 'Tema oficial de KaledAcademy',
  
  colors: {
    primary: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f'
    },
    secondary: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    }
  },

  fonts: {
    primary: 'Inter',
    secondary: 'Roboto',
    mono: 'Fira Code'
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },

  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px'
  }
};

// Configuración de módulos base
export const baseModules = {
  auth: {
    enabled: true,
    required: true,
    config: {
      providers: ['credentials', 'google', 'github'],
      registration: true,
      passwordReset: true,
      emailVerification: true
    }
  },
  
  dashboard: {
    enabled: true,
    required: true,
    config: {
      widgets: ['stats', 'recent-activity', 'quick-actions'],
      layout: 'grid',
      customizable: true
    }
  },

  admin: {
    enabled: false,
    required: false,
    config: {
      userManagement: true,
      roleManagement: true,
      systemSettings: true
    }
  },

  analytics: {
    enabled: false,
    required: false,
    config: {
      charts: ['line', 'bar', 'pie', 'doughnut'],
      metrics: ['users', 'activity', 'performance'],
      exportFormats: ['pdf', 'csv', 'excel']
    }
  },

  calendar: {
    enabled: false,
    required: false,
    config: {
      views: ['month', 'week', 'day'],
      eventTypes: ['meeting', 'reminder', 'deadline'],
      integration: ['google-calendar', 'outlook']
    }
  },

  notifications: {
    enabled: false,
    required: false,
    config: {
      channels: ['email', 'push', 'sms'],
      templates: ['welcome', 'reminder', 'alert'],
      preferences: true
    }
  }
};

// Configuración de permisos base
export const basePermissions = {
  // Permisos de autenticación
  'auth:login': {
    name: 'Iniciar Sesión',
    description: 'Permite al usuario iniciar sesión',
    roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
  },
  
  'auth:logout': {
    name: 'Cerrar Sesión',
    description: 'Permite al usuario cerrar sesión',
    roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
  },

  // Permisos de dashboard
  'dashboard:read': {
    name: 'Ver Dashboard',
    description: 'Permite acceder al panel principal',
    roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
  },

  // Permisos de administración
  'admin:users:read': {
    name: 'Ver Usuarios',
    description: 'Permite ver la lista de usuarios',
    roles: ['SUPER_ADMIN', 'ADMIN']
  },

  'admin:users:create': {
    name: 'Crear Usuarios',
    description: 'Permite crear nuevos usuarios',
    roles: ['SUPER_ADMIN', 'ADMIN']
  },

  'admin:users:update': {
    name: 'Actualizar Usuarios',
    description: 'Permite actualizar información de usuarios',
    roles: ['SUPER_ADMIN', 'ADMIN']
  },

  'admin:users:delete': {
    name: 'Eliminar Usuarios',
    description: 'Permite eliminar usuarios',
    roles: ['SUPER_ADMIN']
  }
};

// Configuración de navegación base
export const baseNavigation = {
  auth: [
    {
      path: '/login',
      title: 'Iniciar Sesión',
      icon: 'LogIn',
      requiresAuth: false
    },
    {
      path: '/register',
      title: 'Registrarse',
      icon: 'UserPlus',
      requiresAuth: false
    }
  ],

  dashboard: [
    {
      path: '/dashboard',
      title: 'Dashboard',
      icon: 'Home',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
    }
  ],

  admin: [
    {
      path: '/admin/users',
      title: 'Usuarios',
      icon: 'Users',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN']
    },
    {
      path: '/admin/roles',
      title: 'Roles',
      icon: 'Shield',
      requiresAuth: true,
      roles: ['SUPER_ADMIN']
    }
  ]
};
