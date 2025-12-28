import { ThemeProvider as BaseThemeProvider } from "@warp-ui/nativewind";
import { useColorScheme } from "nativewind";
import { theme as configTheme } from "../warpui.config.mjs";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme } = useColorScheme();

  return (
    <BaseThemeProvider theme={configTheme} colorScheme={colorScheme}>
      {children}
    </BaseThemeProvider>
  );
}

export { useTheme, useThemeValue } from "@warp-ui/nativewind";
