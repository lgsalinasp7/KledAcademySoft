# 🎓 KaledAcademy - Plataforma Educativa

Una plataforma educativa moderna construida con Next.js 14, TypeScript, Prisma y Supabase.

## 🚀 Características

### ✨ **Funcionalidades Principales**
- 🔐 **Sistema de autenticación** completo con Supabase Auth
- 🏠 **Dashboard principal** con vista de progreso personal
- 📚 **Sistema de módulos** y lecciones interactivas
- 🎥 **Reproductor de videos** con filtros y búsqueda
- 👥 **Gestión de cohortes** con información detallada
- 📊 **Tracking de progreso** con barras animadas
- 👨‍🏫 **Panel de profesor** para gestión de cursos y estudiantes
- 👨‍💼 **Panel de administrador** para gestión completa

### 🏗️ **Arquitectura Moderna**
- ⚛️ **Next.js 14** con App Router
- 📘 **TypeScript** para type safety
- 🎨 **Tailwind CSS** para styling
- 🎭 **Framer Motion** para animaciones
- 🗂️ **Arquitectura modular** escalable
- 🗄️ **Prisma ORM** con PostgreSQL
- ☁️ **Supabase** para backend y autenticación

### 🎨 **UI/UX**
- 🌙 **Tema oscuro** consistente
- 📱 **Responsive design** mobile-first
- ✨ **Animaciones fluidas** con Framer Motion
- 🎯 **Componentes reutilizables** con shadcn/ui

## 📁 Estructura del Proyecto

```
app/
├── (auth)/              # Rutas de autenticación
│   └── login/
├── (dashboard)/         # Rutas del dashboard
│   ├── admin/           # Panel de administrador
│   ├── teacher-dashboard/ # Panel de profesor
│   └── layout.tsx
├── api/                 # API routes
├── globals.css
├── layout.tsx
└── page.tsx

components/
├── ui/                  # Componentes de shadcn/ui
├── layout/              # Componentes de estructura
└── features/            # Features específicos
    ├── admin/           # Componentes de administrador
    ├── dashboard/       # Componentes del dashboard
    └── lessons/         # Sistema de lecciones

lib/
├── config.ts            # Configuración centralizada
├── logger.ts            # Sistema de logging
├── prisma.ts            # Cliente de Prisma
└── utils.ts             # Utilidades

stores/                  # Stores de Zustand
├── authStore.ts
├── navigationStore.ts
└── progressStore.ts

prisma/
├── schema.prisma        # Esquema de base de datos
└── seed.ts              # Datos iniciales
```

## 🛠️ Tecnologías

| Categoría | Tecnología | Versión |
|-----------|------------|---------|
| **Framework** | Next.js | ^14.0.4 |
| **Language** | TypeScript | ^5.6.2 |
| **Styling** | Tailwind CSS | ^3.4.0 |
| **UI Components** | shadcn/ui | Latest |
| **Animations** | Framer Motion | ^12.4.10 |
| **Icons** | Lucide React | ^0.477.0 |
| **Database** | Prisma + PostgreSQL | Latest |
| **Backend** | Supabase | Latest |
| **State Management** | Zustand | Latest |

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- PostgreSQL (local o Supabase)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/kaledacademy.git

# Navegar al directorio
cd kaledacademy

# Instalar dependencias
npm install

# Configurar variables de entorno
cp env.example .env.local

# Configurar base de datos
npm run db:push

# Ejecutar en desarrollo
npm run dev
```

### Scripts Disponibles

```bash
npm run dev              # Servidor de desarrollo
npm run build            # Build de producción
npm run start            # Servidor de producción
npm run lint             # Linting con ESLint
npm run lint:fix         # Linting y auto-fix
npm run type-check       # Verificación de tipos
npm run test             # Tests unitarios
npm run test:watch       # Tests en modo watch
npm run db:push          # Push del esquema a la DB
npm run db:studio        # Abrir Prisma Studio
npm run clean            # Limpiar cache y reinstalar
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` basado en `env.example`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima

# Base de datos
DATABASE_URL=tu_url_de_postgresql
DIRECT_URL=tu_url_directa_de_postgresql

# Next.js
NEXTAUTH_SECRET=tu_secreto
NEXTAUTH_URL=http://localhost:3000

# Soporte
NEXT_PUBLIC_SUPPORT_WHATSAPP=+1234567890
NEXT_PUBLIC_SUPPORT_EMAIL=soporte@kaledacademy.com
```

## 📚 Documentación

- [Guía de Seguridad](SECURITY-IMPROVEMENTS.md)
- [Resumen de Implementación](IMPLEMENTATION-SUMMARY.md)
- [Solución de Problemas](TROUBLESHOOTING.md)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.