'use client';

import { useAuthStore } from '@/stores/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function TeacherDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();

  // Datos mock para el profesor
  const teacherData = {
    name: user?.name || 'Profesor',
    email: user?.email || 'teacher@gmail.com',
    totalStudents: 45,
    activeCourses: 3,
    pendingEvaluations: 12,
    upcomingClasses: 5,
    recentActivity: [
      { type: 'evaluation', message: 'Evaluación completada: Módulo 2 - JavaScript', time: '2 horas' },
      { type: 'message', message: 'Nuevo mensaje de Laura Martínez', time: '4 horas' },
      { type: 'progress', message: 'Juan Pérez completó la lección 5', time: '6 horas' },
      { type: 'class', message: 'Clase programada: React Hooks', time: 'Mañana 9:00 AM' },
    ],
    courses: [
      { id: 1, name: 'Full Stack Development', students: 18, progress: 75 },
      { id: 2, name: 'JavaScript Avanzado', students: 15, progress: 60 },
      { id: 3, name: 'React Fundamentals', students: 12, progress: 45 },
    ],
    upcomingClasses: [
      { id: 1, course: 'Full Stack Development', topic: 'React Hooks', time: 'Mañana 9:00 AM', students: 18 },
      { id: 2, course: 'JavaScript Avanzado', topic: 'Async/Await', time: 'Mañana 11:00 AM', students: 15 },
      { id: 3, course: 'React Fundamentals', topic: 'State Management', time: 'Tarde 2:00 PM', students: 12 },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Bienvenido, {teacherData.name}
        </h1>
        <p className="text-gray-600">
          Panel de control para profesores - Gestiona tus cursos y estudiantes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Estudiantes</p>
                <p className="text-2xl font-bold text-gray-900">{teacherData.totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cursos Activos</p>
                <p className="text-2xl font-bold text-gray-900">{teacherData.activeCourses}</p>
              </div>
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Evaluaciones Pendientes</p>
                <p className="text-2xl font-bold text-gray-900">{teacherData.pendingEvaluations}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Próximas Clases</p>
                <p className="text-2xl font-bold text-gray-900">{teacherData.upcomingClasses}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cursos */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Mis Cursos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacherData.courses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{course.name}</h3>
                      <p className="text-sm text-gray-600">{course.students} estudiantes</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{course.progress}%</p>
                        <p className="text-xs text-gray-600">Progreso</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => router.push(`/teacher/courses/${course.id}`)}
                      >
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Próximas Clases */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Próximas Clases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teacherData.upcomingClasses.map((classItem) => (
                  <div key={classItem.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {classItem.time}
                      </Badge>
                      <span className="text-xs text-gray-600">{classItem.students} estudiantes</span>
                    </div>
                    <h4 className="font-medium text-sm text-gray-900">{classItem.topic}</h4>
                    <p className="text-xs text-gray-600">{classItem.course}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actividad Reciente */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {teacherData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1">
                      {activity.type === 'evaluation' && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {activity.type === 'message' && <MessageSquare className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'progress' && <BarChart3 className="h-4 w-4 text-purple-600" />}
                      {activity.type === 'class' && <Clock className="h-4 w-4 text-orange-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center gap-2"
                onClick={() => router.push('/teacher/courses')}
              >
                <BookOpen className="h-6 w-6" />
                <span className="text-sm">Gestionar Cursos</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center gap-2"
                onClick={() => router.push('/teacher/students')}
              >
                <Users className="h-6 w-6" />
                <span className="text-sm">Ver Estudiantes</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center gap-2"
                onClick={() => router.push('/teacher/evaluations')}
              >
                <CheckCircle className="h-6 w-6" />
                <span className="text-sm">Evaluaciones</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center gap-2"
                onClick={() => router.push('/teacher/messages')}
              >
                <MessageSquare className="h-6 w-6" />
                <span className="text-sm">Mensajes</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
