declare module "*.mdx" {
  import React from "react";
  import { CustomComponentsProp } from "@bacons/mdx";
  const Component: React.FC<{
    components?: CustomComponentsProp;
  }>;
  export default Component;
}

declare module "*/warpui.config.mjs" {
  export const theme: {
    light: Record<string, string | number>;
    dark: Record<string, string | number>;
  };
  export const config: {
    type: "react-native" | "react";
    paths: {
      ui: string;
    };
  };
}
