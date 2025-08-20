#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

// Templates disponibles
const AVAILABLE_TEMPLATES = {
  'educational': {
    name: 'Educational Platform',
    description: 'Plataforma completa para escuelas, academias y centros educativos',
    modules: ['auth', 'dashboard', 'lessons', 'admin', 'analytics', 'calendar', 'notifications']
  },
  'business': {
    name: 'Business Management',
    description: 'Sistema de gestión empresarial con roles y permisos',
    modules: ['auth', 'dashboard', 'projects', 'employees', 'analytics', 'calendar', 'notifications']
  },
  'ecommerce': {
    name: 'E-commerce Platform',
    description: 'Plataforma de comercio electrónico completa',
    modules: ['auth', 'dashboard', 'products', 'orders', 'analytics', 'notifications']
  },
  'healthcare': {
    name: 'Healthcare System',
    description: 'Sistema de gestión para clínicas y hospitales',
    modules: ['auth', 'dashboard', 'patients', 'appointments', 'analytics', 'notifications']
  },
  'minimal': {
    name: 'Minimal Template',
    description: 'Template básico para aplicaciones simples',
    modules: ['auth', 'dashboard']
  }
};

// Función principal
function createTemplate() {
  const args = process.argv.slice(2);
  const templateName = args[0];
  const projectName = args[1] || 'my-app';

  // Validar argumentos
  if (!templateName) {
    logError('Uso: npm run create-template <template-name> [project-name]');
    logInfo('Templates disponibles:');
    Object.keys(AVAILABLE_TEMPLATES).forEach(key => {
      const template = AVAILABLE_TEMPLATES[key];
      log(`  ${key}: ${template.name}`, 'cyan');
      log(`    ${template.description}`, 'reset');
    });
    process.exit(1);
  }

  // Verificar si el template existe
  if (!AVAILABLE_TEMPLATES[templateName]) {
    logError(`Template '${templateName}' no encontrado.`);
    logInfo('Templates disponibles: ' + Object.keys(AVAILABLE_TEMPLATES).join(', '));
    process.exit(1);
  }

  const template = AVAILABLE_TEMPLATES[templateName];

  log(`🚀 Creando proyecto: ${projectName}`, 'bright');
  log(`📋 Template: ${template.name}`, 'cyan');
  log(`📝 Descripción: ${template.description}`, 'reset');

  try {
    // 1. Crear directorio del proyecto
    const projectPath = path.join(process.cwd(), projectName);
    if (fs.existsSync(projectPath)) {
      logError(`El directorio '${projectName}' ya existe.`);
      process.exit(1);
    }

    fs.mkdirSync(projectPath, { recursive: true });
    logSuccess(`Directorio creado: ${projectName}`);

    // 2. Copiar archivos base
    copyBaseFiles(projectPath);
    logSuccess('Archivos base copiados');

    // 3. Aplicar configuración del template
    applyTemplateConfig(projectPath, templateName, template);
    logSuccess('Configuración del template aplicada');

    // 4. Instalar dependencias
    installDependencies(projectPath);
    logSuccess('Dependencias instaladas');

    // 5. Configurar base de datos
    setupDatabase(projectPath, templateName);
    logSuccess('Base de datos configurada');

    // 6. Crear archivo README
    createReadme(projectPath, templateName, template);
    logSuccess('README creado');

    // 7. Mensaje final
    logSuccess('¡Proyecto creado exitosamente!');
    logInfo(`\n📁 Directorio: ${projectPath}`);
    logInfo(`\n🚀 Para iniciar el proyecto:`);
    log(`   cd ${projectName}`, 'cyan');
    log(`   npm run dev`, 'cyan');
    logInfo(`\n📚 Documentación: README.md`);

  } catch (error) {
    logError(`Error creando el proyecto: ${error.message}`);
    process.exit(1);
  }
}

// Copiar archivos base
function copyBaseFiles(projectPath) {
  const baseFiles = [
    'package.json',
    'next.config.js',
    'tailwind.config.js',
    'tsconfig.json',
    'postcss.config.js',
    '.env.example',
    '.gitignore'
  ];

  baseFiles.forEach(file => {
    const sourcePath = path.join(__dirname, '..', 'base', file);
    const destPath = path.join(projectPath, file);
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
    }
  });

  // Copiar directorios
  const baseDirs = ['app', 'components', 'lib', 'hooks', 'stores', 'types'];
  baseDirs.forEach(dir => {
    const sourcePath = path.join(__dirname, '..', 'base', dir);
    const destPath = path.join(projectPath, dir);
    
    if (fs.existsSync(sourcePath)) {
      copyDirectory(sourcePath, destPath);
    }
  });
}

