'use client';

import React from 'react';
import { CredentialsManagement } from '@/components/features/admin/CredentialsManagement';

export default function AdminCredentialsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <CredentialsManagement />
    </div>
  );
}
