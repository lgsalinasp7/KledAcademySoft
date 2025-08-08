import React from 'react';
import { motion } from 'framer-motion';
import { Home, FileText, Play, ChevronRight } from 'lucide-react';
interface SidebarNavigationProps {
  currentView: 'content' | 'video';
  onViewChange: (view: 'content' | 'video') => void;
}
export function SidebarNavigation({
  currentView,
  onViewChange
}: SidebarNavigationProps) {
  const navigationItems = [{
    id: 'home',
    label: 'Home',
    icon: Home,
    view: 'content' as const,
    active: currentView === 'content'
  }, {
    id: 'content',
    label: 'Contenido',
    icon: FileText,
    view: 'content' as const,
    active: currentView === 'content',
    hasSubmenu: true
  }, {
    id: 'video-feed',
    label: 'Video Feed',
    icon: Play,
    view: 'video' as const,
    active: currentView === 'video',
    hasSubmenu: true,
    highlighted: currentView === 'video'
  }, {
    id: 'members',
    label: 'Miembros',
    icon: FileText,
    view: 'content' as const,
    active: false,
    hasSubmenu: true
  }, {
    id: 'academic-data',
    label: 'Datos Académicos',
    icon: FileText,
    view: 'content' as const,
    active: false,
    hasSubmenu: true
  }];
  const bottomItems = [{
    id: 'page-management',
    label: 'Gestión de páginas',
    icon: FileText,
    view: 'content' as const
  }, {
    id: 'kaled-x',
    label: 'KaledAcademy X',
    icon: FileText,
    view: 'content' as const
  }];
  return <div className="w-64 bg-slate-900 text-white flex flex-col h-screen" data-magicpath-id="0" data-magicpath-path="SidebarNavigation.tsx">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700" data-magicpath-id="1" data-magicpath-path="SidebarNavigation.tsx">
        <h1 className="text-xl font-bold text-white" data-magicpath-id="2" data-magicpath-path="SidebarNavigation.tsx">KALEDACADEMY</h1>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-6" data-magicpath-id="3" data-magicpath-path="SidebarNavigation.tsx">
        <div className="space-y-2 px-4" data-magicpath-id="4" data-magicpath-path="SidebarNavigation.tsx">
          {navigationItems.map(item => {
          const Icon = item.icon;
          return <motion.button key={item.id} onClick={() => onViewChange(item.view)} whileHover={{
            x: 4
          }} whileTap={{
            scale: 0.98
          }} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 group ${item.active || item.highlighted ? 'bg-slate-800 text-white' : 'text-slate-300 hover:text-white hover:bg-slate-800'} ${item.highlighted ? 'border-l-4 border-yellow-400' : ''}`} data-magicpath-id="5" data-magicpath-path="SidebarNavigation.tsx">
                <div className="flex items-center gap-3" data-magicpath-id="6" data-magicpath-path="SidebarNavigation.tsx">
                  <Icon size={20} className={`${item.active || item.highlighted ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} data-magicpath-id="7" data-magicpath-path="SidebarNavigation.tsx" />
                  <span className="font-medium text-sm" data-magicpath-id="8" data-magicpath-path="SidebarNavigation.tsx">{item.label}</span>
                </div>
                {item.hasSubmenu && <ChevronRight size={16} className={`transition-colors ${item.active || item.highlighted ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} data-magicpath-id="9" data-magicpath-path="SidebarNavigation.tsx" />}
              </motion.button>;
        })}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-slate-700 p-4" data-magicpath-id="10" data-magicpath-path="SidebarNavigation.tsx">
        <div className="space-y-2" data-magicpath-id="11" data-magicpath-path="SidebarNavigation.tsx">
          {bottomItems.map(item => {
          const Icon = item.icon;
          return <motion.button key={item.id} onClick={() => onViewChange(item.view)} whileHover={{
            x: 4
          }} whileTap={{
            scale: 0.98
          }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-slate-300 hover:text-white hover:bg-slate-800 transition-all duration-200 group" data-magicpath-id="12" data-magicpath-path="SidebarNavigation.tsx">
                <Icon size={20} className="text-slate-400 group-hover:text-white" data-magicpath-id="13" data-magicpath-path="SidebarNavigation.tsx" />
                <span className="font-medium text-sm" data-magicpath-id="14" data-magicpath-path="SidebarNavigation.tsx">{item.label}</span>
              </motion.button>;
        })}
        </div>
      </div>

      {/* Cohort Info Card */}
      <div className="p-4 border-t border-slate-700" data-magicpath-id="15" data-magicpath-path="SidebarNavigation.tsx">
        <div className="bg-slate-800 rounded-lg p-4" data-magicpath-id="16" data-magicpath-path="SidebarNavigation.tsx">
          <h3 className="text-sm font-semibold text-white mb-1" data-magicpath-id="17" data-magicpath-path="SidebarNavigation.tsx">Cohort WebFT64</h3>
          <p className="text-xs text-slate-400 mb-2" data-magicpath-id="18" data-magicpath-path="SidebarNavigation.tsx">
            🟢 Inicio: 16/06/2025 - Fin: 31/10/2025
          </p>
          <div className="space-y-1 text-xs text-slate-300" data-magicpath-id="19" data-magicpath-path="SidebarNavigation.tsx">
            <div className="flex justify-between" data-magicpath-id="20" data-magicpath-path="SidebarNavigation.tsx">
              <span data-magicpath-id="21" data-magicpath-path="SidebarNavigation.tsx">Contenido</span>
              <ChevronRight size={12} data-magicpath-id="22" data-magicpath-path="SidebarNavigation.tsx" />
            </div>
            <div className="flex justify-between text-yellow-400 font-medium" data-magicpath-id="23" data-magicpath-path="SidebarNavigation.tsx">
              <span data-magicpath-id="24" data-magicpath-path="SidebarNavigation.tsx">Video Feed</span>
              <ChevronRight size={12} data-magicpath-id="25" data-magicpath-path="SidebarNavigation.tsx" />
            </div>
            <div className="flex justify-between" data-magicpath-id="26" data-magicpath-path="SidebarNavigation.tsx">
              <span data-magicpath-id="27" data-magicpath-path="SidebarNavigation.tsx">Miembros</span>
              <ChevronRight size={12} data-magicpath-id="28" data-magicpath-path="SidebarNavigation.tsx" />
            </div>
            <div className="flex justify-between" data-magicpath-id="29" data-magicpath-path="SidebarNavigation.tsx">
              <span data-magicpath-id="30" data-magicpath-path="SidebarNavigation.tsx">Datos Académicos</span>
              <ChevronRight size={12} data-magicpath-id="31" data-magicpath-path="SidebarNavigation.tsx" />
            </div>
          </div>
        </div>
      </div>
    </div>;
}