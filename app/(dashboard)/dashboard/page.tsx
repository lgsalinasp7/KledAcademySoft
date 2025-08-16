"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { HomeView } from "@/components/features/dashboard/HomeView";
import { AdminDashboardView } from "@/components/features/admin/AdminDashboardView";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, signOut, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogout = () => {
    signOut();
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAuthenticated) {
    return null;
  }

  // Determinar qué vista mostrar basado en el rol del usuario
  const isAdmin = user && ['ADMIN', 'SUPER_ADMIN'].includes(user.role);
  const isTeacher = user && user.role === 'TEACHER';

  if (isAdmin || isTeacher) {
    return (
      <AdminDashboardView 
        user={user} 
        onNavigateToSection={(section) => {
          // Aquí podrías navegar a diferentes rutas
          console.log('Navegar a:', section);
        }}
        onLogout={handleLogout} 
      />
    );
  }

  // Para estudiantes, mostrar la vista de inicio
  return (
    <HomeView 
      user={user} 
      onNavigateToCareer={() => {
        // Aquí podrías navegar al contenido
        console.log('Navegar al contenido');
      }}
      onLogout={handleLogout} 
    />
  );
}
