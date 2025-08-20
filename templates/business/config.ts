import { baseConfig, baseBranding, baseTheme, baseModules, basePermissions, baseNavigation } from '../base/config';

// Configuración específica para gestión empresarial
export const businessConfig = {
  ...baseConfig,
  name: 'BusinessPro - Gestión Empresarial',
  description: 'Sistema completo de gestión empresarial con roles y permisos',
  
  // Configuración específica de la aplicación
  app: {
    ...baseConfig.app,
    name: 'BusinessPro',
    tagline: 'Gestión Empresarial Inteligente'
  },

  // Módulos habilitados para gestión empresarial
  modules: {
    default: ['auth', 'dashboard', 'admin', 'projects'],
    available: [
      'auth',
      'admin', 
      'dashboard',
      'projects',
      'employees',
      'analytics',
      'calendar',
      'notifications'
    ]
  },

  // Roles específicos para gestión empresarial
  roles: {
    default: 'EMPLOYEE',
    available: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE']
  }
};

// Branding específico para gestión empresarial
export const businessBranding = {
  ...baseBranding,
  name: 'BusinessPro',
  tagline: 'Gestión Empresarial Modular',
  description: 'Sistema completo para gestión de empresas con empleados, proyectos y reportes',
  
  // Información de contacto específica
  contact: {
    email: 'info@businesspro.com',
    phone: '+1 (555) 987-6543',
    address: '456 Business Ave, Corporate City, CC 54321',
    website: 'https://businesspro.com',
    support: 'support@businesspro.com'
  },

  // Colores específicos para gestión empresarial
  colors: {
    primary: '#2563eb', // Azul empresarial
    secondary: '#1f2937', // Gris oscuro
    accent: '#7c3aed', // Púrpura
    success: '#059669', // Verde empresarial
    warning: '#d97706', // Naranja
    error: '#dc2626', // Rojo
    background: '#ffffff',
    surface: '#f8fafc',
    text: '#0f172a',
    // Colores específicos para gestión empresarial
    corporate: '#1e40af', // Azul corporativo
    finance: '#059669', // Verde financiero
    hr: '#7c2d12' // Marrón recursos humanos
  }
};

// Tema específico para gestión empresarial
export const businessTheme = {
  ...baseTheme,
  id: 'businessPro',
  name: 'BusinessPro Corporate Theme',
  description: 'Tema profesional para sistemas de gestión empresarial',
  
  colors: {
    ...baseTheme.colors,
    // Colores adicionales para gestión empresarial
    corporate: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a'
    },
    finance: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b'
    }
  }
};

// Módulos específicos para gestión empresarial
export const businessModules = {
  ...baseModules,
  
  // Módulo de proyectos habilitado
  projects: {
    enabled: true,
    required: true,
    config: {
      types: ['development', 'marketing', 'research', 'operations', 'sales'],
      statuses: ['planning', 'active', 'on-hold', 'completed', 'cancelled'],
      features: ['task-management', 'time-tracking', 'resource-allocation', 'budget-tracking'],
      collaboration: ['team-chat', 'file-sharing', 'comment-system', 'approval-workflow']
    }
  },

  // Módulo de empleados habilitado
  employees: {
    enabled: true,
    required: true,
    config: {
      management: ['profile', 'attendance', 'performance', 'payroll'],
      features: ['org-chart', 'leave-management', 'performance-reviews', 'training'],
      integration: ['hr-software', 'payroll-system', 'time-tracking']
    }
  },

  // Módulo de analíticas habilitado
  analytics: {
    enabled: true,
    required: false,
    config: {
      charts: ['line', 'bar', 'pie', 'doughnut', 'funnel', 'heatmap'],
      metrics: ['revenue', 'expenses', 'productivity', 'employee-performance', 'project-progress'],
      reports: ['financial-reports', 'hr-reports', 'project-reports', 'operational-reports'],
      exportFormats: ['pdf', 'csv', 'excel', 'powerpoint']
    }
  },

  // Módulo de calendario habilitado
  calendar: {
    enabled: true,
    required: false,
    config: {
      views: ['month', 'week', 'day', 'agenda', 'timeline'],
      eventTypes: ['meeting', 'deadline', 'appointment', 'holiday', 'training'],
      integration: ['google-calendar', 'outlook', 'slack'],
      features: ['room-booking', 'recurring-events', 'reminders', 'availability-checking']
    }
  },

  // Módulo de notificaciones habilitado
  notifications: {
    enabled: true,
    required: false,
    config: {
      channels: ['email', 'push', 'sms', 'slack', 'teams'],
      templates: ['welcome', 'project-update', 'deadline-reminder', 'meeting-invite', 'approval-request'],
      preferences: true,
      scheduling: true
    }
  }
};

