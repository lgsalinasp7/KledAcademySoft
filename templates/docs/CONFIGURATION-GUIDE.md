# Guía de Configuración - KaledAcademy Templates

## 📋 Descripción

Esta guía te ayudará a configurar y personalizar tu aplicación basada en los templates de KaledAcademy.

## 🚀 Proceso de Configuración

### 1. Crear un Nuevo Proyecto

```bash
# Crear proyecto desde template
npm run create-template <template-name> [project-name]

# Ejemplos:
npm run create-template educational mi-escuela
npm run create-template business mi-empresa
npm run create-template ecommerce mi-tienda
npm run create-template healthcare mi-clinica
npm run create-template minimal mi-app-simple
```

### 2. Configurar la Aplicación

```bash
# Ejecutar configurador interactivo
npm run configure-app
```

El configurador te preguntará por:

- **Información básica**: Nombre, descripción, versión, autor
- **Branding**: Nombre de marca, tagline, descripción
- **Contacto**: Email, teléfono, dirección, sitio web
- **Base de datos**: Proveedor (PostgreSQL, MySQL, SQLite)
- **Autenticación**: Proveedor (Supabase, Auth0, NextAuth)

### 3. Personalizar Branding

```bash
# Personalizar colores, logos y temas
npm run customize-branding
```

### 4. Configurar Base de Datos

```bash
# Configurar esquema y conexión
npm run setup-database
```

## 📁 Estructura de Archivos de Configuración

```
lib/config/
├── index.ts              # Configuración principal
├── app.ts                # Configuración de la aplicación
├── branding.ts           # Configuración de marca
├── themes.ts             # Configuración de temas
├── roles.ts              # Configuración de roles
├── custom.ts             # Configuración personalizada
└── template.ts           # Configuración del template
```

## 🔧 Configuración Manual

### Configuración de la Aplicación (`lib/config/app.ts`)

```typescript
export const appConfig = {
  name: 'Mi Aplicación',
  version: '1.0.0',
  description: 'Descripción de mi aplicación',
  author: 'Mi Nombre',
  repository: 'https://github.com/usuario/repositorio',
  
  // Configuración de la aplicación
  app: {
    port: 3000,
    environment: 'development',
    debug: true,
    apiPrefix: '/api'
  },

  // Configuración de base de datos
  database: {
    provider: 'postgresql',
    url: process.env.DATABASE_URL
  },

  // Configuración de autenticación
  auth: {
    provider: 'supabase',
    secret: process.env.NEXTAUTH_SECRET
  }
};
```

### Configuración de Branding (`lib/config/branding.ts`)

```typescript
export const brandingConfig = {
  name: 'Mi Marca',
  tagline: 'Tagline de mi marca',
  description: 'Descripción de mi marca',
  
  // Información de contacto
  contact: {
    email: 'info@miapp.com',
    phone: '+1 (555) 123-4567',
    address: 'Dirección de mi empresa',
    website: 'https://miapp.com'
  },

  // Redes sociales
  social: {
    facebook: 'https://facebook.com/miapp',
    twitter: 'https://twitter.com/miapp',
    instagram: 'https://instagram.com/miapp',
    linkedin: 'https://linkedin.com/company/miapp'
  },

  // Colores del tema
  colors: {
    primary: '#3b82f6',
    secondary: '#1f2937',
    accent: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  }
};
```

### Configuración de Temas (`lib/config/themes.ts`)

```typescript
export const themeConfig = {
  id: 'myTheme',
  name: 'Mi Tema Personalizado',
  description: 'Tema personalizado para mi aplicación',
  
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      900: '#1e3a8a'
    },
    secondary: {
      50: '#f9fafb',
      100: '#f3f4f6',
      500: '#6b7280',
      900: '#111827'
    }
  },

  fonts: {
    primary: 'Inter',
    secondary: 'Roboto',
    mono: 'Fira Code'
  }
};
```

## 🎨 Personalización de Temas

### Crear un Tema Personalizado

1. **Definir colores**:
```typescript
const customColors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#0ea5e9',
    900: '#0c4a6e'
  }
};
```

2. **Definir fuentes**:
```typescript
const customFonts = {
  primary: 'Poppins',
  secondary: 'Open Sans',
  mono: 'JetBrains Mono'
};
```

