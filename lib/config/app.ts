import { z } from 'zod';

// ============================================================================
// INTERFACES Y TIPOS BASE
// ============================================================================

export interface AppConfig {
  // Información básica de la aplicación
  name: string;
  description: string;
  version: string;
  environment: 'development' | 'staging' | 'production';
  
  // Branding y apariencia
  branding: BrandingConfig;
  
  // Configuración de roles
  roles: RoleConfig[];
  
  // Configuración de features
  features: FeatureConfig[];
  
  // Configuración de navegación
  navigation: NavigationConfig;
  
  // Configuración de autenticación
  auth: AuthConfig;
  
  // Configuración de soporte
  support: SupportConfig;
}

export interface BrandingConfig {
  logo: {
    light: string;
    dark: string;
    favicon: string;
  };
  colors: ColorPalette;
  fonts: FontConfig;
}

export interface ColorPalette {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  secondary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  accent: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  neutral: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  success: string;
  warning: string;
  error: string;
  info: string;
}

export interface FontConfig {
  primary: string;
  secondary: string;
  mono: string;
}

export interface RoleConfig {
  id: string;
  label: string;
  description: string;
  permissions: string[];
  navigation: NavigationItem[];
  dashboard: DashboardConfig;
  color: string;
  icon: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  permissions?: string[];
  children?: NavigationItem[];
}

export interface DashboardConfig {
  layout: 'grid' | 'list' | 'custom';
  widgets: WidgetConfig[];
  defaultView: string;
}

export interface WidgetConfig {
  id: string;
  type: 'stats' | 'chart' | 'list' | 'custom';
  title: string;
  size: 'small' | 'medium' | 'large';
  permissions: string[];
}

export interface FeatureConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  permissions: string[];
  components: string[];
  dependencies?: string[];
}

export interface NavigationConfig {
  sidebar: {
    width: number;
    collapsedWidth: number;
    position: 'left' | 'right';
  };
  header: {
    height: number;
    showUserMenu: boolean;
    showNotifications: boolean;
  };
}

export interface AuthConfig {
  providers: AuthProvider[];
  session: {
    duration: number; // en horas
    refreshThreshold: number; // en minutos
  };
  password: {
    minLength: number;
    requireSpecialChars: boolean;
    requireNumbers: boolean;
    requireUppercase: boolean;
  };
}

export interface AuthProvider {
  id: string;
  name: string;
  enabled: boolean;
  config: Record<string, any>;
}

export interface SupportConfig {
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
  };
  documentation: {
    url: string;
    enabled: boolean;
  };
  help: {
    enabled: boolean;
    chatEnabled: boolean;
  };
}

// ============================================================================
// ESQUEMAS DE VALIDACIÓN
// ============================================================================

export const AppConfigSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  version: z.string(),
  environment: z.enum(['development', 'staging', 'production']),
  branding: z.object({
    logo: z.object({
      light: z.string(),
      dark: z.string(),
      favicon: z.string(),
    }),
    colors: z.object({
      primary: z.record(z.string()),
      secondary: z.record(z.string()),
      accent: z.record(z.string()),
      neutral: z.record(z.string()),
      success: z.string(),
      warning: z.string(),
      error: z.string(),
      info: z.string(),
    }),
    fonts: z.object({
      primary: z.string(),
      secondary: z.string(),
      mono: z.string(),
    }),
  }),
  roles: z.array(z.object({
    id: z.string(),
    label: z.string(),
    description: z.string(),
    permissions: z.array(z.string()),
    navigation: z.array(z.object({
      id: z.string(),
      label: z.string(),
      icon: z.string(),
      path: z.string(),
      permissions: z.array(z.string()).optional(),
      children: z.array(z.any()).optional(),
    })),
    dashboard: z.object({
      layout: z.enum(['grid', 'list', 'custom']),
      widgets: z.array(z.object({
        id: z.string(),
        type: z.enum(['stats', 'chart', 'list', 'custom']),
        title: z.string(),
        size: z.enum(['small', 'medium', 'large']),
        permissions: z.array(z.string()),
      })),
      defaultView: z.string(),
    }),
    color: z.string(),
    icon: z.string(),
  })),
  features: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    enabled: z.boolean(),
    permissions: z.array(z.string()),
    components: z.array(z.string()),
    dependencies: z.array(z.string()).optional(),
  })),
  navigation: z.object({
    sidebar: z.object({
      width: z.number(),
      collapsedWidth: z.number(),
      position: z.enum(['left', 'right']),
    }),
    header: z.object({
      height: z.number(),
      showUserMenu: z.boolean(),
      showNotifications: z.boolean(),
    }),
  }),
  auth: z.object({
    providers: z.array(z.object({
      id: z.string(),
      name: z.string(),
      enabled: z.boolean(),
      config: z.record(z.any()),
    })),
    session: z.object({
      duration: z.number(),
      refreshThreshold: z.number(),
    }),
    password: z.object({
      minLength: z.number(),
      requireSpecialChars: z.boolean(),
      requireNumbers: z.boolean(),
      requireUppercase: z.boolean(),
    }),
  }),
  support: z.object({
    contact: z.object({
      email: z.string(),
      phone: z.string(),
      whatsapp: z.string(),
    }),
    documentation: z.object({
      url: z.string(),
      enabled: z.boolean(),
    }),
    help: z.object({
      enabled: z.boolean(),
      chatEnabled: z.boolean(),
    }),
  }),
});