// Permisos específicos para gestión empresarial
export const businessPermissions = {
  ...basePermissions,
  
  // Permisos de proyectos
  'projects:read': {
    name: 'Ver Proyectos',
    description: 'Permite ver los proyectos disponibles',
    roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE']
  },

  'projects:create': {
    name: 'Crear Proyectos',
    description: 'Permite crear nuevos proyectos',
    roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER']
  },

  'projects:update': {
    name: 'Actualizar Proyectos',
    description: 'Permite actualizar proyectos existentes',
    roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER']
  },

  'projects:delete': {
    name: 'Eliminar Proyectos',
    description: 'Permite eliminar proyectos',
    roles: ['SUPER_ADMIN', 'ADMIN']
  },

  // Permisos de empleados
  'employees:read': {
    name: 'Ver Empleados',
    description: 'Permite ver la lista de empleados',
    roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER']
  },

  'employees:create': {
    name: 'Crear Empleados',
    description: 'Permite crear nuevos empleados',
    roles: ['SUPER_ADMIN', 'ADMIN']
  },

  'employees:update': {
    name: 'Actualizar Empleados',
    description: 'Permite actualizar información de empleados',
    roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER']
  },

  'employees:delete': {
    name: 'Eliminar Empleados',
    description: 'Permite eliminar empleados',
    roles: ['SUPER_ADMIN', 'ADMIN']
  },

  // Permisos de tareas
  'tasks:read': {
    name: 'Ver Tareas',
    description: 'Permite ver las tareas asignadas',
    roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE']
  },

  'tasks:create': {
    name: 'Crear Tareas',
    description: 'Permite crear nuevas tareas',
    roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER']
  },

  'tasks:update': {
    name: 'Actualizar Tareas',
    description: 'Permite actualizar tareas existentes',
    roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE']
  },

  'tasks:delete': {
    name: 'Eliminar Tareas',
    description: 'Permite eliminar tareas',
    roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER']
  },

  // Permisos de reportes
  'reports:read': {
    name: 'Ver Reportes',
    description: 'Permite ver reportes y analíticas',
    roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER']
  },

  'reports:create': {
    name: 'Crear Reportes',
    description: 'Permite crear nuevos reportes',
    roles: ['SUPER_ADMIN', 'ADMIN']
  },

  'reports:export': {
    name: 'Exportar Reportes',
    description: 'Permite exportar reportes',
    roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER']
  },

  // Permisos de finanzas
  'finance:read': {
    name: 'Ver Finanzas',
    description: 'Permite ver información financiera',
    roles: ['SUPER_ADMIN', 'ADMIN']
  },

  'finance:update': {
    name: 'Actualizar Finanzas',
    description: 'Permite actualizar información financiera',
    roles: ['SUPER_ADMIN', 'ADMIN']
  }
};

// Navegación específica para gestión empresarial
export const businessNavigation = {
  ...baseNavigation,
  
  // Navegación de proyectos
  projects: [
    {
      path: '/dashboard/projects',
      title: 'Proyectos',
      icon: 'FolderOpen',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE']
    },
    {
      path: '/dashboard/projects/create',
      title: 'Crear Proyecto',
      icon: 'Plus',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER']
    }
  ],

  // Navegación de empleados
  employees: [
    {
      path: '/dashboard/employees',
      title: 'Empleados',
      icon: 'Users',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER']
    },
    {
      path: '/dashboard/employees/create',
      title: 'Agregar Empleado',
      icon: 'UserPlus',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN']
    }
  ],

  // Navegación de tareas
  tasks: [
    {
      path: '/dashboard/tasks',
      title: 'Mis Tareas',
      icon: 'CheckSquare',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'EMPLOYEE']
    },
    {
      path: '/dashboard/tasks/create',
      title: 'Crear Tarea',
      icon: 'Plus',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER']
    }
  ],

  // Navegación de reportes
  reports: [
    {
      path: '/dashboard/reports',
      title: 'Reportes',
      icon: 'BarChart3',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER']
    },
    {
      path: '/dashboard/reports/create',
      title: 'Crear Reporte',
      icon: 'FileText',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN']
    }
  ],

  // Navegación de finanzas
  finance: [
    {
      path: '/dashboard/finance',
      title: 'Finanzas',
      icon: 'DollarSign',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN']
    },
    {
      path: '/dashboard/finance/budget',
      title: 'Presupuesto',
      icon: 'PieChart',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN']
    }
  ],

  // Navegación de recursos humanos
  hr: [
    {
      path: '/dashboard/hr',
      title: 'Recursos Humanos',
      icon: 'UserCheck',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN']
    },
    {
      path: '/dashboard/hr/attendance',
      title: 'Asistencia',
      icon: 'Clock',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'MANAGER']
    }
  ]
};

