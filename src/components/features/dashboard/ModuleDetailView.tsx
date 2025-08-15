import React from 'react';
import { ChevronLeft, Clock, CheckCircle, Circle } from 'lucide-react';
import { module0Lessons } from '../../../data/lessons';
import { ProgressBar } from '../../ui/ProgressBar';
import { Button } from '../../ui/Button';
import { useProgress } from '../../../hooks/useProgress';
import { useAuth } from '../../../hooks/useAuth';

interface ModuleDetailViewProps {
  moduleId: string;
  onLessonClick: (lessonId: string) => void;
  onBack: () => void;
}

export function ModuleDetailView({ moduleId, onLessonClick, onBack }: ModuleDetailViewProps) {
  const { user } = useAuth();
  const { progress, updateLessonProgress, isLessonCompleted } = useProgress(
    user?.id || '5', // Default to Laura's ID for demo
    '1' // Course ID for Full Stack
  );

  const lessons = module0Lessons;
  
  // Calculate progress based on real data
  const completedLessons = lessons.filter(lesson => 
    isLessonCompleted(moduleId, lesson.id)
  ).length;
  
  const progressPercentage = (completedLessons / lessons.length) * 100;

  const handleLessonClick = (lessonId: string) => {
    if (lessonId === 'FSM0L1') {
      // Mark lesson as completed when clicked
      updateLessonProgress(moduleId, lessonId, true);
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
            const isCompleted = isLessonCompleted(moduleId, lesson.id);
            
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
                      isCompleted ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'
                    }`}>
                      {isCompleted ? <CheckCircle size={16} /> : <Circle size={16} />}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{lesson.title}</h3>
                      <p className="text-sm text-gray-400">
                        {lesson.code} • {lesson.duration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {isCompleted && (
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
