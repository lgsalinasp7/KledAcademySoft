import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  Activity,
  Target,
  Award
} from 'lucide-react';
import { User } from '../../../types';

interface AdminDashboardProps {
  user: User;
}

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  color: 'blue' | 'green' | 'yellow' | 'purple';
}

function StatsCard({ title, value, change, icon: Icon, color }: StatsCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600', 
    yellow: 'from-yellow-500 to-yellow-600',
    purple: 'from-purple-500 to-purple-600'
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <div className="flex items-center mt-2">
            <span className={`text-sm font-medium ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
            <span className="text-sm text-gray-500 ml-2">vs mes anterior</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-r ${colorClasses[color]}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </motion.div>
  );
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const stats = [
    { title: 'Estudiantes Activos', value: 1247, change: 12, icon: Users, color: 'blue' as const },
    { title: 'Cursos Disponibles', value: 8, change: 25, icon: GraduationCap, color: 'green' as const },
    { title: 'Lecciones Completadas', value: '15.2k', change: 8, icon: BookOpen, color: 'yellow' as const },
    { title: 'Tasa de Graduación', value: '87%', change: 5, icon: Award, color: 'purple' as const }
  ];

  const recentActivity = [
    { type: 'course', message: 'Nuevo curso "React Avanzado" creado', time: '2 horas', user: 'Prof. García' },
    { type: 'student', message: '24 nuevos estudiantes registrados', time: '4 horas', user: 'Sistema' },
    { type: 'completion', message: 'Cohorte FS-Jan25 completó Módulo 2', time: '6 horas', user: 'Automático' },
    { type: 'teacher', message: 'Prof. López se unió como instructor', time: '1 día', user: 'Admin' }
  ];

  const upcomingEvents = [
    { title: 'Inicio Cohorte FS-Mar25', date: '2025-03-01', time: '19:00', type: 'cohort' },
    { title: 'Checkpoint M1 - Data Science', date: '2025-01-20', time: '20:00', type: 'evaluation' },
    { title: 'Reunión de Profesores', date: '2025-01-18', time: '15:00', type: 'meeting' },
    { title: 'Demo Day UX/UI', date: '2025-01-25', time: '18:00', type: 'event' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          ¡Bienvenido, {user.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-blue-100">
          Aquí tienes un resumen de la actividad en KaledAcademy
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Actividad Reciente</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Ver todo
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const getIcon = () => {
                switch (activity.type) {
                  case 'course': return <GraduationCap size={16} className="text-blue-500" />;
                  case 'student': return <Users size={16} className="text-green-500" />;
                  case 'completion': return <Target size={16} className="text-yellow-500" />;
                  case 'teacher': return <Award size={16} className="text-purple-500" />;
                  default: return <Activity size={16} className="text-gray-500" />;
                }
              };

              return (
                <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="mt-0.5">{getIcon()}</div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Por {activity.user} • hace {activity.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Próximos Eventos</h3>
            <Calendar size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => {
              const getTypeColor = () => {
                switch (event.type) {
                  case 'cohort': return 'bg-blue-100 text-blue-700';
                  case 'evaluation': return 'bg-red-100 text-red-700';
                  case 'meeting': return 'bg-purple-100 text-purple-700';
                  case 'event': return 'bg-green-100 text-green-700';
                  default: return 'bg-gray-100 text-gray-700';
                }
              };

              return (
                <div key={index} className="border-l-4 border-blue-200 pl-4 py-2">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor()}`}>
                      {event.type}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(event.date).toLocaleDateString('es-ES', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })} a las {event.time}
                  </p>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-medium py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
            Ver calendario completo
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Crear Curso', icon: GraduationCap, color: 'blue' },
            { label: 'Nuevo Cohorte', icon: Users, color: 'green' },
            { label: 'Agregar Lección', icon: BookOpen, color: 'yellow' },
            { label: 'Invitar Usuario', icon: Award, color: 'purple' }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
              >
                <Icon size={24} className={`text-${action.color}-500 mb-2`} />
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
