import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "./theme";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  initialColorScheme?: "light" | "dark";
}

const customRender = (
  ui: ReactElement,
  { initialColorScheme = "light", ...options }: CustomRenderOptions = {},
) => {
  const AllProviders = ({ children }: { children: React.ReactNode }) => (
    <SafeAreaProvider>
      <ThemeProvider initialColorScheme={initialColorScheme}>
        {children}
      </ThemeProvider>
    </SafeAreaProvider>
  );

  return render(ui, { wrapper: AllProviders, ...options });
};

export * from "@testing-library/react-native";
export { customRender as render };
