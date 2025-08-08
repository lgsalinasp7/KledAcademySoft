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
  return <div className="min-h-screen bg-slate-50 flex" data-magicpath-id="0" data-magicpath-path="DashboardLayout.tsx">
      {/* Sidebar */}
      <SidebarNavigation currentView={currentView} onViewChange={setCurrentView} data-magicpath-id="1" data-magicpath-path="DashboardLayout.tsx" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col" data-magicpath-id="2" data-magicpath-path="DashboardLayout.tsx">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4" data-magicpath-id="3" data-magicpath-path="DashboardLayout.tsx">
          <div className="flex items-center justify-between" data-magicpath-id="4" data-magicpath-path="DashboardLayout.tsx">
            <div className="flex items-center gap-4" data-magicpath-id="5" data-magicpath-path="DashboardLayout.tsx">
              <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors" data-magicpath-id="6" data-magicpath-path="DashboardLayout.tsx">
                <ChevronLeft size={20} data-magicpath-id="7" data-magicpath-path="DashboardLayout.tsx" />
                <span className="text-sm font-medium" data-magicpath-id="8" data-magicpath-path="DashboardLayout.tsx">Back to home</span>
              </button>
              <div className="w-px h-6 bg-slate-300" data-magicpath-id="9" data-magicpath-path="DashboardLayout.tsx"></div>
              <h1 className="text-xl font-semibold text-slate-900" data-magicpath-id="10" data-magicpath-path="DashboardLayout.tsx">My Cohort</h1>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative" data-magicpath-id="11" data-magicpath-path="DashboardLayout.tsx">
              <button onClick={() => setShowUserDropdown(!showUserDropdown)} className="flex items-center gap-3 bg-slate-100 hover:bg-slate-200 rounded-xl px-4 py-2 transition-colors" data-magicpath-id="12" data-magicpath-path="DashboardLayout.tsx">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-semibold text-slate-900" data-magicpath-id="13" data-magicpath-path="DashboardLayout.tsx">
                  {user.initials}
                </div>
                <span className="text-sm font-medium text-slate-900 hidden sm:block" data-magicpath-id="14" data-magicpath-path="DashboardLayout.tsx">{user.name}</span>
                <ChevronDown size={16} className="text-slate-600" data-magicpath-id="15" data-magicpath-path="DashboardLayout.tsx" />
              </button>

              <AnimatePresence data-magicpath-id="16" data-magicpath-path="DashboardLayout.tsx">
                {showUserDropdown && <motion.div initial={{
                opacity: 0,
                y: -10
              }} animate={{
                opacity: 1,
                y: 0
              }} exit={{
                opacity: 0,
                y: -10
              }} className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50" data-magicpath-id="17" data-magicpath-path="DashboardLayout.tsx">
                    <div className="px-4 py-2 border-b border-slate-100" data-magicpath-id="18" data-magicpath-path="DashboardLayout.tsx">
                      <p className="text-sm font-medium text-slate-900" data-magicpath-id="19" data-magicpath-path="DashboardLayout.tsx">{user.name}</p>
                      <p className="text-xs text-slate-600" data-magicpath-id="20" data-magicpath-path="DashboardLayout.tsx">{user.email}</p>
                    </div>
                    <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors" data-magicpath-id="21" data-magicpath-path="DashboardLayout.tsx">
                      Sign out
                    </button>
                  </motion.div>}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6" data-magicpath-id="22" data-magicpath-path="DashboardLayout.tsx">
          {currentView === 'content' ? <div className="max-w-4xl" data-magicpath-id="23" data-magicpath-path="DashboardLayout.tsx">
              {/* Cohort Info */}
              <div className="bg-white rounded-2xl p-6 mb-6 border border-slate-200" data-magicpath-id="24" data-magicpath-path="DashboardLayout.tsx">
                <div className="flex items-center justify-between mb-4" data-magicpath-id="25" data-magicpath-path="DashboardLayout.tsx">
                  <div data-magicpath-id="26" data-magicpath-path="DashboardLayout.tsx">
                    <h2 className="text-2xl font-bold text-slate-900" data-magicpath-id="27" data-magicpath-path="DashboardLayout.tsx">Cohort WebFT64</h2>
                    <p className="text-slate-600 flex items-center gap-2 mt-1" data-magicpath-id="28" data-magicpath-path="DashboardLayout.tsx">
                      <Calendar size={16} data-magicpath-id="29" data-magicpath-path="DashboardLayout.tsx" />
                      Start: 16/06/2025 - End: 31/10/2025
                    </p>
                  </div>
                  <div className="text-right" data-magicpath-id="30" data-magicpath-path="DashboardLayout.tsx">
                    <p className="text-sm text-slate-600 flex items-center gap-2" data-magicpath-id="31" data-magicpath-path="DashboardLayout.tsx">
                      <Calendar size={16} data-magicpath-id="32" data-magicpath-path="DashboardLayout.tsx" />
                      Graduation date: 08/08/2025
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4" data-magicpath-id="33" data-magicpath-path="DashboardLayout.tsx">
                  <div className="flex items-center justify-between mb-2" data-magicpath-id="34" data-magicpath-path="DashboardLayout.tsx">
                    <span className="text-sm font-medium text-slate-700" data-magicpath-id="35" data-magicpath-path="DashboardLayout.tsx">Overall Progress</span>
                    <span className="text-sm text-slate-600" data-magicpath-id="36" data-magicpath-path="DashboardLayout.tsx">{completedModules}/{totalModules} modules completed</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3" data-magicpath-id="37" data-magicpath-path="DashboardLayout.tsx">
                    <motion.div initial={{
                  width: 0
                }} animate={{
                  width: `${progressPercentage}%`
                }} transition={{
                  duration: 1,
                  ease: "easeOut"
                }} className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" data-magicpath-id="38" data-magicpath-path="DashboardLayout.tsx" />
                  </div>
                </div>
              </div>

              {/* Modules List */}
              <div className="space-y-4" data-magicpath-id="39" data-magicpath-path="DashboardLayout.tsx">
                {modules.map(module => <motion.div key={module.id} layout className="bg-white rounded-2xl border border-slate-200 overflow-hidden" data-magicpath-id="40" data-magicpath-path="DashboardLayout.tsx">
                    <button onClick={() => toggleModule(module.id)} className="w-full p-6 text-left hover:bg-slate-50 transition-colors" data-magicpath-id="41" data-magicpath-path="DashboardLayout.tsx">
                      <div className="flex items-center justify-between" data-magicpath-id="42" data-magicpath-path="DashboardLayout.tsx">
                        <div className="flex items-center gap-4" data-magicpath-id="43" data-magicpath-path="DashboardLayout.tsx">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${module.completed ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`} data-magicpath-id="44" data-magicpath-path="DashboardLayout.tsx">
                            {module.completed ? <CheckCircle size={16} data-magicpath-id="45" data-magicpath-path="DashboardLayout.tsx" /> : <Circle size={16} />}
                          </div>
                          <div data-magicpath-id="46" data-magicpath-path="DashboardLayout.tsx">
                            <h3 className="text-lg font-semibold text-slate-900" data-magicpath-id="47" data-magicpath-path="DashboardLayout.tsx">{module.title}</h3>
                            <div className="flex items-center gap-4 mt-1 text-sm text-slate-600" data-magicpath-id="48" data-magicpath-path="DashboardLayout.tsx">
                              <span className="flex items-center gap-1" data-magicpath-id="49" data-magicpath-path="DashboardLayout.tsx">
                                <Play size={14} data-magicpath-id="50" data-magicpath-path="DashboardLayout.tsx" />
                                {module.lectures} lectures
                              </span>
                              <span className="flex items-center gap-1" data-magicpath-id="51" data-magicpath-path="DashboardLayout.tsx">
                                <Clock size={14} data-magicpath-id="52" data-magicpath-path="DashboardLayout.tsx" />
                                {module.duration}
                              </span>
                              <span className="flex items-center gap-1" data-magicpath-id="53" data-magicpath-path="DashboardLayout.tsx">
                                <Calendar size={14} data-magicpath-id="54" data-magicpath-path="DashboardLayout.tsx" />
                                Next checkpoint: {module.nextCheckpoint}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight size={20} className={`text-slate-400 transition-transform ${module.expanded ? 'rotate-90' : ''}`} data-magicpath-id="55" data-magicpath-path="DashboardLayout.tsx" />
                      </div>
                    </button>

                    <AnimatePresence data-magicpath-id="56" data-magicpath-path="DashboardLayout.tsx">
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
                }} className="border-t border-slate-100" data-magicpath-id="57" data-magicpath-path="DashboardLayout.tsx">
                          <div className="p-6 pt-4" data-magicpath-id="58" data-magicpath-path="DashboardLayout.tsx">
                            <div className="space-y-3" data-magicpath-id="59" data-magicpath-path="DashboardLayout.tsx">
                              {module.lessons.map(lesson => <div key={lesson.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors" data-magicpath-id="60" data-magicpath-path="DashboardLayout.tsx">
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${lesson.completed ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`} data-magicpath-id="61" data-magicpath-path="DashboardLayout.tsx">
                                    {lesson.completed ? <CheckCircle size={14} data-magicpath-id="62" data-magicpath-path="DashboardLayout.tsx" /> : <Circle size={14} />}
                                  </div>
                                  <div className="flex-1" data-magicpath-id="63" data-magicpath-path="DashboardLayout.tsx">
                                    <p className="text-sm font-medium text-slate-900" data-magicpath-id="64" data-magicpath-path="DashboardLayout.tsx">{lesson.title}</p>
                                    <div className="flex items-center gap-2 mt-1" data-magicpath-id="65" data-magicpath-path="DashboardLayout.tsx">
                                      <span className={`text-xs px-2 py-1 rounded-full ${lesson.type === 'checkpoint' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}`} data-magicpath-id="66" data-magicpath-path="DashboardLayout.tsx">
                                        {lesson.type === 'checkpoint' ? 'Checkpoint' : 'Lecture'}
                                      </span>
                                      {lesson.duration && <span className="text-xs text-slate-500" data-magicpath-id="67" data-magicpath-path="DashboardLayout.tsx">{lesson.duration}</span>}
                                    </div>
                                  </div>
                                </div>)}
                            </div>
                          </div>
                        </motion.div>}
                    </AnimatePresence>
                  </motion.div>)}
              </div>
            </div> : <VideoPlayer data-magicpath-id="68" data-magicpath-path="DashboardLayout.tsx" />}
        </main>
      </div>
    </div>;
}