"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Users,
  Calendar,
  Clock,
  MapPin,
  X,
  Save,
  AlertCircle,
  UserPlus,
  BookOpen
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
}

interface Cohort {
  id: string;
  name: string;
  courseId: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  currentStudents: number;
  teachers: string[];
  students: string[];
  schedule: {
    days: string[];
    time: string;
    timezone: string;
  };
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
}

interface CohortsManagementProps {
  // user: User; // No se usa actualmente
}

interface CohortFormData {
  name: string;
  courseId: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  teachers: string[];
  schedule: {
    days: string[];
    time: string;
    timezone: string;
  };
  status: 'draft' | 'active' | 'completed' | 'cancelled';
}

// Mock data
const demoUsers: User[] = [
  {
    id: '1',
    name: 'Ana García',
    email: 'ana@kaledacademy.com',
    role: 'super_admin'
  },
  {
    id: '2',
    name: 'Carlos López',
    email: 'carlos@kaledacademy.com',
    role: 'admin'
  },
  {
    id: '3',
    name: 'María Rodríguez',
    email: 'maria@kaledacademy.com',
    role: 'teacher'
  },
  {
    id: '4',
    name: 'Juan Pérez',
    email: 'juan@kaledacademy.com',
    role: 'teacher'
  },
  {
    id: '5',
    name: 'Laura Martínez',
    email: 'laura@kaledacademy.com',
    role: 'student'
  }
];

const demoCourses: Course[] = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    description: 'Aprende desarrollo web completo con JavaScript, React, Node.js y bases de datos.'
  },
  {
    id: '2',
    title: 'Data Science & Analytics',
    description: 'Domina Python, Machine Learning, estadística y visualización de datos.'
  },
  {
    id: '3',
    title: 'UX/UI Design Bootcamp',
    description: 'Diseña experiencias digitales increíbles con Figma, Adobe XD y metodologías UX.'
  }
];

const demoCohorts: Cohort[] = [
  {
    id: '1',
    name: 'FS-Jan25',
    courseId: '1',
    startDate: '2025-01-15',
    endDate: '2025-07-15',
    maxStudents: 25,
    currentStudents: 18,
    teachers: ['3'],
    students: ['5'],
    schedule: {
      days: ['Lunes', 'Miércoles', 'Viernes'],
      time: '18:00',
      timezone: 'America/Mexico_City'
    },
    status: 'active',
    createdAt: '2024-12-01'
  },
  {
    id: '2',
    name: 'DS-Feb25',
    courseId: '2',
    startDate: '2025-02-01',
    endDate: '2025-10-01',
    maxStudents: 20,
    currentStudents: 15,
    teachers: ['4'],
    students: [],
    schedule: {
      days: ['Martes', 'Jueves'],
      time: '19:00',
      timezone: 'America/Mexico_City'
    },
    status: 'draft',
    createdAt: '2024-12-15'
  },
  {
    id: '3',
    name: 'UX-Mar25',
    courseId: '3',
    startDate: '2025-03-01',
    endDate: '2025-07-01',
    maxStudents: 15,
    currentStudents: 12,
    teachers: ['3'],
    students: [],
    schedule: {
      days: ['Lunes', 'Miércoles'],
      time: '17:00',
      timezone: 'America/Mexico_City'
    },
    status: 'active',
    createdAt: '2024-12-20'
  }
];

