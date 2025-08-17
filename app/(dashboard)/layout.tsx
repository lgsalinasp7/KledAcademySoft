"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { MainSidebar } from "@/components/layout/MainSidebar";
import { Notifications } from "@/components/ui/Notifications";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: { slug?: string[] };
}

export default function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    signOut,
    checkAuth
  } = useAuthStore();
  
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white">
          <p className="text-red-400">No autenticado</p>
          <p className="text-gray-400">Usuario: {user ? user.name : 'Ninguno'}</p>
          <p className="text-gray-400">Autenticado: {isAuthenticated ? 'Sí' : 'No'}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen bg-black flex overflow-hidden">
        {/* Sidebar principal */}
        <MainSidebar userRole={user?.role} />

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 bg-black min-h-0 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
      
      {/* Sistema de notificaciones global */}
      <Notifications />
    </>
  );
}
