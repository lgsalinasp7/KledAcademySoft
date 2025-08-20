'use client';

import React from 'react';
import { CoursesManagement } from '@/components/features/teacher/CoursesManagement';

export default function TeacherCoursesPage() {
  const handleCourseCreate = (course: any) => {
    console.log('Crear curso:', course);
    // Aquí se implementaría la lógica para crear el curso
  };

  const handleCourseUpdate = (id: string, course: any) => {
    console.log('Actualizar curso:', id, course);
    // Aquí se implementaría la lógica para actualizar el curso
  };

  const handleCourseDelete = (id: string) => {
    console.log('Eliminar curso:', id);
    // Aquí se implementaría la lógica para eliminar el curso
  };

  const handleCourseView = (id: string) => {
    console.log('Ver curso:', id);
    // Aquí se implementaría la navegación al detalle del curso
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <CoursesManagement
        onCourseCreate={handleCourseCreate}
        onCourseUpdate={handleCourseUpdate}
        onCourseDelete={handleCourseDelete}
        onCourseView={handleCourseView}
      />
    </div>
  );
}