export function CohortsManagement({ }: CohortsManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'active' | 'completed' | 'cancelled'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use demo data as initial state
  const [cohorts, setCohorts] = useState<Cohort[]>(demoCohorts);
  const courses = demoCourses;
  const teachers = demoUsers.filter(u => u.role === 'teacher');

  // Form data for create/edit
  const [formData, setFormData] = useState<CohortFormData>({
    name: '',
    courseId: '',
    startDate: '',
    endDate: '',
    maxStudents: 20,
    teachers: [],
    schedule: {
      days: [],
      time: '',
      timezone: 'America/Mexico_City'
    },
    status: 'draft'
  });

  const filteredCohorts = cohorts.filter(cohort => {
    const matchesSearch = cohort.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || cohort.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'draft': return 'Borrador';
      case 'completed': return 'Completado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getCourseName = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    return course?.title || 'Curso no encontrado';
  };

  const getTeacherNames = (teacherIds: string[]) => {
    return teacherIds.map(id => {
      const teacher = teachers.find(t => t.id === id);
      return teacher?.name || 'Profesor no encontrado';
    }).join(', ');
  };

  const handleCreateCohort = () => {
    setFormData({
      name: '',
      courseId: '',
      startDate: '',
      endDate: '',
      maxStudents: 20,
      teachers: [],
      schedule: {
        days: [],
        time: '',
        timezone: 'America/Mexico_City'
      },
      status: 'draft'
    });
    setShowCreateModal(true);
  };

  const handleEditCohort = (cohort: Cohort) => {
    setSelectedCohort(cohort);
    setFormData({
      name: cohort.name,
      courseId: cohort.courseId,
      startDate: cohort.startDate,
      endDate: cohort.endDate,
      maxStudents: cohort.maxStudents,
      teachers: cohort.teachers,
      schedule: cohort.schedule,
      status: cohort.status
    });
    setShowEditModal(true);
  };

  const handleDeleteCohort = (cohort: Cohort) => {
    setSelectedCohort(cohort);
    setShowDeleteModal(true);
  };

  const handleSubmit = async (isEdit: boolean = false) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (isEdit && selectedCohort) {
      // Update existing cohort
      setCohorts(prev => prev.map(cohort => 
        cohort.id === selectedCohort.id 
          ? { ...cohort, ...formData, updatedAt: new Date().toISOString() }
          : cohort
      ));
    } else {
      // Create new cohort
      const newCohort: Cohort = {
        id: Date.now().toString(),
        name: formData.name,
        courseId: formData.courseId,
        startDate: formData.startDate,
        endDate: formData.endDate,
        maxStudents: formData.maxStudents,
        currentStudents: 0,
        teachers: formData.teachers,
        students: [],
        schedule: formData.schedule,
        status: formData.status,
        createdAt: new Date().toISOString()
      };
      setCohorts(prev => [...prev, newCohort]);
    }
    
    setIsSubmitting(false);
    setShowCreateModal(false);
    setShowEditModal(false);
    setSelectedCohort(null);
  };

  const handleDelete = async () => {
    if (!selectedCohort) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCohorts(prev => prev.filter(cohort => cohort.id !== selectedCohort.id));
    
    setIsSubmitting(false);
    setShowDeleteModal(false);
    setSelectedCohort(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Cohortes</h1>
          <p className="text-gray-600">Administra las cohortes de la plataforma</p>
        </div>
        <Button onClick={handleCreateCohort} className="flex items-center gap-2">
          <Plus size={16} />
          Crear Cohorte
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
                  placeholder="Buscar cohortes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                <SelectItem value="draft">Borrador</SelectItem>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cohorts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCohorts.map((cohort) => (
          <Card key={cohort.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{cohort.name}</CardTitle>
                  <CardDescription className="mt-2">{getCourseName(cohort.courseId)}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(cohort.status)}>
                    {getStatusLabel(cohort.status)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{new Date(cohort.startDate).toLocaleDateString()} - {new Date(cohort.endDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{cohort.currentStudents}/{cohort.maxStudents} estudiantes</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{cohort.schedule.days.join(', ')} - {cohort.schedule.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <BookOpen size={14} />
                    <span>{getTeacherNames(cohort.teachers)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-gray-500">
                    Creado: {new Date(cohort.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditCohort(cohort)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCohort(cohort)}
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
        setSelectedCohort(null);
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {showEditModal ? 'Editar Cohorte' : 'Crear Nueva Cohorte'}
            </DialogTitle>
            <DialogDescription>
              {showEditModal ? 'Modifica la información de la cohorte' : 'Completa la información de la nueva cohorte'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre de la Cohorte</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ej: FS-Jan25"
                />
              </div>
              <div>
                <Label htmlFor="courseId">Curso</Label>
                <Select value={formData.courseId} onValueChange={(value: any) => setFormData(prev => ({ ...prev, courseId: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar curso" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map(course => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="startDate">Fecha de Inicio</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="endDate">Fecha de Fin</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="maxStudents">Máximo de Estudiantes</Label>
                <Input
                  id="maxStudents"
                  type="number"
                  value={formData.maxStudents}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxStudents: parseInt(e.target.value) || 20 }))}
                  placeholder="20"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="time">Horario</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.schedule.time}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    schedule: { ...prev.schedule, time: e.target.value }
                  }))}
                />
              </div>
              <div>
                <Label htmlFor="timezone">Zona Horaria</Label>
                <Select value={formData.schedule.timezone} onValueChange={(value: any) => setFormData(prev => ({ 
                  ...prev, 
                  schedule: { ...prev.schedule, timezone: value }
                }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Mexico_City">México (GMT-6)</SelectItem>
                    <SelectItem value="America/New_York">Nueva York (GMT-5)</SelectItem>
                    <SelectItem value="Europe/Madrid">Madrid (GMT+1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Días de Clase</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => {
                      const currentDays = formData.schedule.days;
                      const newDays = currentDays.includes(day)
                        ? currentDays.filter(d => d !== day)
                        : [...currentDays, day];
                      setFormData(prev => ({
                        ...prev,
                        schedule: { ...prev.schedule, days: newDays }
                      }));
                    }}
                    className={`px-3 py-1 rounded-full text-sm border ${
                      formData.schedule.days.includes(day)
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="status">Estado</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Borrador</SelectItem>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="completed">Completado</SelectItem>
                  <SelectItem value="cancelled">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateModal(false);
                setShowEditModal(false);
                setSelectedCohort(null);
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
              Esta acción no se puede deshacer. Esto eliminará permanentemente la cohorte "{selectedCohort?.name}".
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
