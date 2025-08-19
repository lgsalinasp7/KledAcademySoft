'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Search, 
  Plus,
  Edit,
  Eye,
  MessageSquare
} from 'lucide-react';

export default function TeacherCourses() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Datos mock de cursos
  const courses = [
    {
      id: 1,
      name: 'Full Stack Development',
      description: 'Desarrollo web completo con React, Node.js y MongoDB',
      students: 18,
      progress: 75,
      status: 'active',
      nextClass: 'Mañana 9:00 AM',
      evaluations: 3,
      modules: 8,
      lastActivity: '2 horas'
    },
    {
      id: 2,
      name: 'JavaScript Avanzado',
      description: 'Programación avanzada en JavaScript y ES6+',
      students: 15,
      progress: 60,
      status: 'active',
      nextClass: 'Mañana 11:00 AM',
      evaluations: 2,
      modules: 6,
      lastActivity: '4 horas'
    },
    {
      id: 3,
      name: 'React Fundamentals',
      description: 'Fundamentos de React y desarrollo de componentes',
      students: 12,
      progress: 45,
      status: 'active',
      nextClass: 'Tarde 2:00 PM',
      evaluations: 1,
      modules: 5,
      lastActivity: '6 horas'
    },
    {
      id: 4,
      name: 'Node.js Backend',
      description: 'Desarrollo de APIs y servidores con Node.js',
      students: 8,
      progress: 30,
      status: 'draft',
      nextClass: 'Pendiente',
      evaluations: 0,
      modules: 4,
      lastActivity: '1 día'
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Mis Cursos
            </h1>
            <p className="text-gray-600">
              Gestiona tus cursos y contenido educativo
            </p>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => router.push('/teacher/courses/new')}
          >
            <Plus className="h-4 w-4" />
            Nuevo Curso
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cursos</p>
                <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Estudiantes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.reduce((sum, course) => sum + course.students, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cursos Activos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.filter(c => c.status === 'active').length}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Evaluaciones</p>
                <p className="text-2xl font-bold text-gray-900">
                  {courses.reduce((sum, course) => sum + course.evaluations, 0)}
                </p>
              </div>
              <MessageSquare className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{course.name}</CardTitle>
                  <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                  <Badge className={getStatusColor(course.status)}>
                    {course.status === 'active' ? 'Activo' : 
                     course.status === 'draft' ? 'Borrador' : 'Completado'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Estudiantes</p>
                    <p className="font-semibold">{course.students}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Progreso</p>
                    <p className="font-semibold">{course.progress}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Módulos</p>
                    <p className="font-semibold">{course.modules}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Evaluaciones</p>
                    <p className="font-semibold">{course.evaluations}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progreso del curso</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Next Class */}
                <div className="text-sm">
                  <p className="text-gray-600">Próxima clase:</p>
                  <p className="font-medium">{course.nextClass}</p>
                </div>

                {/* Last Activity */}
                <div className="text-sm">
                  <p className="text-gray-600">Última actividad:</p>
                  <p className="font-medium">{course.lastActivity}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => router.push(`/teacher/courses/${course.id}`)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push(`/teacher/courses/${course.id}/edit`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontraron cursos
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Crea tu primer curso para comenzar'}
          </p>
          {!searchTerm && (
            <Button onClick={() => router.push('/teacher/courses/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Primer Curso
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
