'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  MessageSquare, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface TeacherStats {
  totalCourses: number;
  activeStudents: number;
  pendingEvaluations: number;
  unreadMessages: number;
  thisWeekClasses: number;
  completedLessons: number;
}

interface RecentActivity {
  id: string;
  type: 'evaluation' | 'message' | 'lesson' | 'assignment';
  title: string;
  description: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'urgent';
}

interface TeacherDashboardViewProps {
  stats?: TeacherStats;
  recentActivity?: RecentActivity[];
  onNavigateToCourses?: () => void;
  onNavigateToStudents?: () => void;
  onNavigateToEvaluations?: () => void;
  onNavigateToMessages?: () => void;
}

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({
  stats = {
    totalCourses: 4,
    activeStudents: 127,
    pendingEvaluations: 8,
    unreadMessages: 12,
    thisWeekClasses: 15,
    completedLessons: 23
  },
  recentActivity = [
    {
      id: '1',
      type: 'evaluation',
      title: 'Evaluación de Matemáticas',
      description: 'Evaluación pendiente para el curso de Álgebra Avanzada',
      timestamp: 'Hace 2 horas',
      status: 'urgent'
    },
    {
      id: '2',
      type: 'message',
      title: 'Consulta de estudiante',
      description: 'María García preguntó sobre el tema de derivadas',
      timestamp: 'Hace 4 horas',
      status: 'pending'
    },
    {
      id: '3',
      type: 'lesson',
      title: 'Lección completada',
      description: 'Lección 5: Integrales definidas completada',
      timestamp: 'Ayer',
      status: 'completed'
    }
  ],
  onNavigateToCourses,
  onNavigateToStudents,
  onNavigateToEvaluations,
  onNavigateToMessages
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'evaluation':
        return <CheckCircle className="h-4 w-4" />;
      case 'message':
        return <MessageSquare className="h-4 w-4" />;
      case 'lesson':
        return <BookOpen className="h-4 w-4" />;
      case 'assignment':
        return <Clock className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard del Profesor</h1>
          <p className="text-gray-600 mt-1">Bienvenido de vuelta, aquí tienes un resumen de tu actividad</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onNavigateToCourses}>
            <BookOpen className="h-4 w-4 mr-2" />
            Ver Cursos
          </Button>
          <Button variant="outline" onClick={onNavigateToStudents}>
            <Users className="h-4 w-4 mr-2" />
            Ver Estudiantes
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos Activos</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              +2 desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estudiantes Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeStudents}</div>
            <p className="text-xs text-muted-foreground">
              +12 esta semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Evaluaciones Pendientes</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingEvaluations}</div>
            <p className="text-xs text-muted-foreground">
              Requieren atención
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mensajes Sin Leer</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unreadMessages}</div>
            <p className="text-xs text-muted-foreground">
              De estudiantes y padres
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clases Esta Semana</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisWeekClasses}</div>
            <p className="text-xs text-muted-foreground">
              Programadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lecciones Completadas</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedLessons}</div>
            <p className="text-xs text-muted-foreground">
              Este mes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {activity.description}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(activity.status)}>
                    {activity.status === 'urgent' ? 'Urgente' : 
                     activity.status === 'pending' ? 'Pendiente' : 'Completado'}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {activity.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={onNavigateToEvaluations}
            >
              <CheckCircle className="h-6 w-6" />
              <span>Evaluaciones</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={onNavigateToMessages}
            >
              <MessageSquare className="h-6 w-6" />
              <span>Mensajes</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={onNavigateToCourses}
            >
              <BookOpen className="h-6 w-6" />
              <span>Crear Lección</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col items-center justify-center space-y-2"
              onClick={onNavigateToStudents}
            >
              <Users className="h-6 w-6" />
              <span>Gestionar Estudiantes</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
