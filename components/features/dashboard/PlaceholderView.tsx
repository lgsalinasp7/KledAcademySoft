"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Construction, Clock, Zap, Rocket, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface PlaceholderViewProps {
  currentView: string;
}

export function PlaceholderView({ currentView }: PlaceholderViewProps) {
  const getViewInfo = () => {
    switch (currentView) {
      case 'members':
        return {
          title: 'Miembros',
          description: 'Gestiona y visualiza los miembros de tu cohorte',
          icon: <Target className="h-8 w-8 text-blue-400" />,
          features: [
            'Lista de estudiantes activos',
            'Perfiles detallados',
            'Estadísticas de participación',
            'Comunicación grupal'
          ],
          progress: 65
        };
      case 'academic-data':
        return {
          title: 'Datos Académicos',
          description: 'Accede a tus calificaciones y progreso académico',
          icon: <Rocket className="h-8 w-8 text-green-400" />,
          features: [
            'Calificaciones por módulo',
            'Progreso académico',
            'Certificados de completado',
            'Historial de evaluaciones'
          ],
          progress: 80
        };
      case 'payment-management':
        return {
          title: 'Gestión de Pagos',
          description: 'Administra tus pagos y facturación',
          icon: <Zap className="h-8 w-8 text-yellow-400" />,
          features: [
            'Estado de pagos',
            'Historial de transacciones',
            'Métodos de pago',
            'Facturas y recibos'
          ],
          progress: 45
        };
      case 'kaled-x':
        return {
          title: 'KaledAcademy X',
          description: 'Funcionalidades avanzadas y experimentales',
          icon: <Rocket className="h-8 w-8 text-purple-400" />,
          features: [
            'IA para aprendizaje personalizado',
            'Gamificación avanzada',
            'Integración con herramientas externas',
            'Analytics predictivos'
          ],
          progress: 25
        };
      default:
        return {
          title: 'Sección en Desarrollo',
          description: 'Esta funcionalidad está siendo desarrollada',
          icon: <Construction className="h-8 w-8 text-gray-400" />,
          features: [
            'Funcionalidades próximas',
            'Mejoras continuas',
            'Nuevas características',
            'Optimizaciones'
          ],
          progress: 30
        };
    }
  };

  const viewInfo = getViewInfo();

  return (
    <div className="flex-1 bg-black p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-700"
          >
            {viewInfo.icon}
          </motion.div>
          
          <h1 className="text-4xl font-bold text-white mb-4">
            {viewInfo.title}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {viewInfo.description}
          </p>
        </motion.div>

        {/* Progress Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-400" />
                Estado de Desarrollo
              </CardTitle>
              <CardDescription className="text-gray-400">
                Progreso actual de la funcionalidad
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Progreso</span>
                  <span className="text-blue-400 font-bold">{viewInfo.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${viewInfo.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Construction className="h-4 w-4" />
                  <span>En desarrollo - Disponible pronto</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {viewInfo.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
            >
              <Card className="bg-gray-900 border-gray-700 h-full">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-white font-medium">{feature}</h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Rocket className="h-5 w-5 text-purple-400" />
                Próximamente
              </CardTitle>
              <CardDescription className="text-gray-400">
                Estamos trabajando para traerte la mejor experiencia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Rápido</h4>
                  <p className="text-gray-400 text-sm">Interfaz optimizada para máxima velocidad</p>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Intuitivo</h4>
                  <p className="text-gray-400 text-sm">Diseño centrado en la experiencia del usuario</p>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-white font-medium mb-2">Innovador</h4>
                  <p className="text-gray-400 text-sm">Tecnologías de vanguardia</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex justify-center gap-4 mt-8"
        >
          <Button variant="outline" className="border-gray-600 text-white">
            <Clock className="h-4 w-4 mr-2" />
            Notificarme
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Rocket className="h-4 w-4 mr-2" />
            Explorar Otras Secciones
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
