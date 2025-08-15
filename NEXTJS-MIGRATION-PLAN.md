# Plan de Migración a Next.js con Zustand, Prisma y Supabase

Este documento razona y detalla la migración del proyecto existente a una arquitectura basada en **Next.js** tanto para el frontend como para el backend. La meta es disponer de un entorno moderno, escalable y con un sistema de diseño consistente gracias a **Shadcn UI**.

## Objetivos
- Unificar frontend y backend en un solo proyecto Next.js.
- Gestionar el estado global con **Zustand**.
- Utilizar **Prisma** como ORM conectado a **Supabase (PostgreSQL)**.
- Reemplazar la librería de UI actual por **Shadcn UI** sobre **TailwindCSS**.

## Fases de Implementación
1. **Configuración Inicial**
   - Crear proyecto Next.js con TypeScript y Tailwind.
   - Añadir dependencias: `@supabase/supabase-js`, `prisma`, `@prisma/client`, `zustand`, `shadcn-ui` y utilidades de estilos.
2. **Base de Datos con Prisma + Supabase**
   - Ejecutar `npx prisma init` y configurar `schema.prisma` apuntando a Supabase.
   - Definir modelos principales: `User`, `Cohort`, `Module`, `Lesson`, `Progress`.
   - Migrar la base de datos y generar el cliente Prisma.
3. **Estado Global con Zustand**
   - Crear stores (`useAuthStore`, `useCohortStore`, etc.).
   - Configurar persistencia cuando sea necesario.
4. **Interface y Componentes**
   - Inicializar Shadcn UI (`npx shadcn-ui init`).
   - Agregar componentes base (botones, inputs, tarjetas) y adaptar estilos.
   - Organizar la carpeta `components/ui` para reutilización.
5. **Rutas y API**
   - Implementar rutas en `app/` de Next.js.
   - Crear endpoints en `app/api/*` usando Prisma para CRUD de módulos, lecciones y progreso.
   - Proteger rutas con middleware y Supabase Auth.
6. **Pruebas y Calidad**
   - Configurar ESLint y Prettier.
   - Añadir Vitest y Testing Library para tests unitarios.
7. **Deploy**
   - Preparar deploy en Vercel con variables de entorno.
   - Ejecutar `prisma migrate deploy` en cada despliegue.

## Consideraciones
- Mantener los componentes UI desacoplados y fáciles de probar.
- Documentar modelos y endpoints para asegurar mantenibilidad.
- Planificar una migración por etapas para evitar interrupciones del servicio.

