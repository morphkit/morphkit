import type { DeepPartial } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const merge = <T extends Record<string, any>>(...sources: Array<DeepPartial<T> | Partial<T>>): T => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {};

  for (const source of sources) {
    for (const key in source) {
      const sourceValue = source[key];
      const resultValue = result[key];

      if (
        sourceValue &&
        typeof sourceValue === "object" &&
        !Array.isArray(sourceValue) &&
        resultValue &&
        typeof resultValue === "object" &&
        !Array.isArray(resultValue)
      ) {
        result[key] = merge(resultValue, sourceValue);
      } else if (sourceValue !== undefined) {
        result[key] = sourceValue;
      }
    }
  }

  return result as T;
};
