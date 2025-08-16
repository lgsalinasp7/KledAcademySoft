// MVP Data Structure - KaledAcademy
import { User, Course, Cohort, Module, Lesson, UserRole } from '../types';

// ===== USUARIOS DEMO =====
export const demoUsers: User[] = [
  {
    id: '1',
    name: 'Ana García',
    email: 'ana@kaledacademy.com',
    initials: 'AG',
    role: 'super_admin',
    isActive: true,
    createdAt: '2024-01-01',
    lastLogin: '2025-01-14'
  },
  {
    id: '2',
    name: 'Carlos López',
    email: 'carlos@kaledacademy.com',
    initials: 'CL',
    role: 'admin',
    isActive: true,
    createdAt: '2024-01-15',
    lastLogin: '2025-01-14'
  },
  {
    id: '3',
    name: 'María Rodríguez',
    email: 'maria@kaledacademy.com',
    initials: 'MR',
    role: 'teacher',
    isActive: true,
    createdAt: '2024-02-01',
    lastLogin: '2025-01-13'
  },
  {
    id: '4',
    name: 'Juan Pérez',
    email: 'juan@kaledacademy.com',
    initials: 'JP',
    role: 'teacher',
    isActive: true,
    createdAt: '2024-02-15',
    lastLogin: '2025-01-12'
  },
  {
    id: '5',
    name: 'Laura Martínez',
    email: 'laura@kaledacademy.com',
    initials: 'LM',
    role: 'student',
    isActive: true,
    createdAt: '2024-03-01',
    lastLogin: '2025-01-14'
  }
];

// ===== CURSOS =====
export const demoCourses: Course[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    description: 'Aprende desarrollo web completo con JavaScript, React, Node.js y bases de datos.',
    category: 'programming',
    duration: '6 meses',
    level: 'intermediate',
    price: 2500,
    currency: 'USD',
    isActive: true,
    thumbnail: '/api/placeholder/300/200',
    createdAt: '2024-01-15',
    updatedAt: '2025-01-10',
    createdBy: '1'
  },
  {
    id: '2',
    title: 'Data Science & Analytics',
    description: 'Domina Python, Machine Learning, estadística y visualización de datos.',
    category: 'data',
    duration: '8 meses',
    level: 'advanced',
    price: 3000,
    currency: 'USD',
    isActive: true,
    thumbnail: '/api/placeholder/300/200',
    createdAt: '2024-02-20',
    updatedAt: '2025-01-08',
    createdBy: '1'
  },
  {
    id: '3',
    title: 'UX/UI Design Bootcamp',
    description: 'Diseña experiencias digitales increíbles con Figma, Adobe XD y metodologías UX.',
    category: 'design',
    duration: '4 meses',
    level: 'beginner',
    price: 1800,
    currency: 'USD',
    isActive: true,
    thumbnail: '/api/placeholder/300/200',
    createdAt: '2024-03-10',
    updatedAt: '2025-01-05',
    createdBy: '1'
  }
];

// ===== COHORTES =====
export const demoCohorts: Cohort[] = [
  {
    id: '1',
    name: 'FS-Jan25',
    courseId: '1',
    startDate: '2025-01-15',
    endDate: '2025-07-15',
    schedule: {
      days: ['monday', 'wednesday', 'friday'],
      time: '19:00-22:00',
      timezone: 'America/Bogota'
    },
    maxStudents: 25,
    currentStudents: 18,
    status: 'active',
    teachers: ['3', '4'],
    students: ['5'],
    createdAt: '2024-12-01'
  },
  {
    id: '2',
    name: 'DS-Feb25',
    courseId: '2',
    startDate: '2025-02-01',
    endDate: '2025-10-01',
    schedule: {
      days: ['tuesday', 'thursday'],
      time: '19:00-22:00',
      timezone: 'America/Bogota'
    },
    maxStudents: 20,
    currentStudents: 15,
    status: 'active',
    teachers: ['3'],
    students: [],
    createdAt: '2024-12-15'
  },
  {
    id: '3',
    name: 'UX-Mar25',
    courseId: '3',
    startDate: '2025-03-01',
    endDate: '2025-07-01',
    schedule: {
      days: ['monday', 'wednesday'],
      time: '17:00-20:00',
      timezone: 'America/Bogota'
    },
    maxStudents: 15,
    currentStudents: 12,
    status: 'active',
    teachers: ['4'],
    students: [],
    createdAt: '2025-01-01'
  }
];

