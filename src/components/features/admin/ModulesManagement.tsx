import React from 'react';
import { User } from '../../../types';

interface ModulesManagementProps {
  user: User;
}

export function ModulesManagement({ user }: ModulesManagementProps) {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Módulos</h1>
        <p className="text-gray-600 mb-6">
          Organiza el contenido en módulos estructurados por curso
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">📚 Esta vista incluirá funcionalidades para:</p>
          <ul className="text-green-700 text-sm mt-2 space-y-1">
            <li>• Crear módulos por curso</li>
            <li>• Definir objetivos y prerrequisitos</li>
            <li>• Ordenar y estructurar contenido</li>
            <li>• Gestionar duración estimada</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
