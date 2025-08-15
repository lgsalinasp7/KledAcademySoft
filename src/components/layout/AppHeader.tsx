import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { UserDropdown } from '../ui/UserDropdown';
import { User } from '../../types';

interface AppHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  user: User;
  onLogout: () => void;
  showUserDropdown: boolean;
  onToggleUserDropdown: () => void;
  showUserProfile?: boolean;
}

export function AppHeader({ 
  title, 
  showBackButton, 
  onBack, 
  user, 
  onLogout, 
  showUserDropdown, 
  onToggleUserDropdown,
  showUserProfile = true
}: AppHeaderProps) {
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
              <span className="text-sm font-medium">Volver a Mi Cohorte</span>
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
          user={user}
          onLogout={onLogout}
          showDropdown={showUserDropdown}
          onToggleDropdown={onToggleUserDropdown}
        />
      )}
    </header>
  );
}
