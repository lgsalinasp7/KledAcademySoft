import { ModuleConfig } from '../index';

export const calendarModule: ModuleConfig = {
  id: 'calendar',
  name: 'Calendario',
  description: 'Sistema de calendario y gestión de eventos',
  version: '1.0.0',
  enabled: true,
  dependencies: ['auth'],
  permissions: [
    'calendar:read',
    'calendar:create',
    'calendar:update',
    'calendar:delete',
    'calendar:events:read',
    'calendar:events:create'
  ],
  routes: [
    {
      path: '/dashboard/calendar',
      component: 'CalendarView',
      title: 'Calendario',
      icon: 'Calendar',
      requiresAuth: true,
      roles: ['STUDENT', 'TEACHER', 'ADMIN']
    },
    {
      path: '/dashboard/calendar/events',
      component: 'EventsView',
      title: 'Eventos',
      icon: 'Clock',
      requiresAuth: true,
      roles: ['STUDENT', 'TEACHER', 'ADMIN']
    }
  ],
  components: [
    {
      name: 'CalendarView',
      path: 'components/features/calendar/CalendarView.tsx',
      type: 'component'
    },
    {
      name: 'EventsView',
      path: 'components/features/calendar/EventsView.tsx',
      type: 'component'
    },
    {
      name: 'EventForm',
      path: 'components/features/calendar/EventForm.tsx',
      type: 'component'
    }
  ]
};

export const calendarModuleFunctions = {
  getEvents: async (userId: string, dateRange?: { start: string; end: string }) => {
    return [
      {
        id: '1',
        title: 'Clase de React',
        description: 'Fundamentos de React Hooks',
        start: new Date().toISOString(),
        end: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
        type: 'class'
      }
    ];
  },
  
  createEvent: async (eventData: any) => {
    return { success: true, event: { id: Date.now().toString(), ...eventData } };
  }
};

export default calendarModule;
