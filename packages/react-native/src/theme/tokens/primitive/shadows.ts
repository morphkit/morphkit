import { ViewStyle } from "react-native";

export const shadowPresets = {
  sm: {
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",
  } as ViewStyle,
  md: {
    boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.1)",
  } as ViewStyle,
  lg: {
    boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.3)",
  } as ViewStyle,
  xl: {
    boxShadow: "0px 6px 12px 0px rgba(0, 0, 0, 0.4)",
  } as ViewStyle,
} as const;
