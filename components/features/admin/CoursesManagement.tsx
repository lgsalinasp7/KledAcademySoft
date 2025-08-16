"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Users,
  Clock,
  DollarSign,
  Star,
  MoreVertical,
  X,
  Save,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../ui/alert-dialog';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: 'programming' | 'design' | 'data' | 'marketing';
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  currency: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CoursesManagementProps {
  user: User;
}

interface CourseFormData {
  title: string;
  description: string;
  category: 'programming' | 'design' | 'data' | 'marketing';
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  currency: string;
  isActive: boolean;
}

// Mock data
const demoCourses: Course[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    description: 'Aprende desarrollo web completo con React, Node.js y MongoDB',
    category: 'programming',
    duration: '6 meses',
    level: 'intermediate',
    price: 2999,
    currency: 'USD',
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    description: 'Fundamentos de ciencia de datos con Python y SQL',
    category: 'data',
    duration: '4 meses',
    level: 'beginner',
    price: 2499,
    currency: 'USD',
    isActive: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: '3',
    title: 'UX/UI Design Masterclass',
    description: 'Diseño de experiencias de usuario y interfaces',
    category: 'design',
    duration: '3 meses',
    level: 'intermediate',
    price: 1999,
    currency: 'USD',
    isActive: true,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  }
];

export function CoursesManagement({ user }: CoursesManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use demo data as initial state
  const [courses, setCourses] = useState<Course[]>(demoCourses);

  // Form data for create/edit
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    category: 'programming',
    duration: '',
    level: 'beginner',
    price: 0,
    currency: 'USD',
    isActive: true
  });

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'programming': return 'bg-blue-100 text-blue-700';
      case 'data': return 'bg-green-100 text-green-700';
      case 'design': return 'bg-purple-100 text-purple-700';
      case 'marketing': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleCreateCourse = () => {
    setFormData({
      title: '',
      description: '',
      category: 'programming',
      duration: '',
      level: 'beginner',
      price: 0,
      currency: 'USD',
      isActive: true
    });
    setShowCreateModal(true);
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      duration: course.duration,
      level: course.level,
      price: course.price,
      currency: course.currency,
      isActive: course.isActive
    });
    setShowEditModal(true);
  };

  const handleDeleteCourse = (course: Course) => {
    setSelectedCourse(course);
    setShowDeleteModal(true);
  };

  const handleSubmit = async (isEdit: boolean = false) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (isEdit && selectedCourse) {
      // Update existing course
      setCourses(prev => prev.map(course => 
        course.id === selectedCourse.id 
          ? { ...course, ...formData, updatedAt: new Date().toISOString() }
          : course
      ));
    } else {
      // Create new course
      const newCourse: Course = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setCourses(prev => [...prev, newCourse]);
    }
    
    setIsSubmitting(false);
    setShowCreateModal(false);
    setShowEditModal(false);
    setSelectedCourse(null);
  };

  const handleDelete = async () => {
    if (!selectedCourse) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCourses(prev => prev.filter(course => course.id !== selectedCourse.id));
    
    setIsSubmitting(false);
    setShowDeleteModal(false);
    setSelectedCourse(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Cursos</h1>
          <p className="text-gray-600">Administra los cursos disponibles en la plataforma</p>
        </div>
        <Button onClick={handleCreateCourse} className="flex items-center gap-2">
          <Plus size={16} />
          Crear Curso
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Buscar cursos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="programming">Programación</SelectItem>
                <SelectItem value="data">Ciencia de Datos</SelectItem>
                <SelectItem value="design">Diseño</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="mt-2">{course.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={course.isActive ? "default" : "secondary"}>
                    {course.isActive ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className={getCategoryColor(course.category)}>
                    {course.category}
                  </Badge>
                  <Badge className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign size={14} />
                    <span>{course.price} {course.currency}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-gray-500">
                    Creado: {new Date(course.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCourse(course)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCourse(course)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Modal */}
      <Dialog open={showCreateModal || showEditModal} onOpenChange={() => {
        setShowCreateModal(false);
        setShowEditModal(false);
        setSelectedCourse(null);
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {showEditModal ? 'Editar Curso' : 'Crear Nuevo Curso'}
            </DialogTitle>
            <DialogDescription>
              {showEditModal ? 'Modifica la información del curso' : 'Completa la información del nuevo curso'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Título del Curso</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ej: Full Stack Web Development"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duración</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="Ej: 6 meses"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Descripción</Label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe el contenido del curso..."
                className="w-full p-3 border border-gray-300 rounded-md resize-none h-24"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="category">Categoría</Label>
                <Select value={formData.category} onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="programming">Programación</SelectItem>
                    <SelectItem value="data">Ciencia de Datos</SelectItem>
                    <SelectItem value="design">Diseño</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="level">Nivel</Label>
                <Select value={formData.level} onValueChange={(value: any) => setFormData(prev => ({ ...prev, level: value }))}>
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
              <div>
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                className="rounded"
              />
              <Label htmlFor="isActive">Curso activo</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateModal(false);
                setShowEditModal(false);
                setSelectedCourse(null);
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => handleSubmit(showEditModal)}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : (showEditModal ? 'Actualizar' : 'Crear')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el curso "{selectedCourse?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting ? 'Eliminando...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
