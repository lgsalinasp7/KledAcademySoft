"use client";

import React from 'react';

export default function AdminCredentialsPage() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Gestión de Credenciales</h1>
          <p className="text-gray-400">Administra las credenciales y certificaciones de la plataforma</p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-colors flex items-center gap-2">
            <span>+</span>
            Crear Credencial
          </button>
          
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Buscar credenciales..."
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none"
            />
            <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none">
              <option>Todas las credenciales</option>
              <option>Certificaciones</option>
              <option>Badges</option>
              <option>Diplomas</option>
            </select>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Credential 1 */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Full Stack Developer</h3>
                <p className="text-gray-400 text-sm">Certificación completa</p>
              </div>
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Activa
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tipo:</span>
                <span className="text-white">Certificación</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Duración:</span>
                <span className="text-white">6 meses</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Precio:</span>
                <span className="text-yellow-400">$2999 USD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Emitidas:</span>
                <span className="text-white">156</span>
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

          {/* Credential 2 */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Data Science Specialist</h3>
                <p className="text-gray-400 text-sm">Especialización en datos</p>
              </div>
              <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Próxima
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tipo:</span>
                <span className="text-white">Certificación</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Duración:</span>
                <span className="text-white">4 meses</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Precio:</span>
                <span className="text-yellow-400">$2499 USD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Emitidas:</span>
                <span className="text-white">0</span>
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

          {/* Credential 3 */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">UX/UI Design Master</h3>
                <p className="text-gray-400 text-sm">Maestría en diseño</p>
              </div>
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Activa
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tipo:</span>
                <span className="text-white">Certificación</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Duración:</span>
                <span className="text-white">3 meses</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Precio:</span>
                <span className="text-yellow-400">$1999 USD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Emitidas:</span>
                <span className="text-white">89</span>
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

          {/* Credential 4 */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">React Expert Badge</h3>
                <p className="text-gray-400 text-sm">Badge de especialista</p>
              </div>
              <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                Badge
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tipo:</span>
                <span className="text-white">Badge</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Duración:</span>
                <span className="text-white">2 meses</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Precio:</span>
                <span className="text-yellow-400">$499 USD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Emitidas:</span>
                <span className="text-white">234</span>
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
        </div>
      </div>
    </div>
  );
}
