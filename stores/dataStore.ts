import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

// Tipos
export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'programming' | 'design' | 'data' | 'marketing';
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  currency: string;
  isActive: boolean;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  courseId: string;
  order: number;
  lessons: Lesson[];
  isActive: boolean;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  moduleId: string;
  order: number;
  duration: number;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  content: string;
  videoUrl?: string;
  isActive: boolean;
}

export interface Cohort {
  id: string;
  name: string;
  courseId: string;
  startDate: string;
  endDate: string;
  schedule: {
    days: string[];
    time: string;
    timezone: string;
  };
  maxStudents: number;
  currentStudents: number;
  teachers: string[];
  isActive: boolean;
}

interface DataState {
  // Estado
  courses: Course[];
  modules: Module[];
  lessons: Lesson[];
  cohorts: Cohort[];
  loading: boolean;
  error: string | null;
  
  // Acciones
  loadCourses: () => Promise<void>;
  loadModules: (courseId: string) => Promise<void>;
  loadLessons: (moduleId: string) => Promise<void>;
  loadCohorts: () => Promise<void>;
  addCourse: (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateCourse: (id: string, updates: Partial<Course>) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  addModule: (module: Omit<Module, 'id'>) => Promise<void>;
  updateModule: (id: string, updates: Partial<Module>) => Promise<void>;
  deleteModule: (id: string) => Promise<void>;
  
  // Selectores computados
  getCourseById: (id: string) => Course | undefined;
  getModulesByCourse: (courseId: string) => Module[];
  getLessonsByModule: (moduleId: string) => Lesson[];
  getCohortsByCourse: (courseId: string) => Cohort[];
  getActiveCourses: () => Course[];
  getActiveModules: () => Module[];
}

// Mock data
const mockCourses: Course[] = [
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
    title: 'UI/UX Design',
    description: 'Diseño de interfaces y experiencia de usuario con herramientas modernas.',
    category: 'design',
    duration: '4 meses',
    level: 'beginner',
    price: 1800,
    currency: 'USD',
    isActive: true,
    thumbnail: '/api/placeholder/300/200',
    createdAt: '2024-02-01',
    updatedAt: '2025-01-10',
    createdBy: '1'
  }
];

const mockModules: Module[] = [
  {
    id: 'module-0',
    title: 'Fundamentos de Desarrollo Web',
    description: 'Introducción a HTML, CSS y JavaScript',
    courseId: '1',
    order: 1,
    lessons: [],
    isActive: true
  },
  {
    id: 'module-1',
    title: 'React y Desarrollo Frontend',
    description: 'Desarrollo de aplicaciones con React',
    courseId: '1',
    order: 2,
    lessons: [],
    isActive: true
  }
];

const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Introducción a HTML',
    description: 'Conceptos básicos de HTML',
    moduleId: 'module-0',
    order: 1,
    duration: 45,
    type: 'video',
    content: 'Contenido de la lección...',
    videoUrl: 'https://example.com/video1.mp4',
    isActive: true
  },
  {
    id: 'lesson-2',
    title: 'CSS Básico',
    description: 'Estilos y diseño con CSS',
    moduleId: 'module-0',
    order: 2,
    duration: 60,
    type: 'video',
    content: 'Contenido de la lección...',
    videoUrl: 'https://example.com/video2.mp4',
    isActive: true
  }
];

const mockCohorts: Cohort[] = [
  {
    id: 'cohort-1',
    name: 'FS-Mar25',
    courseId: '1',
    startDate: '2025-03-01',
    endDate: '2025-08-31',
    schedule: {
      days: ['Monday', 'Wednesday', 'Friday'],
      time: '19:00',
      timezone: 'America/Bogota'
    },
    maxStudents: 25,
    currentStudents: 18,
    teachers: ['3'],
    isActive: true
  }
];

