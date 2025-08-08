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
  return <div className="w-64 bg-gradient-to-b from-[#1e1b4b] to-[#0f172a] text-white flex flex-col h-screen" data-magicpath-id="0" data-magicpath-path="SidebarNavigation.tsx">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50" data-magicpath-id="1" data-magicpath-path="SidebarNavigation.tsx">
        <div className="flex items-center gap-3" data-magicpath-id="2" data-magicpath-path="SidebarNavigation.tsx">
          <div className="w-10 h-10 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-lg flex items-center justify-center relative" data-magicpath-id="3" data-magicpath-path="SidebarNavigation.tsx">
            <svg viewBox="0 0 32 32" className="w-6 h-6" data-magicpath-id="4" data-magicpath-path="SidebarNavigation.tsx">
              {/* Hexagonal shapes */}
              <path d="M16 3 L24 8 L24 20 L16 25 L8 20 L8 8 Z" fill="none" stroke="white" strokeWidth="1.5" data-magicpath-id="5" data-magicpath-path="SidebarNavigation.tsx" />
              <path d="M16 6 L21 9 L21 18 L16 21 L11 18 L11 9 Z" fill="none" stroke="white" strokeWidth="1" data-magicpath-id="6" data-magicpath-path="SidebarNavigation.tsx" />
              {/* Connected circles */}
              <circle cx="14" cy="12" r="2" fill="white" data-magicpath-id="7" data-magicpath-path="SidebarNavigation.tsx" />
              <circle cx="18" cy="14" r="2" fill="white" data-magicpath-id="8" data-magicpath-path="SidebarNavigation.tsx" />
              <circle cx="16" cy="20" r="2" fill="white" data-magicpath-id="9" data-magicpath-path="SidebarNavigation.tsx" />
              {/* Connection lines */}
              <line x1="14" y1="12" x2="18" y2="14" stroke="white" strokeWidth="1.5" />
              <line x1="18" y1="14" x2="16" y2="20" stroke="white" strokeWidth="1.5" />
            </svg>
          </div>
          <div data-magicpath-id="10" data-magicpath-path="SidebarNavigation.tsx">
            <h1 className="text-lg font-bold bg-gradient-to-r from-white to-[#06b6d4] bg-clip-text text-transparent" data-magicpath-id="11" data-magicpath-path="SidebarNavigation.tsx">
              KALED
            </h1>
            <p className="text-xs font-medium text-slate-300 tracking-wider" data-magicpath-id="12" data-magicpath-path="SidebarNavigation.tsx">ACADEMY</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-6" data-magicpath-id="13" data-magicpath-path="SidebarNavigation.tsx">
        <div className="space-y-2 px-4" data-magicpath-id="14" data-magicpath-path="SidebarNavigation.tsx">
          {navigationItems.map(item => {
          const Icon = item.icon;
          return <motion.button key={item.id} onClick={() => onViewChange(item.view)} whileHover={{
            x: 4
          }} whileTap={{
            scale: 0.98
          }} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 group ${item.active || item.highlighted ? 'bg-gradient-to-r from-[#06b6d4]/20 to-[#0891b2]/20 text-white border-l-4 border-[#06b6d4]' : 'text-slate-300 hover:text-white hover:bg-slate-800/50'}`} data-magicpath-id="15" data-magicpath-path="SidebarNavigation.tsx">
                <div className="flex items-center gap-3" data-magicpath-id="16" data-magicpath-path="SidebarNavigation.tsx">
                  <Icon size={20} className={`${item.active || item.highlighted ? 'text-[#06b6d4]' : 'text-slate-400 group-hover:text-white'}`} data-magicpath-id="17" data-magicpath-path="SidebarNavigation.tsx" />
                  <span className="font-medium text-sm" data-magicpath-id="18" data-magicpath-path="SidebarNavigation.tsx">{item.label}</span>
                </div>
                {item.hasSubmenu && <ChevronRight size={16} className={`transition-colors ${item.active || item.highlighted ? 'text-[#06b6d4]' : 'text-slate-400 group-hover:text-white'}`} data-magicpath-id="19" data-magicpath-path="SidebarNavigation.tsx" />}
              </motion.button>;
        })}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-slate-700/50 p-4" data-magicpath-id="20" data-magicpath-path="SidebarNavigation.tsx">
        <div className="space-y-2" data-magicpath-id="21" data-magicpath-path="SidebarNavigation.tsx">
          {bottomItems.map(item => {
          const Icon = item.icon;
          return <motion.button key={item.id} onClick={() => onViewChange(item.view)} whileHover={{
            x: 4
          }} whileTap={{
            scale: 0.98
          }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all duration-200 group" data-magicpath-id="22" data-magicpath-path="SidebarNavigation.tsx">
                <Icon size={20} className="text-slate-400 group-hover:text-white" data-magicpath-id="23" data-magicpath-path="SidebarNavigation.tsx" />
                <span className="font-medium text-sm" data-magicpath-id="24" data-magicpath-path="SidebarNavigation.tsx">{item.label}</span>
              </motion.button>;
        })}
        </div>
      </div>

      {/* Cohort Info Card */}
      <div className="p-4 border-t border-slate-700/50" data-magicpath-id="25" data-magicpath-path="SidebarNavigation.tsx">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg p-4 border border-slate-700/30" data-magicpath-id="26" data-magicpath-path="SidebarNavigation.tsx">
          <h3 className="text-sm font-semibold text-white mb-1" data-magicpath-id="27" data-magicpath-path="SidebarNavigation.tsx">Cohort WebFT64</h3>
          <p className="text-xs text-slate-400 mb-2" data-magicpath-id="28" data-magicpath-path="SidebarNavigation.tsx">
            🟢 Inicio: 16/06/2025 - Fin: 31/10/2025
          </p>
          <div className="space-y-1 text-xs text-slate-300" data-magicpath-id="29" data-magicpath-path="SidebarNavigation.tsx">
            <div className="flex justify-between" data-magicpath-id="30" data-magicpath-path="SidebarNavigation.tsx">
              <span data-magicpath-id="31" data-magicpath-path="SidebarNavigation.tsx">Contenido</span>
              <ChevronRight size={12} data-magicpath-id="32" data-magicpath-path="SidebarNavigation.tsx" />
            </div>
            <div className="flex justify-between text-[#06b6d4] font-medium" data-magicpath-id="33" data-magicpath-path="SidebarNavigation.tsx">
              <span data-magicpath-id="34" data-magicpath-path="SidebarNavigation.tsx">Video Feed</span>
              <ChevronRight size={12} data-magicpath-id="35" data-magicpath-path="SidebarNavigation.tsx" />
            </div>
            <div className="flex justify-between" data-magicpath-id="36" data-magicpath-path="SidebarNavigation.tsx">
              <span data-magicpath-id="37" data-magicpath-path="SidebarNavigation.tsx">Miembros</span>
              <ChevronRight size={12} data-magicpath-id="38" data-magicpath-path="SidebarNavigation.tsx" />
            </div>
            <div className="flex justify-between" data-magicpath-id="39" data-magicpath-path="SidebarNavigation.tsx">
              <span data-magicpath-id="40" data-magicpath-path="SidebarNavigation.tsx">Datos Académicos</span>
              <ChevronRight size={12} data-magicpath-id="41" data-magicpath-path="SidebarNavigation.tsx" />
            </div>
          </div>
        </div>
      </div>
    </div>;
}