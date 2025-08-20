'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import {
  BookOpen,
  Clock,
  CheckCircle,
  TrendingUp,
  Calendar,
  Award
} from 'lucide-react';

export default function StudentDashboard() {
  // Datos de ejemplo para el estudiante
  const studentData = {
    name: 'Estudiante Demo',
    progress: 65,
    courses: [
      { id: 1, name: 'Matemáticas Avanzadas', progress: 75, nextClass: '2024-01-15 10:00' },
      { id: 2, name: 'Historia Mundial', progress: 45, nextClass: '2024-01-16 14:00' },
      { id: 3, name: 'Ciencias Naturales', progress: 90, nextClass: '2024-01-17 09:00' }
    ],
    upcomingAssignments: [
      { id: 1, title: 'Tarea de Matemáticas', dueDate: '2024-01-20', course: 'Matemáticas' },
      { id: 2, title: 'Ensayo de Historia', dueDate: '2024-01-25', course: 'Historia' }
    ],
    recentGrades: [
      { id: 1, assignment: 'Examen de Matemáticas', grade: 85, course: 'Matemáticas' },
      { id: 2, assignment: 'Proyecto de Ciencias', grade: 92, course: 'Ciencias' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">¡Bienvenido, {studentData.name}!</h1>
            <p className="text-gray-600 mt-1">Aquí tienes un resumen de tu progreso académico</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Ver Calendario
            </Button>
            <Button variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Mis Cursos
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Progreso General
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <ProgressBar 
                  percentage={studentData.progress} 
                  label="Progreso Total"
                  color="yellow"
                  height="md"
                />
              </div>
              <Badge variant="secondary" className="text-sm">
                {studentData.courses.length} Cursos Activos
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentData.courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{course.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{course.progress}% Completado</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <ProgressBar 
                      percentage={course.progress} 
                      label="Progreso"
                      color="blue"
                      height="sm"
                    />
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    Próxima clase: {new Date(course.nextClass).toLocaleDateString()}
                  </div>
                  <Button size="sm" className="w-full">
                    Continuar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Assignments and Recent Grades */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Assignments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Próximas Tareas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studentData.upcomingAssignments.map((assignment) => (
                  <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{assignment.title}</h4>
                      <p className="text-sm text-gray-600">{assignment.course}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-600">
                        Vence: {new Date(assignment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Grades */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Calificaciones Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studentData.recentGrades.map((grade) => (
                  <div key={grade.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{grade.assignment}</h4>
                      <p className="text-sm text-gray-600">{grade.course}</p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={grade.grade >= 90 ? "default" : grade.grade >= 80 ? "secondary" : "destructive"}
                        className="text-sm"
                      >
                        {grade.grade}/100
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
