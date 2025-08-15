// User types
export type UserRole = 'super_admin' | 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

// Admin specific user types
export interface AdminUser extends User {
  permissions: string[];
  managedCourses?: string[];
}

export interface TeacherUser extends User {
  specialties: string[];
  assignedCohorts: string[];
}

// Lesson types
export interface Lesson {
  id: string;
  title: string;
  type: 'lecture' | 'checkpoint';
  completed: boolean;
  duration?: string;
}

export interface ModuleLesson extends Lesson {
  code: string;
}

// Video types
export interface VideoRecording {
  id: string;
  title: string;
  date: string;
  duration: string;
  thumbnail: string;
  module: string;
  type: 'lecture' | 'workshop' | 'review';
}

// Module types
export interface Module {
  id: string;
  title: string;
  lectures: number;
  duration: string;
  nextCheckpoint: string;
  completed: boolean;
  expanded: boolean;
  lessons: Lesson[];
}

// Lesson Content types
export interface LessonMenuItem {
  id: string;
  title: string;
  completed: boolean;
}



// Navigation types
export type ViewType = 'home' | 'content' | 'module-detail' | 'lesson-content' | 'video-feed' | 'members' | 'academic-data' | 'payment-management' | 'kaled-x';

// Course Management Types
export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'programming' | 'design' | 'data' | 'marketing';
  duration: string; // "6 months"
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  currency: string;
  isActive: boolean;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string; // user id
}

export interface Cohort {
  id: string;
  name: string; // "FS Jan 2025"
  courseId: string;
  startDate: string;
  endDate: string;
  schedule: {
    days: string[]; // ["monday", "wednesday", "friday"]
    time: string; // "19:00-22:00"
    timezone: string;
  };
  maxStudents: number;
  currentStudents: number;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  teachers: string[]; // user ids
  students: string[]; // user ids
  createdAt: string;
}

export interface LessonContent {
  id: string;
  type: 'text' | 'video' | 'quiz' | 'assignment' | 'resource';
  title: string;
  content: string; // HTML or markdown
  videoUrl?: string;
  resources?: {
    id: string;
    name: string;
    url: string;
    type: 'pdf' | 'link' | 'download';
  }[];
  quiz?: {
    questions: QuizQuestion[];
    passingScore: number;
  };
  order: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'open_ended';
  options?: string[];
  correctAnswer: string | number;
  explanation?: string;
}

// Enhanced Module and Lesson types
export interface AdminModule extends Module {
  courseId: string;
  prerequisites?: string[]; // module ids
  objectives: string[];
  estimatedHours: number;
  createdBy: string;
  updatedBy: string;
  publishedAt?: string;
  isDraft: boolean;
}

export interface AdminLesson extends Lesson {
  moduleId: string;
  content: LessonContent[];
  prerequisites?: string[]; // lesson ids
  objectives: string[];
  estimatedMinutes: number;
  createdBy: string;
  updatedBy: string;
  publishedAt?: string;
  isDraft: boolean;
}

// Props types
export interface BaseLayoutProps {
  user: User;
  onLogout: () => void;
}

export interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export interface UserDropdownProps {
  user: User;
  onLogout: () => void;
  showDropdown: boolean;
  onToggleDropdown: () => void;
}
