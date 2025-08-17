"use client";

import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { UserDropdown } from '../ui/UserDropdown';
import { useAuthStore } from '@/stores/authStore';

interface AppHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  showUserProfile?: boolean;
}

export function AppHeader({ 
  title, 
  showBackButton, 
  onBack, 
  showUserProfile = true
}: AppHeaderProps) {
  const { user, signOut } = useAuthStore();
  const [showUserDropdown, setShowUserDropdown] = React.useState(false);

  if (!user) return null;

  return (
    <header className="bg-black border-b border-gray-800 px-6 py-4 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-4">
        {showBackButton && onBack && (
          <>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
              <span className="text-sm font-medium">Volver</span>
            </button>
            <div className="w-px h-6 bg-gray-700"></div>
          </>
        )}
        {title && (
          <h1 className="text-xl font-semibold text-white">{title}</h1>
        )}
      </div>

      {showUserProfile && (
        <UserDropdown 
          user={{
            ...user,
            initials: user.name.split(' ').map(n => n[0]).join('').toUpperCase(),
            isActive: true,
            createdAt: new Date().toISOString()
          }}
          onLogout={signOut}
          showDropdown={showUserDropdown}
          onToggleDropdown={() => setShowUserDropdown(!showUserDropdown)}
        />
      )}
    </header>
  );
}
