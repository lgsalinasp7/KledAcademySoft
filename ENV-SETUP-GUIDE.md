# 🔧 **GUÍA DE CONFIGURACIÓN DE VARIABLES DE ENTORNO**

## 🚨 **PASO CRÍTICO: CREAR ARCHIVO .env.local**

Para que el proyecto funcione, necesitas crear un archivo llamado `.env.local` en la raíz del proyecto.

### **Ubicación del archivo:**
```
C:\KaledAcademySoft\KaledAcademy\.env.local
```

### **Contenido del archivo .env.local:**

```env
# Supabase - Proyecto: KaledAcademy
NEXT_PUBLIC_SUPABASE_URL=https://pufjmrsvlwfwccxngfpr.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1ZmptcnN2bHdmd2NjeG5nZnByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyOTcyNjEsImV4cCI6MjA3MDg3MzI2MX0.OkG0JZsnam1kllPrPeJ6YKRb5IVl4KNf33rkhLFpOzI

# Database (usar la URL de Supabase)
# IMPORTANTE: Reemplaza [YOUR-PASSWORD] con la contraseña real
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.pufjmrsvlwfwccxngfpr.supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_SECRET=tu_nextauth_secret_aqui
NEXTAUTH_URL=http://localhost:3000

# Supabase MCP (ya configurado en Cursor)
SUPABASE_ACCESS_TOKEN=sbp_d046805ea46574e8e879e115336239eed6ff128a
```

## 🔑 **CÓMO OBTENER LA CONTRASEÑA DE LA BASE DE DATOS**

### **Opción 1: Desde el Dashboard de Supabase**
1. Ve a [supabase.com](https://supabase.com)
2. Inicia sesión con tu cuenta
3. Selecciona el proyecto "KaledAcademy"
4. Ve a **Settings > Database**
5. Busca la sección "Connection string" o "Database password"
6. Copia la contraseña

### **Opción 2: Usar la contraseña por defecto**
Si no has cambiado la contraseña, puedes usar la contraseña por defecto que se genera al crear el proyecto.

## 📝 **INSTRUCCIONES PASO A PASO**

### **1. Crear el archivo**
1. Abre el Explorador de Windows
2. Ve a `C:\KaledAcademySoft\KaledAcademy`
3. Crea un nuevo archivo de texto
4. Nómbralo exactamente como `.env.local` (con el punto al inicio)
5. Asegúrate de que no tenga extensión `.txt`

### **2. Copiar el contenido**
1. Copia el contenido de arriba
2. Pégalo en el archivo `.env.local`
3. Reemplaza `[YOUR-PASSWORD]` con la contraseña real
4. Guarda el archivo

### **3. Verificar**
1. El archivo debe estar en: `C:\KaledAcademySoft\KaledAcademy\.env.local`
2. No debe tener extensión `.txt`
3. Debe contener todas las variables de entorno

## 🧪 **PROBAR LA CONFIGURACIÓN**

Una vez que tengas el archivo `.env.local` creado, ejecuta:

```bash
npx prisma db push
```

Si funciona correctamente, verás un mensaje de éxito.

## 🚀 **INICIAR EL SERVIDOR**

Después de la configuración exitosa:

```bash
npm run dev
```

## 📞 **SI HAY PROBLEMAS**

### **Error: "Environment variable not found: DATABASE_URL"**
- Verifica que el archivo se llame exactamente `.env.local`
- Verifica que esté en la raíz del proyecto
- Verifica que no tenga extensión `.txt`

### **Error: "Connection failed"**
- Verifica que la contraseña sea correcta
- Verifica que el proyecto Supabase esté activo
- Verifica que la URL sea correcta

### **Error: "Invalid URL"**
- Verifica que no haya espacios extra en el archivo
- Verifica que las comillas estén correctas

## 🎯 **ESTADO ACTUAL**

- ✅ Dependencias instaladas
- ✅ Cliente Prisma generado
- ✅ Proyecto Supabase configurado
- 🔄 **Variables de entorno**: Pendiente (archivo .env.local)
- 🔄 Prueba de conexión: Pendiente
- 🔄 Inicio del servidor: Pendiente

**¡Crea el archivo .env.local y avísame cuando esté listo!** 🚀
