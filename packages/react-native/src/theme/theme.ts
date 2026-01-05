export interface TypographyStyle {
  fontSize: number;
  fontWeight: "400" | "500" | "600" | "700";
  lineHeight: number;
  letterSpacing: number;
}

export interface ShadowStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface SpringConfig {
  friction: number;
  tension?: number;
}

export interface Theme {
  colors: {
    primary: string;
    primaryPressed: string;
    secondary: string;
    success: {
      main: string;
      light: string;
      dark: string;
    };
    warning: {
      main: string;
      light: string;
      dark: string;
    };
    error: {
      main: string;
      light: string;
      dark: string;
    };
    info: {
      main: string;
      light: string;
      dark: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
    };
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      elevated: string;
    };
    border: {
      primary: string;
      secondary: string;
      focus: string;
    };
    overlay: {
      light: string;
      medium: string;
      dark: string;
    };
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
    huge: number;
    massive: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
  typography: {
    largeTitle: TypographyStyle;
    title1: TypographyStyle;
    title2: TypographyStyle;
    title3: TypographyStyle;
    heading: TypographyStyle;
    body: TypographyStyle;
    callout: TypographyStyle;
    subhead: TypographyStyle;
    footnote: TypographyStyle;
    caption1: TypographyStyle;
    caption2: TypographyStyle;
  };
  shadows: {
    sm: ShadowStyle;
    md: ShadowStyle;
    lg: ShadowStyle;
    xl: ShadowStyle;
  };
  animation: {
    duration: {
      fast: number;
      normal: number;
      slow: number;
      verySlow: number;
    };
    spring: {
      default: SpringConfig;
      stiff: SpringConfig;
    };
  };
  opacity: {
    disabled: number;
    pressed: number;
    shimmer: number;
  };
  components: {
    button: {
      height: { sm: number; md: number; lg: number };
      paddingHorizontal: { sm: number; md: number; lg: number };
      paddingVertical: { sm: number; md: number; lg: number };
      gap: { sm: number; md: number; lg: number };
      iconSize: { sm: number; md: number; lg: number };
    };
    input: {
      height: { sm: number; md: number; lg: number };
      fontSize: { sm: number; md: number; lg: number };
      padding: { sm: number; md: number; lg: number };
    };
    avatar: {
      size: { sm: number; md: number; lg: number };
    };
    switch: {
      trackWidth: { sm: number; md: number; lg: number };
      trackHeight: { sm: number; md: number; lg: number };
      thumbSize: { sm: number; md: number; lg: number };
      thumbPadding: number;
    };
    fab: {
      size: { sm: number; md: number; lg: number };
      borderRadius: { sm: number; md: number; lg: number };
      offset: number;
    };
  };
}

const sharedTokens = {
  spacing: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 20,
    xxxl: 24,
    huge: 32,
    massive: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    full: 999,
  },
  typography: {
    largeTitle: {
      fontSize: 34,
      fontWeight: "400" as const,
      lineHeight: 40.8,
      letterSpacing: -0.34,
    },
    title1: {
      fontSize: 28,
      fontWeight: "400" as const,
      lineHeight: 33.6,
      letterSpacing: -0.224,
    },
    title2: {
      fontSize: 22,
      fontWeight: "400" as const,
      lineHeight: 27.5,
      letterSpacing: -0.132,
    },
    title3: {
      fontSize: 20,
      fontWeight: "400" as const,
      lineHeight: 25,
      letterSpacing: -0.08,
    },
    heading: {
      fontSize: 17,
      fontWeight: "600" as const,
      lineHeight: 22.1,
      letterSpacing: -0.034,
    },
    body: {
      fontSize: 17,
      fontWeight: "400" as const,
      lineHeight: 23.8,
      letterSpacing: 0,
    },
    callout: {
      fontSize: 16,
      fontWeight: "400" as const,
      lineHeight: 22.4,
      letterSpacing: 0,
    },
    subhead: {
      fontSize: 15,
      fontWeight: "400" as const,
      lineHeight: 21,
      letterSpacing: 0,
    },
    footnote: {
      fontSize: 13,
      fontWeight: "400" as const,
      lineHeight: 17.55,
      letterSpacing: 0,
    },
    caption1: {
      fontSize: 12,
      fontWeight: "400" as const,
      lineHeight: 15.6,
      letterSpacing: 0,
    },
    caption2: {
      fontSize: 11,
      fontWeight: "400" as const,
      lineHeight: 14.3,
      letterSpacing: 0.11,
    },
  },
  animation: {
    duration: {
      fast: 100,
      normal: 200,
      slow: 1000,
      verySlow: 1500,
    },
    spring: {
      default: { friction: 3 },
      stiff: { friction: 5 },
    },
  },
  opacity: {
    disabled: 0.5,
    pressed: 0.8,
    shimmer: 0.5,
  },
  components: {
    button: {
      height: { sm: 32, md: 40, lg: 48 },
      paddingHorizontal: { sm: 12, md: 16, lg: 20 },
      paddingVertical: { sm: 6, md: 10, lg: 14 },
      gap: { sm: 6, md: 8, lg: 10 },
      iconSize: { sm: 32, md: 40, lg: 48 },
    },
    input: {
      height: { sm: 36, md: 44, lg: 52 },
      fontSize: { sm: 14, md: 16, lg: 18 },
      padding: { sm: 8, md: 12, lg: 16 },
    },
    avatar: {
      size: { sm: 32, md: 40, lg: 48 },
    },
    switch: {
      trackWidth: { sm: 32, md: 40, lg: 48 },
      trackHeight: { sm: 20, md: 24, lg: 28 },
      thumbSize: { sm: 16, md: 20, lg: 24 },
      thumbPadding: 2,
    },
    fab: {
      size: { sm: 40, md: 56, lg: 64 },
      borderRadius: { sm: 20, md: 28, lg: 32 },
      offset: 16,
    },
  },
};

