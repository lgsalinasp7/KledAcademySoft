"use client";

import React from 'react';

export default function AdminCalendarPage() {
  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Calendario</h1>
          <p className="text-gray-400">Gestiona eventos, clases y actividades de la plataforma</p>
        </div>

        {/* Calendar Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              ← Anterior
            </button>
            <h2 className="text-xl font-semibold text-white">Febrero 2025</h2>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
              Siguiente →
            </button>
          </div>
          
          <div className="flex gap-4">
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-colors">
              + Nuevo Evento
            </button>
            <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-yellow-400 focus:outline-none">
              <option>Vista Mensual</option>
              <option>Vista Semanal</option>
              <option>Vista Diaria</option>
            </select>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          {/* Calendar Header */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            <div className="text-center text-gray-400 font-medium p-2">Dom</div>
            <div className="text-center text-gray-400 font-medium p-2">Lun</div>
            <div className="text-center text-gray-400 font-medium p-2">Mar</div>
            <div className="text-center text-gray-400 font-medium p-2">Mié</div>
            <div className="text-center text-gray-400 font-medium p-2">Jue</div>
            <div className="text-center text-gray-400 font-medium p-2">Vie</div>
            <div className="text-center text-gray-400 font-medium p-2">Sáb</div>
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {/* Week 1 */}
            <div className="h-32 bg-gray-800 rounded-lg p-2 text-gray-500">26</div>
            <div className="h-32 bg-gray-800 rounded-lg p-2 text-gray-500">27</div>
            <div className="h-32 bg-gray-800 rounded-lg p-2 text-gray-500">28</div>
            <div className="h-32 bg-gray-800 rounded-lg p-2 text-gray-500">29</div>
            <div className="h-32 bg-gray-800 rounded-lg p-2 text-gray-500">30</div>
            <div className="h-32 bg-gray-800 rounded-lg p-2 text-gray-500">31</div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">1</div>
              <div className="mt-1">
                <div className="bg-blue-500 text-white text-xs p-1 rounded mb-1">Clase FS-Jan25</div>
              </div>
            </div>

            {/* Week 2 */}
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">2</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">3</div>
              <div className="mt-1">
                <div className="bg-green-500 text-white text-xs p-1 rounded mb-1">Clase DS-Feb25</div>
              </div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">4</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">5</div>
              <div className="mt-1">
                <div className="bg-purple-500 text-white text-xs p-1 rounded mb-1">Clase UX-Mar25</div>
              </div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">6</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">7</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">8</div>
            </div>

            {/* Week 3 */}
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">9</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">10</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">11</div>
              <div className="mt-1">
                <div className="bg-blue-500 text-white text-xs p-1 rounded mb-1">Clase FS-Jan25</div>
                <div className="bg-yellow-500 text-black text-xs p-1 rounded">Webinar</div>
              </div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">12</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">13</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">14</div>
              <div className="mt-1">
                <div className="bg-red-500 text-white text-xs p-1 rounded">Día Festivo</div>
              </div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">15</div>
            </div>

            {/* Week 4 */}
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">16</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">17</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">18</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">19</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">20</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">21</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">22</div>
            </div>

            {/* Week 5 */}
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">23</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">24</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">25</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">26</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">27</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2">
              <div className="text-white font-medium">28</div>
            </div>
            <div className="h-32 bg-gray-800 rounded-lg p-2 text-gray-500">1</div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mt-8 bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-semibold text-white mb-4">Próximos Eventos</h2>
          
          <div className="space-y-4">
            {/* Event 1 */}
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">📚</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">Clase FS-Jan25</h3>
                  <p className="text-gray-400 text-sm">Full Stack Web Development</p>
                  <p className="text-gray-400 text-sm">Hoy 18:00 - 20:00</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
                  Editar
                </button>
                <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
                  Ver
                </button>
              </div>
            </div>

            {/* Event 2 */}
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">📊</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">Clase DS-Feb25</h3>
                  <p className="text-gray-400 text-sm">Data Science Fundamentals</p>
                  <p className="text-gray-400 text-sm">Mañana 19:00 - 21:00</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
                  Editar
                </button>
                <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
                  Ver
                </button>
              </div>
            </div>

            {/* Event 3 */}
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">🎨</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">Clase UX-Mar25</h3>
                  <p className="text-gray-400 text-sm">UX/UI Design Masterclass</p>
                  <p className="text-gray-400 text-sm">Miércoles 17:00 - 19:00</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
                  Editar
                </button>
                <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
                  Ver
                </button>
              </div>
            </div>

            {/* Event 4 */}
            <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                  <span className="text-black font-bold">🎥</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">Webinar: React Avanzado</h3>
                  <p className="text-gray-400 text-sm">Técnicas avanzadas de React</p>
                  <p className="text-gray-400 text-sm">11 Feb 20:00 - 22:00</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
                  Editar
                </button>
                <button className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-600">
                  Ver
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Event Types Legend */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-400 text-sm">Clases Full Stack</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-400 text-sm">Clases Data Science</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-gray-400 text-sm">Clases UX/UI</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span className="text-gray-400 text-sm">Webinars</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-gray-400 text-sm">Días Festivos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
