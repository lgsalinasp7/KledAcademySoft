"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Calendar, Activity, Video } from 'lucide-react';
import { ProgressBar } from '../ui/ProgressBar';

interface NavigationProps {
  currentView: string;
}

export function CohortSidebar({ currentView }: NavigationProps) {
  const navigationItems = [
    {
      id: 'content',
      label: 'Contenido',
      icon: BookOpen,
      view: 'content',
      active: currentView === 'content' || currentView === 'module-detail'
    },
    {
      id: 'video-feed',
      label: 'Video Feed',
      icon: Video,
      view: 'video-feed',
      active: currentView === 'video-feed'
    },
    {
      id: 'members',
      label: 'Miembros',
      icon: Users,
      view: 'members',
      active: currentView === 'members'
    },
    {
      id: 'academic-data',
      label: 'Datos Académicos',
      icon: Activity,
      view: 'academic-data',
      active: currentView === 'academic-data'
    }
  ];

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col h-screen">
      {/* Cohort Header */}
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white mb-2">
          Cohorte Full Stack Web
        </h2>
        <p className="text-sm text-gray-400 mb-1">
          Enero 2025 - Agosto 2025
        </p>
        <p className="text-sm text-gray-400 mb-4">
          Lunes - Viernes 19:00 - 22:00
        </p>
        
        <ProgressBar 
          percentage={75} 
          label="Progreso del cohorte"
          color="yellow"
          height="sm"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <div className="space-y-2 px-4">
          {navigationItems.map(item => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                  item.active 
                    ? 'bg-gray-800 text-white border-l-4 border-yellow-400' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Icon 
                  size={18} 
                  className={`${
                    item.active 
                      ? 'text-yellow-400' 
                      : 'text-gray-400 group-hover:text-white'
                  }`} 
                />
                <span className="font-medium text-sm">{item.label}</span>
              </motion.div>
            );
          })}
        </div>
      </nav>

      {/* Next Session */}
      <div className="p-6 border-t border-gray-800">
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Calendar size={16} className="text-yellow-400" />
            <span className="text-sm font-medium text-white">Próxima sesión</span>
          </div>
          <p className="text-sm text-gray-300">Viernes, 16 de Agosto</p>
          <p className="text-sm text-gray-300">19:00 - 22:00</p>
          <p className="text-xs text-gray-400 mt-1">Módulo 2: React Hooks</p>
        </div>
      </div>
    </div>
  );
}
