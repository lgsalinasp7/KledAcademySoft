import React from 'react';
import { User } from '../../../types';

interface CalendarManagementProps {
  user: User;
}

export function CalendarManagement({ user }: CalendarManagementProps) {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Calendario Académico</h1>
        <p className="text-gray-600 mb-6">
          Gestiona eventos, clases, evaluaciones y fechas importantes
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">📅 Sistema de calendario con funcionalidades para:</p>
          <ul className="text-yellow-700 text-sm mt-2 space-y-1">
            <li>• Programar clases y eventos</li>
            <li>• Gestionar horarios de cohortes</li>
            <li>• Configurar fechas de evaluaciones</li>
            <li>• Notificaciones automáticas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
