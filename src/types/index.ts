// User types
export interface User {
  name: string;
  email: string;
  initials: string;
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
