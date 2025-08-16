"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { UsersManagement } from "@/components/features/admin/UsersManagement";

export default function AdminUsersPage() {
  const { user, isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    } else if (!isLoading && user && !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.role)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UsersManagement user={user as any} />
    </div>
  );
}
