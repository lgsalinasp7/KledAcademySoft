"use client";

import React from 'react';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red';
  height?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export function ProgressBar({ 
  percentage, 
  label, 
  color = 'blue', 
  height = 'md',
  showLabel = true 
}: ProgressBarProps) {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-400',
    red: 'bg-red-500'
  };

  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className="w-full">
      {label && showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">{label}</span>
          <span className="text-sm text-gray-400">{percentage.toFixed(1)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-700 rounded-full ${heightClasses[height]}`}>
        <div 
          className={`${colorClasses[color]} rounded-full transition-all duration-300 ${heightClasses[height]}`}
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
    </div>
  );
}
