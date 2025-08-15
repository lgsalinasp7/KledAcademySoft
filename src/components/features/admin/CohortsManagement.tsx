import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
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
import { User, Cohort, Course } from '../../../types';
import { Button } from '../../ui/Button';
import { demoCohorts, demoCourses, demoUsers } from '../../../data/mvpData';

interface CohortsManagementProps {
  user: User;
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

export function CohortsManagement({ user }: CohortsManagementProps) {
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
    const teacherNames = teacherIds.map(id => {
      const teacher = teachers.find(t => t.id === id);
      return teacher?.name || 'Profesor no encontrado';
    });
    return teacherNames.join(', ') || 'Sin profesores asignados';
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
      setCohorts(prev => prev.map(c => 
        c.id === selectedCohort.id 
          ? { ...c, ...formData }
          : c
      ));
      setShowEditModal(false);
    } else {
      // Create new cohort
      const newCohort: Cohort = {
        id: Math.random().toString(36).substring(7),
        ...formData,
        currentStudents: 0,
        students: [],
        createdAt: new Date().toISOString()
      };
      setCohorts(prev => [...prev, newCohort]);
      setShowCreateModal(false);
    }

    setIsSubmitting(false);
  };

  const confirmDelete = async () => {
    if (!selectedCohort) return;
    
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setCohorts(prev => prev.filter(c => c.id !== selectedCohort.id));
    setShowDeleteModal(false);
    setSelectedCohort(null);
    setIsSubmitting(false);
  };

  const resetForm = () => {
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
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Cohortes</h1>
          <p className="text-gray-600">Administra cohortes, horarios, estudiantes y profesores asignados</p>
        </div>
        <Button
          onClick={handleCreateCohort}
          variant="primary"
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          Crear Cohorte
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar cohortes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'draft' | 'active' | 'completed' | 'cancelled')}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los estados</option>
              <option value="draft">Borradores</option>
              <option value="active">Activos</option>
              <option value="completed">Completados</option>
              <option value="cancelled">Cancelados</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cohorts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCohorts.map((cohort) => (
          <motion.div
            key={cohort.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
          >
            {/* Cohort Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">{cohort.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium bg-white bg-opacity-20`}>
                  {getStatusLabel(cohort.status)}
                </span>
              </div>
              <p className="text-blue-100 text-sm">{getCourseName(cohort.courseId)}</p>
            </div>

            {/* Cohort Info */}
            <div className="p-6">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{cohort.currentStudents}</div>
                  <div className="text-sm text-gray-600">Estudiantes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{cohort.maxStudents}</div>
                  <div className="text-sm text-gray-600">Capacidad</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Ocupación</span>
                  <span>{Math.round((cohort.currentStudents / cohort.maxStudents) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(cohort.currentStudents / cohort.maxStudents) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users size={14} />
                  <span>Profesores: {getTeacherNames(cohort.teachers)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar size={14} />
                  <span>{new Date(cohort.startDate).toLocaleDateString('es-ES')} - {new Date(cohort.endDate).toLocaleDateString('es-ES')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={14} />
                  <span>{cohort.schedule.time}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="p-2">
                    <UserPlus size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-2"
                    onClick={() => handleEditCohort(cohort)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-2 text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteCohort(cohort)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="p-2">
                  <BookOpen size={16} />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCohorts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron cohortes</h3>
          <p className="text-gray-600 mb-4">Ajusta los filtros o crea una nueva cohorte</p>
          <Button onClick={handleCreateCohort}>
            Crear Primera Cohorte
          </Button>
        </div>
      )}

      {/* Create/Edit Cohort Modal */}
      <AnimatePresence>
        {(showCreateModal || showEditModal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowCreateModal(false);
              setShowEditModal(false);
              resetForm();
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {showEditModal ? 'Editar Cohorte' : 'Crear Nueva Cohorte'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(showEditModal);
              }} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la Cohorte *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: FS-Jan25"
                  />
                </div>

                {/* Course */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Curso *
                  </label>
                  <select
                    required
                    value={formData.courseId}
                    onChange={(e) => setFormData(prev => ({ ...prev, courseId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar curso</option>
                    {courses.map(course => (
                      <option key={course.id} value={course.id}>
                        {course.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Inicio *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Fin *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Capacity and Teachers */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Capacidad Máxima *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.maxStudents}
                      onChange={(e) => setFormData(prev => ({ ...prev, maxStudents: Number(e.target.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profesores Asignados *
                    </label>
                    <select
                      required
                      multiple
                      value={formData.teachers}
                      onChange={(e) => setFormData(prev => ({ ...prev, teachers: Array.from(e.target.selectedOptions, option => option.value) }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Schedule and Timezone */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Horario *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.schedule.time}
                      onChange={(e) => setFormData(prev => ({ ...prev, schedule: { ...prev.schedule, time: e.target.value } }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ej: Lunes y Miércoles 19:00-22:00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zona Horaria *
                    </label>
                    <select
                      required
                      value={formData.schedule.timezone}
                      onChange={(e) => setFormData(prev => ({ ...prev, schedule: { ...prev.schedule, timezone: e.target.value } }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="America/Mexico_City">México (GMT-6)</option>
                      <option value="America/New_York">Nueva York (GMT-5)</option>
                      <option value="America/Los_Angeles">Los Ángeles (GMT-8)</option>
                      <option value="Europe/Madrid">Madrid (GMT+1)</option>
                    </select>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado *
                  </label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'draft' | 'active' | 'completed' | 'cancelled' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="draft">Borrador</option>
                    <option value="active">Activo</option>
                    <option value="completed">Completado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setShowCreateModal(false);
                      setShowEditModal(false);
                      resetForm();
                    }}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        {showEditModal ? 'Actualizar Cohorte' : 'Crear Cohorte'}
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDeleteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle size={20} className="text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Eliminar Cohorte</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que quieres eliminar la cohorte "{selectedCohort?.name}"? 
                Esta acción no se puede deshacer.
              </p>

              <div className="flex gap-3 justify-end">
                <Button
                  variant="ghost"
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  onClick={confirmDelete}
                  disabled={isSubmitting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isSubmitting ? 'Eliminando...' : 'Eliminar'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
