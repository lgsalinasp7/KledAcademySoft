'use client';

import React from 'react';

export default function LessonsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Lecciones</h1>
          <p className="text-gray-600 mt-2">Gestiona y accede a todas las lecciones disponibles</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sistema de Lecciones</h2>
            <p className="text-gray-600">Esta funcionalidad está siendo desarrollada.</p>
            <p className="text-gray-500 text-sm mt-2">Próximamente: Creación, edición y gestión de lecciones</p>
          </div>
        </div>
      </div>
    </div>
  );
}
