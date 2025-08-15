import React, { useState, useEffect } from 'react';
import { Search, Menu, Maximize, Minimize } from 'lucide-react';
import { introductionItems, contentItems, feedbackItems } from '../../../data/lessons';
import { AppHeader } from '../../layout/AppHeader';
import { LessonSidebar } from './LessonSidebar';
import { LessonContent } from './LessonContent';
import { LessonNavigation } from './LessonNavigation';
import { User } from '../../../types';
import { useProgress } from '../../../hooks/useProgress';

interface LessonContentViewProps {
  lessonCode: string;
  lessonTitle: string;
  onBack: () => void;
  user: User;
  onLogout: () => void;
}

export function LessonContentView({ lessonCode, lessonTitle, onBack, user, onLogout }: LessonContentViewProps) {
  const [activeSection, setActiveSection] = useState('about-module');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  const { updateLessonProgress } = useProgress(
    user?.id || '5', // Default to Laura's ID for demo
    '1' // Course ID for Full Stack
  );

  const getCurrentLessonIndex = () => {
    switch (activeSection) {
      case 'about-module': return 0;
      case 'tools': return 1;
      case 'slack': return 2;
      default: return 0;
    }
  };
  
  const currentLessonIndex = getCurrentLessonIndex();
  const currentLessonNumber = currentLessonIndex + 1;

  // Mark lesson as completed when user views it
  useEffect(() => {
    const lessonId = `FSM0L${currentLessonNumber}`;
    updateLessonProgress('1', lessonId, true); // Module ID '1' for Module 0
  }, [activeSection, currentLessonNumber, updateLessonProgress]);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    if (!isFullScreen) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const lessonOrder = ['about-module', 'tools', 'slack'];
  const lessonTitles = ['Sobre el Módulo 0', 'Instalación de herramientas', 'Slack'];
  
  const goToPreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setActiveSection(lessonOrder[currentLessonIndex - 1]);
    }
  };

  const goToNextLesson = () => {
    if (currentLessonIndex < lessonOrder.length - 1) {
      setActiveSection(lessonOrder[currentLessonIndex + 1]);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <AppHeader
        title={`${lessonCode} | ${lessonTitle}`}
        showBackButton={true}
        onBack={onBack}
        user={user}
        onLogout={onLogout}
        showUserDropdown={showUserDropdown}
        onToggleUserDropdown={() => setShowUserDropdown(!showUserDropdown)}
      />

      <div className="flex flex-1 min-h-0">
        {showSidebar && (
          <LessonSidebar
            lessonCode={lessonCode}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            introductionItems={introductionItems}
            contentItems={contentItems}
            feedbackItems={feedbackItems}
          />
        )}

        <div className="flex-1 flex flex-col min-w-0">
          {/* Content Header */}
          <div className="bg-black border-b border-gray-800 p-6 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Search size={20} className="text-gray-400" />
                <button 
                  onClick={toggleSidebar}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Menu size={20} />
                </button>
              </div>
              <button 
                onClick={toggleFullScreen}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-colors flex items-center gap-2"
              >
                {isFullScreen ? <Minimize size={16} /> : <Maximize size={16} />}
                {isFullScreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
              </button>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="flex-1 bg-yellow-50 overflow-y-auto min-h-0">
            <div className="p-8">
              <div className="max-w-4xl mx-auto">
                <LessonContent 
                  activeSection={activeSection}
                  currentLessonNumber={currentLessonNumber}
                />
                
                <LessonNavigation
                  currentLessonIndex={currentLessonIndex}
                  currentLessonNumber={currentLessonNumber}
                  currentLessonTitle={lessonTitles[currentLessonIndex]}
                  totalLessons={lessonOrder.length}
                  onPrevious={goToPreviousLesson}
                  onNext={goToNextLesson}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
