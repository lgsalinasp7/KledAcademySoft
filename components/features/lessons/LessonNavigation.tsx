"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../ui/button';

interface LessonNavigationProps {
  currentLessonTitle: string;
  totalLessons: number;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function LessonNavigation({ 
  currentLessonTitle, 
  totalLessons, 
  onPrevious, 
  onNext, 
  hasPrevious, 
  hasNext 
}: LessonNavigationProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-900 border-t border-gray-800">
      <div className="flex items-center gap-4">
        <Button
          onClick={onPrevious}
          disabled={!hasPrevious}
          variant="outline"
          className="flex items-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={16} />
          Anterior
        </Button>
      </div>

      <div className="text-center">
        <h3 className="text-white font-medium">{currentLessonTitle}</h3>
        <p className="text-sm text-gray-400">
          Lección {totalLessons} de {totalLessons}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          onClick={onNext}
          disabled={!hasNext}
          variant="outline"
          className="flex items-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
