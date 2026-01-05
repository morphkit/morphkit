export const shadowPresets = {
  sm: {
    offset: { width: 0, height: 2 },
    opacity: 0.1,
    radius: 4,
    elevation: 2,
  },
  md: {
    offset: { width: 0, height: 2 },
    opacity: 0.1,
    radius: 8,
    elevation: 4,
  },
  lg: {
    offset: { width: 0, height: 4 },
    opacity: 0.3,
    radius: 8,
    elevation: 6,
  },
  xl: {
    offset: { width: 0, height: 6 },
    opacity: 0.4,
    radius: 12,
    elevation: 8,
  },
} as const;
