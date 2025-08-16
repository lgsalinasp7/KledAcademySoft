"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, BookOpen, DollarSign, Target, Calendar, Download, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AnalyticsManagementProps {
  user: User;
}

interface AnalyticsData {
  overview: {
    totalStudents: number;
    activeCourses: number;
    totalRevenue: number;
    completionRate: number;
  };
  trends: {
    studentGrowth: number;
    revenueGrowth: number;
    courseCompletion: number;
    engagementRate: number;
  };
  topCourses: Array<{
    id: string;
    name: string;
    students: number;
    revenue: number;
    completionRate: number;
  }>;
  monthlyData: Array<{
    month: string;
    students: number;
    revenue: number;
    completions: number;
  }>;
}

const mockAnalyticsData: AnalyticsData = {
  overview: {
    totalStudents: 1247,
    activeCourses: 8,
    totalRevenue: 2845000,
    completionRate: 87
  },
  trends: {
    studentGrowth: 23.5,
    revenueGrowth: 18.2,
    courseCompletion: 12.8,
    engagementRate: 94.3
  },
  topCourses: [
    {
      id: '1',
      name: 'Full Stack Web Development',
      students: 342,
      revenue: 855000,
      completionRate: 89
    },
    {
      id: '2',
      name: 'Data Science & Analytics',
      students: 298,
      revenue: 894000,
      completionRate: 92
    },
    {
      id: '3',
      name: 'UX/UI Design Bootcamp',
      students: 156,
      revenue: 280800,
      completionRate: 85
    }
  ],
  monthlyData: [
    { month: 'Ene', students: 120, revenue: 300000, completions: 45 },
    { month: 'Feb', students: 145, revenue: 362500, completions: 52 },
    { month: 'Mar', students: 168, revenue: 420000, completions: 61 },
    { month: 'Abr', students: 189, revenue: 472500, completions: 68 },
    { month: 'May', students: 203, revenue: 507500, completions: 73 },
    { month: 'Jun', students: 218, revenue: 545000, completions: 78 }
  ]
};

