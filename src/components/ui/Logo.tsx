import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

export function Logo({ size = 'md', withText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-24 h-24'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-3xl'
  };

  return (
    <div className="flex items-center gap-3">
      <img 
        src="/logo-simple.svg" 
        alt="KaledAcademy Logo" 
        className={sizeClasses[size]}
      />
      {withText && (
        <div>
          <h1 className={`font-bold text-white ${textSizeClasses[size]}`}>
            KALED
          </h1>
          {size !== 'sm' && (
            <p className="text-xs font-medium text-gray-400 tracking-wider">ACADEMY</p>
          )}
        </div>
      )}
    </div>
  );
}
