import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Verificar si el usuario existe
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });
    
    if (!existingUser) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }
    
    // Verificar que el usuario tenga estado de pago completado
    if (existingUser.paymentStatus !== 'COMPLETED') {
      return NextResponse.json(
        { error: 'Solo se pueden generar credenciales para usuarios con pago completado' },
        { status: 400 }
      );
    }
    
    // Generar username y password
    const username = `${existingUser.name.toLowerCase().replace(/\s+/g, '.')}${Date.now().toString().slice(-4)}`;
    const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4);
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Actualizar usuario con credenciales
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username,
        password: hashedPassword,
        credentialsGenerated: true
      },
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
    
    return NextResponse.json({
      success: true,
      user: updatedUser,
      credentials: {
        username,
        password // Solo para la respuesta inicial
      }
    });
    
  } catch (error) {
    console.error('Error generando credenciales:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
