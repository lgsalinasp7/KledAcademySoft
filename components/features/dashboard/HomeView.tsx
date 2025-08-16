"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Clock, 
  TrendingUp, 
  Calendar,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle,
  Play,
  Star
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { ProgressBar } from '../../ui/ProgressBar';
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface HomeViewProps {
  user: User;
  onNavigateToCareer: () => void;
  onLogout: () => void;
}

export function HomeView({ user, onNavigateToCareer, onLogout }: HomeViewProps) {
  // Datos estáticos por ahora para evitar dependencias complejas
  const progress = 25.5;
  const totalModules = 6;
  const completedModules = Math.floor((progress / 100) * totalModules);

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
            ¡Hola, {user.name}!
          </h1>
          <p className="text-gray-400 text-lg">
            Bienvenido a tu plataforma educativa de KaledAcademy
          </p>
        </motion.div>

        {/* Progress Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-yellow-400" />
                Tu Progreso
              </CardTitle>
              <CardDescription className="text-gray-400">
                Continúa tu camino hacia el éxito
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Progreso General</span>
                  <span className="text-yellow-400 font-semibold">{progress}%</span>
                </div>
                <ProgressBar percentage={progress} />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{completedModules}</div>
                    <div className="text-gray-400">Módulos Completados</div>
                  </div>
                  <div className="text-center p-3 bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">{totalModules - completedModules}</div>
                    <div className="text-gray-400">Módulos Restantes</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={onNavigateToCareer}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Carrera Full Stack</CardTitle>
              <BookOpen className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Full Stack 3.0</div>
              <p className="text-xs text-gray-400">Continúa tu aprendizaje</p>
              <div className="mt-2">
                <span className="text-sm text-yellow-400">Completado: {progress}%</span>
                <ProgressBar percentage={progress} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Próxima Clase</CardTitle>
              <Clock className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Hoy 18:00</div>
              <p className="text-xs text-gray-400">React Hooks Avanzados</p>
              <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700 text-white">
                <Play className="mr-1 h-3 w-3" />
                Unirse
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Repositorio</CardTitle>
              <Github className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">GitHub</div>
              <p className="text-xs text-gray-400">Accede a tu código</p>
              <Button size="sm" variant="outline" className="mt-2 border-green-600 text-green-400 hover:bg-green-600 hover:text-white">
                <ExternalLink className="mr-1 h-3 w-3" />
                Ver
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Blog Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Star className="mr-2 h-5 w-5 text-yellow-400" />
                KaledAcademy Blog
              </CardTitle>
              <CardDescription className="text-gray-400">
                Te presentamos las últimas noticias del mundo tech
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg">
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold text-sm">K</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
                      <span>Mundo KaledAcademy</span>
                      <span>•</span>
                      <span>7 min. de lectura</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">
                      Automatización no-code: la habilidad que cambiará tu trabajo en 2025
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Descubre cómo las herramientas no-code están revolucionando el desarrollo de software...
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg">
                  <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">📊</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
                      <span>Mundo KaledAcademy</span>
                      <span>•</span>
                      <span>8 min. de lectura</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">
                      Ciencia de datos: oportunidades laborales y salarios en 2025
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Análisis completo del mercado laboral en ciencia de datos...
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-gray-800 rounded-lg">
                  <div className="w-12 h-12 bg-purple-400 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">📈</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 text-sm text-gray-400 mb-1">
                      <span>Mundo KaledAcademy</span>
                      <span>•</span>
                      <span>6 min. de lectura</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">
                      7 ejemplos de dashboards en Power BI que impulsarán tu negocio
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Casos de uso reales de dashboards empresariales...
                    </p>
                  </div>
                </div>

                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Ir al blog
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Sessions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-400" />
                Próximos Espacios
              </CardTitle>
              <CardDescription className="text-gray-400">
                Tu agenda de esta semana
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <Play className="text-white h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Hands-on</h4>
                      <p className="text-gray-400 text-sm">Jueves 09:00 → 11:00</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white">
                    Unirse
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="text-white h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Lecture</h4>
                      <p className="text-gray-400 text-sm">Jueves 11:00 → 13:00</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                    Unirse
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                      <Play className="text-white h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Hands-on</h4>
                      <p className="text-gray-400 text-sm">Viernes 09:00 → 11:00</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white">
                    Unirse
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* GitHub Repository */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Github className="h-8 w-8 text-green-400" />
                  <div>
                    <h3 className="text-white font-semibold">Repositorio de GitHub</h3>
                    <p className="text-gray-400 text-sm">Accede aquí a tu repositorio de GitHub</p>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Acceder
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Evaluations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-yellow-400" />
                Evaluaciones
              </CardTitle>
              <CardDescription className="text-gray-400">
                Próximas entregas y checkpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Proyecto Integrador</h4>
                  <p className="text-gray-400 text-sm mb-3">
                    Inicio: Miércoles 27/08 12:00 hs<br/>
                    Fin: Jueves 28/08 12:00 hs
                  </p>
                  <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-black">
                    Dar aviso de entrega
                  </Button>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Checkpoint Módulo 0</h4>
                  <p className="text-gray-400 text-sm">
                    Viernes 29/08 12:00 → 12:30 hs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
