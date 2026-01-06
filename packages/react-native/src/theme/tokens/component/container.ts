import * as primitive from "../primitive";

export const container = {
  maxWidth: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  padding: primitive.spacing[4],
} as const;
