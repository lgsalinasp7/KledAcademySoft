'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Calendar,
  Clock,
  Star,
  Eye
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  subject: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  status: 'active' | 'draft' | 'archived';
  studentsCount: number;
  lessonsCount: number;
  duration: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

interface CoursesManagementProps {
  courses?: Course[];
  onCourseCreate?: (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCourseUpdate?: (id: string, course: Partial<Course>) => void;
  onCourseDelete?: (id: string) => void;
  onCourseView?: (id: string) => void;
}

export const CoursesManagement: React.FC<CoursesManagementProps> = ({
  courses = [
    {
      id: '1',
      title: 'Matemáticas Avanzadas',
      description: 'Curso completo de matemáticas para estudiantes de secundaria',
      subject: 'Matemáticas',
      level: 'advanced',
      status: 'active',
      studentsCount: 45,
      lessonsCount: 24,
      duration: '12 semanas',
      rating: 4.8,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      title: 'Física Básica',
      description: 'Introducción a los conceptos fundamentales de la física',
      subject: 'Física',
      level: 'beginner',
      status: 'active',
      studentsCount: 32,
      lessonsCount: 18,
      duration: '8 semanas',
      rating: 4.6,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      id: '3',
      title: 'Historia Universal',
      description: 'Recorrido por los eventos más importantes de la historia mundial',
      subject: 'Historia',
      level: 'intermediate',
      status: 'draft',
      studentsCount: 0,
      lessonsCount: 0,
      duration: '10 semanas',
      rating: 0,
      createdAt: '2024-01-25',
      updatedAt: '2024-01-25'
    }
  ],
  onCourseCreate,
  onCourseUpdate,
  onCourseDelete,
  onCourseView
}) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    subject: '',
    level: 'beginner' as const,
    status: 'draft' as const,
    duration: ''
  });

  const handleCreateCourse = () => {
    if (onCourseCreate) {
      onCourseCreate({
        ...newCourse,
        studentsCount: 0,
        lessonsCount: 0,
        rating: 0
      });
    }
    setNewCourse({
      title: '',
      description: '',
      subject: '',
      level: 'beginner',
      status: 'draft',
      duration: ''
    });
    setIsCreateDialogOpen(false);
  };

  const handleEditCourse = () => {
    if (editingCourse && onCourseUpdate) {
      onCourseUpdate(editingCourse.id, {
        title: newCourse.title,
        description: newCourse.description,
        subject: newCourse.subject,
        level: newCourse.level,
        status: newCourse.status,
        duration: newCourse.duration
      });
    }
    setIsEditDialogOpen(false);
    setEditingCourse(null);
  };

  const openEditDialog = (course: Course) => {
    setEditingCourse(course);
    setNewCourse({
      title: course.title,
      description: course.description,
      subject: course.subject,
      level: course.level,
      status: course.status,
      duration: course.duration
    });
    setIsEditDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-blue-100 text-blue-800';
      case 'intermediate':
        return 'bg-orange-100 text-orange-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Cursos</h1>
          <p className="text-gray-600 mt-1">Crea y gestiona tus cursos educativos</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Crear Curso
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Crear Nuevo Curso</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Título del Curso</label>
                <Input
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  placeholder="Ej: Matemáticas Avanzadas"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Descripción</label>
                <Textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  placeholder="Describe el contenido del curso..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Materia</label>
                  <Input
                    value={newCourse.subject}
                    onChange={(e) => setNewCourse({ ...newCourse, subject: e.target.value })}
                    placeholder="Ej: Matemáticas"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Nivel</label>
                  <Select value={newCourse.level} onValueChange={(value: any) => setNewCourse({ ...newCourse, level: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Principiante</SelectItem>
                      <SelectItem value="intermediate">Intermedio</SelectItem>
                      <SelectItem value="advanced">Avanzado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Duración</label>
                  <Input
                    value={newCourse.duration}
                    onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                    placeholder="Ej: 12 semanas"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Estado</label>
                  <Select value={newCourse.status} onValueChange={(value: any) => setNewCourse({ ...newCourse, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Borrador</SelectItem>
                      <SelectItem value="active">Activo</SelectItem>
                      <SelectItem value="archived">Archivado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateCourse}>
                  Crear Curso
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{course.subject}</p>
                </div>
                <div className="flex space-x-1">
                  <Badge className={getStatusColor(course.status)}>
                    {course.status === 'active' ? 'Activo' : 
                     course.status === 'draft' ? 'Borrador' : 'Archivado'}
                  </Badge>
                  <Badge className={getLevelColor(course.level)}>
                    {course.level === 'beginner' ? 'Principiante' : 
                     course.level === 'intermediate' ? 'Intermedio' : 'Avanzado'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {course.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  {course.studentsCount} estudiantes
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <BookOpen className="h-4 w-4 mr-2" />
                  {course.lessonsCount} lecciones
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  {course.duration}
                </div>
                {course.rating > 0 && (
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                    {course.rating}/5.0
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onCourseView?.(course.id)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openEditDialog(course)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onCourseDelete?.(course.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Curso</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Título del Curso</label>
              <Input
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                placeholder="Ej: Matemáticas Avanzadas"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Descripción</label>
              <Textarea
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                placeholder="Describe el contenido del curso..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Materia</label>
                <Input
                  value={newCourse.subject}
                  onChange={(e) => setNewCourse({ ...newCourse, subject: e.target.value })}
                  placeholder="Ej: Matemáticas"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Nivel</label>
                <Select value={newCourse.level} onValueChange={(value: any) => setNewCourse({ ...newCourse, level: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Principiante</SelectItem>
                    <SelectItem value="intermediate">Intermedio</SelectItem>
                    <SelectItem value="advanced">Avanzado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Duración</label>
                <Input
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                  placeholder="Ej: 12 semanas"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Estado</label>
                <Select value={newCourse.status} onValueChange={(value: any) => setNewCourse({ ...newCourse, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Borrador</SelectItem>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="archived">Archivado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditCourse}>
                Guardar Cambios
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
