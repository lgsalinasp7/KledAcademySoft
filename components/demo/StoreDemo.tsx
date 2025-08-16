"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useApp } from '@/hooks/useApp';
import { useProgressOptimized } from '@/hooks/useProgressOptimized';
import { 
  Users, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Zap,
  Database,
  Layers
} from 'lucide-react';

export function StoreDemo() {
  const { 
    currentUser, 
    isAdmin, 
    isTeacher, 
    isStudent,
    currentView,
    overallProgress,
    isLoading,
    hasError,
    errorMessage,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    goToHome,
    goToContent,
    goToAdmin,
    toggleTheme
  } = useApp();

  const {
    progress,
    getCurrentModuleProgress,
    getCompletedLessonsCount,
    getTotalLessonsCount,
    isCurrentLessonCompleted,
    completeCurrentLesson
  } = useProgressOptimized();

  const handleTestNotifications = () => {
    showSuccess('¡Operación exitosa!');
    setTimeout(() => showError('Algo salió mal'), 1000);
    setTimeout(() => showWarning('Ten cuidado con esto'), 2000);
    setTimeout(() => showInfo('Información importante'), 3000);
  };

  const handleTestProgress = () => {
    completeCurrentLesson();
    showSuccess('Lección completada');
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-2">
          🚀 Demo: Arquitectura Optimizada de Zustand
        </h1>
        <p className="text-gray-400">
          Demostración de la nueva implementación optimizada
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Estado del Usuario */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-400" />
              Estado del Usuario
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="text-gray-400">Usuario: <span className="text-white">{currentUser?.name}</span></p>
              <p className="text-gray-400">Email: <span className="text-white">{currentUser?.email}</span></p>
              <p className="text-gray-400">Rol: <span className="text-white">{currentUser?.role}</span></p>
            </div>
            <div className="flex gap-2">
              {isAdmin && <span className="px-2 py-1 bg-red-900 text-red-300 text-xs rounded">Admin</span>}
              {isTeacher && <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded">Teacher</span>}
              {isStudent && <span className="px-2 py-1 bg-blue-900 text-blue-300 text-xs rounded">Student</span>}
            </div>
          </CardContent>
        </Card>

        {/* Estado de la Aplicación */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="mr-2 h-5 w-5 text-yellow-400" />
              Estado de la App
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="text-gray-400">Vista Actual: <span className="text-white">{currentView}</span></p>
              <p className="text-gray-400">Cargando: <span className={isLoading ? 'text-yellow-400' : 'text-green-400'}>{isLoading ? 'Sí' : 'No'}</span></p>
              <p className="text-gray-400">Error: <span className={hasError ? 'text-red-400' : 'text-green-400'}>{hasError ? 'Sí' : 'No'}</span></p>
            </div>
            {hasError && (
              <p className="text-red-400 text-xs">{errorMessage}</p>
            )}
          </CardContent>
        </Card>

        {/* Progreso */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
              Progreso
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="text-gray-400">Progreso General: <span className="text-white">{overallProgress.toFixed(1)}%</span></p>
              <p className="text-gray-400">Lecciones Completadas: <span className="text-white">{getCompletedLessonsCount()}</span></p>
              <p className="text-gray-400">Total Lecciones: <span className="text-white">{getTotalLessonsCount()}</span></p>
            </div>
            <ProgressBar percentage={overallProgress} />
          </CardContent>
        </Card>

        {/* Datos del Store */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Database className="mr-2 h-5 w-5 text-purple-400" />
              Datos del Store
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <p className="text-gray-400">Progreso Cargado: <span className={progress ? 'text-green-400' : 'text-red-400'}>{progress ? 'Sí' : 'No'}</span></p>
              <p className="text-gray-400">Progreso del Módulo: <span className="text-white">{getCurrentModuleProgress().toFixed(1)}%</span></p>
              <p className="text-gray-400">Lección Actual Completada: <span className={isCurrentLessonCompleted() ? 'text-green-400' : 'text-red-400'}>{isCurrentLessonCompleted() ? 'Sí' : 'No'}</span></p>
            </div>
          </CardContent>
        </Card>

        {/* Acciones */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Layers className="mr-2 h-5 w-5 text-cyan-400" />
              Acciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                size="sm" 
                onClick={goToHome}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Home
              </Button>
              <Button 
                size="sm" 
                onClick={goToContent}
                className="bg-green-600 hover:bg-green-700"
              >
                Content
              </Button>
              <Button 
                size="sm" 
                onClick={goToAdmin}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Admin
              </Button>
              <Button 
                size="sm" 
                onClick={toggleTheme}
                className="bg-gray-600 hover:bg-gray-700"
              >
                Theme
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notificaciones */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-orange-400" />
              Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              size="sm" 
              onClick={handleTestNotifications}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              Probar Notificaciones
            </Button>
            <Button 
              size="sm" 
              onClick={handleTestProgress}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Completar Lección
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Información Técnica */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Información Técnica</CardTitle>
          <CardDescription className="text-gray-400">
            Optimizaciones implementadas en la arquitectura de Zustand
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-2">✅ Optimizaciones Implementadas:</h4>
              <ul className="text-gray-400 space-y-1">
                <li>• Selectores granulares para evitar re-renders</li>
                <li>• Middleware de desarrollo (devtools)</li>
                <li>• Persistencia selectiva de datos</li>
                <li>• Computed properties optimizadas</li>
                <li>• Hooks personalizados unificados</li>
                <li>• Sistema de notificaciones global</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">🚀 Beneficios:</h4>
              <ul className="text-gray-400 space-y-1">
                <li>• Mejor performance de renderizado</li>
                <li>• Código más mantenible</li>
                <li>• API unificada y simple</li>
                <li>• Debugging mejorado</li>
                <li>• Estado persistente</li>
                <li>• Arquitectura escalable</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
