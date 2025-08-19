import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { logger } from '@/lib/logger';

// Rutas que requieren autenticación
const protectedRoutes = [
  '/dashboard',
  '/admin',
  '/api/users',
  '/api/auth',
];

// Rutas que solo pueden acceder administradores
const adminRoutes = [
  '/admin',
  '/api/users',
];

// Rutas públicas que no requieren autenticación
const publicRoutes = [
  '/',
  '/login',
  '/test-login',
  '/test-simple',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Log de la petición (solo en desarrollo)
  if (process.env.NODE_ENV === 'development') {
    logger.debug(`🔍 Middleware: ${request.method} ${pathname}`);
  }

  // Verificar si es una ruta de API
  const isApiRoute = pathname.startsWith('/api/');
  
  // Verificar si es una ruta protegida
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Verificar si es una ruta de administrador
  const isAdminRoute = adminRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Verificar si es una ruta pública
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // Obtener token de autenticación
  const token = request.cookies.get('auth-token')?.value;
  const userRole = request.cookies.get('user-role')?.value;

  // Si es una ruta pública, permitir acceso
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // EN DESARROLLO: Permitir acceso a rutas protegidas sin autenticación
  // para facilitar las pruebas con datos mock
  if (process.env.NODE_ENV === 'development' && isProtectedRoute && !token) {
    logger.debug(`🔧 Desarrollo: Permitiendo acceso a ruta protegida sin autenticación: ${pathname}`);
    return NextResponse.next();
  }

  // Si es una ruta protegida pero no hay token, redirigir a login
  if (isProtectedRoute && !token) {
    logger.warn(`🚫 Acceso no autorizado a ruta protegida: ${pathname}`);
    
    if (isApiRoute) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }
    
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si es una ruta de administrador, verificar rol
  if (isAdminRoute && userRole !== 'ADMIN') {
    logger.warn(`🚫 Acceso no autorizado a ruta de admin: ${pathname} - Rol: ${userRole}`);
    
    if (isApiRoute) {
      return NextResponse.json(
        { error: 'Acceso denegado. Se requieren permisos de administrador.' },
        { status: 403 }
      );
    }
    
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Agregar headers de seguridad adicionales
  const response = NextResponse.next();
  
  // Headers de seguridad para todas las rutas
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  
  // Headers específicos para rutas de API
  if (isApiRoute) {
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }

  return response;
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
