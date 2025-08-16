"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, BookOpen, Clock, Calendar, CheckCircle, Circle } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  lectures: number;
  duration: string;
  nextCheckpoint: string;
  completed: boolean;
  expanded: boolean;
  lessons: any[];
}

interface ModuleCardProps {
  module: Module;
  onModuleClick: (moduleId: string) => void;
}

export function ModuleCard({ module, onModuleClick }: ModuleCardProps) {
  return (
    <motion.div 
      layout 
      className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden"
    >
      <button 
        onClick={() => onModuleClick(module.id)} 
        className="w-full p-6 text-left hover:bg-gray-800 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              module.completed ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'
            }`}>
              {module.completed ? <CheckCircle size={16} /> : <Circle size={16} />}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{module.title}</h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <BookOpen size={14} />
                  {module.lectures} Lectures
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {module.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  Próximo Checkpoint: {module.nextCheckpoint}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {module.completed && (
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <CheckCircle size={12} />
                Completado
              </div>
            )}
            <ChevronRight 
              size={20} 
              className="text-gray-400 transition-transform" 
            />
          </div>
        </div>
      </button>
    </motion.div>
  );
}
