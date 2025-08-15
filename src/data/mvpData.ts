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
    maxStudents: 25,
    currentStudents: 23,
    status: 'active',
    teacherId: '3',
    schedule: 'Lunes y Miércoles 19:00-21:00',
    timezone: 'America/Bogota'
  },
  {
    id: '2',
    name: 'DS-Feb25',
    courseId: '2',
    startDate: '2025-02-01',
    endDate: '2025-10-01',
    maxStudents: 20,
    currentStudents: 18,
    status: 'active',
    teacherId: '4',
    schedule: 'Martes y Jueves 20:00-22:00',
    timezone: 'America/Bogota'
  },
  {
    id: '3',
    name: 'UX-Mar25',
    courseId: '3',
    startDate: '2025-03-01',
    endDate: '2025-07-01',
    maxStudents: 15,
    currentStudents: 12,
    status: 'active',
    teacherId: '3',
    schedule: 'Viernes 18:00-21:00',
    timezone: 'America/Bogota'
  }
];

// ===== MÓDULOS =====
export const demoModules: Module[] = [
  {
    id: '1',
    title: 'Fundamentos de JavaScript',
    description: 'Aprende los conceptos básicos de JavaScript y programación web.',
    courseId: '1',
    order: 1,
    duration: '4 semanas',
    lessons: ['1', '2', '3', '4'],
    isActive: true
  },
  {
    id: '2',
    title: 'React Fundamentals',
    description: 'Desarrollo de interfaces de usuario con React.',
    courseId: '1',
    order: 2,
    duration: '6 semanas',
    lessons: ['5', '6', '7', '8', '9', '10'],
    isActive: true
  },
  {
    id: '3',
    title: 'Backend con Node.js',
    description: 'Desarrollo de APIs y servidores con Node.js.',
    courseId: '1',
    order: 3,
    duration: '5 semanas',
    lessons: ['11', '12', '13', '14', '15'],
    isActive: true
  }
];

// ===== LECCIONES =====
export const demoLessons: Lesson[] = [
  {
    id: '1',
    title: 'Variables y Tipos de Datos',
    description: 'Introducción a variables, tipos de datos y operadores en JavaScript.',
    moduleId: '1',
    order: 1,
    duration: '45 min',
    type: 'lecture',
    content: 'Contenido de la lección...',
    videoUrl: 'https://example.com/video1.mp4',
    materials: ['script.js', 'ejercicios.pdf'],
    isActive: true
  },
  {
    id: '2',
    title: 'Funciones y Scope',
    description: 'Aprende sobre funciones, parámetros y scope en JavaScript.',
    moduleId: '1',
    order: 2,
    duration: '60 min',
    type: 'workshop',
    content: 'Contenido de la lección...',
    videoUrl: 'https://example.com/video2.mp4',
    materials: ['functions.js', 'ejercicios.pdf'],
    isActive: true
  }
];

// ===== PROGRESO DE ESTUDIANTES =====
export interface StudentProgress {
  userId: string;
  courseId: string;
  moduleProgress: {
    moduleId: string;
    completedLessons: string[];
    currentLesson: string;
    progress: number;
  }[];
  overallProgress: number;
  lastActivity: string;
}

export const demoStudentProgress: StudentProgress[] = [
  {
    userId: '5',
    courseId: '1',
    moduleProgress: [
      {
        moduleId: '1',
        completedLessons: ['1', '2'],
        currentLesson: '3',
        progress: 50
      },
      {
        moduleId: '2',
        completedLessons: [],
        currentLesson: '5',
        progress: 0
      }
    ],
    overallProgress: 25,
    lastActivity: '2025-01-14T10:30:00Z'
  }
];

// ===== EVALUACIONES =====
export interface Evaluation {
  id: string;
  lessonId: string;
  studentId: string;
  score: number;
  maxScore: number;
  feedback: string;
  submittedAt: string;
  gradedBy: string;
  gradedAt: string;
}

export const demoEvaluations: Evaluation[] = [
  {
    id: '1',
    lessonId: '1',
    studentId: '5',
    score: 85,
    maxScore: 100,
    feedback: 'Excelente trabajo. Continúa así.',
    submittedAt: '2025-01-10T15:30:00Z',
    gradedBy: '3',
    gradedAt: '2025-01-11T09:00:00Z'
  }
];

// ===== MENSAJES =====
export interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  read: boolean;
  timestamp: string;
  attachments?: string[];
}

export const demoMessages: Message[] = [
  {
    id: '1',
    from: '3',
    to: '5',
    subject: 'Feedback sobre tu proyecto',
    content: 'Hola Laura, revisé tu proyecto y está muy bien. Te envío algunos comentarios...',
    read: false,
    timestamp: '2025-01-14T08:00:00Z'
  }
];

// ===== EVENTOS DEL CALENDARIO =====
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number; // en minutos
  type: 'live-session' | 'deadline' | 'assignment' | 'meeting';
  participants: string[];
  courseId?: string;
  cohortId?: string;
}

export const demoCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Sesión en Vivo - JavaScript Avanzado',
    description: 'Repaso de conceptos avanzados de JavaScript',
    date: '2025-01-15',
    time: '19:00',
    duration: 120,
    type: 'live-session',
    participants: ['3', '5'],
    courseId: '1',
    cohortId: '1'
  },
  {
    id: '2',
    title: 'Entrega Proyecto Módulo 1',
    description: 'Deadline para entregar el proyecto del primer módulo',
    date: '2025-01-20',
    time: '23:59',
    duration: 0,
    type: 'deadline',
    participants: ['5'],
    courseId: '1'
  }
];
