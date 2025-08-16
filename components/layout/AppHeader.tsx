"use client";

import React from 'react';
import { ChevronLeft, LogOut, User } from 'lucide-react';
import { Button } from '../ui/button';

interface AppHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  user: any;
  onLogout: () => void;
  showUserDropdown?: boolean;
  onToggleUserDropdown?: () => void;
  showUserProfile?: boolean;
}

export function AppHeader({ 
  title, 
  showBackButton = false, 
  onBack, 
  user, 
  onLogout,
  showUserDropdown = false,
  onToggleUserDropdown,
  showUserProfile = true
}: AppHeaderProps) {
  return (
    <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && onBack && (
            <Button
              onClick={onBack}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <ChevronLeft size={20} />
            </Button>
          )}
          {title && (
            <h1 className="text-xl font-semibold text-white">{title}</h1>
          )}
        </div>

        {showUserProfile && (
          <div className="relative">
            <Button
              onClick={onToggleUserDropdown}
              variant="ghost"
              className="flex items-center gap-2 text-white hover:bg-gray-800"
            >
              <User size={16} />
              <span className="text-sm">{user?.name}</span>
            </Button>

            {showUserDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-50">
                <div className="p-3 border-b border-gray-700">
                  <p className="text-sm text-white font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
                <div className="p-1">
                  <Button
                    onClick={onLogout}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
                  >
                    <LogOut size={16} className="mr-2" />
                    Cerrar Sesión
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
