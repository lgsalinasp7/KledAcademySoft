'use client';

import React from 'react';
import { EvaluationsManagement } from '@/components/features/teacher/EvaluationsManagement';

export default function TeacherEvaluationsPage() {
  const handleEvaluationCreate = (evaluation: any) => {
    console.log('Crear evaluación:', evaluation);
    // Aquí se implementaría la lógica para crear la evaluación
  };

  const handleEvaluationUpdate = (id: string, evaluation: any) => {
    console.log('Actualizar evaluación:', id, evaluation);
    // Aquí se implementaría la lógica para actualizar la evaluación
  };

  const handleEvaluationDelete = (id: string) => {
    console.log('Eliminar evaluación:', id);
    // Aquí se implementaría la lógica para eliminar la evaluación
  };

  const handleEvaluationView = (id: string) => {
    console.log('Ver evaluación:', id);
    // Aquí se implementaría la navegación al detalle de la evaluación
  };

  const handleGradeSubmission = (submissionId: string, score: number, feedback: string) => {
    console.log('Calificar entrega:', submissionId, score, feedback);
    // Aquí se implementaría la lógica para calificar la entrega
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <EvaluationsManagement
        onEvaluationCreate={handleEvaluationCreate}
        onEvaluationUpdate={handleEvaluationUpdate}
        onEvaluationDelete={handleEvaluationDelete}
        onEvaluationView={handleEvaluationView}
        onGradeSubmission={handleGradeSubmission}
      />
    </div>
  );
}
