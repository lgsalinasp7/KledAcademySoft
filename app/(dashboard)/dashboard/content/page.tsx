"use client";

import React, { useState } from 'react';
import { ModulesView } from '@/components/features/dashboard/ModulesView';
import { ModuleDetailView } from '@/components/features/dashboard/ModuleDetailView';
import { LessonContentView } from '@/components/features/lessons/LessonContentView';

export default function ContentPage() {
  const [currentView, setCurrentView] = useState<'modules' | 'module-detail' | 'lesson-content'>('modules');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('');

  const handleModuleClick = (moduleId: string) => {
    setSelectedModuleId(moduleId);
    setCurrentView('module-detail');
  };

  const handleBackToModules = () => {
    setCurrentView('modules');
    setSelectedModuleId('');
  };

  const handleLessonClick = (lessonId: string) => {
    console.log('Lesson clicked:', lessonId);
    // Navegar a la vista de lección
    setCurrentView('lesson-content');
  };

  return (
    <div className="h-full">
      {currentView === 'modules' && (
        <ModulesView onModuleClick={handleModuleClick} />
      )}
      {currentView === 'module-detail' && (
        <ModuleDetailView 
          moduleId={selectedModuleId}
          onLessonClick={handleLessonClick}
          onBack={handleBackToModules}
        />
      )}
      {currentView === 'lesson-content' && (
        <LessonContentView 
          lessonCode="FSM0L1"
          lessonTitle="Intro & Herramientas"
          onBack={() => setCurrentView('module-detail')}
        />
      )}
    </div>
  );
}
