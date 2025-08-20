'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  CheckCircle, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Calendar,
  Clock,
  Star,
  Eye,
  FileText,
  AlertCircle
} from 'lucide-react';

interface Evaluation {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  type: 'quiz' | 'exam' | 'assignment' | 'project';
  status: 'draft' | 'published' | 'in_progress' | 'completed';
  dueDate: string;
  totalPoints: number;
  assignedStudents: number;
  completedStudents: number;
  averageScore: number;
  createdAt: string;
  updatedAt: string;
}

interface StudentSubmission {
  id: string;
  studentId: string;
  studentName: string;
  evaluationId: string;
  status: 'not_started' | 'in_progress' | 'submitted' | 'graded';
  submittedAt?: string;
  score?: number;
  feedback?: string;
}

interface EvaluationsManagementProps {
  evaluations?: Evaluation[];
  submissions?: StudentSubmission[];
  onEvaluationCreate?: (evaluation: Omit<Evaluation, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onEvaluationUpdate?: (id: string, evaluation: Partial<Evaluation>) => void;
  onEvaluationDelete?: (id: string) => void;
  onEvaluationView?: (id: string) => void;
  onGradeSubmission?: (submissionId: string, score: number, feedback: string) => void;
}

export const EvaluationsManagement: React.FC<EvaluationsManagementProps> = ({
  evaluations = [
    {
      id: '1',
      title: 'Examen de Álgebra',
      description: 'Evaluación sobre ecuaciones cuadráticas y funciones',
      courseId: '1',
      courseName: 'Matemáticas Avanzadas',
      type: 'exam',
      status: 'completed',
      dueDate: '2024-01-25',
      totalPoints: 100,
      assignedStudents: 45,
      completedStudents: 42,
      averageScore: 78.5,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-25'
    },
    {
      id: '2',
      title: 'Quiz de Física',
      description: 'Preguntas sobre leyes de Newton',
      courseId: '2',
      courseName: 'Física Básica',
      type: 'quiz',
      status: 'in_progress',
      dueDate: '2024-01-30',
      totalPoints: 50,
      assignedStudents: 32,
      completedStudents: 18,
      averageScore: 0,
      createdAt: '2024-01-20',
      updatedAt: '2024-01-20'
    },
    {
      id: '3',
      title: 'Proyecto de Historia',
      description: 'Investigación sobre la Revolución Industrial',
      courseId: '3',
      courseName: 'Historia Universal',
      type: 'project',
      status: 'draft',
      dueDate: '2024-02-15',
      totalPoints: 150,
      assignedStudents: 0,
      completedStudents: 0,
      averageScore: 0,
      createdAt: '2024-01-25',
      updatedAt: '2024-01-25'
    }
  ],
  submissions = [
    {
      id: '1',
      studentId: '1',
      studentName: 'María García',
      evaluationId: '1',
      status: 'graded',
      submittedAt: '2024-01-24',
      score: 85,
      feedback: 'Excelente trabajo. Buena comprensión de los conceptos.'
    },
    {
      id: '2',
      studentId: '2',
      studentName: 'Carlos Rodríguez',
      evaluationId: '1',
      status: 'graded',
      submittedAt: '2024-01-25',
      score: 72,
      feedback: 'Buen trabajo, pero necesita mejorar en las ecuaciones cuadráticas.'
    },
    {
      id: '3',
      studentId: '3',
      studentName: 'Ana López',
      evaluationId: '2',
      status: 'submitted',
      submittedAt: '2024-01-28'
    }
  ],
  onEvaluationCreate,
  onEvaluationUpdate,
  onEvaluationDelete,
  onEvaluationView,
  onGradeSubmission
}) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isGradeDialogOpen, setIsGradeDialogOpen] = useState(false);
  const [editingEvaluation, setEditingEvaluation] = useState<Evaluation | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<StudentSubmission | null>(null);
  const [newEvaluation, setNewEvaluation] = useState({
    title: '',
    description: '',
    courseId: '',
    courseName: '',
    type: 'quiz' as const,
    status: 'draft' as const,
    dueDate: '',
    totalPoints: 100
  });
  const [gradingData, setGradingData] = useState({
    score: 0,
    feedback: ''
  });

  const handleCreateEvaluation = () => {
    if (onEvaluationCreate) {
      onEvaluationCreate({
        ...newEvaluation,
        assignedStudents: 0,
        completedStudents: 0,
        averageScore: 0
      });
    }
    setNewEvaluation({
      title: '',
      description: '',
      courseId: '',
      courseName: '',
      type: 'quiz',
      status: 'draft',
      dueDate: '',
      totalPoints: 100
    });
    setIsCreateDialogOpen(false);
  };

  const handleEditEvaluation = () => {
    if (editingEvaluation && onEvaluationUpdate) {
      onEvaluationUpdate(editingEvaluation.id, {
        title: newEvaluation.title,
        description: newEvaluation.description,
        courseId: newEvaluation.courseId,
        courseName: newEvaluation.courseName,
        type: newEvaluation.type,
        status: newEvaluation.status,
        dueDate: newEvaluation.dueDate,
        totalPoints: newEvaluation.totalPoints
      });
    }
    setIsEditDialogOpen(false);
    setEditingEvaluation(null);
  };

  const handleGradeSubmission = () => {
    if (selectedSubmission && onGradeSubmission) {
      onGradeSubmission(selectedSubmission.id, gradingData.score, gradingData.feedback);
    }
    setIsGradeDialogOpen(false);
    setSelectedSubmission(null);
    setGradingData({ score: 0, feedback: '' });
  };

  const openEditDialog = (evaluation: Evaluation) => {
    setEditingEvaluation(evaluation);
    setNewEvaluation({
      title: evaluation.title,
      description: evaluation.description,
      courseId: evaluation.courseId,
      courseName: evaluation.courseName,
      type: evaluation.type,
      status: evaluation.status,
      dueDate: evaluation.dueDate,
      totalPoints: evaluation.totalPoints
    });
    setIsEditDialogOpen(true);
  };

  const openGradeDialog = (submission: StudentSubmission) => {
    setSelectedSubmission(submission);
    setGradingData({
      score: submission.score || 0,
      feedback: submission.feedback || ''
    });
    setIsGradeDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'published':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'quiz':
        return 'bg-purple-100 text-purple-800';
      case 'exam':
        return 'bg-red-100 text-red-800';
      case 'assignment':
        return 'bg-orange-100 text-orange-800';
      case 'project':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSubmissionStatusColor = (status: string) => {
    switch (status) {
      case 'not_started':
        return 'bg-gray-100 text-gray-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'submitted':
        return 'bg-blue-100 text-blue-800';
      case 'graded':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Evaluaciones</h1>
          <p className="text-gray-600 mt-1">Crea y gestiona evaluaciones para tus cursos</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Crear Evaluación
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Crear Nueva Evaluación</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Título</label>
                <Input
                  value={newEvaluation.title}
                  onChange={(e) => setNewEvaluation({ ...newEvaluation, title: e.target.value })}
                  placeholder="Ej: Examen de Álgebra"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Descripción</label>
                <Textarea
                  value={newEvaluation.description}
                  onChange={(e) => setNewEvaluation({ ...newEvaluation, description: e.target.value })}
                  placeholder="Describe la evaluación..."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Curso</label>
                  <Select value={newEvaluation.courseId} onValueChange={(value) => setNewEvaluation({ ...newEvaluation, courseId: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar curso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Matemáticas Avanzadas</SelectItem>
                      <SelectItem value="2">Física Básica</SelectItem>
                      <SelectItem value="3">Historia Universal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Tipo</label>
                  <Select value={newEvaluation.type} onValueChange={(value: any) => setNewEvaluation({ ...newEvaluation, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="exam">Examen</SelectItem>
                      <SelectItem value="assignment">Tarea</SelectItem>
                      <SelectItem value="project">Proyecto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Fecha de Entrega</label>
                  <Input
                    type="date"
                    value={newEvaluation.dueDate}
                    onChange={(e) => setNewEvaluation({ ...newEvaluation, dueDate: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Puntos Totales</label>
                  <Input
                    type="number"
                    value={newEvaluation.totalPoints}
                    onChange={(e) => setNewEvaluation({ ...newEvaluation, totalPoints: parseInt(e.target.value) })}
                    placeholder="100"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateEvaluation}>
                  Crear Evaluación
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Evaluations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {evaluations.map((evaluation) => (
          <Card key={evaluation.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold">{evaluation.title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">{evaluation.courseName}</p>
                </div>
                <div className="flex space-x-1">
                  <Badge className={getStatusColor(evaluation.status)}>
                    {evaluation.status === 'draft' ? 'Borrador' : 
                     evaluation.status === 'published' ? 'Publicada' : 
                     evaluation.status === 'in_progress' ? 'En Progreso' : 'Completada'}
                  </Badge>
                  <Badge className={getTypeColor(evaluation.type)}>
                    {evaluation.type === 'quiz' ? 'Quiz' : 
                     evaluation.type === 'exam' ? 'Examen' : 
                     evaluation.type === 'assignment' ? 'Tarea' : 'Proyecto'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {evaluation.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  Entrega: {evaluation.dueDate}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  {evaluation.completedStudents}/{evaluation.assignedStudents} completadas
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="h-4 w-4 mr-2" />
                  {evaluation.averageScore > 0 ? `${evaluation.averageScore}/100` : 'Sin calificar'}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <FileText className="h-4 w-4 mr-2" />
                  {evaluation.totalPoints} puntos
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEvaluationView?.(evaluation.id)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openEditDialog(evaluation)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onEvaluationDelete?.(evaluation.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Submissions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Últimas Entregas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{submission.studentName}</p>
                      <p className="text-sm text-gray-500">
                        {evaluations.find(e => e.id === submission.evaluationId)?.title}
                      </p>
                    </div>
                    <Badge className={getSubmissionStatusColor(submission.status)}>
                      {submission.status === 'not_started' ? 'No Iniciado' : 
                       submission.status === 'in_progress' ? 'En Progreso' : 
                       submission.status === 'submitted' ? 'Entregado' : 'Calificado'}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {submission.score !== undefined && (
                    <div className="text-right">
                      <p className="font-medium">{submission.score}/100</p>
                      <p className="text-sm text-gray-500">Puntuación</p>
                    </div>
                  )}
                  {submission.submittedAt && (
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{submission.submittedAt}</p>
                      <p className="text-xs text-gray-400">Entregado</p>
                    </div>
                  )}
                  <div className="flex space-x-2">
                    {submission.status === 'submitted' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openGradeDialog(submission)}
                      >
                        <Star className="h-4 w-4 mr-1" />
                        Calificar
                      </Button>
                    )}
                    {submission.status === 'graded' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => openGradeDialog(submission)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Evaluación</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Título</label>
              <Input
                value={newEvaluation.title}
                onChange={(e) => setNewEvaluation({ ...newEvaluation, title: e.target.value })}
                placeholder="Ej: Examen de Álgebra"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Descripción</label>
              <Textarea
                value={newEvaluation.description}
                onChange={(e) => setNewEvaluation({ ...newEvaluation, description: e.target.value })}
                placeholder="Describe la evaluación..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Curso</label>
                <Select value={newEvaluation.courseId} onValueChange={(value) => setNewEvaluation({ ...newEvaluation, courseId: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar curso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Matemáticas Avanzadas</SelectItem>
                    <SelectItem value="2">Física Básica</SelectItem>
                    <SelectItem value="3">Historia Universal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Tipo</label>
                <Select value={newEvaluation.type} onValueChange={(value: any) => setNewEvaluation({ ...newEvaluation, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="exam">Examen</SelectItem>
                    <SelectItem value="assignment">Tarea</SelectItem>
                    <SelectItem value="project">Proyecto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Fecha de Entrega</label>
                <Input
                  type="date"
                  value={newEvaluation.dueDate}
                  onChange={(e) => setNewEvaluation({ ...newEvaluation, dueDate: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Puntos Totales</label>
                <Input
                  type="number"
                  value={newEvaluation.totalPoints}
                  onChange={(e) => setNewEvaluation({ ...newEvaluation, totalPoints: parseInt(e.target.value) })}
                  placeholder="100"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleEditEvaluation}>
                Guardar Cambios
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Grade Dialog */}
      <Dialog open={isGradeDialogOpen} onOpenChange={setIsGradeDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Calificar Entrega</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Estudiante</label>
                <p className="text-lg font-semibold">{selectedSubmission.studentName}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Evaluación</label>
                <p className="text-sm text-gray-600">
                  {evaluations.find(e => e.id === selectedSubmission.evaluationId)?.title}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium">Puntuación (0-100)</label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={gradingData.score}
                  onChange={(e) => setGradingData({ ...gradingData, score: parseInt(e.target.value) })}
                  placeholder="85"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Comentarios</label>
                <Textarea
                  value={gradingData.feedback}
                  onChange={(e) => setGradingData({ ...gradingData, feedback: e.target.value })}
                  placeholder="Proporciona retroalimentación al estudiante..."
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsGradeDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleGradeSubmission}>
                  <Star className="h-4 w-4 mr-2" />
                  Calificar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
