# 🧪 **INSTRUCCIONES PARA PROBAR LA APLICACIÓN**

## 🚀 **SERVIDOR EN EJECUCIÓN**

El servidor de desarrollo está corriendo en:
```
http://localhost:3000
```

## 📱 **PASOS PARA PROBAR**

### **1. Abrir el Navegador**
1. Abre tu navegador web (Chrome, Firefox, Edge, etc.)
2. Ve a: `http://localhost:3000`

### **2. Probar la Página de Login**
1. Deberías ver la página de login de KaledAcademy
2. Prueba con estos usuarios:

#### **Usuario Estudiante:**
- **Email**: `student@gmail.com`
- **Contraseña**: `123456`

#### **Usuario Profesor:**
- **Email**: `teacher@kaledacademy.com`
- **Contraseña**: `123456`

#### **Usuario Administrador:**
- **Email**: `admin@kaledacademy.com`
- **Contraseña**: `123456`

### **3. Explorar el Dashboard**
Una vez que inicies sesión, verás:
- ✅ Información del usuario
- ✅ Rol asignado
- ✅ Opciones específicas según el rol
- ✅ Estado de la migración
- ✅ Botón de cerrar sesión

## 🎯 **FUNCIONALIDADES A PROBAR**

### **Login:**
- ✅ Formulario de login funcional
- ✅ Validación de campos
- ✅ Mensajes de error
- ✅ Redirección al dashboard

### **Dashboard:**
- ✅ Información del usuario
- ✅ Diferentes opciones según el rol
- ✅ Navegación protegida
- ✅ Persistencia de sesión
- ✅ Cerrar sesión

### **Roles:**
- **Estudiante**: Ver opciones de cursos, progreso, calificaciones
- **Profesor**: Ver opciones de clases, calificación, materiales
- **Admin**: Ver opciones de usuarios, cursos, reportes

## 🔧 **SI HAY PROBLEMAS**

### **Error de Conexión:**
- Verifica que el servidor esté corriendo
- Revisa la terminal donde ejecutaste `npm run dev`
- Asegúrate de que no haya errores

### **Error de Login:**
- Verifica que uses exactamente los emails y contraseñas listados
- Asegúrate de que no haya espacios extra
- Prueba con diferentes usuarios

### **Error de Página:**
- Refresca la página (F5)
- Limpia el caché del navegador
- Verifica la consola del navegador (F12)

## 📊 **ESTADO ESPERADO**

### **Página de Login:**
- Diseño moderno con shadcn/ui
- Campos de email y contraseña
- Botón de "Iniciar Sesión"
- Información de usuarios de prueba

### **Dashboard:**
- Header con nombre del usuario y botón de cerrar sesión
- Tarjeta con información del usuario
- Tarjetas con opciones según el rol
- Tarjeta con estado de la migración

## 🎉 **¡PRUEBA LA APLICACIÓN!**

**Ve a http://localhost:3000 y prueba la aplicación ahora mismo!**

Una vez que hayas probado la aplicación, cuéntame:
1. ¿Funcionó el login?
2. ¿Pudiste ver el dashboard?
3. ¿Las opciones cambian según el rol?
4. ¿Hay algún error o problema?

**¡Espero tu feedback!** 🚀
