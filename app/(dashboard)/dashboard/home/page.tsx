"use client";

import { useApp } from "@/hooks/useApp";
import { HomeView } from "@/components/features/dashboard/HomeView";
import { AdminDashboardView } from "@/components/features/admin/AdminDashboardView";

export default function HomePage() {
  const { 
    currentUser, 
    isAdmin, 
    isTeacher, 
    signOut,
    goToContent,
    goToAdmin,
    goToCourses,
    goToUsers,
    goToCohorts
  } = useApp();

  const handleLogout = () => {
    signOut();
  };

  if (isAdmin || isTeacher) {
    return (
      <AdminDashboardView 
        user={currentUser!} 
        onNavigateToSection={(section) => {
          // Usar las acciones optimizadas del store
          switch (section) {
            case 'admin-dashboard':
              goToAdmin();
              break;
            case 'admin-courses':
              goToCourses();
              break;
            case 'admin-users':
              goToUsers();
              break;
            case 'admin-cohorts':
              goToCohorts();
              break;
            default:
              window.location.href = `/dashboard/${section}`;
          }
        }}
        onLogout={handleLogout} 
      />
    );
  }

  return (
    <HomeView 
      user={currentUser!} 
      onNavigateToCareer={() => {
        goToContent();
      }} 
      onLogout={handleLogout} 
    />
  );
}
