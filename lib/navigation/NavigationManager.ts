import { moduleManager } from '../modules/ModuleManager';
import { permissionManager } from '../permissions/PermissionManager';

// Tipos de navegación
export interface NavigationItem {
  id: string;
  title: string;
  path: string;
  icon?: string;
  moduleId: string;
  requiresAuth: boolean;
  roles: string[];
  children?: NavigationItem[];
  order: number;
  isVisible: boolean;
}

export interface NavigationConfig {
  items: NavigationItem[];
  defaultPath: string;
  fallbackPath: string;
}

export class NavigationManager {
  private static instance: NavigationManager;
  private navigationItems: Map<string, NavigationItem> = new Map();
  private navigationConfig: NavigationConfig;

  private constructor() {
    this.navigationConfig = {
      items: [],
      defaultPath: '/dashboard',
      fallbackPath: '/login'
    };
    this.initializeNavigation();
  }

  public static getInstance(): NavigationManager {
    if (!NavigationManager.instance) {
      NavigationManager.instance = new NavigationManager();
    }
    return NavigationManager.instance;
  }

  private initializeNavigation(): void {
    // Obtener rutas de todos los módulos habilitados
    const enabledRoutes = moduleManager.getEnabledRoutes();
    
    // Convertir rutas a items de navegación
    enabledRoutes.forEach((route, index) => {
      const navigationItem: NavigationItem = {
        id: route.path,
        title: route.title,
        path: route.path,
        icon: route.icon,
        moduleId: route.moduleId,
        requiresAuth: route.requiresAuth,
        roles: route.roles,
        order: index,
        isVisible: true
      };

      this.navigationItems.set(route.path, navigationItem);
    });

    // Organizar items en jerarquía
    this.organizeNavigationHierarchy();
  }

  private organizeNavigationHierarchy(): void {
    const items = Array.from(this.navigationItems.values());
    
    // Agrupar por módulo
    const moduleGroups = new Map<string, NavigationItem[]>();
    
    items.forEach(item => {
      if (!moduleGroups.has(item.moduleId)) {
        moduleGroups.set(item.moduleId, []);
      }
      moduleGroups.get(item.moduleId)!.push(item);
    });

    // Crear estructura jerárquica
    const hierarchicalItems: NavigationItem[] = [];
    
    moduleGroups.forEach((moduleItems, moduleId) => {
      // Ordenar items del módulo
      moduleItems.sort((a, b) => a.order - b.order);
      
      // Si hay más de un item, crear grupo padre
      if (moduleItems.length > 1) {
        const parentItem: NavigationItem = {
          id: `module-${moduleId}`,
          title: this.getModuleTitle(moduleId),
          path: moduleItems[0].path, // Usar la primera ruta como default
          icon: this.getModuleIcon(moduleId),
          moduleId,
          requiresAuth: true,
          roles: this.getModuleRoles(moduleItems),
          children: moduleItems,
          order: this.getModuleOrder(moduleId),
          isVisible: true
        };
        
        hierarchicalItems.push(parentItem);
      } else {
        // Si solo hay un item, agregarlo directamente
        hierarchicalItems.push(moduleItems[0]);
      }
    });

    // Ordenar por orden de módulos
    hierarchicalItems.sort((a, b) => a.order - b.order);
    
    this.navigationConfig.items = hierarchicalItems;
  }

  private getModuleTitle(moduleId: string): string {
    const module = moduleManager.getModule(moduleId);
    return module ? module.name : moduleId;
  }

  private getModuleIcon(moduleId: string): string {
    const moduleIcons: { [key: string]: string } = {
      'auth': 'Shield',
      'admin': 'Settings',
      'dashboard': 'Home',
      'lessons': 'BookOpen',
      'analytics': 'BarChart3',
      'calendar': 'Calendar',
      'notifications': 'Bell'
    };
    
    return moduleIcons[moduleId] || 'Circle';
  }

  private getModuleRoles(items: NavigationItem[]): string[] {
    const allRoles = new Set<string>();
    items.forEach(item => {
      item.roles.forEach(role => allRoles.add(role));
    });
    return Array.from(allRoles);
  }

  private getModuleOrder(moduleId: string): number {
    const moduleOrder = moduleManager.getModuleOrder();
    return moduleOrder.indexOf(moduleId);
  }

