import { ModuleConfig, ModulesConfig } from './index';
import { authModule } from './auth';
import { adminModule } from './admin';
import { dashboardModule } from './dashboard';
import { lessonsModule } from './lessons';
import { analyticsModule } from './analytics';
import { calendarModule } from './calendar';
import { notificationsModule } from './notifications';

// Configuración global de módulos
export const modulesConfig: ModulesConfig = {
  modules: [
    authModule,
    adminModule,
    dashboardModule,
    lessonsModule,
    analyticsModule,
    calendarModule,
    notificationsModule
  ],
  defaultModules: ['auth', 'dashboard'],
  moduleOrder: ['auth', 'dashboard', 'lessons', 'admin', 'analytics', 'calendar', 'notifications']
};

export class ModuleManager {
  private static instance: ModuleManager;
  private modules: Map<string, ModuleConfig> = new Map();
  private enabledModules: Set<string> = new Set();

  private constructor() {
    this.initializeModules();
  }

  public static getInstance(): ModuleManager {
    if (!ModuleManager.instance) {
      ModuleManager.instance = new ModuleManager();
    }
    return ModuleManager.instance;
  }

  private initializeModules(): void {
    // Registrar todos los módulos
    modulesConfig.modules.forEach(module => {
      this.modules.set(module.id, module);
      if (module.enabled) {
        this.enabledModules.add(module.id);
      }
    });
  }

  // Obtener todos los módulos
  public getAllModules(): ModuleConfig[] {
    return Array.from(this.modules.values());
  }

  // Obtener módulos habilitados
  public getEnabledModules(): ModuleConfig[] {
    return Array.from(this.modules.values()).filter(module => 
      this.enabledModules.has(module.id)
    );
  }

  // Obtener módulo por ID
  public getModule(moduleId: string): ModuleConfig | undefined {
    return this.modules.get(moduleId);
  }

  // Habilitar módulo
  public enableModule(moduleId: string): boolean {
    const module = this.modules.get(moduleId);
    if (module) {
      this.enabledModules.add(moduleId);
      return true;
    }
    return false;
  }

  // Deshabilitar módulo
  public disableModule(moduleId: string): boolean {
    const module = this.modules.get(moduleId);
    if (module && !modulesConfig.defaultModules.includes(moduleId)) {
      this.enabledModules.delete(moduleId);
      return true;
    }
    return false;
  }

  // Verificar si un módulo está habilitado
  public isModuleEnabled(moduleId: string): boolean {
    return this.enabledModules.has(moduleId);
  }

  // Obtener rutas de todos los módulos habilitados
  public getEnabledRoutes(): any[] {
    const routes: any[] = [];
    
    this.getEnabledModules().forEach(module => {
      module.routes.forEach(route => {
        routes.push({
          ...route,
          moduleId: module.id
        });
      });
    });
    
    return routes;
  }

  // Obtener rutas por rol
  public getRoutesByRole(userRole: string): any[] {
    return this.getEnabledRoutes().filter(route => 
      route.roles.includes(userRole) || route.roles.length === 0
    );
  }

  // Verificar permisos
  public hasPermission(userRole: string, permission: string): boolean {
    const enabledModules = this.getEnabledModules();
    
    for (const module of enabledModules) {
      if (module.permissions.includes(permission)) {
        // Verificar si el rol tiene acceso al módulo
        const hasModuleAccess = module.routes.some(route => 
          route.roles.includes(userRole) || route.roles.length === 0
        );
        
        if (hasModuleAccess) {
          return true;
        }
      }
    }
    
    return false;
  }

  // Obtener componentes de un módulo
  public getModuleComponents(moduleId: string): any[] {
    const module = this.modules.get(moduleId);
    return module ? module.components : [];
  }

  // Cargar módulo dinámicamente (para futuras implementaciones)
  public async loadModule(moduleId: string): Promise<boolean> {
    try {
      // Aquí se podría implementar la carga dinámica de módulos
      // Por ejemplo, desde un CDN o repositorio externo
      console.log(`Cargando módulo: ${moduleId}`);
      return true;
    } catch (error) {
      console.error(`Error cargando módulo ${moduleId}:`, error);
      return false;
    }
  }

  // Obtener dependencias de un módulo
  public getModuleDependencies(moduleId: string): string[] {
    const module = this.modules.get(moduleId);
    return module ? (module.dependencies || []) : [];
  }

  // Verificar si se pueden habilitar las dependencias
  public canEnableModule(moduleId: string): boolean {
    const module = this.modules.get(moduleId);
    if (!module) return false;

    // Verificar que todas las dependencias estén habilitadas
    const dependencies = module.dependencies || [];
    return dependencies.every(dep => this.enabledModules.has(dep));
  }

  // Obtener orden de módulos
  public getModuleOrder(): string[] {
    return modulesConfig.moduleOrder.filter(moduleId => 
      this.enabledModules.has(moduleId)
    );
  }

  // Resetear a configuración por defecto
  public resetToDefaults(): void {
    this.enabledModules.clear();
    modulesConfig.defaultModules.forEach(moduleId => {
      this.enabledModules.add(moduleId);
    });
  }
}

// Exportar instancia singleton
export const moduleManager = ModuleManager.getInstance();
