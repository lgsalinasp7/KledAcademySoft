import { baseConfig, baseBranding, baseTheme, baseModules, basePermissions, baseNavigation } from '../base/config';

// Configuración específica para plataforma educativa
export const educationalConfig = {
  ...baseConfig,
  name: 'KaledAcademy - Plataforma Educativa',
  description: 'Plataforma completa para escuelas, academias y centros educativos',
  
  // Configuración específica de la aplicación
  app: {
    ...baseConfig.app,
    name: 'KaledAcademy',
    tagline: 'Transformando la Educación Digital'
  },

  // Módulos habilitados para educación
  modules: {
    default: ['auth', 'dashboard', 'lessons', 'admin'],
    available: [
      'auth',
      'admin', 
      'dashboard',
      'lessons',
      'analytics',
      'calendar',
      'notifications'
    ]
  },

  // Roles específicos para educación
  roles: {
    default: 'STUDENT',
    available: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
  }
};

// Branding específico para educación
export const educationalBranding = {
  ...baseBranding,
  name: 'KaledAcademy',
  tagline: 'Plataforma Educativa Modular',
  description: 'Sistema completo para gestión educativa con cursos, lecciones y seguimiento de estudiantes',
  
  // Información de contacto específica
  contact: {
    email: 'info@kaledacademy.com',
    phone: '+1 (555) 123-4567',
    address: '123 Education St, Learning City, LC 12345',
    website: 'https://kaledacademy.com',
    support: 'support@kaledacademy.com'
  },

  // Colores específicos para educación
  colors: {
    primary: '#fbbf24', // Amarillo KaledAcademy
    secondary: '#1f2937', // Gris oscuro
    accent: '#3b82f6', // Azul
    success: '#10b981', // Verde
    warning: '#f59e0b', // Naranja
    error: '#ef4444', // Rojo
    background: '#ffffff',
    surface: '#f9fafb',
    text: '#111827',
    // Colores específicos para educación
    learning: '#8b5cf6', // Púrpura para aprendizaje
    assessment: '#06b6d4', // Cyan para evaluaciones
    collaboration: '#84cc16' // Verde lima para colaboración
  }
};

// Tema específico para educación
export const educationalTheme = {
  ...baseTheme,
  id: 'kaledAcademy',
  name: 'KaledAcademy Educational Theme',
  description: 'Tema oficial de KaledAcademy para plataformas educativas',
  
  colors: {
    ...baseTheme.colors,
    // Colores adicionales para educación
    learning: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87'
    },
    assessment: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63'
    }
  }
};

// Módulos específicos para educación
export const educationalModules = {
  ...baseModules,
  
  // Módulo de lecciones habilitado
  lessons: {
    enabled: true,
    required: true,
    config: {
      types: ['video', 'text', 'quiz', 'assignment', 'interactive'],
      formats: ['mp4', 'pdf', 'docx', 'pptx', 'html'],
      features: ['progress-tracking', 'completion-certificates', 'interactive-elements'],
      assessment: ['quizzes', 'assignments', 'peer-reviews', 'instructor-feedback']
    }
  },

  // Módulo de analíticas habilitado
  analytics: {
    enabled: true,
    required: false,
    config: {
      charts: ['line', 'bar', 'pie', 'doughnut', 'radar'],
      metrics: ['student-progress', 'course-completion', 'engagement', 'performance'],
      reports: ['student-reports', 'course-reports', 'instructor-reports', 'institutional-reports'],
      exportFormats: ['pdf', 'csv', 'excel', 'json']
    }
  },

  // Módulo de calendario habilitado
  calendar: {
    enabled: true,
    required: false,
    config: {
      views: ['month', 'week', 'day', 'agenda'],
      eventTypes: ['class', 'assignment-due', 'exam', 'office-hours', 'meeting'],
      integration: ['google-calendar', 'outlook', 'moodle'],
      features: ['recurring-events', 'reminders', 'attendance-tracking']
    }
  },

  // Módulo de notificaciones habilitado
  notifications: {
    enabled: true,
    required: false,
    config: {
      channels: ['email', 'push', 'sms', 'in-app'],
      templates: ['welcome', 'assignment-due', 'grade-available', 'course-update', 'reminder'],
      preferences: true,
      scheduling: true
    }
  }
};

