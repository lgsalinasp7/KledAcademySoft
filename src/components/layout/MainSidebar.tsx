import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building, Square } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { NavigationProps } from '../../types';

export function MainSidebar({ currentView, onViewChange }: NavigationProps) {
  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      view: 'home',
      active: currentView === 'home'
    },
    {
      id: 'payment-management',
      label: 'Gestión de pagos',
      icon: Building,
      view: 'payment-management',
      active: currentView === 'payment-management'
    },
    {
      id: 'kaled-x',
      label: 'KaledAcademy X',
      icon: Square,
      view: 'kaled-x',
      active: currentView === 'kaled-x'
    }
  ];

  return (
    <div className="w-64 bg-black text-white flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Logo size="md" />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-6">
        <div className="space-y-2 px-4">
          {navigationItems.map(item => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => onViewChange(item.view)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                  item.active 
                    ? 'bg-gray-800 text-white border-l-4 border-yellow-400' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Icon 
                  size={20} 
                  className={`${
                    item.active 
                      ? 'text-yellow-400' 
                      : 'text-gray-400 group-hover:text-white'
                  }`} 
                />
                <span className="font-medium text-sm">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
