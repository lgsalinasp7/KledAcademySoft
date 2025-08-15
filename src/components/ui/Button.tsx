import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost' | 'yellow';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  animated?: boolean;
}

export function Button({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = '',
  animated = true
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    ghost: 'text-gray-400 hover:text-white hover:bg-gray-800',
    yellow: 'bg-yellow-400 text-black hover:bg-yellow-300 focus:ring-yellow-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  const ButtonComponent = animated ? motion.button : 'button';
  const animationProps = animated ? {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 }
  } : {};

  return (
    <ButtonComponent
      type={type}
      onClick={disabled ? undefined : onClick}
      className={buttonClasses}
      disabled={disabled}
      {...animationProps}
    >
      {children}
    </ButtonComponent>
  );
}
