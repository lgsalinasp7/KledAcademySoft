import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  percentage: number;
  color?: 'yellow' | 'green' | 'blue';
  height?: 'sm' | 'md' | 'lg';
  label?: string;
  animated?: boolean;
}

export function ProgressBar({ 
  percentage, 
  color = 'yellow', 
  height = 'md', 
  label,
  animated = true 
}: ProgressBarProps) {
  const colorClasses = {
    yellow: 'bg-yellow-400',
    green: 'bg-green-400',
    blue: 'bg-blue-400'
  };

  const heightClasses = {
    sm: 'h-1',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-300">{label}</span>
          <span className="text-sm text-gray-400">{percentage.toFixed(1)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-700 rounded-full ${heightClasses[height]}`}>
        <motion.div
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={animated ? { duration: 1, ease: "easeOut" } : { duration: 0 }}
          className={`${colorClasses[color]} ${heightClasses[height]} rounded-full`}
        />
      </div>
    </div>
  );
}
