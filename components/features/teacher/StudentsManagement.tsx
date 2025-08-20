'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Users, 
  Search, 
  MessageSquare, 
  Eye, 
  TrendingUp,
  Calendar,
  BookOpen,
  Star,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  grade: string;
  courses: string[];
  progress: number;
  averageGrade: number;
  attendance: number;
  lastActive: string;
  status: 'active' | 'inactive' | 'suspended';
  enrollmentDate: string;
}

interface StudentsManagementProps {
  students?: Student[];
  onStudentView?: (id: string) => void;
  onStudentMessage?: (id: string) => void;
  onStudentGrade?: (id: string) => void;
}

export const StudentsManagement: React.FC<StudentsManagementProps> = ({
  students = [
    {
      id: '1',
      name: 'María García',
      email: 'maria.garcia@email.com',
      phone: '+34 612 345 678',
      grade: '3º ESO',
      courses: ['Matemáticas Avanzadas', 'Física Básica'],
      progress: 85,
      averageGrade: 8.5,
      attendance: 92,
      lastActive: 'Hace 2 horas',
      status: 'active',
      enrollmentDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+34 623 456 789',
      grade: '2º Bachillerato',
      courses: ['Matemáticas Avanzadas'],
      progress: 72,
      averageGrade: 7.8,
      attendance: 88,
      lastActive: 'Hace 1 día',
      status: 'active',
      enrollmentDate: '2024-01-10'
    },
    {
      id: '3',
      name: 'Ana López',
      email: 'ana.lopez@email.com',
      phone: '+34 634 567 890',
      grade: '4º ESO',
      courses: ['Física Básica', 'Historia Universal'],
      progress: 95,
      averageGrade: 9.2,
      attendance: 96,
      lastActive: 'Hace 30 minutos',
      status: 'active',
      enrollmentDate: '2024-01-05'
    },
    {
      id: '4',
      name: 'David Martín',
      email: 'david.martin@email.com',
      phone: '+34 645 678 901',
      grade: '1º Bachillerato',
      courses: ['Matemáticas Avanzadas'],
      progress: 45,
      averageGrade: 6.5,
      attendance: 75,
      lastActive: 'Hace 3 días',
      status: 'inactive',
      enrollmentDate: '2024-01-20'
    }
  ],
  onStudentView,
  onStudentMessage,
  onStudentGrade
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isStudentDetailOpen, setIsStudentDetailOpen] = useState(false);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
    const matchesGrade = gradeFilter === 'all' || student.grade === gradeFilter;
    
    return matchesSearch && matchesStatus && matchesGrade;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 9) return 'text-green-600';
    if (grade >= 7) return 'text-yellow-600';
    if (grade >= 5) return 'text-orange-600';
    return 'text-red-600';
  };

  const openStudentDetail = (student: Student) => {
    setSelectedStudent(student);
    setIsStudentDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Estudiantes</h1>
          <p className="text-gray-600 mt-1">Gestiona y monitorea el progreso de tus estudiantes</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Exportar Lista
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Buscar</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Estado</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="inactive">Inactivos</SelectItem>
                  <SelectItem value="suspended">Suspendidos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Grado</label>
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="1º ESO">1º ESO</SelectItem>
                  <SelectItem value="2º ESO">2º ESO</SelectItem>
                  <SelectItem value="3º ESO">3º ESO</SelectItem>
                  <SelectItem value="4º ESO">4º ESO</SelectItem>
                  <SelectItem value="1º Bachillerato">1º Bachillerato</SelectItem>
                  <SelectItem value="2º Bachillerato">2º Bachillerato</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                Limpiar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold">{student.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{student.grade}</p>
                </div>
                <Badge className={getStatusColor(student.status)}>
                  {student.status === 'active' ? 'Activo' : 
                   student.status === 'inactive' ? 'Inactivo' : 'Suspendido'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-2" />
                  {student.email}
                </div>
                {student.phone && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="h-4 w-4 mr-2" />
                    {student.phone}
                  </div>
                )}
                <div className="flex items-center text-sm text-gray-500">
                  <BookOpen className="h-4 w-4 mr-2" />
                  {student.courses.length} cursos
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Progreso</span>
                  <span className={`text-sm font-medium ${getProgressColor(student.progress)}`}>
                    {student.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${student.progress >= 80 ? 'bg-green-500' : 
                                 student.progress >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${student.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className={`text-lg font-bold ${getGradeColor(student.averageGrade)}`}>
                    {student.averageGrade}
                  </div>
                  <div className="text-xs text-gray-500">Promedio</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {student.attendance}%
                  </div>
                  <div className="text-xs text-gray-500">Asistencia</div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openStudentDetail(student)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onStudentMessage?.(student.id)}
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Mensaje
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onStudentGrade?.(student.id)}
                >
                  <Star className="h-4 w-4 mr-1" />
                  Calificar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Student Detail Dialog */}
      <Dialog open={isStudentDetailOpen} onOpenChange={setIsStudentDetailOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Detalles del Estudiante</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nombre</label>
                  <p className="text-lg font-semibold">{selectedStudent.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Grado</label>
                  <p className="text-lg">{selectedStudent.grade}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-sm">{selectedStudent.email}</p>
                </div>
                {selectedStudent.phone && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Teléfono</label>
                    <p className="text-sm">{selectedStudent.phone}</p>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold ${getProgressColor(selectedStudent.progress)}`}>
                    {selectedStudent.progress}%
                  </div>
                  <div className="text-sm text-gray-500">Progreso General</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className={`text-2xl font-bold ${getGradeColor(selectedStudent.averageGrade)}`}>
                    {selectedStudent.averageGrade}
                  </div>
                  <div className="text-sm text-gray-500">Promedio</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedStudent.attendance}%
                  </div>
                  <div className="text-sm text-gray-500">Asistencia</div>
                </div>
              </div>

              {/* Courses */}
              <div>
                <label className="text-sm font-medium text-gray-500">Cursos Inscritos</label>
                <div className="mt-2 space-y-2">
                  {selectedStudent.courses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{course}</span>
                      <Badge variant="outline">Activo</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <label className="text-sm font-medium text-gray-500">Actividad Reciente</label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    Última actividad: {selectedStudent.lastActive}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Inscrito desde: {selectedStudent.enrollmentDate}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsStudentDetailOpen(false)}>
                  Cerrar
                </Button>
                <Button onClick={() => onStudentMessage?.(selectedStudent.id)}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Enviar Mensaje
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
