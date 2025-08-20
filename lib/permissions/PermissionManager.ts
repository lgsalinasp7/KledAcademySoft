import { moduleManager } from '../modules/ModuleManager';

// Tipos de permisos
export interface Permission {
  id: string;
  name: string;
  description: string;
  module: string;
  category: string;
}

export interface RolePermissions {
  role: string;
  permissions: string[];
  inheritedFrom?: string[];
}

export class PermissionManager {
  private static instance: PermissionManager;
  private permissions: Map<string, Permission> = new Map();
  private rolePermissions: Map<string, RolePermissions> = new Map();

  private constructor() {
    this.initializePermissions();
    this.initializeRolePermissions();
  }

  public static getInstance(): PermissionManager {
    if (!PermissionManager.instance) {
      PermissionManager.instance = new PermissionManager();
    }
    return PermissionManager.instance;
  }

  private initializePermissions(): void {
    // Permisos de autenticación
    this.addPermission({
      id: 'auth:login',
      name: 'Iniciar Sesión',
      description: 'Permite al usuario iniciar sesión en el sistema',
      module: 'auth',
      category: 'autenticación'
    });

    this.addPermission({
      id: 'auth:logout',
      name: 'Cerrar Sesión',
      description: 'Permite al usuario cerrar sesión',
      module: 'auth',
      category: 'autenticación'
    });

    // Permisos de administración
    this.addPermission({
      id: 'admin:users:read',
      name: 'Ver Usuarios',
      description: 'Permite ver la lista de usuarios',
      module: 'admin',
      category: 'usuarios'
    });

    this.addPermission({
      id: 'admin:users:create',
      name: 'Crear Usuarios',
      description: 'Permite crear nuevos usuarios',
      module: 'admin',
      category: 'usuarios'
    });

    this.addPermission({
      id: 'admin:users:update',
      name: 'Actualizar Usuarios',
      description: 'Permite actualizar información de usuarios',
      module: 'admin',
      category: 'usuarios'
    });

    this.addPermission({
      id: 'admin:users:delete',
      name: 'Eliminar Usuarios',
      description: 'Permite eliminar usuarios del sistema',
      module: 'admin',
      category: 'usuarios'
    });

    // Permisos de dashboard
    this.addPermission({
      id: 'dashboard:read',
      name: 'Acceder al Dashboard',
      description: 'Permite acceder al panel principal',
      module: 'dashboard',
      category: 'dashboard'
    });

    this.addPermission({
      id: 'dashboard:progress:read',
      name: 'Ver Progreso',
      description: 'Permite ver el progreso del usuario',
      module: 'dashboard',
      category: 'progreso'
    });

    // Permisos de lecciones
    this.addPermission({
      id: 'lessons:read',
      name: 'Ver Lecciones',
      description: 'Permite ver las lecciones disponibles',
      module: 'lessons',
      category: 'contenido'
    });

    this.addPermission({
      id: 'lessons:create',
      name: 'Crear Lecciones',
      description: 'Permite crear nuevas lecciones',
      module: 'lessons',
      category: 'contenido'
    });

    // Permisos de analíticas
    this.addPermission({
      id: 'analytics:read',
      name: 'Ver Analíticas',
      description: 'Permite ver reportes y métricas',
      module: 'analytics',
      category: 'reportes'
    });

    this.addPermission({
      id: 'analytics:export',
      name: 'Exportar Reportes',
      description: 'Permite exportar reportes en diferentes formatos',
      module: 'analytics',
      category: 'reportes'
    });
  }

  private initializeRolePermissions(): void {
    // Permisos para SUPER_ADMIN (todos los permisos)
    this.rolePermissions.set('SUPER_ADMIN', {
      role: 'SUPER_ADMIN',
      permissions: ['*'], // Wildcard para todos los permisos
      inheritedFrom: []
    });

    // Permisos para ADMIN
    this.rolePermissions.set('ADMIN', {
      role: 'ADMIN',
      permissions: [
        'auth:login',
        'auth:logout',
        'admin:users:read',
        'admin:users:create',
        'admin:users:update',
        'admin:users:delete',
        'dashboard:read',
        'dashboard:progress:read',
        'lessons:read',
        'lessons:create',
        'analytics:read',
        'analytics:export'
      ],
      inheritedFrom: []
    });

    // Permisos para TEACHER
    this.rolePermissions.set('TEACHER', {
      role: 'TEACHER',
      permissions: [
        'auth:login',
        'auth:logout',
        'dashboard:read',
        'dashboard:progress:read',
        'lessons:read',
        'lessons:create'
      ],
      inheritedFrom: []
    });

    // Permisos para STUDENT
    this.rolePermissions.set('STUDENT', {
      role: 'STUDENT',
      permissions: [
        'auth:login',
        'auth:logout',
        'dashboard:read',
        'dashboard:progress:read',
        'lessons:read'
      ],
      inheritedFrom: []
    });
  }

