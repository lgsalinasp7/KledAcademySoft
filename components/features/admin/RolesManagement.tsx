"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Lock, Eye, EyeOff, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface RolesManagementProps {
  user: User;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  isActive: boolean;
}

const demoRoles: Role[] = [
  {
    id: '1',
    name: 'Super Admin',
    description: 'Acceso completo a todas las funcionalidades del sistema',
    permissions: ['users:manage', 'courses:manage', 'cohorts:manage', 'analytics:view', 'settings:manage'],
    userCount: 1,
    isActive: true
  },
  {
    id: '2',
    name: 'Administrador',
    description: 'Gestión de cursos, cohortes y usuarios',
    permissions: ['users:manage', 'courses:manage', 'cohorts:manage', 'analytics:view'],
    userCount: 3,
    isActive: true
  },
  {
    id: '3',
    name: 'Profesor',
    description: 'Gestión de contenido y evaluación de estudiantes',
    permissions: ['courses:view', 'lessons:manage', 'students:view', 'grades:manage'],
    userCount: 8,
    isActive: true
  },
  {
    id: '4',
    name: 'Estudiante',
    description: 'Acceso a contenido y progreso personal',
    permissions: ['courses:view', 'lessons:view', 'progress:view'],
    userCount: 1247,
    isActive: true
  }
];

export function RolesManagement({ user }: RolesManagementProps) {
  const getPermissionIcon = (permission: string) => {
    switch (permission.split(':')[0]) {
      case 'users': return <Users size={16} />;
      case 'courses': return <Shield size={16} />;
      case 'cohorts': return <Users size={16} />;
      case 'analytics': return <Eye size={16} />;
      case 'settings': return <Settings size={16} />;
      default: return <Lock size={16} />;
    }
  };

  const getRoleColor = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case 'super admin': return 'bg-red-500';
      case 'administrador': return 'bg-blue-500';
      case 'profesor': return 'bg-green-500';
      case 'estudiante': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="flex-1 bg-black p-6 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Roles y Permisos
          </h1>
          <p className="text-gray-400 text-lg">
            Sistema avanzado de control de acceso y permisos
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Roles Activos</CardTitle>
              <Shield className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">4</div>
              <p className="text-xs text-gray-400">Roles configurados</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Usuarios</CardTitle>
              <Users className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1,259</div>
              <p className="text-xs text-gray-400">Usuarios con roles asignados</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Permisos</CardTitle>
              <Lock className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">15</div>
              <p className="text-xs text-gray-400">Permisos disponibles</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Roles Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {demoRoles.map((role, index) => (
            <Card key={role.id} className="bg-gray-900 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getRoleColor(role.name)}`} />
                      {role.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400 mt-1">
                      {role.description}
                    </CardDescription>
                  </div>
                  <Badge variant={role.isActive ? "default" : "secondary"}>
                    {role.isActive ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Usuarios:</span>
                  <span className="text-white font-medium">{role.userCount}</span>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Permisos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission) => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        <div className="flex items-center gap-1">
                          {getPermissionIcon(permission)}
                          {permission}
                        </div>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Editar
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Ver Usuarios
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* System Info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-400" />
                Sistema de Permisos Granular
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Lock className="h-4 w-4 text-green-400" />
                    Definir roles personalizados
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="h-4 w-4 text-blue-400" />
                    Asignar permisos específicos
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Eye className="h-4 w-4 text-purple-400" />
                    Control de acceso por módulo
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Settings className="h-4 w-4 text-yellow-400" />
                    Auditoría de acciones
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
