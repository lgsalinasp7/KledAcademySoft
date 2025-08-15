import React from 'react';
import { User } from '../../../types';

interface CohortsManagementProps {
  user: User;
}

export function CohortsManagement({ user }: CohortsManagementProps) {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Cohortes</h1>
        <p className="text-gray-600 mb-6">
          Administra cohortes, horarios, estudiantes y profesores asignados
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">🚀 Esta vista se está desarrollando con funcionalidades para:</p>
          <ul className="text-blue-700 text-sm mt-2 space-y-1">
            <li>• Crear y gestionar cohortes por curso</li>
            <li>• Asignar estudiantes y profesores</li>
            <li>• Configurar horarios y calendarios</li>
            <li>• Monitor de progreso grupal</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
