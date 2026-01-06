import * as primitive from "./tokens/primitive";
import * as semantic from "./tokens/semantic";
import * as component from "./tokens/component";
import * as fonts from "./tokens/primitive/fonts";

export interface FontFamilies {
  display: string | undefined;
  body: string | undefined;
  mono: string | undefined;
}

export interface Theme {
  primitive: typeof primitive & {
    fontFamily: typeof fonts.fontFamily;
  };
  semantic: {
    colors: typeof semantic.colors.light | typeof semantic.colors.dark;
    textStyles: typeof semantic.textStyles;
    fontFamilies: FontFamilies;
    state: typeof semantic.state;
  };
  component: typeof component;
}

export const themes = {
  light: {
    primitive: {
      ...primitive,
      fontFamily: fonts.fontFamily,
    },
    semantic: {
      colors: semantic.colors.light,
      textStyles: semantic.textStyles,
      fontFamilies: semantic.fontFamilies,
      state: semantic.state,
    },
    component,
  } as Theme,
  dark: {
    primitive: {
      ...primitive,
      fontFamily: fonts.fontFamily,
    },
    semantic: {
      colors: semantic.colors.dark,
      textStyles: semantic.textStyles,
      fontFamilies: semantic.fontFamilies,
      state: semantic.state,
    },
    component,
  } as Theme,
};

export const defaultTheme = themes.light;
export type ColorScheme = "light" | "dark";

export interface TypographyStyle {
  fontSize: number;
  fontWeight: "400" | "500" | "600" | "700";
  lineHeight: number;
  letterSpacing: number;
  fontFamily?: string | undefined;
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
