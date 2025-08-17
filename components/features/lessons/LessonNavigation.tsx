"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LessonNavigationProps {
  currentLessonIndex: number;
  currentLessonNumber: number;
  currentLessonTitle: string;
  totalLessons: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function LessonNavigation({
  currentLessonIndex,
  currentLessonNumber,
  currentLessonTitle,
  totalLessons,
  onPrevious,
  onNext
}: LessonNavigationProps) {
  const isFirstLesson = currentLessonIndex === 0;
  const isLastLesson = currentLessonIndex === totalLessons - 1;

  return (
    <div className="mt-12 pt-8 border-t border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            onClick={onPrevious}
            disabled={isFirstLesson}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            Anterior
          </Button>
          
          <div className="text-sm text-gray-600">
            <span className="font-medium">{currentLessonNumber}</span> de {totalLessons}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">{currentLessonTitle}</h3>
        </div>

        <Button
          onClick={onNext}
          disabled={isLastLesson}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black"
        >
          Siguiente
          <ChevronRight size={16} />
        </Button>
      </div>
    </div>
  );
}
