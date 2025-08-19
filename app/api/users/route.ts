import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

// Esquema de validación para crear usuario
const createUserSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  role: z.enum(['STUDENT', 'TEACHER', 'ADMIN', 'SUPER_ADMIN']),
  paymentStatus: z.enum(['PENDING', 'COMPLETED', 'FAILED']).optional(),
  paymentNotes: z.string().optional(),
  generateCredentials: z.boolean().optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar datos de entrada
    const validatedData = createUserSchema.parse(body);
    
    // Verificar si el email ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      );
    }
    
    // Generar credenciales si se solicita
    let username: string | undefined;
    let password: string | undefined;
    
    if (validatedData.generateCredentials) {
      username = `${validatedData.name.toLowerCase().replace(/\s+/g, '.')}${Date.now().toString().slice(-4)}`;
      password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4);
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Crear usuario con credenciales
      const user = await prisma.user.create({
        data: {
          ...validatedData,
          username,
          password: hashedPassword,
          credentialsGenerated: true,
          phone: validatedData.phone || null,
          paymentStatus: validatedData.paymentStatus ? (validatedData.paymentStatus as PaymentStatus) : null,
          paymentNotes: validatedData.paymentNotes || null,
        }
      });
      
      return NextResponse.json({
        success: true,
        user: {
          ...user,
          password: undefined,
          tempPassword: password // Solo para la respuesta inicial
        }
      });
    } else {
      // Crear usuario sin credenciales
      const user = await prisma.user.create({
        data: {
          ...validatedData,
          credentialsGenerated: false,
          phone: validatedData.phone || null,
          paymentStatus: validatedData.paymentStatus ? (validatedData.paymentStatus as PaymentStatus) : null,
          paymentNotes: validatedData.paymentNotes || null,
        }
      });
      
      return NextResponse.json({
        success: true,
        user: {
          ...user,
          password: undefined
        }
      });
    }
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error creando usuario:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const paymentStatus = searchParams.get('paymentStatus');
    const search = searchParams.get('search');
    
    // Construir filtros
    const where: any = { isActive: true };
    
    if (role) {
      where.role = role;
    }
    
    if (paymentStatus) {
      where.paymentStatus = paymentStatus;
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        username: true,
        role: true,
        phone: true,
        paymentStatus: true,
        paymentDate: true,
        paymentNotes: true,
        credentialsGenerated: true,
        lastLogin: true,
        createdAt: true,
        isActive: true
      }
    });
    
    return NextResponse.json({ users });
    
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
