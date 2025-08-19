'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle, 
  Clock, 
  Search, 
  Plus,
  FileText,
  Users,
  BarChart3
} from 'lucide-react';

export default function TeacherEvaluations() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Datos mock de evaluaciones
  const evaluations = [
    {
      id: 1,
      title: 'Evaluación Módulo 2 - JavaScript',
      course: 'Full Stack Development',
      students: 18,
      completed: 15,
      pending: 3,
      averageScore: 85,
      dueDate: '2024-01-25',
      status: 'active',
      type: 'quiz'
    },
    {
      id: 2,
      title: 'Proyecto Final - React App',
      course: 'React Fundamentals',
      students: 12,
      completed: 8,
      pending: 4,
      averageScore: 78,
      dueDate: '2024-01-30',
      status: 'active',
      type: 'project'
    },
    {
      id: 3,
      title: 'Examen Parcial - Node.js',
      course: 'JavaScript Avanzado',
      students: 15,
      completed: 12,
      pending: 3,
      averageScore: 92,
      dueDate: '2024-01-20',
      status: 'completed',
      type: 'exam'
    },
    {
      id: 4,
      title: 'Tarea - API REST',
      course: 'Node.js Backend',
      students: 8,
      completed: 5,
      pending: 3,
      averageScore: 88,
      dueDate: '2024-02-05',
      status: 'draft',
      type: 'assignment'
    }
  ];

  const filteredEvaluations = evaluations.filter(evaluation =>
    evaluation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evaluation.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz':
        return <FileText className="h-4 w-4" />;
      case 'project':
        return <BarChart3 className="h-4 w-4" />;
      case 'exam':
        return <CheckCircle className="h-4 w-4" />;
      case 'assignment':
        return <Clock className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Evaluaciones
            </h1>
            <p className="text-gray-600">
              Gestiona y califica las evaluaciones de tus estudiantes
            </p>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => router.push('/teacher/evaluations/new')}
          >
            <Plus className="h-4 w-4" />
            Nueva Evaluación
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar evaluaciones..."
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
                <p className="text-sm font-medium text-gray-600">Total Evaluaciones</p>
                <p className="text-2xl font-bold text-gray-900">{evaluations.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendientes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {evaluations.reduce((sum, eval) => sum + eval.pending, 0)}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completadas</p>
                <p className="text-2xl font-bold text-gray-900">
                  {evaluations.reduce((sum, eval) => sum + eval.completed, 0)}
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
                <p className="text-sm font-medium text-gray-600">Promedio</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(evaluations.reduce((sum, eval) => sum + eval.averageScore, 0) / evaluations.length)}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Evaluations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvaluations.map((evaluation) => (
          <Card key={evaluation.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{evaluation.title}</CardTitle>
                  <p className="text-sm text-gray-600 mb-3">{evaluation.course}</p>
                  <div className="flex items-center gap-2">
                    {getTypeIcon(evaluation.type)}
                    <Badge className={getStatusColor(evaluation.status)}>
                      {evaluation.status === 'active' ? 'Activa' : 
                       evaluation.status === 'completed' ? 'Completada' : 'Borrador'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Estudiantes</p>
                    <p className="font-semibold">{evaluation.students}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Completadas</p>
                    <p className="font-semibold text-green-600">{evaluation.completed}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Pendientes</p>
                    <p className="font-semibold text-yellow-600">{evaluation.pending}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Promedio</p>
                    <p className="font-semibold">{evaluation.averageScore}%</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progreso</span>
                    <span>{Math.round((evaluation.completed / evaluation.students) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(evaluation.completed / evaluation.students) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Due Date */}
                <div className="text-sm">
                  <p className="text-gray-600">Fecha límite:</p>
                  <p className="font-medium">{new Date(evaluation.dueDate).toLocaleDateString('es-ES')}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => router.push(`/teacher/evaluations/${evaluation.id}`)}
                  >
                    Ver Detalles
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push(`/teacher/evaluations/${evaluation.id}/grade`)}
                  >
                    Calificar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvaluations.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontraron evaluaciones
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Crea tu primera evaluación para comenzar'}
          </p>
          {!searchTerm && (
            <Button onClick={() => router.push('/teacher/evaluations/new')}>
              <Plus className="h-4 w-4 mr-2" />
              Crear Primera Evaluación
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
