import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../ui/Button';

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
  return (
    <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-300">
      <Button
        onClick={onPrevious}
        disabled={currentLessonIndex === 0}
        variant="ghost"
        className="flex items-center gap-2"
      >
        <ChevronLeft size={20} />
        Lección anterior
      </Button>
      
      <div className="text-center">
        <div className="bg-gray-800 text-white px-4 py-2 rounded-lg">
          Lección {currentLessonNumber} - {currentLessonTitle}
        </div>
      </div>

      <Button
        onClick={onNext}
        disabled={currentLessonIndex === totalLessons - 1}
        variant="ghost"
        className="flex items-center gap-2"
      >
        Siguiente lección
        <ChevronRight size={20} />
      </Button>
    </div>
  );
}
