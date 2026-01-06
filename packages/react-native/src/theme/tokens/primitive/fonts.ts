import { Platform } from "react-native";

export const systemFonts = {
  default: undefined as string | undefined,
  mono: Platform.select({
    ios: "Courier",
    android: "monospace",
    default: "monospace",
  }) as string | undefined,
} as const;

export const fontFamily = {
  system: systemFonts.default,
  systemMono: systemFonts.mono,
} as const;
