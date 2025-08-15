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
  MoreVertical
} from 'lucide-react';
import { User, Course } from '../../../types';
import { Button } from '../../ui/Button';

interface CoursesManagementProps {
  user: User;
}

export function CoursesManagement({ user }: CoursesManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Mock data - esto vendría de una API
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Full Stack Web Development',
      description: 'Aprende desarrollo web completo con JavaScript, React, Node.js y bases de datos.',
      category: 'programming',
      duration: '6 meses',
      level: 'intermediate',
      price: 2500,
      currency: 'USD',
      isActive: true,
      thumbnail: '/api/placeholder/300/200',
      createdAt: '2024-01-15',
      updatedAt: '2025-01-10',
      createdBy: user.id
    },
    {
      id: '2', 
      title: 'Data Science & Analytics',
      description: 'Domina Python, Machine Learning, estadística y visualización de datos.',
      category: 'data',
      duration: '8 meses',
      level: 'advanced',
      price: 3000,
      currency: 'USD',
      isActive: true,
      thumbnail: '/api/placeholder/300/200',
      createdAt: '2024-02-20',
      updatedAt: '2025-01-08',
      createdBy: user.id
    },
    {
      id: '3',
      title: 'UX/UI Design Bootcamp',
      description: 'Diseña experiencias digitales increíbles con Figma, Adobe XD y metodologías UX.',
      category: 'design',
      duration: '4 meses',
      level: 'beginner',
      price: 1800,
      currency: 'USD',
      isActive: false,
      thumbnail: '/api/placeholder/300/200',
      createdAt: '2024-03-10',
      updatedAt: '2025-01-05',
      createdBy: user.id
    }
  ]);

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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Cursos</h1>
          <p className="text-gray-600">Administra todos los cursos de la plataforma</p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          variant="primary"
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          Crear Curso
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
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todas las categorías</option>
              <option value="programming">Programación</option>
              <option value="data">Data Science</option>
              <option value="design">Diseño</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <motion.div
            key={course.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
          >
            {/* Course Thumbnail */}
            <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute top-4 right-4">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {course.isActive ? 'Activo' : 'Inactivo'}
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
              </div>
            </div>

            {/* Course Info */}
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
              
              {/* Course Meta */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(course.category)}`}>
                  {course.category}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
              </div>

              {/* Course Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <Clock size={16} className="text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">{course.duration}</p>
                </div>
                <div>
                  <Users size={16} className="text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">156 estudiantes</p>
                </div>
                <div>
                  <DollarSign size={16} className="text-gray-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">${course.price}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="p-2">
                    <Eye size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" className="p-2 text-red-600 hover:text-red-700">
                    <Trash2 size={16} />
                  </Button>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">4.8</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron cursos</h3>
          <p className="text-gray-600 mb-4">Ajusta los filtros o crea un nuevo curso</p>
          <Button onClick={() => setShowCreateModal(true)}>
            Crear Primer Curso
          </Button>
        </div>
      )}

      {/* Create Course Modal (placeholder) */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Crear Nuevo Curso</h2>
              <p className="text-gray-600 mb-6">
                Formulario para crear curso - Esta funcionalidad se implementará próximamente
              </p>
              <div className="flex gap-3 justify-end">
                <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
                  Cancelar
                </Button>
                <Button variant="primary">
                  Crear Curso
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
