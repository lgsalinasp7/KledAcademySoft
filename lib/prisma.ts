import { PrismaClient } from '@prisma/client';
import { logger } from './logger';

// Configuración de connection pooling para entornos serverless
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Configuración de Prisma con connection pooling
const prismaClientSingleton = () => {
  return new PrismaClient({
    log: [
      {
        emit: 'event',
        level: 'query',
      },
      {
        emit: 'event',
        level: 'error',
      },
      {
        emit: 'event',
        level: 'info',
      },
      {
        emit: 'event',
        level: 'warn',
      },
    ],
    // Configuración para connection pooling en Vercel
    datasources: {
      db: {
        url: process.env.DATABASE_URL || '',
      },
    },
  });
};

// Singleton pattern para evitar múltiples conexiones
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// Logging de queries (solo en desarrollo)
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query' as any, (e: any) => {
    logger.debug('Query ejecutada', {
      query: e.query,
      params: e.params,
      duration: `${e.duration}ms`,
    });
  });

  prisma.$on('info' as any, (e: any) => {
    logger.info('Prisma info', { message: e.message });
  });

  prisma.$on('warn' as any, (e: any) => {
    logger.warn('Prisma warning', { message: e.message });
  });
}

// Logging de errores
prisma.$on('error' as any, (e: any) => {
  logger.error('Error de Prisma', { error: e.message });
});

// Función helper para manejar errores de base de datos
export const handleDatabaseError = (error: any, context: string) => {
  logger.error(`Error en base de datos - ${context}`, { error });
  
  // Clasificar errores comunes
  if (error.code === 'P2002') {
    return { error: 'Registro duplicado', code: 'DUPLICATE' };
  }
  
  if (error.code === 'P2025') {
    return { error: 'Registro no encontrado', code: 'NOT_FOUND' };
  }
  
  if (error.code === 'P2003') {
    return { error: 'Error de referencia externa', code: 'FOREIGN_KEY' };
  }
  
  return { error: 'Error interno de base de datos', code: 'INTERNAL' };
};

// Función helper para transacciones seguras
export const withTransaction = async <T>(
  operation: () => Promise<T>,
  context: string
): Promise<T> => {
  try {
    return await prisma.$transaction(operation);
  } catch (error) {
    logger.error(`Error en transacción - ${context}`, { error });
    throw error;
  }
};

// Función helper para conexiones seguras
export const withConnection = async <T>(
  operation: () => Promise<T>,
  context: string
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    logger.error(`Error de conexión - ${context}`, { error });
    throw error;
  }
};

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
