import React from 'react';
import { User } from '../../../types';

interface LessonsManagementProps {
  user: User;
}

export function LessonsManagement({ user }: LessonsManagementProps) {
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Gestión de Lecciones</h1>
        <p className="text-gray-600 mb-6">
          Editor avanzado de contenido para crear lecciones interactivas
        </p>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <p className="text-purple-800">✏️ CMS avanzado con funcionalidades para:</p>
          <ul className="text-purple-700 text-sm mt-2 space-y-1">
            <li>• Editor WYSIWYG para contenido rico</li>
            <li>• Subida de videos y recursos</li>
            <li>• Creación de quizzes y evaluaciones</li>
            <li>• Gestión de tareas y assignments</li>
            <li>• Preview en tiempo real</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
