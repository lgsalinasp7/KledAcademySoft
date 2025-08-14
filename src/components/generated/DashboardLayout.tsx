import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronDown, ChevronRight, Play, Calendar, Clock, CheckCircle, Circle } from 'lucide-react';
import { SidebarNavigation } from './SidebarNavigation';
import { VideoPlayer } from './VideoPlayer';
interface User {
  name: string;
  email: string;
  initials: string;
}
interface DashboardLayoutProps {
  user: User;
  onLogout: () => void;
}
interface Module {
  id: string;
  title: string;
  lectures: number;
  duration: string;
  nextCheckpoint: string;
  completed: boolean;
  expanded: boolean;
  lessons: Array<{
    id: string;
    title: string;
    type: 'lecture' | 'checkpoint';
    completed: boolean;
    duration?: string;
  }>;
}
export function DashboardLayout({
  user,
  onLogout
}: DashboardLayoutProps) {
  const [currentView, setCurrentView] = useState<'content' | 'video'>('content');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [modules, setModules] = useState<Module[]>([{
    id: 'module-0',
    title: 'Module 0: Preparation',
    lectures: 8,
    duration: '2h 30m',
    nextCheckpoint: '15/01/2025',
    completed: true,
    expanded: false,
    lessons: [{
      id: 'prep-1',
      title: 'Course Introduction',
      type: 'lecture',
      completed: true,
      duration: '15m'
    }, {
      id: 'prep-2',
      title: 'Setup Environment',
      type: 'lecture',
      completed: true,
      duration: '25m'
    }, {
      id: 'prep-3',
      title: 'First Checkpoint',
      type: 'checkpoint',
      completed: true
    }]
  }, {
    id: 'module-1',
    title: 'Module 1: Fundamentals',
    lectures: 12,
    duration: '4h 15m',
    nextCheckpoint: '22/01/2025',
    completed: false,
    expanded: true,
    lessons: [{
      id: 'fund-1',
      title: 'JavaScript Basics',
      type: 'lecture',
      completed: true,
      duration: '45m'
    }, {
      id: 'fund-2',
      title: 'DOM Manipulation',
      type: 'lecture',
      completed: true,
      duration: '35m'
    }, {
      id: 'fund-3',
      title: 'Event Handling',
      type: 'lecture',
      completed: false,
      duration: '40m'
    }, {
      id: 'fund-4',
      title: 'Checkpoint 1',
      type: 'checkpoint',
      completed: false
    }]
  }, {
    id: 'module-2',
    title: 'Module 2: Advanced Concepts',
    lectures: 15,
    duration: '5h 45m',
    nextCheckpoint: '29/01/2025',
    completed: false,
    expanded: false,
    lessons: [{
      id: 'adv-1',
      title: 'Async Programming',
      type: 'lecture',
      completed: false,
      duration: '50m'
    }, {
      id: 'adv-2',
      title: 'API Integration',
      type: 'lecture',
      completed: false,
      duration: '45m'
    }]
  }]);
  const toggleModule = (moduleId: string) => {
    setModules(modules.map(module => module.id === moduleId ? {
      ...module,
      expanded: !module.expanded
    } : module));
  };
  const completedModules = modules.filter(m => m.completed).length;
  const totalModules = modules.length;
  const progressPercentage = completedModules / totalModules * 100;
  return <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <SidebarNavigation currentView={currentView} onViewChange={setCurrentView} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
                <ChevronLeft size={20} />
                <span className="text-sm font-medium">Back to home</span>
              </button>
              <div className="w-px h-6 bg-slate-300"></div>
              <h1 className="text-xl font-semibold text-slate-900">My Cohort</h1>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button onClick={() => setShowUserDropdown(!showUserDropdown)} className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 rounded-xl px-4 py-2 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-full flex items-center justify-center text-sm font-semibold text-white">
                  {user.initials}
                </div>
                <span className="text-sm font-medium text-slate-900 hidden sm:block">{user.name}</span>
                <ChevronDown size={16} className="text-slate-600" />
              </button>

              <AnimatePresence>
                {showUserDropdown && <motion.div initial={{
                opacity: 0,
                y: -10
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -10
              }} className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-600">{user.email}</p>
                    </div>
                    <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                      Sign out
                    </button>
                  </motion.div>}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {currentView === 'content' ? <div className="max-w-4xl">
              {/* Cohort Info */}
              <div className="bg-white rounded-2xl p-6 mb-6 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Cohort WebFT64</h2>
                    <p className="text-slate-600 flex items-center gap-2 mt-1">
                      <Calendar size={16} />
                      Start: 16/06/2025 - End: 31/10/2025
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600 flex items-center gap-2">
                      <Calendar size={16} />
                      Graduation date: 08/08/2025
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Overall Progress</span>
                    <span className="text-sm text-slate-600">{completedModules}/{totalModules} modules completed</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <motion.div initial={{
                  width: 0
                }} animate={{
                  width: `${progressPercentage}%`
                }} transition={{
                  duration: 1,
                  ease: "easeOut"
                }} className="bg-gradient-to-r from-[#06b6d4] to-[#0891b2] h-3 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Modules List */}
              <div className="space-y-4">
                {modules.map(module => <motion.div key={module.id} layout className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <button onClick={() => toggleModule(module.id)} className="w-full p-6 text-left hover:bg-slate-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${module.completed ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                            {module.completed ? <CheckCircle size={16} /> : <Circle size={16} />}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">{module.title}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-slate-600">
                              <span className="flex items-center gap-1">
                                <Play size={14} />
                                {module.lectures} lectures
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {module.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar size={14} />
                                Next checkpoint: {module.nextCheckpoint}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={20} className={`text-slate-400 transition-transform ${module.expanded ? 'rotate-90' : ''}`} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {module.expanded && <motion.div initial={{
                  height: 0,
                  opacity: 0
                }} animate={{
                  height: 'auto',
                  opacity: 1
                }} exit={{
                  height: 0,
                  opacity: 0
                }} transition={{
                  duration: 0.3
                }} className="border-t border-slate-100">
                          <div className="p-6 pt-4">
                            <div className="space-y-3">
                              {module.lessons.map(lesson => <div key={lesson.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${lesson.completed ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                                    {lesson.completed ? <CheckCircle size={14} /> : <Circle size={14} />}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-900">{lesson.title}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className={`text-xs px-2 py-1 rounded-full ${lesson.type === 'checkpoint' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                                        {lesson.type === 'checkpoint' ? 'Checkpoint' : 'Lecture'}
                                      </span>
                                      {lesson.duration && <span className="text-xs text-slate-500">{lesson.duration}</span>}
                                    </div>
                                  </div>
                                </div>)}
                            </div>
                          </div>
                        </motion.div>}
                    </AnimatePresence>
                  </motion.div>)}
              </div>
            </div> : <VideoPlayer />}
        </main>
      </div>
    </div>;
}