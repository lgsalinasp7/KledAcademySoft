"use client";

import React from 'react';

export default function AdminCohortsPage() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Gestión de Cohortes</h1>
          <p className="text-gray-400">Administra las cohortes de estudiantes en la plataforma</p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-colors flex items-center gap-2">
            <span>+</span>
            Crear Cohorte
          </button>
          
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Buscar cohortes..."
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none"
            />
            <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none">
              <option>Todas las cohortes</option>
              <option>Activas</option>
              <option>Finalizadas</option>
              <option>Próximas</option>
            </select>
          </div>
        </div>

        {/* Cohorts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cohort 1 */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">FS-Jan25</h3>
                <p className="text-gray-400 text-sm">Full Stack Web Development</p>
              </div>
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Activa
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Estudiantes:</span>
                <span className="text-white">24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Inicio:</span>
                <span className="text-white">15/01/2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Fin:</span>
                <span className="text-white">15/07/2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progreso:</span>
                <span className="text-yellow-400">65%</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                Ver Detalles
              </button>
              <button className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                Editar
              </button>
            </div>
          </div>

          {/* Cohort 2 */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">DS-Feb25</h3>
                <p className="text-gray-400 text-sm">Data Science Fundamentals</p>
              </div>
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Próxima
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Estudiantes:</span>
                <span className="text-white">18</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Inicio:</span>
                <span className="text-white">01/02/2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Fin:</span>
                <span className="text-white">01/06/2025</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progreso:</span>
                <span className="text-gray-400">0%</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                Ver Detalles
              </button>
              <button className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                Editar
              </button>
            </div>
          </div>

          {/* Cohort 3 */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">UX-Mar25</h3>
                <p className="text-gray-400 text-sm">UX/UI Design Masterclass</p>
              </div>
              <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Finalizada
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Estudiantes:</span>
                <span className="text-white">15</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Inicio:</span>
                <span className="text-white">01/03/2024</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Fin:</span>
                <span className="text-white">01/06/2024</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progreso:</span>
                <span className="text-green-400">100%</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                Ver Detalles
              </button>
              <button className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-700 transition-colors">
                Certificados
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
