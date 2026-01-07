import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react-native";
import { ThemeProvider } from "./theme";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  initialColorScheme?: "light" | "dark";
}

const customRender = (
  ui: ReactElement,
  { initialColorScheme = "light", ...options }: CustomRenderOptions = {},
) => {
  const AllProviders = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider initialColorScheme={initialColorScheme}>
      {children}
    </ThemeProvider>
  );

  return render(ui, { wrapper: AllProviders, ...options });
};

export * from "@testing-library/react-native";
export { customRender as render };