// ============================================================================
// FUNCIONES UTILITARIAS
// ============================================================================

export function validateAppConfig(config: AppConfig): boolean {
  try {
    AppConfigSchema.parse(config);
    return true;
  } catch (error) {
    console.error('Configuración de aplicación inválida:', error);
    return false;
  }
}

export function getRoleById(config: AppConfig, roleId: string): RoleConfig | undefined {
  return config.roles.find(role => role.id === roleId);
}

export function getFeatureById(config: AppConfig, featureId: string): FeatureConfig | undefined {
  return config.features.find(feature => feature.id === featureId);
}

export function hasPermission(config: AppConfig, roleId: string, permission: string): boolean {
  const role = getRoleById(config, roleId);
  return role?.permissions.includes(permission) || role?.permissions.includes('*') || false;
}

export function isFeatureEnabled(config: AppConfig, featureId: string): boolean {
  const feature = getFeatureById(config, featureId);
  return feature?.enabled || false;
}

export function getNavigationForRole(config: AppConfig, roleId: string): NavigationItem[] {
  const role = getRoleById(config, roleId);
  return role?.navigation || [];
}

// ============================================================================
// CONFIGURACIÓN POR DEFECTO (KaledAcademy)
// ============================================================================

export const defaultAppConfig: AppConfig = {
  name: "KaledAcademy",
  description: "Plataforma educativa moderna",
  version: "1.0.0",
  environment: "development",
  
  branding: {
    logo: {
      light: "/kaled-logo.svg",
      dark: "/kaled-logo.svg",
      favicon: "/favicon.ico",
    },
    colors: {
      primary: {
        50: "#eff6ff",
        100: "#dbeafe",
        200: "#bfdbfe",
        300: "#93c5fd",
        400: "#60a5fa",
        500: "#3b82f6",
        600: "#2563eb",
        700: "#1d4ed8",
        800: "#1e40af",
        900: "#1e3a8a",
      },
      secondary: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      accent: {
        50: "#fffbeb",
        100: "#fef3c7",
        200: "#fde68a",
        300: "#fcd34d",
        400: "#fbbf24",
        500: "#f59e0b",
        600: "#d97706",
        700: "#b45309",
        800: "#92400e",
        900: "#78350f",
      },
      neutral: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
      },
      success: "#10b981",
      warning: "#f59e0b",
      error: "#ef4444",
      info: "#3b82f6",
    },
    fonts: {
      primary: "Inter, system-ui, sans-serif",
      secondary: "Inter, system-ui, sans-serif",
      mono: "JetBrains Mono, monospace",
    },
  },
  
  roles: [], // Se definirá en roles.ts
  
  features: [], // Se definirá en features.ts
  
  navigation: {
    sidebar: {
      width: 256,
      collapsedWidth: 64,
      position: "left",
    },
    header: {
      height: 64,
      showUserMenu: true,
      showNotifications: true,
    },
  },
  
  auth: {
    providers: [
      {
        id: "email",
        name: "Email",
        enabled: true,
        config: {},
      },
    ],
    session: {
      duration: 24, // 24 horas
      refreshThreshold: 30, // 30 minutos
    },
    password: {
      minLength: 8,
      requireSpecialChars: true,
      requireNumbers: true,
      requireUppercase: true,
    },
  },
  
  support: {
    contact: {
      email: "soporte@kaledacademy.com",
      phone: "+1234567890",
      whatsapp: "+1234567890",
    },
    documentation: {
      url: "https://docs.kaledacademy.com",
      enabled: true,
    },
    help: {
      enabled: true,
      chatEnabled: false,
    },
  },
};
