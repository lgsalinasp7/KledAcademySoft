import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { persist } from 'zustand/middleware';

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  credentialsGenerated: boolean;
  username?: string;
  password?: string;
  createdAt: string;
  paymentDate?: string;
  paymentNotes?: string;
  role: 'student';
  isActive: boolean;
  lastLogin?: string;
}

interface UsersState {
  students: Student[];
  isLoading: boolean;
  error: string | null;
  
  // Acciones
  fetchStudents: () => Promise<void>;
  addStudent: (studentData: Omit<Student, 'id' | 'createdAt' | 'credentialsGenerated'>) => Promise<void>;
  generateCredentials: (studentId: string) => Promise<void>;
  sendCredentials: (studentId: string, method: 'whatsapp' | 'email') => Promise<void>;
  updatePaymentStatus: (studentId: string, status: 'PENDING' | 'COMPLETED' | 'FAILED', notes?: string) => Promise<void>;
  searchStudents: (searchTerm: string) => Student[];
  clearError: () => void;
}

// Datos mock iniciales para desarrollo
const initialMockStudents: Student[] = [
  {
    id: '1',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@email.com',
    phone: '+57 300 123 4567',
    paymentStatus: 'COMPLETED',
    credentialsGenerated: true,
    username: 'carlos.mendoza1234',
    password: 'pass1234',
    createdAt: '2024-01-15T10:00:00Z',
    paymentDate: '2024-01-15T10:00:00Z',
    role: 'student',
    isActive: true
  },
  {
    id: '2',
    name: 'Ana Rodríguez',
    email: 'ana.rodriguez@email.com',
    phone: '+57 300 234 5678',
    paymentStatus: 'COMPLETED',
    credentialsGenerated: true,
    username: 'ana.rodriguez5678',
    password: 'pass5678',
    createdAt: '2024-01-16T11:00:00Z',
    paymentDate: '2024-01-16T11:00:00Z',
    role: 'student',
    isActive: true
  },
  {
    id: '3',
    name: 'Luis Pérez',
    email: 'luis.perez@email.com',
    phone: '+57 300 345 6789',
    paymentStatus: 'PENDING',
    credentialsGenerated: false,
    createdAt: '2024-01-17T12:00:00Z',
    role: 'student',
    isActive: true
  },
  {
    id: '4',
    name: 'liliana ospino',
    email: 'liliana.ospino@email.com',
    phone: '+57 300 456 7890',
    paymentStatus: 'PENDING',
    credentialsGenerated: false,
    createdAt: '2024-01-18T13:00:00Z',
    role: 'student',
    isActive: true
  },
  {
    id: '5',
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '+57 300 567 8901',
    paymentStatus: 'FAILED',
    credentialsGenerated: false,
    createdAt: '2024-01-19T14:00:00Z',
    paymentNotes: 'Tarjeta rechazada por fondos insuficientes',
    role: 'student',
    isActive: true
  }
];

