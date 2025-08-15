# 🚀 **PROMPT EJECUTIVO - KALEDACADEMY**

## 📋 **OBJETIVO**
Crear una **plataforma educativa completa** llamada **KaledAcademy** inspirada en Henry, con arquitectura limpia, sistema de roles y diseño moderno.

---

## 🛠️ **STACK TÉCNICO**
- **Frontend:** React 19 + TypeScript + Vite 6.2
- **Styling:** Tailwind CSS 4.0
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Estado:** React Hooks + Custom Hooks

---

## 🏗️ **ARQUITECTURA**

### **Estructura de Carpetas:**
```
src/
├── components/
│   ├── ui/              # Button, Logo, ProgressBar, UserDropdown
│   ├── layout/          # AppHeader, MainSidebar, CohortSidebar, DashboardLayout
│   └── features/        # auth/, dashboard/, lessons/, admin/
├── hooks/               # useAuth, useNavigation, useProgress
├── types/               # TypeScript interfaces
├── data/                # Mock data
└── utils/               # Helpers
```

### **Principios:**
- ✅ Single Responsibility
- ✅ DRY (Don't Repeat Yourself)
- ✅ TypeScript estricto
- ✅ Component composition
- ✅ Custom hooks para lógica reutilizable

---

## 🔐 **SISTEMA DE ROLES**

### **Roles:**
```typescript
type UserRole = 'super_admin' | 'admin' | 'teacher' | 'student';
```

### **Funcionalidades por Rol:**
- **👑 Super Admin:** Acceso completo, gestión de administradores
- **👨‍💼 Admin:** Gestión de cursos, cohortes, usuarios, analytics
- **👨‍🏫 Teacher:** Gestión de contenido, calificaciones, comunicación
- **👨‍🎓 Student:** Acceso a contenido, tracking de progreso

---

## 🎨 **SISTEMA DE DISEÑO**

### **Tema Oscuro:**
- **Background:** Negro (#000000)
- **Surface:** Gris oscuro (#111827)
- **Primary:** Azul (#3b82f6)
- **Accent:** Amarillo (#fbbf24)

### **Layout de 3 Columnas:**
1. **Sidebar Principal:** Navegación general
2. **Sidebar Central:** Información de contexto
3. **Contenido Principal:** Vista actual

---

## 🗂️ **ENTIDADES PRINCIPALES**

### **Interfaces TypeScript:**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  price: number;
  isActive: boolean;
}

interface Module {
  id: string;
  title: string;
  description: string;
  courseId: string;
  order: number;
  lessons: string[];
}

interface Lesson {
  id: string;
  title: string;
  moduleId: string;
  order: number;
  type: 'lecture' | 'workshop';
  content: string;
  videoUrl: string;
}

interface StudentProgress {
  userId: string;
  courseId: string;
  moduleProgress: {
    moduleId: string;
    completedLessons: string[];
    progress: number;
  }[];
  overallProgress: number;
}
```

---

## 🎣 **CUSTOM HOOKS**

### **useAuth:**
```typescript
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = (userData: { name: string; email: string }) => {
    // Lógica de login con roles
  };
  
  const handleLogout = () => {
    // Lógica de logout
  };
  
  return { user, isLoggedIn, handleLogin, handleLogout };
};
```

### **useNavigation:**
```typescript
const useNavigation = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  
  // Funciones de navegación
  return { currentView, selectedModule, selectedLesson, setCurrentView, /* ... */ };
};
```

### **useProgress:**
```typescript
const useProgress = (userId: string, courseId: string) => {
  const [progress, setProgress] = useState<StudentProgress | null>(null);
  
  const updateLessonProgress = (moduleId: string, lessonId: string, completed: boolean) => {
    // Lógica de actualización de progreso
  };
  
  return { progress, updateLessonProgress, /* ... */ };
};
```

---

## 🧩 **COMPONENTES REQUERIDOS**

### **UI Components:**
1. **Button.tsx** - Con variantes (primary, secondary, ghost, yellow)
2. **Logo.tsx** - Componente reutilizable
3. **ProgressBar.tsx** - Barra de progreso animada
4. **UserDropdown.tsx** - Dropdown de usuario

### **Layout Components:**
1. **AppHeader.tsx** - Header con navegación y usuario
2. **MainSidebar.tsx** - Sidebar principal de navegación
3. **CohortSidebar.tsx** - Sidebar de información de cohorte
4. **DashboardLayout.tsx** - Layout principal que orquesta todo

### **Feature Components:**

#### **Auth:**
- **LoginForm.tsx** - Formulario de login con validación
- **LoginPage.tsx** - Página completa de login

#### **Dashboard:**
- **HomeView.tsx** - Dashboard principal personalizado
- **ModulesView.tsx** - Lista de módulos
- **ModuleDetailView.tsx** - Detalle de módulo con lecciones
- **VideoPlayer.tsx** - Reproductor de videos

#### **Lessons:**
- **LessonContentView.tsx** - Contenido de lección con sidebar
- **LessonSidebar.tsx** - Sidebar de navegación de lección
- **LessonNavigation.tsx** - Navegación entre lecciones

#### **Admin:**
- **AdminDashboard.tsx** - Dashboard administrativo
- **CoursesManagement.tsx** - CRUD de cursos
- **UsersManagement.tsx** - Gestión de usuarios
- **CohortsManagement.tsx** - Gestión de cohortes

---

## 📊 **DATOS DEMO**

### **Usuarios:**
```typescript
const demoUsers = [
  { id: '1', name: 'Ana García', email: 'ana@kaledacademy.com', role: 'super_admin' },
  { id: '2', name: 'Carlos López', email: 'carlos@kaledacademy.com', role: 'admin' },
  { id: '3', name: 'María Rodríguez', email: 'maria@kaledacademy.com', role: 'teacher' },
  { id: '4', name: 'Juan Pérez', email: 'juan@kaledacademy.com', role: 'teacher' },
  { id: '5', name: 'Laura Martínez', email: 'laura@kaledacademy.com', role: 'student' }
];
```

### **Cursos:**
- Full Stack Web Development
- Data Science & Analytics
- UX/UI Design Bootcamp

### **Cohortes:**
- FS-Jan25, DS-Feb25, UX-Mar25

---

## 🔧 **FUNCIONALIDADES CLAVE**

### **Sistema de Login:**
- Validación de email/contraseña
- Redirección automática por rol
- Datos demo integrados
- Interfaz en español

### **Dashboard Dinámico:**
- Progreso personalizado por usuario
- Métricas relevantes por rol
- Navegación intuitiva
- Responsive design

### **Gestión de Contenido:**
- CRUD de cursos y módulos
- Organización jerárquica
- Estados activo/inactivo
- Tracking de progreso

### **Tracking de Progreso:**
- Lecciones completadas
- Progreso por módulo
- Progreso general
- Historial de actividad

---

## 📱 **RESPONSIVE DESIGN**

### **Breakpoints:**
- **Mobile:** < 768px (Sidebar colapsable)
- **Tablet:** 768px - 1024px (Sidebar reducida)
- **Desktop:** > 1024px (Layout completo)

---

## 🚀 **IMPLEMENTACIÓN**

### **Fase 1: Base**
1. Configurar proyecto (Vite + React + TypeScript)
2. Instalar dependencias (Tailwind, Framer Motion, Lucide)
3. Configurar estructura de carpetas

### **Fase 2: Componentes Base**
1. Crear UI components (Button, Logo, ProgressBar, UserDropdown)
2. Crear Layout components (AppHeader, MainSidebar, CohortSidebar)
3. Implementar sistema de diseño

### **Fase 3: Autenticación**
1. Crear useAuth hook
2. Implementar LoginForm y LoginPage
3. Configurar redirección por roles
4. Integrar datos demo

### **Fase 4: Funcionalidades Core**
1. Crear useNavigation hook
2. Implementar DashboardLayout
3. Crear vistas principales (HomeView, ModulesView)
4. Implementar navegación entre vistas

### **Fase 5: Contenido y Progreso**
1. Crear useProgress hook
2. Implementar ModuleDetailView
3. Crear LessonContentView
4. Implementar tracking de progreso

### **Fase 6: Vistas Específicas**
1. Implementar vistas de admin
2. Crear VideoPlayer
3. Implementar responsive design
4. Optimizar performance

---

## 📋 **CRITERIOS DE ACEPTACIÓN**

### **Funcionalidad:**
- ✅ Login funcional con roles
- ✅ Navegación entre vistas
- ✅ Dashboard personalizado por rol
- ✅ Gestión de contenido
- ✅ Tracking de progreso
- ✅ Responsive design

### **Calidad:**
- ✅ TypeScript estricto
- ✅ Componentes reutilizables
- ✅ Hooks personalizados
- ✅ Arquitectura limpia
- ✅ Buenas prácticas
- ✅ Código documentado

---

## 🎯 **RESULTADO**
Una **plataforma educativa completa** con sistema de roles, arquitectura limpia, diseño moderno y funcionalidades completas para estudiantes, profesores y administradores.

**¡Lista para producción!** 🚀