  // Obtener navegación para un usuario específico
  public getNavigationForUser(userRole: string, isAuthenticated: boolean): NavigationItem[] {
    return this.navigationConfig.items.filter(item => {
      // Verificar autenticación
      if (item.requiresAuth && !isAuthenticated) {
        return false;
      }

      // Verificar roles
      if (item.roles.length > 0 && !item.roles.includes(userRole)) {
        return false;
      }

      // Verificar visibilidad
      if (!item.isVisible) {
        return false;
      }

      // Verificar permisos del módulo
      if (!permissionManager.hasPermission(userRole, `${item.moduleId}:read`)) {
        return false;
      }

      return true;
    }).map(item => {
      // Filtrar children también
      if (item.children) {
        return {
          ...item,
          children: item.children.filter(child => {
            if (child.requiresAuth && !isAuthenticated) return false;
            if (child.roles.length > 0 && !child.roles.includes(userRole)) return false;
            if (!child.isVisible) return false;
            return permissionManager.hasPermission(userRole, `${child.moduleId}:read`);
          })
        };
      }
      return item;
    });
  }

  // Obtener item de navegación por path
  public getNavigationItem(path: string): NavigationItem | undefined {
    return this.navigationItems.get(path);
  }

  // Verificar si una ruta es accesible para un usuario
  public isRouteAccessible(path: string, userRole: string, isAuthenticated: boolean): boolean {
    const item = this.getNavigationItem(path);
    if (!item) return false;

    // Verificar autenticación
    if (item.requiresAuth && !isAuthenticated) {
      return false;
    }

    // Verificar roles
    if (item.roles.length > 0 && !item.roles.includes(userRole)) {
      return false;
    }

    // Verificar permisos
    return permissionManager.hasPermission(userRole, `${item.moduleId}:read`);
  }

  // Obtener breadcrumbs para una ruta
  public getBreadcrumbs(path: string): NavigationItem[] {
    const breadcrumbs: NavigationItem[] = [];
    const item = this.getNavigationItem(path);
    
    if (item) {
      // Buscar el item padre
      const parentItem = this.navigationConfig.items.find(navItem => 
        navItem.children?.some(child => child.id === path)
      );
      
      if (parentItem) {
        breadcrumbs.push(parentItem);
      }
      
      breadcrumbs.push(item);
    }
    
    return breadcrumbs;
  }

  // Agregar item de navegación personalizado
  public addCustomNavigationItem(item: NavigationItem): boolean {
    if (this.navigationItems.has(item.id)) {
      return false;
    }
    
    this.navigationItems.set(item.id, item);
    this.organizeNavigationHierarchy();
    return true;
  }

  // Actualizar item de navegación
  public updateNavigationItem(id: string, updates: Partial<NavigationItem>): boolean {
    const item = this.navigationItems.get(id);
    if (!item) return false;
    
    Object.assign(item, updates);
    this.organizeNavigationHierarchy();
    return true;
  }

  // Remover item de navegación
  public removeNavigationItem(id: string): boolean {
    if (this.navigationItems.delete(id)) {
      this.organizeNavigationHierarchy();
      return true;
    }
    return false;
  }

  // Obtener configuración de navegación
  public getNavigationConfig(): NavigationConfig {
    return { ...this.navigationConfig };
  }

  // Actualizar configuración de navegación
  public updateNavigationConfig(config: Partial<NavigationConfig>): void {
    Object.assign(this.navigationConfig, config);
  }

  // Obtener ruta por defecto
  public getDefaultPath(): string {
    return this.navigationConfig.defaultPath;
  }

  // Obtener ruta de fallback
  public getFallbackPath(): string {
    return this.navigationConfig.fallbackPath;
  }

  // Obtener rutas disponibles para un rol
  public getAvailableRoutes(userRole: string, isAuthenticated: boolean): string[] {
    return this.getNavigationForUser(userRole, isAuthenticated)
      .flatMap(item => {
        const routes = [item.path];
        if (item.children) {
          routes.push(...item.children.map(child => child.path));
        }
        return routes;
      });
  }

  // Verificar si un módulo está disponible en navegación
  public isModuleAvailableInNavigation(moduleId: string, userRole: string, isAuthenticated: boolean): boolean {
    const navigation = this.getNavigationForUser(userRole, isAuthenticated);
    return navigation.some(item => item.moduleId === moduleId);
  }
}

// Exportar instancia singleton
export const navigationManager = NavigationManager.getInstance();
