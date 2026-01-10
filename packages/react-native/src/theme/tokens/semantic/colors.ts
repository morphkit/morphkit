import * as primitive from "../primitive/colors";
import { opacity } from "../primitive/opacity";

export const light = {
  action: {
    primary: primitive.blue[500],
    primaryHover: primitive.blue[600],
    primaryPressed: primitive.blue[700],
    secondary: primitive.neutral[500],
    secondaryHover: primitive.neutral[600],
  },
  text: {
    primary: primitive.neutral[900],
    secondary: primitive.neutral[700],
    tertiary: primitive.neutral[500],
    disabled: primitive.neutral[400],
    inverse: primitive.neutral[0],
    link: primitive.blue[600],
  },
  surface: {
    primary: primitive.neutral[0],
    secondary: primitive.neutral[50],
    tertiary: primitive.neutral[100],
    elevated: primitive.neutral[0],
    overlay: `rgba(0, 0, 0, ${opacity.overlay.light})`,
  },
  border: {
    primary: primitive.neutral[200],
    secondary: primitive.neutral[300],
    tertiary: primitive.neutral[400],
    focus: primitive.blue[500],
    error: primitive.red[500],
  },
  status: {
    success: {
      main: primitive.green[600],
      surface: primitive.green[50],
      border: primitive.green[200],
      text: primitive.green[900],
    },
    warning: {
      main: primitive.amber[500],
      surface: primitive.amber[50],
      border: primitive.amber[200],
      text: primitive.amber[900],
    },
    error: {
      main: primitive.red[600],
      surface: primitive.red[50],
      border: primitive.red[200],
      text: primitive.red[900],
    },
    info: {
      main: primitive.sky[600],
      surface: primitive.sky[50],
      border: primitive.sky[200],
      text: primitive.sky[900],
    },
  },
} as const;

export const dark = {
  action: {
    primary: primitive.blue[400],
    primaryHover: primitive.blue[300],
    primaryPressed: primitive.blue[500],
    secondary: primitive.neutral[400],
    secondaryHover: primitive.neutral[300],
  },
  text: {
    primary: primitive.neutral[50],
    secondary: primitive.neutral[200],
    tertiary: primitive.neutral[400],
    disabled: primitive.neutral[600],
    inverse: primitive.neutral[900],
    link: primitive.blue[400],
  },
  surface: {
    primary: primitive.neutral[1000],
    secondary: primitive.neutral[800],
    tertiary: primitive.neutral[700],
    elevated: primitive.neutral[800],
    overlay: `rgba(0, 0, 0, ${opacity.overlay.dark})`,
  },
  border: {
    primary: primitive.neutral[700],
    secondary: primitive.neutral[600],
    tertiary: primitive.neutral[500],
    focus: primitive.blue[400],
    error: primitive.red[400],
  },
  status: {
    success: {
      main: primitive.green[400],
      surface: primitive.green[950],
      border: primitive.green[800],
      text: primitive.green[200],
    },
    warning: {
      main: primitive.amber[400],
      surface: primitive.amber[950],
      border: primitive.amber[800],
      text: primitive.amber[200],
    },
    error: {
      main: primitive.red[400],
      surface: primitive.red[950],
      border: primitive.red[800],
      text: primitive.red[200],
    },
    info: {
      main: primitive.sky[400],
      surface: primitive.sky[950],
      border: primitive.sky[800],
      text: primitive.sky[200],
    },
  },
} as const;
