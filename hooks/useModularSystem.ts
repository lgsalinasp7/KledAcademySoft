import { useState, useEffect, useMemo } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { moduleManager } from '@/lib/modules/ModuleManager';
import { permissionManager } from '@/lib/permissions/PermissionManager';
import { navigationManager, NavigationItem } from '@/lib/navigation/NavigationManager';

// Hook para el sistema modular
export function useModularSystem() {
  const { user, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  // Memoizar el rol del usuario
  const userRole = useMemo(() => {
    return user?.role || 'STUDENT';
  }, [user?.role]);

  // Memoizar la navegación disponible
  const navigation = useMemo(() => {
    return navigationManager.getNavigationForUser(userRole, isAuthenticated);
  }, [userRole, isAuthenticated]);

  // Memoizar los módulos habilitados
  const enabledModules = useMemo(() => {
    return moduleManager.getEnabledModules();
  }, []);

  // Memoizar los permisos del usuario
  const userPermissions = useMemo(() => {
    return permissionManager.getRolePermissions(userRole);
  }, [userRole]);

  // Verificar si el usuario tiene un permiso específico
  const hasPermission = useCallback((permission: string): boolean => {
    return permissionManager.hasPermission(userRole, permission);
  }, [userRole]);

  // Verificar si el usuario tiene cualquier permiso de una lista
  const hasAnyPermission = useCallback((permissions: string[]): boolean => {
    return permissionManager.hasAnyPermission(userRole, permissions);
  }, [userRole]);

  // Verificar si el usuario tiene todos los permisos de una lista
  const hasAllPermissions = useCallback((permissions: string[]): boolean => {
    return permissionManager.hasAllPermissions(userRole, permissions);
  }, [userRole]);

  // Verificar si una ruta es accesible
  const isRouteAccessible = useCallback((path: string): boolean => {
    return navigationManager.isRouteAccessible(path, userRole, isAuthenticated);
  }, [userRole, isAuthenticated]);

  // Obtener breadcrumbs para una ruta
  const getBreadcrumbs = useCallback((path: string): NavigationItem[] => {
    return navigationManager.getBreadcrumbs(path);
  }, []);

  // Verificar si un módulo está disponible
  const isModuleAvailable = useCallback((moduleId: string): boolean => {
    return moduleManager.isModuleEnabled(moduleId) && 
           navigationManager.isModuleAvailableInNavigation(moduleId, userRole, isAuthenticated);
  }, [userRole, isAuthenticated]);

  // Obtener información de un módulo
  const getModuleInfo = useCallback((moduleId: string) => {
    return moduleManager.getModule(moduleId);
  }, []);

  // Obtener rutas disponibles
  const getAvailableRoutes = useCallback(() => {
    return navigationManager.getAvailableRoutes(userRole, isAuthenticated);
  }, [userRole, isAuthenticated]);

  // Obtener ruta por defecto
  const getDefaultPath = useCallback(() => {
    return navigationManager.getDefaultPath();
  }, []);

  // Obtener ruta de fallback
  const getFallbackPath = useCallback(() => {
    return navigationManager.getFallbackPath();
  }, []);

  // Simular carga inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return {
    // Estado
    isLoading,
    userRole,
    isAuthenticated,
    
    // Navegación
    navigation,
    isRouteAccessible,
    getBreadcrumbs,
    getAvailableRoutes,
    getDefaultPath,
    getFallbackPath,
    
    // Módulos
    enabledModules,
    isModuleAvailable,
    getModuleInfo,
    
    // Permisos
    userPermissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    
    // Utilidades
    moduleManager,
    permissionManager,
    navigationManager
  };
}

// Hook específico para verificar permisos
export function usePermissions() {
  const { userRole, hasPermission, hasAnyPermission, hasAllPermissions } = useModularSystem();

  return {
    userRole,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions
  };
}

// Hook específico para navegación
export function useNavigation() {
  const { 
    navigation, 
    isRouteAccessible, 
    getBreadcrumbs, 
    getAvailableRoutes,
    getDefaultPath,
    getFallbackPath 
  } = useModularSystem();

  return {
    navigation,
    isRouteAccessible,
    getBreadcrumbs,
    getAvailableRoutes,
    getDefaultPath,
    getFallbackPath
  };
}

// Hook específico para módulos
export function useModules() {
  const { 
    enabledModules, 
    isModuleAvailable, 
    getModuleInfo 
  } = useModularSystem();

  return {
    enabledModules,
    isModuleAvailable,
    getModuleInfo
  };
}

// Componente de protección de rutas
export function ProtectedRoute({ 
  children, 
  requiredPermission, 
  requiredPermissions = [],
  fallback = null 
}: {
  children: React.ReactNode;
  requiredPermission?: string;
  requiredPermissions?: string[];
  fallback?: React.ReactNode;
}) {
  const { hasPermission, hasAllPermissions } = usePermissions();
  const { isAuthenticated } = useAuthStore();

  // Verificar autenticación
  if (!isAuthenticated) {
    return fallback || <div>No autenticado</div>;
  }

  // Verificar permiso específico
  if (requiredPermission && !hasPermission(requiredPermission)) {
    return fallback || <div>Sin permisos</div>;
  }

  // Verificar múltiples permisos
  if (requiredPermissions.length > 0 && !hasAllPermissions(requiredPermissions)) {
    return fallback || <div>Sin permisos suficientes</div>;
  }

  return <>{children}</>;
}

// Componente de protección de módulos
export function ProtectedModule({ 
  children, 
  moduleId, 
  fallback = null 
}: {
  children: React.ReactNode;
  moduleId: string;
  fallback?: React.ReactNode;
}) {
  const { isModuleAvailable } = useModules();

  if (!isModuleAvailable(moduleId)) {
    return fallback || <div>Módulo no disponible</div>;
  }

  return <>{children}</>;
}

// Importar useCallback
import { useCallback } from 'react';