// Permisos específicos para educación
export const educationalPermissions = {
  ...basePermissions,
  
  // Permisos de lecciones
  'lessons:read': {
    name: 'Ver Lecciones',
    description: 'Permite ver las lecciones disponibles',
    roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
  },

  'lessons:create': {
    name: 'Crear Lecciones',
    description: 'Permite crear nuevas lecciones',
    roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
  },

  'lessons:update': {
    name: 'Actualizar Lecciones',
    description: 'Permite actualizar lecciones existentes',
    roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
  },

  'lessons:delete': {
    name: 'Eliminar Lecciones',
    description: 'Permite eliminar lecciones',
    roles: ['SUPER_ADMIN', 'ADMIN']
  },

  // Permisos de cursos
  'courses:read': {
    name: 'Ver Cursos',
    description: 'Permite ver los cursos disponibles',
    roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
  },

  'courses:create': {
    name: 'Crear Cursos',
    description: 'Permite crear nuevos cursos',
    roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
  },

  'courses:update': {
    name: 'Actualizar Cursos',
    description: 'Permite actualizar cursos existentes',
    roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
  },

  'courses:delete': {
    name: 'Eliminar Cursos',
    description: 'Permite eliminar cursos',
    roles: ['SUPER_ADMIN', 'ADMIN']
  },

  // Permisos de estudiantes
  'students:read': {
    name: 'Ver Estudiantes',
    description: 'Permite ver la lista de estudiantes',
    roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
  },

  'students:create': {
    name: 'Crear Estudiantes',
    description: 'Permite crear nuevos estudiantes',
    roles: ['SUPER_ADMIN', 'ADMIN']
  },

  'students:update': {
    name: 'Actualizar Estudiantes',
    description: 'Permite actualizar información de estudiantes',
    roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
  },

  'students:delete': {
    name: 'Eliminar Estudiantes',
    description: 'Permite eliminar estudiantes',
    roles: ['SUPER_ADMIN', 'ADMIN']
  },

  // Permisos de evaluaciones
  'assessments:read': {
    name: 'Ver Evaluaciones',
    description: 'Permite ver evaluaciones',
    roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
  },

  'assessments:create': {
    name: 'Crear Evaluaciones',
    description: 'Permite crear nuevas evaluaciones',
    roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
  },

  'assessments:grade': {
    name: 'Calificar Evaluaciones',
    description: 'Permite calificar evaluaciones',
    roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
  },

  // Permisos de progreso
  'progress:read': {
    name: 'Ver Progreso',
    description: 'Permite ver el progreso del usuario',
    roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
  },

  'progress:update': {
    name: 'Actualizar Progreso',
    description: 'Permite actualizar el progreso',
    roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
  }
};

// Navegación específica para educación
export const educationalNavigation = {
  ...baseNavigation,
  
  // Navegación de lecciones
  lessons: [
    {
      path: '/dashboard/lessons',
      title: 'Mis Lecciones',
      icon: 'BookOpen',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
    },
    {
      path: '/dashboard/lessons/create',
      title: 'Crear Lección',
      icon: 'Plus',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
    }
  ],

  // Navegación de cursos
  courses: [
    {
      path: '/dashboard/courses',
      title: 'Cursos',
      icon: 'GraduationCap',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
    },
    {
      path: '/dashboard/courses/create',
      title: 'Crear Curso',
      icon: 'Plus',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
    }
  ],

  // Navegación de estudiantes
  students: [
    {
      path: '/dashboard/students',
      title: 'Estudiantes',
      icon: 'Users',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
    },
    {
      path: '/dashboard/students/create',
      title: 'Agregar Estudiante',
      icon: 'UserPlus',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN']
    }
  ],

  // Navegación de evaluaciones
  assessments: [
    {
      path: '/dashboard/assessments',
      title: 'Evaluaciones',
      icon: 'ClipboardCheck',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER', 'STUDENT']
    },
    {
      path: '/dashboard/assessments/create',
      title: 'Crear Evaluación',
      icon: 'Plus',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
    }
  ],

  // Navegación de progreso
  progress: [
    {
      path: '/dashboard/progress',
      title: 'Mi Progreso',
      icon: 'TrendingUp',
      requiresAuth: true,
      roles: ['STUDENT']
    },
    {
      path: '/dashboard/progress/students',
      title: 'Progreso Estudiantes',
      icon: 'BarChart3',
      requiresAuth: true,
      roles: ['SUPER_ADMIN', 'ADMIN', 'TEACHER']
    }
  ]
};

