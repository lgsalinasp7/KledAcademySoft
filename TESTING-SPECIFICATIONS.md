# 🧪 ESPECIFICACIONES DE PRUEBA: SISTEMA DE GESTIÓN DE USUARIOS

## 📋 **FLUJO COMPLETO DE VALIDACIÓN**

### **FASE 1: Login como Administrador**
1. **Navegar a:** `http://localhost:3000/login`
2. **Credenciales de Administrador:**
   - Email: `admin@kaledacademy.com`
   - Password: `123456`
3. **Click en "Iniciar Sesión"**
4. **Verificar:** Acceso al dashboard de administrador con sidebar completo

### **FASE 2: Navegar a Gestión de Credenciales**
1. **En el sidebar** buscar "Gestión de Credenciales"
2. **Click en "Gestión de Credenciales"**
3. **Verificar:** Página muestra estadísticas y lista de estudiantes

### **FASE 3: Crear Nuevo Estudiante**
1. **Click en "Crear Estudiante"** (botón amarillo)
2. **Llenar formulario:**
   - Nombre: "Test Student"
   - Email: "test.student@email.com"
   - Teléfono: "+57 300 999 8888"
   - Estado de Pago: "Completado"
3. **Click en "Crear Estudiante"**
4. **Verificar:** Estudiante aparece en la lista

### **FASE 4: Generar Credenciales**
1. **Buscar** el estudiante creado en la lista
2. **Click en "Generar Credenciales"** (botón azul)
3. **Verificar:** Se generan username y password
4. **Copiar** las credenciales generadas

### **FASE 5: Logout y Login con Credenciales Generadas**
1. **Click en el perfil** (parte superior derecha)
2. **Click en "Cerrar sesión"**
3. **Navegar a:** `http://localhost:3000/login`
4. **Login con credenciales generadas:**
   - Email: [username generado]
   - Password: [password generado]
5. **Verificar:** Acceso al dashboard de estudiante

### **FASE 6: Validar Dashboard de Estudiante**
1. **Verificar:** Perfil del estudiante en la parte superior
2. **Verificar:** Sidebar muestra opciones de estudiante
3. **Navegar** por módulos disponibles
4. **Verificar:** Funcionalidades específicas del estudiante

---

## 🔧 **USUARIOS DE PRUEBA DISPONIBLES**

### **Usuarios Mock (Siempre Disponibles)**
1. **Estudiante Demo:**
   - Email: `student@gmail.com`
   - Password: `123456`
   - Rol: `STUDENT`

2. **Profesor Demo:**
   - Email: `teacher@kaledacademy.com`
   - Password: `123456`
   - Rol: `TEACHER`

3. **Administrador Demo:**
   - Email: `admin@kaledacademy.com`
   - Password: `123456`
   - Rol: `ADMIN`

### **Usuarios Generados (Dinámicos)**
- Se crean a través del panel de administración
- Credenciales se generan automáticamente
- Solo accesibles si `paymentStatus === 'completed'`

---

## 🎯 **PUNTOS DE VALIDACIÓN CRÍTICOS**

### **1. Autenticación**
- ✅ Login con usuarios mock
- ✅ Login con credenciales generadas
- ✅ Logout funcional
- ✅ Persistencia de sesión

### **2. Gestión de Usuarios**
- ✅ Crear nuevo estudiante
- ✅ Generar credenciales
- ✅ Enviar credenciales por WhatsApp
- ✅ Búsqueda de estudiantes
- ✅ Filtros por estado de pago

### **3. Dashboard de Estudiante**
- ✅ Perfil visible en parte superior
- ✅ Navegación por módulos
- ✅ Acceso a contenido
- ✅ Progreso del curso

### **4. Integración de Stores**
- ✅ `authStore` - Autenticación
- ✅ `usersStore` - Gestión de usuarios
- ✅ Persistencia en localStorage

---

## 🐛 **CASOS DE PRUEBA ESPECÍFICOS**

### **Caso 1: Estudiante con Pago Pendiente**
1. Crear estudiante con `paymentStatus: 'pending'`
2. Verificar que NO puede generar credenciales
3. Verificar que NO puede hacer login

### **Caso 2: Estudiante con Pago Completado**
1. Crear estudiante con `paymentStatus: 'completed'`
2. Generar credenciales
3. Verificar login exitoso
4. Verificar acceso al dashboard

### **Caso 3: Credenciales Inválidas**
1. Intentar login con credenciales incorrectas
2. Verificar mensaje de error apropiado

### **Caso 4: Búsqueda y Filtros**
1. Crear múltiples estudiantes
2. Probar búsqueda por nombre
3. Probar búsqueda por email
4. Verificar filtros funcionan

---

## 📝 **NOTAS DE IMPLEMENTACIÓN**

### **Stores Utilizados**
- `authStore`: Manejo de autenticación y sesión
- `usersStore`: Gestión de estudiantes y credenciales

### **Componentes Clave**
- `CredentialsManagement`: Panel principal de gestión
- `CreateStudentModal`: Formulario de creación
- `AppHeader`: Perfil de usuario en dashboard

### **Persistencia**
- Credenciales generadas se guardan en localStorage
- Sesión de usuario persiste entre recargas
- Datos de estudiantes se mantienen en `usersStore`

---

## 🚀 **PRÓXIMAS FUNCIONALIDADES A IMPLEMENTAR**

1. **Sistema de Videos** - VideoPlayer con filtros
2. **Sistema de Lecciones** - Contenido dinámico
3. **Sistema de Cohortes** - Gestión de grupos
4. **Sistema de Analytics** - Reportes y métricas
5. **Sistema de Calendario** - Eventos y programación

---

*Última actualización: Enero 2025*
