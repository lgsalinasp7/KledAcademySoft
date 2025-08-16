"use client";

import { useAuthStore } from "@/stores/authStore";
import { HomeView } from "@/components/features/dashboard/HomeView";
import { AdminDashboardView } from "@/components/features/admin/AdminDashboardView";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user, signOut } = useAuthStore();
  const router = useRouter();
  
  // Determinar el rol del usuario
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';
  const isTeacher = user?.role === 'TEACHER';

  const handleLogout = () => {
    signOut();
    router.push('/login');
  };

  if (isAdmin || isTeacher) {
    return (
      <AdminDashboardView 
        user={user!} 
        onNavigateToSection={(section) => {
          // Navegar usando Next.js router
          router.push(`/dashboard/${section}`);
        }}
        onLogout={handleLogout} 
      />
    );
  }

  return (
    <HomeView 
      user={user!} 
      onNavigateToCareer={() => {
        router.push('/dashboard/content');
      }} 
      onLogout={handleLogout} 
    />
  );
}
