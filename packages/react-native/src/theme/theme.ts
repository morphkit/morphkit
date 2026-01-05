import * as primitive from './tokens/primitive';
import * as semantic from './tokens/semantic';
import * as component from './tokens/component';

export interface Theme {
  primitive: typeof primitive;
  semantic: {
    colors: typeof semantic.colors.light | typeof semantic.colors.dark;
    textStyles: typeof semantic.textStyles;
    state: typeof semantic.state;
  };
  component: typeof component;
}

export const themes = {
  light: {
    primitive,
    semantic: {
      colors: semantic.colors.light,
      textStyles: semantic.textStyles,
      state: semantic.state,
    },
    component,
  } as Theme,
  dark: {
    primitive,
    semantic: {
      colors: semantic.colors.dark,
      textStyles: semantic.textStyles,
      state: semantic.state,
    },
    component,
  } as Theme,
};

export const defaultTheme = themes.light;
export type ColorScheme = 'light' | 'dark';

export interface TypographyStyle {
  fontSize: number;
  fontWeight: '400' | '500' | '600' | '700';
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
