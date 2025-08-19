import { ColorPalette } from './app';

// ============================================================================
// INTERFACES Y TIPOS PARA TEMAS
// ============================================================================

export interface Theme {
  id: string;
  name: string;
  description: string;
  category: 'education' | 'business' | 'creative' | 'minimal';
  colors: ColorPalette;
  fonts: {
    primary: string;
    secondary: string;
    mono: string;
  };
  logo: {
    light: string;
    dark: string;
    favicon: string;
  };
  cssVariables: Record<string, string>;
}

// ============================================================================
// TEMAS PREDEFINIDOS
// ============================================================================

// Tema KaledAcademy (actual)
export const kaledAcademyTheme: Theme = {
  id: "kaled-academy",
  name: "KaledAcademy",
  description: "Tema oficial de KaledAcademy con colores azules y amarillos",
  category: "education",
  colors: {
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
    secondary: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
    accent: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
    },
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },
  fonts: {
    primary: "Inter, system-ui, sans-serif",
    secondary: "Inter, system-ui, sans-serif",
    mono: "JetBrains Mono, monospace",
  },
  logo: {
    light: "/kaled-logo.svg",
    dark: "/kaled-logo.svg",
    favicon: "/favicon.ico",
  },
  cssVariables: {
    "--background": "#ffffff",
    "--foreground": "#111827",
    "--card": "#ffffff",
    "--card-foreground": "#111827",
    "--popover": "#ffffff",
    "--popover-foreground": "#111827",
    "--primary": "#3b82f6",
    "--primary-foreground": "#ffffff",
    "--secondary": "#f3f4f6",
    "--secondary-foreground": "#374151",
    "--muted": "#f9fafb",
    "--muted-foreground": "#6b7280",
    "--accent": "#fbbf24",
    "--accent-foreground": "#78350f",
    "--destructive": "#ef4444",
    "--destructive-foreground": "#ffffff",
    "--border": "#e5e7eb",
    "--input": "#e5e7eb",
    "--ring": "#3b82f6",
    "--radius": "0.5rem",
  },
};

// Tema para escuela de idiomas
export const languageSchoolTheme: Theme = {
  id: "language-school",
  name: "Language School",
  description: "Tema elegante para escuelas de idiomas con colores verdes",
  category: "education",
  colors: {
    primary: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
    },
    secondary: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
    accent: {
      50: "#fefce8",
      100: "#fef9c3",
      200: "#fef08a",
      300: "#fde047",
      400: "#facc15",
      500: "#eab308",
      600: "#ca8a04",
      700: "#a16207",
      800: "#854d0e",
      900: "#713f12",
    },
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    success: "#22c55e",
    warning: "#facc15",
    error: "#ef4444",
    info: "#3b82f6",
  },
  fonts: {
    primary: "Inter, system-ui, sans-serif",
    secondary: "Inter, system-ui, sans-serif",
    mono: "JetBrains Mono, monospace",
  },
  logo: {
    light: "/language-logo.svg",
    dark: "/language-logo.svg",
    favicon: "/language-favicon.ico",
  },
  cssVariables: {
    "--background": "#ffffff",
    "--foreground": "#0f172a",
    "--card": "#ffffff",
    "--card-foreground": "#0f172a",
    "--popover": "#ffffff",
    "--popover-foreground": "#0f172a",
    "--primary": "#22c55e",
    "--primary-foreground": "#ffffff",
    "--secondary": "#f1f5f9",
    "--secondary-foreground": "#334155",
    "--muted": "#f8fafc",
    "--muted-foreground": "#64748b",
    "--accent": "#facc15",
    "--accent-foreground": "#713f12",
    "--destructive": "#ef4444",
    "--destructive-foreground": "#ffffff",
    "--border": "#e2e8f0",
    "--input": "#e2e8f0",
    "--ring": "#22c55e",
    "--radius": "0.5rem",
  },
};

// Tema para empresa/negocio
export const businessTheme: Theme = {
  id: "business",
  name: "Business",
  description: "Tema profesional para empresas con colores grises y azules",
  category: "business",
  colors: {
    primary: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
    secondary: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
    accent: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
    },
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },
  fonts: {
    primary: "Inter, system-ui, sans-serif",
    secondary: "Inter, system-ui, sans-serif",
    mono: "JetBrains Mono, monospace",
  },
  logo: {
    light: "/business-logo.svg",
    dark: "/business-logo.svg",
    favicon: "/business-favicon.ico",
  },
  cssVariables: {
    "--background": "#ffffff",
    "--foreground": "#0f172a",
    "--card": "#ffffff",
    "--card-foreground": "#0f172a",
    "--popover": "#ffffff",
    "--popover-foreground": "#0f172a",
    "--primary": "#64748b",
    "--primary-foreground": "#ffffff",
    "--secondary": "#eff6ff",
    "--secondary-foreground": "#1e3a8a",
    "--muted": "#f8fafc",
    "--muted-foreground": "#64748b",
    "--accent": "#ef4444",
    "--accent-foreground": "#ffffff",
    "--destructive": "#ef4444",
    "--destructive-foreground": "#ffffff",
    "--border": "#e2e8f0",
    "--input": "#e2e8f0",
    "--ring": "#64748b",
    "--radius": "0.375rem",
  },
};