3. **Crear tema completo**:
```typescript
export const customTheme = {
  id: 'custom',
  name: 'Tema Personalizado',
  colors: customColors,
  fonts: customFonts,
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  }
};
```

## 🔐 Configuración de Autenticación

### Supabase

```bash
# Variables de entorno
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### Auth0

```bash
# Variables de entorno
AUTH0_SECRET=your-auth0-secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=your-auth0-domain
AUTH0_CLIENT_ID=your-auth0-client-id
AUTH0_CLIENT_SECRET=your-auth0-client-secret
```

### NextAuth

```bash
# Variables de entorno
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

## 🗄️ Configuración de Base de Datos

### PostgreSQL

```bash
# Variable de entorno
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

### MySQL

```bash
# Variable de entorno
DATABASE_URL=mysql://username:password@localhost:3306/database_name
```

### SQLite

```bash
# Variable de entorno
DATABASE_URL=file:./prisma/dev.db
```

## 📊 Configuración de Módulos

### Habilitar/Deshabilitar Módulos

```typescript
// lib/config/modules.ts
export const modulesConfig = {
  auth: {
    enabled: true,
    required: true
  },
  dashboard: {
    enabled: true,
    required: true
  },
  admin: {
    enabled: false,
    required: false
  },
  analytics: {
    enabled: true,
    required: false
  }
};
```

### Configurar Permisos por Módulo

```typescript
// lib/config/permissions.ts
export const permissionsConfig = {
  'auth:login': {
    roles: ['SUPER_ADMIN', 'ADMIN', 'USER']
  },
  'admin:users:read': {
    roles: ['SUPER_ADMIN', 'ADMIN']
  },
  'dashboard:read': {
    roles: ['SUPER_ADMIN', 'ADMIN', 'USER']
  }
};
```

## 🚀 Deployment

### Vercel

```bash
# Deploy a Vercel
npm run deploy:vercel
```

### Docker

```bash
# Deploy con Docker
npm run deploy:docker
```

### Manual

```bash
# Deploy manual
npm run deploy:manual
```

## 🔍 Verificación de Configuración

### Verificar Configuración

```bash
# Verificar que todo esté configurado correctamente
npm run type-check
npm run lint
npm run test
```

### Verificar Base de Datos

```bash
# Verificar conexión a base de datos
npm run db:generate
npm run db:push
```

### Verificar Autenticación

```bash
# Verificar configuración de autenticación
npm run dev
# Ir a http://localhost:3000/login
```

## 🛠️ Solución de Problemas

### Error de Configuración

1. **Verificar variables de entorno**:
```bash
# Verificar que .env.local existe y tiene las variables correctas
cat .env.local
```

2. **Verificar configuración de TypeScript**:
```bash
# Verificar tipos
npm run type-check
```

3. **Verificar configuración de Prisma**:
```bash
# Regenerar cliente de Prisma
npm run db:generate
```

### Error de Base de Datos

1. **Verificar conexión**:
```bash
# Verificar URL de base de datos
echo $DATABASE_URL
```

2. **Verificar esquema**:
```bash
# Verificar esquema de Prisma
npx prisma validate
```

3. **Aplicar migraciones**:
```bash
# Aplicar migraciones
npm run db:push
```

### Error de Autenticación

1. **Verificar proveedor**:
```bash
# Verificar configuración del proveedor de autenticación
cat lib/config/auth.ts
```

2. **Verificar variables de entorno**:
```bash
# Verificar variables de autenticación
grep -E "(AUTH|SUPABASE|NEXTAUTH)" .env.local
```

3. **Verificar configuración de NextAuth**:
```bash
# Verificar configuración de NextAuth
cat lib/auth.ts
```

## 📚 Recursos Adicionales

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Prisma](https://www.prisma.io/docs)
- [Documentación de Supabase](https://supabase.com/docs)
- [Documentación de Auth0](https://auth0.com/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación de Shadcn/ui](https://ui.shadcn.com/)

## 🤝 Soporte

Si tienes problemas con la configuración:

1. **Revisar logs**: `npm run dev` y revisar la consola
2. **Verificar documentación**: Revisar esta guía y la documentación oficial
3. **Crear issue**: Crear un issue en el repositorio del proyecto
4. **Contactar soporte**: Enviar email a soporte@kaledacademy.com

---

**Última actualización**: Diciembre 2024  
**Versión**: 1.0.0
