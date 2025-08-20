// Sistema de módulos para KaledAcademy
// Cada módulo es una feature independiente que puede ser habilitada/deshabilitada

export * from './auth';
export * from './admin';
export * from './dashboard';
export * from './lessons';
export * from './analytics';
export * from './calendar';
export * from './notifications';

// Tipos base para módulos
export interface ModuleConfig {
  id: string;
  name: string;
  description: string;
  version: string;
  enabled: boolean;
  dependencies?: string[];
  permissions: string[];
  routes: ModuleRoute[];
  components: ModuleComponent[];
}

export interface ModuleRoute {
  path: string;
  component: string;
  title: string;
  icon?: string;
  requiresAuth: boolean;
  roles: string[];
}

export interface ModuleComponent {
  name: string;
  path: string;
  type: 'page' | 'component' | 'layout';
}

// Configuración global de módulos
export interface ModulesConfig {
  modules: ModuleConfig[];
  defaultModules: string[];
  moduleOrder: string[];
}
