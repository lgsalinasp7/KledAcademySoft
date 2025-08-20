# Sistema de Templates - KaledAcademy

## 📋 Descripción

Este sistema de templates permite crear rápidamente diferentes tipos de aplicaciones basadas en la arquitectura modular de KaledAcademy.

## 🎯 Tipos de Templates Disponibles

### 1. **Educational Platform** (Plataforma Educativa)
- **Descripción**: Plataforma completa para escuelas, academias y centros educativos
- **Características**: Cursos, lecciones, estudiantes, profesores, evaluaciones
- **Módulos**: auth, admin, dashboard, lessons, analytics, calendar, notifications

### 2. **Business Management** (Gestión Empresarial)
- **Descripción**: Sistema de gestión empresarial con roles y permisos
- **Características**: Empleados, proyectos, reportes, calendario
- **Módulos**: auth, admin, dashboard, projects, analytics, calendar, notifications

### 3. **E-commerce Platform** (Plataforma de Comercio)
- **Descripción**: Plataforma de comercio electrónico completa
- **Características**: Productos, carrito, pagos, inventario
- **Módulos**: auth, admin, dashboard, products, orders, analytics, notifications

### 4. **Healthcare System** (Sistema de Salud)
- **Descripción**: Sistema de gestión para clínicas y hospitales
- **Características**: Pacientes, citas, historiales médicos
- **Módulos**: auth, admin, dashboard, patients, appointments, analytics, notifications

### 5. **Minimal Template** (Template Mínimo)
- **Descripción**: Template básico para aplicaciones simples
- **Características**: Solo autenticación y dashboard básico
- **Módulos**: auth, dashboard

## 🚀 Proceso de Creación

### 1. Seleccionar Template
```bash
npm run create-template <template-name>
```

### 2. Configurar Aplicación
```bash
npm run configure-app
```

### 3. Personalizar Branding
```bash
npm run customize-branding
```

### 4. Configurar Base de Datos
```bash
npm run setup-database
```

## 📁 Estructura de Templates

```
templates/
├── README.md                    # Esta documentación
├── base/                        # Template base común
├── educational/                 # Template educativo
├── business/                    # Template empresarial
├── ecommerce/                   # Template e-commerce
├── healthcare/                  # Template salud
├── minimal/                     # Template mínimo
├── scripts/                     # Scripts de inicialización
├── configs/                     # Configuraciones predefinidas
└── examples/                    # Ejemplos de uso
```

## 🔧 Configuración Rápida

### Variables de Entorno
Cada template incluye su propio archivo `.env.example` con las variables necesarias.

### Base de Datos
Los templates incluyen esquemas de Prisma específicos para cada tipo de aplicación.

### Módulos
Cada template define qué módulos están habilitados por defecto.

## 📚 Documentación por Template

- [Educational Platform](./educational/README.md)
- [Business Management](./business/README.md)
- [E-commerce Platform](./ecommerce/README.md)
- [Healthcare System](./healthcare/README.md)
- [Minimal Template](./minimal/README.md)

## 🎨 Personalización

### Temas
Cada template incluye temas específicos para su industria.

### Branding
Configuración de colores, logos y nombres específicos.

### Módulos
Activación/desactivación de módulos según necesidades.

## 🚀 Deployment

### Vercel
```bash
npm run deploy:vercel
```

### Docker
```bash
npm run deploy:docker
```

### Manual
```bash
npm run deploy:manual
```

---

**Versión**: 1.0.0  
**Última Actualización**: Diciembre 2024  
**Compatibilidad**: Next.js 14, TypeScript, Prisma, Supabase
