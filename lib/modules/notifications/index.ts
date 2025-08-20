import { ModuleConfig } from '../index';

export const notificationsModule: ModuleConfig = {
  id: 'notifications',
  name: 'Notificaciones',
  description: 'Sistema de notificaciones y alertas',
  version: '1.0.0',
  enabled: true,
  dependencies: ['auth'],
  permissions: [
    'notifications:read',
    'notifications:create',
    'notifications:update',
    'notifications:delete',
    'notifications:send'
  ],
  routes: [
    {
      path: '/dashboard/notifications',
      component: 'NotificationsView',
      title: 'Notificaciones',
      icon: 'Bell',
      requiresAuth: true,
      roles: ['STUDENT', 'TEACHER', 'ADMIN']
    }
  ],
  components: [
    {
      name: 'NotificationsView',
      path: 'components/features/notifications/NotificationsView.tsx',
      type: 'component'
    },
    {
      name: 'NotificationItem',
      path: 'components/features/notifications/NotificationItem.tsx',
      type: 'component'
    }
  ]
};

export const notificationsModuleFunctions = {
  getNotifications: async (userId: string) => {
    return [
      {
        id: '1',
        title: 'Nueva lección disponible',
        message: 'La lección "React Hooks" está ahora disponible',
        type: 'info',
        read: false,
        createdAt: new Date().toISOString()
      }
    ];
  },
  
  markAsRead: async (notificationId: string) => {
    return { success: true };
  },
  
  sendNotification: async (userId: string, notification: any) => {
    return { success: true, notification: { id: Date.now().toString(), ...notification } };
  }
};

export default notificationsModule;
