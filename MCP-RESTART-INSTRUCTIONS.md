# 🔄 **INSTRUCCIONES PARA REINICIAR MCP**

## ✅ **CONFIGURACIÓN CORREGIDA**

Tu archivo `mcp.json` ha sido limpiado y corregido. Los cambios incluyen:

- ✅ Eliminación de duplicados
- ✅ Configuración correcta del comando
- ✅ Token movido a la sección `env`
- ✅ Paquete actualizado

## 🔄 **PASOS PARA ACTIVAR LOS CAMBIOS**

### **1. Reiniciar Cursor**
1. **Cierra Cursor completamente** (Ctrl+Q o desde el menú)
2. **Espera 5 segundos**
3. **Vuelve a abrir Cursor**

### **2. Verificar que Funciona**
Una vez que reinicies, podrás usar estos comandos:

```bash
# En el chat de Cursor, escribe:
mcp_supabase_list_projects
```

### **3. Comandos Disponibles**
Después del reinicio, tendrás acceso a:

- `mcp_supabase_list_projects` - Listar proyectos
- `mcp_supabase_list_tables` - Listar tablas
- `mcp_supabase_execute_sql` - Ejecutar SQL
- `mcp_supabase_apply_migration` - Aplicar migraciones
- `mcp_supabase_get_logs` - Ver logs

## 🎯 **CONFIGURACIÓN FINAL**

Tu archivo `mcp.json` ahora tiene esta estructura correcta:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-supabase"
      ],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "sbp_d046805ea46574e8e879e115336239eed6ff128a"
      }
    }
  }
}
```

## 🚀 **PRÓXIMOS PASOS**

1. **Reinicia Cursor**
2. **Prueba un comando MCP**
3. **Continúa con la configuración de variables de entorno**
4. **Instala dependencias**

## 📞 **SI HAY PROBLEMAS**

Si después del reinicio no funciona:

1. Verifica que el token sea válido
2. Revisa la consola de Cursor para errores
3. Intenta reinstalar el paquete MCP manualmente

**¡Reinicia Cursor ahora y avísame cuando esté listo!** 🚀
