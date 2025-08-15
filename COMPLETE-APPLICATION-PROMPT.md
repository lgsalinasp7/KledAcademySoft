# 🚀 **PROMPT COMPLETO - KALEDACADEMY PLATFORM**

## 📋 **CONTEXTO Y OBJETIVO**

Necesito crear una **plataforma educativa completa** llamada **KaledAcademy** inspirada en Henry, con arquitectura limpia, buenas prácticas de código y sistema de roles completo. La aplicación debe ser escalable, mantenible y seguir las mejores prácticas de desarrollo moderno.

---

## 🎯 **REQUISITOS TÉCNICOS**

### **Stack Tecnológico:**
- **Frontend:** React 19 + TypeScript + Vite 6.2
- **Styling:** Tailwind CSS 4.0
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Estado:** React Hooks (useState, useEffect, custom hooks)
- **Arquitectura:** Component-based con separación de responsabilidades

### **Arquitectura de Carpetas:**
```
src/
├── components/
│   ├── ui/              # Componentes reutilizables
│   ├── layout/          # Componentes de estructura
│   └── features/        # Features específicos por dominio
├── hooks/               # Custom React hooks
├── types/               # TypeScript definitions
├── data/                # Mock data y constantes
└── utils/               # Utilidades helpers
```

---

## 🏗️ **ARQUITECTURA Y BUENAS PRÁCTICAS**