// ===== MÓDULOS =====
export const demoModules: Module[] = [
  {
    id: 'module-0',
    title: 'Módulo 0: Preparación y Herramientas',
    lectures: 4,
    duration: '2 semanas',
    nextCheckpoint: '15/01/2025',
    completed: true,
    expanded: false,
    lessons: [
      { id: 'lesson-1', title: 'Introducción al curso', type: 'lecture', completed: true },
      { id: 'lesson-2', title: 'Instalación de herramientas', type: 'lecture', completed: true },
      { id: 'lesson-3', title: 'Configuración del entorno', type: 'lecture', completed: true },
      { id: 'lesson-4', title: 'Checkpoint 0', type: 'checkpoint', completed: true }
    ]
  },
  {
    id: 'module-1',
    title: 'Módulo 1: Fundamentos de JavaScript',
    lectures: 6,
    duration: '3 semanas',
    nextCheckpoint: '05/02/2025',
    completed: false,
    expanded: false,
    lessons: [
      { id: 'lesson-5', title: 'Variables y tipos de datos', type: 'lecture', completed: true },
      { id: 'lesson-6', title: 'Funciones y scope', type: 'lecture', completed: false },
      { id: 'lesson-7', title: 'Arrays y objetos', type: 'lecture', completed: false },
      { id: 'lesson-8', title: 'DOM manipulation', type: 'lecture', completed: false },
      { id: 'lesson-9', title: 'Event handling', type: 'lecture', completed: false },
      { id: 'lesson-10', title: 'Checkpoint 1', type: 'checkpoint', completed: false }
    ]
  },
  {
    id: 'module-2',
    title: 'Módulo 2: React Fundamentals',
    lectures: 8,
    duration: '4 semanas',
    nextCheckpoint: '26/02/2025',
    completed: false,
    expanded: false,
    lessons: [
      { id: 'lesson-11', title: 'Introducción a React', type: 'lecture', completed: false },
      { id: 'lesson-12', title: 'Components y props', type: 'lecture', completed: false },
      { id: 'lesson-13', title: 'State y lifecycle', type: 'lecture', completed: false },
      { id: 'lesson-14', title: 'Hooks básicos', type: 'lecture', completed: false },
      { id: 'lesson-15', title: 'Eventos y formularios', type: 'lecture', completed: false },
      { id: 'lesson-16', title: 'Routing con React Router', type: 'lecture', completed: false },
      { id: 'lesson-17', title: 'Consumo de APIs', type: 'lecture', completed: false },
      { id: 'lesson-18', title: 'Checkpoint 2', type: 'checkpoint', completed: false }
    ]
  }
];

// ===== LECCIONES =====
export const demoLessons: Lesson[] = [
  { id: 'lesson-1', title: 'Introducción al curso', type: 'lecture', completed: true, duration: '45 min' },
  { id: 'lesson-2', title: 'Instalación de herramientas', type: 'lecture', completed: true, duration: '60 min' },
  { id: 'lesson-3', title: 'Configuración del entorno', type: 'lecture', completed: true, duration: '30 min' },
  { id: 'lesson-4', title: 'Checkpoint 0', type: 'checkpoint', completed: true, duration: '90 min' },
  { id: 'lesson-5', title: 'Variables y tipos de datos', type: 'lecture', completed: true, duration: '75 min' },
  { id: 'lesson-6', title: 'Funciones y scope', type: 'lecture', completed: false, duration: '90 min' },
  { id: 'lesson-7', title: 'Arrays y objetos', type: 'lecture', completed: false, duration: '80 min' },
  { id: 'lesson-8', title: 'DOM manipulation', type: 'lecture', completed: false, duration: '100 min' },
  { id: 'lesson-9', title: 'Event handling', type: 'lecture', completed: false, duration: '85 min' },
  { id: 'lesson-10', title: 'Checkpoint 1', type: 'checkpoint', completed: false, duration: '120 min' }
];

// ===== VIDEOS =====
export const demoVideos = [
  {
    id: '1',
    title: 'JavaScript Fundamentals - Variables and Data Types',
    date: '08/08/2025',
    duration: '45:30',
    thumbnail: '/api/placeholder/320/180',
    module: 'Module 1',
    type: 'lecture'
  },
  {
    id: '2',
    title: 'DOM Manipulation Workshop',
    date: '07/08/2025',
    duration: '1:12:45',
    thumbnail: '/api/placeholder/320/180',
    module: 'Module 1',
    type: 'workshop'
  },
  {
    id: '3',
    title: 'Code Review Session - Week 2',
    date: '06/08/2025',
    duration: '38:20',
    thumbnail: '/api/placeholder/320/180',
    module: 'Module 1',
    type: 'review'
  }
];

// ===== PROGRESO DEL ESTUDIANTE =====
export const demoStudentProgress = [
  {
    userId: 'student-1',
    courseId: 'fullstack-career',
    moduleProgress: [
      {
        moduleId: 'module-0',
        completedLessons: ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4'],
        currentLesson: 'lesson-5',
        progress: 100
      },
      {
        moduleId: 'module-1',
        completedLessons: ['lesson-5'],
        currentLesson: 'lesson-6',
        progress: 25
      }
    ],
    overallProgress: 62.5,
    lastActivity: '2024-01-15T10:30:00Z'
  }
];

// ===== ESTADÍSTICAS DEL DASHBOARD =====
export const dashboardStats = {
  totalStudents: 1247,
  activeCourses: 8,
  completedLessons: 15200,
  graduationRate: 87,
  recentActivity: [
    { type: 'course', message: 'Nuevo curso "React Avanzado" creado', time: '2 horas', user: 'Prof. García' },
    { type: 'student', message: '24 nuevos estudiantes registrados', time: '4 horas', user: 'Sistema' },
    { type: 'completion', message: 'Cohorte FS-Jan25 completó Módulo 2', time: '6 horas', user: 'Automático' },
    { type: 'teacher', message: 'Prof. López se unió como instructor', time: '1 día', user: 'Admin' }
  ],
  upcomingEvents: [
    { id: '1', title: 'Inicio Cohorte FS-Mar25', date: '2025-03-01', time: '19:00', duration: 180, type: 'live-session', participants: [], courseId: '1', cohortId: '3' },
    { id: '2', title: 'Checkpoint M1 - Data Science', date: '2025-01-20', time: '20:00', duration: 120, type: 'deadline', participants: [], courseId: '2' },
    { id: '3', title: 'Reunión de Profesores', date: '2025-01-18', time: '15:00', duration: 60, type: 'meeting', participants: ['3', '4'] },
    { id: '4', title: 'Demo Day UX/UI', date: '2025-01-25', time: '18:00', duration: 240, type: 'live-session', participants: [], courseId: '3' }
  ]
};
