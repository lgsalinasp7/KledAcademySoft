import { ModuleConfig } from '../index';

export const analyticsModule: ModuleConfig = {
  id: 'analytics',
  name: 'Analíticas',
  description: 'Sistema de reportes y métricas de la plataforma',
  version: '1.0.0',
  enabled: true,
  dependencies: ['auth', 'admin'],
  permissions: [
    'analytics:read',
    'analytics:export',
    'analytics:dashboard:read',
    'analytics:reports:read'
  ],
  routes: [
    {
      path: '/dashboard/analytics',
      component: 'AnalyticsDashboard',
      title: 'Analíticas',
      icon: 'BarChart3',
      requiresAuth: true,
      roles: ['ADMIN', 'SUPER_ADMIN']
    },
    {
      path: '/dashboard/analytics/reports',
      component: 'ReportsView',
      title: 'Reportes',
      icon: 'FileText',
      requiresAuth: true,
      roles: ['ADMIN', 'SUPER_ADMIN']
    }
  ],
  components: [
    {
      name: 'AnalyticsDashboard',
      path: 'components/features/analytics/AnalyticsDashboard.tsx',
      type: 'component'
    },
    {
      name: 'ReportsView',
      path: 'components/features/analytics/ReportsView.tsx',
      type: 'component'
    },
    {
      name: 'AnalyticsChart',
      path: 'components/features/analytics/AnalyticsChart.tsx',
      type: 'component'
    }
  ]
};

export const analyticsModuleFunctions = {
  getDashboardStats: async () => {
    return {
      totalUsers: 150,
      activeUsers: 120,
      totalCourses: 25,
      totalRevenue: 50000,
      completionRate: 85,
      satisfactionScore: 4.8
    };
  },
  
  generateReport: async (type: string, dateRange: { start: string; end: string }) => {
    return {
      type,
      dateRange,
      data: [],
      generatedAt: new Date().toISOString()
    };
  }
};

export default analyticsModule;
