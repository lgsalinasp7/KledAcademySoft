# 🔧 **CONFIGURACIÓN DE SUPABASE**

## 📋 **PASOS PARA CONFIGURAR SUPABASE**

### **1. Crear Proyecto en Supabase**

1. Ve a [supabase.com](https://supabase.com)
2. Crea una nueva cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Anota el **Project URL** y **anon public key**

### **2. Configurar Variables de Entorno**

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Database (usar la URL de Supabase)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Supabase MCP
SUPABASE_ACCESS_TOKEN=your_supabase_access_token_here
```

### **3. Obtener Access Token para MCP**

1. Ve a **Settings > Access Tokens** en Supabase
2. Crea un nuevo token o usa el existente
3. Copia el token al archivo `.env.local`

### **4. Configurar MCP en Cursor**

En Cursor Settings > Model Context Protocol:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-supabase"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "tu_access_token_aqui"
      }
    }
  }
}
```

### **5. Comandos Útiles de Supabase MCP**

Una vez configurado, podrás usar comandos como:

- `mcp_supabase_list_projects` - Listar proyectos
- `mcp_supabase_create_project` - Crear nuevo proyecto
- `mcp_supabase_list_tables` - Listar tablas
- `mcp_supabase_apply_migration` - Aplicar migraciones
- `mcp_supabase_execute_sql` - Ejecutar SQL
- `mcp_supabase_get_logs` - Ver logs

## 🎯 **PRÓXIMOS PASOS**

1. Crear proyecto en Supabase
2. Configurar variables de entorno
3. Instalar MCP en Cursor
4. Probar conexión
5. Aplicar schema de Prisma