export function AnalyticsManagement({ user }: AnalyticsManagementProps) {
  const [data, setData] = useState<AnalyticsData>(mockAnalyticsData);
  const [timeRange, setTimeRange] = useState('6m');
  const [activeTab, setActiveTab] = useState('overview');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getTrendIcon = (value: number) => {
    if (value > 0) return <TrendingUp className="h-4 w-4 text-green-400" />;
    if (value < 0) return <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />;
    return <Target className="h-4 w-4 text-gray-400" />;
  };

  const getTrendColor = (value: number) => {
    if (value > 0) return 'text-green-400';
    if (value < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  return (
    <div className="flex-1 bg-black p-6 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Analytics y Reportes
              </h1>
              <p className="text-gray-400 text-lg">
                Métricas detalladas sobre rendimiento y engagement
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 bg-gray-900 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Mes</SelectItem>
                  <SelectItem value="3m">3 Meses</SelectItem>
                  <SelectItem value="6m">6 Meses</SelectItem>
                  <SelectItem value="1y">1 Año</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-gray-700 text-white">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Overview Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Total Estudiantes</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{data.overview.totalStudents.toLocaleString()}</div>
              <div className="flex items-center gap-1 mt-1">
                {getTrendIcon(data.trends.studentGrowth)}
                <span className={`text-xs ${getTrendColor(data.trends.studentGrowth)}`}>
                  +{data.trends.studentGrowth}% vs mes anterior
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Cursos Activos</CardTitle>
              <BookOpen className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{data.overview.activeCourses}</div>
              <p className="text-xs text-gray-400 mt-1">Cursos en progreso</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Ingresos Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatCurrency(data.overview.totalRevenue)}</div>
              <div className="flex items-center gap-1 mt-1">
                {getTrendIcon(data.trends.revenueGrowth)}
                <span className={`text-xs ${getTrendColor(data.trends.revenueGrowth)}`}>
                  +{data.trends.revenueGrowth}% vs mes anterior
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Tasa de Completado</CardTitle>
              <Target className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{data.overview.completionRate}%</div>
              <div className="flex items-center gap-1 mt-1">
                {getTrendIcon(data.trends.courseCompletion)}
                <span className={`text-xs ${getTrendColor(data.trends.courseCompletion)}`}>
                  +{data.trends.courseCompletion}% vs mes anterior
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Analytics Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-900 border-gray-700">
              <TabsTrigger value="overview" className="text-white">Resumen</TabsTrigger>
              <TabsTrigger value="courses" className="text-white">Cursos</TabsTrigger>
              <TabsTrigger value="trends" className="text-white">Tendencias</TabsTrigger>
              <TabsTrigger value="reports" className="text-white">Reportes</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Engagement Chart */}
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-400" />
                      Engagement de Estudiantes
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Actividad mensual de estudiantes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data.monthlyData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-white text-sm">{item.month}</span>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                              <span className="text-gray-400 text-sm">{item.students}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                              <span className="text-gray-400 text-sm">{item.completions}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Revenue Chart */}
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-400" />
                      Ingresos Mensuales
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Evolución de ingresos por mes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data.monthlyData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-white text-sm">{item.month}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                            <span className="text-gray-400 text-sm">{formatCurrency(item.revenue)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="mt-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-400" />
                    Top Cursos por Rendimiento
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Cursos con mejor rendimiento y engagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.topCourses.map((course, index) => (
                      <div key={course.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{course.name}</h4>
                            <p className="text-gray-400 text-sm">{course.students} estudiantes</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-white font-medium">{formatCurrency(course.revenue)}</p>
                            <p className="text-gray-400 text-sm">Ingresos</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">{course.completionRate}%</p>
                            <p className="text-gray-400 text-sm">Completado</p>
                          </div>
                          <Badge variant="outline" className="border-green-500 text-green-400">
                            Activo
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Trends Tab */}
            <TabsContent value="trends" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-400" />
                      Crecimiento de Estudiantes
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Tasa de crecimiento mensual
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">+{data.trends.studentGrowth}%</div>
                    <p className="text-gray-400 text-sm">Crecimiento vs mes anterior</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Meta anual:</span>
                        <span className="text-white">25%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progreso:</span>
                        <span className="text-green-400">94%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-400" />
                      Crecimiento de Ingresos
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Tasa de crecimiento de ingresos
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-white mb-2">+{data.trends.revenueGrowth}%</div>
                    <p className="text-gray-400 text-sm">Crecimiento vs mes anterior</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Meta anual:</span>
                        <span className="text-white">20%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Progreso:</span>
                        <span className="text-green-400">91%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="mt-6">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-400" />
                    Reportes Disponibles
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Genera y descarga reportes detallados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: 'Reporte de Estudiantes', icon: Users, desc: 'Análisis detallado de estudiantes' },
                      { title: 'Reporte de Cursos', icon: BookOpen, desc: 'Rendimiento de cursos' },
                      { title: 'Reporte Financiero', icon: DollarSign, desc: 'Análisis de ingresos y gastos' },
                      { title: 'Reporte de Engagement', icon: Target, desc: 'Métricas de engagement' },
                      { title: 'Reporte de Retención', icon: TrendingUp, desc: 'Análisis de retención' },
                      { title: 'Reporte de Completado', icon: Calendar, desc: 'Tasas de completado' }
                    ].map((report, index) => (
                      <div key={index} className="p-4 bg-gray-800 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-3 mb-3">
                          <report.icon className="h-5 w-5 text-blue-400" />
                          <h4 className="text-white font-medium">{report.title}</h4>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{report.desc}</p>
                        <Button size="sm" variant="outline" className="w-full border-gray-600 text-white">
                          <Download className="h-4 w-4 mr-2" />
                          Generar
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