const lightTheme: Omit<Theme, keyof typeof sharedTokens> = {
  colors: {
    primary: "#4A90E2",
    primaryPressed: "#357ABD",
    secondary: "#6B7280",
    success: {
      main: "#10B981",
      light: "#D1FAE5",
      dark: "#065F46",
    },
    warning: {
      main: "#F59E0B",
      light: "#FEF3C7",
      dark: "#92400E",
    },
    error: {
      main: "#EF4444",
      light: "#FEE2E2",
      dark: "#991B1B",
    },
    info: {
      main: "#3B82F6",
      light: "#DBEAFE",
      dark: "#1E40AF",
    },
    text: {
      primary: "#1F2937",
      secondary: "#374151",
      tertiary: "#6B7280",
      inverse: "#FFFFFF",
    },
    background: {
      primary: "#FFFFFF",
      secondary: "#F9FAFB",
      tertiary: "#F3F4F6",
      elevated: "#FFFFFF",
    },
    border: {
      primary: "#E5E7EB",
      secondary: "#D1D5DB",
      focus: "#4A90E2",
    },
    overlay: {
      light: "rgba(0, 0, 0, 0.1)",
      medium: "rgba(0, 0, 0, 0.3)",
      dark: "rgba(0, 0, 0, 0.6)",
    },
  },
  shadows: {
    sm: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 6,
    },
    xl: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.4,
      shadowRadius: 12,
      elevation: 8,
    },
  },
};

const darkTheme: Omit<Theme, keyof typeof sharedTokens> = {
  colors: {
    primary: "#5AA2F5",
    primaryPressed: "#4A90E2",
    secondary: "#9CA3AF",
    success: {
      main: "#34D399",
      light: "#D1FAE5",
      dark: "#064E3B",
    },
    warning: {
      main: "#FBBF24",
      light: "#FEF3C7",
      dark: "#78350F",
    },
    error: {
      main: "#F87171",
      light: "#FEE2E2",
      dark: "#7F1D1D",
    },
    info: {
      main: "#60A5FA",
      light: "#DBEAFE",
      dark: "#1E3A8A",
    },
    text: {
      primary: "#F9FAFB",
      secondary: "#E5E7EB",
      tertiary: "#9CA3AF",
      inverse: "#1F2937",
    },
    background: {
      primary: "#1F2937",
      secondary: "#111827",
      tertiary: "#374151",
      elevated: "#1F2937",
    },
    border: {
      primary: "#374151",
      secondary: "#4B5563",
      focus: "#5AA2F5",
    },
    overlay: {
      light: "rgba(255, 255, 255, 0.1)",
      medium: "rgba(255, 255, 255, 0.2)",
      dark: "rgba(255, 255, 255, 0.3)",
    },
  },
  shadows: {
    sm: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 8,
      elevation: 6,
    },
    xl: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 8,
    },
  },
};

export const themes = {
  light: { ...sharedTokens, ...lightTheme } as Theme,
  dark: { ...sharedTokens, ...darkTheme } as Theme,
};

export const defaultTheme = themes.light;
