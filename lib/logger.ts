// Logger simplificado para evitar conflictos con Next.js
// En producción, se puede habilitar Pino nuevamente

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: any;
}

class SimpleLogger {
  private level: LogLevel;
  private isDevelopment: boolean;

  constructor(level: LogLevel = 'info') {
    this.level = level;
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  private shouldLog(messageLevel: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };
    return levels[messageLevel] >= levels[this.level];
  }

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}`;
  }

  debug(message: string, context?: LogContext): void {
    if (this.shouldLog('debug')) {
      if (this.isDevelopment) {
        console.debug(this.formatMessage('debug', message, context));
      }
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.shouldLog('info')) {
      console.log(this.formatMessage('info', message, context));
    }
  }

  warn(message: string, context?: LogContext): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, context));
    }
  }

  error(message: string, context?: LogContext): void {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message, context));
    }
  }
}

// Crear instancias del logger
const logger = new SimpleLogger(process.env.LOG_LEVEL as LogLevel || 'info');
const errorLogger = new SimpleLogger('error');
const dbLogger = new SimpleLogger(process.env.LOG_LEVEL as LogLevel || 'info');
const authLogger = new SimpleLogger(process.env.LOG_LEVEL as LogLevel || 'info');

// Función helper para logging seguro (sin datos sensibles)
export const logSafely = (message: string, data: any): void => {
  const sanitizedData = { ...data };
  
  // Remover campos sensibles
  const sensitiveFields = ['password', 'token', 'secret', 'key', 'authorization'];
  sensitiveFields.forEach(field => {
    if (sanitizedData[field]) {
      sanitizedData[field] = '[REDACTED]';
    }
  });
  
  logger.info(message, sanitizedData);
};

// Función helper para logging de errores
export const logError = (message: string, error: Error | unknown, context?: LogContext): void => {
  const errorInfo = error instanceof Error ? {
    message: error.message,
    stack: error.stack,
    name: error.name,
  } : { error };
  
  errorLogger.error(message, { ...errorInfo, ...context });
};

export { logger, errorLogger, dbLogger, authLogger };
