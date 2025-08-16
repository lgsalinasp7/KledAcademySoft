"use client";

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`font-bold ${sizeClasses[size]} text-white`}>
      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Kaled
      </span>
      <span className="text-yellow-400">Academy</span>
    </div>
  );
}
