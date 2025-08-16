"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  MoreVertical, 
  Edit, 
  Trash2, 
  UserCheck,
  X,
  Save,
  AlertCircle,
  Eye,
  EyeOff
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
  role: 'super_admin' | 'admin' | 'teacher' | 'student';
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

interface UsersManagementProps {
  user: User;
}

interface UserFormData {
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'teacher' | 'student';
  isActive: boolean;
  password?: string;
}

// Mock data
const demoUsers: User[] = [
  {
    id: '1',
    name: 'Ana García',
    email: 'ana@kaledacademy.com',
    role: 'super_admin',
    isActive: true,
    createdAt: '2024-01-01',
    lastLogin: '2025-01-14'
  },
  {
    id: '2',
    name: 'Carlos López',
    email: 'carlos@kaledacademy.com',
    role: 'admin',
    isActive: true,
    createdAt: '2024-01-15',
    lastLogin: '2025-01-14'
  },
  {
    id: '3',
    name: 'María Rodríguez',
    email: 'maria@kaledacademy.com',
    role: 'teacher',
    isActive: true,
    createdAt: '2024-02-01',
    lastLogin: '2025-01-13'
  },
  {
    id: '4',
    name: 'Juan Pérez',
    email: 'juan@kaledacademy.com',
    role: 'teacher',
    isActive: true,
    createdAt: '2024-02-15',
    lastLogin: '2025-01-12'
  },
  {
    id: '5',
    name: 'Laura Martínez',
    email: 'laura@kaledacademy.com',
    role: 'student',
    isActive: true,
    createdAt: '2024-03-01',
    lastLogin: '2025-01-14'
  }
];

export function UsersManagement({ user }: UsersManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'super_admin' | 'admin' | 'teacher' | 'student' | 'all'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Use demo data as initial state
  const [users, setUsers] = useState<User[]>(demoUsers);

  // Form data for create/edit
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    role: 'student',
    isActive: true,
    password: ''
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-700';
      case 'admin': return 'bg-blue-100 text-blue-700';
      case 'teacher': return 'bg-green-100 text-green-700';
      case 'student': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'admin': return 'Administrador';
      case 'teacher': return 'Profesor';
      case 'student': return 'Estudiante';
      default: return role;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = () => {
    setFormData({
      name: '',
      email: '',
      role: 'student',
      isActive: true,
      password: ''
    });
    setShowCreateModal(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      password: ''
    });
    setShowEditModal(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleSubmit = async (isEdit: boolean = false) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (isEdit && selectedUser) {
      // Update existing user
      setUsers(prev => prev.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...formData, updatedAt: new Date().toISOString() }
          : user
      ));
    } else {
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        isActive: formData.isActive,
        createdAt: new Date().toISOString()
      };
      setUsers(prev => [...prev, newUser]);
    }
    
    setIsSubmitting(false);
    setShowCreateModal(false);
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUsers(prev => prev.filter(user => user.id !== selectedUser.id));
    
    setIsSubmitting(false);
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
          <p className="text-gray-600">Administra los usuarios de la plataforma</p>
        </div>
        <Button onClick={handleCreateUser} className="flex items-center gap-2">
          <Plus size={16} />
          Invitar Usuario
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
                  placeholder="Buscar usuarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterRole} onValueChange={(value: any) => setFilterRole(value)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los roles</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
                <SelectItem value="admin">Administrador</SelectItem>
                <SelectItem value="teacher">Profesor</SelectItem>
                <SelectItem value="student">Estudiante</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{user.name}</CardTitle>
                  <CardDescription className="mt-2">{user.email}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={user.isActive ? "default" : "secondary"}>
                    {user.isActive ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className={getRoleColor(user.role)}>
                    {getRoleLabel(user.role)}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail size={14} />
                    <span>Registrado: {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {user.lastLogin && (
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <UserCheck size={14} />
                      <span>Último login: {new Date(user.lastLogin).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-gray-500">
                    ID: {user.id}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditUser(user)}
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteUser(user)}
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
        setSelectedUser(null);
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {showEditModal ? 'Editar Usuario' : 'Invitar Nuevo Usuario'}
            </DialogTitle>
            <DialogDescription>
              {showEditModal ? 'Modifica la información del usuario' : 'Completa la información del nuevo usuario'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ej: Juan Pérez"
                />
              </div>
              <div>
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="juan@ejemplo.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="role">Rol</Label>
                <Select value={formData.role} onValueChange={(value: any) => setFormData(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Estudiante</SelectItem>
                    <SelectItem value="teacher">Profesor</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Contraseña temporal"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                </div>
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
              <Label htmlFor="isActive">Usuario activo</Label>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCreateModal(false);
                setShowEditModal(false);
                setSelectedUser(null);
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => handleSubmit(showEditModal)}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Guardando...' : (showEditModal ? 'Actualizar' : 'Invitar')}
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
              Esta acción no se puede deshacer. Esto eliminará permanentemente al usuario "{selectedUser?.name}".
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
