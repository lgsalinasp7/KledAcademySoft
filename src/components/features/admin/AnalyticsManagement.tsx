import React from 'react';
import { User } from '../../../types';

interface AnalyticsManagementProps {
  user: User;
}

export function AnalyticsManagement({ user }: AnalyticsManagementProps) {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Analytics y Reportes</h1>
        <p className="text-gray-600 mb-6">
          Métricas detalladas sobre rendimiento y engagement
        </p>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <p className="text-indigo-800">📊 Dashboard analítico con:</p>
          <ul className="text-indigo-700 text-sm mt-2 space-y-1">
            <li>• Métricas de engagement de estudiantes</li>
            <li>• Tasas de completado por curso</li>
            <li>• Performance de profesores</li>
            <li>• Análisis de retention</li>
            <li>• Reportes de revenue</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
