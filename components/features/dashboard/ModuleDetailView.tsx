"use client";

import React from 'react';
import { ChevronLeft, Clock, CheckCircle, Circle } from 'lucide-react';
import { ProgressBar } from '../../ui/ProgressBar';
import { Button } from '../../ui/button';

interface ModuleDetailViewProps {
  moduleId: string;
  onLessonClick: (lessonId: string) => void;
  onBack: () => void;
}

export function ModuleDetailView({ moduleId, onLessonClick, onBack }: ModuleDetailViewProps) {
  // Mock data for module 0
  const lessons = [
    {
      id: 'FSM0L1',
      title: 'Intro & Herramientas',
      code: 'FSM0L1',
      duration: '45 min',
      isCompleted: true
    },
    {
      id: 'FSM0L2',
      title: 'Configuración del Entorno',
      code: 'FSM0L2',
      duration: '60 min',
      isCompleted: true
    },
    {
      id: 'FSM0L3',
      title: 'Git y GitHub',
      code: 'FSM0L3',
      duration: '90 min',
      isCompleted: false
    },
    {
      id: 'FSM0L4',
      title: 'HTML y CSS Básico',
      code: 'FSM0L4',
      duration: '120 min',
      isCompleted: false
    },
    {
      id: 'FSM0L5',
      title: 'JavaScript Intro',
      code: 'FSM0L5',
      duration: '150 min',
      isCompleted: false
    },
    {
      id: 'FSM0L6',
      title: 'DOM Manipulation',
      code: 'FSM0L6',
      duration: '180 min',
      isCompleted: false
    },
    {
      id: 'FSM0L7',
      title: 'Eventos y Formularios',
      code: 'FSM0L7',
      duration: '120 min',
      isCompleted: false
    },
    {
      id: 'FSM0L8',
      title: 'Proyecto Final Módulo 0',
      code: 'FSM0L8',
      duration: '240 min',
      isCompleted: false
    }
  ];
  
  const completedLessons = lessons.filter(lesson => lesson.isCompleted).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  const handleLessonClick = (lessonId: string) => {
    if (lessonId === 'FSM0L1') {
      onLessonClick('FSM0L1');
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        <div className="max-w-4xl">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            onClick={onBack}
            variant="ghost"
            className="flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Volver a módulos
          </Button>
        </div>

        {/* Module Header */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Módulo 0: Preparación</h1>
              <p className="text-gray-400">Código: M0</p>
            </div>
            <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium">
              {completedLessons}/{lessons.length} lecciones
            </div>
          </div>
          
          <ProgressBar 
            percentage={progressPercentage}
            label="Progreso del módulo"
            color="yellow"
            height="md"
          />
        </div>

        {/* Lessons List */}
        <div className="space-y-3">
          {lessons.map((lesson, index) => {
            return (
              <div
                key={lesson.id}
                onClick={() => lesson.id === 'FSM0L1' && handleLessonClick(lesson.id)}
                className={`bg-gray-900 rounded-xl p-4 border border-gray-800 ${
                  lesson.id === 'FSM0L1' 
                    ? 'cursor-pointer hover:bg-gray-800 transition-colors' 
                    : 'opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      lesson.isCompleted ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'
                    }`}>
                      {lesson.isCompleted ? <CheckCircle size={16} /> : <Circle size={16} />}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{lesson.title}</h3>
                      <p className="text-sm text-gray-400">
                        {lesson.code} • {lesson.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {lesson.isCompleted && (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Completado
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-gray-400">
                      <Clock size={14} />
                      <span className="text-sm">{lesson.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
}