// Esquema de base de datos específico para gestión empresarial
export const businessDatabaseSchema = {
  // Modelos específicos para gestión empresarial
  models: {
    Project: {
      id: 'String @id @default(cuid())',
      name: 'String',
      description: 'String?',
      status: 'ProjectStatus',
      priority: 'Priority',
      startDate: 'DateTime',
      endDate: 'DateTime?',
      budget: 'Float?',
      managerId: 'String',
      manager: 'Employee @relation(fields: [managerId], references: [id])',
      team: 'ProjectTeam[]',
      tasks: 'Task[]',
      createdAt: 'DateTime @default(now())',
      updatedAt: 'DateTime @updatedAt'
    },

    Employee: {
      id: 'String @id @default(cuid())',
      employeeId: 'String @unique',
      firstName: 'String',
      lastName: 'String',
      email: 'String @unique',
      phone: 'String?',
      position: 'String',
      department: 'String',
      hireDate: 'DateTime',
      salary: 'Float?',
      managerId: 'String?',
      manager: 'Employee? @relation("EmployeeManager", fields: [managerId], references: [id])',
      subordinates: 'Employee[] @relation("EmployeeManager")',
      projects: 'ProjectTeam[]',
      tasks: 'Task[]',
      attendance: 'Attendance[]',
      createdAt: 'DateTime @default(now())',
      updatedAt: 'DateTime @updatedAt'
    },

    Task: {
      id: 'String @id @default(cuid())',
      title: 'String',
      description: 'String?',
      status: 'TaskStatus',
      priority: 'Priority',
      dueDate: 'DateTime?',
      estimatedHours: 'Float?',
      actualHours: 'Float?',
      projectId: 'String?',
      project: 'Project? @relation(fields: [projectId], references: [id])',
      assigneeId: 'String?',
      assignee: 'Employee? @relation(fields: [assigneeId], references: [id])',
      createdAt: 'DateTime @default(now())',
      updatedAt: 'DateTime @updatedAt'
    },

    ProjectTeam: {
      id: 'String @id @default(cuid())',
      projectId: 'String',
      project: 'Project @relation(fields: [projectId], references: [id])',
      employeeId: 'String',
      employee: 'Employee @relation(fields: [employeeId], references: [id])',
      role: 'String',
      joinedAt: 'DateTime @default(now())'
    },

    Attendance: {
      id: 'String @id @default(cuid())',
      employeeId: 'String',
      employee: 'Employee @relation(fields: [employeeId], references: [id])',
      date: 'DateTime',
      checkIn: 'DateTime?',
      checkOut: 'DateTime?',
      totalHours: 'Float?',
      status: 'AttendanceStatus'
    },

    Report: {
      id: 'String @id @default(cuid())',
      title: 'String',
      type: 'ReportType',
      content: 'Json',
      generatedBy: 'String',
      generatedAt: 'DateTime @default(now())',
      parameters: 'Json?'
    }
  },

  // Enums específicos para gestión empresarial
  enums: {
    ProjectStatus: ['PLANNING', 'ACTIVE', 'ON_HOLD', 'COMPLETED', 'CANCELLED'],
    TaskStatus: ['TODO', 'IN_PROGRESS', 'REVIEW', 'COMPLETED', 'CANCELLED'],
    Priority: ['LOW', 'MEDIUM', 'HIGH', 'URGENT'],
    AttendanceStatus: ['PRESENT', 'ABSENT', 'LATE', 'HALF_DAY', 'REMOTE'],
    ReportType: ['FINANCIAL', 'HR', 'PROJECT', 'OPERATIONAL', 'CUSTOM']
  }
};
