import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Mail, Phone, MoreVertical, Edit, Trash2, UserCheck } from 'lucide-react';
import { User, UserRole } from '../../../types';
import { Button } from '../../ui/Button';

interface UsersManagementProps {
  user: User;
}

export function UsersManagement({ user }: UsersManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');

  // Mock users data
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Ana García Rodriguez',
      email: 'ana.garcia@kaledacademy.com',
      initials: 'AG',
      role: 'admin',
      isActive: true,
      createdAt: '2024-01-15',
      lastLogin: '2025-01-14'
    },
    {
      id: '2',
      name: 'Carlos López Mendez',
      email: 'carlos.lopez@kaledacademy.com',
      initials: 'CL',
      role: 'teacher',
      isActive: true,
      createdAt: '2024-02-20',
      lastLogin: '2025-01-13'
    },
    {
      id: '3',
      name: 'María Fernanda Silva',
      email: 'maria.silva@student.com',
      initials: 'MF',
      role: 'student',
      isActive: true,
      createdAt: '2024-03-10',
      lastLogin: '2025-01-14'
    }
  ];

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-700';
      case 'admin': return 'bg-blue-100 text-blue-700';
      case 'teacher': return 'bg-green-100 text-green-700';
      case 'student': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'admin': return 'Administrador';
      case 'teacher': return 'Profesor';
      case 'student': return 'Estudiante';
      default: return role;
    }
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra usuarios, roles y permisos</p>
        </div>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus size={20} />
          Invitar Usuario
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as UserRole | 'all')}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Todos los roles</option>
              <option value="admin">Administradores</option>
              <option value="teacher">Profesores</option>
              <option value="student">Estudiantes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Usuario</th>
                <th className="text-left p-4 font-medium text-gray-900">Rol</th>
                <th className="text-left p-4 font-medium text-gray-900">Estado</th>
                <th className="text-left p-4 font-medium text-gray-900">Último acceso</th>
                <th className="text-left p-4 font-medium text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <motion.tr 
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {user.initials}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-400' : 'bg-red-400'}`} />
                      <span className="text-sm text-gray-600">
                        {user.isActive ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-gray-600">
                      {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('es-ES') : 'Nunca'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="p-2">
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Mail size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2 text-red-600 hover:text-red-700">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
