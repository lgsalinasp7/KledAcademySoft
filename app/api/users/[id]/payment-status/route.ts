import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updatePaymentStatusSchema = z.object({
  paymentStatus: z.enum(['PENDING', 'COMPLETED', 'FAILED']),
  paymentNotes: z.string().optional()
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Validar datos de entrada
    const validatedData = updatePaymentStatusSchema.parse(body);
    
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
    
    // Actualizar estado de pago
    const updateData: any = {
      paymentStatus: validatedData.paymentStatus
    };
    
    if (validatedData.paymentStatus === 'COMPLETED') {
      updateData.paymentDate = new Date();
    }
    
    if (validatedData.paymentNotes !== undefined) {
      updateData.paymentNotes = validatedData.paymentNotes;
    }
    
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
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
      user: updatedUser
    });
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      );
    }
    
    console.error('Error actualizando estado de pago:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
