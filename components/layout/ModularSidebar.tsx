"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useModularSystem } from '@/hooks/useModularSystem';
import { 
  ChevronDown, 
  ChevronRight,
  Home,
  BookOpen,
  Users,
  Settings,
  BarChart3,
  Calendar,
  Bell,
  Shield
} from 'lucide-react';

// Mapeo de iconos
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Home,
  BookOpen,
  Users,
  Settings,
  BarChart3,
  Calendar,
  Bell,
  Shield
};

interface ModularSidebarProps {
  className?: string;
}

export function ModularSidebar({ className }: ModularSidebarProps) {
  const pathname = usePathname();
  const { navigation, userRole, isAuthenticated } = useModularSystem();
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  const renderIcon = (iconName?: string) => {
    if (!iconName) return null;
    
    const IconComponent = iconMap[iconName];
    if (!IconComponent) return null;
    
    return <IconComponent className="h-4 w-4" />;
  };

  const renderNavigationItem = (item: any, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isItemActive = isActive(item.path);

    return (
      <div key={item.id} className="space-y-1">
        {/* Item principal */}
        <div className="flex items-center">
          {hasChildren ? (
            <button
              onClick={() => toggleExpanded(item.id)}
              className={cn(
                "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
                "hover:bg-gray-800 hover:text-white",
                isItemActive 
                  ? "bg-yellow-600 text-black" 
                  : "text-gray-300"
              )}
            >
              {renderIcon(item.icon)}
              <span className="ml-3 flex-1 text-left">{item.title}</span>
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          ) : (
            <Link
              href={item.path}
              className={cn(
                "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
                "hover:bg-gray-800 hover:text-white",
                isItemActive 
                  ? "bg-yellow-600 text-black" 
                  : "text-gray-300"
              )}
            >
              {renderIcon(item.icon)}
              <span className="ml-3">{item.title}</span>
            </Link>
          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="ml-6 space-y-1">
            {item.children.map((child: any) => (
              <Link
                key={child.id}
                href={child.path}
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                  "hover:bg-gray-800 hover:text-white",
                  isActive(child.path)
                    ? "bg-yellow-600 text-black"
                    : "text-gray-400"
                )}
              >
                {renderIcon(child.icon)}
                <span className="ml-3">{child.title}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (!isAuthenticated) {
    return (
      <div className={cn("bg-gray-900 text-white p-4", className)}>
        <div className="text-center text-gray-400">
          <Shield className="h-8 w-8 mx-auto mb-2" />
          <p>Inicia sesión para ver la navegación</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-gray-900 text-white p-4 space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center space-x-3 px-3 py-2">
        <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center">
          <span className="text-black font-bold text-sm">K</span>
        </div>
        <div>
          <h2 className="font-semibold text-white">KaledAcademy</h2>
          <p className="text-xs text-gray-400 capitalize">{userRole.toLowerCase()}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {navigation.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <BookOpen className="h-8 w-8 mx-auto mb-2" />
            <p>No hay módulos disponibles</p>
          </div>
        ) : (
          navigation.map(item => renderNavigationItem(item))
        )}
      </nav>

      {/* Footer */}
      <div className="pt-4 border-t border-gray-700">
        <div className="text-xs text-gray-400 text-center">
          <p>Versión Modular</p>
          <p className="mt-1">{navigation.length} módulos activos</p>
        </div>
      </div>
    </div>
  );
}
