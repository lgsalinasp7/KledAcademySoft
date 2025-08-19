import { RoleConfig, NavigationItem, DashboardConfig } from './app';

// ============================================================================
// DEFINICIÓN DE ROLES PARA KALEDACADEMY
// ============================================================================

export const kaledAcademyRoles: RoleConfig[] = [
  {
    id: "ADMIN",
    label: "Administrador",
    description: "Acceso completo a todas las funcionalidades del sistema",
    permissions: [
      "*", // Acceso completo
    ],
    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "Home",
        path: "/dashboard/home",
      },
      {
        id: "users",
        label: "Gestión de Usuarios",
        icon: "Users",
        path: "/dashboard/admin/users",
      },
      {
        id: "courses",
        label: "Gestión de Cursos",
        icon: "BookOpen",
        path: "/dashboard/admin/courses",
      },
      {
        id: "cohorts",
        label: "Gestión de Cohortes",
        icon: "Users2",
        path: "/dashboard/admin/cohorts",
      },
      {
        id: "credentials",
        label: "Gestión de Credenciales",
        icon: "Shield",
        path: "/dashboard/admin/credentials",
      },
      {
        id: "roles",
        label: "Gestión de Roles",
        icon: "UserCheck",
        path: "/dashboard/admin/roles",
      },
      {
        id: "settings",
        label: "Configuraciones",
        icon: "Settings",
        path: "/dashboard/admin/settings",
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: "BarChart3",
        path: "/dashboard/admin/analytics",
      },
      {
        id: "calendar",
        label: "Calendario",
        icon: "Calendar",
        path: "/dashboard/admin/calendar",
      },
    ],
    dashboard: {
      layout: "grid",
      widgets: [
        {
          id: "user-stats",
          type: "stats",
          title: "Estadísticas de Usuarios",
          size: "medium",
          permissions: ["users.read"],
        },
        {
          id: "course-stats",
          type: "stats",
          title: "Estadísticas de Cursos",
          size: "medium",
          permissions: ["courses.read"],
        },
        {
          id: "recent-activity",
          type: "list",
          title: "Actividad Reciente",
          size: "large",
          permissions: ["*"],
        },
      ],
      defaultView: "dashboard",
    },
    color: "#ef4444", // Red
    icon: "Shield",
  },
  {
    id: "TEACHER",
    label: "Profesor",
    description: "Acceso a gestión de cursos y estudiantes",
    permissions: [
      "courses.read",
      "courses.write",
      "students.read",
      "students.write",
      "evaluations.read",
      "evaluations.write",
      "messages.read",
      "messages.write",
    ],
    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "Home",
        path: "/dashboard/teacher-dashboard",
      },
      {
        id: "courses",
        label: "Mis Cursos",
        icon: "BookOpen",
        path: "/dashboard/teacher-dashboard/courses",
      },
      {
        id: "students",
        label: "Mis Estudiantes",
        icon: "Users",
        path: "/dashboard/teacher-dashboard/students",
      },
      {
        id: "evaluations",
        label: "Evaluaciones",
        icon: "UserCheck",
        path: "/dashboard/teacher-dashboard/evaluations",
      },
      {
        id: "messages",
        label: "Mensajes",
        icon: "MessageSquare",
        path: "/dashboard/teacher-dashboard/messages",
      },
    ],
    dashboard: {
      layout: "grid",
      widgets: [
        {
          id: "my-courses",
          type: "list",
          title: "Mis Cursos",
          size: "medium",
          permissions: ["courses.read"],
        },
        {
          id: "student-stats",
          type: "stats",
          title: "Estadísticas de Estudiantes",
          size: "medium",
          permissions: ["students.read"],
        },
        {
          id: "recent-evaluations",
          type: "list",
          title: "Evaluaciones Recientes",
          size: "large",
          permissions: ["evaluations.read"],
        },
      ],
      defaultView: "dashboard",
    },
    color: "#10b981", // Green
    icon: "GraduationCap",
  },
  {
    id: "STUDENT",
    label: "Estudiante",
    description: "Acceso a contenido educativo y progreso personal",
    permissions: [
      "content.read",
      "progress.read",
      "progress.write",
      "lessons.read",
      "lessons.write",
      "profile.read",
      "profile.write",
    ],
    navigation: [
      {
        id: "home",
        label: "Home",
        icon: "Home",
        path: "/dashboard/home",
      },
      {
        id: "demo",
        label: "Demo Store",
        icon: "Square",
        path: "/dashboard/demo",
      },
      {
        id: "payment-management",
        label: "Gestión de pagos",
        icon: "Building",
        path: "/dashboard/payment-management",
      },
      {
        id: "kaled-x",
        label: "KaledAcademy X",
        icon: "Square",
        path: "/dashboard/kaled-x",
      },
    ],
    dashboard: {
      layout: "grid",
      widgets: [
        {
          id: "progress-overview",
          type: "stats",
          title: "Progreso General",
          size: "medium",
          permissions: ["progress.read"],
        },
        {
          id: "current-lessons",
          type: "list",
          title: "Lecciones Actuales",
          size: "medium",
          permissions: ["lessons.read"],
        },
        {
          id: "recent-activity",
          type: "list",
          title: "Actividad Reciente",
          size: "large",
          permissions: ["progress.read"],
        },
      ],
      defaultView: "home",
    },
    color: "#3b82f6", // Blue
    icon: "User",
  },
];

