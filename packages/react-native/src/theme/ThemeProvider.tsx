import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useColorScheme as useDeviceColorScheme } from "react-native";
import { type Theme, type ColorScheme, themes } from "./theme";

export interface ThemeContextValue {
  theme: Theme;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  toggleColorScheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  children: ReactNode;
  theme?: { light: Theme; dark: Theme };
  initialColorScheme?: ColorScheme;
}

export const ThemeProvider = ({
  children,
  theme: customTheme,
  initialColorScheme,
}: ThemeProviderProps) => {
  const deviceColorScheme = useDeviceColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    initialColorScheme ?? deviceColorScheme ?? "light",
  );

  useEffect(() => {
    if (!initialColorScheme && deviceColorScheme) {
      setColorScheme(deviceColorScheme);
    }
  }, [deviceColorScheme, initialColorScheme]);

  const toggleColorScheme = () => {
    setColorScheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const activeThemes = customTheme ?? themes;
  const activeTheme = activeThemes[colorScheme];

  const value: ThemeContextValue = {
    theme: activeTheme,
    colorScheme,
    setColorScheme,
    toggleColorScheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
