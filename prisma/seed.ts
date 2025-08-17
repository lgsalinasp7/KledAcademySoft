import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Crear usuarios de prueba
  const hashedPassword = await bcrypt.hash('demo123', 12);

  // Usuario Administrador
  const admin = await prisma.user.upsert({
    where: { email: 'admin@kaledacademy.com' },
    update: {},
    create: {
      email: 'admin@kaledacademy.com',
      name: 'AD Administrador Demo',
      role: 'ADMIN',
      username: 'admin',
      password: hashedPassword,
      isActive: true,
      credentialsGenerated: true
    },
  });

  // Usuario Profesor
  const teacher = await prisma.user.upsert({
    where: { email: 'profesor@kaledacademy.com' },
    update: {},
    create: {
      email: 'profesor@kaledacademy.com',
      name: 'Profesor Demo',
      role: 'TEACHER',
      username: 'profesor',
      password: hashedPassword,
      isActive: true,
      credentialsGenerated: true
    },
  });

  // Usuario Estudiante
  const student = await prisma.user.upsert({
    where: { email: 'estudiante@kaledacademy.com' },
    update: {},
    create: {
      email: 'estudiante@kaledacademy.com',
      name: 'Estudiante Demo',
      role: 'STUDENT',
      username: 'estudiante',
      password: hashedPassword,
      isActive: true,
      credentialsGenerated: true
    },
  });

  // Crear curso de prueba
  const course = await prisma.course.upsert({
    where: { id: 'course-1' },
    update: {},
    create: {
      id: 'course-1',
      title: 'Carrera Full Stack 3.0',
      description: 'Programa completo de desarrollo web full stack con las últimas tecnologías',
      category: 'Desarrollo Web',
      duration: '6 meses',
      level: 'Intermedio',
      price: 299.99,
      isActive: true,
      userId: admin.id
    },
  });

  // Crear módulos de prueba
  const module1 = await prisma.module.upsert({
    where: { id: 'module-1' },
    update: {},
    create: {
      id: 'module-1',
      title: 'Fundamentos de Desarrollo Web',
      description: 'Introducción a HTML, CSS y JavaScript',
      order: 1,
      isActive: true,
      courseId: course.id
    },
  });

  const module2 = await prisma.module.upsert({
    where: { id: 'module-2' },
    update: {},
    create: {
      id: 'module-2',
      title: 'React y Next.js',
      description: 'Desarrollo de aplicaciones modernas con React',
      order: 2,
      isActive: true,
      courseId: course.id
    },
  });

  // Crear lecciones de prueba
  const lesson1 = await prisma.lesson.upsert({
    where: { id: 'lesson-1' },
    update: {},
    create: {
      id: 'lesson-1',
      title: 'Introducción al Desarrollo Web',
      content: 'En esta lección aprenderás los fundamentos básicos del desarrollo web...',
      order: 1,
      duration: 45,
      isActive: true,
      moduleId: module1.id
    },
  });

  const lesson2 = await prisma.lesson.upsert({
    where: { id: 'lesson-2' },
    update: {},
    create: {
      id: 'lesson-2',
      title: 'Configuración del Entorno de Desarrollo',
      content: 'Aprende a configurar tu entorno de desarrollo con las herramientas necesarias...',
      order: 2,
      duration: 60,
      isActive: true,
      moduleId: module1.id
    },
  });

  // Crear cohorte de prueba
  const cohort = await prisma.cohort.upsert({
    where: { id: 'cohort-1' },
    update: {},
    create: {
      id: 'cohort-1',
      name: 'Cohorte Enero 2024',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-07-15'),
      maxStudents: 20,
      currentStudents: 5,
      status: 'ACTIVE',
      schedule: JSON.stringify({
        days: ['Lunes', 'Miércoles', 'Viernes'],
        time: '19:00 - 21:00',
        timezone: 'America/Bogota'
      }),
      courseId: course.id
    },
  });

  // Asignar profesor y estudiantes a la cohorte
  await prisma.cohort.update({
    where: { id: cohort.id },
    data: {
      teachers: {
        connect: { id: teacher.id }
      },
      students: {
        connect: { id: student.id }
      }
    }
  });

  console.log('✅ Seed completado exitosamente!');
  console.log('👥 Usuarios creados:', { admin: admin.email, teacher: teacher.email, student: student.email });
  console.log('📚 Curso creado:', course.title);
  console.log('👨‍🏫 Cohort creada:', cohort.name);
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
