"use client";

import React from 'react';
import { CredentialsManagement } from '@/components/features/admin/CredentialsManagement';
import { useAuthStore } from '@/stores/authStore';

export default function AdminCredentialsPage() {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-white">
          <p className="text-red-400">No autenticado</p>
        </div>
      </div>
    );
  }

  return <CredentialsManagement user={user} />;
}
