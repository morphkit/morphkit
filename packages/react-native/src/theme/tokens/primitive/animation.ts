export const duration = {
  fast: 100,
  normal: 200,
  slow: 1000,
  verySlow: 1500,
} as const;

export const easing = {
  linear: 'linear',
  ease: 'ease',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
} as const;

export const spring = {
  default: { friction: 3 },
  stiff: { friction: 5 },
  gentle: { friction: 8, tension: 40 },
} as const;
