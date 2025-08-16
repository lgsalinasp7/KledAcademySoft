"use client";

import React from 'react';
import { ChevronDown, CheckCircle } from 'lucide-react';
import { ProgressBar } from '../../ui/ProgressBar';

interface LessonMenuItem {
  id: string;
  title: string;
  completed: boolean;
}

interface LessonSidebarProps {
  lessonCode: string;
  activeSection: string;
  onSectionChange: (section: string) => void;
  introductionItems: LessonMenuItem[];
  contentItems: LessonMenuItem[];
  feedbackItems: LessonMenuItem[];
}

export function LessonSidebar({ 
  lessonCode, 
  activeSection, 
  onSectionChange, 
  introductionItems, 
  contentItems, 
  feedbackItems 
}: LessonSidebarProps) {
  const renderMenuItem = (item: LessonMenuItem) => (
    <div 
      key={item.id} 
      onClick={() => onSectionChange(item.id)}
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
        item.id === activeSection ? 'bg-yellow-400 text-black' : 'hover:bg-gray-800'
      }`}
    >
      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
        item.completed ? 'bg-green-500' : 'bg-gray-600'
      }`}>
        {item.completed && <CheckCircle size={12} className="text-white" />}
      </div>
      <span className={`text-sm ${item.id === activeSection ? 'text-black font-medium' : 'text-gray-300'}`}>
        {item.title}
      </span>
    </div>
  );

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col flex-shrink-0">
      {/* Lesson Header */}
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-xl font-bold text-white mb-2">
          {lessonCode} | Intro & Herramientas
        </h2>
        <div className="mb-4">
                          <ProgressBar percentage={100} />
          <span className="text-xs text-yellow-400 font-medium">100% COMPLETA</span>
        </div>
      </div>

      {/* Menu Navigation */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* Introduction Section */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <ChevronDown size={16} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-300">INTRODUCCIÓN</span>
          </div>
          <div className="space-y-2 ml-6">
            {introductionItems.map(renderMenuItem)}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <ChevronDown size={16} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-300">CONTENIDO</span>
          </div>
          <div className="space-y-2 ml-6">
            {contentItems.map(renderMenuItem)}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <ChevronDown size={16} className="text-gray-400" />
            <span className="text-sm font-medium text-gray-300">FEEDBACK</span>
          </div>
          <div className="space-y-2 ml-6">
            {feedbackItems.map(renderMenuItem)}
          </div>
        </div>
      </div>
    </div>
  );
}
