import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderViewProps {
  currentView: string;
}

export function PlaceholderView({ currentView }: PlaceholderViewProps) {
  const getTitle = () => {
    switch (currentView) {
      case 'members':
        return 'Miembros';
      case 'academic-data':
        return 'Datos Académicos';
      case 'payment-management':
        return 'Gestión de Pagos';
      case 'kaled-x':
        return 'KaledAcademy X';
      default:
        return 'Sección';
    }
  };

  return (
    <div className="flex items-center justify-center h-full overflow-y-auto">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <Construction size={32} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">
          {getTitle()}
        </h2>
        <p className="text-gray-400 mb-6">
          Esta sección está en desarrollo. Pronto tendrás acceso a todas las funcionalidades.
        </p>
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-300">
            Mientras tanto, puedes explorar las otras secciones disponibles.
          </p>
        </div>
      </div>
    </div>
  );
}
