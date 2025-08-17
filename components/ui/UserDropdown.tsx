"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: string;
  avatar?: string;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

interface UserDropdownProps {
  user: User;
  onLogout: () => void;
  showDropdown: boolean;
  onToggleDropdown: () => void;
}

export function UserDropdown({ user, onLogout, showDropdown, onToggleDropdown }: UserDropdownProps) {
  return (
    <div className="relative">
      <button 
        onClick={onToggleDropdown} 
        className="flex items-center gap-3 bg-gray-900 hover:bg-gray-800 rounded-xl px-4 py-2 transition-colors"
      >
        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-semibold text-black">
          {user.initials || user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </div>
        <span className="text-sm font-medium text-white hidden sm:block">{user.name}</span>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 w-48 bg-gray-900 rounded-xl shadow-lg border border-gray-700 py-2 z-50"
          >
            <div className="px-4 py-2 border-b border-gray-700">
              <p className="text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
            <button 
              onClick={onLogout} 
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
            >
              Cerrar sesión
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
