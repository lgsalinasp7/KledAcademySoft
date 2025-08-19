// ============================================================================
// EXPORTACIONES CENTRALIZADAS DE CONFIGURACIÓN
// ============================================================================

// Configuración principal de la aplicación
export type {
  AppConfig,
  BrandingConfig,
  ColorPalette,
  FontConfig,
  RoleConfig,
  NavigationItem,
  DashboardConfig,
  WidgetConfig,
  FeatureConfig,
  NavigationConfig,
  AuthConfig,
  AuthProvider,
  SupportConfig,
} from './app';

export {
  AppConfigSchema,
  validateAppConfig,
  getRoleById,
  getFeatureById,
  hasPermission,
  getNavigationForRole,
  defaultAppConfig,
} from './app';

// Sistema de roles
export {
  kaledAcademyRoles,
  languageSchoolRoles,
  businessRoles,
  createRoleConfig,
  defaultRoles,
} from './roles';

// Sistema de temas
export type { Theme } from './themes';
export {
  kaledAcademyTheme,
  languageSchoolTheme,
  businessTheme,
  minimalTheme,
  themes,
  getTheme,
  getAllThemes,
  getThemesByCategory,
  applyTheme,
  getCurrentTheme,
  createCustomTheme,
  generateCSSVariables,
  applyThemeClient,
  getCurrentThemeClient,
  defaultTheme,
} from './themes';

// Sistema de branding
export type { BrandingConstants } from './branding';
export {
  kaledAcademyBranding,
  languageSchoolBranding,
  businessBranding,
  getBrandingConfig,
  createCustomBranding,
  defaultBranding,
} from './branding';

// ============================================================================
// CONFIGURACIÓN COMPLETA DE LA APLICACIÓN
// ============================================================================

import { AppConfig, defaultAppConfig } from './app';
import { kaledAcademyRoles } from './roles';
import { kaledAcademyTheme } from './themes';
import { kaledAcademyBranding } from './branding';

// Configuración completa de KaledAcademy
export const kaledAcademyConfig: AppConfig = {
  ...defaultAppConfig,
  name: kaledAcademyBranding.appName,
  description: kaledAcademyBranding.appDescription,
  roles: kaledAcademyRoles,
  branding: {
    ...defaultAppConfig.branding,
    colors: kaledAcademyTheme.colors,
    fonts: kaledAcademyTheme.fonts,
    logo: kaledAcademyTheme.logo,
    name: kaledAcademyBranding.appName,
    tagline: kaledAcademyBranding.appDescription,
  },
  features: [
    {
      id: "authentication",
      name: "Autenticación",
      description: "Sistema de autenticación con roles",
      enabled: true,
      permissions: ["auth.login", "auth.logout"],
      components: ["LoginForm", "UserDropdown"],
    },
    {
      id: "dashboard",
      name: "Dashboard",
      description: "Panel principal con widgets",
      enabled: true,
      permissions: ["dashboard.read"],
      components: ["Dashboard", "Widgets"],
    },
    {
      id: "courses",
      name: "Cursos",
      description: "Gestión de cursos educativos",
      enabled: true,
      permissions: ["courses.read", "courses.write"],
      components: ["CourseList", "CourseForm"],
    },
    {
      id: "students",
      name: "Estudiantes",
      description: "Gestión de estudiantes",
      enabled: true,
      permissions: ["students.read", "students.write"],
      components: ["StudentList", "StudentForm"],
    },
    {
      id: "evaluations",
      name: "Evaluaciones",
      description: "Sistema de evaluaciones",
      enabled: true,
      permissions: ["evaluations.read", "evaluations.write"],
      components: ["EvaluationList", "EvaluationForm"],
    },
    {
      id: "messaging",
      name: "Mensajería",
      description: "Sistema de mensajes internos",
      enabled: true,
      permissions: ["messages.read", "messages.write"],
      components: ["MessageList", "MessageForm"],
    },
    {
      id: "analytics",
      name: "Analytics",
      description: "Reportes y estadísticas",
      enabled: true,
      permissions: ["analytics.read"],
      components: ["Analytics", "Charts"],
    },
  ],
};

// ============================================================================
// FUNCIONES UTILITARIAS GLOBALES
// ============================================================================

