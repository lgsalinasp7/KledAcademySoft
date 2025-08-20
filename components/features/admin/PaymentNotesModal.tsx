"use client";

import React, { useState, useEffect } from 'react';
import { AlertCircle, Save } from 'lucide-react';
import { Button } from '../../ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';

interface PaymentNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (notes: string) => void;
  studentName: string;
  currentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  newStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  currentNotes?: string | undefined;
}

export function PaymentNotesModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  studentName, 
  currentStatus, 
  newStatus,
  currentNotes
}: PaymentNotesModalProps) {
  const [notes, setNotes] = useState(currentNotes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      onConfirm(notes);
      setNotes('');
      onClose();
    } catch (error) {
      console.error('Error updating payment status:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset notes when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setNotes(currentNotes || '');
    }
  }, [isOpen, currentNotes]);

  const getStatusText = () => {
    switch (newStatus) {
      case 'COMPLETED': return 'Pagado';
      case 'PENDING': return 'Pendiente';
      case 'FAILED': return 'Fallido';
      default: return newStatus;
    }
  };

  const getStatusColor = () => {
    switch (newStatus) {
      case 'COMPLETED': return 'text-green-400';
      case 'PENDING': return 'text-yellow-400';
      case 'FAILED': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const isRequired = newStatus === 'FAILED';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700 text-white z-50">
        <DialogHeader>
          <DialogTitle className="text-white">
            Actualizar Estado de Pago
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            <div className="space-y-2 mt-2">
              <p>
                Estudiante: <span className="text-white font-semibold">{studentName}</span>
              </p>
              <p>
                Estado actual: <span className="text-yellow-400">
                  {currentStatus === 'COMPLETED' ? 'Pagado' : currentStatus === 'PENDING' ? 'Pendiente' : 'Fallido'}
                </span>
              </p>
              <p>
                Nuevo estado: <span className={getStatusColor()}>{getStatusText()}</span>
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Observaciones */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <AlertCircle size={16} />
              Observaciones {isRequired && <span className="text-red-400">*</span>}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={isRequired ? "Explica por qué falló el pago..." : "Agregar observaciones (opcional)..."}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none resize-none"
              rows={4}
              required={isRequired}
            />
            {isRequired ? (
              <p className="text-xs text-gray-400">
                * Las observaciones son obligatorias cuando se marca como fallido
              </p>
            ) : (
              <p className="text-xs text-gray-400">
                💡 Las observaciones son opcionales pero recomendadas para mantener un registro
              </p>
            )}
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
              disabled={isSubmitting || (isRequired && !notes.trim())}
              className="bg-yellow-400 hover:bg-yellow-300 text-black disabled:opacity-50"
            >
              <Save size={16} className="mr-2" />
              {isSubmitting ? 'Actualizando...' : 'Actualizar Estado'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