// ============================================================================
// TEMPLATES DE ROLES PARA DIFERENTES TIPOS DE APLICACIONES
// ============================================================================

// Template para escuela de idiomas
export const languageSchoolRoles: RoleConfig[] = [
  {
    id: "DIRECTOR",
    label: "Director",
    description: "Dirección general de la escuela",
    permissions: ["*"],
    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "Home",
        path: "/dashboard",
      },
      {
        id: "teachers",
        label: "Profesores",
        icon: "Users",
        path: "/dashboard/teachers",
      },
      {
        id: "students",
        label: "Estudiantes",
        icon: "GraduationCap",
        path: "/dashboard/students",
      },
      {
        id: "classes",
        label: "Clases",
        icon: "BookOpen",
        path: "/dashboard/classes",
      },
      {
        id: "levels",
        label: "Niveles",
        icon: "TrendingUp",
        path: "/dashboard/levels",
      },
    ],
    dashboard: {
      layout: "grid",
      widgets: [],
      defaultView: "dashboard",
    },
    color: "#8b5cf6", // Purple
    icon: "Crown",
  },
  {
    id: "TEACHER",
    label: "Profesor",
    description: "Profesor de idiomas",
    permissions: [
      "classes.read",
      "classes.write",
      "students.read",
      "evaluations.read",
      "evaluations.write",
    ],
    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "Home",
        path: "/dashboard",
      },
      {
        id: "my-classes",
        label: "Mis Clases",
        icon: "BookOpen",
        path: "/dashboard/classes",
      },
      {
        id: "my-students",
        label: "Mis Estudiantes",
        icon: "Users",
        path: "/dashboard/students",
      },
      {
        id: "evaluations",
        label: "Evaluaciones",
        icon: "FileText",
        path: "/dashboard/evaluations",
      },
    ],
    dashboard: {
      layout: "grid",
      widgets: [],
      defaultView: "dashboard",
    },
    color: "#10b981", // Green
    icon: "GraduationCap",
  },
  {
    id: "STUDENT",
    label: "Estudiante",
    description: "Estudiante de idiomas",
    permissions: [
      "classes.read",
      "progress.read",
      "progress.write",
      "materials.read",
    ],
    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "Home",
        path: "/dashboard",
      },
      {
        id: "my-classes",
        label: "Mis Clases",
        icon: "BookOpen",
        path: "/dashboard/classes",
      },
      {
        id: "progress",
        label: "Mi Progreso",
        icon: "TrendingUp",
        path: "/dashboard/progress",
      },
      {
        id: "materials",
        label: "Materiales",
        icon: "FileText",
        path: "/dashboard/materials",
      },
    ],
    dashboard: {
      layout: "grid",
      widgets: [],
      defaultView: "dashboard",
    },
    color: "#3b82f6", // Blue
    icon: "User",
  },
];

