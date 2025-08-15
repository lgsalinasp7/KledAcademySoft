import React from 'react';
import { User } from '../../../types';

interface RolesManagementProps {
  user: User;
}

export function RolesManagement({ user }: RolesManagementProps) {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Roles y Permisos</h1>
        <p className="text-gray-600 mb-6">
          Sistema avanzado de control de acceso y permisos
        </p>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">🔐 Sistema de permisos granular:</p>
          <ul className="text-red-700 text-sm mt-2 space-y-1">
            <li>• Definir roles personalizados</li>
            <li>• Asignar permisos específicos</li>
            <li>• Control de acceso por módulo</li>
            <li>• Auditoría de acciones</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
