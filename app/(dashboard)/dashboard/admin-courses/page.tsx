"use client";

import { useApp } from "@/hooks/useApp";
import { CoursesManagement } from "@/components/features/admin/CoursesManagement";

export default function AdminCoursesPage() {
  const { currentUser, showSuccess, showError } = useApp();

  return (
    <CoursesManagement 
      user={currentUser! as any}
    />
  );
}
