"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UserPlus, 
  Search, 
  Mail, 
  Copy, 
  CheckCircle, 
  AlertCircle,
  Eye,
  EyeOff,
  Download,
  Send,
  Plus
} from 'lucide-react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { useUsersStore, Student } from '@/stores/usersStore';
import { CreateStudentModal } from './CreateStudentModal';
import { PaymentNotesModal } from './PaymentNotesModal';

interface CredentialsManagementProps {
  // user: any; // No se usa actualmente
}

export function CredentialsManagement({ }: CredentialsManagementProps) {
  const { 
    students, 
    generateCredentials, 
    sendCredentials: sendCreds,
    searchStudents,
    updatePaymentStatus
  } = useUsersStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showPasswords, setShowPasswords] = useState<{[key: string]: boolean}>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [newPaymentStatus, setNewPaymentStatus] = useState<'PENDING' | 'COMPLETED' | 'FAILED'>('PENDING');

  const filteredStudents = searchTerm 
    ? searchStudents(searchTerm)
    : students;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const togglePasswordVisibility = (studentId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [studentId]: !prev[studentId]
    }));
  };

  const handleGenerateCredentials = (student: Student) => {
    generateCredentials(student.id);
  };

  const handleSendCredentials = (student: Student) => {
    sendCreds(student.id, 'whatsapp');
    // Aquí podrías usar un toast o notificación más elegante
    console.log(`Credenciales enviadas a ${student.name} (${student.phone})`);
  };

  const handleUpdatePaymentStatus = (student: Student, newStatus: 'PENDING' | 'COMPLETED' | 'FAILED') => {
    // SIEMPRE mostrar modal de Shadcn UI para cualquier cambio de estado
    setSelectedStudent(student);
    setNewPaymentStatus(newStatus);
    setShowPaymentModal(true);
  };

  const handlePaymentStatusConfirm = (notes: string) => {
    if (selectedStudent) {
      updatePaymentStatus(selectedStudent.id, newPaymentStatus, notes);
      // El modal de Shadcn UI ya se cierra automáticamente
      // No necesitamos alert() adicional
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-900 text-green-300';
      case 'PENDING': return 'bg-yellow-900 text-yellow-300';
      case 'FAILED': return 'bg-red-900 text-red-300';
      default: return 'bg-gray-900 text-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Pagado';
      case 'pending': return 'Pendiente';
      case 'failed': return 'Fallido';
      default: return status;
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
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Gestión de Credenciales</h1>
              <p className="text-gray-400">
                Genera y gestiona las credenciales de acceso para estudiantes que han completado el pago
              </p>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-yellow-400 hover:bg-yellow-300 text-black"
            >
              <Plus size={16} className="mr-2" />
              Crear Estudiante
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-white mb-2">
                {students.length}
              </div>
              <p className="text-gray-400 text-sm">Total Estudiantes</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-400 mb-2">
                {students.filter(s => s.paymentStatus === 'COMPLETED').length}
              </div>
              <p className="text-gray-400 text-sm">Pagos Completados</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-400 mb-2">
                {students.filter(s => s.credentialsGenerated).length}
              </div>
              <p className="text-gray-400 text-sm">Credenciales Generadas</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-400 mb-2">
                {students.filter(s => s.paymentStatus === 'PENDING').length}
              </div>
              <p className="text-gray-400 text-sm">Pendientes de Pago</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <Input
              placeholder="Buscar estudiantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
        </motion.div>

        {/* Students List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          {filteredStudents.map((student, index) => (
            <Card key={student.id} className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Student Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-lg font-semibold text-white">{student.name}</h3>
                      <Badge className={getStatusColor(student.paymentStatus)}>
                        {getStatusLabel(student.paymentStatus)}
                      </Badge>
                      {student.credentialsGenerated && (
                        <Badge className="bg-blue-900 text-blue-300">
                          Credenciales Generadas
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Mail size={14} />
                        <span>{student.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📱 {student.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>📅 Registro: {new Date(student.createdAt).toLocaleDateString()}</span>
                      </div>
                                             {student.paymentDate && (
                         <div className="flex items-center gap-2">
                           <span>💳 Pago: {new Date(student.paymentDate).toLocaleDateString()}</span>
                         </div>
                       )}
                       {student.paymentNotes && (
                         <div className="flex items-start gap-2 col-span-full">
                           <span className="text-red-400">⚠️</span>
                           <span className="text-red-300 text-sm italic">"{student.paymentNotes}"</span>
                           <Button
                             size="sm"
                             variant="ghost"
                             onClick={() => {
                               setSelectedStudent(student);
                               setNewPaymentStatus(student.paymentStatus);
                               setShowPaymentModal(true);
                             }}
                             className="text-blue-400 hover:text-blue-300 ml-2"
                           >
                             Editar
                           </Button>
                         </div>
                       )}
                    </div>
                  </div>

                  {/* Credentials Section */}
                  {student.paymentStatus === 'COMPLETED' && (
                    <div className="flex flex-col gap-3">
                      {student.credentialsGenerated ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">Usuario:</span>
                            <span className="text-white font-mono text-sm">{student.username}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(student.username!, `username-${student.id}`)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              {copiedId === `username-${student.id}` ? <CheckCircle size={14} /> : <Copy size={14} />}
                            </Button>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-400">Contraseña:</span>
                            <span className="text-white font-mono text-sm">
                              {showPasswords[student.id] ? student.password : '••••••••'}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => togglePasswordVisibility(student.id)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              {showPasswords[student.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(student.password!, `password-${student.id}`)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              {copiedId === `password-${student.id}` ? <CheckCircle size={14} /> : <Copy size={14} />}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <p className="text-gray-400 text-sm mb-2">Credenciales no generadas</p>
                          <Button
                            onClick={() => handleGenerateCredentials(student)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                            size="sm"
                          >
                            <UserPlus size={14} className="mr-2" />
                            Generar Credenciales
                          </Button>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleSendCredentials(student)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                          size="sm"
                        >
                          <Send size={14} className="mr-2" />
                          Enviar por WhatsApp
                        </Button>
                        <Button
                          variant="outline"
                          className="border-gray-600 text-gray-400 hover:bg-gray-800"
                          size="sm"
                        >
                          <Download size={14} className="mr-2" />
                          Descargar PDF
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Pending Payment */}
                  {student.paymentStatus === 'PENDING' && (
                    <div className="text-center">
                      <p className="text-yellow-400 text-sm mb-2">Pendiente de pago</p>
                      <div className="flex gap-2 justify-center">
                        <Button
                          onClick={() => handleUpdatePaymentStatus(student, 'COMPLETED')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                          size="sm"
                        >
                          <CheckCircle size={14} className="mr-2" />
                          Marcar como Pagado
                        </Button>
                        <Button
                          onClick={() => handleUpdatePaymentStatus(student, 'FAILED')}
                          className="bg-red-600 hover:bg-red-700 text-white"
                          size="sm"
                        >
                          <AlertCircle size={14} className="mr-2" />
                          Marcar como Fallido
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Failed Payment */}
                  {student.paymentStatus === 'FAILED' && (
                    <div className="text-center">
                      <p className="text-red-400 text-sm mb-2">Pago fallido</p>
                      <div className="flex gap-2 justify-center">
                        <Button
                          onClick={() => handleUpdatePaymentStatus(student, 'COMPLETED')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                          size="sm"
                        >
                          <CheckCircle size={14} className="mr-2" />
                          Marcar como Pagado
                        </Button>
                        <Button
                          onClick={() => handleUpdatePaymentStatus(student, 'PENDING')}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white"
                          size="sm"
                        >
                          <AlertCircle size={14} className="mr-2" />
                          Marcar como Pendiente
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Completed Payment - Option to revert */}
                  {student.paymentStatus === 'COMPLETED' && (
                    <div className="text-center">
                      <p className="text-green-400 text-sm mb-2">Pago completado</p>
                                              <Button
                          onClick={() => handleUpdatePaymentStatus(student, 'PENDING')}
                          variant="outline"
                          className="border-gray-600 text-gray-400 hover:bg-gray-800"
                          size="sm"
                        >
                          <AlertCircle size={14} className="mr-2" />
                          Revertir a Pendiente
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No se encontraron estudiantes</h3>
            <p className="text-gray-400">Intenta con otros términos de búsqueda</p>
          </motion.div>
        )}
      </div>

      {/* Create Student Modal */}
      <CreateStudentModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {/* Payment Notes Modal */}
      {selectedStudent && (
        <PaymentNotesModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedStudent(null);
          }}
          onConfirm={handlePaymentStatusConfirm}
          studentName={selectedStudent.name}
          currentStatus={selectedStudent.paymentStatus}
          newStatus={newPaymentStatus}
          currentNotes={selectedStudent.paymentNotes}
        />
      )}
    </div>
  );
}
