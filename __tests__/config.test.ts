import { env, validateConfig } from '@/lib/config';

describe('Config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('validateConfig', () => {
    it('should return true when all required environment variables are present', () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';
      process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
      process.env.NEXTAUTH_SECRET = 'test-secret-min-32-chars-long-enough';
      process.env.NEXTAUTH_URL = 'http://localhost:3000';

      expect(validateConfig()).toBe(true);
    });

    it('should throw error when required environment variables are missing', () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;

      expect(() => validateConfig()).toThrow('Variables de entorno faltantes');
    });
  });

  describe('env object', () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';
      process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
      process.env.NEXTAUTH_SECRET = 'test-secret-min-32-chars-long-enough';
      process.env.NEXTAUTH_URL = 'http://localhost:3000';
      (process.env as any).NODE_ENV = 'test';
    });

    it('should have correct structure', () => {
      expect(env).toHaveProperty('supabase');
      expect(env).toHaveProperty('database');
      expect(env).toHaveProperty('nextAuth');
      expect(env).toHaveProperty('support');
      expect(env).toHaveProperty('app');
      expect(env).toHaveProperty('logging');
    });

    it('should have correct supabase configuration', () => {
      expect(env.supabase.url).toBe('https://test.supabase.co');
      expect(env.supabase.anonKey).toBe('test-key');
    });

    it('should have correct database configuration', () => {
      expect(env.database.url).toBe('postgresql://test:test@localhost:5432/test');
    });

    it('should have correct app configuration', () => {
      expect(env.app.nodeEnv).toBe('test');
      expect(env.app.isTest).toBe(true);
      expect(env.app.isDevelopment).toBe(false);
      expect(env.app.isProduction).toBe(false);
    });
  });
});
