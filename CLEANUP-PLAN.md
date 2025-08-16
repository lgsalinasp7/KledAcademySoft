# 🧹 **PLAN DE LIMPIEZA PROGRESIVA**

## ✅ **ELIMINADO INMEDIATAMENTE**

- ✅ `index.html` - No necesario en Next.js
- ✅ `vite.config.ts` - Configuración de Vite
- ✅ `tsconfig.app.json` - Configuración específica de Vite
- ✅ `tsconfig.node.json` - Configuración específica de Vite
- ✅ `eslint.config.js` - Reemplazado por `.eslintrc.json`
- ✅ `components.json` - Configuración específica de Vite
- ✅ `yarn.lock` - Usamos npm

## 🔄 **A ELIMINAR DESPUÉS DE MIGRAR**

### **Fase 1: Después de migrar autenticación**
- [ ] `src/components/features/auth/` - Migrar a `app/(auth)/`
- [ ] `src/hooks/useAuth.ts` - Reemplazado por Zustand store

### **Fase 2: Después de migrar componentes UI**
- [ ] `src/components/ui/` - Reemplazado por shadcn/ui
- [ ] `src/lib/utils.ts` - Ya migrado

### **Fase 3: Después de migrar dashboard**
- [ ] `src/components/layout/` - Migrar a `app/(dashboard)/`
- [ ] `src/components/features/dashboard/` - Migrar a `app/(dashboard)/`

### **Fase 4: Después de migrar admin**
- [ ] `src/components/features/admin/` - Migrar a `app/(admin)/`
- [ ] `src/components/layout/AdminLayout.tsx` - Migrar a `app/(admin)/`

### **Fase 5: Después de migrar lecciones**
- [ ] `src/components/features/lessons/` - Migrar a `app/(lessons)/`
- [ ] `src/data/` - Migrar a `lib/data/`

### **Fase 6: Limpieza final**
- [ ] `src/` - Carpeta completa (si está vacía)
- [ ] `src-old/` - Backup temporal
- [ ] Archivos de documentación obsoletos

## 📁 **ESTRUCTURA FINAL OBJETIVO**

```
📁 KaledAcademy/
├── 📁 app/ (Next.js App Router)
│   ├── 📁 (auth)/
│   ├── 📁 (dashboard)/
│   ├── 📁 (admin)/
│   ├── 📁 (lessons)/
│   ├── 📁 api/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── 📁 components/
│   └── 📁 ui/ (shadcn/ui)
├── 📁 lib/
│   ├── supabase.ts
│   ├── prisma.ts
│   ├── utils.ts
│   └── data/
├── 📁 stores/ (Zustand)
├── 📁 prisma/
├── 📁 public/
├── package.json
├── next.config.js
├── tsconfig.json
├── .eslintrc.json
├── .prettierrc
└── .env.local
```

## 🎯 **COMANDOS DE LIMPIEZA**

```bash
# Después de cada fase
git add .
git commit -m "Cleanup: Eliminados archivos obsoletos de [FASE]"

# Limpieza final
rm -rf src-old/
rm -rf node_modules/
npm install
```

## 📋 **CHECKLIST DE LIMPIEZA**

### **Antes de eliminar cada archivo:**
- [ ] Verificar que está migrado completamente
- [ ] Probar que la nueva implementación funciona
- [ ] Hacer commit de los cambios
- [ ] Documentar qué se eliminó

### **Después de eliminar:**
- [ ] Probar que la aplicación funciona
- [ ] Verificar que no hay imports rotos
- [ ] Actualizar documentación
- [ ] Hacer commit de la limpieza
