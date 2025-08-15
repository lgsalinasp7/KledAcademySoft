import React from 'react';
import { ProgressBar } from '../../ui/ProgressBar';

interface ProgressSectionProps {
  completedModules: number;
  totalModules: number;
  title?: string;
}

export function ProgressSection({ completedModules, totalModules, title = "PROGRESO:" }: ProgressSectionProps) {
  const progressPercentage = (completedModules / totalModules) * 100;

  return (
    <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-medium text-white">{title}</span>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
            <span className="text-xs font-bold text-black">⚙</span>
          </div>
        </div>
      </div>
      <ProgressBar 
        percentage={progressPercentage}
        label={`${completedModules}/${totalModules} módulos completados`}
        color="yellow"
        height="md"
      />
    </div>
  );
}
