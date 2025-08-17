"use client";

import React, { useState } from 'react';
import { UserPlus, Mail, Phone, CreditCard } from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { useUsersStore } from '@/stores/usersStore';

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StudentFormData {
  name: string;
  email: string;
  phone: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

export function CreateStudentModal({ isOpen, onClose }: CreateStudentModalProps) {
  const { addStudent } = useUsersStore();
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    email: '',
    phone: '',
    paymentStatus: 'pending'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      addStudent({
        ...formData,
        credentialsGenerated: false
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        paymentStatus: 'pending'
      });
      
      onClose();
    } catch (error) {
      console.error('Error creating student:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof StudentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 z-50">
        <DialogHeader>
          <DialogTitle className="text-white">
            Crear Nuevo Estudiante
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Completa la información del estudiante para crear su registro
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Nombre Completo
            </label>
            <div className="relative">
              <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                type="text"
                placeholder="Ej: Carlos Mendoza"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                type="email"
                placeholder="carlos.mendoza@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Teléfono */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Teléfono
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                type="tel"
                placeholder="+57 300 123 4567"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                required
              />
            </div>
          </div>

          {/* Estado de Pago */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">
              Estado de Pago
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <select
                value={formData.paymentStatus}
                onChange={(e) => handleInputChange('paymentStatus', e.target.value as any)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
              >
                <option value="pending">Pendiente</option>
                <option value="completed">Completado</option>
                <option value="failed">Fallido</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-400 hover:bg-gray-800"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-yellow-400 hover:bg-yellow-300 text-black"
            >
              {isSubmitting ? 'Creando...' : 'Crear Estudiante'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