  private addPermission(permission: Permission): void {
    this.permissions.set(permission.id, permission);
  }

  // Verificar si un rol tiene un permiso específico
  public hasPermission(userRole: string, permission: string): boolean {
    const rolePerms = this.rolePermissions.get(userRole);
    if (!rolePerms) return false;

    // Si tiene wildcard, tiene todos los permisos
    if (rolePerms.permissions.includes('*')) return true;

    // Verificar permiso directo
    if (rolePerms.permissions.includes(permission)) return true;

    // Verificar permisos del módulo
    const moduleManager = require('../modules/ModuleManager').moduleManager;
    return moduleManager.hasPermission(userRole, permission);
  }

  // Obtener todos los permisos de un rol
  public getRolePermissions(userRole: string): string[] {
    const rolePerms = this.rolePermissions.get(userRole);
    if (!rolePerms) return [];

    if (rolePerms.permissions.includes('*')) {
      return Array.from(this.permissions.keys());
    }

    return rolePerms.permissions;
  }

  // Obtener permisos por módulo
  public getPermissionsByModule(moduleId: string): Permission[] {
    return Array.from(this.permissions.values()).filter(
      permission => permission.module === moduleId
    );
  }

  // Obtener permisos por categoría
  public getPermissionsByCategory(category: string): Permission[] {
    return Array.from(this.permissions.values()).filter(
      permission => permission.category === category
    );
  }

  // Agregar permiso a un rol
  public addPermissionToRole(role: string, permission: string): boolean {
    const rolePerms = this.rolePermissions.get(role);
    if (!rolePerms) return false;

    if (!rolePerms.permissions.includes(permission)) {
      rolePerms.permissions.push(permission);
    }

    return true;
  }

  // Remover permiso de un rol
  public removePermissionFromRole(role: string, permission: string): boolean {
    const rolePerms = this.rolePermissions.get(role);
    if (!rolePerms) return false;

    const index = rolePerms.permissions.indexOf(permission);
    if (index > -1) {
      rolePerms.permissions.splice(index, 1);
      return true;
    }

    return false;
  }

  // Crear nuevo rol
  public createRole(role: string, permissions: string[] = []): boolean {
    if (this.rolePermissions.has(role)) return false;

    this.rolePermissions.set(role, {
      role,
      permissions,
      inheritedFrom: []
    });

    return true;
  }

  // Eliminar rol
  public deleteRole(role: string): boolean {
    if (['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT'].includes(role)) {
      return false; // No permitir eliminar roles del sistema
    }

    return this.rolePermissions.delete(role);
  }

  // Obtener todos los roles
  public getAllRoles(): string[] {
    return Array.from(this.rolePermissions.keys());
  }

  // Obtener información de un permiso
  public getPermissionInfo(permissionId: string): Permission | undefined {
    return this.permissions.get(permissionId);
  }

  // Verificar si un permiso existe
  public permissionExists(permissionId: string): boolean {
    return this.permissions.has(permissionId);
  }

  // Obtener permisos disponibles para un módulo
  public getAvailablePermissionsForModule(moduleId: string): Permission[] {
    return this.getPermissionsByModule(moduleId);
  }

  // Verificar permisos múltiples
  public hasAnyPermission(userRole: string, permissions: string[]): boolean {
    return permissions.some(permission => this.hasPermission(userRole, permission));
  }

  // Verificar todos los permisos
  public hasAllPermissions(userRole: string, permissions: string[]): boolean {
    return permissions.every(permission => this.hasPermission(userRole, permission));
  }
}

// Exportar instancia singleton
export const permissionManager = PermissionManager.getInstance();
