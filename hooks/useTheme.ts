'use client';

import { useState, useEffect } from 'react';
import { 
  getTheme, 
  getAllThemes, 
  applyThemeClient, 
  getCurrentThemeClient 
} from '@/lib/config/themes';

// ============================================================================
// HOOK PARA REACT - MANEJO DE TEMAS
// ============================================================================

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState(getCurrentThemeClient);
  
  useEffect(() => {
    applyThemeClient(currentTheme);
  }, [currentTheme]);
  
  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    applyThemeClient(themeId);
  };
  
  return {
    currentTheme,
    changeTheme,
    theme: getTheme(currentTheme),
    allThemes: getAllThemes(),
  };
}
