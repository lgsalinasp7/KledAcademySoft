# 🎓 KaledAcademy - Plataforma Educativa

Una plataforma educativa moderna inspirada en Henry, construida con React 19, TypeScript y Tailwind CSS.

## 🚀 Características

### ✨ **Funcionalidades Principales**
- 🔐 **Sistema de autenticación** completo con validación
- 🏠 **Dashboard principal** con vista de progreso personal
- 📚 **Sistema de módulos** y lecciones interactivas
- 🎥 **Reproductor de videos** con filtros y búsqueda
- 👥 **Gestión de cohortes** con información detallada
- 📊 **Tracking de progreso** con barras animadas

### 🏗️ **Arquitectura Moderna**
- ⚛️ **React 19** con hooks personalizados
- 📘 **TypeScript** para type safety
- 🎨 **Tailwind CSS 4.0** para styling
- 🎭 **Framer Motion** para animaciones
- 🗂️ **Arquitectura modular** escalable

### 🎨 **UI/UX**
- 🌙 **Tema oscuro** consistente
- 📱 **Responsive design** mobile-first
- ✨ **Animaciones fluidas** con Framer Motion
- 🎯 **Componentes reutilizables** con variants

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── ui/              # Componentes UI reutilizables
│   │   ├── Button.tsx
│   │   ├── Logo.tsx
│   │   ├── ProgressBar.tsx
│   │   └── UserDropdown.tsx
│   ├── layout/          # Componentes de estructura
│   │   ├── AppHeader.tsx
│   │   ├── CohortSidebar.tsx
│   │   ├── DashboardLayout.tsx
│   │   └── MainSidebar.tsx
│   └── features/        # Features específicos
│       ├── auth/        # Sistema de autenticación
│       ├── dashboard/   # Dashboard y módulos
│       └── lessons/     # Sistema de lecciones
├── hooks/               # Custom React hooks
│   ├── useAuth.ts
│   └── useNavigation.ts
├── types/               # TypeScript definitions
├── data/                # Mock data y constantes
└── utils/               # Utilidades helpers
```

## 🛠️ Tecnologías

| Categoría | Tecnología | Versión |
|-----------|------------|---------|
| **Frontend** | React | ^19.0.0 |
| **Language** | TypeScript | ^5.6.2 |
| **Styling** | Tailwind CSS | ^4.0.0 |
| **Animations** | Framer Motion | ^12.4.10 |
| **Icons** | Lucide React | ^0.477.0 |
| **Build Tool** | Vite | ^6.2.0 |

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/kaledacademy.git

# Navegar al directorio
cd kaledacademy

# Instalar dependencias
npm install
# o
yarn install

# Ejecutar en desarrollo
npm run dev
# o
yarn dev
```

### Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run preview    # Preview del build
npm run lint       # Linting con ESLint
npm run format     # Formateo con Prettier
```

## 🎯 Funcionalidades Destacadas

### 🔐 **Sistema de Autenticación**
- Login con email y contraseña
- Validación en tiempo real
- Estado persistente de sesión
- Google Auth integration ready

### 📚 **Sistema de Aprendizaje**
- Módulos organizados por nivel
- Lecciones con contenido rico
- Tracking de progreso automático
- Sistema de navegación intuitivo

### 🎥 **Video Player Avanzado**
- Filtros por tipo de contenido
- Búsqueda en tiempo real
- Historial de reproducción
- Controles personalizados

### 📊 **Analytics y Progreso**
- Barras de progreso animadas
- Métricas de completado
- Dashboard personalizado
- Reportes de actividad

## 🏗️ Arquitectura de Componentes

### **Principios de Diseño**
- **Composición sobre herencia**
- **Componentes puros y reutilizables**
- **Separación de responsabilidades**
- **Props tipadas estrictamente**

### **Patrones Implementados**
- **Compound Components** para layouts complejos
- **Render Props** para lógica compartida
- **Custom Hooks** para estado y side effects
- **Context** para estado global

## 🎨 Design System

### **Colores Principales**
- **Primary**: Blue variants (#1e3a8a, #3b82f6)
- **Secondary**: Gray scale (#111827, #374151)
- **Accent**: Yellow (#fbbf24, #f59e0b)
- **Status**: Green (#10b981), Red (#ef4444)

### **Typography**
- **Font Family**: Inter, system fonts
- **Scales**: 12px → 48px con ratio 1.25
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

## 📈 Performance

### **Optimizaciones Implementadas**
- ⚡ **Lazy loading** de componentes
- 🗜️ **Code splitting** automático
- 📦 **Bundle optimization** con Vite
- 🎯 **Memoización** de componentes pesados

### **Métricas Objetivo**
- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Bundle size**: < 500KB

## 🧪 Testing (Futuro)

Planeado implementar:
- **Unit tests** con Vitest
- **Integration tests** con Testing Library
- **E2E tests** con Playwright
- **Visual regression** con Chromatic

## 🚀 Deploy

### **Plataformas Recomendadas**
- **Vercel** (recomendado para React)
- **Netlify** 
- **GitHub Pages**
- **AWS S3 + CloudFront**

### **Variables de Entorno**
```env
VITE_APP_TITLE=KaledAcademy
VITE_API_URL=https://api.kaledacademy.com
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## 🤝 Contribución

### **Cómo Contribuir**
1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### **Convenciones de Código**
- **ESLint** + **Prettier** para formateo
- **Conventional Commits** para mensajes
- **TypeScript strict mode** habilitado
- **Components** en PascalCase
- **Hooks** con prefijo `use`

## 📝 Changelog

### **v1.0.0** (2025-01-14)
- 🎉 **Initial release** con arquitectura completa
- ✨ **Sistema de autenticación** funcional
- 📚 **Módulos y lecciones** implementados
- 🎥 **Video player** con todas las funcionalidades
- 🎨 **Design system** completo
- 📱 **Responsive design** en todos los breakpoints

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**KaledAcademy Team**
- 🌐 Website: [kaledacademy.com](https://kaledacademy.com)
- 📧 Email: contact@kaledacademy.com
- 🐦 Twitter: [@kaledacademy](https://twitter.com/kaledacademy)

---

⭐ **¡Si te gusta este proyecto, dale una estrella en GitHub!** ⭐