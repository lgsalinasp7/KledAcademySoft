import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Calendar, Github, ExternalLink } from 'lucide-react';
import { User } from '../../../types';

interface HomeViewProps {
  user: User;
  onNavigateToCareer: () => void;
  onLogout: () => void;
}

export function HomeView({ user, onNavigateToCareer }: HomeViewProps) {

  return (
    <div className="flex flex-1 h-full">
      {/* Main Content */}
      <div className="flex-1 bg-black">
        <div className="p-6">
        <div className="max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              ¡Hola, {user.name.split(' ')[0]} {user.name.split(' ')[1]}!
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Activos</span>
                <div className="w-8 h-[2px] bg-yellow-400"></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Finalizados</span>
                <div className="w-8 h-[2px] bg-gray-600"></div>
              </div>
            </div>
          </div>

          {/* Career Progress */}
          <motion.div 
            className="bg-gray-900 rounded-2xl p-6 mb-8 border border-gray-800 cursor-pointer hover:bg-gray-800 transition-all duration-200"
            onClick={onNavigateToCareer}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">FS</span>
                </div>
                <div>
                  <p className="text-sm text-blue-400 font-medium mb-1">Carrera</p>
                  <h3 className="text-xl font-bold text-white mb-2">Full Stack 3.0</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Completado: 9.4%</span>
                  </div>
                  <div className="w-96 bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '9.4%' }}></div>
                  </div>
                </div>
              </div>
              <ChevronRight size={24} className="text-gray-400" />
            </div>
          </motion.div>

          {/* KaledAcademy Blog Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">KaledAcademy Blog</h2>
                <p className="text-gray-400">Te presentamos las últimas noticias del mundo tech</p>
              </div>
              <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                <ExternalLink size={16} />
                Ir al blog
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Blog Article 1 */}
              <motion.div 
                className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-200"
                whileHover={{ y: -4 }}
              >
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-yellow-400 text-6xl font-bold">K</div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-blue-400 mb-2">Mundo KaledAcademy • 7 min. de lectura</p>
                  <h3 className="text-white font-semibold text-sm leading-tight">
                    Automatización no-code: la habilidad que cambiará tu trabajo en 2025
                  </h3>
                </div>
              </motion.div>

              {/* Blog Article 2 */}
              <motion.div 
                className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-200"
                whileHover={{ y: -4 }}
              >
                <div className="h-48 bg-yellow-400 flex items-center justify-center">
                  <div className="bg-black p-4 rounded-lg">
                    <div className="w-12 h-8 bg-yellow-400"></div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-blue-400 mb-2">Mundo KaledAcademy • 8 min. de lectura</p>
                  <h3 className="text-white font-semibold text-sm leading-tight">
                    Ciencia de datos: oportunidades laborales y salarios en 2025
                  </h3>
                </div>
              </motion.div>

              {/* Blog Article 3 */}
              <motion.div 
                className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-200"
                whileHover={{ y: -4 }}
              >
                <div className="h-48 bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center">
                  <div className="text-blue-400 text-4xl">📊</div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-blue-400 mb-2">Mundo KaledAcademy • 6 min. de lectura</p>
                  <h3 className="text-white font-semibold text-sm leading-tight">
                    7 ejemplos de dashboards en Power BI que impulsarán tu negocio
                  </h3>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-gray-900 border-l border-gray-800 p-6">
        {/* Próximos espacios */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">Próximos espacios</h3>
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Hands-on</h4>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar size={14} />
                <span>Jueves 09:00 → 11:00</span>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Lecture</h4>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar size={14} />
                <span>Jueves 11:00 → 13:00</span>
              </div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Hands-on</h4>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar size={14} />
                <span>Viernes 09:00 → 11:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Repository */}
        <div className="mb-8">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Github size={20} className="text-white" />
              <span className="text-white font-medium">Accede aquí a tu repositorio de GitHub</span>
            </div>
          </div>
        </div>

        {/* Evaluaciones */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Evaluaciones</h3>
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Proyecto integrador</h4>
              <div className="space-y-1 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Inicio: Miércoles 27/08</span>
                  <span>12:00 hs</span>
                </div>
                <div className="flex justify-between">
                  <span>Fin: Jueves 28/08</span>
                  <span>12:00 hs</span>
                </div>
              </div>
              <button className="w-full mt-3 bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 rounded-lg text-sm transition-colors">
                Dar aviso de entrega
              </button>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Checkpoint Módulo 0</h4>
              <div className="space-y-1 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Viernes 29/08</span>
                  <span>12:00 → 12:30 hs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
