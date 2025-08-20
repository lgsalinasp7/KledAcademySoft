'use client';

import React from 'react';
import { CohortsManagement } from '@/components/features/admin/CohortsManagement';

export default function AdminCohortsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <CohortsManagement />
    </div>
  );
}