// Aplicar configuración del template
function applyTemplateConfig(projectPath, templateName, template) {
  const templateConfigPath = path.join(__dirname, '..', templateName, 'config.ts');
  
  if (fs.existsSync(templateConfigPath)) {
    // Copiar configuración específica del template
    const destConfigPath = path.join(projectPath, 'lib', 'config', 'template.ts');
    fs.copyFileSync(templateConfigPath, destConfigPath);
    
    // Actualizar configuración principal
    updateMainConfig(projectPath, templateName, template);
  }
}

// Actualizar configuración principal
function updateMainConfig(projectPath, templateName, template) {
  const configPath = path.join(projectPath, 'lib', 'config', 'index.ts');
  
  if (fs.existsSync(configPath)) {
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Importar configuración del template
    configContent = `import { ${templateName}Config, ${templateName}Branding, ${templateName}Theme } from './template';\n\n` + configContent;
    
    // Actualizar configuración por defecto
    configContent = configContent.replace(
      /export const defaultAppConfig = .*?;/s,
      `export const defaultAppConfig = ${templateName}Config;`
    );
    
    configContent = configContent.replace(
      /export const defaultBrandingConfig = .*?;/s,
      `export const defaultBrandingConfig = ${templateName}Branding;`
    );
    
    configContent = configContent.replace(
      /export const defaultThemeConfig = .*?;/s,
      `export const defaultThemeConfig = ${templateName}Theme;`
    );
    
    fs.writeFileSync(configPath, configContent);
  }
}

// Instalar dependencias
function installDependencies(projectPath) {
  logInfo('Instalando dependencias...');
  
  try {
    execSync('npm install', { 
      cwd: projectPath, 
      stdio: 'inherit' 
    });
  } catch (error) {
    logWarning('Error instalando dependencias con npm, intentando con yarn...');
    try {
      execSync('yarn install', { 
        cwd: projectPath, 
        stdio: 'inherit' 
      });
    } catch (yarnError) {
      logError('Error instalando dependencias. Instala manualmente con: npm install');
    }
  }
}

// Configurar base de datos
function setupDatabase(projectPath, templateName) {
  const schemaPath = path.join(__dirname, '..', templateName, 'schema.prisma');
  const destSchemaPath = path.join(projectPath, 'prisma', 'schema.prisma');
  
  if (fs.existsSync(schemaPath)) {
    fs.copyFileSync(schemaPath, destSchemaPath);
    
    // Generar cliente de Prisma
    try {
      execSync('npx prisma generate', { 
        cwd: projectPath, 
        stdio: 'inherit' 
      });
    } catch (error) {
      logWarning('Error generando cliente de Prisma. Ejecuta manualmente: npx prisma generate');
    }
  }
}

// Crear README
function createReadme(projectPath, templateName, template) {
  const readmeContent = `# ${template.name}

${template.description}

## 🚀 Inicio Rápido

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- PostgreSQL (opcional, para desarrollo local)

### Instalación

1. **Clonar el repositorio**
   \`\`\`bash
   git clone <your-repo-url>
   cd ${path.basename(projectPath)}
   \`\`\`

2. **Instalar dependencias**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configurar variables de entorno**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

4. **Configurar base de datos**
   \`\`\`bash
   npx prisma db push
   npx prisma generate
   \`\`\`

5. **Ejecutar en desarrollo**
   \`\`\`bash
   npm run dev
   \`\`\`

## 📋 Características

- **Autenticación**: Sistema completo de autenticación
- **Dashboard**: Panel de control personalizable
- **Módulos**: ${template.modules.join(', ')}
- **Roles y Permisos**: Sistema granular de permisos
- **Temas**: Múltiples temas disponibles
- **Responsive**: Diseño adaptable a todos los dispositivos

## 🏗️ Arquitectura

Este proyecto utiliza:
- **Next.js 14** con App Router
- **TypeScript** para tipado estático
- **Prisma** como ORM
- **Supabase** para autenticación y base de datos
- **Tailwind CSS** para estilos
- **Shadcn/ui** para componentes
- **Zustand** para gestión de estado

## 📚 Documentación

- [Guía de Desarrollo](./docs/development.md)
- [Guía de Deployment](./docs/deployment.md)
- [API Reference](./docs/api.md)

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push a la rama (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

**Template**: ${templateName}  
**Versión**: 1.0.0  
**Última Actualización**: ${new Date().toLocaleDateString()}
`;

  fs.writeFileSync(path.join(projectPath, 'README.md'), readmeContent);
}

// Función auxiliar para copiar directorios
function copyDirectory(source, destination) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);
  
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, destPath);
    } else {
      fs.copyFileSync(sourcePath, destPath);
    }
  });
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  createTemplate();
}

module.exports = { createTemplate };
