"use client";

import React from 'react';

export default function AdminAnalyticsPage() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-gray-400">Análisis y métricas de la plataforma</p>
        </div>

        {/* Date Range Selector */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none">
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
              <option>Últimos 3 meses</option>
              <option>Último año</option>
              <option>Personalizado</option>
            </select>
          </div>
          
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-colors">
            Exportar Reporte
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Usuarios</p>
                <p className="text-2xl font-bold text-white">1,234</p>
                <p className="text-green-400 text-sm">+12% vs mes anterior</p>
              </div>
              <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">👥</span>
              </div>
            </div>
          </div>

          {/* Active Courses */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Cursos Activos</p>
                <p className="text-2xl font-bold text-white">12</p>
                <p className="text-green-400 text-sm">+2 vs mes anterior</p>
              </div>
              <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">📚</span>
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Ingresos Mensuales</p>
                <p className="text-2xl font-bold text-white">$45,231</p>
                <p className="text-green-400 text-sm">+8% vs mes anterior</p>
              </div>
              <div className="h-12 w-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">💰</span>
              </div>
            </div>
          </div>

          {/* Completion Rate */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Tasa de Finalización</p>
                <p className="text-2xl font-bold text-white">95%</p>
                <p className="text-green-400 text-sm">+3% vs mes anterior</p>
              </div>
              <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🎯</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Growth Chart */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Crecimiento de Usuarios</h2>
            <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Gráfico de crecimiento de usuarios</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-gray-400 text-sm">Nuevos</p>
                <p className="text-white font-semibold">+156</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Activos</p>
                <p className="text-white font-semibold">1,089</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Retención</p>
                <p className="text-white font-semibold">87%</p>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Ingresos por Mes</h2>
            <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Gráfico de ingresos mensuales</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-gray-400 text-sm">Enero</p>
                <p className="text-white font-semibold">$42,150</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Febrero</p>
                <p className="text-white font-semibold">$45,231</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Proyección</p>
                <p className="text-white font-semibold">$48,500</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Performance */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Rendimiento por Curso</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Curso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Estudiantes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Finalización
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Satisfacción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Ingresos
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                <tr className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-bold">FS</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Full Stack Web Development</div>
                        <div className="text-sm text-gray-400">6 meses</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">456</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '95%'}}></div>
                      </div>
                      <span className="text-sm text-white">95%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">4.8/5</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">$18,240</td>
                </tr>
                
                <tr className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-bold">DS</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Data Science Fundamentals</div>
                        <div className="text-sm text-gray-400">4 meses</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">234</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '88%'}}></div>
                      </div>
                      <span className="text-sm text-white">88%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">4.6/5</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">$11,700</td>
                </tr>
                
                <tr className="hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                        <span className="text-white text-xs font-bold">UX</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">UX/UI Design Masterclass</div>
                        <div className="text-sm text-gray-400">3 meses</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">189</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-700 rounded-full h-2 mr-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                      <span className="text-sm text-white">92%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">4.9/5</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-400">$9,450</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-4">Distribución Geográfica</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">México</span>
                <span className="text-yellow-400 font-semibold">45%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{width: '45%'}}></div>
              </div>
              <p className="text-gray-400 text-sm mt-1">556 estudiantes</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Colombia</span>
                <span className="text-yellow-400 font-semibold">28%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{width: '28%'}}></div>
              </div>
              <p className="text-gray-400 text-sm mt-1">346 estudiantes</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">España</span>
                <span className="text-yellow-400 font-semibold">15%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{width: '15%'}}></div>
              </div>
              <p className="text-gray-400 text-sm mt-1">185 estudiantes</p>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">Otros</span>
                <span className="text-yellow-400 font-semibold">12%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{width: '12%'}}></div>
              </div>
              <p className="text-gray-400 text-sm mt-1">147 estudiantes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
