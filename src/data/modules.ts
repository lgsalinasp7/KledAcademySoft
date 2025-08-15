import { Module } from '../types';

export const mockModules: Module[] = [
  {
    id: 'module-0',
    title: 'Módulo 0: Preparación',
    lectures: 8,
    duration: '11:30',
    nextCheckpoint: '04/07',
    completed: true,
    expanded: false,
    lessons: [
      {
        id: 'prep-1',
        title: 'Introducción al Curso',
        type: 'lecture',
        completed: true,
        duration: '15m'
      },
      {
        id: 'prep-2',
        title: 'Configuración del Entorno',
        type: 'lecture',
        completed: true,
        duration: '25m'
      },
      {
        id: 'prep-3',
        title: 'Primer Checkpoint',
        type: 'checkpoint',
        completed: true
      }
    ]
  },
  {
    id: 'module-1',
    title: 'Módulo 1: Fundamentos',
    lectures: 5,
    duration: '10:00',
    nextCheckpoint: '11/07',
    completed: true,
    expanded: false,
    lessons: [
      {
        id: 'fund-1',
        title: 'JavaScript Básico',
        type: 'lecture',
        completed: true,
        duration: '45m'
      },
      {
        id: 'fund-2',
        title: 'Manipulación del DOM',
        type: 'lecture',
        completed: true,
        duration: '35m'
      },
      {
        id: 'fund-3',
        title: 'Manejo de Eventos',
        type: 'lecture',
        completed: true,
        duration: '40m'
      },
      {
        id: 'fund-4',
        title: 'Checkpoint 1',
        type: 'checkpoint',
        completed: true
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Módulo 2: Conceptos Avanzados',
    lectures: 14,
    duration: '28:00',
    nextCheckpoint: '01/08',
    completed: true,
    expanded: false,
    lessons: [
      {
        id: 'adv-1',
        title: 'Programación Asíncrona',
        type: 'lecture',
        completed: true,
        duration: '50m'
      },
      {
        id: 'adv-2',
        title: 'Integración de APIs',
        type: 'lecture',
        completed: true,
        duration: '45m'
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Módulo 3: Proyecto Final',
    lectures: 14,
    duration: '27:00',
    nextCheckpoint: '22/08',
    completed: false,
    expanded: false,
    lessons: [
      {
        id: 'final-1',
        title: 'Planificación del Proyecto',
        type: 'lecture',
        completed: false,
        duration: '60m'
      },
      {
        id: 'final-2',
        title: 'Desarrollo Frontend',
        type: 'lecture',
        completed: false,
        duration: '120m'
      }
    ]
  }
];
