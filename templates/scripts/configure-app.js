#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

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

// Interfaz de línea de comandos
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

// Configuración por defecto
const defaultConfig = {
  app: {
    name: 'Mi Aplicación',
    description: 'Descripción de mi aplicación',
    version: '1.0.0',
    author: 'Mi Nombre',
    repository: 'https://github.com/usuario/repositorio'
  },
  branding: {
    name: 'Mi Marca',
    tagline: 'Tagline de mi marca',
    description: 'Descripción de mi marca',
    contact: {
      email: 'info@miapp.com',
      phone: '+1 (555) 123-4567',
      address: 'Dirección de mi empresa',
      website: 'https://miapp.com'
    }
  },
  database: {
    provider: 'postgresql',
    url: 'postgresql://localhost:5432/miapp'
  },
  auth: {
    provider: 'supabase',
    secret: 'your-secret-key'
  }
};

// Función principal de configuración
async function configureApp() {
  log('🔧 Configurador de Aplicación KaledAcademy', 'bright');
  log('Este script te ayudará a configurar tu aplicación.', 'reset');
  log('');

  try {
    // Verificar si estamos en un proyecto válido
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      logError('No se encontró package.json. Ejecuta este script desde la raíz de tu proyecto.');
      process.exit(1);
    }

    logInfo('Detectando configuración actual...');
    
    // Leer configuración actual
    const currentConfig = await readCurrentConfig();
    
    // Obtener nueva configuración del usuario
    const newConfig = await getUserConfiguration(currentConfig);
    
    // Aplicar configuración
    await applyConfiguration(newConfig);
    
    // Crear archivos de configuración
    await createConfigFiles(newConfig);
    
    // Actualizar variables de entorno
    await updateEnvironmentVariables(newConfig);
    
    logSuccess('¡Configuración completada exitosamente!');
    logInfo('Revisa los archivos generados y ajusta según tus necesidades.');
    
  } catch (error) {
    logError(`Error durante la configuración: ${error.message}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Leer configuración actual
async function readCurrentConfig() {
  const configPath = path.join(process.cwd(), 'lib', 'config', 'index.ts');
  
  if (fs.existsSync(configPath)) {
    try {
      // Intentar leer configuración existente
      const configContent = fs.readFileSync(configPath, 'utf8');
      
      // Extraer valores básicos usando regex (simplificado)
      const appNameMatch = configContent.match(/name:\s*['"`]([^'"`]+)['"`]/);
      const descriptionMatch = configContent.match(/description:\s*['"`]([^'"`]+)['"`]/);
      
      return {
        app: {
          name: appNameMatch ? appNameMatch[1] : defaultConfig.app.name,
          description: descriptionMatch ? descriptionMatch[1] : defaultConfig.app.description,
          version: defaultConfig.app.version,
          author: defaultConfig.app.author,
          repository: defaultConfig.app.repository
        },
        branding: { ...defaultConfig.branding },
        database: { ...defaultConfig.database },
        auth: { ...defaultConfig.auth }
      };
    } catch (error) {
      logWarning('No se pudo leer la configuración actual, usando valores por defecto.');
    }
  }
  
  return defaultConfig;
}

// Obtener configuración del usuario
async function getUserConfiguration(currentConfig) {
  log('📝 Configuración de la Aplicación', 'cyan');
  log('');

  const config = { ...currentConfig };

  // Información básica de la aplicación
  log('Información básica de la aplicación:', 'bright');
  config.app.name = await question(`Nombre de la aplicación (${currentConfig.app.name}): `) || currentConfig.app.name;
  config.app.description = await question(`Descripción (${currentConfig.app.description}): `) || currentConfig.app.description;
  config.app.version = await question(`Versión (${currentConfig.app.version}): `) || currentConfig.app.version;
  config.app.author = await question(`Autor (${currentConfig.app.author}): `) || currentConfig.app.author;
  config.app.repository = await question(`Repositorio (${currentConfig.app.repository}): `) || currentConfig.app.repository;
  
  log('');

  // Información de branding
  log('Información de branding:', 'bright');
  config.branding.name = await question(`Nombre de la marca (${currentConfig.branding.name}): `) || currentConfig.branding.name;
  config.branding.tagline = await question(`Tagline (${currentConfig.branding.tagline}): `) || currentConfig.branding.tagline;
  config.branding.description = await question(`Descripción de la marca (${currentConfig.branding.description}): `) || currentConfig.branding.description;
  
  log('');

  // Información de contacto
  log('Información de contacto:', 'bright');
  config.branding.contact.email = await question(`Email (${currentConfig.branding.contact.email}): `) || currentConfig.branding.contact.email;
  config.branding.contact.phone = await question(`Teléfono (${currentConfig.branding.contact.phone}): `) || currentConfig.branding.contact.phone;
  config.branding.contact.address = await question(`Dirección (${currentConfig.branding.contact.address}): `) || currentConfig.branding.contact.address;
  config.branding.contact.website = await question(`Sitio web (${currentConfig.branding.contact.website}): `) || currentConfig.branding.contact.website;
  
  log('');

  // Configuración de base de datos
  log('Configuración de base de datos:', 'bright');
  const dbProvider = await question(`Proveedor de BD (postgresql/mysql/sqlite) [${currentConfig.database.provider}]: `) || currentConfig.database.provider;
  config.database.provider = dbProvider;
  
  if (dbProvider === 'postgresql') {
    config.database.url = await question(`URL de PostgreSQL (${currentConfig.database.url}): `) || currentConfig.database.url;
  } else if (dbProvider === 'mysql') {
    config.database.url = await question(`URL de MySQL (mysql://localhost:3306/miapp): `) || 'mysql://localhost:3306/miapp';
  } else if (dbProvider === 'sqlite') {
    config.database.url = await question(`Archivo SQLite (./prisma/dev.db): `) || './prisma/dev.db';
  }
  
  log('');

  // Configuración de autenticación
  log('Configuración de autenticación:', 'bright');
  const authProvider = await question(`Proveedor de auth (supabase/auth0/nextauth) [${currentConfig.auth.provider}]: `) || currentConfig.auth.provider;
  config.auth.provider = authProvider;
  
  if (authProvider === 'supabase') {
    config.auth.secret = await question(`Supabase Secret Key: `) || currentConfig.auth.secret;
  } else if (authProvider === 'auth0') {
    config.auth.secret = await question(`Auth0 Secret: `) || currentConfig.auth.secret;
  } else {
    config.auth.secret = await question(`NextAuth Secret: `) || currentConfig.auth.secret;
  }

  return config;
}

// Aplicar configuración
async function applyConfiguration(config) {
  logInfo('Aplicando configuración...');
  
  // Actualizar package.json
  await updatePackageJson(config);
  
  // Actualizar configuración principal
  await updateMainConfig(config);
  
  // Actualizar branding
  await updateBranding(config);
  
  // Actualizar tema
  await updateTheme(config);
}

// Actualizar package.json
async function updatePackageJson(config) {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    packageJson.name = config.app.name.toLowerCase().replace(/\s+/g, '-');
    packageJson.description = config.app.description;
    packageJson.version = config.app.version;
    packageJson.author = config.app.author;
    
    if (config.app.repository) {
      packageJson.repository = {
        type: 'git',
        url: config.app.repository
      };
    }
    
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    logSuccess('package.json actualizado');
  }
}

// Actualizar configuración principal
async function updateMainConfig(config) {
  const configPath = path.join(process.cwd(), 'lib', 'config', 'index.ts');
  
  if (fs.existsSync(configPath)) {
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Actualizar configuración de la aplicación
    configContent = configContent.replace(
      /name:\s*['"`][^'"`]*['"`]/,
      `name: '${config.app.name}'`
    );
    
    configContent = configContent.replace(
      /description:\s*['"`][^'"`]*['"`]/,
      `description: '${config.app.description}'`
    );
    
    configContent = configContent.replace(
      /version:\s*['"`][^'"`]*['"`]/,
      `version: '${config.app.version}'`
    );
    
    configContent = configContent.replace(
      /author:\s*['"`][^'"`]*['"`]/,
      `author: '${config.app.author}'`
    );
    
    fs.writeFileSync(configPath, configContent);
    logSuccess('Configuración principal actualizada');
  }
}

// Actualizar branding
async function updateBranding(config) {
  const brandingPath = path.join(process.cwd(), 'lib', 'config', 'branding.ts');
  
  if (fs.existsSync(brandingPath)) {
    let brandingContent = fs.readFileSync(brandingPath, 'utf8');
    
    // Actualizar información de branding
    brandingContent = brandingContent.replace(
      /name:\s*['"`][^'"`]*['"`]/,
      `name: '${config.branding.name}'`
    );
    
    brandingContent = brandingContent.replace(
      /tagline:\s*['"`][^'"`]*['"`]/,
      `tagline: '${config.branding.tagline}'`
    );
    
    brandingContent = brandingContent.replace(
      /description:\s*['"`][^'"`]*['"`]/,
      `description: '${config.branding.description}'`
    );
    
    // Actualizar información de contacto
    brandingContent = brandingContent.replace(
      /email:\s*['"`][^'"`]*['"`]/,
      `email: '${config.branding.contact.email}'`
    );
    
    brandingContent = brandingContent.replace(
      /phone:\s*['"`][^'"`]*['"`]/,
      `phone: '${config.branding.contact.phone}'`
    );
    
    brandingContent = brandingContent.replace(
      /address:\s*['"`][^'"`]*['"`]/,
      `address: '${config.branding.contact.address}'`
    );
    
    brandingContent = brandingContent.replace(
      /website:\s*['"`][^'"`]*['"`]/,
      `website: '${config.branding.contact.website}'`
    );
    
    fs.writeFileSync(brandingPath, brandingContent);
    logSuccess('Branding actualizado');
  }
}

// Actualizar tema
async function updateTheme(config) {
  const themePath = path.join(process.cwd(), 'lib', 'config', 'themes.ts');
  
  if (fs.existsSync(themePath)) {
    let themeContent = fs.readFileSync(themePath, 'utf8');
    
    // Actualizar nombre del tema
    themeContent = themeContent.replace(
      /name:\s*['"`][^'"`]*['"`]/,
      `name: '${config.branding.name} Theme'`
    );
    
    themeContent = themeContent.replace(
      /description:\s*['"`][^'"`]*['"`]/,
      `description: 'Tema personalizado para ${config.branding.name}'`
    );
    
    fs.writeFileSync(themePath, themeContent);
    logSuccess('Tema actualizado');
  }
}

// Crear archivos de configuración
async function createConfigFiles(config) {
  logInfo('Creando archivos de configuración...');
  
  // Crear archivo de configuración personalizada
  const customConfigPath = path.join(process.cwd(), 'lib', 'config', 'custom.ts');
  const customConfigContent = `// Configuración personalizada para ${config.app.name}
// Este archivo contiene la configuración específica de tu aplicación

export const customConfig = {
  app: ${JSON.stringify(config.app, null, 2)},
  branding: ${JSON.stringify(config.branding, null, 2)},
  database: ${JSON.stringify(config.database, null, 2)},
  auth: ${JSON.stringify(config.auth, null, 2)}
};

// Exportar configuración por defecto
export default customConfig;
`;

  fs.writeFileSync(customConfigPath, customConfigContent);
  logSuccess('Archivo de configuración personalizada creado');
}

// Actualizar variables de entorno
async function updateEnvironmentVariables(config) {
  logInfo('Actualizando variables de entorno...');
  
  const envExamplePath = path.join(process.cwd(), '.env.example');
  const envLocalPath = path.join(process.cwd(), '.env.local');
  
  let envContent = '';
  
  // Variables de base de datos
  envContent += `# Base de datos\n`;
  envContent += `DATABASE_URL="${config.database.url}"\n\n`;
  
  // Variables de autenticación
  envContent += `# Autenticación\n`;
  if (config.auth.provider === 'supabase') {
    envContent += `NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"\n`;
    envContent += `NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"\n`;
    envContent += `SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"\n`;
  } else if (config.auth.provider === 'auth0') {
    envContent += `AUTH0_SECRET="${config.auth.secret}"\n`;
    envContent += `AUTH0_BASE_URL="http://localhost:3000"\n`;
    envContent += `AUTH0_ISSUER_BASE_URL="your-auth0-domain"\n`;
    envContent += `AUTH0_CLIENT_ID="your-auth0-client-id"\n`;
    envContent += `AUTH0_CLIENT_SECRET="your-auth0-client-secret"\n`;
  } else {
    envContent += `NEXTAUTH_SECRET="${config.auth.secret}"\n`;
    envContent += `NEXTAUTH_URL="http://localhost:3000"\n`;
  }
  
  envContent += `\n# Next.js\n`;
  envContent += `NODE_ENV="development"\n`;
  envContent += `NEXT_PUBLIC_APP_NAME="${config.app.name}"\n`;
  envContent += `NEXT_PUBLIC_APP_URL="http://localhost:3000"\n`;
  
  // Escribir archivo .env.example
  fs.writeFileSync(envExamplePath, envContent);
  logSuccess('.env.example actualizado');
  
  // Crear .env.local si no existe
  if (!fs.existsSync(envLocalPath)) {
    fs.writeFileSync(envLocalPath, envContent);
    logSuccess('.env.local creado');
  } else {
    logWarning('.env.local ya existe, revisa manualmente las variables');
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  configureApp();
}

module.exports = { configureApp };
