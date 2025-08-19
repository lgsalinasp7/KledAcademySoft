// ============================================================================
// CONSTANTES DE BRANDING Y NOMBRES DE LA APLICACIÓN
// ============================================================================

export interface BrandingConstants {
  // Información básica de la aplicación
  appName: string;
  appShortName: string;
  appDescription: string;
  appVersion: string;
  appUrl: string;
  
  // Información de contacto
  supportEmail: string;
  supportPhone: string;
  supportWhatsApp: string;
  supportHours: string;
  
  // Información de la empresa
  companyName: string;
  companyAddress: string;
  companyWebsite: string;
  companyPhone: string;
  companyEmail: string;
  
  // Redes sociales
  socialMedia: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  
  // Textos de la interfaz
  ui: {
    login: {
      title: string;
      subtitle: string;
      emailPlaceholder: string;
      passwordPlaceholder: string;
      loginButton: string;
      forgotPassword: string;
      noAccount: string;
      signUp: string;
      testUsersTitle: string;
      testUsersDescription: string;
      supportButton: string;
    };
    dashboard: {
      welcome: string;
      quickActions: string;
      recentActivity: string;
      notifications: string;
    };
    navigation: {
      home: string;
      dashboard: string;
      courses: string;
      students: string;
      evaluations: string;
      messages: string;
      analytics: string;
      settings: string;
      profile: string;
      logout: string;
    };
    roles: {
      admin: string;
      teacher: string;
      student: string;
    };
    common: {
      loading: string;
      error: string;
      success: string;
      save: string;
      cancel: string;
      delete: string;
      edit: string;
      view: string;
      create: string;
      search: string;
      filter: string;
      sort: string;
    };
  };
  
  // Configuración de features
  features: {
    authentication: {
      enabled: boolean;
      providers: string[];
      requireEmailVerification: boolean;
    };
    messaging: {
      enabled: boolean;
      allowFileAttachments: boolean;
      maxFileSize: number;
    };
    analytics: {
      enabled: boolean;
      trackUserBehavior: boolean;
      privacyCompliant: boolean;
    };
    notifications: {
      enabled: boolean;
      email: boolean;
      push: boolean;
      sms: boolean;
    };
  };
}

// ============================================================================
// CONFIGURACIONES PREDEFINIDAS POR TIPO DE APLICACIÓN
// ============================================================================

// Configuración para KaledAcademy (actual)
export const kaledAcademyBranding: BrandingConstants = {
  appName: "KaledAcademy",
  appShortName: "Kaled",
  appDescription: "Plataforma educativa integral para el aprendizaje moderno",
  appVersion: "1.0.0",
  appUrl: "https://kaledacademy.com",
  
  supportEmail: "soporte@kaledacademy.com",
  supportPhone: "+57 300 123 4567",
  supportWhatsApp: "+573001234567",
  supportHours: "Lunes a Viernes 8:00 AM - 6:00 PM",
  
  companyName: "KaledAcademy",
  companyAddress: "Calle 123 #45-67, Bogotá, Colombia",
  companyWebsite: "https://kaledacademy.com",
  companyPhone: "+57 1 234 5678",
  companyEmail: "info@kaledacademy.com",
  
  socialMedia: {
    facebook: "https://facebook.com/kaledacademy",
    instagram: "https://instagram.com/kaledacademy",
    linkedin: "https://linkedin.com/company/kaledacademy",
    twitter: "https://twitter.com/kaledacademy",
    youtube: "https://youtube.com/kaledacademy",
  },
  
  ui: {
    login: {
      title: "Bienvenido a KaledAcademy",
      subtitle: "Tu plataforma de aprendizaje integral",
      emailPlaceholder: "Correo electrónico",
      passwordPlaceholder: "Contraseña",
      loginButton: "Iniciar Sesión",
      forgotPassword: "¿Olvidaste tu contraseña?",
      noAccount: "¿No tienes cuenta?",
      signUp: "Regístrate aquí",
      testUsersTitle: "Usuarios de Prueba",
      testUsersDescription: "Utiliza estas credenciales para probar la plataforma",
      supportButton: "¿Necesitas ayuda? Contacta soporte",
    },
    dashboard: {
      welcome: "¡Bienvenido de vuelta!",
      quickActions: "Acciones Rápidas",
      recentActivity: "Actividad Reciente",
      notifications: "Notificaciones",
    },
    navigation: {
      home: "Inicio",
      dashboard: "Dashboard",
      courses: "Cursos",
      students: "Estudiantes",
      evaluations: "Evaluaciones",
      messages: "Mensajes",
      analytics: "Analytics",
      settings: "Configuración",
      profile: "Perfil",
      logout: "Cerrar Sesión",
    },
    roles: {
      admin: "Administrador",
      teacher: "Profesor",
      student: "Estudiante",
    },
    common: {
      loading: "Cargando...",
      error: "Error",
      success: "Éxito",
      save: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar",
      edit: "Editar",
      view: "Ver",
      create: "Crear",
      search: "Buscar",
      filter: "Filtrar",
      sort: "Ordenar",
    },
  },
  
  features: {
    authentication: {
      enabled: true,
      providers: ["email", "google", "microsoft"],
      requireEmailVerification: true,
    },
    messaging: {
      enabled: true,
      allowFileAttachments: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    },
    analytics: {
      enabled: true,
      trackUserBehavior: true,
      privacyCompliant: true,
    },
    notifications: {
      enabled: true,
      email: true,
      push: true,
      sms: false,
    },
  },
};

