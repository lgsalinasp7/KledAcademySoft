'use client';

import React from 'react';
import { TeacherDashboardView } from '@/components/features/teacher/TeacherDashboardView';
import { useRouter } from 'next/navigation';

export default function TeacherDashboard() {
  const router = useRouter();

  const handleNavigateToCourses = () => {
    router.push('/dashboard/teacher/courses');
  };

  const handleNavigateToStudents = () => {
    router.push('/dashboard/teacher/students');
  };

  const handleNavigateToEvaluations = () => {
    router.push('/dashboard/teacher/evaluations');
  };

  const handleNavigateToMessages = () => {
    router.push('/dashboard/teacher/messages');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <TeacherDashboardView
        onNavigateToCourses={handleNavigateToCourses}
        onNavigateToStudents={handleNavigateToStudents}
        onNavigateToEvaluations={handleNavigateToEvaluations}
        onNavigateToMessages={handleNavigateToMessages}
      />
    </div>
  );
}
