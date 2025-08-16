"use client";

import React from 'react';
import { ProgressBar } from '../../ui/ProgressBar';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';

interface ProgressSectionProps {
  completedModules: number;
  totalModules: number;
  title?: string;
}

export function ProgressSection({ completedModules, totalModules, title = "PROGRESO:" }: ProgressSectionProps) {
  const progressPercentage = (completedModules / totalModules) * 100;

  return (
    <Card className="bg-gray-900 border-gray-800 mb-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium text-white">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <span className="text-xs font-bold text-black">⚙</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
                <ProgressBar
          percentage={progressPercentage}
        />
        <p className="text-sm text-gray-400">
          {completedModules}/{totalModules} módulos completados
        </p>
      </CardContent>
    </Card>
  );
}
