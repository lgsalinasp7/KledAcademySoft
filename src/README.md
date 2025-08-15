# KaledAcademy - Arquitectura de Componentes

## 📁 Estructura de Carpetas

```
src/
├── components/           # Componentes React organizados por función
│   ├── ui/              # Componentes UI reutilizables
│   ├── layout/          # Componentes de layout y estructura
│   ├── features/        # Componentes específicos por feature
│   │   ├── auth/        # Autenticación y login
│   │   ├── dashboard/   # Dashboard principal y módulos
│   │   └── lessons/     # Sistema de lecciones
│   ├── generated/       # Componentes legacy (deprecated)
│   └── index.ts         # Barrel exports
├── hooks/               # Custom React hooks
├── types/               # TypeScript types y interfaces
├── data/                # Mock data y constantes
├── utils/               # Utilidades y helpers
└── README.md           # Esta documentación
```

## 🏗️ Principios de Arquitectura

### 1. **Separación por Responsabilidad**
- `ui/`: Componentes puramente visuales y reutilizables
- `layout/`: Estructura y organización de la aplicación  
- `features/`: Lógica de negocio específica por funcionalidad

### 2. **Componentes Atómicos**
- **Átomos**: Componentes básicos (`Button`, `Logo`, `ProgressBar`)
- **Moléculas**: Combinaciones simples (`UserDropdown`, `ModuleCard`)
- **Organismos**: Secciones completas (`DashboardLayout`, `LessonContentView`)

### 3. **Custom Hooks para Lógica**
- `useAuth`: Manejo de autenticación
- `useNavigation`: Navegación entre vistas
- `useMobile`: Detección de dispositivos móviles

## 📦 Componentes UI Reutilizables

### `Button`
```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

### `ProgressBar`
```tsx
<ProgressBar 
  percentage={75} 
  color="yellow" 
  label="Progreso" 
  animated={true} 
/>
```

### `Logo`
```tsx
<Logo size="lg" withText={true} />
```

### `UserDropdown`
```tsx
<UserDropdown 
  user={user}
  onLogout={handleLogout}
  showDropdown={isOpen}
  onToggleDropdown={toggleDropdown}
/>
```

## 🎣 Custom Hooks

### `useAuth`
```tsx
const { isLoggedIn, user, handleLogin, handleLogout } = useAuth();
```

### `useNavigation`
```tsx
const {
  currentView,
  selectedModule,
  selectedLesson,
  navigateToHome,
  navigateToModuleDetail,
  navigateToLessonContent,
  navigateBack
} = useNavigation();
```

## 📊 Gestión de Datos

### Mock Data
- `mockModules`: Datos de módulos del curso
- `lessons`: Datos de lecciones individuales
- `introductionItems`, `contentItems`, `feedbackItems`: Estructura del sidebar de lecciones

### Types
- `User`: Información del usuario
- `Module`: Estructura de módulos
- `Lesson`: Estructura de lecciones
- `ViewType`: Tipos de vistas de la aplicación

## 🚀 Beneficios de esta Arquitectura

### ✅ **Escalabilidad**
- Fácil agregar nuevas features sin afectar componentes existentes
- Estructura clara para equipos grandes

### ✅ **Reutilización**
- Componentes UI pueden usarse en cualquier parte de la aplicación
- Hooks personalizados evitan duplicación de lógica

### ✅ **Mantenibilidad**
- Separación clara de responsabilidades
- Fácil localizar y modificar funcionalidades específicas

### ✅ **Testing**
- Componentes aislados más fáciles de testear
- Hooks pueden testearse independientemente

### ✅ **Tipado Fuerte**
- TypeScript garantiza type safety
- Interfaces claras entre componentes

## 🔄 Migración de Componentes Legacy

Los componentes en `components/generated/` son legacy y eventualmente serán removidos. La nueva estructura está en:

```
components/
├── ui/              # Reemplaza componentes básicos
├── layout/          # Reemplaza layouts complejos  
└── features/        # Reemplaza lógica específica
```

## 📝 Convenciones de Código

1. **Nombres de Componentes**: PascalCase
2. **Nombres de Archivos**: PascalCase para componentes
3. **Props Interfaces**: `ComponentNameProps`
4. **Barrel Exports**: Usar `index.ts` para exports limpios
5. **Hooks**: Prefijo `use` + funcionalidad descriptiva

## 🎯 Próximos Pasos

1. Migrar componentes restantes de `generated/`
2. Agregar tests unitarios para componentes UI
3. Implementar Storybook para documentación visual
4. Agregar lazy loading para optimización
5. Implementar error boundaries
