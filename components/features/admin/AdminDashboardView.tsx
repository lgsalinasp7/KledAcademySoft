"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Users2, 
  BarChart3, 
  Shield, 
  TrendingUp,
  DollarSign,
  Clock
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminDashboardViewProps {
  user: User;
  onNavigateToSection: (section: string) => void;
  onLogout: () => void;
}

export function AdminDashboardView({ user, onNavigateToSection }: AdminDashboardViewProps) {
  return (
    <div className="flex-1 bg-black p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Bienvenido, {user.name}
          </h1>
          <p className="text-gray-400 text-lg">
            Panel de administración de KaledAcademy
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer" 
                onClick={() => onNavigateToSection('admin-courses')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Cursos</CardTitle>
              <BookOpen className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12</div>
              <p className="text-xs text-gray-400">Cursos activos</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => onNavigateToSection('admin-users')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Usuarios</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1,234</div>
              <p className="text-xs text-gray-400">Usuarios registrados</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => onNavigateToSection('admin-cohorts')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Cohortes</CardTitle>
              <Users2 className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">8</div>
              <p className="text-xs text-gray-400">Cohortes activas</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Ingresos</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$45,231</div>
              <p className="text-xs text-gray-400">Este mes</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Acciones Rápidas</CardTitle>
              <CardDescription className="text-gray-400">
                Gestiona la plataforma desde aquí
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => onNavigateToSection('admin-courses')}
                className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                variant="default"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Gestionar Cursos
              </Button>
              <Button
                onClick={() => onNavigateToSection('admin-users')}
                className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
                variant="default"
              >
                <Users className="mr-2 h-4 w-4" />
                Gestionar Usuarios
              </Button>
              <Button
                onClick={() => onNavigateToSection('admin-cohorts')}
                className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white"
                variant="default"
              >
                <Users2 className="mr-2 h-4 w-4" />
                Gestionar Cohortes
              </Button>
              <Button
                onClick={() => onNavigateToSection('admin-credentials')}
                className="w-full justify-start bg-orange-600 hover:bg-orange-700 text-white"
                variant="default"
              >
                <Shield className="mr-2 h-4 w-4" />
                Gestionar Credenciales
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Actividad Reciente</CardTitle>
              <CardDescription className="text-gray-400">
                Últimas actividades en la plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Nuevo curso creado</p>
                    <p className="text-xs text-gray-400">React Avanzado - hace 2 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Usuario registrado</p>
                    <p className="text-xs text-gray-400">María García - hace 4 horas</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">Cohorte iniciada</p>
                    <p className="text-xs text-gray-400">FS-Jan25 - hace 1 día</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="mr-2 h-4 w-4 text-blue-400" />
                Próximas Clases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">FS-Jan25</span>
                  <span className="text-sm text-white">Hoy 18:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">DS-Feb25</span>
                  <span className="text-sm text-white">Mañana 19:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">UX-Mar25</span>
                  <span className="text-sm text-white">Miércoles 17:00</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 text-green-400" />
                Rendimiento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Tasa de finalización</span>
                  <span className="text-sm text-green-400">95%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Satisfacción</span>
                  <span className="text-sm text-yellow-400">4.8/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Retención</span>
                  <span className="text-sm text-blue-400">87%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <DollarSign className="mr-2 h-4 w-4 text-purple-400" />
                Finanzas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Ingresos mensuales</span>
                  <span className="text-sm text-white">$45,231</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Nuevas suscripciones</span>
                  <span className="text-sm text-green-400">+23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Meta mensual</span>
                  <span className="text-sm text-yellow-400">78%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
