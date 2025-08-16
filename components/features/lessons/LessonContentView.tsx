"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize, Minimize, User } from 'lucide-react';
import { Button } from '../../ui/button';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface LessonContentViewProps {
  lessonCode: string;
  lessonTitle: string;
  onBack: () => void;
  user: User;
  onLogout: () => void;
}

export function LessonContentView({ lessonCode, lessonTitle, onBack, user, onLogout }: LessonContentViewProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeSection, setActiveSection] = useState('introduction');

  const introductionItems = [
    { id: 'introduction', label: 'Introducción', active: activeSection === 'introduction' },
    { id: 'objectives', label: 'Objetivos', active: activeSection === 'objectives' },
    { id: 'prerequisites', label: 'Prerrequisitos', active: activeSection === 'prerequisites' }
  ];

  const contentItems = [
    { id: 'video', label: 'Video de la clase', active: activeSection === 'video' },
    { id: 'slides', label: 'Presentación', active: activeSection === 'slides' },
    { id: 'exercises', label: 'Ejercicios prácticos', active: activeSection === 'exercises' },
    { id: 'resources', label: 'Recursos adicionales', active: activeSection === 'resources' }
  ];

  const feedbackItems = [
    { id: 'quiz', label: 'Quiz de comprensión', active: activeSection === 'quiz' },
    { id: 'assignment', label: 'Tarea asignada', active: activeSection === 'assignment' }
  ];

  const goToPreviousLesson = () => {
    // Navigation logic would go here
    console.log('Go to previous lesson');
  };

  const goToNextLesson = () => {
    // Navigation logic would go here
    console.log('Go to next lesson');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Introducción</h2>
            <p className="text-gray-300 leading-relaxed">
              En esta lección aprenderás los fundamentos básicos de las herramientas de desarrollo 
              que necesitarás para convertirte en un desarrollador Full Stack. Comenzaremos con una 
              introducción general al ecosistema de desarrollo web moderno.
            </p>
            <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4">
              <h3 className="text-blue-400 font-semibold mb-2">¿Qué aprenderás?</h3>
              <ul className="text-gray-300 space-y-1">
                <li>• Configuración del entorno de desarrollo</li>
                <li>• Uso básico de Git y GitHub</li>
                <li>• Fundamentos de HTML, CSS y JavaScript</li>
                <li>• Herramientas de desarrollo modernas</li>
              </ul>
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Video de la Clase</h2>
            <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-black font-bold text-xl">▶</span>
                </div>
                <p className="text-gray-400">Video de la clase: {lessonTitle}</p>
                <p className="text-sm text-gray-500">Duración: 45 minutos</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
            <p className="text-gray-300">
              Contenido de la sección {activeSection} estará disponible pronto.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <ChevronLeft size={20} />
            Volver a Mi Cohorte
          </Button>
          <div className="h-6 w-px bg-gray-700"></div>
          <div>
            <h1 className="text-lg font-semibold text-white">{lessonTitle}</h1>
            <p className="text-sm text-gray-400">{lessonCode}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            onClick={() => setShowSidebar(!showSidebar)}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            {showSidebar ? <Minimize size={20} /> : <Maximize size={20} />}
          </Button>
          <div className="relative">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-white hover:bg-gray-800"
            >
              <User size={16} />
              <span className="text-sm">{user?.name}</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        {/* Sidebar */}
        {showSidebar && (
          <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4">
              {/* Introduction */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Introducción
                </h3>
                <div className="space-y-1">
                  {introductionItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        item.active 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Contenido
                </h3>
                <div className="space-y-1">
                  {contentItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        item.active 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Evaluación
                </h3>
                <div className="space-y-1">
                  {feedbackItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        item.active 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl">
              {renderContent()}
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="bg-gray-900 border-t border-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <Button
                onClick={goToPreviousLesson}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft size={16} />
                Lección Anterior
              </Button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">1 de 8 lecciones</span>
              </div>

              <Button
                onClick={goToNextLesson}
                className="flex items-center gap-2"
              >
                Siguiente Lección
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