export const useDataStore = create<DataState>()(
  subscribeWithSelector(
    devtools(
      (set, get) => ({
        // Estado inicial
        courses: [],
        modules: [],
        lessons: [],
        cohorts: [],
        loading: false,
        error: null,

        // Acciones
        loadCourses: async () => {
          set({ loading: true, error: null });
          
          try {
            // Simular delay de red
            await new Promise(resolve => setTimeout(resolve, 500));
            set({ courses: mockCourses, loading: false });
          } catch (error) {
            set({ 
              error: 'Error al cargar los cursos', 
              loading: false 
            });
          }
        },

        loadModules: async (courseId: string) => {
          set({ loading: true, error: null });
          
          try {
            await new Promise(resolve => setTimeout(resolve, 300));
            const courseModules = mockModules.filter(m => m.courseId === courseId);
            set({ modules: courseModules, loading: false });
          } catch (error) {
            set({ 
              error: 'Error al cargar los módulos', 
              loading: false 
            });
          }
        },

        loadLessons: async (moduleId: string) => {
          set({ loading: true, error: null });
          
          try {
            await new Promise(resolve => setTimeout(resolve, 300));
            const moduleLessons = mockLessons.filter(l => l.moduleId === moduleId);
            set({ lessons: moduleLessons, loading: false });
          } catch (error) {
            set({ 
              error: 'Error al cargar las lecciones', 
              loading: false 
            });
          }
        },

        loadCohorts: async () => {
          set({ loading: true, error: null });
          
          try {
            await new Promise(resolve => setTimeout(resolve, 500));
            set({ cohorts: mockCohorts, loading: false });
          } catch (error) {
            set({ 
              error: 'Error al cargar las cohortes', 
              loading: false 
            });
          }
        },

        addCourse: async (course) => {
          set({ loading: true, error: null });
          
          try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const newCourse: Course = {
              ...course,
              id: Date.now().toString(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            
            set(state => ({
              courses: [...state.courses, newCourse],
              loading: false
            }));
          } catch (error) {
            set({ 
              error: 'Error al crear el curso', 
              loading: false 
            });
          }
        },

        updateCourse: async (id: string, updates: Partial<Course>) => {
          set({ loading: true, error: null });
          
          try {
            await new Promise(resolve => setTimeout(resolve, 300));
            set(state => ({
              courses: state.courses.map(course =>
                course.id === id
                  ? { ...course, ...updates, updatedAt: new Date().toISOString() }
                  : course
              ),
              loading: false
            }));
          } catch (error) {
            set({ 
              error: 'Error al actualizar el curso', 
              loading: false 
            });
          }
        },

        deleteCourse: async (id: string) => {
          set({ loading: true, error: null });
          
          try {
            await new Promise(resolve => setTimeout(resolve, 300));
            set(state => ({
              courses: state.courses.filter(course => course.id !== id),
              loading: false
            }));
          } catch (error) {
            set({ 
              error: 'Error al eliminar el curso', 
              loading: false 
            });
          }
        },

        addModule: async (module) => {
          set({ loading: true, error: null });
          
          try {
            await new Promise(resolve => setTimeout(resolve, 300));
            const newModule: Module = {
              ...module,
              id: `module-${Date.now()}`
            };
            
            set(state => ({
              modules: [...state.modules, newModule],
              loading: false
            }));
          } catch (error) {
            set({ 
              error: 'Error al crear el módulo', 
              loading: false 
            });
          }
        },

        updateModule: async (id: string, updates: Partial<Module>) => {
          set({ loading: true, error: null });
          
          try {
            await new Promise(resolve => setTimeout(resolve, 300));
            set(state => ({
              modules: state.modules.map(module =>
                module.id === id ? { ...module, ...updates } : module
              ),
              loading: false
            }));
          } catch (error) {
            set({ 
              error: 'Error al actualizar el módulo', 
              loading: false 
            });
          }
        },

        deleteModule: async (id: string) => {
          set({ loading: true, error: null });
          
          try {
            await new Promise(resolve => setTimeout(resolve, 300));
            set(state => ({
              modules: state.modules.filter(module => module.id !== id),
              loading: false
            }));
          } catch (error) {
            set({ 
              error: 'Error al eliminar el módulo', 
              loading: false 
            });
          }
        },

        // Selectores computados
        getCourseById: (id: string) => {
          const { courses } = get();
          return courses.find(course => course.id === id);
        },

        getModulesByCourse: (courseId: string) => {
          const { modules } = get();
          return modules
            .filter(module => module.courseId === courseId)
            .sort((a, b) => a.order - b.order);
        },

        getLessonsByModule: (moduleId: string) => {
          const { lessons } = get();
          return lessons
            .filter(lesson => lesson.moduleId === moduleId)
            .sort((a, b) => a.order - b.order);
        },

        getCohortsByCourse: (courseId: string) => {
          const { cohorts } = get();
          return cohorts.filter(cohort => cohort.courseId === courseId);
        },

        getActiveCourses: () => {
          const { courses } = get();
          return courses.filter(course => course.isActive);
        },

        getActiveModules: () => {
          const { modules } = get();
          return modules.filter(module => module.isActive);
        }
      }),
      {
        name: 'data-store',
        enabled: process.env.NODE_ENV === 'development'
      }
    )
  )
);

// Selectores optimizados
export const useCourses = () => useDataStore(state => state.courses);
export const useModules = () => useDataStore(state => state.modules);
export const useLessons = () => useDataStore(state => state.lessons);
export const useCohorts = () => useDataStore(state => state.cohorts);
export const useDataLoading = () => useDataStore(state => state.loading);
export const useDataError = () => useDataStore(state => state.error);

export const useDataActions = () => useDataStore(state => ({
  loadCourses: state.loadCourses,
  loadModules: state.loadModules,
  loadLessons: state.loadLessons,
  loadCohorts: state.loadCohorts,
  addCourse: state.addCourse,
  updateCourse: state.updateCourse,
  deleteCourse: state.deleteCourse,
  addModule: state.addModule,
  updateModule: state.updateModule,
  deleteModule: state.deleteModule
}));

export const useDataSelectors = () => useDataStore(state => ({
  getCourseById: state.getCourseById,
  getModulesByCourse: state.getModulesByCourse,
  getLessonsByModule: state.getLessonsByModule,
  getCohortsByCourse: state.getCohortsByCourse,
  getActiveCourses: state.getActiveCourses,
  getActiveModules: state.getActiveModules
}));
