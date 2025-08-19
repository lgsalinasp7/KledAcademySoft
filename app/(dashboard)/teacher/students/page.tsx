'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Search, 
  Mail, 
  MessageSquare, 
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter
} from 'lucide-react';

export default function TeacherStudents() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');

  // Datos mock de estudiantes
  const students = [
    {
      id: 1,
      name: 'Laura Martínez',
      email: 'laura.martinez@email.com',
      course: 'Full Stack Development',
      progress: 85,
      status: 'active',
      lastActivity: '2 horas',
      completedLessons: 24,
      totalLessons: 32,
      evaluations: 3,
      averageScore: 92,
      nextClass: 'Mañana 9:00 AM'
    },
    {
      id: 2,
      name: 'Juan Pérez',
      email: 'juan.perez@email.com',
      course: 'JavaScript Avanzado',
      progress: 72,
      status: 'active',
      lastActivity: '4 horas',
      completedLessons: 18,
      totalLessons: 25,
      evaluations: 2,
      averageScore: 88,
      nextClass: 'Mañana 11:00 AM'
    },
    {
      id: 3,
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      course: 'React Fundamentals',
      progress: 45,
      status: 'active',
      lastActivity: '6 horas',
      completedLessons: 12,
      totalLessons: 28,
      evaluations: 1,
      averageScore: 85,
      nextClass: 'Tarde 2:00 PM'
    },
    {
      id: 4,
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      course: 'Full Stack Development',
      progress: 95,
      status: 'active',
      lastActivity: '1 día',
      completedLessons: 30,
      totalLessons: 32,
      evaluations: 3,
      averageScore: 96,
      nextClass: 'Mañana 9:00 AM'
    },
    {
      id: 5,
      name: 'Ana Silva',
      email: 'ana.silva@email.com',
      course: 'Node.js Backend',
      progress: 30,
      status: 'inactive',
      lastActivity: '3 días',
      completedLessons: 6,
      totalLessons: 20,
      evaluations: 0,
      averageScore: 78,
      nextClass: 'Pendiente'
    }
  ];

  const courses = [
    { id: 'all', name: 'Todos los cursos' },
    { id: 'fullstack', name: 'Full Stack Development' },
    { id: 'javascript', name: 'JavaScript Avanzado' },
    { id: 'react', name: 'React Fundamentals' },
    { id: 'nodejs', name: 'Node.js Backend' }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'all' || 
                         student.course.toLowerCase().includes(selectedCourse.toLowerCase());
    return matchesSearch && matchesCourse;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Mis Estudiantes
            </h1>
            <p className="text-gray-600">
              Gestiona y monitorea el progreso de tus estudiantes
            </p>
          </div>
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => router.push('/teacher/students/export')}
          >
            <BarChart3 className="h-4 w-4" />
            Exportar Reporte
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar estudiantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Estudiantes</p>
                <p className="text-2xl font-bold text-gray-900">{students.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Estudiantes Activos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.filter(s => s.status === 'active').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Promedio de Progreso</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)}%
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
                <p className="text-sm font-medium text-gray-600">Evaluaciones Pendientes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {students.reduce((sum, s) => sum + s.evaluations, 0)}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Estudiantes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Estudiante</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Curso</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Progreso</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Última Actividad</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-600">{student.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-sm text-gray-900">{student.course}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className={getProgressColor(student.progress)}>
                            {student.progress}%
                          </span>
                          <span className="text-gray-600">
                            {student.completedLessons}/{student.totalLessons}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              student.progress >= 80 ? 'bg-green-600' :
                              student.progress >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                            }`}
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(student.status)}>
                        {student.status === 'active' ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm text-gray-900">{student.lastActivity}</p>
                        <p className="text-xs text-gray-600">Próxima: {student.nextClass}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => router.push(`/teacher/students/${student.id}`)}
                        >
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => router.push(`/teacher/students/${student.id}/messages`)}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => router.push(`/teacher/students/${student.id}/evaluations`)}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No se encontraron estudiantes
              </h3>
              <p className="text-gray-600">
                {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay estudiantes registrados en este curso'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