// Esquema de base de datos específico para educación
export const educationalDatabaseSchema = {
  // Modelos específicos para educación
  models: {
    Course: {
      id: 'String @id @default(cuid())',
      title: 'String',
      description: 'String?',
      instructorId: 'String',
      instructor: 'User @relation(fields: [instructorId], references: [id])',
      lessons: 'Lesson[]',
      students: 'CourseEnrollment[]',
      createdAt: 'DateTime @default(now())',
      updatedAt: 'DateTime @updatedAt'
    },

    Lesson: {
      id: 'String @id @default(cuid())',
      title: 'String',
      content: 'String',
      type: 'LessonType',
      courseId: 'String',
      course: 'Course @relation(fields: [courseId], references: [id])',
      order: 'Int',
      duration: 'Int?', // en minutos
      progress: 'LessonProgress[]',
      createdAt: 'DateTime @default(now())',
      updatedAt: 'DateTime @updatedAt'
    },

    CourseEnrollment: {
      id: 'String @id @default(cuid())',
      studentId: 'String',
      student: 'User @relation(fields: [studentId], references: [id])',
      courseId: 'String',
      course: 'Course @relation(fields: [courseId], references: [id])',
      enrolledAt: 'DateTime @default(now())',
      completedAt: 'DateTime?',
      progress: 'Float @default(0)',
      status: 'EnrollmentStatus @default(ACTIVE)'
    },

    LessonProgress: {
      id: 'String @id @default(cuid())',
      studentId: 'String',
      student: 'User @relation(fields: [studentId], references: [id])',
      lessonId: 'String',
      lesson: 'Lesson @relation(fields: [lessonId], references: [id])',
      completed: 'Boolean @default(false)',
      completedAt: 'DateTime?',
      timeSpent: 'Int?', // en segundos
      score: 'Float?'
    },

    Assessment: {
      id: 'String @id @default(cuid())',
      title: 'String',
      description: 'String?',
      type: 'AssessmentType',
      courseId: 'String',
      course: 'Course @relation(fields: [courseId], references: [id])',
      dueDate: 'DateTime?',
      maxScore: 'Float',
      submissions: 'AssessmentSubmission[]',
      createdAt: 'DateTime @default(now())',
      updatedAt: 'DateTime @updatedAt'
    },

    AssessmentSubmission: {
      id: 'String @id @default(cuid())',
      studentId: 'String',
      student: 'User @relation(fields: [studentId], references: [id])',
      assessmentId: 'String',
      assessment: 'Assessment @relation(fields: [assessmentId], references: [id])',
      submittedAt: 'DateTime @default(now())',
      score: 'Float?',
      feedback: 'String?',
      gradedBy: 'String?',
      gradedAt: 'DateTime?'
    }
  },

  // Enums específicos para educación
  enums: {
    LessonType: ['VIDEO', 'TEXT', 'QUIZ', 'ASSIGNMENT', 'INTERACTIVE'],
    AssessmentType: ['QUIZ', 'ASSIGNMENT', 'EXAM', 'PROJECT'],
    EnrollmentStatus: ['ACTIVE', 'COMPLETED', 'DROPPED', 'SUSPENDED']
  }
};
