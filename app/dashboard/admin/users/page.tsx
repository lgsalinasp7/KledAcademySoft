'use client';

import React from 'react';
import { UsersManagement } from '@/components/features/admin/UsersManagement';
import { useAuthStore } from '@/stores/authStore';

export default function AdminUsersPage() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <UsersManagement user={user as any} />
    </div>
  );
}