export const useUsersStore = create<UsersState>()(
  subscribeWithSelector(
    devtools(
      persist(
        (set, get) => ({
          // Estado inicial
          students: initialMockStudents,
          isLoading: false,
          error: null,
          
          // Acciones
          fetchStudents: async () => {
            set({ isLoading: true, error: null });
            
            try {
              const response = await fetch('/api/users?role=STUDENT');
              const data = await response.json();
              
              if (!response.ok) {
                throw new Error(data.error || 'Error obteniendo estudiantes');
              }
              
              // Convertir datos de la API al formato del store
              const students: Student[] = data.users.map((user: any) => ({
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone || '',
                paymentStatus: user.paymentStatus || 'PENDING',
                credentialsGenerated: user.credentialsGenerated || false,
                username: user.username,
                password: user.password,
                createdAt: user.createdAt,
                paymentDate: user.paymentDate,
                paymentNotes: user.paymentNotes,
                role: 'student' as const,
                isActive: user.isActive,
                lastLogin: user.lastLogin
              }));
              
              set({ students, isLoading: false });
              
            } catch (error) {
              console.error('Error fetching students:', error);
              set({ 
                error: error instanceof Error ? error.message : 'Error obteniendo estudiantes',
                isLoading: false 
              });
            }
          },
          
          addStudent: async (studentData) => {
            set({ isLoading: true, error: null });
            
            try {
              const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  ...studentData,
                  role: 'STUDENT',
                  generateCredentials: false
                }),
              });
              
              const data = await response.json();
              
              if (!response.ok) {
                throw new Error(data.error || 'Error creando estudiante');
              }
              
              // Agregar el nuevo estudiante al estado
              const newStudent: Student = {
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                phone: data.user.phone || '',
                paymentStatus: data.user.paymentStatus || 'PENDING',
                credentialsGenerated: data.user.credentialsGenerated || false,
                username: data.user.username,
                password: data.user.password,
                createdAt: data.user.createdAt,
                paymentDate: data.user.paymentDate,
                paymentNotes: data.user.paymentNotes,
                role: 'student',
                isActive: data.user.isActive,
                lastLogin: data.user.lastLogin
              };
              
              set(state => ({
                students: [newStudent, ...state.students],
                isLoading: false
              }));
              
            } catch (error) {
              console.error('Error adding student:', error);
              set({ 
                error: error instanceof Error ? error.message : 'Error creando estudiante',
                isLoading: false 
              });
            }
          },
          
          generateCredentials: async (studentId: string) => {
            set({ isLoading: true, error: null });
            
            try {
              const response = await fetch(`/api/users/${studentId}/generate-credentials`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              
              const data = await response.json();
              
              if (!response.ok) {
                throw new Error(data.error || 'Error generando credenciales');
              }
              
              // Actualizar el estudiante en el estado
              set(state => ({
                students: state.students.map(student =>
                  student.id === studentId
                    ? {
                        ...student,
                        username: data.credentials.username,
                        password: data.credentials.password,
                        credentialsGenerated: true
                      }
                    : student
                ),
                isLoading: false
              }));
              
            } catch (error) {
              console.error('Error generating credentials:', error);
              set({ 
                error: error instanceof Error ? error.message : 'Error generando credenciales',
                isLoading: false 
              });
            }
          },
          
          sendCredentials: async (studentId: string, method: 'whatsapp' | 'email') => {
            // Por ahora solo simulamos el envío
            console.log(`Enviando credenciales a estudiante ${studentId} por ${method}`);
            
            // En el futuro, aquí se implementaría la lógica real de envío
            // Por ejemplo, integración con WhatsApp Business API o servicios de email
          },
          
          updatePaymentStatus: async (studentId: string, status: 'PENDING' | 'COMPLETED' | 'FAILED', notes?: string) => {
            set({ isLoading: true, error: null });
            
            try {
              const response = await fetch(`/api/users/${studentId}/payment-status`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  paymentStatus: status,
                  paymentNotes: notes
                }),
              });
              
              const data = await response.json();
              
              if (!response.ok) {
                throw new Error(data.error || 'Error actualizando estado de pago');
              }
              
              // Actualizar el estudiante en el estado
              set(state => ({
                students: state.students.map(student =>
                  student.id === studentId
                    ? {
                        ...student,
                        paymentStatus: data.user.paymentStatus,
                        paymentDate: data.user.paymentDate,
                        paymentNotes: data.user.paymentNotes
                      }
                    : student
                ),
                isLoading: false
              }));
              
            } catch (error) {
              console.error('Error updating payment status:', error);
              set({ 
                error: error instanceof Error ? error.message : 'Error actualizando estado de pago',
                isLoading: false 
              });
            }
          },
          
          searchStudents: (searchTerm: string) => {
            const { students } = get();
            if (!searchTerm.trim()) return students;
            
            const term = searchTerm.toLowerCase();
            return students.filter(student =>
              student.name.toLowerCase().includes(term) ||
              student.email.toLowerCase().includes(term) ||
              (student.username && student.username.toLowerCase().includes(term))
            );
          },
          
          clearError: () => {
            set({ error: null });
          }
        }),
        { name: 'users-store' }
      )
    )
  )
);
