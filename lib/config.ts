import { z } from 'zod';

// Esquema de validación para variables de entorno
const envSchema = z.object({
  // Supabase (públicas)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
  
  // Base de datos (privada)
  DATABASE_URL: z.string().min(1).optional(),
  
  // NextAuth (privada)
  NEXTAUTH_SECRET: z.string().min(32).optional(),
  NEXTAUTH_URL: z.string().url().optional(),
  
  // Configuración de soporte (pública)
  NEXT_PUBLIC_SUPPORT_WHATSAPP: z.string().optional(),
  NEXT_PUBLIC_SUPPORT_EMAIL: z.string().email().optional(),
  
  // Configuración de la aplicación
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Configuración de logging
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

// Función para validar y cargar configuración
function loadConfig() {
  try {
    const config = envSchema.parse(process.env);
    console.log('✅ Configuración de entorno validada correctamente');
    return config;
  } catch (error) {
    console.error('❌ Error en la configuración de entorno:', error);
    // En desarrollo, usar valores por defecto
    return {
      NEXT_PUBLIC_SUPABASE_URL: 'https://placeholder.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'placeholder-key',
      DATABASE_URL: 'postgresql://placeholder',
      NEXTAUTH_SECRET: 'placeholder-secret-min-32-chars-long-enough',
      NEXTAUTH_URL: 'http://localhost:3000',
      NEXT_PUBLIC_SUPPORT_WHATSAPP: '+57 300 123 4567',
      NEXT_PUBLIC_SUPPORT_EMAIL: 'soporte@kaledacademy.com',
      NODE_ENV: 'development' as const,
      LOG_LEVEL: 'info' as const,
    };
  }
}

// Cargar configuración
const config = loadConfig();

// Exportar configuración tipada
export const env = {
  // Supabase
  supabase: {
    url: config.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    anonKey: config.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
  },
  
  // Base de datos
  database: {
    url: config.DATABASE_URL || 'postgresql://placeholder',
  },
  
  // NextAuth
  nextAuth: {
    secret: config.NEXTAUTH_SECRET || 'placeholder-secret-min-32-chars-long-enough',
    url: config.NEXTAUTH_URL || 'http://localhost:3000',
  },
  
  // Soporte
  support: {
    whatsapp: config.NEXT_PUBLIC_SUPPORT_WHATSAPP || '+57 300 123 4567',
    email: config.NEXT_PUBLIC_SUPPORT_EMAIL || 'soporte@kaledacademy.com',
  },
  
  // Aplicación
  app: {
    nodeEnv: config.NODE_ENV,
    isDevelopment: config.NODE_ENV === 'development',
    isProduction: config.NODE_ENV === 'production',
    isTest: config.NODE_ENV === 'test',
  },
  
  // Logging
  logging: {
    level: config.LOG_LEVEL,
  },
} as const;

// Función helper para obtener configuración de soporte
export const getSupportConfig = () => ({
  whatsapp: env.support.whatsapp,
  email: env.support.email,
  whatsappUrl: `https://wa.me/${env.support.whatsapp.replace(/\D/g, '')}`,
});

// Función helper para validar configuración en runtime
export const validateConfig = () => {
  const requiredFields = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
  ];

  const missingFields = requiredFields.filter(field => !process.env[field]);
  
  if (missingFields.length > 0) {
    console.warn(`⚠️ Variables de entorno faltantes: ${missingFields.join(', ')}`);
    return false;
  }
  
  return true;
};
