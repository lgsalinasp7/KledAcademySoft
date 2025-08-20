'use client';

import React from 'react';
import { StudentsManagement } from '@/components/features/teacher/StudentsManagement';

export default function TeacherStudentsPage() {
  const handleStudentView = (id: string) => {
    console.log('Ver estudiante:', id);
    // Aquí se implementaría la navegación al detalle del estudiante
  };

  const handleStudentMessage = (id: string) => {
    console.log('Enviar mensaje a estudiante:', id);
    // Aquí se implementaría la lógica para enviar mensaje
  };

  const handleStudentGrade = (id: string) => {
    console.log('Calificar estudiante:', id);
    // Aquí se implementaría la lógica para calificar
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <StudentsManagement
        onStudentView={handleStudentView}
        onStudentMessage={handleStudentMessage}
        onStudentGrade={handleStudentGrade}
      />
    </div>
  );
}
