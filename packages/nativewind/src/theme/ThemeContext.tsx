import { createContext, useContext, useMemo } from "react";

type ThemeVariables = Record<string, string | number>;

const ThemeContext = createContext<ThemeVariables>({});

export interface ThemeConfig {
  light: ThemeVariables;
  dark: ThemeVariables;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme: ThemeConfig;
  colorScheme?: "light" | "dark";
}

export function ThemeProvider({ children, theme, colorScheme = "light" }: ThemeProviderProps) {
  const themeVariables = useMemo(() => {
    return colorScheme === "dark" ? theme.dark : theme.light;
  }, [colorScheme, theme]);

  return (
    <ThemeContext.Provider value={themeVariables}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeVariables {
  return useContext(ThemeContext);
}

export function useThemeValue(variableName: string): string | number {
  const theme = useTheme();
  return theme[variableName] || "";
}
