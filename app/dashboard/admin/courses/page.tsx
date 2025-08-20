'use client';

import React from 'react';
import { CoursesManagement } from '@/components/features/admin/CoursesManagement';

export default function AdminCoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <CoursesManagement />
    </div>
  );
}
