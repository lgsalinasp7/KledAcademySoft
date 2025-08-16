"use client";

import { useAuthStore } from "@/stores/authStore";
import { CoursesManagement } from "@/components/features/admin/CoursesManagement";

export default function AdminCoursesPage() {
  const { user } = useAuthStore();

  return (
    <CoursesManagement 
      user={user! as any}
    />
  );
}
