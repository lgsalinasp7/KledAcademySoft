"use client";

import React from 'react';

export default function AdminRolesPage() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Gestión de Roles</h1>
          <p className="text-gray-400">Administra los roles y permisos de la plataforma</p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-colors flex items-center gap-2">
            <span>+</span>
            Crear Rol
          </button>
          
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Buscar roles..."
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none"
            />
            <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none">
              <option>Todos los roles</option>
              <option>Activos</option>
              <option>Inactivos</option>
            </select>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Role 1 - Admin */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Administrador</h3>
                <p className="text-gray-400 text-sm">Acceso completo a la plataforma</p>
              </div>
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Admin
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Usuarios:</span>
                <span className="text-white">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Permisos:</span>
                <span className="text-white">Todos</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Estado:</span>
                <span className="text-green-400">Activo</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium text-white">Permisos:</h4>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded">Usuarios</span>
                <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded">Cursos</span>
                <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded">Cohortes</span>
                <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded">Config</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                Editar
              </button>
              <button className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                Permisos
              </button>
            </div>
          </div>

          {/* Role 2 - Profesor */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Profesor</h3>
                <p className="text-gray-400 text-sm">Gestión de cursos y cohortes</p>
              </div>
              <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Profesor
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Usuarios:</span>
                <span className="text-white">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Permisos:</span>
                <span className="text-white">Limitados</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Estado:</span>
                <span className="text-green-400">Activo</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium text-white">Permisos:</h4>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded">Cursos</span>
                <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded">Cohortes</span>
                <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">Usuarios</span>
                <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">Config</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                Editar
              </button>
              <button className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                Permisos
              </button>
            </div>
          </div>

          {/* Role 3 - Estudiante */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Estudiante</h3>
                <p className="text-gray-400 text-sm">Acceso a cursos y contenido</p>
              </div>
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Estudiante
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Usuarios:</span>
                <span className="text-white">1,223</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Permisos:</span>
                <span className="text-white">Básicos</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Estado:</span>
                <span className="text-green-400">Activo</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium text-white">Permisos:</h4>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded">Cursos</span>
                <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded">Contenido</span>
                <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">Cohortes</span>
                <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">Config</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                Editar
              </button>
              <button className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                Permisos
              </button>
            </div>
          </div>

          {/* Role 4 - Moderador */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Moderador</h3>
                <p className="text-gray-400 text-sm">Moderación de contenido</p>
              </div>
              <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Moderador
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Usuarios:</span>
                <span className="text-white">2</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Permisos:</span>
                <span className="text-white">Medios</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Estado:</span>
                <span className="text-green-400">Activo</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <h4 className="text-sm font-medium text-white">Permisos:</h4>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded">Contenido</span>
                <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded">Usuarios</span>
                <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">Cursos</span>
                <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">Config</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                Editar
              </button>
              <button className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                Permisos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
