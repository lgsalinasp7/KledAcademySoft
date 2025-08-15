import React from 'react';
import { User } from '../../../types';

interface SettingsManagementProps {
  user: User;
}

export function SettingsManagement({ user }: SettingsManagementProps) {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Configuración del Sistema</h1>
        <p className="text-gray-600 mb-6">
          Configuraciones globales de la plataforma
        </p>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-800">⚙️ Panel de configuración:</p>
          <ul className="text-gray-700 text-sm mt-2 space-y-1">
            <li>• Configuraciones de email</li>
            <li>• Integraciones de terceros</li>
            <li>• Configuración de pagos</li>
            <li>• Personalización de marca</li>
            <li>• Configuración de notificaciones</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
