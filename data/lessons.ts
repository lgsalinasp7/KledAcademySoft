import { LessonMenuItem, ModuleLesson } from '@/types';

export const introductionItems: LessonMenuItem[] = [
  { id: 'about-module', title: 'Sobre el Módulo 0', completed: true },
  { id: 'tools', title: 'Instalación de herramientas', completed: true },
  { id: 'slack', title: 'Slack', completed: true },
  { id: 'project', title: 'Sobre el Proyecto Integrador', completed: true }
];

export const contentItems: LessonMenuItem[] = [
  { id: 'nodejs', title: 'Node JS', completed: true },
  { id: 'editor', title: 'Editor de texto', completed: true },
  { id: 'git', title: 'Git', completed: true },
  { id: 'github', title: 'Github', completed: true },
  { id: 'terminal', title: 'Introducción a la terminal', completed: true },
  { id: 'commands', title: 'Uso de Comandos básicos', completed: true },
  { id: 'homework', title: 'Homework', completed: false }
];

export const feedbackItems: LessonMenuItem[] = [
  { id: 'feedback', title: 'Feedback', completed: false }
];

export const module0Lessons: ModuleLesson[] = [
  { id: 'FSM0L1', code: 'FSM0L1', title: 'Intro & Herramientas (V2)', duration: '0h 30m', completed: true, type: 'lecture' },
  { id: 'FSM0L2', code: 'FSM0L2', title: 'Terminal (V2)', duration: '0h 00m', completed: true, type: 'lecture' },
  { id: 'FSM0L3', code: 'FSM0L3', title: 'HTML (v3)', duration: '0h 30m', completed: true, type: 'lecture' },
  { id: 'FSM0L4', code: 'FSM0L4', title: 'CSS (v2)', duration: '0h 00m', completed: true, type: 'lecture' },
  { id: 'FSM0L5', code: 'FSM0L5', title: 'JavaScript (V2)', duration: '0h 00m', completed: true, type: 'lecture' },
  { id: 'FSM0L6', code: 'FSM0L6', title: 'Bucles (v2)', duration: '0h 30m', completed: true, type: 'lecture' },
  { id: 'FSM0L7', code: 'FSM0L7', title: 'Arrays (v3)', duration: '0h 00m', completed: false, type: 'lecture' },
  { id: 'FSM0L8', code: 'FSM0L8', title: 'Objetos', duration: '0h 00m', completed: false, type: 'lecture' }
];
