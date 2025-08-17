"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Play, CheckCircle, Circle } from 'lucide-react';
import { mockModules } from '@/data/modules';
import { ModuleCard } from './ModuleCard';
import { ProgressSection } from './ProgressSection';
import { Module } from '@/types';

interface ModulesViewProps {
  onModuleClick: (moduleId: string) => void;
}

export function ModulesView({ onModuleClick }: ModulesViewProps) {
  const [modules, setModules] = useState<Module[]>(mockModules);

  const toggleModule = (moduleId: string) => {
    setModules(prev => prev.map(module => 
      module.id === moduleId 
        ? { ...module, expanded: !module.expanded }
        : module
    ));
  };

  const handleModuleClick = (moduleId: string) => {
    if (moduleId === 'module-0') {
      onModuleClick(moduleId);
    } else {
      toggleModule(moduleId);
    }
  };

  const completedModules = modules.filter(m => m.completed).length;

  return (
    <div className="p-6 overflow-y-auto">
      <div className="max-w-4xl">
        <ProgressSection 
          completedModules={completedModules}
          totalModules={modules.length}
        />

        <div className="space-y-4">
          {modules.map(module => (
            <motion.div key={module.id} layout className="space-y-2">
              <ModuleCard 
                module={module}
                onModuleClick={handleModuleClick}
              />
              
              <AnimatePresence>
                {module.expanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden ml-8"
                  >
                    <div className="p-4 space-y-2">
                      {module.lessons.map(lesson => (
                        <div key={lesson.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                            lesson.completed ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-400'
                          }`}>
                            {lesson.completed ? <CheckCircle size={12} /> : <Circle size={12} />}
                          </div>
                          <div className="flex-1">
                            <span className="text-sm text-white">{lesson.title}</span>
                            {lesson.duration && (
                              <span className="ml-2 text-xs text-gray-400">({lesson.duration})</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {lesson.type === 'lecture' && (
                              <Play size={14} className="text-blue-400" />
                            )}
                            {lesson.type === 'checkpoint' && (
                              <div className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-medium">
                                Checkpoint
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
