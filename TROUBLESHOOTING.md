# 🔧 Guía de Solución de Problemas - KaledAcademy

## 🚨 **Problemas Comunes y Soluciones**

### 1. **Error: Cannot find module 'lib/worker.js'**

**Síntomas:**
```
Error: Cannot find module 'C:\KaledAcademySoft\KaledAcademy\.next\server\vendor-chunks\lib\worker.js'
```

**Causa:** Conflicto entre Pino logger y Next.js worker threads.

**Solución:**
```bash
# Opción 1: Limpieza completa automática
npm run clean

# Opción 2: Limpieza manual
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules\.cache
npm install
npm run dev
```

### 2. **Error de TypeScript durante compilación**

**Síntomas:**
```
TS2540: Cannot assign to 'NODE_ENV' because it is a read-only property
TS6133: 'params' is declared but its value is never read
```

**Solución:**
```bash
# Verificar tipos
npm run type-check

# Corregir automáticamente
npm run lint --fix
```

### 3. **Error de módulos no encontrados**

**Síntomas:**
```
Module not found: Can't resolve 'pino'
```

**Solución:**
```bash
# Reinstalar dependencias
npm install

# O limpieza completa
npm run clean:all
```

### 4. **Problemas con Prisma**

**Síntomas:**
```
Error: P1001: Can't reach database server
```

**Solución:**
```bash
# Generar cliente Prisma
npx prisma generate

# Verificar conexión
npx prisma db push

# Abrir Prisma Studio
npx prisma studio
```

### 5. **Error de variables de entorno**

**Síntomas:**
```
❌ Error en la configuración de entorno
```

**Solución:**
1. Copiar archivo de ejemplo:
```bash
cp env.example .env.local
```

2. Configurar variables requeridas en `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Base de datos
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_url

# NextAuth
NEXTAUTH_SECRET=your_secret_min_32_chars
NEXTAUTH_URL=http://localhost:3000
```

## 🛠️ **Comandos de Diagnóstico**

### Verificar estado del proyecto
```bash
# Verificar dependencias
npm list --depth=0

# Verificar configuración TypeScript
npm run type-check

# Verificar linting
npm run lint

# Verificar build
npm run build
```

### Limpieza y reinstalación
```bash
# Limpieza básica
npm run clean

# Limpieza completa
npm run clean:all

# Reinstalar dependencias
npm install
```

### Base de datos
```bash
# Generar cliente Prisma
npx prisma generate

# Sincronizar esquema
npx prisma db push

# Verificar conexión
npx prisma db pull
```

## 🔍 **Logs y Debugging**

### Habilitar logs detallados
```bash
# Establecer nivel de log
export LOG_LEVEL=debug

# O en Windows
set LOG_LEVEL=debug
```

### Verificar logs del servidor
```bash
# Ver logs en tiempo real
npm run dev 2>&1 | tee server.log

# Ver logs de errores
npm run dev 2>&1 | grep -i error
```

## 🚀 **Optimización de Performance**

### Limpiar caché de Next.js
```bash
# Limpiar caché
Remove-Item -Recurse -Force .next

# Reconstruir
npm run build
```

### Optimizar dependencias
```bash
# Verificar dependencias duplicadas
npm dedupe

# Actualizar dependencias
npm update

# Auditoría de seguridad
npm audit
```

## 📱 **Problemas Específicos de Entorno**

### Windows
```bash
# Usar comandos de PowerShell
Remove-Item -Recurse -Force .next
Remove-Item -Recurse -Force node_modules\.cache

# O usar Git Bash
rm -rf .next
rm -rf node_modules/.cache
```

### macOS/Linux
```bash
# Limpiar caché
rm -rf .next
rm -rf node_modules/.cache

# Verificar permisos
chmod +x scripts/clean-and-restart.js
```

## 🔧 **Configuración de Desarrollo**

### Variables de entorno para desarrollo
Crear archivo `.env.local`:
```env
# Desarrollo local
NODE_ENV=development
LOG_LEVEL=debug

# Supabase (placeholders para desarrollo)
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-key

# Base de datos (placeholders para desarrollo)
DATABASE_URL=postgresql://placeholder:placeholder@localhost:5432/kaledacademy
DIRECT_URL=postgresql://placeholder:placeholder@localhost:5432/kaledacademy

# NextAuth (placeholders para desarrollo)
NEXTAUTH_SECRET=placeholder-secret-min-32-chars-long-enough
NEXTAUTH_URL=http://localhost:3000

# Soporte
NEXT_PUBLIC_SUPPORT_WHATSAPP=+57 300 123 4567
NEXT_PUBLIC_SUPPORT_EMAIL=soporte@kaledacademy.com
```

## 📞 **Soporte Adicional**

Si los problemas persisten:

1. **Verificar documentación:**
   - `README-FINAL.md` - Guía completa
   - `SECURITY-IMPROVEMENTS.md` - Detalles técnicos

2. **Comandos de verificación:**
   ```bash
   npm run ci:check
   npm run security:audit
   ```

3. **Contacto:**
   - **WhatsApp**: +57 300 123 4567
   - **Email**: soporte@kaledacademy.com

---

## 🎯 **Resumen de Soluciones Rápidas**

| Problema | Comando de Solución |
|----------|-------------------|
| Error de worker.js | `npm run clean` |
| TypeScript errors | `npm run type-check` |
| Módulos no encontrados | `npm install` |
| Prisma errors | `npx prisma generate` |
| Variables de entorno | `cp env.example .env.local` |
| Caché corrupta | `Remove-Item -Recurse -Force .next` |

**¡La mayoría de problemas se resuelven con `npm run clean`! 🚀**