/**
 * Obtiene la configuración completa de la aplicación
 */
export function getAppConfig(): AppConfig {
  return kaledAcademyConfig;
}

/**
 * Obtiene la configuración de branding de la app actual
 */
export function getCurrentBrandingConfig() {
  return kaledAcademyConfig.branding;
}



/**
 * Obtiene la configuración de roles
 */
export function getRolesConfig() {
  return kaledAcademyConfig.roles;
}

/**
 * Obtiene la configuración de features
 */
export function getFeaturesConfig() {
  return kaledAcademyConfig.features;
}

/**
 * Verifica si un feature está habilitado
 */
export function isFeatureEnabled(featureId: string): boolean {
  const feature = kaledAcademyConfig.features.find(f => f.id === featureId);
  return feature?.enabled || false;
}

/**
 * Obtiene los permisos de un rol
 */
export function getRolePermissions(roleId: string): string[] {
  const role = kaledAcademyConfig.roles.find(r => r.id === roleId);
  return role?.permissions || [];
}

/**
 * Verifica si un rol tiene un permiso específico
 */
export function hasRolePermission(roleId: string, permission: string): boolean {
  const permissions = getRolePermissions(roleId);
  return permissions.includes("*") || permissions.includes(permission);
}

/**
 * Obtiene la navegación para un rol específico
 */
export function getRoleNavigation(roleId: string) {
  const role = kaledAcademyConfig.roles.find(r => r.id === roleId);
  return role?.navigation || [];
}

/**
 * Obtiene el dashboard configurado para un rol
 */
export function getRoleDashboard(roleId: string) {
  const role = kaledAcademyConfig.roles.find(r => r.id === roleId);
  return role?.dashboard;
}

/**
 * Obtiene el color del rol
 */
export function getRoleColor(roleId: string): string {
  const role = kaledAcademyConfig.roles.find(r => r.id === roleId);
  return role?.color || "#6b7280";
}

/**
 * Obtiene el icono del rol
 */
export function getRoleIcon(roleId: string): string {
  const role = kaledAcademyConfig.roles.find(r => r.id === roleId);
  return role?.icon || "User";
}

// ============================================================================
// CONFIGURACIONES PREDEFINIDAS PARA DIFERENTES TIPOS DE APLICACIONES
// ============================================================================

/**
 * Configuración para escuela de idiomas
 */
export function createLanguageSchoolConfig(appName: string = "LanguageSchool"): AppConfig {
  return {
    ...defaultAppConfig,
    name: appName,
    description: "Plataforma para escuela de idiomas",
    roles: kaledAcademyRoles.map(role => ({
      ...role,
      navigation: role.navigation.map(item => ({
        ...item,
        path: item.path.replace("/dashboard", `/dashboard/${appName.toLowerCase()}`),
      })),
    })),
    branding: {
      ...defaultAppConfig.branding,
      colors: kaledAcademyTheme.colors, // Usar tema de idiomas
      logo: {
        light: `/${appName.toLowerCase()}-logo.svg`,
        dark: `/${appName.toLowerCase()}-logo.svg`,
        favicon: `/${appName.toLowerCase()}-favicon.ico`,
      },
    },
  };
}

/**
 * Configuración para empresa/negocio
 */
export function createBusinessConfig(appName: string = "BusinessApp"): AppConfig {
  return {
    ...defaultAppConfig,
    name: appName,
    description: "Plataforma empresarial",
    roles: kaledAcademyRoles.map(role => ({
      ...role,
      navigation: role.navigation.map(item => ({
        ...item,
        path: item.path.replace("/dashboard", `/dashboard/${appName.toLowerCase()}`),
      })),
    })),
    branding: {
      ...defaultAppConfig.branding,
      colors: kaledAcademyTheme.colors, // Usar tema empresarial
      logo: {
        light: `/${appName.toLowerCase()}-logo.svg`,
        dark: `/${appName.toLowerCase()}-logo.svg`,
        favicon: `/${appName.toLowerCase()}-favicon.ico`,
      },
    },
  };
}

// ============================================================================
// EXPORTACIÓN POR DEFECTO
// ============================================================================

export default kaledAcademyConfig;