// Tema minimalista
export const minimalTheme: Theme = {
  id: "minimal",
  name: "Minimal",
  description: "Tema minimalista con colores neutros",
  category: "minimal",
  colors: {
    primary: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    secondary: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    accent: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },
  fonts: {
    primary: "Inter, system-ui, sans-serif",
    secondary: "Inter, system-ui, sans-serif",
    mono: "JetBrains Mono, monospace",
  },
  logo: {
    light: "/minimal-logo.svg",
    dark: "/minimal-logo.svg",
    favicon: "/minimal-favicon.ico",
  },
  cssVariables: {
    "--background": "#ffffff",
    "--foreground": "#171717",
    "--card": "#ffffff",
    "--card-foreground": "#171717",
    "--popover": "#ffffff",
    "--popover-foreground": "#171717",
    "--primary": "#737373",
    "--primary-foreground": "#ffffff",
    "--secondary": "#f5f5f5",
    "--secondary-foreground": "#404040",
    "--muted": "#fafafa",
    "--muted-foreground": "#737373",
    "--accent": "#e5e5e5",
    "--accent-foreground": "#404040",
    "--destructive": "#ef4444",
    "--destructive-foreground": "#ffffff",
    "--border": "#e5e5e5",
    "--input": "#e5e5e5",
    "--ring": "#737373",
    "--radius": "0.25rem",
  },
};

// ============================================================================
// COLECCIÓN DE TEMAS
// ============================================================================

export const themes: Record<string, Theme> = {
  "kaled-academy": kaledAcademyTheme,
  "language-school": languageSchoolTheme,
  "business": businessTheme,
  "minimal": minimalTheme,
};

// ============================================================================
// FUNCIONES UTILITARIAS PARA TEMAS
// ============================================================================

export function getTheme(themeId: string): Theme {
  return themes[themeId] || kaledAcademyTheme;
}

export function getAllThemes(): Theme[] {
  return Object.values(themes);
}

export function getThemesByCategory(category: Theme['category']): Theme[] {
  return getAllThemes().filter(theme => theme.category === category);
}

export function applyTheme(themeId: string): void {
  // Esta función es para compatibilidad, usa la versión del cliente
  if (typeof window !== 'undefined') {
    applyThemeClient(themeId);
  }
}

export function getCurrentTheme(): string {
  // Esta función es para compatibilidad, usa la versión del cliente
  return getCurrentThemeClient();
}

export function createCustomTheme(
  id: string,
  name: string,
  description: string,
  category: Theme['category'],
  colors: ColorPalette,
  fonts: Theme['fonts'],
  logo: Theme['logo']
): Theme {
  return {
    id,
    name,
    description,
    category,
    colors,
    fonts,
    logo,
    cssVariables: generateCSSVariables(colors),
  };
}

export function generateCSSVariables(colors: ColorPalette): Record<string, string> {
  return {
    "--background": "#ffffff",
    "--foreground": colors.neutral[900],
    "--card": "#ffffff",
    "--card-foreground": colors.neutral[900],
    "--popover": "#ffffff",
    "--popover-foreground": colors.neutral[900],
    "--primary": colors.primary[500],
    "--primary-foreground": "#ffffff",
    "--secondary": colors.secondary[100],
    "--secondary-foreground": colors.secondary[700],
    "--muted": colors.neutral[50],
    "--muted-foreground": colors.neutral[500],
    "--accent": colors.accent[500],
    "--accent-foreground": colors.accent[900],
    "--destructive": colors.error,
    "--destructive-foreground": "#ffffff",
    "--border": colors.neutral[200],
    "--input": colors.neutral[200],
    "--ring": colors.primary[500],
    "--radius": "0.5rem",
  };
}

// ============================================================================
// FUNCIONES PARA CLIENTE (Navegador)
// ============================================================================

export function applyThemeClient(themeId: string): void {
  if (typeof window === 'undefined') return;
  
  const theme = getTheme(themeId);
  
  // Aplicar variables CSS
  const root = document.documentElement;
  Object.entries(theme.cssVariables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
  
  // Guardar en localStorage
  localStorage.setItem('app-theme', themeId);
}

export function getCurrentThemeClient(): string {
  if (typeof window === 'undefined') return 'kaled-academy';
  return localStorage.getItem('app-theme') || 'kaled-academy';
}

// ============================================================================
// EXPORTACIÓN POR DEFECTO
// ============================================================================

export { kaledAcademyTheme as defaultTheme };
