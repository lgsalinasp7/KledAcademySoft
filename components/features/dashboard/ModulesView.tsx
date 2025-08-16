"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, CheckCircle } from 'lucide-react';
import { ProgressBar } from '../../ui/ProgressBar';

interface ModulesViewProps {
  onModuleClick: (moduleId: string) => void;
}

export function ModulesView({ onModuleClick }: ModulesViewProps) {
  const modules = [
    {
      id: '0',
      title: 'Módulo 0: Preparación',
      description: 'Configuración del entorno y herramientas básicas',
      duration: '2 semanas',
      lessons: 8,
      completedLessons: 2,
      status: 'in-progress'
    },
    {
      id: '1',
      title: 'Módulo 1: Fundamentos de JavaScript',
      description: 'Variables, funciones, objetos y arrays',
      duration: '3 semanas',
      lessons: 12,
      completedLessons: 0,
      status: 'locked'
    },
    {
      id: '2',
      title: 'Módulo 2: React Hooks',
      description: 'useState, useEffect, useContext y custom hooks',
      duration: '4 semanas',
      lessons: 15,
      completedLessons: 0,
      status: 'locked'
    },
    {
      id: '3',
      title: 'Módulo 3: Backend con Node.js',
      description: 'Express, MongoDB, APIs RESTful',
      duration: '4 semanas',
      lessons: 18,
      completedLessons: 0,
      status: 'locked'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-yellow-400';
      case 'locked':
        return 'bg-gray-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'in-progress':
        return 'En progreso';
      case 'locked':
        return 'Bloqueado';
      default:
        return 'Bloqueado';
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <div className="max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Módulos del Curso</h1>
            <p className="text-gray-400">Selecciona un módulo para comenzar a aprender</p>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module) => {
              const progressPercentage = (module.completedLessons / module.lessons) * 100;
              const isClickable = module.status !== 'locked';

              return (
                <motion.div
                  key={module.id}
                  onClick={() => isClickable && onModuleClick(module.id)}
                  className={`bg-gray-900 rounded-2xl p-6 border border-gray-800 transition-all duration-200 ${
                    isClickable 
                      ? 'cursor-pointer hover:bg-gray-800 hover:border-gray-700' 
                      : 'opacity-75'
                  }`}
                  whileHover={isClickable ? { scale: 1.02 } : {}}
                  whileTap={isClickable ? { scale: 0.98 } : {}}
                >
                  {/* Module Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatusColor(module.status)}`}>
                        <BookOpen size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                        <p className="text-sm text-gray-400">{module.description}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      module.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      module.status === 'in-progress' ? 'bg-yellow-400/20 text-yellow-400' :
                      'bg-gray-600/20 text-gray-400'
                    }`}>
                      {getStatusText(module.status)}
                    </div>
                  </div>

                  {/* Module Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock size={14} />
                        <span>{module.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <CheckCircle size={14} />
                        <span>{module.completedLessons}/{module.lessons} lecciones</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <ProgressBar 
                      percentage={progressPercentage}
                      color="yellow"
                      height="sm"
                      showLabel={false}
                    />

                    {/* Progress Text */}
                    <p className="text-xs text-gray-400">
                      {module.completedLessons > 0 
                        ? `${progressPercentage.toFixed(1)}% completado`
                        : 'Aún no has comenzado este módulo'
                      }
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