### **1. Principios de Diseño:**
- **Single Responsibility:** Cada componente tiene una responsabilidad específica
- **DRY (Don't Repeat Yourself):** Evitar duplicación de código
- **Separation of Concerns:** Separar lógica de negocio, UI y datos
- **Type Safety:** TypeScript estricto en toda la aplicación
- **Component Composition:** Componer componentes complejos desde simples

### **2. Estructura de Componentes:**
- **UI Components:** Reutilizables, sin lógica de negocio
- **Layout Components:** Manejan estructura y navegación
- **Feature Components:** Lógica específica de cada funcionalidad
- **Custom Hooks:** Lógica reutilizable y manejo de estado

### **3. Convenciones de Código:**
- **Naming:** PascalCase para componentes, camelCase para funciones
- **Imports:** Organizados por tipo (React, librerías, internos)
- **Props:** Interfaces TypeScript para todas las props
- **Error Handling:** Manejo consistente de errores
- **Performance:** Memoización cuando sea necesario

---

## 🔐 **SISTEMA DE AUTENTICACIÓN Y ROLES**

### **Roles de Usuario:**
```typescript
type UserRole = 'super_admin' | 'admin' | 'teacher' | 'student';
```

### **Funcionalidades por Rol:**

#### **👑 Super Admin:**
- Acceso completo a todas las funcionalidades
- Gestión de administradores y profesores
- Configuraciones globales del sistema

#### **👨‍💼 Admin:**
- Gestión de cursos, cohortes y usuarios
- Analytics y reportes
- Configuraciones de la plataforma

#### **👨‍🏫 Teacher:**
- Gestión de contenido educativo
- Calificación de estudiantes
- Comunicación con cohortes

#### **👨‍🎓 Student:**
- Acceso a contenido educativo
- Tracking de progreso
- Comunicación con profesores

---

## 🎨 **SISTEMA DE DISEÑO**

### **Paleta de Colores:**
```css
/* Primary Colors */
--primary-blue: #1e3a8a;
--primary-blue-light: #3b82f6;
--secondary-gray: #111827;
--accent-yellow: #fbbf24;

/* Status Colors */
--success-green: #10b981;
--error-red: #ef4444;
--warning-orange: #f59e0b;
```

### **Tipografía:**
- **Font Family:** Inter, system fonts
- **Scales:** 12px → 48px con ratio 1.25
- **Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### **Componentes Base:**
- **Button:** Con variantes (primary, secondary, ghost, yellow)
- **Logo:** Componente reutilizable con diferentes tamaños
- **ProgressBar:** Barra de progreso animada
- **UserDropdown:** Dropdown de usuario con animaciones

---

## 📱 **LAYOUT Y NAVEGACIÓN**

### **Estructura de 3 Columnas (Inspirada en Henry):**
1. **Sidebar Principal:** Navegación general
2. **Sidebar Central:** Información específica del contexto
3. **Contenido Principal:** Vista actual

### **Navegación Responsive:**
- **Desktop:** 3 columnas completas
- **Tablet:** Sidebar colapsable
- **Mobile:** Navegación hamburger

### **Vistas Principales:**
- **Home:** Dashboard personalizado
- **Content:** Módulos y lecciones
- **Video Feed:** Reproductor de videos
- **Members:** Gestión de usuarios
- **Academic Data:** Reportes y analytics
- **Payment Management:** Gestión de pagos

---

## 🗂️ **ESTRUCTURA DE DATOS**

### **Entidades Principales:**
```typescript
// Usuarios
interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

// Cursos
interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  price: number;
  currency: string;
  isActive: boolean;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// Cohortes
interface Cohort {
  id: string;
  name: string;
  courseId: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  currentStudents: number;
  status: 'active' | 'inactive' | 'completed';
  teacherId: string;
  schedule: string;
  timezone: string;
}

// Módulos
interface Module {
  id: string;
  title: string;
  description: string;
  courseId: string;
  order: number;
  duration: string;
  lessons: string[];
  isActive: boolean;
}

// Lecciones
interface Lesson {
  id: string;
  title: string;
  description: string;
  moduleId: string;
  order: number;
  duration: string;
  type: 'lecture' | 'workshop';
  content: string;
  videoUrl: string;
  materials: string[];
  isActive: boolean;
}

// Progreso de Estudiantes
interface StudentProgress {
  userId: string;
  courseId: string;
  moduleProgress: {
    moduleId: string;
    completedLessons: string[];
    currentLesson: string;
    progress: number;
  }[];
  overallProgress: number;
  lastActivity: string;
}
```

---

## 🎣 **CUSTOM HOOKS**

### **useAuth:**
```typescript
const useAuth = () => {
  // Manejo de autenticación
  // Gestión de roles
  // Login/logout
  // Datos del usuario actual
}
```

### **useNavigation:**
```typescript
const useNavigation = () => {
  // Navegación entre vistas
  // Estado de navegación
  // Historial de navegación
}
```

### **useProgress:**
```typescript
const useProgress = (userId: string, courseId: string) => {
  // Tracking de progreso
  // Actualización de lecciones completadas
  // Cálculo de progreso general
}
```

---

## 🧩 **COMPONENTES REQUERIDOS**

### **UI Components:**
1. **Button.tsx** - Botón reutilizable con variantes
2. **Logo.tsx** - Componente del logo
3. **ProgressBar.tsx** - Barra de progreso
4. **UserDropdown.tsx** - Dropdown de usuario

### **Layout Components:**
1. **AppHeader.tsx** - Header principal
2. **MainSidebar.tsx** - Sidebar de navegación
3. **CohortSidebar.tsx** - Sidebar de cohorte
4. **DashboardLayout.tsx** - Layout principal

### **Feature Components:**

#### **Auth:**
1. **LoginForm.tsx** - Formulario de login
2. **LoginPage.tsx** - Página de login

#### **Dashboard:**
1. **HomeView.tsx** - Vista principal
2. **ModulesView.tsx** - Lista de módulos
3. **ModuleDetailView.tsx** - Detalle de módulo
4. **VideoPlayer.tsx** - Reproductor de videos

#### **Lessons:**
1. **LessonContentView.tsx** - Contenido de lección
2. **LessonSidebar.tsx** - Sidebar de lección
3. **LessonNavigation.tsx** - Navegación entre lecciones

#### **Admin:**
1. **AdminDashboard.tsx** - Dashboard administrativo
2. **CoursesManagement.tsx** - Gestión de cursos
3. **UsersManagement.tsx** - Gestión de usuarios
4. **CohortsManagement.tsx** - Gestión de cohortes

---

## 📊 **DATOS DEMO**

### **Usuarios Demo:**
```typescript
const demoUsers = [
  {
    id: '1',
    name: 'Ana García',
    email: 'ana@kaledacademy.com',
    role: 'super_admin'
  },
  {
    id: '2',
    name: 'Carlos López',
    email: 'carlos@kaledacademy.com',
    role: 'admin'
  },
  {
    id: '3',
    name: 'María Rodríguez',
    email: 'maria@kaledacademy.com',
    role: 'teacher'
  },
  {
    id: '4',
    name: 'Juan Pérez',
    email: 'juan@kaledacademy.com',
    role: 'teacher'
  },
  {
    id: '5',
    name: 'Laura Martínez',
    email: 'laura@kaledacademy.com',
    role: 'student'
  }
];
```

### **Cursos Demo:**
- Full Stack Web Development
- Data Science & Analytics
- UX/UI Design Bootcamp

### **Cohortes Demo:**
- FS-Jan25 (Full Stack)
- DS-Feb25 (Data Science)
- UX-Mar25 (UX/UI)

---

## 🎨 **DISEÑO VISUAL**

### **Tema Oscuro:**
- **Background:** Negro (#000000)
- **Surface:** Gris oscuro (#111827)
- **Text:** Blanco (#FFFFFF)
- **Accents:** Azul (#3b82f6) y Amarillo (#fbbf24)

### **Componentes Visuales:**
- **Cards:** Bordes redondeados, sombras sutiles
- **Buttons:** Gradientes, hover effects
- **Progress:** Barras animadas con colores
- **Icons:** Lucide React con consistencia visual

### **Animaciones:**
- **Page Transitions:** Framer Motion
- **Hover Effects:** Smooth transitions
- **Loading States:** Spinners y skeletons
- **Micro-interactions:** Feedback visual inmediato

---

## 🔧 **FUNCIONALIDADES ESPECÍFICAS**

### **Sistema de Login:**
- Validación de email y contraseña
- Redirección según rol
- Datos demo integrados
- Interfaz en español

### **Dashboard Dinámico:**
- Progreso personalizado
- Próximas actividades
- Métricas relevantes
- Navegación intuitiva

### **Gestión de Contenido:**
- CRUD de cursos y módulos
- Subida de materiales
- Organización jerárquica
- Estados activo/inactivo

### **Tracking de Progreso:**
- Lecciones completadas
- Progreso por módulo
- Progreso general
- Historial de actividad

---

## 📱 **RESPONSIVE DESIGN**

### **Breakpoints:**
- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### **Adaptaciones:**
- **Mobile:** Sidebar colapsable, navegación hamburger
- **Tablet:** Sidebar reducida, contenido adaptativo
- **Desktop:** Layout completo de 3 columnas

---

## 🚀 **IMPLEMENTACIÓN PASO A PASO**

### **Fase 1: Configuración Base**
1. Crear proyecto con Vite + React + TypeScript
2. Configurar Tailwind CSS
3. Instalar dependencias (Framer Motion, Lucide React)
4. Configurar estructura de carpetas

### **Fase 2: Componentes Base**
1. Crear componentes UI (Button, Logo, ProgressBar)
2. Implementar sistema de diseño
3. Crear componentes de layout
4. Configurar navegación base

### **Fase 3: Autenticación**
1. Implementar sistema de roles
2. Crear formulario de login
3. Configurar redirección por roles
4. Integrar datos demo

### **Fase 4: Funcionalidades Core**
1. Dashboard principal
2. Sistema de módulos
3. Reproductor de videos
4. Tracking de progreso

### **Fase 5: Vistas Específicas**
1. Vista de administrador
2. Vista de profesor
3. Vista de estudiante
4. Gestión de contenido

### **Fase 6: Optimización**
1. Performance optimization
2. Responsive design
3. Testing
4. Documentación

---

## 📋 **CRITERIOS DE ACEPTACIÓN**

### **Funcionalidad:**
- ✅ Login funcional con roles
- ✅ Navegación entre vistas
- ✅ Dashboard personalizado por rol
- ✅ Gestión de contenido
- ✅ Tracking de progreso
- ✅ Responsive design

### **Calidad de Código:**
- ✅ TypeScript estricto
- ✅ Componentes reutilizables
- ✅ Hooks personalizados
- ✅ Arquitectura limpia
- ✅ Buenas prácticas
- ✅ Código documentado

### **UX/UI:**
- ✅ Diseño consistente
- ✅ Animaciones fluidas
- ✅ Interacciones intuitivas
- ✅ Accesibilidad básica
- ✅ Performance optimizada

---

## 🎯 **RESULTADO ESPERADO**

Una **plataforma educativa completa** con:

1. **🔐 Sistema de autenticación robusto** con roles y permisos
2. **📚 Gestión completa de contenido** educativo
3. **📊 Tracking de progreso** en tiempo real
4. **👥 Gestión de usuarios** y cohortes
5. **🎨 Diseño moderno** y responsive
6. **🏗️ Arquitectura escalable** y mantenible
7. **⚡ Performance optimizada** y accesible

**¡Lista para producción y escalabilidad!** 🚀

---

## 💡 **NOTAS IMPORTANTES**

- **Mantener consistencia** en el sistema de diseño
- **Seguir las mejores prácticas** de React y TypeScript
- **Priorizar la experiencia de usuario** en todas las decisiones
- **Documentar el código** para facilitar el mantenimiento
- **Considerar la escalabilidad** desde el inicio
- **Implementar testing** para garantizar calidad

**¡Crea una aplicación que sea un ejemplo de excelencia en desarrollo frontend!** 💪