// Configuración para escuela de idiomas
export const languageSchoolBranding: BrandingConstants = {
  appName: "LanguageSchool",
  appShortName: "LangSchool",
  appDescription: "Plataforma especializada para el aprendizaje de idiomas",
  appVersion: "1.0.0",
  appUrl: "https://languageschool.com",
  
  supportEmail: "soporte@languageschool.com",
  supportPhone: "+1 555 123 4567",
  supportWhatsApp: "+15551234567",
  supportHours: "Monday to Friday 9:00 AM - 7:00 PM",
  
  companyName: "LanguageSchool",
  companyAddress: "123 Education St, New York, NY 10001",
  companyWebsite: "https://languageschool.com",
  companyPhone: "+1 555 987 6543",
  companyEmail: "info@languageschool.com",
  
  socialMedia: {
    facebook: "https://facebook.com/languageschool",
    instagram: "https://instagram.com/languageschool",
    linkedin: "https://linkedin.com/company/languageschool",
  },
  
  ui: {
    login: {
      title: "Welcome to LanguageSchool",
      subtitle: "Your language learning platform",
      emailPlaceholder: "Email address",
      passwordPlaceholder: "Password",
      loginButton: "Sign In",
      forgotPassword: "Forgot your password?",
      noAccount: "Don't have an account?",
      signUp: "Sign up here",
      testUsersTitle: "Test Users",
      testUsersDescription: "Use these credentials to test the platform",
      supportButton: "Need help? Contact support",
    },
    dashboard: {
      welcome: "Welcome back!",
      quickActions: "Quick Actions",
      recentActivity: "Recent Activity",
      notifications: "Notifications",
    },
    navigation: {
      home: "Home",
      dashboard: "Dashboard",
      courses: "Courses",
      students: "Students",
      evaluations: "Evaluations",
      messages: "Messages",
      analytics: "Analytics",
      settings: "Settings",
      profile: "Profile",
      logout: "Logout",
    },
    roles: {
      admin: "Administrator",
      teacher: "Teacher",
      student: "Student",
    },
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      create: "Create",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
    },
  },
  
  features: {
    authentication: {
      enabled: true,
      providers: ["email", "google", "facebook"],
      requireEmailVerification: true,
    },
    messaging: {
      enabled: true,
      allowFileAttachments: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    },
    analytics: {
      enabled: true,
      trackUserBehavior: true,
      privacyCompliant: true,
    },
    notifications: {
      enabled: true,
      email: true,
      push: true,
      sms: false,
    },
  },
};

// Configuración para empresa/negocio
export const businessBranding: BrandingConstants = {
  appName: "BusinessApp",
  appShortName: "BizApp",
  appDescription: "Plataforma empresarial para gestión integral",
  appVersion: "1.0.0",
  appUrl: "https://businessapp.com",
  
  supportEmail: "soporte@businessapp.com",
  supportPhone: "+1 800 123 4567",
  supportWhatsApp: "+18001234567",
  supportHours: "24/7 Support Available",
  
  companyName: "BusinessApp Inc.",
  companyAddress: "456 Business Ave, San Francisco, CA 94102",
  companyWebsite: "https://businessapp.com",
  companyPhone: "+1 800 987 6543",
  companyEmail: "info@businessapp.com",
  
  socialMedia: {
    linkedin: "https://linkedin.com/company/businessapp",
    twitter: "https://twitter.com/businessapp",
  },
  
  ui: {
    login: {
      title: "BusinessApp Portal",
      subtitle: "Enterprise Management Platform",
      emailPlaceholder: "Work email",
      passwordPlaceholder: "Password",
      loginButton: "Access Portal",
      forgotPassword: "Forgot password?",
      noAccount: "Need an account?",
      signUp: "Contact IT Support",
      testUsersTitle: "Demo Users",
      testUsersDescription: "Use these credentials for demonstration",
      supportButton: "Contact IT Support",
    },
    dashboard: {
      welcome: "Welcome to your workspace",
      quickActions: "Quick Actions",
      recentActivity: "Recent Activity",
      notifications: "Notifications",
    },
    navigation: {
      home: "Home",
      dashboard: "Dashboard",
      courses: "Training",
      students: "Employees",
      evaluations: "Assessments",
      messages: "Communications",
      analytics: "Reports",
      settings: "Settings",
      profile: "Profile",
      logout: "Logout",
    },
    roles: {
      admin: "System Administrator",
      teacher: "Manager",
      student: "Employee",
    },
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      view: "View",
      create: "Create",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
    },
  },
  
  features: {
    authentication: {
      enabled: true,
      providers: ["email", "sso", "ldap"],
      requireEmailVerification: false,
    },
    messaging: {
      enabled: true,
      allowFileAttachments: true,
      maxFileSize: 25 * 1024 * 1024, // 25MB
    },
    analytics: {
      enabled: true,
      trackUserBehavior: false,
      privacyCompliant: true,
    },
    notifications: {
      enabled: true,
      email: true,
      push: false,
      sms: true,
    },
  },
};

// ============================================================================
// FUNCIONES UTILITARIAS
// ============================================================================

export function getBrandingConfig(appType: 'kaled' | 'language' | 'business' = 'kaled'): BrandingConstants {
  switch (appType) {
    case 'language':
      return languageSchoolBranding;
    case 'business':
      return businessBranding;
    default:
      return kaledAcademyBranding;
  }
}

export function createCustomBranding(
  baseConfig: BrandingConstants,
  customizations: Partial<BrandingConstants>
): BrandingConstants {
  return {
    ...baseConfig,
    ...customizations,
    ui: {
      ...baseConfig.ui,
      ...customizations.ui,
    },
    features: {
      ...baseConfig.features,
      ...customizations.features,
    },
  };
}

// ============================================================================
// EXPORTACIONES
// ============================================================================

export { kaledAcademyBranding as defaultBranding };