// Template para empresa/negocio
export const businessRoles: RoleConfig[] = [
  {
    id: "CEO",
    label: "CEO",
    description: "Director ejecutivo",
    permissions: ["*"],
    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "Home",
        path: "/dashboard",
      },
      {
        id: "employees",
        label: "Empleados",
        icon: "Users",
        path: "/dashboard/employees",
      },
      {
        id: "departments",
        label: "Departamentos",
        icon: "Building",
        path: "/dashboard/departments",
      },
      {
        id: "projects",
        label: "Proyectos",
        icon: "Folder",
        path: "/dashboard/projects",
      },
      {
        id: "reports",
        label: "Reportes",
        icon: "BarChart3",
        path: "/dashboard/reports",
      },
    ],
    dashboard: {
      layout: "grid",
      widgets: [],
      defaultView: "dashboard",
    },
    color: "#dc2626", // Red
    icon: "Crown",
  },
  {
    id: "MANAGER",
    label: "Gerente",
    description: "Gerente de departamento",
    permissions: [
      "employees.read",
      "employees.write",
      "projects.read",
      "projects.write",
      "reports.read",
    ],
    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "Home",
        path: "/dashboard",
      },
      {
        id: "team",
        label: "Mi Equipo",
        icon: "Users",
        path: "/dashboard/team",
      },
      {
        id: "projects",
        label: "Proyectos",
        icon: "Folder",
        path: "/dashboard/projects",
      },
      {
        id: "reports",
        label: "Reportes",
        icon: "BarChart3",
        path: "/dashboard/reports",
      },
    ],
    dashboard: {
      layout: "grid",
      widgets: [],
      defaultView: "dashboard",
    },
    color: "#f59e0b", // Orange
    icon: "UserCheck",
  },
  {
    id: "EMPLOYEE",
    label: "Empleado",
    description: "Empleado de la empresa",
    permissions: [
      "profile.read",
      "profile.write",
      "projects.read",
      "tasks.read",
      "tasks.write",
    ],
    navigation: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: "Home",
        path: "/dashboard",
      },
      {
        id: "tasks",
        label: "Mis Tareas",
        icon: "CheckSquare",
        path: "/dashboard/tasks",
      },
      {
        id: "projects",
        label: "Proyectos",
        icon: "Folder",
        path: "/dashboard/projects",
      },
      {
        id: "profile",
        label: "Mi Perfil",
        icon: "User",
        path: "/dashboard/profile",
      },
    ],
    dashboard: {
      layout: "grid",
      widgets: [],
      defaultView: "dashboard",
    },
    color: "#3b82f6", // Blue
    icon: "User",
  },
];

// ============================================================================
// FUNCIONES UTILITARIAS PARA ROLES
// ============================================================================

export function createRoleConfig(
  roles: RoleConfig[],
  appName: string = "KaledAcademy"
): RoleConfig[] {
  return roles.map(role => ({
    ...role,
    // Personalizar según la aplicación
    navigation: role.navigation.map(item => ({
      ...item,
      path: item.path.replace("/dashboard", `/dashboard/${appName.toLowerCase()}`),
    })),
  }));
}

export function getRolePermissions(roleId: string, roles: RoleConfig[]): string[] {
  const role = roles.find(r => r.id === roleId);
  return role?.permissions || [];
}

export function hasRolePermission(
  roleId: string,
  permission: string,
  roles: RoleConfig[]
): boolean {
  const permissions = getRolePermissions(roleId, roles);
  return permissions.includes("*") || permissions.includes(permission);
}

export function getRoleNavigation(
  roleId: string,
  roles: RoleConfig[]
): NavigationItem[] {
  const role = roles.find(r => r.id === roleId);
  return role?.navigation || [];
}

export function getRoleDashboard(
  roleId: string,
  roles: RoleConfig[]
): DashboardConfig | undefined {
  const role = roles.find(r => r.id === roleId);
  return role?.dashboard;
}

// ============================================================================
// EXPORTACIONES
// ============================================================================

export {
  kaledAcademyRoles as defaultRoles
};
