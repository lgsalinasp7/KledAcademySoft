#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Limpiando caché y archivos temporales...');

// Función para eliminar directorios de forma segura
function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    try {
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✅ Eliminado: ${dirPath}`);
    } catch (error) {
      console.log(`⚠️ No se pudo eliminar: ${dirPath} - ${error.message}`);
    }
  }
}

// Directorios a limpiar
const directoriesToClean = [
  '.next',
  'node_modules/.cache',
  'dist',
  'build',
  '.turbo'
];

// Limpiar directorios
directoriesToClean.forEach(dir => {
  removeDirectory(dir);
});

// Limpiar archivos temporales
const filesToClean = [
  '.env.local',
  '.env.development.local',
  '.env.test.local',
  '.env.production.local'
];

filesToClean.forEach(file => {
  if (fs.existsSync(file)) {
    try {
      fs.unlinkSync(file);
      console.log(`✅ Eliminado archivo: ${file}`);
    } catch (error) {
      console.log(`⚠️ No se pudo eliminar archivo: ${file} - ${error.message}`);
    }
  }
});

console.log('📦 Reinstalando dependencias...');

try {
  // Reinstalar dependencias
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencias reinstaladas');
} catch (error) {
  console.log('❌ Error al reinstalar dependencias:', error.message);
  process.exit(1);
}

console.log('🔧 Generando cliente Prisma...');

try {
  // Regenerar cliente Prisma
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Cliente Prisma regenerado');
} catch (error) {
  console.log('❌ Error al regenerar cliente Prisma:', error.message);
}

console.log('🚀 Iniciando servidor de desarrollo...');

try {
  // Iniciar servidor de desarrollo
  execSync('npm run dev', { stdio: 'inherit' });
} catch (error) {
  console.log('❌ Error al iniciar servidor:', error.message);
  process.exit(1);
}
