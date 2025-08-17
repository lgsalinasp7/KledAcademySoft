"use client";

import React from 'react';

export default function AdminUsersPage() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Gestión de Usuarios</h1>
          <p className="text-gray-400">Administra todos los usuarios de la plataforma</p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-colors flex items-center gap-2">
            <span>+</span>
            Crear Usuario
          </button>
          
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Buscar usuarios..."
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none"
            />
            <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none">
              <option>Todos los roles</option>
              <option>Estudiantes</option>
              <option>Profesores</option>
              <option>Administradores</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-900 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Fecha de Registro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {/* User 1 */}
                <tr className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-yellow-400 flex items-center justify-center">
                        <span className="text-black font-semibold">LG</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">Laura García</div>
                        <div className="text-sm text-gray-400">Estudiante</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    laura.garcia@email.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Estudiante
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Activo
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    15/01/2024
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-yellow-400 hover:text-yellow-300 mr-3">Editar</button>
                    <button className="text-red-400 hover:text-red-300">Eliminar</button>
                  </td>
                </tr>

                {/* User 2 */}
                <tr className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-green-400 flex items-center justify-center">
                        <span className="text-black font-semibold">CP</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">Carlos Pérez</div>
                        <div className="text-sm text-gray-400">Profesor</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    carlos.perez@kaledacademy.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                      Profesor
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Activo
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    10/01/2024
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-yellow-400 hover:text-yellow-300 mr-3">Editar</button>
                    <button className="text-red-400 hover:text-red-300">Eliminar</button>
                  </td>
                </tr>

                {/* User 3 */}
                <tr className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-red-400 flex items-center justify-center">
                        <span className="text-black font-semibold">AM</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">Ana Martínez</div>
                        <div className="text-sm text-gray-400">Administrador</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    ana.martinez@kaledacademy.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Administrador
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Activo
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    05/01/2024
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-yellow-400 hover:text-yellow-300 mr-3">Editar</button>
                    <button className="text-red-400 hover:text-red-300">Eliminar</button>
                  </td>
                </tr>

                {/* User 4 */}
                <tr className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center">
                        <span className="text-black font-semibold">JL</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white">Juan López</div>
                        <div className="text-sm text-gray-400">Estudiante</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    juan.lopez@email.com
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      Estudiante
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pendiente
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    20/01/2024
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-yellow-400 hover:text-yellow-300 mr-3">Editar</button>
                    <button className="text-red-400 hover:text-red-300">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Mostrando 1-4 de 1,234 usuarios
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700">
              Anterior
            </button>
            <button className="px-3 py-2 text-sm bg-yellow-400 text-black rounded-lg">
              1
            </button>
            <button className="px-3 py-2 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700">
              2
            </button>
            <button className="px-3 py-2 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700">
              3
            </button>
            <button className="px-3 py-2 text-sm bg-gray-800 text-white rounded-lg hover:bg-gray-700">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
